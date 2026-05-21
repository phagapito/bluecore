const path = require('path');
const fs = require('fs');
const initSqlJs = require('sql.js');
const bcrypt = require('bcryptjs');
const DB_PATH = path.join(__dirname, '../bluecore.db');
async function main() {
  console.log('\n  BLUECORE -- Criando banco de dados...\n');
  if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);
  const SQL = await initSqlJs();
  const db = new SQL.Database();
  db.exec(`
    CREATE TABLE agentes (
      id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, qra TEXT,
      funcional TEXT NOT NULL UNIQUE, setor TEXT NOT NULL, letra TEXT,
      perfil TEXT NOT NULL DEFAULT 'restrito', permissoes_json TEXT NOT NULL DEFAULT '{}', senha_hash TEXT NOT NULL,
      ativo INTEGER NOT NULL DEFAULT 1, primeiro_acesso INTEGER NOT NULL DEFAULT 1,
      criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
    );
    CREATE TABLE armamentos (
      id INTEGER PRIMARY KEY AUTOINCREMENT, tipo TEXT NOT NULL, marca TEXT, modelo TEXT,
      numero_serie TEXT NOT NULL UNIQUE, calibre TEXT,
      status TEXT NOT NULL DEFAULT 'disponivel',
      agente_cautela_id INTEGER, observacoes TEXT,
      apreensao_ocorrencia TEXT, apreensao_local TEXT, apreensao_data TEXT,
      criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
    );
    CREATE TABLE armamentos_movimentacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      armamento_id INTEGER NOT NULL REFERENCES armamentos(id),
      tipo TEXT NOT NULL,
      agente_id INTEGER REFERENCES agentes(id),
      gestor_id INTEGER NOT NULL REFERENCES agentes(id),
      ocorrencia TEXT, local_apreensao TEXT, data_apreensao TEXT,
      observacoes TEXT,
      criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
    );
    CREATE TABLE municoes_estoque (
      id INTEGER PRIMARY KEY AUTOINCREMENT, calibre TEXT NOT NULL, tipo TEXT NOT NULL,
      lote TEXT, cofre TEXT NOT NULL, quantidade_atual INTEGER NOT NULL DEFAULT 0,
      quantidade_minima INTEGER NOT NULL DEFAULT 0, UNIQUE(calibre, tipo, cofre)
    );
    CREATE TABLE municoes_movimentacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT, municao_id INTEGER NOT NULL,
      tipo_movimentacao TEXT NOT NULL, motivo_entrada TEXT, motivo_saida TEXT,
      quantidade INTEGER NOT NULL, agente_id INTEGER, gestor_id INTEGER NOT NULL,
      documento_ref TEXT, observacoes TEXT,
      criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
    );
    CREATE TABLE almoxarifado_itens (
      id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, categoria TEXT,
      codigo TEXT, quantidade INTEGER NOT NULL DEFAULT 1,
      numero_patrimonio TEXT NOT NULL UNIQUE, data_cadastro TEXT NOT NULL DEFAULT (date('now','localtime')),
      condicao TEXT NOT NULL DEFAULT 'bom', status TEXT NOT NULL DEFAULT 'ativo',
      setor_atual TEXT NOT NULL, responsavel_id INTEGER, observacoes TEXT,
      criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
    );
    CREATE TABLE almoxarifado_movimentacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT, item_id INTEGER NOT NULL,
      de_setor TEXT, para_setor TEXT, agente_id INTEGER, gestor_id INTEGER NOT NULL,
      tipo TEXT NOT NULL, observacoes TEXT, data_prev_devolucao TEXT,
      criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
    );
    CREATE TABLE viaturas (
      id INTEGER PRIMARY KEY AUTOINCREMENT, prefixo TEXT NOT NULL UNIQUE,
      placa TEXT NOT NULL UNIQUE, tipo TEXT, marca TEXT, modelo TEXT,
      ano INTEGER, cor TEXT, km_atual INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'disponivel', setor TEXT,
      km_proxima_revisao INTEGER, tipo_combustivel TEXT DEFAULT 'Diesel', observacoes TEXT,
      criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
    );
    CREATE TABLE cautelas_viaturas (
      id INTEGER PRIMARY KEY AUTOINCREMENT, viatura_id INTEGER NOT NULL,
      motorista_id INTEGER NOT NULL, chefe_id INTEGER,
      data_cautela TEXT NOT NULL DEFAULT (datetime('now','localtime')),
      km_inicial INTEGER NOT NULL, nivel_combustivel_inicial TEXT NOT NULL,
      checklist_json TEXT NOT NULL DEFAULT '{}', data_descautela TEXT,
      km_final INTEGER, nivel_combustivel_final TEXT, observacoes_retorno TEXT,
      criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
    );
    CREATE TABLE supervisao_servicos (
      id INTEGER PRIMARY KEY AUTOINCREMENT, supervisor_id INTEGER NOT NULL,
      letra_equipe TEXT NOT NULL, data_servico TEXT NOT NULL,
      horario_inicio TEXT NOT NULL, horario_fim TEXT,
      status TEXT NOT NULL DEFAULT 'aberto',
      ocorrencias TEXT, alteracoes TEXT, intercorrencias TEXT, encerrado_em TEXT,
      criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
    );
    CREATE TABLE supervisao_equipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT, servico_id INTEGER NOT NULL,
      viatura_id INTEGER, motorista_id INTEGER, chefe_guarnicao_id INTEGER,
      patrulheiro2_id INTEGER, patrulheiro3_id INTEGER,
      numero_radio TEXT, setor_patrulhamento TEXT, demandas TEXT,
      criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
    );
    CREATE TABLE audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT, agente_id INTEGER,
      modulo TEXT NOT NULL, acao TEXT NOT NULL, ip_origem TEXT,
      criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
    );
  `);
  console.log('  Tabelas criadas. Gerando senhas...');
  const h = bcrypt.hashSync('Bluecore@2025', 10);
  const ins = (sql, rows) => rows.forEach(p => db.run(sql, p));
  ins('INSERT INTO agentes (nome,qra,funcional,setor,letra,perfil,permissoes_json,senha_hash) VALUES (?,?,?,?,?,?,?,?)', [
    ['Administrador Sistema','ADMIN', '0000','ADM',  null, 'administrador','{}',h],
    ['Jose Oliveira',        'FALCAO','1001','ROMU', 'A',  'gestor_geral', '{}',h],
    ['Carlos Silva',         'COBRA', '1042','ROMU', 'A',  'restrito',     '{"armaria":"usuario","almoxarifado":"usuario","frota":"usuario","supervisao":"bloqueado"}',h],
    ['Ana Ferreira',         'LINCE', '0318','ADM',  'B',  'gestor_geral', '{}',h],
    ['Paulo Mendes',         'LOBO',  '0501','FROTA','B',  'restrito',     '{"armaria":"bloqueado","almoxarifado":"bloqueado","frota":"gestor","supervisao":"bloqueado"}',h],
    ['Roberto Lima',         'TIGRE', '0890','ROMU', 'C',  'restrito',     '{"armaria":"gestor","almoxarifado":"usuario","frota":"usuario","supervisao":"gestor"}',h],
  ]);
  ins('INSERT INTO viaturas (prefixo,placa,tipo,marca,modelo,ano,cor,km_atual,status,setor,km_proxima_revisao,tipo_combustivel) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)', [
    ['GCM-01', 'ABC-1234','Viatura','Toyota',    'Hilux SW4',2022,'Prata', 42310,'disponivel','ROMU',        45000,'Diesel'],
    ['GCM-03', 'DEF-5678','Viatura','Volkswagen','Amarok',   2021,'Branco',38750,'disponivel','CONVENCIONAL',40000,'Diesel'],
    ['ROMU-02','GHI-9012','Viatura','Ford',      'Ranger',   2020,'Preto', 61000,'manutencao','ROMU',        62000,'Diesel'],
    ['GCM-07', 'JKL-3456','Viatura','Chevrolet', 'S10',      2023,'Branco',29100,'disponivel','ADM',         35000,'Diesel'],
  ]);
  ins('INSERT INTO municoes_estoque (calibre,tipo,lote,cofre,quantidade_atual,quantidade_minima) VALUES (?,?,?,?,?,?)', [
    ['9mm',    'FMJ',  'LOTE-2024-001','central',    320,100],
    ['9mm',    'FMJ',  'LOTE-2024-001','operacional', 80, 50],
    ['.40 S&W','FMJ',  'LOTE-2024-002','central',    200, 80],
    ['.40 S&W','FMJ',  'LOTE-2024-002','operacional', 38, 50],
    ['12',     'Chumbo','LOTE-2023-005','central',   200, 60],
  ]);
  ins('INSERT INTO armamentos (tipo,marca,modelo,numero_serie,calibre,status) VALUES (?,?,?,?,?,?)', [
    ['Pistola',   'Taurus','PT-840','TS-00012345','.40 S&W','disponivel'],
    ['Pistola',   'Taurus','PT-840','TS-00012346','.40 S&W','cautelado'],
    ['Pistola',   'Imbel', 'GC380','IB-00098765','9mm',    'disponivel'],
    ['Espingarda','CBC',   '586',  'CB-00011111','12',     'disponivel'],
  ]);
  ins('INSERT INTO almoxarifado_itens (nome,categoria,codigo,quantidade,numero_patrimonio,condicao,status,setor_atual) VALUES (?,?,?,?,?,?,?,?)', [
    ['Radio Motorola DP4801',     'Eletronico','RAD-001',1,'GCM-0042','bom',    'cautelado','ROMU'],
    ['Colete balistico nivel III','EPI',       'EPI-001',1,'GCM-0115','otimo',  'ativo',    'ADM'],
    ['Drone DJI Mavic 3',         'Eletronico','DRN-001',1,'GCM-0203','regular','cautelado','ROMU'],
    ['Escudo balistico',          'EPI',       'EPI-002',1,'GCM-0067','bom',    'ativo',    'ROMU'],
  ]);
  fs.writeFileSync(DB_PATH, Buffer.from(db.export()));
  db.close();
  console.log('\n  Banco criado! Login: 0000 / Bluecore@2025\n');
}
main().catch(e => { console.error('ERRO:', e.message); process.exit(1); });

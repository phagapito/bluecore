const path = require('path');
const fs = require('fs');
const initSqlJs = require('sql.js');

const DB_PATH = path.join(__dirname, '../../bluecore.db');
let _db = null;
let _timer = null;

function save() {
  if (!_db) return;
  clearTimeout(_timer);
  _timer = setTimeout(() => {
    try { fs.writeFileSync(DB_PATH, Buffer.from(_db.export())); }
    catch (e) { console.error('Erro ao salvar:', e.message); }
  }, 300);
}

async function getDb() {
  if (_db) return _db;
  const SQL = await initSqlJs();
  _db = fs.existsSync(DB_PATH)
    ? new SQL.Database(fs.readFileSync(DB_PATH))
    : new SQL.Database();
  _db.run('PRAGMA foreign_keys = ON');
  // Migrations
  try { _db.run('ALTER TABLE almoxarifado_itens ADD COLUMN data_validade TEXT'); save(); } catch(e) {}
  try { _db.run('ALTER TABLE almoxarifado_movimentacoes ADD COLUMN motivo TEXT'); save(); } catch(e) {}
  try { _db.run('ALTER TABLE almoxarifado_movimentacoes ADD COLUMN quantidade INTEGER'); save(); } catch(e) {}
  // Munições estoque novos campos
  try { _db.run("ALTER TABLE municoes_estoque ADD COLUMN fabricante TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE municoes_estoque ADD COLUMN data_fabricacao TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE municoes_estoque ADD COLUMN data_vencimento TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE municoes_estoque ADD COLUMN situacao TEXT DEFAULT 'disponivel'"); save(); } catch(e) {}
  // Armamentos novos campos
  try { _db.run("ALTER TABLE armamentos ADD COLUMN capacidade INTEGER"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE armamentos ADD COLUMN orgao_proprietario TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE armamentos ADD COLUMN data_aquisicao TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE armamentos ADD COLUMN cofre TEXT DEFAULT 'operacional'"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE armamentos ADD COLUMN ultima_inspecao TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE armamentos ADD COLUMN armeiro TEXT"); save(); } catch(e) {}
  // Armamentos movimentacoes - novos tipos
  try { _db.run("ALTER TABLE armamentos_movimentacoes ADD COLUMN oficina TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE armamentos_movimentacoes ADD COLUMN data_prev_retorno TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE armamentos_movimentacoes ADD COLUMN custo_estimado REAL"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE armamentos_movimentacoes ADD COLUMN lote_leilao TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE armamentos_movimentacoes ADD COLUMN valor_arrematado REAL"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE armamentos_movimentacoes ADD COLUMN comprador TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE armamentos_movimentacoes ADD COLUMN processo_adm TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE armamentos_movimentacoes ADD COLUMN autoridade_baixa TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE armamentos_movimentacoes ADD COLUMN tipo_descarte TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE armamentos_movimentacoes ADD COLUMN local_descarte TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE armamentos_movimentacoes ADD COLUMN responsavel_descarte TEXT"); save(); } catch(e) {}
  // Municoes - deposito e cautelas
  try { _db.run("ALTER TABLE municoes_estoque ADD COLUMN deposito TEXT DEFAULT 'ativo'"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE armamentos_entradas ADD COLUMN grupo_id TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE armamentos ADD COLUMN quantidade INTEGER NOT NULL DEFAULT 1"); save(); } catch(e) {}
  // Fix UNIQUE constraint: include deposito so stock + deposit rows can coexist
  try {
    const tblRes = _db.exec("SELECT sql FROM sqlite_master WHERE type='table' AND name='municoes_estoque'");
    const tblSql = tblRes && tblRes.length ? tblRes[0].values[0][0] : '';
    const needsFix = tblSql.includes('UNIQUE(calibre, tipo, cofre)') && !tblSql.includes('UNIQUE(calibre, tipo, cofre, deposito)');
    if (needsFix) {
      _db.run('PRAGMA foreign_keys = OFF');
      _db.run(`CREATE TABLE municoes_estoque_v2 (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        calibre TEXT NOT NULL, tipo TEXT NOT NULL,
        lote TEXT, cofre TEXT NOT NULL,
        quantidade_atual INTEGER NOT NULL DEFAULT 0,
        quantidade_minima INTEGER NOT NULL DEFAULT 0,
        fabricante TEXT, data_fabricacao TEXT, data_vencimento TEXT,
        situacao TEXT DEFAULT 'disponivel', deposito TEXT DEFAULT 'ativo',
        UNIQUE(calibre, tipo, cofre, deposito)
      )`);
      _db.run('INSERT OR IGNORE INTO municoes_estoque_v2 SELECT * FROM municoes_estoque');
      _db.run('DROP TABLE municoes_estoque');
      _db.run('ALTER TABLE municoes_estoque_v2 RENAME TO municoes_estoque');
      _db.run('PRAGMA foreign_keys = ON');
      save();
      console.log('[DB] municoes_estoque UNIQUE constraint atualizada para incluir deposito');
    }
  } catch(e) { try { _db.run('PRAGMA foreign_keys = ON'); } catch(e2){} console.error('[DB] Erro na migracao UNIQUE:', e.message); }
  // Novas tabelas
  _db.run(`CREATE TABLE IF NOT EXISTS armamentos_entradas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    armamento_id INTEGER NOT NULL REFERENCES armamentos(id),
    tipo_entrada TEXT NOT NULL,
    data_entrada TEXT NOT NULL,
    documento TEXT, nota_fiscal TEXT, processo_adm TEXT,
    fornecedor TEXT, responsavel_id INTEGER, quantidade INTEGER NOT NULL DEFAULT 1,
    observacoes TEXT, gestor_id INTEGER NOT NULL,
    criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
  )`); save();
  _db.run(`CREATE TABLE IF NOT EXISTS granadas_estoque (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT NOT NULL, numero_lote TEXT,
    quantidade INTEGER NOT NULL DEFAULT 0,
    data_fabricacao TEXT, data_validade TEXT,
    fabricante TEXT, situacao TEXT NOT NULL DEFAULT 'operacional',
    local TEXT NOT NULL DEFAULT 'operacional',
    observacoes TEXT,
    criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
  )`); save();
  _db.run(`CREATE TABLE IF NOT EXISTS granadas_movimentacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    granada_id INTEGER NOT NULL REFERENCES granadas_estoque(id),
    tipo TEXT NOT NULL, quantidade INTEGER NOT NULL,
    agente_id INTEGER, gestor_id INTEGER NOT NULL,
    observacoes TEXT,
    criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
  )`); save();
  _db.run(`CREATE TABLE IF NOT EXISTS municoes_cautelas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agente_id INTEGER NOT NULL REFERENCES agentes(id),
    gestor_id INTEGER NOT NULL REFERENCES agentes(id),
    status TEXT NOT NULL DEFAULT 'ativa',
    observacoes TEXT,
    criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime')),
    encerrado_em TEXT
  )`); save();
  _db.run(`CREATE TABLE IF NOT EXISTS municoes_cautela_itens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cautela_id INTEGER NOT NULL REFERENCES municoes_cautelas(id),
    estoque_id INTEGER NOT NULL REFERENCES municoes_estoque(id),
    quantidade_cautelada INTEGER NOT NULL,
    quantidade_devolvida INTEGER NOT NULL DEFAULT 0
  )`); save();
  _db.run(`CREATE TABLE IF NOT EXISTS municoes_entradas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    grupo_id TEXT NOT NULL,
    estoque_id INTEGER NOT NULL REFERENCES municoes_estoque(id),
    tipo_entrada TEXT NOT NULL,
    data_entrada TEXT NOT NULL,
    documento TEXT, nota_fiscal TEXT, processo_adm TEXT,
    fornecedor TEXT, responsavel_id INTEGER,
    quantidade INTEGER NOT NULL DEFAULT 1,
    observacoes TEXT,
    gestor_id INTEGER NOT NULL,
    criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
  )`); save();
  // Agentes — campos expandidos
  try { _db.run("ALTER TABLE agentes ADD COLUMN numero TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN concurso TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN status_funcional TEXT DEFAULT 'ativo'"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN data_exoneracao TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN sexo TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN email_institucional TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN cpf TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN rg TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN rg_orgao TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN rg_estado TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN cnh_categoria TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN cnh_validade TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN cnh_numero TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN cnh_processo TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN contato_servidor TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN prazo_readaptacao TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN pcd INTEGER DEFAULT 0"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN naturalidade TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN estado_nascimento TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN entrada_exercicio TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN romu TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN sangue TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN email_pessoal TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN nascimento TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN destro_canhoto TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN estado_civil TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN tem_filhos INTEGER DEFAULT 0"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN quantidade_filhos INTEGER"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN filiacao TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN escolaridade TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN graduacao TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN pos_graduacao TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN rua TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN bairro TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN cidade_residencia TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN emergencia1_nome TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN emergencia1_parentesco TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN emergencia1_telefone TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN emergencia2_nome TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN emergencia2_parentesco TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN emergencia2_telefone TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN plano_saude TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN alergias TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN condicao_medica TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN arquivo_nome TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN arquivo_b64 TEXT"); save(); } catch(e) {}
  try { _db.run("ALTER TABLE agentes ADD COLUMN subequipe TEXT"); save(); } catch(e) {}
  // Módulo Administrativo
  try { _db.run("ALTER TABLE banco_horas_movimentacoes ADD COLUMN data_motivo TEXT"); save(); } catch(e) {}
  _db.run(`CREATE TABLE IF NOT EXISTS banco_horas_movimentacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agente_id INTEGER NOT NULL REFERENCES agentes(id),
    tipo TEXT NOT NULL,
    motivo TEXT NOT NULL,
    numero_processo TEXT,
    numero_bu TEXT,
    numero_ci TEXT,
    quantidade_horas REAL NOT NULL,
    observacoes TEXT,
    responsavel_id INTEGER NOT NULL REFERENCES agentes(id),
    data_lancamento TEXT NOT NULL,
    criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
  )`); save();
  _db.run(`CREATE TABLE IF NOT EXISTS audiencias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agente_id INTEGER NOT NULL REFERENCES agentes(id),
    mes TEXT NOT NULL,
    numero_processo TEXT NOT NULL,
    data_audiencia TEXT NOT NULL,
    horario TEXT,
    local_audiencia TEXT,
    informado INTEGER DEFAULT 0,
    data_informado TEXT,
    como_informado TEXT,
    data_dispensa TEXT,
    observacoes TEXT,
    gestor_id INTEGER NOT NULL REFERENCES agentes(id),
    criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
  )`); save();
  _db.run(`CREATE TABLE IF NOT EXISTS frequencia_mensal (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agente_id INTEGER NOT NULL REFERENCES agentes(id),
    mes_ano TEXT NOT NULL,
    chefia_imediata TEXT,
    ferias_inicio TEXT,
    ferias_fim TEXT,
    ferias_dias INTEGER DEFAULT 0,
    falta_dias INTEGER DEFAULT 0,
    licenca_dias INTEGER DEFAULT 0,
    afastamento_compensacao_dias INTEGER DEFAULT 0,
    declaracao_comparecimento TEXT,
    observacao TEXT,
    criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime')),
    UNIQUE(agente_id, mes_ano)
  )`); save();
  _db.run(`CREATE TABLE IF NOT EXISTS atestados (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agente_id INTEGER NOT NULL REFERENCES agentes(id),
    mes_ano TEXT NOT NULL,
    data_inicio TEXT NOT NULL,
    data_fim TEXT NOT NULL,
    dias INTEGER NOT NULL DEFAULT 1,
    tipo TEXT NOT NULL DEFAULT 'comum',
    data_reposicao TEXT,
    descricao TEXT,
    responsavel_id INTEGER NOT NULL REFERENCES agentes(id),
    criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
  )`); save();
  _db.run(`CREATE TABLE IF NOT EXISTS abonos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agente_id INTEGER NOT NULL REFERENCES agentes(id),
    mes_ano TEXT NOT NULL,
    data TEXT NOT NULL,
    motivo TEXT,
    numero_ci TEXT,
    responsavel_id INTEGER NOT NULL REFERENCES agentes(id),
    criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
  )`); save();
  _db.run(`CREATE TABLE IF NOT EXISTS doacoes_sangue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agente_id INTEGER NOT NULL REFERENCES agentes(id),
    mes_ano TEXT NOT NULL,
    data_doacao TEXT NOT NULL,
    responsavel_id INTEGER NOT NULL REFERENCES agentes(id),
    criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
  )`); save();
  _db.run(`CREATE TABLE IF NOT EXISTS atestados_reposicoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    atestado_id INTEGER NOT NULL REFERENCES atestados(id),
    data_reposicao TEXT NOT NULL,
    observacao TEXT,
    responsavel_id INTEGER NOT NULL REFERENCES agentes(id),
    criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
  )`); save();
  // Módulo Escalas
  _db.run(`CREATE TABLE IF NOT EXISTS escalas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tipo TEXT NOT NULL DEFAULT 'ordinaria',
    nome TEXT,
    mes_ano TEXT NOT NULL,
    equipe TEXT,
    subequipe TEXT,
    setor TEXT,
    horario_diurno_inicio TEXT,
    horario_diurno_fim TEXT,
    horario_noturno_inicio TEXT,
    horario_noturno_fim TEXT,
    gestor_id INTEGER NOT NULL REFERENCES agentes(id),
    criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
  )`); save();
  _db.run(`CREATE TABLE IF NOT EXISTS escala_dias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    escala_id INTEGER NOT NULL REFERENCES escalas(id) ON DELETE CASCADE,
    data TEXT NOT NULL,
    tipo_dia TEXT NOT NULL,
    UNIQUE(escala_id, data)
  )`); save();
  _db.run(`CREATE TABLE IF NOT EXISTS escala_agentes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    escala_id INTEGER NOT NULL REFERENCES escalas(id) ON DELETE CASCADE,
    agente_id INTEGER NOT NULL REFERENCES agentes(id),
    UNIQUE(escala_id, agente_id)
  )`); save();
  _db.run(`CREATE TABLE IF NOT EXISTS escala_agente_dias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    escala_id INTEGER NOT NULL REFERENCES escalas(id) ON DELETE CASCADE,
    agente_id INTEGER NOT NULL REFERENCES agentes(id),
    data TEXT NOT NULL,
    tipo_dia TEXT,
    UNIQUE(escala_id, agente_id, data)
  )`); save();
  // Módulo Abastecimentos
  _db.run(`CREATE TABLE IF NOT EXISTS abastecimentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    viatura_id INTEGER NOT NULL REFERENCES viaturas(id),
    agente_id INTEGER NOT NULL REFERENCES agentes(id),
    data_abastecimento TEXT NOT NULL,
    km_atual INTEGER NOT NULL,
    litros REAL NOT NULL,
    valor_total REAL NOT NULL,
    tipo_combustivel TEXT NOT NULL DEFAULT 'Gasolina',
    posto TEXT,
    observacoes TEXT,
    km_anterior INTEGER,
    km_rodados INTEGER,
    consumo_medio REAL,
    custo_por_km REAL,
    criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime'))
  )`); save();
  // Módulo Operações
  _db.run(`CREATE TABLE IF NOT EXISTS operacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    data_operacao TEXT NOT NULL,
    horario TEXT,
    local_encontro TEXT,
    equipes TEXT,
    acao_conjunta INTEGER NOT NULL DEFAULT 0,
    orgaos_envolvidos TEXT,
    saldo_operacao TEXT,
    boletim_registro TEXT,
    observacoes TEXT,
    criado_por INTEGER REFERENCES agentes(id),
    criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime')),
    atualizado_em TEXT
  )`); save();
  // Módulo Permutas
  _db.run(`CREATE TABLE IF NOT EXISTS permutas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agente_solicitante_id INTEGER NOT NULL REFERENCES agentes(id),
    data_solicitante TEXT NOT NULL,
    turno_solicitante TEXT NOT NULL,
    agente_cedente_id INTEGER NOT NULL REFERENCES agentes(id),
    data_cedente TEXT NOT NULL,
    turno_cedente TEXT NOT NULL,
    motivo TEXT,
    status TEXT NOT NULL DEFAULT 'pendente_cedente',
    obs_cedente TEXT,
    obs_admin TEXT,
    aprovado_por INTEGER REFERENCES agentes(id),
    criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime')),
    atualizado_em TEXT
  )`); save();
  // Módulo Férias
  _db.run(`CREATE TABLE IF NOT EXISTS ferias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agente_id INTEGER NOT NULL REFERENCES agentes(id),
    setor TEXT,
    concurso INTEGER,
    mes_ferias INTEGER,
    ano_ferias INTEGER,
    periodo_aquisitivo_inicio INTEGER,
    periodo_aquisitivo_fim INTEGER,
    data_inicio TEXT,
    data_fim TEXT,
    qtd_dias INTEGER DEFAULT 30,
    exercicio INTEGER,
    fracionamento INTEGER DEFAULT 0,
    processo TEXT,
    opcao_definida TEXT,
    setor_programacao TEXT,
    data_inicio_periodo_aquisitivo TEXT,
    data_fim_periodo_aquisitivo TEXT,
    data_inicio_processo_concessivo TEXT,
    data_fim_processo_concessivo TEXT,
    periodo_prescricional TEXT,
    programacao TEXT,
    historico_alteracao TEXT,
    status_tramitacao TEXT DEFAULT 'Pendente',
    criado_em TEXT NOT NULL DEFAULT (datetime('now','localtime')),
    atualizado_em TEXT
  )`); save();
  return _db;
}

function rows(res) {
  if (!res || !res.length) return [];
  const { columns, values } = res[0];
  return values.map(r => {
    const o = {};
    columns.forEach((c, i) => { o[c] = r[i]; });
    return o;
  });
}

function n(sql) { return sql.replace(/\$(\d+)/g, '?'); }
function tbl(sql) { return (sql.match(/(?:INTO|UPDATE)\s+(\w+)/i) || [])[1]; }
function hasRet(sql) { return /RETURNING/i.test(sql); }
function noRet(sql) { return sql.replace(/\s+RETURNING.*$/is, ''); }

const pool = {
  query: async (sql, params = []) => {
    try {
      const db = await getDb();
      const q = n(sql);
      const t = q.trim().toUpperCase();
      const clean = hasRet(q) ? noRet(q) : q;

      if (t.startsWith('SELECT') || t.startsWith('WITH')) {
        return { rows: rows(db.exec(q, params)) };
      }
      if (t.startsWith('INSERT')) {
        db.run(clean, params);
        const id = db.exec('SELECT last_insert_rowid() as id')[0]?.values[0][0];
        save();
        if (hasRet(q) && id) {
          const tb = tbl(q);
          if (tb) return { rows: rows(db.exec('SELECT * FROM ' + tb + ' WHERE id = ?', [id])), lastInsertRowid: id };
        }
        return { rows: [], lastInsertRowid: id };
      }
      if (t.startsWith('UPDATE')) {
        db.run(clean, params);
        save();
        if (hasRet(q)) {
          const tb = tbl(q);
          const id = params[params.length - 1];
          if (tb && id) return { rows: rows(db.exec('SELECT * FROM ' + tb + ' WHERE id = ?', [id])) };
        }
        return { rows: [] };
      }
      db.run(clean, params);
      save();
      return { rows: [] };
    } catch (err) {
      if (err.message && err.message.includes('UNIQUE constraint failed')) err.code = '23505';
      throw err;
    }
  }
};

module.exports = { pool };

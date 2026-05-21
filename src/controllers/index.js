const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');
const { SECRET } = require('../middleware/auth');


// ── AUDITORIA HELPER
async function audit(pool, agente_id, modulo, acao, ip) {
  try {
    await pool.query(
      "INSERT INTO audit_logs (agente_id,modulo,acao,ip_origem) VALUES (?,?,?,?)",
      [agente_id || null, modulo, acao, ip || null]
    );
  } catch(e) { /* audit never breaks the main flow */ }
}

// AUTH
exports.login = async (req, res) => {
  try {
    const { funcional, senha } = req.body;
    if (!funcional || !senha) return res.status(400).json({ error: 'Funcional e senha obrigatorios' });
    const { rows } = await pool.query('SELECT * FROM agentes WHERE funcional=?', [funcional.trim()]); // includes permissoes_json
    if (!rows.length || !rows[0].ativo) return res.status(401).json({ error: 'Funcional ou senha incorretos' });
    if (!await bcrypt.compare(senha, rows[0].senha_hash)) return res.status(401).json({ error: 'Funcional ou senha incorretos' });
    const a = rows[0];
    const token = jwt.sign({ id: a.id, funcional: a.funcional, perfil: a.perfil }, SECRET, { expiresIn: '8h' });
    let perm = {};
    try { perm = JSON.parse(a.permissoes_json || '{}'); } catch {}
    await audit(pool, a.id, 'auth', 'LOGIN', req.ip);
    res.json({ token, agente: { id:a.id, nome:a.nome, qra:a.qra, funcional:a.funcional, setor:a.setor, letra:a.letra, perfil:a.perfil, permissoes: perm } });
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erro interno' }); }
};
exports.me = (req, res) => res.json({ agente: req.agente });
exports.trocarSenha = async (req, res) => {
  try {
    const { nova_senha } = req.body;
    if (!nova_senha || nova_senha.length < 6) return res.status(400).json({ error: 'Minimo 6 caracteres' });
    await pool.query('UPDATE agentes SET senha_hash=?,primeiro_acesso=0 WHERE id=?', [await bcrypt.hash(nova_senha, 10), req.agente.id]);
    res.json({ message: 'Senha alterada!' });
  } catch { res.status(500).json({ error: 'Erro' }); }
};

// DASHBOARD
exports.dashboard = async (req, res) => {
  try {
    // dashboard is admin-only (enforced by route middleware)
    const [vq, aq, amq, revq, eqq, ausq] = await Promise.all([
      pool.query("SELECT status, COUNT(*) as total FROM viaturas WHERE status!='baixada' GROUP BY status"),
      pool.query("SELECT COUNT(*) as total FROM agentes WHERE ativo=1"),
      pool.query("SELECT status, COUNT(*) as total FROM armamentos GROUP BY status"),
      pool.query("SELECT prefixo,placa,modelo,marca,km_atual,km_proxima_revisao, CASE WHEN km_atual>=km_proxima_revisao THEN 'VENCIDA' ELSE 'PROXIMA' END as situacao_revisao FROM viaturas WHERE status!='baixada' AND km_proxima_revisao IS NOT NULL AND km_atual>=km_proxima_revisao-1000"),
      pool.query(`SELECT se.*,v.prefixo as viatura_prefixo,v.placa as viatura_placa,
        m.nome as motorista_nome, c.nome as chefe_nome,
        p2.nome as patrulheiro2_nome, p3.nome as patrulheiro3_nome,
        ss.letra_equipe, ss.horario_inicio, sup.nome as supervisor_nome
        FROM supervisao_equipes se
        JOIN supervisao_servicos ss ON se.servico_id=ss.id
        JOIN agentes sup ON ss.supervisor_id=sup.id
        LEFT JOIN viaturas v ON se.viatura_id=v.id
        LEFT JOIN agentes m ON se.motorista_id=m.id
        LEFT JOIN agentes c ON se.chefe_guarnicao_id=c.id
        LEFT JOIN agentes p2 ON se.patrulheiro2_id=p2.id
        LEFT JOIN agentes p3 ON se.patrulheiro3_id=p3.id
        WHERE ss.status='aberto' AND date(ss.data_servico)=date('now','localtime')`),
      pool.query("SELECT id,nome,qra,funcional,setor,letra FROM agentes WHERE ativo=0 ORDER BY nome"),
    ]);
    const fm = {}; vq.rows.forEach(r => { fm[r.status] = r.total; });
    const am = {}; amq.rows.forEach(r => { am[r.status] = r.total; });
    const emServ = new Set(); eqq.rows.forEach(e => { if(e.motorista_id) emServ.add(e.motorista_id); });
    res.json({ data: {
      frota: { disponivel:fm.disponivel||0, cautelada:fm.cautelada||0, manutencao:fm.manutencao||0, total:Object.values(fm).reduce((a,b)=>a+b,0) },
      agentes: { total_ativos: aq.rows[0].total, em_servico_hoje: emServ.size },
      armamentos: { disponivel:am.disponivel||0, cautelado:am.cautelado||0 },
      equipes_em_operacao: eqq.rows,
      agentes_ausentes: ausq.rows,
      alertas_revisao: revq.rows,
      total_alertas_revisao: revq.rows.length,
    }});
  } catch (e) { console.error(e); res.status(500).json({ error: 'Erro no dashboard' }); }
};

// AGENTES
const AG_COLS = `id,nome,qra,funcional,setor,letra,subequipe,perfil,permissoes_json,ativo,
  numero,concurso,status_funcional,data_exoneracao,sexo,email_institucional,
  cpf,rg,rg_orgao,rg_estado,cnh_categoria,cnh_validade,cnh_numero,cnh_processo,
  contato_servidor,prazo_readaptacao,pcd,naturalidade,estado_nascimento,entrada_exercicio,
  romu,sangue,email_pessoal,nascimento,destro_canhoto,estado_civil,
  tem_filhos,quantidade_filhos,filiacao,escolaridade,graduacao,pos_graduacao,
  rua,bairro,cidade_residencia,emergencia1_nome,emergencia1_parentesco,emergencia1_telefone,
  emergencia2_nome,emergencia2_parentesco,emergencia2_telefone,
  plano_saude,alergias,condicao_medica,arquivo_nome,primeiro_acesso`;

exports.listarAgentes = async (req, res) => {
  try {
    const isRestrito = req.agente.perfil === 'restrito';
    if (isRestrito) {
      const { rows } = await pool.query('SELECT id,nome,funcional,setor,letra FROM agentes WHERE ativo=1 ORDER BY nome', []);
      return res.json({ data: rows });
    }
    let sql = `SELECT ${AG_COLS} FROM agentes WHERE 1=1`;
    const p = [];
    if (req.query.ativo !== undefined) { p.push(req.query.ativo==='true'?1:0); sql += ' AND ativo=?'; }
    if (req.query.setor) { p.push(req.query.setor); sql += ' AND setor=?'; }
    if (req.query.letra) { p.push(req.query.letra); sql += ' AND letra=?'; }
    if (req.query.perfil) { p.push(req.query.perfil); sql += ' AND perfil=?'; }
    if (req.query.busca) { p.push('%'+req.query.busca+'%'); p.push('%'+req.query.busca+'%'); p.push('%'+req.query.busca+'%'); sql += ' AND (nome LIKE ? OR funcional LIKE ? OR qra LIKE ?)'; }
    sql += ' ORDER BY nome';
    const { rows } = await pool.query(sql, p);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: 'Erro: '+e.message }); }
};
exports.criarAgente = async (req, res) => {
  try {
    const { nome, qra, funcional, setor, letra, subequipe, perfil, permissoes,
      numero, concurso, status_funcional, data_exoneracao, sexo, email_institucional,
      cpf, rg, rg_orgao, rg_estado, cnh_categoria, cnh_validade, cnh_numero, cnh_processo,
      contato_servidor, prazo_readaptacao, pcd, naturalidade, estado_nascimento, entrada_exercicio,
      romu, sangue, email_pessoal, nascimento, destro_canhoto, estado_civil,
      tem_filhos, quantidade_filhos, filiacao, escolaridade, graduacao, pos_graduacao,
      rua, bairro, cidade_residencia,
      emergencia1_nome, emergencia1_parentesco, emergencia1_telefone,
      emergencia2_nome, emergencia2_parentesco, emergencia2_telefone,
      plano_saude, alergias, condicao_medica, arquivo_nome, arquivo_b64 } = req.body;
    if (!nome||!funcional||!setor) return res.status(400).json({ error: 'Nome, funcional e setor obrigatorios' });
    const sd = funcional+'@Gcm';
    const permJson = JSON.stringify(permissoes || {});
    const sf = status_funcional || 'ativo';
    const ativo = sf === 'ativo' ? 1 : 0;
    const { rows } = await pool.query(
      `INSERT INTO agentes (nome,qra,funcional,setor,letra,subequipe,perfil,permissoes_json,senha_hash,ativo,
        numero,concurso,status_funcional,data_exoneracao,sexo,email_institucional,
        cpf,rg,rg_orgao,rg_estado,cnh_categoria,cnh_validade,cnh_numero,cnh_processo,
        contato_servidor,prazo_readaptacao,pcd,naturalidade,estado_nascimento,entrada_exercicio,
        romu,sangue,email_pessoal,nascimento,destro_canhoto,estado_civil,
        tem_filhos,quantidade_filhos,filiacao,escolaridade,graduacao,pos_graduacao,
        rua,bairro,cidade_residencia,emergencia1_nome,emergencia1_parentesco,emergencia1_telefone,
        emergencia2_nome,emergencia2_parentesco,emergencia2_telefone,
        plano_saude,alergias,condicao_medica,arquivo_nome,arquivo_b64)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) RETURNING *`,
      [nome, qra||null, funcional, setor, letra||null, subequipe||null, perfil||'restrito', permJson, await bcrypt.hash(sd, 10), ativo,
       numero||null, concurso||null, sf, data_exoneracao||null, sexo||null, email_institucional||null,
       cpf||null, rg||null, rg_orgao||null, rg_estado||null,
       cnh_categoria||null, cnh_validade||null, cnh_numero||null, cnh_processo||null,
       contato_servidor||null, prazo_readaptacao||null, pcd||0,
       naturalidade||null, estado_nascimento||null, entrada_exercicio||null,
       romu||null, sangue||null, email_pessoal||null, nascimento||null,
       destro_canhoto||null, estado_civil||null, tem_filhos||0, quantidade_filhos||null,
       filiacao||null, escolaridade||null, graduacao||null, pos_graduacao||null,
       rua||null, bairro||null, cidade_residencia||null,
       emergencia1_nome||null, emergencia1_parentesco||null, emergencia1_telefone||null,
       emergencia2_nome||null, emergencia2_parentesco||null, emergencia2_telefone||null,
       plano_saude||null, alergias||null, condicao_medica||null,
       arquivo_nome||null, arquivo_b64||null]);
    await audit(pool, req.agente.id, 'agentes', 'CREATE:'+funcional, req.ip);
    res.status(201).json({ data: rows[0], message: 'Agente criado! Senha inicial: '+sd });
  } catch (e) {
    if (e.code==='23505') return res.status(409).json({ error: 'Funcional ja cadastrada' });
    res.status(500).json({ error: 'Erro: '+e.message });
  }
};
exports.editarAgente = async (req, res) => {
  try {
    const { rows: cur } = await pool.query('SELECT * FROM agentes WHERE id=?', [req.params.id]);
    if (!cur.length) return res.status(404).json({ error: 'Nao encontrado' });
    const a = cur[0];
    const { nome, qra, setor, letra, subequipe, perfil, ativo, permissoes,
      numero, concurso, status_funcional, data_exoneracao, sexo, email_institucional,
      cpf, rg, rg_orgao, rg_estado, cnh_categoria, cnh_validade, cnh_numero, cnh_processo,
      contato_servidor, prazo_readaptacao, pcd, naturalidade, estado_nascimento, entrada_exercicio,
      romu, sangue, email_pessoal, nascimento, destro_canhoto, estado_civil,
      tem_filhos, quantidade_filhos, filiacao, escolaridade, graduacao, pos_graduacao,
      rua, bairro, cidade_residencia,
      emergencia1_nome, emergencia1_parentesco, emergencia1_telefone,
      emergencia2_nome, emergencia2_parentesco, emergencia2_telefone,
      plano_saude, alergias, condicao_medica, arquivo_nome, arquivo_b64 } = req.body;
    const sf = status_funcional || a.status_funcional || 'ativo';
    const ativoVal = ativo !== undefined ? (ativo ? 1 : 0) : (sf === 'ativo' ? 1 : 0);
    const permJson = permissoes !== undefined ? JSON.stringify(permissoes) : a.permissoes_json;
    await pool.query(
      `UPDATE agentes SET nome=?,qra=?,setor=?,letra=?,subequipe=?,perfil=?,permissoes_json=?,ativo=?,
        numero=?,concurso=?,status_funcional=?,data_exoneracao=?,sexo=?,email_institucional=?,
        cpf=?,rg=?,rg_orgao=?,rg_estado=?,cnh_categoria=?,cnh_validade=?,cnh_numero=?,cnh_processo=?,
        contato_servidor=?,prazo_readaptacao=?,pcd=?,naturalidade=?,estado_nascimento=?,entrada_exercicio=?,
        romu=?,sangue=?,email_pessoal=?,nascimento=?,destro_canhoto=?,estado_civil=?,
        tem_filhos=?,quantidade_filhos=?,filiacao=?,escolaridade=?,graduacao=?,pos_graduacao=?,
        rua=?,bairro=?,cidade_residencia=?,emergencia1_nome=?,emergencia1_parentesco=?,emergencia1_telefone=?,
        emergencia2_nome=?,emergencia2_parentesco=?,emergencia2_telefone=?,
        plano_saude=?,alergias=?,condicao_medica=?,
        arquivo_nome=?,arquivo_b64=COALESCE(?,arquivo_b64) WHERE id=?`,
      [nome||a.nome, qra!==undefined?qra:a.qra, setor||a.setor, letra!==undefined?letra:a.letra,
       subequipe!==undefined?subequipe:a.subequipe,
       perfil||a.perfil, permJson, ativoVal,
       numero!==undefined?numero:a.numero, concurso!==undefined?concurso:a.concurso,
       sf, data_exoneracao!==undefined?data_exoneracao:a.data_exoneracao,
       sexo!==undefined?sexo:a.sexo, email_institucional!==undefined?email_institucional:a.email_institucional,
       cpf!==undefined?cpf:a.cpf, rg!==undefined?rg:a.rg,
       rg_orgao!==undefined?rg_orgao:a.rg_orgao, rg_estado!==undefined?rg_estado:a.rg_estado,
       cnh_categoria!==undefined?cnh_categoria:a.cnh_categoria, cnh_validade!==undefined?cnh_validade:a.cnh_validade,
       cnh_numero!==undefined?cnh_numero:a.cnh_numero, cnh_processo!==undefined?cnh_processo:a.cnh_processo,
       contato_servidor!==undefined?contato_servidor:a.contato_servidor,
       prazo_readaptacao!==undefined?prazo_readaptacao:a.prazo_readaptacao,
       pcd!==undefined?pcd:a.pcd, naturalidade!==undefined?naturalidade:a.naturalidade,
       estado_nascimento!==undefined?estado_nascimento:a.estado_nascimento,
       entrada_exercicio!==undefined?entrada_exercicio:a.entrada_exercicio,
       romu!==undefined?romu:a.romu, sangue!==undefined?sangue:a.sangue,
       email_pessoal!==undefined?email_pessoal:a.email_pessoal, nascimento!==undefined?nascimento:a.nascimento,
       destro_canhoto!==undefined?destro_canhoto:a.destro_canhoto, estado_civil!==undefined?estado_civil:a.estado_civil,
       tem_filhos!==undefined?tem_filhos:a.tem_filhos, quantidade_filhos!==undefined?quantidade_filhos:a.quantidade_filhos,
       filiacao!==undefined?filiacao:a.filiacao, escolaridade!==undefined?escolaridade:a.escolaridade,
       graduacao!==undefined?graduacao:a.graduacao, pos_graduacao!==undefined?pos_graduacao:a.pos_graduacao,
       rua!==undefined?rua:a.rua, bairro!==undefined?bairro:a.bairro,
       cidade_residencia!==undefined?cidade_residencia:a.cidade_residencia,
       emergencia1_nome!==undefined?emergencia1_nome:a.emergencia1_nome,
       emergencia1_parentesco!==undefined?emergencia1_parentesco:a.emergencia1_parentesco,
       emergencia1_telefone!==undefined?emergencia1_telefone:a.emergencia1_telefone,
       emergencia2_nome!==undefined?emergencia2_nome:a.emergencia2_nome,
       emergencia2_parentesco!==undefined?emergencia2_parentesco:a.emergencia2_parentesco,
       emergencia2_telefone!==undefined?emergencia2_telefone:a.emergencia2_telefone,
       plano_saude!==undefined?plano_saude:a.plano_saude, alergias!==undefined?alergias:a.alergias,
       condicao_medica!==undefined?condicao_medica:a.condicao_medica,
       arquivo_nome!==undefined?arquivo_nome:a.arquivo_nome, arquivo_b64||null,
       req.params.id]);
    await audit(pool, req.agente.id, 'agentes', 'EDIT:'+req.params.id, req.ip);
    const { rows } = await pool.query(`SELECT ${AG_COLS} FROM agentes WHERE id=?`, [req.params.id]);
    res.json({ data: rows[0] });
  } catch(e) { res.status(500).json({ error: 'Erro: '+e.message }); }
};
exports.alterarSenha = async (req, res) => {
  try {
    const { nova_senha } = req.body;
    if (!nova_senha||nova_senha.length<6) return res.status(400).json({ error: 'Minimo 6 caracteres' });
    await pool.query('UPDATE agentes SET senha_hash=?,primeiro_acesso=0 WHERE id=?', [await bcrypt.hash(nova_senha,10), req.params.id]);
    await audit(pool, req.agente.id, 'agentes', 'SENHA:'+req.params.id, req.ip);
    res.json({ message: 'Senha alterada!' });
  } catch { res.status(500).json({ error: 'Erro' }); }
};
exports.resetarSenha = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT funcional FROM agentes WHERE id=?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Nao encontrado' });
    const sd = rows[0].funcional+'@Gcm';
    await pool.query('UPDATE agentes SET senha_hash=?,primeiro_acesso=1 WHERE id=?', [await bcrypt.hash(sd,10), req.params.id]);
    res.json({ message: 'Senha resetada para: '+sd });
  } catch { res.status(500).json({ error: 'Erro' }); }
};

// ARMARIA
exports.listarArmamentos = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT a.*,ag.nome as agente_nome FROM armamentos a LEFT JOIN agentes ag ON a.agente_cautela_id=ag.id ORDER BY a.tipo,a.numero_serie');
    res.json({ data: rows });
  } catch { res.status(500).json({ error: 'Erro' }); }
};
exports.criarArmamento = async (req, res) => {
  try {
    const { tipo, marca, modelo, numero_serie, calibre, capacidade, orgao_proprietario, data_aquisicao, cofre, ultima_inspecao, armeiro, observacoes, quantidade } = req.body;
    if (!tipo||!numero_serie) return res.status(400).json({ error: 'Tipo e serie obrigatorios' });
    const { rows } = await pool.query(
      'INSERT INTO armamentos (tipo,marca,modelo,numero_serie,calibre,capacidade,orgao_proprietario,data_aquisicao,cofre,ultima_inspecao,armeiro,observacoes,quantidade) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?) RETURNING *',
      [tipo,marca||null,modelo||null,numero_serie,calibre||null,capacidade||null,orgao_proprietario||null,data_aquisicao||null,cofre||'operacional',ultima_inspecao||null,armeiro||null,observacoes||null,parseInt(quantidade)||1]);
    res.status(201).json({ data: rows[0] });
  } catch (e) {
    if (e.code==='23505') return res.status(409).json({ error: 'Serie ja cadastrada' });
    res.status(500).json({ error: 'Erro' });
  }
};
exports.editarArmamento = async (req, res) => {
  try {
    const { rows: cur } = await pool.query('SELECT * FROM armamentos WHERE id=?', [req.params.id]);
    if (!cur.length) return res.status(404).json({ error: 'Nao encontrado' });
    const arm = cur[0];
    const { tipo, marca, modelo, numero_serie, calibre, status, observacoes, capacidade, orgao_proprietario, data_aquisicao, cofre, ultima_inspecao, armeiro, quantidade } = req.body;
    await pool.query('UPDATE armamentos SET tipo=?,marca=?,modelo=?,numero_serie=?,calibre=?,status=?,observacoes=?,capacidade=?,orgao_proprietario=?,data_aquisicao=?,cofre=?,ultima_inspecao=?,armeiro=?,quantidade=? WHERE id=?',
      [tipo||arm.tipo, marca!==undefined?marca:arm.marca, modelo!==undefined?modelo:arm.modelo,
       numero_serie||arm.numero_serie, calibre!==undefined?calibre:arm.calibre,
       status||arm.status, observacoes!==undefined?observacoes:arm.observacoes,
       capacidade!==undefined?capacidade:arm.capacidade, orgao_proprietario!==undefined?orgao_proprietario:arm.orgao_proprietario,
       data_aquisicao!==undefined?data_aquisicao:arm.data_aquisicao, cofre||arm.cofre||'operacional',
       ultima_inspecao!==undefined?ultima_inspecao:arm.ultima_inspecao, armeiro!==undefined?armeiro:arm.armeiro,
       quantidade!==undefined?parseInt(quantidade)||1:arm.quantidade||1,
       req.params.id]);
    const { rows } = await pool.query('SELECT * FROM armamentos WHERE id=?', [req.params.id]);
    res.json({ data: rows[0] });
  } catch { res.status(500).json({ error: 'Erro' }); }
};
exports.excluirArmamento = async (req, res) => {
  try {
    await pool.query('DELETE FROM armamentos WHERE id=?', [req.params.id]);
    res.json({ message: 'Armamento removido!' });
  } catch { res.status(500).json({ error: 'Erro' }); }
};
exports.listarEstoque = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT *,
        CASE WHEN quantidade_atual<=quantidade_minima THEN 1 ELSE 0 END as alerta_minimo,
        CASE WHEN data_vencimento IS NOT NULL AND data_vencimento <= date('now','+30 days') AND data_vencimento >= date('now') THEN 1 ELSE 0 END as alerta_vencimento,
        CASE WHEN data_vencimento IS NOT NULL AND data_vencimento < date('now') THEN 1 ELSE 0 END as vencida
      FROM municoes_estoque ORDER BY calibre,cofre`);
    res.json({ data: rows });
  } catch { res.status(500).json({ error: 'Erro' }); }
};
exports.registrarMovimentacao = async (req, res) => {
  try {
    const { municao_id, tipo_movimentacao, motivo_entrada, motivo_saida, quantidade, agente_id, documento_ref, observacoes } = req.body;
    if (!municao_id||!tipo_movimentacao||!quantidade) return res.status(400).json({ error: 'Preencha todos os campos obrigatorios' });
    const qtd = parseInt(quantidade);
    if (isNaN(qtd)||qtd<=0) return res.status(400).json({ error: 'Quantidade invalida' });
    const { rows: est } = await pool.query('SELECT quantidade_atual FROM municoes_estoque WHERE id=?', [municao_id]);
    if (!est.length) return res.status(404).json({ error: 'Municao nao encontrada' });
    const novo = tipo_movimentacao==='entrada' ? est[0].quantidade_atual+qtd : est[0].quantidade_atual-qtd;
    if (novo<0) return res.status(400).json({ error: 'Saldo insuficiente' });
    await pool.query('UPDATE municoes_estoque SET quantidade_atual=? WHERE id=?', [novo, municao_id]);
    await pool.query('INSERT INTO municoes_movimentacoes (municao_id,tipo_movimentacao,motivo_entrada,motivo_saida,quantidade,agente_id,gestor_id,documento_ref,observacoes) VALUES (?,?,?,?,?,?,?,?,?)',
      [municao_id,tipo_movimentacao,motivo_entrada||null,motivo_saida||null,qtd,agente_id||null,req.agente.id,documento_ref||null,observacoes||null]);
    await audit(pool, req.agente.id, 'armaria', tipo_movimentacao.toUpperCase()+':'+qtd+'x_cal'+municao_id, req.ip);
    res.status(201).json({ message: 'Movimentacao registrada!', saldo_atual: novo });
  } catch (e) { console.error(e); res.status(500).json({ error: e.message||'Erro' }); }
};
exports.listarMovimentacoes = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT mm.*,me.calibre,me.tipo as tipo_municao,me.cofre,me.deposito as deposito_tipo,a.nome as agente_nome,g.nome as gestor_nome FROM municoes_movimentacoes mm JOIN municoes_estoque me ON mm.municao_id=me.id LEFT JOIN agentes a ON mm.agente_id=a.id JOIN agentes g ON mm.gestor_id=g.id ORDER BY mm.criado_em DESC LIMIT 200');
    res.json({ data: rows });
  } catch { res.status(500).json({ error: 'Erro' }); }
};

// ALMOXARIFADO
exports.listarItens = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT ai.*,ag.nome as responsavel_nome FROM almoxarifado_itens ai LEFT JOIN agentes ag ON ai.responsavel_id=ag.id ORDER BY ai.nome');
    res.json({ data: rows });
  } catch { res.status(500).json({ error: 'Erro' }); }
};
exports.criarItem = async (req, res) => {
  try {
    const { nome, categoria, codigo, quantidade, numero_patrimonio, condicao, setor_atual, observacoes, data_validade } = req.body;
    if (!nome||!numero_patrimonio||!setor_atual) return res.status(400).json({ error: 'Nome, patrimonio e setor obrigatorios' });
    const { rows } = await pool.query('INSERT INTO almoxarifado_itens (nome,categoria,codigo,quantidade,numero_patrimonio,condicao,setor_atual,observacoes,data_validade) VALUES (?,?,?,?,?,?,?,?,?) RETURNING *',
      [nome,categoria||null,codigo||null,quantidade||1,numero_patrimonio,condicao||'bom',setor_atual,observacoes||null,data_validade||null]);
    res.status(201).json({ data: rows[0] });
  } catch (e) {
    if (e.code==='23505') return res.status(409).json({ error: 'Patrimonio ja cadastrado' });
    res.status(500).json({ error: 'Erro' });
  }
};
exports.editarItem = async (req, res) => {
  try {
    const { rows: cur } = await pool.query('SELECT * FROM almoxarifado_itens WHERE id=?', [req.params.id]);
    if (!cur.length) return res.status(404).json({ error: 'Nao encontrado' });
    const it = cur[0];
    const { nome, categoria, codigo, quantidade, condicao, setor_atual, observacoes, data_validade } = req.body;
    await pool.query('UPDATE almoxarifado_itens SET nome=?,categoria=?,codigo=?,quantidade=?,condicao=?,setor_atual=?,observacoes=?,data_validade=? WHERE id=?',
      [nome||it.nome, categoria!==undefined?categoria:it.categoria, codigo!==undefined?codigo:it.codigo,
       quantidade!==undefined?parseInt(quantidade):it.quantidade, condicao||it.condicao,
       setor_atual||it.setor_atual, observacoes!==undefined?observacoes:it.observacoes,
       data_validade!==undefined?data_validade:it.data_validade, req.params.id]);
    const { rows } = await pool.query('SELECT * FROM almoxarifado_itens WHERE id=?', [req.params.id]);
    res.json({ data: rows[0] });
  } catch { res.status(500).json({ error: 'Erro' }); }
};
exports.movimentarItem = async (req, res) => {
  try {
    const { item_id, para_setor, agente_id, tipo, observacoes, motivo, data_prev_devolucao, quantidade } = req.body;
    if (!item_id||!tipo) return res.status(400).json({ error: 'Item e tipo obrigatorios' });
    const { rows: it } = await pool.query('SELECT * FROM almoxarifado_itens WHERE id=?', [item_id]);
    if (!it.length) return res.status(404).json({ error: 'Item nao encontrado' });
    const st = tipo==='cautela'?'cautelado':tipo==='devolucao'?'ativo':tipo==='baixa'?'baixado':tipo==='entrada'?'ativo':it[0].status;
    const ns = para_setor||it[0].setor_atual;
    const nr = tipo==='devolucao'?null:(agente_id||null);
    // Se for entrada, soma a quantidade ao saldo atual
    if (tipo === 'entrada' && quantidade && parseInt(quantidade) > 0) {
      const novaQtd = (it[0].quantidade || 0) + parseInt(quantidade);
      await pool.query('UPDATE almoxarifado_itens SET setor_atual=?,responsavel_id=?,status=?,quantidade=? WHERE id=?',[ns,nr,st,novaQtd,item_id]);
    } else {
      await pool.query('UPDATE almoxarifado_itens SET setor_atual=?,responsavel_id=?,status=? WHERE id=?',[ns,nr,st,item_id]);
    }
    await pool.query('INSERT INTO almoxarifado_movimentacoes (item_id,de_setor,para_setor,agente_id,gestor_id,tipo,observacoes,motivo,quantidade,data_prev_devolucao) VALUES (?,?,?,?,?,?,?,?,?,?)',
      [item_id,it[0].setor_atual,ns,agente_id||null,req.agente.id,tipo,observacoes||null,motivo||null,quantidade?parseInt(quantidade):null,data_prev_devolucao||null]);
    await audit(pool, req.agente.id, 'almoxarifado', tipo.toUpperCase()+':item'+item_id, req.ip);
    const { rows: updated } = await pool.query('SELECT quantidade FROM almoxarifado_itens WHERE id=?', [item_id]);
    res.json({ message: 'Movimentacao registrada!', saldo_atual: updated[0]?.quantidade });
  } catch (e) { console.error(e); res.status(500).json({ error: e.message||'Erro' }); }
};

// FROTA
exports.listarViaturas = async (req, res) => {
  try {
    let sql = 'SELECT v.*,ag.nome as motorista_nome,cv.id as cautela_id FROM viaturas v LEFT JOIN cautelas_viaturas cv ON cv.viatura_id=v.id AND cv.data_descautela IS NULL LEFT JOIN agentes ag ON cv.motorista_id=ag.id WHERE 1=1';
    const p = [];
    if (req.query.status) { p.push(req.query.status); sql+=' AND v.status=?'; }
    if (req.query.setor) { p.push(req.query.setor); sql+=' AND v.setor=?'; }
    sql+=' ORDER BY v.prefixo';
    const { rows } = await pool.query(sql, p);
    res.json({ data: rows });
  } catch { res.status(500).json({ error: 'Erro' }); }
};
exports.criarViatura = async (req, res) => {
  try {
    const { prefixo,placa,tipo,marca,modelo,ano,cor,km_atual,setor,km_proxima_revisao,tipo_combustivel } = req.body;
    if (!prefixo||!placa) return res.status(400).json({ error: 'Prefixo e placa obrigatorios' });
    const { rows } = await pool.query('INSERT INTO viaturas (prefixo,placa,tipo,marca,modelo,ano,cor,km_atual,setor,km_proxima_revisao,tipo_combustivel) VALUES (?,?,?,?,?,?,?,?,?,?,?) RETURNING *',
      [prefixo,placa,tipo||null,marca||null,modelo||null,ano||null,cor||null,km_atual||0,setor||null,km_proxima_revisao||null,tipo_combustivel||'Diesel']);
    res.status(201).json({ data: rows[0] });
  } catch (e) {
    if (e.code==='23505') return res.status(409).json({ error: 'Prefixo ou placa ja cadastrados' });
    res.status(500).json({ error: 'Erro' });
  }
};
exports.editarViatura = async (req, res) => {
  try {
    const { rows: cur } = await pool.query('SELECT * FROM viaturas WHERE id=?', [req.params.id]);
    if (!cur.length) return res.status(404).json({ error: 'Nao encontrada' });
    const v = cur[0];
    const { prefixo,placa,marca,modelo,ano,cor,setor,km_proxima_revisao,tipo_combustivel,status,km_atual,observacoes } = req.body;
    await pool.query('UPDATE viaturas SET prefixo=?,placa=?,marca=?,modelo=?,ano=?,cor=?,setor=?,km_proxima_revisao=?,tipo_combustivel=?,status=?,km_atual=?,observacoes=? WHERE id=?',
      [prefixo||v.prefixo,placa||v.placa,marca||v.marca,modelo||v.modelo,ano||v.ano,cor||v.cor,setor||v.setor,
       km_proxima_revisao!==undefined?km_proxima_revisao:v.km_proxima_revisao,
       tipo_combustivel||v.tipo_combustivel,status||v.status,km_atual!==undefined?km_atual:v.km_atual,
       observacoes!==undefined?observacoes:v.observacoes, req.params.id]);
    const { rows } = await pool.query('SELECT * FROM viaturas WHERE id=?', [req.params.id]);
    res.json({ data: rows[0] });
  } catch { res.status(500).json({ error: 'Erro' }); }
};
exports.enviarManutencao = async (req, res) => {
  try {
    const { viatura_id,oficina,numero_os,data_envio,previsao_retorno,descricao } = req.body;
    if (!viatura_id||!oficina||!numero_os) return res.status(400).json({ error: 'Viatura, oficina e OS obrigatorios' });
    const obs = 'OS:'+numero_os+' | Oficina:'+oficina+(data_envio?' | Envio:'+data_envio:'')+(previsao_retorno?' | Retorno prev.:'+previsao_retorno:'')+(descricao?' | '+descricao:'');
    await pool.query("UPDATE viaturas SET status='manutencao',observacoes=? WHERE id=?",[obs,viatura_id]);
    await audit(pool, req.agente.id, 'frota', 'MANUTENCAO:vt'+viatura_id, req.ip);
    res.json({ message: 'Enviada para manutencao!' });
  } catch { res.status(500).json({ error: 'Erro' }); }
};
exports.retornoManutencao = async (req, res) => {
  try {
    const { km_atual, observacoes } = req.body;
    await pool.query("UPDATE viaturas SET status='disponivel',km_atual=COALESCE(?,km_atual),observacoes=? WHERE id=?",
      [km_atual||null,observacoes||'',req.params.id]);
    res.json({ message: 'Viatura disponivel!' });
  } catch { res.status(500).json({ error: 'Erro' }); }
};
exports.abrirCautela = async (req, res) => {
  try {
    const { viatura_id,chefe_id,km_inicial,nivel_combustivel_inicial,checklist_json } = req.body;
    if (!viatura_id||!km_inicial||!nivel_combustivel_inicial) return res.status(400).json({ error: 'Preencha todos os campos' });
    const { rows: v } = await pool.query('SELECT * FROM viaturas WHERE id=?',[viatura_id]);
    if (!v.length) return res.status(404).json({ error: 'Viatura nao encontrada' });
    if (v[0].status!=='disponivel') return res.status(400).json({ error: 'Viatura nao disponivel' });
    const { rows } = await pool.query('INSERT INTO cautelas_viaturas (viatura_id,motorista_id,chefe_id,km_inicial,nivel_combustivel_inicial,checklist_json) VALUES (?,?,?,?,?,?) RETURNING *',
      [viatura_id,req.agente.id,chefe_id||null,km_inicial,nivel_combustivel_inicial,JSON.stringify(checklist_json||{})]);
    await pool.query("UPDATE viaturas SET status='cautelada',km_atual=? WHERE id=?",[km_inicial,viatura_id]);
    await audit(pool, req.agente.id, 'frota', 'CAUTELA:vt'+viatura_id, req.ip);
    res.status(201).json({ data: rows[0] });
  } catch (e) { console.error(e); res.status(500).json({ error: e.message||'Erro' }); }
};
exports.encerrarCautela = async (req, res) => {
  try {
    const { km_final,nivel_combustivel_final,observacoes_retorno } = req.body;
    const { rows: c } = await pool.query('SELECT * FROM cautelas_viaturas WHERE id=? AND data_descautela IS NULL',[req.params.id]);
    if (!c.length) return res.status(404).json({ error: 'Cautela nao encontrada ou ja encerrada' });
    await pool.query("UPDATE cautelas_viaturas SET data_descautela=datetime('now','localtime'),km_final=?,nivel_combustivel_final=?,observacoes_retorno=? WHERE id=?",
      [km_final,nivel_combustivel_final,observacoes_retorno,req.params.id]);
    await pool.query("UPDATE viaturas SET status='disponivel',km_atual=? WHERE id=?",[km_final,c[0].viatura_id]);
    await audit(pool, req.agente.id, 'frota', 'DESCAUTELA:vt'+c[0].viatura_id, req.ip);
    res.json({ message: 'Descautela registrada!' });
  } catch { res.status(500).json({ error: 'Erro' }); }
};
exports.listarCautelasAtivas = async (req, res) => {
  try {
    const { rows } = await pool.query(`SELECT cv.*,v.prefixo,v.placa,v.modelo,m.nome as motorista_nome,m.funcional as motorista_funcional
      FROM cautelas_viaturas cv JOIN viaturas v ON cv.viatura_id=v.id JOIN agentes m ON cv.motorista_id=m.id
      WHERE cv.data_descautela IS NULL ORDER BY cv.data_cautela DESC`);
    res.json({ data: rows });
  } catch { res.status(500).json({ error: 'Erro' }); }
};
exports.historicoViatura = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT cv.*,m.nome as motorista_nome,m.funcional as motorista_funcional,v.prefixo FROM cautelas_viaturas cv JOIN agentes m ON cv.motorista_id=m.id JOIN viaturas v ON cv.viatura_id=v.id WHERE cv.viatura_id=? ORDER BY cv.data_cautela DESC LIMIT 50',[req.params.id]);
    res.json({ data: rows });
  } catch { res.status(500).json({ error: 'Erro' }); }
};

// SUPERVISAO
exports.listarServicos = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT ss.*,ag.nome as supervisor_nome,(SELECT COUNT(*) FROM supervisao_equipes se WHERE se.servico_id=ss.id) as total_equipes FROM supervisao_servicos ss JOIN agentes ag ON ss.supervisor_id=ag.id ORDER BY ss.data_servico DESC,ss.criado_em DESC LIMIT 100');
    res.json({ data: rows });
  } catch { res.status(500).json({ error: 'Erro' }); }
};
exports.abrirServico = async (req, res) => {
  try {
    const { letra_equipe,data_servico,horario_inicio } = req.body;
    if (!letra_equipe||!data_servico||!horario_inicio) return res.status(400).json({ error: 'Preencha todos os campos' });
    const { rows } = await pool.query('INSERT INTO supervisao_servicos (supervisor_id,letra_equipe,data_servico,horario_inicio) VALUES (?,?,?,?) RETURNING *',
      [req.agente.id,letra_equipe,data_servico,horario_inicio]);
    await audit(pool, req.agente.id, 'supervisao', 'ABRIR_SERVICO:eq'+letra_equipe+'_'+data_servico, req.ip);
    res.status(201).json({ data: rows[0] });
  } catch (e) { res.status(500).json({ error: e.message||'Erro ao abrir servico' }); }
};
exports.buscarServico = async (req, res) => {
  try {
    const { rows: s } = await pool.query('SELECT ss.*,ag.nome as supervisor_nome FROM supervisao_servicos ss JOIN agentes ag ON ss.supervisor_id=ag.id WHERE ss.id=?',[req.params.id]);
    if (!s.length) return res.status(404).json({ error: 'Nao encontrado' });
    const { rows: eq } = await pool.query(`SELECT se.*,v.prefixo as vp,v.placa,m.nome as mn,m.funcional as mf,c.nome as cn,p2.nome as p2n,p3.nome as p3n
      FROM supervisao_equipes se LEFT JOIN viaturas v ON se.viatura_id=v.id
      LEFT JOIN agentes m ON se.motorista_id=m.id LEFT JOIN agentes c ON se.chefe_guarnicao_id=c.id
      LEFT JOIN agentes p2 ON se.patrulheiro2_id=p2.id LEFT JOIN agentes p3 ON se.patrulheiro3_id=p3.id
      WHERE se.servico_id=? ORDER BY se.id`,[req.params.id]);
    res.json({ data: { servico: s[0], equipes: eq } });
  } catch { res.status(500).json({ error: 'Erro' }); }
};
exports.adicionarEquipe = async (req, res) => {
  try {
    const { viatura_id,motorista_id,chefe_guarnicao_id,patrulheiro2_id,patrulheiro3_id,numero_radio,setor_patrulhamento,demandas } = req.body;
    const { rows } = await pool.query('INSERT INTO supervisao_equipes (servico_id,viatura_id,motorista_id,chefe_guarnicao_id,patrulheiro2_id,patrulheiro3_id,numero_radio,setor_patrulhamento,demandas) VALUES (?,?,?,?,?,?,?,?,?) RETURNING *',
      [req.params.id,viatura_id||null,motorista_id||null,chefe_guarnicao_id||null,patrulheiro2_id||null,patrulheiro3_id||null,numero_radio||null,setor_patrulhamento||null,demandas||null]);
    res.status(201).json({ data: rows[0] });
  } catch { res.status(500).json({ error: 'Erro' }); }
};
exports.salvarObs = async (req, res) => {
  try {
    const { ocorrencias,alteracoes,intercorrencias } = req.body;
    await pool.query('UPDATE supervisao_servicos SET ocorrencias=?,alteracoes=?,intercorrencias=? WHERE id=?',
      [ocorrencias||null,alteracoes||null,intercorrencias||null,req.params.id]);
    res.json({ message: 'Salvo!' });
  } catch { res.status(500).json({ error: 'Erro' }); }
};
exports.encerrarServico = async (req, res) => {
  try {
    const { horario_fim } = req.body;
    await pool.query("UPDATE supervisao_servicos SET status='encerrado',horario_fim=?,encerrado_em=datetime('now','localtime') WHERE id=? AND status='aberto'",
      [horario_fim||null,req.params.id]);
    await audit(pool, req.agente.id, 'supervisao', 'ENCERRAR_SERVICO:'+req.params.id, req.ip);
    res.json({ message: 'Encerrado!' });
  } catch { res.status(500).json({ error: 'Erro' }); }
};

// AUDITORIA
// ── ESCALAS
exports.listarEscalas = async (req, res) => {
  try {
    const { mes_ano, tipo, equipe } = req.query;
    let sql = `SELECT e.*, ag.nome as gestor_nome,
      (SELECT COUNT(*) FROM escala_agentes ea WHERE ea.escala_id=e.id) as total_agentes,
      (SELECT COUNT(*) FROM escala_dias ed WHERE ed.escala_id=e.id) as total_dias
      FROM escalas e JOIN agentes ag ON e.gestor_id=ag.id WHERE 1=1`;
    const p = [];
    if (mes_ano) { sql += ' AND e.mes_ano=?'; p.push(mes_ano); }
    if (tipo) { sql += ' AND e.tipo=?'; p.push(tipo); }
    if (equipe) { sql += ' AND e.equipe=?'; p.push(equipe); }
    sql += ' ORDER BY e.criado_em DESC';
    const { rows } = await pool.query(sql, p);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.criarEscala = async (req, res) => {
  try {
    const { tipo, nome, mes_ano, equipe, subequipe, setor,
      horario_diurno_inicio, horario_diurno_fim,
      horario_noturno_inicio, horario_noturno_fim } = req.body;
    if (!mes_ano) return res.status(400).json({ error: 'Mes/ano obrigatorio' });
    if (tipo === 'especial' && !nome) return res.status(400).json({ error: 'Nome obrigatorio para escala especial' });
    const { rows } = await pool.query(
      `INSERT INTO escalas (tipo,nome,mes_ano,equipe,subequipe,setor,horario_diurno_inicio,horario_diurno_fim,horario_noturno_inicio,horario_noturno_fim,gestor_id)
       VALUES (?,?,?,?,?,?,?,?,?,?,?) RETURNING *`,
      [tipo||'ordinaria', nome||null, mes_ano, equipe||null, subequipe||null, setor||null,
       horario_diurno_inicio||null, horario_diurno_fim||null,
       horario_noturno_inicio||null, horario_noturno_fim||null, req.agente.id]);
    await audit(pool, req.agente.id, 'escalas', 'CRIAR_ESCALA:'+mes_ano, req.ip);
    res.status(201).json({ data: rows[0] });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.buscarEscala = async (req, res) => {
  try {
    const { rows: esc } = await pool.query(
      `SELECT e.*, ag.nome as gestor_nome FROM escalas e JOIN agentes ag ON e.gestor_id=ag.id WHERE e.id=?`,
      [req.params.id]);
    if (!esc.length) return res.status(404).json({ error: 'Nao encontrada' });
    const { rows: dias } = await pool.query('SELECT * FROM escala_dias WHERE escala_id=? ORDER BY data', [req.params.id]);
    const { rows: agentes } = await pool.query(
      `SELECT ea.agente_id, ag.nome, ag.funcional, ag.qra, ag.setor, ag.subequipe, ag.letra, ag.status_funcional
       FROM escala_agentes ea JOIN agentes ag ON ea.agente_id=ag.id WHERE ea.escala_id=? ORDER BY ag.nome`,
      [req.params.id]);
    const { rows: agDias } = await pool.query(
      'SELECT * FROM escala_agente_dias WHERE escala_id=? ORDER BY agente_id, data',
      [req.params.id]);
    res.json({ data: { escala: esc[0], dias, agentes, agente_dias: agDias } });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.editarEscala = async (req, res) => {
  try {
    const { nome, equipe, subequipe, setor,
      horario_diurno_inicio, horario_diurno_fim,
      horario_noturno_inicio, horario_noturno_fim } = req.body;
    await pool.query(
      `UPDATE escalas SET nome=?,equipe=?,subequipe=?,setor=?,
       horario_diurno_inicio=?,horario_diurno_fim=?,horario_noturno_inicio=?,horario_noturno_fim=?
       WHERE id=?`,
      [nome||null, equipe||null, subequipe||null, setor||null,
       horario_diurno_inicio||null, horario_diurno_fim||null,
       horario_noturno_inicio||null, horario_noturno_fim||null, req.params.id]);
    res.json({ message: 'Atualizada!' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.excluirEscala = async (req, res) => {
  try {
    await pool.query('DELETE FROM escala_agente_dias WHERE escala_id=?', [req.params.id]);
    await pool.query('DELETE FROM escala_agentes WHERE escala_id=?', [req.params.id]);
    await pool.query('DELETE FROM escala_dias WHERE escala_id=?', [req.params.id]);
    await pool.query('DELETE FROM escalas WHERE id=?', [req.params.id]);
    res.json({ message: 'Removida!' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.salvarDiasEscala = async (req, res) => {
  try {
    const { dias } = req.body; // [{data, tipo_dia}]
    await pool.query('DELETE FROM escala_dias WHERE escala_id=?', [req.params.id]);
    for (const d of (dias||[])) {
      if (d.data && d.tipo_dia) {
        try { await pool.query('INSERT INTO escala_dias (escala_id,data,tipo_dia) VALUES (?,?,?)', [req.params.id, d.data, d.tipo_dia]); } catch(e) {}
      }
    }
    res.json({ message: 'Dias salvos!' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.aplicarAgentes = async (req, res) => {
  try {
    const { agente_ids } = req.body; // array of agente IDs
    if (!agente_ids || !agente_ids.length) return res.status(400).json({ error: 'Nenhum agente informado' });
    for (const aid of agente_ids) {
      try { await pool.query('INSERT OR IGNORE INTO escala_agentes (escala_id,agente_id) VALUES (?,?)', [req.params.id, aid]); } catch(e) {}
    }
    await audit(pool, req.agente.id, 'escalas', 'APLICAR_AGENTES:escala'+req.params.id+':'+agente_ids.length+'agentes', req.ip);
    res.json({ message: agente_ids.length + ' agente(s) vinculados!' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.removerAgente = async (req, res) => {
  try {
    await pool.query('DELETE FROM escala_agentes WHERE escala_id=? AND agente_id=?', [req.params.id, req.params.agId]);
    await pool.query('DELETE FROM escala_agente_dias WHERE escala_id=? AND agente_id=?', [req.params.id, req.params.agId]);
    res.json({ message: 'Agente removido da escala!' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.salvarDiasAgente = async (req, res) => {
  try {
    const { dias } = req.body; // [{data, tipo_dia}] — tipo_dia null = folga override
    await pool.query('DELETE FROM escala_agente_dias WHERE escala_id=? AND agente_id=?', [req.params.id, req.params.agId]);
    for (const d of (dias||[])) {
      if (d.data) {
        try { await pool.query('INSERT OR IGNORE INTO escala_agente_dias (escala_id,agente_id,data,tipo_dia) VALUES (?,?,?,?)',
          [req.params.id, req.params.agId, d.data, d.tipo_dia||null]); } catch(e) {}
      }
    }
    res.json({ message: 'Ajuste salvo!' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.minhaEscala = async (req, res) => {
  try {
    const { mes_ano } = req.query;
    const agId = req.agente.id;
    const { rows: vinculos } = await pool.query(
      `SELECT e.*, ag.nome as gestor_nome FROM escala_agentes ea
       JOIN escalas e ON ea.escala_id=e.id JOIN agentes ag ON e.gestor_id=ag.id
       WHERE ea.agente_id=? AND e.mes_ano=? ORDER BY e.tipo, e.criado_em`,
      [agId, mes_ano || new Date().toISOString().slice(0,7).replace('-','/')]);
    const result = [];
    for (const esc of vinculos) {
      const { rows: dias } = await pool.query('SELECT * FROM escala_dias WHERE escala_id=? ORDER BY data', [esc.id]);
      const { rows: agDias } = await pool.query('SELECT * FROM escala_agente_dias WHERE escala_id=? AND agente_id=? ORDER BY data', [esc.id, agId]);
      result.push({ escala: esc, dias, agente_dias: agDias });
    }
    res.json({ data: result });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

// ── FÉRIAS ──────────────────────────────────────────────────────────────────
exports.listarFerias = async (req, res) => {
  try {
    const { setor, letra, subequipe, ano_ferias, mes_ferias, status, agente_id, periodo_aquisitivo_inicio } = req.query;
    let sql = `SELECT f.*, a.nome as agente_nome, a.qra, a.funcional, a.setor as agente_setor,
                      a.letra, a.subequipe, a.concurso as agente_concurso
               FROM ferias f JOIN agentes a ON f.agente_id=a.id WHERE a.ativo=1`;
    const p = [];
    if (agente_id)               { p.push(agente_id);              sql += ' AND f.agente_id=?'; }
    if (setor)                   { p.push(setor);                  sql += ' AND (f.setor=? OR a.setor=?)'; p.push(setor); }
    if (letra)                   { p.push(letra);                  sql += ' AND a.letra=?'; }
    if (subequipe)               { p.push('%'+subequipe+'%');      sql += ' AND a.subequipe LIKE ?'; }
    if (ano_ferias)              { p.push(parseInt(ano_ferias));   sql += ' AND f.ano_ferias=?'; }
    if (mes_ferias)              { p.push(parseInt(mes_ferias));   sql += ' AND f.mes_ferias=?'; }
    if (status)                  { p.push('%'+status+'%');         sql += ' AND f.status_tramitacao LIKE ?'; }
    if (periodo_aquisitivo_inicio){ p.push(parseInt(periodo_aquisitivo_inicio)); sql += ' AND f.periodo_aquisitivo_inicio=?'; }
    sql += ' ORDER BY a.setor, a.letra, a.nome';
    const { rows } = await pool.query(sql, p);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.criarFerias = async (req, res) => {
  try {
    const { agente_id, setor, concurso, mes_ferias, ano_ferias, periodo_aquisitivo_inicio, periodo_aquisitivo_fim,
            data_inicio, data_fim, qtd_dias, exercicio, fracionamento, processo, opcao_definida, setor_programacao,
            data_inicio_periodo_aquisitivo, data_fim_periodo_aquisitivo,
            data_inicio_processo_concessivo, data_fim_processo_concessivo,
            periodo_prescricional, programacao, historico_alteracao, status_tramitacao } = req.body;
    if (!agente_id) return res.status(400).json({ error: 'agente_id obrigatorio' });
    const { rows } = await pool.query(
      `INSERT INTO ferias (agente_id,setor,concurso,mes_ferias,ano_ferias,periodo_aquisitivo_inicio,periodo_aquisitivo_fim,
        data_inicio,data_fim,qtd_dias,exercicio,fracionamento,processo,opcao_definida,setor_programacao,
        data_inicio_periodo_aquisitivo,data_fim_periodo_aquisitivo,
        data_inicio_processo_concessivo,data_fim_processo_concessivo,
        periodo_prescricional,programacao,historico_alteracao,status_tramitacao,atualizado_em)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,datetime('now','localtime'))
       RETURNING *`,
      [agente_id, setor||null, concurso||null, mes_ferias||null, ano_ferias||null,
       periodo_aquisitivo_inicio||null, periodo_aquisitivo_fim||null,
       data_inicio||null, data_fim||null, parseInt(qtd_dias)||30, exercicio||null,
       fracionamento?1:0, processo||null, opcao_definida||null, setor_programacao||null,
       data_inicio_periodo_aquisitivo||null, data_fim_periodo_aquisitivo||null,
       data_inicio_processo_concessivo||null, data_fim_processo_concessivo||null,
       periodo_prescricional||null, programacao||null, historico_alteracao||null,
       status_tramitacao||'Pendente']);
    await pool.query(`INSERT INTO audit_logs (agente_id,modulo,acao,ip_origem) VALUES (?,?,?,?)`,
      [req.agente.id,'ferias','INSERT', req.ip]);
    res.json({ data: rows[0] });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.editarFerias = async (req, res) => {
  try {
    const { id } = req.params;
    const { agente_id, setor, concurso, mes_ferias, ano_ferias, periodo_aquisitivo_inicio, periodo_aquisitivo_fim,
            data_inicio, data_fim, qtd_dias, exercicio, fracionamento, processo, opcao_definida, setor_programacao,
            data_inicio_periodo_aquisitivo, data_fim_periodo_aquisitivo,
            data_inicio_processo_concessivo, data_fim_processo_concessivo,
            periodo_prescricional, programacao, historico_alteracao, status_tramitacao } = req.body;
    await pool.query(
      `UPDATE ferias SET agente_id=?,setor=?,concurso=?,mes_ferias=?,ano_ferias=?,
        periodo_aquisitivo_inicio=?,periodo_aquisitivo_fim=?,data_inicio=?,data_fim=?,qtd_dias=?,
        exercicio=?,fracionamento=?,processo=?,opcao_definida=?,setor_programacao=?,
        data_inicio_periodo_aquisitivo=?,data_fim_periodo_aquisitivo=?,
        data_inicio_processo_concessivo=?,data_fim_processo_concessivo=?,
        periodo_prescricional=?,programacao=?,historico_alteracao=?,status_tramitacao=?,
        atualizado_em=datetime('now','localtime') WHERE id=?`,
      [agente_id, setor||null, concurso||null, mes_ferias||null, ano_ferias||null,
       periodo_aquisitivo_inicio||null, periodo_aquisitivo_fim||null,
       data_inicio||null, data_fim||null, parseInt(qtd_dias)||30, exercicio||null,
       fracionamento?1:0, processo||null, opcao_definida||null, setor_programacao||null,
       data_inicio_periodo_aquisitivo||null, data_fim_periodo_aquisitivo||null,
       data_inicio_processo_concessivo||null, data_fim_processo_concessivo||null,
       periodo_prescricional||null, programacao||null, historico_alteracao||null,
       status_tramitacao||'Pendente', id]);
    await pool.query(`INSERT INTO audit_logs (agente_id,modulo,acao,ip_origem) VALUES (?,?,?,?)`,
      [req.agente.id,'ferias','UPDATE', req.ip]);
    res.json({ message: 'Atualizado!' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.excluirFerias = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM ferias WHERE id=?', [id]);
    await pool.query(`INSERT INTO audit_logs (agente_id,modulo,acao,ip_origem) VALUES (?,?,?,?)`,
      [req.agente.id,'ferias','DELETE', req.ip]);
    res.json({ message: 'Removido!' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

// ── PERMUTAS ─────────────────────────────────────────────────────────────────
const PERM_INATIVOS = "('recusado_cedente','reprovado','cancelado')";

exports.listarPermutas = async (req, res) => {
  try {
    const { status, mes_ano, agente_id } = req.query;
    let sql = `SELECT p.*,
      s.nome as solicitante_nome, s.funcional as solicitante_funcional, s.qra as solicitante_qra,
      c.nome as cedente_nome, c.funcional as cedente_funcional, c.qra as cedente_qra,
      adm.nome as aprovado_por_nome
      FROM permutas p
      JOIN agentes s ON p.agente_solicitante_id=s.id
      JOIN agentes c ON p.agente_cedente_id=c.id
      LEFT JOIN agentes adm ON p.aprovado_por=adm.id
      WHERE 1=1`;
    const params = [];
    if (status) { sql += ' AND p.status=?'; params.push(status); }
    if (mes_ano) { sql += " AND (strftime('%Y-%m',p.data_solicitante)=? OR strftime('%Y-%m',p.data_cedente)=?)"; params.push(mes_ano, mes_ano); }
    if (agente_id) { sql += ' AND (p.agente_solicitante_id=? OR p.agente_cedente_id=?)'; params.push(agente_id, agente_id); }
    sql += ' ORDER BY p.criado_em DESC LIMIT 300';
    const { rows } = await pool.query(sql, params);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.aprovarPermuta = async (req, res) => {
  try {
    const { id } = req.params;
    const { acao, obs_admin } = req.body;
    if (!['aprovar','reprovar'].includes(acao)) return res.status(400).json({ error: 'Acao invalida' });
    const { rows: ex } = await pool.query('SELECT * FROM permutas WHERE id=?', [id]);
    if (!ex.length) return res.status(404).json({ error: 'Nao encontrada' });
    if (ex[0].status !== 'pendente_admin') return res.status(400).json({ error: 'Permuta nao aguarda aprovacao admin' });
    const novo = acao === 'aprovar' ? 'aprovado' : 'reprovado';
    await pool.query("UPDATE permutas SET status=?,obs_admin=?,aprovado_por=?,atualizado_em=datetime('now','localtime') WHERE id=?",
      [novo, obs_admin||null, req.agente.id, id]);
    await audit(pool, req.agente.id, 'permutas', acao==='aprovar'?'APROVAR':'REPROVAR', req.ip);
    res.json({ message: acao==='aprovar'?'Permuta aprovada!':'Permuta reprovada.' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.listarMinhasPermutas = async (req, res) => {
  try {
    const agId = req.agente.id;
    const { rows } = await pool.query(
      `SELECT p.*, s.nome as solicitante_nome, s.qra as solicitante_qra,
        c.nome as cedente_nome, c.qra as cedente_qra
       FROM permutas p
       JOIN agentes s ON p.agente_solicitante_id=s.id
       JOIN agentes c ON p.agente_cedente_id=c.id
       WHERE p.agente_solicitante_id=? OR p.agente_cedente_id=?
       ORDER BY p.criado_em DESC LIMIT 80`,
      [agId, agId]);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.criarPermuta = async (req, res) => {
  try {
    const { agente_cedente_id, data_solicitante, turno_solicitante, data_cedente, turno_cedente, motivo } = req.body;
    const agId = req.agente.id;
    if (!agente_cedente_id || !data_solicitante || !turno_solicitante || !data_cedente || !turno_cedente)
      return res.status(400).json({ error: 'Preencha todos os campos obrigatorios' });
    if (Number(agente_cedente_id) === agId) return res.status(400).json({ error: 'Nao pode permutar consigo mesmo' });
    const mesSol = data_solicitante.substring(0,7);
    const mesCed = data_cedente.substring(0,7);
    const { rows: cSol } = await pool.query(
      `SELECT COUNT(*) as cnt FROM permutas WHERE agente_solicitante_id=? AND strftime('%Y-%m',data_solicitante)=? AND status NOT IN ${PERM_INATIVOS}`,
      [agId, mesSol]);
    if ((cSol[0]?.cnt||0) >= 2) return res.status(400).json({ error: 'Voce ja atingiu o limite de 2 permutas em '+mesSol });
    const { rows: cCed } = await pool.query(
      `SELECT COUNT(*) as cnt FROM permutas WHERE agente_cedente_id=? AND strftime('%Y-%m',data_cedente)=? AND status NOT IN ${PERM_INATIVOS}`,
      [agente_cedente_id, mesCed]);
    if ((cCed[0]?.cnt||0) >= 2) return res.status(400).json({ error: 'O agente ja atingiu o limite de 2 permutas em '+mesCed });
    await pool.query(
      'INSERT INTO permutas (agente_solicitante_id,data_solicitante,turno_solicitante,agente_cedente_id,data_cedente,turno_cedente,motivo) VALUES (?,?,?,?,?,?,?)',
      [agId, data_solicitante, turno_solicitante, agente_cedente_id, data_cedente, turno_cedente, motivo||null]);
    await audit(pool, agId, 'permutas', 'INSERT', req.ip);
    res.json({ message: 'Pedido de permuta enviado!' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.responderPermuta = async (req, res) => {
  try {
    const { id } = req.params;
    const { acao, obs } = req.body;
    const agId = req.agente.id;
    if (!['aceitar','recusar'].includes(acao)) return res.status(400).json({ error: 'Acao invalida' });
    const { rows: ex } = await pool.query('SELECT * FROM permutas WHERE id=?', [id]);
    if (!ex.length) return res.status(404).json({ error: 'Nao encontrada' });
    if (ex[0].agente_cedente_id !== agId) return res.status(403).json({ error: 'Nao autorizado' });
    if (ex[0].status !== 'pendente_cedente') return res.status(400).json({ error: 'Permuta nao aguarda sua resposta' });
    const novo = acao === 'aceitar' ? 'pendente_admin' : 'recusado_cedente';
    await pool.query("UPDATE permutas SET status=?,obs_cedente=?,atualizado_em=datetime('now','localtime') WHERE id=?",
      [novo, obs||null, id]);
    await audit(pool, agId, 'permutas', acao==='aceitar'?'ACEITAR_PERMUTA':'RECUSAR_PERMUTA', req.ip);
    res.json({ message: acao==='aceitar'?'Permuta aceita! Aguardando admin.':'Permuta recusada.' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.cancelarPermuta = async (req, res) => {
  try {
    const { id } = req.params;
    const agId = req.agente.id;
    const { rows: ex } = await pool.query('SELECT * FROM permutas WHERE id=?', [id]);
    if (!ex.length) return res.status(404).json({ error: 'Nao encontrada' });
    if (ex[0].agente_solicitante_id !== agId) return res.status(403).json({ error: 'Nao autorizado' });
    if (!['pendente_cedente','pendente_admin'].includes(ex[0].status)) return res.status(400).json({ error: 'Nao pode cancelar neste status' });
    await pool.query("UPDATE permutas SET status='cancelado',atualizado_em=datetime('now','localtime') WHERE id=?", [id]);
    res.json({ message: 'Pedido cancelado.' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

// ── OPERAÇÕES ──────────────────────────────────────────────────────────────
exports.listarOperacoes = async (req, res) => {
  try {
    const { busca, data_ini, data_fim, acao_conjunta } = req.query;
    let sql = `SELECT o.*, a.nome as criado_por_nome FROM operacoes o
               LEFT JOIN agentes a ON o.criado_por=a.id WHERE 1=1`;
    const params = [];
    if (busca) { sql += ' AND (o.nome LIKE ? OR o.local_encontro LIKE ? OR o.boletim_registro LIKE ? OR o.orgaos_envolvidos LIKE ?)'; params.push('%'+busca+'%','%'+busca+'%','%'+busca+'%','%'+busca+'%'); }
    if (data_ini) { sql += ' AND o.data_operacao >= ?'; params.push(data_ini); }
    if (data_fim) { sql += ' AND o.data_operacao <= ?'; params.push(data_fim); }
    if (acao_conjunta === '1' || acao_conjunta === '0') { sql += ' AND o.acao_conjunta=?'; params.push(parseInt(acao_conjunta)); }
    sql += ' ORDER BY o.data_operacao DESC, o.id DESC';
    const { rows } = await pool.query(sql, params);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.criarOperacao = async (req, res) => {
  try {
    const { nome, data_operacao, horario, local_encontro, equipes, acao_conjunta, orgaos_envolvidos, saldo_operacao, boletim_registro, observacoes } = req.body;
    if (!nome || !data_operacao) return res.status(400).json({ error: 'Nome e data sao obrigatorios' });
    const { rows } = await pool.query(
      `INSERT INTO operacoes (nome,data_operacao,horario,local_encontro,equipes,acao_conjunta,orgaos_envolvidos,saldo_operacao,boletim_registro,observacoes,criado_por)
       VALUES (?,?,?,?,?,?,?,?,?,?,?) RETURNING *`,
      [nome, data_operacao, horario||null, local_encontro||null,
       Array.isArray(equipes)?JSON.stringify(equipes):(equipes||null),
       acao_conjunta?1:0, orgaos_envolvidos||null, saldo_operacao||null,
       boletim_registro||null, observacoes||null, req.agente.id]);
    await audit(pool, req.agente.id, 'operacoes', 'INSERT:'+nome, req.ip);
    res.status(201).json({ data: rows[0] });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.editarOperacao = async (req, res) => {
  try {
    const { nome, data_operacao, horario, local_encontro, equipes, acao_conjunta, orgaos_envolvidos, saldo_operacao, boletim_registro, observacoes } = req.body;
    if (!nome || !data_operacao) return res.status(400).json({ error: 'Nome e data sao obrigatorios' });
    await pool.query(
      `UPDATE operacoes SET nome=?,data_operacao=?,horario=?,local_encontro=?,equipes=?,acao_conjunta=?,orgaos_envolvidos=?,saldo_operacao=?,boletim_registro=?,observacoes=?,atualizado_em=datetime('now','localtime') WHERE id=?`,
      [nome, data_operacao, horario||null, local_encontro||null,
       Array.isArray(equipes)?JSON.stringify(equipes):(equipes||null),
       acao_conjunta?1:0, orgaos_envolvidos||null, saldo_operacao||null,
       boletim_registro||null, observacoes||null, req.params.id]);
    await audit(pool, req.agente.id, 'operacoes', 'UPDATE:'+req.params.id, req.ip);
    res.json({ message: 'Operacao atualizada!' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.excluirOperacao = async (req, res) => {
  try {
    await pool.query('DELETE FROM operacoes WHERE id=?', [req.params.id]);
    await audit(pool, req.agente.id, 'operacoes', 'DELETE:'+req.params.id, req.ip);
    res.json({ message: 'Operacao removida!' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

// ── ABASTECIMENTOS ─────────────────────────────────────────────────────────
exports.listarAbastecimentos = async (req, res) => {
  try {
    const { viatura_id, mes_ano, combustivel, busca, limit: lim, offset: off } = req.query;
    let sql = `SELECT ab.*, v.prefixo, v.placa, v.modelo,
                      a.nome as agente_nome, a.qra
               FROM abastecimentos ab
               JOIN viaturas v ON ab.viatura_id=v.id
               JOIN agentes a ON ab.agente_id=a.id
               WHERE 1=1`;
    const params = [];
    if (viatura_id)  { sql += ' AND ab.viatura_id=?'; params.push(viatura_id); }
    if (mes_ano)     { sql += " AND strftime('%Y-%m',ab.data_abastecimento)=?"; params.push(mes_ano); }
    if (combustivel) { sql += ' AND ab.tipo_combustivel=?'; params.push(combustivel); }
    if (busca)       { sql += ' AND (v.prefixo LIKE ? OR v.placa LIKE ?)'; params.push('%'+busca+'%','%'+busca+'%'); }
    // total count for pagination
    const { rows: cnt } = await pool.query(sql.replace(/SELECT ab\.\*.*FROM/s,'SELECT COUNT(*) as total FROM'), params);
    const total = cnt[0]?.total || 0;
    const limit  = Math.min(parseInt(lim)||20, 100);
    const offset = parseInt(off)||0;
    sql += ' ORDER BY ab.data_abastecimento DESC, ab.id DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);
    const { rows } = await pool.query(sql, params);
    res.json({ data: rows, total, limit, offset });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.criarAbastecimento = async (req, res) => {
  try {
    const { viatura_id, data_abastecimento, km_atual, litros, valor_total, tipo_combustivel, posto, observacoes } = req.body;
    if (!viatura_id || !data_abastecimento || !km_atual || !litros || !valor_total)
      return res.status(400).json({ error: 'Viatura, data, KM, litros e valor sao obrigatorios' });
    // pega km anterior desta viatura
    const { rows: ant } = await pool.query(
      'SELECT km_atual FROM abastecimentos WHERE viatura_id=? ORDER BY data_abastecimento DESC, id DESC LIMIT 1',
      [viatura_id]);
    const kmAnt = ant.length ? Number(ant[0].km_atual) : null;
    const kmAtual = parseInt(km_atual);
    if (kmAnt !== null && kmAtual <= kmAnt)
      return res.status(400).json({ error: 'KM atual (' + kmAtual + ') deve ser maior que o ultimo registrado (' + kmAnt + ')' });
    const kmRodados = kmAnt !== null ? kmAtual - kmAnt : null;
    const consumoMedio = kmRodados ? Math.round((kmRodados / Number(litros)) * 100) / 100 : null;
    const custoPorKm  = kmRodados ? Math.round((Number(valor_total) / kmRodados) * 100) / 100 : null;
    const { rows } = await pool.query(
      `INSERT INTO abastecimentos
         (viatura_id,agente_id,data_abastecimento,km_atual,litros,valor_total,tipo_combustivel,posto,observacoes,km_anterior,km_rodados,consumo_medio,custo_por_km)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?) RETURNING *`,
      [viatura_id, req.agente.id, data_abastecimento,
       kmAtual, Number(litros), Number(valor_total),
       tipo_combustivel||'Gasolina', posto||null, observacoes||null,
       kmAnt, kmRodados, consumoMedio, custoPorKm]);
    // atualiza km da viatura
    await pool.query('UPDATE viaturas SET km_atual=? WHERE id=?', [kmAtual, viatura_id]);
    await audit(pool, req.agente.id, 'frota', 'ABASTECIMENTO:viatura'+viatura_id+':km'+kmAtual, req.ip);
    res.status(201).json({ data: rows[0] });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.relatorioAbastecimentos = async (req, res) => {
  try {
    const { mes_ano, ano } = req.query;
    // KPIs gerais
    let whereClause = 'WHERE 1=1'; const p = [];
    if (mes_ano) { whereClause += " AND strftime('%Y-%m',ab.data_abastecimento)=?"; p.push(mes_ano); }
    else if (ano) { whereClause += " AND strftime('%Y',ab.data_abastecimento)=?"; p.push(ano); }
    const { rows: kpi } = await pool.query(
      `SELECT COUNT(*) as total_registros,
              ROUND(SUM(ab.litros),2) as total_litros,
              ROUND(SUM(ab.valor_total),2) as total_gasto,
              ROUND(AVG(ab.consumo_medio),2) as consumo_medio_geral,
              ROUND(AVG(ab.valor_total/ab.litros),2) as preco_medio_litro
       FROM abastecimentos ab ${whereClause}`, p);
    // por viatura
    const { rows: porViatura } = await pool.query(
      `SELECT v.prefixo, v.placa, v.modelo,
              COUNT(*) as abastecimentos,
              ROUND(SUM(ab.litros),2) as litros,
              ROUND(SUM(ab.valor_total),2) as gasto,
              ROUND(AVG(ab.consumo_medio),2) as consumo_medio,
              ROUND(SUM(ab.km_rodados),0) as km_total
       FROM abastecimentos ab
       JOIN viaturas v ON ab.viatura_id=v.id
       ${whereClause}
       GROUP BY ab.viatura_id ORDER BY gasto DESC`, p);
    // por mês (últimos 12)
    const { rows: porMes } = await pool.query(
      `SELECT strftime('%Y-%m',ab.data_abastecimento) as mes,
              ROUND(SUM(ab.valor_total),2) as gasto,
              ROUND(SUM(ab.litros),2) as litros,
              COUNT(*) as qtd
       FROM abastecimentos ab
       WHERE ab.data_abastecimento >= date('now','-12 months')
       GROUP BY mes ORDER BY mes ASC`);
    // por combustivel
    const { rows: porCombustivel } = await pool.query(
      `SELECT ab.tipo_combustivel, COUNT(*) as qtd,
              ROUND(SUM(ab.litros),2) as litros,
              ROUND(SUM(ab.valor_total),2) as gasto
       FROM abastecimentos ab ${whereClause}
       GROUP BY ab.tipo_combustivel ORDER BY gasto DESC`, p);
    res.json({ kpi: kpi[0], porViatura, porMes, porCombustivel });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

// ── MOBILE ENDPOINTS (agente vê os próprios dados) ──────────────────────────
exports.meuBancoHoras = async (req, res) => {
  try {
    const agId = req.agente.id;
    const { rows } = await pool.query(
      `SELECT m.*, r.nome as responsavel_nome FROM banco_horas_movimentacoes m
       LEFT JOIN agentes r ON m.responsavel_id=r.id
       WHERE m.agente_id=? ORDER BY m.data_lancamento DESC LIMIT 30`,
      [agId]);
    const saldo = rows.reduce(function(acc, m) {
      return acc + (m.tipo === 'entrada' ? Number(m.quantidade_horas) : -Number(m.quantidade_horas));
    }, 0);
    res.json({ data: rows, saldo: Math.round(saldo * 100) / 100 });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.minhasFerias = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM ferias WHERE agente_id=? ORDER BY COALESCE(data_inicio,'9999') DESC LIMIT 50`,
      [req.agente.id]);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.minhasAudiencias = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM audiencias WHERE agente_id=? ORDER BY data_audiencia DESC LIMIT 50`,
      [req.agente.id]);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.meusMateriaisCautelados = async (req, res) => {
  try {
    const id = req.agente.id;
    // Almoxarifado cautelado
    const { rows: almox } = await pool.query(
      `SELECT id, nome, numero_patrimonio as numero_serie, setor_atual, quantidade,
              'almoxarifado' as origem
       FROM almoxarifado_itens
       WHERE responsavel_id=? AND status='cautelado' ORDER BY nome`,
      [id]);
    // Armamentos cautelados
    const { rows: arms } = await pool.query(
      `SELECT id, tipo||' '||COALESCE(marca,'') as nome, numero_serie,
              calibre, modelo, 'armamento' as origem
       FROM armamentos
       WHERE agente_cautela_id=? AND status='cautelado' ORDER BY tipo`,
      [id]);
    res.json({ data: [...arms, ...almox] });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.listarAuditoria = async (req, res) => {
  try {
    let sql = 'SELECT al.*,ag.nome as agente_nome,ag.funcional FROM audit_logs al LEFT JOIN agentes ag ON al.agente_id=ag.id WHERE 1=1';
    const p = [];
    if (req.query.modulo) { p.push(req.query.modulo); sql+=' AND al.modulo=?'; }
    sql+=' ORDER BY al.criado_em DESC LIMIT 200';
    const { rows } = await pool.query(sql, p);
    res.json({ data: rows });
  } catch { res.status(500).json({ error: 'Erro' }); }
};

// MUNICOES ESTOQUE - CRUD
// ESTOQUE CRUD
exports.criarEstoque = async (req, res) => {
  try {
    const { calibre, tipo, lote, cofre, quantidade_atual, quantidade_minima, fabricante, data_fabricacao, data_vencimento, situacao } = req.body;
    if (!calibre || !tipo || !cofre) return res.status(400).json({ error: 'Calibre, tipo e cofre obrigatorios' });
    const { rows } = await pool.query(
      'INSERT INTO municoes_estoque (calibre,tipo,lote,cofre,quantidade_atual,quantidade_minima,fabricante,data_fabricacao,data_vencimento,situacao) VALUES (?,?,?,?,?,?,?,?,?,?) RETURNING *',
      [calibre, tipo, lote||null, cofre, quantidade_atual||0, quantidade_minima||0, fabricante||null, data_fabricacao||null, data_vencimento||null, situacao||'disponivel']);
    res.status(201).json({ data: rows[0] });
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'Ja existe registro para este calibre/tipo/cofre' });
    res.status(500).json({ error: 'Erro' });
  }
};
exports.editarEstoque = async (req, res) => {
  try {
    const { rows: cur } = await pool.query('SELECT * FROM municoes_estoque WHERE id=?', [req.params.id]);
    if (!cur.length) return res.status(404).json({ error: 'Nao encontrado' });
    const e = cur[0];
    const { calibre, tipo, lote, cofre, quantidade_atual, quantidade_minima, fabricante, data_fabricacao, data_vencimento, situacao } = req.body;
    await pool.query('UPDATE municoes_estoque SET calibre=?,tipo=?,lote=?,cofre=?,quantidade_atual=?,quantidade_minima=?,fabricante=?,data_fabricacao=?,data_vencimento=?,situacao=? WHERE id=?',
      [calibre||e.calibre, tipo||e.tipo, lote!==undefined?lote:e.lote, cofre||e.cofre,
       quantidade_atual!==undefined?parseInt(quantidade_atual):e.quantidade_atual,
       quantidade_minima!==undefined?parseInt(quantidade_minima):e.quantidade_minima,
       fabricante!==undefined?fabricante:e.fabricante, data_fabricacao!==undefined?data_fabricacao:e.data_fabricacao,
       data_vencimento!==undefined?data_vencimento:e.data_vencimento, situacao||e.situacao||'disponivel',
       req.params.id]);
    const { rows } = await pool.query('SELECT * FROM municoes_estoque WHERE id=?', [req.params.id]);
    res.json({ data: rows[0] });
  } catch { res.status(500).json({ error: 'Erro' }); }
};
exports.excluirEstoque = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT COUNT(*) as cnt FROM municoes_movimentacoes WHERE municao_id=?', [req.params.id]);
    if (rows[0].cnt > 0) return res.status(400).json({ error: 'Nao e possivel excluir: existem ' + rows[0].cnt + ' movimentacoes vinculadas. Zere o estoque primeiro.' });
    await pool.query('DELETE FROM municoes_estoque WHERE id=?', [req.params.id]);
    res.json({ message: 'Removido!' });
  } catch { res.status(500).json({ error: 'Erro' }); }
};

// ── ARMAMENTOS MOVIMENTACOES
exports.listarMovimentacoesArm = async (req, res) => {
  try {
    const { data_ini, data_fim } = req.query;
    let sql = `SELECT am.*, arm.numero_serie, arm.tipo as arm_tipo, arm.calibre,
             a.nome as agente_nome, a.funcional as agente_funcional,
             g.nome as gestor_nome
      FROM armamentos_movimentacoes am
      JOIN armamentos arm ON am.armamento_id = arm.id
      LEFT JOIN agentes a ON am.agente_id = a.id
      JOIN agentes g ON am.gestor_id = g.id WHERE 1=1`;
    const params = [];
    if (data_ini) { sql += ' AND am.criado_em >= ?'; params.push(data_ini); }
    if (data_fim) { sql += ' AND am.criado_em <= ?'; params.push(data_fim + ' 23:59:59'); }
    sql += ' ORDER BY am.criado_em DESC LIMIT 500';
    const { rows } = await pool.query(sql, params);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.movimentarArmamento = async (req, res) => {
  try {
    const { armamento_id, tipo, agente_id, ocorrencia, local_apreensao, data_apreensao, observacoes,
            oficina, data_prev_retorno, custo_estimado,
            lote_leilao, valor_arrematado, comprador,
            processo_adm, autoridade_baixa,
            tipo_descarte, local_descarte, responsavel_descarte } = req.body;
    if (!armamento_id || !tipo) return res.status(400).json({ error: 'Armamento e tipo obrigatorios' });

    const { rows: arm } = await pool.query('SELECT * FROM armamentos WHERE id=?', [armamento_id]);
    if (!arm.length) return res.status(404).json({ error: 'Armamento nao encontrado' });

    const statusMap = {
      'cautela_agente': 'cautelado',
      'devolucao': 'disponivel',
      'cofre_central': 'disponivel',
      'apreendido': 'apreendido',
      'baixa': 'baixado',
      'manutencao': 'manutencao',
      'retorno_manutencao': 'disponivel',
      'leilao': 'baixado',
      'baixa_patrimonial': 'baixado',
      'descarte': 'baixado'
    };
    const novoStatus = statusMap[tipo] || arm[0].status;
    const novoAgente = tipo === 'cautela_agente' ? (agente_id || null) : null;

    await pool.query(
      'UPDATE armamentos SET status=?,agente_cautela_id=?,apreensao_ocorrencia=?,apreensao_local=?,apreensao_data=? WHERE id=?',
      [novoStatus, novoAgente,
       tipo === 'apreendido' ? ocorrencia : null,
       tipo === 'apreendido' ? local_apreensao : null,
       tipo === 'apreendido' ? data_apreensao : null,
       armamento_id]
    );

    await pool.query(
      `INSERT INTO armamentos_movimentacoes
        (armamento_id,tipo,agente_id,gestor_id,ocorrencia,local_apreensao,data_apreensao,observacoes,
         oficina,data_prev_retorno,custo_estimado,lote_leilao,valor_arrematado,comprador,
         processo_adm,autoridade_baixa,tipo_descarte,local_descarte,responsavel_descarte)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [armamento_id, tipo, agente_id||null, req.agente.id,
       ocorrencia||null, local_apreensao||null, data_apreensao||null, observacoes||null,
       oficina||null, data_prev_retorno||null, custo_estimado||null,
       lote_leilao||null, valor_arrematado||null, comprador||null,
       processo_adm||null, autoridade_baixa||null,
       tipo_descarte||null, local_descarte||null, responsavel_descarte||null]
    );

    await audit(pool, req.agente.id, 'armaria', 'MOV_ARM:'+tipo+':'+arm[0].numero_serie, req.ip);
    res.status(201).json({ message: 'Movimentacao registrada!' });
  } catch(e) { console.error(e); res.status(500).json({ error: e.message||'Erro' }); }
};

// ── HISTORICO DE MOVIMENTACOES DE UM ARMAMENTO ESPECIFICO
exports.historicoArmamento = async (req, res) => {
  try {
    const { data_ini, data_fim } = req.query;
    let sql = `SELECT am.*, a.nome as agente_nome, a.funcional as agente_funcional, g.nome as gestor_nome,
             arm.numero_serie, arm.tipo as arm_tipo, arm.calibre
      FROM armamentos_movimentacoes am
      JOIN armamentos arm ON am.armamento_id = arm.id
      LEFT JOIN agentes a ON am.agente_id = a.id
      JOIN agentes g ON am.gestor_id = g.id
      WHERE am.armamento_id = ?`;
    const params = [req.params.id];
    if (data_ini) { sql += ' AND am.criado_em >= ?'; params.push(data_ini); }
    if (data_fim) { sql += ' AND am.criado_em <= ?'; params.push(data_fim + ' 23:59:59'); }
    sql += ' ORDER BY am.criado_em DESC';
    const { rows } = await pool.query(sql, params);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

// ── HISTORICO DE MOVIMENTACOES DE UM ITEM DE ALMOXARIFADO
exports.historicoAlmoxItem = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT am.*, a.nome as agente_nome, g.nome as gestor_nome,
             ai.quantidade as saldo_atual
      FROM almoxarifado_movimentacoes am
      LEFT JOIN agentes a ON am.agente_id = a.id
      JOIN agentes g ON am.gestor_id = g.id
      JOIN almoxarifado_itens ai ON am.item_id = ai.id
      WHERE am.item_id = ?
      ORDER BY am.criado_em DESC
    `, [req.params.id]);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

// ── LISTAR TODAS MOVIMENTACOES DO ALMOXARIFADO
exports.listarMovimentacoesAlmox = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT am.*, ai.nome as item_nome, ai.numero_patrimonio,
             a.nome as agente_nome, g.nome as gestor_nome
      FROM almoxarifado_movimentacoes am
      JOIN almoxarifado_itens ai ON am.item_id = ai.id
      LEFT JOIN agentes a ON am.agente_id = a.id
      JOIN agentes g ON am.gestor_id = g.id
      ORDER BY am.criado_em DESC LIMIT 300
    `);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

// ── RELATORIO DE KM DA FROTA
exports.relatorioKmFrota = async (req, res) => {
  try {
    const { data_ini, data_fim, viatura_id } = req.query;
    let sql = `
      SELECT cv.viatura_id, v.prefixo, v.placa, v.marca, v.modelo,
             COUNT(*) as total_cautelas,
             SUM(cv.km_final - cv.km_inicial) as km_rodado,
             MIN(cv.data_cautela) as primeira_saida,
             MAX(cv.data_descautela) as ultimo_retorno,
             AVG(cv.km_final - cv.km_inicial) as km_medio
      FROM cautelas_viaturas cv
      JOIN viaturas v ON cv.viatura_id = v.id
      WHERE cv.data_descautela IS NOT NULL AND cv.km_final IS NOT NULL
    `;
    const p = [];
    if (data_ini) { sql += ' AND date(cv.data_cautela) >= ?'; p.push(data_ini); }
    if (data_fim) { sql += ' AND date(cv.data_cautela) <= ?'; p.push(data_fim); }
    if (viatura_id) { sql += ' AND cv.viatura_id = ?'; p.push(viatura_id); }
    sql += ' GROUP BY cv.viatura_id ORDER BY km_rodado DESC';
    const { rows } = await pool.query(sql, p);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

// ── FICHA DO AGENTE (tudo cautelado)
exports.fichaAgente = async (req, res) => {
  try {
    const id = req.params.id;

    const [agRow, viaturas, armamentos, almox, municoes] = await Promise.all([
      // Agente
      pool.query('SELECT id,nome,qra,funcional,setor,letra,perfil FROM agentes WHERE id=?', [id]),
      // Viaturas cauteladas
      pool.query(`SELECT cv.*,v.prefixo,v.placa,v.marca,v.modelo,v.km_atual
        FROM cautelas_viaturas cv JOIN viaturas v ON cv.viatura_id=v.id
        WHERE cv.motorista_id=? AND cv.data_descautela IS NULL`, [id]),
      // Armamentos cautelados
      pool.query(`SELECT a.* FROM armamentos a
        WHERE a.agente_cautela_id=? AND a.status='cautelado'`, [id]),
      // Almoxarifado cautelado
      pool.query(`SELECT ai.*,am.criado_em as data_cautela, am.data_prev_devolucao
        FROM almoxarifado_itens ai
        JOIN almoxarifado_movimentacoes am ON am.item_id=ai.id
        WHERE ai.responsavel_id=? AND ai.status='cautelado'
        AND am.tipo='cautela' AND am.id=(
          SELECT MAX(id) FROM almoxarifado_movimentacoes WHERE item_id=ai.id AND tipo='cautela'
        )`, [id]),
      // Municoes: apenas cautelas ATIVAS do agente
      pool.query(`SELECT mc.*, mci.quantidade_cautelada, mci.quantidade_devolvida,
        me.calibre, me.tipo as tipo_municao, me.cofre
        FROM municoes_cautelas mc
        JOIN municoes_cautela_itens mci ON mci.cautela_id = mc.id
        JOIN municoes_estoque me ON mci.estoque_id = me.id
        WHERE mc.agente_id=? AND mc.status='ativa'
        ORDER BY mc.criado_em DESC`, [id]),
    ]);

    if (!agRow.rows.length) return res.status(404).json({ error: 'Agente nao encontrado' });

    res.json({
      data: {
        agente: agRow.rows[0],
        viaturas: viaturas.rows,
        armamentos: armamentos.rows,
        almoxarifado: almox.rows,
        municoes: municoes.rows,
      }
    });
  } catch(e) { console.error(e); res.status(500).json({ error: e.message||'Erro' }); }
};

// ── ENTRADAS DE ARMAMENTOS
exports.listarEntradas = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT ae.*, arm.numero_serie, arm.tipo as arm_tipo, arm.calibre,
             arm.marca, arm.modelo,
             g.nome as gestor_nome, r.nome as responsavel_nome
      FROM armamentos_entradas ae
      JOIN armamentos arm ON ae.armamento_id = arm.id
      JOIN agentes g ON ae.gestor_id = g.id
      LEFT JOIN agentes r ON ae.responsavel_id = r.id
      ORDER BY ae.criado_em DESC LIMIT 200
    `);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.criarEntrada = async (req, res) => {
  try {
    const { tipo_entrada, data_entrada, documento, nota_fiscal, processo_adm,
            fornecedor, responsavel_id, observacoes, itens } = req.body;
    if (!tipo_entrada || !data_entrada) return res.status(400).json({ error: 'Tipo e data obrigatorios' });
    if (!itens || !itens.length) return res.status(400).json({ error: 'Adicione ao menos um armamento' });
    const grupo_id = 'NF-' + Date.now();
    for (const item of itens) {
      if (!item.armamento_id) continue;
      await pool.query(
        `INSERT INTO armamentos_entradas
          (armamento_id,tipo_entrada,data_entrada,documento,nota_fiscal,processo_adm,
           fornecedor,responsavel_id,quantidade,observacoes,gestor_id,grupo_id)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
        [item.armamento_id, tipo_entrada, data_entrada, documento||null, nota_fiscal||null,
         processo_adm||null, fornecedor||null, responsavel_id||null,
         item.quantidade||1, observacoes||null, req.agente.id, grupo_id]
      );
    }
    await audit(pool, req.agente.id, 'armaria', 'ENTRADA_NF:'+grupo_id+'('+itens.length+'itens)', req.ip);
    res.status(201).json({ message: 'Entrada registrada!', grupo_id });
  } catch(e) { console.error(e); res.status(500).json({ error: e.message||'Erro' }); }
};

exports.fichaEntrada = async (req, res) => {
  try {
    // Find the entry to get its grupo_id
    const { rows: base } = await pool.query('SELECT grupo_id FROM armamentos_entradas WHERE id=?', [req.params.id]);
    if (!base.length) return res.status(404).json({ error: 'Entrada nao encontrada' });
    const grupo_id = base[0].grupo_id;
    const { rows } = await pool.query(`
      SELECT ae.*, arm.numero_serie, arm.tipo as arm_tipo, arm.calibre,
             arm.marca, arm.modelo, arm.cofre,
             g.nome as gestor_nome, g.funcional as gestor_funcional,
             r.nome as responsavel_nome, r.funcional as responsavel_funcional
      FROM armamentos_entradas ae
      JOIN armamentos arm ON ae.armamento_id = arm.id
      JOIN agentes g ON ae.gestor_id = g.id
      LEFT JOIN agentes r ON ae.responsavel_id = r.id
      WHERE ${grupo_id ? 'ae.grupo_id = ?' : 'ae.id = ?'}
      ORDER BY ae.id
    `, [grupo_id || req.params.id]);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

// ── GRANADAS E ARTEFATOS
exports.listarGranadas = async (req, res) => {
  try {
    const hoje = new Date().toISOString().slice(0, 10);
    const { rows } = await pool.query(`
      SELECT g.*,
        CASE WHEN g.data_validade IS NOT NULL AND g.data_validade < ? THEN 1 ELSE 0 END as vencida,
        CASE WHEN g.data_validade IS NOT NULL AND g.data_validade >= ? AND g.data_validade <= date(?,'+'||30||' days') THEN 1 ELSE 0 END as alerta_vencimento
      FROM granadas_estoque g ORDER BY g.tipo, g.criado_em DESC
    `, [hoje, hoje, hoje]);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.criarGranada = async (req, res) => {
  try {
    const { tipo, numero_lote, quantidade, data_fabricacao, data_validade,
            fabricante, situacao, local, observacoes } = req.body;
    if (!tipo) return res.status(400).json({ error: 'Tipo obrigatorio' });
    const { lastInsertRowid } = await pool.query(
      `INSERT INTO granadas_estoque (tipo,numero_lote,quantidade,data_fabricacao,data_validade,fabricante,situacao,local,observacoes)
       VALUES (?,?,?,?,?,?,?,?,?)`,
      [tipo, numero_lote||null, quantidade||0, data_fabricacao||null, data_validade||null,
       fabricante||null, situacao||'operacional', local||'operacional', observacoes||null]
    );
    await audit(pool, req.agente.id, 'armaria', 'CRIAR_GRANADA:'+tipo, req.ip);
    res.status(201).json({ id: lastInsertRowid, message: 'Cadastrado!' });
  } catch(e) { console.error(e); res.status(500).json({ error: e.message||'Erro' }); }
};

exports.editarGranada = async (req, res) => {
  try {
    const { tipo, numero_lote, quantidade, data_fabricacao, data_validade,
            fabricante, situacao, local, observacoes } = req.body;
    await pool.query(
      `UPDATE granadas_estoque SET tipo=?,numero_lote=?,quantidade=?,data_fabricacao=?,data_validade=?,
       fabricante=?,situacao=?,local=?,observacoes=? WHERE id=?`,
      [tipo, numero_lote||null, quantidade||0, data_fabricacao||null, data_validade||null,
       fabricante||null, situacao||'operacional', local||'operacional', observacoes||null, req.params.id]
    );
    res.json({ message: 'Atualizado!' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.excluirGranada = async (req, res) => {
  try {
    await pool.query('DELETE FROM granadas_movimentacoes WHERE granada_id=?', [req.params.id]);
    await pool.query('DELETE FROM granadas_estoque WHERE id=?', [req.params.id]);
    res.json({ message: 'Excluido!' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.listarMovimentacoesGranadas = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT gm.*, gs.tipo as granada_tipo, gs.numero_lote,
             a.nome as agente_nome, g.nome as gestor_nome
      FROM granadas_movimentacoes gm
      JOIN granadas_estoque gs ON gm.granada_id = gs.id
      LEFT JOIN agentes a ON gm.agente_id = a.id
      JOIN agentes g ON gm.gestor_id = g.id
      ORDER BY gm.criado_em DESC LIMIT 300
    `);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.movimentarGranada = async (req, res) => {
  try {
    const { granada_id, tipo, quantidade, agente_id, observacoes } = req.body;
    if (!granada_id || !tipo || !quantidade)
      return res.status(400).json({ error: 'Granada, tipo e quantidade sao obrigatorios' });
    const { rows: gr } = await pool.query('SELECT * FROM granadas_estoque WHERE id=?', [granada_id]);
    if (!gr.length) return res.status(404).json({ error: 'Granada nao encontrada' });

    let novaQtd = gr[0].quantidade;
    let novaSituacao = gr[0].situacao;
    if (tipo === 'entrada') novaQtd += parseInt(quantidade);
    else if (tipo === 'saida' || tipo === 'cautela') {
      if (parseInt(quantidade) > novaQtd) return res.status(400).json({ error: 'Quantidade insuficiente' });
      novaQtd -= parseInt(quantidade);
    } else if (tipo === 'descarte' || tipo === 'vencimento') {
      if (parseInt(quantidade) > novaQtd) return res.status(400).json({ error: 'Quantidade insuficiente' });
      novaQtd -= parseInt(quantidade);
      novaSituacao = tipo === 'vencimento' ? 'vencida' : 'danificada';
    }

    await pool.query('UPDATE granadas_estoque SET quantidade=?,situacao=? WHERE id=?', [novaQtd, novaSituacao, granada_id]);
    await pool.query(
      'INSERT INTO granadas_movimentacoes (granada_id,tipo,quantidade,agente_id,gestor_id,observacoes) VALUES (?,?,?,?,?,?)',
      [granada_id, tipo, quantidade, agente_id||null, req.agente.id, observacoes||null]
    );
    res.status(201).json({ message: 'Movimentacao registrada!' });
  } catch(e) { console.error(e); res.status(500).json({ error: e.message||'Erro' }); }
};

// ── MUNICOES CAUTELAS
exports.listarCautelasMunicoes = async (req, res) => {
  try {
    const { status } = req.query;
    let sql = `
      SELECT mc.*, a.nome as agente_nome, a.funcional as agente_funcional, a.setor,
             g.nome as gestor_nome
      FROM municoes_cautelas mc
      JOIN agentes a ON mc.agente_id = a.id
      JOIN agentes g ON mc.gestor_id = g.id
    `;
    const p = [];
    if (status) { sql += ' WHERE mc.status=?'; p.push(status); }
    sql += ' ORDER BY mc.criado_em DESC LIMIT 200';
    const { rows: cautelas } = await pool.query(sql, p);

    // Load items for each cautela
    for (const c of cautelas) {
      const { rows: itens } = await pool.query(`
        SELECT mci.*, me.calibre, me.tipo as tipo_municao, me.cofre
        FROM municoes_cautela_itens mci
        JOIN municoes_estoque me ON mci.estoque_id = me.id
        WHERE mci.cautela_id = ?
      `, [c.id]);
      c.itens = itens;
    }
    res.json({ data: cautelas });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.criarCautelaMunicoes = async (req, res) => {
  try {
    const { agente_id, itens, observacoes } = req.body;
    if (!agente_id || !itens || !itens.length)
      return res.status(400).json({ error: 'Agente e itens obrigatorios' });

    // Validate quantities
    for (const item of itens) {
      const { rows: est } = await pool.query('SELECT * FROM municoes_estoque WHERE id=?', [item.estoque_id]);
      if (!est.length) return res.status(400).json({ error: 'Item de estoque nao encontrado' });
      if (parseInt(item.quantidade) > est[0].quantidade_atual)
        return res.status(400).json({ error: 'Quantidade insuficiente para '+est[0].calibre+' '+est[0].tipo });
    }

    const { lastInsertRowid: cautelaId } = await pool.query(
      'INSERT INTO municoes_cautelas (agente_id,gestor_id,status,observacoes) VALUES (?,?,?,?)',
      [agente_id, req.agente.id, 'ativa', observacoes||null]
    );

    for (const item of itens) {
      await pool.query(
        'INSERT INTO municoes_cautela_itens (cautela_id,estoque_id,quantidade_cautelada,quantidade_devolvida) VALUES (?,?,?,0)',
        [cautelaId, item.estoque_id, item.quantidade]
      );
      await pool.query(
        'UPDATE municoes_estoque SET quantidade_atual=quantidade_atual-? WHERE id=?',
        [item.quantidade, item.estoque_id]
      );
      await pool.query(
        `INSERT INTO municoes_movimentacoes (municao_id,tipo_movimentacao,quantidade,agente_id,gestor_id,motivo_saida,observacoes)
         VALUES (?,?,?,?,?,?,?)`,
        [item.estoque_id, 'saida', item.quantidade, agente_id, req.agente.id, 'cautela_agente', 'Cautela #'+cautelaId]
      );
    }
    await audit(pool, req.agente.id, 'armaria', 'CAUTELA_MUN:'+cautelaId, req.ip);
    res.status(201).json({ id: cautelaId, message: 'Cautela registrada!' });
  } catch(e) { console.error(e); res.status(500).json({ error: e.message||'Erro' }); }
};

exports.devolverCautelaMunicoes = async (req, res) => {
  try {
    const { itens_devolucao, observacoes } = req.body;
    const { rows: cautela } = await pool.query(
      'SELECT mc.*, a.nome as agente_nome FROM municoes_cautelas mc JOIN agentes a ON mc.agente_id=a.id WHERE mc.id=?',
      [req.params.id]
    );
    if (!cautela.length) return res.status(404).json({ error: 'Cautela nao encontrada' });
    if (cautela[0].status === 'encerrada') return res.status(400).json({ error: 'Cautela ja encerrada' });

    const { rows: itens } = await pool.query(
      'SELECT * FROM municoes_cautela_itens WHERE cautela_id=?', [req.params.id]
    );

    for (const dev of itens_devolucao) {
      const item = itens.find(i => i.id === dev.item_id);
      if (!item) continue;
      const maxDev = item.quantidade_cautelada - item.quantidade_devolvida;
      const qtd = Math.min(parseInt(dev.quantidade), maxDev);
      if (qtd <= 0) continue;

      await pool.query(
        'UPDATE municoes_cautela_itens SET quantidade_devolvida=quantidade_devolvida+? WHERE id=?',
        [qtd, item.id]
      );
      await pool.query(
        'UPDATE municoes_estoque SET quantidade_atual=quantidade_atual+? WHERE id=?',
        [qtd, item.estoque_id]
      );
      await pool.query(
        `INSERT INTO municoes_movimentacoes (municao_id,tipo_movimentacao,quantidade,agente_id,gestor_id,motivo_entrada,observacoes)
         VALUES (?,?,?,?,?,?,?)`,
        [item.estoque_id, 'entrada', qtd, cautela[0].agente_id, req.agente.id, 'devolucao_cautela', 'Devolucao cautela #'+req.params.id]
      );
    }

    // Check if all items fully returned
    const { rows: itensAtu } = await pool.query(
      'SELECT * FROM municoes_cautela_itens WHERE cautela_id=?', [req.params.id]
    );
    const tudo = itensAtu.every(i => i.quantidade_devolvida >= i.quantidade_cautelada);
    if (tudo) {
      await pool.query(
        "UPDATE municoes_cautelas SET status='encerrada',encerrado_em=datetime('now','localtime') WHERE id=?",
        [req.params.id]
      );
    }

    await audit(pool, req.agente.id, 'armaria', 'DEVOLUCAO_MUN_CAUTELA:'+req.params.id, req.ip);
    res.json({ message: 'Devolucao registrada!', encerrada: tudo });
  } catch(e) { console.error(e); res.status(500).json({ error: e.message||'Erro' }); }
};

// ── MUNICOES - ENVIO PARA DEPOSITO
exports.enviarDeposito = async (req, res) => {
  try {
    const { estoque_id, quantidade, tipo_deposito, observacoes } = req.body;
    if (!estoque_id || !quantidade || !tipo_deposito)
      return res.status(400).json({ error: 'Estoque, quantidade e tipo de deposito obrigatorios' });
    if (!['vencidas','danificadas'].includes(tipo_deposito))
      return res.status(400).json({ error: 'Tipo de deposito invalido' });

    const { rows: est } = await pool.query('SELECT * FROM municoes_estoque WHERE id=?', [estoque_id]);
    if (!est.length) return res.status(404).json({ error: 'Estoque nao encontrado' });
    if (parseInt(quantidade) > est[0].quantidade_atual)
      return res.status(400).json({ error: 'Quantidade insuficiente' });

    await pool.query(
      'UPDATE municoes_estoque SET quantidade_atual=quantidade_atual-? WHERE id=?',
      [quantidade, estoque_id]
    );
    // Upsert deposit entry (soma se ja existe lote do mesmo calibre/tipo/cofre no deposito)
    const { rows: depExist } = await pool.query(
      `SELECT id FROM municoes_estoque WHERE calibre=(SELECT calibre FROM municoes_estoque WHERE id=?)
       AND tipo=(SELECT tipo FROM municoes_estoque WHERE id=?)
       AND cofre=(SELECT cofre FROM municoes_estoque WHERE id=?)
       AND deposito=?`,
      [estoque_id, estoque_id, estoque_id, tipo_deposito]
    );
    if (depExist.length) {
      await pool.query('UPDATE municoes_estoque SET quantidade_atual=quantidade_atual+? WHERE id=?', [quantidade, depExist[0].id]);
    } else {
      await pool.query(
        `INSERT INTO municoes_estoque (calibre,tipo,cofre,quantidade_atual,quantidade_minima,deposito,situacao,fabricante,data_fabricacao,data_vencimento)
         SELECT calibre,tipo,cofre,?,0,?,'deposito',fabricante,data_fabricacao,data_vencimento FROM municoes_estoque WHERE id=?`,
        [quantidade, tipo_deposito, estoque_id]
      );
    }
    await pool.query(
      `INSERT INTO municoes_movimentacoes (municao_id,tipo_movimentacao,quantidade,gestor_id,motivo_saida,observacoes)
       VALUES (?,?,?,?,?,?)`,
      [estoque_id, 'saida', quantidade, req.agente.id, 'deposito_'+tipo_deposito, observacoes||null]
    );
    await audit(pool, req.agente.id, 'armaria', 'DEPOSITO_MUN:'+tipo_deposito+':'+estoque_id, req.ip);
    res.status(201).json({ message: 'Enviado para deposito de '+tipo_deposito+'!' });
  } catch(e) { console.error(e); res.status(500).json({ error: e.message||'Erro' }); }
};

// ── MUNICOES - BAIXA TOTAL DE DEPOSITO
exports.baixarDeposito = async (req, res) => {
  try {
    const { observacoes } = req.body;
    if (!observacoes) return res.status(400).json({ error: 'Motivo obrigatorio' });
    const { rows: dep } = await pool.query('SELECT * FROM municoes_estoque WHERE id=?', [req.params.id]);
    if (!dep.length) return res.status(404).json({ error: 'Deposito nao encontrado' });
    if (!dep[0].deposito || dep[0].deposito === 'ativo') return res.status(400).json({ error: 'Item nao e um deposito' });
    const qtd = dep[0].quantidade_atual;
    if (qtd <= 0) return res.status(400).json({ error: 'Deposito ja esta zerado' });
    await pool.query('UPDATE municoes_estoque SET quantidade_atual=0 WHERE id=?', [req.params.id]);
    await pool.query(
      `INSERT INTO municoes_movimentacoes (municao_id,tipo_movimentacao,quantidade,gestor_id,motivo_saida,observacoes)
       VALUES (?,?,?,?,?,?)`,
      [req.params.id, 'saida', qtd, req.agente.id, 'baixa_deposito', observacoes]
    );
    await audit(pool, req.agente.id, 'armaria', 'BAIXA_DEPOSITO:'+dep[0].deposito+':'+req.params.id+'('+qtd+')', req.ip);
    res.json({ message: 'Baixa de '+qtd+' unidade(s) registrada!' });
  } catch(e) { console.error(e); res.status(500).json({ error: e.message||'Erro' }); }
};

// ── MUNICOES - ENTRADAS (NF)
exports.listarEntradasMunicoes = async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT me2.*, ms.calibre, ms.tipo as tipo_mun, ms.cofre,
             g.nome as gestor_nome, r.nome as responsavel_nome, r.funcional as responsavel_funcional
      FROM municoes_entradas me2
      JOIN municoes_estoque ms ON me2.estoque_id = ms.id
      JOIN agentes g ON me2.gestor_id = g.id
      LEFT JOIN agentes r ON me2.responsavel_id = r.id
      ORDER BY me2.criado_em DESC LIMIT 300
    `);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.criarEntradaMunicoes = async (req, res) => {
  try {
    const { tipo_entrada, data_entrada, documento, nota_fiscal, processo_adm,
            fornecedor, responsavel_id, observacoes, itens } = req.body;
    if (!tipo_entrada || !data_entrada) return res.status(400).json({ error: 'Tipo e data obrigatorios' });
    if (!itens || !itens.length) return res.status(400).json({ error: 'Adicione ao menos um item' });
    const grupo_id = 'NF-MUN-' + Date.now();
    for (const item of itens) {
      if (!item.estoque_id || !item.quantidade) continue;
      await pool.query(
        `INSERT INTO municoes_entradas
          (grupo_id,estoque_id,tipo_entrada,data_entrada,documento,nota_fiscal,
           processo_adm,fornecedor,responsavel_id,quantidade,observacoes,gestor_id)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
        [grupo_id, item.estoque_id, tipo_entrada, data_entrada, documento||null,
         nota_fiscal||null, processo_adm||null, fornecedor||null,
         responsavel_id||null, parseInt(item.quantidade), observacoes||null, req.agente.id]
      );
      await pool.query(
        'UPDATE municoes_estoque SET quantidade_atual=quantidade_atual+? WHERE id=?',
        [parseInt(item.quantidade), item.estoque_id]
      );
      await pool.query(
        `INSERT INTO municoes_movimentacoes (municao_id,tipo_movimentacao,quantidade,gestor_id,motivo_entrada,observacoes)
         VALUES (?,?,?,?,?,?)`,
        [item.estoque_id, 'entrada', parseInt(item.quantidade), req.agente.id, 'entrada_nf', nota_fiscal||documento||grupo_id]
      );
    }
    await audit(pool, req.agente.id, 'armaria', 'ENTRADA_NF_MUN:'+grupo_id+'('+itens.length+'itens)', req.ip);
    res.status(201).json({ message: 'Entrada registrada!', grupo_id });
  } catch(e) { console.error(e); res.status(500).json({ error: e.message||'Erro' }); }
};

exports.fichaEntradaMunicoes = async (req, res) => {
  try {
    const { rows: base } = await pool.query('SELECT grupo_id FROM municoes_entradas WHERE id=?', [req.params.id]);
    if (!base.length) return res.status(404).json({ error: 'Entrada nao encontrada' });
    const { rows } = await pool.query(`
      SELECT me2.*, ms.calibre, ms.tipo as tipo_mun, ms.cofre,
             g.nome as gestor_nome, g.funcional as gestor_funcional,
             r.nome as responsavel_nome, r.funcional as responsavel_funcional
      FROM municoes_entradas me2
      JOIN municoes_estoque ms ON me2.estoque_id = ms.id
      JOIN agentes g ON me2.gestor_id = g.id
      LEFT JOIN agentes r ON me2.responsavel_id = r.id
      WHERE me2.grupo_id = ?
      ORDER BY me2.id
    `, [base[0].grupo_id]);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

// ── MÓDULO ADMINISTRATIVO

exports.listarBancoHoras = async (req, res) => {
  try {
    const { agente_id, mes, data_inicio, data_fim, tipo, setor } = req.query;
    let sql = `SELECT b.*, a.nome as agente_nome, a.qra, a.funcional, a.setor,
                      r.nome as responsavel_nome
               FROM banco_horas_movimentacoes b
               JOIN agentes a ON b.agente_id = a.id
               LEFT JOIN agentes r ON b.responsavel_id = r.id
               WHERE 1=1`;
    const params = [];
    if (agente_id) { sql += ' AND b.agente_id=?'; params.push(agente_id); }
    if (mes) { sql += " AND strftime('%Y-%m', b.data_lancamento)=?"; params.push(mes); }
    if (data_inicio) { sql += ' AND (b.data_motivo>=? OR (b.data_motivo IS NULL AND b.data_lancamento>=?))'; params.push(data_inicio, data_inicio); }
    if (data_fim) { sql += ' AND (b.data_motivo<=? OR (b.data_motivo IS NULL AND b.data_lancamento<=?))'; params.push(data_fim, data_fim); }
    if (tipo) { sql += ' AND b.tipo=?'; params.push(tipo); }
    if (setor) { sql += ' AND a.setor=?'; params.push(setor); }
    sql += ' ORDER BY COALESCE(b.data_motivo,b.data_lancamento) DESC, b.id DESC';
    const { rows } = await pool.query(sql, params);
    let saldo = null;
    if (agente_id) {
      const { rows: sr } = await pool.query(
        `SELECT COALESCE(SUM(CASE WHEN tipo='entrada' THEN quantidade_horas ELSE -quantidade_horas END),0) as saldo
         FROM banco_horas_movimentacoes WHERE agente_id=?`, [agente_id]);
      saldo = sr[0]?.saldo ?? 0;
    }
    res.json({ data: rows, saldo });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.criarMovBancoHoras = async (req, res) => {
  try {
    const { agente_id, tipo, motivo, numero_processo, numero_bu, numero_ci, quantidade_horas, data_lancamento, data_motivo, observacoes } = req.body;
    if (!agente_id || !tipo || !motivo || !quantidade_horas || !data_lancamento)
      return res.status(400).json({ error: 'Campos obrigatorios: agente, tipo, motivo, horas, data' });
    const { rows } = await pool.query(
      `INSERT INTO banco_horas_movimentacoes (agente_id,tipo,motivo,numero_processo,numero_bu,numero_ci,quantidade_horas,observacoes,responsavel_id,data_lancamento,data_motivo)
       VALUES (?,?,?,?,?,?,?,?,?,?,?) RETURNING *`,
      [agente_id, tipo, motivo, numero_processo||null, numero_bu||null, numero_ci||null,
       parseFloat(quantidade_horas), observacoes||null, req.agente.id, data_lancamento, data_motivo||null]
    );
    await audit(pool, req.agente.id, 'administrativo', 'BANCO_HORAS:'+tipo+':agente'+agente_id, req.ip);
    res.status(201).json({ data: rows[0] });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.saldosBancoHoras = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT a.id, a.nome, a.qra, a.funcional, a.setor,
              COALESCE(SUM(CASE WHEN b.tipo='entrada' THEN b.quantidade_horas ELSE -b.quantidade_horas END),0) as saldo,
              COUNT(b.id) as total_lancamentos
       FROM agentes a
       LEFT JOIN banco_horas_movimentacoes b ON a.id = b.agente_id
       WHERE a.ativo=1
       GROUP BY a.id ORDER BY a.nome`
    );
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.listarAudiencias = async (req, res) => {
  try {
    const { mes, agente_id } = req.query;
    let sql = `SELECT au.*, a.nome as agente_nome, a.qra, a.funcional,
                      g.nome as gestor_nome
               FROM audiencias au
               JOIN agentes a ON au.agente_id = a.id
               LEFT JOIN agentes g ON au.gestor_id = g.id
               WHERE 1=1`;
    const params = [];
    if (mes) { sql += ' AND au.mes=?'; params.push(mes); }
    if (agente_id) { sql += ' AND au.agente_id=?'; params.push(agente_id); }
    sql += ' ORDER BY au.data_audiencia DESC, au.id DESC';
    const { rows } = await pool.query(sql, params);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.criarAudiencia = async (req, res) => {
  try {
    const { agente_id, mes, numero_processo, data_audiencia, horario, local_audiencia, informado, data_informado, como_informado, data_dispensa, observacoes } = req.body;
    if (!agente_id || !mes || !numero_processo || !data_audiencia)
      return res.status(400).json({ error: 'Campos obrigatorios: agente, mes, processo, data' });
    const { rows } = await pool.query(
      `INSERT INTO audiencias (agente_id,mes,numero_processo,data_audiencia,horario,local_audiencia,informado,data_informado,como_informado,data_dispensa,observacoes,gestor_id)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?) RETURNING *`,
      [agente_id, mes, numero_processo, data_audiencia, horario||null, local_audiencia||null,
       informado?1:0, data_informado||null, como_informado||null, data_dispensa||null, observacoes||null, req.agente.id]
    );
    await audit(pool, req.agente.id, 'administrativo', 'AUDIENCIA:'+numero_processo, req.ip);
    res.status(201).json({ data: rows[0] });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.editarAudiencia = async (req, res) => {
  try {
    const { agente_id, mes, numero_processo, data_audiencia, horario, local_audiencia, informado, data_informado, como_informado, data_dispensa, observacoes } = req.body;
    await pool.query(
      `UPDATE audiencias SET agente_id=?,mes=?,numero_processo=?,data_audiencia=?,horario=?,local_audiencia=?,informado=?,data_informado=?,como_informado=?,data_dispensa=?,observacoes=?
       WHERE id=?`,
      [agente_id, mes, numero_processo, data_audiencia, horario||null, local_audiencia||null,
       informado?1:0, data_informado||null, como_informado||null, data_dispensa||null, observacoes||null, req.params.id]
    );
    res.json({ message: 'Atualizado!' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.excluirAudiencia = async (req, res) => {
  try {
    await pool.query('DELETE FROM audiencias WHERE id=?', [req.params.id]);
    res.json({ message: 'Removido!' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.listarFrequencia = async (req, res) => {
  try {
    const { mes_ano } = req.query;
    if (!mes_ano) return res.status(400).json({ error: 'mes_ano obrigatorio' });
    // ALL active agents (left join base record)
    const { rows: agents } = await pool.query(
      `SELECT a.id as agente_id, a.nome as agente_nome, a.qra, a.funcional, a.setor, a.letra,
              f.id as freq_id, f.chefia_imediata, f.ferias_inicio, f.ferias_fim,
              COALESCE(f.ferias_dias,0) as ferias_dias,
              COALESCE(f.falta_dias,0) as falta_dias,
              COALESCE(f.licenca_dias,0) as licenca_dias,
              COALESCE(f.afastamento_compensacao_dias,0) as afastamento_compensacao_dias,
              f.declaracao_comparecimento, f.observacao,
              ? as mes_ano
       FROM agentes a
       LEFT JOIN frequencia_mensal f ON a.id=f.agente_id AND f.mes_ano=?
       WHERE a.ativo=1 ORDER BY a.nome`, [mes_ano, mes_ano]);
    // Atestados aggregate with reposição tracking
    const { rows: atRows } = await pool.query(
      `SELECT at.agente_id,
              SUM(at.dias) as total_dias,
              SUM(CASE WHEN at.tipo='cat' THEN at.dias ELSE 0 END) as dias_cat,
              SUM(CASE WHEN at.tipo='comum' THEN
                at.dias - MIN(at.dias, COALESCE((SELECT COUNT(*) FROM atestados_reposicoes ar WHERE ar.atestado_id=at.id),0))
              ELSE 0 END) as dias_pendente
       FROM atestados at WHERE at.mes_ano=? GROUP BY at.agente_id`, [mes_ano]);
    const { rows: abRows } = await pool.query(
      `SELECT agente_id, COUNT(*) as total FROM abonos WHERE mes_ano=? GROUP BY agente_id`, [mes_ano]);
    const { rows: dsRows } = await pool.query(
      `SELECT agente_id, COUNT(*) as total FROM doacoes_sangue WHERE mes_ano=? GROUP BY agente_id`, [mes_ano]);
    // Férias programadas — dias que cruzam com o mês
    const mesIni = mes_ano + '-01';
    const mesFim = `${mes_ano.split('-')[0]}-${String(parseInt(mes_ano.split('-')[1])+1).padStart(2,'0')}-01`;
    const { rows: ferRows } = await pool.query(
      `SELECT agente_id,
        CAST(SUM(MAX(0, julianday(MIN(data_fim, date(? ,'-1 day'))) - julianday(MAX(data_inicio, ?)) + 1)) AS INTEGER) as ferias_prog_dias
       FROM ferias
       WHERE data_inicio < ? AND data_fim >= ?
       GROUP BY agente_id`,
      [mesFim, mesIni, mesFim, mesIni]);
    const atMap = {}; atRows.forEach(r => { atMap[r.agente_id] = r; });
    const abMap = {}; abRows.forEach(r => { abMap[r.agente_id] = r.total; });
    const dsMap = {}; dsRows.forEach(r => { dsMap[r.agente_id] = r.total; });
    const ferMap = {}; ferRows.forEach(r => { ferMap[r.agente_id] = parseInt(r.ferias_prog_dias||0); });
    const data = agents.map(a => ({
      ...a,
      id: a.freq_id || null,
      atestado_dias: atMap[a.agente_id] ? parseInt(atMap[a.agente_id].total_dias||0) : 0,
      atestado_dias_cat: atMap[a.agente_id] ? parseInt(atMap[a.agente_id].dias_cat||0) : 0,
      atestado_dias_pendente: atMap[a.agente_id] ? parseInt(atMap[a.agente_id].dias_pendente||0) : 0,
      abono_count: abMap[a.agente_id] || 0,
      doacao_count: dsMap[a.agente_id] || 0,
      ferias_prog_dias: ferMap[a.agente_id] || 0,
    }));
    res.json({ data });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.salvarFrequencia = async (req, res) => {
  try {
    const { agente_id, mes_ano, chefia_imediata, ferias_inicio, ferias_fim, ferias_dias,
            falta_dias, licenca_dias, afastamento_compensacao_dias,
            declaracao_comparecimento, observacao } = req.body;
    if (!agente_id || !mes_ano) return res.status(400).json({ error: 'Agente e mes obrigatorios' });
    const { rows: ex } = await pool.query('SELECT id FROM frequencia_mensal WHERE agente_id=? AND mes_ano=?', [agente_id, mes_ano]);
    const vals = [chefia_imediata||null, ferias_inicio||null, ferias_fim||null, parseInt(ferias_dias)||0,
                  parseInt(falta_dias)||0, parseInt(licenca_dias)||0, parseInt(afastamento_compensacao_dias)||0,
                  declaracao_comparecimento||null, observacao||null];
    if (ex.length) {
      await pool.query(
        `UPDATE frequencia_mensal SET chefia_imediata=?,ferias_inicio=?,ferias_fim=?,ferias_dias=?,falta_dias=?,licenca_dias=?,afastamento_compensacao_dias=?,declaracao_comparecimento=?,observacao=?
         WHERE agente_id=? AND mes_ano=?`,
        [...vals, agente_id, mes_ano]
      );
    } else {
      await pool.query(
        `INSERT INTO frequencia_mensal (agente_id,mes_ano,chefia_imediata,ferias_inicio,ferias_fim,ferias_dias,falta_dias,licenca_dias,afastamento_compensacao_dias,declaracao_comparecimento,observacao)
         VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
        [agente_id, mes_ano, ...vals]
      );
    }
    await audit(pool, req.agente.id, 'administrativo', 'FREQUENCIA:'+mes_ano+':agente'+agente_id, req.ip);
    res.json({ message: 'Frequencia salva!' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

// ── ATESTADOS
async function upsertFreqBase(agente_id, mes_ano) {
  const { rows: ex } = await pool.query('SELECT id FROM frequencia_mensal WHERE agente_id=? AND mes_ano=?', [agente_id, mes_ano]);
  if (!ex.length) {
    await pool.query('INSERT OR IGNORE INTO frequencia_mensal (agente_id,mes_ano) VALUES (?,?)', [agente_id, mes_ano]);
  }
}

exports.listarAtestados = async (req, res) => {
  try {
    const { mes_ano, agente_id } = req.query;
    let sql = `SELECT at.*,
                      a.nome as agente_nome, a.qra, a.funcional, a.setor,
                      r.nome as responsavel_nome,
                      COALESCE((SELECT COUNT(*) FROM atestados_reposicoes ar WHERE ar.atestado_id=at.id),0) as reposicoes_feitas
               FROM atestados at
               JOIN agentes a ON at.agente_id = a.id
               LEFT JOIN agentes r ON at.responsavel_id = r.id
               WHERE 1=1`;
    const params = [];
    if (mes_ano) { sql += ' AND at.mes_ano=?'; params.push(mes_ano); }
    if (agente_id) { sql += ' AND at.agente_id=?'; params.push(agente_id); }
    sql += ' ORDER BY at.data_inicio DESC, at.id DESC';
    const { rows } = await pool.query(sql, params);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.listarReposicoesAtestado = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT ar.*, r.nome as responsavel_nome
       FROM atestados_reposicoes ar
       LEFT JOIN agentes r ON ar.responsavel_id=r.id
       WHERE ar.atestado_id=? ORDER BY ar.data_reposicao`, [req.params.id]);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.criarReposicaoAtestado = async (req, res) => {
  try {
    const { data_reposicao, observacao } = req.body;
    if (!data_reposicao) return res.status(400).json({ error: 'Data de reposicao obrigatoria' });
    const { rows: ate } = await pool.query('SELECT * FROM atestados WHERE id=?', [req.params.id]);
    if (!ate.length) return res.status(404).json({ error: 'Atestado nao encontrado' });
    const { rows: reps } = await pool.query('SELECT COUNT(*) as c FROM atestados_reposicoes WHERE atestado_id=?', [req.params.id]);
    if (reps[0].c >= ate[0].dias) return res.status(400).json({ error: 'Todas as reposicoes ja foram registradas' });
    const { rows } = await pool.query(
      `INSERT INTO atestados_reposicoes (atestado_id,data_reposicao,observacao,responsavel_id)
       VALUES (?,?,?,?) RETURNING *`,
      [req.params.id, data_reposicao, observacao||null, req.agente.id]);
    await audit(pool, req.agente.id, 'administrativo', 'REPOSICAO_ATESTADO:'+req.params.id+':'+data_reposicao, req.ip);
    res.status(201).json({ data: rows[0] });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.excluirReposicaoAtestado = async (req, res) => {
  try {
    await pool.query('DELETE FROM atestados_reposicoes WHERE id=?', [req.params.repId]);
    res.json({ message: 'Removido!' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.listarTodasReposicoes = async (req, res) => {
  try {
    const { mes_ano } = req.query;
    let sql = `SELECT ar.id, ar.data_reposicao, ar.observacao,
       at.id as atestado_id, at.data_inicio, at.data_fim, at.dias, at.tipo, at.mes_ano,
       ag.nome as agente_nome, ag.funcional, ag.qra, ag.setor,
       resp.nome as responsavel_nome,
       (SELECT COUNT(*) FROM atestados_reposicoes ar2 WHERE ar2.atestado_id=at.id AND ar2.id<=ar.id) as num_dia
       FROM atestados_reposicoes ar
       JOIN atestados at ON at.id=ar.atestado_id
       JOIN agentes ag ON ag.id=at.agente_id
       LEFT JOIN agentes resp ON resp.id=ar.responsavel_id
       WHERE 1=1`;
    const params = [];
    if (mes_ano) { sql += ' AND at.mes_ano=?'; params.push(mes_ano); }
    sql += ' ORDER BY ar.data_reposicao DESC';
    const { rows } = await pool.query(sql, params);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.criarAtestado = async (req, res) => {
  try {
    const { agente_id, mes_ano, data_inicio, data_fim, dias, tipo, descricao } = req.body;
    if (!agente_id || !mes_ano || !data_inicio || !data_fim || !dias)
      return res.status(400).json({ error: 'Campos obrigatorios: agente, mes, datas e dias' });
    await upsertFreqBase(agente_id, mes_ano);
    const { rows } = await pool.query(
      `INSERT INTO atestados (agente_id,mes_ano,data_inicio,data_fim,dias,tipo,descricao,responsavel_id)
       VALUES (?,?,?,?,?,?,?,?) RETURNING *`,
      [agente_id, mes_ano, data_inicio, data_fim, parseInt(dias), tipo||'comum', descricao||null, req.agente.id]
    );
    await audit(pool, req.agente.id, 'administrativo', 'ATESTADO:agente'+agente_id+':'+mes_ano, req.ip);
    res.status(201).json({ data: rows[0] });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.editarAtestado = async (req, res) => {
  try {
    const { data_reposicao, descricao, tipo, dias, data_inicio, data_fim } = req.body;
    await pool.query(
      `UPDATE atestados SET data_inicio=?,data_fim=?,dias=?,tipo=?,descricao=?,data_reposicao=? WHERE id=?`,
      [data_inicio, data_fim, parseInt(dias)||1, tipo||'comum', descricao||null, data_reposicao||null, req.params.id]
    );
    res.json({ message: 'Atestado atualizado!' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.excluirAtestado = async (req, res) => {
  try {
    await pool.query('DELETE FROM atestados WHERE id=?', [req.params.id]);
    res.json({ message: 'Removido!' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

// ── ABONOS
exports.listarAbonos = async (req, res) => {
  try {
    const { mes_ano, agente_id } = req.query;
    let sql = `SELECT ab.*, a.nome as agente_nome, a.qra, a.funcional, a.setor,
                      r.nome as responsavel_nome
               FROM abonos ab
               JOIN agentes a ON ab.agente_id = a.id
               LEFT JOIN agentes r ON ab.responsavel_id = r.id
               WHERE 1=1`;
    const params = [];
    if (mes_ano) { sql += ' AND ab.mes_ano=?'; params.push(mes_ano); }
    if (agente_id) { sql += ' AND ab.agente_id=?'; params.push(agente_id); }
    sql += ' ORDER BY ab.data DESC, ab.id DESC';
    const { rows } = await pool.query(sql, params);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.criarAbono = async (req, res) => {
  try {
    const { agente_id, mes_ano, data, motivo, numero_ci } = req.body;
    if (!agente_id || !mes_ano || !data) return res.status(400).json({ error: 'Agente, mes e data obrigatorios' });
    await upsertFreqBase(agente_id, mes_ano);
    const { rows } = await pool.query(
      `INSERT INTO abonos (agente_id,mes_ano,data,motivo,numero_ci,responsavel_id)
       VALUES (?,?,?,?,?,?) RETURNING *`,
      [agente_id, mes_ano, data, motivo||null, numero_ci||null, req.agente.id]
    );
    await audit(pool, req.agente.id, 'administrativo', 'ABONO:agente'+agente_id+':'+data, req.ip);
    res.status(201).json({ data: rows[0] });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.excluirAbono = async (req, res) => {
  try {
    await pool.query('DELETE FROM abonos WHERE id=?', [req.params.id]);
    res.json({ message: 'Removido!' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

// ── DOAÇÕES DE SANGUE
exports.listarDoacoesSangue = async (req, res) => {
  try {
    const { mes_ano, agente_id } = req.query;
    let sql = `SELECT ds.*, a.nome as agente_nome, a.qra, a.funcional, a.setor,
                      r.nome as responsavel_nome
               FROM doacoes_sangue ds
               JOIN agentes a ON ds.agente_id = a.id
               LEFT JOIN agentes r ON ds.responsavel_id = r.id
               WHERE 1=1`;
    const params = [];
    if (mes_ano) { sql += ' AND ds.mes_ano=?'; params.push(mes_ano); }
    if (agente_id) { sql += ' AND ds.agente_id=?'; params.push(agente_id); }
    sql += ' ORDER BY ds.data_doacao DESC, ds.id DESC';
    const { rows } = await pool.query(sql, params);
    res.json({ data: rows });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.criarDoacaoSangue = async (req, res) => {
  try {
    const { agente_id, mes_ano, data_doacao } = req.body;
    if (!agente_id || !mes_ano || !data_doacao) return res.status(400).json({ error: 'Agente, mes e data obrigatorios' });
    const { rows: recent } = await pool.query(
      `SELECT data_doacao FROM doacoes_sangue WHERE agente_id=? AND data_doacao >= date(?, '-3 months') ORDER BY data_doacao DESC LIMIT 1`,
      [agente_id, data_doacao]
    );
    if (recent.length) return res.status(400).json({ error: 'Agente ja doou sangue em ' + recent[0].data_doacao + '. Intervalo minimo de 3 meses.' });
    await upsertFreqBase(agente_id, mes_ano);
    const { rows } = await pool.query(
      `INSERT INTO doacoes_sangue (agente_id,mes_ano,data_doacao,responsavel_id)
       VALUES (?,?,?,?) RETURNING *`,
      [agente_id, mes_ano, data_doacao, req.agente.id]
    );
    await audit(pool, req.agente.id, 'administrativo', 'DOACAO_SANGUE:agente'+agente_id+':'+data_doacao, req.ip);
    res.status(201).json({ data: rows[0] });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

exports.excluirDoacaoSangue = async (req, res) => {
  try {
    await pool.query('DELETE FROM doacoes_sangue WHERE id=?', [req.params.id]);
    res.json({ message: 'Removido!' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};

// ── ALMOXARIFADO - update movimentarItem to save data_prev_devolucao

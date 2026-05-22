const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const ctrl = require('./controllers/index');
const { auth, perfil, modulo } = require('./middleware/auth');

const app = express();
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '5mb' }));

// AUTH - public
app.post('/api/auth/login',  ctrl.login);
app.get ('/api/auth/me',     auth, ctrl.me);
app.put ('/api/auth/senha',  auth, ctrl.trocarSenha);

// DASHBOARD - admin only
app.get('/api/dashboard', auth, perfil('administrador'), ctrl.dashboard);

// AGENTES - admin: full, gestor_geral: read only, restrito: blocked
app.get ('/api/agentes',                 auth, ctrl.listarAgentes);   // filtered in controller
app.post('/api/agentes',                 auth, perfil('administrador'), ctrl.criarAgente);
app.put ('/api/agentes/:id',             auth, perfil('administrador'), ctrl.editarAgente);
app.put ('/api/agentes/:id/senha',       auth, perfil('administrador'), ctrl.alterarSenha);
app.post('/api/agentes/:id/reset-senha', auth, perfil('administrador'), ctrl.resetarSenha);

// ARMARIA
app.get   ('/api/armaria/estoque',        auth, modulo('armaria','any'), ctrl.listarEstoque);
app.post  ('/api/armaria/estoque',        auth, modulo('armaria','gestor'), ctrl.criarEstoque);
app.put   ('/api/armaria/estoque/:id',    auth, modulo('armaria','gestor'), ctrl.editarEstoque);
app.delete('/api/armaria/estoque/:id',    auth, perfil('administrador'), ctrl.excluirEstoque);
app.get   ('/api/armaria/armamentos',     auth, modulo('armaria','any'), ctrl.listarArmamentos);
app.post  ('/api/armaria/armamentos',     auth, modulo('armaria','gestor'), ctrl.criarArmamento);
app.put   ('/api/armaria/armamentos/:id', auth, modulo('armaria','gestor'), ctrl.editarArmamento);
app.delete('/api/armaria/armamentos/:id', auth, perfil('administrador'), ctrl.excluirArmamento);
app.get   ('/api/armaria/armamentos/movimentacoes', auth, modulo('armaria','any'), ctrl.listarMovimentacoesArm);
app.post  ('/api/armaria/armamentos/movimentar',    auth, modulo('armaria','gestor'), ctrl.movimentarArmamento);
app.get   ('/api/armaria/armamentos/:id/historico', auth, modulo('armaria','any'), ctrl.historicoArmamento);
app.get   ('/api/agentes/:id/ficha',               auth, ctrl.fichaAgente);
app.get   ('/api/armaria/movimentacoes',  auth, modulo('armaria','any'), ctrl.listarMovimentacoes);
app.post  ('/api/armaria/movimentacoes',  auth, modulo('armaria','gestor'), ctrl.registrarMovimentacao);
// Entradas de armamentos
app.get   ('/api/armaria/entradas',       auth, modulo('armaria','any'), ctrl.listarEntradas);
app.post  ('/api/armaria/entradas',       auth, modulo('armaria','gestor'), ctrl.criarEntrada);
app.get   ('/api/armaria/entradas/:id',   auth, modulo('armaria','any'), ctrl.fichaEntrada);
// Granadas e artefatos
app.get   ('/api/armaria/granadas',                auth, modulo('armaria','any'), ctrl.listarGranadas);
app.post  ('/api/armaria/granadas',                auth, modulo('armaria','gestor'), ctrl.criarGranada);
app.put   ('/api/armaria/granadas/:id',            auth, modulo('armaria','gestor'), ctrl.editarGranada);
app.delete('/api/armaria/granadas/:id',            auth, perfil('administrador'), ctrl.excluirGranada);
app.get   ('/api/armaria/granadas/movimentacoes',  auth, modulo('armaria','any'), ctrl.listarMovimentacoesGranadas);
app.post  ('/api/armaria/granadas/movimentar',     auth, modulo('armaria','gestor'), ctrl.movimentarGranada);
// Cautelas de municoes
app.get   ('/api/armaria/municoes/cautelas',           auth, modulo('armaria','any'), ctrl.listarCautelasMunicoes);
app.post  ('/api/armaria/municoes/cautelas',           auth, modulo('armaria','gestor'), ctrl.criarCautelaMunicoes);
app.put   ('/api/armaria/municoes/cautelas/:id/devolver', auth, modulo('armaria','gestor'), ctrl.devolverCautelaMunicoes);
// Deposito de municoes
app.post  ('/api/armaria/municoes/deposito',           auth, modulo('armaria','gestor'), ctrl.enviarDeposito);
app.post  ('/api/armaria/municoes/deposito/:id/baixa', auth, modulo('armaria','gestor'), ctrl.baixarDeposito);
// Entradas de municoes (NF)
app.get ('/api/armaria/municoes/entradas',        auth, modulo('armaria','any'), ctrl.listarEntradasMunicoes);
app.post('/api/armaria/municoes/entradas',         auth, modulo('armaria','gestor'), ctrl.criarEntradaMunicoes);
app.get ('/api/armaria/municoes/entradas/:id',     auth, modulo('armaria','any'), ctrl.fichaEntradaMunicoes);

// ALMOXARIFADO
app.get ('/api/almoxarifado',                  auth, modulo('almoxarifado','any'), ctrl.listarItens);
app.post('/api/almoxarifado',                  auth, modulo('almoxarifado','gestor'), ctrl.criarItem);
app.get ('/api/almoxarifado/movimentacoes',    auth, modulo('almoxarifado','any'), ctrl.listarMovimentacoesAlmox);
app.post('/api/almoxarifado/movimentar',       auth, modulo('almoxarifado','gestor'), ctrl.movimentarItem);
app.get ('/api/almoxarifado/:id/historico',    auth, modulo('almoxarifado','any'), ctrl.historicoAlmoxItem);
app.put ('/api/almoxarifado/:id',              auth, modulo('almoxarifado','gestor'), ctrl.editarItem);

// FROTA - usuario can cautelar/descautela; gestor can do everything
app.get ('/api/frota/viaturas',               auth, modulo('frota','any'), ctrl.listarViaturas);
app.post('/api/frota/viaturas',               auth, modulo('frota','gestor'), ctrl.criarViatura);
app.put ('/api/frota/viaturas/:id',           auth, modulo('frota','gestor'), ctrl.editarViatura);
app.get ('/api/frota/viaturas/:id/historico', auth, modulo('frota','any'), ctrl.historicoViatura);
app.get ('/api/frota/relatorio-km',           auth, modulo('frota','any'), ctrl.relatorioKmFrota);
app.post('/api/frota/manutencao',             auth, modulo('frota','gestor'), ctrl.enviarManutencao);
app.post('/api/frota/retorno/:id',            auth, modulo('frota','gestor'), ctrl.retornoManutencao);
app.get ('/api/frota/cautelas/ativas',        auth, modulo('frota','any'), ctrl.listarCautelasAtivas);
app.post('/api/frota/cautelas',               auth, modulo('frota','any'), ctrl.abrirCautela);
app.put ('/api/frota/cautelas/:id/encerrar',  auth, modulo('frota','any'), ctrl.encerrarCautela);

// ABASTECIMENTOS
app.get ('/api/frota/abastecimentos',          auth, modulo('frota','any'), ctrl.listarAbastecimentos);
app.post('/api/frota/abastecimentos',          auth, modulo('frota','any'), ctrl.criarAbastecimento);
app.get ('/api/frota/abastecimentos/relatorio',auth, modulo('frota','any'), ctrl.relatorioAbastecimentos);

// OPERAÇÕES
app.get   ('/api/operacoes',     auth, ctrl.listarOperacoes);
app.post  ('/api/operacoes',     auth, perfil('administrador'), ctrl.criarOperacao);
app.put   ('/api/operacoes/:id', auth, perfil('administrador'), ctrl.editarOperacao);
app.delete('/api/operacoes/:id', auth, perfil('administrador'), ctrl.excluirOperacao);

// SUPERVISAO - gestor only (usuario = bloqueado)
app.get ('/api/supervisao',              auth, modulo('supervisao','gestor'), ctrl.listarServicos);
app.post('/api/supervisao',              auth, modulo('supervisao','gestor'), ctrl.abrirServico);
app.get ('/api/supervisao/:id',          auth, modulo('supervisao','gestor'), ctrl.buscarServico);
app.put ('/api/supervisao/:id/obs',      auth, modulo('supervisao','gestor'), ctrl.salvarObs);
app.post('/api/supervisao/:id/encerrar', auth, modulo('supervisao','gestor'), ctrl.encerrarServico);
app.post('/api/supervisao/:id/equipes',  auth, modulo('supervisao','gestor'), ctrl.adicionarEquipe);

// ADMINISTRATIVO - admin only
app.get   ('/api/admin/banco-horas',        auth, perfil('administrador'), ctrl.listarBancoHoras);
app.post  ('/api/admin/banco-horas',        auth, perfil('administrador'), ctrl.criarMovBancoHoras);
app.get   ('/api/admin/banco-horas/saldos', auth, perfil('administrador'), ctrl.saldosBancoHoras);
app.get   ('/api/admin/audiencias',         auth, perfil('administrador'), ctrl.listarAudiencias);
app.post  ('/api/admin/audiencias',         auth, perfil('administrador'), ctrl.criarAudiencia);
app.put   ('/api/admin/audiencias/:id',     auth, perfil('administrador'), ctrl.editarAudiencia);
app.delete('/api/admin/audiencias/:id',     auth, perfil('administrador'), ctrl.excluirAudiencia);
app.get   ('/api/admin/frequencia',         auth, perfil('administrador'), ctrl.listarFrequencia);
app.post  ('/api/admin/frequencia',         auth, perfil('administrador'), ctrl.salvarFrequencia);
// Atestados
app.get   ('/api/admin/reposicoes-atestados',            auth, perfil('administrador'), ctrl.listarTodasReposicoes);
app.get   ('/api/admin/atestados',                      auth, perfil('administrador'), ctrl.listarAtestados);
app.post  ('/api/admin/atestados',                      auth, perfil('administrador'), ctrl.criarAtestado);
app.put   ('/api/admin/atestados/:id',                  auth, perfil('administrador'), ctrl.editarAtestado);
app.delete('/api/admin/atestados/:id',                  auth, perfil('administrador'), ctrl.excluirAtestado);
app.get   ('/api/admin/atestados/:id/reposicoes',       auth, perfil('administrador'), ctrl.listarReposicoesAtestado);
app.post  ('/api/admin/atestados/:id/reposicoes',       auth, perfil('administrador'), ctrl.criarReposicaoAtestado);
app.delete('/api/admin/atestados/:id/reposicoes/:repId',auth, perfil('administrador'), ctrl.excluirReposicaoAtestado);
// Abonos
app.get   ('/api/admin/abonos',             auth, perfil('administrador'), ctrl.listarAbonos);
app.post  ('/api/admin/abonos',             auth, perfil('administrador'), ctrl.criarAbono);
app.delete('/api/admin/abonos/:id',         auth, perfil('administrador'), ctrl.excluirAbono);
// Doações de sangue
app.get   ('/api/admin/doacoes-sangue',     auth, perfil('administrador'), ctrl.listarDoacoesSangue);
app.post  ('/api/admin/doacoes-sangue',     auth, perfil('administrador'), ctrl.criarDoacaoSangue);
app.delete('/api/admin/doacoes-sangue/:id', auth, perfil('administrador'), ctrl.excluirDoacaoSangue);

// ESCALAS
app.get   ('/api/escalas',                          auth, ctrl.listarEscalas);
app.post  ('/api/escalas',                          auth, perfil('administrador'), ctrl.criarEscala);
app.get   ('/api/escalas/minha',                    auth, ctrl.minhaEscala);
app.get   ('/api/escalas/:id',                      auth, ctrl.buscarEscala);
app.put   ('/api/escalas/:id',                      auth, perfil('administrador'), ctrl.editarEscala);
app.delete('/api/escalas/:id',                      auth, perfil('administrador'), ctrl.excluirEscala);
app.put   ('/api/escalas/:id/dias',                 auth, perfil('administrador'), ctrl.salvarDiasEscala);
app.post  ('/api/escalas/:id/aplicar',              auth, perfil('administrador'), ctrl.aplicarAgentes);
app.delete('/api/escalas/:id/agentes/:agId',        auth, perfil('administrador'), ctrl.removerAgente);
app.put   ('/api/escalas/:id/agentes/:agId/dias',   auth, perfil('administrador'), ctrl.salvarDiasAgente);

// FÉRIAS
app.get   ('/api/admin/ferias',     auth, perfil('administrador'), ctrl.listarFerias);
app.post  ('/api/admin/ferias',     auth, perfil('administrador'), ctrl.criarFerias);
app.put   ('/api/admin/ferias/:id', auth, perfil('administrador'), ctrl.editarFerias);
app.delete('/api/admin/ferias/:id', auth, perfil('administrador'), ctrl.excluirFerias);

// PERMUTAS — admin gerencia, mobile cria/responde
app.get('/api/admin/permutas',              auth, perfil('administrador'), ctrl.listarPermutas);
app.put('/api/admin/permutas/:id/aprovar',  auth, perfil('administrador'), ctrl.aprovarPermuta);
app.get('/api/mobile/permutas',             auth, ctrl.listarMinhasPermutas);
app.post('/api/mobile/permutas',            auth, ctrl.criarPermuta);
app.put('/api/mobile/permutas/:id/responder', auth, ctrl.responderPermuta);
app.put('/api/mobile/permutas/:id/cancelar',  auth, ctrl.cancelarPermuta);

// MOBILE — agente vê os próprios dados (qualquer perfil autenticado)
app.get('/api/mobile/meu-banco-horas',       auth, ctrl.meuBancoHoras);
app.get('/api/mobile/minhas-ferias',         auth, ctrl.minhasFerias);
app.get('/api/mobile/minhas-audiencias',     auth, ctrl.minhasAudiencias);
app.get('/api/mobile/meus-materiais',        auth, ctrl.meusMateriaisCautelados);
// MOBILE FROTA — rotas sem restrição de módulo (todo agente pode cautelar viatura)
app.get('/api/mobile/viaturas',              auth, ctrl.listarViaturas);
app.get('/api/mobile/cautelas/ativas',       auth, ctrl.listarCautelasAtivas);
app.post('/api/mobile/cautelas',             auth, ctrl.abrirCautela);
app.put('/api/mobile/cautelas/:id/encerrar', auth, ctrl.encerrarCautela);
app.post('/api/mobile/abastecimentos',       auth, ctrl.criarAbastecimento);

// AUDITORIA - admin only
app.get('/api/auditoria', auth, perfil('administrador'), ctrl.listarAuditoria);
app.get('/api/health', (req, res) => res.json({ ok: true }));


// PWA MOBILE
const path = require('path');
const MOBILE_HTML = require('./mobile');
app.get('/mobile', (req, res) => res.send(MOBILE_HTML));
app.get('/mobile/manifest.json', (req, res) => res.sendFile(path.join(__dirname, '../public/manifest.json')));
app.get('/mobile/icon-192.svg', (req, res) => { res.setHeader('Content-Type','image/svg+xml'); res.sendFile(path.join(__dirname, '../public/icon-192.svg')); });
app.get('/mobile/icon-512.svg', (req, res) => { res.setHeader('Content-Type','image/svg+xml'); res.sendFile(path.join(__dirname, '../public/icon-512.svg')); });

// FRONTEND
const HTML = require('./frontend');
app.get('*', (req, res) => {
  const ua = req.headers['user-agent'] || '';
  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(ua);
  if (isMobile && req.path === '/') return res.redirect('/mobile');
  res.send(HTML);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('\n  ====================================');
  console.log('  BLUECORE ERP - GCM Serra v4.3');
  console.log('  http://localhost:' + PORT);
  console.log('  Login: 0000 / Bluecore@2025');
  console.log('  ====================================\n');
});

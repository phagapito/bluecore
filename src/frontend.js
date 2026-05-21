module.exports = (function(){
var H = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>BLUECORE - GCM Serra</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet"/>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Inter',sans-serif;background:#f3f4f6;color:#1f2937;font-size:14px}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:4px}
.app{display:flex;height:100vh;overflow:hidden}
.sb{width:220px;flex-shrink:0;background:#1A3A5C;display:flex;flex-direction:column}
.sb-top{padding:20px 18px 16px;border-bottom:1px solid rgba(255,255,255,.08)}
.sb-nm{color:#fff;font-size:18px;font-weight:700;letter-spacing:3px}
.sb-sm{color:rgba(255,255,255,.35);font-size:10px;margin-top:2px}
.nav{flex:1;padding:8px 0;overflow-y:auto}
.ns{padding:14px 18px 4px;font-size:9px;color:rgba(255,255,255,.25);letter-spacing:1.5px;text-transform:uppercase}
.ni{display:flex;align-items:center;gap:10px;padding:9px 18px;cursor:pointer;color:rgba(255,255,255,.55);font-size:13px;border-left:2px solid transparent;transition:all .15s}
.ni:hover{background:rgba(255,255,255,.06);color:rgba(255,255,255,.85)}
.ni.on{background:rgba(255,255,255,.1);color:#fff;border-left-color:#5BB8F5}
.sb-bot{padding:12px 16px;border-top:1px solid rgba(255,255,255,.08);display:flex;align-items:center;gap:10px}
.av{width:30px;height:30px;border-radius:50%;background:#2E75B6;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:#fff;flex-shrink:0}
.unm{color:#fff;font-size:12px;font-weight:500}
.uro{color:rgba(255,255,255,.35);font-size:10px;text-transform:capitalize}
.ulg{color:rgba(255,255,255,.3);font-size:11px;cursor:pointer;background:none;border:none;padding:0;margin-top:3px;font-family:inherit}
.main{flex:1;display:flex;flex-direction:column;overflow:hidden}
.topbar{display:flex;align-items:center;padding:0 24px;height:52px;border-bottom:1px solid #e5e7eb;background:#fff;flex-shrink:0}
.topbar-t{font-size:15px;font-weight:600;color:#111827}
.content{flex:1;overflow-y:auto;padding:24px}
.card{background:#fff;border-radius:12px;border:1px solid #e5e7eb}
.kgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px}
.kc{background:#fff;border-radius:12px;border:1px solid #e5e7eb;padding:16px}
.kv{font-size:24px;font-weight:600;color:#111827;margin:4px 0}
.kl{font-size:11px;color:#6b7280}
.ks{font-size:11px;color:#9ca3af;margin-top:2px}
.ph{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:20px}
.pt{font-size:18px;font-weight:600;color:#111827}
.ps{font-size:12px;color:#6b7280;margin-top:2px}
.pa{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.btn{display:inline-flex;align-items:center;gap:6px;padding:7px 14px;border-radius:8px;border:1px solid #e5e7eb;background:#fff;color:#374151;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit}
.btn:hover{background:#f9fafb}
.btn:disabled{opacity:.5;cursor:not-allowed}
.btn-p{background:#1A3A5C;color:#fff;border-color:#1A3A5C}
.btn-p:hover{background:#2E75B6}
.btn-d{background:#dc2626;color:#fff;border-color:#dc2626}
.btn-g{background:#16a34a;color:#fff;border-color:#16a34a}
.btn-y{background:#ca8a04;color:#fff;border-color:#ca8a04}
.btn-sm{padding:5px 10px;font-size:12px}
.bdg{display:inline-block;font-size:10px;font-weight:500;padding:2px 8px;border-radius:999px}
.b-blue{background:#dbeafe;color:#1e40af}
.b-green{background:#dcfce7;color:#166534}
.b-yellow{background:#fef9c3;color:#854d0e}
.b-red{background:#fee2e2;color:#991b1b}
.b-gray{background:#f3f4f6;color:#6b7280}
.b-orange{background:#ffedd5;color:#9a3412}
.b-purple{background:#f3e8ff;color:#6b21a8}
table{width:100%;border-collapse:collapse;font-size:13px}
thead tr{background:#f9fafb;border-bottom:1px solid #e5e7eb}
th{text-align:left;padding:10px 14px;font-size:11px;font-weight:500;color:#6b7280;text-transform:uppercase;letter-spacing:.4px;white-space:nowrap}
td{padding:10px 14px;color:#374151;border-bottom:1px solid #f3f4f6}
tr:last-child td{border-bottom:none}
tr:hover td{background:#f9fafb}
.fg{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.f1{display:flex;flex-direction:column;gap:4px}
.f1.full{grid-column:span 2}
label{font-size:11px;font-weight:500;color:#6b7280;display:block;margin-bottom:3px}
input,select,textarea{border:1px solid #d1d5db;border-radius:8px;padding:8px 10px;font-size:13px;font-family:inherit;color:#111827;background:#fff;outline:none;width:100%}
input:focus,select:focus,textarea:focus{border-color:#2E75B6;box-shadow:0 0 0 3px rgba(46,117,182,.1)}
textarea{resize:none;height:80px}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:50;display:flex;align-items:center;justify-content:center;padding:16px}
.modal{background:#fff;border-radius:16px;width:100%;max-height:90vh;display:flex;flex-direction:column;overflow:hidden}
.modal-sm{max-width:420px}.modal-md{max-width:580px}.modal-lg{max-width:760px}.modal-xl{max-width:960px}
.modal-h{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid #e5e7eb}
.modal-t{font-size:15px;font-weight:600}
.modal-x{background:none;border:none;font-size:22px;cursor:pointer;color:#9ca3af;line-height:1;padding:0}
.modal-b{overflow-y:auto;padding:20px;flex:1}
.modal-f{display:flex;justify-content:flex-end;gap:8px;padding:14px 20px;border-top:1px solid #e5e7eb}
.pag{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-top:1px solid #f3f4f6;font-size:12px;color:#6b7280}
.sbar{display:flex;gap:8px;padding:12px 16px;border-bottom:1px solid #f3f4f6;align-items:center;flex-wrap:wrap}
.sbar input,.sbar select{flex:1;min-width:120px;max-width:220px}
.two{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}
.ac{border:1px solid #e5e7eb;border-radius:10px;padding:14px;background:#fff}
.ah{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.at{font-size:13px;font-weight:600}
.ar{display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid #f3f4f6;font-size:12px}
.ar:last-child{border-bottom:none}
.tabs{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap}
.tab{padding:7px 16px;border-radius:8px;font-size:13px;cursor:pointer;border:1px solid #e5e7eb;background:#fff;color:#6b7280;font-weight:500;font-family:inherit}
.tab.on{background:#1A3A5C;color:#fff;border-color:#1A3A5C}
.empty{display:flex;align-items:center;justify-content:center;padding:40px;color:#9ca3af;font-size:13px}
.info{background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:10px 14px;font-size:12px;color:#1e40af;margin-bottom:10px}
.warn{background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:10px 14px;font-size:12px;color:#92400e;margin-bottom:10px}
.sec{font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:.5px;margin:14px 0 8px}
.ci{display:flex;align-items:center;gap:8px;padding:8px 12px;border:1px solid #e5e7eb;border-radius:8px;cursor:pointer;font-size:13px}
.ci.on{border-color:#16a34a;background:#f0fdf4;color:#166534}
.lp{min-height:100vh;background:#1A3A5C;display:flex;align-items:center;justify-content:center;padding:16px}
.lb{background:#fff;border-radius:20px;padding:36px;width:100%;max-width:380px}
.ln{font-size:28px;font-weight:700;letter-spacing:3px;color:#1A3A5C;text-align:center}
.ls{font-size:12px;color:#9ca3af;text-align:center;margin:4px 0 28px}
#toast-c{position:fixed;top:20px;right:20px;z-index:100;display:flex;flex-direction:column;gap:8px}
.toast{background:#111827;color:#fff;padding:12px 18px;border-radius:10px;font-size:13px}
.toast.ok{border-left:3px solid #16a34a}
.toast.er{border-left:3px solid #dc2626}
.eq-box{border:1px solid #e5e7eb;border-radius:8px;padding:12px;margin-bottom:8px;background:#f9fafb}
.eq-h{font-weight:600;color:#1A3A5C;margin-bottom:6px;font-size:13px}
.eq-g{display:grid;grid-template-columns:1fr 1fr 1fr;gap:3px 12px;font-size:12px}
.add-eq-box{border:1px dashed #d1d5db;border-radius:8px;padding:14px;margin-bottom:14px}
.flt-bar{background:#fff;border:1px solid #e5e7eb;border-radius:10px;padding:12px 16px;margin-bottom:14px;display:flex;gap:8px;flex-wrap:wrap;align-items:center;box-shadow:0 1px 4px rgba(0,0,0,.05)}
.adm-sh{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid #f3f4f6}
.adm-sh-title{font-size:14px;font-weight:700;color:#1A3A5C}
.adm-sh-sub{font-size:11px;color:#9ca3af;margin-top:2px}
.adm-sh-acts{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
</style>
</head>
<body>
<div id="toast-c"></div>
<div id="root"></div>
<script>
var api={
  h:function(){return{'Content-Type':'application/json','Authorization':'Bearer '+(localStorage.getItem('t')||'')};},
  req:function(m,u,b){
    return fetch(u,{method:m,headers:this.h(),body:b?JSON.stringify(b):undefined})
      .then(function(r){return r.json().then(function(d){if(r.status===401){localStorage.clear();location.reload();}if(!r.ok)throw new Error(d.error||'Erro');return d;});});
  },
  get:function(u){return api.req('GET',u);},
  post:function(u,b){return api.req('POST',u,b);},
  put:function(u,b){return api.req('PUT',u,b);},
  del:function(u){return api.req('DELETE',u);}
};
function toast(msg,t){t=t||'ok';var c=document.getElementById('toast-c');var el=document.createElement('div');el.className='toast '+t;el.textContent=msg;c.appendChild(el);setTimeout(function(){if(c.contains(el))c.removeChild(el);},4000);}
function fmtTs(s){try{return new Date(s).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',year:'2-digit',hour:'2-digit',minute:'2-digit'});}catch(e){return s||'--';}}
function auditBdg(a){
  if(!a)return bdg('--','gray');
  if(a==='LOGIN')return bdg('Login','blue');
  if(a.startsWith('CREATE'))return bdg(a,'green');
  if(a.startsWith('DELETE'))return bdg(a,'red');
  if(a.startsWith('UPDATE')||a.startsWith('SENHA'))return bdg(a,'yellow');
  if(a.startsWith('CAUTELA'))return bdg('Cautela','blue');
  if(a.startsWith('DESCAUTELA'))return bdg('Descautela','green');
  if(a.startsWith('MANUTENCAO'))return bdg('Manutencao','yellow');
  if(a.startsWith('ABRIR_SERVICO'))return bdg('Abre Servico','blue');
  if(a.startsWith('ENCERRAR_SERVICO'))return bdg('Encerra Servico','gray');
  if(a.startsWith('ENTRADA')||a.startsWith('SAIDA'))return bdg(a,a.startsWith('ENTRADA')?'green':'red');
  return bdg(a,'gray');
}
function fmtDt(s){try{return new Date(s+'T12:00:00').toLocaleDateString('pt-BR');}catch(e){return s||'--';}}
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function bdg(t,c){return '<span class="bdg b-'+c+'">'+esc(t)+'</span>';}
function svBdg(s){var m={disponivel:['green','Disponivel'],cautelada:['blue','Em servico'],manutencao:['yellow','Manutencao'],baixada:['gray','Baixada']};var x=m[s]||['gray',s];return bdg(x[1],x[0]);}
function saBdg(s){var m={disponivel:['green','Disponivel'],cautelado:['blue','Cautelado'],manutencao:['yellow','Manutencao'],baixado:['gray','Baixado'],apreendido:['red','Apreendido']};var x=m[s]||['gray',s];return bdg(x[1],x[0]);}
function spBdg(p){var m={administrador:['red','Admin'],gestor_geral:['purple','Gestor Geral'],restrito:['gray','Restrito']};var x=m[p]||['gray',p];return bdg(x[1],x[0]);}
function permSummary(a){
  if(a.perfil==='administrador')return bdg('Acesso Total','red');
  if(a.perfil==='gestor_geral')return bdg('Todos os modulos','purple');
  var p={};try{p=typeof a.permissoes==='object'&&a.permissoes?a.permissoes:JSON.parse(a.permissoes_json||'{}');}catch{}
  var mods=Object.keys(p).filter(function(k){return p[k]!=='bloqueado';});
  if(!mods.length)return bdg('Sem acesso','red');
  return mods.map(function(k){return bdg(k+':'+(p[k]==='gestor'?'G':'V'),p[k]==='gestor'?'blue':'gray');}).join(' ');
}
function siBdg(s){var m={ativo:['green','Ativo'],cautelado:['blue','Cautelado'],baixado:['gray','Baixado']};var x=m[s]||['gray',s];return bdg(x[1],x[0]);}
function condBdg(c){var m={otimo:'green',bom:'green',regular:'yellow',ruim:'red',inoperante:'red'};return bdg(c,m[c]||'gray');}
var SETORES=['ROMU','ADM','DPC','VIDEOMONITORAMENTO','CONVENCIONAL','PROJESP','FROTA','ARMARIA','ALMOXARIFADO'];
var LETRAS=['A','B','C','D','E','F'];
var NIVEIS=['vazio','quarto','metade','tres_quartos','cheio'];
var CK_ITEMS=['Pneus (4+estepe)','Lanternas e faros','Giroflex e sirene','Extintor valido','Radio comunicador','Kit primeiros socorros','Documentacao','Interior limpo'];
function selOpts(opts,val){return opts.map(function(o){var v=Array.isArray(o)?o[0]:o,l=Array.isArray(o)?o[1]:o;return '<option value="'+esc(v)+'"'+(String(v)===String(val)?' selected':'')+'>'+esc(l)+'</option>';}).join('');}
function field(label,inputHtml,full){return '<div class="f1'+(full?' full':'')+'"><label>'+label+'</label>'+inputHtml+'</div>';}
function tableHtml(headers,rows){var h=headers.map(function(x){return '<th>'+x+'</th>';}).join('');var r=rows.length?rows.join(''):'<tr><td colspan="'+headers.length+'"><div class="empty">Nenhum registro.</div></td></tr>';return '<div class="card"><div style="overflow-x:auto"><table><thead><tr>'+h+'</tr></thead><tbody>'+r+'</tbody></table></div></div>';}
function ph(title,sub,actHtml){return '<div class="ph"><div><div class="pt">'+esc(title)+'</div>'+(sub?'<div class="ps">'+esc(sub)+'</div>':'')+' </div>'+(actHtml?'<div class="pa">'+actHtml+'</div>':'')+' </div>';}
function openModal(id,title,size,bodyHtml,footerHtml){closeModal(id);var ov=document.createElement('div');ov.className='overlay';ov.id='modal-'+id;ov.innerHTML='<div class="modal modal-'+(size||'md')+'"><div class="modal-h"><span class="modal-t">'+esc(title)+'</span><button class="modal-x">&times;</button></div><div class="modal-b">'+bodyHtml+'</div>'+(footerHtml?'<div class="modal-f">'+footerHtml+'</div>':'')+' </div>';ov.querySelector('.modal-x').onclick=function(){closeModal(id);};ov.onclick=function(e){if(e.target===ov)closeModal(id);};document.body.appendChild(ov);}
function closeModal(id){var el=document.getElementById('modal-'+id);if(el)el.remove();}
var APP={page:'dashboard',agente:null};
(function(){try{APP.agente=JSON.parse(localStorage.getItem('u'));}catch(e){}})();
function isAdmin(){return APP.agente&&APP.agente.perfil==='administrador';}
function isGestorGeral(){return APP.agente&&(APP.agente.perfil==='gestor_geral'||isAdmin());}
// Check if user has at least 'usuario' access to a module
function canView(mod){
  var ag=APP.agente; if(!ag)return false;
  if(isAdmin())return true;
  if(ag.perfil==='gestor_geral')return true;
  if(ag.perfil==='restrito'){var p=(ag.permissoes||{})[mod]||'bloqueado';return p!=='bloqueado';}
  return false;
}
// Check if user has 'gestor' access to a module
function canEdit(mod){
  var ag=APP.agente; if(!ag)return false;
  if(isAdmin())return true;
  if(ag.perfil==='gestor_geral')return true;
  if(ag.perfil==='restrito'){return ((ag.permissoes||{})[mod]||'bloqueado')==='gestor';}
  return false;
}
// Legacy helpers for backward compat in non-modular sections
function isGestor(){return isGestorGeral();}
function pdfFromHtml(html,filename){var w=window.open('','_blank');if(!w){toast('Popup bloqueado. Habilite popups para este site.','er');return;}w.document.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Relatorio</title><style>body{font-family:Arial,sans-serif;margin:0}@media print{button{display:none}}</style></head><body>'+html+'</body></html>');w.document.close();setTimeout(function(){w.print();},400);}
var NAV_ALL=[
  {id:'dashboard',   label:'Dashboard',    g:'Principal', check:function(){return isAdmin();}},
  {id:'armaria',     label:'Armaria',      g:'Modulos',   check:function(){return isAdmin()||isGestorGeral()||canView('armaria');}},
  {id:'agentes',     label:'Agentes',      g:'Modulos',   check:function(){return isAdmin()||isGestorGeral();}},
  {id:'almoxarifado',label:'Almoxarifado', g:'Modulos',   check:function(){return isAdmin()||isGestorGeral()||canView('almoxarifado');}},
  {id:'frota',       label:'Frota',        g:'Modulos',   check:function(){return isAdmin()||isGestorGeral()||canView('frota');}},
  {id:'operacoes',      label:'Operacoes',     g:'Modulos',   check:function(){return isAdmin()||isGestorGeral();}},
  {id:'supervisao',     label:'Supervisao',    g:'Modulos',   check:function(){return isAdmin()||isGestorGeral()||canEdit('supervisao');}},
  {id:'minha_escala',   label:'Minha Escala',  g:'Modulos',   check:function(){return true;}},
  {id:'administrativo', label:'Administrativo',g:'Modulos',   check:function(){return isAdmin();}},
  {id:'auditoria',      label:'Auditoria',     g:'Sistema',   check:function(){return isAdmin();}}
];
function getNav(){return NAV_ALL.filter(function(n){return n.check();});}
function navigate(page){APP.page=page;render();}
function logout(){localStorage.clear();APP.agente=null;render();}
function renderLogin(){
  document.getElementById('root').innerHTML='<div class="lp"><div class="lb"><div class="ln">BLUECORE</div><div class="ls">Guarda Municipal da Serra</div><div style="display:flex;flex-direction:column;gap:14px"><div class="f1"><label>Funcional</label><input id="lf" placeholder="Ex: 0000"/></div><div class="f1"><label>Senha</label><input id="ls" type="password" placeholder="..."/></div><button class="btn btn-p" id="lbtn">Entrar</button></div><p style="font-size:11px;color:#9ca3af;text-align:center;margin-top:20px">Login: <b>0000</b> / <b>Bluecore@2025</b></p></div></div>';
  var doLogin=function(){api.post('/api/auth/login',{funcional:document.getElementById('lf').value,senha:document.getElementById('ls').value}).then(function(d){APP.agente=d.agente;localStorage.setItem('u',JSON.stringify(d.agente));localStorage.setItem('t',d.token);toast('Bem-vindo, '+d.agente.nome+'!');render();}).catch(function(e){toast(e.message,'er');});};
  document.getElementById('lbtn').onclick=doLogin;
  document.getElementById('ls').onkeydown=function(e){if(e.keyCode===13)doLogin();};
  document.getElementById('lf').onkeydown=function(e){if(e.keyCode===13)document.getElementById('ls').focus();};
}
function render(){
  if(!APP.agente){renderLogin();return;}
  var ag=APP.agente;
  var NAV=getNav();var grupos=[];NAV.forEach(function(n){if(grupos.indexOf(n.g)<0)grupos.push(n.g);});
  var navHtml=grupos.map(function(g){var items=NAV.filter(function(n){return n.g===g&&(!n.admin||isAdmin());});if(!items.length)return '';return '<div class="ns">'+g+'</div>'+items.map(function(n){return '<div class="ni'+(APP.page===n.id?' on':'')+'" data-page="'+n.id+'">'+n.label+'</div>';}).join('');}).join('');
  var pageLabel=(NAV_ALL.find(function(n){return n.id===APP.page;})||{label:'BLUECORE'}).label;
  document.getElementById('root').innerHTML='<div class="app"><div class="sb"><div class="sb-top"><div class="sb-nm">BLUECORE</div><div class="sb-sm">GCM Serra</div></div><div class="nav" id="nav-el">'+navHtml+'</div><div class="sb-bot"><div class="av">'+(ag.nome||'?').charAt(0)+'</div><div><div class="unm">'+esc(ag.nome)+'</div><div class="uro">'+esc(ag.perfil)+'</div><button class="ulg" id="logout-btn">Sair</button></div></div></div><div class="main"><div class="topbar"><span class="topbar-t">'+esc(pageLabel)+'</span></div><div class="content" id="pc">Carregando...</div></div></div>';
  document.getElementById('nav-el').onclick=function(e){var el=e.target.closest('.ni');if(el&&el.dataset.page)navigate(el.dataset.page);};
  document.getElementById('logout-btn').onclick=logout;
  renderPage();
}
function pc(){return document.getElementById('pc');}
function renderPage(){
  var pages={dashboard:pgDash,armaria:pgArmaria,agentes:pgAgentes,almoxarifado:pgAlmox,frota:pgFrota,operacoes:pgOperacoes,supervisao:pgSup,minha_escala:pgMinhaEscala,administrativo:pgAdmin,auditoria:pgAudit};
  var nav=getNav();
  var allowed=nav.find(function(n){return n.id===APP.page;});
  if(!allowed){
    // redirect to first available page
    if(nav.length>0){APP.page=nav[0].id;render();return;}
    pc().innerHTML='<div class="empty" style="height:60vh">Sem modulos disponiveis para este usuario.</div>';
    return;
  }
  (pages[APP.page]||pgDash)();
}

// =====================================================================
// DASHBOARD
// =====================================================================
function pgDash(){
  if(!isAdmin()){pc().innerHTML='<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:60vh;gap:12px"><div style="font-size:48px;color:#9ca3af">X</div><div style="font-size:16px;font-weight:600">Acesso restrito</div><div style="font-size:13px;color:#9ca3af">Dashboard disponivel apenas para o administrador.</div></div>';return;}
  pc().innerHTML='<div style="color:#9ca3af;padding:20px">Carregando...</div>';
  api.get('/api/dashboard').then(function(r){
    var d=r.data,fr=d.frota||{},ag=d.agentes||{},eqs=d.equipes_em_operacao||[],aus=d.agentes_ausentes||[],alts=d.alertas_revisao||[];
    var html=ph('Dashboard Operacional','Atualizado em '+new Date().toLocaleString('pt-BR'),'<button class="btn" id="dash-rl">Atualizar</button>');
    html+='<div class="kgrid"><div class="kc"><div class="kl">Viaturas em servico</div><div class="kv">'+fr.cautelada+'<span style="font-size:15px;color:#9ca3af">/'+fr.total+'</span></div><div class="ks">'+fr.disponivel+' disponiveis / '+fr.manutencao+' manutencao</div></div><div class="kc"><div class="kl">Equipes operando</div><div class="kv">'+eqs.length+'</div><div class="ks">'+(ag.em_servico_hoje||0)+' agentes escalados</div></div><div class="kc"><div class="kl">Agentes afastados</div><div class="kv" style="color:'+(aus.length>0?'#ca8a04':'#16a34a')+'">'+aus.length+'</div><div class="ks">'+ag.total_ativos+' ativos</div></div><div class="kc"><div class="kl">Alertas revisao</div><div class="kv" style="color:'+(alts.length>0?'#dc2626':'#16a34a')+'">'+alts.length+'</div><div class="ks">'+(alts.length>0?'Atencao necessaria':'Frota em dia')+'</div></div></div>';
    html+='<div class="card" style="margin-bottom:16px"><div style="padding:14px 16px;border-bottom:1px solid #f3f4f6;display:flex;justify-content:space-between;align-items:center"><span style="font-weight:600;font-size:13px">Equipes em operacao hoje</span>'+bdg(eqs.length+' equipe(s)',eqs.length>0?'green':'gray')+'</div>';
    if(!eqs.length){html+='<div class="empty">Nenhuma equipe em operacao hoje.</div>';}
    else eqs.forEach(function(e){html+='<div style="padding:12px 16px;border-bottom:1px solid #f3f4f6;display:grid;grid-template-columns:80px 1fr 1fr 1fr;gap:8px 16px;align-items:start"><div style="background:#1A3A5C;color:#fff;border-radius:6px;padding:4px 10px;font-size:12px;font-weight:700;text-align:center;align-self:center">'+esc(e.viatura_prefixo||'--')+'</div><div><div style="font-size:10px;color:#9ca3af;margin-bottom:2px">TRIPULACAO</div><div style="font-size:12px;font-weight:500">'+esc(e.chefe_nome||e.motorista_nome||'--')+'</div>'+(e.patrulheiro2_nome?'<div style="font-size:11px;color:#6b7280">'+esc(e.patrulheiro2_nome)+'</div>':'')+' </div><div><div style="font-size:10px;color:#9ca3af;margin-bottom:2px">SETOR</div><div style="font-size:12px;font-weight:500">'+esc(e.setor_patrulhamento||'--')+'</div><div style="font-size:11px;color:#6b7280">Radio: '+esc(e.numero_radio||'--')+'</div></div><div><div style="font-size:10px;color:#9ca3af;margin-bottom:2px">SUPERVISOR / EQ.'+esc(e.letra_equipe)+'</div><div style="font-size:12px">'+esc(e.supervisor_nome||'--')+'</div><div style="font-size:11px;color:#6b7280">Inicio: '+esc(e.horario_inicio||'--')+'</div></div></div>';});
    html+='</div><div class="two"><div class="ac"><div class="ah"><span class="at">Revisao de viaturas</span>'+bdg(alts.length>0?alts.length+' pendente(s)':'Em dia',alts.length>0?'red':'green')+'</div>'+(alts.length===0?'<div style="color:#9ca3af;font-size:12px">Frota em dia.</div>':alts.map(function(v){return '<div class="ar"><span><b style="color:#1A3A5C">'+esc(v.prefixo)+'</b> <span style="color:#9ca3af">'+esc((v.marca||'')+' '+(v.modelo||''))+'</span></span>'+bdg(v.situacao_revisao,v.situacao_revisao==='VENCIDA'?'red':'yellow')+'</div>';}).join(''))+'</div><div class="ac"><div class="ah"><span class="at">Agentes afastados/inativos</span>'+bdg(aus.length,aus.length>0?'yellow':'green')+'</div>'+(aus.length===0?'<div style="color:#9ca3af;font-size:12px">Nenhum afastado.</div>':aus.map(function(a){return '<div class="ar"><span><b>'+esc(a.nome)+'</b>'+(a.letra?' '+bdg('Eq.'+a.letra,'purple'):'')+' </span>'+bdg(a.setor,'blue')+'</div>';}).join(''))+'</div></div>';
    pc().innerHTML=html;
    document.getElementById('dash-rl').onclick=pgDash;
  }).catch(function(e){pc().innerHTML='<div class="empty">Erro: '+esc(e.message)+'</div>';});
}

// =====================================================================
// ARMARIA
// =====================================================================
var ARM={est:[],movs:[],arms:[],ags:[],tab:'painel',pag:0,
  gran:[],granMovs:[],cautMun:[],entradas:[],entMun:[],
  fltArm:{busca:'',calibre:'',status:'',cofre:'',histArmId:'',histDi:'',histDf:''},
  fltEst:{cofre:'',alerta:false,tipo:'',situacao:'',deposito:''},
  fltMov:{tipo:'',calibre:'',tipoMun:''},
  fltCau:{busca:'',setor:'',tipo:'',calibre:'',cofre:''},showEntradas:false,
  fltGran:{tipo:'',situacao:''},
  pagArm:0, pagMov:0, pagGran:0
};
var PAG=15;
function pgArmaria(){
  pc().innerHTML='<div style="color:#9ca3af;padding:20px">Carregando...</div>';
  Promise.all([
    api.get('/api/armaria/estoque'),
    api.get('/api/armaria/movimentacoes'),
    api.get('/api/armaria/armamentos'),
    api.get('/api/agentes?ativo=true'),
    api.get('/api/armaria/granadas'),
    api.get('/api/armaria/granadas/movimentacoes'),
    api.get('/api/armaria/municoes/cautelas'),
    api.get('/api/armaria/entradas'),
    api.get('/api/armaria/municoes/entradas')
  ]).then(function(rs){
    ARM.est=rs[0].data;ARM.movs=rs[1].data;ARM.arms=rs[2].data;ARM.ags=rs[3].data;
    ARM.gran=rs[4].data;ARM.granMovs=rs[5].data;ARM.cautMun=rs[6].data;ARM.entradas=rs[7].data;ARM.entMun=rs[8].data;
    renderARM();
  }).catch(function(e){toast(e.message,'er');});
}
function renderARM(){
  var totalArm=ARM.arms.filter(function(a){return a.status!=='baixado';}).length;
  var cautN=ARM.arms.filter(function(a){return a.status==='cautelado';}).length;
  var alertasEst=ARM.est.filter(function(e){return e.alerta_minimo;}).length+(ARM.est.filter(function(e){return e.alerta_vencimento||e.vencida;}).length);
  var subLabel=totalArm+' armamentos | '+ARM.est.length+' lotes de municoes'+(alertasEst?' | '+alertasEst+' alerta(s)':'');
  var html=ph('Armaria',subLabel,'<button class="btn" id="arm-rel-btn">Relatorios</button>');
  var tabs=[
    {id:'painel',label:'Painel'},
    {id:'armamentos',label:'Armamentos'},
    {id:'municoes',label:'Municoes'},
    {id:'granadas',label:'Granadas'},
    {id:'cautelados',label:'Cautelados'},
    {id:'historico',label:'Historico'}
  ];
  html+='<div class="tabs" id="arm-tabs">';
  tabs.forEach(function(t){html+='<button class="tab'+(ARM.tab===t.id?' on':'')+'" data-tab="'+t.id+'">'+t.label+'</button>';});
  html+='</div><div id="arm-content"></div>';
  pc().innerHTML=html;
  document.getElementById('arm-tabs').onclick=function(e){
    var b=e.target.closest('.tab');if(!b)return;
    ARM.tab=b.dataset.tab;ARM.pagArm=0;ARM.pagMov=0;
    document.querySelectorAll('#arm-tabs .tab').forEach(function(t){t.classList.toggle('on',t.dataset.tab===ARM.tab);});
    renderARMContent();
  };
  document.getElementById('arm-rel-btn').onclick=armRelatorioModal;
  renderARMContent();
}

function renderARMContent(){
  var ct=document.getElementById('arm-content');if(!ct)return;
  var html='';
  var situBdg=function(s){var m={disponivel:['Disponivel','green'],apreendida:['Apreendida','red'],vencida:['Vencida','orange'],danificada:['Danificada','gray']};var r=m[s]||[s,'gray'];return bdg(r[0],r[1]);};

  // ---- PAINEL ----
  if(ARM.tab==='painel'){
    function sumQtd(arr){return arr.reduce(function(s,a){return s+(a.quantidade||1);},0);}
    var disp=sumQtd(ARM.arms.filter(function(a){return a.status==='disponivel';}));
    var caut=sumQtd(ARM.arms.filter(function(a){return a.status==='cautelado';}));
    var man=sumQtd(ARM.arms.filter(function(a){return a.status==='manutencao';}));
    var apre=sumQtd(ARM.arms.filter(function(a){return a.status==='apreendido';}));
    var bxd=sumQtd(ARM.arms.filter(function(a){return a.status==='baixado';}));
    var totArm=sumQtd(ARM.arms);
    var totMun=ARM.est.reduce(function(s,e){return s+e.quantidade_atual;},0);
    var munCentral=ARM.est.filter(function(e){return e.cofre==='central';}).reduce(function(s,e){return s+e.quantidade_atual;},0);
    var munOper=ARM.est.filter(function(e){return e.cofre==='operacional';}).reduce(function(s,e){return s+e.quantidade_atual;},0);
    var alertMin=ARM.est.filter(function(e){return e.alerta_minimo;}).length;
    var alertVenc=ARM.est.filter(function(e){return e.alerta_vencimento||e.vencida;}).length;
    var recMov=ARM.arms.filter(function(a){return a.status==='cautelado';});
    function statCard(val,lbl,cor,tab,fltK,fltS,fltV){
      var style='border-radius:12px;padding:18px 20px;background:#fff;border:1px solid #e5e7eb;cursor:'+(tab?'pointer':'default')+';transition:box-shadow .15s;';
      var da=tab?(' data-go-tab="'+tab+'"'+(fltK?' data-flt-k="'+fltK+'" data-flt-s="'+fltS+'" data-flt-v="'+fltV+'"':'')):'';
      return '<div style="'+style+'"'+da+(tab?' title="Clique para filtrar"':'')+'>'+
        '<div style="font-size:28px;font-weight:700;color:'+(cor||'#1A3A5C')+'">'+val+'</div>'+
        '<div style="font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:.5px;margin-top:4px">'+lbl+'</div>'+
      '</div>';
    }
    html='<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px;margin-bottom:20px">'+
      statCard(totArm,'Total Armamentos','#1A3A5C','armamentos','','','')+
      statCard(disp,'Disponiveis','#16a34a','armamentos','fltArm','status','disponivel')+
      statCard(caut,'Cautelados','#2E75B6','cautelados','','','')+
      statCard(man,'Em Manutencao','#ca8a04','armamentos','fltArm','status','manutencao')+
      statCard(apre,'Apreendidos','#dc2626','armamentos','fltArm','status','apreendido')+
      statCard(bxd,'Baixados','#9ca3af','armamentos','fltArm','status','baixado')+
    '</div>';
    html+='<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:20px">'+
      statCard(totMun.toLocaleString('pt-BR'),'Total Municoes','#1A3A5C','municoes','','','')+
      statCard(munCentral.toLocaleString('pt-BR'),'Cofre Central','#2E75B6','municoes','fltEst','cofre','central')+
      statCard(munOper.toLocaleString('pt-BR'),'Cofre Operacional','#ca8a04','municoes','fltEst','cofre','operacional')+
      statCard(alertMin,'Abaixo do Minimo',alertMin>0?'#dc2626':'#16a34a','municoes','fltEst','alerta','true')+
      statCard(alertVenc,'Alertas Vencimento',alertVenc>0?'#dc2626':'#16a34a','municoes','','','')+
    '</div>';
    var vencidas=ARM.est.filter(function(e){return e.vencida;});
    var proxVenc=ARM.est.filter(function(e){return e.alerta_vencimento;});
    if(vencidas.length)html+='<div class="warn" style="background:#fef2f2;border-color:#fca5a5;color:#dc2626;margin-bottom:8px"><b>VENCIDAS:</b> '+vencidas.map(function(e){return esc(e.calibre)+' '+esc(e.tipo);}).join(', ')+'</div>';
    if(proxVenc.length)html+='<div class="warn" style="margin-bottom:8px"><b>Vencimento proximo (30 dias):</b> '+proxVenc.map(function(e){return esc(e.calibre)+' '+esc(e.tipo)+' ('+fmtDt(e.data_vencimento)+')';}).join(', ')+'</div>';
    if(caut>0){
      html+='<div class="card"><div style="padding:12px 16px;border-bottom:1px solid #f3f4f6;font-size:12px;font-weight:600;color:#1A3A5C;text-transform:uppercase;letter-spacing:.5px">Armamentos Atualmente Cautelados</div><div style="overflow-x:auto"><table><thead><tr><th>N Serie</th><th>Tipo</th><th>Calibre</th><th>Agente</th><th>Cofre</th></tr></thead><tbody>'+
        ARM.arms.filter(function(a){return a.status==='cautelado';}).map(function(a){return '<tr><td style="font-family:monospace;font-size:12px">'+esc(a.numero_serie)+'</td><td>'+esc(a.tipo)+'</td><td>'+bdg(a.calibre||'--','blue')+'</td><td style="font-size:12px">'+esc(a.agente_nome||'--')+'</td><td>'+bdg(a.cofre==='central'?'Central':'Operacional',a.cofre==='central'?'blue':'orange')+'</td></tr>';}).join('')+
      '</tbody></table></div></div>';
    } else {
      html+='<div class="card"><div class="empty">Nenhum armamento cautelado no momento.</div></div>';
    }
  }

  // ---- MUNICOES (Estoque + Movimentacoes + Cautelas + Depositos) ----
  if(ARM.tab==='municoes'){
    if(!ARM.munSub)ARM.munSub='estoque';
    var munSubOpts=[{id:'estoque',lbl:'Estoque'},{id:'movimentacoes',lbl:'Movimentacoes'},{id:'cautelas',lbl:'Cautelas'},{id:'depositos',lbl:'Depositos'},{id:'entradas',lbl:'Entradas NF'}];
    html='<div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">'+
      munSubOpts.map(function(s){return '<button class="btn'+(ARM.munSub===s.id?' btn-p':'')+' mun-sub-btn" data-sub="'+s.id+'">'+s.lbl+'</button>';}).join('')+
      (canEdit('armaria')?'<button class="btn btn-g" id="est-novo-btn" style="margin-left:auto">+ Nova municao</button>':'')+
      (canEdit('armaria')?'<button class="btn btn-y" id="cau-mun-btn">+ Cautela</button>':'')+
      (canEdit('armaria')?'<button class="btn" id="dep-mun-btn">Enviar Deposito</button>':'')+
      (canEdit('armaria')?'<button class="btn" id="arm-mov-btn" style="background:#6366f1;color:#fff;border:none">+ Movimentacao<\/button>':'')+
      (canEdit('armaria')?'<button class="btn" id="mun-ent-btn" style="background:#0891b2;color:#fff;border:none">+ Entrada NF<\/button>':'')+
    '<\/div>';

    if(ARM.munSub==='estoque'){
      var cofreOpts=[['','Todos os cofres'],['central','Cofre Central'],['operacional','Cofre Operacional']];
      var estAtivo=ARM.est.filter(function(e){return !e.deposito||e.deposito==='ativo';});
      var estFlt=estAtivo.filter(function(e){
        if(ARM.fltEst.cofre&&e.cofre!==ARM.fltEst.cofre)return false;
        if(ARM.fltEst.tipo&&e.tipo!==ARM.fltEst.tipo)return false;
        if(ARM.fltEst.situacao&&(e.situacao||'disponivel')!==ARM.fltEst.situacao)return false;
        if(ARM.fltEst.alerta&&!e.alerta_minimo)return false;
        return true;
      });
      var situacaoOpts=[['','Todas'],['disponivel','Disponivel'],['apreendida','Apreendida'],['vencida','Vencida'],['danificada','Danificada']];
      var tiposEst=[...new Set(estAtivo.map(function(x){return x.tipo;}))].filter(Boolean);
      var tipoEstOpts=[['','Todos os tipos']].concat(tiposEst.map(function(t){return[t,t];}));
      var proxVenc=estAtivo.filter(function(e){return e.alerta_vencimento;});
      var vencidas2=estAtivo.filter(function(e){return e.vencida;});
      if(vencidas2.length)html+='<div class="warn" style="background:#fef2f2;border-color:#fca5a5;color:#dc2626;margin-bottom:8px"><b>VENCIDAS:</b> '+vencidas2.map(function(e){return esc(e.calibre)+' '+esc(e.tipo);}).join(', ')+'</div>';
      if(proxVenc.length)html+='<div class="warn" style="margin-bottom:8px"><b>Vencimento proximo (30 dias):</b> '+proxVenc.map(function(e){return esc(e.calibre)+' '+esc(e.tipo)+' ('+fmtDt(e.data_vencimento)+')';}).join(', ')+'</div>';
      html+='<div class="flt-bar">'+
        '<div class="f1"><label>Cofre</label><select id="est-flt-c">'+selOpts(cofreOpts,ARM.fltEst.cofre)+'</select></div>'+
        '<div class="f1"><label>Tipo</label><select id="est-flt-t">'+selOpts(tipoEstOpts,ARM.fltEst.tipo||'')+'</select></div>'+
        '<div class="f1"><label>Situacao</label><select id="est-flt-sit">'+selOpts(situacaoOpts,ARM.fltEst.situacao||'')+'</select></div>'+
        '<div class="f1" style="justify-content:flex-end;padding-top:18px"><label style="display:flex;align-items:center;gap:6px;cursor:pointer"><input type="checkbox" id="est-flt-a"'+(ARM.fltEst.alerta?' checked':'')+'/> Apenas alertas</label></div>'+
        '<button class="btn btn-p" id="est-flt-btn">Filtrar</button>'+
        '<span style="font-size:12px;color:#9ca3af;align-self:center">'+estFlt.length+' lotes</span>'+
      '</div>';
      html+='<div class="card"><div style="overflow-x:auto"><table><thead><tr>'+
        '<th>Calibre</th><th>Tipo</th><th>Cofre</th><th>Fabricante</th><th>Lote</th><th>Vencimento</th><th>Qtd</th><th>Min</th><th>Situacao</th>'+
        (canEdit('armaria')?'<th>Acoes</th>':'')+
      '</tr></thead><tbody>';
      if(!estFlt.length){html+='<tr><td colspan="10"><div class="empty">Nenhuma municao no estoque.</div></td></tr>';}
      else{
        estFlt.forEach(function(e){
          var pct=e.quantidade_minima>0?Math.min(100,Math.round(e.quantidade_atual/e.quantidade_minima*100)):100;
          var cor=pct<=50?'#dc2626':pct<=100?'#ca8a04':'#16a34a';
          var vencBdg='--';
          if(e.data_vencimento){if(e.vencida)vencBdg='<span style="color:#dc2626;font-weight:700">'+fmtDt(e.data_vencimento)+' VENCIDA</span>';else if(e.alerta_vencimento)vencBdg='<span style="color:#ca8a04;font-weight:700">'+fmtDt(e.data_vencimento)+' ⚠</span>';else vencBdg='<span style="color:#16a34a">'+fmtDt(e.data_vencimento)+'</span>';}
          html+='<tr>'+
            '<td><b style="font-size:14px">'+esc(e.calibre)+'</b></td>'+
            '<td>'+esc(e.tipo)+'</td>'+
            '<td>'+bdg(e.cofre,e.cofre==='central'?'blue':'orange')+'</td>'+
            '<td style="font-size:12px">'+esc(e.fabricante||'--')+'</td>'+
            '<td style="color:#9ca3af;font-size:11px">'+esc(e.lote||'--')+'</td>'+
            '<td style="font-size:11px">'+vencBdg+'</td>'+
            '<td><div style="display:flex;align-items:center;gap:8px">'+
              '<span style="font-weight:700;font-size:16px;color:'+cor+'">'+e.quantidade_atual+'</span>'+
              '<div style="flex:1;min-width:60px"><div style="height:6px;background:#f3f4f6;border-radius:999px">'+
              '<div style="width:'+pct+'%;height:6px;background:'+cor+';border-radius:999px"></div></div></div>'+
            '</div></td>'+
            '<td style="color:#9ca3af">'+e.quantidade_minima+'</td>'+
            '<td>'+situBdg(e.situacao||'disponivel')+'</td>'+
            (canEdit('armaria')?'<td><div style="display:flex;gap:4px">'+
              '<button class="btn btn-sm est-ed" data-id="'+e.id+'">Editar</button>'+
              (isAdmin()?'<button class="btn btn-sm btn-d est-del" data-id="'+e.id+'">Excluir</button>':'')+
            '</div></td>':'')+
          '</tr>';
        });
      }
      html+='</tbody></table></div></div>';
    }

    if(ARM.munSub==='movimentacoes'){
      var calibres=[...new Set(ARM.movs.map(function(m){return m.calibre;}))].filter(Boolean);
      var calOpts=[['','Todos']].concat(calibres.map(function(x){return[x,x];}));
      var tiposMun=[...new Set(ARM.movs.map(function(m){return m.tipo_municao;}))].filter(Boolean);
      var tipoMunOpts=[['','Todos os tipos']].concat(tiposMun.map(function(t){return[t,t];}));
      var tipoOpts=[['','Todos'],['entrada','Entradas'],['saida','Saidas']];
      var movFlt=ARM.movs.filter(function(m){
        if(ARM.fltMov.tipo&&m.tipo_movimentacao!==ARM.fltMov.tipo)return false;
        if(ARM.fltMov.calibre&&m.calibre!==ARM.fltMov.calibre)return false;
        if(ARM.fltMov.tipoMun&&m.tipo_municao!==ARM.fltMov.tipoMun)return false;
        return true;
      });
      var mpg=movFlt.slice(ARM.pagMov*PAG,(ARM.pagMov+1)*PAG),mtp=Math.ceil(movFlt.length/PAG);
      html+='<div class="flt-bar">'+
        '<div class="f1"><label>Tipo</label><select id="mov-flt-t">'+selOpts(tipoOpts,ARM.fltMov.tipo)+'</select></div>'+
        '<div class="f1"><label>Calibre</label><select id="mov-flt-c">'+selOpts(calOpts,ARM.fltMov.calibre)+'</select></div>'+
        '<div class="f1"><label>Tipo municao</label><select id="mov-flt-tm">'+selOpts(tipoMunOpts,ARM.fltMov.tipoMun||'')+'</select></div>'+
        '<button class="btn btn-p" id="mov-flt-btn">Filtrar</button>'+
        '<span style="font-size:12px;color:#9ca3af;align-self:center">'+movFlt.length+' registros</span>'+
      '</div>';
      html+=tableHtml(['Data','Tipo','Calibre / Municao','Qtd','Motivo','Agente','Gestor'],mpg.map(function(m){
        return '<tr>'+
          '<td style="font-size:11px;color:#9ca3af">'+fmtTs(m.criado_em)+'</td>'+
          '<td>'+bdg(m.tipo_movimentacao,m.tipo_movimentacao==='entrada'?'green':'red')+'</td>'+
          '<td><b>'+esc(m.calibre)+'</b> <span style="color:#6b7280">'+esc(m.tipo_municao)+'</span></td>'+
          '<td><b style="color:#1A3A5C">'+m.quantidade+'</b></td>'+
          '<td style="font-size:12px">'+esc(m.motivo_entrada||m.motivo_saida||'--')+'</td>'+
          '<td>'+esc(m.agente_nome||'--')+'</td>'+
          '<td style="color:#9ca3af">'+esc(m.gestor_nome||'--')+'</td>'+
        '</tr>';
      }));
      if(mtp>1)html+='<div class="pag"><button class="btn btn-sm" id="mp"'+(ARM.pagMov===0?' disabled':'')+'>Anterior</button>'+
        '<span>Pag '+(ARM.pagMov+1)+' de '+mtp+'</span>'+
        '<button class="btn btn-sm" id="mn"'+(ARM.pagMov===mtp-1?' disabled':'')+'>Proxima</button></div>';
    }

    if(ARM.munSub==='cautelas'){
      var cauAtivas=ARM.cautMun.filter(function(c){return c.status==='ativa';});
      var cauEnc=ARM.cautMun.filter(function(c){return c.status==='encerrada';});
      html+='<div style="font-size:11px;font-weight:700;color:#1A3A5C;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Cautelas Ativas ('+cauAtivas.length+')</div>';
      if(!cauAtivas.length){html+='<div class="card"><div class="empty">Nenhuma cautela ativa.</div></div>';}
      else{
        html+=cauAtivas.map(function(c){
          var total=c.itens?c.itens.reduce(function(s,i){return s+i.quantidade_cautelada;},0):0;
          var devol=c.itens?c.itens.reduce(function(s,i){return s+i.quantidade_devolvida;},0):0;
          return '<div class="card" style="margin-bottom:8px;padding:12px 16px">'+
            '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">'+
              '<div><div style="font-weight:700;font-size:13px">'+esc(c.agente_nome)+'</div>'+
              '<div style="font-size:11px;color:#9ca3af">GCM '+esc(c.agente_funcional)+' &middot; '+fmtTs(c.criado_em)+'</div></div>'+
              bdg(total+' municoes','blue')+
              (devol>0?bdg(devol+' devolvidas','green'):'')+
              '<div style="margin-left:auto;display:flex;gap:6px">'+
              (canEdit('armaria')?'<button class="btn btn-sm btn-p cau-dev-btn" data-id="'+c.id+'">Devolver</button>':'')+
              '</div>'+
            '</div>'+
            (c.itens&&c.itens.length?'<div style="margin-top:8px;overflow-x:auto"><table><thead><tr><th>Calibre</th><th>Tipo</th><th>Cautelado</th><th>Devolvido</th><th>Pendente</th></tr></thead><tbody>'+
              c.itens.map(function(i){var pend=i.quantidade_cautelada-i.quantidade_devolvida;return '<tr>'+
                '<td><b>'+esc(i.calibre)+'</b></td>'+
                '<td>'+esc(i.tipo_municao)+'</td>'+
                '<td>'+i.quantidade_cautelada+'</td>'+
                '<td style="color:#16a34a">'+i.quantidade_devolvida+'</td>'+
                '<td style="color:'+(pend>0?'#dc2626':'#16a34a')+';font-weight:700">'+pend+'</td>'+
              '</tr>';}).join('')+
            '</tbody></table></div>':'')+'</div>';
        }).join('');
      }
      if(cauEnc.length){
        html+='<div style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.5px;margin:16px 0 8px">Encerradas ('+cauEnc.length+')</div>';
        html+=tableHtml(['Data','Agente','Encerrada em','Gestor'],cauEnc.map(function(c){
          return '<tr>'+
            '<td style="font-size:11px;color:#9ca3af">'+fmtTs(c.criado_em)+'</td>'+
            '<td>'+esc(c.agente_nome)+'</td>'+
            '<td style="font-size:11px;color:#9ca3af">'+fmtTs(c.encerrado_em)+'</td>'+
            '<td style="color:#9ca3af">'+esc(c.gestor_nome)+'</td>'+
          '</tr>';
        }));
      }
    }

    if(ARM.munSub==='depositos'){
      var depVenc=ARM.est.filter(function(e){return e.deposito==='vencidas';});
      var depDan=ARM.est.filter(function(e){return e.deposito==='danificadas';});
      var totVenc=depVenc.reduce(function(s,e){return s+e.quantidade_atual;},0);
      var totDan=depDan.reduce(function(s,e){return s+e.quantidade_atual;},0);
      html+='<div class="warn" style="background:#fef2f2;border-color:#fca5a5;color:#dc2626;margin-bottom:12px"><b>Deposito de Vencidas:</b> '+depVenc.length+' lote(s), '+totVenc+' un. &nbsp;&mdash;&nbsp; <b>Deposito de Danificadas:</b> '+depDan.length+' lote(s), '+totDan+' un.</div>';
      ['vencidas','danificadas'].forEach(function(dep){
        var itens=dep==='vencidas'?depVenc:depDan;
        var cor=dep==='vencidas'?'#7c3aed':'#b45309';
        html+='<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">'+
          '<div style="font-size:12px;font-weight:700;color:#1A3A5C;text-transform:uppercase;letter-spacing:.5px">Deposito de '+dep.charAt(0).toUpperCase()+dep.slice(1)+' ('+itens.length+')</div>'+
        '</div>';
        if(!itens.length){html+='<div class="card" style="margin-bottom:16px"><div class="empty">Nenhum item neste deposito.</div></div>';return;}
        html+='<div class="card" style="margin-bottom:16px;overflow-x:auto"><table><thead><tr><th>Calibre</th><th>Tipo</th><th>Cofre</th><th>Qtd em Deposito</th><th>Data Validade</th>'+(canEdit('armaria')?'<th>Acao</th>':'')+'</tr></thead><tbody>';
        itens.forEach(function(e){
          html+='<tr>'+
            '<td><b>'+esc(e.calibre)+'</b></td>'+
            '<td>'+esc(e.tipo)+'</td>'+
            '<td>'+bdg(e.cofre,e.cofre==='central'?'blue':'orange')+'</td>'+
            '<td><span style="color:#dc2626;font-weight:700;font-size:15px">'+e.quantidade_atual+'</span> <span style="color:#9ca3af;font-size:11px">un.</span></td>'+
            '<td style="font-size:11px">'+fmtDt(e.data_vencimento||'')+'</td>'+
            (canEdit('armaria')?'<td><button class="btn btn-sm dep-baixa-btn" data-id="'+e.id+'" data-dep="'+dep+'" data-qtd="'+e.quantidade_atual+'" data-cal="'+esc(e.calibre)+'" data-tipo="'+esc(e.tipo)+'" style="background:#dc2626;color:#fff;border:none">Dar Baixa</button></td>':'')+
          '</tr>';
        });
        html+='<\/tbody><\/table><\/div>';
      });
      // -- Historico de Baixas de deposito
      var baixasHist=ARM.movs.filter(function(m){return m.motivo_saida==='baixa_deposito';});
      html+='<div style="margin-top:20px"><div style="font-size:11px;font-weight:700;color:#1A3A5C;text-transform:uppercase;letter-spacing:.5px;border-bottom:2px solid #1A3A5C;padding-bottom:4px;margin-bottom:8px">Historico de Baixas<\/div>';
      if(!baixasHist.length){
        html+='<div class="empty">Nenhuma baixa registrada.<\/div>';
      } else {
        html+=tableHtml(['Data','Calibre','Tipo','Qtd','Tipo Deposito','Observacoes','Gestor'],baixasHist.map(function(m){
          return '<tr>'+
            '<td style="font-size:11px;color:#9ca3af">'+fmtDt(m.criado_em)+'<\/td>'+
            '<td><b>'+esc(m.calibre||'--')+'<\/b><\/td>'+
            '<td>'+esc(m.tipo_municao||'--')+'<\/td>'+
            '<td style="font-weight:700;color:#dc2626">'+m.quantidade+'<\/td>'+
            '<td>'+bdg(esc(m.deposito_tipo||'Deposito'),'orange')+'<\/td>'+
            '<td style="font-size:11px">'+esc(m.observacoes||m.motivo||'--')+'<\/td>'+
            '<td style="font-size:11px;color:#9ca3af">'+esc(m.gestor_nome||'--')+'<\/td>'+
          '<\/tr>';
        }));
      }
      html+='<\/div>';
    }

    if(ARM.munSub==='entradas'){
      var munNfGrupos=[];
      var munVistosGrupo={};
      ARM.entMun.forEach(function(e){
        if(!munVistosGrupo[e.grupo_id]){
          munVistosGrupo[e.grupo_id]={grupo_id:e.grupo_id,itens:[],cab:e};
          munNfGrupos.push(munVistosGrupo[e.grupo_id]);
        }
        munVistosGrupo[e.grupo_id].itens.push(e);
      });
      html+='<div style="margin-bottom:12px;display:flex;align-items:center;gap:8px">'+
        '<span style="font-size:12px;color:#6b7280">'+munNfGrupos.length+' entrada(s) registrada(s)<\/span>'+
      '<\/div>';
      if(!munNfGrupos.length){
        html+='<div class="card"><div class="empty">Nenhuma entrada de NF registrada.<\/div><\/div>';
      } else {
        html+=tableHtml(['Data','NF \/ Doc','Tipo Entrada','Itens','Total Qtd','Fornecedor','Gestor',''],
          munNfGrupos.slice(0,30).map(function(g){
            var cab=g.cab;
            var totalQtd=g.itens.reduce(function(s,i){return s+i.quantidade;},0);
            return '<tr>'+
              '<td style="font-size:11px;color:#9ca3af">'+fmtDt(cab.data_entrada)+'<\/td>'+
              '<td style="font-size:12px">'+esc(cab.nota_fiscal||cab.documento||'--')+'<\/td>'+
              '<td>'+bdg(esc(cab.tipo_entrada),'blue')+'<\/td>'+
              '<td><b>'+g.itens.length+'<\/b> <span style="color:#9ca3af;font-size:11px">iten(s)<\/span><\/td>'+
              '<td style="font-weight:700;color:#16a34a">'+totalQtd+' un.<\/td>'+
              '<td style="font-size:12px">'+esc(cab.fornecedor||'--')+'<\/td>'+
              '<td style="color:#9ca3af;font-size:11px">'+esc(cab.gestor_nome||'--')+'<\/td>'+
              '<td><button class="btn btn-sm mun-esp-btn" data-grupoid="'+esc(cab.grupo_id)+'">Espelho<\/button><\/td>'+
            '<\/tr>';
          })
        );
      }
    }
  }

  // ---- ARMAMENTOS ----
  if(ARM.tab==='armamentos'){
    var calibresA=[...new Set(ARM.arms.map(function(a){return a.calibre;}))].filter(Boolean);
    var calOptsA=[['','Todos']].concat(calibresA.map(function(x){return[x,x];}));
    var statusOpts=[['','Todos'],['disponivel','Disponivel'],['cautelado','Cautelado'],['apreendido','Apreendido'],['manutencao','Manutencao'],['baixado','Baixado']];
    var cofreOpts2=[['','Todos os cofres'],['operacional','Cofre Operacional'],['central','Cofre Central']];
    var armFlt=ARM.arms.filter(function(a){
      if(ARM.fltArm.busca&&(a.numero_serie+a.tipo+(a.calibre||'')).toLowerCase().indexOf(ARM.fltArm.busca.toLowerCase())<0)return false;
      if(ARM.fltArm.calibre&&a.calibre!==ARM.fltArm.calibre)return false;
      if(ARM.fltArm.status&&a.status!==ARM.fltArm.status)return false;
      if(ARM.fltArm.cofre&&(a.cofre||'operacional')!==ARM.fltArm.cofre)return false;
      return true;
    });
    var apg=armFlt.slice(ARM.pagArm*PAG,(ARM.pagArm+1)*PAG),atp=Math.ceil(armFlt.length/PAG);
    html='<div class="flt-bar">'+
      '<div class="f1"><label>Buscar</label><input id="arm-busca" placeholder="Serie, tipo, marca..." value="'+esc(ARM.fltArm.busca)+'"/></div>'+
      '<div class="f1"><label>Calibre</label><select id="arm-flt-c">'+selOpts(calOptsA,ARM.fltArm.calibre)+'</select></div>'+
      '<div class="f1"><label>Status</label><select id="arm-flt-s">'+selOpts(statusOpts,ARM.fltArm.status)+'</select></div>'+
      '<div class="f1"><label>Cofre</label><select id="arm-flt-cf">'+selOpts(cofreOpts2,ARM.fltArm.cofre||'')+'</select></div>'+
      '<button class="btn btn-p" id="arm-flt-btn">Filtrar</button>'+
      '<span style="font-size:12px;color:#9ca3af;align-self:center">'+armFlt.length+' de '+ARM.arms.length+'</span>'+
      (canEdit('armaria')?'<button class="btn btn-g" id="arm-add-btn" style="margin-left:auto">+ Cadastrar</button>':'')+
      (canEdit('armaria')?'<button class="btn" id="arm-ent-btn">Entradas</button>':'')+
    '</div>';
    html+='<div class="card"><div style="overflow-x:auto"><table><thead><tr>'+
      '<th>N serie</th><th>Tipo</th><th>Marca/Modelo</th><th>Calibre</th><th>Qtd</th><th>Cofre</th><th>Status</th><th>Agente</th><th>Ult. Inspecao</th><th>Acoes</th>'+
    '</tr></thead><tbody>';
    if(!apg.length){html+='<tr><td colspan="9"><div class="empty">Nenhum armamento.</div></td></tr>';}
    else{
      apg.forEach(function(a){
        var aidx=ARM.arms.indexOf(a);
        var apreInfo='';
        if(a.status==='apreendido'&&a.apreensao_ocorrencia){apreInfo='<div style="font-size:10px;color:#dc2626;margin-top:2px">OC:'+esc(a.apreensao_ocorrencia)+'</div>';}
        html+='<tr>'+
          '<td><button class="btn btn-sm arm-ficha" data-idx="'+aidx+'" style="font-family:monospace;font-weight:700;background:none;border:none;color:#1A3A5C;text-decoration:underline;cursor:pointer;padding:0">'+esc(a.numero_serie)+'</button></td>'+
          '<td>'+esc(a.tipo)+'</td>'+
          '<td style="font-size:12px">'+esc(((a.marca||'')+' '+(a.modelo||'')).trim()||'--')+'</td>'+
          '<td>'+bdg(esc(a.calibre||'--'),'blue')+'</td>'+
          '<td style="text-align:center;font-weight:700;color:#1A3A5C">'+(a.quantidade||1)+'</td>'+
          '<td>'+bdg(a.cofre==='central'?'Central':'Operacional',a.cofre==='central'?'blue':'orange')+'</td>'+
          '<td>'+saBdg(a.status)+apreInfo+'</td>'+
          '<td style="font-size:12px">'+esc(a.agente_nome||'--')+'</td>'+
          '<td style="font-size:11px;color:#9ca3af">'+(a.ultima_inspecao?fmtDt(a.ultima_inspecao)+(a.armeiro?' <span style="font-size:10px">('+esc(a.armeiro)+')</span>':''):'--')+'</td>'+
          '<td><div style="display:flex;gap:4px">'+
            (canEdit('armaria')?
              '<button class="btn btn-sm arm-ed" data-idx="'+aidx+'">Editar</button>'+
              ' <button class="btn btn-sm btn-y arm-mov" data-idx="'+aidx+'">Movimentar</button>'+
              (isAdmin()?' <button class="btn btn-sm btn-d arm-del" data-idx="'+aidx+'">Excluir</button>':'')
            :'<button class="btn btn-sm arm-ficha" data-idx="'+aidx+'">Ver Ficha</button>')+
          '</div></td>'+
        '</tr>';
      });
    }
    html+='</tbody></table></div>';
    if(atp>1)html+='<div class="pag"><button class="btn btn-sm" id="ap"'+(ARM.pagArm===0?' disabled':'')+'>Anterior</button>'+
      '<span>Pag '+(ARM.pagArm+1)+' de '+atp+'</span>'+
      '<button class="btn btn-sm" id="an"'+(ARM.pagArm===atp-1?' disabled':'')+'>Proxima</button></div>';
    html+='</div>';
    // -- Secao de Entradas (agrupado por NF/grupo_id) - colapsavel
    if(ARM.entradas.length){
      var nfGrupos=[];
      var vistosGrupo={};
      ARM.entradas.forEach(function(e){
        var chave=e.grupo_id||('_id_'+e.id);
        if(!vistosGrupo[chave]){
          vistosGrupo[chave]={chave:chave,itens:[],cabecalho:e};
          nfGrupos.push(vistosGrupo[chave]);
        }
        vistosGrupo[chave].itens.push(e);
      });
      html+='<div style="margin-top:20px">'+
        '<button id="arm-hist-toggle" class="btn" style="width:100%;text-align:left;background:#f8fafc;border:1px solid #e5e7eb;border-radius:8px;padding:10px 16px;display:flex;align-items:center;gap:8px;cursor:pointer">'+
          '<span style="font-size:14px">'+(ARM.showEntradas?'&#9660;':'&#9654;')+'</span>'+
          '<span style="font-size:12px;font-weight:700;color:#1A3A5C;text-transform:uppercase;letter-spacing:.5px">Historico de Entradas de Armamentos</span>'+
          '<span style="margin-left:auto">'+bdg(nfGrupos.length+' NF(s)','blue')+'</span>'+
        '</button>';
      if(ARM.showEntradas){
        html+='<div style="margin-top:8px">';
        html+=tableHtml(['Data','NF / Doc','Tipo Entrada','Itens','Fornecedor','Gestor',''],nfGrupos.slice(0,50).map(function(g){
          var cab=g.cabecalho;
          return '<tr>'+
            '<td style="font-size:11px;color:#9ca3af">'+fmtDt(cab.data_entrada)+'</td>'+
            '<td style="font-size:12px">'+esc(cab.nota_fiscal||cab.documento||'--')+'</td>'+
            '<td>'+bdg(esc(cab.tipo_entrada),'blue')+'</td>'+
            '<td><span style="font-weight:700">'+g.itens.length+'<\/span> <span style="color:#9ca3af;font-size:11px">iten(s)<\/span><\/td>'+
            '<td style="font-size:12px">'+esc(cab.fornecedor||'--')+'</td>'+
            '<td style="color:#9ca3af;font-size:11px">'+esc(cab.gestor_nome||'--')+'</td>'+
            '<td><button class="btn btn-sm ent-esp-btn" data-grupoid="'+esc(g.chave)+'">Espelho<\/button><\/td>'+
          '<\/tr>';
        }));
        html+='</div>';
      }
      html+='</div>';
    }
  }

  // ---- GRANADAS E ARTEFATOS ----
  if(ARM.tab==='granadas'){
    var granSituOpts=[['','Todas'],['operacional','Operacional'],['danificada','Danificada'],['vencida','Vencida']];
    var granTipos=[...new Set(ARM.gran.map(function(g){return g.tipo;}))].filter(Boolean);
    var granTipoOpts=[['','Todos os tipos']].concat(granTipos.map(function(t){return[t,t];}));
    var localOpts=[['','Todos'],['operacional','Operacional'],['central','Central'],['deposito','Deposito']];
    var granFlt=ARM.gran.filter(function(g){
      if(ARM.fltGran.tipo&&g.tipo!==ARM.fltGran.tipo)return false;
      if(ARM.fltGran.situacao&&g.situacao!==ARM.fltGran.situacao)return false;
      return true;
    });
    var granVenc=ARM.gran.filter(function(g){return g.vencida;});
    var granAlerta=ARM.gran.filter(function(g){return g.alerta_vencimento;});
    if(granVenc.length)html+='<div class="warn" style="background:#fef2f2;border-color:#fca5a5;color:#dc2626;margin-bottom:8px"><b>VENCIDAS:</b> '+granVenc.map(function(g){return esc(g.tipo);}).join(', ')+'</div>';
    if(granAlerta.length)html+='<div class="warn" style="margin-bottom:8px"><b>Vencimento proximo:</b> '+granAlerta.map(function(g){return esc(g.tipo)+' ('+fmtDt(g.data_validade)+')';}).join(', ')+'</div>';
    html+='<div class="flt-bar">'+
      '<div class="f1"><label>Tipo</label><select id="gran-flt-t">'+selOpts(granTipoOpts,ARM.fltGran.tipo||'')+'</select></div>'+
      '<div class="f1"><label>Situacao</label><select id="gran-flt-s">'+selOpts(granSituOpts,ARM.fltGran.situacao||'')+'</select></div>'+
      '<button class="btn btn-p" id="gran-flt-btn">Filtrar</button>'+
      '<span style="font-size:12px;color:#9ca3af;align-self:center">'+granFlt.length+' itens</span>'+
      (canEdit('armaria')?'<button class="btn btn-g" id="gran-add-btn" style="margin-left:auto">+ Cadastrar</button>':'')+
      (canEdit('armaria')?'<button class="btn btn-y" id="gran-mov-btn">Movimentar</button>':'')+
    '</div>';
    html+='<div class="card"><div style="overflow-x:auto"><table><thead><tr>'+
      '<th>Tipo</th><th>Lote</th><th>Fabricante</th><th>Validade</th><th>Qtd</th><th>Situacao</th><th>Local</th><th>Obs</th>'+
      (canEdit('armaria')?'<th>Acoes</th>':'')+
    '</tr></thead><tbody>';
    if(!granFlt.length){html+='<tr><td colspan="9"><div class="empty">Nenhum item cadastrado.</div></td></tr>';}
    else{
      granFlt.forEach(function(g,gi){
        var vencBdg='--';
        if(g.data_validade){if(g.vencida)vencBdg='<span style="color:#dc2626;font-weight:700">'+fmtDt(g.data_validade)+' VENCIDA</span>';else if(g.alerta_vencimento)vencBdg='<span style="color:#ca8a04;font-weight:700">'+fmtDt(g.data_validade)+' ⚠</span>';else vencBdg='<span style="color:#16a34a">'+fmtDt(g.data_validade)+'</span>';}
        var situCor={operacional:'green',danificada:'red',vencida:'orange'};
        html+='<tr>'+
          '<td><b>'+esc(g.tipo)+'</b></td>'+
          '<td style="font-size:11px;color:#9ca3af">'+esc(g.numero_lote||'--')+'</td>'+
          '<td style="font-size:12px">'+esc(g.fabricante||'--')+'</td>'+
          '<td style="font-size:11px">'+vencBdg+'</td>'+
          '<td><b style="font-size:16px;color:'+(g.quantidade>0?'#1A3A5C':'#dc2626')+'">'+g.quantidade+'</b></td>'+
          '<td>'+bdg(g.situacao,situCor[g.situacao]||'gray')+'</td>'+
          '<td>'+bdg(g.local,g.local==='operacional'?'blue':'gray')+'</td>'+
          '<td style="font-size:11px;color:#6b7280;max-width:160px">'+esc(g.observacoes||'--')+'</td>'+
          (canEdit('armaria')?'<td><div style="display:flex;gap:4px">'+
            '<button class="btn btn-sm gran-ed" data-idx="'+gi+'">Editar</button>'+
            (isAdmin()?'<button class="btn btn-sm btn-d gran-del" data-idx="'+gi+'">Excluir</button>':'')+
          '</div></td>':'')+
        '</tr>';
      });
    }
    html+='</tbody></table></div></div>';
    html+='<div style="margin-top:16px"><div style="font-size:11px;font-weight:700;color:#1A3A5C;text-transform:uppercase;letter-spacing:.5px;border-bottom:2px solid #1A3A5C;padding-bottom:4px;margin-bottom:8px">Ultimas Movimentacoes</div>';
    var gmovs=ARM.granMovs.slice(0,30);
    if(!gmovs.length){html+='<div class="empty">Nenhuma movimentacao.</div>';}
    else{
      html+=tableHtml(['Data','Tipo','Qtd','Agente','Gestor','Obs'],gmovs.map(function(m){
        return '<tr>'+
          '<td style="font-size:11px;color:#9ca3af">'+fmtTs(m.criado_em)+'</td>'+
          '<td>'+bdg(m.tipo,m.tipo==='entrada'?'green':m.tipo==='saida'||m.tipo==='cautela'?'blue':'red')+'</td>'+
          '<td><b>'+m.quantidade+'</b> '+esc(m.granada_tipo)+'</td>'+
          '<td>'+esc(m.agente_nome||'--')+'</td>'+
          '<td style="color:#9ca3af">'+esc(m.gestor_nome||'--')+'</td>'+
          '<td style="font-size:11px;color:#6b7280">'+esc(m.observacoes||'--')+'</td>'+
        '</tr>';
      }));
    }
    html+='</div>';
  }

  // ---- CAUTELADOS ----
  if(ARM.tab==='cautelados'){
    var setoresDisp=[...new Set(ARM.ags.map(function(a){return a.setor;}))].filter(Boolean).sort();
    var setOpts2=[['','Todos os setores']].concat(setoresDisp.map(function(s){return[s,s];}));
    var tiposArm=[...new Set(ARM.arms.map(function(a){return a.tipo;}))].filter(Boolean).sort();
    var tipoArmsOpts=[['','Todos os tipos']].concat(tiposArm.map(function(t){return[t,t];}));
    var calibresArm=[...new Set(ARM.arms.map(function(a){return a.calibre;}))].filter(Boolean).sort();
    var calibreArmsOpts=[['','Todos os calibres']].concat(calibresArm.map(function(c){return[c,c];}));
    var cofreOpts=[['','Todos os cofres'],['operacional','Operacional'],['central','Central']];
    var cauArm={};
    ARM.arms.filter(function(a){
      if(a.status!=='cautelado'||!a.agente_nome)return false;
      if(ARM.fltCau.tipo&&a.tipo!==ARM.fltCau.tipo)return false;
      if(ARM.fltCau.calibre&&a.calibre!==ARM.fltCau.calibre)return false;
      if(ARM.fltCau.cofre&&a.cofre!==ARM.fltCau.cofre)return false;
      return true;
    }).forEach(function(a){if(!cauArm[a.agente_nome])cauArm[a.agente_nome]=[];cauArm[a.agente_nome].push(a);});
    var todosAgentes=Object.keys(cauArm).sort();
    var buscaCau=ARM.fltCau.busca.toLowerCase();
    var setorCau=ARM.fltCau.setor;
    var agentesFlt=todosAgentes.filter(function(nome){
      if(buscaCau&&nome.toLowerCase().indexOf(buscaCau)<0)return false;
      if(setorCau){var ag=ARM.ags.find(function(a){return a.nome===nome;});if(!ag||ag.setor!==setorCau)return false;}
      return true;
    });
    var totalArmasFlt=agentesFlt.reduce(function(s,n){return s+(cauArm[n]||[]).length;},0);
    html='<div class="flt-bar">'+
      '<div class="f1"><label>Buscar agente</label><input id="cau-busca" placeholder="Nome do agente..." value="'+esc(ARM.fltCau.busca)+'"/></div>'+
      '<div class="f1"><label>Setor</label><select id="cau-setor">'+selOpts(setOpts2,ARM.fltCau.setor)+'</select></div>'+
      '<div class="f1"><label>Tipo</label><select id="cau-flt-tipo">'+selOpts(tipoArmsOpts,ARM.fltCau.tipo)+'</select></div>'+
      '<div class="f1"><label>Calibre</label><select id="cau-flt-cal">'+selOpts(calibreArmsOpts,ARM.fltCau.calibre)+'</select></div>'+
      '<div class="f1"><label>Cofre</label><select id="cau-flt-cofre">'+selOpts(cofreOpts,ARM.fltCau.cofre)+'</select></div>'+
      '<button class="btn btn-p" id="cau-flt-btn">Filtrar</button>'+
      '<button class="btn" id="cau-pdf-btn" style="background:#dc2626;color:#fff;border:none">Relatorio PDF</button>'+
      '<span style="font-size:12px;color:#9ca3af;align-self:center">'+agentesFlt.length+' agente(s) | '+totalArmasFlt+' armamento(s)</span>'+
    '</div>';
    if(!agentesFlt.length){
      html+='<div class="card"><div class="empty">Nenhuma cautela encontrada com os filtros aplicados.</div></div>';
    } else {
      html+=agentesFlt.map(function(nomeAg){
        var agInfo=ARM.ags.find(function(a){return a.nome===nomeAg;})||{};
        var arms=cauArm[nomeAg]||[];
        return '<div class="card" style="margin-bottom:12px">'+
          '<div style="padding:12px 16px;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;gap:10px;flex-wrap:wrap">'+
            '<div style="font-weight:700;font-size:14px;color:#1A3A5C">'+esc(nomeAg)+'</div>'+
            (agInfo.funcional?'<span style="font-size:11px;color:#9ca3af">GCM '+esc(agInfo.funcional)+'</span>':'')+
            (agInfo.setor?bdg(agInfo.setor,'gray'):'')+
            bdg(arms.length+' armamento(s)','blue')+
          '</div>'+
          '<div style="padding:10px 16px">'+
            '<div style="overflow-x:auto"><table><thead><tr><th>N Serie</th><th>Tipo</th><th>Marca/Modelo</th><th>Calibre</th><th>Cofre</th>'+(canEdit('armaria')?'<th>Acoes</th>':'')+'</tr></thead><tbody>'+
            arms.map(function(a){var aidx=ARM.arms.indexOf(a);return '<tr>'+
              '<td><button class="btn btn-sm arm-ficha" data-idx="'+aidx+'" style="font-family:monospace;font-weight:700;background:none;border:none;color:#1A3A5C;text-decoration:underline;cursor:pointer;padding:0">'+esc(a.numero_serie)+'</button></td>'+
              '<td>'+esc(a.tipo)+'</td>'+
              '<td style="font-size:12px">'+esc(((a.marca||'')+' '+(a.modelo||'')).trim()||'--')+'</td>'+
              '<td>'+bdg(a.calibre||'--','blue')+'</td>'+
              '<td>'+bdg(a.cofre==='central'?'Central':'Operacional',a.cofre==='central'?'blue':'orange')+'</td>'+
              (canEdit('armaria')?'<td><button class="btn btn-sm btn-y arm-mov" data-idx="'+aidx+'">Movimentar</button> <button class="btn btn-sm arm-ficha" data-idx="'+aidx+'">Ficha</button></td>':'')+
            '</tr>';}).join('')+
            '</tbody></table></div></div>'+
        '</div>';
      }).join('');
    }
    // PDF report data captured for binding below
    ARM._cauPdfData={agentesFlt:agentesFlt,cauArm:cauArm,totalArmas:totalArmasFlt};
  }

  // ---- HISTORICO DE ARMAMENTOS ----
  if(ARM.tab==='historico'){
    var armOpts2=[['','Todos os armamentos']].concat(ARM.arms.map(function(a){return[a.id,a.numero_serie+' - '+a.tipo+(a.calibre?' ('+a.calibre+')':'')];}));
    html='<div class="flt-bar">'+
      '<div class="f1"><label>Filtrar por armamento</label><select id="hist-arm-sel">'+selOpts(armOpts2,ARM.fltArm.histArmId||'')+'</select></div>'+
      '<div class="f1"><label>Data inicial</label><input type="date" id="hist-arm-di" value="'+(ARM.fltArm.histDi||'')+'"/></div>'+
      '<div class="f1"><label>Data final</label><input type="date" id="hist-arm-df" value="'+(ARM.fltArm.histDf||'')+'"/></div>'+
      '<button class="btn btn-p" id="hist-arm-flt">Filtrar</button>'+
      '<span style="font-size:12px;color:#9ca3af;align-self:center">Selecione o filtro e clique em Filtrar</span>'+
    '</div>'+
    '<div id="hist-arm-list"><div style="color:#9ca3af;padding:20px">Carregando...</div></div>';
  }

  ct.innerHTML=html;

  // Async: carregar historico de armamentos
  if(ARM.tab==='historico'){
    function loadHistArm(){
      var selId=ARM.fltArm.histArmId||'';
      var di=ARM.fltArm.histDi||'';
      var df=ARM.fltArm.histDf||'';
      var q='';if(di)q+=(q?'&':'?')+'data_ini='+di;if(df)q+=(q?'&':'?')+'data_fim='+df;
      var url=selId?('/api/armaria/armamentos/'+selId+'/historico'+q):('/api/armaria/armamentos/movimentacoes'+q);
      api.get(url).then(function(r){
        var el=document.getElementById('hist-arm-list');if(!el)return;
        var rows=r.data;
        if(!rows.length){el.innerHTML='<div class="card"><div class="empty">Nenhuma movimentacao registrada para este filtro.</div></div>';return;}
        var tipoLabels={cautela_agente:'Cautela Agente',devolucao:'Devolucao',cofre_central:'Cofre Central',apreendido:'Apreendido',baixa:'Baixa'};
        var tipoColors={cautela_agente:'blue',devolucao:'green',cofre_central:'gray',apreendido:'red',baixa:'gray'};
        el.innerHTML=tableHtml(['Data','N Serie','Calibre','Tipo Mov.','Agente/Destino','Observacoes','Gestor'],rows.map(function(m){
          var det='--';
          if(m.tipo==='apreendido')det='OC:'+esc(m.ocorrencia||'--')+' Local:'+esc(m.local_apreensao||'--');
          return '<tr>'+
            '<td style="font-size:11px;color:#9ca3af">'+fmtTs(m.criado_em)+'</td>'+
            '<td style="font-family:monospace;font-size:12px"><b>'+esc(m.numero_serie)+'</b></td>'+
            '<td>'+bdg(esc(m.calibre||'--'),'blue')+'</td>'+
            '<td>'+bdg(tipoLabels[m.tipo]||m.tipo,tipoColors[m.tipo]||'gray')+'</td>'+
            '<td>'+esc(m.agente_nome||'--')+'</td>'+
            '<td style="font-size:11px;max-width:180px;color:#6b7280">'+esc(m.observacoes||det)+'</td>'+
            '<td style="color:#9ca3af">'+esc(m.gestor_nome||'--')+'</td>'+
          '</tr>';
        }));
      }).catch(function(e){toast(e.message,'er');});
    }
    loadHistArm();
    var hfBtn=document.getElementById('hist-arm-flt');
    if(hfBtn)hfBtn.onclick=function(){
      ARM.fltArm.histArmId=document.getElementById('hist-arm-sel').value;
      ARM.fltArm.histDi=(document.getElementById('hist-arm-di')||{}).value||'';
      ARM.fltArm.histDf=(document.getElementById('hist-arm-df')||{}).value||'';
      loadHistArm();
    };
  }

  // Bindings de eventos
  var efb=document.getElementById('est-flt-btn');
  if(efb)efb.onclick=function(){ARM.fltEst.cofre=document.getElementById('est-flt-c').value;ARM.fltEst.tipo=(document.getElementById('est-flt-t')||{}).value||'';ARM.fltEst.situacao=(document.getElementById('est-flt-sit')||{}).value||'';ARM.fltEst.alerta=(document.getElementById('est-flt-a')||{}).checked||false;renderARMContent();};
  var enb=document.getElementById('est-novo-btn');if(enb)enb.onclick=estNovoModal;
  var afb=document.getElementById('arm-flt-btn');
  if(afb)afb.onclick=function(){ARM.fltArm.busca=document.getElementById('arm-busca').value;ARM.fltArm.calibre=document.getElementById('arm-flt-c').value;ARM.fltArm.status=document.getElementById('arm-flt-s').value;ARM.fltArm.cofre=(document.getElementById('arm-flt-cf')||{}).value||'';ARM.pagArm=0;renderARMContent();};
  var aab=document.getElementById('arm-add-btn');if(aab)aab.onclick=armAddModal;
  var aeb=document.getElementById('arm-ent-btn');if(aeb)aeb.onclick=armEntradaModal;
  var htb=document.getElementById('arm-hist-toggle');if(htb)htb.onclick=function(){ARM.showEntradas=!ARM.showEntradas;renderARMContent();};
  var mfb=document.getElementById('mov-flt-btn');
  if(mfb)mfb.onclick=function(){ARM.fltMov.tipo=document.getElementById('mov-flt-t').value;ARM.fltMov.calibre=document.getElementById('mov-flt-c').value;ARM.fltMov.tipoMun=(document.getElementById('mov-flt-tm')||{}).value||'';ARM.pagMov=0;renderARMContent();};
  var cfb=document.getElementById('cau-flt-btn');
  if(cfb)cfb.onclick=function(){ARM.fltCau.busca=(document.getElementById('cau-busca')||{}).value||'';ARM.fltCau.setor=(document.getElementById('cau-setor')||{}).value||'';ARM.fltCau.tipo=(document.getElementById('cau-flt-tipo')||{}).value||'';ARM.fltCau.calibre=(document.getElementById('cau-flt-cal')||{}).value||'';ARM.fltCau.cofre=(document.getElementById('cau-flt-cofre')||{}).value||'';renderARMContent();};
  var cpdf=document.getElementById('cau-pdf-btn');
  if(cpdf&&ARM._cauPdfData)cpdf.onclick=function(){
    var d=ARM._cauPdfData;
    var rows='';
    d.agentesFlt.forEach(function(nomeAg){
      var agInfo=ARM.ags.find(function(a){return a.nome===nomeAg;})||{};
      var armas=d.cauArm[nomeAg]||[];
      armas.forEach(function(a,i){
        rows+='<tr>'+(i===0?'<td rowspan="'+armas.length+'" style="vertical-align:top;font-weight:700;border-right:2px solid #1A3A5C">'+nomeAg+'<br><span style="font-weight:400;font-size:11px;color:#6b7280">GCM '+(agInfo.funcional||'--')+'</span><br><span style="font-size:11px;color:#6b7280">'+(agInfo.setor||'')+'</span></td>':'')+'<td style="font-family:monospace;font-size:12px">'+a.numero_serie+'</td><td>'+a.tipo+'</td><td>'+((a.marca||'')+' '+(a.modelo||'')).trim()+'</td><td>'+a.calibre+'</td><td>'+(a.cofre==='central'?'Central':'Operacional')+'</td></tr>';
      });
    });
    var win=window.open('','_blank','width=900,height=700');
    win.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Relatorio de Cautelados - Armaria GCM Serra</title><style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:Arial,sans-serif;font-size:12px;color:#111;padding:24px;}h1{font-size:18px;color:#1A3A5C;margin-bottom:4px;}h2{font-size:13px;font-weight:400;color:#6b7280;margin-bottom:16px;}table{width:100%;border-collapse:collapse;margin-bottom:16px;}th{background:#1A3A5C;color:#fff;padding:6px 8px;text-align:left;font-size:11px;}td{padding:5px 8px;border-bottom:1px solid #e5e7eb;font-size:11px;}tr:nth-child(even) td{background:#f9fafb;}.summ{font-size:12px;color:#6b7280;margin-bottom:16px;padding:8px 12px;background:#f3f4f6;border-left:4px solid #1A3A5C;}.footer{margin-top:24px;font-size:10px;color:#9ca3af;text-align:center;border-top:1px solid #e5e7eb;padding-top:8px;}@media print{body{padding:12px;}}</style></head><body>');
    win.document.write('<h1>Relatorio de Armamentos Cautelados</h1>');
    win.document.write('<h2>Guarda Municipal da Serra — Armaria</h2>');
    win.document.write('<div class="summ">Emitido em: '+new Date().toLocaleString('pt-BR')+' &nbsp;|&nbsp; Total de agentes: <b>'+d.agentesFlt.length+'</b> &nbsp;|&nbsp; Total de armamentos: <b>'+d.totalArmas+'</b>'+(ARM.fltCau.setor?' &nbsp;|&nbsp; Setor: <b>'+ARM.fltCau.setor+'</b>':'')+(ARM.fltCau.tipo?' &nbsp;|&nbsp; Tipo: <b>'+ARM.fltCau.tipo+'</b>':'')+(ARM.fltCau.calibre?' &nbsp;|&nbsp; Calibre: <b>'+ARM.fltCau.calibre+'</b>':'')+(ARM.fltCau.cofre?' &nbsp;|&nbsp; Cofre: <b>'+(ARM.fltCau.cofre==='central'?'Central':'Operacional')+'</b>':'')+'</div>');
    win.document.write('<table><thead><tr><th>Agente</th><th>N Serie</th><th>Tipo</th><th>Marca/Modelo</th><th>Calibre</th><th>Cofre</th></tr></thead><tbody>'+rows+'</tbody></table>');
    win.document.write('<div class="footer">Documento gerado automaticamente pelo sistema Bluecore ERP — GCM Serra</div>');
    win.document.write('</body></html>');
    win.document.close();
    win.focus();
    setTimeout(function(){win.print();},400);
  };
  var gfb=document.getElementById('gran-flt-btn');
  if(gfb)gfb.onclick=function(){ARM.fltGran.tipo=(document.getElementById('gran-flt-t')||{}).value||'';ARM.fltGran.situacao=(document.getElementById('gran-flt-s')||{}).value||'';renderARMContent();};
  var gab=document.getElementById('gran-add-btn');if(gab)gab.onclick=granAddModal;
  var gmb=document.getElementById('gran-mov-btn');if(gmb)gmb.onclick=granMovModal;
  var cmb=document.getElementById('cau-mun-btn');if(cmb)cmb.onclick=cauMunModal;
  var dmb=document.getElementById('dep-mun-btn');if(dmb)dmb.onclick=depMunModal;
  var mmb=document.getElementById('arm-mov-btn');if(mmb)mmb.onclick=armMovModal;
  var meb=document.getElementById('mun-ent-btn');if(meb)meb.onclick=munEntradaModal;
  var ap=document.getElementById('ap');if(ap)ap.onclick=function(){ARM.pagArm=Math.max(0,ARM.pagArm-1);renderARMContent();};
  var an2=document.getElementById('an');if(an2)an2.onclick=function(){ARM.pagArm++;renderARMContent();};
  var mp=document.getElementById('mp');if(mp)mp.onclick=function(){ARM.pagMov=Math.max(0,ARM.pagMov-1);renderARMContent();};
  var mn2=document.getElementById('mn');if(mn2)mn2.onclick=function(){ARM.pagMov++;renderARMContent();};
  ct.addEventListener('click',function(e){
    var gc=e.target.closest('[data-go-tab]');
    if(gc){
      var t=gc.dataset.goTab,fk=gc.dataset.fltK,fs=gc.dataset.fltS,fv=gc.dataset.fltV;
      if(fk&&fs){var obj=ARM[fk];if(obj!==undefined)obj[fs]=(fv==='true'?true:fv==='false'?false:fv);}
      ARM.tab=t;
      document.querySelectorAll('#arm-tabs .tab').forEach(function(tb){tb.classList.toggle('on',tb.dataset.tab===ARM.tab);});
      renderARMContent();return;
    }
    var btn=e.target.closest('button');if(!btn)return;
    var aidx=parseInt(btn.dataset.idx);
    var eid=parseInt(btn.dataset.id);
    var gidx=parseInt(btn.dataset.idx);
    if(btn.classList.contains('arm-ficha'))armFichaModal(ARM.arms[aidx]);
    else if(btn.classList.contains('arm-hist'))armHistoricoModal(ARM.arms[aidx]);
    else if(btn.classList.contains('arm-ed'))armEditModal(ARM.arms[aidx]);
    else if(btn.classList.contains('arm-mov'))armMovArmModal(ARM.arms[aidx]);
    else if(btn.classList.contains('arm-del'))armExcluir(ARM.arms[aidx]);
    else if(btn.classList.contains('est-ed'))estEditModal(ARM.est.find(function(x){return x.id===eid;}));
    else if(btn.classList.contains('est-del'))estExcluir(eid);
    else if(btn.classList.contains('gran-ed'))granEditModal(ARM.gran[gidx]);
    else if(btn.classList.contains('gran-del'))granExcluir(ARM.gran[gidx]);
    else if(btn.classList.contains('cau-dev-btn')){var cid=parseInt(btn.dataset.id);devolverCautelaMun(ARM.cautMun.find(function(c){return c.id===cid;}));}
    else if(btn.classList.contains('ent-esp-btn')){
      var grupoid=btn.dataset.grupoid;
      var itensDaEntrada;
      if(grupoid&&grupoid.indexOf('_id_')===0){
        var legacyId=parseInt(grupoid.replace('_id_',''));
        itensDaEntrada=ARM.entradas.filter(function(e){return e.id===legacyId;});
      } else {
        itensDaEntrada=ARM.entradas.filter(function(e){return e.grupo_id===grupoid;});
      }
      entradaEspelhoModal(itensDaEntrada);
    }
    else if(btn.classList.contains('mun-sub-btn')){ARM.munSub=btn.dataset.sub;renderARMContent();}
    else if(btn.classList.contains('dep-baixa-btn')){depBaixaModal(parseInt(btn.dataset.id),btn.dataset.dep,parseInt(btn.dataset.qtd),btn.dataset.cal,btn.dataset.tipo);}
    else if(btn.classList.contains('mun-esp-btn')){
      var mgrupoid=btn.dataset.grupoid;
      var mitensDaEntrada=ARM.entMun.filter(function(e){return e.grupo_id===mgrupoid;});
      munEntradaEspelhoModal(mitensDaEntrada);
    }
  });
}

// -- Estoque modais
function estNovoModal(){
  var cofreOpts=[['central','Cofre Central'],['operacional','Cofre Operacional']];
  var sitOpts=[['disponivel','Disponivel'],['apreendida','Apreendida'],['vencida','Vencida'],['danificada','Danificada']];
  var body='<div class="fg">'+
    field('Calibre','<input id="en-cal" placeholder="Ex: 9mm"/>',false)+
    field('Tipo','<input id="en-tipo" placeholder="Ex: FMJ, Chumbo"/>',false)+
    field('Cofre','<select id="en-cofre">'+selOpts(cofreOpts,'central')+'</select>',false)+
    field('Situacao','<select id="en-sit">'+selOpts(sitOpts,'disponivel')+'</select>',false)+
    field('Fabricante','<input id="en-fab" placeholder="Ex: CBC, Sellier &amp; Bellot"/>',false)+
    field('Data de fabricacao','<input type="date" id="en-dfab"/>',false)+
    field('Data de vencimento','<input type="date" id="en-dven"/>',false)+
    field('Lote','<input id="en-lote" placeholder="Ex: LOTE-2025-001"/>',false)+
    field('Quantidade inicial','<input type="number" id="en-qtd" min="0" value="0"/>',false)+
    field('Quantidade minima (alerta)','<input type="number" id="en-min" min="0" value="0"/>',false)+
  '</div>';
  var footer='<button class="btn" id="en-c">Cancelar</button><button class="btn btn-p" id="en-ok">Cadastrar</button>';
  openModal('en','Nova Municao no Estoque','lg',body,footer);
  document.getElementById('en-c').onclick=function(){closeModal('en');};
  document.getElementById('en-ok').onclick=function(){
    api.post('/api/armaria/estoque',{calibre:document.getElementById('en-cal').value,tipo:document.getElementById('en-tipo').value,cofre:document.getElementById('en-cofre').value,situacao:document.getElementById('en-sit').value,fabricante:document.getElementById('en-fab').value||null,data_fabricacao:document.getElementById('en-dfab').value||null,data_vencimento:document.getElementById('en-dven').value||null,lote:document.getElementById('en-lote').value||null,quantidade_atual:parseInt(document.getElementById('en-qtd').value)||0,quantidade_minima:parseInt(document.getElementById('en-min').value)||0})
      .then(function(){toast('Municao cadastrada!');closeModal('en');pgArmaria();}).catch(function(e){toast(e.message,'er');});
  };
}
function estEditModal(e){
  if(!e)return;
  var cofreOpts=[['central','Cofre Central'],['operacional','Cofre Operacional']];
  var sitOpts=[['disponivel','Disponivel'],['apreendida','Apreendida'],['vencida','Vencida'],['danificada','Danificada']];
  var body='<div class="fg">'+
    field('Calibre','<input id="ee-cal" value="'+esc(e.calibre)+'"/>',false)+
    field('Tipo','<input id="ee-tipo" value="'+esc(e.tipo)+'"/>',false)+
    field('Cofre','<select id="ee-cofre">'+selOpts(cofreOpts,e.cofre)+'</select>',false)+
    field('Situacao','<select id="ee-sit">'+selOpts(sitOpts,e.situacao||'disponivel')+'</select>',false)+
    field('Fabricante','<input id="ee-fab" value="'+esc(e.fabricante||'')+'"/>',false)+
    field('Data de fabricacao','<input type="date" id="ee-dfab" value="'+esc(e.data_fabricacao||'')+'"/>',false)+
    field('Data de vencimento','<input type="date" id="ee-dven" value="'+esc(e.data_vencimento||'')+'"/>',false)+
    field('Lote','<input id="ee-lote" value="'+esc(e.lote||'')+'"/>',false)+
    field('Quantidade atual','<input type="number" id="ee-qtd" value="'+e.quantidade_atual+'"/>',false)+
    field('Quantidade minima','<input type="number" id="ee-min" value="'+e.quantidade_minima+'"/>',false)+
  '</div>';
  var footer='<button class="btn" id="ee-c">Cancelar</button><button class="btn btn-p" id="ee-ok">Salvar</button>';
  openModal('ee','Editar Municao - '+e.calibre+' '+e.tipo,'lg',body,footer);
  document.getElementById('ee-c').onclick=function(){closeModal('ee');};
  document.getElementById('ee-ok').onclick=function(){
    api.put('/api/armaria/estoque/'+e.id,{calibre:document.getElementById('ee-cal').value,tipo:document.getElementById('ee-tipo').value,cofre:document.getElementById('ee-cofre').value,situacao:document.getElementById('ee-sit').value,fabricante:document.getElementById('ee-fab').value||null,data_fabricacao:document.getElementById('ee-dfab').value||null,data_vencimento:document.getElementById('ee-dven').value||null,lote:document.getElementById('ee-lote').value||null,quantidade_atual:parseInt(document.getElementById('ee-qtd').value)||0,quantidade_minima:parseInt(document.getElementById('ee-min').value)||0})
      .then(function(){toast('Atualizado!');closeModal('ee');pgArmaria();}).catch(function(e){toast(e.message,'er');});
  };
}
function estExcluir(id){
  if(!confirm('Excluir esta municao do estoque? Isso so e possivel se nao houver movimentacoes vinculadas.'))return;
  api.del('/api/armaria/estoque/'+id).then(function(){toast('Removido!');pgArmaria();}).catch(function(e){toast(e.message,'er');});
}

// -- Movimentacao modal
function armMovModal(){
  var eOpts=ARM.est.map(function(e){return[e.id,e.calibre+' '+e.tipo+' - '+e.cofre+' ('+e.quantidade_atual+' un.)'];});
  var aOpts=ARM.ags.map(function(a){return[a.id,a.nome+' ('+a.funcional+')'];});
  var body='<div class="fg">'+
    field('Municao','<select id="mv-mid"><option value="">Selecione</option>'+selOpts(eOpts,'')+'</select>',true)+
    field('Tipo','<select id="mv-tipo"><option value="">Selecione</option><option value="entrada">Entrada</option><option value="saida">Saida</option></select>')+
    field('Quantidade','<input type="number" id="mv-qtd" min="1"/>')+
    field('Motivo','<select id="mv-motivo"><option value="">Selecione</option></select>')+
    field('Agente (se cautela)','<select id="mv-agid"><option value="">Nenhum</option>'+selOpts(aOpts,'')+'</select>')+
    field('Documento ref.','<input id="mv-doc"/>')+
    field('Observacoes','<textarea id="mv-obs"></textarea>',true)+
  '</div>';
  var footer='<button class="btn" id="mv-c">Cancelar</button><button class="btn btn-p" id="mv-ok">Confirmar</button>';
  openModal('mov','Registrar Movimentacao de Municao','md',body,footer);
  document.getElementById('mv-c').onclick=function(){closeModal('mov');};
  document.getElementById('mv-tipo').onchange=function(){
    var tipo=this.value;
    var m=tipo==='entrada'?[['compra','Compra'],['doacao','Doacao'],['transferencia','Transferencia'],['retorno_curso','Retorno de curso']]:[['cautela_agente','Cautela para agente'],['cofre_operacional','Cofre operacional'],['curso','Curso']];
    document.getElementById('mv-motivo').innerHTML='<option value="">Selecione</option>'+selOpts(m,'');
  };
  document.getElementById('mv-ok').onclick=function(){
    var mid=document.getElementById('mv-mid').value,tipo=document.getElementById('mv-tipo').value,qtd=document.getElementById('mv-qtd').value,motivo=document.getElementById('mv-motivo').value;
    if(!mid||!tipo||!qtd||!motivo){toast('Preencha todos os campos','er');return;}
    var data={municao_id:parseInt(mid),tipo_movimentacao:tipo,quantidade:parseInt(qtd),documento_ref:document.getElementById('mv-doc').value,observacoes:document.getElementById('mv-obs').value};
    if(tipo==='entrada')data.motivo_entrada=motivo;else{data.motivo_saida=motivo;var agid=document.getElementById('mv-agid').value;if(agid)data.agente_id=parseInt(agid);}
    api.post('/api/armaria/movimentacoes',data).then(function(){toast('Movimentacao registrada!');closeModal('mov');pgArmaria();}).catch(function(e){toast(e.message,'er');});
  };
}

// -- Armamento modais
function armAddModal(){
  var cofreOpts=[['operacional','Cofre Operacional'],['central','Cofre Central']];
  var body='<div class="fg">'+
    field('Tipo','<input id="aa-tipo" placeholder="Ex: Pistola"/>',true)+
    field('N. de serie','<input id="aa-serie"/>',true)+
    field('Marca','<input id="aa-marca"/>',false)+
    field('Modelo','<input id="aa-modelo"/>',false)+
    field('Calibre','<input id="aa-cal"/>',false)+
    field('Capacidade (municoes)','<input type="number" id="aa-cap" min="0" placeholder="Ex: 15"/>',false)+
    field('Cofre','<select id="aa-cofre">'+selOpts(cofreOpts,'operacional')+'</select>',false)+
    field('Orgao proprietario','<input id="aa-orgao" placeholder="Ex: GMS"/>',false)+
    field('Data de aquisicao','<input type="date" id="aa-daqu"/>',false)+
    field('Ultima inspecao','<input type="date" id="aa-insp"/>',false)+
    field('Quantidade','<input type="number" id="aa-qtd" value="1" min="1"/>',false)+
    field('Armeiro responsavel','<input id="aa-arm" placeholder="Nome do armeiro"/>',false)+
    field('Observacoes','<textarea id="aa-obs"></textarea>',false)+
  '</div>';
  var footer='<button class="btn" id="aa-c">Cancelar</button><button class="btn btn-p" id="aa-ok">Cadastrar</button>';
  openModal('arm','Cadastrar Armamento','lg',body,footer);
  document.getElementById('aa-c').onclick=function(){closeModal('arm');};
  document.getElementById('aa-ok').onclick=function(){
    api.post('/api/armaria/armamentos',{tipo:document.getElementById('aa-tipo').value,numero_serie:document.getElementById('aa-serie').value,marca:document.getElementById('aa-marca').value,modelo:document.getElementById('aa-modelo').value,calibre:document.getElementById('aa-cal').value,capacidade:parseInt(document.getElementById('aa-cap').value)||null,cofre:document.getElementById('aa-cofre').value,orgao_proprietario:document.getElementById('aa-orgao').value||null,data_aquisicao:document.getElementById('aa-daqu').value||null,ultima_inspecao:document.getElementById('aa-insp').value||null,armeiro:document.getElementById('aa-arm').value||null,observacoes:document.getElementById('aa-obs').value||null,quantidade:parseInt(document.getElementById('aa-qtd').value)||1})
      .then(function(){toast('Armamento cadastrado!');closeModal('arm');pgArmaria();}).catch(function(e){toast(e.message,'er');});
  };
}
function armEditModal(a){
  var cofreOpts=[['operacional','Cofre Operacional'],['central','Cofre Central']];
  var body='<div class="fg">'+
    field('Tipo','<input id="ae-tipo" value="'+esc(a.tipo)+'"/>',true)+
    field('N. de serie','<input id="ae-serie" value="'+esc(a.numero_serie)+'"/>',true)+
    field('Marca','<input id="ae-marca" value="'+esc(a.marca||'')+'"/>',false)+
    field('Modelo','<input id="ae-modelo" value="'+esc(a.modelo||'')+'"/>',false)+
    field('Calibre','<input id="ae-cal" value="'+esc(a.calibre||'')+'"/>',false)+
    field('Capacidade (municoes)','<input type="number" id="ae-cap" value="'+esc(a.capacidade||'')+'"/>',false)+
    field('Status','<select id="ae-status">'+selOpts([['disponivel','Disponivel'],['cautelado','Cautelado'],['apreendido','Apreendido'],['manutencao','Manutencao'],['baixado','Baixado']],a.status)+'</select>',false)+
    field('Cofre','<select id="ae-cofre">'+selOpts(cofreOpts,a.cofre||'operacional')+'</select>',false)+
    field('Orgao proprietario','<input id="ae-orgao" value="'+esc(a.orgao_proprietario||'')+'"/>',false)+
    field('Data de aquisicao','<input type="date" id="ae-daqu" value="'+esc(a.data_aquisicao||'')+'"/>',false)+
    field('Ultima inspecao','<input type="date" id="ae-insp" value="'+esc(a.ultima_inspecao||'')+'"/>',false)+
    field('Quantidade','<input type="number" id="ae-qtd" value="'+(a.quantidade||1)+'" min="1"/>',false)+
    field('Armeiro responsavel','<input id="ae-arm" value="'+esc(a.armeiro||'')+'"/>',false)+
    field('Observacoes','<textarea id="ae-obs">'+esc(a.observacoes||'')+'</textarea>',true)+
  '</div>';
  var footer='<button class="btn" id="ae-c">Cancelar</button><button class="btn btn-p" id="ae-ok">Salvar</button>';
  openModal('ae','Editar - '+a.numero_serie,'lg',body,footer);
  document.getElementById('ae-c').onclick=function(){closeModal('ae');};
  document.getElementById('ae-ok').onclick=function(){
    api.put('/api/armaria/armamentos/'+a.id,{tipo:document.getElementById('ae-tipo').value,numero_serie:document.getElementById('ae-serie').value,marca:document.getElementById('ae-marca').value,modelo:document.getElementById('ae-modelo').value,calibre:document.getElementById('ae-cal').value,capacidade:parseInt(document.getElementById('ae-cap').value)||null,status:document.getElementById('ae-status').value,cofre:document.getElementById('ae-cofre').value,orgao_proprietario:document.getElementById('ae-orgao').value||null,data_aquisicao:document.getElementById('ae-daqu').value||null,ultima_inspecao:document.getElementById('ae-insp').value||null,armeiro:document.getElementById('ae-arm').value||null,observacoes:document.getElementById('ae-obs').value||null,quantidade:parseInt(document.getElementById('ae-qtd').value)||1})
      .then(function(){toast('Atualizado!');closeModal('ae');pgArmaria();}).catch(function(e){toast(e.message,'er');});
  };
}
function armExcluir(a){if(!confirm('Excluir armamento '+a.numero_serie+'? Esta acao nao pode ser desfeita.'))return;api.del('/api/armaria/armamentos/'+a.id).then(function(){toast('Removido!');pgArmaria();}).catch(function(e){toast(e.message,'er');});}

// -- Ficha completa do armamento
function armFichaModal(a){
  if(!a)return;
  var statusCor={disponivel:'#16a34a',cautelado:'#2E75B6',apreendido:'#dc2626',manutencao:'#ca8a04',baixado:'#9ca3af'};
  function fichaRow(label,val){return '<div style="border-bottom:1px solid #f3f4f6;padding:8px 0;display:grid;grid-template-columns:140px 1fr;gap:8px;align-items:start"><span style="font-size:11px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:.4px">'+label+'</span><span style="font-size:13px;color:#111827">'+val+'</span></div>';}
  var body=
    '<div style="background:#f8fafc;border-radius:10px;padding:14px 18px;margin-bottom:18px;display:flex;align-items:center;gap:16px">'+
      '<div>'+
        '<div style="font-size:20px;font-weight:700;color:#1A3A5C;font-family:monospace">'+esc(a.numero_serie)+'</div>'+
        '<div style="font-size:13px;color:#6b7280;margin-top:2px">'+esc(a.tipo)+(a.marca?' &middot; '+esc(a.marca):'')+(a.modelo?' '+esc(a.modelo):'')+'</div>'+
      '</div>'+
      '<div style="margin-left:auto">'+saBdg(a.status)+'</div>'+
    '</div>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:0 24px;margin-bottom:18px">'+
      '<div>'+
        fichaRow('Calibre',bdg(a.calibre||'--','blue'))+
        fichaRow('Capacidade',(a.capacidade?a.capacidade+' municoes':'--'))+
        fichaRow('Cofre',bdg(a.cofre==='central'?'Cofre Central':'Cofre Operacional',a.cofre==='central'?'blue':'orange'))+
        fichaRow('Org. Proprietario',esc(a.orgao_proprietario||'--'))+
      '</div>'+
      '<div>'+
        fichaRow('Data Aquisicao',a.data_aquisicao?fmtDt(a.data_aquisicao):'--')+
        fichaRow('Ultima Inspecao',a.ultima_inspecao?fmtDt(a.ultima_inspecao):'--')+
        fichaRow('Armeiro Resp.',esc(a.armeiro||'--'))+
        fichaRow('Agente Atual',a.agente_nome?'<b style="color:#2E75B6">'+esc(a.agente_nome)+'</b>':'<span style="color:#9ca3af">Nenhum</span>')+
      '</div>'+
    '</div>'+
    (a.observacoes?'<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:10px 14px;font-size:12px;margin-bottom:18px"><b>Obs:</b> '+esc(a.observacoes)+'</div>':'')+
    '<div style="font-size:11px;font-weight:700;color:#1A3A5C;text-transform:uppercase;letter-spacing:.5px;border-bottom:2px solid #1A3A5C;padding-bottom:6px;margin-bottom:10px">Historico de Movimentacoes</div>'+
    '<div id="ficha-hist-list"><div style="color:#9ca3af;text-align:center;padding:20px">Carregando...</div></div>';
  var footer='<button class="btn" id="fich-c">Fechar</button>'+
    (canEdit('armaria')?' <button class="btn btn-p" id="fich-ed">Editar</button> <button class="btn btn-y" id="fich-mov">Movimentar</button>':'');
  openModal('ficha',a.tipo+' — '+a.numero_serie,'xl',body,footer);
  document.getElementById('fich-c').onclick=function(){closeModal('ficha');};
  if(canEdit('armaria')){
    document.getElementById('fich-ed').onclick=function(){closeModal('ficha');armEditModal(a);};
    document.getElementById('fich-mov').onclick=function(){closeModal('ficha');armMovArmModal(a);};
  }
  api.get('/api/armaria/armamentos/'+a.id+'/historico').then(function(r){
    var el=document.getElementById('ficha-hist-list');if(!el)return;
    var rows=r.data;
    if(!rows.length){el.innerHTML='<div class="empty">Nenhuma movimentacao registrada.</div>';return;}
    var tipoLabels={cautela_agente:'Cautela',devolucao:'Devolucao',cofre_central:'Cofre Central',apreendido:'Apreendido',baixa:'Baixa'};
    var tipoColors={cautela_agente:'blue',devolucao:'green',cofre_central:'gray',apreendido:'red',baixa:'gray'};
    el.innerHTML='<div style="overflow-x:auto"><table><thead><tr><th>Data</th><th>Tipo</th><th>Agente / Destino</th><th>Observacoes</th><th>Gestor</th></tr></thead><tbody>'+
      rows.map(function(m){
        var det='';
        if(m.tipo==='apreendido')det='OC:'+esc(m.ocorrencia||'--')+' Local:'+esc(m.local_apreensao||'--');
        return '<tr>'+
          '<td style="font-size:11px;color:#9ca3af;white-space:nowrap">'+fmtTs(m.criado_em)+'</td>'+
          '<td>'+bdg(tipoLabels[m.tipo]||m.tipo,tipoColors[m.tipo]||'gray')+'</td>'+
          '<td style="font-size:12px">'+esc(m.agente_nome||'--')+'</td>'+
          '<td style="font-size:11px;color:#6b7280;max-width:200px">'+esc(m.observacoes||det||'--')+'</td>'+
          '<td style="font-size:12px;color:#9ca3af">'+esc(m.gestor_nome||'--')+'</td>'+
        '</tr>';
      }).join('')+
    '</tbody></table></div>';
  }).catch(function(){var el=document.getElementById('ficha-hist-list');if(el)el.innerHTML='<div class="empty">Erro ao carregar historico.</div>';});
}

// -- Movimentar Armamento modal
function armMovArmModal(arm){
  var agsOpts=ARM.ags.map(function(a){return[a.id,a.nome+' ('+a.funcional+')'];});
  var armOpts=ARM.arms.map(function(a){return[a.id,'['+a.status.toUpperCase()+'] '+a.numero_serie+' - '+a.tipo+' '+esc(a.calibre||'')];});
  // Filtra opções de tipo de acordo com o status do armamento selecionado
  function getTipoOpts(status){
    var comum=[['manutencao','Enviar para Manutencao'],['leilao','Leilao'],['baixa_patrimonial','Baixa Patrimonial'],['descarte','Descarte']];
    if(status==='disponivel')return [['cautela_agente','Cautela para Agente'],['apreendido','Arma Apreendida (Ocorrencia)']].concat(comum);
    if(status==='cautelado')return [['devolucao','Devolucao / Retorno ao Cofre'],['cofre_central','Transferir para Cofre Central']].concat(comum);
    if(status==='apreendido')return [['devolucao','Registrar Retorno']].concat(comum);
    if(status==='manutencao')return [['retorno_manutencao','Retorno da Manutencao']].concat(comum);
    return comum;
  }
  var preSelArm=arm?arm.id:'';
  var armStatus=arm?arm.status:'disponivel';
  var tipoOptsIni=getTipoOpts(armStatus);
  var body='<div class="fg">'+
    field('Armamento','<select id="mva-arm"><option value="">Selecione</option>'+selOpts(armOpts,preSelArm)+'</select>',true)+
    field('Tipo de movimentacao','<select id="mva-tipo"><option value="">Selecione</option>'+selOpts(tipoOptsIni,'')+'</select>',true)+
    field('Agente (se cautela)','<select id="mva-agente"><option value="">Nenhum</option>'+selOpts(agsOpts,'')+'</select>')+
    field('Observacoes','<input id="mva-obs" placeholder="Observacoes gerais..."/>',true)+
    '<div id="mva-apreensao-wrap" style="display:none;grid-column:span 2">'+
      '<div class="fg">'+
        '<div style="grid-column:span 2"><div class="warn">Preencha os dados da ocorrencia de apreensao:</div></div>'+
        field('N da Ocorrencia / BO','<input id="mva-oc" placeholder="Ex: OC-2025-001"/>')+
        field('Data da apreensao','<input type="date" id="mva-data"/>')+
        field('Local da apreensao','<input id="mva-local" placeholder="Ex: Bairro Serra Dourada"/>',true)+
      '</div>'+
    '</div>'+
    '<div id="mva-manutencao-wrap" style="display:none;grid-column:span 2">'+
      '<div class="fg">'+
        field('Oficina / Responsavel','<input id="mva-oficina" placeholder="Ex: Armeiro Joao Silva"/>',true)+
        field('Previsao de retorno','<input type="date" id="mva-prev-ret"/>',false)+
        field('Custo estimado (R$)','<input type="number" id="mva-custo" placeholder="0.00"/>',false)+
      '</div>'+
    '</div>'+
    '<div id="mva-leilao-wrap" style="display:none;grid-column:span 2">'+
      '<div class="fg">'+
        field('Lote do leilao','<input id="mva-lote" placeholder="Ex: LOTE-2025-001"/>',false)+
        field('Data do leilao','<input type="date" id="mva-dleil"/>',false)+
        field('Valor arrematado (R$)','<input type="number" id="mva-valor" placeholder="0.00"/>',false)+
        field('Comprador','<input id="mva-comprador" placeholder="Nome do comprador"/>',false)+
      '</div>'+
    '</div>'+
    '<div id="mva-baixa-wrap" style="display:none;grid-column:span 2">'+
      '<div class="fg">'+
        field('Processo administrativo','<input id="mva-proc" placeholder="Ex: PA-2025-001"/>',false)+
        field('Autoridade que autorizou','<input id="mva-autor" placeholder="Ex: Corregedor Regional"/>',false)+
      '</div>'+
    '</div>'+
    '<div id="mva-descarte-wrap" style="display:none;grid-column:span 2">'+
      '<div class="fg">'+
        '<div style="grid-column:span 2"><div class="warn">Detalhe o processo de descarte:</div></div>'+
        field('Tipo de descarte','<input id="mva-tdesc" placeholder="Ex: Destruicao fisica, Fragmentacao"/>',false)+
        field('Local do descarte','<input id="mva-ldesc" placeholder="Ex: PF de Vitoria"/>',false)+
        field('Responsavel pelo descarte','<input id="mva-rdesc" placeholder="Nome do responsavel"/>',false)+
      '</div>'+
    '</div>'+
  '</div>';
  var footer='<button class="btn" id="mva-c">Cancelar</button><button class="btn btn-p" id="mva-ok">Confirmar</button>';
  openModal('mva','Movimentar Armamento','lg',body,footer);
  document.getElementById('mva-c').onclick=function(){closeModal('mva');};
  document.getElementById('mva-arm').onchange=function(){
    var selId=parseInt(this.value);
    var selArm=ARM.arms.find(function(x){return x.id===selId;});
    var opts=getTipoOpts(selArm?selArm.status:'disponivel');
    document.getElementById('mva-tipo').innerHTML='<option value="">Selecione</option>'+selOpts(opts,'');
    ['mva-apreensao-wrap','mva-manutencao-wrap','mva-leilao-wrap','mva-baixa-wrap','mva-descarte-wrap'].forEach(function(id){var el=document.getElementById(id);if(el)el.style.display='none';});
  };
  document.getElementById('mva-tipo').onchange=function(){
    var t=this.value;
    var wraps={apreendido:'mva-apreensao-wrap',manutencao:'mva-manutencao-wrap',leilao:'mva-leilao-wrap',baixa_patrimonial:'mva-baixa-wrap',descarte:'mva-descarte-wrap'};
    ['mva-apreensao-wrap','mva-manutencao-wrap','mva-leilao-wrap','mva-baixa-wrap','mva-descarte-wrap'].forEach(function(id){var el=document.getElementById(id);if(el)el.style.display='none';});
    if(wraps[t]){var el=document.getElementById(wraps[t]);if(el)el.style.display='';}
  };
  document.getElementById('mva-ok').onclick=function(){
    var armId=document.getElementById('mva-arm').value;
    var tipo=document.getElementById('mva-tipo').value;
    if(!armId||!tipo){toast('Selecione o armamento e o tipo','er');return;}
    var data={
      armamento_id:parseInt(armId),
      tipo:tipo,
      agente_id:document.getElementById('mva-agente').value||null,
      observacoes:document.getElementById('mva-obs').value
    };
    if(tipo==='apreendido'){
      data.ocorrencia=document.getElementById('mva-oc').value;
      data.local_apreensao=document.getElementById('mva-local').value;
      data.data_apreensao=document.getElementById('mva-data').value;
    } else if(tipo==='manutencao'){
      data.oficina=document.getElementById('mva-oficina').value;
      data.data_prev_retorno=document.getElementById('mva-prev-ret').value||null;
      data.custo_estimado=document.getElementById('mva-custo').value||null;
    } else if(tipo==='leilao'){
      data.lote_leilao=document.getElementById('mva-lote').value;
      data.valor_arrematado=document.getElementById('mva-valor').value||null;
      data.comprador=document.getElementById('mva-comprador').value;
    } else if(tipo==='baixa_patrimonial'){
      data.processo_adm=document.getElementById('mva-proc').value;
      data.autoridade_baixa=document.getElementById('mva-autor').value;
    } else if(tipo==='descarte'){
      data.tipo_descarte=document.getElementById('mva-tdesc').value;
      data.local_descarte=document.getElementById('mva-ldesc').value;
      data.responsavel_descarte=document.getElementById('mva-rdesc').value;
    }
    api.post('/api/armaria/armamentos/movimentar',data).then(function(){
      toast('Movimentacao registrada!');closeModal('mva');pgArmaria();
    }).catch(function(e){toast(e.message,'er');});
  };
}

// -- Historico de um armamento especifico
function armHistoricoModal(arm){
  openModal('armh','Historico - '+arm.numero_serie,'xl','<div style="color:#9ca3af;padding:20px">Carregando...</div>');
  api.get('/api/armaria/armamentos/'+arm.id+'/historico').then(function(r){
    var rows=r.data;
    var tipoLabels={cautela_agente:'Cautela Agente',devolucao:'Devolucao',cofre_central:'Cofre Central',apreendido:'Apreendido',baixa:'Baixa'};
    var tipoColors={cautela_agente:'blue',devolucao:'green',cofre_central:'gray',apreendido:'red',baixa:'gray'};
    var body=rows.length===0?'<div class="empty">Nenhuma movimentacao registrada para este armamento.</div>':
      tableHtml(['Data','Tipo','Agente/Destino','Observacoes','Detalhes','Gestor'],rows.map(function(m){
        var det='--';
        if(m.tipo==='apreendido')det='<span style="font-size:11px">OC: '+esc(m.ocorrencia||'--')+'<br>Local: '+esc(m.local_apreensao||'--')+'<br>Data: '+fmtDt(m.data_apreensao||'')+'</span>';
        return '<tr>'+
          '<td style="font-size:11px;color:#9ca3af">'+fmtTs(m.criado_em)+'</td>'+
          '<td>'+bdg(tipoLabels[m.tipo]||m.tipo,tipoColors[m.tipo]||'gray')+'</td>'+
          '<td>'+esc(m.agente_nome||'--')+'</td>'+
          '<td style="font-size:11px;max-width:200px">'+esc(m.observacoes||'--')+'</td>'+
          '<td>'+det+'</td>'+
          '<td style="color:#9ca3af;font-size:11px">'+esc(m.gestor_nome||'--')+'</td>'+
        '</tr>';
      }));
    var mb=document.getElementById('modal-armh');
    if(mb){
      mb.querySelector('.modal-t').textContent='Historico: '+arm.tipo+' - '+arm.numero_serie+(arm.calibre?' ('+arm.calibre+')':'');
      mb.querySelector('.modal-b').innerHTML=body;
    }
  }).catch(function(e){toast(e.message,'er');});
}

// -- Entrada de armamento modal (dois passos: cabecalho NF + lista de itens)
function armEntradaModal(){
  var nfItens=[];
  var armOpts=ARM.arms.map(function(a){return[a.id,'['+a.status.toUpperCase()+'] '+a.numero_serie+' - '+a.tipo+(a.calibre?' '+a.calibre:'')];});
  var tipoEntOpts=[['compra','Compra'],['doacao','Doacao'],['transferencia','Transferencia'],['apreensao','Apreensao'],['devolucao','Devolucao'],['outro','Outro']];
  var respOpts=ARM.ags.map(function(a){return[a.id,a.nome+' ('+a.funcional+')'];});
  var step1='<div id="ent-step1"><div class="fg">'+
    field('Tipo de entrada','<select id="ent-tipo">'+selOpts(tipoEntOpts,'compra')+'</select>',false)+
    field('Data da entrada','<input type="date" id="ent-data"/>',false)+
    field('Documento vinculado','<input id="ent-doc" placeholder="Ex: Oficio 001\/2025"/>',false)+
    field('Nota fiscal','<input id="ent-nf" placeholder="Ex: NF 12345"/>',false)+
    field('Processo administrativo','<input id="ent-proc" placeholder="Ex: PA-2025-001"/>',false)+
    field('Fornecedor','<input id="ent-forn" placeholder="Empresa ou nome"/>',false)+
    field('Responsavel pelo recebimento','<select id="ent-resp"><option value="">Selecione<\/option>'+selOpts(respOpts,'')+'<\/select>',false)+
    field('Observacoes','<input id="ent-obs" placeholder="Informacoes complementares..."/>',true)+
  '<\/div><\/div>';
  var step2='<div id="ent-step2" style="display:none">'+
    '<div id="ent-resumo" style="background:#f1f5f9;border-radius:8px;padding:10px 14px;margin-bottom:12px;font-size:12px;color:#374151"></div>'+
    '<div style="display:flex;gap:8px;align-items:flex-end;margin-bottom:10px">'+
      '<div class="f1"><label style="font-size:11px;font-weight:600">Armamento</label><select id="ent-arm-sel" style="width:100%"><option value="">Selecione<\/option>'+selOpts(armOpts,'')+'<\/select><\/div>'+
      '<div><label style="font-size:11px;font-weight:600">Qtd</label><input type="number" id="ent-arm-qtd" value="1" min="1" style="width:60px"/><\/div>'+
      '<button class="btn btn-p" id="ent-arm-add">+ Adicionar<\/button>'+
    '<\/div>'+
    '<div id="ent-itens-list"><\/div>'+
  '<\/div>';
  var body=step1+step2;
  var footer='<button class="btn" id="ent-c">Cancelar<\/button><button class="btn btn-p" id="ent-next">Proximo &rarr;<\/button>';
  openModal('ent','Nova Entrada de Armamento — NF','lg',body,footer);
  function renderNfItens(){
    var el=document.getElementById('ent-itens-list');
    if(!nfItens.length){el.innerHTML='<div class="empty" style="padding:10px">Nenhum armamento adicionado ainda.<\/div>';return;}
    var t='<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'+
      '<th style="text-align:left;padding:6px 8px;border-bottom:1px solid #e5e7eb">N Serie<\/th>'+
      '<th style="text-align:left;padding:6px 8px;border-bottom:1px solid #e5e7eb">Tipo<\/th>'+
      '<th style="text-align:left;padding:6px 8px;border-bottom:1px solid #e5e7eb">Calibre<\/th>'+
      '<th style="text-align:center;padding:6px 8px;border-bottom:1px solid #e5e7eb">Qtd<\/th>'+
      '<th style="padding:6px 8px;border-bottom:1px solid #e5e7eb"><\/th>'+
    '<\/tr><\/thead><tbody>';
    nfItens.forEach(function(it,idx){
      var a=ARM.arms.find(function(x){return x.id===it.armamento_id;})||{};
      t+='<tr>'+
        '<td style="padding:5px 8px;font-family:monospace;font-weight:700">'+esc(a.numero_serie||'--')+'<\/td>'+
        '<td style="padding:5px 8px">'+esc(a.tipo||'--')+'<\/td>'+
        '<td style="padding:5px 8px">'+esc(a.calibre||'--')+'<\/td>'+
        '<td style="padding:5px 8px;text-align:center">'+it.quantidade+'<\/td>'+
        '<td style="padding:5px 8px"><button class="btn btn-sm btn-d ent-rm-btn" data-idx="'+idx+'">Remover<\/button><\/td>'+
      '<\/tr>';
    });
    t+='<\/tbody><\/table>';
    el.innerHTML=t;
    el.querySelectorAll('.ent-rm-btn').forEach(function(b){
      b.onclick=function(){nfItens.splice(parseInt(b.dataset.idx),1);renderNfItens();};
    });
  }
  document.getElementById('ent-c').onclick=function(){closeModal('ent');};
  function bindStep1Footer(){
    document.getElementById('ent-c').onclick=function(){closeModal('ent');};
    document.getElementById('ent-next').onclick=irParaStep2;
  }
  function irParaStep2(){
    var tipo=document.getElementById('ent-tipo').value;
    var data=document.getElementById('ent-data').value;
    if(!tipo||!data){toast('Tipo de entrada e data sao obrigatorios','er');return;}
    var nf=document.getElementById('ent-nf').value;
    document.getElementById('ent-resumo').innerHTML=
      '<b>Tipo:<\/b> '+esc(tipo)+' &nbsp; <b>Data:<\/b> '+esc(data)+(nf?' &nbsp; <b>NF:<\/b> '+esc(nf):'');
    document.getElementById('ent-step1').style.display='none';
    document.getElementById('ent-step2').style.display='';
    document.querySelector('#modal-ent .modal-f').innerHTML=
      '<button class="btn" id="ent-back">&larr; Voltar<\/button><button class="btn btn-p" id="ent-confirm">Confirmar Entrada<\/button>';
    document.getElementById('ent-back').onclick=function(){
      document.getElementById('ent-step1').style.display='';
      document.getElementById('ent-step2').style.display='none';
      document.querySelector('#modal-ent .modal-f').innerHTML=
        '<button class="btn" id="ent-c">Cancelar<\/button><button class="btn btn-p" id="ent-next">Proximo &rarr;<\/button>';
      bindStep1Footer();
    };
    document.getElementById('ent-arm-add').onclick=function(){
      var armId=parseInt(document.getElementById('ent-arm-sel').value);
      var qtd=parseInt(document.getElementById('ent-arm-qtd').value)||1;
      if(!armId){toast('Selecione um armamento','er');return;}
      if(nfItens.some(function(x){return x.armamento_id===armId;})){toast('Armamento ja adicionado','er');return;}
      nfItens.push({armamento_id:armId,quantidade:qtd});
      document.getElementById('ent-arm-sel').value='';
      document.getElementById('ent-arm-qtd').value='1';
      renderNfItens();
    };
    renderNfItens();
    document.getElementById('ent-confirm').onclick=function(){
      if(!nfItens.length){toast('Adicione ao menos um armamento','er');return;}
      api.post('/api/armaria/entradas',{
        tipo_entrada:document.getElementById('ent-tipo').value,
        data_entrada:document.getElementById('ent-data').value,
        documento:document.getElementById('ent-doc').value||null,
        nota_fiscal:document.getElementById('ent-nf').value||null,
        processo_adm:document.getElementById('ent-proc').value||null,
        fornecedor:document.getElementById('ent-forn').value||null,
        responsavel_id:document.getElementById('ent-resp').value||null,
        observacoes:document.getElementById('ent-obs').value||null,
        itens:nfItens
      }).then(function(){toast('Entrada registrada!');closeModal('ent');pgArmaria();})
        .catch(function(e){toast(e.message,'er');});
    };
  }
  document.getElementById('ent-next').onclick=irParaStep2;
}

// -- Espelho de entrada (aceita array de itens)
function entradaEspelhoModal(itens){
  if(!itens||!itens.length)return;
  var cab=itens[0];
  var tipoLabel={compra:'Compra',doacao:'Doacao',transferencia:'Transferencia',apreensao:'Apreensao',devolucao:'Devolucao',outro:'Outro'};
  function row(lbl,val){return '<tr><td style="font-size:11px;color:#9ca3af;font-weight:600;text-transform:uppercase;padding:8px 12px;white-space:nowrap">'+lbl+'<\/td><td style="padding:8px 12px;font-size:13px">'+val+'<\/td><\/tr>';}
  var headerTable='<table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:16px">'+
    row('Tipo de Entrada',bdg(tipoLabel[cab.tipo_entrada]||cab.tipo_entrada,'blue'))+
    row('Data',fmtDt(cab.data_entrada))+
    row('Documento',esc(cab.documento||'--'))+
    row('Nota Fiscal',esc(cab.nota_fiscal||'--'))+
    row('Processo Administrativo',esc(cab.processo_adm||'--'))+
    row('Fornecedor',esc(cab.fornecedor||'--'))+
    row('Responsavel pelo Recebimento',esc(cab.responsavel_nome||'--')+(cab.responsavel_funcional?' (GCM '+esc(cab.responsavel_funcional)+')':''))+
    row('Gestor Responsavel',esc(cab.gestor_nome||'--'))+
    (cab.observacoes?row('Observacoes',esc(cab.observacoes)):'')+
  '<\/table>';
  var itemRows='';
  itens.forEach(function(it){
    itemRows+='<tr>'+
      '<td style="padding:6px 10px;font-family:monospace;font-weight:700">'+esc(it.numero_serie||'--')+'<\/td>'+
      '<td style="padding:6px 10px">'+esc(it.arm_tipo||'--')+'<\/td>'+
      '<td style="padding:6px 10px;font-size:12px">'+esc(((it.marca||'')+' '+(it.modelo||'')).trim()||'--')+'<\/td>'+
      '<td style="padding:6px 10px">'+esc(it.calibre||'--')+'<\/td>'+
      '<td style="padding:6px 10px">'+bdg(it.cofre==='central'?'Central':'Operacional',it.cofre==='central'?'blue':'orange')+'<\/td>'+
      '<td style="padding:6px 10px;text-align:center">'+it.quantidade+'<\/td>'+
    '<\/tr>';
  });
  var itemsSection='<div style="font-size:12px;font-weight:700;color:#1A3A5C;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Armamentos desta Entrada ('+itens.length+')<\/div>'+
    '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;font-size:12px">'+
      '<thead><tr>'+
        '<th style="text-align:left;padding:6px 10px;background:#f9fafb;border-bottom:1px solid #e5e7eb">N Serie<\/th>'+
        '<th style="text-align:left;padding:6px 10px;background:#f9fafb;border-bottom:1px solid #e5e7eb">Tipo<\/th>'+
        '<th style="text-align:left;padding:6px 10px;background:#f9fafb;border-bottom:1px solid #e5e7eb">Marca\/Modelo<\/th>'+
        '<th style="text-align:left;padding:6px 10px;background:#f9fafb;border-bottom:1px solid #e5e7eb">Calibre<\/th>'+
        '<th style="text-align:left;padding:6px 10px;background:#f9fafb;border-bottom:1px solid #e5e7eb">Cofre<\/th>'+
        '<th style="text-align:center;padding:6px 10px;background:#f9fafb;border-bottom:1px solid #e5e7eb">Qtd<\/th>'+
      '<\/tr><\/thead><tbody>'+itemRows+'<\/tbody><\/table><\/div>';
  var body='<div style="background:#f8fafc;border-radius:10px;padding:14px 18px;margin-bottom:18px">'+
    '<div style="font-size:18px;font-weight:700;color:#1A3A5C">ESPELHO DE ENTRADA DE ARMAMENTOS<\/div>'+
    '<div style="font-size:12px;color:#6b7280;margin-top:4px">Documento gerado em '+fmtTs(cab.criado_em)+'<\/div>'+
  '<\/div>'+headerTable+itemsSection;
  var footer='<button class="btn" id="esp-c">Fechar<\/button> <button class="btn btn-p" id="esp-p">Imprimir<\/button>';
  openModal('esp','Espelho de Entrada','lg',body,footer);
  document.getElementById('esp-c').onclick=function(){closeModal('esp');};
  document.getElementById('esp-p').onclick=function(){
    function prow(lbl,val){return '<tr><td style="font-size:11px;color:#6b7280;font-weight:600;text-transform:uppercase;padding:7px 12px;white-space:nowrap;border-bottom:1px solid #e5e7eb;background:#f9fafb">'+lbl+'<\/td><td style="padding:7px 12px;font-size:13px;border-bottom:1px solid #e5e7eb">'+val+'<\/td><\/tr>';}
    var now=new Date().toLocaleString('pt-BR');
    var w=window.open('','_blank','width=850,height=700');
    w.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Espelho de Entrada de Armamentos<\/title>'+
      '<style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:Arial,sans-serif;color:#111;padding:32px;}'+
      'h1{font-size:20px;color:#1A3A5C;margin-bottom:2px;}h2{font-size:12px;font-weight:400;color:#6b7280;margin-bottom:20px;}'+
      'table{width:100%;border-collapse:collapse;border:1px solid #e5e7eb;margin-bottom:20px;}'+
      'th{text-align:left;padding:7px 12px;background:#f9fafb;border-bottom:1px solid #e5e7eb;font-size:11px;color:#374151;}'+
      'td{padding:7px 12px;font-size:12px;border-bottom:1px solid #e5e7eb;}'+
      '.section-title{font-size:12px;font-weight:700;color:#1A3A5C;text-transform:uppercase;letter-spacing:.5px;margin:18px 0 8px;}'+
      '.footer{font-size:10px;color:#9ca3af;text-align:center;border-top:1px solid #e5e7eb;padding-top:10px;margin-top:10px;}'+
      '@media print{body{padding:16px;}}<\/style><\/head><body>');
    w.document.write('<h1>ESPELHO DE ENTRADA DE ARMAMENTOS<\/h1>');
    w.document.write('<h2>Guarda Municipal da Serra &mdash; Armaria &nbsp;|&nbsp; gerado em '+now+'<\/h2>');
    w.document.write('<div class="section-title">Dados da Nota Fiscal<\/div><table>');
    w.document.write(prow('Tipo de Entrada',tipoLabel[cab.tipo_entrada]||cab.tipo_entrada));
    w.document.write(prow('Data',fmtDt(cab.data_entrada)));
    w.document.write(prow('Documento',esc(cab.documento||'--')));
    w.document.write(prow('Nota Fiscal',esc(cab.nota_fiscal||'--')));
    w.document.write(prow('Processo Administrativo',esc(cab.processo_adm||'--')));
    w.document.write(prow('Fornecedor',esc(cab.fornecedor||'--')));
    w.document.write(prow('Responsavel pelo Recebimento',esc(cab.responsavel_nome||'--')+(cab.responsavel_funcional?' (GCM '+esc(cab.responsavel_funcional)+')':'')));
    w.document.write(prow('Gestor Responsavel',esc(cab.gestor_nome||'--')));
    if(cab.observacoes)w.document.write(prow('Observacoes',esc(cab.observacoes)));
    w.document.write('<\/table>');
    w.document.write('<div class="section-title">Armamentos desta Entrada ('+itens.length+')<\/div>');
    w.document.write('<table><thead><tr><th>N Serie<\/th><th>Tipo<\/th><th>Marca\/Modelo<\/th><th>Calibre<\/th><th>Cofre<\/th><th>Qtd<\/th><\/tr><\/thead><tbody>');
    itens.forEach(function(it){
      w.document.write('<tr>'+
        '<td style="font-family:monospace;font-weight:700">'+esc(it.numero_serie||'--')+'<\/td>'+
        '<td>'+esc(it.arm_tipo||'--')+'<\/td>'+
        '<td>'+esc(((it.marca||'')+' '+(it.modelo||'')).trim()||'--')+'<\/td>'+
        '<td>'+esc(it.calibre||'--')+'<\/td>'+
        '<td>'+(it.cofre==='central'?'Central':'Operacional')+'<\/td>'+
        '<td style="text-align:center">'+it.quantidade+'<\/td>'+
      '<\/tr>');
    });
    w.document.write('<\/tbody><\/table>');
    w.document.write('<div class="footer">Documento gerado automaticamente pelo sistema Bluecore ERP — GCM Serra<\/div>');
    w.document.write('<\/body><\/html>');
    w.document.close();w.focus();setTimeout(function(){w.print();},300);
  };
}

// -- Granadas: cadastro
function granAddModal(){
  var sitOpts=[['operacional','Operacional'],['danificada','Danificada'],['vencida','Vencida']];
  var locOpts=[['operacional','Operacional'],['central','Central'],['deposito','Deposito']];
  var body='<div class="fg">'+
    field('Tipo / Descricao','<input id="gr-tipo" placeholder="Ex: Granada de Mao M2A1, CS"/>',true)+
    field('Numero de Lote','<input id="gr-lote" placeholder="Ex: LOTE-2025-001"/>',false)+
    field('Fabricante','<input id="gr-fab" placeholder="Ex: Condor"/>',false)+
    field('Quantidade','<input type="number" id="gr-qtd" value="0" min="0"/>',false)+
    field('Data de fabricacao','<input type="date" id="gr-dfab"/>',false)+
    field('Data de validade','<input type="date" id="gr-dval"/>',false)+
    field('Situacao','<select id="gr-sit">'+selOpts(sitOpts,'operacional')+'</select>',false)+
    field('Local','<select id="gr-loc">'+selOpts(locOpts,'operacional')+'</select>',false)+
    field('Observacoes','<input id="gr-obs" placeholder="Informacoes adicionais..."/>',true)+
  '</div>';
  var footer='<button class="btn" id="gr-c">Cancelar</button><button class="btn btn-p" id="gr-ok">Cadastrar</button>';
  openModal('gran','Nova Granada / Artefato','lg',body,footer);
  document.getElementById('gr-c').onclick=function(){closeModal('gran');};
  document.getElementById('gr-ok').onclick=function(){
    var tipo=document.getElementById('gr-tipo').value;
    if(!tipo){toast('Tipo obrigatorio','er');return;}
    api.post('/api/armaria/granadas',{
      tipo:tipo,numero_lote:document.getElementById('gr-lote').value||null,
      fabricante:document.getElementById('gr-fab').value||null,
      quantidade:parseInt(document.getElementById('gr-qtd').value)||0,
      data_fabricacao:document.getElementById('gr-dfab').value||null,
      data_validade:document.getElementById('gr-dval').value||null,
      situacao:document.getElementById('gr-sit').value,
      local:document.getElementById('gr-loc').value,
      observacoes:document.getElementById('gr-obs').value||null
    }).then(function(){toast('Cadastrado!');closeModal('gran');pgArmaria();}).catch(function(e){toast(e.message,'er');});
  };
}

// -- Granadas: edicao
function granEditModal(g){
  if(!g)return;
  var sitOpts=[['operacional','Operacional'],['danificada','Danificada'],['vencida','Vencida']];
  var locOpts=[['operacional','Operacional'],['central','Central'],['deposito','Deposito']];
  var body='<div class="fg">'+
    field('Tipo / Descricao','<input id="gre-tipo" value="'+esc(g.tipo)+'"/>',true)+
    field('Numero de Lote','<input id="gre-lote" value="'+esc(g.numero_lote||'')+'"/>',false)+
    field('Fabricante','<input id="gre-fab" value="'+esc(g.fabricante||'')+'"/>',false)+
    field('Quantidade','<input type="number" id="gre-qtd" value="'+g.quantidade+'"/>',false)+
    field('Data de fabricacao','<input type="date" id="gre-dfab" value="'+esc(g.data_fabricacao||'')+'"/>',false)+
    field('Data de validade','<input type="date" id="gre-dval" value="'+esc(g.data_validade||'')+'"/>',false)+
    field('Situacao','<select id="gre-sit">'+selOpts(sitOpts,g.situacao||'operacional')+'</select>',false)+
    field('Local','<select id="gre-loc">'+selOpts(locOpts,g.local||'operacional')+'</select>',false)+
    field('Observacoes','<input id="gre-obs" value="'+esc(g.observacoes||'')+'"/>',true)+
  '</div>';
  var footer='<button class="btn" id="gre-c">Cancelar</button><button class="btn btn-p" id="gre-ok">Salvar</button>';
  openModal('graned','Editar: '+g.tipo,'lg',body,footer);
  document.getElementById('gre-c').onclick=function(){closeModal('graned');};
  document.getElementById('gre-ok').onclick=function(){
    api.put('/api/armaria/granadas/'+g.id,{
      tipo:document.getElementById('gre-tipo').value,
      numero_lote:document.getElementById('gre-lote').value||null,
      fabricante:document.getElementById('gre-fab').value||null,
      quantidade:parseInt(document.getElementById('gre-qtd').value)||0,
      data_fabricacao:document.getElementById('gre-dfab').value||null,
      data_validade:document.getElementById('gre-dval').value||null,
      situacao:document.getElementById('gre-sit').value,
      local:document.getElementById('gre-loc').value,
      observacoes:document.getElementById('gre-obs').value||null
    }).then(function(){toast('Atualizado!');closeModal('graned');pgArmaria();}).catch(function(e){toast(e.message,'er');});
  };
}

function granExcluir(g){
  if(!g)return;
  if(!confirm('Excluir '+g.tipo+'? Esta acao e irreversivel.'))return;
  api.delete('/api/armaria/granadas/'+g.id).then(function(){toast('Excluido!');pgArmaria();}).catch(function(e){toast(e.message,'er');});
}

// -- Granadas: movimentacao
function granMovModal(){
  var granOpts=ARM.gran.map(function(g){return[g.id,g.tipo+(g.numero_lote?' ['+g.numero_lote+']':'')+' - Qtd:'+g.quantidade];});
  var tipoOpts=[['entrada','Entrada'],['saida','Saida / Uso'],['cautela','Cautela para Agente'],['descarte','Descarte'],['vencimento','Vencimento']];
  var agsOpts=ARM.ags.map(function(a){return[a.id,a.nome+' ('+a.funcional+')'];});
  var body='<div class="fg">'+
    field('Granada / Artefato','<select id="gm-gran"><option value="">Selecione</option>'+selOpts(granOpts,'')+'</select>',true)+
    field('Tipo','<select id="gm-tipo">'+selOpts(tipoOpts,'saida')+'</select>',false)+
    field('Quantidade','<input type="number" id="gm-qtd" value="1" min="1"/>',false)+
    field('Agente (se cautela)','<select id="gm-ag"><option value="">Nenhum</option>'+selOpts(agsOpts,'')+'</select>',false)+
    field('Observacoes','<input id="gm-obs" placeholder="Motivo ou detalhe..."/>',true)+
  '</div>';
  var footer='<button class="btn" id="gm-c">Cancelar</button><button class="btn btn-p" id="gm-ok">Registrar</button>';
  openModal('gmov','Movimentar Granada / Artefato','md',body,footer);
  document.getElementById('gm-c').onclick=function(){closeModal('gmov');};
  document.getElementById('gm-ok').onclick=function(){
    var gid=document.getElementById('gm-gran').value;
    var tipo=document.getElementById('gm-tipo').value;
    var qtd=document.getElementById('gm-qtd').value;
    if(!gid||!tipo||!qtd){toast('Preencha todos os campos obrigatorios','er');return;}
    api.post('/api/armaria/granadas/movimentar',{
      granada_id:parseInt(gid),tipo:tipo,quantidade:parseInt(qtd),
      agente_id:document.getElementById('gm-ag').value||null,
      observacoes:document.getElementById('gm-obs').value||null
    }).then(function(){toast('Movimentacao registrada!');closeModal('gmov');pgArmaria();}).catch(function(e){toast(e.message,'er');});
  };
}

// -- Cautela de municoes
function cauMunModal(){
  var agsOpts=ARM.ags.map(function(a){return[a.id,a.nome+' ('+a.funcional+')'];});
  var estOpts=ARM.est.filter(function(e){return (!e.deposito||e.deposito==='ativo')&&e.quantidade_atual>0;}).map(function(e){return[e.id,e.calibre+' '+e.tipo+' (Disp: '+e.quantidade_atual+') - '+e.cofre];});
  var body='<div class="fg">'+
    field('Agente','<select id="cm-ag"><option value="">Selecione</option>'+selOpts(agsOpts,'')+'</select>',true)+
    field('Observacoes','<input id="cm-obs" placeholder="Motivo ou observacoes..."/>',true)+
  '</div>'+
  '<div style="margin-top:12px"><div style="font-size:11px;font-weight:700;color:#1A3A5C;text-transform:uppercase;margin-bottom:8px">Itens da Cautela</div>'+
  '<div id="cm-itens-list">'+
    estOpts.map(function(o,i){return '<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #f3f4f6">'+
      '<label style="flex:1;font-size:12px">'+esc(o[1])+'</label>'+
      '<input type="number" class="cm-qtd-inp" data-id="'+o[0]+'" placeholder="0" min="0" style="width:80px;padding:4px 8px;border:1px solid #d1d5db;border-radius:6px;font-size:12px" value="0"/>'+
    '</div>';}).join('')+
  '</div></div>';
  var footer='<button class="btn" id="cm-c">Cancelar</button><button class="btn btn-p" id="cm-ok">Registrar Cautela</button>';
  openModal('cmun','Nova Cautela de Municoes','lg',body,footer);
  document.getElementById('cm-c').onclick=function(){closeModal('cmun');};
  document.getElementById('cm-ok').onclick=function(){
    var agId=document.getElementById('cm-ag').value;
    if(!agId){toast('Selecione o agente','er');return;}
    var itens=[];
    document.querySelectorAll('.cm-qtd-inp').forEach(function(inp){
      var qtd=parseInt(inp.value)||0;
      if(qtd>0)itens.push({estoque_id:parseInt(inp.dataset.id),quantidade:qtd});
    });
    if(!itens.length){toast('Adicione pelo menos um item','er');return;}
    api.post('/api/armaria/municoes/cautelas',{
      agente_id:parseInt(agId),itens:itens,
      observacoes:document.getElementById('cm-obs').value||null
    }).then(function(){toast('Cautela registrada!');closeModal('cmun');pgArmaria();}).catch(function(e){toast(e.message,'er');});
  };
}

// -- Devolucao de cautela de municoes
function devolverCautelaMun(c){
  if(!c)return;
  var pendentes=c.itens?c.itens.filter(function(i){return i.quantidade_cautelada>i.quantidade_devolvida;}):[];
  if(!pendentes.length){toast('Todos os itens ja foram devolvidos','er');return;}
  var body='<div style="margin-bottom:12px"><b>Agente:</b> '+esc(c.agente_nome)+' &mdash; <b>Cautela #'+c.id+'</b></div>'+
    '<div style="font-size:11px;font-weight:700;color:#1A3A5C;text-transform:uppercase;margin-bottom:8px">Quantidades a devolver (max = pendente)</div>'+
    pendentes.map(function(i){
      var pend=i.quantidade_cautelada-i.quantidade_devolvida;
      return '<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid #f3f4f6">'+
        '<div style="flex:1"><div style="font-size:12px;font-weight:600">'+esc(i.calibre)+' '+esc(i.tipo_municao)+'</div>'+
        '<div style="font-size:11px;color:#9ca3af">Cautelado: '+i.quantidade_cautelada+' | Devolvido: '+i.quantidade_devolvida+' | Pendente: '+pend+'</div></div>'+
        '<input type="number" class="dev-qtd-inp" data-item-id="'+i.id+'" min="0" max="'+pend+'" value="'+pend+'" style="width:80px;padding:4px 8px;border:1px solid #d1d5db;border-radius:6px;font-size:12px"/>'+
      '</div>';
    }).join('');
  var footer='<button class="btn" id="dev-c">Cancelar</button><button class="btn btn-p" id="dev-ok">Confirmar Devolucao</button>';
  openModal('devmun','Devolucao de Municoes','md',body,footer);
  document.getElementById('dev-c').onclick=function(){closeModal('devmun');};
  document.getElementById('dev-ok').onclick=function(){
    var itens=[];
    document.querySelectorAll('.dev-qtd-inp').forEach(function(inp){
      var qtd=parseInt(inp.value)||0;
      if(qtd>0)itens.push({item_id:parseInt(inp.dataset.itemId),quantidade:qtd});
    });
    if(!itens.length){toast('Informe as quantidades','er');return;}
    api.put('/api/armaria/municoes/cautelas/'+c.id+'/devolver',{itens_devolucao:itens}).then(function(r){
      toast(r.data&&r.data.encerrada?'Cautela encerrada completamente!':'Devolucao parcial registrada!');
      closeModal('devmun');pgArmaria();
    }).catch(function(e){toast(e.message,'er');});
  };
}

// -- Deposito de municoes
function depMunModal(){
  var estOpts=ARM.est.filter(function(e){return (!e.deposito||e.deposito==='ativo')&&e.quantidade_atual>0;}).map(function(e){return[e.id,e.calibre+' '+e.tipo+' (Qtd: '+e.quantidade_atual+')'];});
  var depOpts=[['vencidas','Deposito de Vencidas'],['danificadas','Deposito de Danificadas']];
  var body='<div class="fg">'+
    field('Municao','<select id="dep-est"><option value="">Selecione</option>'+selOpts(estOpts,'')+'</select>',true)+
    field('Tipo de deposito','<select id="dep-tipo">'+selOpts(depOpts,'vencidas')+'</select>',false)+
    field('Quantidade','<input type="number" id="dep-qtd" value="1" min="1"/>',false)+
    field('Observacoes','<input id="dep-obs" placeholder="Motivo do envio..."/>',true)+
  '</div>';
  var footer='<button class="btn" id="dep-c">Cancelar</button><button class="btn btn-p btn-d" id="dep-ok">Enviar para Deposito</button>';
  openModal('dep','Enviar para Deposito','md',body,footer);
  document.getElementById('dep-c').onclick=function(){closeModal('dep');};
  document.getElementById('dep-ok').onclick=function(){
    var estId=document.getElementById('dep-est').value;
    var tipo=document.getElementById('dep-tipo').value;
    var qtd=document.getElementById('dep-qtd').value;
    if(!estId||!qtd){toast('Preencha os campos obrigatorios','er');return;}
    api.post('/api/armaria/municoes/deposito',{
      estoque_id:parseInt(estId),tipo_deposito:tipo,
      quantidade:parseInt(qtd),
      observacoes:document.getElementById('dep-obs').value||null
    }).then(function(){toast('Enviado para deposito!');closeModal('dep');pgArmaria();}).catch(function(e){toast(e.message,'er');});
  };
}

// -- Baixa total de deposito
function depBaixaModal(id,dep,qtd,cal,tipo){
  if(!id||!qtd){toast('Deposito sem quantidade para dar baixa','er');return;}
  var depLabel=dep==='vencidas'?'Vencidas':'Danificadas';
  var body='<div style="padding:8px 0">'+
    '<div style="margin-bottom:14px;padding:12px 16px;background:#fef2f2;border-radius:8px;border-left:4px solid #dc2626">'+
      '<div style="font-weight:700;color:#dc2626;margin-bottom:4px">Confirmar Baixa Total</div>'+
      '<div style="font-size:13px;color:#374151">Deposito de <b>'+depLabel+'</b>: <b>'+cal+' '+tipo+'</b></div>'+
      '<div style="font-size:13px;color:#374151;margin-top:4px">Quantidade: <b style="color:#dc2626">'+qtd+' un.</b></div>'+
      '<div style="font-size:11px;color:#9ca3af;margin-top:8px">Esta acao zerara o saldo deste deposito e nao pode ser desfeita.</div>'+
    '</div>'+
    '<div class="fg">'+field('Motivo / Processo','<input id="bx-motivo" placeholder="Ex: Processo 001/2025, destruicao autorizada..."/>',true)+'</div>'+
  '</div>';
  var footer='<button class="btn" id="bx-c">Cancelar</button><button class="btn" id="bx-ok" style="background:#dc2626;color:#fff;border:none">Confirmar Baixa Total</button>';
  openModal('bxdep','Dar Baixa no Deposito','md',body,footer);
  document.getElementById('bx-c').onclick=function(){closeModal('bxdep');};
  document.getElementById('bx-ok').onclick=function(){
    var motivo=document.getElementById('bx-motivo').value;
    if(!motivo){toast('Informe o motivo / processo','er');return;}
    api.post('/api/armaria/municoes/deposito/'+id+'/baixa',{observacoes:motivo})
      .then(function(){toast('Baixa registrada com sucesso!');closeModal('bxdep');pgArmaria();})
      .catch(function(e){toast(e.message,'er');});
  };
}

function munEntradaModal(){
  var munNfItens=[];
  var tipoEntOpts=[['compra','Compra'],['doacao','Doacao'],['transferencia','Transferencia'],['apreensao','Apreensao'],['outro','Outro']];
  var respOpts=ARM.ags.map(function(a){return[a.id,a.nome+' ('+a.funcional+')'];});
  var estAtivo=ARM.est.filter(function(e){return !e.deposito||e.deposito==='ativo';});
  var estOpts=estAtivo.map(function(e){return[e.id,e.calibre+' '+e.tipo+' ('+e.cofre+') — estoque atual: '+e.quantidade_atual];});
  var body='<div class="fg">'+
    field('Tipo de entrada','<select id="men-tipo">'+selOpts(tipoEntOpts,'compra')+'<\/select>',false)+
    field('Data da entrada','<input type="date" id="men-data"\/>',false)+
    field('Nota fiscal','<input id="men-nf" placeholder="Ex: NF 12345"\/>',false)+
    field('Documento vinculado','<input id="men-doc" placeholder="Ex: Oficio 001\/2025"\/>',false)+
    field('Processo administrativo','<input id="men-proc" placeholder="Ex: PA-2025-001"\/>',false)+
    field('Fornecedor','<input id="men-forn" placeholder="Empresa ou nome"\/>',false)+
    field('Responsavel pelo recebimento','<select id="men-resp"><option value="">Selecione<\/option>'+selOpts(respOpts,'')+'<\/select>',false)+
    field('Observacoes','<input id="men-obs" placeholder="Informacoes complementares..."\/>',true)+
  '<\/div>'+
  '<div style="border-top:1px solid #e5e7eb;padding-top:14px;margin-top:4px">'+
    '<div style="font-size:11px;font-weight:700;color:#1A3A5C;text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px">Itens da Nota<\/div>'+
    '<div style="display:flex;gap:8px;align-items:flex-end;margin-bottom:10px">'+
      '<div class="f1"><label style="font-size:11px;font-weight:600">Municao (Calibre \/ Tipo \/ Cofre)<\/label>'+
        '<select id="men-est-sel" style="width:100%"><option value="">Selecione<\/option>'+selOpts(estOpts,'')+'<\/select><\/div>'+
      '<div style="min-width:90px"><label style="font-size:11px;font-weight:600">Quantidade<\/label>'+
        '<input type="number" id="men-qtd" value="1" min="1" style="width:100%"\/><\/div>'+
      '<button class="btn btn-g" id="men-add">+ Adicionar<\/button>'+
    '<\/div>'+
    '<div id="men-itens-list"><\/div>'+
  '<\/div>';
  var footer='<button class="btn" id="men-c">Cancelar<\/button><button class="btn btn-p" id="men-ok">Registrar Entrada<\/button>';
  openModal('men','Nova Entrada de Municoes — NF','lg',body,footer);
  function renderMunNfItens(){
    var el=document.getElementById('men-itens-list');
    if(!munNfItens.length){el.innerHTML='<div class="empty" style="padding:10px">Nenhum item adicionado.<\/div>';return;}
    var t='<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr>'+
      '<th style="text-align:left;padding:5px 8px;border-bottom:1px solid #e5e7eb">Calibre<\/th>'+
      '<th style="text-align:left;padding:5px 8px;border-bottom:1px solid #e5e7eb">Tipo<\/th>'+
      '<th style="text-align:left;padding:5px 8px;border-bottom:1px solid #e5e7eb">Cofre<\/th>'+
      '<th style="text-align:center;padding:5px 8px;border-bottom:1px solid #e5e7eb">Qtd<\/th>'+
      '<th style="padding:5px 8px;border-bottom:1px solid #e5e7eb"><\/th>'+
    '<\/tr><\/thead><tbody>';
    munNfItens.forEach(function(it,idx){
      var est=estAtivo.find(function(e){return e.id===it.estoque_id;})||{};
      t+='<tr>'+
        '<td style="padding:5px 8px"><b>'+esc(est.calibre||'--')+'<\/b><\/td>'+
        '<td style="padding:5px 8px">'+esc(est.tipo||'--')+'<\/td>'+
        '<td style="padding:5px 8px">'+bdg(est.cofre==='central'?'Central':'Operacional',est.cofre==='central'?'blue':'orange')+'<\/td>'+
        '<td style="padding:5px 8px;text-align:center;font-weight:700;color:#16a34a">+'+it.quantidade+'<\/td>'+
        '<td style="padding:5px 8px"><button class="btn btn-sm btn-d men-rm-btn" data-idx="'+idx+'">Remover<\/button><\/td>'+
      '<\/tr>';
    });
    t+='<\/tbody><\/table>';
    el.innerHTML=t;
    el.querySelectorAll('.men-rm-btn').forEach(function(b){
      b.onclick=function(){munNfItens.splice(parseInt(b.dataset.idx),1);renderMunNfItens();};
    });
  }
  document.getElementById('men-c').onclick=function(){closeModal('men');};
  document.getElementById('men-add').onclick=function(){
    var estId=parseInt(document.getElementById('men-est-sel').value);
    var qtd=parseInt(document.getElementById('men-qtd').value)||1;
    if(!estId){toast('Selecione uma municao','er');return;}
    if(munNfItens.some(function(x){return x.estoque_id===estId;})){toast('Item ja adicionado','er');return;}
    munNfItens.push({estoque_id:estId,quantidade:qtd});
    document.getElementById('men-est-sel').value='';
    document.getElementById('men-qtd').value='1';
    renderMunNfItens();
  };
  renderMunNfItens();
  document.getElementById('men-ok').onclick=function(){
    if(!munNfItens.length){toast('Adicione ao menos um item','er');return;}
    var tipo=document.getElementById('men-tipo').value;
    var data=document.getElementById('men-data').value;
    if(!tipo||!data){toast('Tipo e data sao obrigatorios','er');return;}
    api.post('/api/armaria/municoes/entradas',{
      tipo_entrada:tipo,
      data_entrada:data,
      nota_fiscal:document.getElementById('men-nf').value||null,
      documento:document.getElementById('men-doc').value||null,
      processo_adm:document.getElementById('men-proc').value||null,
      fornecedor:document.getElementById('men-forn').value||null,
      responsavel_id:document.getElementById('men-resp').value||null,
      observacoes:document.getElementById('men-obs').value||null,
      itens:munNfItens
    }).then(function(){toast('Entrada registrada!');closeModal('men');pgArmaria();})
      .catch(function(e){toast(e.message,'er');});
  };
}

function munEntradaEspelhoModal(itens){
  if(!itens||!itens.length)return;
  var cab=itens[0];
  var tipoLabel={compra:'Compra',doacao:'Doacao',transferencia:'Transferencia',apreensao:'Apreensao',outro:'Outro'};
  function row(lbl,val){return '<tr><td style="font-size:11px;color:#9ca3af;font-weight:600;text-transform:uppercase;padding:8px 12px;white-space:nowrap">'+lbl+'<\/td><td style="padding:8px 12px;font-size:13px">'+val+'<\/td><\/tr>';}
  var totalQtd=itens.reduce(function(s,i){return s+i.quantidade;},0);
  var body='<div style="background:#f8fafc;border-radius:10px;padding:14px 18px;margin-bottom:18px">'+
    '<div style="font-size:18px;font-weight:700;color:#1A3A5C">ESPELHO DE ENTRADA DE MUNICOES<\/div>'+
    '<div style="font-size:12px;color:#6b7280;margin-top:4px">Documento gerado em '+fmtTs(cab.criado_em)+'<\/div>'+
  '<\/div>'+
  '<table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:16px">'+
    row('Tipo de Entrada',bdg(tipoLabel[cab.tipo_entrada]||cab.tipo_entrada,'blue'))+
    row('Data',fmtDt(cab.data_entrada))+
    row('Nota Fiscal',esc(cab.nota_fiscal||'--'))+
    row('Documento',esc(cab.documento||'--'))+
    row('Processo Administrativo',esc(cab.processo_adm||'--'))+
    row('Fornecedor',esc(cab.fornecedor||'--'))+
    row('Responsavel',esc(cab.responsavel_nome||'--')+(cab.responsavel_funcional?' (GCM '+esc(cab.responsavel_funcional)+')':''))+
    row('Gestor Responsavel',esc(cab.gestor_nome||'--'))+
    (cab.observacoes?row('Observacoes',esc(cab.observacoes)):'')+
  '<\/table>'+
  '<div style="font-size:12px;font-weight:700;color:#1A3A5C;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Itens desta Entrada ('+itens.length+' — Total: '+totalQtd+' un.)<\/div>'+
  '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;font-size:12px">'+
    '<thead><tr>'+
      '<th style="text-align:left;padding:6px 10px;background:#f9fafb;border-bottom:1px solid #e5e7eb">Calibre<\/th>'+
      '<th style="text-align:left;padding:6px 10px;background:#f9fafb;border-bottom:1px solid #e5e7eb">Tipo<\/th>'+
      '<th style="text-align:left;padding:6px 10px;background:#f9fafb;border-bottom:1px solid #e5e7eb">Cofre<\/th>'+
      '<th style="text-align:center;padding:6px 10px;background:#f9fafb;border-bottom:1px solid #e5e7eb">Quantidade Recebida<\/th>'+
    '<\/tr><\/thead><tbody>'+
    itens.map(function(it){
      return '<tr>'+
        '<td style="padding:6px 10px;font-weight:700">'+esc(it.calibre||'--')+'<\/td>'+
        '<td style="padding:6px 10px">'+esc(it.tipo_mun||'--')+'<\/td>'+
        '<td style="padding:6px 10px">'+bdg(it.cofre==='central'?'Central':'Operacional',it.cofre==='central'?'blue':'orange')+'<\/td>'+
        '<td style="padding:6px 10px;text-align:center;font-weight:700;color:#16a34a;font-size:15px">+'+it.quantidade+'<\/td>'+
      '<\/tr>';
    }).join('')+
  '<\/tbody><\/table><\/div>';
  var footer='<button class="btn" id="mesp-c">Fechar<\/button> <button class="btn btn-p" id="mesp-p">Imprimir<\/button>';
  openModal('mesp','Espelho de Entrada de Municoes','lg',body,footer);
  document.getElementById('mesp-c').onclick=function(){closeModal('mesp');};
  document.getElementById('mesp-p').onclick=function(){
    var now=new Date().toLocaleString('pt-BR');
    var w=window.open('','_blank','width=800,height=650');
    w.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><title>Espelho Entrada Municoes<\/title>'+
      '<style>*{box-sizing:border-box;margin:0;padding:0;}body{font-family:Arial,sans-serif;color:#111;padding:32px;}'+
      'h1{font-size:20px;color:#1A3A5C;margin-bottom:2px;}h2{font-size:12px;font-weight:400;color:#6b7280;margin-bottom:20px;}'+
      'table{width:100%;border-collapse:collapse;border:1px solid #e5e7eb;margin-bottom:20px;}'+
      'th{text-align:left;padding:7px 12px;background:#f9fafb;border-bottom:1px solid #e5e7eb;font-size:11px;color:#374151;}'+
      'td{padding:7px 12px;font-size:12px;border-bottom:1px solid #e5e7eb;}'+
      '.stitle{font-size:12px;font-weight:700;color:#1A3A5C;text-transform:uppercase;letter-spacing:.5px;margin:16px 0 8px;}'+
      '.footer{font-size:10px;color:#9ca3af;text-align:center;border-top:1px solid #e5e7eb;padding-top:10px;margin-top:10px;}'+
      '@media print{body{padding:16px;}}<\/style><\/head><body>');
    w.document.write('<h1>ESPELHO DE ENTRADA DE MUNICOES<\/h1>');
    w.document.write('<h2>Guarda Municipal da Serra &mdash; Armaria &nbsp;|&nbsp; gerado em '+now+'<\/h2>');
    w.document.write('<div class="stitle">Dados da Nota Fiscal<\/div><table>');
    function pr(l,v){w.document.write('<tr><td style="font-size:11px;color:#6b7280;font-weight:600;text-transform:uppercase;background:#f9fafb;white-space:nowrap;width:200px">'+l+'<\/td><td>'+v+'<\/td><\/tr>');}
    pr('Tipo de Entrada',tipoLabel[cab.tipo_entrada]||cab.tipo_entrada);
    pr('Data',fmtDt(cab.data_entrada));
    pr('Nota Fiscal',esc(cab.nota_fiscal||'--'));
    pr('Documento',esc(cab.documento||'--'));
    pr('Processo Administrativo',esc(cab.processo_adm||'--'));
    pr('Fornecedor',esc(cab.fornecedor||'--'));
    pr('Responsavel',esc(cab.responsavel_nome||'--')+(cab.responsavel_funcional?' (GCM '+esc(cab.responsavel_funcional)+')':''));
    pr('Gestor Responsavel',esc(cab.gestor_nome||'--'));
    if(cab.observacoes)pr('Observacoes',esc(cab.observacoes));
    w.document.write('<\/table>');
    w.document.write('<div class="stitle">Itens desta Entrada ('+itens.length+' — Total: '+totalQtd+' un.)<\/div>');
    w.document.write('<table><thead><tr><th>Calibre<\/th><th>Tipo<\/th><th>Cofre<\/th><th style="text-align:center">Qtd Recebida<\/th><\/tr><\/thead><tbody>');
    itens.forEach(function(it){
      w.document.write('<tr><td style="font-weight:700">'+esc(it.calibre||'--')+'<\/td><td>'+esc(it.tipo_mun||'--')+'<\/td><td>'+(it.cofre==='central'?'Central':'Operacional')+'<\/td><td style="text-align:center;font-weight:700;color:#16a34a">+'+it.quantidade+'<\/td><\/tr>');
    });
    w.document.write('<\/tbody><\/table>');
    w.document.write('<div class="footer">Documento gerado automaticamente pelo sistema Bluecore ERP — GCM Serra<\/div>');
    w.document.write('<\/body><\/html>');
    w.document.close();w.focus();setTimeout(function(){w.print();},300);
  };
}

// -- Relatorio modal
function armRelatorioModal(){
  var calibresDisp=[...new Set([...ARM.arms.map(function(a){return a.calibre;}), ...ARM.est.map(function(e){return e.calibre;})].filter(Boolean))].sort();
  var calOpts=[['','Todos os calibres']].concat(calibresDisp.map(function(c){return[c,c];}));
  var body='<div style="display:flex;flex-direction:column;gap:14px">'+
    '<div class="info">Escolha o tipo de relatorio e os filtros desejados. Sera aberto como PDF para impressao.</div>'+
    field('Tipo de relatorio','<select id="rel-tipo"><option value="completo">Relatorio Completo (Estoque + Armamentos)</option><option value="estoque">Somente Estoque de Municoes</option><option value="armamentos">Somente Armamentos</option><option value="critico">Municoes Abaixo do Minimo</option><option value="armamentos_status">Armamentos por Status</option></select>',true)+
    field('Filtrar por calibre','<select id="rel-cal">'+selOpts(calOpts,'')+'</select>')+
    field('Filtrar por cofre (municoes)','<select id="rel-cofre"><option value="">Todos</option><option value="central">Cofre Central</option><option value="operacional">Cofre Operacional</option></select>')+
    field('Filtrar armamentos por status','<select id="rel-status"><option value="">Todos</option><option value="disponivel">Disponivel</option><option value="cautelado">Cautelado</option><option value="manutencao">Manutencao</option><option value="baixado">Baixado</option></select>')+
  '</div>';
  var footer='<button class="btn" id="rel-c">Cancelar</button><button class="btn btn-g" id="rel-txt">Exportar TXT</button><button class="btn btn-p" id="rel-pdf">Gerar PDF</button>';
  openModal('rel','Exportar / Relatorio Armaria','md',body,footer);
  document.getElementById('rel-c').onclick=function(){closeModal('rel');};
  document.getElementById('rel-txt').onclick=function(){gerarRelTXT();closeModal('rel');};
  document.getElementById('rel-pdf').onclick=function(){gerarRelPDF();closeModal('rel');};
}

function getRelFiltros(){
  return {
    tipo: document.getElementById('rel-tipo').value,
    cal: document.getElementById('rel-cal').value,
    cofre: document.getElementById('rel-cofre').value,
    status: document.getElementById('rel-status').value
  };
}

function filtrarEst(f){return ARM.est.filter(function(e){if(f.cal&&e.calibre!==f.cal)return false;if(f.cofre&&e.cofre!==f.cofre)return false;if(f.tipo==='critico'&&!e.alerta_minimo)return false;return true;});}
function filtrarArm(f){return ARM.arms.filter(function(a){if(f.cal&&a.calibre!==f.cal)return false;if(f.status&&a.status!==f.status)return false;return true;});}

function gerarRelTXT(){
  var f=getRelFiltros();
  var sep=String.fromCharCode(10);
  var l=['BLUECORE - RELATORIO ARMARIA','GCM Serra | Data: '+new Date().toLocaleString('pt-BR'),'Tipo: '+document.getElementById('rel-tipo').options[document.getElementById('rel-tipo').selectedIndex].text,''];
  if(f.tipo!=='armamentos'&&f.tipo!=='armamentos_status'){
    l.push('=== ESTOQUE DE MUNICOES ===');
    filtrarEst(f).forEach(function(e){l.push('  '+e.calibre+' '+e.tipo+' ['+e.cofre+']: '+e.quantidade_atual+' un. (min: '+e.quantidade_minima+')'+( e.alerta_minimo?' *** ABAIXO DO MINIMO ***':'')); });
    l.push('');
  }
  if(f.tipo!=='estoque'&&f.tipo!=='critico'){
    l.push('=== ARMAMENTOS ===');
    filtrarArm(f).forEach(function(a){l.push('  ['+a.status.toUpperCase()+'] '+a.numero_serie+' | '+a.tipo+' '+a.marca+' '+a.modelo+' | Cal:'+a.calibre+(a.agente_nome?' | Agente: '+a.agente_nome:''));});
    l.push('');
  }
  l.push('Total municoes em estoque: '+ARM.est.reduce(function(s,e){return s+e.quantidade_atual;},0)+' unidades');
  l.push('Total armamentos: '+ARM.arms.length+' ('+ARM.arms.filter(function(a){return a.status==='disponivel';}).length+' disponiveis)');
  var b=new Blob([l.join(sep)],{type:'text/plain;charset=utf-8'});
  var u=URL.createObjectURL(b);var k=document.createElement('a');k.href=u;k.download='relatorio_armaria.txt';k.click();
  toast('Relatorio TXT exportado!');
}

function gerarRelPDF(){
  var f=getRelFiltros();
  var tituloRel=document.getElementById('rel-tipo').options[document.getElementById('rel-tipo').selectedIndex].text;
  var estRows='',armRows='';
  if(f.tipo!=='armamentos'&&f.tipo!=='armamentos_status'){
    estRows=filtrarEst(f).map(function(e){
      var pct=e.quantidade_minima>0?Math.min(100,Math.round(e.quantidade_atual/e.quantidade_minima*100)):100;
      var cor=pct<=50?'#dc2626':pct<=100?'#ca8a04':'#16a34a';
      return '<tr'+(e.alerta_minimo?' style="background:#fff5f5"':'')+'><td>'+esc(e.calibre)+'</td><td>'+esc(e.tipo)+'</td><td>'+esc(e.cofre)+'</td><td>'+esc(e.lote||'--')+'</td><td style="font-weight:700;color:'+cor+'">'+e.quantidade_atual+'</td><td>'+e.quantidade_minima+'</td><td style="color:'+cor+'">'+( e.alerta_minimo?'ABAIXO DO MINIMO':'OK')+'</td></tr>';
    }).join('');
  }
  if(f.tipo!=='estoque'&&f.tipo!=='critico'){
    var armFlt=filtrarArm(f);
    var grouped={};armFlt.forEach(function(a){if(!grouped[a.status])grouped[a.status]=[];grouped[a.status].push(a);});
    if(f.tipo==='armamentos_status'){
      Object.keys(grouped).forEach(function(st){
        armRows+='<tr><td colspan="6" style="background:#f3f4f6;font-weight:700;padding:8px 10px">'+st.toUpperCase()+' ('+grouped[st].length+')</td></tr>';
        armRows+=grouped[st].map(function(a){return '<tr><td>'+esc(a.numero_serie)+'</td><td>'+esc(a.tipo)+'</td><td>'+esc((a.marca||'')+' '+(a.modelo||'')).trim()+'</td><td>'+esc(a.calibre||'--')+'</td><td>'+esc(a.agente_nome||'--')+'</td></tr>';}).join('');
      });
    } else {
      armRows=armFlt.map(function(a){return '<tr><td>'+esc(a.numero_serie)+'</td><td>'+esc(a.tipo)+'</td><td>'+esc((a.marca||'')+' '+(a.modelo||'')).trim()+'</td><td>'+esc(a.calibre||'--')+'</td><td>'+esc(a.status)+'</td><td>'+esc(a.agente_nome||'--')+'</td></tr>';}).join('');
    }
  }
  var totMun=ARM.est.reduce(function(s,e){return s+e.quantidade_atual;},0);
  var totArm=ARM.arms.length,totDisp=ARM.arms.filter(function(a){return a.status==='disponivel';}).length;
  var html='<!DOCTYPE html><html><head><meta charset="UTF-8"><style>'+
    'body{font-family:Arial,sans-serif;font-size:12px;padding:15mm}'+
    '.hdr{text-align:center;border-bottom:2px solid #1A3A5C;padding-bottom:10px;margin-bottom:14px}'+
    '.titulo{font-size:18px;font-weight:700;letter-spacing:1px;color:#1A3A5C}'+
    '.sub{font-size:11px;color:#666;margin-top:3px}'+
    '.sumario{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px}'+
    '.sum-card{border:1px solid #e5e7eb;border-radius:6px;padding:10px;text-align:center}'+
    '.sum-val{font-size:22px;font-weight:700;color:#1A3A5C}'+
    '.sum-lbl{font-size:10px;color:#6b7280;text-transform:uppercase}'+
    'h2{font-size:13px;color:#1A3A5C;border-left:4px solid #1A3A5C;padding-left:8px;margin:14px 0 8px}'+
    'table{width:100%;border-collapse:collapse;margin-bottom:16px}'+
    'th{background:#1A3A5C;color:#fff;padding:7px 10px;text-align:left;font-size:11px}'+
    'td{padding:6px 10px;border-bottom:1px solid #e5e7eb;font-size:11px}'+
    'tr:hover td{background:#f9fafb}'+
    '.alerta{color:#dc2626;font-weight:700}'+
    '@media print{body{padding:10mm}}'+
  '</style></head><body>'+
  '<div class="hdr"><div class="titulo">GUARDA MUNICIPAL DA SERRA</div><div class="sub">RELATORIO ARMARIA | '+tituloRel.toUpperCase()+' | '+new Date().toLocaleString('pt-BR')+'</div></div>'+
  '<div class="sumario">'+
    '<div class="sum-card"><div class="sum-val">'+totMun+'</div><div class="sum-lbl">Total Municoes</div></div>'+
    '<div class="sum-card"><div class="sum-val" style="color:'+(ARM.est.filter(function(e){return e.alerta_minimo;}).length>0?'#dc2626':'#16a34a')+'">'+ARM.est.filter(function(e){return e.alerta_minimo;}).length+'</div><div class="sum-lbl">Alertas Estoque</div></div>'+
    '<div class="sum-card"><div class="sum-val">'+totArm+'</div><div class="sum-lbl">Armamentos</div></div>'+
    '<div class="sum-card"><div class="sum-val" style="color:#16a34a">'+totDisp+'</div><div class="sum-lbl">Disponiveis</div></div>'+
  '</div>';
  if(estRows){html+='<h2>Estoque de Municoes</h2><table><thead><tr><th>Calibre</th><th>Tipo</th><th>Cofre</th><th>Lote</th><th>Qtd Atual</th><th>Minimo</th><th>Status</th></tr></thead><tbody>'+estRows+'</tbody></table>';}
  if(armRows){html+='<h2>Armamentos</h2><table><thead><tr><th>N Serie</th><th>Tipo</th><th>Marca/Modelo</th><th>Calibre</th><th>Status</th><th>Agente</th></tr></thead><tbody>'+armRows+'</tbody></table>';}
  html+='</body></html>';
  pdfFromHtml(html,'relatorio_armaria');
}

// =====================================================================
// AGENTES
// =====================================================================
// AGENTES
// =====================================================================
var AGS={data:[],flt:{busca:'',setor:'',letra:'',subequipe:'',perfil:'',status:''},pag:0,perPag:25};
var ESTADOS_BR=['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'];
var SANGUES=['A+','A-','B+','B-','AB+','AB-','O+','O-'];
var STATUS_FUNC=['ativo','licenca','exonerado','demitido','afastado'];
function stfBdg(a){
  var s=a.status_funcional||(a.ativo?'ativo':'inativo');
  var colors={ativo:'green',licenca:'yellow',exonerado:'red',demitido:'red',afastado:'orange',inativo:'gray'};
  var labels={ativo:'Ativo',licenca:'Licenca',exonerado:'Exonerado',demitido:'Demitido',afastado:'Afastado',inativo:'Inativo'};
  return bdg(labels[s]||s,colors[s]||'gray');
}
function perfilBdg(a){
  if(a.perfil==='administrador')return bdg('Admin','red');
  if(a.perfil==='gestor_geral')return bdg('Gestor Geral','purple');
  return bdg('Restrito','gray');
}
function calcIdade(nasc){
  if(!nasc)return '';
  var hoje=new Date();var n=new Date(nasc+'T12:00:00');
  var age=hoje.getFullYear()-n.getFullYear();
  var m=hoje.getMonth()-n.getMonth();
  if(m<0||(m===0&&hoje.getDate()<n.getDate()))age--;
  return age+' anos';
}
function agTabSwitch(prefix,idx){
  var divs=document.querySelectorAll('#modal-'+prefix+' .ag-tp');
  var btns=document.querySelectorAll('#modal-'+prefix+' .ag-tb');
  divs.forEach(function(d,i){d.style.display=i===idx?'':'none';});
  btns.forEach(function(b,i){if(i===idx){b.classList.add('on');}else{b.classList.remove('on');}});
}
function agFormBody(prefix,a){
  if(!a)a={};
  var setOpts=SETORES.map(function(s){return[s,s];});
  var letOpts=[['','Nenhuma']].concat(LETRAS.map(function(l){return[l,'Equipe '+l];}));
  var perfilOpts=[['restrito','Restrito (por modulo)'],['gestor_geral','Gestor Geral'],['administrador','Administrador']];
  var stOpts=STATUS_FUNC.map(function(s){return[s,s.charAt(0).toUpperCase()+s.slice(1)];});
  var estadoOpts=[['','UF']].concat(ESTADOS_BR.map(function(e){return[e,e];}));
  var sangueOpts=[['','--']].concat(SANGUES.map(function(s){return[s,s];}));
  var tabs=['Funcional','Pessoal','Documentos','Contato e Saude','Endereco','Emergencia','Permissoes','Arquivo'];
  var html='<div id="'+prefix+'-tbr" style="display:flex;gap:4px;flex-wrap:wrap;border-bottom:1px solid #e5e7eb;padding-bottom:10px;margin-bottom:16px">';
  tabs.forEach(function(t,i){html+='<button class="tab ag-tb'+(i===0?' on':'')+'" data-tab="'+i+'">'+t+'</button>';});
  html+='</div>';
  // Tab 0: Funcional
  html+='<div class="ag-tp"><div class="fg">';
  html+=field('N (registro)','<input id="'+prefix+'-num" value="'+esc(a.numero||'')+'"/>');
  html+=field('Concurso (Ano)','<input id="'+prefix+'-conc" placeholder="Ex: 2019" value="'+esc(a.concurso||'')+'"/>');
  html+=field('Nome completo','<input id="'+prefix+'-n" value="'+esc(a.nome||'')+'"/>',true);
  html+=field('Funcional (matricula)','<input id="'+prefix+'-f" value="'+esc(a.funcional||'')+'"/>');
  html+=field('QRA (nome de guerra)','<input id="'+prefix+'-q" value="'+esc(a.qra||'')+'"/>');
  html+=field('N ROMU','<input id="'+prefix+'-romu" value="'+esc(a.romu||'')+'"/>');
  html+=field('Status funcional','<select id="'+prefix+'-stf">'+selOpts(stOpts,a.status_funcional||'ativo')+'</select>');
  html+=field('Data exoneracao / afastamento','<input type="date" id="'+prefix+'-dex" value="'+esc(a.data_exoneracao||'')+'"/>');
  html+=field('Entrada em exercicio','<input type="date" id="'+prefix+'-eex" value="'+esc(a.entrada_exercicio||'')+'"/>');
  html+=field('Setor','<select id="'+prefix+'-s"><option value="">Selecione</option>'+selOpts(setOpts,a.setor||'')+'</select>');
  html+=field('Letra (equipe)','<select id="'+prefix+'-l">'+selOpts(letOpts,a.letra||'')+'</select>');
  html+=field('Subequipe','<input id="'+prefix+'-seq" placeholder="Ex: Alpha, Bravo, 1, 2..." value="'+esc(a.subequipe||'')+'"/>');
  html+=field('Perfil de acesso','<select id="'+prefix+'-p">'+selOpts(perfilOpts,a.perfil||'restrito')+'</select>');
  html+='</div></div>';
  // Tab 1: Pessoal
  html+='<div class="ag-tp" style="display:none"><div class="fg">';
  html+=field('Sexo','<select id="'+prefix+'-sx"><option value="">Selecione</option><option value="M"'+(a.sexo==='M'?' selected':'')+'>Masculino</option><option value="F"'+(a.sexo==='F'?' selected':'')+'>Feminino</option></select>');
  html+=field('Data de nascimento','<input type="date" id="'+prefix+'-nasc" value="'+esc(a.nascimento||'')+'"/>');
  html+=field('Idade','<input id="'+prefix+'-idade" value="'+calcIdade(a.nascimento)+'" readonly style="background:#f9fafb;color:#6b7280"/>');
  html+=field('Naturalidade (municipio)','<input id="'+prefix+'-nat" value="'+esc(a.naturalidade||'')+'"/>');
  html+=field('Estado de nascimento','<select id="'+prefix+'-ensc">'+selOpts(estadoOpts,a.estado_nascimento||'')+'</select>');
  html+=field('Tipo sanguineo','<select id="'+prefix+'-sg">'+selOpts(sangueOpts,a.sangue||'')+'</select>');
  html+=field('Destro ou canhoto','<select id="'+prefix+'-dc"><option value="">Selecione</option><option value="Destro"'+(a.destro_canhoto==='Destro'?' selected':'')+'>Destro</option><option value="Canhoto"'+(a.destro_canhoto==='Canhoto'?' selected':'')+'>Canhoto</option><option value="Ambidestro"'+(a.destro_canhoto==='Ambidestro'?' selected':'')+'>Ambidestro</option></select>');
  html+=field('Estado civil','<select id="'+prefix+'-ec"><option value="">Selecione</option><option value="Solteiro"'+(a.estado_civil==='Solteiro'?' selected':'')+'>Solteiro(a)</option><option value="Casado"'+(a.estado_civil==='Casado'?' selected':'')+'>Casado(a)</option><option value="Divorciado"'+(a.estado_civil==='Divorciado'?' selected':'')+'>Divorciado(a)</option><option value="Viuvo"'+(a.estado_civil==='Viuvo'?' selected':'')+'>Viuvo(a)</option><option value="Uniao estavel"'+(a.estado_civil==='Uniao estavel'?' selected':'')+'>Uniao estavel</option></select>');
  html+=field('Filhos?','<select id="'+prefix+'-tf"><option value="0"'+(!(a.tem_filhos)?' selected':'')+'>Nao</option><option value="1"'+(a.tem_filhos==1?' selected':'')+'>Sim</option></select>');
  html+=field('Quantidade de filhos','<input type="number" id="'+prefix+'-qf" value="'+(a.quantidade_filhos||'')+'" min="0"/>');
  html+=field('Filiacao completa','<textarea id="'+prefix+'-fil">'+esc(a.filiacao||'')+'</textarea>',true);
  html+=field('Escolaridade','<select id="'+prefix+'-esc"><option value="">Selecione</option><option value="Fundamental incompleto"'+(a.escolaridade==='Fundamental incompleto'?' selected':'')+'>Fundamental incompleto</option><option value="Fundamental completo"'+(a.escolaridade==='Fundamental completo'?' selected':'')+'>Fundamental completo</option><option value="Medio incompleto"'+(a.escolaridade==='Medio incompleto'?' selected':'')+'>Medio incompleto</option><option value="Medio completo"'+(a.escolaridade==='Medio completo'?' selected':'')+'>Medio completo</option><option value="Superior incompleto"'+(a.escolaridade==='Superior incompleto'?' selected':'')+'>Superior incompleto</option><option value="Superior completo"'+(a.escolaridade==='Superior completo'?' selected':'')+'>Superior completo</option><option value="Pos-graduacao"'+(a.escolaridade==='Pos-graduacao'?' selected':'')+'>Pos-graduacao</option><option value="Mestrado"'+(a.escolaridade==='Mestrado'?' selected':'')+'>Mestrado</option><option value="Doutorado"'+(a.escolaridade==='Doutorado'?' selected':'')+'>Doutorado</option></select>');
  html+=field('Graduacao (curso)','<input id="'+prefix+'-grad" value="'+esc(a.graduacao||'')+'"/>');
  html+=field('Pos-graduacao','<input id="'+prefix+'-posg" value="'+esc(a.pos_graduacao||'')+'"/>');
  html+='</div></div>';
  // Tab 2: Documentos
  html+='<div class="ag-tp" style="display:none"><div class="fg">';
  html+=field('CPF','<input id="'+prefix+'-cpf" placeholder="000.000.000-00" value="'+esc(a.cpf||'')+'"/>');
  html+=field('N do RG','<input id="'+prefix+'-rg" value="'+esc(a.rg||'')+'"/>');
  html+=field('Orgao emissor RG','<input id="'+prefix+'-rgo" placeholder="SSP, DETRAN..." value="'+esc(a.rg_orgao||'')+'"/>');
  html+=field('Estado de emissao RG','<select id="'+prefix+'-rge">'+selOpts(estadoOpts,a.rg_estado||'')+'</select>');
  html+=field('CNH - Categoria','<input id="'+prefix+'-cnhc" placeholder="A, B, AB..." value="'+esc(a.cnh_categoria||'')+'"/>');
  html+=field('CNH - N','<input id="'+prefix+'-cnhn" value="'+esc(a.cnh_numero||'')+'"/>');
  html+=field('CNH - Validade','<input type="date" id="'+prefix+'-cnhv" value="'+esc(a.cnh_validade||'')+'"/>');
  html+=field('Processo atualizacao CNH','<input id="'+prefix+'-cnhp" value="'+esc(a.cnh_processo||'')+'"/>');
  html+='</div></div>';
  // Tab 3: Contato e Saude
  html+='<div class="ag-tp" style="display:none"><div class="fg">';
  html+=field('E-mail institucional','<input type="email" id="'+prefix+'-emi" value="'+esc(a.email_institucional||'')+'"/>');
  html+=field('E-mail pessoal','<input type="email" id="'+prefix+'-emp" value="'+esc(a.email_pessoal||'')+'"/>');
  html+=field('Contato do servidor (telefone)','<input id="'+prefix+'-tel" placeholder="(27) 99999-9999" value="'+esc(a.contato_servidor||'')+'"/>');
  html+=field('PCD (pessoa com deficiencia)','<select id="'+prefix+'-pcd"><option value="0"'+(!(a.pcd)?' selected':'')+'>Nao</option><option value="1"'+(a.pcd==1?' selected':'')+'>Sim</option></select>');
  html+=field('Prazo readaptacao ou licenca','<input id="'+prefix+'-prazo" placeholder="Ex: ate 30/06/2025" value="'+esc(a.prazo_readaptacao||'')+'"/>');
  html+=field('Plano de saude','<input id="'+prefix+'-ps" value="'+esc(a.plano_saude||'')+'"/>');
  html+=field('Alergias','<input id="'+prefix+'-alg" value="'+esc(a.alergias||'')+'"/>',true);
  html+=field('Condicao medica relevante','<textarea id="'+prefix+'-cmd">'+esc(a.condicao_medica||'')+'</textarea>',true);
  html+='</div></div>';
  // Tab 4: Endereco
  html+='<div class="ag-tp" style="display:none"><div class="fg">';
  html+=field('Rua / Logradouro','<input id="'+prefix+'-rua" value="'+esc(a.rua||'')+'"/>',true);
  html+=field('Bairro','<input id="'+prefix+'-bai" value="'+esc(a.bairro||'')+'"/>');
  html+=field('Cidade','<input id="'+prefix+'-cid" value="'+esc(a.cidade_residencia||'')+'"/>');
  html+='</div></div>';
  // Tab 5: Emergencia
  html+='<div class="ag-tp" style="display:none">';
  html+='<div class="sec">CONTATO DE EMERGENCIA 1</div><div class="fg">';
  html+=field('Nome','<input id="'+prefix+'-e1n" value="'+esc(a.emergencia1_nome||'')+'"/>',true);
  html+=field('Parentesco','<input id="'+prefix+'-e1r" value="'+esc(a.emergencia1_parentesco||'')+'"/>');
  html+=field('Telefone celular','<input id="'+prefix+'-e1t" placeholder="(27) 99999-9999" value="'+esc(a.emergencia1_telefone||'')+'"/>');
  html+='</div><div class="sec" style="margin-top:16px">CONTATO DE EMERGENCIA 2</div><div class="fg">';
  html+=field('Nome','<input id="'+prefix+'-e2n" value="'+esc(a.emergencia2_nome||'')+'"/>',true);
  html+=field('Parentesco','<input id="'+prefix+'-e2r" value="'+esc(a.emergencia2_parentesco||'')+'"/>');
  html+=field('Telefone celular','<input id="'+prefix+'-e2t" placeholder="(27) 99999-9999" value="'+esc(a.emergencia2_telefone||'')+'"/>');
  html+='</div></div>';
  // Tab 6: Permissoes
  html+='<div class="ag-tp" style="display:none">'+permGrid(a.permissoes||{},'agp-'+prefix)+'</div>';
  // Tab 7: Arquivo
  html+='<div class="ag-tp" style="display:none">';
  if(a.arquivo_nome)html+='<div class="info" style="margin-bottom:12px">Arquivo atual: <b>'+esc(a.arquivo_nome)+'</b>. Selecione um novo arquivo abaixo para substituir.</div>';
  html+=field('Selecionar arquivo (PDF, imagem)','<input type="file" id="'+prefix+'-arq" accept=".pdf,.jpg,.jpeg,.png" style="padding:6px"/>',true);
  html+='<div id="'+prefix+'-arq-prev" style="margin-top:12px"></div></div>';
  return html;
}
function agGetData(prefix){
  function v(id){var e=document.getElementById(id);return e?e.value:'';}
  var perfil=v(prefix+'-p');
  return {
    numero:v(prefix+'-num')||null, concurso:v(prefix+'-conc')||null,
    nome:v(prefix+'-n'), funcional:v(prefix+'-f'),
    qra:v(prefix+'-q')||null, romu:v(prefix+'-romu')||null,
    status_funcional:v(prefix+'-stf')||'ativo',
    data_exoneracao:v(prefix+'-dex')||null,
    entrada_exercicio:v(prefix+'-eex')||null,
    setor:v(prefix+'-s'), letra:v(prefix+'-l')||null, subequipe:v(prefix+'-seq')||null,
    perfil:perfil, permissoes:perfil==='restrito'?getPermFromGrid('agp-'+prefix):{},
    sexo:v(prefix+'-sx')||null, nascimento:v(prefix+'-nasc')||null,
    naturalidade:v(prefix+'-nat')||null, estado_nascimento:v(prefix+'-ensc')||null,
    sangue:v(prefix+'-sg')||null, destro_canhoto:v(prefix+'-dc')||null,
    estado_civil:v(prefix+'-ec')||null,
    tem_filhos:parseInt(v(prefix+'-tf'))||0,
    quantidade_filhos:parseInt(v(prefix+'-qf'))||null,
    filiacao:v(prefix+'-fil')||null, escolaridade:v(prefix+'-esc')||null,
    graduacao:v(prefix+'-grad')||null, pos_graduacao:v(prefix+'-posg')||null,
    cpf:v(prefix+'-cpf')||null, rg:v(prefix+'-rg')||null,
    rg_orgao:v(prefix+'-rgo')||null, rg_estado:v(prefix+'-rge')||null,
    cnh_categoria:v(prefix+'-cnhc')||null, cnh_numero:v(prefix+'-cnhn')||null,
    cnh_validade:v(prefix+'-cnhv')||null, cnh_processo:v(prefix+'-cnhp')||null,
    email_institucional:v(prefix+'-emi')||null, email_pessoal:v(prefix+'-emp')||null,
    contato_servidor:v(prefix+'-tel')||null,
    pcd:parseInt(v(prefix+'-pcd'))||0,
    prazo_readaptacao:v(prefix+'-prazo')||null,
    plano_saude:v(prefix+'-ps')||null, alergias:v(prefix+'-alg')||null,
    condicao_medica:v(prefix+'-cmd')||null,
    rua:v(prefix+'-rua')||null, bairro:v(prefix+'-bai')||null,
    cidade_residencia:v(prefix+'-cid')||null,
    emergencia1_nome:v(prefix+'-e1n')||null, emergencia1_parentesco:v(prefix+'-e1r')||null,
    emergencia1_telefone:v(prefix+'-e1t')||null,
    emergencia2_nome:v(prefix+'-e2n')||null, emergencia2_parentesco:v(prefix+'-e2r')||null,
    emergencia2_telefone:v(prefix+'-e2t')||null
  };
}
function agBindFile(prefix){
  var inp=document.getElementById(prefix+'-arq');
  if(!inp)return;
  inp.onchange=function(){
    var f=this.files[0];if(!f)return;
    var prev=document.getElementById(prefix+'-arq-prev');
    if(prev)prev.innerHTML='<span style="color:#6b7280;font-size:12px">Carregando...</span>';
    var rd=new FileReader();
    rd.onload=function(ev){
      var b64=ev.target.result;
      inp.dataset.b64=b64;
      inp.dataset.nome=f.name;
      if(prev){
        if(f.type.startsWith('image/')){prev.innerHTML='<img src="'+b64+'" style="max-width:200px;max-height:200px;border-radius:8px;border:1px solid #e5e7eb"/>';}
        else{prev.innerHTML='<div class="info">'+esc(f.name)+' selecionado.</div>';}
      }
    };
    rd.readAsDataURL(f);
  };
}
function pgAgentes(){
  pc().innerHTML='<div style="color:#9ca3af;padding:20px">Carregando...</div>';
  loadAgentes();
}
function loadAgentes(){
  var q=[];
  if(AGS.flt.busca)q.push('busca='+encodeURIComponent(AGS.flt.busca));
  if(AGS.flt.setor)q.push('setor='+encodeURIComponent(AGS.flt.setor));
  if(AGS.flt.letra)q.push('letra='+encodeURIComponent(AGS.flt.letra));
  if(AGS.flt.perfil)q.push('perfil='+encodeURIComponent(AGS.flt.perfil));
  api.get('/api/agentes'+(q.length?'?'+q.join('&'):'')).then(function(r){AGS.data=r.data;renderAgentes();}).catch(function(e){toast(e.message,'er');});
}
function renderAgentes(){
  var data=AGS.data;
  if(AGS.flt.status){data=data.filter(function(a){var s=a.status_funcional||(a.ativo?'ativo':'inativo');return s===AGS.flt.status;});}
  if(AGS.flt.subequipe){data=data.filter(function(a){return (a.subequipe||'').toLowerCase().indexOf(AGS.flt.subequipe.toLowerCase())>=0;});}
  var ativos=AGS.data.filter(function(a){return a.ativo;}).length;
  var setOpts=[['','Todos os setores']].concat(SETORES.map(function(s){return[s,s];}));
  var letOpts=[['','Todas as letras']].concat(LETRAS.map(function(l){return[l,'Equipe '+l];}));
  var perOpts=[['','Todos os perfis'],['restrito','Restrito'],['gestor_geral','Gestor Geral'],['administrador','Admin']];
  var stOpts=[['','Todos os status'],['ativo','Ativo'],['licenca','Licenca'],['afastado','Afastado'],['exonerado','Exonerado'],['demitido','Demitido']];
  var html=ph('Agentes',ativos+' ativos de '+AGS.data.length,isAdmin()?'<button class="btn btn-p" id="ag-novo">+ Novo agente</button>':'');
  html+='<div class="flt-bar">'+
    '<div class="f1"><label>Buscar</label><input id="ag-busca" placeholder="Nome, funcional, QRA..." value="'+esc(AGS.flt.busca)+'"/></div>'+
    '<div class="f1"><label>Setor</label><select id="ag-flt-s">'+selOpts(setOpts,AGS.flt.setor)+'</select></div>'+
    '<div class="f1"><label>Status</label><select id="ag-flt-st">'+selOpts(stOpts,AGS.flt.status)+'</select></div>'+
    '<div class="f1"><label>Letra</label><select id="ag-flt-l">'+selOpts(letOpts,AGS.flt.letra)+'</select></div>'+
    '<div class="f1"><label>Subequipe</label><input id="ag-flt-seq" placeholder="Subequipe..." value="'+esc(AGS.flt.subequipe)+'"/></div>'+
    '<div class="f1"><label>Perfil</label><select id="ag-flt-p">'+selOpts(perOpts,AGS.flt.perfil)+'</select></div>'+
    '<button class="btn btn-p" id="ag-flt-btn">Filtrar</button>'+
    '<span style="font-size:12px;color:#9ca3af;align-self:center">'+data.length+' resultado(s)</span>'+
  '</div>';
  // Paginação
  var perPag=AGS.perPag||25;
  var totalPags=Math.max(1,Math.ceil(data.length/perPag));
  if(AGS.pag>=totalPags)AGS.pag=totalPags-1;
  var pagData=data.slice(AGS.pag*perPag,(AGS.pag+1)*perPag);
  // Controles de paginação (reutilizados em cima e embaixo)
  function pagControls(pos){
    var s='<div style="display:flex;align-items:center;gap:6px;padding:8px 0;flex-wrap:wrap">';
    s+='<span style="font-size:12px;color:#6b7280">Pág '+(AGS.pag+1)+' de '+totalPags+' &bull; '+data.length+' agente(s)</span>';
    s+='<span style="flex:1"></span>';
    s+='<select id="ag-per-pag-'+pos+'" style="padding:4px 8px;border:1px solid #e5e7eb;border-radius:6px;font-size:12px">';
    [10,25,50,100].forEach(function(n){s+='<option value="'+n+'"'+(perPag===n?' selected':'')+'>'+n+' por pág</option>';});
    s+='</select>';
    s+='<button class="btn btn-sm" id="ag-p-first-'+pos+'" '+(AGS.pag===0?'disabled':'')+'>«</button>';
    s+='<button class="btn btn-sm" id="ag-p-prev-'+pos+'" '+(AGS.pag===0?'disabled':'')+'>‹</button>';
    var lo=Math.max(0,AGS.pag-2),hi=Math.min(totalPags-1,lo+4);lo=Math.max(0,hi-4);
    for(var pi=lo;pi<=hi;pi++){s+='<button class="btn btn-sm ag-pg-btn '+(pi===AGS.pag?'btn-p':'')+'" data-pg="'+pi+'">'+(pi+1)+'</button>';}
    s+='<button class="btn btn-sm" id="ag-p-next-'+pos+'" '+(AGS.pag>=totalPags-1?'disabled':'')+'>›</button>';
    s+='<button class="btn btn-sm" id="ag-p-last-'+pos+'" '+(AGS.pag>=totalPags-1?'disabled':'')+'>»</button>';
    s+='</div>';
    return s;
  }
  // Tabela com scroll duplo (topo + base)
  var COLS='<tr><th>Nº</th><th>Nome / Funcional</th><th>QRA</th><th>Setor</th><th>Equipe</th>'+
    '<th>Concurso</th><th>Sexo</th><th>Nascimento</th>'+
    '<th>CPF</th><th>RG</th><th>CNH</th>'+
    '<th>E-mail</th><th>Contato</th><th>Sangue</th>'+
    '<th>Status</th><th>Perfil</th><th>Acoes</th></tr>';
  var rows='';
  if(!pagData.length){rows='<tr><td colspan="17"><div class="empty">Nenhum agente encontrado.</div></td></tr>';}
  else{
    pagData.forEach(function(a){
      var idx=AGS.data.indexOf(a);
      var cnh=a.cnh_categoria?esc(a.cnh_categoria)+(a.cnh_validade?' val.'+fmtDt(a.cnh_validade):''):'<span style="color:#9ca3af">--</span>';
      rows+='<tr>'+
        '<td style="font-family:monospace;font-size:11px;white-space:nowrap;color:#1A3A5C;font-weight:600">'+(a.numero||'<span style="color:#9ca3af">--</span>')+'</td>'+
        '<td style="min-width:160px"><div style="font-weight:600">'+esc(a.nome)+'</div><div style="font-size:11px;color:#9ca3af">Func: '+esc(a.funcional)+'</div></td>'+
        '<td>'+(a.qra?'<b style="color:#1A3A5C">'+esc(a.qra)+'</b>':'<span style="color:#9ca3af">--</span>')+'</td>'+
        '<td>'+bdg(a.setor,'blue')+'</td>'+
        '<td>'+(a.letra?bdg('Eq.'+a.letra,'purple')+(a.subequipe?'<div style="font-size:11px;color:#6b7280;margin-top:2px">'+esc(a.subequipe)+'</div>':''):'<span style="color:#9ca3af">--</span>')+'</td>'+
        '<td style="font-size:12px;white-space:nowrap">'+(a.concurso?esc(a.concurso):'<span style="color:#9ca3af">--</span>')+'</td>'+
        '<td style="text-align:center">'+(a.sexo?bdg(a.sexo==='M'?'Masc':a.sexo==='F'?'Fem':esc(a.sexo),a.sexo==='F'?'purple':'blue'):'<span style="color:#9ca3af">--</span>')+'</td>'+
        '<td style="font-size:12px;white-space:nowrap">'+(a.nascimento?fmtDt(a.nascimento)+(calcIdade(a.nascimento)?' <span style="color:#9ca3af">('+calcIdade(a.nascimento)+')</span>':''):'<span style="color:#9ca3af">--</span>')+'</td>'+
        '<td style="font-family:monospace;font-size:11px">'+(a.cpf?esc(a.cpf):'<span style="color:#9ca3af">--</span>')+'</td>'+
        '<td style="font-size:11px">'+(a.rg?esc(a.rg)+(a.rg_orgao?' '+esc(a.rg_orgao):'')+(a.rg_estado?' '+esc(a.rg_estado):''):'<span style="color:#9ca3af">--</span>')+'</td>'+
        '<td style="font-size:11px;white-space:nowrap">'+cnh+'</td>'+
        '<td style="font-size:11px">'+(a.email_institucional?'<a href="mailto:'+esc(a.email_institucional)+'" style="color:#2563eb;text-decoration:none">'+esc(a.email_institucional)+'</a>':'<span style="color:#9ca3af">--</span>')+'</td>'+
        '<td style="font-size:12px">'+(a.contato_servidor?esc(a.contato_servidor):'<span style="color:#9ca3af">--</span>')+(a.contato_familiar?'<div style="font-size:11px;color:#9ca3af">Fam: '+esc(a.contato_familiar)+'</div>':'')+'</td>'+
        '<td style="text-align:center">'+(a.sangue?bdg(a.sangue,'red'):'<span style="color:#9ca3af">--</span>')+'</td>'+
        '<td>'+stfBdg(a)+'</td>'+
        '<td>'+perfilBdg(a)+'</td>'+
        '<td><div style="display:flex;gap:4px;flex-wrap:wrap;min-width:120px">'+
          '<button class="btn btn-sm ag-ficha" data-idx="'+idx+'">Ficha</button>'+
          (isAdmin()?'<button class="btn btn-sm ag-ed" data-idx="'+idx+'">Editar</button>':'')+
          (isAdmin()?'<button class="btn btn-sm ag-sen" data-idx="'+idx+'">Senha</button>':'')+
          (isAdmin()?'<button class="btn btn-sm ag-rst" data-idx="'+idx+'">Reset</button>':'')+
        '</div></td>'+
      '</tr>';
    });
  }
  html+='<div class="card" style="padding:0">'+
    '<div style="padding:0 12px">'+pagControls('top')+'</div>'+
    // Scroll fantasma no topo
    '<div id="ag-scroll-top" style="overflow-x:auto;height:12px;margin:0 0 2px"><div id="ag-scroll-top-inner" style="height:1px"></div></div>'+
    // Tabela principal
    '<div id="ag-scroll-main" style="overflow-x:auto">'+
      '<table id="ag-tbl"><thead>'+COLS+'</thead><tbody>'+rows+'</tbody><tfoot>'+COLS+'</tfoot></table>'+
    '</div>'+
    '<div style="padding:0 12px">'+pagControls('bot')+'</div>'+
  '</div>';
  pc().innerHTML=html;
  if(isAdmin()){var nb=document.getElementById('ag-novo');if(nb)nb.onclick=agNovoModal;}
  // Filtro
  var fb=document.getElementById('ag-flt-btn');
  if(fb)fb.onclick=function(){
    AGS.flt.busca=document.getElementById('ag-busca').value;
    AGS.flt.setor=document.getElementById('ag-flt-s').value;
    AGS.flt.letra=document.getElementById('ag-flt-l').value;
    AGS.flt.subequipe=document.getElementById('ag-flt-seq').value;
    AGS.flt.perfil=document.getElementById('ag-flt-p').value;
    AGS.flt.status=document.getElementById('ag-flt-st').value;
    AGS.pag=0;
    loadAgentes();
  };
  // Paginação — botões de ambas as barras
  ['top','bot'].forEach(function(pos){
    var pp=document.getElementById('ag-per-pag-'+pos);
    if(pp)pp.onchange=function(){AGS.perPag=parseInt(this.value);AGS.pag=0;renderAgentes();};
    var pf=document.getElementById('ag-p-first-'+pos);if(pf)pf.onclick=function(){AGS.pag=0;renderAgentes();};
    var pv=document.getElementById('ag-p-prev-'+pos);if(pv)pv.onclick=function(){if(AGS.pag>0){AGS.pag--;renderAgentes();}};
    var pn=document.getElementById('ag-p-next-'+pos);if(pn)pn.onclick=function(){if(AGS.pag<totalPags-1){AGS.pag++;renderAgentes();}};
    var pl=document.getElementById('ag-p-last-'+pos);if(pl)pl.onclick=function(){AGS.pag=totalPags-1;renderAgentes();};
  });
  document.querySelectorAll('.ag-pg-btn').forEach(function(b){
    b.onclick=function(){AGS.pag=parseInt(this.dataset.pg);renderAgentes();};
  });
  // Scroll sincronizado topo <-> tabela
  var scrollMain=document.getElementById('ag-scroll-main');
  var scrollTop=document.getElementById('ag-scroll-top');
  var scrollTopInner=document.getElementById('ag-scroll-top-inner');
  var tbl=document.getElementById('ag-tbl');
  if(scrollMain&&scrollTop&&scrollTopInner&&tbl){
    scrollTopInner.style.width=tbl.scrollWidth+'px';
    var syncing=false;
    scrollTop.onscroll=function(){if(!syncing){syncing=true;scrollMain.scrollLeft=scrollTop.scrollLeft;syncing=false;}};
    scrollMain.onscroll=function(){if(!syncing){syncing=true;scrollTop.scrollLeft=scrollMain.scrollLeft;syncing=false;}};
  }
  // Ações
  pc().addEventListener('click',function(e){
    var btn=e.target.closest('button');if(!btn)return;
    var idx=parseInt(btn.dataset.idx);var a=AGS.data[idx];
    if(btn.classList.contains('ag-ficha'))agFichaModal(a);
    else if(btn.classList.contains('ag-ed'))agEditModal(a);
    else if(btn.classList.contains('ag-sen'))agSenhaModal(a);
    else if(btn.classList.contains('ag-rst'))agReset(a);
  });
}

// Permissions grid builder
var MODULOS_PERM=[
  {id:'armaria',label:'Armaria',opts:['gestor','usuario','bloqueado']},
  {id:'almoxarifado',label:'Almoxarifado',opts:['gestor','usuario','bloqueado']},
  {id:'frota',label:'Frota',opts:['gestor','usuario','bloqueado']},
  {id:'supervisao',label:'Supervisao',opts:['gestor','bloqueado']}
];
function permGrid(permObj,prefix){
  var html='<div style="margin-top:14px"><div class="sec">PERMISSOES POR MODULO</div>';
  html+='<div class="info">Apenas para perfil "Restrito". Gestor Geral e Admin ignoram esta configuracao.</div>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px" id="'+prefix+'-pgrid">';
  MODULOS_PERM.forEach(function(m){
    var cur=(permObj||{})[m.id]||'bloqueado';
    html+='<div style="border:1px solid #e5e7eb;border-radius:8px;padding:10px">';
    html+='<div style="font-weight:600;font-size:12px;margin-bottom:8px;color:#1A3A5C">'+m.label+'</div>';
    html+='<div style="display:flex;gap:6px">';
    m.opts.forEach(function(opt){
      var colors={gestor:'#1A3A5C',usuario:'#2E75B6',bloqueado:'#6b7280'};
      var labels={gestor:'Gestor',usuario:'Usuario',bloqueado:'Bloqueado'};
      html+='<label style="display:flex;align-items:center;gap:4px;cursor:pointer;padding:4px 8px;border-radius:6px;border:1px solid '+(cur===opt?colors[opt]:'#e5e7eb')+';background:'+(cur===opt?colors[opt]+'22':'#fff')+';font-size:11px">'+
        '<input type="radio" name="'+prefix+'-'+m.id+'" value="'+opt+'"'+(cur===opt?' checked':'')+' style="width:auto"/> '+labels[opt]+'</label>';
    });
    html+='</div></div>';
  });
  html+='</div></div>';
  return html;
}
function getPermFromGrid(prefix){
  var perm={};
  MODULOS_PERM.forEach(function(m){
    var radios=document.querySelectorAll('input[name="'+prefix+'-'+m.id+'"]');
    radios.forEach(function(r){if(r.checked)perm[m.id]=r.value;});
  });
  return perm;
}
function togglePermGrid(prefix,perfil){
  var g=document.getElementById(prefix+'-pgrid');
  if(!g)return;
  var parent=g.parentElement;
  if(parent)parent.style.display=(perfil==='restrito'?'':'none');
}

function agNovoModal(){
  var body=agFormBody('an',null);
  body+='<div class="info" style="margin-top:12px">Senha inicial: <b id="an-h">[funcional]@Gcm</b></div>';
  var footer='<button class="btn" id="an-c">Cancelar</button><button class="btn btn-p" id="an-ok">Cadastrar</button>';
  openModal('an','Novo Agente','xl',body,footer);
  document.getElementById('an-tbr').addEventListener('click',function(e){var btn=e.target.closest('.ag-tb');if(btn)agTabSwitch('an',parseInt(btn.dataset.tab));});
  var anf=document.getElementById('an-f');
  if(anf)anf.oninput=function(){var h=document.getElementById('an-h');if(h)h.textContent=this.value+'@Gcm';};
  var anp=document.getElementById('an-p');
  if(anp){anp.onchange=function(){togglePermGrid('agp-an',this.value);};togglePermGrid('agp-an',anp.value);}
  var ansc=document.getElementById('an-nasc');
  if(ansc)ansc.onchange=function(){var id=document.getElementById('an-idade');if(id)id.value=calcIdade(this.value);};
  agBindFile('an');
  document.getElementById('an-c').onclick=function(){closeModal('an');};
  document.getElementById('an-ok').onclick=function(){
    var d=agGetData('an');
    if(!d.nome||!d.funcional||!d.setor){toast('Nome, funcional e setor sao obrigatorios','er');return;}
    var arqInp=document.getElementById('an-arq');
    if(arqInp&&arqInp.dataset.b64){d.arquivo_b64=arqInp.dataset.b64;d.arquivo_nome=arqInp.dataset.nome;}
    api.post('/api/agentes',d).then(function(r){toast(r.message||'Agente criado!');closeModal('an');loadAgentes();}).catch(function(e){toast(e.message,'er');});
  };
}
function agEditModal(a){
  var pAtual={};try{pAtual=typeof a.permissoes==='object'?a.permissoes:JSON.parse(a.permissoes_json||'{}');}catch{}
  var aCopy=Object.assign({},a,{permissoes:pAtual});
  var body=agFormBody('ae',aCopy);
  var footer='<button class="btn" id="ae-c">Cancelar</button><button class="btn btn-p" id="ae-ok">Salvar</button>';
  openModal('ae','Editar — '+esc(a.nome),'xl',body,footer);
  document.getElementById('ae-tbr').addEventListener('click',function(e){var btn=e.target.closest('.ag-tb');if(btn)agTabSwitch('ae',parseInt(btn.dataset.tab));});
  var aep=document.getElementById('ae-p');
  if(aep){aep.onchange=function(){togglePermGrid('agp-ae',this.value);};setTimeout(function(){togglePermGrid('agp-ae',aep.value);},50);}
  var aesc=document.getElementById('ae-nasc');
  if(aesc)aesc.onchange=function(){var id=document.getElementById('ae-idade');if(id)id.value=calcIdade(this.value);};
  agBindFile('ae');
  document.getElementById('ae-c').onclick=function(){closeModal('ae');};
  document.getElementById('ae-ok').onclick=function(){
    var d=agGetData('ae');
    if(!d.nome||!d.setor){toast('Nome e setor sao obrigatorios','er');return;}
    var arqInp=document.getElementById('ae-arq');
    if(arqInp&&arqInp.dataset.b64){d.arquivo_b64=arqInp.dataset.b64;d.arquivo_nome=arqInp.dataset.nome;}
    api.put('/api/agentes/'+a.id,d).then(function(){toast('Atualizado!');closeModal('ae');loadAgentes();}).catch(function(e){toast(e.message,'er');});
  };
}
function agSenhaModal(a){
  var body=field('Nova senha (min. 6 caracteres)','<input type="password" id="as-s"/>')+'<div class="warn" style="margin-top:10px">Para resetar para senha padrao ('+esc(a.funcional)+'@Gcm), use o botao Reset.</div>';
  var footer='<button class="btn" id="as-c">Cancelar</button><button class="btn btn-p" id="as-ok">Alterar</button>';
  openModal('as','Alterar Senha - '+a.nome,'sm',body,footer);
  document.getElementById('as-c').onclick=function(){closeModal('as');};
  document.getElementById('as-ok').onclick=function(){api.put('/api/agentes/'+a.id+'/senha',{nova_senha:document.getElementById('as-s').value}).then(function(){toast('Senha alterada!');closeModal('as');}).catch(function(e){toast(e.message,'er');});};
}
function agReset(a){api.post('/api/agentes/'+a.id+'/reset-senha',{}).then(function(r){toast(r.message);}).catch(function(e){toast(e.message,'er');});}

function agFichaModal(a){
  openModal('ficha','Carregando ficha...','xl','<div class="spinner"></div>');
  api.get('/api/agentes/'+a.id+'/ficha').then(function(r){
    var d=r.data;
    var ag=d.agente;
    var body='';
    // Header
    var avatarSrc=a.arquivo_b64&&a.arquivo_b64.startsWith('data:image')
      ?'<img src="'+a.arquivo_b64+'" style="width:52px;height:52px;border-radius:50%;object-fit:cover;flex-shrink:0"/>'
      :'<div style="width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:800;flex-shrink:0">'+esc(a.nome.charAt(0))+'</div>';
    body+='<div style="background:linear-gradient(135deg,#1A3A5C,#2E75B6);border-radius:12px;padding:20px;color:#fff;margin-bottom:16px;display:flex;align-items:center;gap:16px">';
    body+=avatarSrc;
    body+='<div style="flex:1"><div style="font-size:18px;font-weight:700">'+esc(a.nome)+'</div>';
    body+='<div style="font-size:12px;opacity:.8">Func: '+esc(a.funcional)+(a.qra?' &bull; QRA: '+esc(a.qra):'')+(a.numero?' &bull; N: '+esc(a.numero):'')+'</div>';
    body+='<div style="font-size:12px;opacity:.7">'+esc(a.setor)+(a.letra?' &bull; Equipe '+esc(a.letra):'')+(a.subequipe?' &bull; Sub: '+esc(a.subequipe):'')+(a.romu?' &bull; ROMU: '+esc(a.romu):'')+'</div>';
    body+='<div style="margin-top:6px">'+stfBdg(a)+'</div></div>';
    if(a.arquivo_b64&&!a.arquivo_b64.startsWith('data:image')){
      body+='<a href="'+a.arquivo_b64+'" download="'+esc(a.arquivo_nome||'arquivo')+'" style="color:#93c5fd;font-size:12px">Baixar arquivo</a>';
    }
    body+='</div>';
    // Dados pessoais resumo
    var dp=[];
    if(a.nascimento)dp.push({k:'Nascimento',v:fmtDt(a.nascimento)+(a.nascimento?' ('+calcIdade(a.nascimento)+')':'')});
    if(a.sexo)dp.push({k:'Sexo',v:a.sexo==='M'?'Masculino':'Feminino'});
    if(a.sangue)dp.push({k:'Sangue',v:a.sangue});
    if(a.estado_civil)dp.push({k:'Estado civil',v:a.estado_civil});
    if(a.naturalidade)dp.push({k:'Naturalidade',v:a.naturalidade+(a.estado_nascimento?' / '+a.estado_nascimento:'')});
    if(a.destro_canhoto)dp.push({k:'Lateralidade',v:a.destro_canhoto});
    if(a.escolaridade)dp.push({k:'Escolaridade',v:a.escolaridade});
    if(a.contato_servidor)dp.push({k:'Contato',v:a.contato_servidor});
    if(a.email_institucional)dp.push({k:'E-mail inst.',v:a.email_institucional});
    if(a.cpf)dp.push({k:'CPF',v:a.cpf});
    if(a.rg)dp.push({k:'RG',v:a.rg+(a.rg_orgao?' / '+a.rg_orgao:'')+(a.rg_estado?' - '+a.rg_estado:'')});
    if(a.cnh_numero)dp.push({k:'CNH',v:a.cnh_numero+(a.cnh_categoria?' ('+a.cnh_categoria+')':'')+(a.cnh_validade?' val. '+fmtDt(a.cnh_validade):'')});
    if(a.entrada_exercicio)dp.push({k:'Entrada exercicio',v:fmtDt(a.entrada_exercicio)});
    if(a.concurso)dp.push({k:'Concurso',v:a.concurso});
    if(a.pcd==1)dp.push({k:'PCD',v:'Sim'+(a.prazo_readaptacao?' — '+a.prazo_readaptacao:'')});
    if(a.plano_saude)dp.push({k:'Plano de saude',v:a.plano_saude});
    if(a.alergias)dp.push({k:'Alergias',v:a.alergias});
    if(a.condicao_medica)dp.push({k:'Cond. medica',v:a.condicao_medica});
    if(a.rua||a.bairro||a.cidade_residencia)dp.push({k:'Endereco',v:[a.rua,a.bairro,a.cidade_residencia].filter(Boolean).join(', ')});
    if(a.emergencia1_nome)dp.push({k:'Emergencia 1',v:esc(a.emergencia1_nome)+(a.emergencia1_parentesco?' ('+a.emergencia1_parentesco+')':'')+(a.emergencia1_telefone?' — '+a.emergencia1_telefone:'')});
    if(a.emergencia2_nome)dp.push({k:'Emergencia 2',v:esc(a.emergencia2_nome)+(a.emergencia2_parentesco?' ('+a.emergencia2_parentesco+')':'')+(a.emergencia2_telefone?' — '+a.emergencia2_telefone:'')});
    if(a.filiacao)dp.push({k:'Filiacao',v:a.filiacao});
    if(dp.length){
      body+='<div class="sec">DADOS PESSOAIS</div>';
      body+='<div class="card" style="margin-bottom:12px;padding:4px 0">';
      dp.forEach(function(it){
        body+='<div class="ar"><span style="color:#6b7280;font-size:11px">'+it.k+'</span><span style="font-weight:500;text-align:right;max-width:60%">'+esc(it.v)+'</span></div>';
      });
      body+='</div>';
    }

    // Viaturas
    body+='<div class="sec">VIATURAS CAUTELADAS</div>';
    if(!d.viaturas.length){body+='<div style="color:#9ca3af;font-size:13px;padding:8px 0 12px">Nenhuma viatura.</div>';}
    else{
      body+='<div class="card" style="margin-bottom:12px"><div style="overflow-x:auto"><table><thead><tr><th>Prefixo</th><th>Modelo</th><th>KM saida</th><th>Combustivel</th><th>Desde</th></tr></thead><tbody>';
      d.viaturas.forEach(function(v){
        body+='<tr><td><b style="color:#1A3A5C">'+esc(v.prefixo)+'</b></td><td>'+esc((v.marca||'')+' '+(v.modelo||''))+'</td><td>'+Number(v.km_inicial).toLocaleString()+' km</td><td>'+esc(v.nivel_combustivel_inicial||'--')+'</td><td style="font-size:11px;color:#9ca3af">'+fmtTs(v.data_cautela)+'</td></tr>';
      });
      body+='</tbody></table></div></div>';
    }

    // Armamentos
    body+='<div class="sec">ARMAMENTOS CAUTELADOS</div>';
    if(!d.armamentos.length){body+='<div style="color:#9ca3af;font-size:13px;padding:8px 0 12px">Nenhum armamento.</div>';}
    else{
      body+='<div class="card" style="margin-bottom:12px"><div style="overflow-x:auto"><table><thead><tr><th>N Serie</th><th>Tipo</th><th>Calibre</th><th>Status</th></tr></thead><tbody>';
      d.armamentos.forEach(function(a){
        body+='<tr><td style="font-family:monospace;font-size:12px">'+esc(a.numero_serie)+'</td><td>'+esc(a.tipo)+'</td><td>'+esc(a.calibre||'--')+'</td><td>'+saBdg(a.status)+'</td></tr>';
      });
      body+='</tbody></table></div></div>';
    }

    // Almoxarifado
    body+='<div class="sec">ALMOXARIFADO CAUTELADO</div>';
    if(!d.almoxarifado.length){body+='<div style="color:#9ca3af;font-size:13px;padding:8px 0 12px">Nenhum item.</div>';}
    else{
      body+='<div class="card" style="margin-bottom:12px"><div style="overflow-x:auto"><table><thead><tr><th>Patrimonio</th><th>Item</th><th>Categoria</th><th>Cautela</th><th>Prev. devolucao</th></tr></thead><tbody>';
      d.almoxarifado.forEach(function(it){
        body+='<tr><td style="font-family:monospace;font-size:11px">'+esc(it.numero_patrimonio)+'</td><td><b>'+esc(it.nome)+'</b></td><td style="color:#9ca3af">'+esc(it.categoria||'--')+'</td><td style="font-size:11px;color:#9ca3af">'+fmtTs(it.data_cautela)+'</td><td style="font-size:11px;color:'+(it.data_prev_devolucao?'#ca8a04':'#9ca3af')+'">'+fmtDt(it.data_prev_devolucao||'')+'</td></tr>';
      });
      body+='</tbody></table></div></div>';
    }

    // Municoes
    body+='<div class="sec">MUNICOES CAUTELADAS (ULTIMAS)</div>';
    if(!d.municoes.length){body+='<div style="color:#9ca3af;font-size:13px;padding:8px 0 12px">Nenhuma municao.</div>';}
    else{
      body+='<div class="card" style="margin-bottom:12px"><div style="overflow-x:auto"><table><thead><tr><th>Data</th><th>Calibre</th><th>Tipo</th><th>Qtd</th></tr></thead><tbody>';
      d.municoes.forEach(function(m){
        body+='<tr><td style="font-size:11px;color:#9ca3af">'+fmtTs(m.criado_em)+'</td><td><b>'+esc(m.calibre)+'</b></td><td>'+esc(m.tipo_municao)+'</td><td><b>'+m.quantidade+'</b></td></tr>';
      });
      body+='</tbody></table></div></div>';
    }

    // Summary badge
    var total=d.viaturas.length+d.armamentos.length+d.almoxarifado.length;
    body+='<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:12px 16px;font-size:13px;color:#166534;display:flex;justify-content:space-between;align-items:center">';
    body+='<span><b>Total cautelado:</b> '+total+' item(s)</span>';
    body+='<span style="font-size:11px;color:#9ca3af">Atualizado agora</span></div>';

    // Update modal
    var mb=document.getElementById('modal-ficha');
    if(mb){
      mb.querySelector('.modal-t').textContent='Ficha: '+ag.nome;
      mb.querySelector('.modal-b').innerHTML=body;
    }
  }).catch(function(e){
    var mb=document.getElementById('modal-ficha');
    if(mb){
      mb.querySelector('.modal-t').textContent='Erro';
      mb.querySelector('.modal-b').innerHTML='<div class="empty">Erro ao carregar ficha: '+esc(e.message)+'</div>';
    }
  });
}

// =====================================================================
// ALMOXARIFADO
// =====================================================================
var ALM={itens:[],ags:[],flt:{busca:'',setor:'',validade:''},pag:0};
function pgAlmox(){
  pc().innerHTML='<div style="color:#9ca3af;padding:20px">Carregando...</div>';
  Promise.all([api.get('/api/almoxarifado'),api.get('/api/agentes?ativo=true')]).then(function(rs){ALM.itens=rs[0].data;ALM.ags=rs[1].data;renderAlmox();}).catch(function(e){toast(e.message,'er');});
}
function validadeBdg(dv){
  if(!dv)return '';
  var hoje=new Date();hoje.setHours(0,0,0,0);
  var val=new Date(dv+'T12:00:00');
  var dias=Math.round((val-hoje)/(1000*60*60*24));
  if(dias<0)return ' '+bdg('VENCIDO','red');
  if(dias<=30)return ' '+bdg('Vence em '+dias+'d','yellow');
  return '';
}
function renderAlmox(){
  var hoje=new Date();hoje.setHours(0,0,0,0);
  var filtered=ALM.itens.filter(function(i){
    var ok=true;
    if(ALM.flt.busca&&(i.nome+(i.numero_patrimonio||'')+(i.codigo||'')).toLowerCase().indexOf(ALM.flt.busca.toLowerCase())<0)ok=false;
    if(ALM.flt.setor&&i.setor_atual!==ALM.flt.setor)ok=false;
    if(ALM.flt.validade==='vencido'){if(!i.data_validade||new Date(i.data_validade+'T12:00:00')>=hoje)ok=false;}
    if(ALM.flt.validade==='proximo'){if(!i.data_validade)ok=false;var val=new Date(i.data_validade+'T12:00:00');var dias=Math.round((val-hoje)/(1000*60*60*24));if(dias<0||dias>30)ok=false;}
    return ok;
  });
  // Alertas de validade
  var vencidos=ALM.itens.filter(function(i){return i.data_validade&&new Date(i.data_validade+'T12:00:00')<hoje;}).length;
  var proximos=ALM.itens.filter(function(i){if(!i.data_validade)return false;var val=new Date(i.data_validade+'T12:00:00');var dias=Math.round((val-hoje)/(1000*60*60*24));return dias>=0&&dias<=30;}).length;
  var pg=filtered.slice(ALM.pag*PAG,(ALM.pag+1)*PAG),tp=Math.ceil(filtered.length/PAG);
  var setOpts=[['','Todos os setores']].concat(SETORES.map(function(s){return[s,s];}));
  var valdOpts=[['','Todos'],['vencido','Vencidos'],['proximo','Proximos 30 dias']];
  var html=ph('Almoxarifado',ALM.itens.length+' itens cadastrados',
    (canEdit('almoxarifado')?'<button class="btn btn-p" id="alm-novo">+ Cadastrar item</button> ':'')+
    (canEdit('almoxarifado')?'<button class="btn btn-g" id="alm-entrada">+ Entrada de itens</button> ':'')+
    '<button class="btn" id="alm-rel">Relatorio PDF</button>');
  if(vencidos>0)html+='<div class="warn" style="margin-bottom:12px">'+bdg('Atencao','red')+' '+vencidos+' item(s) com validade VENCIDA no estoque. Verifique o filtro "Vencidos".</div>';
  else if(proximos>0)html+='<div class="warn" style="margin-bottom:12px">'+bdg('Aviso','yellow')+' '+proximos+' item(s) vencendo nos proximos 30 dias.</div>';
  html+='<div class="flt-bar">'+
    '<div class="f1"><label>Buscar</label><input id="alm-busca" placeholder="Nome, patrimonio, codigo..." value="'+esc(ALM.flt.busca)+'"/></div>'+
    '<div class="f1"><label>Setor</label><select id="alm-flt-s">'+selOpts(setOpts,ALM.flt.setor)+'</select></div>'+
    '<div class="f1"><label>Validade</label><select id="alm-flt-v">'+selOpts(valdOpts,ALM.flt.validade)+'</select></div>'+
    '<button class="btn btn-p" id="alm-flt">Filtrar</button>'+
    '<span style="font-size:12px;color:#9ca3af;align-self:center">'+filtered.length+' itens</span></div>';
  html+='<div class="card"><div style="overflow-x:auto"><table><thead><tr><th>Patrimonio</th><th>Nome</th><th>Categoria</th><th>Qtd</th><th>Condicao</th><th>Setor</th><th>Status</th><th>Validade</th><th>Responsavel</th><th>Acoes</th></tr></thead><tbody>';
  if(!pg.length){html+='<tr><td colspan="10"><div class="empty">Nenhum item.</div></td></tr>';}
  else{
    pg.forEach(function(it){
      var idx=ALM.itens.indexOf(it);
      var valdHtml=it.data_validade?(fmtDt(it.data_validade)+validadeBdg(it.data_validade)):'<span style="color:#9ca3af">--</span>';
      html+='<tr>'+
        '<td style="font-family:monospace;font-size:11px">'+esc(it.numero_patrimonio)+'</td>'+
        '<td><b>'+esc(it.nome)+'</b><div style="font-size:10px;color:#9ca3af">'+esc(it.codigo||'')+'</div></td>'+
        '<td style="color:#9ca3af">'+esc(it.categoria||'--')+'</td>'+
        '<td><b>'+(it.quantidade||1)+'</b></td>'+
        '<td>'+condBdg(it.condicao)+'</td>'+
        '<td>'+bdg(it.setor_atual,'blue')+'</td>'+
        '<td>'+siBdg(it.status)+'</td>'+
        '<td style="font-size:12px">'+valdHtml+'</td>'+
        '<td style="font-size:12px">'+(it.status==='cautelado'&&it.responsavel_nome?'<b style="color:#1A3A5C">'+esc(it.responsavel_nome)+'</b>':'<span style="color:#9ca3af">--</span>')+'</td>'+
        '<td><div style="display:flex;gap:4px;flex-wrap:wrap">'+
          '<button class="btn btn-sm alm-hist" data-idx="'+idx+'">Historico</button>'+
          (canEdit('almoxarifado')?
            ' <button class="btn btn-sm alm-ed" data-idx="'+idx+'">Editar</button>'+
            ' <button class="btn btn-sm btn-y alm-mv" data-idx="'+idx+'">Movimentar</button>'
          :'')+
        '</div></td>'+
      '</tr>';
    });
  }
  html+='</tbody></table></div>'+(tp>1?'<div class="pag"><button class="btn btn-sm" id="alm-prev"'+(ALM.pag===0?' disabled':'')+'>Anterior</button><span>Pag '+(ALM.pag+1)+' de '+tp+'</span><button class="btn btn-sm" id="alm-next"'+(ALM.pag===tp-1?' disabled':'')+'>Proxima</button></div>':'')+' </div>';
  pc().innerHTML=html;
  if(canEdit('almoxarifado')){
    var nb=document.getElementById('alm-novo');if(nb)nb.onclick=almNovoModal;
    var eb=document.getElementById('alm-entrada');if(eb)eb.onclick=almEntradaModal;
  }
  var fb=document.getElementById('alm-flt');if(fb)fb.onclick=function(){ALM.flt.busca=document.getElementById('alm-busca').value;ALM.flt.setor=document.getElementById('alm-flt-s').value;ALM.flt.validade=document.getElementById('alm-flt-v').value;ALM.pag=0;renderAlmox();};
  var rb=document.getElementById('alm-rel');if(rb)rb.onclick=almRelatorio;
  var prev=document.getElementById('alm-prev');if(prev)prev.onclick=function(){ALM.pag=Math.max(0,ALM.pag-1);renderAlmox();};
  var next=document.getElementById('alm-next');if(next)next.onclick=function(){ALM.pag++;renderAlmox();};
  pc().addEventListener('click',function(e){var btn=e.target.closest('button');if(!btn)return;var idx=parseInt(btn.dataset.idx);var it=ALM.itens[idx];if(btn.classList.contains('alm-hist'))almHistoricoModal(it);else if(btn.classList.contains('alm-ed'))almEditModal(it);else if(btn.classList.contains('alm-mv'))almMovModal(it);});
}
function almNovoModal(){
  var setOpts=SETORES.map(function(s){return[s,s];});
  var body='<div class="fg">'+
    field('Nome','<input id="alno-n"/>',true)+
    field('N patrimonio','<input id="alno-p"/>')+
    field('Codigo interno','<input id="alno-c" placeholder="Opcional"/>')+
    field('Categoria','<input id="alno-ct" placeholder="Ex: EPI, Eletronico"/>')+
    field('Quantidade','<input type="number" id="alno-q" min="1" value="1"/>')+
    field('Setor','<select id="alno-s"><option value="">Selecione</option>'+selOpts(setOpts,'')+'</select>')+
    field('Condicao','<select id="alno-cd">'+selOpts([['otimo','Otimo'],['bom','Bom'],['regular','Regular'],['ruim','Ruim'],['inoperante','Inoperante']],'bom')+'</select>')+
    field('Data de validade','<input type="date" id="alno-val" placeholder="Opcional"/>')+
    field('Observacoes','<textarea id="alno-o"></textarea>',true)+
  '</div>';
  var footer='<button class="btn" id="alno-cancel">Cancelar</button><button class="btn btn-p" id="alno-ok">Cadastrar</button>';
  openModal('alm','Cadastrar Item','lg',body,footer);
  document.getElementById('alno-cancel').onclick=function(){closeModal('alm');};
  document.getElementById('alno-ok').onclick=function(){api.post('/api/almoxarifado',{nome:document.getElementById('alno-n').value,numero_patrimonio:document.getElementById('alno-p').value,codigo:document.getElementById('alno-c').value,categoria:document.getElementById('alno-ct').value,quantidade:parseInt(document.getElementById('alno-q').value)||1,setor_atual:document.getElementById('alno-s').value,condicao:document.getElementById('alno-cd').value,data_validade:document.getElementById('alno-val').value||null,observacoes:document.getElementById('alno-o').value}).then(function(){toast('Item cadastrado!');closeModal('alm');pgAlmox();}).catch(function(e){toast(e.message,'er');});};
}
function almEditModal(it){
  var setOpts=SETORES.map(function(s){return[s,s];});
  var body='<div class="fg">'+
    field('Nome','<input id="ale-n" value="'+esc(it.nome)+'"/>',true)+
    field('Codigo','<input id="ale-c" value="'+esc(it.codigo||'')+'"/>')+
    field('Categoria','<input id="ale-ct" value="'+esc(it.categoria||'')+'"/>')+
    field('Quantidade','<input type="number" id="ale-q" min="1" value="'+(it.quantidade||1)+'"/>')+
    field('Setor','<select id="ale-s">'+selOpts(setOpts,it.setor_atual)+'</select>')+
    field('Condicao','<select id="ale-cd">'+selOpts([['otimo','Otimo'],['bom','Bom'],['regular','Regular'],['ruim','Ruim'],['inoperante','Inoperante']],it.condicao)+'</select>')+
    field('Data de validade','<input type="date" id="ale-val" value="'+esc(it.data_validade||'')+'"/>')+
    field('Observacoes','<textarea id="ale-o">'+esc(it.observacoes||'')+'</textarea>',true)+
  '</div>';
  var footer='<button class="btn" id="ale-c">Cancelar</button><button class="btn btn-p" id="ale-ok">Salvar</button>';
  openModal('ale','Editar - '+it.nome,'lg',body,footer);
  document.getElementById('ale-c').onclick=function(){closeModal('ale');};
  document.getElementById('ale-ok').onclick=function(){api.put('/api/almoxarifado/'+it.id,{nome:document.getElementById('ale-n').value,codigo:document.getElementById('ale-c').value,categoria:document.getElementById('ale-ct').value,quantidade:parseInt(document.getElementById('ale-q').value)||1,setor_atual:document.getElementById('ale-s').value,condicao:document.getElementById('ale-cd').value,data_validade:document.getElementById('ale-val').value||null,observacoes:document.getElementById('ale-o').value}).then(function(){toast('Atualizado!');closeModal('ale');pgAlmox();}).catch(function(e){toast(e.message,'er');});};
}
// -- Historico de movimentacoes de um item
function almHistoricoModal(it){
  openModal('almh','Historico - '+it.nome,'xl','<div style="color:#9ca3af;padding:20px">Carregando...</div>');
  api.get('/api/almoxarifado/'+it.id+'/historico').then(function(r){
    var rows=r.data;
    var tipoLabels={cautela:'Cautela',devolucao:'Devolucao',transferencia:'Transferencia',baixa:'Baixa',entrada:'Entrada'};
    var tipoColors={cautela:'blue',devolucao:'green',transferencia:'purple',baixa:'gray',entrada:'green'};
    var body=rows.length===0?'<div class="empty">Nenhuma movimentacao registrada para este item.</div>':
      tableHtml(['Data','Tipo','Qtd Entrada','Motivo','De','Para','Agente','Observacoes','Gestor'],rows.map(function(m){
        var isEntrada=m.tipo==='entrada';
        return '<tr'+(isEntrada?' style="background:#f0fdf4"':'')+'>'+
          '<td style="font-size:11px;color:#9ca3af">'+fmtTs(m.criado_em)+'</td>'+
          '<td>'+bdg(tipoLabels[m.tipo]||m.tipo,tipoColors[m.tipo]||'gray')+'</td>'+
          '<td style="font-weight:700;color:'+(isEntrada?'#16a34a':'#9ca3af')+'">'+(m.quantidade?'+'+m.quantidade:'--')+'</td>'+
          '<td style="font-size:11px">'+esc(m.motivo||'--')+'</td>'+
          '<td style="font-size:11px">'+esc(m.de_setor||'--')+'</td>'+
          '<td style="font-size:11px">'+esc(m.para_setor||'--')+'</td>'+
          '<td>'+esc(m.agente_nome||'--')+'</td>'+
          '<td style="font-size:11px;max-width:200px">'+esc(m.observacoes||'--')+'</td>'+
          '<td style="color:#9ca3af;font-size:11px">'+esc(m.gestor_nome||'--')+'</td>'+
        '</tr>';
      }));
    var mb=document.getElementById('modal-almh');
    if(mb){
      mb.querySelector('.modal-t').textContent='Historico: '+it.nome+' ('+it.numero_patrimonio+')';
      mb.querySelector('.modal-b').innerHTML=body;
    }
  }).catch(function(e){toast(e.message,'er');});
}

// -- Entrada de itens (Compra, Doacao, Transferencia)
function almEntradaModal(){
  var iOpts=ALM.itens.map(function(i){return[i.id,'['+i.numero_patrimonio+'] '+i.nome+' (Saldo: '+(i.quantidade||1)+') - '+i.setor_atual];});
  var setOpts=SETORES.map(function(s){return[s,s];});
  var motivoOpts=[['Compra','Compra (Nota Fiscal)'],['Doacao','Doacao'],['Transferencia','Transferencia entre setores'],['Devolucao','Devolucao de agente'],['Outros','Outros']];
  var body='<div class="info">Registre a entrada de itens no estoque. A quantidade informada sera adicionada ao saldo atual do item selecionado.</div>'+
    '<div class="fg">'+
    field('Item','<select id="ae-item"><option value="">Selecione o item</option>'+selOpts(iOpts,'')+'</select>',true)+
    '<div class="f1"><label>Saldo atual</label><input id="ae-saldo" readonly style="background:#f3f4f6;color:#6b7280" value="--"/></div>'+
    field('Quantidade a entrar','<input type="number" id="ae-qtd" min="1" value="1"/>')+
    field('Motivo da entrada','<select id="ae-motivo">'+selOpts(motivoOpts,'Compra')+'</select>')+
    field('Documento de referencia','<input id="ae-doc" placeholder="Ex: NF 001/2025, Portaria 001..."/>')+
    field('Setor de destino','<select id="ae-setor"><option value="">Mesmo setor do item</option>'+selOpts(setOpts,'')+'</select>')+
    field('Observacoes','<textarea id="ae-obs" placeholder="Detalhes da entrada, fornecedor, etc."></textarea>',true)+
  '</div>';
  var footer='<button class="btn" id="ae-c">Cancelar</button><button class="btn btn-g" id="ae-ok">Registrar Entrada</button>';
  openModal('aent','Registrar Entrada de Item','lg',body,footer);
  document.getElementById('ae-c').onclick=function(){closeModal('aent');};
  // Atualiza saldo ao selecionar item
  document.getElementById('ae-item').onchange=function(){
    var selId=parseInt(this.value);
    var it=ALM.itens.find(function(x){return x.id===selId;});
    var saldoEl=document.getElementById('ae-saldo');
    if(saldoEl)saldoEl.value=it?(it.quantidade||1)+' unidades':'--';
  };
  document.getElementById('ae-ok').onclick=function(){
    var itemId=document.getElementById('ae-item').value;
    var qtd=parseInt(document.getElementById('ae-qtd').value)||0;
    if(!itemId){toast('Selecione o item','er');return;}
    if(qtd<1){toast('Informe uma quantidade valida','er');return;}
    var motivo=document.getElementById('ae-motivo').value;
    var doc=document.getElementById('ae-doc').value;
    var obs=document.getElementById('ae-obs').value;
    api.post('/api/almoxarifado/movimentar',{
      item_id:parseInt(itemId),
      tipo:'entrada',
      quantidade:qtd,
      motivo:motivo,
      para_setor:document.getElementById('ae-setor').value||undefined,
      observacoes:(doc?'Doc: '+doc+(obs?' | ':'')+obs:obs)||undefined
    }).then(function(r){
      toast('Entrada registrada! Novo saldo: '+(r.saldo_atual||'--')+' unidades');
      closeModal('aent');
      pgAlmox();
    }).catch(function(e){toast(e.message,'er');});
  };
}

// -- Movimentar item
function almMovModal(it){
  var setOpts=SETORES.map(function(s){return[s,s];});
  var agsOpts=ALM.ags.map(function(a){return[a.id,a.nome+' ('+a.funcional+')'];});
  var tipoOpts=[['cautela','Cautela para Agente'],['devolucao','Devolucao'],['transferencia','Transferencia de setor'],['baixa','Baixa patrimonial']];
  var body='<div class="fg">'+
    field('Tipo de movimentacao','<select id="amv-t"><option value="">Selecione</option>'+selOpts(tipoOpts,'')+'</select>',true)+
    field('Agente responsavel','<select id="amv-a"><option value="">Nenhum</option>'+selOpts(agsOpts,'')+'</select>')+
    field('Setor destino','<select id="amv-s"><option value="">Mesmo setor</option>'+selOpts(setOpts,'')+'</select>')+
    field('Prev. devolucao','<input type="date" id="amv-dt"/>')+
    field('Observacoes','<textarea id="amv-o"></textarea>',true)+
  '</div>';
  var footer='<button class="btn" id="amv-c">Cancelar</button><button class="btn btn-p" id="amv-ok">Confirmar</button>';
  openModal('amv','Movimentar - '+it.nome,'md',body,footer);
  document.getElementById('amv-c').onclick=function(){closeModal('amv');};
  document.getElementById('amv-ok').onclick=function(){
    var tipo=document.getElementById('amv-t').value;
    if(!tipo){toast('Selecione o tipo','er');return;}
    api.post('/api/almoxarifado/movimentar',{
      item_id:it.id,
      tipo:tipo,
      para_setor:document.getElementById('amv-s').value||undefined,
      agente_id:document.getElementById('amv-a').value||undefined,
      observacoes:document.getElementById('amv-o').value||undefined,
      data_prev_devolucao:document.getElementById('amv-dt').value||undefined
    }).then(function(){toast('Movimentado!');closeModal('amv');pgAlmox();}).catch(function(e){toast(e.message,'er');});
  };
}

// -- Relatorio PDF do almoxarifado
function almRelatorio(){
  var setOpts2=[['','Todos os setores']].concat(SETORES.map(function(s){return[s,s];}));
  var catDisp=[...new Set(ALM.itens.map(function(i){return i.categoria;}).filter(Boolean))].sort();
  var catOpts=[['','Todas as categorias']].concat(catDisp.map(function(c){return[c,c];}));
  var statusOpts2=[['','Todos'],['ativo','Ativo'],['cautelado','Cautelado'],['baixado','Baixado']];
  var body='<div class="info">Filtros aplicados ao relatorio PDF que sera gerado.</div>'+
    '<div class="fg">'+
    field('Tipo de relatorio','<select id="ar-tipo"><option value="completo">Relatorio Completo</option><option value="por_setor">Por Setor</option><option value="cautelados">Apenas Cautelados</option><option value="validade">Controle de Validade</option><option value="baixados">Baixados</option></select>',true)+
    field('Filtrar por setor','<select id="ar-setor">'+selOpts(setOpts2,'')+'</select>')+
    field('Filtrar por categoria','<select id="ar-cat">'+selOpts(catOpts,'')+'</select>')+
    field('Filtrar por status','<select id="ar-st">'+selOpts(statusOpts2,'')+'</select>')+
  '</div>';
  var footer='<button class="btn" id="ar-c">Cancelar</button><button class="btn btn-p" id="ar-ok">Gerar PDF</button>';
  openModal('arel','Relatorio Almoxarifado','md',body,footer);
  document.getElementById('ar-c').onclick=function(){closeModal('arel');};
  document.getElementById('ar-ok').onclick=function(){
    var tipo=document.getElementById('ar-tipo').value;
    var setor=document.getElementById('ar-setor').value;
    var cat=document.getElementById('ar-cat').value;
    var st=document.getElementById('ar-st').value;
    closeModal('arel');
    var itFlt=ALM.itens.filter(function(i){
      if(setor&&i.setor_atual!==setor)return false;
      if(cat&&i.categoria!==cat)return false;
      if(st&&i.status!==st)return false;
      if(tipo==='cautelados'&&i.status!=='cautelado')return false;
      if(tipo==='baixados'&&i.status!=='baixado')return false;
      if(tipo==='validade'&&!i.data_validade)return false;
      return true;
    });
    var hoje=new Date();hoje.setHours(0,0,0,0);
    var tituloMap={completo:'Relatorio Completo',por_setor:'Por Setor',cautelados:'Cautelados',validade:'Controle de Validade',baixados:'Baixados'};
    var groupedSetores={};
    itFlt.forEach(function(i){if(!groupedSetores[i.setor_atual])groupedSetores[i.setor_atual]=[];groupedSetores[i.setor_atual].push(i);});
    var rowsHtml='';
    if(tipo==='por_setor'){
      Object.keys(groupedSetores).sort().forEach(function(s){
        rowsHtml+='<tr><td colspan="8" style="background:#1A3A5C;color:#fff;font-weight:700;padding:8px 10px">'+s+' ('+groupedSetores[s].length+' itens)</td></tr>';
        groupedSetores[s].forEach(function(i){
          var dias=i.data_validade?Math.round((new Date(i.data_validade+'T12:00:00')-hoje)/(1000*60*60*24)):null;
          var valdCor=dias===null?'':dias<0?'color:#dc2626;font-weight:700':dias<=30?'color:#ca8a04;font-weight:700':'';
          rowsHtml+='<tr><td>'+i.numero_patrimonio+'</td><td>'+i.nome+'</td><td>'+esc(i.categoria||'--')+'</td><td>'+i.quantidade+'</td><td>'+i.condicao+'</td><td>'+i.status+'</td><td style="'+valdCor+'">'+(i.data_validade?fmtDt(i.data_validade):'--')+'</td><td>'+esc(i.responsavel_nome||'--')+'</td></tr>';
        });
      });
    } else {
      itFlt.forEach(function(i){
        var dias=i.data_validade?Math.round((new Date(i.data_validade+'T12:00:00')-hoje)/(1000*60*60*24)):null;
        var valdCor=dias===null?'':dias<0?'color:#dc2626;font-weight:700':dias<=30?'color:#ca8a04;font-weight:700':'';
        rowsHtml+='<tr><td>'+i.numero_patrimonio+'</td><td>'+i.nome+'</td><td>'+esc(i.categoria||'--')+'</td><td>'+i.setor_atual+'</td><td>'+i.quantidade+'</td><td>'+i.condicao+'</td><td>'+i.status+'</td><td style="'+valdCor+'">'+(i.data_validade?fmtDt(i.data_validade)+(dias!==null&&dias<0?' VENCIDO':dias!==null&&dias<=30?' ('+dias+'d)':''):'--')+'</td><td>'+esc(i.responsavel_nome||'--')+'</td></tr>';
      });
    }
    var totAtivo=itFlt.filter(function(i){return i.status==='ativo';}).length;
    var totCaut=itFlt.filter(function(i){return i.status==='cautelado';}).length;
    var totVenc=itFlt.filter(function(i){return i.data_validade&&new Date(i.data_validade+'T12:00:00')<hoje;}).length;
    var html='<!DOCTYPE html><html><head><meta charset="UTF-8"><style>'+
      'body{font-family:Arial,sans-serif;font-size:12px;padding:15mm}'+
      '.hdr{text-align:center;border-bottom:2px solid #1A3A5C;padding-bottom:10px;margin-bottom:14px}'+
      '.titulo{font-size:18px;font-weight:700;letter-spacing:1px;color:#1A3A5C}'+
      '.sub{font-size:11px;color:#666;margin-top:3px}'+
      '.sumario{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px}'+
      '.sum-card{border:1px solid #e5e7eb;border-radius:6px;padding:10px;text-align:center}'+
      '.sum-val{font-size:22px;font-weight:700;color:#1A3A5C}'+
      '.sum-lbl{font-size:10px;color:#6b7280;text-transform:uppercase}'+
      'h2{font-size:13px;color:#1A3A5C;border-left:4px solid #1A3A5C;padding-left:8px;margin:14px 0 8px}'+
      'table{width:100%;border-collapse:collapse;margin-bottom:16px}'+
      'th{background:#1A3A5C;color:#fff;padding:7px 10px;text-align:left;font-size:11px}'+
      'td{padding:6px 10px;border-bottom:1px solid #e5e7eb;font-size:11px}'+
      'tr:nth-child(even) td{background:#f9fafb}'+
      '@media print{body{padding:10mm}}'+
    '</style></head><body>'+
    '<div class="hdr"><div class="titulo">GUARDA MUNICIPAL DA SERRA</div><div class="sub">ALMOXARIFADO | '+tituloMap[tipo].toUpperCase()+' | '+new Date().toLocaleString('pt-BR')+'</div></div>'+
    '<div class="sumario">'+
      '<div class="sum-card"><div class="sum-val">'+itFlt.length+'</div><div class="sum-lbl">Total de itens</div></div>'+
      '<div class="sum-card"><div class="sum-val" style="color:#16a34a">'+totAtivo+'</div><div class="sum-lbl">Ativos</div></div>'+
      '<div class="sum-card"><div class="sum-val" style="color:#2E75B6">'+totCaut+'</div><div class="sum-lbl">Cautelados</div></div>'+
      '<div class="sum-card"><div class="sum-val" style="color:'+(totVenc>0?'#dc2626':'#9ca3af')+'">'+totVenc+'</div><div class="sum-lbl">Vencidos</div></div>'+
    '</div>'+
    '<h2>Itens</h2>'+
    '<table><thead><tr>'+
      (tipo==='por_setor'
        ?'<th>Patrimonio</th><th>Nome</th><th>Categoria</th><th>Qtd</th><th>Condicao</th><th>Status</th><th>Validade</th><th>Responsavel</th>'
        :'<th>Patrimonio</th><th>Nome</th><th>Categoria</th><th>Setor</th><th>Qtd</th><th>Condicao</th><th>Status</th><th>Validade</th><th>Responsavel</th>')+
    '</tr></thead><tbody>'+rowsHtml+'</tbody></table>'+
    '</body></html>';
    pdfFromHtml(html,'almoxarifado_relatorio');
    toast('Relatorio gerado!');
  };
}

// =====================================================================
// FROTA
// =====================================================================
var FRT={vt:[],ags:[],ck:{},flt:{status:'',setor:''},pag:0};
function pgFrota(){
  pc().innerHTML='<div style="color:#9ca3af;padding:20px">Carregando...</div>';
  Promise.all([api.get('/api/frota/viaturas'),api.get('/api/agentes?ativo=true')]).then(function(rs){FRT.vt=rs[0].data;FRT.ags=rs[1].data;renderFrota();}).catch(function(e){toast(e.message,'er');});
}
function renderFrota(){
  var filtered=FRT.vt.filter(function(v){
    if(FRT.flt.status&&v.status!==FRT.flt.status)return false;
    if(FRT.flt.setor&&v.setor!==FRT.flt.setor)return false;
    return true;
  });
  var pg=filtered.slice(FRT.pag*PAG,(FRT.pag+1)*PAG),tp=Math.ceil(filtered.length/PAG);
  var statusOpts=[['','Todos os status'],['disponivel','Disponivel'],['cautelada','Em servico'],['manutencao','Manutencao'],['baixada','Baixada']];
  var setOpts=[['','Todos os setores']].concat(SETORES.map(function(s){return[s,s];}));
  var disp=FRT.vt.filter(function(v){return v.status==='disponivel';}).length;
  var caut=FRT.vt.filter(function(v){return v.status==='cautelada';}).length;
  var man=FRT.vt.filter(function(v){return v.status==='manutencao';}).length;
  var alertaKm=FRT.vt.filter(function(v){return v.km_proxima_revisao&&v.km_atual>=v.km_proxima_revisao-1000&&v.status!=='baixada';});
  var html=ph('Gestao de Frota',disp+' disponiveis / '+caut+' em servico / '+man+' manutencao',(canEdit('frota')?'<button class="btn btn-p" id="frt-nova">+ Nova viatura</button> ':'')+' <button class="btn" id="frt-abast" style="background:#f59e0b;color:#fff;border-color:#f59e0b">&#9981; Abastecimentos</button> <button class="btn" id="frt-relatorio">Relatorios</button>');
  if(alertaKm.length>0)html+='<div class="warn" style="margin-bottom:12px">'+bdg('Revisao','red')+' '+alertaKm.length+' viatura(s) com KM proximo ou acima da revisao: '+alertaKm.map(function(v){return '<b>'+esc(v.prefixo)+'</b> ('+Number(v.km_atual).toLocaleString()+'/'+Number(v.km_proxima_revisao).toLocaleString()+' km)';}).join(', ')+'</div>';
  html+='<div class="flt-bar"><div class="f1"><label>Status</label><select id="frt-flt-st">'+selOpts(statusOpts,FRT.flt.status)+'</select></div><div class="f1"><label>Setor</label><select id="frt-flt-se">'+selOpts(setOpts,FRT.flt.setor)+'</select></div><button class="btn btn-p" id="frt-flt">Filtrar</button><span style="font-size:12px;color:#9ca3af;align-self:center">'+filtered.length+' viaturas</span></div>';
  html+='<div class="card"><div style="overflow-x:auto"><table><thead><tr><th>Prefixo</th><th>Placa</th><th>Modelo</th><th>KM</th><th>Status</th><th>Motorista/Obs</th><th>Prox. revisao</th><th>Acoes</th></tr></thead><tbody>'+(pg.length?pg.map(function(v,i){var idx=FRT.vt.indexOf(v);var alerta=v.km_proxima_revisao&&v.km_atual>=v.km_proxima_revisao-1000;return '<tr><td><b style="color:#1A3A5C">'+esc(v.prefixo)+'</b></td><td style="color:#9ca3af">'+esc(v.placa)+'</td><td>'+esc((v.marca||'')+' '+(v.modelo||''))+(v.ano?' <span style="color:#9ca3af">('+v.ano+')</span>':'')+' </td><td>'+Number(v.km_atual).toLocaleString()+' km</td><td>'+svBdg(v.status)+'</td><td style="font-size:12px">'+esc(v.motorista_nome||(v.observacoes||'').substring(0,30)||'--')+'</td><td style="color:'+(alerta?'#dc2626':'')+';font-size:12px">'+(v.km_proxima_revisao?Number(v.km_proxima_revisao).toLocaleString()+' km':'--')+'</td><td><div style="display:flex;gap:4px;flex-wrap:wrap"><button class="btn btn-sm frt-hist" data-idx="'+idx+'">Historico</button>'+(canEdit('frota')?' <button class="btn btn-sm frt-ed" data-idx="'+idx+'">Editar</button>':'')+' '+(v.status==='disponivel'&&canView('frota')?' <button class="btn btn-sm btn-p frt-caut" data-idx="'+idx+'">Cautelar</button>':'')+' '+(v.status==='disponivel'&&canEdit('frota')?' <button class="btn btn-sm btn-d frt-man" data-idx="'+idx+'">Manutencao</button>':'')+' '+(v.status==='cautelada'&&canView('frota')?' <button class="btn btn-sm btn-y frt-desc" data-idx="'+idx+'">Descautela</button>':'')+' '+(v.status==='manutencao'&&canEdit('frota')?' <button class="btn btn-sm btn-g frt-ret" data-idx="'+idx+'">Retorno</button>':'')+' </div></td></tr>';}).join(''):'<tr><td colspan="8"><div class="empty">Nenhuma viatura.</div></td></tr>')+'</tbody></table></div>'+(tp>1?'<div class="pag"><button class="btn btn-sm" id="frt-prev"'+(FRT.pag===0?' disabled':'')+'>Anterior</button><span>Pag '+(FRT.pag+1)+' de '+tp+'</span><button class="btn btn-sm" id="frt-next"'+(FRT.pag===tp-1?' disabled':'')+'>Proxima</button></div>':'')+' </div>';
  pc().innerHTML=html;
  if(canEdit('frota')){var nb=document.getElementById('frt-nova');if(nb)nb.onclick=frtNovaModal;}
  var abBtn=document.getElementById('frt-abast');if(abBtn)abBtn.onclick=frtAbastModal;
  var relBtn=document.getElementById('frt-relatorio');if(relBtn)relBtn.onclick=frtRelatorioModal;
  var fb=document.getElementById('frt-flt');if(fb)fb.onclick=function(){FRT.flt.status=document.getElementById('frt-flt-st').value;FRT.flt.setor=document.getElementById('frt-flt-se').value;FRT.pag=0;renderFrota();};
  var prev=document.getElementById('frt-prev');if(prev)prev.onclick=function(){FRT.pag=Math.max(0,FRT.pag-1);renderFrota();};
  var next=document.getElementById('frt-next');if(next)next.onclick=function(){FRT.pag++;renderFrota();};
  pc().addEventListener('click',function(e){var btn=e.target.closest('button');if(!btn)return;var idx=parseInt(btn.dataset.idx);var v=FRT.vt[idx];if(btn.classList.contains('frt-hist'))frtHistModal(v);else if(btn.classList.contains('frt-ed'))frtEditModal(v);else if(btn.classList.contains('frt-caut'))frtCautelaModal(v);else if(btn.classList.contains('frt-man'))frtManutModal(v);else if(btn.classList.contains('frt-desc'))frtDescautelaModal(v);else if(btn.classList.contains('frt-ret'))frtRetornoModal(v);});
}
function frtCautelaModal(v){
  FRT.ck={};
  var agsOpts=FRT.ags.map(function(a){return[a.id,a.nome];});
  var ckHtml='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px" id="frt-ck">';
  CK_ITEMS.forEach(function(item,i){ckHtml+='<div class="ci" data-ck="'+i+'"><span>[ ]</span> '+esc(item)+'</div>';});
  ckHtml+='</div>';
  var body='<div class="fg" style="margin-bottom:14px">'+field('KM inicial','<input type="number" id="fc-km" value="'+v.km_atual+'"/>')+field('Nivel de combustivel','<select id="fc-nv"><option value="">Selecione</option>'+selOpts(NIVEIS.map(function(n){return[n,n];}),'')+'</select>')+field('Chefe de guarnicao','<select id="fc-ch"><option value="">Opcional</option>'+selOpts(agsOpts,'')+'</select>')+'</div><div class="sec">CHECKLIST DA VIATURA</div>'+ckHtml;
  var footer='<button class="btn" id="fc-c">Cancelar</button><button class="btn btn-p" id="fc-ok">Confirmar cautela</button>';
  openModal('fc','Cautelar - '+v.prefixo,'lg',body,footer);
  document.getElementById('fc-c').onclick=function(){closeModal('fc');};
  document.getElementById('frt-ck').onclick=function(e){var el=e.target.closest('.ci');if(!el)return;var i=parseInt(el.dataset.ck),item=CK_ITEMS[i];FRT.ck[item]=!FRT.ck[item];el.classList.toggle('on',!!FRT.ck[item]);el.querySelector('span').textContent=FRT.ck[item]?'[X]':'[ ]';};
  document.getElementById('fc-ok').onclick=function(){var km=document.getElementById('fc-km').value,nv=document.getElementById('fc-nv').value;if(!km||!nv){toast('Informe KM e nivel de combustivel','er');return;}api.post('/api/frota/cautelas',{viatura_id:v.id,km_inicial:parseInt(km),nivel_combustivel_inicial:nv,checklist_json:FRT.ck,chefe_id:document.getElementById('fc-ch').value||null}).then(function(){toast('Cautela registrada!');closeModal('fc');pgFrota();}).catch(function(e){toast(e.message,'er');});};
}
function frtDescautelaModal(v){
  var body='<div class="fg">'+field('KM final','<input type="number" id="fd-km" value="'+v.km_atual+'"/>')+field('Nivel combustivel final','<select id="fd-nv"><option value="">Selecione</option>'+selOpts(NIVEIS.map(function(n){return[n,n];}),'')+'</select>')+field('Observacoes retorno','<textarea id="fd-obs"></textarea>',true)+'</div>';
  var footer='<button class="btn" id="fd-c">Cancelar</button><button class="btn btn-g" id="fd-ok">Confirmar descautela</button>';
  openModal('fd','Descautela - '+v.prefixo,'md',body,footer);
  document.getElementById('fd-c').onclick=function(){closeModal('fd');};
  document.getElementById('fd-ok').onclick=function(){
    var km=document.getElementById('fd-km').value;
    if(!km){toast('Informe o KM final','er');return;}
    // Find the active cautela ID
    api.get('/api/frota/cautelas/ativas').then(function(r){
      var caut=r.data.find(function(c){return c.viatura_id===v.id;});
      if(!caut){toast('Cautela ativa nao encontrada','er');return;}
      api.put('/api/frota/cautelas/'+caut.id+'/encerrar',{km_final:parseInt(km),nivel_combustivel_final:document.getElementById('fd-nv').value,observacoes_retorno:document.getElementById('fd-obs').value}).then(function(){toast('Descautela registrada!');closeModal('fd');pgFrota();}).catch(function(e){toast(e.message,'er');});
    }).catch(function(e){toast(e.message,'er');});
  };
}
function frtEditModal(v){
  var setOpts=SETORES.map(function(s){return[s,s];});
  var body='<div class="fg">'+field('Prefixo','<input id="fe-px" value="'+esc(v.prefixo)+'"/>')+field('Placa','<input id="fe-pl" value="'+esc(v.placa)+'"/>')+field('Marca','<input id="fe-ma" value="'+esc(v.marca||'')+'"/>')+field('Modelo','<input id="fe-mo" value="'+esc(v.modelo||'')+'"/>')+field('Ano','<input type="number" id="fe-an" value="'+(v.ano||'')+'"/>')+field('Cor','<input id="fe-co" value="'+esc(v.cor||'')+'"/>')+field('Setor','<select id="fe-se">'+selOpts(setOpts,v.setor)+'</select>')+field('Combustivel','<select id="fe-cb">'+selOpts([['Diesel','Diesel'],['Gasolina','Gasolina'],['Etanol','Etanol'],['GNV','GNV']],v.tipo_combustivel)+'</select>')+field('KM prox. revisao','<input type="number" id="fe-rv" value="'+(v.km_proxima_revisao||'')+'"/>')+'</div>';
  var footer='<button class="btn" id="fe-c">Cancelar</button><button class="btn btn-p" id="fe-ok">Salvar</button>';
  openModal('fe','Editar - '+v.prefixo,'lg',body,footer);
  document.getElementById('fe-c').onclick=function(){closeModal('fe');};
  document.getElementById('fe-ok').onclick=function(){api.put('/api/frota/viaturas/'+v.id,{prefixo:document.getElementById('fe-px').value,placa:document.getElementById('fe-pl').value,marca:document.getElementById('fe-ma').value,modelo:document.getElementById('fe-mo').value,ano:document.getElementById('fe-an').value,cor:document.getElementById('fe-co').value,setor:document.getElementById('fe-se').value,tipo_combustivel:document.getElementById('fe-cb').value,km_proxima_revisao:document.getElementById('fe-rv').value}).then(function(){toast('Atualizado!');closeModal('fe');pgFrota();}).catch(function(e){toast(e.message,'er');});};
}
function frtManutModal(v){
  var body='<div class="fg">'+field('Numero da OS','<input id="fm-os" placeholder="Ex: OS-2025-001"/>')+field('Oficina','<input id="fm-of"/>')+field('Data de envio','<input type="date" id="fm-de"/>')+field('Previsao retorno','<input type="date" id="fm-dr"/>')+field('Problema/Servico','<textarea id="fm-ds"></textarea>',true)+'</div>';
  var footer='<button class="btn" id="fm-c">Cancelar</button><button class="btn btn-d" id="fm-ok">Confirmar envio</button>';
  openModal('fm','Manutencao - '+v.prefixo,'md',body,footer);
  document.getElementById('fm-c').onclick=function(){closeModal('fm');};
  document.getElementById('fm-ok').onclick=function(){var os=document.getElementById('fm-os').value,of=document.getElementById('fm-of').value;if(!os||!of){toast('Informe OS e oficina','er');return;}api.post('/api/frota/manutencao',{viatura_id:v.id,numero_os:os,oficina:of,data_envio:document.getElementById('fm-de').value,previsao_retorno:document.getElementById('fm-dr').value,descricao:document.getElementById('fm-ds').value}).then(function(){toast('Enviada para manutencao!');closeModal('fm');pgFrota();}).catch(function(e){toast(e.message,'er');});};
}
function frtRetornoModal(v){
  var body='<div class="fg">'+field('KM ao retornar','<input type="number" id="fr-km"/>')+field('Servicos realizados','<textarea id="fr-ob"></textarea>',true)+'</div>';
  var footer='<button class="btn" id="fr-c">Cancelar</button><button class="btn btn-g" id="fr-ok">Confirmar retorno</button>';
  openModal('fr','Retorno - '+v.prefixo,'md',body,footer);
  document.getElementById('fr-c').onclick=function(){closeModal('fr');};
  document.getElementById('fr-ok').onclick=function(){api.post('/api/frota/retorno/'+v.id,{km_atual:document.getElementById('fr-km').value,observacoes:document.getElementById('fr-ob').value}).then(function(){toast('Viatura disponivel!');closeModal('fr');pgFrota();}).catch(function(e){toast(e.message,'er');});};
}
function frtNovaModal(){
  var setOpts=SETORES.map(function(s){return[s,s];});
  var body='<div class="fg">'+field('Prefixo (Ex: GCM-01)','<input id="fn-px"/>')+field('Placa','<input id="fn-pl"/>')+field('Marca','<input id="fn-ma"/>')+field('Modelo','<input id="fn-mo"/>')+field('Ano','<input type="number" id="fn-an"/>')+field('KM atual','<input type="number" id="fn-km" value="0"/>')+field('Combustivel','<select id="fn-cb">'+selOpts([['Diesel','Diesel'],['Gasolina','Gasolina'],['Etanol','Etanol'],['GNV','GNV']],'Diesel')+'</select>')+field('Setor','<select id="fn-se"><option value="">Selecione</option>'+selOpts(setOpts,'')+'</select>')+field('KM prox. revisao','<input type="number" id="fn-rv"/>')+'</div>';
  var footer='<button class="btn" id="fn-c">Cancelar</button><button class="btn btn-p" id="fn-ok">Cadastrar</button>';
  openModal('fn','Nova Viatura','lg',body,footer);
  document.getElementById('fn-c').onclick=function(){closeModal('fn');};
  document.getElementById('fn-ok').onclick=function(){api.post('/api/frota/viaturas',{prefixo:document.getElementById('fn-px').value,placa:document.getElementById('fn-pl').value,marca:document.getElementById('fn-ma').value,modelo:document.getElementById('fn-mo').value,ano:document.getElementById('fn-an').value,km_atual:document.getElementById('fn-km').value||0,tipo_combustivel:document.getElementById('fn-cb').value,setor:document.getElementById('fn-se').value,km_proxima_revisao:document.getElementById('fn-rv').value}).then(function(){toast('Viatura cadastrada!');closeModal('fn');pgFrota();}).catch(function(e){toast(e.message,'er');});};
}
// ---- ABASTECIMENTOS ----
var ABAST={rel:null,mesAno:'',regData:[],regTotal:0,regPage:0,regBusca:'',regComb:'',regMes:''};
var ABAST_PAG=20;
function frtAbastModal(){
  var mesAtual=new Date().toISOString().substring(0,7);
  ABAST.mesAno=mesAtual;
  var body=
    '<div class="flt-bar" style="margin-bottom:14px">'+
      '<div class="f1"><label>Mês</label><input type="month" id="abp-mes" value="'+mesAtual+'"/></div>'+
      '<button class="btn btn-p" id="abp-buscar">Atualizar</button>'+
      '<button class="btn" style="background:#f59e0b;color:#fff;border-color:#f59e0b" id="abp-novo">+ Registrar</button>'+
      '<button class="btn" style="background:#1A3A5C;color:#fff;border-color:#1A3A5C" id="abp-regs">📋 Ver Registros</button>'+
    '</div>'+
    '<div id="abp-body"><div class="empty">Carregando...</div></div>';
  var footer='<button class="btn" id="abp-fechar">Fechar</button>';
  openModal('abm','⛽ Painel de Abastecimentos','xl',body,footer);
  document.getElementById('abp-fechar').onclick=function(){closeModal('abm');};
  document.getElementById('abp-buscar').onclick=function(){ABAST.mesAno=document.getElementById('abp-mes').value;loadAbastPainel();};
  document.getElementById('abp-novo').onclick=function(){frtRegistrarAbastModal(null);};
  document.getElementById('abp-regs').onclick=function(){ABAST.regMes=ABAST.mesAno;ABAST.regBusca='';ABAST.regComb='';ABAST.regPage=0;frtAbastRegistrosModal();};
  loadAbastPainel();
}

function loadAbastPainel(){
  var el=document.getElementById('abp-body');
  if(el)el.innerHTML='<div class="empty">Carregando...</div>';
  api.get('/api/frota/abastecimentos/relatorio?mes_ano='+ABAST.mesAno).then(function(r){
    ABAST.rel=r;
    renderAbastPainel();
  }).catch(function(e){
    var el=document.getElementById('abp-body');
    if(el)el.innerHTML='<div style="color:#dc2626;padding:12px">'+esc(e.message)+'</div>';
  });
}

function renderAbastPainel(){
  var r=ABAST.rel||{};
  var kpi=r.kpi||{};
  var porMes=r.porMes||[];
  var porViatura=r.porViatura||[];
  var porComb=r.porCombustivel||[];
  var totalGasto=Number(kpi.total_gasto||0);
  var totalLitros=Number(kpi.total_litros||0);
  var consumoMedio=Number(kpi.consumo_medio_geral||0);
  var precoLitro=Number(kpi.preco_medio_litro||0);
  var totalRegs=Number(kpi.total_registros||0);

  // ── KPI cards
  var html='<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px">';
  html+='<div style="background:linear-gradient(135deg,#1A3A5C,#2E75B6);border-radius:10px;padding:14px;color:#fff;text-align:center"><div style="font-size:11px;opacity:.7;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">Total Gasto</div><div style="font-size:20px;font-weight:700">R$ '+totalGasto.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})+'</div><div style="font-size:11px;opacity:.6;margin-top:2px">'+totalRegs+' abastecimentos</div></div>';
  html+='<div style="background:linear-gradient(135deg,#065f46,#059669);border-radius:10px;padding:14px;color:#fff;text-align:center"><div style="font-size:11px;opacity:.7;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">Total Litros</div><div style="font-size:20px;font-weight:700">'+totalLitros.toLocaleString('pt-BR',{minimumFractionDigits:1})+'L</div><div style="font-size:11px;opacity:.6;margin-top:2px">'+(totalLitros&&totalRegs?(totalLitros/totalRegs).toFixed(1)+'L/abast.':'--')+'</div></div>';
  html+='<div style="background:linear-gradient(135deg,#7c3aed,#a855f7);border-radius:10px;padding:14px;color:#fff;text-align:center"><div style="font-size:11px;opacity:.7;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">Consumo Médio</div><div style="font-size:20px;font-weight:700">'+(consumoMedio?consumoMedio.toFixed(2)+' km/L':'--')+'</div><div style="font-size:11px;opacity:.6;margin-top:2px">frota geral</div></div>';
  html+='<div style="background:linear-gradient(135deg,#b45309,#f59e0b);border-radius:10px;padding:14px;color:#fff;text-align:center"><div style="font-size:11px;opacity:.7;text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">Preço Médio/L</div><div style="font-size:20px;font-weight:700">'+(precoLitro?'R$ '+precoLitro.toFixed(3):'--')+'</div><div style="font-size:11px;opacity:.6;margin-top:2px">este mês</div></div>';
  html+='</div>';

  // ── Gráfico de barras mensal
  if(porMes.length){
    var maxGasto=Math.max.apply(null,porMes.map(function(m){return Number(m.gasto||0);}));
    var mesSel=ABAST.mesAno;
    html+='<div class="card" style="margin-bottom:14px"><div class="sec" style="margin-bottom:12px">📊 Gastos Mensais — últimos 12 meses</div>';
    html+='<div style="display:flex;align-items:flex-end;gap:4px;height:90px;padding-bottom:4px">';
    porMes.forEach(function(m){
      var pct=maxGasto?Math.max(4,Math.round((Number(m.gasto)/maxGasto)*90)):4;
      var isAtual=m.mes===mesSel;
      var mesLabel=m.mes?m.mes.substring(5):'??';
      var cor=isAtual?'#1A3A5C':'#f59e0b';
      html+='<div style="display:flex;flex-direction:column;align-items:center;flex:1;min-width:32px" title="'+m.mes+': R$ '+Number(m.gasto).toFixed(2)+'">';
      html+='<div style="font-size:9px;color:#9ca3af;margin-bottom:2px">'+( Number(m.gasto)>=1000?'R$'+Math.round(Number(m.gasto)/1000)+'k':'R$'+Math.round(Number(m.gasto)))+'</div>';
      html+='<div style="width:100%;background:'+cor+';border-radius:4px 4px 0 0;height:'+pct+'px;transition:height .3s"'+(isAtual?' title="Mês selecionado"':'')+'></div>';
      html+='<div style="font-size:9px;color:'+(isAtual?'#1A3A5C':'#6b7280')+';margin-top:3px;font-weight:'+(isAtual?'700':'400')+'">'+mesLabel+'</div>';
      html+='</div>';
    });
    html+='</div></div>';
  }

  // ── Top 5 (lado a lado)
  if(porViatura.length){
    var comConsumo=porViatura.filter(function(v){return v.consumo_medio>0;});
    var top5gasto=porViatura.slice(0,5);
    var top5melhor=comConsumo.slice().sort(function(a,b){return Number(b.consumo_medio)-Number(a.consumo_medio);}).slice(0,5);
    var top5pior=comConsumo.slice().sort(function(a,b){return Number(a.consumo_medio)-Number(b.consumo_medio);}).slice(0,5);

    html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:14px">';

    // Maiores gastos
    html+='<div class="card"><div class="sec" style="margin-bottom:8px;color:#dc2626">💸 Maiores Gastos</div>';
    top5gasto.forEach(function(v,i){
      html+='<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #f3f4f6">';
      html+='<div style="width:22px;height:22px;border-radius:50%;background:#fee2e2;color:#dc2626;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center">'+(i+1)+'</div>';
      html+='<div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:700;color:#1A3A5C;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(v.prefixo)+'</div><div style="font-size:10px;color:#9ca3af">'+esc(v.placa||'')+'</div></div>';
      html+='<div style="font-size:12px;font-weight:700;color:#dc2626">R$ '+Number(v.gasto||0).toFixed(0)+'</div>';
      html+='</div>';
    });
    if(!top5gasto.length)html+='<div class="empty" style="padding:12px 0">Sem dados</div>';
    html+='</div>';

    // Melhor consumo
    html+='<div class="card"><div class="sec" style="margin-bottom:8px;color:#059669">✅ Melhor Consumo</div>';
    top5melhor.forEach(function(v,i){
      html+='<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #f3f4f6">';
      html+='<div style="width:22px;height:22px;border-radius:50%;background:#dcfce7;color:#059669;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center">'+(i+1)+'</div>';
      html+='<div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:700;color:#1A3A5C;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(v.prefixo)+'</div><div style="font-size:10px;color:#9ca3af">'+esc(v.placa||'')+'</div></div>';
      html+='<div style="font-size:12px;font-weight:700;color:#059669">'+Number(v.consumo_medio).toFixed(2)+' km/L</div>';
      html+='</div>';
    });
    if(!top5melhor.length)html+='<div class="empty" style="padding:12px 0">Sem dados</div>';
    html+='</div>';

    // Pior consumo
    html+='<div class="card"><div class="sec" style="margin-bottom:8px;color:#ca8a04">⚠️ Pior Consumo</div>';
    top5pior.forEach(function(v,i){
      html+='<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #f3f4f6">';
      html+='<div style="width:22px;height:22px;border-radius:50%;background:#fef9c3;color:#ca8a04;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center">'+(i+1)+'</div>';
      html+='<div style="flex:1;min-width:0"><div style="font-size:12px;font-weight:700;color:#1A3A5C;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(v.prefixo)+'</div><div style="font-size:10px;color:#9ca3af">'+esc(v.placa||'')+'</div></div>';
      html+='<div style="font-size:12px;font-weight:700;color:#ca8a04">'+Number(v.consumo_medio).toFixed(2)+' km/L</div>';
      html+='</div>';
    });
    if(!top5pior.length)html+='<div class="empty" style="padding:12px 0">Sem dados</div>';
    html+='</div>';

    html+='</div>';
  }

  // ── Combustivel pills
  if(porComb.length){
    var combColors=['#2E75B6','#059669','#f59e0b','#7c3aed'];
    html+='<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:4px">';
    porComb.forEach(function(c,i){
      html+='<div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:20px;padding:6px 14px;display:flex;align-items:center;gap:6px">';
      html+='<div style="width:8px;height:8px;border-radius:50%;background:'+combColors[i%4]+'"></div>';
      html+='<span style="font-size:12px;font-weight:600">'+esc(c.tipo_combustivel)+'</span>';
      html+='<span style="font-size:11px;color:#6b7280">'+Number(c.litros||0).toFixed(0)+'L · R$ '+Number(c.gasto||0).toFixed(0)+'</span>';
      html+='</div>';
    });
    html+='</div>';
  }

  var el=document.getElementById('abp-body');
  if(el){
    el.innerHTML=html;
    // PDF button no painel exporta o mês selecionado
    var pdfBtn=document.getElementById('abp-pdf');
    if(pdfBtn)pdfBtn.onclick=function(){
      abastPdf([],kpi,porViatura,ABAST.mesAno);
    };
  }
}

// ── Tela de Registros (paginada)
function frtAbastRegistrosModal(){
  var combOpts='<option value="">Todos</option><option value="Gasolina">Gasolina</option><option value="Etanol">Etanol</option><option value="Diesel">Diesel</option><option value="GNV">GNV</option>';
  var body=
    '<div class="flt-bar" style="margin-bottom:10px;flex-wrap:wrap;gap:8px">'+
      '<div class="f1"><input id="abr-busca" placeholder="🔍 Prefixo ou placa..." value="'+esc(ABAST.regBusca)+'"/></div>'+
      '<div><label style="font-size:11px;display:block;margin-bottom:2px">Mês</label><input type="month" id="abr-mes" value="'+ABAST.regMes+'"/></div>'+
      '<div><label style="font-size:11px;display:block;margin-bottom:2px">Combustível</label><select id="abr-comb">'+combOpts+'</select></div>'+
      '<button class="btn btn-p" id="abr-filtrar">Filtrar</button>'+
      '<button class="btn" style="background:#f59e0b;color:#fff;border-color:#f59e0b" id="abr-novo">+ Registrar</button>'+
    '</div>'+
    '<div id="abr-body"><div class="empty">Carregando...</div></div>';
  var footer=
    '<button class="btn" id="abr-voltar">← Painel</button>'+
    '<button class="btn" style="background:#1A3A5C;color:#fff" id="abr-pdf">Exportar PDF</button>'+
    '<button class="btn" id="abr-fechar">Fechar</button>';
  openModal('abr','📋 Registros de Abastecimento','xl',body,footer);
  document.getElementById('abr-fechar').onclick=function(){closeModal('abr');};
  document.getElementById('abr-voltar').onclick=function(){closeModal('abr');};
  document.getElementById('abr-novo').onclick=function(){frtRegistrarAbastModal(null);};
  document.getElementById('abr-filtrar').onclick=function(){
    ABAST.regBusca=document.getElementById('abr-busca').value.trim();
    ABAST.regMes=document.getElementById('abr-mes').value;
    ABAST.regComb=document.getElementById('abr-comb').value;
    ABAST.regPage=0;
    loadAbastRegs();
  };
  // busca ao digitar (debounce)
  var busTimer=null;
  document.getElementById('abr-busca').oninput=function(){
    clearTimeout(busTimer);
    var val=this.value;
    busTimer=setTimeout(function(){ABAST.regBusca=val.trim();ABAST.regPage=0;loadAbastRegs();},400);
  };
  document.getElementById('abr-pdf').onclick=function(){abastRegsExportPdf();};
  loadAbastRegs();
}

function loadAbastRegs(){
  var el=document.getElementById('abr-body');
  if(el)el.innerHTML='<div class="empty">Carregando...</div>';
  var q='?limit='+ABAST_PAG+'&offset='+(ABAST.regPage*ABAST_PAG);
  if(ABAST.regMes)   q+='&mes_ano='+ABAST.regMes;
  if(ABAST.regBusca) q+='&busca='+encodeURIComponent(ABAST.regBusca);
  if(ABAST.regComb)  q+='&combustivel='+encodeURIComponent(ABAST.regComb);
  api.get('/api/frota/abastecimentos'+q).then(function(r){
    ABAST.regData=r.data||[];
    ABAST.regTotal=r.total||0;
    renderAbastRegs();
  }).catch(function(e){
    var el=document.getElementById('abr-body');
    if(el)el.innerHTML='<div style="color:#dc2626;padding:12px">'+esc(e.message)+'</div>';
  });
}

function renderAbastRegs(){
  var regs=ABAST.regData;
  var total=ABAST.regTotal;
  var page=ABAST.regPage;
  var totalPags=Math.max(1,Math.ceil(total/ABAST_PAG));
  var html='<div style="font-size:12px;color:#6b7280;margin-bottom:8px">'+total+' registro(s) encontrado(s) · Página '+(page+1)+' de '+totalPags+'</div>';
  if(regs.length){
    html+='<div style="overflow-x:auto"><table><thead><tr>'+
      '<th>Data</th><th>Viatura</th><th>Agente</th><th>KM Atual</th><th>KM Rod.</th>'+
      '<th>Litros</th><th>Valor</th><th>R$/L</th><th>Consumo</th><th>Combustível</th><th>Posto</th>'+
      '</tr></thead><tbody>';
    regs.forEach(function(ab){
      var preco=ab.litros&&ab.valor_total?Number(ab.valor_total/ab.litros).toFixed(3):'--';
      var consumoCor=ab.consumo_medio?(ab.consumo_medio>=8?'#059669':ab.consumo_medio>=5?'#ca8a04':'#dc2626'):'#9ca3af';
      html+='<tr>'+
        '<td style="font-size:11px;white-space:nowrap">'+fmtDt(ab.data_abastecimento)+'</td>'+
        '<td><b style="color:#1A3A5C">'+esc(ab.prefixo)+'</b><br><span style="color:#9ca3af;font-size:10px">'+esc(ab.placa||'')+'</span></td>'+
        '<td style="font-size:11px">'+esc(ab.qra||ab.agente_nome||'--')+'</td>'+
        '<td style="font-size:11px">'+Number(ab.km_atual||0).toLocaleString()+' km</td>'+
        '<td style="font-size:11px">'+(ab.km_rodados?Number(ab.km_rodados).toLocaleString()+' km':'--')+'</td>'+
        '<td>'+Number(ab.litros||0).toFixed(1)+'L</td>'+
        '<td><b>R$ '+Number(ab.valor_total||0).toFixed(2)+'</b></td>'+
        '<td style="font-size:11px;color:#6b7280">'+preco+'</td>'+
        '<td style="font-weight:600;color:'+consumoCor+'">'+(ab.consumo_medio?ab.consumo_medio.toFixed(2)+' km/L':'--')+'</td>'+
        '<td style="font-size:11px">'+esc(ab.tipo_combustivel||'--')+'</td>'+
        '<td style="font-size:11px;color:#9ca3af">'+esc(ab.posto||'--')+'</td>'+
      '</tr>';
    });
    html+='</tbody></table></div>';
  } else {
    html+='<div class="empty">Nenhum registro encontrado com os filtros aplicados.</div>';
  }
  // Paginação
  if(totalPags>1){
    html+='<div class="pag" style="margin-top:12px">';
    html+='<button class="btn btn-sm" id="abr-prev"'+(page===0?' disabled':'')+'>← Anterior</button>';
    // páginas numeradas (máx 7 botões)
    var start=Math.max(0,page-3),end=Math.min(totalPags-1,start+6);
    if(end-start<6)start=Math.max(0,end-6);
    for(var pi=start;pi<=end;pi++){
      html+='<button class="btn btn-sm abr-pg"'+(pi===page?' style="background:#1A3A5C;color:#fff;border-color:#1A3A5C"':'')+' data-pg="'+pi+'">'+(pi+1)+'</button>';
    }
    html+='<button class="btn btn-sm" id="abr-next"'+(page>=totalPags-1?' disabled':'')+'>Próxima →</button>';
    html+='</div>';
  }
  var el=document.getElementById('abr-body');
  if(el){
    el.innerHTML=html;
    var prev=document.getElementById('abr-prev');if(prev)prev.onclick=function(){ABAST.regPage--;loadAbastRegs();};
    var next=document.getElementById('abr-next');if(next)next.onclick=function(){ABAST.regPage++;loadAbastRegs();};
    el.querySelectorAll('.abr-pg').forEach(function(b){b.onclick=function(){ABAST.regPage=parseInt(this.dataset.pg);loadAbastRegs();};});
  }
}

function abastRegsExportPdf(){
  // Exporta a página atual com os filtros aplicados — mantém a busca atual
  var q='?limit=200&offset=0';
  if(ABAST.regMes)   q+='&mes_ano='+ABAST.regMes;
  if(ABAST.regBusca) q+='&busca='+encodeURIComponent(ABAST.regBusca);
  if(ABAST.regComb)  q+='&combustivel='+encodeURIComponent(ABAST.regComb);
  api.get('/api/frota/abastecimentos'+q).then(function(r){
    var regs=r.data||[];
    var kpi={total_gasto:regs.reduce(function(s,a){return s+Number(a.valor_total||0);},0),
             total_litros:regs.reduce(function(s,a){return s+Number(a.litros||0);},0)};
    abastPdf(regs,kpi,[],ABAST.regMes||'Todos');
  }).catch(function(e){toast(e.message,'er');});
}
function frtRegistrarAbastModal(vt){
  var vtOpts='<option value="">Selecione a viatura</option>'+FRT.vt.filter(function(v){return v.status!=='baixada';}).map(function(v){return '<option value="'+v.id+'"'+(vt&&vt.id===v.id?' selected':'')+'>'+esc(v.prefixo)+' - '+esc(v.placa)+' ('+Number(v.km_atual).toLocaleString()+' km)</option>';}).join('');
  var hoje=new Date().toISOString().substring(0,10);
  var body='<div class="fg">'+
    field('Viatura','<select id="aba-vt">'+vtOpts+'</select>')+
    field('Data','<input type="date" id="aba-dt" value="'+hoje+'"/>')+
    field('KM atual','<input type="number" id="aba-km" placeholder="Ex: 58230"/>')+
    field('Litros abastecidos','<input type="number" step="0.01" id="aba-lt" placeholder="Ex: 45.5"/>')+
    field('Valor total (R$)','<input type="number" step="0.01" id="aba-vl" placeholder="Ex: 280.00"/>')+
    field('Preco/litro','<input type="text" id="aba-pl" readonly style="background:#f3f4f6;cursor:default" placeholder="Calculado automaticamente"/>')+
    field('Tipo de combustivel','<select id="aba-cb"><option value="Gasolina">Gasolina</option><option value="Etanol">Etanol</option><option value="Diesel">Diesel</option><option value="GNV">GNV</option></select>')+
    field('Posto','<input id="aba-po" placeholder="Nome do posto (opcional)"/>')+
    field('Observacoes','<textarea id="aba-ob" placeholder="Opcional"></textarea>',true)+
  '</div>';
  var footer='<button class="btn" id="aba-c">Cancelar</button><button class="btn" style="background:#f59e0b;color:#fff;border-color:#f59e0b" id="aba-ok">Registrar Abastecimento</button>';
  openModal('abf','⛽ Registrar Abastecimento','md',body,footer);
  function calcPreco(){
    var lt=parseFloat(document.getElementById('aba-lt').value);
    var vl=parseFloat(document.getElementById('aba-vl').value);
    var pl=document.getElementById('aba-pl');
    if(lt&&vl&&lt>0)pl.value='R$ '+(vl/lt).toFixed(3)+'/L';
    else pl.value='';
  }
  document.getElementById('aba-lt').oninput=calcPreco;
  document.getElementById('aba-vl').oninput=calcPreco;
  document.getElementById('aba-c').onclick=function(){closeModal('abf');};
  document.getElementById('aba-ok').onclick=function(){
    var vtId=document.getElementById('aba-vt').value;
    var dt=document.getElementById('aba-dt').value;
    var km=document.getElementById('aba-km').value;
    var lt=document.getElementById('aba-lt').value;
    var vl=document.getElementById('aba-vl').value;
    if(!vtId||!dt||!km||!lt||!vl){toast('Preencha todos os campos obrigatorios','er');return;}
    api.post('/api/frota/abastecimentos',{
      viatura_id:parseInt(vtId),data_abastecimento:dt,km_atual:parseInt(km),
      litros:parseFloat(lt),valor_total:parseFloat(vl),
      tipo_combustivel:document.getElementById('aba-cb').value,
      posto:document.getElementById('aba-po').value||null,
      observacoes:document.getElementById('aba-ob').value||null
    }).then(function(){
      toast('Abastecimento registrado!');closeModal('abf');
      loadAbastData();
    }).catch(function(e){toast(e.message,'er');});
  };
}
function abastPdf(registros,kpi,porViatura,mesAno){
  var totalGasto=Number(kpi.total_gasto||0);
  var totalLitros=Number(kpi.total_litros||0);
  var consumoMedio=Number(kpi.consumo_medio_geral||0);
  var precoLitro=Number(kpi.preco_medio_litro||0);
  var html='<!DOCTYPE html><html><head><meta charset="UTF-8"><style>'+
    'body{font-family:Arial,sans-serif;font-size:12px;padding:15mm;color:#111}'+
    '.hdr{text-align:center;border-bottom:2px solid #1A3A5C;padding-bottom:10px;margin-bottom:14px}'+
    '.titulo{font-size:18px;font-weight:700;letter-spacing:1px;color:#1A3A5C}'+
    '.sub{font-size:11px;color:#666;margin-top:3px}'+
    '.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px}'+
    '.kpi{border:1px solid #e5e7eb;border-radius:6px;padding:10px;text-align:center}'+
    '.kpi-v{font-size:18px;font-weight:700;color:#1A3A5C}'+
    '.kpi-l{font-size:9px;color:#6b7280;text-transform:uppercase;margin-top:2px}'+
    'table{width:100%;border-collapse:collapse;margin-bottom:16px;font-size:10px}'+
    'th{background:#1A3A5C;color:#fff;padding:5px 8px;text-align:left}'+
    'td{padding:5px 8px;border-bottom:1px solid #e5e7eb}'+
    'tr:nth-child(even) td{background:#f9fafb}'+
    '@media print{body{padding:10mm}}'+
  '</style></head><body>'+
  '<div class="hdr"><div class="titulo">GUARDA MUNICIPAL DA SERRA</div>'+
  '<div class="sub">RELATORIO DE ABASTECIMENTOS'+(mesAno?' | '+mesAno:'')+' | Gerado em '+new Date().toLocaleString('pt-BR')+'</div></div>'+
  '<div class="kpis">'+
    '<div class="kpi"><div class="kpi-v">R$ '+totalGasto.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})+'</div><div class="kpi-l">Total Gasto</div></div>'+
    '<div class="kpi"><div class="kpi-v">'+totalLitros.toFixed(1)+'L</div><div class="kpi-l">Total Litros</div></div>'+
    '<div class="kpi"><div class="kpi-v">'+(consumoMedio?consumoMedio.toFixed(2)+' km/L':'--')+'</div><div class="kpi-l">Consumo Medio</div></div>'+
    '<div class="kpi"><div class="kpi-v">'+(precoLitro?'R$ '+precoLitro.toFixed(3):'--')+'</div><div class="kpi-l">Preco Medio/L</div></div>'+
  '</div>';
  if(porViatura.length){
    html+='<div style="font-weight:700;font-size:12px;margin-bottom:6px;color:#1A3A5C">Resumo por Viatura</div>'+
    '<table><thead><tr><th>Viatura</th><th>Abastec.</th><th>Litros</th><th>Gasto Total</th><th>Consumo</th><th>KM Rodados</th></tr></thead><tbody>'+
    porViatura.map(function(v){return '<tr><td><b>'+esc(v.prefixo)+'</b> '+esc(v.placa)+'</td><td>'+v.abastecimentos+'</td><td>'+Number(v.litros||0).toFixed(1)+'L</td><td>R$ '+Number(v.gasto||0).toFixed(2)+'</td><td>'+(v.consumo_medio?v.consumo_medio.toFixed(2)+' km/L':'--')+'</td><td>'+(v.km_total?Number(v.km_total).toLocaleString()+' km':'--')+'</td></tr>';}).join('')+
    '</tbody></table>';
  }
  html+='<div style="font-weight:700;font-size:12px;margin-bottom:6px;color:#1A3A5C">Registros Detalhados</div>'+
  '<table><thead><tr><th>Data</th><th>Viatura</th><th>Agente</th><th>Litros</th><th>Valor</th><th>R$/L</th><th>KM</th><th>Consumo</th><th>Combustivel</th></tr></thead><tbody>'+
  (registros.length?registros.map(function(ab){var preco=ab.litros&&ab.valor_total?Number(ab.valor_total/ab.litros).toFixed(3):'--';return '<tr><td>'+fmtDt(ab.data_abastecimento)+'</td><td><b>'+esc(ab.prefixo)+'</b></td><td>'+esc(ab.qra||ab.agente_nome||'--')+'</td><td>'+Number(ab.litros||0).toFixed(2)+'L</td><td>R$ '+Number(ab.valor_total||0).toFixed(2)+'</td><td>'+preco+'</td><td>'+Number(ab.km_atual||0).toLocaleString()+'</td><td>'+(ab.consumo_medio?ab.consumo_medio.toFixed(2)+' km/L':'--')+'</td><td>'+esc(ab.tipo_combustivel||'--')+'</td></tr>';}).join(''):'<tr><td colspan="9" style="text-align:center;color:#9ca3af;padding:14px">Nenhum registro.</td></tr>')+
  '</tbody></table></body></html>';
  pdfFromHtml(html,'relatorio_abastecimentos'+(mesAno?'_'+mesAno:''));
}

function frtRelatorioModal(){
  var vtOpts=[['','Todas as viaturas']].concat(FRT.vt.map(function(v){return[v.id,v.prefixo+' - '+v.placa];}));
  var body='<div class="info">Gere relatorios da frota. O relatorio de KM utiliza os registros de cautelas/descautelas.</div>'+
    '<div class="fg">'+
    field('Tipo de relatorio','<select id="fr-tipo"><option value="geral">Relatorio Geral de Viaturas</option><option value="km">Relatorio de KM Rodado</option><option value="manutencao">Viaturas em Manutencao</option></select>',true)+
    field('Data inicial (KM)','<input type="date" id="fr-di"/>')+
    field('Data final (KM)','<input type="date" id="fr-df"/>')+
    field('Filtrar por viatura (KM)','<select id="fr-vt">'+selOpts(vtOpts,'')+'</select>')+
  '</div>';
  var footer='<button class="btn" id="fr-c">Cancelar</button><button class="btn btn-p" id="fr-ok">Gerar PDF</button>';
  openModal('frel','Relatorios de Frota','md',body,footer);
  document.getElementById('fr-c').onclick=function(){closeModal('frel');};
  document.getElementById('fr-ok').onclick=function(){
    var tipo=document.getElementById('fr-tipo').value;
    var di=document.getElementById('fr-di').value;
    var df=document.getElementById('fr-df').value;
    var vtId=document.getElementById('fr-vt').value;
    closeModal('frel');
    if(tipo==='km'){
      var q='';
      if(di)q+=(q?'&':'?')+'data_ini='+di;
      if(df)q+=(q?'&':'?')+'data_fim='+df;
      if(vtId)q+=(q?'&':'?')+'viatura_id='+vtId;
      api.get('/api/frota/relatorio-km'+q).then(function(r){
        var rows=r.data;
        var html='<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{font-family:Arial,sans-serif;font-size:12px;padding:15mm}.hdr{text-align:center;border-bottom:2px solid #1A3A5C;padding-bottom:10px;margin-bottom:14px}.titulo{font-size:18px;font-weight:700;letter-spacing:1px;color:#1A3A5C}.sub{font-size:11px;color:#666;margin-top:3px}table{width:100%;border-collapse:collapse;margin-bottom:16px}th{background:#1A3A5C;color:#fff;padding:7px 10px;text-align:left;font-size:11px}td{padding:6px 10px;border-bottom:1px solid #e5e7eb;font-size:11px}tr:nth-child(even) td{background:#f9fafb}@media print{body{padding:10mm}}</style></head><body>'+
          '<div class="hdr"><div class="titulo">GUARDA MUNICIPAL DA SERRA</div><div class="sub">RELATORIO DE KM RODADO'+(di||df?' | Periodo: '+(di?fmtDt(di):'')+' a '+(df?fmtDt(df):'hoje'):'')+' | '+new Date().toLocaleString('pt-BR')+'</div></div>'+
          '<table><thead><tr><th>Prefixo</th><th>Placa</th><th>Modelo</th><th>Cautelas</th><th>KM Rodado</th><th>KM Medio/Saida</th><th>Primeira Saida</th><th>Ultimo Retorno</th></tr></thead><tbody>'+
          (rows.length?rows.map(function(r){return '<tr><td><b style="color:#1A3A5C">'+esc(r.prefixo)+'</b></td><td>'+esc(r.placa)+'</td><td>'+esc((r.marca||'')+' '+(r.modelo||''))+'</td><td>'+r.total_cautelas+'</td><td><b>'+(r.km_rodado?Number(r.km_rodado).toLocaleString():0)+' km</b></td><td>'+(r.km_medio?Number(Math.round(r.km_medio)).toLocaleString()+' km':'--')+'</td><td style="color:#9ca3af;font-size:10px">'+fmtDt(r.primeira_saida||'')+'</td><td style="color:#9ca3af;font-size:10px">'+fmtTs(r.ultimo_retorno||'')+'</td></tr>';}).join(''):'<tr><td colspan="8" style="text-align:center;color:#9ca3af;padding:20px">Nenhum dado no periodo selecionado.</td></tr>')+
          '<tr><td colspan="4" style="font-weight:700;background:#f3f4f6">TOTAL</td><td style="font-weight:700;background:#f3f4f6">'+(rows.reduce(function(s,r){return s+(r.km_rodado||0);},0)).toLocaleString()+' km</td><td colspan="3" style="background:#f3f4f6"></td></tr>'+
          '</tbody></table></body></html>';
        pdfFromHtml(html,'relatorio_km_frota');
      }).catch(function(e){toast(e.message,'er');});
    } else if(tipo==='geral'){
      var vtFlt=FRT.vt.filter(function(v){return v.status!=='baixada';});
      var html='<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{font-family:Arial,sans-serif;font-size:12px;padding:15mm}.hdr{text-align:center;border-bottom:2px solid #1A3A5C;padding-bottom:10px;margin-bottom:14px}.titulo{font-size:18px;font-weight:700;letter-spacing:1px;color:#1A3A5C}.sub{font-size:11px;color:#666;margin-top:3px}.sumario{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px}.sum-card{border:1px solid #e5e7eb;border-radius:6px;padding:10px;text-align:center}.sum-val{font-size:22px;font-weight:700;color:#1A3A5C}.sum-lbl{font-size:10px;color:#6b7280;text-transform:uppercase}table{width:100%;border-collapse:collapse;margin-bottom:16px}th{background:#1A3A5C;color:#fff;padding:7px 10px;text-align:left;font-size:11px}td{padding:6px 10px;border-bottom:1px solid #e5e7eb;font-size:11px}@media print{body{padding:10mm}}</style></head><body>'+
        '<div class="hdr"><div class="titulo">GUARDA MUNICIPAL DA SERRA</div><div class="sub">RELATORIO GERAL DE FROTA | '+new Date().toLocaleString('pt-BR')+'</div></div>'+
        '<div class="sumario">'+
          '<div class="sum-card"><div class="sum-val">'+FRT.vt.filter(function(v){return v.status==='disponivel';}).length+'</div><div class="sum-lbl">Disponiveis</div></div>'+
          '<div class="sum-card"><div class="sum-val" style="color:#2E75B6">'+FRT.vt.filter(function(v){return v.status==='cautelada';}).length+'</div><div class="sum-lbl">Em Servico</div></div>'+
          '<div class="sum-card"><div class="sum-val" style="color:#ca8a04">'+FRT.vt.filter(function(v){return v.status==='manutencao';}).length+'</div><div class="sum-lbl">Manutencao</div></div>'+
          '<div class="sum-card"><div class="sum-val" style="color:#dc2626">'+FRT.vt.filter(function(v){return v.km_proxima_revisao&&v.km_atual>=v.km_proxima_revisao-1000&&v.status!=='baixada';}).length+'</div><div class="sum-lbl">Alertas Revisao</div></div>'+
        '</div>'+
        '<table><thead><tr><th>Prefixo</th><th>Placa</th><th>Tipo</th><th>Modelo</th><th>Ano</th><th>KM Atual</th><th>KM Revisao</th><th>Status</th><th>Setor</th></tr></thead><tbody>'+
        vtFlt.map(function(v){var alerta=v.km_proxima_revisao&&v.km_atual>=v.km_proxima_revisao-1000;return '<tr><td><b>'+esc(v.prefixo)+'</b></td><td>'+esc(v.placa)+'</td><td>'+esc(v.tipo||'--')+'</td><td>'+esc((v.marca||'')+' '+(v.modelo||''))+'</td><td>'+esc(v.ano||'--')+'</td><td>'+Number(v.km_atual).toLocaleString()+' km</td><td style="color:'+(alerta?'#dc2626':'')+';font-weight:'+(alerta?'700':'400')+'">'+(v.km_proxima_revisao?Number(v.km_proxima_revisao).toLocaleString()+' km'+(alerta?' ⚠':''):'--')+'</td><td>'+v.status+'</td><td>'+esc(v.setor||'--')+'</td></tr>';}).join('')+
        '</tbody></table></body></html>';
      pdfFromHtml(html,'relatorio_geral_frota');
    } else {
      var vtMan=FRT.vt.filter(function(v){return v.status==='manutencao';});
      var html='<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{font-family:Arial,sans-serif;font-size:12px;padding:15mm}.hdr{text-align:center;border-bottom:2px solid #1A3A5C;padding-bottom:10px;margin-bottom:14px}.titulo{font-size:18px;font-weight:700;color:#1A3A5C}.sub{font-size:11px;color:#666;margin-top:3px}table{width:100%;border-collapse:collapse}th{background:#1A3A5C;color:#fff;padding:7px 10px;text-align:left;font-size:11px}td{padding:6px 10px;border-bottom:1px solid #e5e7eb;font-size:11px}</style></head><body>'+
        '<div class="hdr"><div class="titulo">GUARDA MUNICIPAL DA SERRA</div><div class="sub">VIATURAS EM MANUTENCAO | '+new Date().toLocaleString('pt-BR')+'</div></div>'+
        '<table><thead><tr><th>Prefixo</th><th>Placa</th><th>Modelo</th><th>Setor</th><th>Observacoes/OS</th></tr></thead><tbody>'+
        (vtMan.length?vtMan.map(function(v){return '<tr><td><b>'+esc(v.prefixo)+'</b></td><td>'+esc(v.placa)+'</td><td>'+esc((v.marca||'')+' '+(v.modelo||''))+'</td><td>'+esc(v.setor||'--')+'</td><td style="font-size:10px">'+esc(v.observacoes||'--')+'</td></tr>';}).join(''):'<tr><td colspan="5" style="text-align:center;color:#9ca3af">Nenhuma viatura em manutencao.</td></tr>')+
        '</tbody></table></body></html>';
      pdfFromHtml(html,'viaturas_manutencao');
    }
    toast('Relatorio gerado!');
  };
}

function frtHistModal(v){
  api.get('/api/frota/viaturas/'+v.id+'/historico').then(function(r){
    var hist=r.data;
    var body=hist.length===0?'<div class="empty">Nenhuma cautela registrada.</div>':'<div style="overflow-x:auto"><table><thead><tr><th>Data cautela</th><th>Motorista</th><th>KM ini</th><th>KM fin</th><th>Rodado</th><th>Comb.</th><th>Retorno</th><th>Obs.</th></tr></thead><tbody>'+hist.map(function(h){return '<tr><td style="font-size:11px">'+fmtTs(h.data_cautela)+'</td><td>'+esc(h.motorista_nome)+'</td><td>'+Number(h.km_inicial).toLocaleString()+'</td><td>'+(h.km_final?Number(h.km_final).toLocaleString():bdg('Em servico','yellow'))+'</td><td>'+(h.km_final?'<b style="color:#1A3A5C">'+(h.km_final-h.km_inicial).toLocaleString()+' km</b>':'--')+'</td><td style="font-size:11px">'+esc(h.nivel_combustivel_inicial||'--')+'</td><td style="font-size:11px">'+fmtTs(h.data_descautela)+'</td><td style="font-size:11px;color:#9ca3af">'+esc(h.observacoes_retorno||'--')+'</td></tr>';}).join('')+'</tbody></table></div>';
    openModal('fh','Historico - '+v.prefixo+' ('+v.placa+')','xl',body);
  }).catch(function(e){toast(e.message,'er');});
}

// =====================================================================
// OPERAÇÕES
// =====================================================================
var OPR={data:[],flt:{busca:'',data_ini:'',data_fim:'',acao_conjunta:''}};
function pgOperacoes(){
  pc().innerHTML='<div style="color:#9ca3af;padding:20px">Carregando...</div>';
  api.get('/api/operacoes').then(function(r){OPR.data=r.data;renderOperacoes();}).catch(function(e){toast(e.message,'er');});
}
function renderOperacoes(){
  var filtered=OPR.data.filter(function(o){
    if(OPR.flt.busca&&!(o.nome+o.local_encontro+o.boletim_registro+o.orgaos_envolvidos).toLowerCase().includes(OPR.flt.busca.toLowerCase()))return false;
    if(OPR.flt.data_ini&&o.data_operacao<OPR.flt.data_ini)return false;
    if(OPR.flt.data_fim&&o.data_operacao>OPR.flt.data_fim)return false;
    if(OPR.flt.acao_conjunta==='1'&&!o.acao_conjunta)return false;
    if(OPR.flt.acao_conjunta==='0'&&o.acao_conjunta)return false;
    return true;
  });
  var html=ph('Controle de Operacoes',filtered.length+' operacao(oes)',
    (isAdmin()?'<button class="btn btn-p" id="opr-novo">+ Nova Operacao</button> ':'')+
    '<button class="btn" id="opr-pdf">Exportar PDF</button>');
  // Filtros
  html+='<div class="card" style="margin-bottom:14px"><div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr auto;gap:8px;align-items:end">'+
    '<div><label style="font-size:11px;display:block;margin-bottom:3px">Buscar</label><input id="of-busca" placeholder="Operacao, local, BO, orgao..." value="'+esc(OPR.flt.busca)+'" style="width:100%;padding:7px 10px;border:1px solid #e5e7eb;border-radius:6px;font-size:13px"/></div>'+
    '<div><label style="font-size:11px;display:block;margin-bottom:3px">Data inicial</label><input type="date" id="of-di" value="'+OPR.flt.data_ini+'" style="width:100%;padding:7px 10px;border:1px solid #e5e7eb;border-radius:6px;font-size:13px"/></div>'+
    '<div><label style="font-size:11px;display:block;margin-bottom:3px">Data final</label><input type="date" id="of-df" value="'+OPR.flt.data_fim+'" style="width:100%;padding:7px 10px;border:1px solid #e5e7eb;border-radius:6px;font-size:13px"/></div>'+
    '<div><label style="font-size:11px;display:block;margin-bottom:3px">Ação conjunta</label><select id="of-ac" style="width:100%;padding:7px 10px;border:1px solid #e5e7eb;border-radius:6px;font-size:13px">'+
      '<option value="">Todas</option><option value="1"'+(OPR.flt.acao_conjunta==='1'?' selected':'')+'>Sim</option><option value="0"'+(OPR.flt.acao_conjunta==='0'?' selected':'')+'>Não</option>'+
    '</select></div>'+
    '<div style="display:flex;gap:6px"><button class="btn btn-p" id="of-flt">Filtrar</button><button class="btn" id="of-lmp" title="Limpar">✕</button></div>'+
  '</div></div>';
  // Cards de resumo rápido
  var total=OPR.data.length;
  var conj=OPR.data.filter(function(o){return o.acao_conjunta;}).length;
  var mesAtual=new Date().toISOString().substring(0,7);
  var esteMes=OPR.data.filter(function(o){return o.data_operacao&&o.data_operacao.substring(0,7)===mesAtual;}).length;
  html+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px">';
  html+='<div style="background:linear-gradient(135deg,#1A3A5C,#2E75B6);border-radius:10px;padding:14px;color:#fff;text-align:center"><div style="font-size:28px;font-weight:700">'+total+'</div><div style="font-size:11px;opacity:.75;text-transform:uppercase;letter-spacing:.5px;margin-top:2px">Total de Operacoes</div></div>';
  html+='<div style="background:linear-gradient(135deg,#7c3aed,#a855f7);border-radius:10px;padding:14px;color:#fff;text-align:center"><div style="font-size:28px;font-weight:700">'+conj+'</div><div style="font-size:11px;opacity:.75;text-transform:uppercase;letter-spacing:.5px;margin-top:2px">Acoes Conjuntas</div></div>';
  html+='<div style="background:linear-gradient(135deg,#065f46,#059669);border-radius:10px;padding:14px;color:#fff;text-align:center"><div style="font-size:28px;font-weight:700">'+esteMes+'</div><div style="font-size:11px;opacity:.75;text-transform:uppercase;letter-spacing:.5px;margin-top:2px">Este Mes</div></div>';
  html+='</div>';
  // Tabela
  html+='<div class="card"><div style="overflow-x:auto">';
  if(filtered.length){
    html+='<table><thead><tr>'+
      '<th>Operação</th><th>Data</th><th>Horário</th><th>Local de Encontro</th>'+
      '<th>Equipes</th><th>Ação Conjunta</th><th>Órgãos Envolvidos</th>'+
      '<th>Boletim/BO</th><th>Saldo</th><th>Ações</th>'+
    '</tr></thead><tbody>';
    filtered.forEach(function(o,i){
      var equipes=[];
      try{equipes=JSON.parse(o.equipes||'[]');}catch(e){if(o.equipes)equipes=[o.equipes];}
      var conj=o.acao_conjunta?'<span style="background:#dcfce7;color:#16a34a;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:600">Sim</span>':'<span style="background:#f3f4f6;color:#6b7280;padding:2px 8px;border-radius:999px;font-size:11px">Não</span>';
      var saldoTrunc=(o.saldo_operacao||'--').substring(0,40)+(o.saldo_operacao&&o.saldo_operacao.length>40?'…':'');
      html+='<tr>'+
        '<td><b style="color:#1A3A5C">'+esc(o.nome)+'</b></td>'+
        '<td style="white-space:nowrap"><b>'+fmtDt(o.data_operacao)+'</b></td>'+
        '<td style="color:#6b7280">'+esc(o.horario||'--')+'</td>'+
        '<td style="font-size:12px">'+esc(o.local_encontro||'--')+'</td>'+
        '<td style="font-size:11px">'+
          (equipes.length?equipes.map(function(eq){return '<span style="background:#eff6ff;color:#1A3A5C;padding:1px 6px;border-radius:4px;margin:1px;display:inline-block">'+esc(eq)+'</span>';}).join(''):'<span style="color:#9ca3af">--</span>')+
        '</td>'+
        '<td style="text-align:center">'+conj+'</td>'+
        '<td style="font-size:11px;color:#6b7280">'+esc((o.orgaos_envolvidos||'--').substring(0,40))+'</td>'+
        '<td style="font-size:11px"><b>'+esc(o.boletim_registro||'--')+'</b></td>'+
        '<td style="font-size:11px;max-width:160px">'+esc(saldoTrunc)+'</td>'+
        '<td><div style="display:flex;gap:4px">'+
          '<button class="btn btn-sm opr-ver" data-idx="'+i+'" title="Dossie">📋</button>'+
          (isAdmin()?'<button class="btn btn-sm opr-ed" data-idx="'+i+'">Editar</button> <button class="btn btn-sm btn-d opr-del" data-idx="'+i+'">Excluir</button>':'')+
        '</div></td>'+
      '</tr>';
    });
    html+='</tbody></table>';
  } else {
    html+='<div class="empty">Nenhuma operacao encontrada.</div>';
  }
  html+='</div></div>';
  pc().innerHTML=html;
  OPR._filtered=filtered;
  if(isAdmin()){var nb=document.getElementById('opr-novo');if(nb)nb.onclick=function(){oprModal(null);};}
  var pdfBtn=document.getElementById('opr-pdf');if(pdfBtn)pdfBtn.onclick=function(){oprPdf(filtered);};
  var fltBtn=document.getElementById('of-flt');if(fltBtn)fltBtn.onclick=function(){
    OPR.flt.busca=document.getElementById('of-busca').value;
    OPR.flt.data_ini=document.getElementById('of-di').value;
    OPR.flt.data_fim=document.getElementById('of-df').value;
    OPR.flt.acao_conjunta=document.getElementById('of-ac').value;
    renderOperacoes();
  };
  var lmpBtn=document.getElementById('of-lmp');if(lmpBtn)lmpBtn.onclick=function(){OPR.flt={busca:'',data_ini:'',data_fim:'',acao_conjunta:''};renderOperacoes();};
  // Busca ao digitar
  var busInput=document.getElementById('of-busca');
  if(busInput){var bt=null;busInput.oninput=function(){clearTimeout(bt);var v=this.value;bt=setTimeout(function(){OPR.flt.busca=v;renderOperacoes();},350);};}
  pc().addEventListener('click',function(e){
    var btn=e.target.closest('button');if(!btn)return;
    var idx=parseInt(btn.dataset.idx);var o=filtered[idx];
    if(btn.classList.contains('opr-ver'))oprDossie(o);
    else if(btn.classList.contains('opr-ed'))oprModal(o);
    else if(btn.classList.contains('opr-del')){if(confirm('Excluir operacao "'+o.nome+'"?'))api.delete('/api/operacoes/'+o.id).then(function(){toast('Removida!');pgOperacoes();}).catch(function(e){toast(e.message,'er');});}
  });
}

function oprModal(o){
  var titulo=o?'Editar Operacao':'Nova Operacao';
  var equipes=[];
  if(o){try{equipes=JSON.parse(o.equipes||'[]');}catch(e){if(o.equipes)equipes=[o.equipes];}}
  var body='<div class="fg">'+
    field('Nome da Operacao *','<input id="op-nm" value="'+esc(o?o.nome:'')+'"/>')+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+
      field('Data da Operacao *','<input type="date" id="op-dt" value="'+(o?o.data_operacao:'')+'"/>')+
      field('Horario','<input type="time" id="op-hr" value="'+(o?o.horario||'':'')+'"/>',false)+
    '</div>'+
    field('Local de Encontro','<input id="op-lo" value="'+esc(o?o.local_encontro||'':'')+'"/>')+
    field('Equipes participantes','<div id="op-eq-wrap" style="border:1px solid #e5e7eb;border-radius:8px;padding:8px;min-height:42px;display:flex;flex-wrap:wrap;gap:4px;cursor:text">'+
      equipes.map(function(eq){return '<span class="opr-chip" style="background:#eff6ff;color:#1A3A5C;padding:3px 8px;border-radius:4px;font-size:12px;display:flex;align-items:center;gap:4px">'+esc(eq)+'<span class="opr-chip-rm" data-eq="'+esc(eq)+'" style="cursor:pointer;color:#9ca3af;font-size:14px;line-height:1">×</span></span>';}).join('')+
      '<input id="op-eq-in" placeholder="'+(equipes.length?'':'Digite e pressione Enter...')+'" style="border:none;outline:none;font-size:12px;min-width:120px;flex:1"/>'+
    '</div>',false)+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">'+
      field('Ação Conjunta?','<select id="op-ac"><option value="0"'+(o&&!o.acao_conjunta?' selected':'')+'>Não</option><option value="1"'+(o&&o.acao_conjunta?' selected':'')+'>Sim</option></select>',false)+
      field('Boletim/BO','<input id="op-bo" value="'+esc(o?o.boletim_registro||'':'')+'"/>',false)+
    '</div>'+
    field('Órgãos Envolvidos','<input id="op-og" placeholder="Ex: PM, Receita Federal, DETRAN..." value="'+esc(o?o.orgaos_envolvidos||'':'')+'"/>')+
    field('Saldo da Operação','<textarea id="op-sl" rows="3" placeholder="Descreva o resultado: presos, apreensoes, flagrantes...">'+esc(o?o.saldo_operacao||'':'')+'</textarea>',true)+
    field('Observacoes','<textarea id="op-ob" rows="2">'+esc(o?o.observacoes||'':'')+'</textarea>',true)+
  '</div>';
  var footer='<button class="btn" id="op-c">Cancelar</button><button class="btn btn-p" id="op-ok">'+(o?'Salvar alteracoes':'Cadastrar')+'</button>';
  openModal('opm',titulo,'lg',body,footer);
  // Clicks no wrap focam o input
  var wrapEl=document.getElementById('op-eq-wrap');
  if(wrapEl)wrapEl.onclick=function(){document.getElementById('op-eq-in').focus();};
  // Chips de equipes
  var eqs=equipes.slice();
  function renderChips(){
    var wrap=document.getElementById('op-eq-wrap');
    var inp=document.getElementById('op-eq-in');
    var chips=wrap.querySelectorAll('.opr-chip');chips.forEach(function(c){c.remove();});
    eqs.forEach(function(eq){
      var chip=document.createElement('span');
      chip.className='opr-chip';chip.style.cssText='background:#eff6ff;color:#1A3A5C;padding:3px 8px;border-radius:4px;font-size:12px;display:flex;align-items:center;gap:4px';
      chip.innerHTML=esc(eq)+'<span class="opr-chip-rm" style="cursor:pointer;color:#9ca3af;font-size:14px;line-height:1">×</span>';
      chip.querySelector('.opr-chip-rm').onclick=function(){eqs=eqs.filter(function(e){return e!==eq;});renderChips();};
      wrap.insertBefore(chip,inp);
    });
    inp.placeholder=eqs.length?'':'Digite e pressione Enter...';
  }
  renderChips();
  var inp=document.getElementById('op-eq-in');
  inp.onkeydown=function(e){
    if((e.key==='Enter'||e.key===',')&&this.value.trim()){
      e.preventDefault();var v=this.value.trim().replace(/,$/,'');
      if(v&&!eqs.includes(v)){eqs.push(v);renderChips();this.value='';}
    } else if(e.key==='Backspace'&&!this.value&&eqs.length){
      eqs.pop();renderChips();
    }
  };
  document.getElementById('op-c').onclick=function(){closeModal('opm');};
  document.getElementById('op-ok').onclick=function(){
    var nome=document.getElementById('op-nm').value.trim();
    var dt=document.getElementById('op-dt').value;
    if(!nome||!dt){toast('Nome e data sao obrigatorios','er');return;}
    var payload={
      nome:nome, data_operacao:dt,
      horario:document.getElementById('op-hr').value||null,
      local_encontro:document.getElementById('op-lo').value||null,
      equipes:JSON.stringify(eqs),
      acao_conjunta:document.getElementById('op-ac').value==='1',
      orgaos_envolvidos:document.getElementById('op-og').value||null,
      saldo_operacao:document.getElementById('op-sl').value||null,
      boletim_registro:document.getElementById('op-bo').value||null,
      observacoes:document.getElementById('op-ob').value||null
    };
    var prom=o?api.put('/api/operacoes/'+o.id,payload):api.post('/api/operacoes',payload);
    prom.then(function(){toast(o?'Operacao atualizada!':'Operacao cadastrada!');closeModal('opm');pgOperacoes();}).catch(function(e){toast(e.message,'er');});
  };
}

function oprDossie(o){
  var equipes=[];
  try{equipes=JSON.parse(o.equipes||'[]');}catch(e){if(o.equipes)equipes=[o.equipes];}
  var body='<div style="background:linear-gradient(135deg,#1A3A5C,#2E75B6);border-radius:10px;padding:20px;color:#fff;margin-bottom:16px">'+
    '<div style="font-size:11px;opacity:.65;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">Operação Policial</div>'+
    '<div style="font-size:22px;font-weight:800;letter-spacing:.5px">'+esc(o.nome)+'</div>'+
    '<div style="margin-top:8px;display:flex;gap:16px;flex-wrap:wrap;font-size:13px;opacity:.85">'+
      '<span>📅 '+fmtDt(o.data_operacao)+'</span>'+
      (o.horario?'<span>🕐 '+esc(o.horario)+'</span>':'')+
      (o.local_encontro?'<span>📍 '+esc(o.local_encontro)+'</span>':'')+
      '<span>'+(o.acao_conjunta?'🤝 Ação Conjunta':'🔵 Operação Própria')+'</span>'+
    '</div>'+
  '</div>'+
  '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px">'+
    oprDossieCard('Equipes Participantes', equipes.length?equipes.map(function(eq){return '<span style="background:#eff6ff;color:#1A3A5C;padding:3px 10px;border-radius:4px;font-size:12px;display:inline-block;margin:2px">'+esc(eq)+'</span>';}).join(''):'<span style="color:#9ca3af">Não informado</span>')+
    oprDossieCard('Órgãos Envolvidos', o.orgaos_envolvidos?'<p style="margin:0;font-size:13px">'+esc(o.orgaos_envolvidos)+'</p>':'<span style="color:#9ca3af">Não informado</span>')+
  '</div>'+
  '<div style="margin-bottom:12px">'+
    '<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#6b7280;margin-bottom:6px">Saldo da Operação</div>'+
    '<div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:14px;font-size:13px;line-height:1.6;color:#14532d">'+(o.saldo_operacao?esc(o.saldo_operacao).replace(/\\n/g,'<br>'):'<span style="color:#9ca3af">Não informado</span>')+'</div>'+
  '</div>'+
  (o.boletim_registro?'<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;padding:12px 14px;display:flex;align-items:center;gap:10px;margin-bottom:12px"><span style="font-size:18px">📄</span><div><div style="font-size:11px;color:#92400e;font-weight:700;text-transform:uppercase">Boletim de Registro</div><div style="font-size:15px;font-weight:700;color:#78350f">'+esc(o.boletim_registro)+'</div></div></div>':'')+
  (o.observacoes?'<div style="background:#f9fafb;border-radius:8px;padding:12px 14px;font-size:12px;color:#6b7280"><b>Obs:</b> '+esc(o.observacoes)+'</div>':'')+
  '<div style="margin-top:12px;font-size:11px;color:#9ca3af">Registrado por: '+esc(o.criado_por_nome||'--')+' · '+fmtTs(o.criado_em)+'</div>';
  var footer='<button class="btn" id="opr-dos-f">Fechar</button><button class="btn btn-p" id="opr-dos-pdf">Imprimir Dossie PDF</button>';
  openModal('omd','Dossie da Operacao','lg',body,footer);
  document.getElementById('opr-dos-f').onclick=function(){closeModal('omd');};
  document.getElementById('opr-dos-pdf').onclick=function(){oprDossiePdf(o,equipes);};
}
function oprDossieCard(titulo,conteudo){
  return '<div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:12px">'+
    '<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:#6b7280;margin-bottom:8px">'+titulo+'</div>'+
    conteudo+'</div>';
}

function oprDossiePdf(o,equipes){
  var html='<style>body{font-family:Arial,sans-serif;font-size:12px;color:#111;padding:15mm}'+
    '.hdr{background:#1A3A5C;color:#fff;padding:18px 20px;border-radius:6px;margin-bottom:16px}'+
    '.hdr-title{font-size:20px;font-weight:800;letter-spacing:.5px}'+
    '.hdr-sub{font-size:11px;opacity:.7;margin-top:4px}'+
    '.row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px}'+
    '.box{border:1px solid #e5e7eb;border-radius:6px;padding:12px}'+
    '.box-lbl{font-size:10px;font-weight:700;text-transform:uppercase;color:#6b7280;margin-bottom:5px}'+
    '.saldo{background:#f0fdf4;border:1px solid #bbf7d0;padding:12px;border-radius:6px;margin-bottom:12px}'+
    '.bo{background:#fffbeb;border:1px solid #fde68a;padding:10px 14px;border-radius:6px;margin-bottom:12px;display:flex;align-items:center;gap:10px}'+
    '.chip{background:#eff6ff;color:#1A3A5C;padding:2px 8px;border-radius:4px;font-size:11px;display:inline-block;margin:1px}'+
    '.footer{margin-top:20px;border-top:1px solid #e5e7eb;padding-top:8px;font-size:10px;color:#9ca3af;text-align:center}'+
    '@media print{body{padding:10mm}}</style>'+
  '<div class="hdr"><div style="font-size:10px;opacity:.6;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">Guarda Municipal da Serra — Dossie de Operação</div>'+
  '<div class="hdr-title">'+esc(o.nome)+'</div>'+
  '<div class="hdr-sub">'+fmtDt(o.data_operacao)+(o.horario?' · '+esc(o.horario):'')+(o.local_encontro?' · '+esc(o.local_encontro):'')+' · '+(o.acao_conjunta?'Ação Conjunta':'Operação Própria')+'</div>'+
  '</div>'+
  '<div class="row">'+
    '<div class="box"><div class="box-lbl">Equipes Participantes</div>'+equipes.map(function(eq){return '<span class="chip">'+esc(eq)+'</span>';}).join('')+(equipes.length?'':'<span style="color:#9ca3af">Não informado</span>')+'</div>'+
    '<div class="box"><div class="box-lbl">Órgãos Envolvidos</div>'+(o.orgaos_envolvidos?esc(o.orgaos_envolvidos):'<span style="color:#9ca3af">Não informado</span>')+'</div>'+
  '</div>'+
  '<div class="saldo"><div class="box-lbl">Saldo da Operação</div><div style="font-size:13px;line-height:1.6">'+(o.saldo_operacao?esc(o.saldo_operacao).replace(/\\n/g,'<br>'):'<span style="color:#9ca3af">Não informado</span>')+'</div></div>'+
  (o.boletim_registro?'<div class="bo"><div><div class="box-lbl">Boletim de Registro</div><div style="font-size:16px;font-weight:700">'+esc(o.boletim_registro)+'</div></div></div>':'')+
  (o.observacoes?'<div class="box" style="margin-bottom:12px"><div class="box-lbl">Observações</div>'+esc(o.observacoes)+'</div>':'')+
  '<div class="footer">Registrado por: '+esc(o.criado_por_nome||'--')+' · '+fmtTs(o.criado_em)+' · GCM Serra — Sistema Bluecore</div>';
  pdfFromHtml(html,'dossie_'+o.nome.replace(/\s+/g,'_'));
}

function oprPdf(filtered){
  if(!filtered.length){toast('Nenhuma operacao para exportar','er');return;}
  var html='<style>body{font-family:Arial,sans-serif;font-size:11px;color:#111;padding:12mm}'+
    '.hdr{text-align:center;border-bottom:2px solid #1A3A5C;padding-bottom:10px;margin-bottom:12px}'+
    '.titulo{font-size:16px;font-weight:700;color:#1A3A5C}'+
    '.sub{font-size:10px;color:#666;margin-top:3px}'+
    'table{width:100%;border-collapse:collapse;margin-bottom:10px}'+
    'th{background:#1A3A5C;color:#fff;padding:6px 8px;text-align:left;font-size:10px}'+
    'td{padding:5px 8px;border-bottom:1px solid #e5e7eb;font-size:10px;vertical-align:top}'+
    'tr:nth-child(even) td{background:#f9fafb}'+
    '.conj{background:#dcfce7;color:#16a34a;padding:1px 6px;border-radius:999px;font-size:9px}'+
    '.prop{background:#f3f4f6;color:#6b7280;padding:1px 6px;border-radius:999px;font-size:9px}'+
    '@media print{body{padding:8mm}}</style>'+
  '<div class="hdr"><div class="titulo">GUARDA MUNICIPAL DA SERRA</div>'+
  '<div class="sub">RELATORIO DE OPERACOES · Total: '+filtered.length+' · Gerado em '+new Date().toLocaleString('pt-BR')+'</div></div>'+
  '<table><thead><tr><th>#</th><th>Operação</th><th>Data</th><th>Horário</th><th>Local</th><th>Equipes</th><th>Ação Conj.</th><th>Órgãos</th><th>Boletim/BO</th><th>Saldo da Operação</th></tr></thead><tbody>'+
  filtered.map(function(o,i){
    var equipes=[];try{equipes=JSON.parse(o.equipes||'[]');}catch(e){if(o.equipes)equipes=[o.equipes];}
    return '<tr>'+
      '<td>'+(i+1)+'</td>'+
      '<td><b>'+esc(o.nome)+'</b></td>'+
      '<td style="white-space:nowrap">'+fmtDt(o.data_operacao)+'</td>'+
      '<td>'+esc(o.horario||'--')+'</td>'+
      '<td>'+esc(o.local_encontro||'--')+'</td>'+
      '<td>'+equipes.map(function(eq){return esc(eq);}).join(', ')+'</td>'+
      '<td style="text-align:center">'+(o.acao_conjunta?'<span class="conj">Sim</span>':'<span class="prop">Não</span>')+'</td>'+
      '<td>'+esc(o.orgaos_envolvidos||'--')+'</td>'+
      '<td><b>'+esc(o.boletim_registro||'--')+'</b></td>'+
      '<td>'+esc((o.saldo_operacao||'--').substring(0,80))+'</td>'+
    '</tr>';
  }).join('')+
  '</tbody></table></div>';
  pdfFromHtml(html,'relatorio_operacoes_'+new Date().toISOString().substring(0,10));
}

// =====================================================================
// SUPERVISAO
// =====================================================================
var SUP={servs:[],vt:[],ags:[],sel:null,eqs:[]};
function pgSup(){
  pc().innerHTML='<div style="color:#9ca3af;padding:20px">Carregando...</div>';
  Promise.all([api.get('/api/supervisao'),api.get('/api/frota/viaturas'),api.get('/api/agentes?ativo=true')]).then(function(rs){SUP.servs=rs[0].data;SUP.vt=rs[1].data;SUP.ags=rs[2].data;renderSup();}).catch(function(e){toast(e.message,'er');});
}
function renderSup(){
  var abertos=SUP.servs.filter(function(s){return s.status==='aberto';}).length;
  var html=ph('Supervisao - Livro de Servico',abertos+' servicos abertos',canEdit('supervisao')?'<button class="btn btn-p" id="sup-novo">+ Abrir servico</button>':"");
  html+=tableHtml(['Data','Supervisor','Equipe','Horario','Equipes','Status','Acoes'],SUP.servs.map(function(s,idx){return '<tr><td><b>'+fmtDt(s.data_servico)+'</b></td><td>'+esc(s.supervisor_nome||'--')+'</td><td>'+bdg('Equipe '+s.letra_equipe,'blue')+'</td><td style="color:#9ca3af">'+esc(s.horario_inicio||'--')+(s.horario_fim?' - '+esc(s.horario_fim):'')+' </td><td>'+(s.total_equipes||0)+'</td><td>'+bdg(s.status==='aberto'?'Em aberto':'Encerrado',s.status==='aberto'?'yellow':'green')+'</td><td><div style="display:flex;gap:4px"><button class="btn btn-sm sup-ger" data-idx="'+idx+'">Gerenciar</button> <button class="btn btn-sm sup-pdf" data-idx="'+idx+'">Livro PDF</button>'+(s.status==='aberto'&&canEdit('supervisao')?' <button class="btn btn-sm btn-d sup-enc" data-idx="'+idx+'">Encerrar</button>':'')+' </div></td></tr>';}));
  pc().innerHTML=html;
  if(canEdit('supervisao')){var nb=document.getElementById('sup-novo');if(nb)nb.onclick=supNovoModal;}
  pc().addEventListener('click',function(e){var btn=e.target.closest('button');if(!btn)return;var idx=parseInt(btn.dataset.idx);var s=SUP.servs[idx];if(btn.classList.contains('sup-ger'))supGerenciar(s.id);else if(btn.classList.contains('sup-pdf'))supLivro(s.id);else if(btn.classList.contains('sup-enc'))supEncerrar(s.id);});
}
function supNovoModal(){
  var body='<div class="fg">'+field('Data','<input type="date" id="sn-d" value="'+new Date().toISOString().slice(0,10)+'"/>')+field('Equipe / Letra','<select id="sn-l"><option value="">Selecione</option>'+LETRAS.map(function(l){return '<option value="'+l+'">Equipe '+l+'</option>';}).join('')+'</select>')+field('Horario de inicio','<input type="time" id="sn-h"/>')+'</div>';
  var footer='<button class="btn" id="sn-c">Cancelar</button><button class="btn btn-p" id="sn-ok">Abrir servico</button>';
  openModal('sn','Abrir Servico do Dia','md',body,footer);
  document.getElementById('sn-c').onclick=function(){closeModal('sn');};
  document.getElementById('sn-ok').onclick=function(){api.post('/api/supervisao',{data_servico:document.getElementById('sn-d').value,letra_equipe:document.getElementById('sn-l').value,horario_inicio:document.getElementById('sn-h').value}).then(function(r){toast('Servico aberto!');closeModal('sn');pgSup();setTimeout(function(){supGerenciar(r.data.id);},600);}).catch(function(e){toast(e.message,'er');});};
}
function supEncerrar(id){if(!confirm('Confirmar encerramento do servico?'))return;api.post('/api/supervisao/'+id+'/encerrar',{horario_fim:new Date().toTimeString().slice(0,5)}).then(function(){toast('Servico encerrado!');pgSup();}).catch(function(e){toast(e.message,'er');});}
function supGerenciar(id){
  api.get('/api/supervisao/'+id).then(function(r){SUP.sel=r.data.servico;SUP.eqs=r.data.equipes||[];supRenderGer(id);}).catch(function(e){toast(e.message,'er');});
}
function supRenderGer(id){
  var s=SUP.sel,eqs=SUP.eqs,rdOnly=s.status==='encerrado';
  // Para o prefiltro por letra: filtrar agentes pela letra da equipe
  var letraFiltro=s.letra_equipe;
  var agsFiltrados=SUP.ags.filter(function(a){return !letraFiltro||!a.letra||a.letra===letraFiltro;});
  var vtDisp=SUP.vt.filter(function(v){return v.status==='disponivel';});
  var agsOpts=agsFiltrados.map(function(a){return[a.id,a.nome+' ('+a.funcional+(a.letra?' Eq.'+a.letra+(a.subequipe?' '+a.subequipe:''):'')+')'];});
  var vtOpts=vtDisp.map(function(v){return[v.id,v.prefixo+' - '+v.modelo];});
  var eqsHtml=eqs.map(function(e,i){return '<div class="eq-box"><div class="eq-h">Equipe '+(i+1)+' - '+esc(e.vp||'Sem viatura')+(e.placa?' ('+esc(e.placa)+')':'')+' </div><div class="eq-g"><span>Motorista: <b>'+esc(e.mn||'--')+'</b></span><span>Chefe: <b>'+esc(e.cn||'--')+'</b></span><span>Radio: '+esc(e.numero_radio||'--')+'</span><span>Patr. 2: '+esc(e.p2n||'--')+'</span><span>Patr. 3: '+esc(e.p3n||'--')+'</span><span>Setor: <b>'+esc(e.setor_patrulhamento||'--')+'</b></span></div>'+(e.demandas?'<div style="margin-top:6px;font-size:12px;color:#6b7280"><b>Demandas:</b> '+esc(e.demandas)+'</div>':'')+' </div>';}).join('');
  var addEqHtml=rdOnly?'':('<div class="add-eq-box"><div class="sec">+ ADICIONAR EQUIPE'+(letraFiltro?' (Pre-filtrado: Equipe '+letraFiltro+')':'')+'</div>'+(agsFiltrados.length<SUP.ags.length?'<div class="info">Mostrando '+agsFiltrados.length+' de '+SUP.ags.length+' agentes (filtro: letra '+letraFiltro+'). Para ver todos, abra um servico sem letra ou ajuste os cadastros.</div>':'')+' <div class="fg">'+field('Viatura','<select id="eq-vt"><option value="">Selecione</option>'+selOpts(vtOpts,'')+'</select>')+field('Motorista','<select id="eq-mt"><option value="">Selecione</option>'+selOpts(agsOpts,'')+'</select>')+field('Chefe de guarnicao','<select id="eq-ch"><option value="">Selecione</option>'+selOpts(agsOpts,'')+'</select>')+field('Patrulheiro 2','<select id="eq-p2"><option value="">--</option>'+selOpts(agsOpts,'')+'</select>')+field('Patrulheiro 3','<select id="eq-p3"><option value="">--</option>'+selOpts(agsOpts,'')+'</select>')+field('N do Radio','<input id="eq-rd" placeholder="Ex: GCM-R-07"/>')+field('Setor de patrulhamento','<input id="eq-sp"/>',true)+field('Demandas / Missao','<textarea id="eq-dm"></textarea>',true)+'</div><button class="btn btn-p" id="eq-ok">+ Confirmar equipe</button></div>');
  var body='<div id="eqs-w">'+eqsHtml+'</div>'+addEqHtml+'<div class="sec">OCORRENCIAS DO TURNO</div><textarea id="sp-oc" style="width:100%;margin-bottom:12px" rows="4"'+(rdOnly?' readonly':'')+'>'+esc(s.ocorrencias||'')+'</textarea><div class="sec">INTERCORRENCIAS</div><textarea id="sp-in" style="width:100%;margin-bottom:12px" rows="3"'+(rdOnly?' readonly':'')+'>'+esc(s.intercorrencias||'')+'</textarea><div class="sec">ANOTACOES (ATRASOS, ATESTADOS, FALTAS)</div><textarea id="sp-al" style="width:100%;margin-bottom:14px" rows="3"'+(rdOnly?' readonly':'')+'>'+esc(s.alteracoes||'')+'</textarea>';
  var footer=(!rdOnly?'<button class="btn btn-p" id="sg-sal">Salvar anotacoes</button> ':'')+(!rdOnly&&canEdit('supervisao')?'<button class="btn btn-d" id="sg-enc">Encerrar servico</button> ':'')+' <button class="btn" id="sg-pdf">Livro PDF</button>';
  closeModal('sg');
  openModal('sg','Servico - Equipe '+s.letra_equipe+' - '+fmtDt(s.data_servico),'xl',body,footer);
  if(!rdOnly){
    var eqOk=document.getElementById('eq-ok');
    if(eqOk)eqOk.onclick=function(){api.post('/api/supervisao/'+id+'/equipes',{viatura_id:document.getElementById('eq-vt').value||null,motorista_id:document.getElementById('eq-mt').value||null,chefe_guarnicao_id:document.getElementById('eq-ch').value||null,patrulheiro2_id:document.getElementById('eq-p2').value||null,patrulheiro3_id:document.getElementById('eq-p3').value||null,numero_radio:document.getElementById('eq-rd').value,setor_patrulhamento:document.getElementById('eq-sp').value,demandas:document.getElementById('eq-dm').value}).then(function(){toast('Equipe adicionada!');supGerenciar(id);}).catch(function(e){toast(e.message,'er');});};
    var sal=document.getElementById('sg-sal');
    if(sal)sal.onclick=function(){api.put('/api/supervisao/'+id+'/obs',{ocorrencias:document.getElementById('sp-oc').value,intercorrencias:document.getElementById('sp-in').value,alteracoes:document.getElementById('sp-al').value}).then(function(){toast('Anotacoes salvas!');}).catch(function(e){toast(e.message,'er');});};
    var enc=document.getElementById('sg-enc');
    if(enc&&canEdit('supervisao'))enc.onclick=function(){supEncerrar(id);closeModal('sg');};
  }
  var pdfBtn=document.getElementById('sg-pdf');
  if(pdfBtn)pdfBtn.onclick=function(){supLivro(id);};
}
function supLivro(id){
  api.get('/api/supervisao/'+id).then(function(r){
    var s=r.data.servico,eqs=r.data.equipes||[];
    var dfmt=function(d){try{return new Date(d+'T12:00:00').toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long',year:'numeric'});}catch(e){return d;}};
    var eqsH=eqs.map(function(e,i){return '<div class="eq"><div class="eq-h">Equipe '+(i+1)+' - '+(e.vp||'SEM VIATURA')+(e.placa?' ('+e.placa+')':'')+' </div><div class="eq-g"><span>Motorista: <b>'+(e.mn||'--')+'</b> (func. '+(e.mf||'--')+')</span><span>Chefe: <b>'+(e.cn||'--')+'</b></span><span>Patr. 2: '+(e.p2n||'--')+'</span><span>Patr. 3: '+(e.p3n||'--')+'</span><span>Radio: '+(e.numero_radio||'--')+'</span><span>Setor: <b>'+(e.setor_patrulhamento||'--')+'</b></span></div>'+(e.demandas?'<p style="margin-top:6px;font-size:11px"><b>Demandas:</b> '+e.demandas+'</p>':'')+' </div>';}).join('');
    var html='<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Arial,sans-serif;font-size:12px;padding:20mm 15mm}.hdr{text-align:center;border-bottom:2px solid #000;padding-bottom:10px;margin-bottom:14px}.titulo{font-size:18px;font-weight:700;letter-spacing:2px}.grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;border:1px solid #ccc;padding:10px;border-radius:4px;margin-bottom:14px}.dado{font-size:11px}.dado b{display:block;font-size:9px;color:#555;text-transform:uppercase;margin-bottom:2px}.sec{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#555;border-bottom:1px solid #ccc;padding-bottom:4px;margin:12px 0 8px}.eq{border:1px solid #ccc;border-radius:4px;padding:10px;margin-bottom:8px;page-break-inside:avoid}.eq-h{font-weight:700;color:#1A3A5C;margin-bottom:6px}.eq-g{display:grid;grid-template-columns:1fr 1fr;gap:2px 12px;font-size:11px}.obs{border:1px solid #ccc;padding:8px;min-height:55px;border-radius:4px;font-size:11px;margin-bottom:8px}.assin{display:grid;grid-template-columns:1fr 1fr;gap:60px;margin-top:40px}.al{text-align:center}.al-l{border-top:1px solid #000;padding-top:4px;font-size:11px}@media print{body{padding:10mm}}</style></head><body><div class="hdr"><div class="titulo">GUARDA MUNICIPAL DA SERRA</div><div style="font-size:12px;margin-top:4px">LIVRO DE SERVICO DIARIO - BLUECORE ERP</div></div><div class="grid"><div class="dado"><b>Supervisor</b>'+(s.supervisor_nome||'--')+'</div><div class="dado"><b>Equipe</b>'+s.letra_equipe+'</div><div class="dado"><b>Data</b>'+dfmt(s.data_servico)+'</div><div class="dado"><b>Inicio</b>'+s.horario_inicio+'</div><div class="dado"><b>Termino</b>'+(s.horario_fim||'Em aberto')+'</div><div class="dado"><b>Status</b>'+(s.status==='encerrado'?'Encerrado':'Em servico')+'</div></div><div class="sec">Equipes Escaladas</div>'+(eqsH||'<p>Nenhuma equipe.</p>')+'<div class="sec">Ocorrencias</div><div class="obs">'+(s.ocorrencias||'')+'</div><div class="sec">Intercorrencias</div><div class="obs">'+(s.intercorrencias||'')+'</div><div class="sec">Anotacoes (atrasos, atestados, faltas)</div><div class="obs">'+(s.alteracoes||'')+'</div><div class="assin"><div class="al"><div class="al-l">Supervisor - '+(s.supervisor_nome||'--')+'</div></div><div class="al"><div class="al-l">Comandante / Chefe de Secao</div></div></div></body></html>';
    pdfFromHtml(html,'livro_servico');
  }).catch(function(e){toast(e.message,'er');});
}

// =====================================================================
// ADMINISTRATIVO
// =====================================================================
var ADM={tab:'banco_horas',ags:[],saldosBH:[],movBH:[],auds:[],freq:[],atestados:[],abonos:[],doacoes:[],reposicoes:[],ferias:[],permutas:[],mesAud:'',mesFreq:'',bhAgente:'',bhNome:'',escalaFlt:{letra:'',busca:''}};
function pgAdmin(){
  pc().innerHTML='<div style="color:#9ca3af;padding:20px">Carregando...</div>';
  var now=new Date();
  ADM.mesAud=(now.getMonth()+1).toString().padStart(2,'0')+'/'+now.getFullYear();
  ADM.mesFreq=now.getFullYear()+'-'+(now.getMonth()+1).toString().padStart(2,'0');
  Promise.all([
    api.get('/api/agentes?ativo=true'),
    api.get('/api/admin/banco-horas/saldos'),
    api.get('/api/admin/audiencias?mes='+ADM.mesAud),
    api.get('/api/admin/frequencia?mes_ano='+ADM.mesFreq),
    api.get('/api/admin/atestados?mes_ano='+ADM.mesFreq),
    api.get('/api/admin/abonos?mes_ano='+ADM.mesFreq),
    api.get('/api/admin/doacoes-sangue?mes_ano='+ADM.mesFreq),
    api.get('/api/admin/reposicoes-atestados?mes_ano='+ADM.mesFreq)
  ]).then(function(rs){
    ADM.ags=rs[0].data;ADM.saldosBH=rs[1].data;ADM.auds=rs[2].data;ADM.freq=rs[3].data;
    ADM.atestados=rs[4].data;ADM.abonos=rs[5].data;ADM.doacoes=rs[6].data;ADM.reposicoes=rs[7].data;
    renderAdmin();
  }).catch(function(e){toast(e.message,'er');});
}
function admLoadSubMes(mes){
  ADM.mesFreq=mes;
  return Promise.all([
    api.get('/api/admin/frequencia?mes_ano='+mes),
    api.get('/api/admin/atestados?mes_ano='+mes),
    api.get('/api/admin/abonos?mes_ano='+mes),
    api.get('/api/admin/doacoes-sangue?mes_ano='+mes),
    api.get('/api/admin/reposicoes-atestados?mes_ano='+mes)
  ]).then(function(rs){
    ADM.freq=rs[0].data;ADM.atestados=rs[1].data;ADM.abonos=rs[2].data;ADM.doacoes=rs[3].data;ADM.reposicoes=rs[4].data;
  });
}
function renderAdmin(){
  var html=ph('Administrativo','Gestao de pessoas, banco de horas e frequencia');
  var escAtivos=ADM.ags.filter(function(a){return a.ativo&&a.letra;}).length;
  var tabs=[
    {id:'banco_horas',label:'Banco de Horas',count:ADM.saldosBH.length},
    {id:'audiencias',label:'Audiencias',count:ADM.auds.length},
    {id:'frequencia',label:'Frequencia',count:ADM.freq.length},
    {id:'atestados',label:'Atestados',count:ADM.atestados.length},
    {id:'abono',label:'Abono',count:ADM.abonos.length},
    {id:'doacao',label:'Doacao de Sangue',count:ADM.doacoes.length},
    {id:'escalas',label:'Escalas',count:escAtivos},
    {id:'ferias',label:'Ferias',count:ADM.ferias?ADM.ferias.length:0},
    {id:'permutas',label:'Permutas',count:ADM.permutas?ADM.permutas.filter(function(p){return p.status==='pendente_admin';}).length:0}
  ];
  html+='<div class="tabs" id="adm-tabs">';
  tabs.forEach(function(t){
    html+='<button class="tab'+(ADM.tab===t.id?' on':'')+'" data-tab="'+t.id+'">'
      +t.label
      +'<span style="margin-left:6px;font-size:10px;font-weight:600;opacity:.65">('+t.count+')</span>'
      +'</button>';
  });
  html+='</div><div id="adm-content"></div>';
  pc().innerHTML=html;
  document.getElementById('adm-tabs').onclick=function(e){
    var b=e.target.closest('.tab');if(!b)return;
    ADM.tab=b.dataset.tab;
    document.querySelectorAll('#adm-tabs .tab').forEach(function(t){t.classList.toggle('on',t.dataset.tab===ADM.tab);});
    renderAdminContent();
  };
  renderAdminContent();
}
function agOpts(sel){
  return '<option value="">Selecione...</option>'
    +ADM.ags.map(function(a){return '<option value="'+a.id+'"'+(String(a.id)===String(sel)?' selected':'')+'>['+esc(a.funcional||'--')+'] '+esc(a.qra||'')+' - '+esc(a.nome)+'</option>';}).join('');
}
function bindAgSrch(iid,sid){
  var inp=document.getElementById(iid);var sel=document.getElementById(sid);if(!inp||!sel)return;
  inp.oninput=function(){
    var s=this.value.toLowerCase().trim();var cur=sel.value;
    sel.innerHTML='<option value="">Selecione...</option>'+ADM.ags.filter(function(a){
      return !s||(a.funcional||'').toLowerCase().startsWith(s)||(a.qra||'').toLowerCase().includes(s)||(a.nome||'').toLowerCase().includes(s);
    }).map(function(a){return '<option value="'+a.id+'"'+(String(a.id)===String(cur)?' selected':'')+'>['+esc(a.funcional||'--')+'] '+esc(a.qra||'')+' - '+esc(a.nome)+'</option>';}).join('');
    if(cur)sel.value=cur;
  };
}
function renderAdminContent(){
  var ct=document.getElementById('adm-content');if(!ct)return;
  if(ADM.tab==='banco_horas')ct.innerHTML=renderBancoHoras();
  else if(ADM.tab==='audiencias')ct.innerHTML=renderAudiencias();
  else if(ADM.tab==='frequencia')ct.innerHTML=renderFrequencia();
  else if(ADM.tab==='atestados')ct.innerHTML=renderAtestados();
  else if(ADM.tab==='abono')ct.innerHTML=renderAbonos();
  else if(ADM.tab==='doacao')ct.innerHTML=renderDoacoes();
  else if(ADM.tab==='escalas'){ct.innerHTML=renderEscalas();bindEscalas();return;}
  else if(ADM.tab==='ferias'){ct.innerHTML=renderFerias();bindFerias();return;}
  else if(ADM.tab==='permutas'){ct.innerHTML=renderPermutas();bindPermutas();return;}
  bindAdminContent();
}
function bindAdminContent(){
  // Toggles expansores (padrao armaria) — onReveal re-aplica handlers internos
  bindSectionToggle('bh-tog','bh-list',bindBHList);
  bindSectionToggle('aud-tog','aud-table',bindAudTable);
  bindSectionToggle('frq-tog','frq-table',bindFreqTable);
  bindSectionToggle('ate-tog','ate-table',bindAteTable);
  bindSectionToggle('abo-tog','abo-table',bindAboTable);
  bindSectionToggle('ds-tog','ds-table',bindDsTable);
  bindSectionToggle('rep-ate-tog','rep-ate-table',bindRepAtestados);
  // ── Banco de Horas
  var bhNv=document.getElementById('bh-novo');if(bhNv)bhNv.onclick=bhNovoModal;
  var bhRel=document.getElementById('bh-rel');if(bhRel)bhRel.onclick=bhRelatorioModal;
  bindBHList();
  var bhSrch=document.getElementById('bh-srch');
  var bhSetorFlt=document.getElementById('bh-setor-flt');
  var bhSaldoFlt=document.getElementById('bh-saldo-flt');
  var bhApplyFilter=function(){
    var srch=bhSrch?bhSrch.value.toLowerCase():'';
    var setor=bhSetorFlt?bhSetorFlt.value:'';
    var saldoF=bhSaldoFlt?bhSaldoFlt.value:'';
    var filtered=ADM.saldosBH.filter(function(a){
      if(srch&&!(a.nome||'').toLowerCase().includes(srch)&&!(a.qra||'').toLowerCase().includes(srch)&&!(a.funcional||'').toLowerCase().includes(srch))return false;
      if(setor&&a.setor!==setor)return false;
      var s=parseFloat(a.saldo||0);
      if(saldoF==='credor'&&s<=0)return false;
      if(saldoF==='devedor'&&s>=0)return false;
      if(saldoF==='zerado'&&s!==0)return false;
      return true;
    });
    var list=document.getElementById('bh-list');if(list)list.innerHTML=renderBHList(filtered);
    bindBHList();
  };
  if(bhSrch)bhSrch.oninput=bhApplyFilter;
  if(bhSetorFlt)bhSetorFlt.onchange=bhApplyFilter;
  if(bhSaldoFlt)bhSaldoFlt.onchange=bhApplyFilter;
  // ── Audiencias
  var audMes=document.getElementById('aud-mes-flt');
  if(audMes)audMes.onchange=function(){
    ADM.mesAud=this.value;
    api.get('/api/admin/audiencias?mes='+ADM.mesAud).then(function(r){
      ADM.auds=r.data;ADM.audsFiltered=r.data;
      var t=document.getElementById('aud-table');if(t){t.innerHTML=renderAudTable(ADM.auds);bindAudTable();}
    }).catch(function(e){toast(e.message,'er');});
  };
  var audApplyFilter=function(){
    var srch=document.getElementById('aud-srch');srch=srch?srch.value.toLowerCase():'';
    var infFlt=document.getElementById('aud-inf-flt');infFlt=infFlt?infFlt.value:'';
    var filtered=ADM.auds.filter(function(a){
      if(srch&&!(a.agente_nome||'').toLowerCase().includes(srch)&&!(a.qra||'').toLowerCase().includes(srch)&&!(a.numero_processo||'').toLowerCase().includes(srch))return false;
      if(infFlt==='1'&&!a.informado)return false;
      if(infFlt==='0'&&a.informado)return false;
      return true;
    });
    var t=document.getElementById('aud-table');if(t){t.innerHTML=renderAudTable(filtered);bindAudTable();}
  };
  var audSrch=document.getElementById('aud-srch');if(audSrch)audSrch.oninput=audApplyFilter;
  var audInfFlt=document.getElementById('aud-inf-flt');if(audInfFlt)audInfFlt.onchange=audApplyFilter;
  var audNv=document.getElementById('aud-novo');if(audNv)audNv.onclick=function(){audModal(null);};
  var audRel=document.getElementById('aud-rel');if(audRel)audRel.onclick=audRelatorioModal;
  bindAudTable();
  // ── Frequencia
  var frqMes=document.getElementById('frq-mes-flt');
  if(frqMes)frqMes.onchange=function(){
    ADM.mesFreq=this.value;
    api.get('/api/admin/frequencia?mes_ano='+ADM.mesFreq).then(function(r){
      ADM.freq=r.data;
      var t=document.getElementById('frq-table');if(t){t.innerHTML=renderFreqTable(ADM.freq);bindFreqTable();}
      var sm=document.getElementById('frq-summary');if(sm)sm.innerHTML=renderFreqSummary(ADM.freq);
    }).catch(function(e){toast(e.message,'er');});
  };
  var frqApplyFilter=function(){
    var srch=document.getElementById('frq-srch');srch=srch?srch.value.toLowerCase():'';
    var setor=document.getElementById('frq-setor-flt');setor=setor?setor.value:'';
    var filtered=ADM.freq.filter(function(f){
      if(srch&&!(f.agente_nome||'').toLowerCase().includes(srch)&&!(f.qra||'').toLowerCase().includes(srch)&&!(f.setor||'').toLowerCase().includes(srch))return false;
      if(setor&&f.setor!==setor)return false;
      return true;
    });
    var t=document.getElementById('frq-table');if(t){t.innerHTML=renderFreqTable(filtered);bindFreqTable();}
  };
  var frqSrch=document.getElementById('frq-srch');if(frqSrch)frqSrch.oninput=frqApplyFilter;
  var frqSetorFlt=document.getElementById('frq-setor-flt');if(frqSetorFlt)frqSetorFlt.onchange=frqApplyFilter;
  var frqNv=document.getElementById('frq-novo');if(frqNv)frqNv.onclick=function(){freqModal(null);};
  bindFreqTable();
  // ── Atestados
  var ateNv=document.getElementById('ate-novo');if(ateNv)ateNv.onclick=function(){ateModal(null);};
  var ateRel=document.getElementById('ate-rel');if(ateRel)ateRel.onclick=ateRelatorioModal;
  var repAteRel=document.getElementById('rep-ate-rel');if(repAteRel)repAteRel.onclick=repAtestadosRelatorioModal;
  var ateMes=document.getElementById('ate-mes-flt');
  if(ateMes)ateMes.onchange=function(){
    admLoadSubMes(this.value).then(function(){
      var t=document.getElementById('ate-table');if(t){t.innerHTML=renderAteTable(ADM.atestados);bindAteTable();}
      var sm=document.getElementById('ate-summary');if(sm)sm.innerHTML=renderAteSummary(ADM.atestados);
      var rb=document.getElementById('rep-ate-body');if(rb)rb.innerHTML=renderRepAtestados(ADM.reposicoes);
      var tog=document.getElementById('rep-ate-tog');
      if(tog){var badge=tog.querySelector('span:last-child');if(badge)badge.innerHTML=bdg(ADM.reposicoes.length+' registro'+(ADM.reposicoes.length!==1?'s':''),'blue');}
      bindRepAtestados();
    });
  };
  var ateSrch=document.getElementById('ate-srch');
  var ateTipoFlt=document.getElementById('ate-tipo-flt');
  var ateRepFlt=document.getElementById('ate-rep-flt');
  var ateApplyFilter=function(){
    var s=ateSrch?ateSrch.value.toLowerCase():'';
    var tp=ateTipoFlt?ateTipoFlt.value:'';
    var rp=ateRepFlt?ateRepFlt.value:'';
    var filtered=ADM.atestados.filter(function(a){
      if(s&&!(a.agente_nome||'').toLowerCase().includes(s)&&!(a.qra||'').toLowerCase().includes(s)&&!(a.funcional||'').toLowerCase().includes(s))return false;
      if(tp&&a.tipo!==tp)return false;
      if(rp==='pend'&&!(a.tipo==='comum'&&parseInt(a.reposicoes_feitas||0)<parseInt(a.dias||0)))return false;
      if(rp==='ok'&&!(a.tipo==='cat'||(a.tipo==='comum'&&parseInt(a.reposicoes_feitas||0)>=parseInt(a.dias||0))))return false;
      return true;
    });
    var t=document.getElementById('ate-table');if(t){t.innerHTML=renderAteTable(filtered);bindAteTable();}
  };
  if(ateSrch)ateSrch.oninput=ateApplyFilter;
  if(ateTipoFlt)ateTipoFlt.onchange=ateApplyFilter;
  if(ateRepFlt)ateRepFlt.onchange=ateApplyFilter;
  bindAteTable();
  // ── Abono
  var aboNv=document.getElementById('abo-novo');if(aboNv)aboNv.onclick=function(){abonoModal(null);};
  var aboMes=document.getElementById('abo-mes-flt');
  if(aboMes)aboMes.onchange=function(){
    admLoadSubMes(this.value).then(function(){
      var t=document.getElementById('abo-table');if(t){t.innerHTML=renderAboTable(ADM.abonos);bindAboTable();}
    });
  };
  var aboRel=document.getElementById('abo-rel');if(aboRel)aboRel.onclick=function(){aboRelatorioModal();};
  bindAboTable();
  // ── Doacao de Sangue
  var dsNv=document.getElementById('ds-novo');if(dsNv)dsNv.onclick=function(){doacaoModal(null);};
  var dsMes=document.getElementById('ds-mes-flt');
  if(dsMes)dsMes.onchange=function(){
    admLoadSubMes(this.value).then(function(){
      var t=document.getElementById('ds-table');if(t){t.innerHTML=renderDsTable(ADM.doacoes);bindDsTable();}
    });
  };
  var dsRel=document.getElementById('ds-rel');if(dsRel)dsRel.onclick=function(){dsRelatorioModal();};
  bindDsTable();
}
function bindBHList(){
  var list=document.getElementById('bh-list');if(!list)return;
  list.onclick=function(e){
    var btnNovo=e.target.closest('[data-bh-novo]');
    if(btnNovo){
      e.stopPropagation();
      ADM.bhAgente=btnNovo.dataset.bhId;
      ADM.bhNome=btnNovo.dataset.bhNome;
      bhNovoModal();return;
    }
    var row=e.target.closest('.bh-ag-row');if(!row)return;
    var id=row.dataset.bhId;
    var extRow=document.getElementById('bh-ext-'+id);
    var arr=document.getElementById('bh-arr-'+id);
    if(!extRow)return;
    if(extRow.style.display==='none'||extRow.style.display===''){
      // close others
      document.querySelectorAll('tr[id^="bh-ext-"]').forEach(function(r){if(r.id!=='bh-ext-'+id){r.style.display='none';}});
      document.querySelectorAll('[id^="bh-arr-"]').forEach(function(a){if(a.id!=='bh-arr-'+id)a.textContent='▶';});
      extRow.style.display='table-row';
      if(arr)arr.textContent='▼';
      var content=document.getElementById('bh-ext-c-'+id);
      if(content)content.innerHTML='<div style="color:#9ca3af;font-size:12px">Carregando extrato...</div>';
      api.get('/api/admin/banco-horas?agente_id='+id).then(function(r){
        if(content){
          var ag=ADM.saldosBH.find(function(x){return String(x.id)===String(id);});
          var saldo=parseFloat(r.saldo||0);
          var agUpdate=ADM.saldosBH.find(function(x){return String(x.id)===String(id);});
          if(agUpdate){agUpdate.saldo=saldo;}
          var header='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;flex-wrap:wrap;gap:8px">'
            +'<span style="font-weight:600;font-size:13px">Extrato: '+(ag?esc(ag.nome):'')+'</span>'
            +'<div style="display:flex;align-items:center;gap:10px">'
            +renderBHSaldoInline(saldo)
            +'<button class="btn btn-sm" id="bh-ext-all-'+id+'">Ver todos</button>'
            +'</div></div>';
          content.innerHTML=header+(r.data.length?renderBHTableCompact(r.data):'<div class="empty" style="padding:8px">Sem lancamentos.</div>');
          var btnAll=document.getElementById('bh-ext-all-'+id);
          if(btnAll){
            var expanded=false;
            btnAll.onclick=function(ev){
              ev.stopPropagation();
              expanded=!expanded;
              btnAll.textContent=expanded?'Compacto':'Ver todos';
              var tbl=content.querySelector('.bh-ext-tbl');
              if(tbl)tbl.style.display=expanded?'':'none';
              var compact=content.querySelector('.bh-compact');
              if(compact)compact.style.display=expanded?'none':'';
            };
          }
        }
      }).catch(function(e){if(content)content.innerHTML='<div style="color:#dc2626;font-size:12px">Erro: '+e.message+'</div>';});
    } else {
      extRow.style.display='none';
      if(arr)arr.textContent='▶';
    }
  };
}

// helper: botao expansor estilo armaria
function admToggleBtn(id, label, count){
  return '<button id="'+id+'" style="width:100%;text-align:left;background:#fff;border:1px solid #e2e8f0;border-left:4px solid #1A3A5C;border-radius:0 8px 8px 0;padding:12px 16px;display:flex;align-items:center;gap:10px;cursor:pointer;margin-bottom:8px;font-family:inherit;box-shadow:0 1px 3px rgba(0,0,0,.04)">'
    +'<span id="'+id+'-arr" style="font-size:10px;color:#1A3A5C">&#9654;</span>'
    +'<span style="font-size:12px;font-weight:700;color:#1A3A5C;text-transform:uppercase;letter-spacing:.6px;flex:1">'+label+'</span>'
    +'<span>'+bdg(count+' registro'+(count!==1?'s':''),'blue')+'</span>'
    +'</button>';
}
function bindSectionToggle(btnId, tblId, onReveal){
  var btn=document.getElementById(btnId);
  var tbl=document.getElementById(tblId);
  if(!btn||!tbl)return;
  btn.onclick=function(){
    var isHidden=tbl.style.display==='none';
    tbl.style.display=isHidden?'':'none';
    var arr=document.getElementById(btnId+'-arr');
    if(arr)arr.innerHTML=isHidden?'&#9660;':'&#9654;';
    if(isHidden&&onReveal)onReveal();
  };
}

// ── BANCO DE HORAS
function renderBancoHoras(){
  var credores=ADM.saldosBH.filter(function(a){return parseFloat(a.saldo||0)>0;});
  var devedores=ADM.saldosBH.filter(function(a){return parseFloat(a.saldo||0)<0;});
  var totCred=credores.reduce(function(s,a){return s+parseFloat(a.saldo||0);},0);
  var totDev=devedores.reduce(function(s,a){return s+parseFloat(a.saldo||0);},0);
  var html='<div class="adm-sh">'
    +'<div><div class="adm-sh-title">Banco de Horas</div><div class="adm-sh-sub">Saldos e lancamentos por agente</div></div>'
    +'<div class="adm-sh-acts"><button class="btn" id="bh-rel">Relatorio PDF</button><button class="btn btn-p" id="bh-novo">+ Novo Lancamento</button></div>'
    +'</div>';
  html+='<div class="kgrid" style="grid-template-columns:repeat(4,1fr)">';
  html+='<div class="kc" style="border-top:3px solid #1A3A5C"><div class="kl">Total de Agentes</div><div class="kv">'+ADM.saldosBH.length+'</div><div class="ks">com banco ativo</div></div>';
  html+='<div class="kc" style="border-top:3px solid #16a34a"><div class="kl">Credores</div><div class="kv" style="color:#16a34a">'+credores.length+'</div><div class="ks">saldo positivo ('+totCred.toFixed(1)+'h)</div></div>';
  html+='<div class="kc" style="border-top:3px solid #dc2626"><div class="kl">Devedores</div><div class="kv" style="color:#dc2626">'+devedores.length+'</div><div class="ks">saldo negativo ('+totDev.toFixed(1)+'h)</div></div>';
  html+='<div class="kc" style="border-top:3px solid #9ca3af"><div class="kl">Zerados</div><div class="kv" style="color:#6b7280">'+(ADM.saldosBH.length-credores.length-devedores.length)+'</div><div class="ks">sem saldo</div></div>';
  html+='</div>';
  var setores=[].concat.apply([],ADM.saldosBH.map(function(a){return a.setor||'';})).filter(function(v,i,a){return v&&a.indexOf(v)===i;}).sort();
  html+='<div class="flt-bar">';
  html+='<input id="bh-srch" placeholder="Buscar por nome, QRA ou funcional..." style="flex:2;min-width:200px"/>';
  html+='<select id="bh-setor-flt" style="min-width:160px"><option value="">Todos os setores</option>'+setores.map(function(s){return '<option value="'+s+'">'+s+'</option>';}).join('')+'</select>';
  html+='<select id="bh-saldo-flt" style="min-width:140px"><option value="">Todos os saldos</option><option value="credor">Credores</option><option value="devedor">Devedores</option><option value="zerado">Zerados</option></select>';
  html+='</div>';
  html+=admToggleBtn('bh-tog','Extrato de Agentes e Movimentacoes',ADM.saldosBH.length);
  html+='<div id="bh-list" style="display:none">'+renderBHList(ADM.saldosBH)+'</div>';
  return html;
}
function renderBHList(data){
  if(!data.length)return '<div class="empty">Nenhum agente encontrado com os filtros aplicados.</div>';
  var rows=data.map(function(a){
    var s=parseFloat(a.saldo||0);
    var cor=s>0?'#16a34a':s<0?'#dc2626':'#6b7280';
    var bgSaldo=s>0?'#f0fdf4':s<0?'#fef2f2':'transparent';
    return '<tr class="bh-ag-row" data-bh-id="'+a.id+'" style="cursor:pointer">'
      +'<td style="width:20px;color:#9ca3af;font-size:12px" id="bh-arr-'+a.id+'">▶</td>'
      +'<td>'+bdg(a.qra||'--','blue')+'</td>'
      +'<td><div style="font-weight:500">'+esc(a.nome)+'</div><div style="font-size:10px;color:#9ca3af">'+esc(a.funcional||'')+'</div></td>'
      +'<td style="font-size:12px;color:#6b7280">'+esc(a.setor||'--')+'</td>'
      +'<td style="background:'+bgSaldo+';border-radius:6px;padding:4px 8px"><span style="font-size:16px;font-weight:700;color:'+cor+'">'+(s>=0?'+':'')+s.toFixed(1)+'h</span></td>'
      +'<td style="font-size:11px;color:#9ca3af">'+a.total_lancamentos+' mov.</td>'
      +'<td><button class="btn btn-sm" data-bh-novo="'+a.id+'" data-bh-nome="'+esc(a.nome)+'">+ Lancar</button></td>'
      +'</tr>'
      +'<tr id="bh-ext-'+a.id+'" style="display:none"><td colspan="7" style="padding:0"><div id="bh-ext-c-'+a.id+'" style="padding:12px 20px 16px;background:#f8fafc;border-top:1px solid #f3f4f6"></div></td></tr>';
  }).join('');
  return '<table><thead><tr><th></th><th>QRA</th><th>Nome</th><th>Setor</th><th>Saldo</th><th>Movimentos</th><th></th></tr></thead><tbody>'+rows+'</tbody></table>';
}
function renderBHSaldo(saldo){
  if(saldo===null||saldo===undefined)return '';
  var s=parseFloat(saldo||0);
  var cor=s>0?'#16a34a':s<0?'#dc2626':'#6b7280';
  return '<div style="background:#fff;border:2px solid '+cor+';border-radius:10px;padding:12px 20px;margin-bottom:14px;display:flex;align-items:center;gap:20px">'
    +'<div><div style="font-size:11px;color:#6b7280">Saldo total do agente</div><div style="font-size:28px;font-weight:700;color:'+cor+'">'+(s>=0?'+':'')+s.toFixed(1)+' h</div></div>'
    +'<div style="font-size:12px;color:#6b7280">'+(s>0?'Credor: '+s.toFixed(1)+'h de banco':s<0?'Devedor: '+Math.abs(s).toFixed(1)+'h':'Zerado')+'</div>'
    +'</div>';
}
function renderBHSaldoInline(saldo){
  var s=parseFloat(saldo||0);
  var cor=s>0?'#16a34a':s<0?'#dc2626':'#6b7280';
  return '<span style="font-size:20px;font-weight:700;color:'+cor+';background:'+(s>0?'#f0fdf4':s<0?'#fef2f2':'#f3f4f6')+';padding:4px 12px;border-radius:8px">'+(s>=0?'+':'')+s.toFixed(1)+'h</span>';
}
function renderBHTableCompact(movs){
  var compactRows=movs.slice(0,10).map(function(m){
    var tipo=m.tipo==='entrada'?'<span class="bdg b-green">+'+parseFloat(m.quantidade_horas).toFixed(1)+'h</span>':'<span class="bdg b-red">-'+parseFloat(m.quantidade_horas).toFixed(1)+'h</span>';
    var ref=m.numero_processo||m.numero_bu||m.numero_ci||'--';
    var dtMot=m.data_motivo?'<div style="font-size:10px;color:#9ca3af">Evento: '+fmtDt(m.data_motivo)+'</div>':'';
    return '<tr><td style="font-size:11px">'+fmtDt(m.data_lancamento)+dtMot+'</td><td>'+tipo+'</td><td style="font-size:12px">'+esc(m.motivo)+'</td><td style="font-size:11px;font-family:monospace;color:#9ca3af">'+esc(ref)+'</td><td style="font-size:11px;color:#9ca3af">'+esc(m.responsavel_nome||'')+'</td><td style="font-size:11px;color:#9ca3af">'+esc(m.observacoes||'')+'</td></tr>';
  }).join('');
  var allRows=movs.map(function(m){
    var tipo=m.tipo==='entrada'?'<span class="bdg b-green">+'+parseFloat(m.quantidade_horas).toFixed(1)+'h</span>':'<span class="bdg b-red">-'+parseFloat(m.quantidade_horas).toFixed(1)+'h</span>';
    var ref=m.numero_processo||m.numero_bu||m.numero_ci||'--';
    var dtMot=m.data_motivo?'<div style="font-size:10px;color:#9ca3af">Evento: '+fmtDt(m.data_motivo)+'</div>':'';
    return '<tr><td style="font-size:11px">'+fmtDt(m.data_lancamento)+dtMot+'</td><td>'+tipo+'</td><td style="font-size:12px">'+esc(m.motivo)+'</td><td style="font-size:11px;font-family:monospace;color:#9ca3af">'+esc(ref)+'</td><td style="font-size:11px;color:#9ca3af">'+esc(m.responsavel_nome||'')+'</td><td style="font-size:11px;color:#9ca3af">'+esc(m.observacoes||'')+'</td></tr>';
  }).join('');
  var thead='<thead><tr><th>Lancamento / Evento</th><th>Tipo</th><th>Motivo</th><th>Referencia</th><th>Responsavel</th><th>Obs</th></tr></thead>';
  return '<div class="bh-compact" style="max-height:200px;overflow-y:auto;border-radius:6px;border:1px solid #e5e7eb">'
    +'<table style="font-size:12px">'+thead+'<tbody>'+compactRows+'</tbody></table>'
    +(movs.length>10?'<div style="padding:4px 10px;font-size:10px;color:#9ca3af;background:#f9fafb">Mostrando 10 de '+movs.length+' lancamentos. Use "Ver todos" acima.</div>':'')
    +'</div>'
    +'<div class="bh-ext-tbl" style="display:none;max-height:320px;overflow-y:auto;border-radius:6px;border:1px solid #e5e7eb;margin-top:6px">'
    +'<table style="font-size:12px">'+thead+'<tbody>'+allRows+'</tbody></table>'
    +'</div>';
}
function renderBHTable(movs){
  if(!movs.length)return '<div class="empty">Selecione um agente para ver o extrato completo.</div>';
  return tableHtml(['Dt. Lancamento','Dt. Evento','Agente','Tipo','Motivo','Referencia','Horas','Responsavel'],
    movs.map(function(m){
      var tipo=m.tipo==='entrada'?'<span class="bdg b-green">+ Entrada</span>':'<span class="bdg b-red">- Saida</span>';
      var ref=m.numero_processo||m.numero_bu||m.numero_ci||'--';
      return '<tr><td style="font-size:11px">'+fmtDt(m.data_lancamento)+'</td>'
        +'<td style="font-size:11px">'+(m.data_motivo?fmtDt(m.data_motivo):'<span style="color:#d1d5db">--</span>')+'</td>'
        +'<td>'+esc(m.qra||'')+' '+esc(m.agente_nome||'')+'</td>'
        +'<td>'+tipo+'</td><td>'+esc(m.motivo)+'</td>'
        +'<td style="font-size:11px;font-family:monospace">'+esc(ref)+'</td>'
        +'<td style="font-weight:600">'+(m.tipo==='entrada'?'+':'-')+parseFloat(m.quantidade_horas).toFixed(1)+'h</td>'
        +'<td>'+esc(m.responsavel_nome||'--')+'</td></tr>';
    })
  );
}
function bhNovoModal(){
  var today=new Date().toISOString().substring(0,10);
  var body='<div class="fg">'
    +'<div class="f1 full"><label>Buscar agente (funcional, QRA ou nome)</label><input id="bhn-ag-s" placeholder="Digite funcional, QRA ou nome..." style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:7px 10px;font-size:13px;font-family:inherit"/></div>'
    +'<div class="f1 full"><label>Agente</label><select id="bhn-ag">'+agOpts(ADM.bhAgente)+'</select></div>'
    +'<div class="f1"><label>Tipo</label><select id="bhn-tipo"><option value="entrada">Entrada (+ horas)</option><option value="saida">Saida (dispensa)</option></select></div>'
    +'<div class="f1"><label>Motivo</label><select id="bhn-motivo"><option value="Banco de Horas">Banco de Horas (Processo)</option><option value="Ocorrencia">Ocorrencia (B.U.)</option><option value="Outros">Outros (C.I.)</option><option value="Solicitacao de Dispensa">Solicitacao de Dispensa</option></select></div>'
    +'<div class="f1"><label>Data do Evento / Ocorrencia</label><input type="date" id="bhn-dmot" value="'+today+'"/></div>'
    +'<div class="f1"><label>Data do Lancamento</label><input type="date" id="bhn-data" value="'+today+'"/></div>'
    +'<div class="f1"><label>Quantidade de Horas</label><input type="number" id="bhn-horas" min="0.5" step="0.5" placeholder="Ex: 4"/></div>'
    +'<div class="f1"><label>Nr Processo / B.U. / C.I.</label><input id="bhn-ref" placeholder="Numero de referencia"/></div>'
    +'<div class="f1 full"><label>Observacoes</label><textarea id="bhn-obs"></textarea></div>'
    +'</div>';
  var footer='<button class="btn" id="bhn-c">Cancelar</button><button class="btn btn-p" id="bhn-ok">Lancar</button>';
  openModal('bhn','Novo Lancamento - Banco de Horas','md',body,footer);
  bindAgSrch('bhn-ag-s','bhn-ag');
  document.getElementById('bhn-c').onclick=function(){closeModal('bhn');};
  document.getElementById('bhn-ok').onclick=function(){
    var ag=document.getElementById('bhn-ag').value;
    var tipo=document.getElementById('bhn-tipo').value;
    var motivo=document.getElementById('bhn-motivo').value;
    var data=document.getElementById('bhn-data').value;
    var dmot=document.getElementById('bhn-dmot').value;
    var horas=document.getElementById('bhn-horas').value;
    var ref=document.getElementById('bhn-ref').value;
    var obs=document.getElementById('bhn-obs').value;
    if(!ag||!tipo||!motivo||!data||!horas)return toast('Preencha todos os campos obrigatorios','er');
    var payload={agente_id:ag,tipo:tipo,motivo:motivo,data_lancamento:data,data_motivo:dmot||null,quantidade_horas:horas,observacoes:obs};
    if(tipo==='entrada'&&motivo==='Banco de Horas')payload.numero_processo=ref;
    else if(tipo==='entrada'&&motivo==='Ocorrencia')payload.numero_bu=ref;
    else if(tipo==='entrada'&&motivo==='Outros')payload.numero_ci=ref;
    else payload.numero_processo=ref;
    api.post('/api/admin/banco-horas',payload).then(function(){
      toast('Lancamento registrado!');closeModal('bhn');
      api.get('/api/admin/banco-horas/saldos').then(function(r){
        ADM.saldosBH=r.data;
        var list=document.getElementById('bh-list');
        if(list){list.innerHTML=renderBHList(ADM.saldosBH);bindBHList();}
        var bhSrch=document.getElementById('bh-srch');
        if(bhSrch&&bhSrch.value){bhSrch.oninput&&bhSrch.oninput();}
      });
    }).catch(function(e){toast(e.message,'er');});
  };
}

function bhRelatorioModal(){
  var now=new Date();
  var meses=[];
  for(var i=0;i<24;i++){
    var d=new Date(now.getFullYear(),now.getMonth()-i,1);
    var yy=d.getFullYear();var mm=(d.getMonth()+1).toString().padStart(2,'0');
    meses.push([yy+'-'+mm,mm+'/'+yy]);
  }
  var setores=[].concat.apply([],ADM.ags.map(function(a){return a.setor||'';})).filter(function(v,i,a){return v&&a.indexOf(v)===i;}).sort();
  var body='<div class="fg">'
    +'<div class="f1 full"><label>Buscar agente (funcional, QRA ou nome)</label><input id="bhr-ag-s" placeholder="Todos os agentes (deixe em branco)" style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:7px 10px;font-size:13px;font-family:inherit"/></div>'
    +'<div class="f1 full"><label>Agente (opcional)</label><select id="bhr-ag"><option value="">Todos os agentes</option>'+agOpts('')+'</select></div>'
    +'<div class="f1"><label>Tipo</label><select id="bhr-tipo"><option value="">Entrada e Saida</option><option value="entrada">Entrada</option><option value="saida">Saida</option></select></div>'
    +'<div class="f1"><label>Setor</label><select id="bhr-setor"><option value="">Todos os setores</option>'+setores.map(function(s){return '<option value="'+s+'">'+s+'</option>';}).join('')+'</select></div>'
    +'<div class="f1"><label>Data Evento - De</label><input type="date" id="bhr-di"/></div>'
    +'<div class="f1"><label>Data Evento - Ate</label><input type="date" id="bhr-df"/></div>'
    +'<div class="f1 full" style="display:flex;align-items:center;gap:8px;padding:8px 0">'
      +'<input type="checkbox" id="bhr-movs" checked style="width:16px;height:16px;cursor:pointer"/>'
      +'<label for="bhr-movs" style="cursor:pointer;font-weight:500">Incluir extrato detalhado de movimentacoes no PDF</label>'
    +'</div>'
    +'</div>';
  var footer='<button class="btn" id="bhr-c">Cancelar</button><button class="btn btn-p" id="bhr-ok">Gerar Relatorio</button>';
  openModal('bhr','Relatorio - Banco de Horas','md',body,footer);
  bindAgSrch('bhr-ag-s','bhr-ag');
  document.getElementById('bhr-c').onclick=function(){closeModal('bhr');};
  document.getElementById('bhr-ok').onclick=function(){
    var agId=document.getElementById('bhr-ag').value;
    var tipo=document.getElementById('bhr-tipo').value;
    var setor=document.getElementById('bhr-setor').value;
    var di=document.getElementById('bhr-di').value;
    var df=document.getElementById('bhr-df').value;
    var inclMovs=document.getElementById('bhr-movs').checked;
    var params=[];
    if(agId)params.push('agente_id='+agId);
    if(tipo)params.push('tipo='+tipo);
    if(setor)params.push('setor='+encodeURIComponent(setor));
    if(di)params.push('data_inicio='+di);
    if(df)params.push('data_fim='+df);
    var qs=params.length?'?'+params.join('&'):'';
    api.get('/api/admin/banco-horas'+qs).then(function(r){
      closeModal('bhr');
      var movs=r.data||[];
      var agNm=agId?(ADM.ags.find(function(a){return String(a.id)===String(agId);})||{}).nome||'':'Todos os agentes';
      var tipoNm=tipo?tipo.charAt(0).toUpperCase()+tipo.slice(1):'Entrada e Saida';
      var setorNm=setor?setor:'Todos os setores';
      var periodoNm=(di||'--')+' ate '+(df||'--');
      var totalE=0;var totalS=0;
      movs.forEach(function(m){if(m.tipo==='entrada')totalE+=parseFloat(m.quantidade_horas||0);else totalS+=parseFloat(m.quantidade_horas||0);});
      var saldoRel=totalE-totalS;
      var rows=movs.map(function(m){
        var ref=m.numero_processo||m.numero_bu||m.numero_ci||'--';
        var cor=m.tipo==='entrada'?'#16a34a':'#dc2626';
        return '<tr><td>'+fmtDt(m.data_lancamento)+'</td><td>'+(m.data_motivo?fmtDt(m.data_motivo):'--')+'</td>'
          +'<td>'+esc(m.funcional||'--')+'</td><td>'+esc(m.agente_nome||'')+'</td><td>'+esc(m.setor||'--')+'</td>'
          +'<td style="color:'+cor+'"><b>'+(m.tipo==='entrada'?'+':'-')+parseFloat(m.quantidade_horas||0).toFixed(1)+'h</b></td>'
          +'<td>'+esc(m.motivo||'')+'</td><td>'+esc(ref)+'</td><td>'+esc(m.responsavel_nome||'--')+'</td>'
          +'<td style="font-size:11px;color:#6b7280">'+esc(m.observacoes||'')+'</td></tr>';
      }).join('');
      var html='<div style="font-family:Arial,sans-serif;font-size:13px;max-width:1000px;margin:0 auto;padding:20px">'
        +'<div style="text-align:center;margin-bottom:18px"><h2 style="margin:0;color:#1e3a5f">RELATORIO - BANCO DE HORAS</h2>'
        +'<div style="color:#6b7280;font-size:12px">Gerado em: '+new Date().toLocaleString('pt-BR')+'</div></div>'
        +'<table style="width:100%;border-collapse:collapse;margin-bottom:14px">'
        +'<tr><td style="padding:4px 8px;border:1px solid #e5e7eb"><b>Agente:</b></td><td style="padding:4px 8px;border:1px solid #e5e7eb">'+esc(agNm)+'</td>'
        +'<td style="padding:4px 8px;border:1px solid #e5e7eb"><b>Tipo:</b></td><td style="padding:4px 8px;border:1px solid #e5e7eb">'+esc(tipoNm)+'</td></tr>'
        +'<tr><td style="padding:4px 8px;border:1px solid #e5e7eb"><b>Setor:</b></td><td style="padding:4px 8px;border:1px solid #e5e7eb">'+esc(setorNm)+'</td>'
        +'<td style="padding:4px 8px;border:1px solid #e5e7eb"><b>Periodo:</b></td><td style="padding:4px 8px;border:1px solid #e5e7eb">'+esc(periodoNm)+'</td></tr>'
        +'</table>'
        +'<div style="display:flex;gap:16px;margin-bottom:14px">'
        +'<div style="flex:1;padding:10px;border:2px solid #16a34a;border-radius:8px;text-align:center"><div style="font-size:11px;color:#6b7280">TOTAL ENTRADAS</div><div style="font-size:22px;font-weight:700;color:#16a34a">'+totalE.toFixed(1)+'h</div></div>'
        +'<div style="flex:1;padding:10px;border:2px solid #dc2626;border-radius:8px;text-align:center"><div style="font-size:11px;color:#6b7280">TOTAL SAIDAS</div><div style="font-size:22px;font-weight:700;color:#dc2626">'+totalS.toFixed(1)+'h</div></div>'
        +'<div style="flex:1;padding:10px;border:2px solid '+(saldoRel>=0?'#2563eb':'#ca8a04')+';border-radius:8px;text-align:center"><div style="font-size:11px;color:#6b7280">SALDO</div><div style="font-size:22px;font-weight:700;color:'+(saldoRel>=0?'#2563eb':'#ca8a04')+'">'+(saldoRel>=0?'+':'')+saldoRel.toFixed(1)+'h</div></div>'
        +'<div style="flex:1;padding:10px;border:2px solid #6b7280;border-radius:8px;text-align:center"><div style="font-size:11px;color:#6b7280">LANCAMENTOS</div><div style="font-size:22px;font-weight:700;color:#374151">'+movs.length+'</div></div>'
        +'</div>'
        +(inclMovs
          ?'<table style="width:100%;border-collapse:collapse;font-size:11px">'
            +'<thead><tr style="background:#1e3a5f;color:#fff"><th style="padding:6px 8px;text-align:left">Dt.Lancamento</th><th style="padding:6px 8px;text-align:left">Dt.Evento</th><th style="padding:6px 8px;text-align:left">Funcional</th><th style="padding:6px 8px;text-align:left">Agente</th><th style="padding:6px 8px;text-align:left">Setor</th><th style="padding:6px 8px;text-align:right">Horas</th><th style="padding:6px 8px;text-align:left">Motivo</th><th style="padding:6px 8px;text-align:left">Referencia</th><th style="padding:6px 8px;text-align:left">Responsavel</th><th style="padding:6px 8px;text-align:left">Obs</th></tr></thead>'
            +'<tbody>'+rows+'</tbody>'
            +'</table>'
          :'<div style="text-align:center;padding:16px;color:#9ca3af;font-size:12px">Extrato de movimentacoes omitido (opcao desmarcada no filtro).</div>')
        +'</div>';
      pdfFromHtml(html,'relatorio_banco_horas_'+new Date().toISOString().substring(0,10)+'.pdf');
    }).catch(function(e){toast(e.message,'er');});
  };
}

// ── AUDIENCIAS
function renderAudiencias(){
  var now=new Date();
  var meses=[];
  for(var i=0;i<12;i++){
    var d=new Date(now.getFullYear(),now.getMonth()-i,1);
    var mm=(d.getMonth()+1).toString().padStart(2,'0');
    meses.push([mm+'/'+d.getFullYear(),mm+'/'+d.getFullYear()]);
  }
  var informados=ADM.auds.filter(function(a){return a.informado;}).length;
  var comDispensa=ADM.auds.filter(function(a){return a.data_dispensa;}).length;
  var html='<div class="adm-sh">'
    +'<div><div class="adm-sh-title">Audiencias</div><div class="adm-sh-sub">Controle de audiencias judiciais e informes</div></div>'
    +'<div class="adm-sh-acts"><button class="btn" id="aud-rel">Relatorio PDF</button><button class="btn btn-p" id="aud-novo">+ Nova Audiencia</button></div>'
    +'</div>';
  html+='<div class="kgrid" style="grid-template-columns:repeat(3,1fr)">';
  html+='<div class="kc" style="border-top:3px solid #1A3A5C"><div class="kl">Audiencias no Mes</div><div class="kv">'+ADM.auds.length+'</div><div class="ks">mes: '+ADM.mesAud+'</div></div>';
  html+='<div class="kc" style="border-top:3px solid #16a34a"><div class="kl">Agentes Informados</div><div class="kv" style="color:#16a34a">'+informados+'</div><div class="ks">'+(ADM.auds.length-informados)+' pendentes</div></div>';
  html+='<div class="kc" style="border-top:3px solid #7c3aed"><div class="kl">Dispensas Concedidas</div><div class="kv" style="color:#7c3aed">'+comDispensa+'</div><div class="ks">de '+ADM.auds.length+' audiencias</div></div>';
  html+='</div>';
  html+='<div class="flt-bar">';
  html+='<input id="aud-srch" placeholder="Buscar por agente, QRA ou processo..." style="flex:2;min-width:200px"/>';
  html+='<select id="aud-mes-flt" style="min-width:140px">'+selOpts(meses,ADM.mesAud)+'</select>';
  html+='<select id="aud-inf-flt" style="min-width:140px"><option value="">Todos</option><option value="1">Informados</option><option value="0">Nao informados</option></select>';
  html+='</div>';
  html+=admToggleBtn('aud-tog','Registro de Audiencias',ADM.auds.length);
  html+='<div id="aud-table" style="display:none">'+renderAudTable(ADM.auds)+'</div>';
  return html;
}
function renderAudTable(auds){
  if(!auds.length)return '<div class="empty">Nenhuma audiencia encontrada para este mes.</div>';
  return tableHtml(['Agente','QRA','Mes','Processo','Data','Horario','Local','Informado','Dispensa','Acoes'],
    auds.map(function(a){
      var inf=a.informado
        ?'<span class="bdg b-green">Sim</span><div style="font-size:10px;color:#6b7280;margin-top:2px">'+fmtDt(a.data_informado)+'<br>'+esc(a.como_informado||'')+'</div>'
        :'<span class="bdg b-gray">Nao informado</span>';
      return '<tr><td><div style="font-weight:500">'+esc(a.agente_nome)+'</div><div style="font-size:10px;color:#9ca3af">'+esc(a.funcional||'')+'</div></td>'
        +'<td>'+bdg(a.qra||'--','blue')+'</td><td>'+esc(a.mes)+'</td>'
        +'<td style="font-family:monospace;font-size:11px">'+esc(a.numero_processo)+'</td>'
        +'<td>'+fmtDt(a.data_audiencia)+'</td><td>'+esc(a.horario||'--')+'</td>'
        +'<td style="font-size:12px">'+esc(a.local_audiencia||'--')+'</td><td>'+inf+'</td>'
        +'<td>'+(a.data_dispensa?'<span class="bdg b-purple">'+fmtDt(a.data_dispensa)+'</span>':'<span style="color:#d1d5db">--</span>')+'</td>'
        +'<td style="white-space:nowrap"><button class="btn btn-sm" data-aud-edit="'+a.id+'">Editar</button> <button class="btn btn-sm btn-d" data-aud-del="'+a.id+'">Excluir</button></td></tr>';
    })
  );
}
function bindAudTable(){
  var t=document.getElementById('aud-table');if(!t)return;
  t.onclick=function(e){
    var be=e.target.closest('[data-aud-edit]');
    var bd=e.target.closest('[data-aud-del]');
    if(be){var id=parseInt(be.dataset.audEdit);var a=ADM.auds.find(function(x){return x.id===id;});if(a)audModal(a);}
    if(bd){var id2=parseInt(bd.dataset.audDel);if(confirm('Excluir esta audiencia?'))
      api.del('/api/admin/audiencias/'+id2).then(function(){
        toast('Removida!');ADM.auds=ADM.auds.filter(function(x){return x.id!==id2;});
        var t2=document.getElementById('aud-table');if(t2){t2.innerHTML=renderAudTable(ADM.auds);bindAudTable();}
      }).catch(function(e){toast(e.message,'er');});}
  };
}
function audModal(a){
  var now=new Date();
  var meses=[];
  for(var i=3;i>=-8;i--){
    var d=new Date(now.getFullYear(),now.getMonth()+i,1);
    var mm=(d.getMonth()+1).toString().padStart(2,'0');
    meses.push([mm+'/'+d.getFullYear(),mm+'/'+d.getFullYear()]);
  }
  var comoOpts=['','Presencialmente','WhatsApp','Telefone','E-mail','Radio','Mensagem no sistema'];
  var selInf=comoOpts.map(function(o){return '<option value="'+o+'"'+(a&&a.como_informado===o?' selected':'')+'>'+o+'</option>';}).join('');
  var body='<div class="fg">'
    +(a?'':'<div class="f1 full"><label>Buscar agente (funcional, QRA ou nome)</label><input id="aum-ag-s" placeholder="Digite funcional, QRA ou nome..." style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:7px 10px;font-size:13px;font-family:inherit"/></div>')
    +'<div class="f1 full"><label>Agente</label><select id="aum-ag"'+(a?' disabled':'')+'>'+agOpts(a?a.agente_id:'')+'</select></div>'
    +'<div class="f1"><label>Mes de Referencia</label><select id="aum-mes">'+selOpts(meses,a?a.mes:ADM.mesAud)+'</select></div>'
    +'<div class="f1"><label>Nr Processo</label><input id="aum-proc" value="'+(a?esc(a.numero_processo):'')+'" placeholder="Ex: 0001/2026"/></div>'
    +'<div class="f1"><label>Data da Audiencia</label><input type="date" id="aum-data" value="'+(a?a.data_audiencia:'')+'"/></div>'
    +'<div class="f1"><label>Horario</label><input type="time" id="aum-hora" value="'+(a?a.horario||'':'')+'"/></div>'
    +'<div class="f1 full"><label>Local</label><input id="aum-local" value="'+(a?esc(a.local_audiencia||''):'')+'" placeholder="Ex: Forum Central - Sala 3"/></div>'
    +'<div class="f1"><label>Agente foi Informado?</label><select id="aum-inf"><option value="0">Nao</option><option value="1"'+(a&&a.informado?' selected':'')+'>Sim</option></select></div>'
    +'<div class="f1"><label>Data que foi Informado</label><input type="date" id="aum-dinf" value="'+(a?a.data_informado||'':'')+'"/></div>'
    +'<div class="f1 full"><label>Como foi Informado</label><select id="aum-como">'+selInf+'</select></div>'
    +'<div class="f1"><label>Data da Dispensa (folga)</label><input type="date" id="aum-disp" value="'+(a?a.data_dispensa||'':'')+'"/></div>'
    +'<div class="f1"><label>Observacoes</label><textarea id="aum-obs">'+(a?esc(a.observacoes||''):'')+'</textarea></div>'
    +'</div>';
  var isEdit=!!a;
  var footer='<button class="btn" id="aum-c">Cancelar</button><button class="btn btn-p" id="aum-ok">'+(isEdit?'Salvar':'Cadastrar')+'</button>';
  openModal('aum',(isEdit?'Editar':'Nova')+' Audiencia','lg',body,footer);
  if(!a)bindAgSrch('aum-ag-s','aum-ag');
  document.getElementById('aum-c').onclick=function(){closeModal('aum');};
  document.getElementById('aum-ok').onclick=function(){
    var payload={
      agente_id:document.getElementById('aum-ag').value,
      mes:document.getElementById('aum-mes').value,
      numero_processo:document.getElementById('aum-proc').value,
      data_audiencia:document.getElementById('aum-data').value,
      horario:document.getElementById('aum-hora').value||null,
      local_audiencia:document.getElementById('aum-local').value||null,
      informado:document.getElementById('aum-inf').value==='1',
      data_informado:document.getElementById('aum-dinf').value||null,
      como_informado:document.getElementById('aum-como').value||null,
      data_dispensa:document.getElementById('aum-disp').value||null,
      observacoes:document.getElementById('aum-obs').value||null
    };
    if(!payload.agente_id||!payload.mes||!payload.numero_processo||!payload.data_audiencia)
      return toast('Preencha: agente, mes, processo e data','er');
    var req2=isEdit?api.put('/api/admin/audiencias/'+a.id,payload):api.post('/api/admin/audiencias',payload);
    req2.then(function(){
      toast(isEdit?'Audiencia atualizada!':'Audiencia cadastrada!');closeModal('aum');
      api.get('/api/admin/audiencias?mes='+ADM.mesAud).then(function(r){
        ADM.auds=r.data;var t=document.getElementById('aud-table');if(t){t.innerHTML=renderAudTable(ADM.auds);bindAudTable();}
      });
    }).catch(function(e){toast(e.message,'er');});
  };
}

function audRelatorioModal(){
  var now=new Date();
  var meses=[];
  for(var i=3;i>=-8;i--){
    var d=new Date(now.getFullYear(),now.getMonth()+i,1);
    var mm=(d.getMonth()+1).toString().padStart(2,'0');
    meses.push([mm+'/'+d.getFullYear(),mm+'/'+d.getFullYear()]);
  }
  var body='<div class="fg">'
    +'<div class="f1 full"><label>Buscar agente (funcional, QRA ou nome)</label><input id="aur-ag-s" placeholder="Todos os agentes (deixe em branco)" style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:7px 10px;font-size:13px;font-family:inherit"/></div>'
    +'<div class="f1 full"><label>Agente (opcional)</label><select id="aur-ag"><option value="">Todos os agentes</option>'+agOpts('')+'</select></div>'
    +'<div class="f1"><label>Mes</label><select id="aur-mes"><option value="">Todos os meses</option>'+meses.map(function(m){return '<option value="'+m[0]+'">'+m[1]+'</option>';}).join('')+'</select></div>'
    +'<div class="f1"><label>Situacao</label><select id="aur-inf"><option value="">Todos</option><option value="1">Informados</option><option value="0">Nao informados</option></select></div>'
    +'<div class="f1"><label>Dispensa</label><select id="aur-disp"><option value="">Todos</option><option value="1">Com dispensa</option><option value="0">Sem dispensa</option></select></div>'
    +'</div>';
  var footer='<button class="btn" id="aur-c">Cancelar</button><button class="btn btn-p" id="aur-ok">Gerar Relatorio</button>';
  openModal('aur','Relatorio - Audiencias','md',body,footer);
  bindAgSrch('aur-ag-s','aur-ag');
  document.getElementById('aur-c').onclick=function(){closeModal('aur');};
  document.getElementById('aur-ok').onclick=function(){
    var agId=document.getElementById('aur-ag').value;
    var mes=document.getElementById('aur-mes').value;
    var infFlt=document.getElementById('aur-inf').value;
    var dispFlt=document.getElementById('aur-disp').value;
    var params=[];
    if(mes)params.push('mes='+encodeURIComponent(mes));
    var qs=params.length?'?'+params.join('&'):'';
    api.get('/api/admin/audiencias'+qs).then(function(r){
      var auds=r.data||[];
      if(agId)auds=auds.filter(function(a){return String(a.agente_id)===String(agId);});
      if(infFlt==='1')auds=auds.filter(function(a){return a.informado;});
      else if(infFlt==='0')auds=auds.filter(function(a){return !a.informado;});
      if(dispFlt==='1')auds=auds.filter(function(a){return a.data_dispensa;});
      else if(dispFlt==='0')auds=auds.filter(function(a){return !a.data_dispensa;});
      closeModal('aur');
      var agNm=agId?(ADM.ags.find(function(a){return String(a.id)===String(agId);})||{}).nome||'':'Todos os agentes';
      var informados=auds.filter(function(a){return a.informado;}).length;
      var comDisp=auds.filter(function(a){return a.data_dispensa;}).length;
      var rows=auds.map(function(a){
        var inf=a.informado?('Sim - '+fmtDt(a.data_informado)+' ('+esc(a.como_informado||'')+')'):'Nao informado';
        return '<tr><td>'+esc(a.funcional||'--')+'</td><td>'+esc(a.agente_nome||'')+'</td><td>'+esc(a.mes||'')+'</td>'
          +'<td style="font-family:monospace">'+esc(a.numero_processo||'')+'</td>'
          +'<td>'+fmtDt(a.data_audiencia)+'</td><td>'+esc(a.horario||'--')+'</td>'
          +'<td>'+esc(a.local_audiencia||'--')+'</td><td>'+inf+'</td>'
          +'<td>'+(a.data_dispensa?fmtDt(a.data_dispensa):'--')+'</td>'
          +'<td style="font-size:11px;color:#6b7280">'+esc(a.observacoes||'')+'</td></tr>';
      }).join('');
      var html='<div style="font-family:Arial,sans-serif;font-size:13px;max-width:1000px;margin:0 auto;padding:20px">'
        +'<div style="text-align:center;margin-bottom:18px"><h2 style="margin:0;color:#1e3a5f">RELATORIO - AUDIENCIAS</h2>'
        +'<div style="color:#6b7280;font-size:12px">Gerado em: '+new Date().toLocaleString('pt-BR')+'</div></div>'
        +'<table style="width:100%;border-collapse:collapse;margin-bottom:14px">'
        +'<tr><td style="padding:4px 8px;border:1px solid #e5e7eb"><b>Agente:</b></td><td style="padding:4px 8px;border:1px solid #e5e7eb">'+esc(agNm)+'</td>'
        +'<td style="padding:4px 8px;border:1px solid #e5e7eb"><b>Mes:</b></td><td style="padding:4px 8px;border:1px solid #e5e7eb">'+esc(mes||'Todos')+'</td></tr>'
        +'</table>'
        +'<div style="display:flex;gap:16px;margin-bottom:14px">'
        +'<div style="flex:1;padding:10px;border:2px solid #1e3a5f;border-radius:8px;text-align:center"><div style="font-size:11px;color:#6b7280">TOTAL</div><div style="font-size:22px;font-weight:700;color:#1e3a5f">'+auds.length+'</div></div>'
        +'<div style="flex:1;padding:10px;border:2px solid #16a34a;border-radius:8px;text-align:center"><div style="font-size:11px;color:#6b7280">INFORMADOS</div><div style="font-size:22px;font-weight:700;color:#16a34a">'+informados+'</div></div>'
        +'<div style="flex:1;padding:10px;border:2px solid #dc2626;border-radius:8px;text-align:center"><div style="font-size:11px;color:#6b7280">PENDENTES</div><div style="font-size:22px;font-weight:700;color:#dc2626">'+(auds.length-informados)+'</div></div>'
        +'<div style="flex:1;padding:10px;border:2px solid #7c3aed;border-radius:8px;text-align:center"><div style="font-size:11px;color:#6b7280">COM DISPENSA</div><div style="font-size:22px;font-weight:700;color:#7c3aed">'+comDisp+'</div></div>'
        +'</div>'
        +'<table style="width:100%;border-collapse:collapse;font-size:11px">'
        +'<thead><tr style="background:#1e3a5f;color:#fff"><th style="padding:6px 8px;text-align:left">Funcional</th><th style="padding:6px 8px;text-align:left">Agente</th><th style="padding:6px 8px;text-align:left">Mes</th><th style="padding:6px 8px;text-align:left">Processo</th><th style="padding:6px 8px;text-align:left">Data</th><th style="padding:6px 8px;text-align:left">Horario</th><th style="padding:6px 8px;text-align:left">Local</th><th style="padding:6px 8px;text-align:left">Informado</th><th style="padding:6px 8px;text-align:left">Dispensa</th><th style="padding:6px 8px;text-align:left">Obs</th></tr></thead>'
        +'<tbody>'+rows+'</tbody>'
        +'</table>'
        +'</div>';
      pdfFromHtml(html,'relatorio_audiencias_'+new Date().toISOString().substring(0,10)+'.pdf');
    }).catch(function(e){toast(e.message,'er');});
  };
}

// ── FREQUENCIA MENSAL
function diasMes(mesAno){var p=mesAno.split('-');return new Date(parseInt(p[0]),parseInt(p[1]),0).getDate();}
function renderFrequencia(){
  var now=new Date();
  var meses=[];
  for(var i=0;i<12;i++){
    var d=new Date(now.getFullYear(),now.getMonth()-i,1);
    var yy=d.getFullYear();var mm=(d.getMonth()+1).toString().padStart(2,'0');
    meses.push([yy+'-'+mm,mm+'/'+yy]);
  }
  var emFerias=ADM.freq.filter(function(f){return parseInt(f.ferias_prog_dias||0)>0;}).length;
  var emAtestado=ADM.freq.filter(function(f){return parseInt(f.atestado_dias||0)>0;}).length;
  var comFalta=ADM.freq.filter(function(f){return parseInt(f.falta_dias)>0;}).length;
  var totalAbonos=ADM.abonos.length;
  var totalDoacoes=ADM.doacoes.length;
  var setores=[].concat.apply([],ADM.freq.map(function(f){return f.setor||'';})).filter(function(v,i,a){return v&&a.indexOf(v)===i;}).sort();
  var html='<div class="adm-sh">'
    +'<div><div class="adm-sh-title">Frequencia</div><div class="adm-sh-sub">Ferias, faltas, licencas e ocorrencias do mes</div></div>'
    +'<div class="adm-sh-acts"><button class="btn" id="frq-rel">Relatorio PDF</button><button class="btn btn-p" id="frq-novo">Editar Ferias / Falta / Licenca</button></div>'
    +'</div>';
  html+='<div class="kgrid" style="grid-template-columns:repeat(5,1fr);margin-bottom:14px">';
  html+='<div class="kc" style="border-top:3px solid #1A3A5C"><div class="kl">Total Agentes</div><div class="kv">'+ADM.freq.length+'</div><div class="ks">ativos no mes</div></div>';
  html+='<div class="kc" style="border-top:3px solid #7c3aed"><div class="kl">Em Ferias</div><div class="kv" style="color:#7c3aed">'+emFerias+'</div><div class="ks">com dias lancados</div></div>';
  html+='<div class="kc" style="border-top:3px solid #ca8a04"><div class="kl">Com Atestado</div><div class="kv" style="color:#ca8a04">'+emAtestado+'</div><div class="ks">via aba Atestados</div></div>';
  html+='<div class="kc" style="border-top:3px solid #dc2626"><div class="kl">Com Falta</div><div class="kv" style="color:#dc2626">'+comFalta+'</div><div class="ks">no mes</div></div>';
  html+='<div class="kc" style="border-top:3px solid #0891b2"><div class="kl">Abonos / Doacoes</div><div class="kv" style="color:#0891b2">'+totalAbonos+' / '+totalDoacoes+'</div><div class="ks">neste mes</div></div>';
  html+='</div>';
  html+='<div class="flt-bar">';
  html+='<input id="frq-srch" placeholder="Buscar por nome, QRA ou setor..." style="flex:2;min-width:200px"/>';
  html+='<select id="frq-mes-flt" style="min-width:140px">'+selOpts(meses,ADM.mesFreq)+'</select>';
  html+='<select id="frq-setor-flt" style="min-width:140px"><option value="">Todos os setores</option>'+setores.map(function(s){return '<option value="'+s+'">'+s+'</option>';}).join('')+'</select>';
  html+='</div>';
  html+=admToggleBtn('frq-tog','Frequencia dos Agentes',ADM.freq.length);
  html+='<div id="frq-table" style="display:none">'+renderFreqTable(ADM.freq)+'</div>';
  return html;
}
function renderFreqTable(freq){
  if(!freq.length)return '<div class="empty">Nenhum agente ativo encontrado.</div>';
  var rows=freq.map(function(f){
    var dm=diasMes(f.mes_ano||ADM.mesFreq);
    var atDias=parseInt(f.atestado_dias||0);
    var ferDias=parseInt(f.ferias_prog_dias||0);
    var aus=ferDias+atDias+(parseInt(f.falta_dias)||0)+(parseInt(f.licenca_dias)||0)+(parseInt(f.afastamento_compensacao_dias)||0);
    var trab=Math.max(0,dm-aus);
    var cor=trab>=dm*0.85?'#16a34a':trab>=dm*0.7?'#ca8a04':'#dc2626';
    var n=function(v,c){return parseInt(v)>0?'<span class="bdg b-'+c+'">'+v+'d</span>':'<span style="color:#d1d5db">--</span>';};
    var nc=function(v,c){return parseInt(v)>0?'<span class="bdg b-'+c+'">'+v+'</span>':'<span style="color:#d1d5db">--</span>';};
    var atCell='<span style="color:#d1d5db">--</span>';
    if(atDias>0){
      var catDias=parseInt(f.atestado_dias_cat||0);var pendDias=parseInt(f.atestado_dias_pendente||0);
      atCell='<span class="bdg b-red">'+atDias+'d</span>';
      if(pendDias>0)atCell+=' <span class="bdg b-yellow">'+pendDias+' pend</span>';
      if(catDias>0)atCell+=' <span class="bdg b-orange">'+catDias+' CAT</span>';
    }
    var aid=f.agente_id;
    return '<tr class="frq-row" data-frq-id="'+aid+'" style="cursor:pointer">'
      +'<td style="width:16px;color:#9ca3af;font-size:11px" id="frq-arr-'+aid+'">▶</td>'
      +'<td><div style="font-weight:500">'+esc(f.agente_nome)+'</div><div style="font-size:10px;color:#9ca3af">'+esc(f.funcional||'')+'</div></td>'
      +'<td>'+bdg(f.qra||'--','blue')+'</td><td style="font-size:12px">'+esc(f.setor||'--')+'</td>'
      +'<td>'+(ferDias>0?'<span class="bdg b-purple">'+ferDias+'d</span>':'<span style="color:#d1d5db">--</span>')+'</td>'
      +'<td>'+atCell+'</td>'
      +'<td>'+nc(f.abono_count,'blue')+'</td>'
      +'<td>'+nc(f.doacao_count,'red')+'</td>'
      +'<td>'+n(f.falta_dias,'red')+'</td><td>'+n(f.licenca_dias,'orange')+'</td>'
      +'<td>'+n(f.afastamento_compensacao_dias,'gray')+'</td>'
      +'<td><b style="color:'+cor+'">'+trab+'</b><span style="font-size:11px;color:#9ca3af">/'+dm+'d</span></td>'
      +'<td style="font-size:11px;color:#6b7280;max-width:180px">'+( f.observacao?'<span title="'+esc(f.observacao)+'" style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:170px">'+esc(f.observacao)+'</span>':'<span style="color:#d1d5db">--</span>' )+'</td>'
      +'<td><button class="btn btn-sm" data-frq-edit="'+aid+'">Editar</button></td>'
      +'</tr>'
      +'<tr id="frq-ext-'+aid+'" style="display:none"><td colspan="14" style="padding:0"><div id="frq-ext-c-'+aid+'" style="padding:10px 18px 14px;background:#f8fafc;border-top:1px solid #f3f4f6"></div></td></tr>';
  }).join('');
  return '<table><thead><tr><th></th><th>Nome / Funcional</th><th>QRA</th><th>Setor</th><th>Ferias</th><th>Atestado</th><th>Abono</th><th>Doacao</th><th>Falta</th><th>Licenca</th><th>Afastamento</th><th>Total Trab.</th><th>Observacao</th><th>Base</th></tr></thead><tbody>'+rows+'</tbody></table>';
}
function bindFreqTable(){
  var t=document.getElementById('frq-table');if(!t)return;
  var frqRel=document.getElementById('frq-rel');if(frqRel)frqRel.onclick=frqRelatorioModal;
  t.onclick=function(e){
    var be=e.target.closest('[data-frq-edit]');
    if(be){
      e.stopPropagation();
      var aid=be.dataset.frqEdit;
      var f=ADM.freq.find(function(x){return String(x.agente_id)===String(aid);});
      if(f)freqModal(f);return;
    }
    var row=e.target.closest('.frq-row');if(!row)return;
    var aid=row.dataset.frqId;
    var ext=document.getElementById('frq-ext-'+aid);
    var arr=document.getElementById('frq-arr-'+aid);
    if(!ext)return;
    if(ext.style.display==='none'||!ext.style.display){
      document.querySelectorAll('tr[id^="frq-ext-"]').forEach(function(r){r.style.display='none';});
      document.querySelectorAll('[id^="frq-arr-"]').forEach(function(a){a.textContent='▶';});
      ext.style.display='table-row';if(arr)arr.textContent='▼';
      var c=document.getElementById('frq-ext-c-'+aid);
      if(c){
        var f=ADM.freq.find(function(x){return String(x.agente_id)===String(aid);});
        var ates=ADM.atestados.filter(function(a){return String(a.agente_id)===String(aid);});
        var abos=ADM.abonos.filter(function(a){return String(a.agente_id)===String(aid);});
        var dss=ADM.doacoes.filter(function(a){return String(a.agente_id)===String(aid);});
        var det='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">';
        det+='<div><div style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:6px">ATESTADOS</div>';
        if(ates.length){det+=ates.map(function(a){return '<div style="font-size:12px;padding:4px 0;border-bottom:1px solid #f3f4f6"><span class="bdg '+(a.tipo==='cat'?'b-purple':'b-yellow')+'">'+a.tipo.toUpperCase()+'</span> '+fmtDt(a.data_inicio)+' - '+fmtDt(a.data_fim)+' <b>'+a.dias+'d</b>'+(a.tipo==='comum'?'<span style="color:'+(parseInt(a.reposicoes_feitas||0)>=a.dias?'#16a34a':'#dc2626')+'"> ('+esc(String(a.reposicoes_feitas||0))+'/'+a.dias+' reposto)</span>':'')+'</div>';}).join('');}
        else det+='<div style="color:#9ca3af;font-size:12px">Nenhum atestado</div>';
        det+='</div>';
        det+='<div><div style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:6px">ABONOS</div>';
        if(abos.length){det+=abos.map(function(a){return '<div style="font-size:12px;padding:4px 0;border-bottom:1px solid #f3f4f6">'+fmtDt(a.data)+' — '+esc(a.motivo||'--')+'</div>';}).join('');}
        else det+='<div style="color:#9ca3af;font-size:12px">Nenhum abono</div>';
        det+='</div>';
        det+='<div><div style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:6px">DOACOES DE SANGUE</div>';
        if(dss.length){det+=dss.map(function(d){return '<div style="font-size:12px;padding:4px 0;border-bottom:1px solid #f3f4f6"><span class="bdg b-red">'+fmtDt(d.data_doacao)+'</span></div>';}).join('');}
        else det+='<div style="color:#9ca3af;font-size:12px">Nenhuma doacao</div>';
        det+='</div>';
        det+='</div>';
        var negItems=[];
        if(parseInt(f.ferias_prog_dias||0)>0)negItems.push('<span class="bdg b-purple">Ferias: '+f.ferias_prog_dias+'d</span>');
        if(parseInt(f.atestado_dias||0)>0)negItems.push('<span class="bdg b-red">Atestado: '+f.atestado_dias+'d</span>');
        if(parseInt(f.falta_dias)>0)negItems.push('<span class="bdg b-red">Faltas: '+f.falta_dias+'d</span>');
        if(parseInt(f.licenca_dias)>0)negItems.push('<span class="bdg b-purple">Licenca: '+f.licenca_dias+'d</span>');
        if(parseInt(f.afastamento_compensacao_dias)>0)negItems.push('<span class="bdg b-orange">Afastamento: '+f.afastamento_compensacao_dias+'d</span>');
        if(negItems.length){
          det+='<div style="margin-top:10px;padding:10px;background:#fef2f2;border-left:3px solid #dc2626;border-radius:0 6px 6px 0">';
          det+='<div style="font-size:11px;font-weight:600;color:#dc2626;margin-bottom:6px">REDUZ FREQUENCIA: '+negItems.join(' ')+'</div>';
          det+='<div style="font-size:11px;color:#6b7280;font-weight:600;margin-bottom:4px">OBSERVACOES</div>';
          det+='<div style="font-size:12px;color:#374151;white-space:pre-wrap;min-height:18px">'+(f.observacao?esc(f.observacao):'<span style="color:#9ca3af;font-style:italic">Sem observacoes registradas</span>')+'</div>';
          det+='</div>';
        }
        c.innerHTML=det;
      }
    } else {ext.style.display='none';if(arr)arr.textContent='▶';}
  };
}
function frqRelatorioModal(){
  var setores=[].concat.apply([],ADM.freq.map(function(f){return f.setor||'';})).filter(function(v,i,a){return v&&a.indexOf(v)===i;}).sort();
  var meses=admMesOpts();
  var body='<div class="fg">'
    +'<div class="f1"><label>Mes</label><select id="frqr-mes">'+selOpts(meses,ADM.mesFreq)+'</select></div>'
    +'<div class="f1"><label>Setor</label><select id="frqr-setor"><option value="">Todos</option>'+setores.map(function(s){return '<option value="'+s+'">'+s+'</option>';}).join('')+'</select></div>'
    +'<div class="f1"><label>Exibir apenas com ausencias</label><select id="frqr-fil"><option value="">Todos os agentes</option><option value="aus">Com ausencias</option><option value="ok">Sem ausencias</option></select></div>'
    +'</div>';
  var footer='<button class="btn" id="frqr-c">Cancelar</button><button class="btn btn-p" id="frqr-ok">Gerar PDF</button>';
  openModal('frqr','Relatorio - Frequencia','md',body,footer);
  document.getElementById('frqr-c').onclick=function(){closeModal('frqr');};
  document.getElementById('frqr-ok').onclick=function(){
    var mes=document.getElementById('frqr-mes').value;
    var setor=document.getElementById('frqr-setor').value;
    var fil=document.getElementById('frqr-fil').value;
    closeModal('frqr');
    admLoadSubMes(mes).then(function(){
      var data=ADM.freq.slice();
      if(setor)data=data.filter(function(f){return f.setor===setor;});
      if(fil==='aus')data=data.filter(function(f){
        return parseInt(f.ferias_prog_dias||0)>0||parseInt(f.atestado_dias||0)>0||parseInt(f.falta_dias)>0||parseInt(f.licenca_dias)>0||f.abono_count>0||f.doacao_count>0;
      });
      if(fil==='ok')data=data.filter(function(f){
        return !parseInt(f.ferias_prog_dias||0)&&!parseInt(f.atestado_dias||0)&&!parseInt(f.falta_dias)&&!parseInt(f.licenca_dias)&&!f.abono_count&&!f.doacao_count;
      });
      var rows=data.map(function(f){
        var dm=diasMes(mes);
        var atDias=parseInt(f.atestado_dias||0);
        var ferDias=parseInt(f.ferias_prog_dias||0);
        var aus=ferDias+atDias+(parseInt(f.falta_dias)||0)+(parseInt(f.licenca_dias)||0)+(parseInt(f.afastamento_compensacao_dias)||0);
        var trab=Math.max(0,dm-aus);
        return '<tr><td>'+esc(f.funcional||'--')+'</td><td>'+esc(f.agente_nome)+'</td><td>'+esc(f.qra||'--')+'</td><td>'+esc(f.setor||'--')+'</td>'
          +'<td>'+ferDias+'</td><td>'+atDias+'</td>'
          +'<td>'+parseInt(f.falta_dias||0)+'</td><td>'+parseInt(f.licenca_dias||0)+'</td>'
          +'<td>'+parseInt(f.abono_count||0)+'</td><td>'+parseInt(f.doacao_count||0)+'</td>'
          +'<td style="font-weight:700;color:'+(trab>=dm*0.85?'#16a34a':'#dc2626')+'">'+trab+'/'+dm+'</td></tr>';
      }).join('');
      var html='<div style="font-family:Arial,sans-serif;font-size:12px;padding:20px">'
        +'<h2 style="margin:0 0 4px;color:#1e3a5f">FREQUENCIA MENSAL — '+mes+'</h2>'
        +'<div style="color:#6b7280;font-size:11px;margin-bottom:16px">Setor: '+(setor||'Todos')+'  |  Gerado: '+new Date().toLocaleString('pt-BR')+'</div>'
        +'<table style="width:100%;border-collapse:collapse;font-size:11px">'
        +'<thead><tr style="background:#1e3a5f;color:#fff"><th style="padding:5px 6px;text-align:left">Funcional</th><th style="padding:5px 6px;text-align:left">Nome</th><th style="padding:5px 6px;text-align:left">QRA</th><th style="padding:5px 6px;text-align:left">Setor</th><th style="padding:5px 6px">Ferias</th><th style="padding:5px 6px">Atestado</th><th style="padding:5px 6px">Falta</th><th style="padding:5px 6px">Licenca</th><th style="padding:5px 6px">Abono</th><th style="padding:5px 6px">Doacao</th><th style="padding:5px 6px">Dias Trab</th></tr></thead>'
        +'<tbody>'+rows+'</tbody></table>'
        +'<div style="margin-top:12px;font-size:10px;color:#9ca3af">Total de agentes: '+data.length+'</div>'
        +'</div>';
      pdfFromHtml(html,'frequencia_'+mes+'.pdf');
    });
  };
}
function freqModal(f){
  var now=new Date();
  var meses=[];
  for(var i=0;i<12;i++){
    var d=new Date(now.getFullYear(),now.getMonth()-i,1);
    var yy=d.getFullYear();var mm=(d.getMonth()+1).toString().padStart(2,'0');
    meses.push([yy+'-'+mm,mm+'/'+yy]);
  }
  var body='<div class="fg">'
    +(f?'':'<div class="f1 full"><label>Buscar agente (funcional, QRA ou nome)</label><input id="frm-ag-s" placeholder="Digite funcional, QRA ou nome..." style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:7px 10px;font-size:13px;font-family:inherit"/></div>')
    +'<div class="f1 full"><label>Agente</label><select id="frm-ag"'+(f?' disabled':'')+'>'+agOpts(f?f.agente_id:'')+'</select></div>'
    +'<div class="f1"><label>Mes de Referencia</label><select id="frm-mes"'+(f?' disabled':'')+'>'+selOpts(meses,f?f.mes_ano:ADM.mesFreq)+'</select></div>'
    +'<div class="f1"><label>Chefia Imediata</label><input id="frm-chefia" value="'+(f?esc(f.chefia_imediata||''):'')+'" placeholder="Nome do chefe"/></div>'
    +'</div>'
    +'<div style="margin:12px 0 8px;font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:.5px">Ausencias manuais (faltas, licencas)</div>'
    +'<div style="background:#fef9c3;border:1px solid #fde68a;border-radius:6px;padding:8px 12px;margin-bottom:10px;font-size:12px;color:#92400e">Ferias sao gerenciadas na aba Ferias. Atestados, Abonos e Doacoes de Sangue sao lancados nas abas especificas e alimentam automaticamente a frequencia.</div>'
    +'<div class="fg">'
    +'<div class="f1"><label>Dias de Falta</label><input type="number" id="frm-fa" min="0" value="'+(f?f.falta_dias||0:0)+'"/></div>'
    +'<div class="f1"><label>Dias de Licenca</label><input type="number" id="frm-lc" min="0" value="'+(f?f.licenca_dias||0:0)+'"/></div>'
    +'<div class="f1"><label>Compensacao Afastamento (dias)</label><input type="number" id="frm-af" min="0" value="'+(f?f.afastamento_compensacao_dias||0:0)+'"/></div>'
    +'<div class="f1 full"><label>Declaracao de Comparecimento</label><input id="frm-dc" value="'+(f?esc(f.declaracao_comparecimento||''):'')+'" placeholder="Nr ou descricao"/></div>'
    +'<div class="f1 full"><label>Observacao</label><textarea id="frm-obs">'+(f?esc(f.observacao||''):'')+'</textarea></div>'
    +'</div>';
  var isEdit=!!f;
  var footer='<button class="btn" id="frm-c">Cancelar</button><button class="btn btn-p" id="frm-ok">'+(isEdit?'Salvar':'Lancar')+'</button>';
  openModal('frm',(isEdit?'Editar':'Lancar')+' Frequencia - Base','lg',body,footer);
  if(!f)bindAgSrch('frm-ag-s','frm-ag');
  document.getElementById('frm-c').onclick=function(){closeModal('frm');};
  document.getElementById('frm-ok').onclick=function(){
    var agId=f?f.agente_id:document.getElementById('frm-ag').value;
    var mesVal=f?f.mes_ano:document.getElementById('frm-mes').value;
    var payload={
      agente_id:agId, mes_ano:mesVal,
      chefia_imediata:document.getElementById('frm-chefia').value||null,
      falta_dias:document.getElementById('frm-fa').value||0,
      licenca_dias:document.getElementById('frm-lc').value||0,
      afastamento_compensacao_dias:document.getElementById('frm-af').value||0,
      declaracao_comparecimento:document.getElementById('frm-dc').value||null,
      observacao:document.getElementById('frm-obs').value||null
    };
    if(!payload.agente_id||!payload.mes_ano)return toast('Selecione o agente e o mes','er');
    api.post('/api/admin/frequencia',payload).then(function(){
      toast('Frequencia salva!');closeModal('frm');
      admLoadSubMes(ADM.mesFreq).then(function(){
        var t=document.getElementById('frq-table');if(t){t.innerHTML=renderFreqTable(ADM.freq);bindFreqTable();}
      });
    }).catch(function(e){toast(e.message,'er');});
  };
}

// ── ATESTADOS
function admMesOpts(){
  var now=new Date();var meses=[];
  for(var i=0;i<12;i++){
    var d=new Date(now.getFullYear(),now.getMonth()-i,1);
    var yy=d.getFullYear();var mm=(d.getMonth()+1).toString().padStart(2,'0');
    meses.push([yy+'-'+mm,mm+'/'+yy]);
  }
  return meses;
}
function renderAteSummary(ats){
  var total=ats.length;
  var cat=ats.filter(function(a){return a.tipo==='cat';}).length;
  var totalDias=ats.reduce(function(s,a){return s+parseInt(a.dias||0);},0);
  var diasReposto=ats.filter(function(a){return a.tipo==='comum';}).reduce(function(s,a){return s+parseInt(a.reposicoes_feitas||0);},0);
  var diasPend=ats.filter(function(a){return a.tipo==='comum';}).reduce(function(s,a){return s+Math.max(0,parseInt(a.dias||0)-parseInt(a.reposicoes_feitas||0));},0);
  var html='<div class="kgrid" style="grid-template-columns:repeat(4,1fr);margin-bottom:14px">';
  html+='<div class="kc" style="border-top:3px solid #1A3A5C"><div class="kl">Total Atestados</div><div class="kv">'+total+'</div><div class="ks">'+totalDias+' dias no total</div></div>';
  html+='<div class="kc" style="border-top:3px solid #7c3aed"><div class="kl">CAT</div><div class="kv" style="color:#7c3aed">'+cat+'</div><div class="ks">acidente de trabalho</div></div>';
  html+='<div class="kc" style="border-top:3px solid #dc2626"><div class="kl">Dias Pendentes</div><div class="kv" style="color:#dc2626">'+diasPend+'</div><div class="ks">aguardando reposicao</div></div>';
  html+='<div class="kc" style="border-top:3px solid #16a34a"><div class="kl">Dias Repostos</div><div class="kv" style="color:#16a34a">'+diasReposto+'</div><div class="ks">ja compensados</div></div>';
  html+='</div>';
  return html;
}
function renderAtestados(){
  var meses=admMesOpts();
  var html='<div class="adm-sh">'
    +'<div><div class="adm-sh-title">Atestados Medicos</div><div class="adm-sh-sub">Controle de atestados e reposicoes de dias</div></div>'
    +'<div class="adm-sh-acts"><button class="btn" id="rep-ate-rel">PDF Reposicoes</button><button class="btn" id="ate-rel">Relatorio PDF</button><button class="btn btn-p" id="ate-novo">+ Novo Atestado</button></div>'
    +'</div>';
  html+='<div id="ate-summary">'+renderAteSummary(ADM.atestados)+'</div>';
  html+='<div class="flt-bar">';
  html+='<input id="ate-srch" placeholder="Buscar por agente, QRA ou funcional..." style="flex:2;min-width:200px"/>';
  html+='<select id="ate-mes-flt" style="min-width:140px">'+selOpts(meses,ADM.mesFreq)+'</select>';
  html+='<select id="ate-tipo-flt" style="min-width:140px"><option value="">Todos os tipos</option><option value="comum">Comum</option><option value="cat">CAT</option></select>';
  html+='<select id="ate-rep-flt" style="min-width:150px"><option value="">Todas situacoes</option><option value="pend">Pendente reposicao</option><option value="ok">Reposicao completa</option></select>';
  html+='</div>';
  html+=admToggleBtn('ate-tog','Lista de Atestados',ADM.atestados.length);
  html+='<div id="ate-table" style="display:none">'+renderAteTable(ADM.atestados)+'</div>';
  html+=admToggleBtn('rep-ate-tog','Movimentacao de Reposicoes',ADM.reposicoes.length);
  html+='<div id="rep-ate-table" style="display:none">'
    +'<div style="margin-bottom:10px"><input id="rep-ate-srch" placeholder="Buscar por agente, QRA ou funcional..." style="width:100%;max-width:400px;border:1px solid #d1d5db;border-radius:8px;padding:7px 10px;font-size:13px;font-family:inherit"/></div>'
    +'<div id="rep-ate-body">'+renderRepAtestados(ADM.reposicoes)+'</div>'
    +'</div>';
  return html;
}
function renderAteTable(ats){
  if(!ats.length)return '<div class="empty">Nenhum atestado encontrado para este mes.</div>';
  var rows=ats.map(function(a){
    var tipoTag=a.tipo==='cat'?'<span class="bdg b-purple">CAT</span>':'<span class="bdg b-yellow">Comum</span>';
    var feitos=parseInt(a.reposicoes_feitas||0);
    var total=parseInt(a.dias||0);
    var repCell;
    if(a.tipo==='cat'){repCell='<span style="color:#9ca3af;font-size:11px">Nao necessaria</span>';}
    else{
      var pct=total>0?Math.round(feitos/total*100):100;
      var barColor=feitos>=total?'#16a34a':feitos>0?'#ca8a04':'#dc2626';
      repCell='<div style="min-width:90px">'
        +'<div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:2px">'
        +'<span style="color:'+barColor+'"><b>'+feitos+'/'+total+'</b> dias</span>'
        +(feitos>=total?'<span class="bdg b-green">OK</span>':'<span class="bdg b-red">Pendente</span>')
        +'</div>'
        +'<div style="height:5px;background:#e5e7eb;border-radius:3px"><div style="height:5px;width:'+pct+'%;background:'+barColor+';border-radius:3px"></div></div>'
        +'</div>';
    }
    return '<tr class="ate-row" data-ate-id="'+a.id+'" style="cursor:pointer">'
      +'<td style="width:16px;color:#9ca3af;font-size:11px" id="ate-arr-'+a.id+'">▶</td>'
      +'<td><div style="font-weight:500">'+esc(a.agente_nome)+'</div><div style="font-size:10px;color:#9ca3af">'+esc(a.funcional||'')+'</div></td>'
      +'<td style="font-size:12px">'+fmtDt(a.data_inicio)+' a '+fmtDt(a.data_fim)+'</td>'
      +'<td><b>'+total+'d</b></td>'
      +'<td>'+tipoTag+'</td>'
      +'<td>'+repCell+'</td>'
      +'<td style="font-size:12px;color:#6b7280">'+esc(a.descricao||'--')+'</td>'
      +'<td style="white-space:nowrap"><button class="btn btn-sm" data-ate-edit="'+a.id+'">Editar</button> <button class="btn btn-sm btn-d" data-ate-del="'+a.id+'">Excluir</button></td>'
      +'</tr>'
      +'<tr id="ate-ext-'+a.id+'" style="display:none"><td colspan="8" style="padding:0"><div id="ate-ext-c-'+a.id+'" style="padding:10px 20px 16px;background:#f8fafc;border-top:1px solid #f3f4f6"></div></td></tr>';
  }).join('');
  return '<table><thead><tr><th></th><th>Agente</th><th>Periodo</th><th>Dias</th><th>Tipo</th><th>Reposicao</th><th>Descricao</th><th>Acoes</th></tr></thead><tbody>'+rows+'</tbody></table>';
}
function ateLoadExt(ateId){
  var c=document.getElementById('ate-ext-c-'+ateId);if(!c)return;
  var a=ADM.atestados.find(function(x){return x.id===ateId;});if(!a)return;
  c.innerHTML='<div style="color:#9ca3af;font-size:12px">Carregando...</div>';
  api.get('/api/admin/atestados/'+ateId+'/reposicoes').then(function(r){
    var reps=r.data||[];
    var feitos=reps.length;var total=parseInt(a.dias||0);
    var pend=Math.max(0,total-feitos);
    var html='<div style="display:flex;gap:20px;align-items:flex-start;flex-wrap:wrap">';
    html+='<div style="flex:1;min-width:200px">';
    html+='<div style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:8px">CONTROLE DE REPOSICAO — '+feitos+'/'+total+' dias repostos</div>';
    if(a.tipo==='cat'){html+='<div style="color:#9ca3af;font-size:12px">Atestado CAT — reposicao nao necessaria.</div>';}
    else{
      if(reps.length){
        html+=reps.map(function(rep,i){
          return '<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid #f3f4f6">'
            +'<span class="bdg b-green">Dia '+(i+1)+'</span>'
            +'<span style="font-size:12px">'+fmtDt(rep.data_reposicao)+'</span>'
            +(rep.observacao?'<span style="font-size:11px;color:#9ca3af">'+esc(rep.observacao)+'</span>':'')
            +'<span style="font-size:11px;color:#9ca3af">'+esc(rep.responsavel_nome||'')+'</span>'
            +'<button class="btn btn-sm btn-d" data-rep-del="'+rep.id+'" data-rep-ate="'+ateId+'">x</button>'
            +'</div>';
        }).join('');
      }
      if(pend>0){
        html+='<div style="margin-top:10px;padding:10px;background:#fefce8;border:1px solid #fde68a;border-radius:6px">';
        html+='<div style="font-size:11px;font-weight:600;color:#92400e;margin-bottom:8px">Registrar reposicoes pendentes — '+pend+' dia'+(pend>1?'s':'')+' restante'+(pend>1?'s':'')+'</div>';
        var today=new Date().toISOString().substring(0,10);
        for(var pi=1;pi<=pend;pi++){
          html+='<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:6px">';
          html+='<span class="bdg b-yellow" style="min-width:42px;text-align:center">Dia '+(feitos+pi)+'</span>';
          html+='<input type="date" id="rep-data-'+ateId+'-'+pi+'" value="'+today+'" style="border:1px solid #d1d5db;border-radius:6px;padding:5px 8px;font-size:12px"/>';
          html+='<input id="rep-obs-'+ateId+'-'+pi+'" placeholder="Obs. (opcional)" style="flex:1;min-width:100px;border:1px solid #d1d5db;border-radius:6px;padding:5px 8px;font-size:12px"/>';
          html+='<button class="btn btn-sm btn-p" id="rep-add-'+ateId+'-'+pi+'">Registrar</button>';
          html+='</div>';
        }
        html+='</div>';
      } else {
        html+='<div style="color:#16a34a;font-size:12px;margin-top:8px;font-weight:600">Todas as reposicoes foram concluidas!</div>';
      }
    }
    html+='</div>';
    if(a.descricao||a.responsavel_nome){
      html+='<div style="min-width:160px"><div style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:6px">DETALHES</div>';
      if(a.descricao)html+='<div style="font-size:12px;margin-bottom:4px"><b>Descricao:</b> '+esc(a.descricao)+'</div>';
      if(a.responsavel_nome)html+='<div style="font-size:12px"><b>Responsavel:</b> '+esc(a.responsavel_nome)+'</div>';
      html+='</div>';
    }
    html+='</div>';
    c.innerHTML=html;
    var pendNow=Math.max(0,parseInt(a.dias||0)-(r.data||[]).length);
    function bindRepBtn(pi2){
      var btn=document.getElementById('rep-add-'+ateId+'-'+pi2);
      if(!btn)return;
      btn.onclick=function(){
        var dtEl=document.getElementById('rep-data-'+ateId+'-'+pi2);
        if(!dtEl||!dtEl.value)return toast('Preencha a data de reposicao','er');
        var obsEl=document.getElementById('rep-obs-'+ateId+'-'+pi2);
        var payload={data_reposicao:dtEl.value,observacao:obsEl?obsEl.value||null:null};
        btn.disabled=true;
        api.post('/api/admin/atestados/'+ateId+'/reposicoes',payload).then(function(){
          toast('Reposicao registrada!');
          Promise.all([
            api.get('/api/admin/atestados?mes_ano='+ADM.mesFreq),
            api.get('/api/admin/reposicoes-atestados?mes_ano='+ADM.mesFreq)
          ]).then(function(rs){
            ADM.atestados=rs[0].data;ADM.reposicoes=rs[1].data;
            var sm=document.getElementById('ate-summary');if(sm)sm.innerHTML=renderAteSummary(ADM.atestados);
            var tb=document.getElementById('ate-table');if(tb){tb.innerHTML=renderAteTable(ADM.atestados);bindAteTable();}
            var rb=document.getElementById('rep-ate-body');if(rb)rb.innerHTML=renderRepAtestados(ADM.reposicoes);
            var tog=document.getElementById('rep-ate-tog');
            if(tog){var badge=tog.querySelector('span:last-child');if(badge)badge.innerHTML=bdg(ADM.reposicoes.length+' registro'+(ADM.reposicoes.length!==1?'s':''),'blue');}
            ateLoadExt(ateId);
          });
        }).catch(function(e){btn.disabled=false;toast(e.message,'er');});
      };
    }
    for(var bi=1;bi<=pendNow;bi++){bindRepBtn(bi);}
    c.onclick=function(ev){
      var bd=ev.target.closest('[data-rep-del]');
      if(bd){
        var rid=parseInt(bd.dataset.repDel);
        var aid2=parseInt(bd.dataset.repAte);
        if(confirm('Remover esta reposicao?'))
          api.del('/api/admin/atestados/'+aid2+'/reposicoes/'+rid).then(function(){
            toast('Removido!');
            api.get('/api/admin/atestados?mes_ano='+ADM.mesFreq).then(function(r){
              ADM.atestados=r.data;
              var sm=document.getElementById('ate-summary');if(sm)sm.innerHTML=renderAteSummary(ADM.atestados);
              var tb=document.getElementById('ate-table');if(tb){tb.innerHTML=renderAteTable(ADM.atestados);bindAteTable();}
              ateLoadExt(aid2);
            });
          }).catch(function(e){toast(e.message,'er');});
      }
    };
  }).catch(function(e){if(c)c.innerHTML='<div style="color:#dc2626;font-size:12px">Erro: '+e.message+'</div>';});
}
function bindAteTable(){
  var t=document.getElementById('ate-table');if(!t)return;
  var srch=document.getElementById('ate-srch');
  var tipoFlt=document.getElementById('ate-tipo-flt');
  var repFlt=document.getElementById('ate-rep-flt');
  var ateRel=document.getElementById('ate-rel');if(ateRel)ateRel.onclick=ateRelatorioModal;
  var applyFlt=function(){
    var s=srch?srch.value.toLowerCase():'';
    var tp=tipoFlt?tipoFlt.value:'';
    var rp=repFlt?repFlt.value:'';
    var filtered=ADM.atestados.filter(function(a){
      if(s&&!(a.agente_nome||'').toLowerCase().includes(s)&&!(a.qra||'').toLowerCase().includes(s)&&!(a.funcional||'').toLowerCase().includes(s))return false;
      if(tp&&a.tipo!==tp)return false;
      if(rp==='pend'&&!(a.tipo==='comum'&&parseInt(a.reposicoes_feitas||0)<parseInt(a.dias||0)))return false;
      if(rp==='ok'&&!(a.tipo==='cat'||(a.tipo==='comum'&&parseInt(a.reposicoes_feitas||0)>=parseInt(a.dias||0))))return false;
      return true;
    });
    t.innerHTML=renderAteTable(filtered);
    bindAteTableEvents();
  };
  if(srch)srch.oninput=applyFlt;
  if(tipoFlt)tipoFlt.onchange=applyFlt;
  if(repFlt)repFlt.onchange=applyFlt;
  bindAteTableEvents();
}
function bindAteTableEvents(){
  var t=document.getElementById('ate-table');if(!t)return;
  t.onclick=function(e){
    var be=e.target.closest('[data-ate-edit]');
    var bd=e.target.closest('[data-ate-del]');
    if(be){e.stopPropagation();var id=parseInt(be.dataset.ateEdit);var a=ADM.atestados.find(function(x){return x.id===id;});if(a)ateModal(a);return;}
    if(bd){e.stopPropagation();var id2=parseInt(bd.dataset.ateDel);if(confirm('Excluir este atestado e todas as reposicoes?'))
      api.del('/api/admin/atestados/'+id2).then(function(){
        toast('Removido!');ADM.atestados=ADM.atestados.filter(function(x){return x.id!==id2;});
        t.innerHTML=renderAteTable(ADM.atestados);bindAteTable();
        var sm=document.getElementById('ate-summary');if(sm)sm.innerHTML=renderAteSummary(ADM.atestados);
      }).catch(function(e){toast(e.message,'er');});return;}
    var row=e.target.closest('.ate-row');if(!row)return;
    var id3=parseInt(row.dataset.ateId);
    var ext=document.getElementById('ate-ext-'+id3);
    var arr=document.getElementById('ate-arr-'+id3);
    if(!ext)return;
    if(ext.style.display==='none'||!ext.style.display){
      document.querySelectorAll('tr[id^="ate-ext-"]').forEach(function(r){r.style.display='none';});
      document.querySelectorAll('[id^="ate-arr-"]').forEach(function(a){a.textContent='▶';});
      ext.style.display='table-row';if(arr)arr.textContent='▼';
      ateLoadExt(id3);
    } else {ext.style.display='none';if(arr)arr.textContent='▶';}
  };
}
function ateModal(a){
  var meses=admMesOpts();
  var body='<div class="fg">'
    +(a?'':'<div class="f1 full"><label>Buscar agente (funcional, QRA ou nome)</label><input id="ate-ag-s" placeholder="Digite funcional, QRA ou nome..." style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:7px 10px;font-size:13px;font-family:inherit"/></div>')
    +'<div class="f1 full"><label>Agente</label><select id="ate-ag"'+(a?' disabled':'')+'>'+agOpts(a?a.agente_id:'')+'</select></div>'
    +'<div class="f1"><label>Mes de Referencia</label><select id="ate-mes"'+(a?' disabled':'')+'>'+selOpts(meses,a?a.mes_ano:ADM.mesFreq)+'</select></div>'
    +'<div class="f1"><label>Tipo</label><select id="ate-tipo"><option value="comum"'+(a&&a.tipo==='comum'?' selected':'')+'>Comum (deve repor)</option><option value="cat"'+(a&&a.tipo==='cat'?' selected':'')+'>CAT - Acidente de Trabalho (sem reposicao)</option></select></div>'
    +'<div class="f1"><label>Data Inicio do Atestado</label><input type="date" id="ate-di" value="'+(a?a.data_inicio||'':'')+'"/></div>'
    +'<div class="f1"><label>Data Fim do Atestado</label><input type="date" id="ate-df" value="'+(a?a.data_fim||'':'')+'"/></div>'
    +'<div class="f1"><label>Quantidade de Dias</label><input type="number" id="ate-dias" min="1" value="'+(a?a.dias:1)+'"/><div style="font-size:10px;color:#9ca3af;margin-top:2px">Cada dia gera uma reposicao pendente (para tipo Comum)</div></div>'
    +'<div class="f1 full"><label>Descricao (CID, medico, hospital...)</label><input id="ate-desc" value="'+(a?esc(a.descricao||''):'')+'" placeholder="Ex: CID J00, Dr. Joao, Hospital Central"/></div>'
    +(!a?'<div class="f1 full" id="ate-rep-section" style="margin-top:4px"></div>':'')
    +'</div>';
  var isEdit=!!a;
  var footer='<button class="btn" id="ate-c">Cancelar</button><button class="btn btn-p" id="ate-ok">'+(isEdit?'Salvar':'Registrar')+'</button>';
  openModal('ate',(isEdit?'Editar':'Novo')+' Atestado','md',body,footer);
  if(!a)bindAgSrch('ate-ag-s','ate-ag');
  document.getElementById('ate-c').onclick=function(){closeModal('ate');};
  // Campos dinamicos de reposicao (somente no cadastro novo)
  function updateAteRepSection(){
    var sec=document.getElementById('ate-rep-section');if(!sec)return;
    var tipo=document.getElementById('ate-tipo');tipo=tipo?tipo.value:'';
    var dias=parseInt((document.getElementById('ate-dias')||{}).value)||0;
    if(tipo!=='comum'||dias<1){sec.innerHTML='';return;}
    var h='<div style="border:1px solid #e5e7eb;border-radius:8px;padding:10px 14px;background:#f8fafc">'
      +'<div style="font-size:11px;font-weight:700;color:#1A3A5C;margin-bottom:8px;text-transform:uppercase;letter-spacing:.5px">Datas de Reposicao <span style="font-weight:400;color:#9ca3af">(opcional — pode registrar depois)</span></div>';
    for(var i=1;i<=dias;i++){
      h+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">'
        +'<span class="bdg b-blue" style="min-width:42px;text-align:center">Dia '+i+'</span>'
        +'<input type="date" id="ate-rep-d-'+i+'" style="border:1px solid #d1d5db;border-radius:6px;padding:5px 8px;font-size:12px"/>'
        +'<input id="ate-rep-o-'+i+'" placeholder="Obs. (opcional)" style="flex:1;border:1px solid #d1d5db;border-radius:6px;padding:5px 8px;font-size:12px"/>'
        +'</div>';
    }
    h+='</div>';
    sec.innerHTML=h;
  }
  if(!a){
    var ateTipoEl=document.getElementById('ate-tipo');
    var ateDiasEl=document.getElementById('ate-dias');
    if(ateTipoEl)ateTipoEl.onchange=updateAteRepSection;
    if(ateDiasEl)ateDiasEl.oninput=updateAteRepSection;
    updateAteRepSection();
  }
  document.getElementById('ate-ok').onclick=function(){
    var payload={
      agente_id:a?a.agente_id:document.getElementById('ate-ag').value,
      mes_ano:a?a.mes_ano:document.getElementById('ate-mes').value,
      tipo:document.getElementById('ate-tipo').value,
      data_inicio:document.getElementById('ate-di').value,
      data_fim:document.getElementById('ate-df').value,
      dias:document.getElementById('ate-dias').value,
      descricao:document.getElementById('ate-desc').value||null
    };
    if(!payload.agente_id||!payload.mes_ano||!payload.data_inicio||!payload.data_fim||!payload.dias)
      return toast('Preencha: agente, mes, datas e quantidade de dias','er');
    var req=isEdit?api.put('/api/admin/atestados/'+a.id,payload):api.post('/api/admin/atestados',payload);
    req.then(function(res2){
      var ateId=res2&&res2.data?res2.data.id:null;
      // Coletar datas de reposicao preenchidas no formulario
      var repDatas=[];
      if(!isEdit&&payload.tipo==='comum'&&ateId){
        var nd=parseInt(payload.dias)||0;
        for(var ri=1;ri<=nd;ri++){
          var dtEl=document.getElementById('ate-rep-d-'+ri);
          if(dtEl&&dtEl.value){
            var obsEl=document.getElementById('ate-rep-o-'+ri);
            repDatas.push({data_reposicao:dtEl.value,observacao:obsEl?obsEl.value||null:null});
          }
        }
      }
      // Fechar modal e mostrar toast imediatamente
      toast(isEdit?'Atestado atualizado!':'Atestado registrado!');
      closeModal('ate');
      // Registrar reposicoes sequencialmente (sem bloquear o fluxo principal)
      var seq=Promise.resolve();
      repDatas.forEach(function(rd){
        seq=seq.then(function(){return api.post('/api/admin/atestados/'+ateId+'/reposicoes',rd);});
      });
      seq.catch(function(e){toast('Atestado salvo, mas erro ao registrar reposicao: '+e.message,'er');});
      // Atualizar dados independentemente
      seq.then(function(){}).catch(function(){}).then(function(){
        Promise.all([
          api.get('/api/admin/atestados?mes_ano='+ADM.mesFreq),
          api.get('/api/admin/reposicoes-atestados?mes_ano='+ADM.mesFreq)
        ]).then(function(rs){
          ADM.atestados=rs[0].data;ADM.reposicoes=rs[1].data;
          var tb=document.getElementById('ate-table');if(tb){tb.innerHTML=renderAteTable(ADM.atestados);bindAteTable();}
          var sm=document.getElementById('ate-summary');if(sm)sm.innerHTML=renderAteSummary(ADM.atestados);
          var rb=document.getElementById('rep-ate-body');if(rb)rb.innerHTML=renderRepAtestados(ADM.reposicoes);
          var tog=document.getElementById('rep-ate-tog');
          if(tog){var badge=tog.querySelector('span:last-child');if(badge)badge.innerHTML=bdg(ADM.reposicoes.length+' registro'+(ADM.reposicoes.length!==1?'s':''),'blue');}
        });
      });
    }).catch(function(e){toast(e.message,'er');});
  };
}
function ateRelatorioModal(){
  var meses=admMesOpts();
  var body='<div class="fg">'
    +'<div class="f1"><label>Mes</label><select id="ater-mes">'+selOpts(meses,ADM.mesFreq)+'</select></div>'
    +'<div class="f1"><label>Tipo</label><select id="ater-tipo"><option value="">Todos</option><option value="comum">Comum</option><option value="cat">CAT</option></select></div>'
    +'<div class="f1"><label>Situacao Reposicao</label><select id="ater-rep"><option value="">Todas</option><option value="pend">Pendentes</option><option value="ok">Concluidas</option></select></div>'
    +'</div>';
  var footer='<button class="btn" id="ater-c">Cancelar</button><button class="btn btn-p" id="ater-ok">Gerar PDF</button>';
  openModal('ater','Relatorio - Atestados','md',body,footer);
  document.getElementById('ater-c').onclick=function(){closeModal('ater');};
  document.getElementById('ater-ok').onclick=function(){
    var mes=document.getElementById('ater-mes').value;
    var tp=document.getElementById('ater-tipo').value;
    var rp=document.getElementById('ater-rep').value;
    closeModal('ater');
    api.get('/api/admin/atestados?mes_ano='+mes).then(function(r){
      var ats=r.data||[];
      if(tp)ats=ats.filter(function(a){return a.tipo===tp;});
      if(rp==='pend')ats=ats.filter(function(a){return a.tipo==='comum'&&parseInt(a.reposicoes_feitas||0)<parseInt(a.dias||0);});
      if(rp==='ok')ats=ats.filter(function(a){return a.tipo==='cat'||(a.tipo==='comum'&&parseInt(a.reposicoes_feitas||0)>=parseInt(a.dias||0));});
      var rows=ats.map(function(a){
        var feitos=parseInt(a.reposicoes_feitas||0);var total=parseInt(a.dias||0);
        var rep=a.tipo==='cat'?'N/A':(feitos+'/'+total+(feitos>=total?' - OK':' - Pendente'));
        return '<tr><td>'+esc(a.funcional||'--')+'</td><td>'+esc(a.agente_nome)+'</td><td>'+esc(a.qra||'--')+'</td>'
          +'<td>'+fmtDt(a.data_inicio)+' a '+fmtDt(a.data_fim)+'</td><td>'+total+'</td>'
          +'<td>'+a.tipo.toUpperCase()+'</td><td>'+rep+'</td><td>'+esc(a.descricao||'--')+'</td></tr>';
      }).join('');
      var html='<div style="font-family:Arial,sans-serif;font-size:12px;padding:20px">'
        +'<h2 style="margin:0 0 4px;color:#1e3a5f">RELATORIO — ATESTADOS</h2>'
        +'<div style="color:#6b7280;font-size:11px;margin-bottom:16px">Mes: '+mes+'  |  Gerado: '+new Date().toLocaleString('pt-BR')+'</div>'
        +'<table style="width:100%;border-collapse:collapse;font-size:11px">'
        +'<thead><tr style="background:#1e3a5f;color:#fff"><th style="padding:5px 6px;text-align:left">Funcional</th><th style="padding:5px 6px;text-align:left">Nome</th><th style="padding:5px 6px;text-align:left">QRA</th><th style="padding:5px 6px;text-align:left">Periodo</th><th style="padding:5px 6px">Dias</th><th style="padding:5px 6px">Tipo</th><th style="padding:5px 6px">Reposicao</th><th style="padding:5px 6px;text-align:left">Descricao</th></tr></thead>'
        +'<tbody>'+rows+'</tbody></table>'
        +'<div style="margin-top:12px;font-size:10px;color:#9ca3af">Total: '+ats.length+' atestados</div>'
        +'</div>';
      pdfFromHtml(html,'atestados_'+mes+'.pdf');
    }).catch(function(e){toast(e.message,'er');});
  };
}

// ── MOVIMENTACAO DE REPOSICOES DE ATESTADOS
function renderRepAtestados(reps){
  if(!reps||!reps.length)return '<div class="empty">Nenhuma reposicao registrada para este mes.</div>';
  var rows=reps.map(function(r){
    return '<tr>'
      +'<td>'+esc(r.funcional||'--')+'</td>'
      +'<td>'+esc(r.agente_nome)+'</td>'
      +'<td>'+esc(r.qra||'--')+'</td>'
      +'<td>'+esc(r.setor||'--')+'</td>'
      +'<td>'+fmtDt(r.data_inicio)+' a '+fmtDt(r.data_fim)+' <span class="bdg b-gray">'+r.dias+'d</span></td>'
      +'<td style="text-align:center"><span class="bdg b-blue">Dia '+r.num_dia+'</span></td>'
      +'<td>'+fmtDt(r.data_reposicao)+'</td>'
      +'<td>'+esc(r.responsavel_nome||'--')+'</td>'
      +'<td style="font-size:11px;color:#9ca3af">'+esc(r.observacao||'')+'</td>'
      +'<td><button class="btn btn-sm btn-d" data-rep-ate-del="'+r.id+'" data-rep-ate-aid="'+r.atestado_id+'">x</button></td>'
      +'</tr>';
  }).join('');
  return '<table><thead><tr><th>Funcional</th><th>Agente</th><th>QRA</th><th>Setor</th><th>Periodo do Atestado</th><th>Dia</th><th>Data Reposicao</th><th>Responsavel</th><th>Obs</th><th></th></tr></thead><tbody>'+rows+'</tbody></table>';
}
function bindRepAtestados(){
  var srch=document.getElementById('rep-ate-srch');
  var applyFilter=function(){
    var s=srch?srch.value.toLowerCase():'';
    var filtered=ADM.reposicoes.filter(function(r){
      if(s&&!(r.agente_nome||'').toLowerCase().includes(s)&&!(r.qra||'').toLowerCase().includes(s)&&!(r.funcional||'').toLowerCase().includes(s))return false;
      return true;
    });
    var b=document.getElementById('rep-ate-body');if(b)b.innerHTML=renderRepAtestados(filtered);
    bindRepAteTableClick();
  };
  if(srch)srch.oninput=applyFilter;
  bindRepAteTableClick();
}
function bindRepAteTableClick(){
  var t=document.getElementById('rep-ate-body');if(!t)return;
  t.onclick=function(ev){
    var bd=ev.target.closest('[data-rep-ate-del]');
    if(!bd)return;
    var rid=parseInt(bd.dataset.repAteDel);
    var aid=parseInt(bd.dataset.repAteAid);
    if(confirm('Remover esta reposicao?'))
      api.del('/api/admin/atestados/'+aid+'/reposicoes/'+rid).then(function(){
        toast('Reposicao removida!');
        Promise.all([
          api.get('/api/admin/atestados?mes_ano='+ADM.mesFreq),
          api.get('/api/admin/reposicoes-atestados?mes_ano='+ADM.mesFreq)
        ]).then(function(rs){
          ADM.atestados=rs[0].data;ADM.reposicoes=rs[1].data;
          var tb=document.getElementById('ate-table');if(tb){tb.innerHTML=renderAteTable(ADM.atestados);bindAteTable();}
          var sm=document.getElementById('ate-summary');if(sm)sm.innerHTML=renderAteSummary(ADM.atestados);
          var rb=document.getElementById('rep-ate-body');if(rb)rb.innerHTML=renderRepAtestados(ADM.reposicoes);
          var tog=document.getElementById('rep-ate-tog');
          if(tog){var badge=tog.querySelector('span:last-child');if(badge)badge.innerHTML=bdg(ADM.reposicoes.length+' registro'+(ADM.reposicoes.length!==1?'s':''),'blue');}
          bindRepAteTableClick();
        });
      }).catch(function(e){toast(e.message,'er');});
  };
}
function repAtestadosRelatorioModal(){
  var meses=admMesOpts();
  var body='<div class="fg">'
    +'<div class="f1"><label>Mes</label><select id="rr-mes">'+selOpts(meses,ADM.mesFreq)+'</select></div>'
    +'<div class="f1"><label>Agente</label><select id="rr-ag"><option value="">Todos</option>'+ADM.ags.map(function(a){return '<option value="'+a.id+'">['+esc(a.funcional||'--')+'] '+esc(a.qra||'')+' - '+esc(a.nome)+'</option>';}).join('')+'</select></div>'
    +'</div>';
  var footer='<button class="btn" id="rr-c">Cancelar</button><button class="btn btn-p" id="rr-ok">Gerar PDF</button>';
  openModal('rr','Relatorio — Movimentacao de Reposicoes','md',body,footer);
  document.getElementById('rr-c').onclick=function(){closeModal('rr');};
  document.getElementById('rr-ok').onclick=function(){
    var mes=document.getElementById('rr-mes').value;
    var ag=document.getElementById('rr-ag').value;
    closeModal('rr');
    api.get('/api/admin/reposicoes-atestados?mes_ano='+mes).then(function(r){
      var reps=r.data||[];
      if(ag)reps=reps.filter(function(x){return String(x.agente_id||x.atestado_id)===ag||(ADM.ags.find(function(a){return String(a.id)===ag&&a.nome===x.agente_nome;}));});
      var rows=reps.map(function(x){
        return '<tr><td>'+esc(x.funcional||'--')+'</td><td>'+esc(x.agente_nome)+'</td><td>'+esc(x.qra||'--')+'</td><td>'+esc(x.setor||'--')+'</td>'
          +'<td>'+fmtDt(x.data_inicio)+' a '+fmtDt(x.data_fim)+'</td><td style="text-align:center">'+x.num_dia+'/'+x.dias+'</td>'
          +'<td>'+fmtDt(x.data_reposicao)+'</td><td>'+esc(x.responsavel_nome||'--')+'</td><td>'+esc(x.observacao||'')+'</td></tr>';
      }).join('');
      var html='<div style="font-family:Arial,sans-serif;font-size:12px;padding:20px">'
        +'<h2 style="margin:0 0 4px;color:#1e3a5f">RELATORIO — MOVIMENTACAO DE REPOSICOES</h2>'
        +'<div style="color:#6b7280;font-size:11px;margin-bottom:16px">Mes: '+mes+'  |  Gerado: '+new Date().toLocaleString('pt-BR')+'</div>'
        +'<table style="width:100%;border-collapse:collapse;font-size:11px">'
        +'<thead><tr style="background:#1e3a5f;color:#fff"><th style="padding:5px 6px;text-align:left">Funcional</th><th style="padding:5px 6px;text-align:left">Agente</th><th style="padding:5px 6px;text-align:left">QRA</th><th style="padding:5px 6px;text-align:left">Setor</th><th style="padding:5px 6px;text-align:left">Periodo Atestado</th><th style="padding:5px 6px">Dia</th><th style="padding:5px 6px;text-align:left">Data Reposicao</th><th style="padding:5px 6px;text-align:left">Responsavel</th><th style="padding:5px 6px;text-align:left">Obs</th></tr></thead>'
        +'<tbody>'+rows+'</tbody></table>'
        +'<div style="margin-top:12px;font-size:10px;color:#9ca3af">Total: '+reps.length+' reposicoes</div>'
        +'</div>';
      pdfFromHtml(html,'reposicoes_'+mes+'.pdf');
    }).catch(function(e){toast(e.message,'er');});
  };
}

// ── ABONOS
function renderAbonos(){
  var meses=admMesOpts();
  var distintos=ADM.abonos.map(function(a){return a.agente_id;}).filter(function(v,i,ar){return ar.indexOf(v)===i;}).length;
  var html='<div class="adm-sh">'
    +'<div><div class="adm-sh-title">Abonos</div><div class="adm-sh-sub">Registro de abonos por agente no mes</div></div>'
    +'<div class="adm-sh-acts"><button class="btn" id="abo-rel">Relatorio PDF</button><button class="btn btn-p" id="abo-novo">+ Novo Abono</button></div>'
    +'</div>';
  html+='<div class="kgrid" style="grid-template-columns:repeat(3,1fr);margin-bottom:14px">';
  html+='<div class="kc" style="border-top:3px solid #1A3A5C"><div class="kl">Total de Abonos</div><div class="kv">'+ADM.abonos.length+'</div><div class="ks">no mes selecionado</div></div>';
  html+='<div class="kc" style="border-top:3px solid #0891b2"><div class="kl">Agentes com Abono</div><div class="kv" style="color:#0891b2">'+distintos+'</div><div class="ks">agentes distintos</div></div>';
  html+='<div class="kc" style="border-top:3px solid #9ca3af"><div class="kl">Mes de Referencia</div><div class="kv" style="color:#6b7280;font-size:16px">'+ADM.mesFreq+'</div><div class="ks">referencia atual</div></div>';
  html+='</div>';
  html+='<div class="flt-bar">';
  html+='<input id="abo-srch" placeholder="Buscar por agente, QRA ou funcional..." style="flex:2;min-width:200px"/>';
  html+='<select id="abo-mes-flt" style="min-width:140px">'+selOpts(meses,ADM.mesFreq)+'</select>';
  html+='</div>';
  html+=admToggleBtn('abo-tog','Lista de Abonos',ADM.abonos.length);
  html+='<div id="abo-table" style="display:none">'+renderAboTable(ADM.abonos)+'</div>';
  return html;
}
function renderAboTable(abs){
  if(!abs.length)return '<div class="empty">Nenhum abono encontrado para este mes.</div>';
  var rows=abs.map(function(a){
    return '<tr class="abo-row" data-abo-id="'+a.id+'" style="cursor:pointer">'
      +'<td style="width:16px" id="abo-arr-'+a.id+'">&#9658;</td>'
      +'<td><div style="font-weight:500">'+esc(a.agente_nome)+'</div><div style="font-size:10px;color:#9ca3af">'+esc(a.qra||'')+'</div></td>'
      +'<td style="font-family:monospace;font-size:11px">'+esc(a.funcional||'--')+'</td>'
      +'<td>'+fmtDt(a.data)+'</td>'
      +'<td style="font-size:12px;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">'+esc(a.motivo||'--')+'</td>'
      +'<td><button class="btn btn-sm btn-d" data-abo-del="'+a.id+'">Excluir</button></td>'
      +'</tr>'
      +'<tr id="abo-ext-'+a.id+'" style="display:none"><td colspan="6" style="background:#f8fafc;padding:12px 20px">'
        +'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px">'
        +'<div><div style="font-size:10px;color:#9ca3af;text-transform:uppercase;font-weight:600">QRA</div><div style="font-size:13px">'+esc(a.qra||'--')+'</div></div>'
        +'<div><div style="font-size:10px;color:#9ca3af;text-transform:uppercase;font-weight:600">Setor</div><div style="font-size:13px">'+esc(a.setor||'--')+'</div></div>'
        +'<div><div style="font-size:10px;color:#9ca3af;text-transform:uppercase;font-weight:600">Nr C.I.</div><div style="font-family:monospace;font-size:13px">'+esc(a.numero_ci||'--')+'</div></div>'
        +'<div><div style="font-size:10px;color:#9ca3af;text-transform:uppercase;font-weight:600">Responsavel</div><div style="font-size:13px">'+esc(a.responsavel_nome||'--')+'</div></div>'
        +'<div style="grid-column:1/-1"><div style="font-size:10px;color:#9ca3af;text-transform:uppercase;font-weight:600">Motivo Completo</div><div style="font-size:13px">'+esc(a.motivo||'--')+'</div></div>'
        +'</div>'
      +'</td></tr>';
  });
  return tableHtml(['','Agente','Funcional','Data','Motivo','Acoes'],rows);
}
function bindAboTable(){
  var t=document.getElementById('abo-table');if(!t)return;
  var srch=document.getElementById('abo-srch');
  if(srch)srch.oninput=function(){
    var s=this.value.toLowerCase();
    var filtered=ADM.abonos.filter(function(a){
      return !s||(a.agente_nome||'').toLowerCase().includes(s)||(a.qra||'').toLowerCase().includes(s)||(a.funcional||'').toLowerCase().includes(s);
    });
    t.innerHTML=renderAboTable(filtered);
  };
  t.onclick=function(e){
    var bd=e.target.closest('[data-abo-del]');
    if(bd){
      e.stopPropagation();
      var id=parseInt(bd.dataset.aboDel);
      if(confirm('Excluir este abono?'))
        api.del('/api/admin/abonos/'+id).then(function(){
          toast('Removido!');ADM.abonos=ADM.abonos.filter(function(x){return x.id!==id;});
          t.innerHTML=renderAboTable(ADM.abonos);bindAboTable();
        }).catch(function(e){toast(e.message,'er');});
      return;
    }
    var row=e.target.closest('.abo-row');
    if(row){
      var rid=row.dataset.aboId;
      var ext=document.getElementById('abo-ext-'+rid);
      var arr=document.getElementById('abo-arr-'+rid);
      if(ext){
        var open=ext.style.display==='none';
        ext.style.display=open?'':'none';
        if(arr)arr.innerHTML=open?'&#9660;':'&#9658;';
      }
    }
  };
}
function abonoModal(){
  var meses=admMesOpts();
  var body='<div class="fg">'
    +'<div class="f1 full"><label>Buscar agente (funcional, QRA ou nome)</label><input id="abo-ag-s" placeholder="Digite funcional, QRA ou nome..." style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:7px 10px;font-size:13px;font-family:inherit"/></div>'
    +'<div class="f1 full"><label>Agente</label><select id="abo-ag">'+agOpts('')+'</select></div>'
    +'<div class="f1"><label>Mes de Referencia</label><select id="abo-mes">'+selOpts(meses,ADM.mesFreq)+'</select></div>'
    +'<div class="f1"><label>Data do Abono</label><input type="date" id="abo-data" value="'+new Date().toISOString().substring(0,10)+'"/></div>'
    +'<div class="f1"><label>Nr C.I.</label><input id="abo-ci" placeholder="Numero da C.I."/></div>'
    +'<div class="f1 full"><label>Motivo</label><input id="abo-mot" placeholder="Descricao do motivo do abono"/></div>'
    +'</div>';
  var footer='<button class="btn" id="abo-c">Cancelar</button><button class="btn btn-p" id="abo-ok">Registrar Abono</button>';
  openModal('abo','Novo Abono','md',body,footer);
  bindAgSrch('abo-ag-s','abo-ag');
  document.getElementById('abo-c').onclick=function(){closeModal('abo');};
  document.getElementById('abo-ok').onclick=function(){
    var payload={
      agente_id:document.getElementById('abo-ag').value,
      mes_ano:document.getElementById('abo-mes').value,
      data:document.getElementById('abo-data').value,
      numero_ci:document.getElementById('abo-ci').value||null,
      motivo:document.getElementById('abo-mot').value||null
    };
    if(!payload.agente_id||!payload.mes_ano||!payload.data)return toast('Preencha: agente, mes e data','er');
    api.post('/api/admin/abonos',payload).then(function(){
      toast('Abono registrado!');closeModal('abo');
      api.get('/api/admin/abonos?mes_ano='+ADM.mesFreq).then(function(r){
        ADM.abonos=r.data;
        var t=document.getElementById('abo-table');if(t){t.innerHTML=renderAboTable(ADM.abonos);bindAboTable();}
      });
    }).catch(function(e){toast(e.message,'er');});
  };
}
function aboRelatorioModal(){
  var meses=admMesOpts();
  var setores=[['','Todos os Setores'],['ROCAM','ROCAM'],['PATAMO','PATAMO'],['Administrativo','Administrativo'],['Motoristas','Motoristas'],['Reserva','Reserva']];
  var body='<div class="fg">'
    +'<div class="f1"><label>Mes de Referencia</label><select id="abo-rel-mes">'+selOpts(meses,ADM.mesFreq)+'</select></div>'
    +'<div class="f1"><label>Setor / Equipe</label><select id="abo-rel-set">'+selOpts(setores,'')+'</select></div>'
    +'<div class="f1 full"><label>Agente (opcional)</label><input id="abo-rel-ag-s" placeholder="Digite para filtrar por agente..." style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:7px 10px;font-size:13px;font-family:inherit"/></div>'
    +'<div class="f1 full"><label>Agente</label><select id="abo-rel-ag"><option value="">-- Todos os agentes --</option>'+agOpts('')+'</select></div>'
    +'</div>';
  var footer='<button class="btn" id="abo-rel-c">Cancelar</button><button class="btn btn-p" id="abo-rel-ok">Gerar PDF</button>';
  openModal('abo-rel','Relatorio de Abonos','md',body,footer);
  bindAgSrch('abo-rel-ag-s','abo-rel-ag');
  document.getElementById('abo-rel-c').onclick=function(){closeModal('abo-rel');};
  document.getElementById('abo-rel-ok').onclick=function(){
    var mes=document.getElementById('abo-rel-mes').value;
    var set=document.getElementById('abo-rel-set').value;
    var agSel=document.getElementById('abo-rel-ag');
    var agId=agSel?agSel.value:'';
    var agNome=agSel&&agSel.value?agSel.options[agSel.selectedIndex].text:'Todos';
    api.get('/api/admin/abonos?mes_ano='+mes).then(function(r){
      var abs=r.data;
      if(set)abs=abs.filter(function(a){return (a.setor||'')==set;});
      if(agId)abs=abs.filter(function(a){return String(a.agente_id)===String(agId);});
      var tbl='<table style="width:100%;border-collapse:collapse;font-size:12px">'
        +'<thead><tr style="background:#1e3a5f;color:#fff">'
        +'<th style="padding:6px;text-align:left">Agente</th>'
        +'<th style="padding:6px;text-align:left">Funcional</th>'
        +'<th style="padding:6px;text-align:left">Setor</th>'
        +'<th style="padding:6px;text-align:left">Data</th>'
        +'<th style="padding:6px;text-align:left">Nr C.I.</th>'
        +'<th style="padding:6px;text-align:left">Motivo</th>'
        +'<th style="padding:6px;text-align:left">Responsavel</th>'
        +'</tr></thead><tbody>';
      abs.forEach(function(a,i){
        var bg=i%2===0?'#f8fafc':'#fff';
        tbl+='<tr style="background:'+bg+'">'
          +'<td style="padding:5px 6px">'+esc(a.agente_nome)+'</td>'
          +'<td style="padding:5px 6px;font-family:monospace">'+esc(a.funcional||'--')+'</td>'
          +'<td style="padding:5px 6px">'+esc(a.setor||'--')+'</td>'
          +'<td style="padding:5px 6px">'+fmtDt(a.data)+'</td>'
          +'<td style="padding:5px 6px;font-family:monospace">'+esc(a.numero_ci||'--')+'</td>'
          +'<td style="padding:5px 6px">'+esc(a.motivo||'--')+'</td>'
          +'<td style="padding:5px 6px">'+esc(a.responsavel_nome||'--')+'</td>'
          +'</tr>';
      });
      tbl+='</tbody></table>';
      var html='<div style="font-family:Arial,sans-serif;padding:24px">'
        +'<div style="text-align:center;margin-bottom:20px">'
        +'<div style="font-size:18px;font-weight:700;color:#1e3a5f">RELATORIO DE ABONOS</div>'
        +'<div style="font-size:13px;color:#6b7280">GCM Serra &bull; Referencia: '+mes+(set?' &bull; Setor: '+set:'')+(agId?' &bull; Agente: '+agNome:'')+'</div>'
        +'</div>'
        +'<div style="margin-bottom:12px;font-size:12px;color:#374151">Total de registros: <strong>'+abs.length+'</strong></div>'
        +tbl
        +'<div style="margin-top:20px;font-size:10px;color:#9ca3af;text-align:center">Gerado em '+new Date().toLocaleString('pt-BR')+' &bull; Bluecore ERP v4</div>'
        +'</div>';
      pdfFromHtml(html,'relatorio-abonos-'+mes+'.pdf');
      closeModal('abo-rel');
    }).catch(function(e){toast(e.message,'er');});
  };
}

// ── DOACAO DE SANGUE
function renderDoacoes(){
  var meses=admMesOpts();
  var distintos=ADM.doacoes.map(function(d){return d.agente_id;}).filter(function(v,i,ar){return ar.indexOf(v)===i;}).length;
  var html='<div class="adm-sh">'
    +'<div><div class="adm-sh-title">Doacoes de Sangue</div><div class="adm-sh-sub">Registro de doacoes de sangue dos agentes</div></div>'
    +'<div class="adm-sh-acts"><button class="btn" id="ds-rel">Relatorio PDF</button><button class="btn btn-p" id="ds-novo">+ Registrar Doacao</button></div>'
    +'</div>';
  html+='<div class="kgrid" style="grid-template-columns:repeat(3,1fr);margin-bottom:14px">';
  html+='<div class="kc" style="border-top:3px solid #e11d48"><div class="kl">Doacoes no Mes</div><div class="kv" style="color:#e11d48">'+ADM.doacoes.length+'</div><div class="ks">registros</div></div>';
  html+='<div class="kc" style="border-top:3px solid #dc2626"><div class="kl">Doadores</div><div class="kv" style="color:#dc2626">'+distintos+'</div><div class="ks">agentes distintos</div></div>';
  html+='<div class="kc" style="border-top:3px solid #9ca3af"><div class="kl">Mes de Referencia</div><div class="kv" style="color:#6b7280;font-size:16px">'+ADM.mesFreq+'</div><div class="ks">referencia atual</div></div>';
  html+='</div>';
  html+='<div class="flt-bar">';
  html+='<input id="ds-srch" placeholder="Buscar por agente, QRA ou funcional..." style="flex:2;min-width:200px"/>';
  html+='<select id="ds-mes-flt" style="min-width:140px">'+selOpts(meses,ADM.mesFreq)+'</select>';
  html+='</div>';
  html+=admToggleBtn('ds-tog','Lista de Doacoes de Sangue',ADM.doacoes.length);
  html+='<div id="ds-table" style="display:none">'+renderDsTable(ADM.doacoes)+'</div>';
  return html;
}
function renderDsTable(dss){
  if(!dss.length)return '<div class="empty">Nenhuma doacao de sangue registrada para este mes.</div>';
  var rows=dss.map(function(d){
    return '<tr class="ds-row" data-ds-id="'+d.id+'" style="cursor:pointer">'
      +'<td style="width:16px" id="ds-arr-'+d.id+'">&#9658;</td>'
      +'<td><div style="font-weight:500">'+esc(d.agente_nome)+'</div><div style="font-size:10px;color:#9ca3af">'+esc(d.qra||'')+'</div></td>'
      +'<td style="font-family:monospace;font-size:11px">'+esc(d.funcional||'--')+'</td>'
      +'<td><span class="bdg b-red">'+fmtDt(d.data_doacao)+'</span></td>'
      +'<td><button class="btn btn-sm btn-d" data-ds-del="'+d.id+'">Excluir</button></td>'
      +'</tr>'
      +'<tr id="ds-ext-'+d.id+'" style="display:none"><td colspan="5" style="background:#fff5f5;padding:12px 20px">'
        +'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px">'
        +'<div><div style="font-size:10px;color:#9ca3af;text-transform:uppercase;font-weight:600">QRA</div><div style="font-size:13px">'+esc(d.qra||'--')+'</div></div>'
        +'<div><div style="font-size:10px;color:#9ca3af;text-transform:uppercase;font-weight:600">Setor</div><div style="font-size:13px">'+esc(d.setor||'--')+'</div></div>'
        +'<div><div style="font-size:10px;color:#9ca3af;text-transform:uppercase;font-weight:600">Data da Doacao</div><div style="font-size:13px;color:#dc2626;font-weight:600">'+fmtDt(d.data_doacao)+'</div></div>'
        +'<div><div style="font-size:10px;color:#9ca3af;text-transform:uppercase;font-weight:600">Responsavel pelo Registro</div><div style="font-size:13px">'+esc(d.responsavel_nome||'--')+'</div></div>'
        +'</div>'
      +'</td></tr>';
  });
  return tableHtml(['','Agente','Funcional','Data da Doacao','Acoes'],rows);
}
function bindDsTable(){
  var t=document.getElementById('ds-table');if(!t)return;
  var srch=document.getElementById('ds-srch');
  if(srch)srch.oninput=function(){
    var s=this.value.toLowerCase();
    var filtered=ADM.doacoes.filter(function(d){
      return !s||(d.agente_nome||'').toLowerCase().includes(s)||(d.qra||'').toLowerCase().includes(s)||(d.funcional||'').toLowerCase().includes(s);
    });
    t.innerHTML=renderDsTable(filtered);
  };
  t.onclick=function(e){
    var bd=e.target.closest('[data-ds-del]');
    if(bd){
      e.stopPropagation();
      var id=parseInt(bd.dataset.dsDel);
      if(confirm('Excluir este registro?'))
        api.del('/api/admin/doacoes-sangue/'+id).then(function(){
          toast('Removido!');ADM.doacoes=ADM.doacoes.filter(function(x){return x.id!==id;});
          t.innerHTML=renderDsTable(ADM.doacoes);bindDsTable();
        }).catch(function(e){toast(e.message,'er');});
      return;
    }
    var row=e.target.closest('.ds-row');
    if(row){
      var rid=row.dataset.dsId;
      var ext=document.getElementById('ds-ext-'+rid);
      var arr=document.getElementById('ds-arr-'+rid);
      if(ext){
        var open=ext.style.display==='none';
        ext.style.display=open?'':'none';
        if(arr)arr.innerHTML=open?'&#9660;':'&#9658;';
      }
    }
  };
}
function doacaoModal(){
  var meses=admMesOpts();
  var body='<div class="fg">'
    +'<div class="f1 full"><label>Buscar agente (funcional, QRA ou nome)</label><input id="ds-ag-s" placeholder="Digite funcional, QRA ou nome..." style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:7px 10px;font-size:13px;font-family:inherit"/></div>'
    +'<div class="f1 full"><label>Agente</label><select id="ds-ag">'+agOpts('')+'</select></div>'
    +'<div class="f1"><label>Mes de Referencia</label><select id="ds-mes">'+selOpts(meses,ADM.mesFreq)+'</select></div>'
    +'<div class="f1"><label>Data da Doacao</label><input type="date" id="ds-data" value="'+new Date().toISOString().substring(0,10)+'"/></div>'
    +'</div>';
  var footer='<button class="btn" id="ds-c">Cancelar</button><button class="btn btn-p" id="ds-ok">Registrar Doacao</button>';
  openModal('ds','Registrar Doacao de Sangue','md',body,footer);
  bindAgSrch('ds-ag-s','ds-ag');
  document.getElementById('ds-c').onclick=function(){closeModal('ds');};
  document.getElementById('ds-ok').onclick=function(){
    var payload={
      agente_id:document.getElementById('ds-ag').value,
      mes_ano:document.getElementById('ds-mes').value,
      data_doacao:document.getElementById('ds-data').value
    };
    if(!payload.agente_id||!payload.mes_ano||!payload.data_doacao)return toast('Preencha todos os campos','er');
    api.post('/api/admin/doacoes-sangue',payload).then(function(){
      toast('Doacao registrada!');closeModal('ds');
      api.get('/api/admin/doacoes-sangue?mes_ano='+ADM.mesFreq).then(function(r){
        ADM.doacoes=r.data;
        var t=document.getElementById('ds-table');if(t){t.innerHTML=renderDsTable(ADM.doacoes);bindDsTable();}
      });
    }).catch(function(e){toast(e.message,'er');});
  };
}
function dsRelatorioModal(){
  var meses=admMesOpts();
  var setores=[['','Todos os Setores'],['ROCAM','ROCAM'],['PATAMO','PATAMO'],['Administrativo','Administrativo'],['Motoristas','Motoristas'],['Reserva','Reserva']];
  var body='<div class="fg">'
    +'<div class="f1"><label>Mes de Referencia</label><select id="ds-rel-mes">'+selOpts(meses,ADM.mesFreq)+'</select></div>'
    +'<div class="f1"><label>Setor / Equipe</label><select id="ds-rel-set">'+selOpts(setores,'')+'</select></div>'
    +'<div class="f1 full"><label>Agente (opcional)</label><input id="ds-rel-ag-s" placeholder="Digite para filtrar por agente..." style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:7px 10px;font-size:13px;font-family:inherit"/></div>'
    +'<div class="f1 full"><label>Agente</label><select id="ds-rel-ag"><option value="">-- Todos os agentes --</option>'+agOpts('')+'</select></div>'
    +'</div>';
  var footer='<button class="btn" id="ds-rel-c">Cancelar</button><button class="btn btn-p" id="ds-rel-ok">Gerar PDF</button>';
  openModal('ds-rel','Relatorio de Doacoes de Sangue','md',body,footer);
  bindAgSrch('ds-rel-ag-s','ds-rel-ag');
  document.getElementById('ds-rel-c').onclick=function(){closeModal('ds-rel');};
  document.getElementById('ds-rel-ok').onclick=function(){
    var mes=document.getElementById('ds-rel-mes').value;
    var set=document.getElementById('ds-rel-set').value;
    var agSel=document.getElementById('ds-rel-ag');
    var agId=agSel?agSel.value:'';
    var agNome=agSel&&agSel.value?agSel.options[agSel.selectedIndex].text:'Todos';
    api.get('/api/admin/doacoes-sangue?mes_ano='+mes).then(function(r){
      var dss=r.data;
      if(set)dss=dss.filter(function(d){return (d.setor||'')==set;});
      if(agId)dss=dss.filter(function(d){return String(d.agente_id)===String(agId);});
      var tbl='<table style="width:100%;border-collapse:collapse;font-size:12px">'
        +'<thead><tr style="background:#7f1d1d;color:#fff">'
        +'<th style="padding:6px;text-align:left">Agente</th>'
        +'<th style="padding:6px;text-align:left">QRA</th>'
        +'<th style="padding:6px;text-align:left">Funcional</th>'
        +'<th style="padding:6px;text-align:left">Setor</th>'
        +'<th style="padding:6px;text-align:left">Data da Doacao</th>'
        +'<th style="padding:6px;text-align:left">Responsavel</th>'
        +'</tr></thead><tbody>';
      dss.forEach(function(d,i){
        var bg=i%2===0?'#fff5f5':'#fff';
        tbl+='<tr style="background:'+bg+'">'
          +'<td style="padding:5px 6px">'+esc(d.agente_nome)+'</td>'
          +'<td style="padding:5px 6px">'+esc(d.qra||'--')+'</td>'
          +'<td style="padding:5px 6px;font-family:monospace">'+esc(d.funcional||'--')+'</td>'
          +'<td style="padding:5px 6px">'+esc(d.setor||'--')+'</td>'
          +'<td style="padding:5px 6px;color:#dc2626;font-weight:600">'+fmtDt(d.data_doacao)+'</td>'
          +'<td style="padding:5px 6px">'+esc(d.responsavel_nome||'--')+'</td>'
          +'</tr>';
      });
      tbl+='</tbody></table>';
      var html='<div style="font-family:Arial,sans-serif;padding:24px">'
        +'<div style="text-align:center;margin-bottom:20px">'
        +'<div style="font-size:18px;font-weight:700;color:#7f1d1d">RELATORIO DE DOACOES DE SANGUE</div>'
        +'<div style="font-size:13px;color:#6b7280">GCM Serra &bull; Referencia: '+mes+(set?' &bull; Setor: '+set:'')+(agId?' &bull; Agente: '+agNome:'')+'</div>'
        +'</div>'
        +'<div style="margin-bottom:12px;font-size:12px;color:#374151">Total de registros: <strong>'+dss.length+'</strong></div>'
        +tbl
        +'<div style="margin-top:20px;font-size:10px;color:#9ca3af;text-align:center">Gerado em '+new Date().toLocaleString('pt-BR')+' &bull; Bluecore ERP v4</div>'
        +'</div>';
      pdfFromHtml(html,'relatorio-doacoes-sangue-'+mes+'.pdf');
      closeModal('ds-rel');
    }).catch(function(e){toast(e.message,'er');});
  };
}

// =====================================================================
// FÉRIAS
// =====================================================================
var FER={flt:{setor:'',letra:'',subequipe:'',ano_ferias:'',mes_ferias:'',status:''},list:[],editId:null};
var FER_MESES=['','Janeiro','Fevereiro','Marco','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
var FER_STATUS=['Pendente','Em tramitacao','Aprovado','Concedido','Suspenso','Cancelado'];
var FER_COLS=[
  {k:'setor',l:'Setor'},
  {k:'concurso',l:'Concurso'},
  {k:'mes_ferias_label',l:'Mes Ferias'},
  {k:'ano_ferias',l:'Ano'},
  {k:'periodo_aquisitivo',l:'Per. Aquisitivo'},
  {k:'qra',l:'QRA'},
  {k:'agente_nome',l:'Nome'},
  {k:'funcional',l:'Funcional'},
  {k:'data_inicio',l:'Dt Inicio'},
  {k:'data_fim',l:'Dt Fim'},
  {k:'qtd_dias',l:'Dias'},
  {k:'exercicio',l:'Exercicio'},
  {k:'fracionamento_label',l:'Fracion.'},
  {k:'processo',l:'Processo'},
  {k:'opcao_definida',l:'Opcao'},
  {k:'setor_programacao',l:'Set.Prog.'},
  {k:'data_inicio_periodo_aquisitivo',l:'Ini.Per.Aquis.'},
  {k:'data_fim_periodo_aquisitivo',l:'Fim.Per.Aquis.'},
  {k:'data_inicio_processo_concessivo',l:'Ini.Proc.Con.'},
  {k:'data_fim_processo_concessivo',l:'Fim.Proc.Con.'},
  {k:'periodo_prescricional',l:'Per.Prescr.'},
  {k:'programacao',l:'Programacao'},
  {k:'historico_alteracao',l:'Historico'},
  {k:'status_tramitacao',l:'Status'}
];

function ferPrep(f){
  return Object.assign({},f,{
    mes_ferias_label:f.mes_ferias?FER_MESES[parseInt(f.mes_ferias)]||f.mes_ferias:'',
    periodo_aquisitivo:f.periodo_aquisitivo_inicio&&f.periodo_aquisitivo_fim?(f.periodo_aquisitivo_inicio+'/'+f.periodo_aquisitivo_fim):'',
    fracionamento_label:f.fracionamento?'Sim':'Nao',
    setor:f.setor||f.agente_setor||''
  });
}

function renderFerias(){
  var anoAtual=new Date().getFullYear();
  var anos=[];for(var y=anoAtual-5;y<=anoAtual+3;y++)anos.push(y);
  var setOpts=[['','Todos os Setores']].concat(SETORES.map(function(s){return[s,s];}));
  var letOpts=[['','Todas as Equipes']].concat(LETRAS.map(function(l){return[l,'Equipe '+l];}));
  var stOpts=[['','Todos os Status']].concat(FER_STATUS.map(function(s){return[s,s];}));
  var mesOpts=[['','Todos os Meses']].concat(FER_MESES.slice(1).map(function(m,i){return[String(i+1),m];}));
  var anoOpts=[['','Todos os Anos']].concat(anos.map(function(y){return[String(y),String(y)];}));
  var html=ph('Ferias','Programacao e controle de ferias dos agentes');
  html+='<div class="flt-bar" style="flex-wrap:wrap;gap:8px">';
  html+='<div class="f1"><label>Setor</label><select id="fer-flt-set">'+selOpts(setOpts,FER.flt.setor)+'</select></div>';
  html+='<div class="f1"><label>Equipe</label><select id="fer-flt-l">'+selOpts(letOpts,FER.flt.letra)+'</select></div>';
  html+='<div class="f1"><label>Subequipe</label><input id="fer-flt-seq" placeholder="Subequipe..." value="'+esc(FER.flt.subequipe)+'"/></div>';
  html+='<div class="f1"><label>Mes Ferias</label><select id="fer-flt-mes">'+selOpts(mesOpts,FER.flt.mes_ferias)+'</select></div>';
  html+='<div class="f1"><label>Ano Ferias</label><select id="fer-flt-ano">'+selOpts(anoOpts,FER.flt.ano_ferias)+'</select></div>';
  html+='<div class="f1"><label>Status</label><select id="fer-flt-st">'+selOpts(stOpts,FER.flt.status)+'</select></div>';
  html+='<button class="btn btn-p" id="fer-flt-btn">Filtrar</button>';
  html+='<button class="btn" id="fer-pdf-btn">PDF</button>';
  html+='<button class="btn btn-p" id="fer-new-btn" style="margin-left:auto">+ Nova Ferias</button>';
  html+='</div>';
  html+='<div id="fer-res"><div class="empty">Clique em Filtrar para carregar.</div></div>';
  return html;
}

function renderFeriasTbl(list){
  if(!list.length)return '<div class="empty">Nenhum registro encontrado.</div>';
  var items=list.map(ferPrep);
  var ferStatusCor={Pendente:'gray',Aprovado:'green',Concedido:'green','Em tramitacao':'blue',Suspenso:'red',Cancelado:'red'};
  var h='<div style="overflow-x:auto;border-radius:10px;border:1px solid #e5e7eb;margin-top:4px">';
  h+='<table style="border-collapse:collapse;font-size:11px;white-space:nowrap;width:100%">';
  h+='<thead><tr>';
  FER_COLS.forEach(function(c){
    h+='<th style="background:#1A3A5C;color:#fff;padding:7px 8px;text-align:left;font-weight:700;font-size:10px">'+c.l+'</th>';
  });
  h+='<th style="background:#1A3A5C;color:#fff;padding:7px 8px;text-align:center;font-size:10px">Acoes</th>';
  h+='</tr></thead><tbody>';
  items.forEach(function(f,ri){
    var bg=ri%2===0?'#fff':'#f8fafc';
    h+='<tr style="background:'+bg+'">';
    FER_COLS.forEach(function(c){
      var val=f[c.k]!=null?String(f[c.k]):'';
      var isStatus=c.k==='status_tramitacao';
      if(isStatus){
        var cor=ferStatusCor[val]||'gray';
        h+='<td style="padding:5px 8px;border-bottom:1px solid #f3f4f6">'+bdg(val,cor)+'</td>';
      } else {
        var truncar=c.k==='programacao'||c.k==='historico_alteracao';
        var disp=truncar&&val.length>30?val.substring(0,30)+'...':val;
        h+='<td style="padding:5px 8px;border-bottom:1px solid #f3f4f6;max-width:160px;overflow:hidden;text-overflow:ellipsis" title="'+esc(val)+'">'+esc(disp)+'</td>';
      }
    });
    h+='<td style="padding:4px 6px;border-bottom:1px solid #f3f4f6;text-align:center;white-space:nowrap">';
    h+='<button class="btn btn-sm fer-edit" data-id="'+f.id+'" style="margin-right:3px">Editar</button>';
    h+='<button class="btn btn-sm btn-d fer-del" data-id="'+f.id+'">Excluir</button>';
    h+='</td></tr>';
  });
  h+='</tbody></table></div>';
  h+='<div style="font-size:11px;color:#9ca3af;margin-top:6px">'+list.length+' registro(s) encontrado(s)</div>';
  return h;
}

function ferFormHtml(f){
  f=f||{};
  var anoAtual=new Date().getFullYear();
  var anos=[];for(var y=anoAtual-10;y<=anoAtual+5;y++)anos.push(y);
  var anoOpts=anos.map(function(y){return[String(y),String(y)];});
  var mesOpts=FER_MESES.slice(1).map(function(m,i){return[String(i+1),m];});
  var stOpts=FER_STATUS.map(function(s){return[s,s];});
  var agOpts=ADM.ags.filter(function(a){return a.ativo;}).map(function(a){return[String(a.id),a.nome+' ('+a.funcional+')'];});
  var g=function(id,label,el){return '<div class="fg" style="margin-bottom:10px"><div class="f1 full"><label style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:4px;display:block">'+label+'</label>'+el+'</div></div>';};
  var inp=function(id,val,type){return '<input id="'+id+'" type="'+(type||'text')+'" value="'+esc(val||'')+'" style="width:100%;box-sizing:border-box;border:1px solid #d1d5db;border-radius:8px;padding:7px 10px;font-size:12px;font-family:inherit"/>';};
  var sel=function(id,opts,val){return '<select id="'+id+'" style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:7px 10px;font-size:12px;font-family:inherit">'+selOpts(opts,String(val||''))+'</select>';};
  var ta=function(id,val){return '<textarea id="'+id+'" rows="3" style="width:100%;box-sizing:border-box;border:1px solid #d1d5db;border-radius:8px;padding:7px 10px;font-size:12px;font-family:inherit;resize:vertical">'+esc(val||'')+'</textarea>';};
  var html='<div style="display:grid;grid-template-columns:1fr 1fr;gap:0 16px">';
  // Coluna 1
  html+='<div>';
  html+='<div style="font-size:11px;font-weight:700;color:#1A3A5C;margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid #f3f4f6;padding-bottom:6px">Identificacao</div>';
  html+=g('fer-ag','Agente *',sel('fer-ag',[['','Selecione...']].concat(agOpts),f.agente_id));
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
  html+='<div>'+g('fer-conc','Concurso (Ano)',inp('fer-conc',f.concurso,'number'))+'</div>';
  html+='<div>'+g('fer-exerc','Exercicio (Ano)',inp('fer-exerc',f.exercicio,'number'))+'</div>';
  html+='</div>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
  html+='<div>'+g('fer-mes','Mes das Ferias',sel('fer-mes',[['','Selecione...']].concat(mesOpts),f.mes_ferias))+'</div>';
  html+='<div>'+g('fer-ano','Ano das Ferias',sel('fer-ano',[['','Selecione...']].concat(anoOpts),f.ano_ferias))+'</div>';
  html+='</div>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
  html+='<div>'+g('fer-pai','Per. Aquisitivo Inicio',inp('fer-pai',f.periodo_aquisitivo_inicio,'number'))+'</div>';
  html+='<div>'+g('fer-paf','Per. Aquisitivo Fim',inp('fer-paf',f.periodo_aquisitivo_fim,'number'))+'</div>';
  html+='</div>';
  html+=g('fer-proc','Processo',inp('fer-proc',f.processo));
  html+=g('fer-opcao','Opcao Definida',inp('fer-opcao',f.opcao_definida));
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
  html+='<div>'+g('fer-frac','Fracionamento',sel('fer-frac',[['0','Nao'],['1','Sim']],f.fracionamento?'1':'0'))+'</div>';
  html+='<div>'+g('fer-qtd','QTD Dias',inp('fer-qtd',f.qtd_dias||30,'number'))+'</div>';
  html+='</div>';
  html+='</div>';
  // Coluna 2
  html+='<div>';
  html+='<div style="font-size:11px;font-weight:700;color:#1A3A5C;margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid #f3f4f6;padding-bottom:6px">Datas e Prazos</div>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
  html+='<div>'+g('fer-di','Data Inicio',inp('fer-di',f.data_inicio,'date'))+'</div>';
  html+='<div>'+g('fer-df','Data Fim',inp('fer-df',f.data_fim,'date'))+'</div>';
  html+='</div>';
  html+=g('fer-setp','Setor de Programacao',inp('fer-setp',f.setor_programacao));
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
  html+='<div>'+g('fer-dpai','Ini. Per. Aquisitivo',inp('fer-dpai',f.data_inicio_periodo_aquisitivo,'date'))+'</div>';
  html+='<div>'+g('fer-dpaf','Fim Per. Aquisitivo',inp('fer-dpaf',f.data_fim_periodo_aquisitivo,'date'))+'</div>';
  html+='</div>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
  html+='<div>'+g('fer-dpci','Ini. Proc. Concessivo',inp('fer-dpci',f.data_inicio_processo_concessivo,'date'))+'</div>';
  html+='<div>'+g('fer-dpcf','Fim Proc. Concessivo',inp('fer-dpcf',f.data_fim_processo_concessivo,'date'))+'</div>';
  html+='</div>';
  html+=g('fer-presc','Periodo Prescricional',inp('fer-presc',f.periodo_prescricional));
  html+=g('fer-st','Status de Tramitacao',sel('fer-st',stOpts,f.status_tramitacao||'Pendente'));
  html+='</div>';
  html+='</div>';
  // Linha completa
  html+='<div style="margin-top:8px">';
  html+='<div style="font-size:11px;font-weight:700;color:#1A3A5C;margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid #f3f4f6;padding-bottom:6px">Textos</div>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">';
  html+='<div><label style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:4px;display:block">Programacao de Ferias</label>'+ta('fer-prog',f.programacao)+'</div>';
  html+='<div><label style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:4px;display:block">Historico de Alteracao</label>'+ta('fer-hist',f.historico_alteracao)+'</div>';
  html+='<div><label style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:4px;display:block">Status de Tramitacao (detalhe)</label>'+ta('fer-stdet',f.status_tramitacao_det||'')+'</div>';
  html+='</div></div>';
  return html;
}

function ferGetPayload(){
  var v=function(id){var e=document.getElementById(id);return e?e.value:'';};
  return {
    agente_id:parseInt(v('fer-ag'))||null,
    concurso:v('fer-conc')||null,
    mes_ferias:v('fer-mes')||null,
    ano_ferias:v('fer-ano')||null,
    periodo_aquisitivo_inicio:v('fer-pai')||null,
    periodo_aquisitivo_fim:v('fer-paf')||null,
    data_inicio:v('fer-di')||null,
    data_fim:v('fer-df')||null,
    qtd_dias:parseInt(v('fer-qtd'))||30,
    exercicio:v('fer-exerc')||null,
    fracionamento:v('fer-frac')==='1'?1:0,
    processo:v('fer-proc')||null,
    opcao_definida:v('fer-opcao')||null,
    setor_programacao:v('fer-setp')||null,
    data_inicio_periodo_aquisitivo:v('fer-dpai')||null,
    data_fim_periodo_aquisitivo:v('fer-dpaf')||null,
    data_inicio_processo_concessivo:v('fer-dpci')||null,
    data_fim_processo_concessivo:v('fer-dpcf')||null,
    periodo_prescricional:v('fer-presc')||null,
    programacao:v('fer-prog')||null,
    historico_alteracao:v('fer-hist')||null,
    status_tramitacao:v('fer-st')||'Pendente'
  };
}

function ferCarregarFiltros(){
  FER.flt.setor=document.getElementById('fer-flt-set')?document.getElementById('fer-flt-set').value:'';
  FER.flt.letra=document.getElementById('fer-flt-l')?document.getElementById('fer-flt-l').value:'';
  FER.flt.subequipe=document.getElementById('fer-flt-seq')?document.getElementById('fer-flt-seq').value:'';
  FER.flt.mes_ferias=document.getElementById('fer-flt-mes')?document.getElementById('fer-flt-mes').value:'';
  FER.flt.ano_ferias=document.getElementById('fer-flt-ano')?document.getElementById('fer-flt-ano').value:'';
  FER.flt.status=document.getElementById('fer-flt-st')?document.getElementById('fer-flt-st').value:'';
}

function ferBuscar(){
  ferCarregarFiltros();
  var q='/api/admin/ferias?1=1';
  if(FER.flt.setor)q+='&setor='+encodeURIComponent(FER.flt.setor);
  if(FER.flt.letra)q+='&letra='+encodeURIComponent(FER.flt.letra);
  if(FER.flt.subequipe)q+='&subequipe='+encodeURIComponent(FER.flt.subequipe);
  if(FER.flt.mes_ferias)q+='&mes_ferias='+encodeURIComponent(FER.flt.mes_ferias);
  if(FER.flt.ano_ferias)q+='&ano_ferias='+encodeURIComponent(FER.flt.ano_ferias);
  if(FER.flt.status)q+='&status='+encodeURIComponent(FER.flt.status);
  var res=document.getElementById('fer-res');
  if(res)res.innerHTML='<div style="color:#9ca3af;padding:16px">Carregando...</div>';
  api.get(q).then(function(r){
    FER.list=r.data||[];
    ADM.ferias=FER.list;
    if(res)res.innerHTML=renderFeriasTbl(FER.list);
    bindFeriasTbl();
  }).catch(function(e){if(res)res.innerHTML='<div style="color:#dc2626;padding:16px">Erro: '+esc(e.message)+'</div>';});
}

function bindFeriasTbl(){
  document.querySelectorAll('.fer-edit').forEach(function(btn){
    btn.onclick=function(){
      var id=parseInt(this.dataset.id);
      var f=FER.list.find(function(x){return x.id===id;});
      if(!f)return;
      FER.editId=id;
      var footer='<button class="btn" id="fer-modal-c">Cancelar</button><button class="btn btn-p" id="fer-modal-ok">Salvar</button>';
      openModal('fer-form','Editar Ferias','xl',ferFormHtml(f),footer);
      document.getElementById('fer-modal-c').onclick=function(){closeModal('fer-form');};
      document.getElementById('fer-modal-ok').onclick=function(){
        var payload=ferGetPayload();
        if(!payload.agente_id)return toast('Selecione o agente','er');
        api.put('/api/admin/ferias/'+id,payload).then(function(){
          toast('Ferias atualizada!');closeModal('fer-form');ferBuscar();
        }).catch(function(e){toast(e.message,'er');});
      };
    };
  });
  document.querySelectorAll('.fer-del').forEach(function(btn){
    btn.onclick=function(){
      if(!confirm('Excluir este registro de ferias?'))return;
      var id=parseInt(this.dataset.id);
      api.del('/api/admin/ferias/'+id).then(function(){toast('Excluido!');ferBuscar();}).catch(function(e){toast(e.message,'er');});
    };
  });
}

function ferPdf(){
  var list=FER.list;
  if(!list.length)return toast('Nenhum dado para exportar','er');
  var items=list.map(ferPrep);
  var agrupados={};
  items.forEach(function(f){
    var k=f.setor||'Sem Setor';
    if(!agrupados[k])agrupados[k]=[];
    agrupados[k].push(f);
  });
  var html='<div style="font-family:Arial,sans-serif;padding:20px;font-size:10px">';
  html+='<div style="text-align:center;margin-bottom:16px"><div style="font-size:16px;font-weight:700;color:#1A3A5C">GUARDA MUNICIPAL — PROGRAMACAO DE FERIAS</div>';
  var fStr=[];
  if(FER.flt.setor)fStr.push('Setor: '+FER.flt.setor);
  if(FER.flt.letra)fStr.push('Equipe: '+FER.flt.letra);
  if(FER.flt.ano_ferias)fStr.push('Ano: '+FER.flt.ano_ferias);
  if(FER.flt.mes_ferias)fStr.push('Mes: '+FER_MESES[parseInt(FER.flt.mes_ferias)]);
  if(FER.flt.status)fStr.push('Status: '+FER.flt.status);
  if(fStr.length)html+='<div style="font-size:11px;color:#6b7280">'+fStr.join(' | ')+'</div>';
  html+='<div style="font-size:10px;color:#9ca3af">Emitido em: '+new Date().toLocaleDateString('pt-BR')+'</div>';
  html+='</div>';
  Object.keys(agrupados).sort().forEach(function(setor){
    var grupo=agrupados[setor];
    html+='<div style="margin-bottom:18px">';
    html+='<div style="background:#1A3A5C;color:#fff;padding:6px 10px;font-size:11px;font-weight:700;border-radius:6px 6px 0 0">'+esc(setor)+' ('+grupo.length+' agente(s))</div>';
    html+='<table style="width:100%;border-collapse:collapse;font-size:9px">';
    html+='<thead><tr>';
    ['QRA','Nome','Funcional','Concurso','Mes/Ano','Per.Aquisit.','Dt Inicio','Dt Fim','Dias','Frac.','Processo','Opcao','Status'].forEach(function(col){
      html+='<th style="background:#374151;color:#fff;padding:4px 5px;text-align:left;white-space:nowrap">'+col+'</th>';
    });
    html+='</tr></thead><tbody>';
    grupo.forEach(function(f,ri){
      var bg=ri%2===0?'#fff':'#f8fafc';
      var stCor={Pendente:'#f97316',Aprovado:'#16a34a',Concedido:'#1d4ed8','Em tramitacao':'#7c3aed',Suspenso:'#dc2626',Cancelado:'#dc2626'}[f.status_tramitacao]||'#6b7280';
      html+='<tr style="background:'+bg+'">';
      html+='<td style="padding:3px 5px;border:1px solid #e5e7eb">'+esc(f.qra||'')+'</td>';
      html+='<td style="padding:3px 5px;border:1px solid #e5e7eb;white-space:nowrap">'+esc(f.agente_nome||'')+'</td>';
      html+='<td style="padding:3px 5px;border:1px solid #e5e7eb">'+esc(f.funcional||'')+'</td>';
      html+='<td style="padding:3px 5px;border:1px solid #e5e7eb;text-align:center">'+esc(String(f.concurso||''))+'</td>';
      html+='<td style="padding:3px 5px;border:1px solid #e5e7eb;white-space:nowrap">'+esc(f.mes_ferias_label+(f.ano_ferias?'/'+f.ano_ferias:''))+'</td>';
      html+='<td style="padding:3px 5px;border:1px solid #e5e7eb;white-space:nowrap">'+esc(f.periodo_aquisitivo)+'</td>';
      html+='<td style="padding:3px 5px;border:1px solid #e5e7eb;white-space:nowrap">'+fmtDate(f.data_inicio)+'</td>';
      html+='<td style="padding:3px 5px;border:1px solid #e5e7eb;white-space:nowrap">'+fmtDate(f.data_fim)+'</td>';
      html+='<td style="padding:3px 5px;border:1px solid #e5e7eb;text-align:center;font-weight:700">'+esc(String(f.qtd_dias||''))+'</td>';
      html+='<td style="padding:3px 5px;border:1px solid #e5e7eb;text-align:center">'+esc(f.fracionamento_label)+'</td>';
      html+='<td style="padding:3px 5px;border:1px solid #e5e7eb">'+esc(f.processo||'')+'</td>';
      html+='<td style="padding:3px 5px;border:1px solid #e5e7eb">'+esc(f.opcao_definida||'')+'</td>';
      html+='<td style="padding:3px 5px;border:1px solid #e5e7eb;color:'+stCor+';font-weight:700">'+esc(f.status_tramitacao||'')+'</td>';
      html+='</tr>';
    });
    html+='</tbody></table></div>';
  });
  html+='<div style="margin-top:16px;padding-top:10px;border-top:1px solid #e5e7eb;display:flex;justify-content:space-between;font-size:9px;color:#9ca3af">';
  html+='<span>Total: '+list.length+' registro(s)</span><span>BLUECORE ERP — GCM Serra</span></div>';
  html+='</div>';
  pdfFromHtml(html,'ferias-programacao-'+new Date().toISOString().split('T')[0]+'.pdf');
}

function bindFerias(){
  var fltBtn=document.getElementById('fer-flt-btn');
  if(fltBtn)fltBtn.onclick=ferBuscar;
  var pdfBtn=document.getElementById('fer-pdf-btn');
  if(pdfBtn)pdfBtn.onclick=ferPdf;
  var newBtn=document.getElementById('fer-new-btn');
  if(newBtn)newBtn.onclick=function(){
    FER.editId=null;
    var footer='<button class="btn" id="fer-modal-c">Cancelar</button><button class="btn btn-p" id="fer-modal-ok">Salvar</button>';
    openModal('fer-form','Nova Ferias','xl',ferFormHtml({}),footer);
    document.getElementById('fer-modal-c').onclick=function(){closeModal('fer-form');};
    document.getElementById('fer-modal-ok').onclick=function(){
      var payload=ferGetPayload();
      if(!payload.agente_id)return toast('Selecione o agente','er');
      if(!payload.data_inicio||!payload.data_fim)return toast('Informe data inicio e fim','er');
      api.post('/api/admin/ferias',payload).then(function(){
        toast('Ferias criada!');closeModal('fer-form');ferBuscar();
      }).catch(function(e){toast(e.message,'er');});
    };
    // Auto-preencher setor e concurso ao selecionar agente
    var agSel=document.getElementById('fer-ag');
    if(agSel)agSel.onchange=function(){
      var id=parseInt(this.value);
      var ag=ADM.ags.find(function(a){return a.id===id;});
      if(!ag)return;
      var setp=document.getElementById('fer-setp');if(setp&&ag.setor)setp.value=ag.setor;
      var conc=document.getElementById('fer-conc');if(conc&&ag.concurso)conc.value=ag.concurso;
      var exerc=document.getElementById('fer-exerc');if(exerc)exerc.value=new Date().getFullYear();
    };
  };
  // Auto-calcular dias e preencher mes/ano ao alterar datas
  document.addEventListener('change',function(e){
    if(e.target&&(e.target.id==='fer-di'||e.target.id==='fer-df')){
      var di=document.getElementById('fer-di');var df=document.getElementById('fer-df');var qtd=document.getElementById('fer-qtd');
      if(di&&df&&qtd&&di.value&&df.value){
        var diff=Math.round((new Date(df.value)-new Date(di.value))/(1000*60*60*24))+1;
        if(diff>0)qtd.value=diff;
      }
      // Auto-preencher mes e ano das ferias a partir da data de inicio
      if(e.target.id==='fer-di'&&di&&di.value){
        var parts=di.value.split('-');
        var anoSel=document.getElementById('fer-ano');var mesSel=document.getElementById('fer-mes');
        if(anoSel&&!anoSel.value)anoSel.value=parts[0];
        if(mesSel&&!mesSel.value)mesSel.value=String(parseInt(parts[1]));
      }
    }
  });
  // Ao abrir a aba pela primeira vez busca todos os registros sem filtro de ano
  ferBuscar();
}

// =====================================================================
// PERMUTAS (admin)
// =====================================================================
var PERM={flt:{status:'pendente_admin',mes_ano:''},list:[]};
var PERM_TURNO_L={diurno:'Diurno',noturno:'Noturno',especial:'Especial',diurno_esp:'Diurno+Esp',noturno_esp:'Noturno+Esp'};
var PERM_ST_L={pendente_cedente:'Ag. Cedente',pendente_admin:'Ag. Admin',aprovado:'Aprovado',reprovado:'Reprovado',recusado_cedente:'Rec. Cedente',cancelado:'Cancelado'};
var PERM_ST_C={pendente_cedente:'yellow',pendente_admin:'blue',aprovado:'green',reprovado:'red',recusado_cedente:'red',cancelado:'gray'};

function renderPermutas(){
  var mesAtual=new Date().toISOString().substring(0,7);
  var stOpts=[['','Todos'],['pendente_cedente','Ag. Cedente'],['pendente_admin','Ag. Admin'],['aprovado','Aprovados'],['reprovado','Reprovados'],['recusado_cedente','Rec. Cedente'],['cancelado','Cancelados']];
  var html=ph('Permutas','Controle de permutas de plantao entre agentes');
  html+='<div class="flt-bar" style="flex-wrap:wrap;gap:8px">';
  html+='<div class="f1"><label>Mes</label><input id="perm-flt-mes" type="month" value="'+esc(PERM.flt.mes_ano||mesAtual)+'"/></div>';
  html+='<div class="f1"><label>Status</label><select id="perm-flt-st">'+selOpts(stOpts,PERM.flt.status)+'</select></div>';
  html+='<button class="btn btn-p" id="perm-flt-btn">Filtrar</button>';
  html+='<button class="btn" id="perm-pdf-btn">PDF</button>';
  html+='</div><div id="perm-res"><div class="empty">Clique em Filtrar para carregar.</div></div>';
  return html;
}

function permBuscar(){
  PERM.flt.mes_ano=document.getElementById('perm-flt-mes')?document.getElementById('perm-flt-mes').value:'';
  PERM.flt.status=document.getElementById('perm-flt-st')?document.getElementById('perm-flt-st').value:'';
  var q='/api/admin/permutas?1=1';
  if(PERM.flt.mes_ano)q+='&mes_ano='+encodeURIComponent(PERM.flt.mes_ano);
  if(PERM.flt.status)q+='&status='+encodeURIComponent(PERM.flt.status);
  var res=document.getElementById('perm-res');
  if(res)res.innerHTML='<div style="color:#9ca3af;padding:16px">Carregando...</div>';
  api.get(q).then(function(r){
    PERM.list=r.data||[];
    ADM.permutas=PERM.list;
    if(res)res.innerHTML=renderPermutasTbl(PERM.list);
    bindPermutasTbl();
  }).catch(function(e){if(res)res.innerHTML='<div style="color:#dc2626;padding:16px">Erro: '+esc(e.message)+'</div>';});
}

function renderPermutasTbl(list){
  if(!list.length)return '<div class="empty">Nenhuma permuta encontrada.</div>';
  var usoCont={};
  list.filter(function(p){return !['recusado_cedente','reprovado','cancelado'].includes(p.status);}).forEach(function(p){
    var mS=p.data_solicitante?p.data_solicitante.substring(0,7):'';
    var mC=p.data_cedente?p.data_cedente.substring(0,7):'';
    var k1=p.agente_solicitante_id+'|'+mS; var k2=p.agente_cedente_id+'|'+mC;
    usoCont[k1]=(usoCont[k1]||0)+1; usoCont[k2]=(usoCont[k2]||0)+1;
  });
  var h='';
  // Aviso agentes no limite
  var limites=[];
  Object.keys(usoCont).forEach(function(k){if(usoCont[k]>=2){var parts=k.split('|');var ag=list.find(function(p){return p.agente_solicitante_id==parts[0]||p.agente_cedente_id==parts[0];});if(ag){var nm=ag.agente_solicitante_id==parts[0]?(ag.solicitante_qra||ag.solicitante_nome):(ag.cedente_qra||ag.cedente_nome);limites.push(esc(nm)+' ('+parts[1]+')');}}});
  if(limites.length)h+='<div style="margin-bottom:10px;background:#fef9c3;border:1px solid #fde68a;border-radius:8px;padding:10px 12px;font-size:12px"><b style="color:#92400e">⚠ Limite atingido (2/mes):</b> '+limites.join(', ')+'</div>';
  h+='<div style="overflow-x:auto;border-radius:10px;border:1px solid #e5e7eb">';
  h+='<table style="border-collapse:collapse;font-size:11px;white-space:nowrap;width:100%"><thead><tr>';
  ['Solicitante','Turno Cedido','Data Cede','Cedente','Turno Recebe','Data Recebe','Status','Motivo','Obs Admin','Acoes'].forEach(function(col){
    h+='<th style="background:#1A3A5C;color:#fff;padding:7px 8px;text-align:left;font-size:10px">'+col+'</th>';
  });
  h+='</tr></thead><tbody>';
  list.forEach(function(p,ri){
    var bg=ri%2===0?'#fff':'#f8fafc';
    var st=p.status||'pendente_cedente';
    h+='<tr style="background:'+bg+'">';
    h+='<td style="padding:5px 8px;border-bottom:1px solid #f3f4f6"><b>'+esc(p.solicitante_qra||p.solicitante_nome||'')+'</b></td>';
    h+='<td style="padding:5px 8px;border-bottom:1px solid #f3f4f6">'+esc(PERM_TURNO_L[p.turno_solicitante]||p.turno_solicitante||'')+'</td>';
    h+='<td style="padding:5px 8px;border-bottom:1px solid #f3f4f6">'+fmtDt(p.data_solicitante)+'</td>';
    h+='<td style="padding:5px 8px;border-bottom:1px solid #f3f4f6"><b>'+esc(p.cedente_qra||p.cedente_nome||'')+'</b></td>';
    h+='<td style="padding:5px 8px;border-bottom:1px solid #f3f4f6">'+esc(PERM_TURNO_L[p.turno_cedente]||p.turno_cedente||'')+'</td>';
    h+='<td style="padding:5px 8px;border-bottom:1px solid #f3f4f6">'+fmtDt(p.data_cedente)+'</td>';
    h+='<td style="padding:5px 8px;border-bottom:1px solid #f3f4f6">'+bdg(PERM_ST_L[st]||st,PERM_ST_C[st]||'gray')+'</td>';
    h+='<td style="padding:5px 8px;border-bottom:1px solid #f3f4f6;max-width:120px;overflow:hidden;text-overflow:ellipsis" title="'+esc(p.motivo||'')+'">'+esc(p.motivo||'')+'</td>';
    h+='<td style="padding:5px 8px;border-bottom:1px solid #f3f4f6;max-width:120px;overflow:hidden;text-overflow:ellipsis" title="'+esc(p.obs_admin||'')+'">'+esc(p.obs_admin||'')+'</td>';
    h+='<td style="padding:4px 6px;border-bottom:1px solid #f3f4f6;text-align:center">';
    if(st==='pendente_admin'){
      h+='<button class="btn btn-sm perm-ap" data-id="'+p.id+'" style="background:#16a34a;color:#fff;margin-right:3px">Aprovar</button>';
      h+='<button class="btn btn-sm perm-rp" data-id="'+p.id+'" style="background:#dc2626;color:#fff">Reprovar</button>';
    } else {
      h+='<span style="color:#9ca3af;font-size:10px">—</span>';
    }
    h+='</td></tr>';
  });
  h+='</tbody></table></div>';
  return h;
}

function bindPermutasTbl(){
  document.querySelectorAll('.perm-ap').forEach(function(btn){
    btn.onclick=function(){
      var id=this.dataset.id;
      var obs=prompt('Observacao (opcional):','');
      if(obs===null)return;
      api.put('/api/admin/permutas/'+id+'/aprovar',{acao:'aprovar',obs_admin:obs}).then(function(){
        toast('Permuta aprovada!');
        // Mostra status "Todos" para o admin ver a permuta com status Aprovado
        PERM.flt.status='aprovado';
        var sel=document.getElementById('perm-flt-st');if(sel)sel.value='aprovado';
        permBuscar();
      }).catch(function(e){toast(e.message,'er');});
    };
  });
  document.querySelectorAll('.perm-rp').forEach(function(btn){
    btn.onclick=function(){
      var id=this.dataset.id;
      var obs=prompt('Motivo da reprovacao:','');
      if(obs===null)return;
      api.put('/api/admin/permutas/'+id+'/aprovar',{acao:'reprovar',obs_admin:obs}).then(function(){
        toast('Permuta reprovada.');
        PERM.flt.status='reprovado';
        var sel=document.getElementById('perm-flt-st');if(sel)sel.value='reprovado';
        permBuscar();
      }).catch(function(e){toast(e.message,'er');});
    };
  });
}

function permPdf(){
  var list=PERM.list;
  if(!list||!list.length)return toast('Nenhum dado para exportar','er');
  var html='<div style="font-family:Arial,sans-serif;font-size:10px;padding:20px">';
  html+='<div style="text-align:center;margin-bottom:14px"><div style="font-size:15px;font-weight:700;color:#1A3A5C">GUARDA MUNICIPAL — CONTROLE DE PERMUTAS</div>';
  if(PERM.flt.mes_ano)html+='<div style="font-size:11px;color:#6b7280">Mes: '+esc(PERM.flt.mes_ano)+'</div>';
  if(PERM.flt.status)html+='<div style="font-size:11px;color:#6b7280">Status: '+esc(PERM_ST_L[PERM.flt.status]||PERM.flt.status)+'</div>';
  html+='<div style="font-size:10px;color:#9ca3af">Emitido: '+new Date().toLocaleDateString('pt-BR')+'</div></div>';
  html+='<table style="width:100%;border-collapse:collapse;font-size:9px"><thead><tr>';
  ['Solicitante','Turno Cede','Data Cede','Cedente','Turno Recebe','Data Recebe','Status','Motivo'].forEach(function(c){
    html+='<th style="background:#1A3A5C;color:#fff;padding:4px 6px;text-align:left">'+c+'</th>';
  });
  html+='</tr></thead><tbody>';
  list.forEach(function(p,ri){
    var bg=ri%2===0?'#fff':'#f8fafc';
    html+='<tr style="background:'+bg+'"><td style="padding:3px 5px;border:1px solid #e5e7eb">'+esc(p.solicitante_qra||p.solicitante_nome||'')+'</td>';
    html+='<td style="padding:3px 5px;border:1px solid #e5e7eb">'+esc(PERM_TURNO_L[p.turno_solicitante]||'')+'</td>';
    html+='<td style="padding:3px 5px;border:1px solid #e5e7eb">'+fmtDt(p.data_solicitante)+'</td>';
    html+='<td style="padding:3px 5px;border:1px solid #e5e7eb">'+esc(p.cedente_qra||p.cedente_nome||'')+'</td>';
    html+='<td style="padding:3px 5px;border:1px solid #e5e7eb">'+esc(PERM_TURNO_L[p.turno_cedente]||'')+'</td>';
    html+='<td style="padding:3px 5px;border:1px solid #e5e7eb">'+fmtDt(p.data_cedente)+'</td>';
    html+='<td style="padding:3px 5px;border:1px solid #e5e7eb;font-weight:700">'+esc(PERM_ST_L[p.status]||p.status||'')+'</td>';
    html+='<td style="padding:3px 5px;border:1px solid #e5e7eb">'+esc(p.motivo||'')+'</td></tr>';
  });
  html+='</tbody></table>';
  html+='<div style="margin-top:14px;font-size:9px;color:#9ca3af;display:flex;justify-content:space-between"><span>Total: '+list.length+'</span><span>BLUECORE ERP — GCM Serra</span></div></div>';
  pdfFromHtml(html,'permutas-'+new Date().toISOString().split('T')[0]+'.pdf');
}

function bindPermutas(){
  var fltBtn=document.getElementById('perm-flt-btn');
  if(fltBtn)fltBtn.onclick=permBuscar;
  var pdfBtn=document.getElementById('perm-pdf-btn');
  if(pdfBtn)pdfBtn.onclick=permPdf;
  var mesInp=document.getElementById('perm-flt-mes');
  if(mesInp&&!mesInp.value)mesInp.value=new Date().toISOString().substring(0,7);
  permBuscar();
}

// =====================================================================
// ESCALAS
// =====================================================================
var ESC={mesAno:'',cal:{},escalas:[],tipo_sel:'ordinaria',subTab:'criar',ajusteAg:null};
var ESC_SETORES=['ADM','Convencional','Frota','Armamento e Municao','Video Monitoramento','ROMU','PROJESP','Corregedoria','DPC'];
var ESC_MESES_NM=['Janeiro','Fevereiro','Marco','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
var ESC_DS=['Dom','Seg','Ter','Qua','Qui','Sex','Sab'];
var ESC_COR={diurno:'#3b82f6',noturno:'#1e3a5f',especial:'#f97316'};
var ESC_SEQ=[null,'diurno','noturno','especial','diurno_esp','noturno_esp'];

function escTipoBg(t){
  if(!t)return null;
  if(t==='diurno_esp')return 'linear-gradient(135deg,'+ESC_COR.diurno+' 50%,'+ESC_COR.especial+' 50%)';
  if(t==='noturno_esp')return 'linear-gradient(135deg,'+ESC_COR.noturno+' 50%,'+ESC_COR.especial+' 50%)';
  return ESC_COR[t]||null;
}
function escTipoLetra(t){
  if(t==='diurno')return 'D';if(t==='noturno')return 'N';if(t==='especial')return 'E';
  if(t==='diurno_esp')return 'D+E';if(t==='noturno_esp')return 'N+E';return '';
}
function escTipoLabel(t){
  if(t==='diurno')return 'Diurno';if(t==='noturno')return 'Noturno';if(t==='especial')return 'Especial';
  if(t==='diurno_esp')return 'Diurno + Especial';if(t==='noturno_esp')return 'Noturno + Especial';return '';
}

function escMesOpts(){
  var opts=[];var now=new Date();
  for(var mi=-3;mi<=9;mi++){
    var d=new Date(now.getFullYear(),now.getMonth()+mi,1);
    var val=d.getFullYear()+'-'+(String(d.getMonth()+1).padStart(2,'0'));
    opts.push([val,ESC_MESES_NM[d.getMonth()]+' '+d.getFullYear()]);
  }
  return opts;
}

function renderEscalas(){
  var now=new Date();
  if(!ESC.mesAno)ESC.mesAno=now.getFullYear()+'-'+(String(now.getMonth()+1).padStart(2,'0'));
  var html='<div style="display:flex;gap:0;border-bottom:2px solid #f3f4f6;margin-bottom:20px">';
  [{id:'criar',label:'+ Nova Escala'},{id:'listar',label:'Escalas Salvas'}].forEach(function(st){
    var on=ESC.subTab===st.id;
    html+='<button id="esc-st-'+st.id+'" style="padding:10px 22px;border:none;border-bottom:3px solid '+(on?'#1A3A5C':'transparent')+';background:none;font-size:13px;font-weight:'+(on?'700':'500')+';color:'+(on?'#1A3A5C':'#6b7280')+';cursor:pointer;font-family:inherit">'+st.label+'</button>';
  });
  html+='</div><div id="esc-sub">';
  if(ESC.subTab==='criar')html+=renderEscCriar();
  else html+=renderEscListar();
  html+='</div>';
  return html;
}

function renderEscCriar(){
  var letOpts=[['','Nenhuma / Todas']].concat(LETRAS.map(function(l){return[l,'Equipe '+l];}));
  var setoOpts=[['','Nenhum']].concat(ESC_SETORES.map(function(s){return[s,s];}));
  var isEsp=ESC.tipo_sel==='especial';
  var html='<div style="display:grid;grid-template-columns:290px 1fr;gap:20px;align-items:flex-start">';

  // PAINEL ESQUERDO
  html+='<div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:16px;box-shadow:0 1px 4px rgba(0,0,0,.05)">';
  html+='<div style="font-size:11px;font-weight:700;color:#1A3A5C;margin-bottom:14px;text-transform:uppercase;letter-spacing:.6px">Configuracao</div>';

  // Tipo
  html+='<div style="margin-bottom:12px"><div style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:6px">Tipo de Escala</div>';
  html+='<div style="display:flex;gap:6px">';
  html+='<button id="esc-tipo-ord" style="flex:1;padding:8px 4px;border:2px solid '+(!isEsp?'#1A3A5C':'#e5e7eb')+';border-radius:8px;background:'+(!isEsp?'#EBF1F8':'#fff')+';font-size:12px;font-weight:700;color:'+(!isEsp?'#1A3A5C':'#9ca3af')+';cursor:pointer;font-family:inherit">Ordinaria</button>';
  html+='<button id="esc-tipo-esp" style="flex:1;padding:8px 4px;border:2px solid '+(isEsp?'#f97316':'#e5e7eb')+';border-radius:8px;background:'+(isEsp?'#fff7ed':'#fff')+';font-size:12px;font-weight:700;color:'+(isEsp?'#f97316':'#9ca3af')+';cursor:pointer;font-family:inherit">Especial</button>';
  html+='</div></div>';

  if(isEsp)html+='<div style="margin-bottom:12px"><div style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:4px">Nome da Escala *</div><input id="esc-nome" placeholder="Ex: Operacao Natal 2025" style="width:100%;box-sizing:border-box;border:1px solid #d1d5db;border-radius:8px;padding:8px 10px;font-size:12px;font-family:inherit"/></div>';

  html+='<div style="margin-bottom:12px"><div style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:4px">Mes / Ano *</div><select id="esc-mes" style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:8px 10px;font-size:12px;font-family:inherit">'+selOpts(escMesOpts(),ESC.mesAno)+'</select></div>';
  html+='<div style="margin-bottom:12px"><div style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:4px">Equipe</div><select id="esc-eq" style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:8px 10px;font-size:12px;font-family:inherit">'+selOpts(letOpts,'')+'</select></div>';
  html+='<div style="margin-bottom:12px"><div style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:4px">Subequipe</div><input id="esc-seq" placeholder="Ex: Alpha, Bravo..." style="width:100%;box-sizing:border-box;border:1px solid #d1d5db;border-radius:8px;padding:8px 10px;font-size:12px;font-family:inherit"/></div>';
  html+='<div style="margin-bottom:12px"><div style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:4px">Setor / Funcao</div><select id="esc-set" style="width:100%;border:1px solid #d1d5db;border-radius:8px;padding:8px 10px;font-size:12px;font-family:inherit">'+selOpts(setoOpts,'')+'</select></div>';

  html+='<div style="border-top:1px solid #f3f4f6;padding-top:12px;margin-top:2px"><div style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:8px">Horarios (opcional)</div>';
  html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
  html+='<div><div style="font-size:10px;color:#9ca3af;margin-bottom:3px">Diurno Inicio</div><input type="time" id="esc-hdi" value="07:00" style="width:100%;box-sizing:border-box;border:1px solid #d1d5db;border-radius:6px;padding:6px 8px;font-size:12px;font-family:inherit"/></div>';
  html+='<div><div style="font-size:10px;color:#9ca3af;margin-bottom:3px">Diurno Fim</div><input type="time" id="esc-hdf" value="19:00" style="width:100%;box-sizing:border-box;border:1px solid #d1d5db;border-radius:6px;padding:6px 8px;font-size:12px;font-family:inherit"/></div>';
  html+='<div><div style="font-size:10px;color:#9ca3af;margin-bottom:3px">Noturno Inicio</div><input type="time" id="esc-hni" value="19:00" style="width:100%;box-sizing:border-box;border:1px solid #d1d5db;border-radius:6px;padding:6px 8px;font-size:12px;font-family:inherit"/></div>';
  html+='<div><div style="font-size:10px;color:#9ca3af;margin-bottom:3px">Noturno Fim</div><input type="time" id="esc-hnf" value="07:00" style="width:100%;box-sizing:border-box;border:1px solid #d1d5db;border-radius:6px;padding:6px 8px;font-size:12px;font-family:inherit"/></div>';
  html+='</div></div>';

  // Legenda
  html+='<div style="border-top:1px solid #f3f4f6;padding-top:12px;margin-top:12px"><div style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:8px">Legenda — clique nos dias</div>';
  [
    {t:'diurno',c:ESC_COR.diurno,l:'D — Diurno'},
    {t:'noturno',c:ESC_COR.noturno,l:'N — Noturno'},
    {t:'especial',c:ESC_COR.especial,l:'E — Especial'},
    {t:'diurno_esp',c:'linear-gradient(135deg,'+ESC_COR.diurno+' 50%,'+ESC_COR.especial+' 50%)',l:'D+E — Diurno + Especial'},
    {t:'noturno_esp',c:'linear-gradient(135deg,'+ESC_COR.noturno+' 50%,'+ESC_COR.especial+' 50%)',l:'N+E — Noturno + Especial'},
    {t:'',c:'#f3f4f6',l:'Folga / Livre',bd:'1px solid #e5e7eb'}
  ].forEach(function(x){
    html+='<div style="display:flex;align-items:center;gap:8px;margin-bottom:5px"><span style="width:22px;height:22px;border-radius:5px;background:'+x.c+';border:'+(x.bd||'none')+';flex-shrink:0;display:inline-block"></span><span style="font-size:12px;color:#374151">'+x.l+'</span></div>';
  });
  html+='</div>';

  // Resumo
  html+='<div style="border-top:1px solid #f3f4f6;padding-top:12px;margin-top:12px" id="esc-resumo">'+renderEscResumo()+'</div>';
  html+='</div>';

  // PAINEL DIREITO — calendário + ações
  html+='<div>';
  html+='<div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px;box-shadow:0 1px 4px rgba(0,0,0,.05);margin-bottom:14px"><div id="esc-cal-wrap">'+renderEscCal()+'</div></div>';

  html+='<div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:14px;box-shadow:0 1px 4px rgba(0,0,0,.05)">';
  html+='<div style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:10px">APLICAR ESCALA</div>';
  html+='<div style="display:flex;gap:10px;flex-wrap:wrap">';
  html+='<button id="esc-btn-grupo" class="btn btn-p" style="flex:1;min-width:160px">Salvar e Aplicar ao Grupo</button>';
  html+='<button id="esc-btn-indiv" class="btn" style="flex:1;min-width:160px;border-color:#7c3aed;color:#7c3aed">Aplicar Individual</button>';
  html+='<button id="esc-btn-limpar" class="btn" style="padding:10px 14px">Limpar</button>';
  html+='</div>';
  html+='<div style="font-size:11px;color:#9ca3af;margin-top:8px">Grupo: aplica o calendario marcado a todos os agentes da equipe/subequipe selecionada. Individual: escolha agentes um a um.</div>';
  html+='</div>';
  html+='</div>';

  html+='</div>';
  return html;
}

function renderEscResumo(){
  var dias=Object.values(ESC.cal);
  var nd=dias.filter(function(v){return v==='diurno';}).length;
  var nn=dias.filter(function(v){return v==='noturno';}).length;
  var ne=dias.filter(function(v){return v==='especial';}).length;
  var nde=dias.filter(function(v){return v==='diurno_esp';}).length;
  var nne=dias.filter(function(v){return v==='noturno_esp';}).length;
  var tot=nd+nn+ne+nde+nne;
  if(!tot)return '<div style="font-size:12px;color:#9ca3af;text-align:center;padding:8px 0">Nenhum dia marcado</div>';
  var h='<div style="display:flex;flex-wrap:wrap;gap:6px">';
  if(nd)h+='<div style="text-align:center;padding:6px 10px;border-radius:8px;background:#eff6ff"><div style="font-size:18px;font-weight:800;color:#3b82f6">'+nd+'</div><div style="font-size:10px;color:#3b82f6;font-weight:700">D</div></div>';
  if(nn)h+='<div style="text-align:center;padding:6px 10px;border-radius:8px;background:#EBF1F8"><div style="font-size:18px;font-weight:800;color:#1e3a5f">'+nn+'</div><div style="font-size:10px;color:#1e3a5f;font-weight:700">N</div></div>';
  if(ne)h+='<div style="text-align:center;padding:6px 10px;border-radius:8px;background:#fff7ed"><div style="font-size:18px;font-weight:800;color:#f97316">'+ne+'</div><div style="font-size:10px;color:#f97316;font-weight:700">E</div></div>';
  if(nde)h+='<div style="text-align:center;padding:6px 10px;border-radius:8px;background:#eff6ff"><div style="font-size:18px;font-weight:800;color:#3b82f6">'+nde+'</div><div style="font-size:10px;color:#3b82f6;font-weight:700">D+E</div></div>';
  if(nne)h+='<div style="text-align:center;padding:6px 10px;border-radius:8px;background:#EBF1F8"><div style="font-size:18px;font-weight:800;color:#1e3a5f">'+nne+'</div><div style="font-size:10px;color:#1e3a5f;font-weight:700">N+E</div></div>';
  h+='</div>';
  return h;
}

function renderEscCal(){
  var parts=(ESC.mesAno||'').split('-');
  var ano=parseInt(parts[0])||new Date().getFullYear();
  var mesIdx=parseInt(parts[1]||1)-1;
  var nomeMes=ESC_MESES_NM[mesIdx]+' '+ano;
  var primDia=new Date(ano,mesIdx,1).getDay();
  var totDias=new Date(ano,mesIdx+1,0).getDate();
  var hoje=new Date().toISOString().split('T')[0];

  var html='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">';
  html+='<button id="esc-prev" style="width:32px;height:32px;border:none;background:#f3f4f6;border-radius:8px;cursor:pointer;font-size:16px;font-family:inherit;display:flex;align-items:center;justify-content:center">&#8249;</button>';
  html+='<div style="font-weight:700;font-size:16px;color:#1A3A5C">'+nomeMes+'</div>';
  html+='<button id="esc-next" style="width:32px;height:32px;border:none;background:#f3f4f6;border-radius:8px;cursor:pointer;font-size:16px;font-family:inherit;display:flex;align-items:center;justify-content:center">&#8250;</button>';
  html+='</div>';

  html+='<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:5px">';
  ESC_DS.forEach(function(d,i){
    var weekend=i===0||i===6;
    html+='<div style="text-align:center;font-size:10px;font-weight:700;color:'+(weekend?'#dc2626':'#9ca3af')+';padding:4px 0">'+d+'</div>';
  });
  for(var i=0;i<primDia;i++)html+='<div></div>';
  for(var dia=1;dia<=totDias;dia++){
    var ds=ano+'-'+(String(mesIdx+1).padStart(2,'0'))+'-'+(String(dia).padStart(2,'0'));
    var tipo=ESC.cal[ds]||null;
    var isHoje=ds===hoje;
    var dow=new Date(ano,mesIdx,dia).getDay();
    var weekend2=dow===0||dow===6;
    var bg=tipo?escTipoBg(tipo):(weekend2?\'#fef2f2\':\'#f9fafb\');
    var tc=tipo?\'#fff\':(weekend2?\'#dc2626\':\'#374151\');
    var shadow=isHoje&&!tipo?\'0 0 0 2px #1A3A5C\':tipo?\'0 2px 6px rgba(0,0,0,.15)\':\'none\';
    html+=\'<div class="esc-day" data-date="\'+ds+\'" style="aspect-ratio:1;display:flex;flex-direction:column;align-items:center;justify-content:center;background:\'+bg+\';color:\'+tc+\';border-radius:9px;cursor:pointer;user-select:none;font-size:13px;font-weight:700;box-shadow:\'+shadow+\'">\'+dia;
    if(tipo)html+=\'<div style="font-size:9px;font-weight:800;opacity:.9;letter-spacing:.5px">\'+escTipoLetra(tipo)+\'</div>\';
    html+=\'</div>\';
  }
  html+=\'</div>\';
  return html;
}

function renderEscListar(){
  var meses=escMesOpts();
  var letOpts=[['','Todas']].concat(LETRAS.map(function(l){return[l,'Eq.'+l];}));
  var html=\'<div class="flt-bar">\';
  html+=\'<div class="f1"><label>Mes</label><select id="escl-mes">\'+selOpts(meses,ESC.mesAno)+\'</select></div>\';
  html+=\'<div class="f1"><label>Equipe</label><select id="escl-eq">\'+selOpts(letOpts,\'\')+\'</select></div>\';
  html+=\'<div class="f1"><label>Tipo</label><select id="escl-tipo"><option value="">Todos</option><option value="ordinaria">Ordinaria</option><option value="especial">Especial</option></select></div>\';
  html+=\'<button class="btn btn-p" id="escl-flt">Filtrar</button>\';
  html+=\'</div><div id="escl-res"><div class="empty">Clique em Filtrar para carregar.</div></div>\';
  return html;
}

function renderEscCard(e){
  var tipoCor=e.tipo===\'especial\'?\'#f97316\':\'#1A3A5C\';
  var tipoLabel=e.tipo===\'especial\'?\'ESPECIAL\':\'ORDINARIA\';
  var parts=(e.mes_ano||\'\').split(\'-\');
  var nomeMes=parts.length>1?(ESC_MESES_NM[parseInt(parts[1])-1]+\' \'+parts[0]):e.mes_ano;
  var html=\'<div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;margin-bottom:14px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.05)">\';
  html+=\'<div style="padding:14px 16px;display:flex;align-items:center;justify-content:space-between;border-left:4px solid \'+tipoCor+\'">\';
  html+=\'<div style="flex:1">\';
  html+=\'<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">\';
  html+=\'<span style="background:\'+tipoCor+\';color:#fff;font-size:10px;font-weight:700;padding:2px 8px;border-radius:20px">\'+tipoLabel+\'</span>\';
  if(e.nome)html+=\'<span style="font-size:14px;font-weight:700;color:#1A3A5C">\'+esc(e.nome)+\'</span>\';
  html+=\'</div>\';
  html+=\'<div style="display:flex;gap:12px;flex-wrap:wrap">\';
  html+=\'<span style="font-size:12px;color:#6b7280">&#128197; \'+nomeMes+\'</span>\';
  if(e.equipe)html+=\'<span style="font-size:12px;color:#6b7280">Equipe \'+esc(e.equipe)+(e.subequipe?\' / \'+esc(e.subequipe):\'\')+\'</span>\';
  if(e.setor)html+=\'<span style="font-size:12px;color:#6b7280">\'+esc(e.setor)+\'</span>\';
  html+=\'<span style="font-size:12px;color:#6b7280">\'+(e.total_agentes||0)+\' agente(s) &bull; \'+(e.total_dias||0)+\' dia(s)</span>\';
  html+=\'</div>\';
  if(e.horario_diurno_inicio)html+=\'<div style="font-size:11px;color:#9ca3af;margin-top:4px">D: \'+e.horario_diurno_inicio+\'-\'+e.horario_diurno_fim+(e.horario_noturno_inicio?\' | N: \'+e.horario_noturno_inicio+\'-\'+e.horario_noturno_fim:\'\')+\'</div>\';
  html+=\'</div>\';
  html+=\'<div style="display:flex;gap:6px">\';
  html+=\'<button class="btn btn-sm btn-p escl-ver" data-eid="\'+e.id+\'">Ver Escala</button>\';
  html+=\'<button class="btn btn-sm btn-d escl-del" data-eid="\'+e.id+\'">Excluir</button>\';
  html+=\'</div></div></div>\';
  return html;
}

function renderEscDetalhe(det){
  var e=det.escala,dias=det.dias,agentes=det.agentes,agDias=det.agente_dias;
  var parts=(e.mes_ano||'').split('-');
  var ano=parseInt(parts[0]||new Date().getFullYear());
  var mesIdx=parseInt(parts[1]||1)-1;
  var totDias=new Date(ano,mesIdx+1,0).getDate();
  var tipoCor=e.tipo===\'especial\'?\'#f97316\':\'#1A3A5C\';
  var nomeMes=ESC_MESES_NM[mesIdx]+\' \'+ano;

  var diasMap={};
  dias.forEach(function(d){diasMap[d.data]=d.tipo_dia;});

  var html=\'<div style="margin-bottom:16px;display:flex;align-items:center;gap:10px">\';
  html+=\'<button id="escl-back" class="btn btn-sm">&#8592; Voltar</button>\';
  html+=\'<div style="flex:1"><span style="font-weight:700;font-size:15px;color:#1A3A5C">\'+esc(e.nome||\'Escala Ordinaria\')+\'</span> <span style="font-size:13px;color:#6b7280">— \'+nomeMes+\'</span></div>\';
  html+=\'<button id="escl-pdf" class="btn btn-sm btn-p">PDF Escala</button>\';
  html+=\'</div>\';

  // Mini-calendário geral
  html+=\'<div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin-bottom:16px;box-shadow:0 1px 4px rgba(0,0,0,.05)">\';
  html+=\'<div style="font-size:12px;font-weight:700;color:#6b7280;margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px">Calendario da Escala — \'+nomeMes+\'</div>\';
  html+=\'<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;max-width:400px">\';
  ESC_DS.forEach(function(d){html+=\'<div style="text-align:center;font-size:10px;font-weight:700;color:#9ca3af;padding:2px">\'  +d+\'</div>\';});
  var primDia=new Date(ano,mesIdx,1).getDay();
  for(var pi=0;pi<primDia;pi++)html+=\'<div></div>\';
  for(var di=1;di<=totDias;di++){
    var ds=ano+\'-\'+(String(mesIdx+1).padStart(2,\'0\'))+\'-\'+(String(di).padStart(2,\'0\'));
    var t=diasMap[ds];
    var bg=t?escTipoBg(t):\'#f3f4f6\';var tc=t?\'#fff\':\'#9ca3af\';
    html+=\'<div style="aspect-ratio:1;display:flex;flex-direction:column;align-items:center;justify-content:center;background:\'+bg+\';color:\'+tc+\';border-radius:6px;font-size:11px;font-weight:700">\'+di+(t?\'<div style="font-size:8px;opacity:.9">\'+escTipoLetra(t)+\'</div>\':\'\')+\'</div>\';
  }
  html+=\'</div></div>\';

  // Tabela horizontal de agentes
  html+=\'<div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:16px;box-shadow:0 1px 4px rgba(0,0,0,.05)">\';
  html+=\'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">\';
  html+=\'<div style="font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:.5px">Agentes (\'+agentes.length+\')</div>\';
  html+=\'<div style="display:flex;gap:6px;align-items:center">\';
  // Legenda compacta
  [{t:\'diurno\',c:ESC_COR.diurno,l:\'D\'},{t:\'noturno\',c:ESC_COR.noturno,l:\'N\'},{t:\'especial\',c:ESC_COR.especial,l:\'E\'},{t:\'diurno_esp\',c:\'linear-gradient(135deg,\'+ESC_COR.diurno+\' 50%,\'+ESC_COR.especial+\' 50%)\',l:\'D+E\'},{t:\'noturno_esp\',c:\'linear-gradient(135deg,\'+ESC_COR.noturno+\' 50%,\'+ESC_COR.especial+\' 50%)\',l:\'N+E\'}].forEach(function(x){
    html+=\'<span style="display:inline-flex;align-items:center;gap:3px;font-size:10px;color:#6b7280"><span style="width:14px;height:14px;border-radius:3px;background:\'+x.c+\';display:inline-block"></span>\'+x.l+\'</span>\';
  });
  html+=\'<button id="escl-add-ag" class="btn btn-sm btn-p" style="margin-left:8px">+ Agente</button>\';
  html+=\'</div></div>\';

  if(!agentes.length){
    html+=\'<div class="empty">Nenhum agente vinculado. Clique em "+ Agente".</div>\';
  } else {
    var daysArr=[];for(var dxi=1;dxi<=totDias;dxi++)daysArr.push(dxi);
    html+=\'<div style="overflow-x:auto;border-radius:8px;border:1px solid #e5e7eb">\';
    html+=\'<table style="border-collapse:collapse;font-size:11px;white-space:nowrap;width:100%">\';
    // Cabeçalho
    html+=\'<thead><tr>\';
    html+=\'<th style="position:sticky;left:0;z-index:3;background:#1A3A5C;color:#fff;padding:7px 10px;text-align:left;min-width:220px;font-weight:700;border-right:2px solid #fff">Agente</th>\';
    daysArr.forEach(function(dxi){
      var dss=ano+\'-\'+(String(mesIdx+1).padStart(2,\'0\'))+\'-\'+(String(dxi).padStart(2,\'0\'));
      var dow2=new Date(ano,mesIdx,dxi).getDay();
      var wk2=dow2===0||dow2===6;
      html+=\'<th style="background:\'+(wk2?\'#374151\':\'#1A3A5C\')+\';color:#fff;padding:5px 2px;text-align:center;min-width:26px;font-weight:600;font-size:10px">\'+dxi+\'</th>\';
    });
    html+=\'</tr></thead><tbody>\';
    // Linhas dos agentes
    agentes.forEach(function(a,ri){
      var meusDiasMap={};
      agDias.filter(function(d){return d.agente_id===a.agente_id;}).forEach(function(d){meusDiasMap[d.data]=d.tipo_dia;});
      var hasAdj=Object.keys(meusDiasMap).length>0;
      var rowBg=ri%2===0?\'#fff\':\'#f8fafc\';
      html+=\'<tr>\';
      // Coluna fixa do agente
      html+=\'<td style="position:sticky;left:0;z-index:2;background:\'+(hasAdj?\'#fefce8\':rowBg)+\';padding:5px 8px;border-right:2px solid #e5e7eb;border-bottom:1px solid #f3f4f6">\';
      html+=\'<div style="display:flex;align-items:center;gap:5px">\';
      html+=\'<div style="flex:1;min-width:0"><div style="font-weight:600;color:#1A3A5C;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:130px" title="\'+esc(a.nome)+\'">\'+esc(a.nome)+\'</div>\';
      html+=\'<div style="font-size:10px;color:#9ca3af">\'+esc(a.funcional||\'\')+\'\'+(a.letra?\' · Eq.\'+esc(a.letra):\'\')+\'</div></div>\';
      if(hasAdj)html+=\'<span style="background:#fde68a;color:#92400e;font-size:9px;font-weight:700;padding:1px 5px;border-radius:8px;flex-shrink:0">ADJ</span>\';
      html+=\'<button class="btn btn-sm escl-aj" style="padding:2px 7px;font-size:10px;flex-shrink:0" data-aid="\'+a.agente_id+\'" data-anom="\'+esc(a.nome)+\'">Aj.</button>\';
      html+=\'<button class="btn btn-sm btn-d escl-rem-ag" style="padding:2px 6px;font-size:10px;flex-shrink:0" data-aid="\'+a.agente_id+\'">X</button>\';
      html+=\'</div></td>\';
      // Células dos dias
      daysArr.forEach(function(dxi){
        var dss=ano+\'-\'+(String(mesIdx+1).padStart(2,\'0\'))+\'-\'+(String(dxi).padStart(2,\'0\'));
        var tt=meusDiasMap.hasOwnProperty(dss)?meusDiasMap[dss]:diasMap[dss];
        var cbg=tt?escTipoBg(tt):rowBg;
        var clr=tt?\'#fff\':\'#e5e7eb\';
        var ltr=tt?escTipoLetra(tt):\'\';
        html+=\'<td style="padding:3px 1px;text-align:center;border:1px solid #f3f4f6;background:\'+cbg+\';color:\'+clr+\';font-weight:700;font-size:9px;min-width:26px">\'+ltr+\'</td>\';
      });
      html+=\'</tr>\';
    });
    html+=\'</tbody></table></div>\';
  }
  html+=\'</div>\';
  return html;
}

function bindEscalas(){
  // Sub-tabs
  var stCriar=document.getElementById(\'esc-st-criar\');
  var stListar=document.getElementById(\'esc-st-listar\');
  if(stCriar)stCriar.onclick=function(){ESC.subTab=\'criar\';var s=document.getElementById(\'esc-sub\');if(s){s.innerHTML=renderEscCriar();bindEscCriar();}reloadEscSubTabs();};
  if(stListar)stListar.onclick=function(){ESC.subTab=\'listar\';var s=document.getElementById(\'esc-sub\');if(s){s.innerHTML=renderEscListar();bindEscListar();}reloadEscSubTabs();};
  if(ESC.subTab===\'criar\')bindEscCriar();
  else bindEscListar();
}

function reloadEscSubTabs(){
  [{id:\'criar\',label:\'+ Nova Escala\'},{id:\'listar\',label:\'Escalas Salvas\'}].forEach(function(st){
    var btn=document.getElementById(\'esc-st-\'+st.id);if(!btn)return;
    var on=ESC.subTab===st.id;
    btn.style.borderBottom=\'3px solid \'+(on?\'#1A3A5C\':\'transparent\');
    btn.style.fontWeight=on?\'700\':\'500\';
    btn.style.color=on?\'#1A3A5C\':\'#6b7280\';
  });
}

function bindEscCriar(){
  var tipo=document.getElementById(\'esc-tipo-ord\');var tipoEsp=document.getElementById(\'esc-tipo-esp\');
  function setTipo(t){
    ESC.tipo_sel=t;
    var isE=t===\'especial\';
    var nw=document.getElementById(\'esc-nome-wrap\');
    if(nw)nw.style.display=isE?\'block\':\'none\';
    [tipo,tipoEsp].forEach(function(b){if(!b)return;
      var active=b.id===\'esc-tipo-\'+(isE?\'esp\':\'ord\');
      b.style.borderColor=active?(isE?\'#f97316\':\'#1A3A5C\'):\'#e5e7eb\';
      b.style.background=active?(isE?\'#fff7ed\':\'#EBF1F8\'):\'#fff\';
      b.style.color=active?(isE?\'#f97316\':\'#1A3A5C\'):\'#9ca3af\';
    });
  }
  if(tipo)tipo.onclick=function(){setTipo(\'ordinaria\');};
  if(tipoEsp)tipoEsp.onclick=function(){setTipo(\'especial\');};

  var mesEl=document.getElementById(\'esc-mes\');
  if(mesEl)mesEl.onchange=function(){ESC.mesAno=this.value;var cw=document.getElementById(\'esc-cal-wrap\');if(cw)cw.innerHTML=renderEscCal();bindEscCalDays();};

  var prev=document.getElementById(\'esc-prev\');var next=document.getElementById(\'esc-next\');
  if(prev)prev.onclick=function(){var p=ESC.mesAno.split(\'-\');var d=new Date(parseInt(p[0]),parseInt(p[1])-2,1);ESC.mesAno=d.getFullYear()+\'-\'+(String(d.getMonth()+1).padStart(2,\'0\'));var cw=document.getElementById(\'esc-cal-wrap\');if(cw)cw.innerHTML=renderEscCal();bindEscCalDays();var me=document.getElementById(\'esc-mes\');if(me)me.value=ESC.mesAno;};
  if(next)next.onclick=function(){var p=ESC.mesAno.split(\'-\');var d=new Date(parseInt(p[0]),parseInt(p[1]),1);ESC.mesAno=d.getFullYear()+\'-\'+(String(d.getMonth()+1).padStart(2,\'0\'));var cw=document.getElementById(\'esc-cal-wrap\');if(cw)cw.innerHTML=renderEscCal();bindEscCalDays();var me=document.getElementById(\'esc-mes\');if(me)me.value=ESC.mesAno;};

  bindEscCalDays();

  var btnGrupo=document.getElementById(\'esc-btn-grupo\');
  if(btnGrupo)btnGrupo.onclick=escSalvarGrupo;

  var btnIndiv=document.getElementById(\'esc-btn-indiv\');
  if(btnIndiv)btnIndiv.onclick=escSalvarIndiv;

  var btnLimpar=document.getElementById(\'esc-btn-limpar\');
  if(btnLimpar)btnLimpar.onclick=function(){ESC.cal={};var cw=document.getElementById(\'esc-cal-wrap\');if(cw)cw.innerHTML=renderEscCal();bindEscCalDays();var r=document.getElementById(\'esc-resumo\');if(r)r.innerHTML=renderEscResumo();};
}

function bindEscCalDays(){
  document.querySelectorAll(\'.esc-day\').forEach(function(el){
    el.onclick=function(){
      var dt=this.dataset.date;
      var cur=ESC.cal[dt]||null;
      var idx=ESC_SEQ.indexOf(cur);
      var next2=ESC_SEQ[(idx+1)%ESC_SEQ.length];
      if(next2===null)delete ESC.cal[dt]; else ESC.cal[dt]=next2;
      var cw=document.getElementById(\'esc-cal-wrap\');if(cw)cw.innerHTML=renderEscCal();
      bindEscCalDays();
      var r=document.getElementById(\'esc-resumo\');if(r)r.innerHTML=renderEscResumo();
    };
  });
}

function escGetPayload(){
  var v=function(id){var el=document.getElementById(id);return el?el.value:\'\';};
  return {
    tipo:ESC.tipo_sel||\'ordinaria\',
    nome:v(\'esc-nome\')||null,
    mes_ano:v(\'esc-mes\')||ESC.mesAno,
    equipe:v(\'esc-eq\')||null,
    subequipe:v(\'esc-seq\')||null,
    setor:v(\'esc-set\')||null,
    horario_diurno_inicio:v(\'esc-hdi\')||null,
    horario_diurno_fim:v(\'esc-hdf\')||null,
    horario_noturno_inicio:v(\'esc-hni\')||null,
    horario_noturno_fim:v(\'esc-hnf\')||null
  };
}

function escSalvarGrupo(){
  var payload=escGetPayload();
  if(!Object.keys(ESC.cal).length)return toast(\'Marque ao menos um dia no calendario\',\'er\');
  var dias=Object.keys(ESC.cal).map(function(d){return{data:d,tipo_dia:ESC.cal[d]};});
  api.post(\'/api/escalas\',payload).then(function(r){
    var escId=r.data.id;
    return api.put(\'/api/escalas/\'+escId+\'/dias\',{dias:dias}).then(function(){
      // Encontrar agentes do grupo
      var agsFiltrados=ADM.ags.filter(function(a){
        if(!a.ativo)return false;
        if(payload.equipe&&a.letra!==payload.equipe)return false;
        if(payload.subequipe&&(a.subequipe||\'\'  ).toLowerCase()!==payload.subequipe.toLowerCase())return false;
        return true;
      });
      var ids=agsFiltrados.map(function(a){return a.id;});
      if(!ids.length){toast(\'Escala criada! Nenhum agente encontrado para o grupo.\',\'ok\');ESC.cal={};ESC.subTab=\'listar\';var s=document.getElementById(\'esc-sub\');if(s){s.innerHTML=renderEscListar();bindEscListar();escLoadListar();}reloadEscSubTabs();return;}
      return api.post(\'/api/escalas/\'+escId+\'/aplicar\',{agente_ids:ids}).then(function(){
        toast(\'Escala criada e aplicada a \'+ids.length+\' agente(s)!\');
        ESC.cal={};ESC.subTab=\'listar\';
        var s=document.getElementById(\'esc-sub\');if(s){s.innerHTML=renderEscListar();bindEscListar();escLoadListar();}
        reloadEscSubTabs();
      });
    });
  }).catch(function(e){toast(e.message,\'er\');});
}

function escSalvarIndiv(){
  var payload=escGetPayload();
  if(!Object.keys(ESC.cal).length)return toast(\'Marque ao menos um dia no calendario\',\'er\');
  var dias=Object.keys(ESC.cal).map(function(d){return{data:d,tipo_dia:ESC.cal[d]};});
  // Modal de seleção individual de agentes
  var agOp=ADM.ags.filter(function(a){return a.ativo;}).map(function(a){return[a.id,a.nome+\' (\'+a.funcional+(a.letra?\' Eq.\'+a.letra:\'\')+\')\'];});
  var body=\'<div class="fg"><div class="f1 full"><label>Buscar e selecionar agentes</label><div id="esc-indiv-list" style="max-height:300px;overflow-y:auto;border:1px solid #e5e7eb;border-radius:8px;padding:8px">\';
  agOp.forEach(function(op){
    body+=\'<label style="display:flex;align-items:center;gap:8px;padding:5px 4px;cursor:pointer;border-radius:6px"><input type="checkbox" value="\'+op[0]+\'" style="width:15px;height:15px;cursor:pointer"/><span style="font-size:12px">\'+esc(op[1])+\'</span></label>\';
  });
  body+=\'</div></div></div>\';
  var footer=\'<button class="btn" id="esc-indiv-c">Cancelar</button><button class="btn btn-p" id="esc-indiv-ok">Criar e Aplicar</button>\';
  openModal(\'esc-indiv\',\'Selecionar Agentes — Escala Individual\',\'md\',body,footer);
  document.getElementById(\'esc-indiv-c\').onclick=function(){closeModal(\'esc-indiv\');};
  document.getElementById(\'esc-indiv-ok\').onclick=function(){
    var checked=document.querySelectorAll(\'#esc-indiv-list input:checked\');
    var ids=[].map.call(checked,function(c){return parseInt(c.value);});
    if(!ids.length)return toast(\'Selecione ao menos um agente\',\'er\');
    closeModal(\'esc-indiv\');
    api.post(\'/api/escalas\',payload).then(function(r){
      var escId=r.data.id;
      return api.put(\'/api/escalas/\'+escId+\'/dias\',{dias:dias}).then(function(){
        return api.post(\'/api/escalas/\'+escId+\'/aplicar\',{agente_ids:ids}).then(function(){
          toast(\'Escala criada e aplicada a \'+ids.length+\' agente(s)!\');
          ESC.cal={};ESC.subTab=\'listar\';
          var s=document.getElementById(\'esc-sub\');if(s){s.innerHTML=renderEscListar();bindEscListar();escLoadListar();}
          reloadEscSubTabs();
        });
      });
    }).catch(function(e){toast(e.message,\'er\');});
  };
}

function bindEscListar(){
  var flt=document.getElementById(\'escl-flt\');
  if(flt)flt.onclick=escLoadListar;
  escLoadListar();
}

function escLoadListar(){
  var mes=document.getElementById(\'escl-mes\')?document.getElementById(\'escl-mes\').value:ESC.mesAno;
  var eq=document.getElementById(\'escl-eq\')?document.getElementById(\'escl-eq\').value:\'\';
  var tipo=document.getElementById(\'escl-tipo\')?document.getElementById(\'escl-tipo\').value:\'\';
  var q=\'/api/escalas?mes_ano=\'+mes+(eq?\'&equipe=\'+eq:\'\')+(tipo?\'&tipo=\'+tipo:\'\');
  var res=document.getElementById(\'escl-res\');if(res)res.innerHTML=\'<div style="color:#9ca3af;padding:16px">Carregando...</div>\';
  api.get(q).then(function(r){
    ESC.escalas=r.data||[];
    if(!res)return;
    if(!ESC.escalas.length){res.innerHTML=\'<div class="empty">Nenhuma escala encontrada para os filtros selecionados.</div>\';return;}
    res.innerHTML=ESC.escalas.map(renderEscCard).join(\'\');
    res.querySelectorAll(\'.escl-ver\').forEach(function(btn){
      btn.onclick=function(){
        var eid=parseInt(this.dataset.eid);
        api.get(\'/api/escalas/\'+eid).then(function(r2){
          var s=document.getElementById(\'escl-res\');
          if(s){s.innerHTML=renderEscDetalhe(r2.data);bindEscDetalhe(r2.data);}
        }).catch(function(e){toast(e.message,\'er\');});
      };
    });
    res.querySelectorAll(\'.escl-del\').forEach(function(btn){
      btn.onclick=function(){
        if(!confirm(\'Excluir esta escala? Todos os vinculos serao removidos.\'))return;
        var eid=parseInt(this.dataset.eid);
        api.del(\'/api/escalas/\'+eid).then(function(){toast(\'Escala removida!\');escLoadListar();}).catch(function(e){toast(e.message,\'er\');});
      };
    });
  }).catch(function(e){if(res)res.innerHTML=\'<div style="color:#dc2626;padding:16px">Erro: \'+esc(e.message)+\'</div>\';});
}

function bindEscDetalhe(det){
  var back=document.getElementById(\'escl-back\');
  if(back)back.onclick=function(){var s=document.getElementById(\'escl-res\');if(s){s.innerHTML=ESC.escalas.map(renderEscCard).join(\'\');bindEscListar();}};

  var pdfBtn=document.getElementById(\'escl-pdf\');
  if(pdfBtn)pdfBtn.onclick=function(){escPdfModal(det);};

  var addAg=document.getElementById(\'escl-add-ag\');
  if(addAg)addAg.onclick=function(){
    var existIds=det.agentes.map(function(a){return a.agente_id;});
    var agOp=ADM.ags.filter(function(a){return a.ativo&&existIds.indexOf(a.id)<0;}).map(function(a){return[a.id,a.nome+\' (\'+a.funcional+\')\'];});
    var body=\'<div class="fg"><div class="f1 full"><div id="esc-add-list" style="max-height:350px;overflow-y:auto;border:1px solid #e5e7eb;border-radius:8px;padding:8px">\';
    agOp.forEach(function(op){body+=\'<label style="display:flex;gap:8px;align-items:center;padding:5px;cursor:pointer"><input type="checkbox" value="\'+op[0]+\'" style="width:14px;height:14px"/><span style="font-size:12px">\'+esc(op[1])+\'</span></label>\';});
    body+=\'</div></div></div>\';
    var footer=\'<button class="btn" id="esc-add-c">Cancelar</button><button class="btn btn-p" id="esc-add-ok">Adicionar</button>\';
    openModal(\'esc-add\',\'Adicionar Agentes\',\'md\',body,footer);
    document.getElementById(\'esc-add-c\').onclick=function(){closeModal(\'esc-add\');};
    document.getElementById(\'esc-add-ok\').onclick=function(){
      var checked=document.querySelectorAll(\'#esc-add-list input:checked\');
      var ids=[].map.call(checked,function(c){return parseInt(c.value);});
      if(!ids.length)return toast(\'Selecione ao menos um agente\',\'er\');
      closeModal(\'esc-add\');
      api.post(\'/api/escalas/\'+det.escala.id+\'/aplicar\',{agente_ids:ids}).then(function(){
        toast(ids.length+\' agente(s) adicionado(s)!\');
        api.get(\'/api/escalas/\'+det.escala.id).then(function(r){var s=document.getElementById(\'escl-res\');if(s){s.innerHTML=renderEscDetalhe(r.data);bindEscDetalhe(r.data);}});
      }).catch(function(e){toast(e.message,\'er\');});
    };
  };

  document.querySelectorAll(\'.escl-rem-ag\').forEach(function(btn){
    btn.onclick=function(){
      if(!confirm(\'Remover este agente da escala?\'))return;
      var aid=parseInt(this.dataset.aid);
      api.del(\'/api/escalas/\'+det.escala.id+\'/agentes/\'+aid).then(function(){
        toast(\'Agente removido!\');
        api.get(\'/api/escalas/\'+det.escala.id).then(function(r){var s=document.getElementById(\'escl-res\');if(s){s.innerHTML=renderEscDetalhe(r.data);bindEscDetalhe(r.data);}});
      }).catch(function(e){toast(e.message,\'er\');});
    };
  });

  document.querySelectorAll(\'.escl-aj\').forEach(function(btn){
    btn.onclick=function(){
      var aid=parseInt(this.dataset.aid);
      var anom=this.dataset.anom;
      escAjusteModal(det,aid,anom);
    };
  });
}

function escAjusteModal(det,aid,anom){
  var e=det.escala;
  var parts=(e.mes_ano||\'\').split(\'-\');
  var ano=parseInt(parts[0]);var mesIdx=parseInt(parts[1])-1;
  var totDias=new Date(ano,mesIdx+1,0).getDate();
  var diasMap={};
  det.dias.forEach(function(d){diasMap[d.data]=d.tipo_dia;});
  var agDiasMap={};
  det.agente_dias.filter(function(d){return d.agente_id===aid;}).forEach(function(d){agDiasMap[d.data]=d.tipo_dia;});
  // Merge: agente_dias override dias
  var calAj={};
  for(var di=1;di<=totDias;di++){
    var ds=ano+\'-\'+(String(mesIdx+1).padStart(2,\'0\'))+\'-\'+(String(di).padStart(2,\'0\'));
    if(agDiasMap.hasOwnProperty(ds)){if(agDiasMap[ds])calAj[ds]=agDiasMap[ds];}
    else if(diasMap[ds])calAj[ds]=diasMap[ds];
  }
  // Build modal calendar
  function renderAjCal(cal){
    var primDia=new Date(ano,mesIdx,1).getDay();
    var hoje=new Date().toISOString().split(\'T\')[0];
    var h=\'<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px">\';
    ESC_DS.forEach(function(d){h+=\'<div style="text-align:center;font-size:10px;font-weight:700;color:#9ca3af;padding:3px">\'  +d+\'</div>\';});
    for(var pi=0;pi<primDia;pi++)h+=\'<div></div>\';
    for(var di2=1;di2<=totDias;di2++){
      var ds2=ano+\'-\'+(String(mesIdx+1).padStart(2,\'0\'))+\'-\'+(String(di2).padStart(2,\'0\'));
      var t=cal[ds2]||null;
      var bg=t?escTipoBg(t):\'#f3f4f6\';var tc=t?\'#fff\':\'#374151\';
      var isH=ds2===hoje;
      h+=\'<div class="aj-day" data-date="\'+ds2+\'" style="aspect-ratio:1;display:flex;flex-direction:column;align-items:center;justify-content:center;background:\'+bg+\';color:\'+tc+\';border-radius:8px;cursor:pointer;font-size:13px;font-weight:700;box-shadow:\'+(isH&&!t?\'0 0 0 2px #1A3A5C\':\'none\')+\'">\'+di2+(t?\'<div style="font-size:9px;font-weight:800;opacity:.9">\'+escTipoLetra(t)+\'</div>\':\'\')+\'</div>\';
    }
    h+=\'</div>\';return h;
  }
  var body=\'<div><div style="font-size:12px;color:#6b7280;margin-bottom:12px">Clique nos dias para ajustar. O calendario mostra a escala base com seus ajustes individuais.</div>\';
  body+=\'<div id="aj-cal-wrap" style="background:#f9fafb;border-radius:10px;padding:12px">\'+renderAjCal(calAj)+\'</div>\';
  body+=\'<div style="display:flex;gap:6px;margin-top:12px;flex-wrap:wrap">\';
  [{t:\'diurno\',c:ESC_COR.diurno,l:\'D — Diurno\'},{t:\'noturno\',c:ESC_COR.noturno,l:\'N — Noturno\'},{t:\'especial\',c:ESC_COR.especial,l:\'E — Especial\'},{t:\'diurno_esp\',c:\'linear-gradient(135deg,\'+ESC_COR.diurno+\' 50%,\'+ESC_COR.especial+\' 50%)\',l:\'D+E — Diurno+Especial\'},{t:\'noturno_esp\',c:\'linear-gradient(135deg,\'+ESC_COR.noturno+\' 50%,\'+ESC_COR.especial+\' 50%)\',l:\'N+E — Noturno+Especial\'},{t:null,c:\'#f3f4f6\',l:\'Folga\',bd:\'1px solid #e5e7eb\'}].forEach(function(x){
    body+=\'<div style="display:flex;align-items:center;gap:4px"><span style="width:14px;height:14px;border-radius:3px;background:\'+x.c+\';border:\'+(x.bd||\'none\')+\';display:inline-block"></span><span style="font-size:11px">\'  +x.l+\'</span></div>\';
  });
  body+=\'</div></div>\';
  var footer=\'<button class="btn" id="aj-c">Cancelar</button><button class="btn btn-p" id="aj-ok">Salvar Ajuste</button>\';
  openModal(\'esc-aj\',\'Ajuste Individual — \'+esc(anom),\'md\',body,footer);
  // Bind calendar clicks
  function bindAjDays(){
    document.querySelectorAll(\'.aj-day\').forEach(function(el){
      el.onclick=function(){
        var dt=this.dataset.date;
        var cur=calAj[dt]||null;
        var idx=ESC_SEQ.indexOf(cur);
        var nxt=ESC_SEQ[(idx+1)%ESC_SEQ.length];
        if(nxt===null)delete calAj[dt]; else calAj[dt]=nxt;
        var cw=document.getElementById(\'aj-cal-wrap\');if(cw)cw.innerHTML=renderAjCal(calAj);
        bindAjDays();
      };
    });
  }
  bindAjDays();
  document.getElementById(\'aj-c\').onclick=function(){closeModal(\'esc-aj\');};
  document.getElementById(\'aj-ok\').onclick=function(){
    var dias=[];
    for(var di3=1;di3<=totDias;di3++){
      var ds3=ano+\'-\'+(String(mesIdx+1).padStart(2,\'0\'))+\'-\'+(String(di3).padStart(2,\'0\'));
      dias.push({data:ds3,tipo_dia:calAj[ds3]||null});
    }
    api.put(\'/api/escalas/\'+e.id+\'/agentes/\'+aid+\'/dias\',{dias:dias}).then(function(){
      toast(\'Ajuste salvo!\');closeModal(\'esc-aj\');
      api.get(\'/api/escalas/\'+e.id).then(function(r){var s=document.getElementById(\'escl-res\');if(s){s.innerHTML=renderEscDetalhe(r.data);bindEscDetalhe(r.data);}});
    }).catch(function(e2){toast(e2.message,\'er\');});
  };
}

function escPdfModal(det){
  var e=det.escala,agentes=det.agentes,dias=det.dias,agDias=det.agente_dias;
  var parts=(e.mes_ano||\'\').split(\'-\');
  var ano=parseInt(parts[0]);var mesIdx=parseInt(parts[1])-1;
  var totDias=new Date(ano,mesIdx+1,0).getDate();
  var nomeMes=ESC_MESES_NM[mesIdx]+\' \'+ano;
  var diasMap={};dias.forEach(function(d){diasMap[d.data]=d.tipo_dia;});

  var tbl=\'<table style="width:100%;border-collapse:collapse;font-size:10px">\';
  tbl+=\'<tr><th style="padding:4px 6px;background:#1A3A5C;color:#fff;text-align:left;white-space:nowrap">Agente</th>\';
  for(var di=1;di<=totDias;di++){
    var ds=ano+\'-\'+(String(mesIdx+1).padStart(2,\'0\'))+\'-\'+(String(di).padStart(2,\'0\'));
    var dow=new Date(ano,mesIdx,di).getDay();
    var weekend=dow===0||dow===6;
    tbl+=\'<th style="padding:4px 2px;background:\'+(weekend?\'#6b7280\':\'#1A3A5C\')+\';color:#fff;text-align:center;min-width:18px">\'  +di+\'</th>\';
  }
  tbl+=\'</tr>\';
  agentes.forEach(function(a,ri){
    var meusDiasMap={};
    agDias.filter(function(d){return d.agente_id===a.agente_id;}).forEach(function(d){meusDiasMap[d.data]=d.tipo_dia;});
    var bg=ri%2===0?\'#fff\':\'#f8fafc\';
    tbl+=\'<tr style="background:\'+bg+\'"><td style="padding:4px 6px;font-weight:600;white-space:nowrap;border:1px solid #e5e7eb">\'  +esc(a.nome)+\' <span style="color:#9ca3af;font-weight:400">(\'+esc(a.funcional||\'\')+\')</span></td>\';
    for(var di2=1;di2<=totDias;di2++){
      var ds2=ano+\'-\'+(String(mesIdx+1).padStart(2,\'0\'))+\'-\'+(String(di2).padStart(2,\'0\'));
      var tt=meusDiasMap.hasOwnProperty(ds2)?meusDiasMap[ds2]:diasMap[ds2];
      var cc=tt?escTipoBg(tt):\'\';
      var ltr=tt?escTipoLetra(tt):\'\';
      tbl+=\'<td style="padding:2px;text-align:center;border:1px solid #e5e7eb;background:\'+(cc||\'#fff\')+\';color:\'+(cc?\'#fff\':\'#d1d5db\')+\';font-weight:700;font-size:9px">\'  +ltr+\'</td>\';
    }
    tbl+=\'</tr>\';
  });
  tbl+=\'</table>\';

  var html=\'<div style="font-family:Arial,sans-serif;padding:20px">\';
  html+=\'<div style="text-align:center;margin-bottom:16px"><div style="font-size:18px;font-weight:700;color:#1A3A5C">GUARDA MUNICIPAL — ESCALA \'+( e.tipo===\'especial\'?\'ESPECIAL NOMINADA\':\'ORDINARIA\' )+\'</div>\';
  html+=\'<div style="font-size:14px;color:#6b7280">\'+(e.nome?esc(e.nome)+\' — \':\'\')+nomeMes+(e.equipe?\' | Equipe \'+e.equipe+(e.subequipe?\'/\'+e.subequipe:\'\'):\'\')+(e.setor?\' | \'+esc(e.setor):\'\')+\'</div>\';
  if(e.horario_diurno_inicio)html+=\'<div style="font-size:11px;color:#6b7280;margin-top:4px">D: \'+e.horario_diurno_inicio+\'h — \'+e.horario_diurno_fim+\'h\'+(e.horario_noturno_inicio?\' | N: \'+e.horario_noturno_inicio+\'h — \'+e.horario_noturno_fim+\'h\':\'\')+\'</div>\';
  html+=\'</div>\';
  html+=\'<div style="margin-bottom:10px;display:flex;gap:12px;flex-wrap:wrap;font-size:11px">\';
  [{c:ESC_COR.diurno,l:\'D = Diurno\'},{c:ESC_COR.noturno,l:\'N = Noturno\'},{c:ESC_COR.especial,l:\'E = Especial\'},{c:\'linear-gradient(135deg,\'+ESC_COR.diurno+\' 50%,\'+ESC_COR.especial+\' 50%)\',l:\'D+E = Diurno+Especial\'},{c:\'linear-gradient(135deg,\'+ESC_COR.noturno+\' 50%,\'+ESC_COR.especial+\' 50%)\',l:\'N+E = Noturno+Especial\'}].forEach(function(x){
    html+=\'<span><span style="display:inline-block;width:12px;height:12px;background:\'+x.c+\';border-radius:2px;vertical-align:middle;margin-right:4px"></span>\'  +x.l+\'</span>\';
  });
  html+=\'</div>\'+tbl+\'</div>\';

  pdfFromHtml(html,\'escala_\'+(e.nome||e.mes_ano||\'relatorio\').replace(/\\s/g,\'_\'));
}

// =====================================================================
// MINHA ESCALA
// =====================================================================
function pgMinhaEscala(){
  var now=new Date();
  var mesAtual=now.getFullYear()+'-'+(String(now.getMonth()+1).padStart(2,'0'));
  var meses=escMesOpts();
  var html=ph('Minha Escala','Visualize sua escala mensal');
  html+='<div class="flt-bar"><div class="f1"><label>Mes</label><select id="me-mes">'+selOpts(meses,mesAtual)+'</select></div><button class="btn btn-p" id="me-flt">Carregar</button></div>';
  html+='<div id="me-body"><div class="empty">Selecione o mes e clique em Carregar.</div></div>';
  pc().innerHTML=html;
  function carregarMinhaEscala(){
    var mes=document.getElementById('me-mes').value;
    var body=document.getElementById('me-body');
    if(body)body.innerHTML='<div style="color:#9ca3af;padding:20px">Carregando...</div>';
    api.get('/api/escalas/minha?mes_ano='+mes).then(function(r){
      var dados=r.data||[];
      if(!dados.length){if(body)body.innerHTML='<div class="empty">Nenhuma escala encontrada para este mes.</div>';return;}
      var parts=mes.split('-');var ano=parseInt(parts[0]);var mesIdx=parseInt(parts[1])-1;
      var nomeMes=ESC_MESES_NM[mesIdx]+' '+ano;
      var totDias=new Date(ano,mesIdx+1,0).getDate();
      var primDia=new Date(ano,mesIdx,1).getDay();
      var hoje=new Date().toISOString().split('T')[0];
      var html2='';
      dados.forEach(function(d){
        var e=d.escala,dias=d.dias,agDias=d.agente_dias;
        var diasMap={};dias.forEach(function(x){diasMap[x.data]=x.tipo_dia;});
        var agDiasMap={};agDias.forEach(function(x){agDiasMap[x.data]=x.tipo_dia;});
        var tipoCor=e.tipo==='especial'?'#f97316':'#1A3A5C';
        var tipoLabel=e.tipo==='especial'?'ESPECIAL':'ORDINARIA';
        html2+='<div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;margin-bottom:16px;padding:16px;box-shadow:0 1px 4px rgba(0,0,0,.05);border-left:4px solid '+tipoCor+'">';
        html2+='<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">';
        html2+='<span style="background:'+tipoCor+';color:#fff;font-size:10px;font-weight:700;padding:2px 10px;border-radius:20px">'+tipoLabel+'</span>';
        if(e.nome)html2+='<span style="font-size:14px;font-weight:700;color:#1A3A5C">'+esc(e.nome)+'</span>';
        html2+='<span style="font-size:13px;color:#6b7280">'+nomeMes+'</span>';
        if(e.setor)html2+='<span class="bdg b-blue">'+esc(e.setor)+'</span>';
        html2+='</div>';
        // Horários
        if(e.horario_diurno_inicio){
          html2+='<div style="font-size:12px;color:#6b7280;margin-bottom:10px">';
          html2+='<span style="background:#eff6ff;color:#3b82f6;padding:3px 8px;border-radius:6px;font-weight:600;margin-right:8px">D: '+e.horario_diurno_inicio+' — '+e.horario_diurno_fim+'</span>';
          if(e.horario_noturno_inicio)html2+='<span style="background:#EBF1F8;color:#1e3a5f;padding:3px 8px;border-radius:6px;font-weight:600">N: '+e.horario_noturno_inicio+' — '+e.horario_noturno_fim+'</span>';
          html2+='</div>';
        }
        // Calendário
        html2+='<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:5px;max-width:380px">';
        ESC_DS.forEach(function(d2,i){var wk=i===0||i===6;html2+='<div style="text-align:center;font-size:10px;font-weight:700;color:'+(wk?'#dc2626':'#9ca3af')+';padding:2px">'+d2+'</div>';});
        for(var pi=0;pi<primDia;pi++)html2+='<div></div>';
        var ndiu=0,nnot=0,nesp=0,nde=0,nne=0;
        for(var di=1;di<=totDias;di++){
          var ds=ano+'-'+(String(mesIdx+1).padStart(2,'0'))+'-'+(String(di).padStart(2,'0'));
          var tt=agDiasMap.hasOwnProperty(ds)?agDiasMap[ds]:diasMap[ds];
          if(tt==='diurno')ndiu++;else if(tt==='noturno')nnot++;else if(tt==='especial')nesp++;
          else if(tt==='diurno_esp')nde++;else if(tt==='noturno_esp')nne++;
          var bg=tt?escTipoBg(tt):'#f9fafb';var tc=tt?'#fff':'#d1d5db';
          var isH=ds===hoje;
          html2+='<div style="aspect-ratio:1;display:flex;flex-direction:column;align-items:center;justify-content:center;background:'+bg+';color:'+tc+';border-radius:8px;font-size:12px;font-weight:700;box-shadow:'+(isH?'0 0 0 2px #1A3A5C':'none')+'">';
          html2+=di;
          if(tt)html2+='<div style="font-size:8px;font-weight:800;opacity:.9">'+escTipoLetra(tt)+'</div>';
          html2+='</div>';
        }
        html2+='</div>';
        // Resumo
        html2+='<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">';
        if(ndiu)html2+='<span style="background:#eff6ff;color:#3b82f6;padding:4px 10px;border-radius:8px;font-size:12px;font-weight:700">'+ndiu+' D</span>';
        if(nnot)html2+='<span style="background:#EBF1F8;color:#1e3a5f;padding:4px 10px;border-radius:8px;font-size:12px;font-weight:700">'+nnot+' N</span>';
        if(nesp)html2+='<span style="background:#fff7ed;color:#f97316;padding:4px 10px;border-radius:8px;font-size:12px;font-weight:700">'+nesp+' E</span>';
        if(nde)html2+='<span style="background:#eff6ff;color:#3b82f6;padding:4px 10px;border-radius:8px;font-size:12px;font-weight:700">'+nde+' D+E</span>';
        if(nne)html2+='<span style="background:#EBF1F8;color:#1e3a5f;padding:4px 10px;border-radius:8px;font-size:12px;font-weight:700">'+nne+' N+E</span>';
        var total=ndiu+nnot+nesp+nde+nne;
        html2+='<span style="background:#f3f4f6;color:#6b7280;padding:4px 10px;border-radius:8px;font-size:12px;font-weight:700">'+total+' dia(s) de servico</span>';
        html2+='</div>';
        html2+='</div>';
      });
      if(body)body.innerHTML=html2;
    }).catch(function(e){if(body)body.innerHTML='<div style="color:#dc2626;padding:16px">Erro: '+esc(e.message)+'</div>';});
  }
  var fltBtn=document.getElementById('me-flt');if(fltBtn)fltBtn.onclick=carregarMinhaEscala;
  carregarMinhaEscala();
}

// =====================================================================
// AUDITORIA
// =====================================================================
function pgAudit(){
  var modOpts=[['','Todos'],['armaria','armaria'],['frota','frota'],['almoxarifado','almoxarifado'],['supervisao','supervisao'],['agentes','agentes'],['auth','auth']];
  var html=ph('Auditoria do Sistema','Registro de todas as acoes')+'<div class="flt-bar"><div class="f1"><label>Modulo</label><select id="aud-mod" style="width:180px">'+selOpts(modOpts,'')+'</select></div><button class="btn btn-p" id="aud-flt">Filtrar</button></div><div id="aud-res"><div class="empty">Clique em Filtrar para carregar.</div></div>';
  pc().innerHTML=html;
  document.getElementById('aud-flt').onclick=loadAudit;
  loadAudit();
}
function loadAudit(){
  var mod=document.getElementById('aud-mod')?document.getElementById('aud-mod').value:'';
  api.get('/api/auditoria'+(mod?'?modulo='+mod:'')).then(function(r){var el=document.getElementById('aud-res');if(el)el.innerHTML=tableHtml(['Data/hora','Agente','Modulo','Acao','IP'],r.data.map(function(l){return '<tr><td style="font-size:11px;color:#9ca3af">'+fmtTs(l.criado_em)+'</td><td>'+esc(l.agente_nome||'Sistema')+' <span style="color:#9ca3af">('+esc(l.funcional||'--')+')</span></td><td>'+bdg(l.modulo,'blue')+'</td><td>'+bdg(l.acao,l.acao==='INSERT'?'green':l.acao==='DELETE'?'red':'gray')+'</td><td style="font-family:monospace;font-size:11px;color:#9ca3af">'+esc(l.ip_origem||'--')+'</td></tr>';}));}).catch(function(e){toast(e.message,'er');});
}

// START
render();
</script>
</body>
</html>`;
return H;
})();

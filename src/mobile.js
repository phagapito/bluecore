// PWA Mobile App - Portal do Agente GCM Serra
module.exports = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
<meta name="mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-capable" content="yes"/>
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
<meta name="apple-mobile-web-app-title" content="GCM Portal"/>
<meta name="theme-color" content="#1A3A5C"/>
<title>GCM Serra - Portal do Agente</title>
<link rel="manifest" href="/mobile/manifest.json"/>
<link rel="apple-touch-icon" href="/mobile/icon-192.svg"/>
<style>
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
:root{
  --navy:#1A3A5C;--blue:#2E75B6;--light-blue:#5BB8F5;
  --green:#16a34a;--red:#dc2626;--yellow:#ca8a04;--amber:#d97706;
  --purple:#7c3aed;--teal:#0891b2;--indigo:#4f46e5;
  --gray:#6b7280;--light:#f3f4f6;--white:#fff;
  --safe-top:env(safe-area-inset-top,0px);
  --safe-bot:env(safe-area-inset-bottom,0px);
}
html,body{height:100%;overflow:hidden;background:var(--light);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
#app{height:100%;display:flex;flex-direction:column}

/* HEADER */
.header{background:var(--navy);padding:calc(var(--safe-top) + 12px) 16px 12px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;min-height:56px}
.header-title{color:#fff;font-size:17px;font-weight:700;letter-spacing:.3px}
.header-sub{color:rgba(255,255,255,.5);font-size:11px;margin-top:1px}
.header-avatar{width:34px;height:34px;border-radius:50%;background:var(--blue);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;cursor:pointer;flex-shrink:0}

/* CONTENT */
.content{flex:1;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:0 0 calc(var(--safe-bot) + 72px)}

/* BOTTOM NAV */
.bottom-nav{position:fixed;bottom:0;left:0;right:0;background:#fff;border-top:1px solid #e5e7eb;padding-bottom:var(--safe-bot);display:flex;z-index:10}
.nav-btn{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:9px 2px;background:none;border:none;cursor:pointer;color:var(--gray);font-size:9px;font-weight:600;gap:3px;transition:color .15s;letter-spacing:.2px}
.nav-btn.active{color:var(--navy)}
.nav-btn svg{width:22px;height:22px}
.nav-dot{width:5px;height:5px;border-radius:50%;background:var(--red);position:absolute;top:-1px;right:-1px}

/* CARDS */
.card{background:#fff;border-radius:16px;margin:10px 16px;box-shadow:0 1px 4px rgba(0,0,0,.07)}
.card-body{padding:16px}

/* BUTTONS */
.btn{width:100%;padding:15px;border-radius:14px;border:none;font-size:15px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;transition:all .15s;font-family:inherit}
.btn:active{transform:scale(.97)}
.btn-primary{background:var(--navy);color:#fff}
.btn-danger{background:var(--red);color:#fff}
.btn-success{background:var(--green);color:#fff}
.btn-outline{background:#fff;color:var(--navy);border:2px solid var(--navy)}
.btn-sm{padding:9px 14px;font-size:13px;border-radius:10px;width:auto}
.btn-wrap{padding:0 16px;display:flex;flex-direction:column;gap:10px}

/* FORM */
.form-group{margin-bottom:16px}
.form-label{font-size:11px;font-weight:700;color:var(--gray);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px;display:block}
.form-input{width:100%;padding:13px 15px;border:2px solid #e5e7eb;border-radius:12px;font-size:16px;font-family:inherit;color:#111;background:#fff;outline:none;transition:border .15s;-webkit-appearance:none}
.form-input:focus{border-color:var(--blue)}
.form-input.big{font-size:22px;font-weight:700;text-align:center;letter-spacing:2px}
.form-select{width:100%;padding:12px 14px;border:2px solid #e5e7eb;border-radius:12px;font-size:15px;font-family:inherit;color:#111;background:#fff;outline:none;-webkit-appearance:none;appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236b7280' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center}

/* CHECKLIST */
.ck-item{display:flex;align-items:center;gap:14px;padding:13px 16px;background:#fff;border-bottom:1px solid #f3f4f6;cursor:pointer}
.ck-item:last-child{border-bottom:none}
.ck-item:active{background:var(--light)}
.ck-box{width:24px;height:24px;border-radius:7px;border:2px solid #d1d5db;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all .15s}
.ck-box.checked{background:var(--green);border-color:var(--green)}
.ck-label{font-size:14px;color:#111;flex:1}

/* VIATURA */
.vt-item{display:flex;align-items:center;gap:12px;padding:13px 16px;background:#fff;border-bottom:1px solid #f3f4f6;cursor:pointer}
.vt-item:active{background:var(--light)}
.vt-item:last-child{border-bottom:none}
.vt-prefixo-tag{background:var(--navy);color:#fff;border-radius:8px;padding:6px 10px;font-size:12px;font-weight:700;min-width:64px;text-align:center}
.vt-detail{flex:1}
.vt-name{font-size:14px;font-weight:600;color:#111}
.vt-km{font-size:12px;color:var(--gray);margin-top:2px}

/* FUEL */
.fuel-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:7px;margin-top:8px}
.fuel-btn{padding:11px 4px;border-radius:10px;border:2px solid #e5e7eb;background:#fff;font-size:10px;font-weight:600;color:var(--gray);cursor:pointer;text-align:center;transition:all .15s;font-family:inherit}
.fuel-btn.selected{border-color:var(--blue);background:var(--blue);color:#fff}

/* STEP */
.steps{display:flex;padding:0 16px 14px;gap:6px}
.step{flex:1;height:4px;border-radius:999px;background:#e5e7eb;transition:background .3s}
.step.done{background:var(--navy)}
.step.active{background:var(--blue)}

/* HISTORICO */
.hist-item{padding:13px 16px;border-bottom:1px solid #f3f4f6}
.hist-item:last-child{border-bottom:none}
.hist-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px}
.hist-prefixo{font-size:14px;font-weight:700;color:var(--navy)}
.badge{font-size:10px;font-weight:700;padding:3px 9px;border-radius:999px;display:inline-block}
.badge-green{background:#dcfce7;color:#166534}
.badge-yellow{background:#fef9c3;color:#854d0e}
.badge-blue{background:#dbeafe;color:#1e40af}
.badge-red{background:#fee2e2;color:#991b1b}
.badge-purple{background:#ede9fe;color:#5b21b6}
.badge-gray{background:#f3f4f6;color:#374151}

/* CALENDAR */
.cal-wrap{padding:0 16px 16px}
.cal-header{display:flex;align-items:center;justify-content:space-between;padding:14px 0 12px}
.cal-title{font-size:16px;font-weight:700;color:var(--navy)}
.cal-nav-btn{background:none;border:1px solid #e5e7eb;border-radius:8px;padding:6px 12px;font-size:14px;cursor:pointer;color:var(--navy)}
.cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}
.cal-dow{font-size:10px;font-weight:700;color:var(--gray);text-align:center;padding:4px 0;text-transform:uppercase}
.cal-day{min-height:38px;border-radius:8px;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:12px;font-weight:600;color:var(--gray);background:transparent;position:relative}
.cal-day.workday{background:var(--light);color:#374151}
.cal-day.diurno{background:#dbeafe;color:#1e40af}
.cal-day.noturno{background:#1e3a5f;color:#fff}
.cal-day.especial{background:#fed7aa;color:#9a3412}
.cal-day.diurno_esp{background:linear-gradient(135deg,#dbeafe 50%,#fed7aa 50%);color:#1e40af}
.cal-day.noturno_esp{background:linear-gradient(135deg,#1e3a5f 50%,#fed7aa 50%);color:#fff}
.cal-day.today-ring{box-shadow:0 0 0 2px var(--blue)}
.cal-day-num{font-size:13px;font-weight:700;line-height:1}
.cal-day-tag{font-size:8px;font-weight:700;opacity:.85;margin-top:1px;letter-spacing:.3px}
.cal-legend{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.cal-leg-item{display:flex;align-items:center;gap:5px;font-size:11px;color:#374151}
.cal-leg-dot{width:12px;height:12px;border-radius:3px}

/* HOME CARDS */
.home-hero{background:linear-gradient(135deg,var(--navy) 0%,var(--blue) 100%);padding:20px 16px 22px;position:relative;overflow:hidden}
.home-hero::after{content:'';position:absolute;top:-30px;right:-30px;width:140px;height:140px;border-radius:50%;background:rgba(255,255,255,.06)}
.home-greeting{font-size:22px;font-weight:800;color:#fff;margin-bottom:2px}
.home-date{font-size:13px;color:rgba(255,255,255,.65)}
.mod-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:12px 16px 4px}
.mod-card{background:#fff;border-radius:14px;padding:14px;box-shadow:0 1px 4px rgba(0,0,0,.07);cursor:pointer;transition:transform .15s}
.mod-card:active{transform:scale(.97)}
.mod-card-ico{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:10px;font-size:20px}
.mod-card-label{font-size:11px;font-weight:700;color:var(--gray);text-transform:uppercase;letter-spacing:.4px;margin-bottom:4px}
.mod-card-val{font-size:18px;font-weight:800;color:#111;line-height:1.1}
.mod-card-sub{font-size:11px;color:var(--gray);margin-top:3px}

/* VIATURA STATUS CARD */
.vt-active-card{background:linear-gradient(135deg,#064e3b,#065f46);border-radius:14px;margin:10px 16px;padding:18px;color:#fff;position:relative;overflow:hidden}
.vt-active-card::after{content:'';position:absolute;bottom:-20px;right:-20px;width:100px;height:100px;border-radius:50%;background:rgba(255,255,255,.06)}
.vt-active-label{font-size:11px;opacity:.7;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px}
.vt-active-prefixo{font-size:34px;font-weight:800;letter-spacing:2px}
.vt-active-info{font-size:12px;opacity:.8;margin-top:4px}
.vt-none-card{background:var(--light);border:2px dashed #d1d5db;border-radius:14px;margin:10px 16px;padding:24px;text-align:center}

/* AGENDA */
.agenda-tabs{display:flex;background:#fff;border-bottom:2px solid #f3f4f6;margin-bottom:4px;flex-shrink:0;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.agenda-tabs::-webkit-scrollbar{display:none}
.agenda-tab{flex-shrink:0;padding:12px 16px;font-size:13px;font-weight:600;color:var(--gray);background:none;border:none;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-2px;transition:all .15s;font-family:inherit;white-space:nowrap}
.agenda-tab.active{color:var(--navy);border-bottom-color:var(--navy)}
.list-item{padding:14px 16px;border-bottom:1px solid #f3f4f6;cursor:default}
.list-item:last-child{border-bottom:none}
.list-item-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px}
.list-item-title{font-size:14px;font-weight:600;color:#111;flex:1;margin-right:8px}
.list-item-sub{font-size:12px;color:var(--gray);margin-top:2px}

/* SECTION TITLE */
.section-title{font-size:11px;font-weight:700;color:var(--gray);text-transform:uppercase;letter-spacing:.5px;padding:16px 16px 8px}

/* SPINNER / EMPTY */
.spinner{width:36px;height:36px;border:3px solid #e5e7eb;border-top-color:var(--navy);border-radius:50%;animation:spin .8s linear infinite;margin:40px auto}
@keyframes spin{to{transform:rotate(360deg)}}
.empty{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:44px 24px;text-align:center}
.empty-ico{font-size:44px;margin-bottom:10px;opacity:.35}
.empty-text{font-size:14px;color:var(--gray);line-height:1.5}

/* LOGIN */
.login-wrap{min-height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 24px;background:linear-gradient(160deg,var(--navy) 0%,var(--blue) 100%)}
.login-logo{width:76px;height:76px;background:rgba(255,255,255,.15);border-radius:22px;display:flex;align-items:center;justify-content:center;margin-bottom:20px}
.login-title{color:#fff;font-size:26px;font-weight:800;letter-spacing:2px;margin-bottom:4px}
.login-sub{color:rgba(255,255,255,.6);font-size:13px;margin-bottom:36px;text-align:center}
.login-box{background:#fff;border-radius:22px;padding:26px;width:100%;max-width:380px}
.login-field-label{font-size:11px;font-weight:700;color:var(--gray);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px;display:block}
.login-input{width:100%;padding:13px 15px;border:2px solid #e5e7eb;border-radius:12px;font-size:17px;font-family:inherit;color:#111;background:#fff;outline:none;margin-bottom:13px;-webkit-appearance:none}
.login-input:focus{border-color:var(--blue)}
.login-btn{width:100%;padding:15px;border-radius:13px;border:none;background:var(--navy);color:#fff;font-size:16px;font-weight:700;cursor:pointer;font-family:inherit}
.login-hint{color:rgba(255,255,255,.45);font-size:11px;margin-top:20px;text-align:center}

/* PROFILE */
.profile-header{background:linear-gradient(135deg,var(--navy),var(--blue));padding:28px 24px;text-align:center;color:#fff}
.profile-avatar{width:68px;height:68px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:800;margin:0 auto 10px}
.profile-name{font-size:18px;font-weight:700}
.profile-info{font-size:13px;opacity:.7;margin-top:3px}
.profile-item{display:flex;align-items:center;gap:13px;padding:14px 16px;border-bottom:1px solid #f3f4f6}
.profile-item-ico{width:38px;height:38px;border-radius:10px;background:var(--light);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.profile-item-label{font-size:12px;color:var(--gray)}
.profile-item-value{font-size:14px;font-weight:600;color:#111;margin-top:1px}

/* BANCO DE HORAS VISUAL */
.bh-hero{background:linear-gradient(135deg,#1A3A5C 0%,#2E75B6 100%);border-radius:22px;margin:12px 16px;padding:22px 20px 18px;color:#fff;position:relative;overflow:hidden}
.bh-hero::before{content:'';position:absolute;top:-50px;right:-50px;width:160px;height:160px;border-radius:50%;background:rgba(255,255,255,.05)}
.bh-hero::after{content:'';position:absolute;bottom:-30px;left:-20px;width:100px;height:100px;border-radius:50%;background:rgba(255,255,255,.04)}
.bh-hero-label{font-size:11px;font-weight:700;opacity:.65;text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px}
.bh-hero-val{font-size:54px;font-weight:800;line-height:1;letter-spacing:-2px;position:relative}
.bh-hero-sub{font-size:12px;opacity:.7;margin-top:6px;font-weight:500}
.bh-bar-wrap{background:rgba(255,255,255,.15);border-radius:999px;height:7px;margin-top:18px;overflow:hidden;display:flex;gap:2px}
.bh-bar-c{background:#4ade80;border-radius:999px;min-width:4px;transition:width .5s ease}
.bh-bar-d{background:#f87171;border-radius:999px;min-width:0;transition:width .5s ease}
.bh-stats-row{display:flex;margin:0 16px 14px;gap:10px}
.bh-stat-box{flex:1;background:#fff;border-radius:14px;padding:14px 10px;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,.06)}
.bh-stat-val{font-size:22px;font-weight:800;line-height:1}
.bh-stat-lbl{font-size:10px;color:var(--gray);font-weight:700;margin-top:4px;text-transform:uppercase;letter-spacing:.4px}
.bh-tx{display:flex;align-items:center;padding:13px 16px;border-bottom:1px solid #f3f4f6;gap:12px}
.bh-tx:last-child{border-bottom:none}
.bh-tx-stripe{width:3px;height:34px;border-radius:999px;flex-shrink:0}
.bh-tx-ico{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.bh-tx-body{flex:1;min-width:0}
.bh-tx-name{font-size:13px;font-weight:600;color:#111;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.bh-tx-meta{font-size:11px;color:var(--gray);margin-top:2px}
.bh-tx-amt{font-size:17px;font-weight:800;flex-shrink:0;letter-spacing:-.5px}
/* PERMUTAS VISUAL */
.perm-hero{background:#fff;border-radius:22px;margin:12px 16px 10px;padding:20px;box-shadow:0 2px 8px rgba(0,0,0,.08)}
.perm-hero-title{font-size:13px;font-weight:700;color:var(--gray);text-transform:uppercase;letter-spacing:.5px;margin-bottom:18px}
.perm-dots-row{display:flex;justify-content:center;gap:14px;margin-bottom:16px}
.perm-dot{width:60px;height:60px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;position:relative;transition:all .25s}
.perm-dot.used{background:var(--navy);color:#fff;box-shadow:0 6px 16px rgba(26,58,92,.25)}
.perm-dot.empty{background:#f3f4f6;color:#cbd5e1;border:2px dashed #e2e8f0}
.perm-prog{background:#f1f5f9;border-radius:999px;height:8px;overflow:hidden;margin-bottom:10px}
.perm-prog-fill{height:100%;border-radius:999px;transition:width .4s ease}
.perm-stats-row{display:flex;gap:8px;margin:0 16px 10px}
.perm-stat-box{flex:1;background:#fff;border-radius:14px;padding:12px 8px;text-align:center;box-shadow:0 1px 4px rgba(0,0,0,.06)}
.perm-stat-val{font-size:20px;font-weight:800;line-height:1}
.perm-stat-lbl{font-size:10px;color:var(--gray);font-weight:700;margin-top:3px;text-transform:uppercase;letter-spacing:.3px}
.perm-action{background:linear-gradient(135deg,#fffbeb,#fef9c3);border:2px solid #fde68a;border-radius:18px;margin:0 16px 12px;padding:16px;position:relative}
.perm-action-badge{display:inline-block;background:#f59e0b;color:#fff;font-size:10px;font-weight:700;padding:3px 10px;border-radius:999px;margin-bottom:12px;letter-spacing:.3px;text-transform:uppercase}
.perm-action-names{font-size:15px;font-weight:700;color:var(--navy);margin-bottom:4px}
.perm-action-detail{font-size:12px;color:#78716c;line-height:1.6}
.perm-action-btns{display:flex;gap:8px;margin-top:14px}
.perm-hist{background:#fff;border-radius:18px;margin:0 16px 16px;box-shadow:0 1px 4px rgba(0,0,0,.06);overflow:hidden}
.perm-hist-row{display:flex;align-items:center;padding:13px 16px;border-bottom:1px solid #f3f4f6;gap:12px}
.perm-hist-row:last-child{border-bottom:none}
.perm-hist-ico{width:38px;height:38px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.perm-hist-body{flex:1;min-width:0}
.perm-hist-name{font-size:13px;font-weight:600;color:#111}
.perm-hist-sub{font-size:11px;color:var(--gray);margin-top:2px}
/* TOAST */
.toast-wrap{position:fixed;top:calc(var(--safe-top) + 58px);left:50%;transform:translateX(-50%);z-index:100;display:flex;flex-direction:column;gap:8px;pointer-events:none;width:calc(100% - 32px);max-width:360px}
.toast{background:#111827;color:#fff;padding:13px 16px;border-radius:13px;font-size:13px;font-weight:500;box-shadow:0 4px 20px rgba(0,0,0,.3);animation:slideDown .25s ease}
.toast.ok{border-left:4px solid var(--green)}
.toast.er{border-left:4px solid var(--red)}
@keyframes slideDown{from{transform:translateY(-16px);opacity:0}to{transform:translateY(0);opacity:1}}
</style>
</head>
<body>
<div id="app"></div>
<div class="toast-wrap" id="toast-c"></div>
<script>
var STATE = {
  page:'loading', agente:null, token:null,
  viaturas:[], cautelaAtiva:null, selViatura:null, step:1, form:{}, checklist:{},
  escalaData:[], escalaMes:'', agendaTab:'ferias',
  feriasData:[], audienciasData:[], materiaisData:[],
  permutasData:[], mobileAgentes:[],
  bhData:[], bhSaldo:0,
  homeLoaded:false
};

var MESES_NM=['Janeiro','Fevereiro','Marco','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
var CK=['Pneus (4 + estepe)','Lanternas e faróis','Giroflex e sirene','Extintor (válido)','Rádio comunicador','Kit primeiros socorros','Documentação do veículo','Interior limpo'];
var NIVEIS=[{v:'vazio',l:'Vazio'},{v:'quarto',l:'1/4'},{v:'metade',l:'1/2'},{v:'tres_quartos',l:'3/4'},{v:'cheio',l:'Cheio'}];
var TIPO_LABEL={diurno:'Diurno',noturno:'Noturno',especial:'Especial',diurno_esp:'Diurno+Esp',noturno_esp:'Noturno+Esp'};

(function(){try{STATE.token=localStorage.getItem('mb_token');STATE.agente=JSON.parse(localStorage.getItem('mb_agente')||'null');}catch(e){}})();

function curMesAno(){var n=new Date();return n.getFullYear()+'-'+String(n.getMonth()+1).padStart(2,'0');}

// ── API
function api(method,url,body){
  var opts={method:method,headers:{'Content-Type':'application/json','Authorization':'Bearer '+(STATE.token||'')}};
  if(body)opts.body=JSON.stringify(body);
  return fetch(url,opts).then(function(r){return r.json().then(function(d){if(r.status===401){logout();throw new Error('Sessão expirada');}if(!r.ok)throw new Error(d.error||'Erro');return d;});});
}

// ── Toast
function toast(msg,type){var c=document.getElementById('toast-c');var el=document.createElement('div');el.className='toast '+(type||'ok');el.textContent=msg;c.appendChild(el);setTimeout(function(){if(c.contains(el))c.removeChild(el);},3200);}

// ── Helpers
function fmtTs(s){try{var d=new Date(s);return d.toLocaleDateString('pt-BR')+' '+d.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'});}catch(e){return s||'--';}}
function fmtDt(s){try{if(!s)return '--';var p=s.split('-');return p[2]+'/'+p[1]+'/'+p[0];}catch(e){return s||'--';}}
function fmtKm(n){return Number(n||0).toLocaleString('pt-BR')+' km';}
function esc(s){if(!s)return '';return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

// ── Auth
function logout(){localStorage.removeItem('mb_token');localStorage.removeItem('mb_agente');STATE.token=null;STATE.agente=null;navigate('login');}

// ── Navigation
function navigate(page,params){STATE.page=page;if(params)Object.assign(STATE,params);render();}

function render(){
  var app=document.getElementById('app');
  if(!STATE.token||!STATE.agente){app.innerHTML=renderLogin();bindLogin();return;}
  switch(STATE.page){
    case 'home':   app.innerHTML=renderLayout(renderHome(),'Portal GCM','');bindHome();break;
    case 'frota':  app.innerHTML=renderLayout(renderFrota(),'Frota','Cautela de viatura');bindFrota();break;
    case 'escala': app.innerHTML=renderLayout(renderEscala(),'Minha Escala','Plantões do mês');bindEscala();break;
    case 'agenda': app.innerHTML=renderLayout(renderAgenda(),'Agenda','Férias e audiências');bindAgenda();break;
    case 'perfil': app.innerHTML=renderLayout(renderPerfil(),'Perfil','');bindPerfil();break;
    default:       app.innerHTML=renderLayout(renderHome(),'Portal GCM','');bindHome();
  }
}

// ── LAYOUT
function renderLayout(content,title,sub){
  var pages=['home','frota','escala','agenda','perfil'];
  var icons=[
    '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>',
    '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>',
    '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>',
    '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>',
    '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>'
  ];
  var labels=['Início','Frota','Escala','Agenda','Perfil'];
  var pendPerm=(STATE.permutasData||[]).filter(function(p){return p.status==='pendente_cedente'&&p.agente_cedente_id===STATE.agente.id;}).length;
  var nav='<div class="bottom-nav">';
  pages.forEach(function(p,i){
    var dot='';
    if(p==='agenda'&&pendPerm>0)dot='<span class="nav-dot"></span>';
    var ico='<span style="position:relative;display:inline-block">'+icons[i]+dot+'</span>';
    nav+='<button class="nav-btn'+(STATE.page===p?' active':'')+'" data-page="'+p+'">'+ico+labels[i]+'</button>';
  });
  nav+='</div>';
  var ag=STATE.agente;
  return '<div style="height:100%;display:flex;flex-direction:column">'+
    '<div class="header">'+
      '<div><div class="header-title">'+esc(title)+'</div>'+(sub?'<div class="header-sub">'+esc(sub)+'</div>':'')+'</div>'+
      '<div class="header-avatar" id="hdr-avatar">'+(ag?ag.nome.charAt(0):'?')+'</div>'+
    '</div>'+
    '<div class="content" id="main-content">'+content+'</div>'+
    nav+
  '</div>';
}

// ════════════════════════════════════════════════════════════
// HOME
// ════════════════════════════════════════════════════════════
function renderHome(){return '<div id="home-wrap"><div class="spinner"></div></div>';}

function bindHome(){
  bindNav();
  document.getElementById('hdr-avatar').onclick=function(){navigate('perfil');};
  if(STATE.homeLoaded){renderHomeContent();return;}
  loadHomeData();
}

function loadHomeData(){
  var mes=curMesAno();
  Promise.all([
    api('GET','/api/mobile/cautelas/ativas').catch(function(){return {data:[]};}),
    api('GET','/api/mobile/viaturas?status=disponivel').catch(function(){return {data:[]};}),
    api('GET','/api/escalas/minha?mes_ano='+mes).catch(function(){return {data:[]};}),
    api('GET','/api/mobile/minhas-ferias').catch(function(){return {data:[]};}),
    api('GET','/api/mobile/minhas-audiencias').catch(function(){return {data:[]};}),
    api('GET','/api/mobile/meus-materiais').catch(function(){return {data:[]};})  ,
    api('GET','/api/mobile/permutas').catch(function(){return {data:[]};})  ,
    api('GET','/api/mobile/meu-banco-horas').catch(function(){return {data:[],saldo:0};})
  ]).then(function(rs){
    var todas=rs[0].data||[];
    var minha=todas.find(function(c){return c.motorista_id===STATE.agente.id;});
    STATE.cautelaAtiva=minha||null;
    STATE.viaturas=rs[1].data||[];
    STATE.escalaData=rs[2].data||[];
    STATE.feriasData=rs[3].data||[];
    STATE.audienciasData=rs[4].data||[];
    STATE.materiaisData=rs[5].data||[];
    STATE.permutasData=rs[6].data||[];
    STATE.bhData=rs[7].data||[];STATE.bhSaldo=rs[7].saldo||0;
    STATE.homeLoaded=true;
    renderHomeContent();
  }).catch(function(e){
    toast(e.message,'er');
    var w=document.getElementById('home-wrap');
    if(w)w.innerHTML='<div class="empty"><div class="empty-ico">⚠️</div><div class="empty-text">Erro ao carregar dados.</div></div>';
  });
}

function renderHomeContent(){
  var w=document.getElementById('home-wrap');if(!w)return;
  var ag=STATE.agente;
  var hoje=new Date().toISOString().split('T')[0];
  var html='<div class="home-hero">'+
    '<div class="home-greeting">Olá, '+(ag.qra||ag.nome.split(' ')[0])+'</div>'+
    '<div class="home-date">'+new Date().toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long'})+'</div>'+
  '</div>';

  // Viatura card
  if(STATE.cautelaAtiva){
    var c=STATE.cautelaAtiva;
    html+='<div class="vt-active-card">'+
      '<div class="vt-active-label">🚗 Viatura em uso</div>'+
      '<div class="vt-active-prefixo">'+(c.prefixo||'--')+'</div>'+
      '<div class="vt-active-info">'+(c.modelo||'')+(c.placa?' · Placa '+c.placa:'')+'</div>'+
      '<div class="vt-active-info" style="margin-top:6px">Saída: '+fmtTs(c.data_cautela)+'</div>'+
    '</div>'+
    '<div class="btn-wrap" style="margin-bottom:4px"><button class="btn btn-success" id="btn-home-dev">Registrar Devolução</button></div>';
  } else {
    html+='<div class="vt-none-card">'+
      '<div style="font-size:36px;margin-bottom:8px">🚗</div>'+
      '<div style="font-size:14px;font-weight:700;color:var(--navy)">Sem viatura cautelada</div>'+
      '<div style="font-size:12px;color:var(--gray);margin-top:4px">'+STATE.viaturas.length+' disponíve'+(STATE.viaturas.length===1?'l':'is')+'</div>'+
    '</div>'+
    '<div class="btn-wrap" style="margin-bottom:4px"><button class="btn btn-primary" id="btn-home-caut">Cautelar Viatura</button></div>';
  }

  // Próximo plantão
  var nextPlantao='--';
  var nextTipo='';
  var allDias=[];
  STATE.escalaData.forEach(function(d){
    var src=d.agente_dias&&d.agente_dias.length?d.agente_dias:d.dias;
    src.forEach(function(dia){if(dia.data>=hoje&&dia.tipo_dia)allDias.push(dia);});
  });
  allDias.sort(function(a,b){return a.data<b.data?-1:1;});
  if(allDias.length){var prox=allDias[0];nextPlantao=fmtDt(prox.data);nextTipo=TIPO_LABEL[prox.tipo_dia]||prox.tipo_dia;}

  // Próximas férias
  var nextFerias='Sem férias';
  var feriasVig=STATE.feriasData.filter(function(f){return f.data_fim&&f.data_fim>=hoje;});
  if(feriasVig.length){var nf=feriasVig[0];nextFerias=(nf.data_inicio?fmtDt(nf.data_inicio)+' → '+fmtDt(nf.data_fim):''+nf.qtd_dias+'d programados');}

  // Audiências pendentes
  var audPend=STATE.audienciasData.filter(function(a){return !a.data_dispensa&&a.data_audiencia>=hoje;}).length;

  var pendPerm=(STATE.permutasData||[]).filter(function(p){return p.status==='pendente_cedente'&&p.agente_cedente_id===STATE.agente.id;}).length;
  var bhSaldo=STATE.bhSaldo||0;var bhCor=bhSaldo>0?'var(--green)':bhSaldo<0?'var(--red)':'#111';
  html+='<div class="mod-grid">'+
    '<div class="mod-card" id="mc-escala">'+
      '<div class="mod-card-ico" style="background:#eff6ff">📅</div>'+
      '<div class="mod-card-label">Próximo Plantão</div>'+
      '<div class="mod-card-val" style="font-size:14px">'+nextPlantao+'</div>'+
      '<div class="mod-card-sub">'+(nextTipo||'—')+'</div>'+
    '</div>'+
    '<div class="mod-card" id="mc-bh">'+
      '<div class="mod-card-ico" style="background:#f0fdf4">⏱️</div>'+
      '<div class="mod-card-label">Banco de Horas</div>'+
      '<div class="mod-card-val" style="color:'+bhCor+'">'+bhSaldo+'h</div>'+
      '<div class="mod-card-sub">Saldo atual</div>'+
    '</div>'+
    '<div class="mod-card" id="mc-perm">'+
      '<div class="mod-card-ico" style="background:#fef3c7">🔄</div>'+
      '<div class="mod-card-label">Permutas</div>'+
      '<div class="mod-card-val" style="color:'+(pendPerm>0?'var(--amber)':'#111')+'">'+pendPerm+'</div>'+
      '<div class="mod-card-sub">'+(pendPerm>0?pendPerm+' aguardam resposta':'Sem pendentes')+'</div>'+
    '</div>'+
    '<div class="mod-card" id="mc-ferias">'+
      '<div class="mod-card-ico" style="background:#f5f3ff">🏖️</div>'+
      '<div class="mod-card-label">Férias</div>'+
      '<div class="mod-card-val" style="font-size:12px;font-weight:700">'+nextFerias+'</div>'+
      '<div class="mod-card-sub">'+STATE.feriasData.length+' registros'+'</div>'+
    '</div>'+
    '<div class="mod-card" id="mc-aud">'+
      '<div class="mod-card-ico" style="background:#fffbeb">⚖️</div>'+
      '<div class="mod-card-label">Audiências</div>'+
      '<div class="mod-card-val" style="color:'+(audPend>0?'var(--amber)':'#111')+'">'+STATE.audienciasData.length+'</div>'+
      '<div class="mod-card-sub">'+(audPend>0?audPend+' pendente'+(audPend>1?'s':''):'Em dia')+'</div>'+
    '</div>'+
    '<div class="mod-card" id="mc-mat">'+
      '<div class="mod-card-ico" style="background:#f0fdfa">🎒</div>'+
      '<div class="mod-card-label">Materiais</div>'+
      '<div class="mod-card-val">'+STATE.materiaisData.length+'</div>'+
      '<div class="mod-card-sub">'+(STATE.materiaisData.length?'Cautelados':'Nenhum')+'</div>'+
    '</div>'+
  '</div>';

  w.innerHTML=html;

  var bc=document.getElementById('btn-home-caut');
  if(bc)bc.onclick=function(){STATE.step=1;STATE.form={};STATE.checklist={};STATE.selViatura=null;navigate('frota');};
  var bd=document.getElementById('btn-home-dev');
  if(bd)bd.onclick=function(){navigate('frota');};
  var me=document.getElementById('mc-escala');if(me)me.onclick=function(){navigate('escala');};
  var mbh=document.getElementById('mc-bh');if(mbh)mbh.onclick=function(){STATE.agendaTab='banco_horas';navigate('agenda');};
  var mp=document.getElementById('mc-perm');if(mp)mp.onclick=function(){STATE.agendaTab='permutas';navigate('agenda');};
  var mf=document.getElementById('mc-ferias');if(mf)mf.onclick=function(){STATE.agendaTab='ferias';navigate('agenda');};
  var ma=document.getElementById('mc-aud');if(ma)ma.onclick=function(){STATE.agendaTab='audiencias';navigate('agenda');};
  var mm=document.getElementById('mc-mat');if(mm)mm.onclick=function(){navigate('perfil');};
}

// ════════════════════════════════════════════════════════════
// FROTA (cautela + historico)
// ════════════════════════════════════════════════════════════
function renderFrota(){
  if(STATE.cautelaAtiva&&STATE.step===1){
    var c=STATE.cautelaAtiva;
    return '<div class="vt-active-card" style="margin:16px">'+
      '<div class="vt-active-label">🚗 Viatura em uso</div>'+
      '<div class="vt-active-prefixo">'+(c.prefixo||'--')+'</div>'+
      '<div class="vt-active-info">'+(c.modelo||'')+(c.placa?' · Placa '+c.placa:'')+'</div>'+
      '<div class="vt-active-info" style="margin-top:4px">KM saída: '+fmtKm(c.km_inicial)+' · Comb.: '+(c.nivel_combustivel_inicial||'--')+'</div>'+
      '<div class="vt-active-info" style="font-size:11px;opacity:.6;margin-top:6px">Saída: '+fmtTs(c.data_cautela)+'</div>'+
    '</div>'+
    '<div class="btn-wrap"><button class="btn btn-success" id="btn-dev">Registrar Devolução</button></div>'+
    '<div class="btn-wrap" style="margin-top:0;padding-top:0"><button class="btn btn-outline" id="btn-abast" style="border-color:#f59e0b;color:#92400e">⛽ Registrar Abastecimento</button></div>'+
    renderFrotaHist();
  }
  if(!STATE.cautelaAtiva&&STATE.step===1){
    var html='<div class="section-title">Viaturas disponíveis ('+STATE.viaturas.length+')</div>';
    if(!STATE.viaturas.length){html+='<div class="empty"><div class="empty-ico">🚗</div><div class="empty-text">Nenhuma viatura disponível.</div></div>';}
    else{html+='<div class="card"><div>';STATE.viaturas.forEach(function(v){html+='<div class="vt-item" data-vid="'+v.id+'">'+'<div class="vt-prefixo-tag">'+v.prefixo+'</div>'+'<div class="vt-detail"><div class="vt-name">'+(v.marca||'')+' '+(v.modelo||'')+'</div><div class="vt-km">KM: '+fmtKm(v.km_atual)+' · '+(v.setor||'')+'</div></div>'+'<svg width="16" height="16" fill="none" stroke="#d1d5db" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>'+'</div>';});html+='</div></div>';}
    html+='<div class="btn-wrap"><button class="btn btn-outline" id="btn-abast" style="border-color:#f59e0b;color:#92400e">⛽ Registrar Abastecimento</button></div>';
    html+=renderFrotaHist();
    return html;
  }
  // Wizard steps 2 e 3
  var steps='<div class="steps">'+['Viatura','Dados','Checklist'].map(function(s,i){var cl=i+1<STATE.step?'done':i+1===STATE.step?'active':'';return '<div class="step '+cl+'"></div>';}).join('')+'</div>';
  if(STATE.step===2)return steps+renderStep2();
  if(STATE.step===3)return steps+renderStep3();
  return '';
}

function renderFrotaHist(){
  if(!STATE.homeLoaded)return '';
  return '';
}

function renderStep2(){
  var v=STATE.selViatura;
  return '<div class="card" style="margin-top:8px"><div class="card-body" style="display:flex;align-items:center;gap:12px">'+
    '<div class="vt-prefixo-tag" style="font-size:16px;padding:9px 13px">'+(v?v.prefixo:'--')+'</div>'+
    '<div><div style="font-size:15px;font-weight:700">'+(v?v.marca+' '+v.modelo:'--')+'</div><div style="font-size:12px;color:var(--gray)">KM atual: '+fmtKm(v?v.km_atual:0)+'</div></div>'+
  '</div></div>'+
  '<div style="padding:4px 16px 0">'+
    '<div class="form-group"><label class="form-label">KM de Saída</label><input class="form-input big" type="number" id="caut-km" inputmode="numeric" placeholder="00000" value="'+(STATE.form.km||(v?v.km_atual:''))+'"/></div>'+
    '<div class="form-group"><label class="form-label">Nível de Combustível</label><div class="fuel-grid" id="caut-fuel">'+NIVEIS.map(function(n){return '<button class="fuel-btn'+(STATE.form.nivel===n.v?' selected':'')+'" data-val="'+n.v+'">'+n.l+'</button>';}).join('')+'</div></div>'+
  '</div>'+
  '<div class="btn-wrap"><button class="btn btn-primary" id="step2-next">Próximo: Checklist</button><button class="btn btn-outline" id="step2-back">Voltar</button></div>';
}

function renderStep3(){
  var allCk=CK.every(function(i){return STATE.checklist[i];});
  return '<div class="section-title" style="padding-top:8px">Checklist da viatura</div>'+
    '<div class="card">'+CK.map(function(item){var ck=!!STATE.checklist[item];return '<div class="ck-item" data-item="'+encodeURIComponent(item)+'"><div class="ck-box'+(ck?' checked':'')+'">'+
      (ck?'<svg width="14" height="14" fill="none" stroke="#fff" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>':'')+
    '</div><div class="ck-label">'+esc(item)+'</div></div>';}).join('')+'</div>'+
    (!allCk?'<div style="padding:0 16px 8px"><div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:11px 13px;font-size:12px;color:#92400e">Confirme todos os itens do checklist antes de continuar.</div></div>':'')+
    '<div class="btn-wrap"><button class="btn btn-primary" id="step3-ok"'+(allCk?'':' style="opacity:.5"')+'>Confirmar Cautela</button><button class="btn btn-outline" id="step3-back">Voltar</button></div>';
}

function bindFrota(){
  bindNav();
  // Lista viaturas
  document.querySelectorAll('.vt-item[data-vid]').forEach(function(el){
    el.onclick=function(){
      var vid=parseInt(this.dataset.vid);
      STATE.selViatura=STATE.viaturas.find(function(v){return v.id===vid;});
      STATE.step=2;STATE.form={};STATE.checklist={};render();
    };
  });
  // Devolução
  var bd=document.getElementById('btn-dev');if(bd)bd.onclick=showDescautela;
  // Abastecimento
  var ba=document.getElementById('btn-abast');if(ba)ba.onclick=showAbastecerSheet;
  // Step 2
  var fb=document.querySelectorAll('#caut-fuel .fuel-btn');
  fb.forEach(function(b){b.onclick=function(){fb.forEach(function(x){x.classList.remove('selected');});this.classList.add('selected');STATE.form.nivel=this.dataset.val;};});
  var n2=document.getElementById('step2-next');
  if(n2)n2.onclick=function(){var km=document.getElementById('caut-km');if(!km||!km.value){toast('Informe o KM de saída','er');return;}if(!STATE.form.nivel){toast('Selecione o combustível','er');return;}STATE.form.km=km.value;STATE.step=3;render();};
  var b2=document.getElementById('step2-back');if(b2)b2.onclick=function(){STATE.step=1;render();};
  // Step 3
  document.querySelectorAll('.ck-item[data-item]').forEach(function(el){el.onclick=function(){var item=decodeURIComponent(this.dataset.item);STATE.checklist[item]=!STATE.checklist[item];render();};});
  var ok3=document.getElementById('step3-ok');
  if(ok3)ok3.onclick=function(){
    if(!CK.every(function(i){return STATE.checklist[i];})){toast('Complete o checklist','er');return;}
    ok3.disabled=true;ok3.textContent='Registrando...';
    api('POST','/api/mobile/cautelas',{viatura_id:STATE.selViatura.id,km_inicial:parseInt(STATE.form.km),nivel_combustivel_inicial:STATE.form.nivel,checklist_json:STATE.checklist,motorista_id:STATE.agente.id})
      .then(function(){toast('Cautela registrada!');STATE.cautelaAtiva=null;STATE.step=1;STATE.form={};STATE.checklist={};STATE.selViatura=null;STATE.homeLoaded=false;navigate('frota');loadFrotaData();})
      .catch(function(e){toast(e.message,'er');if(ok3){ok3.disabled=false;ok3.textContent='Confirmar Cautela';}});
  };
  var b3=document.getElementById('step3-back');if(b3)b3.onclick=function(){STATE.step=2;render();};
  // Reload data if needed
  if(!STATE.homeLoaded)loadFrotaData();
}

function loadFrotaData(){
  Promise.all([
    api('GET','/api/mobile/cautelas/ativas').catch(function(){return {data:[]};}),
    api('GET','/api/mobile/viaturas?status=disponivel').catch(function(){return {data:[]};})
  ]).then(function(rs){
    var todas=rs[0].data||[];
    var minha=todas.find(function(c){return c.motorista_id===STATE.agente.id;});
    STATE.cautelaAtiva=minha||null;
    STATE.viaturas=rs[1].data||[];
    STATE.homeLoaded=true;
    if(STATE.page==='frota')render();
  }).catch(function(){});
}

// ── DESCAUTELA (bottom sheet)
function showDescautela(){
  var c=STATE.cautelaAtiva;
  var body=document.createElement('div');
  body.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:50;display:flex;align-items:flex-end;justify-content:center';
  body.innerHTML='<div style="background:#fff;border-radius:22px 22px 0 0;padding:22px;width:100%;max-width:480px;padding-bottom:calc(22px + env(safe-area-inset-bottom))">'+
    '<div style="width:36px;height:4px;background:#e5e7eb;border-radius:999px;margin:0 auto 18px"></div>'+
    '<div style="font-size:18px;font-weight:700;margin-bottom:3px">Devolver '+c.prefixo+'</div>'+
    '<div style="font-size:12px;color:var(--gray);margin-bottom:16px">KM de saída: '+fmtKm(c.km_inicial)+'</div>'+
    '<div class="form-group"><label class="form-label">KM Final</label><input class="form-input big" type="number" id="desc-km" placeholder="00000" inputmode="numeric" value="'+(c.km_viatura||c.km_inicial)+'"/></div>'+
    '<div class="form-group"><label class="form-label">Nível de Combustível Final</label><div class="fuel-grid" id="desc-fuel">'+NIVEIS.map(function(n){return '<button class="fuel-btn" data-val="'+n.v+'">'+n.l+'</button>';}).join('')+'</div></div>'+
    '<div class="form-group"><label class="form-label">Observações</label><textarea class="form-input" id="desc-obs" rows="2" placeholder="Ocorrências, avarias..." style="resize:none;height:68px"></textarea></div>'+
    '<button class="btn btn-success" id="desc-ok" style="margin-top:4px">Confirmar Devolução</button>'+
    '<button class="btn btn-outline" id="desc-cancel" style="margin-top:10px">Cancelar</button>'+
  '</div>';
  document.body.appendChild(body);
  var selFuel=null;
  body.querySelectorAll('.fuel-btn').forEach(function(b){b.onclick=function(){body.querySelectorAll('.fuel-btn').forEach(function(x){x.classList.remove('selected');});this.classList.add('selected');selFuel=this.dataset.val;};});
  document.getElementById('desc-cancel').onclick=function(){document.body.removeChild(body);};
  document.getElementById('desc-ok').onclick=function(){
    var km=document.getElementById('desc-km').value;
    if(!km){toast('Informe o KM final','er');return;}
    if(parseInt(km)<parseInt(c.km_inicial)){toast('KM final menor que o de saída','er');return;}
    api('PUT','/api/mobile/cautelas/'+c.id+'/encerrar',{km_final:parseInt(km),nivel_combustivel_final:selFuel||'',observacoes_retorno:document.getElementById('desc-obs').value})
      .then(function(){toast('Devolução registrada!');document.body.removeChild(body);STATE.cautelaAtiva=null;STATE.homeLoaded=false;navigate('frota');loadFrotaData();})
      .catch(function(e){toast(e.message,'er');});
  };
}

// ── ABASTECIMENTO (bottom sheet)
function showAbastecerSheet(){
  var hoje=new Date().toISOString().substring(0,10);
  // pega todas as viaturas (disponíveis + cautelada do agente) para o select
  var todasVt=STATE.viaturas.slice();
  if(STATE.cautelaAtiva){
    var c=STATE.cautelaAtiva;
    var jaEsta=todasVt.some(function(v){return v.id===c.viatura_id;});
    if(!jaEsta)todasVt.unshift({id:c.viatura_id,prefixo:c.prefixo||'--',placa:c.placa||'',modelo:c.modelo||'',km_atual:c.km_viatura||c.km_inicial||0});
  }
  var vtOpts=todasVt.map(function(v){return '<option value="'+v.id+'">'+esc(v.prefixo)+(v.placa?' - '+esc(v.placa):'')+' ('+fmtKm(v.km_atual)+')</option>';}).join('');
  var sheet=document.createElement('div');
  sheet.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:50;display:flex;align-items:flex-end;justify-content:center';
  sheet.innerHTML='<div style="background:#fff;border-radius:22px 22px 0 0;padding:22px;width:100%;max-width:480px;padding-bottom:calc(22px + env(safe-area-inset-bottom));max-height:92vh;overflow-y:auto">'+
    '<div style="width:36px;height:4px;background:#e5e7eb;border-radius:999px;margin:0 auto 18px"></div>'+
    '<div style="font-size:18px;font-weight:700;margin-bottom:4px">⛽ Registrar Abastecimento</div>'+
    '<div style="font-size:12px;color:var(--gray);margin-bottom:18px">Preencha os dados do abastecimento</div>'+
    '<div class="form-group"><label class="form-label">Viatura</label>'+
      '<select class="form-input" id="ab-vt-sel">'+(todasVt.length?vtOpts:'<option value="">Nenhuma viatura</option>')+'</select></div>'+
    '<div class="form-group"><label class="form-label">Data do Abastecimento</label>'+
      '<input class="form-input" type="date" id="ab-data" value="'+hoje+'"/></div>'+
    '<div class="form-group"><label class="form-label">KM Atual (hodômetro)</label>'+
      '<input class="form-input big" type="number" id="ab-km" inputmode="numeric" placeholder="Ex: 58230"/></div>'+
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">'+
      '<div class="form-group"><label class="form-label">Litros (L)</label>'+
        '<input class="form-input" type="number" step="0.01" id="ab-lt" inputmode="decimal" placeholder="Ex: 45.5"/></div>'+
      '<div class="form-group"><label class="form-label">Valor Total (R$)</label>'+
        '<input class="form-input" type="number" step="0.01" id="ab-vl" inputmode="decimal" placeholder="Ex: 280.00"/></div>'+
    '</div>'+
    '<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:10px 14px;font-size:13px;color:#92400e;margin-bottom:14px;text-align:center" id="ab-preco-label">Informe litros e valor para calcular o preço/L</div>'+
    '<div class="form-group"><label class="form-label">Tipo de Combustível</label>'+
      '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px" id="ab-comb">'+
        ['Gasolina','Etanol','Diesel','GNV'].map(function(c){return '<button class="fuel-btn'+(c==='Gasolina'?' selected':'')+'" data-comb="'+c+'" style="font-size:11px;padding:9px 4px">'+c+'</button>';}).join('')+
      '</div></div>'+
    '<div class="form-group"><label class="form-label">Posto (opcional)</label>'+
      '<input class="form-input" id="ab-posto" placeholder="Nome do posto"/></div>'+
    '<button class="btn" style="background:#f59e0b;border-color:#f59e0b;color:#fff;margin-top:4px" id="ab-confirmar">Confirmar Abastecimento</button>'+
    '<button class="btn btn-outline" id="ab-cancelar" style="margin-top:10px">Cancelar</button>'+
  '</div>';
  document.body.appendChild(sheet);
  var selComb='Gasolina';
  sheet.querySelectorAll('#ab-comb .fuel-btn').forEach(function(b){
    b.onclick=function(){sheet.querySelectorAll('#ab-comb .fuel-btn').forEach(function(x){x.classList.remove('selected');});this.classList.add('selected');selComb=this.dataset.comb;};
  });
  // live preço/litro
  function calcPreco(){
    var lt=parseFloat(document.getElementById('ab-lt').value);
    var vl=parseFloat(document.getElementById('ab-vl').value);
    var lbl=document.getElementById('ab-preco-label');
    if(lt>0&&vl>0){
      var pl=(vl/lt).toFixed(3);
      lbl.textContent='R$ '+pl+'/litro';
      lbl.style.background='#ecfdf5';lbl.style.borderColor='#6ee7b7';lbl.style.color='#065f46';
    } else {
      lbl.textContent='Informe litros e valor para calcular o preço/L';
      lbl.style.background='#fffbeb';lbl.style.borderColor='#fde68a';lbl.style.color='#92400e';
    }
  }
  document.getElementById('ab-lt').oninput=calcPreco;
  document.getElementById('ab-vl').oninput=calcPreco;
  // preenche km da viatura selecionada
  document.getElementById('ab-vt-sel').onchange=function(){
    var vid=parseInt(this.value);
    var vt=todasVt.find(function(v){return v.id===vid;});
    if(vt){var kmEl=document.getElementById('ab-km');if(kmEl&&!kmEl.value)kmEl.value=vt.km_atual||'';}
  };
  // preenche km inicial baseado na 1ª viatura
  if(todasVt.length){var kmEl=document.getElementById('ab-km');if(kmEl&&!kmEl.value)kmEl.value=todasVt[0].km_atual||'';}
  document.getElementById('ab-cancelar').onclick=function(){document.body.removeChild(sheet);};
  document.getElementById('ab-confirmar').onclick=function(){
    var vtId=document.getElementById('ab-vt-sel').value;
    var dt=document.getElementById('ab-data').value;
    var km=document.getElementById('ab-km').value;
    var lt=document.getElementById('ab-lt').value;
    var vl=document.getElementById('ab-vl').value;
    if(!vtId||!dt||!km||!lt||!vl){toast('Preencha todos os campos obrigatórios','er');return;}
    var btn=document.getElementById('ab-confirmar');
    btn.disabled=true;btn.textContent='Registrando...';
    api('POST','/api/mobile/abastecimentos',{
      viatura_id:parseInt(vtId),data_abastecimento:dt,
      km_atual:parseInt(km),litros:parseFloat(lt),valor_total:parseFloat(vl),
      tipo_combustivel:selComb,
      posto:document.getElementById('ab-posto').value||null
    }).then(function(r){
      document.body.removeChild(sheet);
      var ab=r.data;
      var msg='Abastecimento registrado!';
      if(ab.consumo_medio)msg+=' Consumo: '+ab.consumo_medio.toFixed(2)+' km/L';
      toast(msg);
      STATE.homeLoaded=false;loadFrotaData();
    }).catch(function(e){
      toast(e.message,'er');
      if(btn){btn.disabled=false;btn.textContent='Confirmar Abastecimento';}
    });
  };
}

// ════════════════════════════════════════════════════════════
// ESCALA
// ════════════════════════════════════════════════════════════
function renderEscala(){
  if(!STATE.escalaMes)STATE.escalaMes=curMesAno();
  var parts=STATE.escalaMes.split('-');var ano=parseInt(parts[0]);var mes=parseInt(parts[1])-1;
  var hoje=new Date().toISOString().split('T')[0];
  // Build day map from escalaData
  var dayMap={};
  STATE.escalaData.forEach(function(d){
    var src=d.agente_dias&&d.agente_dias.length?d.agente_dias:d.dias;
    src.forEach(function(dia){if(dia.tipo_dia)dayMap[dia.data]=dia.tipo_dia;});
  });

  var mesStr=MESES_NM[mes]+' '+ano;
  var totalDias=new Date(ano,mes+1,0).getDate();
  var primDia=new Date(ano,mes,1).getDay();
  // Prev / next month
  var prevDate=new Date(ano,mes-1,1);var prevMes=prevDate.getFullYear()+'-'+String(prevDate.getMonth()+1).padStart(2,'0');
  var nextDate=new Date(ano,mes+1,1);var nextMes=nextDate.getFullYear()+'-'+String(nextDate.getMonth()+1).padStart(2,'0');

  var html='<div class="cal-wrap">'+
    '<div class="cal-header">'+
      '<button class="cal-nav-btn" id="cal-prev">‹</button>'+
      '<div class="cal-title">'+mesStr+'</div>'+
      '<button class="cal-nav-btn" id="cal-next">›</button>'+
    '</div>'+
    '<div class="cal-grid">'+
    ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].map(function(d){return '<div class="cal-dow">'+d+'</div>';}).join('');

  // Empty cells before day 1
  for(var i=0;i<primDia;i++)html+='<div class="cal-day"></div>';

  for(var d=1;d<=totalDias;d++){
    var dateStr=ano+'-'+String(mes+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');
    var tipo=dayMap[dateStr]||'';
    var isToday=dateStr===hoje;
    var cls='cal-day'+(tipo?' '+tipo:' workday-none')+(isToday?' today-ring':'');
    if(!tipo)cls='cal-day'+(isToday?' today-ring':'');
    var tag=tipo?'<div class="cal-day-tag">'+(TIPO_LABEL[tipo]||tipo).substring(0,3).toUpperCase()+'</div>':'';
    html+='<div class="'+cls+'"><div class="cal-day-num">'+d+'</div>'+tag+'</div>';
  }

  html+='</div>'; // cal-grid

  // Legenda
  html+='<div class="cal-legend">'+
    '<div class="cal-leg-item"><div class="cal-leg-dot" style="background:#dbeafe"></div>Diurno</div>'+
    '<div class="cal-leg-item"><div class="cal-leg-dot" style="background:#1e3a5f"></div>Noturno</div>'+
    '<div class="cal-leg-item"><div class="cal-leg-dot" style="background:#fed7aa"></div>Especial</div>'+
  '</div>';

  // Resumo do mês
  var ndias=Object.values(dayMap).filter(function(v,_,arr){return arr;}).length;
  var cnt={};Object.values(dayMap).forEach(function(t){cnt[t]=(cnt[t]||0)+1;});
  if(ndias>0){
    html+='<div style="margin-top:14px;background:#f8fafc;border-radius:12px;padding:12px">';
    html+='<div style="font-size:11px;font-weight:700;color:var(--gray);margin-bottom:8px;text-transform:uppercase;letter-spacing:.4px">Resumo do Mês</div>';
    html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">';
    Object.keys(cnt).forEach(function(t){
      html+='<div style="font-size:13px;color:#374151"><span style="font-weight:700">'+cnt[t]+'x</span> '+(TIPO_LABEL[t]||t)+'</div>';
    });
    html+='</div></div>';
  }

  if(!STATE.escalaData.length){
    html+='<div class="empty" style="padding:32px 0"><div class="empty-ico">📅</div><div class="empty-text">Nenhuma escala encontrada<br/>para este mês.</div></div>';
  }

  html+='</div>'; // cal-wrap
  return html;
}

function bindEscala(){
  bindNav();
  document.getElementById('hdr-avatar').onclick=function(){navigate('perfil');};
  var prev=document.getElementById('cal-prev');
  var next=document.getElementById('cal-next');
  if(prev)prev.onclick=function(){
    var p=STATE.escalaMes.split('-');var d=new Date(parseInt(p[0]),parseInt(p[1])-2,1);
    STATE.escalaMes=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');
    loadEscalaMes();
  };
  if(next)next.onclick=function(){
    var p=STATE.escalaMes.split('-');var d=new Date(parseInt(p[0]),parseInt(p[1]),1);
    STATE.escalaMes=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');
    loadEscalaMes();
  };
}

function loadEscalaMes(){
  var mc=document.getElementById('main-content');if(mc)mc.innerHTML='<div class="spinner"></div>';
  api('GET','/api/escalas/minha?mes_ano='+STATE.escalaMes)
    .then(function(r){STATE.escalaData=r.data||[];if(mc)mc.innerHTML=renderEscala();bindEscala();})
    .catch(function(e){toast(e.message,'er');});
}

// ════════════════════════════════════════════════════════════
// AGENDA (férias + audiências)
// ════════════════════════════════════════════════════════════
function renderAgenda(){
  var tab=STATE.agendaTab||'ferias';
  var pendPerm=(STATE.permutasData||[]).filter(function(p){return p.status==='pendente_cedente'&&p.agente_cedente_id===STATE.agente.id;}).length;
  var bhSaldo=STATE.bhSaldo||0;var bhCor=bhSaldo>0?'var(--green)':bhSaldo<0?'var(--red)':'inherit';
  var tabsHtml='<div class="agenda-tabs">'+
    '<button class="agenda-tab'+(tab==='ferias'?' active':'')+'" data-tab="ferias">🏖️ Férias</button>'+
    '<button class="agenda-tab'+(tab==='audiencias'?' active':'')+'" data-tab="audiencias">⚖️ Audiências</button>'+
    '<button class="agenda-tab'+(tab==='permutas'?' active':'')+'" data-tab="permutas" style="position:relative">🔄 Permutas'+(pendPerm>0?'<span style="position:absolute;top:5px;right:4px;width:7px;height:7px;border-radius:50%;background:var(--red)"></span>':'')+'</button>'+
    '<button class="agenda-tab'+(tab==='banco_horas'?' active':'')+'" data-tab="banco_horas">⏱️ <span style="color:'+bhCor+'">'+bhSaldo+'h</span></button>'+
  '</div>';
  var content=tab==='ferias'?renderFeriasLista():tab==='audiencias'?renderAudienciasLista():tab==='permutas'?renderPermutasLista():renderBancoHorasLista();
  return tabsHtml+'<div id="agenda-body">'+content+'</div>';
}

function renderFeriasLista(){
  var list=STATE.feriasData;
  if(!list||!list.length)return '<div class="empty"><div class="empty-ico">🏖️</div><div class="empty-text">Nenhuma férias<br/>cadastrada.</div></div>';
  var hoje=new Date().toISOString().split('T')[0];
  return '<div class="card" style="margin-top:8px">'+list.map(function(f){
    var st=f.status_tramitacao||'Pendente';
    var badgeCls=st==='Aprovado'?'badge-green':st==='Negado'?'badge-red':'badge-yellow';
    var periodo=f.data_inicio&&f.data_fim?(fmtDt(f.data_inicio)+' → '+fmtDt(f.data_fim)):'Datas não definidas';
    var isFut=f.data_inicio&&f.data_inicio>=hoje;
    var isAtivo=f.data_inicio&&f.data_fim&&f.data_inicio<=hoje&&f.data_fim>=hoje;
    return '<div class="list-item">'+
      '<div class="list-item-header">'+
        '<div class="list-item-title">'+periodo+'</div>'+
        '<span class="badge '+badgeCls+'">'+esc(st)+'</span>'+
      '</div>'+
      '<div class="list-item-sub">'+(f.qtd_dias?f.qtd_dias+'d':'--')+
        (f.exercicio?' · Exercício '+f.exercicio:'')+
        (isAtivo?' · <strong style="color:var(--green)">Em curso</strong>':'')+
        (isFut?' · Futura':'')+'</div>'+
      (f.setor_programacao?'<div class="list-item-sub">Setor: '+esc(f.setor_programacao)+'</div>':'')+
    '</div>';
  }).join('')+'</div>';
}

function renderAudienciasLista(){
  var list=STATE.audienciasData;
  if(!list||!list.length)return '<div class="empty"><div class="empty-ico">⚖️</div><div class="empty-text">Nenhuma audiência<br/>registrada.</div></div>';
  var hoje=new Date().toISOString().split('T')[0];
  return '<div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:10px 14px;margin:8px 0;font-size:12px;color:#92400e">'+
    '⚖️ <b>Status das audiências:</b> <b>Pendente</b> = aguardando a data · <b>Realizada</b> = data já passou · <b>Dispensado</b> = admin registrou dispensa'+
  '</div>'+
  '<div class="card" style="margin-top:4px">'+list.map(function(a){
    var past=a.data_audiencia<hoje;
    var dispensa=!!a.data_dispensa;
    var badgeCls=dispensa?'badge-green':past?'badge-gray':'badge-yellow';
    var badgeLabel=dispensa?'Dispensado':past?'Realizada':'Pendente';
    return '<div class="list-item">'+
      '<div class="list-item-header">'+
        '<div class="list-item-title">'+fmtDt(a.data_audiencia)+(a.horario?' às '+a.horario:'')+'</div>'+
        '<span class="badge '+badgeCls+'">'+badgeLabel+'</span>'+
      '</div>'+
      '<div class="list-item-sub">Proc: '+esc(a.numero_processo||'--')+(a.local_audiencia?' · '+esc(a.local_audiencia):'')+'</div>'+
      (a.dispensa?'<div class="list-item-sub" style="color:#16a34a;margin-top:2px">✓ Dispensa: '+fmtDt(a.data_dispensa)+'</div>':'')+
      (a.observacoes?'<div class="list-item-sub" style="margin-top:2px">'+esc(a.observacoes)+'</div>':'')+
    '</div>';
  }).join('')+'</div>';
}

function renderBancoHorasLista(){
  var list=STATE.bhData||[];
  var saldo=STATE.bhSaldo||0;
  var totalC=list.filter(function(m){return m.tipo==='entrada';}).reduce(function(a,m){return a+Number(m.quantidade_horas);},0);
  var totalD=list.filter(function(m){return m.tipo!=='entrada';}).reduce(function(a,m){return a+Number(m.quantidade_horas);},0);
  var totalAbs=totalC+totalD||1;
  var pctC=Math.round(totalC/totalAbs*100);
  var pctD=100-pctC;
  var corSaldo=saldo>0?'#4ade80':saldo<0?'#f87171':'rgba(255,255,255,.9)';
  var labelSaldo=saldo>0?'Crédito disponível':saldo<0?'Horas a compensar':'Saldo zerado';
  var html='';
  // Hero card
  html+='<div class="bh-hero">';
  html+='<div class="bh-hero-label">Banco de Horas</div>';
  html+='<div class="bh-hero-val" style="color:'+corSaldo+'">'+(saldo>0?'+':'')+saldo+'h</div>';
  html+='<div class="bh-hero-sub">'+labelSaldo+'</div>';
  if(totalC||totalD){
    html+='<div class="bh-bar-wrap">';
    html+='<div class="bh-bar-c" style="width:'+pctC+'%"></div>';
    html+='<div class="bh-bar-d" style="width:'+pctD+'%"></div>';
    html+='</div>';
    html+='<div style="display:flex;justify-content:space-between;margin-top:6px;font-size:10px;opacity:.65">';
    html+='<span>● Créditos '+pctC+'%</span><span>● Débitos '+pctD+'%</span>';
    html+='</div>';
  }
  html+='</div>';
  // Stats row
  html+='<div class="bh-stats-row">';
  html+='<div class="bh-stat-box"><div class="bh-stat-val" style="color:var(--green)">+'+totalC+'h</div><div class="bh-stat-lbl">Créditos</div></div>';
  html+='<div class="bh-stat-box"><div class="bh-stat-val" style="color:var(--red)">-'+totalD+'h</div><div class="bh-stat-lbl">Débitos</div></div>';
  html+='<div class="bh-stat-box"><div class="bh-stat-val">'+list.length+'</div><div class="bh-stat-lbl">Registros</div></div>';
  html+='</div>';
  if(!list.length){
    html+='<div class="empty"><div class="empty-ico">⏱️</div><div class="empty-text">Nenhum registro<br/>no banco de horas.</div></div>';
  } else {
    html+='<div class="section-title">Movimentações</div>';
    html+='<div class="card" style="margin:0 16px 24px">';
    list.forEach(function(m){
      var isC=m.tipo==='entrada';
      var cor=isC?'#16a34a':'#dc2626';
      var bgIco=isC?'#dcfce7':'#fee2e2';
      html+='<div class="bh-tx">';
      html+='<div class="bh-tx-stripe" style="background:'+cor+'"></div>';
      html+='<div class="bh-tx-ico" style="background:'+bgIco+'">'+(isC?'↑':'↓')+'</div>';
      html+='<div class="bh-tx-body">';
      html+='<div class="bh-tx-name">'+esc(m.motivo||'Movimentação')+'</div>';
      html+='<div class="bh-tx-meta">'+fmtDt(m.data_lancamento)+(m.numero_bu?' · BU '+esc(m.numero_bu):'')+(m.numero_ci?' · CI '+esc(m.numero_ci):'')+'</div>';
      html+='</div>';
      html+='<div class="bh-tx-amt" style="color:'+cor+'">'+(isC?'+':'-')+m.quantidade_horas+'h</div>';
      html+='</div>';
    });
    html+='</div>';
  }
  return html;
}

var PERM_TURNO_OPTS=[{v:'diurno',l:'Diurno'},{v:'noturno',l:'Noturno'},{v:'especial',l:'Especial'},{v:'diurno_esp',l:'Diurno+Especial'},{v:'noturno_esp',l:'Noturno+Especial'}];
var PERM_TURNO_LB={diurno:'Diurno',noturno:'Noturno',especial:'Especial',diurno_esp:'Diurno+Esp',noturno_esp:'Noturno+Esp'};
var PERM_STATUS_LB={pendente_cedente:'Ag. Cedente',pendente_admin:'Ag. Admin',aprovado:'Aprovado',reprovado:'Reprovado',recusado_cedente:'Recusado',cancelado:'Cancelado'};

function renderPermutasLista(){
  var list=STATE.permutasData||[];
  var agId=STATE.agente.id;
  var mesAtual=curMesAno();
  var MESES_NM2=['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  var mesLabel=MESES_NM2[parseInt(mesAtual.split('-')[1])-1]+'/'+mesAtual.split('-')[0];
  var inativosSt=['recusado_cedente','reprovado','cancelado'];
  // Contagem de permutas ativas no mês
  var ativas=list.filter(function(p){
    if(inativosSt.indexOf(p.status)>=0)return false;
    var isSol=p.agente_solicitante_id===agId;
    var isCed=p.agente_cedente_id===agId;
    if(isSol&&p.data_solicitante&&p.data_solicitante.substring(0,7)===mesAtual)return true;
    if(isCed&&p.data_cedente&&p.data_cedente.substring(0,7)===mesAtual)return true;
    return false;
  }).length;
  var LIMITE=2;
  var pctUsado=Math.min(100,Math.round(ativas/LIMITE*100));
  var corProg=ativas>=LIMITE?'var(--red)':ativas===1?'var(--amber)':'var(--green)';
  // Pendentes de resposta (eu sou cedente)
  var aguardando=list.filter(function(p){return p.agente_cedente_id===agId&&p.status==='pendente_cedente';});
  // Meus pedidos enviados em andamento
  var enviados=list.filter(function(p){return p.agente_solicitante_id===agId&&['pendente_cedente','pendente_admin'].indexOf(p.status)>=0;});
  // Stats gerais
  var aprovadas=list.filter(function(p){return p.status==='aprovado';}).length;
  var pendentes=list.filter(function(p){return ['pendente_cedente','pendente_admin'].indexOf(p.status)>=0;}).length;
  var html='';
  // ── Hero: gauge de limite mensal
  html+='<div class="perm-hero">';
  html+='<div class="perm-hero-title">Limite Mensal — '+mesLabel+'</div>';
  // Dots de limite
  html+='<div class="perm-dots-row">';
  for(var di=0;di<LIMITE;di++){
    var usado=di<ativas;
    html+='<div class="perm-dot '+(usado?'used':'empty')+'">'+(usado?di+1:'')+'</div>';
  }
  html+='</div>';
  // Barra de progresso
  html+='<div class="perm-prog"><div class="perm-prog-fill" style="width:'+pctUsado+'%;background:'+corProg+'"></div></div>';
  // Texto de status
  html+='<div style="display:flex;justify-content:space-between;align-items:center">';
  html+='<div style="font-size:13px;font-weight:700;color:'+corProg+'">'+ativas+' de '+LIMITE+' usadas</div>';
  if(ativas<LIMITE){
    html+='<button class="btn btn-primary btn-sm" id="btn-nova-perm" style="padding:8px 14px">+ Nova Permuta</button>';
  } else {
    html+='<span style="font-size:11px;font-weight:700;color:var(--red);background:#fee2e2;padding:4px 10px;border-radius:999px">Limite atingido</span>';
  }
  html+='</div></div>';
  // ── Stats tiles
  html+='<div class="perm-stats-row">';
  html+='<div class="perm-stat-box"><div class="perm-stat-val">'+list.length+'</div><div class="perm-stat-lbl">Total</div></div>';
  html+='<div class="perm-stat-box"><div class="perm-stat-val" style="color:var(--green)">'+aprovadas+'</div><div class="perm-stat-lbl">Aprovadas</div></div>';
  html+='<div class="perm-stat-box"><div class="perm-stat-val" style="color:var(--amber)">'+pendentes+'</div><div class="perm-stat-lbl">Pendentes</div></div>';
  html+='</div>';
  // ── Pedidos aguardando resposta (cards de ação)
  aguardando.forEach(function(p){
    html+='<div class="perm-action">';
    html+='<div class="perm-action-badge">⚡ Aguarda sua resposta</div>';
    html+='<div class="perm-action-names">'+esc(p.solicitante_qra||p.solicitante_nome||'')+'</div>';
    html+='<div class="perm-action-detail">';
    html+='<b>Te dá:</b> '+esc(PERM_TURNO_LB[p.turno_solicitante]||'')+' em '+fmtDt(p.data_solicitante)+'<br>';
    html+='<b>Quer seu:</b> '+esc(PERM_TURNO_LB[p.turno_cedente]||'')+' em '+fmtDt(p.data_cedente);
    if(p.motivo)html+='<br><i style="color:#92400e">Motivo: '+esc(p.motivo)+'</i>';
    html+='</div>';
    html+='<div class="perm-action-btns">';
    html+='<button class="btn btn-success perm-aceitar" data-id="'+p.id+'" style="flex:1;padding:12px">✓ Aceitar</button>';
    html+='<button class="btn btn-danger perm-recusar" data-id="'+p.id+'" style="flex:1;padding:12px">✗ Recusar</button>';
    html+='</div></div>';
  });
  // ── Meus pedidos em andamento
  if(enviados.length){
    html+='<div class="section-title">Meus pedidos em andamento</div>';
    html+='<div class="perm-hist">';
    enviados.forEach(function(p){
      var isPendCed=p.status==='pendente_cedente';
      var bgIco=isPendCed?'#fef9c3':'#dbeafe';
      html+='<div class="perm-hist-row">';
      html+='<div class="perm-hist-ico" style="background:'+bgIco+'">'+(isPendCed?'⏳':'📋')+'</div>';
      html+='<div class="perm-hist-body">';
      html+='<div class="perm-hist-name">'+esc(p.cedente_qra||p.cedente_nome||'')+'</div>';
      html+='<div class="perm-hist-sub">'+esc(PERM_TURNO_LB[p.turno_solicitante]||'')+' '+fmtDt(p.data_solicitante)+' ↔ '+esc(PERM_TURNO_LB[p.turno_cedente]||'')+' '+fmtDt(p.data_cedente)+'</div>';
      html+='</div>';
      html+='<div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px">';
      html+='<span class="badge '+(isPendCed?'badge-yellow':'badge-blue')+'">'+esc(PERM_STATUS_LB[p.status]||'')+'</span>';
      html+='<button class="btn-sm perm-cancelar" data-id="'+p.id+'" style="background:none;border:none;color:var(--red);font-size:11px;font-weight:600;cursor:pointer;padding:0">Cancelar</button>';
      html+='</div></div>';
    });
    html+='</div>';
  }
  // ── Histórico
  var historico=list.filter(function(p){
    if(p.agente_solicitante_id===agId&&['pendente_cedente','pendente_admin'].indexOf(p.status)>=0)return false;
    if(p.agente_cedente_id===agId&&p.status==='pendente_cedente')return false;
    return true;
  });
  if(historico.length){
    html+='<div class="section-title">Histórico</div>';
    html+='<div class="perm-hist">';
    historico.forEach(function(p){
      var isSol=p.agente_solicitante_id===agId;
      var outro=isSol?(p.cedente_qra||p.cedente_nome):(p.solicitante_qra||p.solicitante_nome);
      var stMap={aprovado:{ico:'✅',bg:'#dcfce7',badge:'badge-green'},reprovado:{ico:'❌',bg:'#fee2e2',badge:'badge-red'},recusado_cedente:{ico:'🚫',bg:'#fee2e2',badge:'badge-red'},cancelado:{ico:'↩️',bg:'#f3f4f6',badge:'badge-gray'}};
      var st=stMap[p.status]||{ico:'🔄',bg:'#f3f4f6',badge:'badge-gray'};
      html+='<div class="perm-hist-row">';
      html+='<div class="perm-hist-ico" style="background:'+st.bg+'">'+st.ico+'</div>';
      html+='<div class="perm-hist-body">';
      html+='<div class="perm-hist-name">'+esc(outro||'')+'</div>';
      html+='<div class="perm-hist-sub">'+(isSol?'Cedei ':'Recebi ')+esc(PERM_TURNO_LB[isSol?p.turno_solicitante:p.turno_cedente]||'')+' '+fmtDt(isSol?p.data_solicitante:p.data_cedente)+'</div>';
      html+='</div>';
      html+='<span class="badge '+st.badge+'">'+esc(PERM_STATUS_LB[p.status]||'')+'</span>';
      html+='</div>';
    });
    html+='</div>';
  }
  if(!list.length){
    html+='<div class="empty" style="padding-top:16px"><div class="empty-ico">🔄</div><div class="empty-text">Nenhuma permuta.<br/>Use o botão para solicitar.</div></div>';
  }
  html+='<div style="height:20px"></div>';
  return html;
}

function bindPermutasList(){
  var btnNova=document.getElementById('btn-nova-perm');
  if(btnNova)btnNova.onclick=showNovaPermuta;
  document.querySelectorAll('.perm-aceitar').forEach(function(btn){
    btn.onclick=function(){
      var id=this.dataset.id;
      if(!confirm('Aceitar esta permuta? Ela sera encaminhada ao administrador.'))return;
      api('PUT','/api/mobile/permutas/'+id+'/responder',{acao:'aceitar'}).then(function(r){
        toast(r.message||'Permuta aceita!');loadPermutasData();
      }).catch(function(e){toast(e.message,'er');});
    };
  });
  document.querySelectorAll('.perm-recusar').forEach(function(btn){
    btn.onclick=function(){
      var id=this.dataset.id;
      var motivo=prompt('Motivo da recusa (opcional):','');
      if(motivo===null)return;
      api('PUT','/api/mobile/permutas/'+id+'/responder',{acao:'recusar',obs:motivo}).then(function(r){
        toast(r.message||'Recusado.');loadPermutasData();
      }).catch(function(e){toast(e.message,'er');});
    };
  });
  document.querySelectorAll('.perm-cancelar').forEach(function(btn){
    btn.onclick=function(){
      var id=this.dataset.id;
      if(!confirm('Cancelar este pedido?'))return;
      api('PUT','/api/mobile/permutas/'+id+'/cancelar',{}).then(function(r){
        toast(r.message||'Cancelado.');loadPermutasData();
      }).catch(function(e){toast(e.message,'er');});
    };
  });
}

function loadPermutasData(){
  var body=document.getElementById('agenda-body');
  if(body)body.innerHTML='<div class="spinner"></div>';
  Promise.all([
    api('GET','/api/mobile/permutas').catch(function(){return {data:[]};})
  ]).then(function(rs){
    STATE.permutasData=rs[0].data||[];
    if(body)body.innerHTML=renderPermutasLista();
    bindPermutasList();
  }).catch(function(){});
}

function showNovaPermuta(){
  function _open(){
    var ags=STATE.mobileAgentes.filter(function(a){return a.id!==STATE.agente.id;});
    var agOpts=ags.map(function(a){return '<option value="'+a.id+'">'+(a.qra||a.nome)+' ('+esc(a.funcional)+')</option>';}).join('');
    var turnoOpts=PERM_TURNO_OPTS.map(function(t){return '<option value="'+t.v+'">'+t.l+'</option>';}).join('');
  var sheet=document.createElement('div');
  sheet.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:50;display:flex;align-items:flex-end;justify-content:center';
  sheet.innerHTML='<div style="background:#fff;border-radius:22px 22px 0 0;padding:22px;width:100%;max-width:480px;padding-bottom:calc(22px + env(safe-area-inset-bottom));max-height:90vh;overflow-y:auto">'+
    '<div style="width:36px;height:4px;background:#e5e7eb;border-radius:999px;margin:0 auto 16px"></div>'+
    '<div style="font-size:18px;font-weight:700;margin-bottom:4px">Solicitar Permuta</div>'+
    '<div style="font-size:12px;color:var(--gray);margin-bottom:18px">Limite: 2 permutas por mês</div>'+
    '<div class="form-group"><label class="form-label">Agente cedente</label>'+
    '<input type="text" id="np-ced-txt" class="form-input" placeholder="Buscar por nome, QRA ou funcional..." autocomplete="off" style="margin-bottom:4px"/>'+
    '<div id="np-ced-drop" style="display:none;background:#fff;border:1px solid #d1d5db;border-radius:10px;max-height:200px;overflow-y:auto;margin-bottom:8px;box-shadow:0 4px 12px rgba(0,0,0,.1)"></div>'+
    '<input type="hidden" id="np-ced"/></div>'+
    '<div style="background:var(--light);border-radius:12px;padding:12px 14px;margin-bottom:14px">'+
    '<div style="font-size:11px;font-weight:700;color:var(--navy);margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px">Meu turno que vou CEDER</div>'+
    '<div class="form-group"><label class="form-label">Data</label><input class="form-input" id="np-ds" type="date"/></div>'+
    '<div class="form-group"><label class="form-label">Turno</label><select class="form-select" id="np-ts"><option value="">Selecione...</option>'+turnoOpts+'</select></div>'+
    '</div>'+
    '<div style="background:var(--light);border-radius:12px;padding:12px 14px;margin-bottom:14px">'+
    '<div style="font-size:11px;font-weight:700;color:var(--navy);margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px">Turno do cedente que vou RECEBER</div>'+
    '<div class="form-group"><label class="form-label">Data</label><input class="form-input" id="np-dc" type="date"/></div>'+
    '<div class="form-group"><label class="form-label">Turno</label><select class="form-select" id="np-tc"><option value="">Selecione...</option>'+turnoOpts+'</select></div>'+
    '</div>'+
    '<div class="form-group"><label class="form-label">Motivo (opcional)</label><textarea class="form-input" id="np-mot" rows="2" style="resize:none;height:64px" placeholder="Descreva o motivo..."></textarea></div>'+
    '<button class="btn btn-primary" id="np-ok">Enviar pedido</button>'+
    '<button class="btn btn-outline" id="np-cancel" style="margin-top:10px">Cancelar</button>'+
  '</div>';
  document.body.appendChild(sheet);
    // Buscador de agente cedente
    (function(){
      var txt=document.getElementById('np-ced-txt'),drop=document.getElementById('np-ced-drop'),hid=document.getElementById('np-ced');
      function render(list){
        drop.innerHTML=list.length?list.map(function(a){
          var lbl=(a.qra||'--')+' - '+a.nome+' ['+a.funcional+']';
          return '<div style="padding:10px 14px;cursor:pointer;border-bottom:1px solid #f3f4f6;font-size:13px" data-id="'+a.id+'" data-lbl="'+lbl.replace(/"/g,'&quot;')+'">'
            +'<b style="color:#1A3A5C">'+(a.qra||'--')+'</b> '+a.nome+' <span style="color:#9ca3af;font-size:11px">['+a.funcional+']</span></div>';
        }).join(''):'<div style="padding:10px;color:#9ca3af;font-size:12px;text-align:center">Nenhum resultado</div>';
        drop.style.display='block';
        drop.querySelectorAll('[data-id]').forEach(function(el){
          el.ontouchstart=el.onmousedown=function(e){e.preventDefault();hid.value=el.dataset.id;txt.value=el.dataset.lbl;drop.style.display='none';};
        });
      }
      txt.oninput=function(){hid.value='';var q=txt.value.toLowerCase().trim();if(!q){drop.style.display='none';return;}render(ags.filter(function(a){return(a.nome||'').toLowerCase().indexOf(q)>=0||(a.qra||'').toLowerCase().indexOf(q)>=0||(a.funcional||'').toLowerCase().indexOf(q)>=0;}).slice(0,20));};
      txt.onblur=function(){setTimeout(function(){drop.style.display='none';},200);};
    })();
    document.getElementById('np-cancel').onclick=function(){document.body.removeChild(sheet);};
    document.getElementById('np-ok').onclick=function(){
      var ced=document.getElementById('np-ced').value;
      var ds=document.getElementById('np-ds').value;
      var ts=document.getElementById('np-ts').value;
      var dc=document.getElementById('np-dc').value;
      var tc=document.getElementById('np-tc').value;
      var mot=document.getElementById('np-mot').value;
      if(!ced)return toast('Selecione o agente cedente','er');
      if(!ds||!ts)return toast('Informe a data e turno do seu plantao','er');
      if(!dc||!tc)return toast('Informe a data e turno do cedente','er');
      var okBtn=document.getElementById('np-ok');if(okBtn){okBtn.disabled=true;okBtn.textContent='Enviando...';}
      api('POST','/api/mobile/permutas',{agente_cedente_id:parseInt(ced),data_solicitante:ds,turno_solicitante:ts,data_cedente:dc,turno_cedente:tc,motivo:mot||''})
        .then(function(r){toast(r.message||'Pedido enviado!');document.body.removeChild(sheet);loadPermutasData();})
        .catch(function(e){toast(e.message,'er');if(okBtn){okBtn.disabled=false;okBtn.textContent='Enviar pedido';}});
    };
  }
  // Carrega agentes se ainda não carregados
  if(STATE.mobileAgentes.length){
    _open();
  } else {
    toast('Carregando agentes...','ok');
    api('GET','/api/agentes?ativo=true')
      .then(function(r){STATE.mobileAgentes=r.data||[];_open();})
      .catch(function(){toast('Erro ao carregar agentes','er');});
  }
}

function renderAgendaBody(tab){
  if(tab==='ferias')return renderFeriasLista();
  if(tab==='audiencias')return renderAudienciasLista();
  if(tab==='permutas')return renderPermutasLista();
  if(tab==='banco_horas')return renderBancoHorasLista();
  return renderFeriasLista();
}

function bindAgenda(){
  bindNav();
  document.getElementById('hdr-avatar').onclick=function(){navigate('perfil');};
  document.querySelectorAll('.agenda-tab[data-tab]').forEach(function(btn){
    btn.onclick=function(){
      STATE.agendaTab=this.dataset.tab;
      var body=document.getElementById('agenda-body');
      if(body)body.innerHTML=renderAgendaBody(STATE.agendaTab);
      document.querySelectorAll('.agenda-tab').forEach(function(b){b.classList.remove('active');});
      this.classList.add('active');
      if(STATE.agendaTab==='permutas')bindPermutasList();
    };
  });
  if(STATE.agendaTab==='permutas')bindPermutasList();
  if(!STATE.homeLoaded)loadAgendaData();
}

function loadAgendaData(){
  Promise.all([
    api('GET','/api/mobile/minhas-ferias').catch(function(){return {data:[]};}),
    api('GET','/api/mobile/minhas-audiencias').catch(function(){return {data:[]};}),
    api('GET','/api/mobile/permutas').catch(function(){return {data:[]};})  ,
    api('GET','/api/mobile/meu-banco-horas').catch(function(){return {data:[],saldo:0};})
  ]).then(function(rs){
    STATE.feriasData=rs[0].data||[];
    STATE.audienciasData=rs[1].data||[];
    STATE.permutasData=rs[2].data||[];
    STATE.bhData=rs[3].data||[];STATE.bhSaldo=rs[3].saldo||0;
    var body=document.getElementById('agenda-body');
    if(body)body.innerHTML=renderAgendaBody(STATE.agendaTab||'ferias');
    if(STATE.agendaTab==='permutas')bindPermutasList();
  }).catch(function(){});
  if(!STATE.mobileAgentes.length){
    api('GET','/api/agentes?ativo=true').then(function(r){STATE.mobileAgentes=r.data||[];}).catch(function(){});
  }
}

// ════════════════════════════════════════════════════════════
// PERFIL
// ════════════════════════════════════════════════════════════
function renderPerfil(){
  var ag=STATE.agente;
  var mats=STATE.materiaisData||[];
  var html='<div class="profile-header">'+
    '<div class="profile-avatar">'+ag.nome.charAt(0)+'</div>'+
    '<div class="profile-name">'+esc(ag.nome)+'</div>'+
    '<div class="profile-info">'+(ag.qra?esc(ag.qra)+' · ':'')+esc(ag.setor||'')+'</div>'+
  '</div>'+
  '<div class="card" style="margin-top:0;border-radius:0">'+
    '<div class="profile-item"><div class="profile-item-ico">🪪</div><div><div class="profile-item-label">Funcional</div><div class="profile-item-value">'+esc(ag.funcional)+'</div></div></div>'+
    '<div class="profile-item"><div class="profile-item-ico">📻</div><div><div class="profile-item-label">QRA</div><div class="profile-item-value">'+(ag.qra?esc(ag.qra):'--')+'</div></div></div>'+
    '<div class="profile-item"><div class="profile-item-ico">🏢</div><div><div class="profile-item-label">Setor</div><div class="profile-item-value">'+esc(ag.setor||'--')+'</div></div></div>'+
    (ag.letra?'<div class="profile-item"><div class="profile-item-ico">🔤</div><div><div class="profile-item-label">Equipe</div><div class="profile-item-value">Equipe '+esc(ag.letra)+'</div></div></div>':'')+
  '</div>';

  // Materiais cautelados
  var arms=mats.filter(function(m){return m.origem==='armamento';});
  var almox=mats.filter(function(m){return m.origem!=='armamento';});
  html+='<div class="section-title">Itens Cautelados ('+mats.length+')</div>';
  if(mats.length){
    html+='<div class="card">';
    // Armamentos primeiro
    arms.forEach(function(m){
      html+='<div class="profile-item">'+
        '<div class="profile-item-ico">🔫</div>'+
        '<div>'+
          '<div class="profile-item-label" style="color:var(--navy);font-weight:700">Armamento</div>'+
          '<div class="profile-item-value">'+esc(m.nome.trim())+'</div>'+
          (m.numero_serie?'<div class="profile-item-label" style="margin-top:1px">Nº Série: '+esc(m.numero_serie)+'</div>':'')+
          (m.calibre?'<div class="profile-item-label" style="margin-top:1px">Calibre: '+esc(m.calibre)+'</div>':'')+
        '</div></div>';
    });
    // Almoxarifado depois
    almox.forEach(function(m){
      html+='<div class="profile-item">'+
        '<div class="profile-item-ico">🎒</div>'+
        '<div>'+
          '<div class="profile-item-label">Almoxarifado</div>'+
          '<div class="profile-item-value">'+esc(m.nome)+'</div>'+
          (m.numero_serie?'<div class="profile-item-label" style="margin-top:1px">Patrimônio: '+esc(m.numero_serie)+'</div>':'')+
          (m.setor_atual?'<div class="profile-item-label" style="margin-top:1px">Setor: '+esc(m.setor_atual)+'</div>':'')+
        '</div></div>';
    });
    html+='</div>';
  } else {
    html+='<div class="card"><div style="padding:18px 16px;text-align:center;font-size:13px;color:var(--gray)">Nenhum item cautelado.</div></div>';
  }

  html+='<div style="padding:16px">'+
    '<button class="btn btn-outline" id="btn-logout" style="color:var(--red);border-color:var(--red)">Sair do aplicativo</button>'+
  '</div>';
  return html;
}

function bindPerfil(){
  bindNav();
  var lb=document.getElementById('btn-logout');
  if(lb)lb.onclick=function(){if(confirm('Deseja sair?'))logout();};
  if(!STATE.homeLoaded)loadPerfilData();
}

function loadPerfilData(){
  api('GET','/api/mobile/meus-materiais').catch(function(){return {data:[]};})
    .then(function(r){
      STATE.materiaisData=r.data||[];
      if(STATE.page==='perfil')render();
    });
}

// ── NAV
function bindNav(){
  document.querySelectorAll('.nav-btn[data-page]').forEach(function(btn){
    btn.onclick=function(){
      var p=this.dataset.page;
      if(p==='frota'){STATE.step=1;navigate(p);return;}
      navigate(p);
    };
  });
}

// ── LOGIN
function renderLogin(){
  return '<div class="login-wrap">'+
    '<div class="login-logo"><svg width="44" height="44" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg></div>'+
    '<div class="login-title">GCM Serra</div>'+
    '<div class="login-sub">Portal do Agente</div>'+
    '<div class="login-box">'+
      '<label class="login-field-label">Funcional</label>'+
      '<input class="login-input" id="l-func" type="text" inputmode="numeric" placeholder="Ex: 1042" autocomplete="username"/>'+
      '<label class="login-field-label">Senha</label>'+
      '<input class="login-input" id="l-senha" type="password" autocomplete="current-password" placeholder="••••••••"/>'+
      '<button class="login-btn" id="l-btn">Entrar</button>'+
    '</div>'+
    '<div class="login-hint">Mesmo login do sistema principal</div>'+
  '</div>';
}

function bindLogin(){
  var btn=document.getElementById('l-btn');
  var doLogin=function(){
    var f=document.getElementById('l-func').value.trim();
    var s=document.getElementById('l-senha').value;
    if(!f||!s){toast('Preencha funcional e senha','er');return;}
    btn.textContent='Entrando...';btn.disabled=true;
    api('POST','/api/auth/login',{funcional:f,senha:s}).then(function(d){
      STATE.token=d.token;STATE.agente=d.agente;
      localStorage.setItem('mb_token',d.token);
      localStorage.setItem('mb_agente',JSON.stringify(d.agente));
      STATE.homeLoaded=false;
      navigate('home');
    }).catch(function(e){toast(e.message,'er');btn.textContent='Entrar';btn.disabled=false;});
  };
  btn.onclick=doLogin;
  document.getElementById('l-senha').onkeydown=function(e){if(e.keyCode===13)doLogin();};
}

// ── INIT
if(STATE.token&&STATE.agente){navigate('home');}else{navigate('login');}
</script>
</body>
</html>`;

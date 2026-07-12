/* ============================================================================
   CX INTERACTIVE HUB — engine (single identity gate + brand routing).
   Reads window.CXHUB_CONFIG (config.js). Edit config.js, not this file.

   FLOW:  identity gate (name · employee ID · brand)  ->  the division journey
          that the chosen brand belongs to.  General games are shown to everyone.
   Identity is captured ONCE here; games only read it (see cxhub-sync.js).
   SSO-READY: resolveIdentity() already tries Azure Static Web Apps /.auth/me,
   so migrating to Entra later = adjust the claim mapping in ONE place.
   ============================================================================ */
(function(){
const C=window.CXHUB_CONFIG, WORLDS=C.WORLDS, GENERAL=C.GENERAL, BRANDS=C.BRANDS, ICONS=C.ICONS;

/* brand -> division (built from the rosters in config.js) */
const BRAND2DIV={}; Object.keys(BRANDS).forEach(function(div){ BRANDS[div].forEach(function(b){ BRAND2DIV[b]=div; }); });
const DIV_LABEL={ retail:{en:"Retail",ar:"التجزئة"}, hospitality:{en:"Hospitality",ar:"الضيافة"}, starbucks:{en:"Starbucks",ar:"ستاربكس"} };

const STR={
 en:{brand:"CX Interactive Hub", f_dev:"Developed by the Customer Experience team", f_q:"Any queries?", f_contact:"contact here",
   gateEyebrow:"Customer Experience Learning", gateTitle:"Welcome — let's get you set up",
   gateSub:"Enter your details once. Your brand takes you straight to your journey.",
   fName:"Full name", fEid:"Employee ID", fBrand:"Your brand", fMarket:"Your market", choose:"Choose your brand…", chooseMarket:"Choose your market…", enter:"Enter my journey",
   ssoNote:"Signed in with your store — just add your name and ID.",
   worldsH:"Your journey", generalTag:"For everyone", generalH:"Customer Experience — General",
   levels:function(n){return n+" levels";}, cleared:function(a,b){return a+" / "+b+" cleared";},
   live:"Live", soon:"Coming soon", done:"Completed",
   start:"Start level", replay:"Replay level", comingSoon:"Coming soon",
   whatLearn:"What you'll learn", challenge:"Challenge preview", scenario:"Scenario", quiz:"Quiz", action:"Action",
   yourBest:"Your best", playingAs:"Playing as", start2:"START", finish:"FINISH", lvl:"Level", edit:"Edit details",
   journeyProgress:"Journey progress", toNext:function(n,nm){return "+"+n+"% to "+nm;}, topRank:"Top rank reached 🎉", yourRank:"Your rank",
   learnTitle:"Want to go deeper?", learnSub:function(nm){return "Explore "+nm+" on the CX Hub";},
   downloadCert:"Download your certificate", certLocked:"Finish all levels to unlock your certificate 🎓",
   welcomeBack:"Welcome back", wbLevels:"Levels done", wbProgress:"Progress", wbStars:"Stars earned", wbContinue:"Continue my journey",
   certRewardTitle:"Your certificate awaits", certRewardSub:function(n){return n<=0?"You're one step away!":"Finish "+n+" more "+(n===1?"level":"levels")+" to unlock";}},
 ar:{brand:"مركز تجربة العملاء التفاعلي", f_dev:"تم التطوير بواسطة فريق تجربة العملاء", f_q:"أي استفسارات؟", f_contact:"تواصل هنا",
   gateEyebrow:"تعلّم تجربة العملاء", gateTitle:"مرحبًا — لنجهّز حسابك",
   gateSub:"أدخل بياناتك مرة واحدة. علامتك التجارية تنقلك مباشرة إلى رحلتك.",
   fName:"الاسم الكامل", fEid:"الرقم الوظيفي", fBrand:"علامتك التجارية", fMarket:"سوقك", choose:"اختر علامتك…", chooseMarket:"اختر سوقك…", enter:"ادخل رحلتي",
   ssoNote:"تم تسجيل الدخول عبر متجرك — أضف اسمك ورقمك الوظيفي فقط.",
   worldsH:"رحلتك", generalTag:"للجميع", generalH:"تجربة العملاء — عام",
   levels:function(n){return n+" مستوى";}, cleared:function(a,b){return a+" / "+b+" مكتمل";},
   live:"مباشر", soon:"قريبًا", done:"مكتمل",
   start:"ابدأ المستوى", replay:"أعِد المستوى", comingSoon:"قريبًا",
   whatLearn:"ماذا ستتعلّم", challenge:"معاينة التحدي", scenario:"سيناريو", quiz:"اختبار", action:"تطبيق",
   yourBest:"أفضل نتيجة", playingAs:"تلعب كـ", start2:"البداية", finish:"النهاية", lvl:"المستوى", edit:"تعديل بياناتي",
   journeyProgress:"تقدّم الرحلة", toNext:function(n,nm){return "+"+n+"% إلى "+nm;}, topRank:"وصلت لأعلى رتبة 🎉", yourRank:"رتبتك",
   learnTitle:"هل تريد التعمّق أكثر؟", learnSub:function(nm){return "استكشف "+nm+" على منصّة CX Hub";},
   downloadCert:"حمّل شهادتك", certLocked:"أكمل جميع المستويات لفتح شهادتك 🎓",
   welcomeBack:"أهلاً بعودتك", wbLevels:"مستويات مكتملة", wbProgress:"التقدّم", wbStars:"النجوم", wbContinue:"متابعة رحلتي",
   certRewardTitle:"شهادتك بانتظارك", certRewardSub:function(n){return n<=0?"بقيت خطوة واحدة!":"أكمل "+n+" مستوى إضافي للفتح";}}
};

/* storage */
function load(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
var profile=load("cxhub_profile",null), brands=load("cxhub_brands",{}), progress=load("cxhub_progress",{});

/* media {img|lottie|emoji} */
function media(spec,cls){ if(!spec)return"";
  if(spec.lottie)return '<lottie-player src="'+spec.lottie+'" background="transparent" speed="1" loop autoplay class="'+(cls||'')+'"></lottie-player>';
  if(spec.img)return '<img src="'+spec.img+'" alt="" class="'+(cls||'')+'">';
  if(spec.emoji)return '<span class="emoji-ico '+(cls||'')+'">'+spec.emoji+'</span>'; return ""; }

var LANG="en";
var state={screen:"gate", division:null, gate:{}, sso:null};
var t=function(k){return STR[LANG][k];};
var app=function(){return document.getElementById("app");};
function v(id){var el=document.getElementById(id);return el?el.value.trim():"";}
function starRow(n,cls){var s="";for(var i=0;i<3;i++)s+='<span class="'+(i<n?'on':'')+'">★</span>';return '<div class="'+cls+'">'+s+'</div>';}
function firstName(){return profile&&profile.name?profile.name.split(" ")[0]:"";}
function myBrand(){var vals=Object.keys(brands).map(function(k){return brands[k];});return vals[0]||"";}

function levelState(world,lv){var d=progress[world+":"+lv.id];if(d)return{s:"done",data:d};if(lv.released)return{s:"play"};return{s:"soon"};}
function worldProgress(world){var L=WORLDS[world].levels,done=0;L.forEach(function(l){if(progress[world+":"+l.id])done++;});return{done:done,total:L.length,pct:Math.round(done/L.length*100)};}

/* ---------------- SSO adapter (Azure Static Web Apps / Entra) ----------------
   On Azure with auth configured, /.auth/me returns the signed-in user.
   On GitHub Pages this 404s and we fall back to the manual form.
   To finish SSO later: confirm the claim names below match your Entra setup. */
function resolveIdentity(){
  if(!C.SSO) return Promise.resolve(null);   // SSO not enabled yet -> just show the form
  return fetch("/.auth/me",{credentials:"include"}).then(function(r){ return r.ok?r.json():null; }).then(function(j){
    var cp=j&&j.clientPrincipal; if(!cp)return null;
    var claims={}; (cp.claims||[]).forEach(function(c){claims[c.typ]=c.val;});
    /* Store staff share ONE store login, so SSO identifies the STORE, not the person.
       Pull only store-level attributes (brand + market) to pre-fill & lock; the
       individual still types their own name + employee ID every session.
       Adjust these claim names to match your Entra setup when SSO is enabled. */
    var brand =claims["brand"]||claims["extension_Brand"]||"";
    var market=claims["market"]||claims["country"]||claims["extension_Market"]||claims["ctry"]||"";
    return { sso:true, brand:brand, market:market, storeEmail:cp.userDetails||"" };
  }).catch(function(){ return null; });
}

/* ============================ ROUTER ============================ */
function render(){
  document.documentElement.lang=LANG; document.documentElement.dir=LANG==="ar"?"rtl":"ltr";
  document.getElementById("btn-en").classList.toggle("active",LANG==="en");
  document.getElementById("btn-ar").classList.toggle("active",LANG==="ar");
  var pc=document.getElementById("playerChip");
  if(profile){ pc.classList.add("show"); pc.title=t("edit");
    document.getElementById("pcName").textContent=firstName()+" · "+profile.eid;
    document.getElementById("pcAv").textContent=(firstName()[0]||"?").toUpperCase(); }
  else pc.classList.remove("show");
  var wb=document.getElementById("worldBg");
  if(wb) wb.className = (state.screen==="world" && state.division) ? ("world-bg show "+state.division) : "world-bg";

  if(state.screen==="gate") renderGate(); else renderWorld();
  document.querySelectorAll("[data-t]").forEach(function(el){var k=el.getAttribute("data-t");if(STR[LANG][k])el.textContent=STR[LANG][k];});
  window.scrollTo(0,0);
}

/* ---------------------------- IDENTITY GATE ---------------------------- */
function renderGate(){
  var g=state.gate;
  var groups=Object.keys(BRANDS).map(function(div){
    var opts=BRANDS[div].slice().sort().map(function(b){return '<option value="'+b+'" '+(g.brand===b?'selected':'')+'>'+b+'</option>';}).join("");
    return '<optgroup label="'+DIV_LABEL[div][LANG]+'">'+opts+'</optgroup>';
  }).join("");
  var isSso = state.sso&&state.sso.sso, lockBrand=state.sso&&state.sso.brand, lockMarket=state.sso&&state.sso.market;
  var markets=(C.MARKETS||[]).map(function(m){return '<option value="'+m.en+'" '+(g.market===m.en?'selected':'')+'>'+m[LANG]+'</option>';}).join("");
  app().innerHTML=
  '<div class="screen"><section class="gate-hero"><div class="gate-bg"></div><div class="gate-orbs">'+
    '<span></span><span></span><span></span><span></span></div>'+
  '<div class="window-wrap"><div class="window gate-card">'+
    '<div class="gate-logo"><img src="assets/logos/cx-hub.png" alt="CX Hub"></div>'+
    '<span class="gate-eyebrow">'+t("gateEyebrow")+'</span>'+
    '<h2>'+t("gateTitle")+'</h2><p class="sub">'+t("gateSub")+'</p>'+
    (isSso?'<div class="sso-note">🔐 '+t("ssoNote")+'</div>':'')+
    '<div class="field"><label>'+t("fName")+'</label><input id="g-name" value="'+(g.name||"")+'" oninput="CXHub.gateChange()" placeholder="'+t("fName")+'"></div>'+
    '<div class="field"><label>'+t("fEid")+'</label><input id="g-eid" value="'+(g.eid||"")+'" oninput="CXHub.gateChange()" placeholder="e.g. 100234"></div>'+
    '<div class="field"><label>'+t("fBrand")+'</label><select id="g-brand" '+(lockBrand?'disabled':'')+' onchange="CXHub.gateChange()">'+
      '<option value="" disabled '+(!g.brand?'selected':'')+'>'+t("choose")+'</option>'+groups+'</select></div>'+
    '<div class="field"><label>'+t("fMarket")+'</label><select id="g-market" '+(lockMarket?'disabled':'')+' onchange="CXHub.gateChange()">'+
      '<option value="" disabled '+(!g.market?'selected':'')+'>'+t("chooseMarket")+'</option>'+markets+'</select></div>'+
    '<button class="cta" id="gCta" style="background:var(--g-cx)" '+(gateValid()?'':'disabled')+' onclick="CXHub.gateSubmit()">'+t("enter")+' ›</button>'+
  '</div></div></section></div>';
}
function gateChange(){ state.gate.brand=v("g-brand"); state.gate.market=v("g-market");
  var el=document.getElementById("g-name"); if(el&&!el.disabled)state.gate.name=el.value.trim();
  var e2=document.getElementById("g-eid"); if(e2&&!e2.disabled)state.gate.eid=e2.value.trim();
  var c=document.getElementById("gCta"); if(c)c.disabled=!gateValid(); }
function gateValid(){ return state.gate.name && state.gate.eid && state.gate.brand && state.gate.market && BRAND2DIV[state.gate.brand]; }
function gateSubmit(){ gateChange(); if(!gateValid())return;
  profile={eid:state.gate.eid, name:state.gate.name, market:state.gate.market};
  var div=BRAND2DIV[state.gate.brand];
  brands={}; brands[div]=state.gate.brand;              // one player = one brand/division
  save("cxhub_profile",profile); save("cxhub_brands",brands);
  if(window.CXHubSync) CXHubSync.register(div);         // log roster to the Sheet
  state.division=div; state.screen="world"; render();
  hydrateAndRefresh(false);
}
function editDetails(){ if(!profile)return; state.gate={name:profile.name, eid:profile.eid, market:profile.market||"", brand:myBrand()}; state.screen="gate"; render(); }

/* ---------------------------- WORLD / DIVISION JOURNEY ---------------------------- */
function marketAllows(g){
  var m=g.markets, mk=(profile&&profile.market)||"";
  if(!m || m==="all" || m==="*") return true;
  if(Array.isArray(m)) return m.indexOf("all")>=0 || m.indexOf("*")>=0 || m.indexOf(mk)>=0;
  return true;
}
function generalHTML(){
  var games=GENERAL.games.filter(marketAllows);
  if(!games.length) return "";
  var cards=games.map(function(g){
    var live=g.released;
    var badge= live?'<span class="badge live"><span class="dot live"></span>'+t("live")+'</span>'
      : '<span class="badge soon">'+t("soon")+'</span>';
    var clickable=live, tag=clickable?"a":"div", attrs=clickable?'href="'+g.url+'"':'';
    var box=g.icon.box==="grad"?"grad":(g.icon.box==="image"?"image":""), imgCls=g.icon.box==="image"?"ico-img contain":"ico-img pad";
    return '<'+tag+' class="ggame '+(clickable?'':'soon')+'" '+attrs+'><span class="ico '+box+'">'+media(g.icon,imgCls)+'</span>'+
      '<span class="gtext"><span class="gt">'+g[LANG]+'</span><br>'+badge+'</span>'+(clickable?'<span class="arr">›</span>':'')+'</'+tag+'>';
  }).join("");
  return '<section class="sec"><div class="sec-h"><span class="tag">'+t("generalTag")+'</span><h2>'+t("generalH")+'</h2><span class="rule"></span></div><div class="gg-grid">'+cards+'</div></section>';
}
function learnMoreHTML(){
  var w=WORLDS[state.division]; if(!w.hubUrl) return "";
  return '<a class="learn-more" href="'+w.hubUrl+'" target="_blank" rel="noopener" style="--grad:'+w.grad+'">'+
    '<span class="lm-ico">📚</span>'+
    '<span class="lm-text"><span class="lm-title">'+t("learnTitle")+'</span><span class="lm-sub">'+t("learnSub")(w.name[LANG])+'</span></span>'+
    '<span class="lm-arr">›</span></a>';
}
function certHTML(pct){
  if(pct>=100) return '<div class="cert-cta"><button class="cert-btn" onclick="CXHub.downloadCert()">🎓 '+t("downloadCert")+'</button></div>';
  var pr=worldProgress(state.division), left=Math.max(0, pr.total-pr.done);
  return '<div class="cert-reward"><div class="cr-shine"></div>'+
    '<div class="cr-ico">🎓</div>'+
    '<div class="cr-txt"><span class="cr-title">'+t("certRewardTitle")+'</span>'+
    '<span class="cr-sub">'+t("certRewardSub")(left)+'</span></div>'+
    '<div class="cr-lock">🔒</div></div>';
}
function loadImg(src){ return new Promise(function(res){ if(!src){res(null);return;} var im=new Image(); im.onload=function(){res(im);}; im.onerror=function(){res(null);}; im.src=src; }); }
function downloadCert(){
  var w=WORLDS[state.division], p=worldProgress(state.division);
  if(p.pct<100 || !profile) return;
  var dates=[]; w.levels.forEach(function(l){ var d=progress[state.division+":"+l.id]; if(d&&d.date) dates.push(d.date); });
  var last=dates.sort().slice(-1)[0] || new Date().toISOString();
  buildCertificate(profile.name, profile.eid, w, last, "download");
}
/* TEMPORARY preview: run  CXHub.previewCert()  in the browser console (on the hosted
   https site) to see the certificate for the current world without finishing it. */
function previewCert(){
  var w=WORLDS[state.division]||WORLDS.retail;
  var nm=(profile&&profile.name)||"Sample Name", eid=(profile&&profile.eid)||"000000";
  buildCertificate(nm, eid, w, new Date().toISOString(), "open");
}
/* ---- Certificate (HTML5 canvas, A4 landscape 2480x1754 for clean printing).
   Artwork + wave on the left, world-coloured cream panel on the right. All text is
   drawn here (never taken from images). Positions are plain numbers, easy to nudge. ---- */
async function buildCertificate(name, eid, w, dateISO, mode){
  var W=2480, H=1754, c=document.createElement("canvas"); c.width=W; c.height=H; var x=c.getContext("2d");
  try{ await document.fonts.ready; }catch(e){}
  var art   =await loadImg(w.art);
  var cxLogo=await loadImg("assets/logos/cx-hub.png");
  var wLogo =await loadImg(w.logo && w.logo.img);
  var alsh  =await loadImg("assets/logos/alshaya.png");
  var accent=w.color||"#c11d77", gold="#c9a24a", navy="#1f3a63", ink="#2b3a55", grey="#6f7687", cream="#f7f1e4";

  function shade(hex,p){ var n=parseInt(hex.slice(1),16), r=(n>>16)&255, g=(n>>8)&255, b=n&255;
    r=Math.max(0,Math.min(255,r+p)); g=Math.max(0,Math.min(255,g+p)); b=Math.max(0,Math.min(255,b+p)); return "rgb("+r+","+g+","+b+")"; }
  function cover(img,dx,dy,dw,dh){ if(!img)return; var ir=img.width/img.height, dr=dw/dh, sw,sh,sx,sy;
    if(ir>dr){ sh=img.height; sw=sh*dr; sx=(img.width-sw)/2; sy=0; } else { sw=img.width; sh=sw/dr; sx=0; sy=(img.height-sh)/2; }
    x.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh); }
  function fit(img,cx,cy,maxW,maxH){ if(!img)return; var s=Math.min(maxW/img.width,maxH/img.height), ww=img.width*s, hh=img.height*s; x.drawImage(img,cx-ww/2,cy-hh/2,ww,hh); }
  function diamonds(cx,cy,hw,col){ x.strokeStyle=col; x.lineWidth=2; x.beginPath(); x.moveTo(cx-hw,cy); x.lineTo(cx-34,cy); x.stroke(); x.beginPath(); x.moveTo(cx+34,cy); x.lineTo(cx+hw,cy); x.stroke();
    [-16,16].forEach(function(dx){ x.save(); x.translate(cx+dx,cy); x.rotate(Math.PI/4); x.fillStyle=col; x.fillRect(-7,-7,14,14); x.restore(); }); }
  function wrap(t,maxW){ var wd=t.split(" "), ls=[], cur=""; for(var i=0;i<wd.length;i++){ var s=cur?cur+" "+wd[i]:wd[i]; if(x.measureText(s).width>maxW && cur){ ls.push(cur); cur=wd[i]; } else cur=s; } if(cur)ls.push(cur); return ls; }
  function seal(cx,cy,r,col){
    x.fillStyle=shade(col,-30);
    [[-1],[1]].forEach(function(s){ var d=s[0]; x.beginPath(); x.moveTo(cx+d*r*0.42,cy+r*0.5); x.lineTo(cx+d*r*0.95,cy+r*1.75); x.lineTo(cx+d*r*0.5,cy+r*1.5); x.lineTo(cx+d*r*0.08,cy+r*0.95); x.closePath(); x.fill(); });
    var pts=22; x.beginPath(); for(var i=0;i<pts*2;i++){ var rr=(i%2===0)?r*1.1:r*0.97, a=Math.PI*i/pts; x.lineTo(cx+rr*Math.cos(a),cy+rr*Math.sin(a)); } x.closePath(); x.fillStyle=gold; x.fill();
    x.beginPath(); x.arc(cx,cy,r*0.92,0,7); x.fillStyle=col; x.fill();
    x.beginPath(); x.arc(cx,cy,r*0.76,0,7); x.strokeStyle="rgba(255,255,255,.6)"; x.lineWidth=r*0.045; x.stroke();
    x.strokeStyle="#fff"; x.lineWidth=r*0.15; x.lineCap="round"; x.lineJoin="round";
    x.beginPath(); x.moveTo(cx-r*0.34,cy+r*0.02); x.lineTo(cx-r*0.06,cy+r*0.32); x.lineTo(cx+r*0.42,cy-r*0.34); x.stroke();
  }

  var m=16, waveX=Math.round(W*0.54), amp=74;
  x.fillStyle=accent; x.fillRect(0,0,W,H);                    // accent outer edge
  x.fillStyle=cream;  x.fillRect(m,m,W-2*m,H-2*m);            // cream panel
  // left artwork with wavy right edge
  x.save(); x.beginPath(); x.moveTo(m,m); x.lineTo(waveX,m);
  x.bezierCurveTo(waveX-amp,H*0.3, waveX+amp,H*0.7, waveX,H-m); x.lineTo(m,H-m); x.closePath(); x.clip();
  cover(art, m, m, waveX-m+amp, H-2*m);
  var vg=x.createLinearGradient(0,0,0,H); vg.addColorStop(0,"rgba(0,0,0,.06)"); vg.addColorStop(1,"rgba(0,0,0,.28)"); x.fillStyle=vg; x.fillRect(m,m,waveX+amp,H);
  x.restore();
  // wave edge lines
  x.beginPath(); x.moveTo(waveX,m); x.bezierCurveTo(waveX-amp,H*0.3, waveX+amp,H*0.7, waveX,H-m);
  x.strokeStyle=cream; x.lineWidth=10; x.stroke(); x.strokeStyle=gold; x.lineWidth=3; x.stroke();
  // gold ornamental border + corners
  x.strokeStyle=gold; x.lineWidth=3; x.strokeRect(40,40,W-80,H-80); x.lineWidth=1.4; x.strokeRect(54,54,W-108,H-108);
  [[54,54],[W-54,54],[54,H-54],[W-54,H-54]].forEach(function(pt){ x.beginPath(); x.arc(pt[0],pt[1],7,0,7); x.fillStyle=gold; x.fill(); });

  var rx=waveX+Math.round((W-waveX)/2)-6, panelW=W-waveX-120;
  x.textAlign="center";
  if(x.letterSpacing!==undefined) x.letterSpacing="0px";
  fit(cxLogo, rx, 235, 340, 200);                                                        // CX Hub logo
  x.fillStyle=accent; x.font='700 118px Georgia, "Times New Roman", serif';
  if(x.letterSpacing!==undefined) x.letterSpacing="12px"; x.fillText("CERTIFICATE", rx, 490);
  x.fillStyle=grey; x.font='600 44px Georgia, serif'; if(x.letterSpacing!==undefined) x.letterSpacing="18px"; x.fillText("OF COMPLETION", rx, 560);
  if(x.letterSpacing!==undefined) x.letterSpacing="0px";
  diamonds(rx, 612, 165, accent);
  x.fillStyle=grey; x.font='italic 40px Georgia, serif'; x.fillText("This certificate is proudly presented to", rx, 712);
  var nf=100; x.font='700 '+nf+'px Georgia, serif'; while(x.measureText(name).width>panelW && nf>52){ nf-=4; x.font='700 '+nf+'px Georgia, serif'; }
  x.fillStyle=navy; x.fillText(name, rx, 838);                                            // NAME
  diamonds(rx, 892, Math.min(320, x.measureText(name).width/2+60), accent);
  x.fillStyle=grey; x.font='500 38px Georgia, serif'; x.fillText("Employee ID   ·   "+eid, rx, 966);
  x.fillStyle=grey; x.font='italic 38px Georgia, serif'; x.fillText("for successfully completing", rx, 1052);
  fit(wLogo, rx, 1170, Math.min(panelW,520), 150);                                        // Art of X logo
  x.fillStyle=grey; x.font='italic 33px Georgia, serif';
  var msg=(C.CERT&&C.CERT[state.division])||"Congratulations on completing your journey!";
  var lines=wrap(msg, panelW-40), ly=1300; lines.forEach(function(ln){ x.fillText(ln, rx, ly); ly+=46; });
  seal(waveX+130, ly+102, 90, accent);                                                    // seal (lower-left, below message)
  var dt=new Date(dateISO); if(isNaN(dt.getTime())) dt=new Date();
  var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
  var dateStr=dt.getDate()+" "+months[dt.getMonth()]+" "+dt.getFullYear();
  x.fillStyle=ink; x.font='500 34px Georgia, serif'; x.fillText("Completed on "+dateStr, rx, ly+26);
  diamonds(rx, ly+46, 210, accent);
  x.fillStyle=navy; x.font='700 42px Georgia, serif'; x.fillText("Customer Experience Team", rx, ly+112);
  fit(alsh, rx, ly+210, 320, 140);                                                        // Alshaya logo

  var fname=(name+" "+eid+" "+w.name.en).replace(/[\\/:*?"<>|]+/g,"").replace(/\s+/g," ").trim()+".png";
  try{
    c.toBlob(function(blob){ if(!blob) return; var url=URL.createObjectURL(blob);
      if(mode==="open"){ window.open(url,"_blank"); setTimeout(function(){ URL.revokeObjectURL(url); },15000); return; }
      var a=document.createElement("a"); a.href=url; a.download=fname;
      document.body.appendChild(a); a.click(); setTimeout(function(){ URL.revokeObjectURL(url); a.remove(); }, 120); }, "image/png");
  }catch(e){ alert("Certificate export needs the hosted site (open over https)."); }
}
function rankHTML(pct){
  var RANKS=C.RANKS||[]; if(!RANKS.length) return "";
  var idx=0; for(var i=0;i<RANKS.length;i++){ if(pct>=RANKS[i].min) idx=i; }
  var cur=RANKS[idx], nxt=RANKS[idx+1], grad=WORLDS[state.division].grad;
  var nextLine = nxt ? t("toNext")(nxt.min-pct, nxt[LANG]) : t("topRank");
  var ladder=RANKS.map(function(r,i){
    var earned=pct>=r.min;
    return '<div class="badge-tier '+(i===idx?'current':'')+' '+(earned?'earned':'locked')+'" title="'+r[LANG]+' · '+r.min+'%+">'+
      '<div class="bt-ico">'+media(r.icon,"")+'</div><div class="bt-name">'+r[LANG]+'</div></div>';
  }).join("");
  return '<section class="sec"><div class="rank-card" style="--grad:'+grad+'">'+
    '<div class="rank-badge">'+media(cur.icon,"")+'</div>'+
    '<div class="rank-info"><div class="rank-eyebrow">'+t("yourRank")+'</div><div class="rank-name">'+cur[LANG]+'</div>'+
      '<div class="rank-sub">'+t("journeyProgress")+' · '+pct+'%</div>'+
      '<div class="rank-bar"><i style="width:'+pct+'%"></i></div>'+
      '<div class="rank-next">'+nextLine+'</div></div></div>'+
    '<div class="badge-ladder">'+ladder+'</div></section>';
}
function renderWorld(){
  var key=state.division, w=WORLDS[key], p=worldProgress(key);
  var trail=w.levels.map(function(lv,i){
    var st=levelState(key,lv), stars=st.s==="done"?st.data.stars:0;
    var label=st.s==="done"?t("done"):st.s==="play"?t("live"):t("soon");
    var inside=st.s==="soon"?'<span class="lock">🔒</span>':'<span class="num">'+(i+1)+'</span>';
    var check=st.s==="done"?'<span class="check">✓</span>':'';
    var badge=st.s==="done"?'<span class="score-badge">'+st.data.score+'%</span>':'';
    var conn=i<w.levels.length-1?'<div class="connector"></div>':'';
    return '<div class="level '+st.s+'" style="--i:'+i+'">'+starRow(stars,'stars')+
      '<button class="node" onclick="CXHub.openLevel('+i+')">'+inside+check+badge+'</button>'+
      '<div class="lvtitle">'+lv[LANG]+'</div><div class="lvstate">'+label+'</div></div>'+conn;
  }).join("");
  app().innerHTML=
  '<div class="screen"><div class="worldtop '+key+'"><div class="art" style="background-image:url(\''+w.art+'\')"></div><div class="scrim"></div>'+
    '<div class="wrap"><div class="inner"><div class="wt-row"><div class="wt-text">'+
      '<h2>'+w.name[LANG]+'</h2><div class="wsub">'+w.journey[LANG]+'</div>'+
      '<div class="wstats"><span class="wstat">🎮 '+t("levels")(w.levels.length)+'</span>'+
        '<span class="wstat">✅ '+t("cleared")(p.done,p.total)+'</span>'+
        (profile?'<span class="wstat">👤 '+t("playingAs")+' '+firstName()+' · '+profile.eid+(myBrand()?' · '+myBrand():'')+'</span>':'')+'</div>'+
      '<div class="wprogress"><i style="width:'+p.pct+'%"></i></div>'+
    '</div><div class="wlogochip">'+media(w.logo,"")+'</div></div></div></div></div>'+
    '<div class="wrap">'+rankHTML(p.pct)+'<div class="trail"><div class="trail-cap"><span class="tc-tape"></span><span class="tc-badge" style="background:'+w.grad+'">▶ '+t("start2")+'</span><span class="tc-tape"></span></div>'+trail+
      '<div class="finish-line"><span class="fl-tape"></span><span class="finish-flag"><span class="fl-glow"></span>🏁 '+t("finish")+' 🏁</span><span class="fl-tape"></span></div>'+certHTML(p.pct)+'</div>'+
      learnMoreHTML()+generalHTML()+'<div style="height:20px"></div></div>'+
  '</div>';
}

/* ---------------------------- LEVEL MODAL ---------------------------- */
function openLevel(i){
  var key=state.division, w=WORLDS[key], lv=w.levels[i], st=levelState(key,lv), stars=st.s==="done"?st.data.stars:0;
  var learn=w.learn[LANG].map(function(x){return '<div class="li"><span class="ck" style="background:'+w.grad+'">✓</span>'+x+'</div>';}).join("");
  var mStars=""; for(var s=0;s<3;s++)mStars+='<span class="'+(s<stars?'on':'')+'">★</span>';
  var best=st.s==="done"?'<div class="m-best"><span>'+t("yourBest")+'</span><span>'+st.data.score+'% · '+Array(st.data.stars+1).join('★')+Array(3-st.data.stars+1).join('☆')+'</span></div>':'';
  var cta= st.s==="soon" ? '<div class="m-cta dis">'+t("comingSoon")+'</div>'
    : '<a class="m-cta" style="background:'+w.grad+'" href="'+lv.url+'" onclick="CXHub.closeModal()">'+(st.s==="done"?t("replay"):t("start"))+' ›</a>';
  document.getElementById("modal").innerHTML=
    '<button class="m-close" onclick="CXHub.closeModal()">×</button><div class="grip"></div>'+
    '<div class="m-lv">'+t("lvl")+' '+(i+1)+'</div><h3>'+lv[LANG]+'</h3><div class="m-stars">'+mStars+'</div>'+
    '<div class="m-sec"><div class="m-h">'+t("whatLearn")+'</div><div class="learn">'+learn+'</div></div>'+
    '<div class="m-sec"><div class="m-h">'+t("challenge")+'</div><div class="preview">'+
      '<div class="pv"><div class="pe">'+media(ICONS.scenario,"")+'</div><div class="pn">'+t("scenario")+'</div></div>'+
      '<div class="pv"><div class="pe">'+media(ICONS.quiz,"")+'</div><div class="pn">'+t("quiz")+'</div></div>'+
      '<div class="pv"><div class="pe">'+media(w.action,"")+'</div><div class="pn">'+t("action")+'</div></div>'+
    '</div></div>'+best+cta;
  document.getElementById("modalBack").classList.add("show");
}
function closeModal(){document.getElementById("modalBack").classList.remove("show");}
function showWelcome(){
  if(!profile || state.screen!=="world" || !state.division) return;
  var w=WORLDS[state.division], pr=worldProgress(state.division), RANKS=C.RANKS||[];
  var idx=0; for(var i=0;i<RANKS.length;i++){ if(pr.pct>=RANKS[i].min) idx=i; } var rank=RANKS[idx]||{};
  var stars=0; w.levels.forEach(function(l){ var d=progress[state.division+":"+l.id]; if(d)stars+=(d.stars||0); });
  var first=((profile.name||"").trim().split(/\s+/)[0])||profile.name;
  document.getElementById("modal").innerHTML=
    '<button class="m-close" onclick="CXHub.closeModal()">×</button><div class="grip"></div>'+
    '<div class="wb">'+
      '<div class="wb-badge">'+media(rank.icon,"")+'</div>'+
      '<div class="wb-hi">'+t("welcomeBack")+', '+first+'! 👋</div>'+
      '<div class="wb-rank">'+w.name[LANG]+' · <b>'+(rank[LANG]||"")+'</b></div>'+
      '<div class="wb-stats">'+
        '<div class="wb-stat"><span class="wb-n">'+pr.done+'/'+pr.total+'</span><span class="wb-l">'+t("wbLevels")+'</span></div>'+
        '<div class="wb-stat"><span class="wb-n">'+pr.pct+'%</span><span class="wb-l">'+t("wbProgress")+'</span></div>'+
        '<div class="wb-stat"><span class="wb-n">'+stars+'</span><span class="wb-l">'+t("wbStars")+'</span></div>'+
      '</div>'+
      '<div class="wb-bar"><i style="width:'+pr.pct+'%;background:'+w.grad+'"></i></div>'+
      '<button class="wb-cta" style="background:'+w.grad+'" onclick="CXHub.closeModal()">'+t("wbContinue")+' ›</button>'+
    '</div>';
  document.getElementById("modalBack").classList.add("show");
}
document.addEventListener("keydown",function(e){if(e.key==="Escape")closeModal();});

function setLang(l){LANG=l;render();}
function goWorld(){ if(profile&&Object.keys(brands).length){state.screen="world";render();} }

function confirmSignOut(){ var msg=LANG==="ar"?"تسجيل الخروج؟":"Sign out?"; if(window.confirm(msg)) signOut(); }

window.CXHub={gateChange:gateChange, gateSubmit:gateSubmit, editDetails:editDetails,
  openLevel:openLevel, closeModal:closeModal, setLang:setLang, goWorld:goWorld, signOut:signOut, confirmSignOut:confirmSignOut, downloadCert:downloadCert, previewCert:previewCert};

/* footer CX Hub logo -> main hub (header logo stays internal home) */
(function(){ var cx=(C.LINKS&&C.LINKS.cxHub)||"#";
  var fl=document.getElementById("footerLogo"); if(fl)fl.href=cx; })();

/* ---------------------------- INIT ---------------------------- */
function hydrateAndRefresh(allowSignout){
  if(profile && window.CXHubSync && CXHubSync.hydrate){
    CXHubSync.hydrate().then(function(r){
      if(!r) return;
      if(allowSignout && r.read && r.known===false){ signOut(); return; }   // deleted from Sheet -> sign out
      if(r.changed){ progress=load("cxhub_progress",{}); render(); }
    });
  }
}
function signOut(){
  profile=null; brands={}; progress={};
  try{ localStorage.removeItem("cxhub_profile"); localStorage.removeItem("cxhub_brands"); localStorage.removeItem("cxhub_progress"); }catch(e){}
  state.division=null; state.gate={}; state.screen="gate"; render();
}
function decideAndRender(){
  if(profile && Object.keys(brands).length){ state.division=BRAND2DIV[myBrand()]||"retail"; state.screen="world"; }
  else { state.screen="gate"; }
  render();
}
resolveIdentity().then(function(sso){
  state.sso=sso;
  var returning = !!profile;   // had a saved profile before this load
  if(!profile && sso){ if(sso.brand)state.gate.brand=sso.brand; if(sso.market)state.gate.market=sso.market; }
  decideAndRender();
  hydrateAndRefresh(true);
  if(returning && state.screen==="world"){
    var seen=false; try{ seen=sessionStorage.getItem("cxhub_welcomed")==="1"; }catch(e){}
    if(!seen){ try{ sessionStorage.setItem("cxhub_welcomed","1"); }catch(e){} setTimeout(showWelcome, 350); }
  }
}).catch(decideAndRender);
})();

/* ============================================================================
   CX INTERACTIVE HUB — engine.  Reads window.CXHUB_CONFIG (see config.js).
   You normally never edit this file; edit config.js instead.
   ============================================================================ */
(function(){
const C = window.CXHUB_CONFIG;
const WORLDS = C.WORLDS, GENERAL = C.GENERAL, BRANDS = C.BRANDS, CHARS = C.CHARS, ICONS = C.ICONS;

/* ---- i18n chrome strings ---- */
const STR = {
  en:{brand:"CX Interactive Hub", f_dev:"Developed by the Customer Experience team", f_q:"Any queries?", f_contact:"contact here",
    heroEyebrow:"Level up the customer experience", heroTitle:"CX Interactive Hub",
    heroSub:"Choose your world, enter as your character, and clear every level of the customer experience.",
    worldsTag:"Play", worldsH:"Choose your world", generalTag:"Standalone", generalH:"Customer Experience — General",
    levels:n=>n+" levels", cleared:(a,b)=>a+" / "+b+" cleared", enter:"Enter world",
    live:"Live", soon:"Coming soon", done:"Completed",
    obTitle:"Enter the game", obSub:"Tell us who's playing — we'll remember you next time.",
    fEid:"Employee ID", fName:"Full name", fBrand:"Your brand", fGender:"You are", male:"Male", female:"Female",
    chooseChar:"Pick your character", enterWorld:"Enter world", back:"Back", choose:"Choose…",
    welcomeBack:"Welcome back", selectBrand:"Select your brand",
    start:"Start level", replay:"Replay level", comingSoon:"Coming soon",
    whatLearn:"What you'll learn", challenge:"Challenge preview", scenario:"Scenario", quiz:"Quiz", action:"Action",
    yourBest:"Your best", playingAs:"Playing as", start2:"START", finish:"FINISH", lvl:"Level"},
  ar:{brand:"مركز تجربة العملاء التفاعلي", f_dev:"تم التطوير بواسطة فريق تجربة العملاء", f_q:"أي استفسارات؟", f_contact:"تواصل هنا",
    heroEyebrow:"ارتقِ بتجربة العملاء", heroTitle:"مركز تجربة العملاء التفاعلي",
    heroSub:"اختر عالمك، وادخل بشخصيتك، واجتَز كل مستوى من تجربة العميل.",
    worldsTag:"العب", worldsH:"اختر عالمك", generalTag:"ألعاب مستقلة", generalH:"تجربة العملاء — عام",
    levels:n=>n+" مستوى", cleared:(a,b)=>a+" / "+b+" مكتمل", enter:"ادخل العالم",
    live:"مباشر", soon:"قريبًا", done:"مكتمل",
    obTitle:"ادخل اللعبة", obSub:"أخبرنا من يلعب — سنتذكّرك في المرة القادمة.",
    fEid:"الرقم الوظيفي", fName:"الاسم الكامل", fBrand:"علامتك التجارية", fGender:"أنت", male:"ذكر", female:"أنثى",
    chooseChar:"اختر شخصيتك", enterWorld:"ادخل العالم", back:"رجوع", choose:"اختر…",
    welcomeBack:"مرحبًا بعودتك", selectBrand:"اختر علامتك التجارية",
    start:"ابدأ المستوى", replay:"أعِد المستوى", comingSoon:"قريبًا",
    whatLearn:"ماذا ستتعلّم", challenge:"معاينة التحدي", scenario:"سيناريو", quiz:"اختبار", action:"تطبيق",
    yourBest:"أفضل نتيجة", playingAs:"تلعب كـ", start2:"البداية", finish:"النهاية", lvl:"المستوى"}
};

/* ---- storage ---- */
function load(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
let profile = load("cxhub_profile",null);
let brands  = load("cxhub_brands",{});
let progress= load("cxhub_progress",{});

/* ---- media helper: renders {img|lottie|emoji} ---- */
function media(spec,cls){
  if(!spec) return "";
  if(spec.lottie) return `<lottie-player src="${spec.lottie}" background="transparent" speed="1" loop autoplay class="${cls||''}"></lottie-player>`;
  if(spec.img)    return `<img src="${spec.img}" alt="" class="${cls||''}">`;
  if(spec.emoji)  return `<span class="emoji-ico ${cls||''}">${spec.emoji}</span>`;
  return "";
}
function charById(id){for(const g of ["m","f"])for(const c of CHARS[g])if(c.id===id)return c;return CHARS.m[0];}

/* ---- state ---- */
let LANG="en";
const state={screen:"home", world:null, ob:{}, charIdx:0};
const t=k=>STR[LANG][k];
const app=()=>document.getElementById("app");
function v(id){const el=document.getElementById(id);return el?el.value.trim():"";}
function starRow(n,cls){let s="";for(let i=0;i<3;i++)s+=`<span class="${i<n?'on':''}">★</span>`;return `<div class="${cls}">${s}</div>`;}

/* ---- level state ---- */
function levelState(world,lv){
  const done=progress[world+":"+lv.id];
  if(done) return {s:"done", data:done};
  if(lv.released) return {s:"play"};
  return {s:"soon"};
}
function worldProgress(world){
  const lvls=WORLDS[world].levels; let done=0;
  lvls.forEach(l=>{ if(progress[world+":"+l.id]) done++; });
  return {done, total:lvls.length, pct:Math.round(done/lvls.length*100)};
}

/* ============================ ROUTER ============================ */
function render(){
  document.documentElement.lang=LANG;
  document.documentElement.dir=LANG==="ar"?"rtl":"ltr";
  document.getElementById("btn-en").classList.toggle("active",LANG==="en");
  document.getElementById("btn-ar").classList.toggle("active",LANG==="ar");
  const pc=document.getElementById("playerChip");
  if(profile){pc.classList.add("show");
    document.getElementById("pcName").textContent=profile.name.split(" ")[0]+" · "+profile.eid;
    document.getElementById("pcAv").innerHTML=media(charById(profile.character),"");}
  else pc.classList.remove("show");
  // per-world animated background
  const wb=document.getElementById("worldBg");
  if(wb) wb.className = state.screen==="world" ? ("world-bg show "+state.world) : "world-bg";

  if(state.screen==="home") renderHome();
  else if(state.screen==="onboard") renderOnboard();
  else if(state.screen==="character") renderCharacter();
  else if(state.screen==="brandonly") renderBrandOnly();
  else if(state.screen==="world") renderWorld();

  document.querySelectorAll("[data-t]").forEach(el=>{const k=el.getAttribute("data-t");if(STR[LANG][k])el.textContent=STR[LANG][k];});
  window.scrollTo(0,0);
}

/* ---------------------------- HOME ---------------------------- */
function renderHome(){
  const worldCards=Object.keys(WORLDS).map(key=>{
    const w=WORLDS[key], p=worldProgress(key);
    return `<button class="portal ${key}" onclick="CXHub.openWorld('${key}')">
      <div class="art" style="background-image:url('${w.art}')"></div>
      <div class="tint"></div><div class="shine"></div>
      <div class="logochip">${media(w.logo,"")}</div>
      <h3>${w.name[LANG]}</h3>
      <div class="subj">${w.journey[LANG]}</div>
      <div class="spacer"></div>
      <div class="pmeta">
        <span class="levels">${t("levels")(w.levels.length)}</span>
        <span class="cleared">✅ ${p.done}/${p.total}</span>
      </div>
      <div class="pbar"><i style="width:${p.pct}%"></i></div>
      <span class="enter">${t("enter")} <span class="ar-arrow">›</span></span>
    </button>`;
  }).join("");

  const generalCards=GENERAL.games.map(g=>{
    const done=progress["general:"+g.id];
    const live=g.released;
    const badge= done?`<span class="badge done">★ ${done.score}%</span>`
      : live?`<span class="badge live"><span class="dot live"></span>${t("live")}</span>`
      : `<span class="badge soon">${t("soon")}</span>`;
    const clickable=live||done;
    const tag=clickable?"a":"div";
    const attrs=clickable?`href="${g.url}"`:"";
    const box=g.icon.box==="grad"?"grad":(g.icon.box==="image"?"image":"");
    const imgCls=g.icon.box==="image"?"ico-img contain":"ico-img pad";
    const ico=`<span class="ico ${box}">${media(g.icon,imgCls)}</span>`;
    return `<${tag} class="ggame ${clickable?'':'soon'}" ${attrs}>
      ${ico}
      <span class="gtext"><span class="gt">${g[LANG]}</span><br>${badge}</span>
      ${clickable?'<span class="arr">›</span>':''}
    </${tag}>`;
  }).join("");

  app().innerHTML=`
  <div class="screen"><div class="wrap">
    <section class="hero">
      <span class="eyebrow">${t("heroEyebrow")}</span>
      <h1>${t("heroTitle")}</h1>
      <p>${t("heroSub")}</p>
    </section>
    <section class="sec">
      <div class="sec-h"><span class="tag">${t("worldsTag")}</span><h2>${t("worldsH")}</h2><span class="rule"></span></div>
      <div class="worlds">${worldCards}</div>
    </section>
    <section class="sec">
      <div class="sec-h"><span class="tag">${t("generalTag")}</span><h2>${t("generalH")}</h2><span class="rule"></span></div>
      <div class="gg-grid">${generalCards}</div>
    </section>
    <div style="height:26px"></div>
  </div></div>`;
}

function openWorld(key){
  state.world=key;
  if(profile && brands[key]){ state.screen="world"; render(); }
  else if(profile && !brands[key]){ state.screen="brandonly"; render(); }
  else { state.ob={eid:"",name:"",brand:"",gender:""}; state.screen="onboard"; render(); }
}
function goHome(){state.screen="home";state.world=null;render();}

/* ---------------------------- ONBOARD ---------------------------- */
function renderOnboard(){
  const w=WORLDS[state.world];
  const opts=BRANDS[state.world].map(b=>`<option value="${b}" ${state.ob.brand===b?'selected':''}>${b}</option>`).join("");
  app().innerHTML=`
  <div class="screen"><div class="window-wrap"><div class="window">
    <div class="win-head"><div class="logos">${media(w.logo,"")}</div>
      <button class="back-btn" onclick="CXHub.goHome()">‹ ${t("back")}</button></div>
    <div class="brandbar" style="background:${w.grad}"></div>
    <h2>${t("obTitle")}</h2><p class="sub">${t("obSub")}</p>
    <div class="field"><label>${t("fEid")}</label><input id="f-eid" value="${state.ob.eid||''}" oninput="CXHub.obChange()" placeholder="e.g. 100234"></div>
    <div class="field"><label>${t("fName")}</label><input id="f-name" value="${state.ob.name||''}" oninput="CXHub.obChange()" placeholder="${t("fName")}"></div>
    <div class="field"><label>${t("fBrand")}</label>
      <select id="f-brand" onchange="CXHub.obChange()"><option value="" disabled ${!state.ob.brand?'selected':''}>${t("choose")}</option>${opts}</select></div>
    <div class="field"><label>${t("fGender")}</label>
      <div class="seg">
        <button class="seg-btn ${state.ob.gender==='m'?'on':''}" style="${state.ob.gender==='m'?'background:'+w.grad:''}" onclick="CXHub.obGender('m')">👨 ${t("male")}</button>
        <button class="seg-btn ${state.ob.gender==='f'?'on':''}" style="${state.ob.gender==='f'?'background:'+w.grad:''}" onclick="CXHub.obGender('f')">👩 ${t("female")}</button>
      </div></div>
    <button class="cta" id="obCta" style="background:${w.grad}" ${obValid()?'':'disabled'} onclick="CXHub.toCharacter()">${t("chooseChar")} ›</button>
  </div></div></div>`;
}
function obChange(){state.ob.eid=v("f-eid");state.ob.name=v("f-name");state.ob.brand=v("f-brand");
  const c=document.getElementById("obCta");if(c)c.disabled=!obValid();}
function obGender(g){state.ob.gender=g;render();}
function obValid(){return state.ob.eid&&state.ob.name&&state.ob.brand&&state.ob.gender;}
function toCharacter(){obChange();if(!obValid())return;state.charIdx=0;state.screen="character";render();}

/* ---------------------------- CHARACTER ---------------------------- */
function renderCharacter(){
  const w=WORLDS[state.world];
  const list=CHARS[state.ob.gender||"m"];
  const c=list[state.charIdx%list.length];
  const dots=list.map((_,i)=>`<span class="${i===state.charIdx?'on':''}"></span>`).join("");
  app().innerHTML=`
  <div class="screen"><div class="window-wrap"><div class="window">
    <div class="win-head"><div class="logos">${media(w.logo,"")}</div>
      <button class="back-btn" onclick="CXHub.setScreen('onboard')">‹ ${t("back")}</button></div>
    <div class="brandbar" style="background:${w.grad}"></div>
    <h2>${t("chooseChar")}</h2>
    <div class="char-hero" style="background:${w.grad}">
      <div class="char-stage">
        <button class="char-arrow" onclick="CXHub.charNav(-1)">${LANG==='ar'?'›':'‹'}</button>
        <div class="char-card"><div class="char-circle">${media(c,"")}</div><div class="char-name">${c.name[LANG]}</div></div>
        <button class="char-arrow" onclick="CXHub.charNav(1)">${LANG==='ar'?'‹':'›'}</button>
      </div>
      <div class="char-dots">${dots}</div>
    </div>
    <button class="cta" style="background:${w.grad}" onclick="CXHub.finishOnboard('${c.id}')">${t("enterWorld")} ›</button>
  </div></div></div>`;
}
function charNav(d){const list=CHARS[state.ob.gender||"m"];state.charIdx=(state.charIdx+d+list.length)%list.length;renderCharacter();}
function finishOnboard(charId){
  profile={eid:state.ob.eid,name:state.ob.name,gender:state.ob.gender,character:charId};
  brands[state.world]=state.ob.brand;
  save("cxhub_profile",profile);save("cxhub_brands",brands);
  state.screen="world";render();
}

/* ---------------------------- BRAND ONLY (returning player, new world) ---------------------------- */
function renderBrandOnly(){
  const w=WORLDS[state.world];
  const opts=BRANDS[state.world].map(b=>`<option value="${b}">${b}</option>`).join("");
  const c=charById(profile.character);
  app().innerHTML=`
  <div class="screen"><div class="window-wrap"><div class="window">
    <div class="win-head"><div class="logos">${media(w.logo,"")}</div>
      <button class="back-btn" onclick="CXHub.goHome()">‹ ${t("back")}</button></div>
    <div class="brandbar" style="background:${w.grad}"></div>
    <div class="welcome-back">
      <div class="av">${media(c,"")}</div>
      <div class="wn">${t("welcomeBack")}, ${profile.name.split(" ")[0]}!</div>
      <div class="wm">${t("selectBrand")} — ${w.name[LANG]}</div>
    </div>
    <div class="field"><label>${t("fBrand")}</label>
      <select id="bo-brand" onchange="document.getElementById('boCta').disabled=!this.value">
        <option value="" disabled selected>${t("choose")}</option>${opts}</select></div>
    <button class="cta" id="boCta" style="background:${w.grad}" disabled onclick="CXHub.brandOnlyGo()">${t("enterWorld")} ›</button>
  </div></div></div>`;
}
function brandOnlyGo(){const b=v("bo-brand");if(!b)return;brands[state.world]=b;save("cxhub_brands",brands);state.screen="world";render();}

/* ---------------------------- WORLD MAP ---------------------------- */
function renderWorld(){
  const key=state.world, w=WORLDS[key], p=worldProgress(key), c=profile?charById(profile.character):null;
  const trail=w.levels.map((lv,i)=>{
    const st=levelState(key,lv), stars=st.s==="done"?st.data.stars:0;
    const stateLabel=st.s==="done"?t("done"):st.s==="play"?t("live"):t("soon");
    const inside=st.s==="soon"?`<span class="lock">🔒</span>`:`<span class="num">${i+1}</span>`;
    const check=st.s==="done"?`<span class="check">✓</span>`:"";
    const scoreBadge=st.s==="done"?`<span class="score-badge">${st.data.score}%</span>`:"";
    const connector=i<w.levels.length-1?`<div class="connector"></div>`:"";
    return `<div class="level ${st.s}">
        ${starRow(stars,'stars')}
        <button class="node" onclick="CXHub.openLevel('${key}',${i})">${inside}${check}${scoreBadge}</button>
        <div class="lvtitle">${lv[LANG]}</div><div class="lvstate">${stateLabel}</div>
      </div>${connector}`;
  }).join("");
  app().innerHTML=`
  <div class="screen">
    <div class="worldtop ${key}">
      <div class="art" style="background-image:url('${w.art}')"></div><div class="scrim"></div>
      <div class="wrap"><div class="inner">
        <button class="back-btn" onclick="CXHub.goHome()" style="background:rgba(255,255,255,.92)">‹ ${t("back")}</button>
        <div class="wt-row">
          <div class="wt-text">
            <h2>${w.name[LANG]}</h2><div class="wsub">${w.journey[LANG]}</div>
            <div class="wstats">
              <span class="wstat">🎮 ${t("levels")(w.levels.length)}</span>
              <span class="wstat">✅ ${t("cleared")(p.done,p.total)}</span>
              ${c?`<span class="wstat"><span class="av">${media(c,"")}</span> ${t("playingAs")} ${profile.name.split(" ")[0]} · ${profile.eid}${brands[key]?' · '+brands[key]:''}</span>`:""}
            </div>
            <div class="wprogress"><i style="width:${p.pct}%"></i></div>
          </div>
          <div class="wlogochip">${media(w.logo,"")}</div>
        </div>
      </div></div>
    </div>
    <div class="wrap"><div class="trail">
      <div class="trail-cap">▸ ${t("start2")}</div>
      ${trail}
      <div style="text-align:center"><span class="finish-flag">🏁 ${t("finish")}</span></div>
    </div></div>
  </div>`;
}

/* ---------------------------- LEVEL MODAL ---------------------------- */
function openLevel(key,i){
  const w=WORLDS[key], lv=w.levels[i], st=levelState(key,lv), stars=st.s==="done"?st.data.stars:0;
  const learn=w.learn[LANG].map(x=>`<div class="li"><span class="ck" style="background:${w.grad}">✓</span>${x}</div>`).join("");
  let mStars="";for(let s=0;s<3;s++)mStars+=`<span class="${s<stars?'on':''}">★</span>`;
  const best=st.s==="done"?`<div class="m-best"><span>${t("yourBest")}</span><span>${st.data.score}% · ${'★'.repeat(st.data.stars)}${'☆'.repeat(3-st.data.stars)}</span></div>`:"";
  let cta = st.s==="soon"
    ? `<div class="m-cta dis">${t("comingSoon")}</div>`
    : `<a class="m-cta" style="background:${w.grad}" href="${lv.url}" onclick="CXHub.closeModal()">${st.s==="done"?t("replay"):t("start")} ›</a>`;
  document.getElementById("modal").innerHTML=`
    <button class="m-close" onclick="CXHub.closeModal()">×</button>
    <div class="grip"></div>
    <div class="m-lv">${t("lvl")} ${i+1}</div>
    <h3>${lv[LANG]}</h3>
    <div class="m-stars">${mStars}</div>
    <div class="m-sec"><div class="m-h">${t("whatLearn")}</div><div class="learn">${learn}</div></div>
    <div class="m-sec"><div class="m-h">${t("challenge")}</div>
      <div class="preview">
        <div class="pv"><div class="pe">${media(ICONS.scenario,"")}</div><div class="pn">${t("scenario")}</div></div>
        <div class="pv"><div class="pe">${media(ICONS.quiz,"")}</div><div class="pn">${t("quiz")}</div></div>
        <div class="pv"><div class="pe">${media(w.action,"")}</div><div class="pn">${t("action")}</div></div>
      </div></div>
    ${best}${cta}`;
  document.getElementById("modalBack").classList.add("show");
}
function closeModal(){document.getElementById("modalBack").classList.remove("show");}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});

/* ---------------------------- misc ---------------------------- */
function setLang(l){LANG=l;render();}
function setScreen(s){state.screen=s;render();}

/* progress API for modules (documented contract) */
function saveResult(world,levelId,res){
  progress[world+":"+levelId]={stars:res.stars||0,score:res.score||0,date:new Date().toISOString()};
  save("cxhub_progress",progress);
}

/* public namespace */
window.CXHub={openWorld,goHome,obChange,obGender,toCharacter,charNav,finishOnboard,
  brandOnlyGo,openLevel,closeModal,setLang,setScreen,saveResult};

render();
})();

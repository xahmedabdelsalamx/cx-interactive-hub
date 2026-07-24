/* ============================================================================
   CX INTERACTIVE HUB · SYNC HELPER  (window.CXHubSync)
   ----------------------------------------------------------------------------
   Drop-in bridge between any game/level, the hub, and the central Google Sheet.
   Include it on the hub AND on every game:
       <script src="assets/js/cxhub-sync.js"></script>        (hub, at root)
       <script src="../../assets/js/cxhub-sync.js"></script>  (a game folder)

   It does two things when a game finishes:
     1. writes the shared localStorage 'cxhub_progress' so the HUB shows the
        level as completed (stars + score),  and
     2. posts a row to the central Google Sheet (with an offline retry queue).

   ---- EDIT THESE TWO after you deploy the Apps Script (backend/AppsScript.gs) ----
============================================================================ */
window.CXHUB_SYNC = window.CXHUB_SYNC || {
  scriptUrl:   "https://script.google.com/macros/s/AKfycbzkwewEo806PQv7IZCXgbM9L-7LZt7VRH3KzbAtkjkG2Rty_dyWjMsjNuFrD5bXY1nBEg/exec",   // live Apps Script /exec URL (empty = local only)
  secretToken: "cxinteractivehub2030"    // MUST match SECRET_TOKEN in backend/AppsScript.gs
};

(function(){
  var CFG = window.CXHUB_SYNC;
  var OUTBOX = "cxhub_outbox";

  function load(k,d){ try{ return JSON.parse(localStorage.getItem(k)) || d; }catch(e){ return d; } }
  function save(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
  function profile(){ return load("cxhub_profile", null); }
  function brands(){ return load("cxhub_brands", {}); }
  function nowISO(){ return new Date().toISOString(); }
  function lang(){ return (document.documentElement.getAttribute("lang")) || "en"; }

  function outbox(){ return load(OUTBOX, []); }
  function setOutbox(q){ save(OUTBOX, q); }
  function send(p){   // fire-and-forget write; no-cors so a blocked CORS read never causes a retry/duplicate
    return fetch(CFG.scriptUrl, { method:"POST", mode:"no-cors",
      headers:{ "Content-Type":"text/plain;charset=utf-8" }, body: JSON.stringify(p) });
  }
  /* --------------------------------------------------------------------------
     READS — two transports, because either one can be blocked in the wild.

       1. fetch()  : Apps Script /exec 302-redirects to script.googleusercontent.com,
                     which DOES send Access-Control-Allow-Origin:*, so a plain CORS
                     GET works and is the fastest path. doGet() returns raw JSON when
                     no ?callback is present.
       2. JSONP    : <script> fallback for anything that blocks the fetch.

     Why both: ad/tracker blockers (AdGuard, uBlock…), some VPN/DNS clients and
     corporate proxies inject a Content-Security-Policy of
         script-src 'self' 'unsafe-inline' local.adguard.org
     which silently KILLS the JSONP <script> tag — the old roster lookup then timed
     out and showed "Couldn't reach the directory". Those policies almost never set
     connect-src, so fetch() still gets through. Trying fetch first fixes that case;
     keeping JSONP covers the reverse case (connect-src locked, script-src open).
  -------------------------------------------------------------------------- */
  var NET = { mode:"", cspBlocked:false, lastUrl:"", lastError:"" };
  try{   // remember if the browser (or an extension) refused to load our script tag
    window.addEventListener("securitypolicyviolation", function(e){
      if(String(e.blockedURI||"").indexOf("script.google") >= 0) NET.cspBlocked = true;
    });
  }catch(e){}

  function fetchJSON(url, ms){   // CORS read; resolves the parsed object or null, never rejects
    return new Promise(function(resolve){
      if(typeof fetch!=="function") return resolve(null);
      var done=false, ctl=null;
      try{ ctl = (typeof AbortController!=="undefined") ? new AbortController() : null; }catch(e){}
      var timer=setTimeout(function(){ try{ ctl && ctl.abort(); }catch(e){} finish(null,"timeout"); }, ms||15000);
      function finish(d,err){ if(done)return; done=true; clearTimeout(timer); if(err)NET.lastError=err; resolve(d); }
      try{
        fetch(url, { method:"GET", redirect:"follow", credentials:"omit", cache:"no-store",
                     signal: ctl ? ctl.signal : undefined })
          .then(function(r){ return r.ok ? r.text() : null; })
          .then(function(txt){
            if(!txt) return finish(null,"http");
            try{ finish(JSON.parse(txt)); }catch(e2){ finish(null,"parse"); }
          })
          .catch(function(e3){ finish(null, (e3 && e3.message) || "fetch"); });
      }catch(e){ finish(null,"throw"); }
    });
  }

  function jsonp(url, ms){   // <script> read — Apps Script answers callback(...) when ?callback= is present
    return new Promise(function(resolve){
      var cb="cxhubcb_"+Date.now()+"_"+Math.floor(Math.random()*1e6), s=document.createElement("script"), done=false;
      var timer=setTimeout(function(){ finish(null); }, ms||9000);
      function finish(d){ if(done)return; done=true; try{ delete window[cb]; }catch(e){ window[cb]=undefined; } if(s.parentNode)s.parentNode.removeChild(s); clearTimeout(timer); resolve(d); }
      window[cb]=function(d){ finish(d); };
      s.onerror=function(){ finish(null); };
      s.src=url+(url.indexOf("?")<0?"?":"&")+"callback="+cb;
      (document.head||document.documentElement).appendChild(s);
    });
  }

  /* One read = fetch first, JSONP second. Records which transport worked (CXHubSync.net). */
  function read(url, ms){
    NET.lastUrl=url;
    return fetchJSON(url, ms).then(function(d){
      if(d && typeof d==="object"){ NET.mode="fetch"; return d; }
      return jsonp(url, ms).then(function(d2){
        if(d2 && typeof d2==="object"){ NET.mode="jsonp"; return d2; }
        NET.mode=""; return null;
      });
    });
  }
  var flushing=false;
  async function flush(){
    if(!CFG.scriptUrl || navigator.onLine===false || flushing) return;
    flushing=true;
    try{
      while(true){
        var q=outbox(); if(!q.length) break;
        try{ await send(q[0]); }catch(e){ break; }    // network fail -> stop, keep the rest for retry
        var cur=outbox(); cur.shift(); setOutbox(cur); // remove only the item we just sent (FIFO)
      }
    } finally { flushing=false; }
  }
  function enqueue(p){ var q=outbox(); q.push(p); setOutbox(q); flush(); }
  window.addEventListener("online", flush);

  /* build a payload pre-filled with the saved player identity */
  function base(extra){
    var pr = profile() || {}, br = brands();
    var o = { token: CFG.secretToken, empId: pr.eid||"", name: pr.name||"", market: pr.market||"",
      lang: lang(), clientTime: nowISO() };
    if(extra) for(var k in extra) o[k] = extra[k];
    if(extra && extra.world && br[extra.world]) o.brand = br[extra.world];   // brand for that division
    return o;
  }

  /* mirror best score into shared progress so the hub shows the level done */
  function writeProgress(world, levelId, res){
    try{
      var p = load("cxhub_progress", {}), key = world + ":" + levelId, prev = p[key];
      if(!prev || (res.score||0) > (prev.score||0))
        p[key] = { stars: res.stars||0, score: res.score||0, date: nowISO() };
      save("cxhub_progress", p);
    }catch(e){}
  }

  /* Pull this player's results from the Sheet and REBUILD cxhub_progress from them.
     Authoritative: the Sheet is the source of truth, so a row deleted there resets
     the level locally. Runs flush() first so a just-finished level is sent before we
     read back. Only overwrites local progress when the read succeeds. */
  function hydrate(){
    var pr=profile();
    if(!CFG.scriptUrl || !pr || !pr.eid) return Promise.resolve({read:false, known:true, changed:false});
    var hadPending = outbox().length > 0;   // if we had queued writes, a "not found" read may just be lag
    return flush().then(function(){
      return new Promise(function(res){ setTimeout(res, 1000); });   // let the write settle
    }).then(function(){
      var url=CFG.scriptUrl+"?token="+encodeURIComponent(CFG.secretToken)+"&action=results&empId="+encodeURIComponent(pr.eid);
      return read(url, 15000).then(function(d){
        if(!d || !Array.isArray(d.results)) return {read:false, known:true, changed:false};   // read failed -> keep local
        if(d.known===false){
          if(hadPending) return {read:false, known:true, changed:false};                      // inconclusive (writes settling) -> keep local
          return {read:true, known:false, changed:false};                                     // confirmed deleted -> sign out
        }
        var rebuilt={};
        d.results.forEach(function(row){
          var world=row.World||row.world, lid=row.LevelID||row.levelId;
          if(!world || !lid) return;
          var score=parseInt(row.Score!=null?row.Score:row.score,10)||0;
          var stars=parseInt(row.Stars!=null?row.Stars:row.stars,10)||0;
          var key=world+":"+lid, prev=rebuilt[key];
          if(!prev || score>prev.score) rebuilt[key]={stars:stars, score:score, date:row.Timestamp||row.ClientTime||new Date().toISOString()};
        });
        save("cxhub_progress", rebuilt);   // authoritative replace
        return {read:true, known:true, changed:true};
      });
    }).catch(function(){ return {read:false, known:true, changed:false}; });
  }

  /* Roster lookup for the entry screen. Resolves {found,name,brand,market}; never rejects.
     Apps Script queues executions, so the first call after idle can be slow: generous
     timeout, then ONE automatic retry before we tell the user to type it in themselves. */
  var lkMemo={};
  function lookup(empId){
    if(!CFG.scriptUrl || !empId) return Promise.resolve({found:false});
    var id=String(empId).replace(/\D/g,"").replace(/^0+/,"");
    if(lkMemo[id]) return Promise.resolve(lkMemo[id]);               // same ID again -> no network
    var url=CFG.scriptUrl+"?token="+encodeURIComponent(CFG.secretToken)+"&action=lookup&empId="+encodeURIComponent(id);
    return read(url, 15000).then(function(d){
      if(d && typeof d==="object"){ lkMemo[id]=d; return d; }
      return read(url, 15000).then(function(d2){                     // retry once (cold container / flaky wifi)
        if(d2 && typeof d2==="object"){ lkMemo[id]=d2; return d2; }
        return {found:false, failed:true, blocked:NET.cspBlocked};   // not memoised, so retyping retries
      });
    });
  }
  /* Wake the Apps Script container so the first real lookup isn't stuck behind a ~5s cold start. */
  function warm(){
    if(!CFG.scriptUrl) return;
    try{ read(CFG.scriptUrl+"?token="+encodeURIComponent(CFG.secretToken)+"&action=warm", 12000); }catch(e){}
  }

  window.CXHubSync = {
    lookup: lookup,
    warm: warm,
    hydrate: hydrate,
    config: CFG,
    net: NET,                 // {mode:"fetch"|"jsonp", cspBlocked, lastUrl, lastError} — for CXHub.testLookup()
    read: read,               // raw read helper (fetch -> JSONP), exposed for diagnostics

    /* returns the saved player, so a game never has to re-ask */
    getProfile: function(){
      var pr = profile() || {}, br = brands();
      return { eid: pr.eid||"", name: pr.name||"", gender: pr.gender||"", character: pr.character||"", brands: br };
    },
    hasProfile: function(){ return !!profile(); },

    /* hub calls this at onboarding to log the roster */
    register: function(division){
      if(!profile()) return;
      enqueue(base({ action:"register", division: division||"", world: division||"" }));
    },

    /* a game calls this when the player finishes.
       res = { score:0-100, stars:0-3, passed:bool, attempt:int, durationSec:int, meta:{} } */
    saveResult: function(world, levelId, res){
      res = res || {};
      writeProgress(world, levelId, res);
      enqueue(base({ action:"submit", world: world, division: world, levelId: levelId,
        score: res.score||0, stars: res.stars||0, passed: res.passed ? "YES" : "NO",
        attempt: res.attempt||1, durationSec: res.durationSec||"", meta: res.meta||null }));
    },

    sendFeedback: function(world, levelId, rating, comment){
      enqueue(base({ action:"feedback", world: world, division: world, levelId: levelId,
        rating: rating||"", comment: comment||"" }));
    },

    flush: flush
  };

  /* drain anything queued while offline or before the live URL was set */
  if(document.readyState==="complete") flush();
  else window.addEventListener("load", flush);
})();

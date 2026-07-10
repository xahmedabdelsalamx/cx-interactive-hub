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
  function post(p){
    return fetch(CFG.scriptUrl, { method:"POST",
      headers:{ "Content-Type":"text/plain;charset=utf-8" },  // text/plain avoids a CORS preflight
      body: JSON.stringify(p) }).then(function(r){ return r.json(); });
  }
  async function flush(){
    if(!CFG.scriptUrl) return;                    // preview / not deployed -> local only
    if(navigator.onLine === false) return;
    var q = outbox(); if(!q.length) return;
    var rest = [];
    for(var i=0;i<q.length;i++){ try{ await post(q[i]); }catch(e){ rest.push(q[i]); } }
    setOutbox(rest);
  }
  function enqueue(p){ var q=outbox(); q.push(p); setOutbox(q); flush(); }
  window.addEventListener("online", flush);

  /* build a payload pre-filled with the saved player identity */
  function base(extra){
    var pr = profile() || {}, br = brands();
    var o = { token: CFG.secretToken, empId: pr.eid||"", name: pr.name||"",
      gender: pr.gender||"", character: pr.character||"", lang: lang(), clientTime: nowISO() };
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

  window.CXHubSync = {
    config: CFG,

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

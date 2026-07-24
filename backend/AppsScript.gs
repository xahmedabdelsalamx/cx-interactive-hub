/* ============================================================================
   CX INTERACTIVE HUB · CENTRAL BACKEND (Google Apps Script)
   ----------------------------------------------------------------------------
   Brand-new, standalone. NOT connected to the AURA Pass or KSA scripts.
   One web app + one Google Sheet for the WHOLE hub: player roster + every
   game result + feedback.

   SETUP (once):
   1. Create a NEW Google Sheet.
   2. Extensions > Apps Script. Delete the sample and paste this whole file.
   3. Change SECRET_TOKEN below (any string). Use the SAME value in
      assets/js/cxhub-sync.js (CXHUB_SYNC.secretToken).
   4. Run setup() once (creates the 3 tabs + headers). Authorise when asked.
   5. Deploy > New deployment > type "Web app":
         Execute as: Me     |     Who has access: Anyone
   6. Copy the /exec URL into assets/js/cxhub-sync.js (CXHUB_SYNC.scriptUrl).

   Three tabs:
     Profiles  – one row per employee (auto-updates on register/submit)
     Results   – one row per completed level attempt (every game appends here)
     Feedback  – optional ratings/comments
   ============================================================================ */

var SECRET_TOKEN = "cxinteractivehub2030";   // matches scriptUrl/secretToken in cxhub-sync.js
var API_VERSION  = "2026-07-24";             // returned by doGet as "v" so the site can prove what's deployed

/* Employee IDs arrive from several places — typed at the gate, read back from a saved profile,
   stored by Sheets as a number, sometimes with a leading zero or a stray space. Compare them
   normalised everywhere, or a row that plainly exists simply never matches. */
function normId(x){ return String(x==null?"":x).replace(/\D/g,"").replace(/^0+/,""); }
function sameId(a,b){ var A=normId(a); return A!=="" && A===normId(b); }

var PROFILE_HEADERS  = ["Timestamp","EmpID","Name","Market","Brand","Division","Lang","ClientTime"];
var RESULT_HEADERS   = ["Timestamp","EmpID","Name","Market","Brand","Division","World","LevelID","Score","Stars","Passed","Attempt","DurationSec","Lang","ClientTime","Meta"];
var FEEDBACK_HEADERS = ["Timestamp","EmpID","Name","Market","Brand","Division","World","LevelID","Rating","Comment","Lang","ClientTime"];

var ROSTER_HEADERS   = ["EmpID","Name","Brand","Market"];

function setup(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureTab(ss, "Profiles", PROFILE_HEADERS);
  ensureTab(ss, "Results",  RESULT_HEADERS);
  ensureTab(ss, "Feedback", FEEDBACK_HEADERS);
  ensureTab(ss, "Roster",   ROSTER_HEADERS);   // optional sign-in convenience; paste the extract here
}

function ensureTab(ss, name, headers){
  var sh = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sh.getLastRow() === 0){
    sh.appendRow(headers);
    sh.getRange(1,1,1,headers.length).setFontWeight("bold");
    sh.setFrozenRows(1);
  }
  return sh;
}

/* ---------- doGet: health check + (optional) fetch a player's results ---------- */
function doGet(e){
  var p = e.parameter || {};
  var cb = p.callback;
  function out(obj){
    if (obj && typeof obj === "object") obj.v = API_VERSION;    // lets the site detect an old deployment
    if (cb) return ContentService.createTextOutput(cb + "(" + JSON.stringify(obj) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
    return json(obj);
  }
  if (p.token !== SECRET_TOKEN) return out({ error: "bad token" });
  if (p.action === "warm") return out({ ok: true });                          // wakes the container, no work
  if (p.action === "rosterinfo") return out(rosterInfo());                    // diagnostic
  if (p.action === "lookup" && p.empId) return out(rosterLookup(p.empId));
  if (p.action === "results" && p.empId) return out({ known: profileExists(p.empId), results: getResults(p.empId) });
  return out({ ok: true });
}

/* ---------- doPost: register profile | submit result | feedback ---------- */
function doPost(e){
  var d;
  try { d = JSON.parse(e.postData.contents); } catch(err){ return json({ ok:false, error:"bad json" }); }
  if (d.token !== SECRET_TOKEN) return json({ ok:false, error:"bad token" });

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var now = new Date();

  if (d.action === "register"){
    upsertProfile(ss, d, now);
    return json({ ok:true });
  }

  if (d.action === "feedback"){
    ensureTab(ss, "Feedback", FEEDBACK_HEADERS).appendRow([
      now, d.empId||"", d.name||"", d.market||"", d.brand||"", d.division||"", d.world||"", d.levelId||"",
      d.rating||"", d.comment||"", d.lang||"", d.clientTime||""
    ]);
    return json({ ok:true });
  }

  /* default: submit a result */
  var attempt = attemptNumber(ss, d.empId, d.world, d.levelId);
  ensureTab(ss, "Results", RESULT_HEADERS).appendRow([
    now, d.empId||"", d.name||"", d.market||"", d.brand||"", d.division||"", d.world||"", d.levelId||"",
    num(d.score), num(d.stars), d.passed||"", attempt, num(d.durationSec),
    d.lang||"", d.clientTime||"", d.meta ? JSON.stringify(d.meta) : ""
  ]);
  upsertProfile(ss, d, now);   // keep roster complete even if register was missed
  return json({ ok:true });
}

/* keep one row per EmpID in Profiles (update in place, else append) */
function upsertProfile(ss, d, now){
  if (!d.empId) return;
  var sh = ensureTab(ss, "Profiles", PROFILE_HEADERS);
  var idCol = PROFILE_HEADERS.indexOf("EmpID");
  var last = sh.getLastRow();
  var matches = [];
  if (last > 1){
    var ids = sh.getRange(2, idCol+1, last-1, 1).getValues();
    for (var i=0; i<ids.length; i++){ if (sameId(ids[i][0], d.empId)) matches.push(i+2); }
  }
  var vals = [now, d.empId||"", d.name||"", d.market||"", d.brand||"", d.division||"", d.lang||"", d.clientTime||""];
  if (matches.length){
    sh.getRange(matches[0], 1, 1, vals.length).setValues([vals]);          // update the first
    for (var j=matches.length-1; j>=1; j--){ sh.deleteRow(matches[j]); }   // remove any duplicates (bottom-up)
  } else {
    sh.appendRow(vals);
  }
}

function attemptNumber(ss, empId, world, levelId){
  var sh = ss.getSheetByName("Results");
  if (!sh || sh.getLastRow() < 2) return 1;
  var ei = RESULT_HEADERS.indexOf("EmpID"), wi = RESULT_HEADERS.indexOf("World"), li = RESULT_HEADERS.indexOf("LevelID");
  var rows = sh.getRange(2, 1, sh.getLastRow()-1, RESULT_HEADERS.length).getValues();
  var n = 0;
  for (var i=0; i<rows.length; i++){
    if (sameId(rows[i][ei], empId) && String(rows[i][wi])===String(world) && String(rows[i][li])===String(levelId)) n++;
  }
  return n + 1;
}

/* ---- Roster lookup (optional Roster tab: EmpID | Name | Brand | Market) ----
   A miss is never an error — the player just fills the form in themselves. */
function normId_(v){
  var s = String(v == null ? "" : v).trim();
  if (s.indexOf(".") > -1 && !isNaN(Number(s))) s = String(parseInt(Number(s), 10));
  return s.replace(/\D/g, "").replace(/^0+/, "");
}
function rosterLookup(empId){
  var q = normId_(empId);
  if (!q) return { found: false };
  var cache = CacheService.getScriptCache(), key = "rl_" + q;
  try { var hit = cache.get(key); if (hit) return JSON.parse(hit); } catch (e) {}

  var t0 = new Date().getTime(), out = { found: false }, row = 0;
  try {
    var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Roster");
    if (sh && sh.getLastRow() > 1){
      var last = sh.getLastRow(), col = sh.getRange(2, 1, last-1, 1);

      // FAST PATH: native search, no 30k-row read into JavaScript
      var f = col.createTextFinder(q).matchEntireCell(true).matchCase(false).findNext();
      if (f) row = f.getRow();

      // FALLBACK: only if the fast path missed (e.g. IDs stored with stray formatting)
      if (!row){
        var ids = col.getValues();
        for (var i = 0; i < ids.length; i++){ if (normId_(ids[i][0]) === q){ row = i+2; break; } }
      }
      if (row){
        var r = sh.getRange(row, 1, 1, 4).getValues()[0];
        out = { found:true, name:String(r[1]||"").trim(), brand:String(r[2]||"").trim(), market:String(r[3]||"").trim() };
      }
    }
  } catch (e) { return { found:false }; }                                   // never block sign-in

  out.ms = new Date().getTime() - t0;
  // cache hits for 6h; cache misses only 10min so a newly-added roster row appears quickly
  try { cache.put(key, JSON.stringify(out), out.found ? 21600 : 600); } catch (e) {}
  return out;
}

/* Diagnostic: ...?token=…&action=rosterinfo — confirms the tab is readable and how fast it is. */
function rosterInfo(){
  var t0 = new Date().getTime();
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Roster");
  if (!sh) return { ok:false, error:"No tab named 'Roster'" };
  var last = sh.getLastRow();
  var head = last ? sh.getRange(1, 1, 1, 4).getValues()[0] : [];
  var sample = last > 1 ? String(sh.getRange(2, 1).getValue()) : "";
  return { ok:true, rows:Math.max(0, last-1), headers:head, firstId:sample, ms:new Date().getTime()-t0 };
}

function profileExists(empId){
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Profiles");
  if (!sh || sh.getLastRow() < 2) return false;
  var idCol = PROFILE_HEADERS.indexOf("EmpID");
  var ids = sh.getRange(2, idCol+1, sh.getLastRow()-1, 1).getValues();
  for (var i=0; i<ids.length; i++){ if (sameId(ids[i][0], empId)) return true; }
  return false;
}

function getResults(empId){
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Results");
  if (!sh || sh.getLastRow() < 2) return [];
  var rows = sh.getRange(2, 1, sh.getLastRow()-1, RESULT_HEADERS.length).getValues();
  var ei = RESULT_HEADERS.indexOf("EmpID");
  var out = [];
  for (var i=0; i<rows.length; i++){
    if (sameId(rows[i][ei], empId)){
      var o = {}; for (var c=0; c<RESULT_HEADERS.length; c++) o[RESULT_HEADERS[c]] = rows[i][c];
      out.push(o);
    }
  }
  return out;
}

function num(v){ return (v==null || v==="") ? "" : v; }
function json(o){ return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

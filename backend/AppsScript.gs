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

var PROFILE_HEADERS  = ["Timestamp","EmpID","Name","Market","Brand","Division","Lang","ClientTime"];
var RESULT_HEADERS   = ["Timestamp","EmpID","Name","Market","Brand","Division","World","LevelID","Score","Stars","Passed","Attempt","DurationSec","Lang","ClientTime","Meta"];
var FEEDBACK_HEADERS = ["Timestamp","EmpID","Name","Market","Brand","Division","World","LevelID","Rating","Comment","Lang","ClientTime"];

function setup(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureTab(ss, "Profiles", PROFILE_HEADERS);
  ensureTab(ss, "Results",  RESULT_HEADERS);
  ensureTab(ss, "Feedback", FEEDBACK_HEADERS);
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
  if (p.token !== SECRET_TOKEN) return json({ error: "bad token" });
  if (p.action === "results" && p.empId) return json({ results: getResults(p.empId) });
  return json({ ok: true });
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
  ensureTab(ss, "Results", RESULT_HEADERS).appendRow([
    now, d.empId||"", d.name||"", d.market||"", d.brand||"", d.division||"", d.world||"", d.levelId||"",
    num(d.score), num(d.stars), d.passed||"", num(d.attempt), num(d.durationSec),
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
  var row = null;
  if (last > 1){
    var ids = sh.getRange(2, idCol+1, last-1, 1).getValues();
    for (var i=0; i<ids.length; i++){ if (String(ids[i][0]) === String(d.empId)){ row = i+2; break; } }
  }
  var vals = [now, d.empId||"", d.name||"", d.market||"", d.brand||"", d.division||"", d.lang||"", d.clientTime||""];
  if (row) sh.getRange(row, 1, 1, vals.length).setValues([vals]);
  else     sh.appendRow(vals);
}

function getResults(empId){
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Results");
  if (!sh || sh.getLastRow() < 2) return [];
  var rows = sh.getRange(2, 1, sh.getLastRow()-1, RESULT_HEADERS.length).getValues();
  var ei = RESULT_HEADERS.indexOf("EmpID");
  var out = [];
  for (var i=0; i<rows.length; i++){
    if (String(rows[i][ei]) === String(empId)){
      var o = {}; for (var c=0; c<RESULT_HEADERS.length; c++) o[RESULT_HEADERS[c]] = rows[i][c];
      out.push(o);
    }
  }
  return out;
}

function num(v){ return (v==null || v==="") ? "" : v; }
function json(o){ return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

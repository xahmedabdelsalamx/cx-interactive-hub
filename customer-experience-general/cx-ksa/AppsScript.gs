/* ============================================================
   KSA NEW-HIRE GAMIFICATION · GOOGLE APPS SCRIPT BACKEND
   ------------------------------------------------------------
   One web app for ALL divisions (retail / hospitality / starbucks).
   Stores scores + feedback in two tabs.

   SETUP (once):
   1. Create a Google Sheet. Extensions ▸ Apps Script. Paste this.
   2. Set SECRET_TOKEN below to match CONFIG.secretToken in config/shared.js.
   3. Run setup() once (creates the two tabs + headers).
   4. Deploy ▸ New deployment ▸ Web app:
        Execute as: Me   |   Who has access: Anyone
   5. Copy the /exec URL into CONFIG.scriptUrl in config/shared.js.
   ============================================================ */

var SECRET_TOKEN = "CXHUBKSA";

var SCORE_HEADERS = ["Timestamp","Division","Brand","EmpID","Name","Character",
  "Round1%","Round2%","Round3%","Round4%","Total%","Passed","Lang","ClientTime"];
var FB_HEADERS = ["Timestamp","Division","Brand","EmpID","Name","Rating","Comment","Lang","ClientTime"];

function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureTab(ss, "Scores", SCORE_HEADERS);
  ensureTab(ss, "Feedback", FB_HEADERS);
}

function ensureTab(ss, name, headers) {
  var sh = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sh.getLastRow() === 0) {
    sh.appendRow(headers);
    sh.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sh.setFrozenRows(1);
  }
  return sh;
}

/* ---------- doGet: pass-once certification check ---------- */
function doGet(e) {
  var p = e.parameter || {};
  if (p.token !== SECRET_TOKEN) return json({ error: "bad token" });
  if (p.action === "check") {
    var passed = hasPassed(p.empId);
    return json({ passed: passed });
  }
  return json({ ok: true });
}

function hasPassed(empId) {
  if (!empId) return false;
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Scores");
  if (!sh || sh.getLastRow() < 2) return false;
  var rows = sh.getRange(2, 1, sh.getLastRow() - 1, SCORE_HEADERS.length).getValues();
  var idEmp = SCORE_HEADERS.indexOf("EmpID");
  var idPass = SCORE_HEADERS.indexOf("Passed");
  for (var i = 0; i < rows.length; i++) {
    if (String(rows[i][idEmp]) === String(empId) && String(rows[i][idPass]).toLowerCase() === "yes") return true;
  }
  return false;
}

/* ---------- doPost: store score or feedback ---------- */
function doPost(e) {
  var d;
  try { d = JSON.parse(e.postData.contents); } catch (err) { return json({ ok: false, error: "bad json" }); }
  if (d.token !== SECRET_TOKEN) return json({ ok: false, error: "bad token" });

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var now = new Date();

  if (d.action === "feedback") {
    ensureTab(ss, "Feedback", FB_HEADERS).appendRow([
      now, d.division || "", d.brand || "", d.empId || "", d.name || "",
      d.rating || "", d.comment || "", d.lang || "", d.clientTime || ""
    ]);
    return json({ ok: true });
  }

  // default: score
  var s = d.scores || [];
  ensureTab(ss, "Scores", SCORE_HEADERS).appendRow([
    now, d.division || "", d.brand || "", d.empId || "", d.name || "", d.character || "",
    num(s[0]), num(s[1]), num(s[2]), num(s[3]),
    d.total != null ? d.total : "", d.passed || "", d.lang || "", d.clientTime || ""
  ]);
  return json({ ok: true });
}

function num(v) { return v == null ? "" : v; }

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ============================================================
   ART SERIES: KSA READY · GOOGLE APPS SCRIPT BACKEND
   ------------------------------------------------------------
   PRIVACY BY DESIGN
     This sheet stores ONLY what the player types into the game:
       Employee ID · Name · Brand · Division · Gender · scores · feedback
     It holds NO company active list, NO line managers, NO job titles,
     NO store roster, NO HR export of any kind.

     Completion against the company active list is produced OFFLINE by
     completion-report.html, which runs entirely in your browser on your own
     machine. The roster never touches Google Drive.

   TABS
     Scores    one row per attempt   (written by the game)
     Feedback  stars + comment       (written by the game)
     Summary   play-based rollup     (live formulas)
     _Agg      hidden, one row per player with their best score

   SETUP (once)
   1. Google Sheet > Extensions > Apps Script. Paste this file. Save.
   2. Run setup().
   3. Deploy > New deployment > Web app.
        Execute as: Me      Who has access: Anyone
   4. Copy the /exec URL into CONFIG.scriptUrl in config/shared.js.
      (dashboard.html and completion-report.html read it from there.)
   ============================================================ */

var SECRET_TOKEN = "CXHUBKSA";

/* Leave EMPTY if this script lives inside the spreadsheet (Extensions > Apps Script).
   If you created it as a standalone script instead, paste the spreadsheet ID here —
   it is the long code in the sheet URL between /d/ and /edit. */
var SHEET_ID = "";
var PASS_MARK    = 80;        // must match the game

var T_SCORES = "Scores", T_FB = "Feedback", T_SUM = "Summary", T_AGG = "_Agg",
    T_ROSTER = "Roster";

/* OPTIONAL lookup roster. Paste ONLY these columns — nothing else.
   You choose how much to include:
     EmpID | Brand | Market            -> brand auto-selects, player types their name
     EmpID | Name  | Brand | Market    -> name also prefills (still personal data, your call)
   Leave the tab empty and the game simply asks for everything, as before. */
var ROSTER_HEADERS = ["EmpID", "Name", "Brand", "Market"];

var SCORE_HEADERS = ["Timestamp","Division","Brand","EmpID","Name","Gender","Character",
  "Round1%","Round2%","Round3%","Round4%","Bonus%","Energy","Total%","Passed","Lang","ClientTime","BrandCode"];
var FB_HEADERS = ["Timestamp","Division","Brand","EmpID","Name","Rating","Comment","Lang","ClientTime","BrandCode"];

var WORLDS = ["retail", "hospitality", "starbucks"];

/* ================= CONTEXT-SAFE HELPERS =================
   getUi() and getActiveSpreadsheet() only exist when the script is bound to a
   spreadsheet AND run from a UI context. These wrappers make every function
   work from the editor, from a trigger, or as a standalone script, so a
   cosmetic popup can never abort real work. */
function ss_() {
  var ss = null;
  if (SHEET_ID) {
    ss = SpreadsheetApp.openById(SHEET_ID);
  } else {
    try { ss = SpreadsheetApp.getActiveSpreadsheet(); } catch (e) { ss = null; }
  }
  if (!ss) {
    throw new Error(
      "No spreadsheet found. Either put this script inside the sheet " +
      "(open the sheet > Extensions > Apps Script), or set SHEET_ID at the top of this file " +
      "to the ID in your sheet URL."
    );
  }
  return ss;
}

/* Shows a popup when a UI is available, otherwise writes to the execution log.
   Never throws. */
function say_(msg) {
  try { SpreadsheetApp.getUi().alert(msg); }
  catch (e) { Logger.log(msg); }
}

/* ================= SETUP ================= */
function setup() {
  var ss = ss_();
  ensureTab_(ss, T_SCORES, SCORE_HEADERS);
  ensureTab_(ss, T_FB, FB_HEADERS);
  var ros = ensureTab_(ss, T_ROSTER, ROSTER_HEADERS);
  if (ros.getLastRow() <= 1) {
    ros.getRange("F1").setValue(
      "OPTIONAL. Paste EmpID / Name / Brand / Market here to speed up sign-in. " +
      "Include only these columns, KSA rows only. Leave Name out if you prefer to hold no names. " +
      "Leave the whole tab empty and the game just asks the player for everything."
    ).setFontColor("#888888");
  }
  buildReports();
  say_(
    "Setup complete.\n\n" +
    "This sheet stores game results only. No company active list is needed here.\n\n" +
    "Next: Deploy > New deployment > Web app (Execute as: Me, Access: Anyone), " +
    "then paste the /exec URL into CONFIG.scriptUrl in config/shared.js."
  );
}

function ensureTab_(ss, name, headers) {
  var sh = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sh.getLastRow() === 0) {
    sh.appendRow(headers);
    sh.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f1f3f4");
    sh.setFrozenRows(1);
  }
  return sh;
}

function buildReports() {
  var ss = ss_();

  /* one row per player: EmpID | best% | last played | attempts */
  var agg = ss.getSheetByName(T_AGG) || ss.insertSheet(T_AGG);
  agg.clear();
  agg.getRange("A1").setFormula(
    '=IFERROR(QUERY(' + T_SCORES + '!A2:Q,' +
    '"select D, max(N), max(A), count(D) where D is not null group by D ' +
    'label D \'\', max(N) \'\', max(A) \'\', count(D) \'\'",0),)'
  );
  agg.hideSheet();

  var sum = ss.getSheetByName(T_SUM) || ss.insertSheet(T_SUM);
  sum.clear();
  sum.getRange("A1").setValue("Art Series: KSA Ready — play summary")
     .setFontWeight("bold").setFontSize(13);
  sum.getRange("A2").setValue(
    "Game results only. Completion against the company active list is produced offline in completion-report.html."
  ).setFontColor("#888888");

  sum.getRange(4, 1, 1, 5).setValues([[
    "Art division","Unique players","Attempts","Passed (unique)","Avg attempts"
  ]]).setFontWeight("bold").setBackground("#f1f3f4");
  sum.getRange(5, 1, 3, 1).setValues([["retail"], ["hospitality"], ["starbucks"]]);

  for (var r = 5; r <= 7; r++) {
    sum.getRange(r, 2).setFormula('=IFERROR(COUNTUNIQUEIFS(' + T_SCORES + '!$D$2:$D,' + T_SCORES + '!$B$2:$B,$A' + r + ',' + T_SCORES + '!$D$2:$D,"<>"),0)');
    sum.getRange(r, 3).setFormula('=COUNTIFS(' + T_SCORES + '!$B$2:$B,$A' + r + ')');
    sum.getRange(r, 4).setFormula('=IFERROR(COUNTUNIQUEIFS(' + T_SCORES + '!$D$2:$D,' + T_SCORES + '!$B$2:$B,$A' + r + ',' + T_SCORES + '!$O$2:$O,"Yes",' + T_SCORES + '!$D$2:$D,"<>"),0)');
    sum.getRange(r, 5).setFormula('=IFERROR(C' + r + '/B' + r + ',0)').setNumberFormat("0.00");
  }
  sum.getRange("A8").setValue("TOTAL").setFontWeight("bold");
  sum.getRange("B8").setFormula('=IFERROR(COUNTUNIQUEIFS(' + T_SCORES + '!$D$2:$D,' + T_SCORES + '!$D$2:$D,"<>"),0)').setFontWeight("bold");
  sum.getRange("C8").setFormula("=SUM(C5:C7)").setFontWeight("bold");
  sum.getRange("D8").setFormula("=SUM(D5:D7)").setFontWeight("bold");
  sum.getRange("E8").setFormula("=IFERROR(C8/B8,0)").setFontWeight("bold").setNumberFormat("0.00");

  sum.getRange("A10").setValue("Average score per round").setFontWeight("bold").setBackground("#e8f0fe");
  var labels = [["Round 1", "H"], ["Round 2", "I"], ["Round 3", "J"], ["Round 4", "K"], ["Bonus", "L"]];
  for (var i = 0; i < labels.length; i++) {
    sum.getRange(11 + i, 1).setValue(labels[i][0]);
    sum.getRange(11 + i, 2).setFormula('=IFERROR(ROUND(AVERAGE(' + T_SCORES + '!' + labels[i][1] + '2:' + labels[i][1] + ')),0)');
  }

  sum.getRange("A17").setValue("Feedback").setFontWeight("bold").setBackground("#fef7e0");
  sum.getRange("A18").setValue("Responses");
  sum.getRange("B18").setFormula('=COUNTA(' + T_FB + '!A2:A)');
  sum.getRange("A19").setValue("Average rating");
  sum.getRange("B19").setFormula('=IFERROR(ROUND(AVERAGE(' + T_FB + '!F2:F),2),0)');
  sum.setColumnWidth(1, 190);
}

function onOpen() {
  try {
    SpreadsheetApp.getUi().createMenu("KSA Game")
      .addItem("Setup (first time)", "setup")
      .addItem("Rebuild summary", "buildReports")
      .addToUi();
  } catch (e) { /* no UI in this context, menu simply isn't added */ }
}

/* ================= WEB APP ================= */
function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.token !== SECRET_TOKEN) return json_({ error: "bad token" });

  if (p.action === "check")   return json_({ passed: hasPassed_(p.empId) });
  if (p.action === "history") return json_(playerHistory_(p.empId));
  if (p.action === "lookup")  return json_(lookupRoster_(p.empId));
  if (p.action === "stats")   return json_(stats_());
  if (p.action === "export")  return json_(exportRows_());   // feeds completion-report.html
  return json_({ ok: true });
}

function doPost(e) {
  var d;
  try { d = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, error: "bad json" }); }
  if (d.token !== SECRET_TOKEN) return json_({ ok: false, error: "bad token" });
  var ss = ss_(), now = new Date();

  if (d.action === "feedback") {
    ensureTab_(ss, T_FB, FB_HEADERS).appendRow([
      now, d.division || "", d.brand || "", d.empId || "", d.name || "",
      num_(d.rating), d.comment || "", d.lang || "", d.clientTime || "", d.brandCode || ""
    ]);
    return json_({ ok: true });
  }
  if (d.action === "score") {
    var s = d.scores || [];
    ensureTab_(ss, T_SCORES, SCORE_HEADERS).appendRow([
      now, d.division || "", d.brand || "", d.empId || "", d.name || "",
      d.gender || "", d.character || "",
      num_(s[0]), num_(s[1]), num_(s[2]), num_(s[3]), num_(d.bonus), num_(d.energy),
      num_(d.total), (String(d.passed).toLowerCase() === "yes" ? "Yes" : "No"),
      d.lang || "", d.clientTime || "", d.brandCode || ""
    ]);
    return json_({ ok: true });
  }
  return json_({ ok: false, error: "unknown action" });
}

/* ================= EXPORT (for the offline completion report) ================= */
/* Returns one compact row per player attempt. This is game data only: the same
   Emp ID / name / brand / score the player typed. completion-report.html pulls
   this and joins it to the active list LOCALLY on your machine. */
function exportRows_() {
  var ss = ss_();
  var sh = ss.getSheetByName(T_SCORES);
  var out = { rows: [], feedback: [], passMark: PASS_MARK, generated: new Date().toISOString() };

  if (sh && sh.getLastRow() > 1) {
    var v = sh.getRange(2, 1, sh.getLastRow() - 1, 17).getValues();
    out.rows = v.map(function (r) {
      return {
        t: (r[0] instanceof Date) ? Utilities.formatDate(r[0], Session.getScriptTimeZone(), "yyyy-MM-dd") : "",
        w: String(r[1] || ""),          // art division
        b: String(r[2] || ""),          // brand
        id: String(r[3] || ""),         // emp id as typed
        n: String(r[4] || ""),          // name as typed
        s: Number(r[13]) || 0,          // total %
        p: String(r[14]) === "Yes" ? 1 : 0
      };
    });
  }

  var fb = ss.getSheetByName(T_FB);
  if (fb && fb.getLastRow() > 1) {
    var f = fb.getRange(2, 1, fb.getLastRow() - 1, 9).getValues();
    out.feedback = f.map(function (r) {
      return {
        t: (r[0] instanceof Date) ? Utilities.formatDate(r[0], Session.getScriptTimeZone(), "yyyy-MM-dd") : "",
        w: String(r[1] || ""),          // division
        b: String(r[2] || ""),          // brand
        id: String(r[3] || ""),
        n: String(r[4] || ""),          // name
        r: Number(r[5]) || 0,           // rating
        c: String(r[6] || ""),          // comment
        l: String(r[7] || "")           // lang
      };
    }).reverse();                       // newest first
  }
  return out;
}

/* ================= STATS (live dashboard) ================= */
function stats_() {
  var cache = CacheService.getScriptCache();
  var hit = cache.get("stats");
  if (hit) { try { return JSON.parse(hit); } catch (e) {} }

  var out = {
    generated: new Date().toISOString(), passMark: PASS_MARK,
    totals: { attempts: 0, unique: 0, passed: 0, failed: 0, avgScore: 0, avgAttempts: 0 },
    worlds: {}, rounds: { r1: 0, r2: 0, r3: 0, r4: 0, bonus: 0 },
    brands: [], daily: [], feedback: { count: 0, avg: 0, recent: [] }, lang: { ar: 0, en: 0 }
  };
  WORLDS.forEach(function (w) {
    out.worlds[w] = { attempts: 0, unique: 0, passed: 0, avgScore: 0 };
  });

  var ss = ss_();
  var sh = ss.getSheetByName(T_SCORES);
  if (sh && sh.getLastRow() > 1) {
    var rows = sh.getRange(2, 1, sh.getLastRow() - 1, 17).getValues();
    var byId = {}, brandMap = {}, dayMap = {}, sumTotal = 0;
    var rs = [0,0,0,0,0], rc = [0,0,0,0,0], wTot = {}, wN = {};
    WORLDS.forEach(function (w) { wTot[w] = 0; wN[w] = 0; });

    rows.forEach(function (r) {
      var when = r[0], world = String(r[1]), brand = String(r[2]), id = normId_(r[3]);
      var total = Number(r[13]) || 0, passed = String(r[14]) === "Yes";
      var lang = String(r[15] || "").toLowerCase();
      out.totals.attempts++; sumTotal += total;
      if (lang === "ar") out.lang.ar++; else if (lang === "en") out.lang.en++;
      [7, 8, 9, 10, 11].forEach(function (ci, k) {
        var v2 = Number(r[ci]); if (!isNaN(v2) && r[ci] !== "") { rs[k] += v2; rc[k]++; }
      });
      if (out.worlds[world]) { out.worlds[world].attempts++; wTot[world] += total; wN[world]++; }
      if (brand) {
        brandMap[brand] = brandMap[brand] || { brand: brand, attempts: 0, passed: 0 };
        brandMap[brand].attempts++; if (passed) brandMap[brand].passed++;
      }
      if (when instanceof Date) {
        var d = Utilities.formatDate(when, Session.getScriptTimeZone(), "yyyy-MM-dd");
        dayMap[d] = (dayMap[d] || 0) + 1;
      }
      if (id) {
        if (!byId[id]) byId[id] = { world: world, passed: false, n: 0 };
        byId[id].n++;
        byId[id].passed = byId[id].passed || passed;
        byId[id].world = world;
      }
    });

    Object.keys(byId).forEach(function (id) {
      var p = byId[id];
      out.totals.unique++;
      if (p.passed) out.totals.passed++; else out.totals.failed++;
      if (out.worlds[p.world]) {
        out.worlds[p.world].unique++;
        if (p.passed) out.worlds[p.world].passed++;
      }
    });
    out.totals.avgScore = out.totals.attempts ? Math.round(sumTotal / out.totals.attempts) : 0;
    out.totals.avgAttempts = out.totals.unique ? +(out.totals.attempts / out.totals.unique).toFixed(2) : 0;
    ["r1","r2","r3","r4","bonus"].forEach(function (k, i) {
      out.rounds[k] = rc[i] ? Math.round(rs[i] / rc[i]) : 0;
    });
    WORLDS.forEach(function (w) { out.worlds[w].avgScore = wN[w] ? Math.round(wTot[w] / wN[w]) : 0; });
    out.brands = Object.keys(brandMap).map(function (b) { return brandMap[b]; })
      .sort(function (a, b) { return b.attempts - a.attempts; }).slice(0, 12);
    out.daily = Object.keys(dayMap).sort().slice(-30).map(function (d) { return { d: d, n: dayMap[d] }; });
  }

  var fb = ss.getSheetByName(T_FB);
  if (fb && fb.getLastRow() > 1) {
    var f = fb.getRange(2, 1, fb.getLastRow() - 1, 9).getValues();
    var sumR = 0, nR = 0;
    f.forEach(function (r) {
      var rate = Number(r[5]);
      if (!isNaN(rate) && rate > 0) { sumR += rate; nR++; }
    });
    out.feedback.count = f.length;
    out.feedback.avg = nR ? +(sumR / nR).toFixed(2) : 0;
    // rating distribution, for the 5..1 star bars
    var dist = { 1:0, 2:0, 3:0, 4:0, 5:0 };
    f.forEach(function (r) {
      var v3 = Math.round(Number(r[5]));
      if (v3 >= 1 && v3 <= 5) dist[v3]++;
    });
    out.feedback.dist = dist;
    // send the most recent 120 with comments; the dashboard paginates them
    out.feedback.recent = f.slice(-400).reverse().map(function (r) {
      return {
        division: String(r[1]), brand: String(r[2] || ""),
        rating: Number(r[5]) || 0, comment: String(r[6] || "").slice(0, 240),
        when: (r[0] instanceof Date) ? Utilities.formatDate(r[0], Session.getScriptTimeZone(), "yyyy-MM-dd") : ""
      };
    }).filter(function (x) { return x.comment; }).slice(0, 120);
  }

  cache.put("stats", JSON.stringify(out), 60);
  return out;
}

/* ================= ROSTER LOOKUP (optional convenience) =================
   Reads the small Roster tab so a player only has to type their Emp ID.
   Never blocks: if the tab is empty, or the ID is not there, we just return
   found:false and the player fills the form normally. */
function lookupRoster_(rawId) {
  var id = normId_(rawId);
  if (!id) return { found: false };

  var cache = CacheService.getScriptCache();
  var hit = cache.get("ros_" + id);
  if (hit) { try { return JSON.parse(hit); } catch (e) {} }

  var sh = ss_().getSheetByName(T_ROSTER);
  if (!sh || sh.getLastRow() < 2) return { found: false };

  var v = sh.getRange(2, 1, sh.getLastRow() - 1, 4).getValues();   // A..D
  for (var i = 0; i < v.length; i++) {
    if (normId_(v[i][0]) === id) {
      var rec = {
        found: true,
        name: String(v[i][1] || ""),
        brand: String(v[i][2] || ""),
        market: String(v[i][3] || "")
      };
      cache.put("ros_" + id, JSON.stringify(rec), 900);
      return rec;
    }
  }
  cache.put("ros_" + id, JSON.stringify({ found: false }), 900);
  return { found: false };
}

/* ================= HELPERS ================= */
function normId_(v) {
  if (v === null || v === undefined) return "";
  var s = String(v).trim();
  if (s.indexOf(".") > -1 && !isNaN(Number(s))) s = String(parseInt(Number(s), 10));
  return s.replace(/\D/g, "").replace(/^0+/, "");
}

/* Returning player's history -> "welcome back" panel. Game data only. */
function playerHistory_(empId) {
  var id = normId_(empId);
  if (!id) return { attempts: 0 };
  var sh = ss_().getSheetByName(T_SCORES);
  if (!sh || sh.getLastRow() < 2) return { attempts: 0 };
  var rows = sh.getRange(2, 1, sh.getLastRow() - 1, 15).getValues();
  var attempts = 0, best = -1, lastTotal = null, lastWhen = null, passed = false, lastDiv = "";
  rows.forEach(function (r) {
    if (normId_(r[3]) !== id) return;
    attempts++;
    var total = Number(r[13]) || 0;
    if (total > best) best = total;
    if (String(r[14]).toLowerCase() === "yes") passed = true;
    var when = r[0];
    if (!lastWhen || (when instanceof Date && when > lastWhen)) {
      lastWhen = when; lastTotal = total; lastDiv = String(r[1] || "");
    }
  });
  if (!attempts) return { attempts: 0 };
  return {
    attempts: attempts, best: best < 0 ? 0 : best, last: lastTotal == null ? 0 : lastTotal,
    passed: passed, lastDivision: lastDiv,
    lastPlayed: lastWhen instanceof Date ? Utilities.formatDate(lastWhen, Session.getScriptTimeZone(), "yyyy-MM-dd") : ""
  };
}

function hasPassed_(empId) {
  var id = normId_(empId);
  if (!id) return false;
  var sh = ss_().getSheetByName(T_SCORES);
  if (!sh || sh.getLastRow() < 2) return false;
  var rows = sh.getRange(2, 4, sh.getLastRow() - 1, 12).getValues();
  for (var i = 0; i < rows.length; i++) {
    if (normId_(rows[i][0]) === id && String(rows[i][11]).toLowerCase() === "yes") return true;
  }
  return false;
}

function num_(v) { var n = Number(v); return isNaN(n) ? "" : n; }
function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o))
    .setMimeType(ContentService.MimeType.JSON);
}

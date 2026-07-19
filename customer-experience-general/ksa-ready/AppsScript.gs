/* ============================================================
   KSA NEW-HIRE GAMIFICATION · GOOGLE APPS SCRIPT BACKEND
   ------------------------------------------------------------
   One web app for all three "Art of" divisions:
     retail      = The Art of Selling        (Apparel + Wellness + H&M + Primark)
     hospitality = The Art of Guest Experience (Hospitality Division)
     starbucks   = The Art of Connection      (Starbucks)

   TABS
     Config      market filter + pass mark          (you may edit)
     Map         company Division -> art division   (you may edit)
     ActiveList  your active list, pasted as export (you paste each period)
     Scores      raw results, one row per attempt   (written by the game)
     Feedback    stars + comment                    (written by the game)
     Completion  KSA roster joined to results       (live formulas)
     Summary     TWO views, see below               (live formulas)
     Unmatched   played but not on the list         (live formulas)
     _Agg        hidden helper, one row per player

   SUMMARY HAS TWO VIEWS ON PURPOSE
     A) Against the active list  -> denominator = KSA roster. True completion %.
     B) All players (manual)     -> everyone who played, on the list or not.
     You need both: there is no new-joiner list, so (A) understates completion
     for people not yet on the roster, and (B) never misses anyone.

   LIVE BY DESIGN
     Nothing is frozen. Completion / Summary / Unmatched are formulas joining
     Scores to ActiveList on Employee Number. Paste a new list next period and
     every number recalculates itself. Leavers drop out, brand moves follow.

   NEVER BLOCKS
     A new hire who does not know their Emp ID still plays. Their row is kept
     and shows in Unmatched until a list containing them is pasted, then they
     move into Completion automatically.

   SETUP (once)
   1. Google Sheet > Extensions > Apps Script. Paste this file. Save.
   2. Run setup().
   3. Paste your active list into ActiveList at A1 (columns exactly as exported).
   4. Deploy > New deployment > Web app.
        Execute as: Me      Who has access: Anyone
   5. Copy the /exec URL into CONFIG.scriptUrl in config/shared.js
      AND into dashboard.html (same URL).

   EVERY PERIOD
     Paste the new list over ActiveList, then menu: KSA Game > Refresh.
   ============================================================ */

var SECRET_TOKEN = "CXHUBKSA";
var PASS_MARK    = 80;        // must match the game
var MARKET       = "Saudi";   // KSA only. Change in the Config tab, not here.

var T_SCORES="Scores", T_FB="Feedback", T_LIST="ActiveList", T_COMP="Completion",
    T_SUM="Summary", T_UNM="Unmatched", T_AGG="_Agg", T_CFG="Config", T_MAP="Map";

var SCORE_HEADERS = ["Timestamp","Division","Brand","EmpID","Name","Gender","Character",
  "Round1%","Round2%","Round3%","Round4%","Bonus%","Energy","Total%","Passed","Matched","Lang","ClientTime"];
var FB_HEADERS = ["Timestamp","Division","Brand","EmpID","Name","Rating","Comment","Lang","ClientTime"];
var LIST_HEADERS = ["Payroll Name","Employee Number","Brand","Market","Division",
  "Position","Line Manager Name","Employee Name","Job","Organization","Org Type"];

/* Company Division -> art division. Edit in the Map tab if HR renames anything. */
var DIV_MAP = [
  ["Apparel Division",     "retail"],
  ["Wellness Division",    "retail"],
  ["H & M",                "retail"],
  ["Primark",              "retail"],
  ["Hospitality Division", "hospitality"],
  ["Starbucks",            "starbucks"]
];
var WORLD_LABEL = [
  ["retail",      "The Art of Selling"],
  ["hospitality", "The Art of Guest Experience"],
  ["starbucks",   "The Art of Connection"]
];

/* ================= SETUP ================= */
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureTab_(ss, T_SCORES, SCORE_HEADERS);
  ensureTab_(ss, T_FB, FB_HEADERS);
  ensureTab_(ss, T_LIST, LIST_HEADERS);
  buildConfig_(ss);
  buildMap_(ss);
  buildReports();
  SpreadsheetApp.getUi().alert(
    "Setup complete.\n\n1. Paste your active list into '" + T_LIST + "' (A1).\n" +
    "2. Deploy as Web app, copy the /exec URL into CONFIG.scriptUrl (config/shared.js)\n" +
    "   and into dashboard.html."
  );
}

function buildConfig_(ss) {
  var sh = ss.getSheetByName(T_CFG) || ss.insertSheet(T_CFG);
  if (sh.getLastRow() === 0) {
    sh.getRange("A1:B3").setValues([
      ["Market", MARKET],
      ["Pass mark %", PASS_MARK],
      ["Note", "Market filters the whole report. Use exactly as spelled in the active list (Saudi, UAE, Kuwait...)"]
    ]);
    sh.getRange("A1:A3").setFontWeight("bold");
    sh.getRange("B1:B2").setBackground("#fff3cd").setFontWeight("bold");
    sh.setColumnWidth(1, 130); sh.setColumnWidth(2, 420);
  }
}

function buildMap_(ss) {
  var sh = ss.getSheetByName(T_MAP) || ss.insertSheet(T_MAP);
  if (sh.getLastRow() === 0) {
    sh.getRange(1, 1, 1, 2).setValues([["Company Division", "Art division"]])
      .setFontWeight("bold").setBackground("#f1f3f4");
    sh.getRange(2, 1, DIV_MAP.length, 2).setValues(DIV_MAP);
    sh.getRange(1, 4, 1, 2).setValues([["Art division", "Label"]])
      .setFontWeight("bold").setBackground("#f1f3f4");
    sh.getRange(2, 4, WORLD_LABEL.length, 2).setValues(WORLD_LABEL);
    sh.setColumnWidth(1, 200); sh.setColumnWidth(4, 130); sh.setColumnWidth(5, 220);
    sh.getRange("A10").setValue("If HR renames a division, fix it here. Everything else follows.")
      .setFontColor("#888888");
  }
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

/* ================= REPORT TABS ================= */
function buildReports() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  buildConfig_(ss); buildMap_(ss);

  /* one row per player: EmpID | best% | last played | attempts */
  var agg = ss.getSheetByName(T_AGG) || ss.insertSheet(T_AGG);
  agg.clear();
  agg.getRange("A1").setFormula(
    '=IFERROR(QUERY(' + T_SCORES + '!A2:R,' +
    '"select D, max(N), max(A), count(D) where D is not null group by D ' +
    'label D \'\', max(N) \'\', max(A) \'\', count(D) \'\'",0),)'
  );
  agg.hideSheet();

  /* ---- Completion: KSA roster only, mapped to the 3 art divisions ---- */
  var comp = ss.getSheetByName(T_COMP) || ss.insertSheet(T_COMP);
  comp.clear();
  comp.getRange(1, 1, 1, 14).setValues([[
    "EmpID","Employee Name","Brand","Company Division","Market","Line Manager",
    "Store","Org Type","Art division","Played","Best %","Passed","Attempts","Last Played"
  ]]).setFontWeight("bold").setBackground("#f1f3f4");
  comp.setFrozenRows(1);

  // A:H spill from the active list, filtered to the configured market
  comp.getRange("A2").setFormula(
    '=IFERROR(FILTER({' + T_LIST + '!B2:B,' + T_LIST + '!H2:H,' + T_LIST + '!C2:C,' +
    T_LIST + '!E2:E,' + T_LIST + '!D2:D,' + T_LIST + '!G2:G,' + T_LIST + '!J2:J,' + T_LIST + '!K2:K},' +
    T_LIST + '!B2:B<>"",' + T_LIST + '!D2:D=' + T_CFG + '!$B$1),"")'
  );
  comp.getRange("I2").setFormula('=ARRAYFORMULA(IF(A2:A="","",IFERROR(VLOOKUP(D2:D,' + T_MAP + '!$A$2:$B,2,FALSE),"unmapped")))');
  comp.getRange("J2").setFormula('=ARRAYFORMULA(IF(A2:A="","",IF(COUNTIF(' + T_AGG + '!A:A,A2:A)>0,"Yes","No")))');
  comp.getRange("K2").setFormula('=ARRAYFORMULA(IF(A2:A="","",IFERROR(VLOOKUP(A2:A,' + T_AGG + '!A:D,2,FALSE),"")))');
  comp.getRange("L2").setFormula('=ARRAYFORMULA(IF(A2:A="","",IF(IFERROR(VLOOKUP(A2:A,' + T_AGG + '!A:D,2,FALSE),0)>=' + T_CFG + '!$B$2,"Yes","No")))');
  comp.getRange("M2").setFormula('=ARRAYFORMULA(IF(A2:A="","",IFERROR(VLOOKUP(A2:A,' + T_AGG + '!A:D,4,FALSE),0)))');
  comp.getRange("N2").setFormula('=ARRAYFORMULA(IF(A2:A="","",IFERROR(VLOOKUP(A2:A,' + T_AGG + '!A:D,3,FALSE),"")))');
  comp.setColumnWidth(2, 220); comp.setColumnWidth(7, 260);

  /* ---- Summary: view A (vs active list) + view B (all players) ---- */
  var sum = ss.getSheetByName(T_SUM) || ss.insertSheet(T_SUM);
  sum.clear();
  sum.getRange("A1").setFormula('="Market: "&' + T_CFG + '!B1&"   ·   Pass mark: "&' + T_CFG + '!B2&"%"')
     .setFontWeight("bold").setFontSize(12);
  sum.getRange("A2").setValue("Change the market or pass mark in the Config tab.").setFontColor("#888888");

  sum.getRange("A4").setValue("A) AGAINST THE ACTIVE LIST  (true completion of the roster)")
     .setFontWeight("bold").setBackground("#e8f0fe");
  sum.getRange(5, 1, 1, 6).setValues([[
    "Art division","On active list","Played","Passed","Played %","Passed %"
  ]]).setFontWeight("bold").setBackground("#f1f3f4");
  var worlds = [["retail"],["hospitality"],["starbucks"]];
  sum.getRange(6, 1, 3, 1).setValues(worlds);
  for (var r = 6; r <= 8; r++) {
    sum.getRange(r, 2).setFormula('=COUNTIFS(' + T_COMP + '!$I$2:$I,$A' + r + ')');
    sum.getRange(r, 3).setFormula('=COUNTIFS(' + T_COMP + '!$I$2:$I,$A' + r + ',' + T_COMP + '!$J$2:$J,"Yes")');
    sum.getRange(r, 4).setFormula('=COUNTIFS(' + T_COMP + '!$I$2:$I,$A' + r + ',' + T_COMP + '!$L$2:$L,"Yes")');
    sum.getRange(r, 5).setFormula('=IFERROR(C' + r + '/B' + r + ',0)').setNumberFormat("0.0%");
    sum.getRange(r, 6).setFormula('=IFERROR(D' + r + '/B' + r + ',0)').setNumberFormat("0.0%");
  }
  sum.getRange("A9").setValue("TOTAL").setFontWeight("bold");
  sum.getRange("B9").setFormula("=SUM(B6:B8)").setFontWeight("bold");
  sum.getRange("C9").setFormula("=SUM(C6:C8)").setFontWeight("bold");
  sum.getRange("D9").setFormula("=SUM(D6:D8)").setFontWeight("bold");
  sum.getRange("E9").setFormula("=IFERROR(C9/B9,0)").setFontWeight("bold").setNumberFormat("0.0%");
  sum.getRange("F9").setFormula("=IFERROR(D9/B9,0)").setFontWeight("bold").setNumberFormat("0.0%");

  sum.getRange("A11").setValue("B) ALL PLAYERS  (everyone who played, on the list or not)")
     .setFontWeight("bold").setBackground("#fef7e0");
  sum.getRange(12, 1, 1, 5).setValues([[
    "Art division","Unique players","Attempts","Passed (unique)","Avg attempts"
  ]]).setFontWeight("bold").setBackground("#f1f3f4");
  sum.getRange(13, 1, 3, 1).setValues(worlds);
  for (var r2 = 13; r2 <= 15; r2++) {
    // Unique players = count distinct EmpIDs for this world. COUNTUNIQUEIFS avoids
    // the COUNTA(UNIQUE(FILTER(...))) trap that returns 1 for an empty Scores sheet.
    sum.getRange(r2, 2).setFormula('=IFERROR(COUNTUNIQUEIFS(' + T_SCORES + '!$D$2:$D,' + T_SCORES + '!$B$2:$B,$A' + r2 + ',' + T_SCORES + '!$D$2:$D,"<>"),0)');
    sum.getRange(r2, 3).setFormula('=COUNTIFS(' + T_SCORES + '!$B$2:$B,$A' + r2 + ')');
    sum.getRange(r2, 4).setFormula('=IFERROR(COUNTUNIQUEIFS(' + T_SCORES + '!$D$2:$D,' + T_SCORES + '!$B$2:$B,$A' + r2 + ',' + T_SCORES + '!$O$2:$O,"Yes",' + T_SCORES + '!$D$2:$D,"<>"),0)');
    sum.getRange(r2, 5).setFormula('=IFERROR(C' + r2 + '/B' + r2 + ',0)').setNumberFormat("0.00");
  }
  sum.getRange("A16").setValue("TOTAL").setFontWeight("bold");
  sum.getRange("B16").setFormula("=SUM(B13:B15)").setFontWeight("bold");
  sum.getRange("C16").setFormula("=SUM(C13:C15)").setFontWeight("bold");
  sum.getRange("D16").setFormula("=SUM(D13:D15)").setFontWeight("bold");
  sum.getRange("E16").setFormula("=IFERROR(C16/B16,0)").setFontWeight("bold").setNumberFormat("0.00");
  sum.setColumnWidth(1, 180);

  /* C) BY STORE — ranked, so managers can chase the lagging locations */
  sum.getRange("A18").setValue("C) BY STORE  (completion per location, lowest first)")
     .setFontWeight("bold").setBackground("#e6f4ea");
  sum.getRange(19, 1, 1, 5).setValues([[
    "Store","On active list","Played","Passed","Played %"
  ]]).setFontWeight("bold").setBackground("#f1f3f4");
  sum.getRange("A20").setFormula(
    '=IFERROR(QUERY({' + T_COMP + '!$G$2:$G,' + T_COMP + '!$J$2:$J,' + T_COMP + '!$L$2:$L},' +
    '"select Col1, count(Col1), sum(Col2=\'Yes\'), sum(Col3=\'Yes\') ' +
    'where Col1 is not null and Col1 <> \'\' group by Col1 order by count(Col1) desc ' +
    'label Col1 \'\', count(Col1) \'\', sum(Col2=\'Yes\') \'\', sum(Col3=\'Yes\') \'\'",0),' +
    '"no data yet")'
  );
  // played% column next to the query spill
  sum.getRange("E20").setFormula('=ARRAYFORMULA(IF(A20:A="","",IFERROR(C20:C/B20:B,0)))').setNumberFormat("0.0%");
  sum.setColumnWidth(1, 280);
  sum.getRange("G18").setValue(
    "Tip: click the store table, Data > Create a filter, then sort Played % ascending to see who needs a nudge."
  ).setFontColor("#888888");

  /* ---- Unmatched ---- */
  var unm = ss.getSheetByName(T_UNM) || ss.insertSheet(T_UNM);
  unm.clear();
  unm.getRange(1, 1, 1, 5).setValues([[
    "EmpID typed","Name typed","Art division played","Total %","When"
  ]]).setFontWeight("bold").setBackground("#f1f3f4");
  unm.setFrozenRows(1);
  unm.getRange("A2").setFormula(
    '=IFERROR(FILTER({' + T_SCORES + '!D2:E,' + T_SCORES + '!B2:B,' + T_SCORES + '!N2:N,' + T_SCORES + '!A2:A},' +
    T_SCORES + '!D2:D<>"",COUNTIF(' + T_LIST + '!B:B,' + T_SCORES + '!D2:D)=0),"")'
  );
  unm.getRange("G1").setValue(
    "Played but their Emp ID is not on the active list: new joiners not on it yet, a different market, or a typo. " +
    "Their score is kept. Paste an updated list and any that now match move into Completion automatically."
  ).setFontColor("#888888");
  unm.setColumnWidth(2, 220);
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu("KSA Game")
    .addItem("Setup (first time)", "setup")
    .addItem("Refresh after updating Active List", "refreshAfterListUpdate")
    .addItem("Rebuild report tabs", "buildReports")
    .addToUi();
}

function refreshAfterListUpdate() {
  clearLookupCache();
  SpreadsheetApp.flush();
  SpreadsheetApp.getUi().alert("Done. Completion, Summary, Unmatched and the dashboard now use the new list.");
}

/* ================= WEB APP ================= */
function doGet(e) {
  var p = (e && e.parameter) || {};
  if (p.token !== SECRET_TOKEN) return json_({ error: "bad token" });
  if (p.action === "check")  return json_({ passed: hasPassed_(p.empId) });
  if (p.action === "history") return json_(playerHistory_(p.empId));
  if (p.action === "lookup") {
    var rec = lookupEmp_(p.empId);
    return json_(rec ? { found: true, name: rec.name, brand: rec.brand,
                         division: rec.division, market: rec.market, job: rec.job }
                     : { found: false });
  }
  if (p.action === "stats")  return json_(stats_());     // powers dashboard.html
  return json_({ ok: true });
}

function doPost(e) {
  var d;
  try { d = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false, error: "bad json" }); }
  if (d.token !== SECRET_TOKEN) return json_({ ok: false, error: "bad token" });
  var ss = SpreadsheetApp.getActiveSpreadsheet(), now = new Date();

  if (d.action === "feedback") {
    ensureTab_(ss, T_FB, FB_HEADERS).appendRow([
      now, d.division || "", d.brand || "", d.empId || "", d.name || "",
      num_(d.rating), d.comment || "", d.lang || "", d.clientTime || ""
    ]);
    return json_({ ok: true });
  }
  if (d.action === "score") {
    var s = d.scores || [], rec = lookupEmp_(d.empId);
    ensureTab_(ss, T_SCORES, SCORE_HEADERS).appendRow([
      now, d.division || "", d.brand || "", d.empId || "", d.name || "",
      d.gender || "", d.character || "",
      num_(s[0]), num_(s[1]), num_(s[2]), num_(s[3]), num_(d.bonus), num_(d.energy),
      num_(d.total), (String(d.passed).toLowerCase() === "yes" ? "Yes" : "No"),
      (rec ? "Yes" : "No"), d.lang || "", d.clientTime || ""
    ]);
    return json_({ ok: true, matched: !!rec });
  }
  return json_({ ok: false, error: "unknown action" });
}

/* ================= STATS (for the live dashboard) ================= */
function stats_() {
  var cache = CacheService.getScriptCache();
  var hit = cache.get("stats");
  if (hit) { try { return JSON.parse(hit); } catch (e) {} }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var cfg = ss.getSheetByName(T_CFG);
  var market = cfg ? String(cfg.getRange("B1").getValue() || MARKET) : MARKET;
  var pass = cfg ? Number(cfg.getRange("B2").getValue() || PASS_MARK) : PASS_MARK;

  var out = {
    generated: new Date().toISOString(), market: market, passMark: pass,
    totals: { attempts: 0, unique: 0, passed: 0, failed: 0, avgScore: 0, avgAttempts: 0, matchedPlayers: 0, unmatchedPlayers: 0 },
    worlds: {}, rounds: { r1: 0, r2: 0, r3: 0, r4: 0, bonus: 0 },
    brands: [], daily: [], feedback: { count: 0, avg: 0, recent: [] },
    roster: { total: 0, worlds: {} }, lang: { ar: 0, en: 0 }, stores: []
  };
  var W = ["retail", "hospitality", "starbucks"];
  W.forEach(function (w) {
    out.worlds[w] = { attempts: 0, unique: 0, passed: 0, avgScore: 0, roster: 0, playedRoster: 0, passedRoster: 0 };
    out.roster.worlds[w] = 0;
  });

  /* --- roster + per-store from Completion (already KSA + mapped) --- */
  var comp = ss.getSheetByName(T_COMP);
  var storeMap = {};
  if (comp && comp.getLastRow() > 1) {
    // G store, I art division, J played, L passed
    var cv = comp.getRange(2, 7, comp.getLastRow() - 1, 6).getValues();  // G..L
    cv.forEach(function (r) {
      var store = String(r[0] || ""), w = String(r[2]);
      var played = String(r[3]) === "Yes", passed = String(r[5]) === "Yes";
      if (out.worlds[w]) {
        out.roster.total++; out.roster.worlds[w]++; out.worlds[w].roster++;
        if (played) out.worlds[w].playedRoster++;
        if (passed) out.worlds[w].passedRoster++;
      }
      if (store) {
        if (!storeMap[store]) storeMap[store] = { store: store, world: w, roster: 0, played: 0, passed: 0 };
        storeMap[store].roster++;
        if (played) storeMap[store].played++;
        if (passed) storeMap[store].passed++;
      }
    });
  }
  out.stores = Object.keys(storeMap).map(function (k) {
    var s2 = storeMap[k];
    s2.playedPct = s2.roster ? Math.round(s2.played / s2.roster * 100) : 0;
    return s2;
  }).sort(function (a, b) { return b.roster - a.roster; });

  /* --- scores --- */
  var sh = ss.getSheetByName(T_SCORES);
  if (sh && sh.getLastRow() > 1) {
    var rows = sh.getRange(2, 1, sh.getLastRow() - 1, 18).getValues();
    var byId = {}, brandMap = {}, dayMap = {}, sumTotal = 0, rs = [0, 0, 0, 0, 0], rc = [0, 0, 0, 0, 0];
    rows.forEach(function (r) {
      var when = r[0], world = String(r[1]), brand = String(r[2]), id = normId_(r[3]);
      var total = Number(r[13]) || 0, passed = String(r[14]) === "Yes", matched = String(r[15]) === "Yes";
      var lang = String(r[16] || "").toLowerCase();
      out.totals.attempts++; sumTotal += total;
      if (lang === "ar") out.lang.ar++; else if (lang === "en") out.lang.en++;
      [7, 8, 9, 10, 11].forEach(function (ci, k) {
        var v = Number(r[ci]); if (!isNaN(v) && r[ci] !== "") { rs[k] += v; rc[k]++; }
      });
      if (out.worlds[world]) { out.worlds[world].attempts++; }
      if (brand) brandMap[brand] = brandMap[brand] || { brand: brand, attempts: 0, passed: 0 };
      if (brand) { brandMap[brand].attempts++; if (passed) brandMap[brand].passed++; }
      if (when instanceof Date) {
        var d = Utilities.formatDate(when, Session.getScriptTimeZone(), "yyyy-MM-dd");
        dayMap[d] = (dayMap[d] || 0) + 1;
      }
      if (id) {
        if (!byId[id]) byId[id] = { world: world, best: total, passed: passed, matched: matched, n: 0 };
        byId[id].n++;
        byId[id].best = Math.max(byId[id].best, total);
        byId[id].passed = byId[id].passed || passed;
        byId[id].matched = byId[id].matched || matched;
        byId[id].world = world;
      }
    });

    Object.keys(byId).forEach(function (id) {
      var p = byId[id];
      out.totals.unique++;
      if (p.passed) out.totals.passed++; else out.totals.failed++;
      if (p.matched) out.totals.matchedPlayers++; else out.totals.unmatchedPlayers++;
      if (out.worlds[p.world]) {
        out.worlds[p.world].unique++;
        if (p.passed) out.worlds[p.world].passed++;
      }
    });
    out.totals.avgScore = out.totals.attempts ? Math.round(sumTotal / out.totals.attempts) : 0;
    out.totals.avgAttempts = out.totals.unique ? +(out.totals.attempts / out.totals.unique).toFixed(2) : 0;
    ["r1", "r2", "r3", "r4", "bonus"].forEach(function (k, i) {
      out.rounds[k] = rc[i] ? Math.round(rs[i] / rc[i]) : 0;
    });
    out.brands = Object.keys(brandMap).map(function (b) { return brandMap[b]; })
      .sort(function (a, b) { return b.attempts - a.attempts; }).slice(0, 12);
    out.daily = Object.keys(dayMap).sort().slice(-30).map(function (d) { return { d: d, n: dayMap[d] }; });

    W.forEach(function (w) {
      var tot = 0, n = 0;
      rows.forEach(function (r) { if (String(r[1]) === w) { tot += Number(r[13]) || 0; n++; } });
      out.worlds[w].avgScore = n ? Math.round(tot / n) : 0;
    });
  }

  /* --- feedback --- */
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
    out.feedback.recent = f.slice(-8).reverse().map(function (r) {
      return { division: String(r[1]), rating: Number(r[5]) || 0, comment: String(r[6] || "").slice(0, 160) };
    }).filter(function (x) { return x.comment; });
  }

  cache.put("stats", JSON.stringify(out), 60);   // 1 min
  return out;
}

/* ================= ACTIVE LIST LOOKUP ================= */
function normId_(v) {
  if (v === null || v === undefined) return "";
  var s = String(v).trim();
  if (s.indexOf(".") > -1 && !isNaN(Number(s))) s = String(parseInt(Number(s), 10));
  return s.replace(/\D/g, "").replace(/^0+/, "");
}

function lookupEmp_(rawId) {
  var id = normId_(rawId);
  if (!id) return null;
  var cache = CacheService.getScriptCache();
  var hit = cache.get("emp_" + id);
  if (hit) { try { var o = JSON.parse(hit); return o.found ? o : null; } catch (e) {} }

  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(T_LIST);
  if (!sh || sh.getLastRow() < 2) return null;
  var rows = sh.getRange(2, 2, sh.getLastRow() - 1, 10).getValues();  // B..K
  for (var i = 0; i < rows.length; i++) {
    if (normId_(rows[i][0]) === id) {
      var rec = { found: true, empId: String(rows[i][0]), brand: rows[i][1] || "",
        market: rows[i][2] || "", division: rows[i][3] || "", manager: rows[i][5] || "",
        name: rows[i][6] || "", job: rows[i][7] || "",
        store: rows[i][8] || "", orgType: rows[i][9] || "" };
      cache.put("emp_" + id, JSON.stringify(rec), 600);
      return rec;
    }
  }
  cache.put("emp_" + id, JSON.stringify({ found: false }), 600);
  return null;
}

function clearLookupCache() {
  var c = CacheService.getScriptCache();
  try { c.remove("stats"); } catch (e) {}
  PropertiesService.getScriptProperties().setProperty("listVersion", String(Date.now()));
}

/* ================= HELPERS ================= */
/* Returns a returning player's history: attempts, best score, last score, passed.
   Used to greet them with "welcome back" and show progress. Never blocks. */
function playerHistory_(empId) {
  var id = normId_(empId);
  if (!id) return { attempts: 0 };
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(T_SCORES);
  if (!sh || sh.getLastRow() < 2) return { attempts: 0 };
  var rows = sh.getRange(2, 1, sh.getLastRow() - 1, 15).getValues();  // A..O
  var attempts = 0, best = -1, lastTotal = null, lastWhen = null, passed = false, lastDiv = "";
  rows.forEach(function (r) {
    if (normId_(r[3]) !== id) return;                 // D = EmpID
    attempts++;
    var total = Number(r[13]) || 0;                   // N = Total%
    if (total > best) best = total;
    if (String(r[14]).toLowerCase() === "yes") passed = true;  // O = Passed
    var when = r[0];                                  // A = Timestamp
    if (!lastWhen || (when instanceof Date && when > lastWhen)) {
      lastWhen = when; lastTotal = total; lastDiv = String(r[1] || "");
    }
  });
  if (!attempts) return { attempts: 0 };
  return {
    attempts: attempts,
    best: best < 0 ? 0 : best,
    last: lastTotal == null ? 0 : lastTotal,
    passed: passed,
    lastDivision: lastDiv,
    lastPlayed: lastWhen instanceof Date ? Utilities.formatDate(lastWhen, Session.getScriptTimeZone(), "yyyy-MM-dd") : ""
  };
}

function hasPassed_(empId) {
  var id = normId_(empId);
  if (!id) return false;
  var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(T_SCORES);
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

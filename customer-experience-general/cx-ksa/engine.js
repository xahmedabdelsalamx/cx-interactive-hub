/* ============================================================
   ENGINE · all logic lives here. Divisions are data only.
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- STATE ---------------- */
  var state = {
    lang: (window.CONFIG && CONFIG.defaultLang) || "ar",
    empId: "", name: "", brand: null, world: null,
    division: null, character: null,
    roundIndex: 0, scores: [], certified: false
  };

  /* ---------------- ENGINE UI STRINGS ---------------- */
  var UI = {
    appTitle:   { ar: "تحدّي تجربة العملاء", en: "CX Onboarding Challenge" },
    empLabel:   { ar: "الرقم الوظيفي", en: "Employee ID" },
    nameLabel:  { ar: "الاسم", en: "Name" },
    brandLabel: { ar: "العلامة التجارية", en: "Brand" },
    brandPH:    { ar: "اختر علامتك", en: "Choose your brand" },
    start:      { ar: "ابدأ", en: "Start" },
    enterWorld: { ar: "ادخل عالمك", en: "Enter your world" },
    pickChar:   { ar: "اختر شخصيتك", en: "Choose your character" },
    beginRounds:{ ar: "ابدأ الجولات", en: "Begin the rounds" },
    next:       { ar: "التالي", en: "Next" },
    continue:   { ar: "متابعة", en: "Continue" },
    roundOf:    { ar: "جولة", en: "Round" },
    opportunity:{ ar: "فرصة", en: "Opportunity" },
    notYet:     { ar: "ليس الآن", en: "Not yet" },
    yourScore:  { ar: "نتيجتك", en: "Your score" },
    passed:     { ar: "مبروك! اجتزت التحدّي 🎉", en: "Congratulations! You passed 🎉" },
    failed:     { ar: "قريب! جرّب مرة ثانية", en: "So close! Try again" },
    retry:      { ar: "إعادة المحاولة", en: "Try again" },
    certified:  { ar: "أنت معتمد بالفعل ✅", en: "You're already certified ✅" },
    rateTitle:  { ar: "كيف كانت تجربتك؟", en: "How was your experience?" },
    fbPH:       { ar: "أي ملاحظة تحب تضيفها؟ (اختياري)", en: "Anything you'd add? (optional)" },
    sendFb:     { ar: "إرسال", en: "Submit" },
    thanks:     { ar: "شكراً لك! 🌟", en: "Thank you! 🌟" },
    soon:       { ar: "هذا العالم قيد الإعداد قريباً.", en: "This world is coming soon." }
  };

  /* ---------------- HELPERS ---------------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function L(obj) { if (!obj) return ""; return obj[state.lang] != null ? obj[state.lang] : (obj.en || obj.ar || ""); }
  function u(key) { return L(UI[key]); }

  function showScreen(id) {
    var screens = document.querySelectorAll(".screen");
    for (var i = 0; i < screens.length; i++) screens[i].classList.remove("active");
    var t = document.getElementById(id);
    if (t) { t.classList.add("active"); window.scrollTo(0, 0); }
  }

  /* ---------------- I18N / DIRECTION ---------------- */
  function applyDir() {
    var rtl = state.lang === "ar";
    document.documentElement.lang = state.lang;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
  }
  function setLang(lang) {
    state.lang = lang;
    applyDir();
    rerenderCurrent();
    var lb = $("#langLabel"); if (lb) lb.textContent = state.lang === "ar" ? "EN" : "ع";
  }
  var rerenderCurrent = function () {}; // set per-screen so toggling language redraws

  /* ---------------- MEDIA SLOTS (png / lottie / placeholder) ---------------- */
  function renderMedia(ref, sizeCls) {
    var m = typeof ref === "string" ? (window.MEDIA && MEDIA[ref]) : ref;
    var wrap = el("div", "media-slot");
    var anim = el("div", "media-anim frame " + (sizeCls || "media-md"));
    if (!m || m.type === "placeholder") {
      var ph = el("div", "media-ph");
      ph.appendChild(el("div", "pe", "🖼️"));
      ph.appendChild(el("div", "ps", m ? L(m.label) : "media"));
      anim.appendChild(ph);
    } else if (m.type === "png") {
      var img = el("img", "media-img"); img.src = m.src; img.alt = ""; anim.appendChild(img);
    } else if (m.type === "lottie") {
      var lp = document.createElement("lottie-player");
      lp.className = "media-lottie"; lp.setAttribute("src", m.src);
      lp.setAttribute("autoplay", ""); lp.setAttribute("loop", "");
      anim.appendChild(lp);
    }
    wrap.appendChild(anim);
    return wrap;
  }

  /* ---------------- WORLD THEME + FLOATERS ---------------- */
  function applyWorldTheme(worldId) {
    var w = window.WORLDS[worldId]; if (!w) return;
    var r = document.documentElement.style;
    r.setProperty("--brand", w.color);
    r.setProperty("--grad", w.gradient);
    var box = $("#floaters"); box.innerHTML = "";
    for (var i = 0; i < 14; i++) {
      var f = el("span", "floater", w.floaters[i % w.floaters.length]);
      f.style.left = (Math.random() * 92 + 2) + "%";
      f.style.top = (Math.random() * 90 + 4) + "%";
      f.style.fontSize = (Math.random() * 26 + 22) + "px";
      f.style.animationDuration = (Math.random() * 10 + 14) + "s";
      f.style.animationDelay = (-Math.random() * 12) + "s";
      box.appendChild(f);
    }
    // header division logo
    var dl = $("#divLogo");
    if (dl) { dl.src = w.logo; dl.style.display = "block"; }
  }

  /* ---------------- BACKEND (offline-safe) ---------------- */
  function backendReady() { return window.CONFIG && CONFIG.scriptUrl; }
  function checkCertified(empId) {
    if (!backendReady()) return Promise.resolve({ passed: false });
    var url = CONFIG.scriptUrl + "?token=" + encodeURIComponent(CONFIG.secretToken) +
              "&action=check&empId=" + encodeURIComponent(empId);
    return fetch(url).then(function (r) { return r.json(); }).catch(function () { return { passed: false }; });
  }
  function post(payload) {
    if (!backendReady()) return Promise.resolve({ ok: true, offline: true });
    return fetch(CONFIG.scriptUrl, {
      method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(Object.assign({ token: CONFIG.secretToken }, payload))
    }).then(function (r) { return r.json(); }).catch(function () { return { ok: false }; });
  }

  /* ---------------- INTAKE ---------------- */
  function buildIntake() {
    rerenderCurrent = buildIntake;
    var root = $("#intakeForm"); root.innerHTML = "";

    root.appendChild(fieldText("empId", u("empLabel"), state.empId, "323999"));
    root.appendChild(fieldText("name", u("nameLabel"), state.name, "—"));

    // brand select
    var fb = el("div", "field");
    fb.appendChild(el("label", null, u("brandLabel")));
    var sel = el("select"); sel.id = "brandSel";
    var ph = el("option", null, u("brandPH")); ph.value = ""; sel.appendChild(ph);
    window.BRANDS.forEach(function (b, i) {
      var o = el("option", null, L(b)); o.value = String(i); sel.appendChild(o);
    });
    if (state.brand != null) sel.value = String(window.BRANDS.indexOf(state.brand));
    fb.appendChild(sel); root.appendChild(fb);

    var btn = el("button", "btn", u("start"));
    btn.onclick = function () {
      var emp = $("#empId").value.trim(), nm = $("#name").value.trim(), bi = $("#brandSel").value;
      if (!emp || !nm || bi === "") { root.classList.add("shake"); setTimeout(function(){root.classList.remove("shake");}, 400); return; }
      state.empId = emp; state.name = nm; state.brand = window.BRANDS[+bi]; state.world = state.brand.world;
      checkCertified(emp).then(function (res) {
        if (res && res.passed) { state.certified = true; showResult(); return; }
        enterWorld();
      });
    };
    root.appendChild(btn);
  }
  function fieldText(id, label, val, ph) {
    var f = el("div", "field");
    f.appendChild(el("label", null, label));
    var inp = el("input"); inp.id = id; inp.value = val || ""; inp.placeholder = ph || "";
    f.appendChild(inp); return f;
  }

  /* ---------------- WORLD REVEAL ---------------- */
  function enterWorld() {
    applyWorldTheme(state.world);
    state.division = window["DIVISION_" + state.world] || null;
    rerenderCurrent = enterWorld;
    var w = window.WORLDS[state.world];
    var c = $("#worldCard"); c.innerHTML = "";
    c.appendChild(el("div", "brandbar"));
    var logo = el("img", "world-logo"); logo.src = w.logo; logo.alt = ""; c.appendChild(logo);
    c.appendChild(el("p", "muted", L(state.division ? state.division.title : { ar: "", en: "" })));
    var btn = el("button", "btn", u("enterWorld"));
    btn.onclick = function () { state.division ? buildCharacter() : alert(u("soon")); };
    c.appendChild(btn);
    showScreen("screen-world");
  }

  /* ---------------- CHARACTER SELECT ---------------- */
  function buildCharacter() {
    rerenderCurrent = buildCharacter;
    var w = window.WORLDS[state.world];
    var c = $("#charCard"); c.innerHTML = "";
    c.appendChild(el("h2", "h2", u("pickChar")));
    var grid = el("div", "char-grid");
    w.characters.forEach(function (ch) {
      var cell = el("button", "char-cell");
      cell.appendChild(renderMedia({ type: "png", src: ch.png }, "media-sm"));
      cell.appendChild(el("div", "char-name", state.name));
      cell.onclick = function () { state.character = ch.id; intro(); };
      grid.appendChild(cell);
    });
    c.appendChild(grid);
    c.appendChild(el("p", "muted small", { ar: "ستظهر شخصيتك باسمك خلال التحدّي", en: "Your character carries your name through the challenge" }[state.lang]));
    showScreen("screen-character");
  }

  /* ---------------- DIVISION INTRO ---------------- */
  function intro() {
    rerenderCurrent = intro;
    var d = state.division;
    var c = $("#introCard"); c.innerHTML = "";
    var logo = el("img", "world-logo"); logo.src = d.logo; logo.alt = ""; c.appendChild(logo);
    var list = el("ol", "round-list");
    d.rounds.forEach(function (rd) { list.appendChild(el("li", null, L(rd.title))); });
    c.appendChild(list);
    var btn = el("button", "btn", u("beginRounds"));
    btn.onclick = function () { state.roundIndex = 0; state.scores = []; playRound(); };
    c.appendChild(btn);
    showScreen("screen-intro");
  }

  /* ---------------- ROUND DISPATCHER ---------------- */
  function playRound() {
    var d = state.division;
    if (state.roundIndex >= d.rounds.length) { showResult(); return; }
    var round = d.rounds[state.roundIndex];
    var mount = $("#roundMount"); mount.innerHTML = "";
    $("#roundTag").textContent = u("roundOf") + " " + (state.roundIndex + 1) + " / " + d.rounds.length;
    $("#roundTitle").textContent = L(round.title);
    showScreen("screen-round");

    var done = function (pct) {
      state.scores.push(pct);
      state.roundIndex++;
      playRound();
    };

    switch (round.mechanic) {
      case "swipe":    renderSwipe(round, mount, done); break;
      case "scenario": renderScenario(round, mount, done); break;
      /* match / order / slider / speed / convo / hotspot — same pattern, added next */
      default:
        mount.appendChild(el("p", "muted", "Mechanic “" + round.mechanic + "” not built yet."));
        var skip = el("button", "btn", u("continue")); skip.onclick = function () { done(0); };
        mount.appendChild(skip);
    }
  }

  /* ---------------- MECHANIC: SWIPE ---------------- */
  function renderSwipe(round, mount, done) {
    var qs = round.questions, i = 0, correct = 0;
    mount.appendChild(el("p", "muted", L(round.intro)));
    var stage = el("div", "swipe-stage"); mount.appendChild(stage);
    var fb = el("div", "fb"); mount.appendChild(fb);
    var btns = el("div", "swipe-btns");
    var no = el("button", "btn ghost", "✕ " + u("notYet"));
    var yes = el("button", "btn", "✓ " + u("opportunity"));
    btns.appendChild(no); btns.appendChild(yes); mount.appendChild(btns);

    function draw() {
      stage.innerHTML = ""; fb.innerHTML = ""; fb.className = "fb";
      if (i >= qs.length) { done(Math.round(correct / qs.length * 100)); return; }
      var q = qs[i];
      var card = el("div", "swipe-card");
      if (q.media) card.appendChild(renderMedia(q.media, "media-swipe"));
      card.appendChild(el("p", "swipe-prompt", L(q.prompt)));
      stage.appendChild(card);
    }
    function answer(choice) {
      var q = qs[i]; var right = (choice === !!q.isOpportunity);
      if (right) correct++;
      fb.className = "fb show " + (right ? "ok" : "no");
      fb.textContent = (right ? "✓ " : "✕ ") + L(q.feedback);
      no.disabled = yes.disabled = true;
      setTimeout(function () { i++; no.disabled = yes.disabled = false; draw(); }, 1400);
    }
    yes.onclick = function () { answer(true); };
    no.onclick = function () { answer(false); };
    draw();
  }

  /* ---------------- MECHANIC: SCENARIO ---------------- */
  function renderScenario(round, mount, done) {
    var qs = round.questions, i = 0, correct = 0;
    mount.appendChild(el("p", "muted", L(round.intro)));
    var stage = el("div", "scn-stage"); mount.appendChild(stage);

    function draw() {
      stage.innerHTML = "";
      if (i >= qs.length) { done(Math.round(correct / qs.length * 100)); return; }
      var q = qs[i];
      if (q.media) stage.appendChild(renderMedia(q.media, "media-sm"));
      stage.appendChild(el("div", "scn-bubble", L(q.scenario)));
      var opts = el("div", "scn-opts");
      q.options.forEach(function (op, idx) {
        var b = el("button", "scn-opt", L(op));
        b.onclick = function () {
          var right = idx === q.correct;
          if (right) correct++;
          Array.prototype.forEach.call(opts.children, function (c, ci) {
            c.disabled = true;
            if (ci === q.correct) c.classList.add("ok");
            else if (ci === idx) c.classList.add("no");
          });
          var fb = el("div", "fb show " + (right ? "ok" : "no"), (right ? "✓ " : "✕ ") + L(q.feedback));
          stage.appendChild(fb);
          setTimeout(function () { i++; draw(); }, 1700);
        };
        opts.appendChild(b);
      });
      stage.appendChild(opts);
    }
    draw();
  }

  /* ---------------- RESULT ---------------- */
  function showResult() {
    rerenderCurrent = showResult;
    var c = $("#resultCard"); c.innerHTML = "";

    if (state.certified) {
      c.appendChild(el("div", "badge ok", "✅"));
      c.appendChild(el("h2", "h2", u("certified")));
      showScreen("screen-result");
      return;
    }

    var total = state.scores.length ? Math.round(state.scores.reduce(function (a, b) { return a + b; }, 0) / state.scores.length) : 0;
    var passed = total >= CONFIG.passMark;

    c.appendChild(el("div", "badge " + (passed ? "ok" : "no"), passed ? "🏅" : "💪"));
    c.appendChild(el("div", "score-big", total + "%"));
    c.appendChild(el("h2", "h2", passed ? u("passed") : u("failed")));

    // per-round breakdown
    var bd = el("div", "breakdown");
    state.division.rounds.forEach(function (rd, idx) {
      var row = el("div", "bd-row");
      row.appendChild(el("span", null, L(rd.title)));
      row.appendChild(el("strong", null, (state.scores[idx] != null ? state.scores[idx] : 0) + "%"));
      bd.appendChild(row);
    });
    c.appendChild(bd);

    // record score
    post({
      action: "score", division: state.division.id, brand: L(state.brand),
      empId: state.empId, name: state.name, character: state.character,
      scores: state.scores, total: total, passed: passed ? "yes" : "no", lang: state.lang
    });

    if (!passed) {
      var retry = el("button", "btn", u("retry"));
      retry.onclick = function () { state.roundIndex = 0; state.scores = []; playRound(); };
      c.appendChild(retry);
    } else {
      c.appendChild(buildFeedback());
    }
    showScreen("screen-result");
  }

  function buildFeedback() {
    var box = el("div", "fbk");
    box.appendChild(el("h3", "h3", u("rateTitle")));
    var stars = el("div", "stars"); var rating = 0;
    for (var s = 1; s <= 5; s++) (function (n) {
      var st = el("button", "star", "★");
      st.onclick = function () {
        rating = n;
        Array.prototype.forEach.call(stars.children, function (x, xi) { x.classList.toggle("on", xi < n); });
      };
      stars.appendChild(st);
    })(s);
    box.appendChild(stars);
    var ta = el("textarea", "fbk-area"); ta.placeholder = u("fbPH"); box.appendChild(ta);
    var send = el("button", "btn", u("sendFb"));
    send.onclick = function () {
      post({
        action: "feedback", division: state.division.id, brand: L(state.brand),
        empId: state.empId, name: state.name,
        rating: rating, comment: ta.value.trim(), lang: state.lang
      });
      box.innerHTML = ""; box.appendChild(el("h3", "h3", u("thanks")));
    };
    box.appendChild(send);
    return box;
  }

  /* ---------------- FOOTER + LANG TOGGLE ---------------- */
  function wireChrome() {
    $("#footLine").textContent = L(CONFIG.footerLine);
    $("#cxLink").href = CONFIG.cxHubUrl;
    var lb = $("#langBtn");
    lb.onclick = function () { setLang(state.lang === "ar" ? "en" : "ar"); };
    $("#langLabel").textContent = state.lang === "ar" ? "EN" : "ع";
  }

  /* ---------------- INIT ---------------- */
  function init() {
    applyDir();
    wireChrome();
    buildIntake();
    showScreen("screen-intake");
  }
  document.addEventListener("DOMContentLoaded", init);
})();

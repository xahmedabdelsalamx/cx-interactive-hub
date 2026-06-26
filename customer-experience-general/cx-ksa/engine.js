/* ============================================================
   ENGINE · all logic. Divisions are data only.
   ============================================================ */
(function () {
  "use strict";

  var state = {
    lang: (window.CONFIG && CONFIG.defaultLang) || "ar",
    empId: "", name: "", brand: null, world: null,
    division: null, character: null,
    roundIndex: 0, scores: [], certified: false
  };

  /* ---------------- UI STRINGS (KSA Arabic + English) ---------------- */
  var UI = {
    appTitle:   { ar: "تحدّي تجربة الضيوف", en: "CX Onboarding Challenge" },
    intakeSub:  { ar: "سجّل بياناتك عشان تبدأ", en: "Enter your details to begin" },
    empLabel:   { ar: "الرقم الوظيفي", en: "Employee ID" },
    nameLabel:  { ar: "الاسم", en: "Name" },
    brandLabel: { ar: "علامتك التجارية", en: "Brand" },
    brandPH:    { ar: "اختر علامتك", en: "Choose your brand" },
    start:      { ar: "ابدأ", en: "Start" },
    enterWorld: { ar: "ادخل عالمك", en: "Enter your world" },
    pickChar:   { ar: "اختر شخصيتك", en: "Choose your character" },
    selectChar: { ar: "اختر هذي الشخصية", en: "Select this character" },
    beginRounds:{ ar: "ابدأ الجولات", en: "Begin the rounds" },
    prev:       { ar: "السابق", en: "Previous" },
    next:       { ar: "التالي", en: "Next" },
    finish:     { ar: "إنهاء الجولة", en: "Finish round" },
    roundOf:    { ar: "الجولة", en: "Round" },
    opportunity:{ ar: "فرصة", en: "Opportunity" },
    notYet:     { ar: "مو الحين", en: "Not yet" },
    passed:     { ar: "مبروك! عدّيت التحدّي 🎉", en: "Congratulations! You passed 🎉" },
    failed:     { ar: "قربت! جرّب مرة ثانية", en: "So close! Try again" },
    retry:      { ar: "إعادة المحاولة", en: "Try again" },
    certified:  { ar: "أنت معتمد بالفعل ✅", en: "You're already certified ✅" },
    rateTitle:  { ar: "كيف كانت تجربتك؟", en: "How was your experience?" },
    fbPH:       { ar: "أي ملاحظة تحب تضيفها؟ (اختياري)", en: "Anything you'd add? (optional)" },
    sendFb:     { ar: "إرسال", en: "Submit" },
    thanks:     { ar: "شكراً لك! 🌟", en: "Thank you! 🌟" },
    soon:       { ar: "هذا العالم تحت الإعداد، قريباً.", en: "This world is coming soon." },
    charNote:   { ar: "شخصيتك بتمثّلك باسمك طول التحدّي", en: "Your character carries your name through the challenge" },
    notBuilt:   { ar: "هذي الآلية تحت الإعداد", en: "This mechanic isn't built yet" }
  };

  /* ---------------- HELPERS ---------------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function L(o) { if (!o) return ""; return o[state.lang] != null ? o[state.lang] : (o.en || o.ar || ""); }
  function u(k) { return L(UI[k]); }

  function showScreen(id) {
    var s = document.querySelectorAll(".screen");
    for (var i = 0; i < s.length; i++) s[i].classList.remove("active");
    var t = document.getElementById(id);
    if (t) { t.classList.add("active"); window.scrollTo(0, 0); }
  }

  /* ---------------- THEME / BACKGROUND / LOGOS ---------------- */
  function setVars(brand, grad) {
    var r = document.documentElement.style;
    r.setProperty("--brand", brand); r.setProperty("--grad", grad);
  }
  function ksaTheme() { setVars(CONFIG.entryColor, CONFIG.entryGrad); }
  function applyWorldTheme(id) {
    var w = WORLDS[id]; if (!w) return;
    setVars(w.color, w.gradient);
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
  }
  function setBg(mode) {
    if (mode === "entry") document.body.style.background = CONFIG.entryColor;
    else if (mode === "world") document.body.style.background = WORLDS[state.world].gradient;
  }
  function setHeaderLogos(mode) {
    $("#cxLogoTop").src = "assets/logos/cx-hub-white.png"; // header always over colored bg
    var dl = $("#divLogo");
    if (mode === "entry" || !state.world) { dl.style.display = "none"; }
    else { dl.src = WORLDS[state.world].logoWhite; dl.style.display = "block"; }
  }

  /* ---------------- I18N ---------------- */
  function applyDir() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
  }
  var rerenderCurrent = function () {};
  function setLang(lang) {
    state.lang = lang; applyDir();
    $("#langLabel").textContent = state.lang === "ar" ? "EN" : "ع";
    buildFooter();
    rerenderCurrent();
  }

  /* ---------------- MEDIA SLOTS ---------------- */
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
    wrap.appendChild(anim); return wrap;
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

  /* ---------------- FOOTER ---------------- */
  function buildFooter() {
    var f = CONFIG.footer, m = $("#footerMount"); m.innerHTML = "";
    var card = el("div", "footcard");
    var logo = el("img", "foot-logo"); logo.src = "assets/logos/cx-hub-color.png"; logo.alt = "CX Hub";
    card.appendChild(logo);
    card.appendChild(el("div", "foot-copy", L(f.copyright)));
    var dev = el("div", "foot-dev");
    dev.appendChild(document.createTextNode(L(f.dev) + " "));
    var a = el("a", null, L(f.contact)); a.href = "mailto:" + f.email; dev.appendChild(a);
    card.appendChild(dev);
    m.appendChild(card);
  }

  /* ---------------- INTAKE ---------------- */
  function buildIntake() {
    rerenderCurrent = buildIntake;
    ksaTheme(); setBg("entry"); setHeaderLogos("entry");
    $("#intakeTitle").textContent = u("appTitle");
    $("#intakeSub").textContent = u("intakeSub");
    var root = $("#intakeForm"); root.innerHTML = "";
    root.appendChild(fieldText("empId", u("empLabel"), state.empId, "323999"));
    root.appendChild(fieldText("name", u("nameLabel"), state.name, "—"));

    var fb = el("div", "field");
    fb.appendChild(el("label", null, u("brandLabel")));
    var sel = el("select"); sel.id = "brandSel";
    var ph = el("option", null, u("brandPH")); ph.value = ""; sel.appendChild(ph);
    BRANDS.forEach(function (b, i) { var o = el("option", null, L(b)); o.value = String(i); sel.appendChild(o); });
    if (state.brand != null) sel.value = String(BRANDS.indexOf(state.brand));
    fb.appendChild(sel); root.appendChild(fb);

    var btn = el("button", "btn", u("start"));
    btn.onclick = function () {
      var emp = $("#empId").value.trim(), nm = $("#name").value.trim(), bi = $("#brandSel").value;
      if (!emp || !nm || bi === "") { root.classList.add("shake"); setTimeout(function () { root.classList.remove("shake"); }, 400); return; }
      state.empId = emp; state.name = nm; state.brand = BRANDS[+bi]; state.world = state.brand.world;
      checkCertified(emp).then(function (res) {
        if (res && res.passed) { state.certified = true; showResult(); return; }
        enterWorld();
      });
    };
    root.appendChild(btn);
    showScreen("screen-intake");
  }
  function fieldText(id, label, val, ph) {
    var f = el("div", "field");
    f.appendChild(el("label", null, label));
    var inp = el("input"); inp.id = id; inp.value = val || ""; inp.placeholder = ph || "";
    f.appendChild(inp); return f;
  }

  /* ---------------- WORLD REVEAL ---------------- */
  function enterWorld() {
    applyWorldTheme(state.world); setBg("world"); setHeaderLogos("world");
    state.division = window["DIVISION_" + state.world] || null;
    rerenderCurrent = enterWorld;
    var w = WORLDS[state.world];
    var c = $("#worldCard"); c.innerHTML = "";
    c.appendChild(el("div", "brandbar"));
    var logo = el("img", "world-logo"); logo.src = w.logoColor; logo.alt = ""; c.appendChild(logo);
    if (state.division) c.appendChild(el("p", "muted", L(state.division.title)));
    var btn = el("button", "btn", u("enterWorld"));
    btn.onclick = function () { state.division ? buildCharacter() : alert(u("soon")); };
    c.appendChild(btn);
    showScreen("screen-world");
  }

  /* ---------------- CHARACTER CAROUSEL (full body, one at a time) ---------------- */
  function buildCharacter() {
    rerenderCurrent = buildCharacter;
    setBg("world"); setHeaderLogos("world");
    var w = WORLDS[state.world], chars = w.characters, ci = 0;
    var mount = $("#charMount");

    function draw() {
      mount.innerHTML = "";
      mount.appendChild(el("h2", "h2 on-grad", u("pickChar")));

      var stage = el("div", "char-stage");
      var prev = el("button", "char-arrow prev", "‹");
      var nextB = el("button", "char-arrow next", "›");
      prev.onclick = function () { ci = (ci - 1 + chars.length) % chars.length; draw(); };
      nextB.onclick = function () { ci = (ci + 1) % chars.length; draw(); };

      var figwrap = el("div", "char-figwrap");
      figwrap.appendChild(el("div", "pedestal"));
      var img = el("img", "char-figure"); img.src = chars[ci].png; img.alt = "";
      img.onerror = function () {
        var ph = el("div", "char-figure-ph");
        ph.appendChild(el("div", "pe", "🧍"));
        ph.appendChild(el("div", "ps", "character " + (ci + 1)));
        figwrap.replaceChild(ph, img);
      };
      figwrap.appendChild(img);

      stage.appendChild(prev); stage.appendChild(figwrap); stage.appendChild(nextB);
      mount.appendChild(stage);

      mount.appendChild(el("div", "char-name", state.name || ""));

      var dots = el("div", "char-dots");
      chars.forEach(function (_, i) { var d = el("span", i === ci ? "on" : ""); dots.appendChild(d); });
      mount.appendChild(dots);

      var sel = el("button", "btn light char-select", u("selectChar"));
      sel.onclick = function () { state.character = chars[ci].id; intro(); };
      mount.appendChild(sel);
      mount.appendChild(el("p", "muted small", u("charNote")));
    }
    draw();
    showScreen("screen-character");
  }

  /* ---------------- DIVISION INTRO ---------------- */
  function intro() {
    rerenderCurrent = intro;
    setBg("world"); setHeaderLogos("world");
    var d = state.division, w = WORLDS[state.world];
    var c = $("#introCard"); c.innerHTML = "";
    var logo = el("img", "world-logo"); logo.src = w.logoColor; logo.alt = ""; c.appendChild(logo);
    var list = el("ol", "round-list");
    d.rounds.forEach(function (rd) { list.appendChild(el("li", null, L(rd.title))); });
    c.appendChild(list);
    var btn = el("button", "btn", u("beginRounds"));
    btn.onclick = function () { state.roundIndex = 0; state.scores = []; playRound(); };
    c.appendChild(btn);
    showScreen("screen-intro");
  }

  /* ---------------- MECHANIC ADAPTERS ---------------- */
  var ADAPTERS = {
    swipe: {
      answered: function (a) { return a === true || a === false; },
      correct: function (q, a) { return a === !!q.isOpportunity; },
      render: function (q, area, saved, onAnswer) {
        var card = el("div", "swipe-card");
        if (q.media) card.appendChild(renderMedia(q.media, "media-swipe"));
        card.appendChild(el("p", "swipe-prompt", L(q.prompt)));
        area.appendChild(card);
        var btns = el("div", "swipe-btns");
        var no = el("button", "choice", "✕ " + u("notYet"));
        var yes = el("button", "choice", "✓ " + u("opportunity"));
        function mark(v) { no.classList.toggle("sel", v === false); yes.classList.toggle("sel", v === true); }
        no.onclick = function () { mark(false); onAnswer(false); };
        yes.onclick = function () { mark(true); onAnswer(true); };
        mark(saved);
        btns.appendChild(no); btns.appendChild(yes); area.appendChild(btns);
      }
    },
    scenario: {
      answered: function (a) { return a != null; },
      correct: function (q, a) { return a === q.correct; },
      render: function (q, area, saved, onAnswer) {
        if (q.media) area.appendChild(renderMedia(q.media, "media-sm"));
        area.appendChild(el("div", "scn-bubble", L(q.scenario)));
        var opts = el("div", "scn-opts");
        function paint(pick) {
          Array.prototype.forEach.call(opts.children, function (c, ci) {
            c.classList.remove("ok", "no");
            if (pick != null) { if (ci === q.correct) c.classList.add("ok"); else if (ci === pick) c.classList.add("no"); }
          });
        }
        q.options.forEach(function (op, i) {
          var b = el("button", "scn-opt", L(op));
          b.onclick = function () { paint(i); onAnswer(i); };
          opts.appendChild(b);
        });
        area.appendChild(opts);
        if (saved != null) paint(saved);
      }
    }
  };

  /* ---------------- ROUND (navigable: prev / next, change answers) ---------------- */
  function playRound() {
    var d = state.division;
    if (state.roundIndex >= d.rounds.length) { showResult(); return; }
    var round = d.rounds[state.roundIndex];
    $("#roundTag").textContent = u("roundOf") + " " + (state.roundIndex + 1) + " / " + d.rounds.length;
    $("#roundTitle").textContent = L(round.title);
    showScreen("screen-round");
    rerenderCurrent = function () { $("#roundTitle").textContent = L(round.title); draw(); };

    var qs = round.questions, ad = ADAPTERS[round.mechanic];
    var answers = new Array(qs.length); for (var k = 0; k < qs.length; k++) answers[k] = null;
    var idx = 0;
    var mount = $("#roundMount");

    function draw() {
      mount.innerHTML = "";
      if (round.intro) mount.appendChild(el("p", "muted", L(round.intro)));

      var prog = el("div", "progress");
      for (var i = 0; i < qs.length; i++) {
        var cls = i === idx ? "on" : (ad && ad.answered(answers[i]) ? "done" : "");
        prog.appendChild(el("span", cls));
      }
      mount.appendChild(prog);

      var q = qs[idx];
      var area = el("div", "q-area");
      mount.appendChild(area);
      var fb = el("div", "fb");

      function showFb() {
        if (ad && ad.answered(answers[idx])) {
          var ok = ad.correct(q, answers[idx]);
          fb.className = "fb show " + (ok ? "ok" : "no");
          fb.textContent = (ok ? "✓ " : "✕ ") + L(q.feedback);
        } else { fb.className = "fb"; fb.textContent = ""; }
        next.disabled = !(ad && ad.answered(answers[idx]));
      }

      if (!ad) { area.appendChild(el("p", "muted", u("notBuilt") + " (" + round.mechanic + ")")); }
      else { ad.render(q, area, answers[idx], function (val) { answers[idx] = val; showFb(); }); }
      mount.appendChild(fb);

      var nav = el("div", "qnav");
      var prev = el("button", "btn ghost", "‹ " + u("prev"));
      prev.disabled = idx === 0;
      prev.onclick = function () { if (idx > 0) { idx--; draw(); } };
      var isLast = idx === qs.length - 1;
      var next = el("button", "btn", isLast ? u("finish") : (u("next") + " ›"));
      next.onclick = function () {
        if (!(ad && ad.answered(answers[idx]))) return;
        if (isLast) {
          var correct = 0;
          for (var i = 0; i < qs.length; i++) if (ad.correct(qs[i], answers[i])) correct++;
          state.scores.push(Math.round(correct / qs.length * 100));
          state.roundIndex++; playRound();
        } else { idx++; draw(); }
      };
      nav.appendChild(prev); nav.appendChild(next);
      mount.appendChild(nav);

      showFb();
    }
    draw();
  }

  /* ---------------- RESULT ---------------- */
  function showResult() {
    rerenderCurrent = showResult;
    setBg("world"); setHeaderLogos("world");
    var c = $("#resultCard"); c.innerHTML = "";

    if (state.certified) {
      c.appendChild(el("div", "badge ok", "✅"));
      c.appendChild(el("h2", "h2", u("certified")));
      showScreen("screen-result"); return;
    }

    var total = state.scores.length ? Math.round(state.scores.reduce(function (a, b) { return a + b; }, 0) / state.scores.length) : 0;
    var passed = total >= CONFIG.passMark;

    c.appendChild(el("div", "badge " + (passed ? "ok" : "no"), passed ? "🏅" : "💪"));
    c.appendChild(el("div", "score-big", total + "%"));
    c.appendChild(el("h2", "h2", passed ? u("passed") : u("failed")));

    var bd = el("div", "breakdown");
    state.division.rounds.forEach(function (rd, idx) {
      var row = el("div", "bd-row");
      row.appendChild(el("span", null, L(rd.title)));
      row.appendChild(el("strong", null, (state.scores[idx] != null ? state.scores[idx] : 0) + "%"));
      bd.appendChild(row);
    });
    c.appendChild(bd);

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
      st.onclick = function () { rating = n; Array.prototype.forEach.call(stars.children, function (x, xi) { x.classList.toggle("on", xi < n); }); };
      stars.appendChild(st);
    })(s);
    box.appendChild(stars);
    var ta = el("textarea", "fbk-area"); ta.placeholder = u("fbPH"); box.appendChild(ta);
    var send = el("button", "btn", u("sendFb"));
    send.onclick = function () {
      post({ action: "feedback", division: state.division.id, brand: L(state.brand),
        empId: state.empId, name: state.name, rating: rating, comment: ta.value.trim(), lang: state.lang });
      box.innerHTML = ""; box.appendChild(el("h3", "h3", u("thanks")));
    };
    box.appendChild(send); return box;
  }

  /* ---------------- INIT ---------------- */
  function init() {
    applyDir();
    $("#langBtn").onclick = function () { setLang(state.lang === "ar" ? "en" : "ar"); };
    $("#langLabel").textContent = state.lang === "ar" ? "EN" : "ع";
    buildFooter();
    buildIntake();
  }
  document.addEventListener("DOMContentLoaded", init);
})();

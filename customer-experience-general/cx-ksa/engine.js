/* ============================================================
   ENGINE · all logic. Divisions are data only.
   ============================================================ */
(function () {
  "use strict";

  var state = {
    lang: (window.CONFIG && CONFIG.defaultLang) || "ar",
    empId: "", name: "", brand: null, world: null,
    division: null, character: null,
    roundIndex: 0, scores: [], certified: false, bonus: null
  };
  var rushTimer = null;

  /* ---------------- UI STRINGS (KSA Arabic + English) ---------------- */
  var UI = {
    appTitle:   { ar: "تحدّي تجربة الزبائن", en: "CX Onboarding Challenge" },
    intakeSub:  { ar: "سجّل بياناتك عشان تبدأ", en: "Enter your details to begin" },
    empLabel:   { ar: "الرقم الوظيفي", en: "Employee ID" },
    nameLabel:  { ar: "الاسم", en: "Name" },
    empPH:      { ar: "مثال ٣٢٣٩٩٩", en: "e.g. 323999" },
    namePH:     { ar: "الاسم الكامل", en: "Full Name" },
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
    notBuilt:   { ar: "هذي الآلية تحت الإعداد", en: "This mechanic isn't built yet" },
    startRound: { ar: "ابدأ الجولة", en: "Start round" },
    resultReady:{ ar: "أنت جاهز! 🎉", en: "You're ready! 🎉" },
    mastery:    { ar: "تم تحقيق الإتقان", en: "Mastery Achieved" },
    championOf: { ar: "بطل", en: "Champion" },
    scoredTxt:  { ar: "حقّق", en: "Scored" },
    orgFoot:    { ar: "تجربة الزبائن · CX Hub", en: "Customer Experience · CX Hub" },
    learnBtn:   { ar: "زر CX Hub للمزيد من التعلّم", en: "Visit the CX Hub for more learning" },
    scoreSaved: { ar: "تم حفظ نتيجتك", en: "Your score was saved" },
    bonusRound: { ar: "جولة المكافأة ⚡", en: "Bonus Round ⚡" },
    bonusLbl:   { ar: "مكافأة · سرعة الموسم", en: "Bonus · Peak Rush" },
    rushGo:     { ar: "بسرعة!", en: "Go fast!" },
    timeUp:     { ar: "انتهى الوقت!", en: "Time's up!" }
  };

  /* ---------------- HELPERS ---------------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function L(o) { if (!o) return ""; return o[state.lang] != null ? o[state.lang] : (o.en || o.ar || ""); }
  function u(k) { return L(UI[k]); }
  function phMedia() { return { type: "placeholder", label: { ar: "صورة / أنيميشن", en: "image / lottie" } }; }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

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
    var g = (mode === "entry") ? CONFIG.entryBgGrad : WORLDS[state.world].bgGradient;
    document.body.style.backgroundImage = g;
  }
  function setHeaderLogos(mode) {
    $("#cxLogoTop").src = "assets/logos/cx-hub-color.png"; // header lives inside the white window
    var dl = $("#divLogo");
    if (mode === "entry" || !state.world) { dl.style.display = "none"; }
    else { dl.src = WORLDS[state.world].logoColor; dl.style.display = "block"; }
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
    var logos = el("div", "foot-logos");
    var cx = el("img", "foot-cx"); cx.src = "assets/logos/cx-hub-color.png"; cx.alt = "CX Hub";
    var divr = el("div", "foot-divider");
    var al = el("img", "foot-alshaya"); al.src = "assets/logos/alshaya-group-color.png"; al.alt = "Alshaya Group";
    logos.appendChild(cx); logos.appendChild(divr); logos.appendChild(al);
    card.appendChild(logos);
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
    root.appendChild(fieldText("empId", u("empLabel"), state.empId, u("empPH")));
    root.appendChild(fieldText("name", u("nameLabel"), state.name, u("namePH")));
    var emp = $("#empId");
    emp.setAttribute("inputmode", "numeric"); emp.setAttribute("maxlength", "12"); emp.setAttribute("autocomplete", "off");
    emp.addEventListener("input", function () { this.value = this.value.replace(/\D/g, ""); });
    var nm = $("#name");
    nm.setAttribute("autocomplete", "off");
    nm.addEventListener("input", function () { this.value = this.value.replace(/[^A-Za-z\u0600-\u06FF\s'.\-]/g, ""); });

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
      mount.appendChild(el("h2", "h2", u("pickChar")));

      var hero = el("div", "stage-hero");
      var hlogo = el("img", "hero-logo"); hlogo.src = w.logoWhite; hlogo.alt = ""; hero.appendChild(hlogo);
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
        ph.appendChild(el("div", "pe", w.floaters[0]));
        ph.appendChild(el("div", "ps", state.world + " · " + (ci + 1)));
        figwrap.replaceChild(ph, img);
      };
      figwrap.appendChild(img);

      stage.appendChild(prev); stage.appendChild(figwrap); stage.appendChild(nextB);
      hero.appendChild(stage);

      hero.appendChild(el("div", "char-name", state.name || ""));

      var dots = el("div", "char-dots");
      chars.forEach(function (_, i) { var d = el("span", i === ci ? "on" : ""); dots.appendChild(d); });
      hero.appendChild(dots);
      mount.appendChild(hero);

      var sel = el("button", "btn char-select", u("selectChar"));
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
    btn.onclick = function () { state.roundIndex = 0; state.scores = []; state.bonus = null; playRound(); };
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
        card.appendChild(renderMedia(q.media || phMedia(), "media-swipe"));
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
        area.appendChild(renderMedia(q.media || phMedia(), "media-sm"));
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
    },
    /* MATCH — pair each left item with its correct right (rights shuffled) */
    match: {
      answered: function (a) { return a && a.length && a.every(function (x) { return x != null; }); },
      correct: function (q, a) { return a && a.every(function (x, i) { return x === i; }); },
      render: function (q, area, saved, onAnswer) {
        var n = q.pairs.length;
        var assign = saved ? saved.slice() : []; for (var z = 0; z < n; z++) if (assign[z] === undefined) assign[z] = null;
        var active = null;
        if (q.instruction) area.appendChild(el("div", "scn-bubble", L(q.instruction)));
        area.appendChild(renderMedia(q.media || phMedia(), "media-sm"));
        var grid = el("div", "match-grid");
        var lc = el("div", "match-col"), rc = el("div", "match-col");
        var rights = q.pairs.map(function (p, i) { return { text: p.right, pidx: i }; }); shuffle(rights);
        var lChips = [], rChips = [];
        q.pairs.forEach(function (p, i) {
          var c = el("button", "match-chip"); c.appendChild(el("span", "match-badge")); c.appendChild(el("span", "match-txt", L(p.left)));
          c.onclick = function () { leftClick(i); }; lChips.push(c); lc.appendChild(c);
        });
        rights.forEach(function (r) {
          var c = el("button", "match-chip"); c.appendChild(el("span", "match-badge")); c.appendChild(el("span", "match-txt", L(r.text)));
          c._pidx = r.pidx; c.onclick = function () { rightClick(r.pidx); }; rChips.push(c); rc.appendChild(c);
        });
        grid.appendChild(lc); grid.appendChild(rc); area.appendChild(grid);
        function paint() {
          lChips.forEach(function (c, i) {
            c.querySelector(".match-badge").textContent = assign[i] != null ? (i + 1) : "";
            c.classList.toggle("assigned", assign[i] != null); c.classList.toggle("active", active === i);
          });
          rChips.forEach(function (c) {
            var li = assign.indexOf(c._pidx);
            c.querySelector(".match-badge").textContent = li >= 0 ? (li + 1) : "";
            c.classList.toggle("assigned", li >= 0);
          });
        }
        function leftClick(i) { if (assign[i] != null) { assign[i] = null; active = i; onAnswer(assign.slice()); } else { active = i; } paint(); }
        function rightClick(pidx) {
          if (active == null) return;
          var prev = assign.indexOf(pidx); if (prev >= 0) assign[prev] = null;
          assign[active] = pidx; active = null; paint(); onAnswer(assign.slice());
        }
        paint();
      }
    },
    /* ORDER — tap the steps in the correct sequence (display shuffled) */
    order: {
      answered: function (a) { return a && a.seq && a.seq.length === a.n; },
      correct: function (q, a) { return a && a.seq && a.seq.length === q.steps.length && a.seq.every(function (o, k) { return o === k; }); },
      render: function (q, area, saved, onAnswer) {
        var n = q.steps.length;
        var seq = saved && saved.seq ? saved.seq.slice() : [];
        if (q.instruction) area.appendChild(el("div", "scn-bubble", L(q.instruction)));
        area.appendChild(renderMedia(q.media || phMedia(), "media-sm"));
        var list = el("div", "order-list");
        var disp = q.steps.map(function (s, i) { return { text: s, oidx: i }; }); shuffle(disp);
        var chips = [];
        disp.forEach(function (d) {
          var c = el("button", "order-chip"); c.appendChild(el("span", "order-badge")); c.appendChild(el("span", "order-text", L(d.text)));
          c._oidx = d.oidx; c.onclick = function () { click(d.oidx); }; chips.push(c); list.appendChild(c);
        });
        area.appendChild(list);
        var reset = el("button", "order-reset", L({ ar: "إعادة الترتيب", en: "Reset order" }));
        reset.onclick = function () { seq = []; paint(); onAnswer({ seq: seq.slice(), n: n }); };
        area.appendChild(reset);
        function paint() {
          chips.forEach(function (c) {
            var pos = seq.indexOf(c._oidx);
            c.querySelector(".order-badge").textContent = pos >= 0 ? (pos + 1) : "";
            c.classList.toggle("ordered", pos >= 0);
          });
        }
        function click(oidx) {
          var pos = seq.indexOf(oidx);
          if (pos >= 0) seq = seq.slice(0, pos); else if (seq.length < n) seq.push(oidx);
          paint(); onAnswer({ seq: seq.slice(), n: n });
        }
        paint();
      }
    }
  };

  /* ---------------- ROUND (navigable: prev / next, change answers) ---------------- */
  function playRound() {
    var d = state.division;
    if (state.roundIndex >= d.rounds.length) { showResult(); return; }
    showRoundIntro(d.rounds[state.roundIndex]);
  }

  function showRoundIntro(round) {
    rerenderCurrent = function () { showRoundIntro(round); };
    var c = $("#roundIntroCard"); c.innerHTML = "";
    var wrap = el("div", "round-intro");
    wrap.appendChild(el("div", "ri-tag" + (round.bonus ? " bonus" : ""),
      round.bonus ? u("bonusRound")
                  : (u("roundOf") + " " + (state.roundIndex + 1) + " / " + state.division.rounds.length)));
    wrap.appendChild(el("div", "ri-title", L(round.title)));
    wrap.appendChild(renderMedia(round.media || phMedia(), "media-md"));
    if (round.intro) wrap.appendChild(el("p", "ri-text", L(round.intro)));
    var btn = el("button", "btn", u("startRound"));
    btn.onclick = function () { beginRound(round); };
    wrap.appendChild(btn);
    c.appendChild(wrap);
    showScreen("screen-roundintro");
  }

  function beginRound(round) {
    if (rushTimer) { clearInterval(rushTimer); rushTimer = null; }
    $("#roundTag").textContent = round.bonus ? u("bonusRound")
      : (u("roundOf") + " " + (state.roundIndex + 1) + " / " + state.division.rounds.length);
    $("#roundTitle").textContent = L(round.title);
    showScreen("screen-round");
    var mount = $("#roundMount");

    if (round.mechanic === "rush") { rerenderCurrent = function () { beginRound(round); }; runRush(round, mount); return; }

    rerenderCurrent = function () { $("#roundTitle").textContent = L(round.title); draw(); };
    var qs = round.questions, ad = ADAPTERS[round.mechanic];
    var answers = new Array(qs.length); for (var k = 0; k < qs.length; k++) answers[k] = null;
    var idx = 0;

    function draw() {
      mount.innerHTML = "";

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
  function advanceRound(pct) { state.scores.push(pct); state.roundIndex++; playRound(); }

  /* ---------------- MECHANIC: RUSH (timed rapid-fire + energy meter) ---------------- */
  function runRush(round, mount) {
    var qs = round.questions, seconds = round.seconds || 8;
    var idx = 0, correct = 0, streak = 0, best = 0, energy = 50;

    function finish() {
      if (rushTimer) { clearInterval(rushTimer); rushTimer = null; }
      state.bonus = { score: Math.round(correct / qs.length * 100), energy: Math.round(energy), streak: best };
      advanceRound(state.bonus.score);
    }

    function draw() {
      if (rushTimer) { clearInterval(rushTimer); rushTimer = null; }
      mount.innerHTML = "";
      var q = qs[idx], locked = false;

      // HUD: energy meter + streak
      var hud = el("div", "rush-hud");
      var en = el("div", "rush-energy"); var enf = el("div", "rush-energy-fill"); enf.style.width = energy + "%"; en.appendChild(enf);
      hud.appendChild(el("div", "rush-en-ico", "⚡"));
      hud.appendChild(en);
      hud.appendChild(el("div", "rush-streak", "🔥 " + streak));
      mount.appendChild(hud);

      // progress + timer bar
      mount.appendChild(el("div", "rush-count", (idx + 1) + " / " + qs.length));
      var tbar = el("div", "rush-timer"); var tfill = el("div", "rush-timer-fill"); tbar.appendChild(tfill); mount.appendChild(tbar);

      // question
      var area = el("div", "rush-q");
      area.appendChild(renderMedia(q.media || phMedia(), "media-sm"));
      area.appendChild(el("div", "rush-prompt", L(q.prompt)));
      var opts = el("div", "rush-opts");
      q.options.forEach(function (op, i) {
        var b = el("button", "rush-opt", L(op));
        b.onclick = function () { answer(i); };
        opts.appendChild(b);
      });
      area.appendChild(opts);
      var fb = el("div", "fb"); area.appendChild(fb);
      mount.appendChild(area);

      var start = Date.now();
      rushTimer = setInterval(function () {
        var left = seconds - (Date.now() - start) / 1000;
        tfill.style.width = Math.max(0, left / seconds * 100) + "%";
        if (left <= 0) { clearInterval(rushTimer); rushTimer = null; if (!locked) lockAnswer(-1); }
      }, 70);

      function answer(i) { if (!locked) lockAnswer(i); }
      function lockAnswer(i) {
        locked = true;
        if (rushTimer) { clearInterval(rushTimer); rushTimer = null; }
        var fast = (Date.now() - start) / 1000 < seconds * 0.5;
        var ok = i === q.correct;
        Array.prototype.forEach.call(opts.children, function (c, ci) {
          c.disabled = true;
          if (ci === q.correct) c.classList.add("ok"); else if (ci === i) c.classList.add("no");
        });
        if (ok) { correct++; streak++; best = Math.max(best, streak); energy = Math.min(100, energy + (fast ? 16 : 10)); }
        else { streak = 0; energy = Math.max(0, energy - 14); }
        enf.style.width = energy + "%";
        fb.className = "fb show " + (ok ? "ok" : "no");
        fb.textContent = (i === -1 ? "⏱ " + u("timeUp") + " — " : (ok ? "✓ " : "✕ ")) + L(q.feedback);
        setTimeout(function () { idx++; (idx >= qs.length) ? finish() : draw(); }, 1050);
      }
    }
    draw();
  }

  function showResult() {
    rerenderCurrent = showResult;
    setBg("world"); setHeaderLogos("world");
    var c = $("#resultCard"); c.innerHTML = "";

    if (state.certified) {
      c.appendChild(el("div", "badge ok", "✅"));
      c.appendChild(el("h2", "h2", u("certified")));
      c.appendChild(learnButton());
      showScreen("screen-result"); return;
    }

    var mainScores = [];
    state.division.rounds.forEach(function (rd, i) { if (!rd.bonus && state.scores[i] != null) mainScores.push(state.scores[i]); });
    var total = mainScores.length ? Math.round(mainScores.reduce(function (a, b) { return a + b; }, 0) / mainScores.length) : 0;
    var passed = total >= CONFIG.passMark;

    c.appendChild(el("div", "result-head", passed ? u("resultReady") : u("failed")));

    var ring = el("div", "score-ring"); ring.style.setProperty("--p", total);
    ring.appendChild(el("div", null, total + "%"));
    c.appendChild(ring);

    var bd = el("div", "breakdown");
    state.division.rounds.forEach(function (rd, idx) {
      var row = el("div", "bd-row" + (rd.bonus ? " bonus" : ""));
      row.appendChild(el("span", null, rd.bonus ? u("bonusLbl") : L(rd.title)));
      var val = (state.scores[idx] != null ? state.scores[idx] : 0) + "%";
      if (rd.bonus && state.bonus) val += "  ⚡" + state.bonus.energy + "  🔥" + state.bonus.streak;
      row.appendChild(el("strong", null, val));
      bd.appendChild(row);
    });
    c.appendChild(bd);

    var saveP = post({
      action: "score", division: state.division.id, brand: L(state.brand),
      empId: state.empId, name: state.name, character: state.character,
      scores: state.scores, total: total, passed: passed ? "yes" : "no", lang: state.lang,
      bonus: state.bonus ? state.bonus.score : "", energy: state.bonus ? state.bonus.energy : ""
    });

    if (!passed) {
      var retry = el("button", "btn", u("retry"));
      retry.onclick = function () { state.roundIndex = 0; state.scores = []; state.bonus = null; playRound(); };
      c.appendChild(retry);
    } else {
      c.appendChild(buildBadge(total));
      c.appendChild(buildFeedback());
      c.appendChild(learnButton());
      var saveNote = el("div", "score-saved");  // appended only on confirmed save
      saveP.then(function (res) {
        if (res && res.ok && !res.offline) {
          saveNote.appendChild(el("span", null, "✅"));
          saveNote.appendChild(el("span", null, u("scoreSaved")));
          c.appendChild(saveNote);
        }
      });
      confetti();
    }
    showScreen("screen-result");
  }

  function learnButton() {
    var a = el("a", "btn", u("learnBtn"));
    a.href = WORLDS[state.world].learnUrl; a.target = "_blank"; a.rel = "noopener";
    return a;
  }

  function buildBadge(total) {
    var w = WORLDS[state.world], d = state.division;
    var card = el("div", "badgecard");
    card.style.backgroundImage = w.bgGradient;
    var logo = el("img", "badge-logo"); logo.src = w.logoWhite; logo.alt = ""; card.appendChild(logo);
    var medal = el("div", "badge-medal"); medal.appendChild(el("div", "badge-star", "★")); card.appendChild(medal);
    card.appendChild(el("div", "badge-mastery", u("mastery")));
    card.appendChild(el("div", "badge-name", state.name || ""));
    var champ = state.lang === "ar" ? (u("championOf") + " " + L(d.title)) : (L(d.title) + " " + u("championOf"));
    card.appendChild(el("div", "badge-sub", champ));
    card.appendChild(el("div", "badge-score", u("scoredTxt") + " " + total + "%"));
    card.appendChild(el("div", "badge-date", monthYear()));
    card.appendChild(el("div", "badge-foot", u("orgFoot")));
    return card;
  }

  function monthYear() {
    var m = state.lang === "ar"
      ? ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"]
      : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var dt = new Date(); return m[dt.getMonth()] + " " + dt.getFullYear();
  }

  function confetti() {
    var box = $("#confetti"); box.innerHTML = "";
    var cols = ["#e43c50", "#f15a24", "#006241", "#ffba2e", "#7b61ff", "#19b36b"];
    for (var i = 0; i < 70; i++) {
      var p = el("i");
      p.style.left = (Math.random() * 100) + "%";
      p.style.background = cols[i % cols.length];
      p.style.animationDuration = (Math.random() * 1.6 + 2.2) + "s";
      p.style.animationDelay = (Math.random() * 0.5) + "s";
      box.appendChild(p);
    }
    setTimeout(function () { box.innerHTML = ""; }, 4400);
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

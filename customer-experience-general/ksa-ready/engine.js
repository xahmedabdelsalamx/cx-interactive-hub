/* ============================================================
   ENGINE · all logic. Divisions are data only.
   ============================================================ */
(function () {
  "use strict";

  var state = {
    lang: (window.CONFIG && CONFIG.defaultLang) || "ar",
    empId: "", name: "", gender: null, brand: null, world: null,
    division: null, character: null,
    roundIndex: 0, scores: [], certified: false, bonus: null
  };
  var rushTimer = null;

  /* ---------------- UI STRINGS (KSA Arabic + English) ---------------- */
  var UI = {
    appTitle:   { ar: "جاهزون للانطلاق في السعودية", en: "KSA Ready, Level Up the Experience" },
    intakeSub:  { ar: "ارتقِ بتجربة الزبائن", en: "Level Up the Customer Experience" },
    empLabel:   { ar: "الرقم الوظيفي", en: "Employee ID" },
    nameLabel:  { ar: "الاسم بالكامل", en: "Full name" },
    empPH:      { ar: "مثال 323999", en: "e.g. 323999" },
    namePH:     { ar: "مثال: فيصل عبدالله", en: "Example: Faisal Abdullah" },
    brandLabel: { ar: "علامتك التجارية", en: "Brand" },
    brandPH:    { ar: "اختر علامتك التجارية", en: "Choose your brand" },
    genderLabel:{ ar: "الجنس", en: "Gender" },
    male:       { ar: "ذكر", en: "Male" },
    female:     { ar: "أنثى", en: "Female" },
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
    timeUp:     { ar: "انتهى الوقت!", en: "Time's up!" },
    check:      { ar: "تحقّق", en: "Check" },
    tryAgain1:  { ar: "مو بالضبط، باقي لك محاولة وحدة", en: "Not quite, one attempt left" },
    correctOrder:{ ar: "الترتيب الصحيح", en: "The correct order" },
    moreLearn:  { ar: "تعلّم أكثر", en: "More learning" },
    sTrue:      { ar: "صح", en: "True" },
    sFalse:     { ar: "خطأ", en: "False" },
    rightWas:   { ar: "الصح كان:", en: "The right move was:" },
    fbHint:     { ar: "لا تنسى تشاركنا رأيك تحت 👇 عشان نطوّر تجربتك", en: "Don't forget to share your feedback below 👇 to help us improve your experience" },
    previewTag: { ar: "معاينة", en: "Preview" },
    dlBadge:    { ar: "نزّل شارتك 📥", en: "Download my badge 📥" },
    shareLine:  { ar: "افتخر فيها وشاركها 🔥 نزّل شارتك وخلّ فريقك يشوف إنجازك", en: "Be proud and share it 🔥 Download your badge and let your team see what you achieved" },
    dlFail:     { ar: "ما قدرنا نجهّز الصورة، جرّب من متصفح ثاني", en: "Couldn't create the image, try another browser" },
    empFound:   { ar: "تم التعرّف عليك", en: "We found you" },
    empNew:     { ar: "أول مرة معنا؟ كمّل عادي 👍", en: "New with us? Carry on 👍" },
    welcomeBack:{ ar: "مرحباً برجوعك", en: "Welcome back" },
    wbBest:     { ar: "أفضل نتيجة", en: "Best score" },
    wbLast:     { ar: "آخر نتيجة", en: "Last score" },
    wbTries:    { ar: "عدد المحاولات", en: "Attempts" },
    wbPassed:   { ar: "أنت مجتاز بالفعل! تقدر تلعب مرة ثانية وتحسّن نتيجتك", en: "You've already passed! Play again to beat your score" },
    wbTryAgain: { ar: "قربت! هالمرة أنت أقرب للنجاح، يلا نكمّل", en: "So close! You're closer this time, let's go" },
    brainBreak: { ar: "استراحة ولعب", en: "Brain break" },
    mgCalm:     { ar: "خذ نفس، هدّي حماسك، ونلعب شوي قبل الجولة الجاية 🔥", en: "Take a breath, cool down, and have some fun before the next round 🔥" },
    mgHowTo:    { ar: "طريقة اللعب", en: "How to play" },
    mgNoScore:  { ar: "لا تشيل هم، هذي اللعبة للمتعة بس وما تأثر على نتيجتك", en: "No pressure, this game is just for fun and doesn't affect your score" },
    mgPlay:     { ar: "يلا نلعب", en: "Let's play" },
    mgSkip:     { ar: "تخطّي وكمّل الجولة الجاية", en: "Skip and continue" },
    mgSkipGame: { ar: "تخطّي، كمّل الجولة الجاية", en: "Skip, next round" }
  };

  /* ---------------- HELPERS ---------------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
  function L(o) { if (!o) return ""; return o[state.lang] != null ? o[state.lang] : (o.en || o.ar || ""); }
  function u(k) { return L(UI[k]); }
  function phMedia() { return { type: "placeholder", label: { ar: "صورة / أنيميشن", en: "image / lottie" } }; }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* ---------------- FEEDBACK (right and wrong must FEEL different) ----------
     Question feedback is authored as "<praise>! <lesson>".
     Correct  -> praise + lesson  ("🔥 عين صقر! التردد الصامت هو طلب مساعدة...")
     Wrong    -> encouraging opener + what the right move was + the same lesson
                 (never the praise, which is what made wrong answers read as
                 congratulations). */
  var PRAISE = [
    { ar: "ممتاز!", en: "Nice!" }, { ar: "أحسنت!", en: "Well done!" },
    { ar: "تمام!", en: "Exactly!" }, { ar: "إحساس عالي!", en: "Great instinct!" }
  ];
  var HARDLUCK = [
    { ar: "ما ظبطت هالمرة.", en: "Not this time." },
    { ar: "قريب، بس مو بالضبط.", en: "Close, but not quite." },
    { ar: "حظ أوفر، ركّز بالتفصيلة.", en: "Hard luck, watch the detail." },
    { ar: "مو هذي، فكّر باللحظة مرة ثانية.", en: "Not this one, rethink the moment." }
  ];
  function pickOne(a) { return a[Math.floor(Math.random() * a.length)]; }
  function splitFb(t) {
    var i = t.indexOf("!");
    if (i > -1 && i < 60) return { praise: t.slice(0, i + 1).trim(), lesson: t.slice(i + 1).trim() };
    return { praise: "", lesson: t };
  }
  function rightMove(q, mech) {
    if (mech === "swipe") return L(q.isOpportunity
      ? { ar: "فرصة تواصل، اسحب يمين", en: "an opportunity, swipe right" }
      : { ar: "أعطه مساحة، اسحب يسار", en: "give space, swipe left" });
    if (mech === "speed") return L(q.isTrue ? { ar: "صح", en: "True" } : { ar: "خطأ", en: "False" });
    if (mech === "convo") return (q.replies && q.replies[q.correct]) ? L(q.replies[q.correct]) : "";
    if (mech === "scenario" || mech === "rush") return (q.options && q.options[q.correct]) ? L(q.options[q.correct]) : "";
    return "";
  }
  function fbText(q, mech, ok, timeout) {
    var p = splitFb(L(q.feedback));
    if (ok) return "✓ " + (p.praise || L(pickOne(PRAISE))) + " " + p.lesson;
    var head = timeout ? ("⏱ " + u("timeUp")) : ("✕ " + L(pickOne(HARDLUCK)));
    var rm = rightMove(q, mech);
    var why = rm ? (" " + u("rightWas") + " " + rm + ".") : "";
    return head + why + " " + p.lesson;
  }

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
    var keyName = typeof ref === "string" ? ref : "";
    var m = typeof ref === "string" ? (window.MEDIA && MEDIA[ref]) : ref;
    var wrap = el("div", "media-slot");
    var anim = el("div", "media-anim frame " + (sizeCls || "media-md"));
    function showPH() {
      anim.innerHTML = "";
      var ph = el("div", "media-ph");
      ph.appendChild(el("div", "pe", "🖼️"));
      ph.appendChild(el("div", "ps", (m && m.label) ? L(m.label) : (keyName || "media")));
      anim.appendChild(ph);
    }
    if (!m || m.type === "placeholder") {
      showPH();
    } else if (m.type === "png") {
      var img = el("img", "media-img"); img.src = m.src; img.alt = ""; img.onerror = showPH; anim.appendChild(img);
    } else if (m.type === "lottie") {
      var lp = document.createElement("lottie-player");
      lp.className = "media-lottie"; lp.setAttribute("src", m.src);
      lp.setAttribute("autoplay", ""); lp.setAttribute("loop", "");
      lp.addEventListener("error", showPH);
      anim.appendChild(lp);
    } else {
      showPH();
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
  function playerHistory(empId) {
    if (!backendReady() || !empId) return Promise.resolve({ attempts: 0 });
    var url = CONFIG.scriptUrl + "?token=" + encodeURIComponent(CONFIG.secretToken) +
              "&action=history&empId=" + encodeURIComponent(empId);
    return fetch(url).then(function (r) { return r.json(); }).catch(function () { return { attempts: 0 }; });
  }

  function lookupEmp(empId) {
    if (!backendReady() || !empId) return Promise.resolve({ found: false });
    var url = CONFIG.scriptUrl + "?token=" + encodeURIComponent(CONFIG.secretToken) +
              "&action=lookup&empId=" + encodeURIComponent(empId);
    return fetch(url).then(function (r) { return r.json(); }).catch(function () { return { found: false }; });
  }

  function post(payload) {
    if (state.preview) return Promise.resolve({ ok: true, offline: true });  // preview never writes real data
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
  function renderWelcomeBack(box, h) {
    box.className = "welcome-back show";
    box.innerHTML = "";
    var wname = (state.listMatch && state.listMatch.name) || $("#name").value.trim();
    var firstName = wname ? wname.split(/\s+/)[0] : "";

    box.appendChild(el("div", "wb-title", "👋 " + u("welcomeBack") + (firstName ? "، " + firstName : "")));

    var stats = el("div", "wb-stats");
    function stat(val, label) {
      var s = el("div", "wb-stat");
      s.appendChild(el("div", "wb-v", String(val)));
      s.appendChild(el("div", "wb-l", label));
      return s;
    }
    stats.appendChild(stat(h.best + "%", u("wbBest")));
    stats.appendChild(stat(h.last + "%", u("wbLast")));
    stats.appendChild(stat(h.attempts, u("wbTries")));
    box.appendChild(stats);

    var line = el("div", "wb-msg");
    if (h.passed) {
      line.className = "wb-msg ok";
      line.textContent = "🏆 " + u("wbPassed");
    } else {
      line.className = "wb-msg push";
      line.textContent = "💪 " + u("wbTryAgain");
    }
    box.appendChild(line);
  }

  function buildIntake() {
    rerenderCurrent = buildIntake;
    ksaTheme(); setBg("entry"); setHeaderLogos("entry");
    $("#intakeTitle").textContent = u("appTitle");
    $("#intakeSub").textContent = u("intakeSub");
    renderKsaFlag();
    var root = $("#intakeForm"); root.innerHTML = "";
    root.appendChild(fieldText("empId", u("empLabel"), state.empId, u("empPH")));
    root.appendChild(fieldText("name", u("nameLabel"), state.name, u("namePH")));
    var emp = $("#empId");
    emp.setAttribute("inputmode", "numeric"); emp.setAttribute("maxlength", "12"); emp.setAttribute("autocomplete", "off");
    emp.addEventListener("input", function () { this.value = this.value.replace(/\D/g, ""); });

    /* Match the Emp ID against the company active list as soon as they finish
       typing. This is a courtesy only: it confirms we know them and saves the
       reporting join later. A new hire who doesn't know their ID yet, or who
       isn't on the list, is NEVER blocked. */
    var empNote = el("div", "emp-note");
    emp.parentNode.appendChild(empNote);
    var welcomeBack = el("div", "welcome-back");
    emp.parentNode.appendChild(welcomeBack);
    var lastLooked = "";
    emp.addEventListener("blur", function () {
      var v = emp.value.trim();
      if (!v || v === lastLooked || !backendReady()) return;
      lastLooked = v;
      empNote.className = "emp-note show muted-note";
      empNote.textContent = "…";
      welcomeBack.className = "welcome-back";
      lookupEmp(v).then(function (r) {
        if (r && r.found) {
          state.listMatch = r;
          empNote.className = "emp-note show ok";
          empNote.textContent = "✓ " + u("empFound") + ": " + (r.name || "") + (r.brand ? " · " + r.brand : "");
          if (!$("#name").value.trim() && r.name) $("#name").value = r.name;   // helpful prefill, still editable
        } else {
          state.listMatch = null;
          empNote.className = "emp-note show muted-note";
          empNote.textContent = u("empNew");
        }
      });
      // separately, check if they've played before -> welcome back with their history
      playerHistory(v).then(function (h) {
        if (!h || !h.attempts) return;
        renderWelcomeBack(welcomeBack, h);
      });
    });
    var nm = $("#name");
    nm.setAttribute("autocomplete", "off");
    nm.addEventListener("input", function () { this.value = this.value.replace(/[^A-Za-z\u0600-\u06FF\s'.\-]/g, ""); });

    var fg = el("div", "field");
    fg.appendChild(el("label", null, u("genderLabel")));
    var seg = el("div", "seg");
    [["male", u("male")], ["female", u("female")]].forEach(function (pair) {
      var b = el("button", "seg-btn" + (state.gender === pair[0] ? " on" : ""), pair[1]);
      b.type = "button";
      b.onclick = function () {
        state.gender = pair[0];
        Array.prototype.forEach.call(seg.children, function (c) { c.classList.remove("on"); });
        b.classList.add("on");
      };
      seg.appendChild(b);
    });
    fg.appendChild(seg); root.appendChild(fg);

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
      if (!emp || !nm || !state.gender || bi === "") { root.classList.add("shake"); setTimeout(function () { root.classList.remove("shake"); }, 400); return; }
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

  /* KSA flag on the entry screen: waving emoji now; upgrades to a gently waving
     real flag automatically if assets/images/ksa-flag.png is present. */
  /* KSA flag on the entry screen. Reads the "ksaFlag" slot in media-config.js:
     drop in a Lottie or PNG and it appears automatically. If the file isn't
     there yet, it falls back to the animated flag emoji. */
  function renderKsaFlag() {
    var host = $("#ksaFlag"); if (!host) return;
    function emoji() { host.innerHTML = ""; host.appendChild(el("span", "flag-emoji", "🇸🇦")); }
    emoji();
    var m = window.MEDIA && MEDIA.ksaFlag;
    if (!m || !m.src || m.type === "placeholder") return;

    if (m.type === "png") {
      var probe = new Image();
      probe.onload = function () {
        host.innerHTML = "";
        var img = el("img", "ksa-flag-img"); img.src = m.src; img.alt = "";
        host.appendChild(img);
      };
      probe.src = m.src;
    } else if (m.type === "lottie" && window.fetch) {
      fetch(m.src).then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function () {
        host.innerHTML = "";
        var lp = document.createElement("lottie-player");
        lp.className = "ksa-flag-lottie"; lp.setAttribute("src", m.src);
        lp.setAttribute("autoplay", ""); lp.setAttribute("loop", "");
        host.appendChild(lp);
      }).catch(function () { /* keep emoji */ });
    }
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
    var w = WORLDS[state.world], chars = (w.characters[state.gender] || w.characters.male || []), ci = 0;
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

      var circle = el("div", "char-bigcircle");
      var img = el("img", "char-bigimg"); img.src = chars[ci].png; img.alt = "";
      img.onerror = function () {
        circle.classList.add("ph");
        if (img.parentNode) circle.removeChild(img);
        circle.appendChild(el("div", "char-bigph", w.floaters[0]));
      };
      circle.appendChild(img);

      stage.appendChild(prev); stage.appendChild(circle); stage.appendChild(nextB);
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
    /* SPEED — quick-fire true/false with instant feedback (Starbucks R3) */
    speed: {
      answered: function (a) { return a === true || a === false; },
      correct: function (q, a) { return a === !!q.isTrue; },
      render: function (q, area, saved, onAnswer) {
        area.appendChild(renderMedia(q.media || phMedia(), "media-sm"));
        area.appendChild(el("div", "speed-card", L(q.statement)));
        var btns = el("div", "speed-btns");
        var no = el("button", "speed-btn no", "✕ " + u("sFalse"));
        var yes = el("button", "speed-btn yes", "✓ " + u("sTrue"));
        var fb = el("div", "fb");
        function paint(v) {
          if (v == null) return;
          [no, yes].forEach(function (b) { b.disabled = true; b.classList.remove("sel"); });
          var right = !!q.isTrue;
          (right ? yes : no).classList.add("ok");
          if (v !== right) (v ? yes : no).classList.add("bad");
          fb.className = "fb show " + (v === right ? "ok" : "no");
          fb.textContent = fbText(q, "speed", v === right);
        }
        no.onclick = function () { onAnswer(false); paint(false); };
        yes.onclick = function () { onAnswer(true); paint(true); };
        btns.appendChild(no); btns.appendChild(yes);
        area.appendChild(btns); area.appendChild(fb);
        if (saved != null) paint(saved);
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
    /* CONVO — guest chat bubble + tappable reply bubbles (curated conversations) */
    convo: {
      answered: function (a) { return a != null; },
      correct: function (q, a) { return a === q.correct; },
      render: function (q, area, saved, onAnswer) {
        area.appendChild(renderMedia(q.media || phMedia(), "media-sm"));
        var thread = el("div", "convo-thread");
        var gline = el("div", "convo-guest");
        gline.appendChild(el("div", "convo-av", "🙋"));
        gline.appendChild(el("div", "convo-bubble", L(q.guest)));
        thread.appendChild(gline);
        area.appendChild(thread);
        var opts = el("div", "convo-replies");
        function paint(pick) {
          Array.prototype.forEach.call(opts.children, function (c, ci) {
            c.classList.remove("ok", "no", "sel");
            if (pick != null) { if (ci === q.correct) c.classList.add("ok"); else if (ci === pick) c.classList.add("no"); }
          });
        }
        q.replies.forEach(function (r, i) {
          var b = el("button", "convo-reply", L(r));
          b.onclick = function () { paint(i); onAnswer(i); };
          opts.appendChild(b);
        });
        area.appendChild(opts);
        if (saved != null) paint(saved);
      }
    },
    /* MATCH — RAPID MATCH: one item at a time, tap the match from 3 options.
       Same data shape (pairs listed in correct order); distractors are drawn
       from the other pairs in the same question. Far faster and lighter to read
       than an 8-chip grid: 4 taps instead of 9, and 4 short items on screen. */
    match: {
      answered: function (a) { return !!(a && a.picks && a.n && a.picks.length === a.n); },
      correct: function (q, a) { return !!(a && a.picks && a.picks.every(function (p, i) { return p === i; })); },
      render: function (q, area, saved, onAnswer) {
        var n = q.pairs.length;
        var picks = saved && saved.picks ? saved.picks.slice() : [];

        area.appendChild(renderMedia(q.media || phMedia(), "media-sm"));
        if (q.instruction) area.appendChild(el("div", "scn-bubble", L(q.instruction)));

        var stepLbl = el("div", "rm-step");
        var host = el("div", "rm-host");
        area.appendChild(stepLbl); area.appendChild(host);

        function save() { return { picks: picks.slice(), n: n }; }

        function summary() {
          stepLbl.textContent = "";
          host.innerHTML = "";
          var list = el("div", "rm-summary");
          q.pairs.forEach(function (p, i) {
            var ok = picks[i] === i;
            var row = el("div", "rm-srow " + (ok ? "ok" : "no"));
            row.appendChild(el("span", "rm-mark", ok ? "✓" : "✕"));
            var body = el("span", "rm-sbody");
            body.appendChild(el("span", "rm-sl", L(p.left)));
            body.appendChild(el("span", "rm-sr", L(q.pairs[i].right)));
            if (!ok && picks[i] != null) {
              var wrong = el("span", "rm-swrong", "✕ " + L(q.pairs[picks[i]].right));
              body.appendChild(wrong);
            }
            row.appendChild(body);
            list.appendChild(row);
          });
          host.appendChild(list);
        }

        function step() {
          var i = picks.length;
          if (i >= n) { summary(); return; }
          host.innerHTML = "";
          stepLbl.textContent = (i + 1) + " / " + n;

          var card = el("div", "rm-card", L(q.pairs[i].left));
          host.appendChild(card);

          // options: the correct right + up to 2 distractors from other pairs
          var others = [];
          for (var k = 0; k < n; k++) if (k !== i) others.push(k);
          shuffle(others);
          var choice = [i].concat(others.slice(0, 2));
          shuffle(choice);

          var opts = el("div", "rm-opts");
          choice.forEach(function (pi) {
            var b = el("button", "rm-opt", L(q.pairs[pi].right));
            b.onclick = function () {
              Array.prototype.forEach.call(opts.children, function (c) { c.disabled = true; });
              b.classList.add(pi === i ? "ok" : "no");
              if (pi !== i) {
                Array.prototype.forEach.call(opts.children, function (c, ci) {
                  if (choice[ci] === i) c.classList.add("ok");
                });
              }
              picks.push(pi);
              onAnswer(save());
              setTimeout(function () { step(); }, pi === i ? 380 : 900);
            };
            opts.appendChild(b);
          });
          host.appendChild(opts);
        }

        if (picks.length >= n) summary(); else step();
      }
    },
    /* ORDER — tap the steps in sequence. 2 trials, then reveal + explain. */
    order: {
      answered: function (a) { return !!(a && a.locked); },
      correct: function (q, a) { return !!(a && a.ok); },
      render: function (q, area, saved, onAnswer) {
        var n = q.steps.length;
        var tries = saved && saved.tries ? saved.tries : 0;
        var locked = !!(saved && saved.locked), okState = !!(saved && saved.ok);

        // current arrangement = array of original indices (oidx)
        var arr;
        if (saved && saved.order) arr = saved.order.slice();
        else { arr = q.steps.map(function (s, i) { return i; }); shuffle(arr); }

        area.appendChild(renderMedia(q.media || phMedia(), "media-sm"));
        if (q.instruction) area.appendChild(el("div", "scn-bubble", L(q.instruction)));
        if (!locked) area.appendChild(el("div", "order-hint", L({ ar: "اسحب العناصر لإعادة ترتيبها", en: "Drag the items to reorder them" })));

        var list = el("div", "order-list");
        area.appendChild(list);
        var msg = el("div", "trial-msg");
        var checkBtn = el("button", "btn check-btn", u("check"));
        area.appendChild(msg); area.appendChild(checkBtn);

        function buildRows() {
          list.innerHTML = "";
          arr.forEach(function (oidx, idx) {
            var row = el("div", "order-row");
            row.appendChild(el("span", "order-grip", "⋮⋮"));
            row.appendChild(el("span", "order-badge", String(idx + 1)));
            row.appendChild(el("span", "order-text", L(q.steps[oidx])));
            row._oidx = oidx;
            if (!locked) { row.style.touchAction = "none"; row.addEventListener("pointerdown", function (e) { startDrag(e, row); }); }
            list.appendChild(row);
          });
        }
        function renumber() {
          Array.prototype.forEach.call(list.children, function (row, idx) { row.querySelector(".order-badge").textContent = String(idx + 1); });
        }
        function syncArr() { arr = Array.prototype.map.call(list.children, function (r) { return r._oidx; }); }
        function save() { return { order: arr.slice(), tries: tries, locked: locked, ok: okState }; }

        var dragRow = null, grabOffsetY = 0;
        function startDrag(e, row) {
          if (locked) return;
          dragRow = row; grabOffsetY = e.clientY - row.getBoundingClientRect().top;
          row.classList.add("dragging");
          document.addEventListener("pointermove", onMove);
          document.addEventListener("pointerup", onUp);
          e.preventDefault();
        }
        function onMove(e) {
          if (!dragRow) return;
          e.preventDefault();
          dragRow.style.transform = "";                       // clear to measure true slots
          var desiredTop = e.clientY - grabOffsetY;
          var center = desiredTop + dragRow.offsetHeight / 2;
          var others = Array.prototype.filter.call(list.children, function (r) { return r !== dragRow; });
          var placed = false;
          for (var i = 0; i < others.length; i++) {
            var rect = others[i].getBoundingClientRect();
            if (center < rect.top + rect.height / 2) { list.insertBefore(dragRow, others[i]); placed = true; break; }
          }
          if (!placed) list.appendChild(dragRow);
          renumber();
          var slotTop = dragRow.getBoundingClientRect().top;   // slot after any reorder
          dragRow.style.transform = "translateY(" + (desiredTop - slotTop) + "px) scale(1.03)";
        }
        function onUp() {
          if (!dragRow) return;
          dragRow.style.transform = ""; dragRow.classList.remove("dragging"); dragRow = null;
          document.removeEventListener("pointermove", onMove);
          document.removeEventListener("pointerup", onUp);
          syncArr(); onAnswer(save());
        }

        function lockUI() {
          locked = true;
          Array.prototype.forEach.call(list.children, function (r) { r.style.touchAction = ""; });
          checkBtn.style.display = "none";
          var hint = area.querySelector(".order-hint"); if (hint) hint.style.display = "none";
        }
        function markRightWrong() {
          Array.prototype.forEach.call(list.children, function (row, idx) {
            row.classList.remove("dragging"); row.classList.add(row._oidx === idx ? "right" : "wrong");
            var g = row.querySelector(".order-grip"); if (g) g.style.visibility = "hidden";
          });
        }
        function revealSolution() {
          var sol = el("div", "solution");
          sol.appendChild(el("div", "solution-h", u("correctOrder")));
          var ol = el("ol", "sol-order");
          q.steps.forEach(function (s) { ol.appendChild(el("li", null, L(s))); });
          sol.appendChild(ol); area.appendChild(sol);
        }

        checkBtn.onclick = function () {
          syncArr();
          var ok = arr.every(function (o, k) { return o === k; });
          if (ok) {
            okState = true; lockUI();
            Array.prototype.forEach.call(list.children, function (r) { r.classList.add("right"); var g = r.querySelector(".order-grip"); if (g) g.style.visibility = "hidden"; });
            onAnswer(save());
          } else {
            tries++;
            if (tries >= 2) { okState = false; lockUI(); markRightWrong(); revealSolution(); onAnswer(save()); }
            else { msg.className = "trial-msg show"; msg.textContent = u("tryAgain1"); onAnswer(save()); }
          }
        };

        buildRows();
        if (locked) {
          lockUI();
          if (okState) Array.prototype.forEach.call(list.children, function (r) { r.classList.add("right"); var g = r.querySelector(".order-grip"); if (g) g.style.visibility = "hidden"; });
          else { markRightWrong(); revealSolution(); }
        }
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
    var rp = $("#roundPlayer"); if (rp) { rp.innerHTML = ""; rp.appendChild(playerChip()); }
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
          fb.textContent = fbText(q, round.mechanic, ok);
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
          state.roundIndex++; maybeBreak();
        } else { idx++; draw(); }
      };
      nav.appendChild(prev); nav.appendChild(next);
      mount.appendChild(nav);

      showFb();
    }
    draw();
  }

  /* ---------------- RESULT ---------------- */
  function maybeBreak() {
    var more = state.division && state.roundIndex < state.division.rounds.length;
    if (more && window.MINIGAMES && window.MINIGAMES.length) { showMiniGame(); return; }
    playRound();
  }

  function advanceRound(pct) {
    state.scores.push(pct); state.roundIndex++;
    maybeBreak();
  }

  /* ---------------- BRAIN BREAK (mini-game between rounds) ----------------
     Pure fun, zero scoring impact. Picks a different game each break. */
  function showMiniGame() {
    var games = window.MINIGAMES;
    var g = games[(state.roundIndex - 1) % games.length];
    var c = $("#minigameCard"); c.innerHTML = "";
    rerenderCurrent = showMiniGame;
    showScreen("screen-minigame");
    miniGameIntro(c, g);
  }

  /* Intro screen: cools the player down after a scored round and explains the
     game BEFORE it starts, so they're not dropped in cold and confused. */
  function miniGameIntro(c, g) {
    c.innerHTML = "";
    var intro = el("div", "mg-intro");

    intro.appendChild(el("div", "mg-intro-badge", "🎮 " + u("brainBreak")));
    intro.appendChild(el("div", "mg-intro-emoji", g.emoji || "🎯"));
    intro.appendChild(el("div", "mg-intro-name", L(g.name)));
    intro.appendChild(el("div", "mg-intro-calm", u("mgCalm")));

    var how = el("div", "mg-intro-how");
    how.appendChild(el("div", "mg-intro-how-t", u("mgHowTo")));
    how.appendChild(el("div", "mg-intro-how-d", L(g.how)));
    intro.appendChild(how);

    intro.appendChild(el("div", "mg-intro-note", u("mgNoScore")));

    var play = el("button", "btn mg-play", u("mgPlay") + " " + (g.emoji || "🎮"));
    play.onclick = function () { mountGame(c, g); };
    intro.appendChild(play);

    var skip = el("button", "mg-skip", u("mgSkip"));
    skip.onclick = function () { playRound(); };
    intro.appendChild(skip);

    c.appendChild(intro);
  }

  function mountGame(c, g) {
    c.innerHTML = "";
    var head = el("div", "mg-head");
    head.appendChild(el("div", "mg-tag", L(g.tag)));
    head.appendChild(el("div", "mg-name", L(g.name)));
    c.appendChild(head);

    var mount = el("div", "mg-mount");
    c.appendChild(mount);

    var skip = el("button", "mg-skip", u("mgSkipGame"));
    skip.onclick = function () { playRound(); };
    c.appendChild(skip);

    g.mount(mount, function () { playRound(); }, state.lang);
  }

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
        fb.textContent = fbText(q, "rush", ok, i === -1);
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

    if (passed) c.appendChild(el("div", "trophy", "🏆"));
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
      empId: state.empId, name: state.name, gender: state.gender || "", character: state.character,
      scores: state.scores, total: total, passed: passed ? "yes" : "no", lang: state.lang,
      bonus: state.bonus ? state.bonus.score : "", energy: state.bonus ? state.bonus.energy : "",
      clientTime: new Date().toISOString()
    });

    c.appendChild(el("div", "fbk-hint", u("fbHint")));

    if (!passed) {
      c.appendChild(buildFeedback());
      var retry = el("button", "btn", u("retry"));
      retry.onclick = function () { state.roundIndex = 0; state.scores = []; state.bonus = null; playRound(); };
      c.appendChild(retry);
      c.appendChild(learnButton(u("moreLearn"), "btn ghost"));
    } else {
      c.appendChild(buildBadge(total));
      c.appendChild(el("div", "share-line", u("shareLine")));
      var dl = el("button", "btn dl-btn", u("dlBadge"));
      dl.onclick = function () { downloadBadge(total, dl); };
      c.appendChild(dl);
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

  function learnButton(label, cls) {
    var a = el("a", cls || "btn", label || u("learnBtn"));
    a.href = WORLDS[state.world].learnUrl; a.target = "_blank"; a.rel = "noopener";
    return a;
  }

  /* persistent player identity chip (avatar + name) shown on round screens */
  function playerChip() {
    var w = WORLDS[state.world];
    var list = (w.characters && (w.characters[state.gender] || w.characters.male)) || [];
    var ch = list.filter(function (c) { return c.id === state.character; })[0];
    var chip = el("div", "player-chip");
    var av = el("div", "player-av");
    if (ch && ch.png) {
      var img = el("img"); img.src = ch.png; img.alt = "";
      img.onerror = function () { av.classList.add("ph"); av.textContent = (w.floaters && w.floaters[0]) || "★"; if (img.parentNode) av.removeChild(img); };
      av.appendChild(img);
    } else { av.classList.add("ph"); av.textContent = (w.floaters && w.floaters[0]) || "★"; }
    chip.appendChild(av);
    chip.appendChild(el("span", "player-name", state.name || ""));
    return chip;
  }

  /* ---------------- BADGE IMAGE (downloadable) ----------------
     Drawn natively on a canvas (no external library, nothing to be blocked by
     a corporate network) at 1080x1350, which is the portrait size social apps
     like best. Arabic is rendered with ctx.direction = "rtl" so it shapes and
     aligns correctly. */
  function badgeCanvas(total, cb) {
    var w = WORLDS[state.world], d = state.division;
    var W = 1080, H = 1350;
    var cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    var ctx = cv.getContext("2d");
    var isAr = state.lang === "ar";

    function paint(logoImg) {
      // background: the world's own gradient
      var cols = (w.bgGradient || w.gradient || "#333333").match(/#[0-9a-fA-F]{3,8}/g) || ["#333333", "#111111"];
      var g = ctx.createLinearGradient(0, 0, W, H);
      cols.forEach(function (c, i) { g.addColorStop(cols.length > 1 ? i / (cols.length - 1) : 0, c); });
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

      // soft centre glow
      var rg = ctx.createRadialGradient(W / 2, H * 0.40, 30, W / 2, H * 0.40, W * 0.8);
      rg.addColorStop(0, "rgba(255,255,255,.20)"); rg.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = rg; ctx.fillRect(0, 0, W, H);

      // inner hairline frame
      ctx.strokeStyle = "rgba(255,255,255,.30)"; ctx.lineWidth = 4;
      roundRect(ctx, 34, 34, W - 68, H - 68, 34); ctx.stroke();

      ctx.direction = isAr ? "rtl" : "ltr";
      ctx.textAlign = "center";

      // logo
      if (logoImg) {
        var lh = 150, lw = lh * (logoImg.width / logoImg.height);
        var maxW = W * 0.66;
        if (lw > maxW) { lw = maxW; lh = lw * (logoImg.height / logoImg.width); }
        ctx.drawImage(logoImg, (W - lw) / 2, 110, lw, lh);
      }

      // medal
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,.35)"; ctx.shadowBlur = 30; ctx.shadowOffsetY = 10;
      ctx.beginPath(); ctx.arc(W / 2, 500, 150, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff"; ctx.fill();
      ctx.restore();
      ctx.beginPath(); ctx.arc(W / 2, 500, 150, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,186,46,.85)"; ctx.lineWidth = 8; ctx.stroke();
      star(ctx, W / 2, 500, 92, 44, "#ffba2e");

      function line(t, y, size, weight, color, ls) {
        ctx.font = weight + " " + size + "px Cairo, 'Segoe UI', sans-serif";
        ctx.fillStyle = color;
        if ("letterSpacing" in ctx) ctx.letterSpacing = (ls || 0) + "px";
        ctx.fillText(t, W / 2, y);
        if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";
      }

      line(u("mastery"), 740, 36, "800", "#ffe08a", 8);
      line(state.name || "", 828, 76, "900", "#ffffff");
      var champ = isAr ? (u("championOf") + " " + L(d.title)) : (L(d.title) + " " + u("championOf"));
      line(champ, 890, 40, "800", "rgba(255,255,255,.96)");
      line(u("scoredTxt") + " " + total + "%", 958, 42, "800", "#ffffff");
      line(monthYear(), 1018, 34, "700", "rgba(255,255,255,.85)");

      ctx.strokeStyle = "rgba(255,255,255,.28)"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(W * 0.22, 1078); ctx.lineTo(W * 0.78, 1078); ctx.stroke();
      line(u("orgFoot"), 1132, 32, "800", "rgba(255,255,255,.95)");
      line(L(state.brand), 1196, 30, "700", "rgba(255,255,255,.75)");

      cb(cv);
    }

    var img = new Image();
    img.onload = function () { paint(img); };
    img.onerror = function () { paint(null); };
    img.src = w.logoWhite;
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function star(ctx, cx, cy, outer, inner, fill) {
    ctx.save(); ctx.beginPath();
    for (var i = 0; i < 10; i++) {
      var r = i % 2 === 0 ? outer : inner;
      var a = (Math.PI / 5) * i - Math.PI / 2;
      ctx[i === 0 ? "moveTo" : "lineTo"](cx + Math.cos(a) * r, cy + Math.sin(a) * r);
    }
    ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.restore();
  }

  function downloadBadge(total, btn) {
    var go = function () {
      badgeCanvas(total, function (cv) {
        try {
          cv.toBlob(function (blob) {
            if (!blob) { btn.textContent = u("dlFail"); return; }
            var a = document.createElement("a");
            var url = URL.createObjectURL(blob);
            a.href = url;
            a.download = (state.division.id + "-badge-" + (state.name || "player")).replace(/\s+/g, "-") + ".png";
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
            setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
          }, "image/png");
        } catch (e) { btn.textContent = u("dlFail"); }
      });
    };
    // make sure the webfont is ready so the canvas doesn't fall back to a system font
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(go).catch(go); else go();
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
    var w = WORLDS[state.world] || {};
    // the world's own colour, gold, and a couple of neutral sparkles
    var cols = [w.color || "#e43c50", "#ffd24a", "#ffffff", w.color || "#e43c50", "#ffb300", "#19b36b"];
    for (var i = 0; i < 110; i++) {
      var p = el("i");
      p.style.left = (Math.random() * 100) + "%";
      p.style.background = cols[i % cols.length];
      p.style.width = (5 + Math.random() * 6) + "px";
      p.style.height = (8 + Math.random() * 9) + "px";
      p.style.opacity = (0.75 + Math.random() * 0.25);
      p.style.animationDuration = (Math.random() * 1.8 + 2.4) + "s";
      p.style.animationDelay = (Math.random() * 0.9) + "s";
      box.appendChild(p);
    }
    setTimeout(function () { box.innerHTML = ""; }, 5200);
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
        empId: state.empId, name: state.name, rating: rating, comment: ta.value.trim(),
        lang: state.lang, clientTime: new Date().toISOString() });
      box.innerHTML = ""; box.appendChild(el("h3", "h3", u("thanks")));
    };
    box.appendChild(send); return box;
  }

  /* ---------------- INIT ---------------- */
  /* ---------------- PREVIEW SHORTCUT (for reviewing, not for players) -------
     Add ?preview=pass or ?preview=fail to the URL to jump straight to the
     result screen with sample data. Optional: &world=retail|hospitality|
     starbucks  &lang=ar|en  &gender=male|female
     Examples:  index.html?preview=pass&world=starbucks
                index.html?preview=fail&world=hospitality&lang=en          */
  function devPreview() {
    var q = {};
    location.search.replace(/^\?/, "").split("&").forEach(function (kv) {
      if (!kv) return; var p = kv.split("="); q[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || "");
    });
    var mode = q.preview;
    if (mode !== "pass" && mode !== "fail") return false;

    if (q.lang === "ar" || q.lang === "en") { state.lang = q.lang; applyDir(); $("#langLabel").textContent = state.lang === "ar" ? "EN" : "ع"; }

    var wid = q.world;
    if (!wid || !WORLDS[wid] || !window["DIVISION_" + wid]) wid = "retail";
    state.world = wid;
    state.division = window["DIVISION_" + wid];
    state.gender = (q.gender === "female") ? "female" : "male";
    state.empId = "323999";
    state.name = q.name || (state.lang === "ar" ? "فيصل عبدالله" : "Faisal Abdullah");
    var brands = BRANDS.filter(function (b) { return b.world === wid; });
    state.brand = brands[0] || BRANDS[0];
    var chars = (WORLDS[wid].characters[state.gender] || WORLDS[wid].characters.male || []);
    state.character = chars.length ? chars[0].id : null;
    state.certified = false;
    state.preview = true;

    var target = mode === "pass" ? 92 : 44;
    state.scores = state.division.rounds.map(function (rd) { return rd.bonus ? 88 : target; });
    state.bonus = { score: 88, energy: 76, streak: 5 };

    applyWorldTheme(wid);
    showResult();

    var tag = el("div", "preview-tag", u("previewTag") + " · " + mode + " · " + wid);
    document.body.appendChild(tag);
    return true;
  }

  function init() {
    applyDir();
    $("#langBtn").onclick = function () { setLang(state.lang === "ar" ? "en" : "ar"); };
    $("#langLabel").textContent = state.lang === "ar" ? "EN" : "ع";
    buildFooter();
    if (devPreview()) return;
    buildIntake();
  }
  document.addEventListener("DOMContentLoaded", init);
})();

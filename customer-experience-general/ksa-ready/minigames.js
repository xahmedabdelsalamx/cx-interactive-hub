/* ============================================================
   MINI-GAMES — "Brain Break" between rounds
   A short, self-instructed, no-wrong-answer game shown between rounds to
   reset attention. Purely for fun and energy: it does NOT affect the score
   or the 80% pass mark.

   All games inherit the CURRENT WORLD's colours automatically via the CSS
   variables --brand and --grad that engine.js already sets per world:
     retail #e43c50 · hospitality #f15a24 · starbucks #006241

   Each game exports: { id, name:{ar,en}, tag:{ar,en}, how:{ar,en}, mount(el, done) }
   `mount` renders into el and calls done() when the player finishes/skips.
   Works with touch, mouse and pen (pointer events). Mobile first.
   ============================================================ */
(function () {
  "use strict";

  function el(tag, cls, txt) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt != null) e.textContent = txt;
    return e;
  }
  function L(o, lang) { return o && (o[lang] || o.en || o.ar) || ""; }

  /* ---------------------------------------------------------
     GAME 1 · PENALTY RUSH — drag the ball, beat the keeper
     5 shots. Swipe/drag from the ball toward the goal.
     --------------------------------------------------------- */
  var penalty = {
    id: "penalty",
    name: { ar: "ركلات الترجيح", en: "Penalty Rush" },
    tag: { ar: "استراحة سريعة", en: "Brain Break" },
    how: { ar: "اسحب الكرة باتجاه المرمى وارفع إصبعك للتسديد. عندك 5 محاولات.", en: "Drag the ball toward the goal and release to shoot. You get 5 shots." },
    mount: function (root, done, lang) {
      var TOTAL = 5;
      var st = { shots: TOTAL, goals: 0, streak: 0, busy: false };

      var hud = el("div", "mg-hud");
      var sGoals = el("div", "mg-stat"), sShots = el("div", "mg-stat"), sStreak = el("div", "mg-stat");
      [[sGoals, { ar: "أهداف", en: "Goals" }], [sShots, { ar: "محاولات", en: "Shots" }], [sStreak, { ar: "تتابع", en: "Streak" }]].forEach(function (p) {
        p[0].appendChild(el("div", "mg-stat-l", L(p[1], lang)));
        p[0].appendChild(el("div", "mg-stat-v", "0"));
        hud.appendChild(p[0]);
      });
      root.appendChild(hud);

      var arena = el("div", "mg-arena pitch");
      arena.appendChild(el("div", "pg-goal"));
      var keeper = el("div", "pg-keeper", "🧤");
      var ball = el("div", "pg-ball", "⚽");
      var aim = el("div", "pg-aim");
      var flash = el("div", "mg-flash");
      arena.appendChild(keeper); arena.appendChild(aim); arena.appendChild(ball); arena.appendChild(flash);
      root.appendChild(arena);

      var hint = el("div", "mg-hint", L(penalty.how, lang));
      root.appendChild(hint);

      function upd() {
        sGoals.querySelector(".mg-stat-v").textContent = st.goals;
        sShots.querySelector(".mg-stat-v").textContent = st.shots;
        sStreak.querySelector(".mg-stat-v").textContent = st.streak;
      }
      function reset() {
        var r = arena.getBoundingClientRect();
        ball.style.left = (r.width / 2) + "px";
        ball.style.top = (r.height * 0.78) + "px";
        ball.style.transform = "translate(-50%,-50%) scale(1)";
        keeper.style.left = "50%";
        aim.style.opacity = "0";
      }
      setTimeout(reset, 30);

      var dragging = false, start = null;
      function pt(e) { var r = arena.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }

      arena.addEventListener("pointerdown", function (e) {
        if (st.busy || st.shots <= 0) return;
        dragging = true; start = pt(e); aim.style.opacity = "1"; e.preventDefault();
      });
      arena.addEventListener("pointermove", function (e) {
        if (!dragging) return;
        var p = pt(e), r = arena.getBoundingClientRect();
        var bx = r.width / 2, by = r.height * 0.78;
        var dx = p.x - start.x, dy = p.y - start.y;
        aim.style.left = bx + "px"; aim.style.top = by + "px";
        var ang = Math.atan2(dy, dx) * 180 / Math.PI;
        var len = Math.min(Math.sqrt(dx * dx + dy * dy), 120);
        aim.style.width = len + "px";
        aim.style.transform = "translate(0,-50%) rotate(" + ang + "deg)";
        e.preventDefault();
      });
      arena.addEventListener("pointerup", function (e) {
        if (!dragging) return;
        dragging = false; aim.style.opacity = "0";
        var p = pt(e), dx = p.x - start.x, dy = p.y - start.y;
        if (dy > -20) { return; }            // must flick upward toward goal
        shoot(dx, dy);
        e.preventDefault();
      });
      arena.addEventListener("pointercancel", function () { dragging = false; aim.style.opacity = "0"; });

      function shoot(dx, dy) {
        st.busy = true;
        var r = arena.getBoundingClientRect();
        var targetX = Math.max(r.width * 0.12, Math.min(r.width * 0.88, r.width / 2 + dx * 1.6));
        var targetY = r.height * 0.16;
        // keeper picks a side, with a fair chance of guessing wrong
        var dive = [r.width * 0.2, r.width * 0.5, r.width * 0.8][Math.floor(Math.random() * 3)];
        keeper.style.left = dive + "px";
        ball.style.transition = "left .42s cubic-bezier(.3,.8,.4,1), top .42s cubic-bezier(.3,.8,.4,1), transform .42s";
        ball.style.left = targetX + "px";
        ball.style.top = targetY + "px";
        ball.style.transform = "translate(-50%,-50%) scale(.62)";

        setTimeout(function () {
          var saved = Math.abs(targetX - dive) < r.width * 0.13;
          var wide = targetX < r.width * 0.14 || targetX > r.width * 0.86;
          st.shots--;
          if (!saved && !wide) { st.goals++; st.streak++; msg("⚽ " + L({ ar: "هدف!", en: "GOAL!" }, lang), "gold"); pop(); }
          else if (saved) { st.streak = 0; msg("🧤 " + L({ ar: "تصدّى!", en: "SAVED!" }, lang), "bad"); }
          else { st.streak = 0; msg("😬 " + L({ ar: "برّا!", en: "WIDE!" }, lang), "warn"); }
          upd();
          setTimeout(function () {
            ball.style.transition = "none";
            reset(); st.busy = false;
            if (st.shots <= 0) finish();
          }, 620);
        }, 430);
      }
      function msg(t, k) { flash.textContent = t; flash.className = "mg-flash show " + (k || "gold"); setTimeout(function () { flash.className = "mg-flash " + (k || "gold"); }, 780); }
      function pop() {
        for (var i = 0; i < 14; i++) {
          var d = el("div", "mg-confetti");
          d.style.left = (40 + Math.random() * 20) + "%";
          d.style.background = ["#fbbf24", "#34d399", "#38bdf8", "#fb7185", "#a78bfa"][i % 5];
          d.style.animationDelay = (Math.random() * .2) + "s";
          arena.appendChild(d);
          (function (n) { setTimeout(function () { if (n.parentNode) n.parentNode.removeChild(n); }, 1400); })(d);
        }
      }
      function finish() {
        var card = el("div", "mg-end");
        card.appendChild(el("div", "mg-end-t", L({ ar: "سجّلت " + st.goals + " من " + TOTAL, en: "You scored " + st.goals + " of " + TOTAL }, lang)));
        var b = el("button", "btn", L({ ar: "كمّل اللعب", en: "Continue" }, lang));
        b.onclick = done; card.appendChild(b);
        root.appendChild(card);
      }
      upd();
    }
  };

  /* ---------------------------------------------------------
     GAME 2 · STACK IT — tap to drop, land the boxes straight
     A calm timing game. Stack as high as you can.
     --------------------------------------------------------- */
  var stack = {
    id: "stack",
    name: { ar: "كوّم الصناديق", en: "Stack It" },
    tag: { ar: "استراحة سريعة", en: "Brain Break" },
    how: { ar: "اضغط في أي مكان لإسقاط الصندوق. حاول تضبطه فوق اللي تحته بالضبط.", en: "Tap anywhere to drop the box. Try to land it right on top of the last one." },
    mount: function (root, done, lang) {
      var st = { height: 0, best: 0, perfect: 0, w: 96, dir: 1, x: 10, running: true };

      var hud = el("div", "mg-hud");
      var sH = el("div", "mg-stat"), sP = el("div", "mg-stat");
      [[sH, { ar: "الطوابق", en: "Floors" }], [sP, { ar: "مثالي", en: "Perfect" }]].forEach(function (p) {
        p[0].appendChild(el("div", "mg-stat-l", L(p[1], lang)));
        p[0].appendChild(el("div", "mg-stat-v", "0"));
        hud.appendChild(p[0]);
      });
      root.appendChild(hud);

      var arena = el("div", "mg-arena sky");
      var tower = el("div", "sk-tower");
      var mover = el("div", "sk-box moving");
      var flash = el("div", "mg-flash");
      arena.appendChild(tower); arena.appendChild(mover); arena.appendChild(flash);
      root.appendChild(arena);
      root.appendChild(el("div", "mg-hint", L(stack.how, lang)));

      var raf = null, aw = 0;
      setTimeout(function () {
        aw = arena.getBoundingClientRect().width;
        mover.style.width = st.w + "px";
        mover.style.bottom = "10px";
        loop();
      }, 30);

      function loop() {
        if (!st.running) return;
        st.x += st.dir * 2.6;
        if (st.x + st.w > aw - 6) { st.dir = -1; }
        if (st.x < 6) { st.dir = 1; }
        mover.style.left = st.x + "px";
        raf = requestAnimationFrame(loop);
      }
      function drop() {
        if (!st.running) return;
        var prev = tower.lastChild;
        var prevX = prev ? parseFloat(prev.style.left) : (aw - st.w) / 2;
        var prevW = prev ? parseFloat(prev.style.width) : st.w;
        var overlapL = Math.max(st.x, prevX);
        var overlapR = Math.min(st.x + st.w, prevX + prevW);
        var ow = overlapR - overlapL;

        if (ow <= 6) { over(); return; }

        var exact = Math.abs(st.x - prevX) < 5;
        if (exact) { st.perfect++; msg("✨ " + L({ ar: "مثالي!", en: "PERFECT!" }, lang), "gold"); }

        var b = el("div", "sk-box");
        b.style.width = (exact ? prevW : ow) + "px";
        b.style.left = (exact ? prevX : overlapL) + "px";
        b.style.bottom = (10 + st.height * 18) + "px";
        tower.appendChild(b);

        st.height++; st.w = exact ? prevW : ow; st.x = 6; st.dir = 1;
        mover.style.width = st.w + "px";
        mover.style.bottom = (10 + st.height * 18) + "px";
        sH.querySelector(".mg-stat-v").textContent = st.height;
        sP.querySelector(".mg-stat-v").textContent = st.perfect;
        if (st.height >= 12) { win(); }
      }
      arena.addEventListener("pointerdown", function (e) { drop(); e.preventDefault(); });

      function msg(t, k) { flash.textContent = t; flash.className = "mg-flash show " + (k || "gold"); setTimeout(function () { flash.className = "mg-flash " + (k || "gold"); }, 700); }
      function stop() { st.running = false; if (raf) cancelAnimationFrame(raf); mover.style.display = "none"; }
      function over() { stop(); end(L({ ar: "وصلت " + st.height + " طوابق", en: "You reached " + st.height + " floors" }, lang)); }
      function win() { stop(); end(L({ ar: "برج كامل! " + st.height + " طوابق", en: "Tower complete! " + st.height + " floors" }, lang)); }
      function end(title) {
        var card = el("div", "mg-end");
        card.appendChild(el("div", "mg-end-t", title));
        var b = el("button", "btn", L({ ar: "كمّل اللعب", en: "Continue" }, lang));
        b.onclick = done; card.appendChild(b);
        root.appendChild(card);
      }
    }
  };

  /* ---------------------------------------------------------
     GAME 3 · QUICK HANDS — tap the right icon before time runs out
     Reaction game. 10 rounds, gets faster.
     --------------------------------------------------------- */
  var quick = {
    id: "quick",
    name: { ar: "أسرع يد", en: "Quick Hands" },
    tag: { ar: "استراحة سريعة", en: "Brain Break" },
    how: { ar: "اضغط على الرمز المطلوب فقط، وبسرعة. 10 جولات وكل جولة أسرع.", en: "Tap only the icon it asks for, fast. 10 rounds, each one quicker." },
    mount: function (root, done, lang) {
      var ICONS = ["⭐", "🔥", "💚", "⚡", "🎯", "☕"];
      var st = { round: 0, hits: 0, best: 0, streak: 0 };
      var TOTAL = 10, timer = null;

      var hud = el("div", "mg-hud");
      var sR = el("div", "mg-stat"), sH = el("div", "mg-stat"), sS = el("div", "mg-stat");
      [[sR, { ar: "الجولة", en: "Round" }], [sH, { ar: "إصابات", en: "Hits" }], [sS, { ar: "تتابع", en: "Streak" }]].forEach(function (p) {
        p[0].appendChild(el("div", "mg-stat-l", L(p[1], lang)));
        p[0].appendChild(el("div", "mg-stat-v", "0"));
        hud.appendChild(p[0]);
      });
      root.appendChild(hud);

      var arena = el("div", "mg-arena plain");
      var target = el("div", "qh-target");
      var bar = el("div", "qh-bar"); var fill = el("div", "qh-fill"); bar.appendChild(fill);
      var grid = el("div", "qh-grid");
      var flash = el("div", "mg-flash");
      arena.appendChild(target); arena.appendChild(bar); arena.appendChild(grid); arena.appendChild(flash);
      root.appendChild(arena);
      root.appendChild(el("div", "mg-hint", L(quick.how, lang)));

      function upd() {
        sR.querySelector(".mg-stat-v").textContent = st.round + "/" + TOTAL;
        sH.querySelector(".mg-stat-v").textContent = st.hits;
        sS.querySelector(".mg-stat-v").textContent = st.streak;
      }
      function next() {
        if (st.round >= TOTAL) { finish(); return; }
        st.round++; upd();
        var want = ICONS[Math.floor(Math.random() * ICONS.length)];
        target.innerHTML = "";
        target.appendChild(el("span", "qh-lbl", L({ ar: "اضغط على", en: "Tap" }, lang)));
        target.appendChild(el("span", "qh-icon", want));
        grid.innerHTML = "";
        var pool = ICONS.slice(); shuffleArr(pool);
        if (pool.indexOf(want) < 0) pool[0] = want;
        pool.forEach(function (ic) {
          var b = el("button", "qh-cell", ic);
          b.onclick = function () { pick(ic === want); };
          grid.appendChild(b);
        });
        var dur = Math.max(900, 2100 - st.round * 110), t0 = Date.now();
        clearInterval(timer);
        timer = setInterval(function () {
          var left = 1 - (Date.now() - t0) / dur;
          fill.style.width = Math.max(0, left * 100) + "%";
          if (left <= 0) { clearInterval(timer); pick(false, true); }
        }, 60);
      }
      function pick(ok, timeout) {
        clearInterval(timer);
        if (ok) { st.hits++; st.streak++; st.best = Math.max(st.best, st.streak); msg("🔥 +1", "gold"); }
        else { st.streak = 0; msg(timeout ? "⏱" : "✕", "bad"); }
        upd();
        setTimeout(next, 380);
      }
      function shuffleArr(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } }
      function msg(t, k) { flash.textContent = t; flash.className = "mg-flash show " + (k || "gold"); setTimeout(function () { flash.className = "mg-flash " + (k || "gold"); }, 460); }
      function finish() {
        clearInterval(timer);
        arena.removeChild(grid);
        var card = el("div", "mg-end");
        card.appendChild(el("div", "mg-end-t", L({ ar: "أصبت " + st.hits + " من " + TOTAL, en: "You hit " + st.hits + " of " + TOTAL }, lang)));
        var b = el("button", "btn", L({ ar: "كمّل اللعب", en: "Continue" }, lang));
        b.onclick = done; card.appendChild(b);
        root.appendChild(card);
      }
      upd(); next();
    }
  };

  window.MINIGAMES = [penalty, stack, quick];
})();

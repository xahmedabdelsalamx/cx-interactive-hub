/* ============================================================
   AURA PASS CHALLENGE  ·  MEDIA CONFIG
   ============================================================
   This is the ONLY file you edit to set pictures / animations.
   Keep it next to the HTML. It is loaded before the game, so your
   links survive even if the main HTML is rebuilt.

   For each numbered item below, choose ONE:

     • A picture:     type:"png",    src:"images/yourfile.png"
     • An animation:  type:"lottie", src:"https://lottie.host/xxxx.json"
     • Nothing yet:   leave it as type:"placeholder" (shows a labelled box)

   PNG files go in an "images" folder beside the HTML.
   Lottie: open your animation on LottieFiles ▸ "Save to LottieFiles" or
   "Lottie URL" ▸ copy the .json (or .lottie) link ▸ paste it as src.

   Save this file and refresh the page — that's it. No other file changes.
   Recommended pixel sizes are noted on each line.
   ============================================================ */

window.AURA_MEDIA = {

  /* ---------- PROMO SCREEN ---------- */
  /*  1 · English promo poster  (portrait 9:16, e.g. 1080×1920) */
  promoEN: { type:"png", src:"images/EN.jpg" },
  /*  2 · Arabic promo poster   (portrait 9:16, e.g. 1080×1920) */
  promoAR: { type:"png", src:"images/AR.jpg" },

  /* ---------- INFO SCREEN ---------- */
  /*  3 · Info hero banner       (wide,  ~840×344) */
  info:      { type:"placeholder", src:"images/INFOSCREEN.jpg" },

  /* ---------- SPOT INTRO ---------- */
  /*  4 · Spot-the-opportunity intro  (square, ~344×344) */
  spotIntro: { type:"placeholder", src:"images/spot-intro.png" },

  /* ---------- SPOT: 6 CUSTOMER CARDS (square, ~344×344) ---------- */
  /*  5 · Customer 1 — coffee / Starbucks            (✓ opportunity) */
  see1: { type:"placeholder", src:"images/spot1.png" },
  /*  6 · Customer 2 — "in a rush" / clock           (✕ not yet)     */
  see5: { type:"placeholder", src:"images/spot5.png" },
  /*  7 · Customer 3 — any offers? / offer tag       (✓ opportunity) */
  see2: { type:"placeholder", src:"images/spot2.png" },
  /*  8 · Customer 4 — return / unhappy              (✕ not yet)     */
  see6: { type:"placeholder", src:"images/spot6.png" },
  /*  9 · Customer 5 — H&M / shopping bag            (✓ opportunity) */
  see3: { type:"placeholder", src:"images/spot3.png" },
  /* 10 · Customer 6 — already has Aura / app phone  (✓ opportunity) */
  see4: { type:"placeholder", src:"images/spot4.png" },

  /* ---------- OBJECTION INTRO ---------- */
  /* 11 · Handling-objections intro   (square, ~344×344) */
  objIntro: { type:"placeholder", src:"images/obj-intro.png" },

  /* ---------- OBJECTION: 4 QUESTIONS (square, ~256×256) ---------- */
  /* 12 · Objection 1 — price / "AED 199"        */
  obj1: { type:"placeholder", src:"images/obj1.png" },
  /* 13 · Objection 2 — Starbucks cup            */
  obj2: { type:"placeholder", src:"images/obj2.png" },
  /* 14 · Objection 3 — download the app         */
  obj3: { type:"placeholder", src:"images/obj3.png" },
  /* 15 · Objection 4 — calendar / valid 2026    */
  obj4: { type:"placeholder", src:"images/obj4.png" },

  /* ---------- REARRANGE: 4 APP SCREENS (portrait 9:16, e.g. 360×640) ---------- */
  /* 16 · Step 1 — Download the AURA App                     */
  arrange1: { type:"placeholder", src:"images/step1.png" },
  /* 17 · Step 2 — Tap the AURA Pass offer on the home screen */
  arrange2: { type:"placeholder", src:"images/step2.png" },
  /* 18 · Step 3 — Top up your AURA Wallet for AED 199        */
  arrange3: { type:"placeholder", src:"images/step3.png" },
  /* 19 · Step 4 — Enjoy the benefits                         */
  arrange4: { type:"placeholder", src:"images/step4.png" },

  /* ---------- BONUS ---------- */
  /* 20 · Savings slider — piggy / savings   (square, ~344×344) */
  bonus: { type:"placeholder", src:"images/bonus.png" }

};

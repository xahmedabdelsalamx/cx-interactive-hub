/* ============================================================
   AURA PASS CHALLENGE  ·  MEDIA CONFIG
   ============================================================
   This is the ONLY file you edit to set pictures / animations.
   Keep it next to the HTML. It is loaded before the game, so your
   links survive even if the main HTML is rebuilt.

   For each numbered item below, choose ONE:

     • A picture:     type:"png",    src:"images/yourfile.png"
     • An animation:  type:"lottie", src:"https://lottie.host/xxxx.json"
                       (online) — or download the .json into the "lottie"
                       folder and use src:"lottie/yourfile.json" for OFFLINE.
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
  info:      { type:"png", src:"images/INFOSCREEN.png" },

  /* ---------- SPOT INTRO ---------- */
  /*  4 · Spot-the-opportunity intro  (square, ~344×344) */
  spotIntro: { type:"lottie", src:"lottie/spot.json" },

  /* ---------- SPOT: 6 CUSTOMER CARDS (square, ~344×344) ---------- */
  /*  5 · Customer 1 — coffee / Starbucks            (✓ opportunity) */
  see1: { type:"lottie", src:"lottie/Starbucks.json" },
  /*  6 · Customer 2 — "in a rush" / clock           (✕ not yet)     */
  see5: { type:"lottie", src:"lottie/rush.json" },
  /*  7 · Customer 3 — any offers? / offer tag       (✓ opportunity) */
  see2: { type:"lottie", src:"lottie/offer.json" },
  /*  8 · Customer 4 — return / unhappy              (✕ not yet)     */
  see6: { type:"lottie", src:"lottie/return.json" },
  /*  9 · Customer 5 — H&M / shopping bag            (✓ opportunity) */
  see3: { type:"lottie", src:"lottie/HM.json" },
  /* 10 · Customer 6 — already has Aura / app phone  (✓ opportunity) */
  see4: { type:"png", src:"images/Haveaura.png" },

  /* ---------- SPOT: DISCUSSION / EXPLANATION CARDS (square, ~344×344) ----------
     Shown on the ANSWER card after each customer line, so you can use a DIFFERENT
     image here than the question card. Leave any as "placeholder" to simply reuse
     that question's image. Listed in the same order as the cards above. */
  see1d: { type:"placeholder", src:"images/spot1-exp.png" },   /*  5 · Coffee — explanation        */
  see5d: { type:"placeholder", src:"images/spot5-exp.png" },   /*  6 · In a rush — explanation     */
  see2d: { type:"placeholder", src:"images/spot2-exp.png" },   /*  7 · Offers — explanation        */
  see6d: { type:"placeholder", src:"images/spot6-exp.png" },   /*  8 · Return — explanation        */
  see3d: { type:"placeholder", src:"images/spot3-exp.png" },   /*  9 · H&M — explanation           */
  see4d: { type:"placeholder", src:"images/spot4-exp.png" },   /* 10 · Already has Aura — explanation */

  /* ---------- OBJECTION INTRO ---------- */
  /* 11 · Handling-objections intro   (square, ~344×344) */
  objIntro: { type:"lottie", src:"lottie/Objection.json" },

  /* ---------- OBJECTION: 4 QUESTIONS (square, ~256×256) ---------- */
  /* 12 · Objection 1 — price / "AED 199"        */
  obj1: { type:"lottie", src:"lottie/nopay.json" },
  /* 13 · Objection 2 — Starbucks cup            */
  obj2: { type:"lottie", src:"lottie/Starbuckswrk.json" },
  /* 14 · Objection 3 — download the app         */
  obj3: { type:"png", src:"images/noaurapp.png" },
  /* 15 · Objection 4 — calendar / valid 2026    */
  obj4: { type:"lottie", src:"lottie/calendar.json" },

  /* ---------- REARRANGE: 4 APP SCREENS (portrait 9:16, e.g. 360×640) ---------- */
  /* 16 · Step 1 — Download the AURA App                     */
  arrange1: { type:"png", src:"images/step1.png" },
  /* 17 · Step 2 — Tap the AURA Pass offer on the home screen */
  arrange2: { type:"png", src:"images/step2.png" },
  /* 18 · Step 3 — Top up your AURA Wallet for AED 199        */
  arrange3: { type:"png", src:"images/step3.png" },
  /* 19 · Step 4 — Enjoy the benefits                         */
  arrange4: { type:"png", src:"images/step4.png" },

  /* ---------- BONUS ---------- */
  /* 20 · Savings slider — piggy / savings   (square, ~344×344) */
  bonus: { type:"lottie", src:"lottie/savemoney.json" }

};

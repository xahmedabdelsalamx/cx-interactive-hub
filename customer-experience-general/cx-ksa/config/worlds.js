/* ============================================================
   WORLD REGISTRY · theme + branding per world
   ------------------------------------------------------------
   color    = brand accent
   gradient = header / hero gradient
   floaters = faded elements drifting in the background
              (emoji now; swap to SVG/lottie later if you like)
   logo     = the "Art of ___" division logo
   characters = 3 PNG slots (engine adds the breathing animation;
                drop the PNGs into assets/characters/)
   ============================================================ */

window.WORLDS = {

  hospitality: {
    color: "#f15a24",
    gradient: "linear-gradient(135deg,#f15a24 0%,#ff8a4a 55%,#ffb066 100%)",
    floaters: ["🍔", "🌮", "🍟", "🥤", "🍗", "🥗"],
    logo: "assets/logos/art-of-guest-experience.jpg",
    division: "hospitality",
    characters: [
      { id: "h1", png: "assets/characters/hosp-1.png" },
      { id: "h2", png: "assets/characters/hosp-2.png" },
      { id: "h3", png: "assets/characters/hosp-3.png" }
    ]
  },

  retail: {
    color: "#e43c50",
    gradient: "linear-gradient(135deg,#e43c50 0%,#f06a7c 55%,#ff9bab 100%)",
    floaters: ["🛍️", "👗", "🏷️", "💄", "👜", "✨"],
    logo: "assets/logos/art-of-selling.jpg",
    division: "retail",
    characters: [
      { id: "r1", png: "assets/characters/retail-1.png" },
      { id: "r2", png: "assets/characters/retail-2.png" },
      { id: "r3", png: "assets/characters/retail-3.png" }
    ]
  },

  starbucks: {
    color: "#006241",
    gradient: "linear-gradient(135deg,#006241 0%,#1e8a63 55%,#57b48b 100%)",
    floaters: ["☕", "🥤", "🌟", "🍵", "🫘", "✨"],
    logo: "assets/logos/art-of-connection.jpg",
    division: "starbucks",
    characters: [
      { id: "s1", png: "assets/characters/sbux-1.png" },
      { id: "s2", png: "assets/characters/sbux-2.png" },
      { id: "s3", png: "assets/characters/sbux-3.png" }
    ]
  }

};

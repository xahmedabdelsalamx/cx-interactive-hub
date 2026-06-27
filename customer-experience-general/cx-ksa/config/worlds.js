/* ============================================================
   WORLD REGISTRY · theme + branding per world
   ------------------------------------------------------------
   logoColor = transparent COLOR logo (use on white cards)
   logoWhite = transparent WHITE logo (use over colored bg)
   characters = full-body PNG slots (portrait, transparent bg)
                drop files into assets/characters/
   ============================================================ */

window.WORLDS = {

  hospitality: {
    color: "#f15a24",
    gradient: "linear-gradient(135deg,#f15a24 0%,#ff8a4a 55%,#ffb066 100%)",
    bgGradient: "linear-gradient(135deg,#8f3208,#f15a24,#bf440f,#f15a24)",
    floaters: ["🍔", "🌮", "🍟", "🥤", "🍗", "🥗"],
    logoColor: "assets/logos/art-of-guest-experience-color.png",
    logoWhite: "assets/logos/art-of-guest-experience-white.png",
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
    bgGradient: "linear-gradient(135deg,#7a1525,#e43c50,#a81f38,#e43c50)",
    floaters: ["🛍️", "👗", "🏷️", "💄", "👜", "✨"],
    logoColor: "assets/logos/art-of-selling-color.png",
    logoWhite: "assets/logos/art-of-selling-white.png",
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
    bgGradient: "linear-gradient(135deg,#00271a,#006241,#0a7d54,#004e34)",
    floaters: ["☕", "🥤", "🌟", "🍵", "🫘", "✨"],
    logoColor: "assets/logos/art-of-connection-color.png",
    logoWhite: "assets/logos/art-of-connection-white.png",
    division: "starbucks",
    characters: [
      { id: "s1", png: "assets/characters/sbux-1.png" },
      { id: "s2", png: "assets/characters/sbux-2.png" },
      { id: "s3", png: "assets/characters/sbux-3.png" }
    ]
  }

};

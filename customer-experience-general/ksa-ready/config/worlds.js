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
    learnUrl: "https://connectnow.alshaya.com/sites/customer-experience-hub/SitePageModern/229096/art-of-guest-experience-hospitality?channelId=238821",
    characters: {
      male: [
        { id: "hosp-m1", png: "assets/characters/hosp-male-1.png" },
        { id: "hosp-m2", png: "assets/characters/hosp-male-2.png" },
        { id: "hosp-m3", png: "assets/characters/hosp-male-3.png" },
        { id: "hosp-m4", png: "assets/characters/hosp-male-4.png" }
      ],
      female: [
        { id: "hosp-f1", png: "assets/characters/hosp-female-1.png" },
        { id: "hosp-f2", png: "assets/characters/hosp-female-2.png" },
        { id: "hosp-f3", png: "assets/characters/hosp-female-3.png" },
        { id: "hosp-f4", png: "assets/characters/hosp-female-4.png" }
      ]
    }
  },

  retail: {
    color: "#e43c50",
    gradient: "linear-gradient(135deg,#e43c50 0%,#f06a7c 55%,#ff9bab 100%)",
    bgGradient: "linear-gradient(135deg,#7a1525,#e43c50,#a81f38,#e43c50)",
    floaters: ["🛍️", "👗", "🏷️", "💄", "👜", "✨"],
    logoColor: "assets/logos/art-of-selling-color.png",
    logoWhite: "assets/logos/art-of-selling-white.png",
    division: "retail",
    learnUrl: "https://connectnow.alshaya.com/sites/customer-experience-hub/SitePageModern/228974/retail?channelId=230797",
    characters: {
      male: [
        { id: "retail-m1", png: "assets/characters/retail-male-1.png" },
        { id: "retail-m2", png: "assets/characters/retail-male-2.png" },
        { id: "retail-m3", png: "assets/characters/retail-male-3.png" },
        { id: "retail-m4", png: "assets/characters/retail-male-4.png" }
      ],
      female: [
        { id: "retail-f1", png: "assets/characters/retail-female-1.png" },
        { id: "retail-f2", png: "assets/characters/retail-female-2.png" },
        { id: "retail-f3", png: "assets/characters/retail-female-3.png" },
        { id: "retail-f4", png: "assets/characters/retail-female-4.png" }
      ]
    }
  },

  starbucks: {
    color: "#006241",
    gradient: "linear-gradient(135deg,#006241 0%,#1e8a63 55%,#57b48b 100%)",
    bgGradient: "linear-gradient(135deg,#00271a,#006241,#0a7d54,#004e34)",
    floaters: ["☕", "🥤", "🌟", "🍵", "🫘", "✨"],
    logoColor: "assets/logos/art-of-connection-color.png",
    logoWhite: "assets/logos/art-of-connection-white.png",
    division: "starbucks",
    learnUrl: "https://connectnow.alshaya.com/sites/customer-experience-hub/SitePageModern/229098/art-of-connection-starbucks?channelId=238822",
    characters: {
      male: [
        { id: "sbux-m1", png: "assets/characters/sbux-male-1.png" },
        { id: "sbux-m2", png: "assets/characters/sbux-male-2.png" },
        { id: "sbux-m3", png: "assets/characters/sbux-male-3.png" },
        { id: "sbux-m4", png: "assets/characters/sbux-male-4.png" }
      ],
      female: [
        { id: "sbux-f1", png: "assets/characters/sbux-female-1.png" },
        { id: "sbux-f2", png: "assets/characters/sbux-female-2.png" },
        { id: "sbux-f3", png: "assets/characters/sbux-female-3.png" },
        { id: "sbux-f4", png: "assets/characters/sbux-female-4.png" }
      ]
    }
  }

};

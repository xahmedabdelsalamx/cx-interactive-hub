/* ============================================================
   KSA NEW-HIRE GAMIFICATION · SHARED CONFIG
   ------------------------------------------------------------
   Edit this file to set the backend, language, pass mark, and
   the list of brands. Nothing else here needs touching often.
   ============================================================ */

window.CONFIG = {
  /* Paste your deployed Google Apps Script /exec URL here.
     Leave empty ("") to run fully offline for testing. */
  scriptUrl: "",

  /* Must match SECRET_TOKEN inside AppsScript.gs */
  secretToken: "CXHUBKSA",

  defaultLang: "ar",          // KSA Arabic is the default
  passMark: 80,               // % needed to pass
  attempts: "until-pass",     // unlimited retries; certified once passed

  cxHubUrl: "https://connectnow.alshaya.com",  // CX Hub platform link (update as needed)

  footerLine: {
    ar: "تم التطوير بواسطة فريق تجربة العملاء",
    en: "Developed by Customer Experience"
  }
};

/* ---------- BRANDS ----------
   Each brand maps to ONE world: "retail" | "hospitality" | "starbucks".
   Add or remove brands freely — the intake list builds itself from here. */
window.BRANDS = [
  // Retail
  { en: "H&M",                ar: "اتش آند ام",            world: "retail" },
  { en: "Primark",            ar: "برايمارك",             world: "retail" },
  { en: "Bath & Body Works",  ar: "باث آند بودي ووركس",   world: "retail" },
  { en: "Ulta Beauty",        ar: "ألتا بيوتي",           world: "retail" },

  // Hospitality
  { en: "Chipotle",           ar: "تشيبوتلي",             world: "hospitality" },
  { en: "Raising Cane's",     ar: "رايزنج كينز",          world: "hospitality" },
  { en: "Shake Shack",        ar: "شيك شاك",              world: "hospitality" },

  // Starbucks
  { en: "Starbucks",          ar: "ستاربكس",              world: "starbucks" }
];

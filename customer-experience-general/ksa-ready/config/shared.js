/* ============================================================
   KSA NEW-HIRE GAMIFICATION · SHARED CONFIG
   ============================================================ */

window.CONFIG = {
  scriptUrl: "",                 // paste deployed Apps Script /exec URL (empty = offline)
  secretToken: "CXHUBKSA",       // must match SECRET_TOKEN in AppsScript.gs

  defaultLang: "ar",             // KSA Arabic is the default
  passMark: 80,
  attempts: "until-pass",

  cxHubUrl: "https://connectnow.alshaya.com",

  /* Entry / intake background — vibrant KSA green */
  entryColor: "#005430",
  entryGrad:  "linear-gradient(135deg,#005430 0%,#0a8a55 100%)",
  entryBgGrad: "linear-gradient(135deg,#00351f,#005430,#00733f,#005430)",

  /* Footer (attached under the card, AURA-style) */
  footer: {
    copyright: { ar: "© مجموعة الشايع", en: "© Alshaya Group" },
    dev:       { ar: "تم التطوير بواسطة فريق تجربة الزبائن · 2026 · لأي استفسار؟", 
                 en: "Developed by the Customer Experience team · 2026 · Any queries?" },
    contact:   { ar: "تواصل معنا", en: "contact here" },
    email:     "ahmed.abdelsalam@alshaya.com"
  }
};

/* ---------- BRANDS (world: retail | hospitality | starbucks) ---------- */
window.BRANDS = [
  { en:"American Eagle",            ar:"أمريكان إيغل",            world:"retail" },
  { en:"Foot Locker",              ar:"فوت لوكر",                world:"retail" },
  { en:"Victoria's Secret",        ar:"فيكتوريا سيكريت",         world:"retail" },
  { en:"H&M",                      ar:"اتش آند ام",              world:"retail" },
  { en:"Bath & Body Works",        ar:"باث آند بودي ووركس",      world:"retail" },
  { en:"Primark",                  ar:"برايمارك",                world:"retail" },
  { en:"Charlotte Tilbury",        ar:"شارلوت تيلبري",           world:"retail" },
  { en:"& Other Stories",          ar:"آند أذر ستوريز",          world:"retail" },
  { en:"Boots",                    ar:"بووتس",                   world:"retail" },
  { en:"Claire's",                 ar:"كليرز",                   world:"retail" },
  { en:"COS",                      ar:"كوس",                     world:"retail" },
  { en:"Disney Store",             ar:"متجر ديزني",              world:"retail" },
  { en:"Jo Malone London",         ar:"جو مالون لندن",           world:"retail" },
  { en:"MAC",                      ar:"ماك",                     world:"retail" },
  { en:"Mothercare",               ar:"ماذركير",                 world:"retail" },
  { en:"MUJI",                     ar:"موجي",                    world:"retail" },
  { en:"New Balance",              ar:"نيو بالانس",              world:"retail" },
  { en:"Next",                     ar:"نكست",                    world:"retail" },
  { en:"NYX Professional Makeup",  ar:"نيكس بروفيشنال ميك أب",   world:"retail" },
  { en:"The Body Shop",            ar:"ذا بودي شوب",             world:"retail" },
  { en:"Ulta Beauty",              ar:"ألتا بيوتي",              world:"retail" },
  { en:"Milano",                   ar:"ميلانو",                  world:"retail" },   /* ⚠ confirm: retail (footwear) vs hospitality */

  { en:"Starbucks",                ar:"ستاربكس",                 world:"starbucks" },

  { en:"The Cheesecake Factory",   ar:"ذا تشيز كيك فاكتوري",      world:"hospitality" },
  { en:"P.F. Chang's",             ar:"بي إف تشانغز",            world:"hospitality" },
  { en:"Pinkberry",                ar:"بينك بيري",               world:"hospitality" },
  { en:"Asha's",                   ar:"آشاز",                    world:"hospitality" },
  { en:"Chipotle",                 ar:"تشيبوتلي",                world:"hospitality" },
  { en:"Raising Cane's",           ar:"رايزينغ كينز",            world:"hospitality" },
  { en:"Shake Shack",              ar:"شيك شاك",                 world:"hospitality" }
];

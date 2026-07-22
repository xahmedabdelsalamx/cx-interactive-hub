/* ============================================================
   KSA NEW-HIRE GAMIFICATION · SHARED CONFIG
   ============================================================ */

window.CONFIG = {
  scriptUrl: "https://script.google.com/macros/s/AKfycbxKNzh4JS1wGcpf7e2piOfD7aJeaqh7117ihBHUK2BcPf3BYvwPSBut2uIAWVdq1SEf/exec",  // live Apps Script /exec URL (empty = offline)
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

/* ============================================================
   BRAND CODE DIRECTORY
   The company active list uses 3-letter codes (STA, AME, HEN...).
   This maps every code to its full English and Arabic name so the
   Roster lookup can auto-select the brand from an Emp ID.
   Codes marked internal:true are divisions/support units, not shops —
   they still resolve to a readable name but do not pick a game world.
   ============================================================ */
window.BRAND_CODES = {
  STA:{en:"Starbucks",ar:"ستاربكس"},
  AME:{en:"American Eagle",ar:"أمريكان إيجل"},
  NEX:{en:"Next",ar:"نكست"},
  CLA:{en:"Claire's",ar:"كليرز"},
  NEW:{en:"New Balance",ar:"نيو بالانس"},
  MIL:{en:"Milano",ar:"ميلانو"},
  FOO:{en:"Foot Locker",ar:"فوت لوكر"},
  MUJ:{en:"MUJI",ar:"موجي"},
  VIF:{en:"Victoria's Secret",ar:"فيكتوريا سيكريت"},
  HEN:{en:"H&M",ar:"إتش آند إم"},
  ATE:{en:"Technical Equipment and Coffee Machine Support",ar:"المعدات الفنية ودعم ماكينات القهوة",internal:true},
  CHE:{en:"The Cheesecake Factory",ar:"ذا تشيزكيك فاكتوري"},
  PFC:{en:"P.F. Chang's",ar:"بي إف تشانغز"},
  PIN:{en:"Pinkberry",ar:"بينكبيري"},
  TEX:{en:"Texas Roadhouse",ar:"تكساس رودهاوس"},
  ASH:{en:"Asha's",ar:"آشاز"},
  SHA:{en:"Shake Shack",ar:"شيك شاك"},
  RAI:{en:"Raising Cane's",ar:"رايزنغ كينز"},
  BAT:{en:"Bath & Body Works",ar:"باث آند بودي ووركس"},
  NYX:{en:"NYX Professional Makeup",ar:"نيكس بروفيشنال ميك أب"},
  CHA:{en:"Charlotte Tilbury",ar:"شارلوت تيلبوري"},
  BOD:{en:"The Body Shop",ar:"ذا بودي شوب"},
  MAC:{en:"MAC",ar:"ماك كوزمتكس"},
  JOM:{en:"Jo Malone London",ar:"جو مالون لندن"},
  BOO:{en:"Boots",ar:"بوتس"},
  MOT:{en:"Mothercare",ar:"مذركير"},
  COL:{en:"COS",ar:"كوس"},
  HOS:{en:"Hospitality Division",ar:"قطاع الضيافة",internal:true},
  VAV:{en:"VaVaVoom",ar:"فافافوم"},
  DIS:{en:"Disney Store",ar:"متجر ديزني"},
  OTH:{en:"& Other Stories",ar:"آند أذر ستوريز"},
  CHP:{en:"Chipotle",ar:"تشيبوتلي"},
  PRM:{en:"Primark",ar:"برايمارك"},
  DRV:{en:"Dr. Vranjes Firenze",ar:"دكتور فرانجيس فيرينزي"},
  ALY:{en:"ALO Yoga",ar:"ألو يوغا"},
  WEL:{en:"Wellness Division",ar:"قطاع العافية",internal:true},
  FEC:{en:"TEKZONE / Family Entertainment Centre",ar:"تك زون / مركز الترفيه العائلي"},
  LEW:{en:"Central Food Production Facility",ar:"منشأة الإنتاج الغذائي المركزية",internal:true},
  LEL:{en:"Le Labo",ar:"لو لابو"},
  ULT:{en:"Ulta Beauty",ar:"ألتا بيوتي"},
  FNB:{en:"Food & Beverage Division",ar:"قطاع الأغذية والمشروبات",internal:true},
  APP:{en:"Apparel Division",ar:"قطاع الأزياء",internal:true},
  DEB:{en:"Debenhams",ar:"دبنهامز"},
  PRC:{en:"Princi",ar:"برينشي"},
  LEP:{en:"Le Pain Quotidien",ar:"لو بان كوتيديان"},
  HAS:{en:"Harvey Nichols Cosmetics",ar:"هارفي نيكولز لمستحضرات التجميل"},
  KID:{en:"KidZania Kuwait",ar:"كيدزانيا الكويت"},
  HAR:{en:"Harvey Nichols Kuwait",ar:"هارفي نيكولز الكويت"},
  PIZ:{en:"PizzaExpress",ar:"بيتزا إكسبريس"},
  CLI:{en:"Clinique",ar:"كلينيك"},
  BBA:{en:"Bebabel",ar:"بي بابل"},
  BAB:{en:"Babel",ar:"بابل"},
  EST:{en:"Estée Lauder",ar:"إستي لودر"},
  AHW:{en:"Ahwet Zeitouna",ar:"قهوة زيتونة"},
  KUR:{en:"Amiti Noura",ar:"عمتي نورة"},
  QUE:{en:"QUEST",ar:"كويست"},
  DDC:{en:"D&D Cafe - Dean & DeLuca",ar:"دي آند دي كافيه - دين آند ديلوكا"},
  TFO:{en:"Tom Ford Beauty",ar:"توم فورد بيوتي"}
};

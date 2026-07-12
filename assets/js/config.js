/* ============================================================================
   CX INTERACTIVE HUB — CONFIG
   ----------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT for day-to-day changes.
   Everything visual is a "media spec" so you can swap between:
       { img:    "assets/icons/thing.png" }          <- a PNG / SVG / JPG
       { lottie: "assets/lottie/thing.json" }         <- a Lottie animation (.json)
       { lottie: "https://lottie.host/xxxx/data.json" } <- a hosted Lottie URL
       { emoji:  "☕" }                                <- a plain emoji (no file)
   Mix and match freely — the engine renders whichever key you provide.

   TO RELEASE A GAME:  set  released:true  and make sure its `url` points to the
   live folder. Until then it shows as "Coming soon".

   PROGRESS / SAVED PLAYER (shared across all pages on the same domain):
       localStorage 'cxhub_profile'  = {eid,name,gender,character}
       localStorage 'cxhub_brands'   = {retail,hospitality,starbucks}
       localStorage 'cxhub_progress' = { "<world>:<levelId>": {stars,score,date} }
   A finished module reports itself with ONE line (see any game placeholder):
       CXHub.saveResult('retail','driving-conversion',{stars:2,score:78});
   ============================================================================ */

window.CXHUB_CONFIG = {

  /* Turn ON only after Microsoft SSO is configured on Azure (see the IT guide).
     While false, the hub never calls /.auth/me and simply shows the entry form. */
  SSO: false,

  /* Shared icons (used inside the level popup). Swap to img/lottie any time. */
  ICONS: {
    scenario: { emoji: "💬" },   // e.g. { lottie:"assets/lottie/scenario.json" }
    quiz:     { emoji: "❓" }
  },

  /* Brand lists per division — edit the rosters freely.
     Brand → division routing is derived from these lists automatically. */
  BRANDS: {
    retail:      ["alo","American Eagle","Bath & Body Works","Boots","COS","Foot Locker","H&M","Mothercare","Next","Primark","Ulta Beauty","Victoria's Secret"],
    hospitality: ["The Cheesecake Factory","Chipotle","P.F. Chang's","Pinkberry","Princi","Raising Cane's","Shake Shack","Texas Roadhouse"],
    starbucks:   ["Starbucks"]
  },

  /* Markets (bilingual). Stored value = English name. Edit/add freely. */
  MARKETS: [
    { en:"United Arab Emirates", ar:"الإمارات العربية المتحدة" },
    { en:"Saudi Arabia",         ar:"المملكة العربية السعودية" },
    { en:"Kuwait",               ar:"الكويت" },
    { en:"Qatar",                ar:"قطر" },
    { en:"Bahrain",              ar:"البحرين" },
    { en:"Egypt",                ar:"مصر" },
    { en:"Jordan",               ar:"الأردن" },
    { en:"Oman",                 ar:"عُمان" },
    { en:"Lebanon",              ar:"لبنان" }
  ],

  /* Rank badges — earned by journey completion %. Swap each icon to your own PNG
     (assets/badges/*.png), a Lottie {lottie:"..."}, or an emoji {emoji:"🏆"}.
     Edit thresholds/names freely; they must be ordered by ascending min. */
  RANKS: [
    { min:0,   en:"Beginner", ar:"مبتدئ",  icon:{ img:"assets/badges/beginner.png" } },
    { min:20,  en:"Explorer", ar:"مستكشف", icon:{ img:"assets/badges/explorer.png" } },
    { min:40,  en:"Achiever", ar:"منجِز",   icon:{ img:"assets/badges/achiever.png" } },
    { min:60,  en:"Expert",   ar:"خبير",    icon:{ img:"assets/badges/expert.png" } },
    { min:80,  en:"Master",   ar:"بارع",    icon:{ img:"assets/badges/master.png" } },
    { min:100, en:"Champion", ar:"بطل",     icon:{ img:"assets/badges/champion.png" } }
  ],


  /* Worlds (divisions). Each level = a game folder. url is relative to index.html. */
  WORLDS: {
    retail: {
      folder: "art-of-selling-retail",
      color: "#E94858", grad: "var(--g-selling)",
      logo:  { img:"assets/logos/art-of-selling.png" },
      art:   "assets/worlds/retail.jpg",
      name:    { en:"Art of Selling",  ar:"فن البيع" },
      journey: { en:"Retail Journey",  ar:"رحلة التجزئة" },
      action:  { emoji:"🛍️" },   // challenge "Action" icon — swap to img/lottie if you like
      learn: {
        en:["Build connection","Understand customer needs","Recommend with confidence"],
        ar:["كوّن رابطًا مع العميل","افهم احتياجات العميل","انصح بثقة"]
      },
      levels: [
        { id:"driving-conversion",        released:true,  url:"art-of-selling-retail/driving-conversion/",        en:"The Art of Driving Conversion",        ar:"فن تحفيز الشراء" },
        { id:"first-impression",          released:false, url:"art-of-selling-retail/first-impression/",          en:"The Power of the First Impression",    ar:"قوة الانطباع الأول" },
        { id:"discovery",                 released:false, url:"art-of-selling-retail/discovery/",                 en:"The Art of Discovery",                 ar:"فن الاكتشاف" },
        { id:"product-storytelling",      released:false, url:"art-of-selling-retail/product-storytelling/",      en:"The Art of Product Storytelling",      ar:"فن سرد قصة المنتج" },
        { id:"elevated-recommendations",  released:false, url:"art-of-selling-retail/elevated-recommendations/",  en:"The Art of Elevated Recommendations",  ar:"فن التوصيات الراقية" },
        { id:"closing-the-sale",          released:false, url:"art-of-selling-retail/closing-the-sale/",          en:"The Power of the Closing the Sale",    ar:"قوة إتمام البيع" },
        { id:"seamless-checkout",         released:false, url:"art-of-selling-retail/seamless-checkout/",         en:"The Power of the Seamless Checkout",   ar:"قوة الدفع السلس" },
        { id:"lasting-impressions",       released:false, url:"art-of-selling-retail/lasting-impressions/",       en:"The Power of the Lasting Impressions", ar:"قوة الانطباعات الدائمة" },
        { id:"service-recovery",          released:false, url:"art-of-selling-retail/service-recovery/",          en:"The Art of Service Recovery",          ar:"فن استعادة الخدمة" }
      ]
    },

    hospitality: {
      folder: "art-of-guest-experience",
      color: "#F15A24", grad: "var(--g-guest)",
      logo:  { img:"assets/logos/art-of-guest-experience.png" },
      art:   "assets/worlds/hospitality.jpg",
      name:    { en:"Art of Guest Experience", ar:"فن تجربة الضيف" },
      journey: { en:"Hospitality Journey",     ar:"رحلة الضيافة" },
      action:  { emoji:"🍽️" },
      learn: {
        en:["Create a warm welcome","Handle guest needs with care","Turn moments into memories"],
        ar:["اصنع ترحيبًا حارًا","لبِّ احتياجات الضيف بعناية","حوِّل اللحظات إلى ذكريات"]
      },
      levels: [
        { id:"warm-welcome-curated-conversations",        released:false, url:"art-of-guest-experience/warm-welcome-curated-conversations/",        en:"The Art of the Warm Welcome & Curated Conversations",   ar:"فن الترحيب الحار والمحادثات المنسّقة" },
        { id:"culinary-storytelling-thoughtful-pairings", released:false, url:"art-of-guest-experience/culinary-storytelling-thoughtful-pairings/", en:"The Art of Culinary Storytelling & Thoughtful Pairings", ar:"فن سرد القصص الطهوية والمزج المدروس" },
        { id:"memorable-moments-seamless-farewell",       released:false, url:"art-of-guest-experience/memorable-moments-seamless-farewell/",       en:"The Art of Memorable Moments & Seamless Farewell",      ar:"فن اللحظات التي لا تُنسى والوداع السلس" },
        { id:"genuine-gratitude-service-recovery",        released:false, url:"art-of-guest-experience/genuine-gratitude-service-recovery/",        en:"The Art of Genuine Gratitude & Service Recovery",       ar:"فن الامتنان الصادق واستعادة الخدمة" }
      ]
    },

    starbucks: {
      folder: "art-of-connection",
      color: "#007042", grad: "var(--g-connection)",
      logo:  { img:"assets/logos/art-of-connection.png" },
      art:   "assets/worlds/starbucks.jpg",
      name:    { en:"Art of Connection", ar:"فن التواصل" },
      journey: { en:"Starbucks Journey", ar:"رحلة ستاربكس" },
      action:  { emoji:"☕" },
      learn: {
        en:["Build genuine connections","Listen and understand","Personalize every interaction"],
        ar:["كوّن روابط حقيقية","أنصت وافهم","خصّص كل تفاعل"]
      },
      levels: [
        { id:"warm-welcome-connection",     released:false, url:"art-of-connection/warm-welcome-connection/",     en:"The Art of the Warm Welcome & The Power of Connection", ar:"فن الترحيب الحار وقوة التواصل" },
        { id:"selling-starbucks-products",  released:false, url:"art-of-connection/selling-starbucks-products/",  en:"The Art of Selling Starbucks Products",                ar:"فن بيع منتجات ستاربكس" },
        { id:"sampling-handoff-speed",      released:false, url:"art-of-connection/sampling-handoff-speed/",      en:"The Art of Sampling, Hand-Off & Speed of Service",     ar:"فن التذوّق والتسليم وسرعة الخدمة" },
        { id:"loyalty-service-recovery",    released:false, url:"art-of-connection/loyalty-service-recovery/",    en:"The Power of Loyalty & Service Recovery",              ar:"قوة الولاء واستعادة الخدمة" }
      ]
    }
  },

  /* Customer Experience — General: standalone games with their OWN entry + backend.
     markets: which markets see each project. Use a list for market-specific projects,
     or "all" for every market. Values must match the MARKETS list above. */
  GENERAL: {
    folder: "customer-experience-general",
    games: [
      { id:"aura-pass", released:true,  markets:["United Arab Emirates"], url:"customer-experience-general/aura-pass/", en:"AURA Pass",  ar:"بطاقة أورا",
        icon:{ img:"assets/logos/aura-white.png", box:"grad" } },
      { id:"ksa-ready", released:false, markets:["Saudi Arabia"],         url:"customer-experience-general/ksa-ready/", en:"KSA Ready",  ar:"جاهزية السعودية",
        icon:{ img:"assets/icons/ksa-flag.png",  box:"image" } }
      /* example — a project for every market:
      ,{ id:"cx-basics", released:true, markets:"all", url:"customer-experience-general/cx-basics/", en:"CX Basics", ar:"أساسيات تجربة العملاء", icon:{emoji:"🎓"} } */
    ]
  }
};

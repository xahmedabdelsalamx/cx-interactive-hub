/* ============================================================
   DIVISION · RETAIL · Art of Selling
   ------------------------------------------------------------
   PURE DATA + TEXT. No logic here.
   Every text field is { ar, en }. KSA Arabic is the default voice.
   `media` values are keys into media/media-config.js.

   ⚠️ PLACEHOLDER CONTENT — two short rounds so the game runs.
   Replace with the real 4 rounds × 5 questions when content lands.
   Round → mechanic mapping (locked in the spec):
     R1 hotspot/swipe · R2 match · R3 order · R4 scenario
   ============================================================ */

window.DIVISION_retail = {
  id: "retail",
  world: "retail",
  logo: "assets/logos/art-of-selling.jpg",
  title: { ar: "فن البيع", en: "Art of Selling" },

  rounds: [

    /* ---------- ROUND 1 · swipe (First Impression & Discovery) ---------- */
    {
      id: "r1",
      mechanic: "swipe",
      title: { ar: "الانطباع الأول وفن الاكتشاف", en: "First Impression & The Art of Discovery" },
      intro: {
        ar: "اسحب يمين لو فيه فرصة لخدمة أفضل، ويسار لو الموقف عادي.",
        en: "Swipe right if it's an opportunity for better service, left if it's a normal moment."
      },
      media: "retailIntro",
      questions: [
        {
          prompt: { ar: "عميل يقف قدام الرف ويقلّب في المنتج أكثر من مرة.", en: "A customer keeps picking up and putting back the same product." },
          media: "retailR1_q1",
          isOpportunity: true,
          feedback: { ar: "فرصة! ترددهم إشارة إنهم محتاجين مساعدة أو معلومة.", en: "Opportunity — hesitation is a cue they need help or info." }
        },
        {
          prompt: { ar: "عميل يمشي بسرعة وهو ماسك تلفونه على أذنه.", en: "A customer walks past quickly with a phone to their ear." },
          media: "retailR1_q2",
          isOpportunity: false,
          feedback: { ar: "مو الوقت المناسب — احترم انشغالهم وكن جاهز لو احتاجوك.", en: "Not now — respect that they're busy, stay ready if needed." }
        },
        {
          prompt: { ar: "عميل يسأل: 'فيه عروض هاليومين؟'", en: "A customer asks: 'Any offers these days?'" },
          isOpportunity: true,
          feedback: { ar: "فرصة واضحة لعرض القيمة والمنتجات المناسبة.", en: "Clear opening to present value and the right products." }
        }
      ]
    },

    /* ---------- ROUND 4 · scenario (Loyalty & Service Recovery) ---------- */
    {
      id: "r4",
      mechanic: "scenario",
      title: { ar: "بناء الولاء واستعادة الخدمة", en: "Creating Loyalty & Service Recovery" },
      intro: {
        ar: "اقرأ الموقف واختر أفضل رد.",
        en: "Read the situation and tap the best response."
      },
      media: "retailR4_q1",
      questions: [
        {
          scenario: { ar: "عميلة رجّعت قطعة فيها عيب وهي منزعجة شوي.", en: "A customer returns a faulty item and seems a bit upset." },
          options: [
            { ar: "آسف على الإزعاج، نبدلها لك حالاً ونتأكد إنها سليمة.", en: "I'm sorry for the trouble — let's swap it right away and check it's perfect." },
            { ar: "هذي سياسة الشركة، ما أقدر أسوي شي.", en: "That's company policy, nothing I can do." },
            { ar: "لازم ترجعين بالفاتورة بكرة.", en: "You'll have to come back tomorrow with the receipt." }
          ],
          correct: 0,
          feedback: { ar: "الاعتذار + الحل الفوري يحوّل الموقف إلى ولاء.", en: "Apology + an immediate fix turns the moment into loyalty." }
        },
        {
          scenario: { ar: "عميل دائم يسأل عن أي جديد عنده في المتجر.", en: "A regular customer asks what's new in store." },
          options: [
            { ar: "أعرفه على الجديد وأربطه بذوقه اللي أعرفه.", en: "Show the new arrivals and tie them to what I know he likes." },
            { ar: "أقول له شوف بنفسك.", en: "Tell him to have a look around." },
            { ar: "ما عندنا جديد.", en: "We have nothing new." }
          ],
          correct: 0,
          feedback: { ar: "تذكّر تفضيلاته يبني علاقة طويلة.", en: "Remembering his preferences builds a lasting relationship." }
        }
      ]
    }

  ]
};

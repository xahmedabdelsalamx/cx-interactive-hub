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
  logo: "assets/logos/art-of-selling-color.png",
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
          prompt: { ar: "زبون يقف قدام الرف ويقلّب في المنتج أكثر من مرة.", en: "A customer keeps picking up and putting back the same product." },
          media: "retailR1_q1",
          isOpportunity: true,
          feedback: { ar: "فرصة! ترددهم إشارة إنهم محتاجين مساعدة أو معلومة.", en: "Opportunity — hesitation is a cue they need help or info." }
        },
        {
          prompt: { ar: "زبون يمشي بسرعة وهو ماسك تلفونه على أذنه.", en: "A customer walks past quickly with a phone to their ear." },
          media: "retailR1_q2",
          isOpportunity: false,
          feedback: { ar: "مو الوقت المناسب — احترم انشغالهم وكن جاهز لو احتاجوك.", en: "Not now — respect that they're busy, stay ready if needed." }
        },
        {
          prompt: { ar: "زبون يسأل: 'فيه عروض هاليومين؟'", en: "A customer asks: 'Any offers these days?'" },
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
          scenario: { ar: "زبونة رجّعت قطعة فيها عيب وهي منزعجة شوي.", en: "A customer returns a faulty item and seems a bit upset." },
          options: [
            { ar: "آسف على الإزعاج، نبدلها لك حالاً ونتأكد إنها سليمة.", en: "I'm sorry for the trouble — let's swap it right away and check it's perfect." },
            { ar: "هذي سياسة الشركة، ما أقدر أسوي شي.", en: "That's company policy, nothing I can do." },
            { ar: "لازم ترجعين بالفاتورة بكرة.", en: "You'll have to come back tomorrow with the receipt." }
          ],
          correct: 0,
          feedback: { ar: "الاعتذار + الحل الفوري يحوّل الموقف إلى ولاء.", en: "Apology + an immediate fix turns the moment into loyalty." }
        },
        {
          scenario: { ar: "زبون دائم يسأل عن أي جديد عنده في المتجر.", en: "A regular customer asks what's new in store." },
          options: [
            { ar: "أعرفه على الجديد وأربطه بذوقه اللي أعرفه.", en: "Show the new arrivals and tie them to what I know he likes." },
            { ar: "أقول له شوف بنفسك.", en: "Tell him to have a look around." },
            { ar: "ما عندنا جديد.", en: "We have nothing new." }
          ],
          correct: 0,
          feedback: { ar: "تذكّر تفضيلاته يبني علاقة طويلة.", en: "Remembering his preferences builds a lasting relationship." }
        }
      ]
    },

    /* ---------- ROUND 5 · rush (BONUS · Peak Season) ---------- */
    {
      id: "r5",
      mechanic: "rush",
      bonus: true,
      seconds: 8,
      title: { ar: "موسم الذروة: طاقة وتواصل ودفع سلس", en: "Peak Season: Energy, Connection & Seamless Checkout" },
      intro: { ar: "جولة سريعة! قرارات خاطفة تحت الضغط — كل ما كنت أسرع وأصح، طاقتك تزيد ⚡", en: "Fast round! Quick calls under pressure — the faster and more accurate you are, the higher your energy ⚡" },
      media: "retailR5_intro",
      questions: [
        { prompt: { ar: "الطابور طويل — وش الأنسب؟", en: "The queue is long — what's best?" },
          media: "retailR5_q1",
          options: [ { ar: "أحيّي وأخدمهم بسرعة وابتسامة", en: "Greet and serve fast with a smile" }, { ar: "أتجاهل الطابور وأكمل ترتيب", en: "Ignore the queue and keep tidying" } ],
          correct: 0, feedback: { ar: "السرعة مع الود تخفّف الضغط.", en: "Speed with warmth eases the rush." } },
        { prompt: { ar: "زبون محتار بين منتجين والوقت ضيق.", en: "A shopper is torn between two items, time is tight." },
          media: "retailR5_q2",
          options: [ { ar: "أرشّح الأنسب له بثقة وسرعة", en: "Confidently recommend the best fit, fast" }, { ar: "أخليه يقرر لحاله بدون مساعدة", en: "Leave them to decide alone" } ],
          correct: 0, feedback: { ar: "توصية سريعة وواثقة تقفل البيع.", en: "A quick confident rec closes the sale." } },
        { prompt: { ar: "زميلك غارق بالطابور وأنت فاضي ثانية.", en: "A teammate is swamped and you're free for a moment." },
          media: "retailR5_q3",
          options: [ { ar: "أفتح صندوق وأساعد", en: "Open a till and jump in" }, { ar: "أنتظر لين يخلص لحاله", en: "Wait for them to finish alone" } ],
          correct: 0, feedback: { ar: "انسيابية الفريق تنقذ وقت الذروة.", en: "Team flow saves peak-time." } },
        { prompt: { ar: "في عرض موسمي قوي — متى تذكره؟", en: "There's a strong seasonal offer — when to mention it?" },
          media: "retailR5_q4",
          options: [ { ar: "عند الدفع بسرعة وبشكل طبيعي", en: "At checkout, quickly and naturally" }, { ar: "ما أذكره عشان أوفر وقت", en: "Skip it to save time" } ],
          correct: 0, feedback: { ar: "ذكر العرض بسرعة يرفع القيمة.", en: "A quick offer mention lifts value." } },
        { prompt: { ar: "زبون منزعج من الزحمة.", en: "A shopper is annoyed by the crowd." },
          media: "retailR5_q5",
          options: [ { ar: "أعترف بالضغط وأخدمه بسرعة ولطف", en: "Acknowledge it and serve fast and kindly" }, { ar: "أتجاهل انزعاجه", en: "Ignore their frustration" } ],
          correct: 0, feedback: { ar: "الاعتراف باللحظة يهدّي الموقف.", en: "Acknowledging the moment calms it." } },
        { prompt: { ar: "الدفع تأخّر بسبب أمر بسيط.", en: "Checkout stalls over a small issue." },
          media: "retailR5_q6",
          options: [ { ar: "أحلّه بسرعة وأعتذر عن التأخير", en: "Fix it fast and apologize for the wait" }, { ar: "أخليه ينتظر بدون توضيح", en: "Make them wait with no explanation" } ],
          correct: 0, feedback: { ar: "حل سريع + اعتذار = دفع سلس.", en: "Quick fix + apology = seamless checkout." } }
      ]
    }

  ]
};

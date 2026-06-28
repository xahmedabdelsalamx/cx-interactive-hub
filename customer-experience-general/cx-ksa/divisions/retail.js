/* ============================================================
   DIVISION: RETAIL — Art of Selling / فن البيع
   Content authored from M1–M4 + Peak Season decks.
   Arabic = KSA Saudi Arabic.  Terminology rule: use زبون / زبائن only.
   Rounds: R1 swipe · R2 match · R3 order · R4 scenario · R5 rush (bonus)
   ============================================================ */
window.DIVISION_retail = {
  id: "retail",
  world: "retail",
  logo: "assets/logos/art-of-selling-color.png",
  title: { ar: "فن البيع", en: "The Art of Selling" },
  rounds: [

    /* ---------- ROUND 1 · swipe — First Impression & Discovery ---------- */
    {
      id: "r1",
      mechanic: "swipe",
      title: { ar: "الانطباع الأول وفن الاكتشاف", en: "First Impression & The Art of Discovery" },
      intro: {
        ar: "الانطباع الأول يتكوّن خلال 7 ثواني، و93% منه لغة جسد ونبرة. اسحب يمين لو اللحظة فرصة للتواصل والاكتشاف، ويسار لو الأنسب تعطيه مساحة.",
        en: "First impressions form in 7 seconds, 93% body language and tone. Swipe right if it's a moment to connect and discover, left if it's better to give space."
      },
      media: "retailR1_intro",
      questions: [
        {
          prompt: { ar: "زبون واقف يطالع منتج واحد من فترة، بدون ما يلمسه.", en: "A shopper keeps looking at one item for a while, without touching it." },
          media: "retailR1_q1",
          isOpportunity: true,
          feedback: { ar: "فحص الـ3 ثواني: لاحظ اللحظة، واسأل سؤال واحد طبيعي عشان تكتشف احتياجه.", en: "The 3-second check: notice the moment, ask one natural question to discover the need." }
        },
        {
          prompt: { ar: "زبون داخل المتجر وانت مشغول مع زبون ثاني.", en: "A shopper walks in while you're busy with someone else." },
          media: "retailR1_q2",
          isOpportunity: true,
          feedback: { ar: "تواصل بصري سريع وابتسامة و«معك بعد لحظة» تخليه يستنى بدل ما يطلع. المشغولية طبيعية، البرود اختيار.", en: "Quick eye contact, a smile and a short signal keep them. Busy is normal, cold is a choice." }
        },
        {
          prompt: { ar: "زبون قال بوضوح «بس أتفرّج، شكراً» وكمّل طريقه.", en: "A shopper clearly said 'just looking, thanks' and moved on." },
          media: "retailR1_q3",
          isOpportunity: false,
          feedback: { ar: "احترم اللحظة وأعطه مساحة، بس خلّك ظاهر وقريب لو احتاجك.", en: "Respect the moment and give space, stay visible and ready if they need you." }
        },
        {
          prompt: { ar: "زبون يسأل: «عندكم هذا بمقاس أصغر؟»", en: "A shopper asks: 'Do you have this in a smaller size?'" },
          media: "retailR1_q4",
          isOpportunity: true,
          feedback: { ar: "وراء الطلب احتياج حقيقي، اسأل: «استخدام يومي ولا لمناسبة؟» عشان تلاقي لحظته الصح.", en: "Behind the request is a real need, ask 'everyday or a special occasion?' to find their true moment." }
        },
        {
          prompt: { ar: "زبون على التلفون ويمشي بسرعة لجوّه المتجر.", en: "A shopper is on the phone, walking quickly toward the back." },
          media: "retailR1_q5",
          isOpportunity: false,
          feedback: { ar: "مو وقتها، خلّك جاهز وحاضر، وتواصل معه لما يفضى.", en: "Not the moment, stay ready and present, and connect once they're free." }
        },
        {
          prompt: { ar: "زبونة في Bath & Body Works تشمّ أكثر من عطر جسم وتقلّب بينهم بتردّد.", en: "A shopper at Bath & Body Works smells several body mists, hesitating between them." },
          media: "retailR1_q6",
          isOpportunity: true,
          feedback: { ar: "لاحظي ترددها، اسأليها تحب الروائح المنعشة ولا الدافئة عشان توجّهيها.", en: "Notice the hesitation, ask if she prefers fresh or warm scents to guide her." }
        },
        {
          prompt: { ar: "زبونة جرّبت درجة أحمر شفاه على يدها وكمّلت تتفرّج بصمت.", en: "A shopper swatched a lipstick shade on her hand and keeps browsing quietly." },
          media: "retailR1_q7",
          isOpportunity: false,
          feedback: { ar: "أعطيها مساحة بعد التجربة، وخلّيك قريبة لو احتاجت رأيك بالدرجة.", en: "Give her space after the swatch, stay close in case she wants help with the shade." }
        }
      ]
    },

    /* ---------- ROUND 2 · match — Storytelling & Elevated Recommendation ---------- */
    {
      id: "r2",
      mechanic: "match",
      title: { ar: "سرد المنتج والتوصية المرتفعة", en: "Product Storytelling & Elevated Recommendation" },
      intro: {
        ar: "حوّل المواصفات إلى مشاعر، واربط كل توصية باختيار الزبون. اختَر العنصر على اليسار، ثم وصّله بالطرف الصح على اليمين.",
        en: "Turn features into feelings and link every suggestion to the customer's choice. Tap a left item, then its correct match on the right."
      },
      media: "retailR2_intro",
      questions: [
        {
          instruction: { ar: "وصّل كل ميزة بالإحساس اللي يوصله للزبون.", en: "Match each feature to the feeling it gives the customer." },
          media: "retailR2_q1",
          pairs: [
            { left: { ar: "خفيف الوزن", en: "Lightweight" }, right: { ar: "تنساه على جسمك طول اليوم", en: "You forget you're even wearing it" } },
            { left: { ar: "قماش يثبت شكله", en: "Holds its shape" }, right: { ar: "يبقى أنيق حتى بعد الاستخدام", en: "Stays sharp even after wear" } },
            { left: { ar: "لون محايد", en: "Neutral colour" }, right: { ar: "ينسّق مع أغلب الإطلالات", en: "Pairs with most of your outfits" } },
            { left: { ar: "مقاوم للماء", en: "Water-resistant" }, right: { ar: "يضل ناشف ومرتاح وقت المطر", en: "Keeps you dry and easy in the rain" } }
          ],
          feedback: { ar: "حوّل الميزة إلى إحساس، الزبون يشتري الشعور في حياته، مو المواصفات.", en: "Turn the feature into a feeling, customers buy how it feels in their life, not the spec." }
        },
        {
          instruction: { ar: "وصّل اختيار الزبون بالإضافة الطبيعية اللي تكمّله.", en: "Match the customer's choice to the natural add-on that completes it." },
          media: "retailR2_q2",
          pairs: [
            { left: { ar: "اختار بنطلون جينز", en: "Chose jeans" }, right: { ar: "حزام يكمّل الإطلالة", en: "A belt to complete the look" } },
            { left: { ar: "بدلة كحلية لعرس نهاري", en: "Navy suit for a daytime wedding" }, right: { ar: "منديل جيب كتان يبرّد الإطلالة بالصور", en: "A linen pocket square that keeps it fresh in photos" } },
            { left: { ar: "قميص رسمي", en: "Dress shirt" }, right: { ar: "ربطة بسيطة تكمّل المظهر", en: "A simple tie to finish the look" } },
            { left: { ar: "حذاء رياضي", en: "Sneakers" }, right: { ar: "جوارب مريحة تكمّل الراحة", en: "Comfy socks to complete the comfort" } }
          ],
          feedback: { ar: "التوصية المرتفعة تربط باختيار الزبون وتضيف قيمة، مو تكديس منتجات.", en: "Elevated recommendation links to the choice and adds value, it doesn't pile on items." }
        },
        {
          instruction: { ar: "وصّل كل خطوة من خطوات التوصية بالجملة الصح.", en: "Match each recommendation step to its example line." },
          media: "retailR2_q3",
          pairs: [
            { left: { ar: "وضّح (Clarify)", en: "Clarify" }, right: { ar: "هذا الجينز اختيار ممتاز، قماشه ناعم ومريح طول اليوم", en: "Great pick, soft, comfy fabric you can wear all day" } },
            { left: { ar: "اربط (Connect)", en: "Connect" }, right: { ar: "كثير من الزبائن ياخذون هذا الحزام لأنه يكمّل الستايل", en: "Many customers add this belt because it completes the style" } },
            { left: { ar: "اختم (Complete)", en: "Complete" }, right: { ar: "أضيفه لك، أو نكتفي بالجينز… زي ما يريحك", en: "I can add it, or we keep just the jeans, whatever suits you" } },
            { left: { ar: "اوقف عند الوضوح", en: "Stop when clear" }, right: { ar: "فايدة وحدة واضحة… وأسكت", en: "One clear benefit… then stop talking" } }
          ],
          feedback: { ar: "كلارفاي ← كنكت ← كمبليت: وضّح الاختيار، اربط بإضافة طبيعية، واختم بثقة بدون ضغط.", en: "Clarify → Connect → Complete: clarify the choice, link a natural add-on, finish with calm confidence." }
        },
        {
          instruction: { ar: "وصّل احتياج الزبون بالفايدة الوحدة الواضحة.", en: "Match the customer's need to one clear benefit." },
          media: "retailR2_q4",
          pairs: [
            { left: { ar: "يبي شي يلبسه كل يوم", en: "Wants something for everyday" }, right: { ar: "هذا مريح وعملي للاستخدام اليومي", en: "Comfy and practical for daily wear" } },
            { left: { ar: "يبي إطلالة لمناسبة", en: "Wants a look for an occasion" }, right: { ar: "هذا يعطيك مظهر أنيق ومميز للمناسبة", en: "Gives you a sharp, standout look" } },
            { left: { ar: "قلقان من المقاس", en: "Worried about the fit" }, right: { ar: "القماش فيه مرونة تعطيك مقاس مريح", en: "The fabric stretches for a comfortable fit" } },
            { left: { ar: "يبي شي يدوم", en: "Wants something that lasts" }, right: { ar: "خاماته تثبت شكلها مع الوقت", en: "Materials that hold their shape over time" } }
          ],
          feedback: { ar: "قُل أقل وساعد أكثر، فايدة وحدة تناسب لحظته تخلّي القرار أسهل.", en: "Say less, help more, one benefit that fits their moment makes deciding easier." }
        },
        {
          instruction: { ar: "وصّل الموقف بجملة «النعم السهلة» الصح.", en: "Match the situation to the right 'easy yes' line." },
          media: "retailR2_q5",
          pairs: [
            { left: { ar: "اختار قميص ويبي يكمّل الإطلالة", en: "Picked a shirt, wants to complete the look" }, right: { ar: "ودّك أوريك خيار ينسّق معه؟", en: "Would you like a matching option?" } },
            { left: { ar: "متردد ياخذ إضافة", en: "Unsure about an add-on" }, right: { ar: "هذا ينسّق زين مع اللي اخترته", en: "This pairs really well with what you chose" } },
            { left: { ar: "خلص اختياره وراضي", en: "Done and happy with the choice" }, right: { ar: "خيار موفّق، أكمّل لك؟", en: "Great choice, shall I ring it up?" } },
            { left: { ar: "ما يبي إضافات", en: "Doesn't want extras" }, right: { ar: "تمام، اللي اخترته حلو وكافي", en: "Of course, what you chose is great as is" } }
          ],
          feedback: { ar: "لغة «النعم السهلة» ترشد بلطف وتحترم القرار، الاحترام يبني الثقة، والثقة تبني البيع.", en: "The 'easy yes' language guides gently and respects the decision, respect builds trust, trust builds the sale." }
        },
        {
          instruction: { ar: "وصّلي كل ميزة في منتج تجميل بالإحساس اللي يوصل للزبونة.", en: "Match each beauty-product feature to the feeling it gives the customer." },
          media: "retailR2_q6",
          pairs: [
            { left: { ar: "أحمر شفاه مرطّب", en: "Hydrating lipstick" }, right: { ar: "يحس مريح وما ينشّف الشفايف", en: "Comfortable, never dries your lips" } },
            { left: { ar: "كريم جسم برائحة الفانيلا", en: "Vanilla body cream" }, right: { ar: "دفء وراحة يدوم طول اليوم", en: "Warmth and comfort that lasts all day" } },
            { left: { ar: "أساس بتغطية خفيفة", en: "Light-coverage foundation" }, right: { ar: "مظهر طبيعي يخلّي البشرة تتنفّس", en: "A natural look that lets skin breathe" } },
            { left: { ar: "عطر بالحمضيات", en: "Citrus fragrance" }, right: { ar: "انتعاش حيوي تبدأ به يومك", en: "A lively freshness to start your day" } }
          ],
          feedback: { ar: "حتى في التجميل، حوّلي الميزة لإحساس تعيشه الزبونة.", en: "Even in beauty, turn the feature into a feeling she lives." }
        },
        {
          instruction: { ar: "وصّلي اختيار الزبونة بالإضافة الطبيعية اللي تكمّله.", en: "Match her choice to the natural add-on that completes it." },
          media: "retailR2_q7",
          pairs: [
            { left: { ar: "اختارت عطر من Bath & Body Works", en: "Chose a Bath & Body Works mist" }, right: { ar: "لوشن بنفس الرائحة يثبّتها أطول", en: "A matching lotion that makes it last longer" } },
            { left: { ar: "اختارت أحمر شفاه", en: "Chose a lipstick" }, right: { ar: "ملمّع أو مثبّت يكمّل الإطلالة", en: "A gloss or setter to complete the look" } },
            { left: { ar: "اختارت كريم أساس", en: "Chose a foundation" }, right: { ar: "إسفنجة للتطبيق الأنعم", en: "A sponge for smoother application" } },
            { left: { ar: "اختارت غسول وجه", en: "Chose a face wash" }, right: { ar: "مرطّب يكمّل الروتين", en: "A moisturizer to complete the routine" } }
          ],
          feedback: { ar: "الإضافة المرتبطة تكمّل الروتين وتضيف قيمة، مو مجرد تكديس.", en: "A linked add-on completes the routine and adds value, not clutter." }
        }
      ]
    },

    /* ---------- ROUND 3 · order — Closing & Seamless Checkout ---------- */
    {
      id: "r3",
      mechanic: "order",
      title: { ar: "إغلاق البيع والدفع السلس", en: "Closing the Sale & Seamless Checkout" },
      intro: {
        ar: "الإغلاق إزالة آخر حاجز، والدفع هو آخر ذكرى تبقى عند الزبون. رتّب الخطوات بالترتيب الصح بالضغط عليها بالتسلسل.",
        en: "Closing removes the last barrier, and checkout is the final memory. Tap the steps in the correct order."
      },
      media: "retailR3_intro",
      questions: [
        {
          instruction: { ar: "رتّب تجربة دفع سلسة من القرار للوداع.", en: "Order a seamless checkout from decision to goodbye." },
          media: "retailR3_q1",
          steps: [
            { ar: "رحّب باختياره: خيار موفّق", en: "Acknowledge the choice: great pick" },
            { ar: "وجّهه للكاشير", en: "Guide him to the counter" },
            { ar: "أكّد المنتج بهدوء", en: "Confirm the item calmly" },
            { ar: "غلّفه بعناية", en: "Pack it with care" },
            { ar: "ودّعه بحرارة", en: "Send him off warmly" }
          ],
          feedback: { ar: "ختام سلس: تأكيد، عناية، ووداع دافئ، النهاية هي اللي تبقى بذاكرة الزبون.", en: "A smooth close: confirm, care, warm farewell, the ending is what stays in memory." }
        },
        {
          instruction: { ar: "زبون متردد، رتّب حركات الإغلاق البسيطة.", en: "A hesitant shopper, order the simple closing moves." },
          media: "retailR3_q2",
          steps: [
            { ar: "لاحظ التردد", en: "Notice the hesitation" },
            { ar: "وضّح الفايدة اللي تهمه", en: "Clarify the benefit he cares about" },
            { ar: "طمّنه على اختياره", en: "Reassure him on his choice" },
            { ar: "وجّهه للأمام بلطف: أجهّزه لك؟", en: "Guide forward gently: shall I get it ready?" }
          ],
          feedback: { ar: "التردد فرصة مو رفض، وضّح، طمّن، ووجّه بدون ضغط.", en: "Hesitation is an opportunity, not a no, clarify, reassure, guide, pressure-free." }
        },
        {
          instruction: { ar: "امتلك آخر 30 ثانية، رتّب الدفع المرتفع.", en: "Own the last 30 seconds, order the elevated checkout." },
          media: "retailR3_q3",
          steps: [
            { ar: "رحّب فيه عند الكاشير من جديد", en: "Greet him again at the till" },
            { ar: "خلّك حاضر: ابتسامة وتواصل بصري", en: "Stay present: smile and eye contact" },
            { ar: "اذكر مزايا أورا (Aura)", en: "Mention Aura loyalty benefits" },
            { ar: "غلّف بعناية", en: "Pack with care" },
            { ar: "ودّعه بثقة ودعوة يرجع", en: "Farewell with confidence and an invite to return" }
          ],
          feedback: { ar: "امتلك آخر 30 ثانية: حضور، أورا، تغليف، ووداع، يحوّل البيع لذكرى تخلّيه يرجع.", en: "Own the last 30 seconds: presence, Aura, packing, farewell, it turns a buy into a memory." }
        },
        {
          instruction: { ar: "زبون يقارن بين خيارين، رتّب تصرّفك.", en: "A shopper compares two items, order your response." },
          media: "retailR3_q4",
          steps: [
            { ar: "لاحظ إنه يقارن بين خيارين", en: "Notice he's comparing two options" },
            { ar: "اعطه خيار: أيهم تحس يناسبك أكثر؟", en: "Offer a choice: which feels better for you?" },
            { ar: "طمّنه: هذا من أكثرها طلب", en: "Reassure: this is one of our most popular" },
            { ar: "وجّهه: أجهّزه لك؟", en: "Guide: shall I get it ready?" }
          ],
          feedback: { ar: "حركات إغلاق بسيطة: خيار، طمأنة، وتوجيه، قصيرة وواثقة وبدون ضغط.", en: "Simple closing moves: choice, reassurance, guidance, short, confident, pressure-free." }
        },
        {
          instruction: { ar: "من القرار للوداع، رتّب التجربة الكاملة.", en: "From decision to goodbye, order the full experience." },
          media: "retailR3_q5",
          steps: [
            { ar: "الزبون قرر الشراء", en: "The customer decides to buy" },
            { ar: "رحّب باختياره: خيار موفّق", en: "Acknowledge the choice: great pick" },
            { ar: "اقترح إضافة وحدة طبيعية", en: "Suggest one natural add-on" },
            { ar: "أنهِ الدفع بسلاسة", en: "Complete payment smoothly" },
            { ar: "ودّعه بطاقة إيجابية", en: "Close with positive energy" }
          ],
          feedback: { ar: "من القرار للوداع: سلس، إنساني، ولا تنسى البيع والولاء حتى عند الدفع.", en: "From decision to goodbye: smooth, human, and don't forget selling and loyalty even at the till." }
        },
        {
          instruction: { ar: "زبونة تشتري عطر هدية من Bath & Body Works، رتّبي تجربة الدفع.", en: "A shopper buys a Bath & Body Works gift fragrance, order the checkout." },
          media: "retailR3_q6",
          steps: [
            { ar: "رحّبي باختيارها للهدية", en: "Acknowledge her gift choice" },
            { ar: "اقترحي تغليف هدية أنيق", en: "Offer elegant gift wrapping" },
            { ar: "اذكري مزايا أورا", en: "Mention Aura benefits" },
            { ar: "غلّفيها بعناية", en: "Pack it with care" },
            { ar: "ودّعيها بحرارة", en: "Send her off warmly" }
          ],
          feedback: { ar: "تجربة الهدية تبدأ من الكاشير، اجعليها مميزة من البداية للنهاية.", en: "The gift experience starts at the till, make it special from start to finish." }
        },
        {
          instruction: { ar: "زبونة تسأل عن روتين بشرة بسيط، رتّبي خطوات توصيتك.", en: "A shopper asks for a simple skincare routine, order your recommendation." },
          media: "retailR3_q7",
          steps: [
            { ar: "افهمي نوع بشرتها", en: "Understand her skin type" },
            { ar: "اقترحي الغسول المناسب", en: "Suggest the right cleanser" },
            { ar: "أضيفي المرطّب كخطوة طبيعية", en: "Add the moisturizer as a natural step" },
            { ar: "اختمي بنصيحة استخدام بسيطة", en: "Finish with one simple usage tip" }
          ],
          feedback: { ar: "رتّبي الروتين خطوة بخطوة عشان القرار يكون أسهل وأوضح.", en: "Order the routine step by step so the decision is easier and clearer." }
        }
      ]
    },

    /* ---------- ROUND 4 · scenario — Loyalty & Service Recovery ---------- */
    {
      id: "r4",
      mechanic: "scenario",
      title: { ar: "بناء الولاء واستعادة الخدمة", en: "Creating Loyalty & Service Recovery" },
      intro: {
        ar: "الزبون يتذكّر آخر اللحظات أكثر من أي شي. الزبون يبي يُسمَع، ويُحترَم، ويشوف فعل. اقرأ الموقف واختر أفضل تصرّف.",
        en: "Customers remember the final moments most. They need to be heard, respected, and to see action. Read each situation and pick the best response."
      },
      media: "retailR4_intro",
      questions: [
        {
          scenario: { ar: "زبون انتظر بالطابور وايد ووصل الكاشير منزعج.", en: "A customer waited a long time in line and reaches the till frustrated." },
          media: "retailR4_q1",
          options: [
            { ar: "أسمعه وأعتذر عن الانتظار، وأخلّص طلبه بسرعة وأشكره", en: "Listen, apologize for the wait, serve him quickly and thank him" },
            { ar: "أتجاهل انزعاجه وأكمل عادي", en: "Ignore his frustration and carry on" },
            { ar: "أقول له الطابور طبيعي بأوقات الذروة", en: "Tell him queues are normal at peak times" }
          ],
          correct: 0,
          feedback: { ar: "اسمع، تحمّل المسؤولية، عالج بسرعة، وادعه يرجع، الزبون يبي يُسمَع ويشوف فعل.", en: "See, own, restore quickly, invite back, the customer needs to be heard and to see action." }
        },
        {
          scenario: { ar: "زبون يبي مقاس معين وهو مو متوفر بالفرع.", en: "A customer wants a specific size that isn't available in store." },
          media: "retailR4_q2",
          options: [
            { ar: "أعتذر، وأتحقق من فرع ثاني أو أونلاين وأوفّر له حل", en: "Apologize, check another branch or online, and offer a solution" },
            { ar: "أقول خلص المقاس وأطنّش", en: "Say it's out of stock and move on" },
            { ar: "أقول له دوّر بنفسك بالرفوف", en: "Tell him to look through the shelves himself" }
          ],
          correct: 0,
          feedback: { ar: "استعادة الخدمة = حل واضح وسريع، مو مجرد اعتذار.", en: "Service recovery means a clear, quick solution, not just an apology." }
        },
        {
          scenario: { ar: "زبون يقول السعر على الرف يختلف عن سعر الكاشير.", en: "A customer says the shelf price differs from the till price." },
          media: "retailR4_q3",
          options: [
            { ar: "أتأكد بهدوء، وإذا فيه خطأ أصلحه له وأشكره إنه نبّهنا", en: "Calmly verify, fix it if there's an error, and thank him for flagging it" },
            { ar: "أصرّ إن سعر الكاشير هو الصح", en: "Insist the till price is correct" },
            { ar: "أقول هذا مو شغلي", en: "Say that's not my job" }
          ],
          correct: 0,
          feedback: { ar: "الهدوء + الحل العادل يحوّل الموقف إلى ثقة.", en: "Calm plus a fair fix turns the moment into trust." }
        },
        {
          scenario: { ar: "زبون حسّ إنك تجاهلته وانت تساعد زبون ثاني.", en: "A customer feels ignored while you help someone else." },
          media: "retailR4_q4",
          options: [
            { ar: "أعتذر وأعطيه تواصل بصري وأطمّنه إني بكون معه بعد لحظات", en: "Apologize, give eye contact, and assure him I'll be with him shortly" },
            { ar: "أكمل مع الثاني وأخليه ينتظر بدون كلمة", en: "Keep going with the other customer and leave him waiting silently" },
            { ar: "أقول له شيل دورك وانتظر", en: "Tell him to wait his turn" }
          ],
          correct: 0,
          feedback: { ar: "إشارة بسيطة «معك بعد لحظة» تخلّيه يحس مرئي ومحترم.", en: "A simple 'I'll be right with you' makes him feel seen and respected." }
        },
        {
          scenario: { ar: "زبون خلّص شراءه وراضي، وش أنسب ختام؟", en: "A customer finishes his purchase, happy, what's the best close?" },
          media: "retailR4_q5",
          options: [
            { ar: "أشكره بصدق، أعرّفه على مزايا أورا، وأدعوه يرجع", en: "Thank him sincerely, introduce Aura benefits, and invite him back" },
            { ar: "أعطيه الكيس وأطنّش", en: "Hand him the bag and look away" },
            { ar: "أخلّص بسرعة بدون وداع", en: "Finish quickly with no goodbye" }
          ],
          correct: 0,
          feedback: { ar: "اللحظات الأخيرة تصنع الذكرى، شكر صادق + أورا + دعوة ترجع تبني الولاء.", en: "The final moments make the memory, sincere thanks + Aura + an invite build loyalty." }
        },
        {
          scenario: { ar: "زبونة رجعت لأن درجة كريم الأساس ما ناسبت لون بشرتها.", en: "A shopper returns because the foundation shade didn't match her skin." },
          media: "retailR4_q6",
          options: [
            { ar: "أعتذر، أساعدها تلاقي الدرجة الصح وأرشدها تجرّبها على الفك", en: "Apologize, help her find the right shade, and guide her to test it on the jaw" },
            { ar: "أقول لها الدرجة صح وهي غلطت بالاختيار", en: "Tell her the shade is fine and she chose wrong" },
            { ar: "أقول لها ما فيه استبدال", en: "Tell her there are no exchanges" }
          ],
          correct: 0,
          feedback: { ar: "استعادة الخدمة بحل واضح للدرجة الصح يبني الثقة بالتجربة.", en: "Recovery with a clear fix for the right shade builds trust in the experience." }
        },
        {
          scenario: { ar: "زبونة مترددة تجرّب تستر لأنها قلقانة من النظافة.", en: "A shopper hesitates to try a tester out of hygiene concern." },
          media: "retailR4_q7",
          options: [
            { ar: "أطمّنها، وأوفّر لها عيّنة نظيفة أو أداة استخدام مرة وحدة", en: "Reassure her and offer a clean sample or a single-use applicator" },
            { ar: "أقول لها التسترات نظيفة وخلاص", en: "Just tell her the testers are clean" },
            { ar: "أتجاهل قلقها", en: "Ignore her concern" }
          ],
          correct: 0,
          feedback: { ar: "النظافة جزء من الثقة بالتجربة، وطمأنتها تصنع راحة.", en: "Hygiene is part of trust in the experience, reassuring her creates comfort." }
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
      intro: {
        ar: "جولة سريعة! قرارات خاطفة بإيقاع موسم الذروة، كل ما كنت أسرع وأصح، طاقتك تزيد ⚡ موسم الذروة مو ضغط… هو إثبات.",
        en: "Fast round! Quick calls at peak-season tempo, the faster and more accurate you are, the higher your energy ⚡ Peak is not pressure, it's proof."
      },
      media: "retailR5_intro",
      questions: [
        { prompt: { ar: "بداية الدوام بموسم الذروة؟", en: "Start of a peak-season shift?" },
          media: "retailR5_q1",
          options: [ { ar: "أدخل بطاقة وثقة وابتسامة", en: "Arrive switched-on, confident, smiling" }, { ar: "أدخل متوتر وراسي طايح", en: "Show up tense and low" } ],
          correct: 0, feedback: { ar: "الطاقة اللي تجي فيها هي أول شي يحسه الزبون.", en: "The energy you bring is the first thing customers feel." } },
        { prompt: { ar: "زميلك غرقان بالطابور وانت فاضي لحظة؟", en: "A teammate is swamped and you're free for a moment?" },
          media: "retailR5_q2",
          options: [ { ar: "أدخل أساعد فوراً", en: "Step in and help fast" }, { ar: "أنتظر لين يخلص لحاله", en: "Wait for them to finish alone" } ],
          correct: 0, feedback: { ar: "نتحرك كفريق واحد، الإيقاع يحسه الزبون.", en: "Move as one team, customers feel the rhythm." } },
        { prompt: { ar: "أول تواصل مع زبون داخل؟", en: "First contact with an entering customer?" },
          media: "retailR5_q3",
          options: [ { ar: "تواصل بصري وابتسامة وترحيب صادق", en: "Eye contact, a smile, a genuine welcome" }, { ar: "أكمل شغلي بدون ما ألتفت", en: "Keep working without looking up" } ],
          correct: 0, feedback: { ar: "أول 5 ثواني تقول له إنه بالمكان الصح.", en: "The first 5 seconds tell them they're in the right place." } },
        { prompt: { ar: "الضغط زاد بين تفاعلين؟", en: "Pressure builds between two interactions?" },
          media: "retailR5_q4",
          options: [ { ar: "خذ نفس، ابتسم من جديد، واهدأ", en: "Take a breath, smile again, reset" }, { ar: "أنقل توتري للزبون اللي بعده", en: "Carry the stress to the next customer" } ],
          correct: 0, feedback: { ar: "نقود المشاعر… ما نتبعها.", en: "We lead emotions, we don't follow them." } },
        { prompt: { ar: "وقت الزحمة عند الكاشير؟", en: "Crunch time at the till?" },
          media: "retailR5_q5",
          options: [ { ar: "أغلّف وأنا أتكلم وأختم بشكر", en: "Bag while talking and finish with a thank-you" }, { ar: "أصير صامت وأستعجل", en: "Go silent and rush" } ],
          correct: 0, feedback: { ar: "نظيف وسريع وبطاقة، كل دفعة تأكّد القيمة.", en: "Clean, fast, energetic, every checkout confirms value." } },
        { prompt: { ar: "صار خطأ بسيط قدام الزبون؟", en: "A small slip-up in front of the customer?" },
          media: "retailR5_q6",
          options: [ { ar: "أعترف وأصلحه باللحظة", en: "Acknowledge and fix it on the spot" }, { ar: "أتجاهله وأكمل", en: "Ignore it and move on" } ],
          correct: 0, feedback: { ar: "نحوّل التوتر إلى نجاح بسرعة التصرّف.", en: "We turn stress into success by acting fast." } },
        { prompt: { ar: "عندك منتج البطل (hero)؟", en: "You have a hero product?" },
          media: "retailR5_q7",
          options: [ { ar: "أعرف عرضه بجملة وحدة واضحة وحماسية", en: "Know it in one clear, exciting line" }, { ar: "ما أذكره عشان أوفّر وقت", en: "Skip it to save time" } ],
          correct: 0, feedback: { ar: "الفخر بالمنتج يبيع بشكل طبيعي.", en: "Pride in the product sells naturally." } },
        { prompt: { ar: "زبونة محتارة بين عطرين والوقت ضيق؟", en: "A shopper torn between two fragrances, time is tight?" },
          media: "retailR5_q9",
          options: [ { ar: "أسألها تحب المنعش ولا الدافئ وأرشّح بسرعة", en: "Ask fresh or warm and recommend fast" }, { ar: "أخليها تقرر لحالها", en: "Leave her to decide alone" } ],
          correct: 0, feedback: { ar: "سؤال سريع واحد يوجّه القرار.", en: "One quick question guides the decision." } },
        { prompt: { ar: "تستر خلص قدام الزبونة؟", en: "A tester runs out in front of the shopper?" },
          media: "retailR5_q10",
          options: [ { ar: "أبدّله بسرعة وأكمل بابتسامة", en: "Swap it fast and carry on with a smile" }, { ar: "أتجاهل وأكمل", en: "Ignore it and move on" } ],
          correct: 0, feedback: { ar: "حل سريع يحافظ على التجربة.", en: "A quick fix protects the experience." } },
        { prompt: { ar: "ختام كل تفاعل بموسم الذروة؟", en: "Ending every peak-season interaction?" },
          media: "retailR5_q8",
          options: [ { ar: "فوز واحد وشكر واحد وابتسامة", en: "One win, one thank-you, one smile" }, { ar: "أنهي بسرعة بدون وداع", en: "End fast with no goodbye" } ],
          correct: 0, feedback: { ar: "الطاقة تنتشر، ودّعهم وهم مبتسمين.", en: "Energy spreads, send them off smiling." } }
      ]
    }

  ]
};

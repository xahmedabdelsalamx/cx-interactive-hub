/* ============================================================
   DIVISION: HOSPITALITY — Art of Guest Experience / فن تجربة الضيوف
   R1 & R2 & R5 authored from M1, M2 + Peak Service decks.
   R3 & R4 authored in the same KSA tone (decks pending).
   Arabic = KSA Saudi Arabic. Guest = ضيف / ضيوف (allowed for hospitality).
   Rounds: R1 convo · R2 match · R3 order · R4 scenario · R5 rush (bonus)
   ============================================================ */
window.DIVISION_hospitality = {
  id: "hospitality",
  world: "hospitality",
  logo: "assets/logos/art-of-guest-experience-color.png",
  title: { ar: "فن تجربة الضيوف", en: "The Art of Guest Experience" },
  rounds: [

    /* ---------- ROUND 1 · convo — Warm Welcome & Curated Conversations ---------- */
    {
      id: "r1",
      mechanic: "convo",
      title: { ar: "الترحيب الحار والمحادثات الهادفة", en: "The Warm Welcome & Curated Conversations" },
      intro: {
        ar: "أول 7 ثواني تحدد كل شي، والضيف يتذكر إحساسه مو طلبه. اقرأ كل موقف واختر أفضل رد يبني الترحيب والتواصل.",
        en: "The first 7 seconds shape everything, and guests remember how they felt. Read each moment and pick the best reply."
      },
      media: "hospR1_intro",
      questions: [
        {
          guest: { ar: "ضيف داخل المطعم لأول مرة وواقف يطالع حوله.", en: "A first-time guest walks in and looks around." },
          media: "hospR1_q1",
          replies: [
            { ar: "أهلين وسهلين! نوّرتنا، تفضّل أرتّب لك طاولة", en: "Welcome! So glad you're here, let me get you a table" },
            { ar: "ثانية بس، مشغول حالياً", en: "One sec, I'm busy right now" },
            { ar: "اطلب من عند الكاشير", en: "Order at the counter" }
          ],
          correct: 0,
          feedback: { ar: "أول لحظات تصنع كل شي، تواصل بصري وابتسامة وترحيب صادق.", en: "The first moments make everything, eye contact, a smile, and a genuine welcome." }
        },
        {
          guest: { ar: "ضيف من الزباين الدائمين دخل، وتعرف وجهه.", en: "A regular guest you recognize walks in." },
          media: "hospR1_q2",
          replies: [
            { ar: "السلام عليكم، اطلب عادي", en: "Hello, go ahead and order" },
            { ar: "هلا والله! حمدلله على السلامة، نفس طلبك المعتاد ولا تحب تجرّب جديد؟", en: "Great to see you again! Your usual today, or trying something new?" },
            { ar: "وش تبي؟", en: "What do you want?" }
          ],
          correct: 1,
          feedback: { ar: "التعرّف على الضيف الدائم يبني تواصل فوري، رحّب فيه واضف قيمة مع احترام اختياره.", en: "Recognizing a regular builds instant connection, welcome them and add value while respecting their usual." }
        },
        {
          guest: { ar: "ضيف هادي ومستعجل وواضح إنه يبي خدمة سريعة.", en: "A quiet, rushed guest who clearly wants quick service." },
          media: "hospR1_q3",
          replies: [
            { ar: "أعطيه مساحته وأخدمه بسرعة وكفاءة", en: "Give him space and serve fast and efficiently" },
            { ar: "أكثر عليه أسئلة وأقترح أصناف كثيرة", en: "Pile on questions and suggest lots of items" },
            { ar: "أتكلم معه بصوت عالي وحماس زايد", en: "Talk loudly with over-the-top energy" }
          ],
          correct: 0,
          feedback: { ar: "اقرأ إشارات الضيف وطابق طاقته، الهادي يبي خدمة سريعة ومساحة.", en: "Read the guest's cues and match their energy, a quiet guest wants speed and space." }
        },
        {
          guest: { ar: "ضيف يطالع المنيو محتار وما يدري وش يطلب.", en: "A guest scanning the menu, unsure what to order." },
          media: "hospR1_q4",
          replies: [
            { ar: "خذ وقتك، المنيو قدامك", en: "Take your time, the menu's right there" },
            { ar: "تحب أساعدك تختار؟ ودّك شي خفيف ولا شي يشبع أكثر؟", en: "Want help choosing? Something light, or more filling?" },
            { ar: "كل شي حلو، اختر أي شي", en: "Everything's good, just pick anything" }
          ],
          correct: 1,
          feedback: { ar: "مع الضيف المحتار (المستكشف)، ابنِ الراحة ووجّهه بسؤال بسيط عن مزاجه.", en: "With an unsure guest (the Explorer), build comfort and guide gently with a simple question." }
        },
        {
          guest: { ar: "ضيف ذكر إنه جاي يحتفل بمناسبة خاصة.", en: "A guest mentions they're here to celebrate a special occasion." },
          media: "hospR1_q5",
          replies: [
            { ar: "مبروك! خلّونا نخليها مناسبة تنذكر، أرشّح لكم أطباقنا المميزة وأشوف لكم أفضل طاولة", en: "Congrats! Let's make it memorable, I'll suggest our best dishes and find you a great table" },
            { ar: "حلو، اطلبوا اللي تبونه", en: "Nice, order whatever you like" },
            { ar: "ما عندنا شي خاص للمناسبات", en: "We don't have anything special for occasions" }
          ],
          correct: 0,
          feedback: { ar: "التقاط اللحظات الخاصة يحوّل الزيارة لذكرى، الاهتمام الصادق يصنع الفرق.", en: "Catching special moments turns a visit into a memory, genuine care makes the difference." }
        }
      ]
    },

    /* ---------- ROUND 2 · match — Culinary Storytelling & Thoughtful Pairings ---------- */
    {
      id: "r2",
      mechanic: "match",
      title: { ar: "سرد الأطباق والاقترانات المدروسة", en: "Culinary Storytelling & Thoughtful Pairings" },
      intro: {
        ar: "حوّل الطبق لقصة، واقترح اقترانات تكمّل النكهة. اختَر العنصر على اليسار، ثم وصّله بالطرف الصح على اليمين.",
        en: "Turn a dish into a story and suggest pairings that complete the flavour. Tap a left item, then its match on the right."
      },
      media: "hospR2_intro",
      questions: [
        {
          instruction: { ar: "وصّل كل خطوة من خطوات سرد الطبق بالمثال الصح.", en: "Match each storytelling step to its example." },
          media: "hospR2_q1",
          pairs: [
            { left: { ar: "ابدأ بالاسم", en: "Start with the name" }, right: { ar: "هذا طبق الدجاج المشوي على الفحم", en: "This is the charcoal-grilled chicken dish" } },
            { left: { ar: "استخدم وصف حسّي", en: "Use sensory words" }, right: { ar: "ذهبي ومقرمش من برّا وطري من جوّا", en: "Golden and crispy outside, tender inside" } },
            { left: { ar: "وضّح المميز", en: "Say what makes it special" }, right: { ar: "متبّل ليلة كاملة بخلطة توابلنا الخاصة", en: "Marinated overnight in our signature spice" } },
            { left: { ar: "ادعه يجرّب", en: "Invite them to try" }, right: { ar: "أكيد بتعجبك، أجهّزها لك؟", en: "You'll love it, shall I get it for you?" } }
          ],
          feedback: { ar: "من الاسم للوصف الحسّي للمميز للدعوة، تتحوّل الطبق لقصة تفتح الشهية.", en: "Name, sensory words, what's special, then invite, the dish becomes a story that opens appetite." }
        },
        {
          instruction: { ar: "وصّل كل طبق بالاقتران المناسب اللي يكمّله.", en: "Match each dish to the pairing that completes it." },
          media: "hospR2_q2",
          pairs: [
            { left: { ar: "برجر دسم ومدخّن", en: "Rich, smoky burger" }, right: { ar: "مشروب حمضيات منعش يوازن الدسم", en: "A citrus cooler to balance the richness" } },
            { left: { ar: "طبق حار", en: "A spicy dish" }, right: { ar: "مشروب بارد ومرطّب يهدّي الحرارة", en: "A cold, refreshing drink to calm the heat" } },
            { left: { ar: "سلطة خفيفة", en: "A light salad" }, right: { ar: "عصير طازج خفيف يكمّل الانتعاش", en: "A light fresh juice to complete the freshness" } },
            { left: { ar: "حلى غني بالشوكولاتة", en: "Rich chocolate dessert" }, right: { ar: "قهوة سادة تكسر الحلاوة", en: "A plain coffee to cut the sweetness" } }
          ],
          feedback: { ar: "شوف، طابق، اقترح، الاقتران المدروس يرفع النكهة ويزيد رضا الضيف.", en: "Look, match, suggest, a thoughtful pairing elevates flavour and guest satisfaction." }
        },
        {
          instruction: { ar: "وصّل العبارة اللي تحس فيها ضغط بنسختها اللي تحس توجيه (نفس الاقتراح).", en: "Match the pushy line to its helpful version (same suggestion)." },
          media: "hospR2_q3",
          pairs: [
            { left: { ar: "تبي بطاطس ومشروب معاه؟", en: "Want fries and a drink with that?" }, right: { ar: "البطاطس المقرمشة تكمّل البرجر، تحبها معاه؟", en: "Crispy fries complete the burger, want them with it?" } },
            { left: { ar: "لازم تجرّب الحلى", en: "You have to try the dessert" }, right: { ar: "لو حاب تختم بشي حلو، حلانا خفيف ويناسب بعد الوجبة", en: "For a sweet finish, our dessert is light after a meal" } },
            { left: { ar: "خذ الأكبر أحسن", en: "Get the large, it's better" }, right: { ar: "لو جوعان أكثر، الحجم الأكبر أوفر وأشبع لك", en: "If you're hungrier, the large is better value and more filling" } },
            { left: { ar: "ضيف مشروب غازي بس", en: "Just add a soda" }, right: { ar: "مشروب الليمون المنعش يوازن التتبيلة الحارة، يناسبك؟", en: "A zesty lemonade balances the spicy marinade, sound good?" } }
          ],
          feedback: { ar: "نفس التوصية تصير مفيدة لما تربطها بطلبه وتشرح السبب، التوجيه يبني الثقة مو الضغط.", en: "The same suggestion becomes helpful when you tie it to his order and explain why, guidance builds trust." }
        },
        {
          instruction: { ar: "وصّل حالة الضيف بأسلوب المحادثة المناسب.", en: "Match the guest's cue to the right conversation style." },
          media: "hospR2_q4",
          pairs: [
            { left: { ar: "ضيف جديد ومحتار", en: "New, unsure guest" }, right: { ar: "ساعده يختار ووجّهه بلطف (المستكشف)", en: "Help him choose, guide gently (Explorer)" } },
            { left: { ar: "ضيف واثق ويعرف طلبه", en: "Confident guest who knows the order" }, right: { ar: "احترم اختياره واضف قيمة (المؤكّد)", en: "Respect the choice, add value (Confirmer)" } },
            { left: { ar: "ضيف فضولي ومنفتح للجديد", en: "Curious guest, open to new" }, right: { ar: "فاجئه باقتراح مميز يحبّه (المُرتقي)", en: "Surprise him with a great suggestion (Elevator)" } },
            { left: { ar: "ضيف يحتفل بمناسبة", en: "Guest celebrating an occasion" }, right: { ar: "اهتم باللحظة ورشّح ما يخلّيها مميزة", en: "Honour the moment, suggest what makes it special" } }
          ],
          feedback: { ar: "اقرأ ضيفك واختر الأسلوب اللي يناسبه، التخصيص يصنع التواصل.", en: "Read your guest and choose the style that fits, personalization builds connection." }
        },
        {
          instruction: { ar: "وصّل الوصف العادي بنسخته اللي تحيي الطبق.", en: "Match the basic line to its dish-to-life version." },
          media: "hospR2_q5",
          pairs: [
            { left: { ar: "دجاج مشوي بصوص", en: "Grilled chicken with sauce" }, right: { ar: "دجاجنا المميز، متبّل ليلة كاملة، مدخّن وطري", en: "Our signature chicken, marinated overnight, smoky and tender" } },
            { left: { ar: "برجر لحم", en: "Beef burger" }, right: { ar: "برجر بخلطة أنغوس غنية، طري ومدخّن خفيف", en: "A rich Angus blend burger, juicy and lightly smoky" } },
            { left: { ar: "سلطة", en: "Salad" }, right: { ar: "سلطة منعشة بخضار طازجة وصوص ليموني خفيف", en: "A fresh salad with crisp veggies and a light lemon dressing" } },
            { left: { ar: "عصير", en: "Juice" }, right: { ar: "عصير طازج بارد يفتح النفس وينعش اللحظة", en: "A cold fresh juice that lifts and refreshes the moment" } }
          ],
          feedback: { ar: "الوصف الحسّي يخلّي الضيف يتخيّل الطبق ويشتهيه قبل ما يذوقه.", en: "Sensory words let the guest imagine the dish and crave it before tasting." }
        }
      ]
    },

    /* ---------- ROUND 3 · order — Memorable Moments & Seamless Farewell (authored) ---------- */
    {
      id: "r3",
      mechanic: "order",
      title: { ar: "اللحظات اللي تنذكر والوداع السلس", en: "Memorable Moments & Seamless Farewell" },
      intro: {
        ar: "الوداع آخر طعم يبقى عن العلامة، وكل وداع بداية لزيارة جاية. رتّب الخطوات بالترتيب الصح بالضغط عليها بالتسلسل.",
        en: "The farewell is the last taste of the brand, and every goodbye starts the next visit. Tap the steps in the right order."
      },
      media: "hospR3_intro",
      questions: [
        {
          instruction: { ar: "رتّب وداع سلس يخلّي الضيف يرجع.", en: "Order a seamless farewell that brings the guest back." },
          media: "hospR3_q1",
          steps: [
            { ar: "اسأل لو يحتاج أي شي قبل لا يمشي", en: "Ask if he needs anything before leaving" },
            { ar: "أكّد إن كل شي كان على ذوقه", en: "Confirm everything was to his liking" },
            { ar: "اشكره بصدق على زيارته", en: "Thank him sincerely for visiting" },
            { ar: "ادعه يرجع: نتشرّف بزيارتك مرة ثانية", en: "Invite him back: we'd love to see you again" },
            { ar: "ودّعه بابتسامة وتواصل بصري", en: "Send him off with a smile and eye contact" }
          ],
          feedback: { ar: "الوداع آخر طعم يبقى عن العلامة، اجعله دافئ وصادق ودعوة ترجع.", en: "The farewell is the last taste of the brand, make it warm, sincere, and an invite back." }
        },
        {
          instruction: { ar: "رتّب صناعة لحظة تنذكر أثناء الزيارة.", en: "Order how to create a memorable moment during the visit." },
          media: "hospR3_q2",
          steps: [
            { ar: "لاحظ تفصيلة عن الضيف أو مناسبته", en: "Notice a detail about the guest or occasion" },
            { ar: "خصّص اهتمامك حسب اللحظة", en: "Personalize your attention to the moment" },
            { ar: "قدّم لمسة بسيطة تفاجئه بإيجابية", en: "Offer a small touch that surprises positively" },
            { ar: "اربط اللحظة بتجربته: نبي زيارتك تكون مميزة", en: "Tie it to his experience: we want your visit to feel special" }
          ],
          feedback: { ar: "اللحظات الصغيرة المخصّصة هي اللي يتذكرها الضيف، مو التفاصيل العادية.", en: "Small personalized moments are what guests remember, not the ordinary details." }
        },
        {
          instruction: { ar: "رتّب إغلاق الطاولة بفخر.", en: "Order how to close the table with pride." },
          media: "hospR3_q3",
          steps: [
            { ar: "تأكد إن تجربتهم كانت كاملة ومريحة", en: "Make sure their experience was complete and comfortable" },
            { ar: "قدّم الفاتورة بهدوء وبدون استعجال", en: "Present the bill calmly, no rushing" },
            { ar: "اشكرهم بالاسم لو تعرفه", en: "Thank them by name if you know it" },
            { ar: "ودّعهم بدعوة صادقة للرجوع", en: "Send them off with a sincere invite back" }
          ],
          feedback: { ar: "أغلق كل طاولة بفخر، الشكر الصادق هو آخر انطباع يمشون فيه.", en: "Close every table with pride, sincere thanks is the last impression they leave with." }
        },
        {
          instruction: { ar: "رتّب وداع ضيف دائم بطريقة تقوّي ولاءه.", en: "Order a farewell for a regular that strengthens loyalty." },
          media: "hospR3_q4",
          steps: [
            { ar: "اشكره إنه دايم يختارنا", en: "Thank him for always choosing us" },
            { ar: "اذكر مزايا برنامج الولاء لو متوفر", en: "Mention loyalty-program benefits if available" },
            { ar: "أشعره إن وجوده فرق", en: "Make him feel his presence mattered" },
            { ar: "ودّعه: حمدلله على شرفتنا، ننتظرك المرة الجاية", en: "Farewell: thanks for honouring us, see you next time" }
          ],
          feedback: { ar: "تقدير الضيف الدائم يبني علاقة طويلة، الولاء يبدأ من الوداع.", en: "Valuing a regular builds a lasting bond, loyalty starts at the farewell." }
        },
        {
          instruction: { ar: "رتّب الانتقال من آخر لقمة لزيارة جاية.", en: "Order the move from the last bite to the next visit." },
          media: "hospR3_q5",
          steps: [
            { ar: "تابع الطاولة وتأكد إنهم مرتاحين", en: "Check on the table and ensure they're comfortable" },
            { ar: "اقترح ختام خفيف لو حابّين", en: "Suggest a light finish if they'd like" },
            { ar: "اشكرهم على الزيارة بصدق", en: "Thank them sincerely for the visit" },
            { ar: "ادعهم يرجعون بلمسة شخصية", en: "Invite them back with a personal touch" },
            { ar: "ودّعهم بطاقة إيجابية", en: "Send them off with positive energy" }
          ],
          feedback: { ar: "كل وداع هو بداية الزيارة الجاية، اختمها بدفء وصدق.", en: "Every farewell is the start of the next visit, close it warm and sincere." }
        }
      ]
    },

    /* ---------- ROUND 4 · scenario — Genuine Gratitude & Service Recovery (authored) ---------- */
    {
      id: "r4",
      mechanic: "scenario",
      title: { ar: "الامتنان الصادق واستعادة الخدمة", en: "Genuine Gratitude & Service Recovery" },
      intro: {
        ar: "الضيف يبي يُسمَع ويُحترَم ويشوف فعل. اقرأ الموقف واختر أفضل تصرّف يبني الامتنان أو يستعيد الثقة.",
        en: "Guests need to be heard, respected, and to see action. Read the situation and pick the best response."
      },
      media: "hospR4_intro",
      questions: [
        {
          scenario: { ar: "ضيف وصله طلب غير اللي طلبه.", en: "A guest receives the wrong order." },
          media: "hospR4_q1",
          options: [
            { ar: "أعتذر بصدق، أصلح الطلب بسرعة، وأتأكد إنه راضي", en: "Sincerely apologize, fix it fast, and make sure he's happy" },
            { ar: "أقول له هذا اللي طلبته", en: "Tell him that's what he ordered" },
            { ar: "أخليه ينتظر بدون توضيح", en: "Leave him waiting with no explanation" }
          ],
          correct: 0,
          feedback: { ar: "استعادة الخدمة: اعترف، صلّح بسرعة، وتابع، الضيف يبي يحس إنه مسموع.", en: "Service recovery: acknowledge, fix fast, follow up, the guest needs to feel heard." }
        },
        {
          scenario: { ar: "ضيف ينتظر أكله من وقت طويل وبدأ ينزعج.", en: "A guest has waited a long time for food and is getting upset." },
          media: "hospR4_q2",
          options: [
            { ar: "أعتذر عن التأخير، أطمئنه إن طلبه جاي، وأتابع معه", en: "Apologize for the wait, reassure him it's coming, and follow up" },
            { ar: "أتجاهل انزعاجه", en: "Ignore his frustration" },
            { ar: "أقول المطبخ مزحوم، مو شغلي", en: "Say the kitchen's busy, not my problem" }
          ],
          correct: 0,
          feedback: { ar: "نبرة دافئة أول وحل ثاني، الاعتذار الصادق والمتابعة يهدّون الموقف.", en: "Warm tone first, action second, a sincere apology and follow-up calm the moment." }
        },
        {
          scenario: { ar: "ضيف ما عجبه الطبق وقال طعمه مو زي ما توقّع.", en: "A guest didn't like the dish, says it's not what he expected." },
          media: "hospR4_q3",
          options: [
            { ar: "أعتذر، وأعرض أبدّله أو أرشّح بديل يناسب ذوقه", en: "Apologize and offer to replace it or suggest an alternative" },
            { ar: "أقول هذا طعمه الطبيعي", en: "Tell him that's just how it tastes" },
            { ar: "أقول ما فيه شي نقدر نسويه", en: "Say there's nothing we can do" }
          ],
          correct: 0,
          feedback: { ar: "حل واضح يحترم ذوق الضيف يحوّل الموقف لتجربة إيجابية.", en: "A clear fix that respects the guest's taste turns the moment positive." }
        },
        {
          scenario: { ar: "ضيف خلّص وجبته وكان كل شي تمام، وش أنسب ختام؟", en: "A guest finishes his meal, all went well, what's the best close?" },
          media: "hospR4_q4",
          options: [
            { ar: "أشكره بصدق على زيارته، أدعوه يرجع، وأذكر الولاء لو متوفر", en: "Thank him sincerely, invite him back, and mention loyalty if available" },
            { ar: "أعطيه الفاتورة وأطنّش", en: "Hand him the bill and look away" },
            { ar: "أخلّص بسرعة بدون شكر", en: "Wrap up fast with no thanks" }
          ],
          correct: 0,
          feedback: { ar: "الامتنان الصادق هو آخر لمسة يتذكرها الضيف، شكر + دعوة ترجع تبني الولاء.", en: "Genuine gratitude is the last touch a guest remembers, thanks + an invite build loyalty." }
        },
        {
          scenario: { ar: "ضيف نبّهك بهدوء إن الطاولة ما كانت نظيفة وقت وصولهم.", en: "A guest politely notes the table wasn't clean when they arrived." },
          media: "hospR4_q5",
          options: [
            { ar: "أعتذر، أنظّفها فوراً، وأشكره إنه نبّهنا", en: "Apologize, clean it immediately, and thank him for flagging it" },
            { ar: "أقول هذا مو من قسمي", en: "Say that's not my section" },
            { ar: "أتجاهل الملاحظة", en: "Ignore the comment" }
          ],
          correct: 0,
          feedback: { ar: "تقبّل الملاحظة بصدر رحب وحلّها بسرعة يبني الثقة.", en: "Taking feedback graciously and fixing it fast builds trust." }
        }
      ]
    },

    /* ---------- ROUND 5 · rush (BONUS · Peak Service) ---------- */
    {
      id: "r5",
      mechanic: "rush",
      bonus: true,
      seconds: 8,
      title: { ar: "خدمة الذروة: طاقة وانسجام وتميّز", en: "Peak Service: Energy, Team Flow & Guest Excellence" },
      intro: {
        ar: "جولة سريعة! قرارات خاطفة بإيقاع الذروة، كل ما كنت أسرع وأصح، طاقتك تزيد ⚡ الذروة ما تكسر الفرق القوي، تكشفه.",
        en: "Fast round! Quick calls at peak tempo, the faster and more accurate you are, the higher your energy ⚡ Peak doesn't break great teams, it reveals them."
      },
      media: "hospR5_intro",
      questions: [
        { prompt: { ar: "بداية شفت الذروة؟", en: "Start of a peak shift?" },
          media: "hospR5_q1",
          options: [ { ar: "أدخل متّزن وحاضر ومركّز على الضيف", en: "Arrive aligned, present, guest-focused" }, { ar: "أدخل متوتر ومشتت", en: "Show up tense and scattered" } ],
          correct: 0, feedback: { ar: "تركيزك يحدد طاقة الشفت كلها.", en: "Your focus sets the energy of the whole shift." } },
        { prompt: { ar: "ضيف داخل والمكان مزحوم؟", en: "A guest enters while it's packed?" },
          media: "hospR5_q2",
          options: [ { ar: "تواصل بصري وابتسامة وترحيب خلال 5 ثواني", en: "Eye contact, smile, welcome within 5 seconds" }, { ar: "أكمل شغلي بدون ما ألتفت", en: "Keep working without looking up" } ],
          correct: 0, feedback: { ar: "كل ترحيب يشكّل إحساس الضيف بالمكان.", en: "Every welcome shapes how a guest feels in your space." } },
        { prompt: { ar: "زميلك غارق بقسمه وانت فاضي؟", en: "A teammate is swamped and you're free?" },
          media: "hospR5_q3",
          options: [ { ar: "أدخل أساعد بدون ما ينتظر يطلب", en: "Step in before he has to ask" }, { ar: "أنتظر لين يطلب", en: "Wait until he asks" } ],
          correct: 0, feedback: { ar: "نتحرك كفريق واحد، الانسجام خلف الكواليس هدوء قدّام الضيف.", en: "Move as one team, harmony behind the counter is calm in front of it." } },
        { prompt: { ar: "صار ضغط وتوتر بينك وبين طاولة؟", en: "Pressure builds between you and a table?" },
          media: "hospR5_q4",
          options: [ { ar: "نفس، ابتسامة، وإعادة ضبط بسرعة", en: "One breath, a smile, a quick reset" }, { ar: "أنقل توتري للطاولة اللي بعدها", en: "Carry the stress to the next table" } ],
          correct: 0, feedback: { ar: "نفس واحد وابتسامة وإعادة ضبط، الضيف يحس طاقتك قبل أكله.", en: "One breath, one smile, one reset, guests feel your energy before they taste the food." } },
        { prompt: { ar: "ضيف يسأل عن توصية اليوم؟", en: "A guest asks for today's recommendation?" },
          media: "hospR5_q5",
          options: [ { ar: "أعرف طبق اليوم البطل وأحكي قصته بثقة", en: "Know today's hero dish and tell its story with confidence" }, { ar: "أقول ما أدري", en: "Say I don't know" } ],
          correct: 0, feedback: { ar: "ضيوف الذروة يثقون بالتوجيه الواثق.", en: "Peak-time guests trust confident guidance." } },
        { prompt: { ar: "قسمك وقت الزحمة؟", en: "Your section during the rush?" },
          media: "hospR5_q6",
          options: [ { ar: "أمسح القسم وألاحظ الاحتياج قبل ما يطلبونه", en: "Scan the section and spot needs before they're raised" }, { ar: "أنتظر لين يرفعون يدهم", en: "Wait until they raise a hand" } ],
          correct: 0, feedback: { ar: "التوقّع دايم أقوى من رد الفعل.", en: "Anticipation always beats reaction." } },
        { prompt: { ar: "صار خطأ بسيط بالخدمة؟", en: "A small service slip happens?" },
          media: "hospR5_q7",
          options: [ { ar: "أعترف وأصلحه باللحظة بنبرة دافئة", en: "Acknowledge and fix it on the spot, warm tone" }, { ar: "أتجاهله", en: "Ignore it" } ],
          correct: 0, feedback: { ar: "نبرة دافئة أول، تصرف ثاني، بدون دراما.", en: "Warm tone first, action second, no drama." } },
        { prompt: { ar: "ختام كل طاولة؟", en: "Closing every table?" },
          media: "hospR5_q8",
          options: [ { ar: "شكر صادق ودعوة ترجع", en: "A genuine thank-you and an invite back" }, { ar: "أرفع الطاولة بصمت", en: "Clear the table in silence" } ],
          correct: 0, feedback: { ar: "كل وداع هو بداية الزيارة الجاية.", en: "Every farewell is the start of their next visit." } }
      ]
    }

  ]
};

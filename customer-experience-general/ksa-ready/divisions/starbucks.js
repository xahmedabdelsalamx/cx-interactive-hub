/* ============================================================
   DIVISION: STARBUCKS — Art of Connection / فن التواصل
   GEN Z IMMERSIVE EDITION. Authored from the Starbucks condensed master
   guide (M1 Warm Welcome & Power of Connection, M2 Selling Starbucks
   Products, M3 Sampling/Hand-Off/Speed of Service, M4 Loyalty & Service
   Recovery, M5 Handling Angry Customers, M6 Types of Customers) plus the
   Peak Service huddle.

   Customers are described by role and behaviour (regular, first-timer,
   in a rush, indecisive, family), never by personal name.
   Arabic text contains NO Latin characters: names are transliterated.
   Starbucks team members are "partners" / شركاء.

   Arabic = KSA Saudi Arabic. Terminology rule: زبون / زبائن only.
   Western digits. No em dash.
   Rounds: R1 swipe · R2 match · R3 speed · R4 scenario · R5 rush (bonus)
   ============================================================ */
window.DIVISION_starbucks = {
  id: "starbucks",
  world: "starbucks",
  logo: "assets/logos/art-of-connection-color.png",
  title: { ar: "فن التواصل", en: "The Art of Connection" },
  rounds: [

    /* ---------- ROUND 1 · swipe — Connection Radar ---------- */
    {
      id: "r1",
      mechanic: "swipe",
      title: { ar: "رادار التواصل", en: "Connection Radar" },
      intro: {
        ar: "كل كوب يبدأ بتواصل.\nالزبون بينسى وش طلب، بس ما بينسى كيف حسّيته وهو واقف قدامك.\nمهمتك: اقرأ اللحظة. اسحب يمين لو فيها فرصة تواصل، ويسار لو الأذكى تعطيه مساحة.",
        en: "Every cup starts with a connection.\nThey'll forget the order. They'll never forget how you made them feel at the counter.\nYour mission: read the moment. Swipe right if it's a chance to connect, left if space is the smarter move."
      },
      media: "sbuxR1_intro",
      questions: [
        {
          prompt: { ar: "الساعة 7 صباحاً. زبون داخل، وتعرف وجهه، يجي كل يوم تقريباً بنفس الوقت.", en: "7am. A customer walks in. You know the face, he's here nearly every day at this time." },
          media: "sbuxR1_q1",
          isOpportunity: true,
          feedback: { ar: "🔥 عين صقر! تذكّر الزبون الدايم هو أقوى لحظة تواصل عندك. «نفس طلبك المعتاد؟» تخلّيه يحس إنه بمكانه، مو بمحل.", en: "🔥 Sharp eye! Recognising a regular is your strongest connection moment. \"Your usual?\" makes him feel like he belongs here, not like he's in a shop." }
        },
        {
          prompt: { ar: "زبون واقف يطالع بورد المشروبات من دقيقة، عيونه تروح وتجي، وواضح إنها أول زيارة له.", en: "A customer stares at the menu board for a minute, eyes darting, clearly a first-timer." },
          media: "sbuxR1_q2",
          isOpportunity: true,
          feedback: { ar: "💚 صح! أول زيارة تحدد إذا بيرجع ولا لا. سؤال بسيط يشيل رهبة المنيو: «تحب شي حار ولا بارد؟» وبديت توجّهه.", en: "💚 Yes! The first visit decides if there's a second. One simple question kills the menu anxiety: \"hot or cold?\" and now you're guiding." }
        },
        {
          prompt: { ar: "زبون طلب وخلص، ومشى للطاولة وفتح لابتوبه وحط سماعاته.", en: "A customer has ordered, moved to a table, opened a laptop and put headphones on." },
          media: "sbuxR1_q3",
          isOpportunity: false,
          feedback: { ar: "⭐ قراءة ممتازة! هو اختار المكان عشان يشتغل، مو عشان يتكلم. الضيافة هنا اسمها مساحة وهدوء.", en: "⭐ Great read! He chose this place to work, not to talk. Here, hospitality is called space and quiet." }
        },
        {
          prompt: { ar: "زبون يسأل: «الموسمي الجديد طعمه كيف؟» وهو يطالع الكوب اللي بالإعلان.", en: "A customer asks: \"What does the new seasonal one taste like?\" while looking at the promo cup." },
          media: "sbuxR1_q4",
          isOpportunity: true,
          feedback: { ar: "🎯 باب مفتوح على مصراعيه! السؤال عن الطعم يعني «أقنعني». احكِ قصة المشروب بحماس صادق، أو اعرض عليه عيّنة.", en: "🎯 A wide open door! Asking about taste means \"convince me\". Tell the drink's story with real enthusiasm, or offer a sample." }
        },
        {
          prompt: { ar: "زبون استلم طلبه من رف الاستلام، وهو ماشي للباب ولابس سماعاته.", en: "A customer collects their mobile order from the pickup shelf, already walking to the door with headphones on." },
          media: "sbuxR1_q5",
          isOpportunity: false,
          feedback: { ar: "✅ فهمت الزبون! أخذ اللي جاء له وهو طالع. إيماءة ترحيب تكفي. لو وقّفته الحين تكون خدمة لك مو له.", en: "✅ You get it! He has what he came for and is already leaving. A warm nod is enough. Stopping him now would be service for you, not for him." }
        }
      ]
    },

    /* ---------- ROUND 2 · match — The Recommendation Engine ---------- */
    {
      id: "r2",
      mechanic: "match",
      title: { ar: "محرّك التوصيات", en: "The Recommendation Engine" },
      intro: {
        ar: "البيع يبدأ بالفهم، مو بالعرض.\nكل مشروب له قصة، وكل زبون له لحظة. مهمتك توصل بينهم.\nالتوصية الصح تضيف قيمة، ما تضيف ضغط.",
        en: "Selling starts with understanding, not pitching.\nEvery drink has a story and every customer has a moment. Your job is to connect them.\nThe right recommendation adds value, not pressure."
      },
      media: "sbuxR2_intro",
      questions: [
        {
          instruction: { ar: "وصّل احتياج الزبون بالتوصية اللي تناسبه.", en: "Match the customer's need to the recommendation that fits." },
          media: "sbuxR2_q1",
          pairs: [
            { left: { ar: "يبي شي ينبّهه بسرعة", en: "Wants something to wake him up fast" }, right: { ar: "إسبريسو قوي وسريع", en: "A strong, quick espresso" } },
            { left: { ar: "يبي شي خفيف وبارد بالصيف", en: "Wants something light and cold in summer" }, right: { ar: "مشروب مثلّج منعش", en: "An iced, refreshing option" } },
            { left: { ar: "يبي طعم القهوة بالمساء بدون كافيين", en: "Wants coffee flavour in the evening without the caffeine" }, right: { ar: "خيار بدون كافيين", en: "A decaf option" } },
            { left: { ar: "يبي شي حلو يشبه الحلى", en: "Wants something sweet, dessert-like" }, right: { ar: "فرابتشينو بالكريمة", en: "A frappuccino with cream" } }
          ],
          feedback: { ar: "🔥 اسمع قبل ما ترشّح! التوصية مو تخمين، هي جواب على شي قاله الزبون. هذا الفرق بين شريك ومسجّل طلبات.", en: "🔥 Listen before you recommend! A recommendation isn't a guess, it's an answer to something they told you. That's the gap between a partner and an order-taker." }
        },
        {
          instruction: { ar: "وصّل كل مشروب بالاقتران اللي يكمّله بسبب منطقي.", en: "Match each drink to the pairing that completes it for a reason." },
          media: "sbuxR2_q2",
          pairs: [
            { left: { ar: "قهوة الصباح قبل طريق طويل", en: "Morning coffee before a long commute" }, right: { ar: "كرواسون يكمّل الفطور", en: "A croissant to complete breakfast" } },
            { left: { ar: "مشروب حلو بعد الغدا", en: "A sweet drink after lunch" }, right: { ar: "شي مالح خفيف يوازن الحلاوة", en: "Something light and savoury to balance it" } },
            { left: { ar: "شاي بالمساء بجلسة هادية", en: "Evening tea during a relaxed catch-up" }, right: { ar: "كوكيز خفيفة تناسب الجلسة", en: "A light cookie for the sit-down" } },
            { left: { ar: "إسبريسو لواحد طالع على طول", en: "Espresso for someone leaving immediately" }, right: { ar: "قطعة مغلّفة تاخذها وأنت طالع", en: "A wrapped bite to take on the way out" } }
          ],
          feedback: { ar: "💚 كل اقتران له سبب! لما تشرح «ليش»، تتحوّل التوصية من بيع إلى خدمة. بدون سبب؟ تصير ضغط.", en: "💚 Every pairing has a reason! Explain the why and the suggestion turns from selling into service. No reason? It's pressure." }
        },
        {
          instruction: { ar: "وصّل كل خطوة من خطوات سرد المشروب بالجملة الصح.", en: "Match each drink-storytelling step to the right line." },
          media: "sbuxR2_q3",
          pairs: [
            { left: { ar: "ابدأ بالاسم", en: "Start with the name" }, right: { ar: "«هذا مشروبنا الموسمي الجديد»", en: "\"This is our new seasonal drink\"" } },
            { left: { ar: "استخدم وصف حسّي", en: "Use sensory words" }, right: { ar: "«كريمي وناعم مع لمسة قرفة دافئة»", en: "\"Creamy and smooth with a warm cinnamon note\"" } },
            { left: { ar: "وضّح المميز", en: "Say what makes it special" }, right: { ar: "«له نكهة موسمية مميزة مع توبنق خاص»", en: "\"Finished with a distinctive seasonal flavour and topping\"" } },
            { left: { ar: "ادعه يجرّب", en: "Invite them to try" }, right: { ar: "«تحب تجرّب عيّنة صغيرة؟»", en: "\"Would you like a small sample?\"" } }
          ],
          feedback: { ar: "⭐ اسم، إحساس، سر، دعوة. القصة تخلّي المشروب يستاهل التجربة قبل ما يذوقه.", en: "⭐ Name, feeling, secret, invite. The story makes the drink worth trying before they've tasted it." }
        },
        {
          instruction: { ar: "وصّل نوع الزبون بالأسلوب اللي يناسبه.", en: "Match the customer type to the approach that fits." },
          media: "sbuxR2_q4",
          pairs: [
            { left: { ar: "زبون مستعجل", en: "In a rush" }, right: { ar: "سرعة ودقة وابتسامة، بدون كلام زايد", en: "Speed, accuracy, a smile, no extra talk" } },
            { left: { ar: "زبون أول زيارة", en: "First-time visitor" }, right: { ar: "توجيه بسيط وشرح بدون استعجال", en: "Simple guidance, explained without rushing" } },
            { left: { ar: "زبون دايم", en: "A regular" }, right: { ar: "تعرّف عليه واذكر طلبه المعتاد", en: "Recognise them and mention their usual" } },
            { left: { ar: "عائلة معهم أطفال", en: "A family with kids" }, right: { ar: "صبر وخيارات تناسب الصغار", en: "Patience and options that suit the little ones" } }
          ],
          feedback: { ar: "🎯 ما فيه نص واحد يناسب الكل! واحد يبي سرعة، وواحد يبي توجيه، والعائلة تبي صبر. الفهم هو التخصيص.", en: "🎯 One script doesn't fit everyone! One needs speed, one needs guidance, a family needs patience. Understanding is personalization." }
        },
        {
          instruction: { ar: "وصّل رغبة الزبون بخيار التخصيص المناسب.", en: "Match the customer's wish to the right customisation." },
          media: "sbuxR2_q5",
          pairs: [
            { left: { ar: "«أبيه أقل حلاوة»", en: "\"I want it less sweet\"" }, right: { ar: "نقلّل عدد ضخّات السيرب", en: "Fewer pumps of syrup" } },
            { left: { ar: "«ما أشرب حليب البقر»", en: "\"I don't drink dairy\"" }, right: { ar: "نبدّله بحليب نباتي", en: "Swap to a plant-based milk" } },
            { left: { ar: "«أبيه أقوى شوي»", en: "\"I want it a bit stronger\"" }, right: { ar: "نضيف جرعة إسبريسو", en: "Add an espresso shot" } },
            { left: { ar: "«أبيه دافي مو حار»", en: "\"I want it warm, not hot\"" }, right: { ar: "نضبط درجة الحرارة له", en: "Adjust the temperature for them" } }
          ],
          feedback: { ar: "🔥 التخصيص هو سر ستاربكس! «نقدر نضبطه زي ما تحب» تحوّل مشروب عادي لمشروبه هو. هذي اللحظة اللي ترجّعه.", en: "🔥 Customisation is the Starbucks superpower! \"We can make it exactly how you like it\" turns a drink into THEIR drink. That's what brings them back." }
        }
      ]
    },

    /* ---------- ROUND 3 · speed — Sampling, Hand-Off & Speed ---------- */
    {
      id: "r3",
      mechanic: "speed",
      title: { ar: "الحقيقة السريعة: العيّنة والتسليم", en: "Rapid Truth: Sampling & Hand-Off" },
      intro: {
        ar: "الزبون يقدّر السرعة، بس ما يحب يحس إنه مستعجَل.\nقرارات سريعة: صح ولا خطأ؟\nكل جملة هنا تختبر فهمك للعيّنات والتسليم وسرعة الخدمة.",
        en: "Customers value speed, but they never want to feel rushed.\nSnap calls: true or false?\nEvery line here tests what you know about sampling, hand-off and speed of service."
      },
      media: "sbuxR3_intro",
      questions: [
        {
          statement: { ar: "الهدف من العيّنة إنك تقنع الزبون يشتري المشروب.", en: "The point of a sample is to convince the customer to buy the drink." },
          media: "sbuxR3_q1",
          isTrue: false,
          feedback: { ar: "الهدف إثارة الفضول، مو الإقناع! العيّنة دعوة يكتشف شي جديد. لو صارت ضغط، ينفر الزبون ويحس إنك تبيع عليه.", en: "The goal is curiosity, not persuasion! A sample is an invitation to discover. Turn it into pressure and they feel sold to." }
        },
        {
          statement: { ar: "وقت الذروة، ممكن نتخطى تأكيد المشروب إذا كان الملصق واضح.", en: "During peak, confirming the drink can be skipped when the label is clearly visible." },
          media: "sbuxR3_q2",
          isTrue: false,
          feedback: { ar: "الملصق يبيّن اللي تحضّر، مو اللي توقعه الزبون. التأكيد بصوت هو آخر فرصة تمسك طلب غلط، وتكلفته ثانيتين.", en: "The label shows what was made, not what they expected. Confirming out loud is the last chance to catch a wrong order, and it costs two seconds." }
        },
        {
          statement: { ar: "إبقاء الزبون على علم وقت الزحمة يخلّي الانتظار يحس أقصر.", en: "Keeping customers informed during a rush makes the wait feel shorter." },
          media: "sbuxR3_q3",
          isTrue: true,
          feedback: { ar: "صح! عدم الوضوح هو اللي يطوّل الانتظار. كلمة وحدة توضّح الوضع تخفف الانزعاج كثير.", en: "True! Uncertainty is what stretches a wait. One clear word about what is happening often takes the frustration out of it." }
        },
        {
          statement: { ar: "العيّنة تعتبر ناجحة فقط إذا اشترى الزبون المشروب.", en: "A sample is successful only when the customer buys the featured drink." },
          media: "sbuxR3_q4",
          isTrue: false,
          feedback: { ar: "العيّنة تنجح لما تثير الفضول وتصنع لحظة اكتشاف حلوة. البيع ممكن يجي بعدها، بس الضغط مو الهدف.", en: "A sample succeeds when it creates curiosity and a positive discovery moment. A sale may follow, but pressure is not the goal." }
        },
        {
          statement: { ar: "الزبون اللي لابس سماعاته يستاهل تسليم دقيق باسمه، حتى لو ما نبي ندردش معه.", en: "A customer wearing headphones still deserves an accurate hand-off with their name." },
          media: "sbuxR3_q5",
          isTrue: true,
          feedback: { ar: "صح! السماعات تعني «ما أبي دردشة»، مو «لا تخدمني». سلّم الطلب باسمه وتأكد إنه صح. اقرأ الإشارة، بس لا تختفي.", en: "True! Headphones mean do not chat, not do not serve. You still hand off by name and check the order is right. Read the signal, do not disappear." }
        }
      ]
    },

    /* ---------- ROUND 4 · scenario — Make It Right ---------- */
    {
      id: "r4",
      mechanic: "scenario",
      title: { ar: "خلّها صح", en: "Make It Right" },
      intro: {
        ar: "الزبون الوفي ما ينصنع من كوب مثالي واحد، ينصنع من اهتمام متكرر.\nولما يصير خطأ؟ ردة فعلك أهم من الخطأ نفسه.\nمهمتك: اقرأ الموقف واختر الحركة اللي تسترجع الثقة.",
        en: "A loyal customer isn't made by one perfect cup. They're made by consistent care.\nAnd when something goes wrong? Your response matters more than the mistake.\nYour mission: read the moment and pick the move that wins trust back."
      },
      media: "sbuxR4_intro",
      questions: [
        {
          scenario: { ar: "زبون رجع للكاونتر: «مشروبي طعمه مو زي كل مرة، حاسه خفيف».", en: "A customer returns to the counter: \"My drink doesn't taste like it usually does, it's weak.\"" },
          media: "sbuxR4_q1",
          options: [
            { ar: "أوضّح له إن التحضير موحّد وما تغيّر شي", en: "Explain that the recipe is standard and nothing changed" },
            { ar: "أعتذر بصدق، أعيد تحضيره فوراً، وأشكره إنه قال لنا", en: "Apologize sincerely, remake it right away, and thank him for telling us" },
            { ar: "أعطيه قسيمة مجانية للزيارة الجاية", en: "Offer him a free voucher for next time" }
          ],
          correct: 1,
          feedback: { ar: "💚 اعتذر، أعد التحضير، اشكره! الشرح يقول له «ذوقك غلط»، والقسيمة تأجّل المشكلة. الحل الحين هو اللي يبني الثقة.", en: "💚 Apologize, remake, thank! Explaining says \"your taste is wrong\", and a voucher postpones the problem. Fixing it now is what builds trust." }
        },
        {
          scenario: { ar: "زبون واقف عند ركن الاستلام وطلبه بالتطبيق متأخر، وبدأ ينزعج بشكل واضح.", en: "A customer waits at the pickup area, his mobile order is late, and he's visibly getting angry." },
          media: "sbuxR4_q2",
          options: [
            { ar: "أعتذر، أخبره بوضعه، وأطمّنه إني متابع طلبه", en: "Acknowledge him, tell him where his order is, and reassure him I'm on it" },
            { ar: "أقول له إن الطلبات كثيرة اليوم ولازم ينتظر دوره", en: "Tell him orders are heavy today and he'll have to wait his turn" },
            { ar: "أتجاهله لين يخلص طلبه عشان ما أعطّل الباقي", en: "Leave him until his order is done so I don't slow the others" }
          ],
          correct: 0,
          feedback: { ar: "🔥 المعلومة تهدّي أكثر من السرعة! عدم الوضوح يخلّي الانتظار يحس أطول، وتحديث بسيط يقلّل الانزعاج.", en: "🔥 Information calms faster than speed! Uncertainty makes waiting feel longer, and a clear update reduces the frustration." }
        },
        {
          scenario: { ar: "زبون منزعج ورافع صوته شوي: «كل مرة تنسون التعديل اللي أطلبه!»", en: "An upset customer, voice slightly raised: \"You forget my customisation every single time!\"" },
          media: "sbuxR4_q3",
          options: [
            { ar: "أدافع عن الفريق وأوضّح إن الضغط اليوم عالي", en: "Defend the team and explain today's pressure" },
            { ar: "أعتذر بسرعة وأعيد تحضيره بدون ما أسمعه لين يخلص", en: "Apologize fast and remake it without letting him finish" },
            { ar: "أهدأ، أسمعه لين يخلص، أتعاطف معه، وأصلحه له", en: "Stay calm, let him finish, empathize, then make it right" }
          ],
          correct: 2,
          feedback: { ar: "⭐ اسمع أول! الزبون الغاضب يبي يحس إنه مسموع قبل ما يبي حل. «أعتذر إن مشروبك ما كان زي ما تتوقع» تفتح الباب، والدفاع يقفله.", en: "⭐ Listen first! An angry customer needs to feel heard before they need a fix. \"I'm sorry your drink wasn't what you expected\" opens the door. Defending shuts it." }
        },
        {
          scenario: { ar: "زبون دايم يجي كل صباح، ووصل للكاشير عشان يطلب طلبه المعتاد.", en: "A regular who comes every morning reaches the till for his usual order." },
          media: "sbuxR4_q4",
          options: [
            { ar: "أسلّمه مشروبه بابتسامة وأقول «تفضل»", en: "Hand him the drink with a smile and say \"here you go\"" },
            { ar: "أتعرّف عليه، وأأكّد طلبه المعتاد، وأطبّق نقاطه قبل الدفع، وأشكره", en: "Recognise him, confirm his usual, apply his rewards before payment, and thank him" },
            { ar: "أخلّص بسرعة عشان الطابور وراه", en: "Move fast because of the queue behind him" }
          ],
          correct: 1,
          feedback: { ar: "🎯 الابتسامة حلوة بس ناقصة! النقاط قبل الدفع مو بعده. وكلمة «دايم تشرّفنا» تسوى أكثر من أي خصم.", en: "🎯 The smile is nice but incomplete! Points before payment, not after. And \"you always honour us\" is worth more than any discount." }
        },
        {
          scenario: { ar: "زبون أول زيارة، طلب مشروب وما عجبه أبداً، وقال بخجل: «ما توقعته كذا».", en: "A first-time visitor didn't enjoy his drink at all and says shyly: \"I didn't expect it to be like this.\"" },
          media: "sbuxR4_q5",
          options: [
            { ar: "أعتذر وأقول له الأذواق تختلف وأتمنى يجرّب غيره مرة ثانية", en: "Apologize, say tastes differ, and hope he tries something else next time" },
            { ar: "أشرح له طبيعة المشروب عشان يفهم ليش طعمه كذا", en: "Explain the drink's profile so he understands why it tastes that way" },
            { ar: "أعتذر، أسأله وش كان يتوقع، وأحضّر له بديل يناسب ذوقه", en: "Apologize, ask what he expected, and make him an alternative that suits him" }
          ],
          correct: 2,
          feedback: { ar: "🔥 يمكن حوّلت زيارة أولى مخيبة إلى ثقة! الزيارة الأولى السيئة ممكن تمنع الثانية، فالتصحيح مهم. سؤال «وش كنت تتوقع؟» + بديل هو اللي ينقذها.", en: "🔥 You may have turned a disappointing first visit into trust! A poor first visit can prevent a second one, so the recovery matters. \"What were you expecting?\" plus an alternative is what rescues it." }
        }
      ]
    },

    /* ---------- ROUND 5 · rush (BONUS · Peak Service) ---------- */
    {
      id: "r5",
      mechanic: "rush",
      bonus: true,
      seconds: 8,
      title: { ar: "ذروة الخدمة", en: "Peak Service Rush" },
      intro: {
        ar: "8 صباحاً. الطابور لبرّا. طلبات التطبيق تنزل ورا بعض. الماكينة ما توقف.\nقرارات خاطفة، 8 ثواني لكل وحدة ⚡\nحرفية سريعة. تواصل حقيقي. خدمة تنذكر.",
        en: "8am. The line is out the door. Mobile orders keep dropping. The machine never stops.\nSnap calls, 8 seconds each ⚡\nFast craft. Real connection. Memorable service."
      },
      media: "sbuxR5_intro",
      questions: [
        { prompt: { ar: "بداية شفت الذروة؟", en: "Your peak shift starts?" },
          media: "sbuxR5_q1",
          options: [ { ar: "أدخل حاضر ومركّز على الزبون", en: "Arrive present and customer-focused" }, { ar: "أوصل بالوقت وأبدأ مهامي قبل ما أسلّم على الفريق", en: "Arrive on time and start tasks before greeting the team" } ],
          correct: 0, feedback: { ar: "⚡ طاقتك تنتقل لكل كوب تحضّره.", en: "⚡ Your energy transfers into every cup you make." } },
        { prompt: { ar: "زبون داخل والطابور طويل؟", en: "A customer walks in and the line is long?" },
          media: "sbuxR5_q2",
          options: [ { ar: "أخلّص المشروب اللي بيدي أول، وبعدين أرحّب فيه", en: "Finish the drink in my hand first, then greet them" }, { ar: "تواصل بصري وابتسامة خلال 5 ثواني", en: "Eye contact and a smile within 5 seconds" } ],
          correct: 1, feedback: { ar: "💚 نظرة وابتسامة تخلّي الانتظار مقبول.", en: "💚 A look and a smile make the wait acceptable." } },
        { prompt: { ar: "زميلك غارق بالطلبات وأنت فاضي ثانية؟", en: "A partner is buried in orders and you're free for a second?" },
          media: "sbuxR5_q3",
          options: [ { ar: "أدخل أساعد قبل لا يطلب", en: "Step in before they ask" }, { ar: "أساعد بعد ما يخف طابوري", en: "Help once my own queue clears" } ],
          correct: 0, feedback: { ar: "🔥 السرعة الحقيقية اسمها فريق.", en: "🔥 Real speed is spelled t-e-a-m." } },
        { prompt: { ar: "التسليم وقت الزحمة؟", en: "Hand-off during the rush?" },
          media: "sbuxR5_q4",
          options: [ { ar: "أنادي الطلب بوضوح وأحطه على الرف", en: "Call the order clearly and set it on the shelf" }, { ar: "الاسم وتواصل بصري وابتسامة", en: "Their name, eye contact, a smile" } ],
          correct: 1, feedback: { ar: "⭐ الاسم يحوّل الكوب للحظة.", en: "⭐ The name turns a cup into a moment." } },
        { prompt: { ar: "الضغط طلع براسك بين زبونين؟", en: "Stress spikes between two customers?" },
          media: "sbuxR5_q5",
          options: [ { ar: "نفس، ابتسامة، وإعادة ضبط", en: "One breath, a smile, a reset" }, { ar: "أكمّل وأرتاح لما تخف الزحمة", en: "Keep going and reset when the rush ends" } ],
          correct: 0, feedback: { ar: "⚡ نقود المشاعر، ما نتبعها.", en: "⚡ We lead emotions, we don't follow them." } },
        { prompt: { ar: "صار خطأ بمشروب قدام الزبون؟", en: "You make a drink mistake in front of the customer?" },
          media: "sbuxR5_q6",
          options: [ { ar: "أعيد تحضيره بدون ما أقول شي", en: "Remake it without saying anything" }, { ar: "أعترف وأعيد تحضيره فوراً", en: "Own it and remake it right away" } ],
          correct: 1, feedback: { ar: "🔥 الاعتراف السريع يقوّي الثقة.", en: "🔥 A fast admission strengthens trust." } },
        { prompt: { ar: "زبون يسأل عن الموسمي الجديد؟", en: "A customer asks about the new seasonal drink?" },
          media: "sbuxR5_q7",
          options: [ { ar: "أحكي قصته بجملة وحدة حماسية", en: "Tell its story in one exciting line" }, { ar: "أقول إنه مطلوب وأكتفي بكذا", en: "Say it is popular and leave it at that" } ],
          correct: 0, feedback: { ar: "💚 الحماس الصادق يبيع بشكل طبيعي.", en: "💚 Real enthusiasm sells by itself." } },
        { prompt: { ar: "ختام كل تفاعل بالذروة؟", en: "Ending every peak interaction?" },
          media: "sbuxR5_q8",
          options: [ { ar: "أشكرهم باختصار وأبدأ الطلب اللي بعده", en: "Thank them briefly and start the next order" }, { ar: "شكر صادق ودعوة يرجع", en: "A sincere thank-you and an invite back" } ],
          correct: 1, feedback: { ar: "⭐ كل كوب فرصة إنه يرجع بكرة.", en: "⭐ Every cup is a chance they come back tomorrow." } }
      ]
    }

  ]
};

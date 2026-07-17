/* ============================================================
   DIVISION: HOSPITALITY — Art of Guest Experience / فن تجربة الضيوف
   GEN Z IMMERSIVE EDITION. Every question is a micro-story set in a real
   Alshaya restaurant. Grounded in the Hospitality condensed master guide
   (M1 Warm Welcome, M2 Culinary Storytelling, M3 Memorable Moments &
   Farewell, M4 Genuine Gratitude & Service Recovery + Restaurant Promise).

   Guests are described by role and behaviour (first-time guest, regular,
   birthday guest, family, in a rush, indecisive), never by personal name,
   so it is always clear who is the guest and who is the team member.
   Arabic text contains NO Latin characters: brand names are transliterated.

   Arabic = KSA Saudi Arabic. Guest = ضيف / ضيوف. Western digits. No em dash.
   Rounds: R1 convo · R2 match · R3 order · R4 scenario · R5 rush (bonus)
   ============================================================ */
window.DIVISION_hospitality = {
  id: "hospitality",
  world: "hospitality",
  logo: "assets/logos/art-of-guest-experience-color.png",
  title: { ar: "فن تجربة الضيوف", en: "The Art of Guest Experience" },
  rounds: [

    /* ---------- ROUND 1 · convo — Welcome Mode ---------- */
    {
      id: "r1",
      mechanic: "convo",
      title: { ar: "وضع الترحيب: اللحظة الأولى", en: "Welcome Mode: The First Moment" },
      intro: {
        ar: "تجربة الضيف تبدأ قبل أول لقمة بوقت طويل.\nالضيف بينسى وش طلب، بس ما بينسى كيف حسّيته.\nمهمتك: اقرأ الضيف، واختر الرد اللي يفتح الباب. مو نص محفوظ، محادثة حقيقية.",
        en: "The guest experience starts long before the first bite.\nThey'll forget what they ordered. They'll never forget how you made them feel.\nYour mission: read the guest and pick the reply that opens the door. Not a script. A real conversation."
      },
      media: "hospR1_intro",
      questions: [
        {
          guest: { ar: "ذا تشيزكيك فاكتوري، مساء الخميس. ضيف داخل لأول مرة، واقف عند المدخل ويطالع حوله ما يدري وين يروح.", en: "The Cheesecake Factory, Thursday night. A first-time guest stands at the entrance, looking around, unsure where to go." },
          media: "hospR1_q1",
          replies: [
            { ar: "«ثانية بس، بجيك حالاً»", en: "\"One second, I'll be right with you\"" },
            { ar: "«أهلين وسهلين! نوّرتنا، تفضّل أرتّب لك طاولة»", en: "\"Welcome! So glad you're here, let me get you a table\"" },
            { ar: "«اطلب من عند الكاشير»", en: "\"You can order at the counter\"" }
          ],
          correct: 1,
          feedback: { ar: "🔥 لحظة ذهبية! الضيف الجديد يقرر إحساسه عن المكان خلال ثواني. الترحيب الحار يشيل التوتر ويخلّيه يحس إنه بالمكان الصح.", en: "🔥 Golden moment! A first-timer decides how they feel about the place in seconds. A warm welcome kills the nerves and says: you're in the right place." }
        },
        {
          guest: { ar: "بي إف تشانغز. ضيف من الزباين الدايمين دخل، وتعرف وجهه من زيارات كثيرة.", en: "P.F. Chang's. A regular walks in, a face you know from many visits." },
          media: "hospR1_q2",
          replies: [
            { ar: "«السلام عليكم، اطلب عادي»", en: "\"Hello, go ahead and order\"" },
            { ar: "«وش تبي اليوم؟»", en: "\"What do you want today?\"" },
            { ar: "«هلا والله! حمدلله على السلامة، نفس طلبك المعتاد ولا تحب تجرّب جديد؟»", en: "\"Great to see you again! Your usual today, or shall we try something new?\"" }
          ],
          correct: 2,
          feedback: { ar: "💚 هذي اللحظة اللي تصنع الولاء! إنك تتذكره يعني إنه مو رقم. رحّب فيه، واحترم عادته، وافتح له باب للجديد.", en: "💚 This is where loyalty is made! Remembering them says they're not a number. Welcome them, respect the usual, and leave a door open for something new." }
        },
        {
          guest: { ar: "شيك شاك وقت الغدا. ضيف داخل بسرعة، يطالع ساعته، وواضح إنه راجع للدوام.", en: "Shake Shack at lunch. A guest walks in fast, checks their watch, clearly heading back to work." },
          media: "hospR1_q3",
          replies: [
            { ar: "أرحّب بسرعة وأخدمه بكفاءة وأعطيه مساحته", en: "Welcome quickly, serve efficiently, give them space" },
            { ar: "أسأله أسئلة كثيرة وأقترح له أصناف وحلى", en: "Ask lots of questions and suggest extra dishes and dessert" },
            { ar: "أتكلم بصوت عالي وحماس زايد عشان يحس بالطاقة", en: "Talk loud with big energy so they feel the vibe" }
          ],
          correct: 0,
          feedback: { ar: "⭐ قرأت الضيف صح! طابق طاقته، لا ترفعها. المستعجل يعتبر السرعة هي الضيافة. الحماس الزايد هنا يصير ضغط.", en: "⭐ You read the guest! Match their energy, don't raise it. For someone in a rush, speed IS hospitality. Extra enthusiasm here becomes pressure." }
        },
        {
          guest: { ar: "تشيبوتلي. ضيف يطالع المنيو من دقيقتين، عيونه تروح وتجي، وواضح إنه ضايع.", en: "Chipotle. A guest has been scanning the menu for two minutes, eyes darting, clearly lost." },
          media: "hospR1_q4",
          replies: [
            { ar: "«خذ وقتك، المنيو قدامك»", en: "\"Take your time, the menu's right there\"" },
            { ar: "«تحب أساعدك تختار؟ ودّك شي خفيف ولا شي يشبع أكثر؟»", en: "\"Want a hand choosing? Something light, or more filling?\"" },
            { ar: "«كل شي عندنا حلو، اختر أي شي»", en: "\"Everything's good here, just pick anything\"" }
          ],
          correct: 1,
          feedback: { ar: "🎯 سؤال واحد ينقذ الموقف! الضيف الحاير يبي حدود، مو خيارات أكثر. «خفيف ولا يشبع؟» يقلّص المنيو كامل لخيارين.", en: "🎯 One question saves it! A lost guest needs boundaries, not more options. \"Light or filling?\" shrinks the whole menu down to two choices." }
        },
        {
          guest: { ar: "آشاز. ضيف ذكر بشكل عابر: «اليوم عيد ميلاد أختي».", en: "Asha's. A guest mentions in passing: \"It's my sister's birthday today.\"" },
          media: "hospR1_q5",
          replies: [
            { ar: "«حلو، اطلبوا اللي تبونه»", en: "\"Nice, order whatever you like\"" },
            { ar: "«ما عندنا شي خاص للمناسبات»", en: "\"We don't do anything special for occasions\"" },
            { ar: "«مبروك! خلونا نخليها ليلة تنذكر، أرشّح لكم أطباقنا المميزة وأشوف لكم أحلى طاولة»", en: "\"Congratulations! Let's make it a night to remember, I'll suggest our best dishes and find you a great table\"" }
          ],
          correct: 2,
          feedback: { ar: "🔥 التقطت الذهب! الضيوف يرمون تلميحات المناسبات بشكل عابر. اللي يلتقطها يحوّل عشاء عادي لذكرى تنحكى.", en: "🔥 You caught gold! Guests drop occasion hints casually. Catching one turns an ordinary dinner into a story they'll tell." }
        }
      ]
    },

    /* ---------- ROUND 2 · match — Menu Storyteller ---------- */
    {
      id: "r2",
      mechanic: "match",
      title: { ar: "راوي المنيو", en: "The Menu Storyteller" },
      intro: {
        ar: "الضيوف ما يختارون أكل، يختارون تجربة.\n«دجاج مشوي» معلومة. «مشوي على الفحم ومتبّل ليلة كاملة» شهية.\nمهمتك: حوّل كل طبق لقصة، وكل اقتران لسبب منطقي.",
        en: "Guests don't choose food. They choose an experience.\n\"Grilled chicken\" is information. \"Charcoal-grilled, marinated overnight\" is appetite.\nYour mission: turn every dish into a story and every pairing into a reason."
      },
      media: "hospR2_intro",
      questions: [
        {
          instruction: { ar: "وصّل كل خطوة من خطوات سرد الطبق بالجملة اللي تقولها فعلاً.", en: "Match each storytelling step to the line you'd actually say." },
          media: "hospR2_q1",
          pairs: [
            { left: { ar: "ابدأ بالاسم", en: "Start with the name" }, right: { ar: "«هذا طبق الدجاج المشوي على الفحم»", en: "\"This is our charcoal-grilled chicken\"" } },
            { left: { ar: "استخدم وصف حسّي", en: "Use sensory words" }, right: { ar: "«ذهبي ومقرمش من برّا، وطري من جوّا»", en: "\"Golden and crispy outside, tender inside\"" } },
            { left: { ar: "وضّح المميز", en: "Say what makes it special" }, right: { ar: "«متبّل ليلة كاملة بخلطة توابلنا الخاصة»", en: "\"Marinated overnight in our own spice blend\"" } },
            { left: { ar: "ادعه يجرّب", en: "Invite them to try" }, right: { ar: "«أكيد بيعجبك، أجهّزه لك؟»", en: "\"You'll love it, shall I get it for you?\"" } }
          ],
          feedback: { ar: "🔥 اسم، إحساس، سر، دعوة. 4 جمل تحوّل سطر بالمنيو لطبق الضيف يشتهيه قبل ما يشوفه.", en: "🔥 Name, feeling, secret, invite. Four lines turn a menu line into a dish they crave before they see it." }
        },
        {
          instruction: { ar: "وصّل كل طبق بالاقتران اللي يوازنه.", en: "Match each dish to the pairing that balances it." },
          media: "hospR2_q2",
          pairs: [
            { left: { ar: "برجر دسم ومدخّن", en: "Rich, smoky burger" }, right: { ar: "مشروب حمضيات منعش يكسر الدسم", en: "A citrus cooler that cuts the richness" } },
            { left: { ar: "طبق حار", en: "A spicy dish" }, right: { ar: "مشروب بارد يهدّي الحرارة", en: "Something cold to calm the heat" } },
            { left: { ar: "سلطة خفيفة", en: "A light salad" }, right: { ar: "عصير طازج يكمّل الانتعاش", en: "A fresh juice that completes the freshness" } },
            { left: { ar: "حلى شوكولاتة غني", en: "Rich chocolate dessert" }, right: { ar: "قهوة سادة توازن الحلاوة", en: "A plain coffee to balance the sweetness" } }
          ],
          feedback: { ar: "💚 شوف، طابق، اقترح. كل اقتران هنا له سبب: التوازن. الاقتران المدروس يرفع الطبق، مو الفاتورة.", en: "💚 Look, match, suggest. Every pairing here has a reason: balance. A thoughtful pairing elevates the dish, not the bill." }
        },
        {
          instruction: { ar: "نفس الاقتراح، طريقتين. وصّل العبارة اللي فيها ضغط بنسختها اللي فيها توجيه.", en: "Same suggestion, two ways. Match the pushy line to its helpful version." },
          media: "hospR2_q3",
          pairs: [
            { left: { ar: "«تبي بطاطس ومشروب معاه؟»", en: "\"Want fries and a drink with that?\"" }, right: { ar: "«البطاطس المقرمشة تكمّل البرجر، تحبها معاه؟»", en: "\"Crispy fries complete the burger, want them with it?\"" } },
            { left: { ar: "«لازم تجرّب الحلى»", en: "\"You have to try the dessert\"" }, right: { ar: "«لو حاب تختم بشي حلو، حلانا خفيف بعد الوجبة»", en: "\"If you'd like a sweet finish, ours is light after a meal\"" } },
            { left: { ar: "«خذ الأكبر أحسن»", en: "\"Get the large, it's better\"" }, right: { ar: "«لو جوعان أكثر، الحجم الأكبر أوفر وأشبع لك»", en: "\"If you're hungrier, the large is better value and more filling\"" } },
            { left: { ar: "«ضيف مشروب غازي بس»", en: "\"Just add a soda\"" }, right: { ar: "«مشروب الليمون يوازن التتبيلة الحارة، يناسبك؟»", en: "\"A lemonade balances the spicy marinade, sound good?\"" } }
          ],
          feedback: { ar: "⭐ الفرق كلمة وحدة: «ليش». نفس المنتج، نفس السعر، بس واحد يحس خدمة والثاني يحس ضغط.", en: "⭐ The difference is one word: why. Same product, same price, but one feels like service and one feels like pressure." }
        },
        {
          instruction: { ar: "وصّل حالة الضيف بأسلوب المحادثة المناسب له.", en: "Match the guest's cue to the conversation style that fits." },
          media: "hospR2_q4",
          pairs: [
            { left: { ar: "ضيف جديد ومحتار", en: "New and unsure" }, right: { ar: "ساعده يختار ووجّهه بلطف", en: "Help them choose, guide gently" } },
            { left: { ar: "ضيف واثق ويعرف طلبه", en: "Confident, knows the order" }, right: { ar: "احترم اختياره واضف قيمة بسيطة", en: "Respect the choice, add one small value" } },
            { left: { ar: "ضيف فضولي ومنفتح للجديد", en: "Curious, open to new things" }, right: { ar: "فاجئه باقتراح مميز", en: "Surprise them with a standout suggestion" } },
            { left: { ar: "ضيف يحتفل بمناسبة", en: "Celebrating an occasion" }, right: { ar: "اهتم باللحظة ورشّح اللي يخلّيها مميزة", en: "Honour the moment, suggest what makes it special" } }
          ],
          feedback: { ar: "🎯 ما فيه أسلوب واحد يناسب الكل. اقرأ ضيفك أول، وبعدين اختر نبرتك. هذا الفرق بين نص محفوظ ومحادثة.", en: "🎯 No single style fits everyone. Read the guest first, then pick your tone. That's the line between a script and a conversation." }
        },
        {
          instruction: { ar: "وصّل الوصف الميّت بنسخته اللي تحيي الطبق.", en: "Match the dead description to the version that brings the dish alive." },
          media: "hospR2_q5",
          pairs: [
            { left: { ar: "«دجاج مشوي بصوص»", en: "\"Grilled chicken with sauce\"" }, right: { ar: "«دجاجنا المميز، متبّل ليلة كاملة، مدخّن وطري»", en: "\"Our signature chicken, marinated overnight, smoky and tender\"" } },
            { left: { ar: "«برجر لحم»", en: "\"Beef burger\"" }, right: { ar: "«برجر بخلطة أنغوس غنية، طري ومدخّن خفيف»", en: "\"A rich Angus blend, juicy with a light smoke\"" } },
            { left: { ar: "«سلطة»", en: "\"Salad\"" }, right: { ar: "«خضار طازجة مقرمشة وصوص ليموني خفيف»", en: "\"Crisp fresh veggies and a light lemon dressing\"" } },
            { left: { ar: "«عصير»", en: "\"Juice\"" }, right: { ar: "«عصير طازج بارد ينعش اللحظة»", en: "\"Cold fresh juice that lifts the moment\"" } }
          ],
          feedback: { ar: "🔥 نفس الطبق بالضبط! الفرق الوحيد إنك خليت الضيف يتخيّله. الخيال يفتح الشهية قبل المطبخ.", en: "🔥 Exactly the same dish! The only difference is you made them picture it. Imagination opens appetite before the kitchen does." }
        }
      ]
    },

    /* ---------- ROUND 3 · order — Memory Makers ---------- */
    {
      id: "r3",
      mechanic: "order",
      title: { ar: "صُنّاع اللحظات والوداع", en: "Memory Makers & The Last Impression" },
      intro: {
        ar: "الضيف ينسى الطلب، بس يتذكر الإحساس.\nوالوداع؟ الوداع هو آخر طعم يبقى عن العلامة، وبداية الزيارة الجاية.\nمهمتك: اسحب الخطوات ورتّبها صح.",
        en: "Guests forget the order. They remember the feeling.\nAnd the farewell? It's the last taste of the brand, and the start of the next visit.\nYour mission: drag the steps into the right order."
      },
      media: "hospR3_intro",
      questions: [
        {
          instruction: { ar: "الضيوف خلّصوا وجاهزين يمشون. رتّب وداع يخلّيهم يرجعون.", en: "They're finished and ready to leave. Order a farewell that brings them back." },
          media: "hospR3_q1",
          steps: [
            { ar: "اسأل لو يحتاجون أي شي قبل لا يمشون", en: "Ask if they need anything before they go" },
            { ar: "تأكد إن كل شي كان على ذوقهم", en: "Confirm everything was to their liking" },
            { ar: "اشكرهم بصدق على زيارتهم", en: "Thank them sincerely for visiting" },
            { ar: "ادعهم يرجعون: «نتشرّف بزيارتكم مرة ثانية»", en: "Invite them back: \"we'd love to see you again\"" },
            { ar: "ودّعهم بابتسامة وتواصل بصري", en: "Send them off with a smile and eye contact" }
          ],
          feedback: { ar: "💚 الوداع مو إجراء! هو آخر مشهد، واللي يتذكرونه وهم بالسيارة. اختمه دافئ وصادق.", en: "💚 The farewell isn't admin! It's the closing scene, the bit they replay in the car. Make it warm and sincere." }
        },
        {
          instruction: { ar: "عائلة تحتفل بعيد ميلاد. رتّب خطوات صناعة لحظة تنذكر.", en: "A family celebrating a birthday. Order the steps to create a moment they'll remember." },
          media: "hospR3_q2",
          steps: [
            { ar: "لاحظ المناسبة أو التلميح", en: "Notice the occasion or the hint" },
            { ar: "خصّص اهتمامك حسب اللحظة", en: "Personalize your attention to the moment" },
            { ar: "قدّم لمسة بسيطة تفاجئهم", en: "Offer a small touch that surprises them" },
            { ar: "اربطها بتجربتهم: «نبي زيارتكم تكون مميزة»", en: "Tie it to their visit: \"we want this to feel special\"" }
          ],
          feedback: { ar: "🔥 المفاجأة والبهجة! حلى عيد ميلاد أو تهنئة صادقة تكلّف دقيقة، بس تصير القصة اللي يحكونها لأهلهم.", en: "🔥 Surprise and delight! A birthday dessert or a sincere congratulations costs one minute and becomes the story they tell their family." }
        },
        {
          instruction: { ar: "رتّب إغلاق الطاولة بفخر.", en: "Order how to close a table with pride." },
          media: "hospR3_q3",
          steps: [
            { ar: "تأكد إن تجربتهم كانت كاملة ومريحة", en: "Make sure the experience felt complete and comfortable" },
            { ar: "قدّم الفاتورة بهدوء وبدون استعجال", en: "Present the bill calmly, no rushing" },
            { ar: "ساعدهم يجمّعون نقاط أورا قبل الدفع", en: "Help them collect Aura points before payment" },
            { ar: "اشكرهم بشكل شخصي", en: "Thank them personally" },
            { ar: "ودّعهم بدعوة صادقة للرجوع", en: "Farewell with a sincere invite back" }
          ],
          feedback: { ar: "⭐ لاحظ ترتيب أورا: قبل الدفع، مو بعده! بعد الدفع تصير متأخرة، وقبله تصير خدمة تفيدهم.", en: "⭐ Notice where Aura sits: before payment, not after! After, it's too late. Before, it's a service that actually helps them." }
        },
        {
          instruction: { ar: "ضيف دايم يزورنا كل أسبوع، وخلّص عشاه. رتّب وداع يقوّي ولاءه.", en: "A weekly regular has finished dinner. Order a farewell that deepens loyalty." },
          media: "hospR3_q4",
          steps: [
            { ar: "اشكره إنه دايم يختارنا", en: "Thank them for always choosing us" },
            { ar: "اذكر مزايا أورا أو عروض قادمة", en: "Mention Aura benefits or what's coming up" },
            { ar: "أشعره إن وجوده فرّق معنا", en: "Make them feel their presence mattered" },
            { ar: "ودّعه: «حمدلله على شرفتنا، ننتظرك المرة الجاية»", en: "Farewell: \"thank you for honouring us, see you next time\"" }
          ],
          feedback: { ar: "🎯 الضيف الدايم ما يبي خصم، يبي يحس إنه مرئي. كلمة «دايم تختارنا» تسوى أكثر من أي عرض.", en: "🎯 A regular doesn't want a discount, they want to feel seen. \"You always choose us\" is worth more than any offer." }
        },
        {
          instruction: { ar: "من آخر لقمة لين باب المطعم. رتّب الرحلة كاملة.", en: "From the last bite to the door. Order the whole journey." },
          media: "hospR3_q5",
          steps: [
            { ar: "تابع الطاولة وتأكد إنهم مرتاحين", en: "Check the table, make sure they're comfortable" },
            { ar: "اقترح ختام خفيف لو حابّين", en: "Suggest a light finish if they'd like" },
            { ar: "اشكرهم على الزيارة بصدق", en: "Thank them sincerely for the visit" },
            { ar: "ادعهم يرجعون بلمسة شخصية", en: "Invite them back with a personal touch" },
            { ar: "ودّعهم بطاقة إيجابية", en: "Send them off with positive energy" }
          ],
          feedback: { ar: "🔥 كل وداع هو بداية الزيارة الجاية. آخر 30 ثانية عندك تقرر إذا بيرجعون ولا لا.", en: "🔥 Every farewell starts the next visit. Your last 30 seconds decide whether they come back." }
        }
      ]
    },

    /* ---------- ROUND 4 · scenario — The Restaurant Promise ---------- */
    {
      id: "r4",
      mechanic: "scenario",
      title: { ar: "وعد المطعم", en: "The Restaurant Promise" },
      intro: {
        ar: "وعدنا بسيط: «لو مو مثالي، بنصلحه».\nالضيف يبي 3 أشياء: يُسمع، يُحترم، ويشوف فعل.\nمهمتك: اقرأ الموقف واختر الحركة اللي تسترجع الثقة. الخيارات كلها تبي تكون صح، بس وحدة بس هي الصح.",
        en: "Our promise is simple: \"if it's not perfect, we'll fix it.\"\nGuests need 3 things: to be heard, respected, and to see action.\nYour mission: read the moment and pick the move that wins trust back. Every option looks reasonable. Only one is right."
      },
      media: "hospR4_intro",
      questions: [
        {
          scenario: { ar: "رايزنغ كينز، وقت الذروة. ضيف وصله طلب غير اللي طلبه، وهو أصلاً مستعجل.", en: "Raising Cane's at peak time. A guest gets the wrong order, and they're already in a hurry." },
          media: "hospR4_q1",
          options: [
            { ar: "أعتذر بصدق، أصلح الطلب بسرعة، وأتابع معه إنه وصله صح", en: "Apologize sincerely, fix it fast, and follow up that it's right" },
            { ar: "أوضّح له إن المطبخ مزحوم اليوم وأصلح الطلب", en: "Explain the kitchen is slammed today, then fix the order" },
            { ar: "أعطيه خصم عشان أعوّضه عن الغلطة", en: "Give a discount to compensate for the mistake" }
          ],
          correct: 0,
          feedback: { ar: "💚 وعد المطعم! اعترف، صلّح، تابع. الشرح يحس فيه الضيف إنك تبرر، والخصم يشتري سكوته مو ثقته. الفعل هو اللي يسترجعها.", en: "💚 The Restaurant Promise! Own it, fix it, follow up. Explaining sounds like excuses, and a discount buys silence, not trust. Action wins it back." }
        },
        {
          scenario: { ar: "ذا تشيزكيك فاكتوري. ضيف ينتظر أكله من 25 دقيقة، وبدأ يلتفت للمطبخ كل شوي.", en: "The Cheesecake Factory. A guest has waited 25 minutes and keeps glancing toward the kitchen." },
          media: "hospR4_q2",
          options: [
            { ar: "أنتظر لين يشتكي، يمكن ما ينتبه للوقت", en: "Wait until they complain, maybe they won't notice" },
            { ar: "أعتذر عن التأخير، أطمّنه إن طلبه جاي، وأتابع معه", en: "Apologize for the wait, reassure them it's coming, and keep them updated" },
            { ar: "أقول له المطبخ مزحوم اليوم وأكمل شغلي", en: "Tell them the kitchen is busy today and carry on" }
          ],
          correct: 1,
          feedback: { ar: "🔥 لا تنتظر الشكوى! الضيف اللي يعرف وش يصير ينتظر بصبر. الصمت هو اللي يحوّل الانتظار لغضب.", en: "🔥 Don't wait for the complaint! A guest who knows what's happening waits patiently. Silence is what turns waiting into anger." }
        },
        {
          scenario: { ar: "بي إف تشانغز. ضيف أكل نص الطبق وقال بهدوء: «طعمه مو زي ما توقّعت».", en: "P.F. Chang's. A guest has eaten half the dish and says quietly: \"This isn't what I expected.\"" },
          media: "hospR4_q3",
          options: [
            { ar: "أشرح له مكوّنات الطبق عشان يفهم طعمه الأصلي", en: "Explain the ingredients so they understand the intended flavour" },
            { ar: "أعتذر وأقول إن الأذواق تختلف", en: "Apologize and say tastes differ" },
            { ar: "أعتذر، وأعرض أبدّله أو أرشّح بديل يناسب ذوقه", en: "Apologize, offer to replace it, or suggest an alternative that suits them" }
          ],
          correct: 2,
          feedback: { ar: "⭐ لو مو مثالي، بنصلحه! تشرح له الطبق يعني تقول له «ذوقك غلط». الحل الفعلي يخلّي الشكوى ذكرى حلوة.", en: "⭐ If it's not perfect, we'll fix it! Explaining the dish says \"your taste is wrong\". A real fix turns a complaint into a good memory." }
        },
        {
          scenario: { ar: "بينكبيري. عائلة خلّصت وكل شي كان ممتاز، وقاعدين يجمعون أغراضهم.", en: "Pinkberry. A family is done, everything went great, and they're gathering their things." },
          media: "hospR4_q4",
          options: [
            { ar: "أعطيهم الفاتورة وأشكرهم بابتسامة", en: "Bring the bill and thank them with a smile" },
            { ar: "أشكرهم بشكل شخصي، أساعدهم بأورا، وأدعوهم يرجعون", en: "Thank them personally, help with Aura, and invite them back" },
            { ar: "أخلّص بسرعة عشان الطاولة مطلوبة", en: "Turn the table fast, it's needed" }
          ],
          correct: 1,
          feedback: { ar: "💚 الامتنان أكثر من «شكراً»! «كان شرف لنا وجودكم معنا اليوم» جملة تكلّف ثانيتين وتبني علاقة سنين.", en: "💚 Gratitude is more than \"thanks\"! \"It was wonderful having your family with us\" costs two seconds and builds a years-long relationship." }
        },
        {
          scenario: { ar: "تشيبوتلي. ضيف نبّهك بهدوء إن الطاولة ما كانت نظيفة وقت ما وصلوا.", en: "Chipotle. A guest quietly mentions the table wasn't clean when they arrived." },
          media: "hospR4_q5",
          options: [
            { ar: "أقول له إن الفرقة مزحومة اليوم وأنظّفها", en: "Say the team is slammed today, then clean it" },
            { ar: "أنادي زميلي المسؤول عن النظافة", en: "Call the teammate responsible for cleaning" },
            { ar: "أعتذر، أنظّفها فوراً، وأشكره إنه نبّهنا", en: "Apologize, clean it immediately, and thank them for telling us" }
          ],
          correct: 2,
          feedback: { ar: "🎯 الملاحظة هدية! الضيف اللي ينبّهك يعطيك فرصة تصلح بدل ما يمشي ساكت وما يرجع. اشكره بصدق.", en: "🎯 Feedback is a gift! A guest who tells you is giving you a chance to fix it instead of leaving silently and never returning. Thank them for real." }
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
        ar: "ليلة الجمعة. كل الطاولات مشغولة. المطبخ يشتغل بأقصى طاقته.\nقرارات خاطفة، 8 ثواني لكل وحدة ⚡\nالذروة ما تكسر الفرق القوي، هي تكشفه.",
        en: "Friday night. Every table is full. The kitchen is flat out.\nSnap decisions, 8 seconds each ⚡\nPeak doesn't break great teams. It reveals them."
      },
      media: "hospR5_intro",
      questions: [
        { prompt: { ar: "بداية شفت الذروة؟", en: "Your peak shift begins?" },
          media: "hospR5_q1",
          options: [ { ar: "أدخل متّزن وحاضر ومركّز على الضيف", en: "Arrive centred, present, guest-focused" }, { ar: "أدخل متوتر ومشتت", en: "Arrive tense and scattered" } ],
          correct: 0, feedback: { ar: "⚡ تركيزك يحدد طاقة الشفت كله.", en: "⚡ Your focus sets the tone for the whole shift." } },
        { prompt: { ar: "ضيف داخل والمكان مليان؟", en: "A guest walks in and it's packed?" },
          media: "hospR5_q2",
          options: [ { ar: "أكمل شغلي، بيشوف إن المكان زحمة", en: "Keep working, they can see it's busy" }, { ar: "تواصل بصري وابتسامة وترحيب خلال 5 ثواني", en: "Eye contact, smile, welcome within 5 seconds" } ],
          correct: 1, feedback: { ar: "💚 كل ترحيب يشكّل إحساس الضيف بالمكان.", en: "💚 Every welcome shapes how a guest feels about the place." } },
        { prompt: { ar: "زميلك غارق بقسمه وأنت فاضي؟", en: "A teammate is drowning in their section and you're free?" },
          media: "hospR5_q3",
          options: [ { ar: "أدخل أساعد قبل لا يطلب", en: "Step in before they have to ask" }, { ar: "أنتظر لين يطلب المساعدة", en: "Wait until they ask for help" } ],
          correct: 0, feedback: { ar: "🔥 الانسجام خلف الكواليس يصير هدوء قدّام الضيف.", en: "🔥 Harmony behind the scenes becomes calm in front of the guest." } },
        { prompt: { ar: "الضغط طلع براسك بين طاولتين؟", en: "Stress spikes between two tables?" },
          media: "hospR5_q4",
          options: [ { ar: "أنقل توتري للطاولة اللي بعدها", en: "Carry the tension to the next table" }, { ar: "نفس، ابتسامة، وإعادة ضبط", en: "One breath, a smile, a reset" } ],
          correct: 1, feedback: { ar: "⚡ الضيف يحس طاقتك قبل ما يذوق أكله.", en: "⚡ Guests feel your energy before they taste the food." } },
        { prompt: { ar: "ضيف يسأل عن توصية اليوم؟", en: "A guest asks what you recommend today?" },
          media: "hospR5_q5",
          options: [ { ar: "أعرف طبق اليوم وأحكي قصته بثقة", en: "Know today's hero dish and tell its story with confidence" }, { ar: "أقول «كل شي حلو»", en: "Say \"everything's good\"" } ],
          correct: 0, feedback: { ar: "💚 «كل شي حلو» تعني «ما راح أساعدك».", en: "💚 \"Everything's good\" means \"I won't help you\"." } },
        { prompt: { ar: "قسمك وقت الزحمة؟", en: "Your section mid-rush?" },
          media: "hospR5_q6",
          options: [ { ar: "أنتظر لين يرفعون يدهم", en: "Wait until someone raises a hand" }, { ar: "أمسح القسم وألاحظ الاحتياج قبل ما يطلبونه", en: "Scan the section and spot needs before they're voiced" } ],
          correct: 1, feedback: { ar: "⭐ التوقّع دايم أقوى من رد الفعل.", en: "⭐ Anticipation always beats reaction." } },
        { prompt: { ar: "صار خطأ بسيط بالخدمة؟", en: "A small service slip?" },
          media: "hospR5_q7",
          options: [ { ar: "أعترف وأصلحه باللحظة بنبرة دافئة", en: "Own it and fix it on the spot, warm tone" }, { ar: "أتجاهله، يمكن ما ينتبه", en: "Ignore it, maybe they won't notice" } ],
          correct: 0, feedback: { ar: "🔥 نبرة دافئة أول، تصرّف ثاني، بدون دراما.", en: "🔥 Warm tone first, action second, no drama." } },
        { prompt: { ar: "ختام كل طاولة؟", en: "Closing every table?" },
          media: "hospR5_q8",
          options: [ { ar: "أرفع الطاولة بصمت", en: "Clear the table in silence" }, { ar: "شكر صادق ودعوة يرجعون", en: "A sincere thank-you and an invite back" } ],
          correct: 1, feedback: { ar: "⭐ كل وداع هو بداية الزيارة الجاية.", en: "⭐ Every farewell is the start of their next visit." } }
      ]
    }

  ]
};

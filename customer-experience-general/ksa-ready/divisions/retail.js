/* ============================================================
   DIVISION: RETAIL — Art of Selling / فن البيع
   GEN Z IMMERSIVE EDITION. Every question is a micro-story set in a real
   Alshaya store, with recurring personas and brand-authentic moments.
   Mechanics, question counts, media keys and the CORRECT BEHAVIOUR are
   unchanged. Correct-answer POSITIONS are now varied (they used to all be
   option 1, which players pattern-match instantly).

   Customers are described by role and behaviour (gift shopper, trend hunter,
   beauty lover, family shopper, in a rush, indecisive), never by personal name,
   so it is always clear who is the customer and who is the staff member.
   Arabic text contains NO Latin characters: brand names are transliterated.

   Arabic = KSA Saudi Arabic. Terminology rule: زبون / زبائن only.
   Western digits. No em dash.
   ============================================================ */
window.DIVISION_retail = {
  id: "retail",
  world: "retail",
  logo: "assets/logos/art-of-selling-color.png",
  title: { ar: "فن البيع", en: "The Art of Selling" },
  rounds: [

    /* ---------- ROUND 1 · swipe — Radar Mode ---------- */
    {
      id: "r1",
      mechanic: "swipe",
      title: { ar: "وضع الرادار: أول 7 ثواني", en: "Radar Mode: The First 7 Seconds" },
      intro: {
        ar: "عندك 7 ثواني. 93% من انطباع الزبون يجي من لغة جسدك ونبرتك، مو من كلامك.\nمهمتك: اقرأ اللحظة. اسحب يمين لو فيها فرصة تواصل، ويسار لو الأذكى تعطيه مساحة.\nخلّ رادارك شغّال.",
        en: "You've got 7 seconds. 93% of the impression comes from your body language and tone, not your words.\nYour mission: read the moment. Swipe right if it's a chance to connect, left if the smart move is space.\nRadar on."
      },
      media: "retailR1_intro",
      questions: [
        {
          prompt: { ar: "إتش آند إم، الساعة 7 مساء. بنت واقفة قدام نفس الجاكيت من 3 دقايق. تلمسه، تتركه، ترجع تلمسه. ما رفعت راسها ولا مرة.", en: "H&M, 7pm. A girl has been standing at the same jacket for 3 minutes. Touches it, lets go, touches it again. Never looks up." },
          media: "retailR1_q1",
          isOpportunity: true,
          feedback: { ar: "🔥 عين صقر! التردد الصامت هو طلب مساعدة بدون كلام. لاحظ، اسأل سؤال واحد، ووجّه. هذي 3 ثواني تسوى بيع.", en: "🔥 Sharp eye! Silent hesitation is a request for help with no words. Notice, ask one question, guide. Those 3 seconds are worth a sale." }
        },
        {
          prompt: { ar: "أمريكان إيجل. أنت مع زبون، وزبون ثاني دخل ووقف عند المدخل يدوّر بعينه على أحد يشوفه.", en: "American Eagle. You're with a customer, and another one walks in and scans the room hoping someone sees him." },
          media: "retailR1_q2",
          isOpportunity: true,
          feedback: { ar: "💚 صح! تواصل بصري + ابتسامة + «معك بعد لحظة» تكفي يبقى. المشغولية طبيعية، البرود اختيار.", en: "💚 Yes! Eye contact + a smile + \"I'll be right with you\" is enough to keep him. Busy is normal. Cold is a choice." }
        },
        {
          prompt: { ar: "فوت لوكر. زبون قال «بس أتفرّج، مشكور» وأعطاك ظهره وكمّل بين الأرفف.", en: "Foot Locker. A customer says \"just looking, thanks\", turns away and keeps walking the aisles." },
          media: "retailR1_q3",
          isOpportunity: false,
          feedback: { ar: "⭐ إحساس عالي! لاحقته الحين = خسرته. أعطه مساحة، خلّك ظاهر وقريب. متفرّج اليوم ممكن يكون أوفى زبون بكرة.", en: "⭐ Great instinct! Chase him now and you lose him. Give space, stay visible. Today's browser is tomorrow's regular." }
        },
        {
          prompt: { ar: "نكست. زبونة تسأل: «عندكم هذا بمقاس أصغر؟» وهي ماسكة فستان بيدها.", en: "Next. A customer asks: \"Do you have this in a smaller size?\" holding a dress." },
          media: "retailR1_q4",
          isOpportunity: true,
          feedback: { ar: "🎯 التقطتها! السؤال عن مقاس هو باب مفتوح. وراه احتياج حقيقي: «استخدام يومي ولا لمناسبة؟» وبتعرف كل شي.", en: "🎯 Nailed it! A size question is an open door. Behind it is a real need: \"everyday or a special occasion?\" and now you know everything." }
        },
        {
          prompt: { ar: "موجي. زبون داخل بسرعة، على التلفون بمكالمة، ويمشي مباشرة لجوّه بدون ما يلتفت.", en: "MUJI. A customer strides in, mid phone call, heading straight to the back without looking up." },
          media: "retailR1_q5",
          isOpportunity: false,
          feedback: { ar: "✅ قراءة ممتازة! مو كل لحظة لحظتك. خلّك جاهز وحاضر، وأول ما يفضى بتكون أنت أول وجه يشوفه.", en: "✅ Great read! Not every moment is your moment. Stay ready and present, and the second he's free you're the first face he sees." }
        },
        {
          prompt: { ar: "باث آند بودي ووركس. زبونة تشمّ عطر جسم، ترجعه، تشم الثاني، ترجعه، وترجع للأول. حايرة بشكل واضح.", en: "Bath & Body Works. A customer smells one body mist, puts it back, tries another, puts it back, returns to the first. Visibly torn." },
          media: "retailR1_q6",
          isOpportunity: true,
          feedback: { ar: "🔥 وقتها بالضبط! الحيرة = فرصة ذهبية. سؤال واحد يفك العقدة: «تحبين المنعش ولا الدافئ؟» وخلاص وجّهتيها.", en: "🔥 Perfect timing! Torn = golden opportunity. One question unlocks it: \"fresh or warm?\" and now you can guide her." }
        },
        {
          prompt: { ar: "شارلوت تيلبوري. زبونة جرّبت درجة أحمر شفاه على يدها، طالعتها بالضوء، وكمّلت تتمشى بهدوء وهي تفكر.", en: "Charlotte Tilbury. A customer swatched a lipstick on her hand, checked it in the light, and drifts on quietly, thinking." },
          media: "retailR1_q7",
          isOpportunity: false,
          feedback: { ar: "⭐ نضج! هذي لحظة تفكير، مو لحظة بيع. أعطيها ثانيتين تقرر، وخلّيك قريبة. الضغط هنا يقتل القرار.", en: "⭐ Mature call! This is a thinking moment, not a selling moment. Give her two seconds and stay close. Pressure here kills the decision." }
        }
      ]
    },

    /* ---------- ROUND 2 · match — Story Mode ---------- */
    {
      id: "r2",
      mechanic: "match",
      title: { ar: "وضع القصة: من مواصفة إلى إحساس", en: "Story Mode: Features into Feelings" },
      intro: {
        ar: "الزبون ما يشتري «قطن 100%». يشتري الإحساس اللي بيعيشه وهو لابسه.\nمهمتك: حوّل كل مواصفة لإحساس، وكل توصية لشي يكمّل اختياره.\nقاعدة الجولة: قل أقل، ساعد أكثر.",
        en: "Nobody buys \"100% cotton\". They buy how it feels when they're wearing it.\nYour mission: turn every feature into a feeling, and every suggestion into something that completes their choice.\nRule of this round: say less, help more."
      },
      media: "retailR2_intro",
      questions: [
        {
          instruction: { ar: "زبون يسأل عن جاكيت في أمريكان إيجل. وصّل كل مواصفة بالإحساس اللي يبيع.", en: "A customer asks about a jacket at American Eagle. Match each feature to the feeling that sells it." },
          media: "retailR2_q1",
          pairs: [
            { left: { ar: "خفيف الوزن", en: "Lightweight" }, right: { ar: "تنساه على كتفك من الصبح للّيل", en: "You forget you're wearing it, morning to night" } },
            { left: { ar: "قماش يثبّت شكله", en: "Holds its shape" }, right: { ar: "آخر الدوام وأنت شكلك زي أول الدوام", en: "End of the day, you look like the start of the day" } },
            { left: { ar: "لون محايد", en: "Neutral colour" }, right: { ar: "ينسّق مع كل شي بخزانتك، بدون تفكير", en: "Goes with everything you own, zero thinking" } },
            { left: { ar: "مقاوم للماء", en: "Water-resistant" }, right: { ar: "المطر ينزل وأنت ماشي عادي", en: "Rain starts and you just keep walking" } }
          ],
          feedback: { ar: "🔥 هذا هو الفرق! المواصفة معلومة، الإحساس قرار. الزبون يشتري حياته، مو المنتج.", en: "🔥 That's the difference! A feature is information. A feeling is a decision. They buy their life, not the product." }
        },
        {
          instruction: { ar: "كل زبون اختار قطعة. وصّل اختياره بالإضافة الوحدة اللي تكمّله بشكل طبيعي.", en: "Each customer picked something. Match their choice to the one add-on that naturally completes it." },
          media: "retailR2_q2",
          pairs: [
            { left: { ar: "زبون اختار جينز", en: "A customer picked jeans" }, right: { ar: "حزام يقفل الإطلالة", en: "A belt that finishes the look" } },
            { left: { ar: "زبون عنده عرس نهاري وأخذ بدلة كحلية", en: "A customer with a daytime wedding took a navy suit" }, right: { ar: "منديل جيب كتان يبيّن بالصور", en: "A linen pocket square that pops in the photos" } },
            { left: { ar: "زبون أخذ قميص رسمي", en: "A customer took a dress shirt" }, right: { ar: "ربطة بسيطة تكمّل الرسمي", en: "A simple tie to complete the formal look" } },
            { left: { ar: "زبون أخذ سنيكرز من فوت لوكر", en: "A customer grabbed sneakers at Foot Locker" }, right: { ar: "جوارب مريحة تخلّيه يمشي أطول", en: "Comfy socks so he can walk longer" } }
          ],
          feedback: { ar: "💚 توصية مرتفعة! ربطتها باختياره، ما كدّستها عليه. القيمة تزيد، والضغط صفر.", en: "💚 Elevated recommendation! You linked it to his choice instead of piling on. Value up, pressure zero." }
        },
        {
          instruction: { ar: "خريطة الإغلاق الذكي. وصّل كل خطوة بالجملة اللي تقولها فعلاً.", en: "The smart-close map. Match each step to the line you'd actually say." },
          media: "retailR2_q3",
          pairs: [
            { left: { ar: "وضّح", en: "Clarify" }, right: { ar: "«اختيارك ممتاز، قماشه ناعم ومريح طول اليوم»", en: "\"Great pick, the fabric is soft and easy all day\"" } },
            { left: { ar: "اربط", en: "Connect" }, right: { ar: "«كثير زبائن ياخذون هذا الحزام معه، يكمّل الستايل»", en: "\"A lot of customers take this belt with it, it completes the style\"" } },
            { left: { ar: "اختم", en: "Complete" }, right: { ar: "«أضيفه لك ولا نكتفي بالجينز؟ زي ما يريحك»", en: "\"Add it, or just the jeans? Whatever suits you\"" } },
            { left: { ar: "اسكت عند الوضوح", en: "Stop when it's clear" }, right: { ar: "فايدة وحدة واضحة، وبعدها صمت", en: "One clear benefit, then silence" } }
          ],
          feedback: { ar: "⭐ كلارفاي ← كنكت ← كمبليت. وأصعب خطوة؟ السكوت. الكلام الزايد يرجّع الزبون خطوة لورا.", en: "⭐ Clarify, Connect, Complete. The hardest step? The silence. Extra talking walks the customer backwards." }
        },
        {
          instruction: { ar: "4 زبائن، 4 احتياجات. وصّل كل واحد بالفايدة الوحدة اللي تهمه هو.", en: "4 customers, 4 needs. Match each to the one benefit that matters to them." },
          media: "retailR2_q4",
          pairs: [
            { left: { ar: "يبي شي يلبسه كل يوم", en: "Wants something for every day" }, right: { ar: "«هذا مريح وعملي، تلبسه وتنساه»", en: "\"Comfy and practical, wear it and forget it\"" } },
            { left: { ar: "عنده مناسبة الخميس", en: "Has an event on Thursday" }, right: { ar: "«هذا يخلّيك مميز بالمناسبة»", en: "\"This makes you stand out at the event\"" } },
            { left: { ar: "خايف المقاس ما يضبط", en: "Worried the fit won't work" }, right: { ar: "«القماش فيه مرونة، يعطيك راحة بأي حركة»", en: "\"The fabric has stretch, it's comfortable however you move\"" } },
            { left: { ar: "يبي شي يدوم سنين", en: "Wants something that lasts years" }, right: { ar: "«خاماته تثبت شكلها مع الوقت»", en: "\"The materials hold their shape over time\"" } }
          ],
          feedback: { ar: "🎯 فايدة وحدة تناسب لحظته أقوى من 5 فوايد عامة. اعرف زبونك، وبعدين تكلم.", en: "🎯 One benefit that fits their moment beats 5 generic ones. Know the customer first, then talk." }
        },
        {
          instruction: { ar: "لغة «النعم السهلة». وصّل كل موقف بالجملة اللي تفتح، مو تضغط.", en: "The \"easy yes\" language. Match each moment to the line that opens instead of pressures." },
          media: "retailR2_q5",
          pairs: [
            { left: { ar: "اختار قميص ويبي يكمّل الإطلالة", en: "Picked a shirt, wants to complete the look" }, right: { ar: "«ودّك أوريك خيار ينسّق معه؟»", en: "\"Want me to show you a matching option?\"" } },
            { left: { ar: "متردد ياخذ الإضافة", en: "Unsure about the add-on" }, right: { ar: "«هذا ينسّق زين مع اللي اخترته»", en: "\"This pairs really well with what you chose\"" } },
            { left: { ar: "خلص وهو مبسوط باختياره", en: "Done and happy with his choice" }, right: { ar: "«خيار موفّق، أكمّل لك؟»", en: "\"Great choice, shall I ring it up?\"" } },
            { left: { ar: "قال ما يبي إضافات", en: "Said he doesn't want extras" }, right: { ar: "«تمام، اللي اخترته حلو وكافي»", en: "\"Of course, what you chose is great as is\"" } }
          ],
          feedback: { ar: "💚 لاحظت آخر وحدة؟ احترام الرفض يبني ثقة، والثقة ترجّعه لك مرة ثانية. الرفض قرار، مو معركة.", en: "💚 Notice the last one? Respecting a no builds trust, and trust brings him back. A no is a decision, not a battle." }
        },
        {
          instruction: { ar: "زبونة في باث آند بودي ووركس. وصّل كل مواصفة بالإحساس اللي يخليها تاخذه.", en: "A customer at Bath & Body Works. Match each feature to the feeling that makes her take it." },
          media: "retailR2_q6",
          pairs: [
            { left: { ar: "أحمر شفاه مرطّب", en: "Hydrating lipstick" }, right: { ar: "لون يضل، وشفايف ما تنشف طول اليوم", en: "Colour that stays and lips that never dry out" } },
            { left: { ar: "كزبونة جسم برائحة فانيلا", en: "Vanilla body cream" }, right: { ar: "دفء يمشي معك من الصبح", en: "A warmth that travels with you all morning" } },
            { left: { ar: "أساس بتغطية خفيفة", en: "Light-coverage foundation" }, right: { ar: "بشرتك تتنفّس، وكأنك بدون مكياج", en: "Your skin breathes, like you're wearing nothing" } },
            { left: { ar: "عطر حمضيات", en: "Citrus fragrance" }, right: { ar: "أول رشة تفتح يومك", en: "One spray and your day starts" } }
          ],
          feedback: { ar: "🔥 في التجميل الإحساس هو المنتج! الزبونة ما تشتري رائحة، تشتري كيف بتحس وهي لابستها.", en: "🔥 In beauty the feeling IS the product! She isn't buying a scent, she's buying how she'll feel wearing it." }
        },
        {
          instruction: { ar: "وصّل اختيار الزبونة بالإضافة اللي تكمّل الروتين، مو اللي تكبّر الفاتورة.", en: "Match her choice to the add-on that completes the routine, not the one that grows the bill." },
          media: "retailR2_q7",
          pairs: [
            { left: { ar: "زبونة أخذت عطر من باث آند بودي ووركس", en: "A customer took a Bath & Body Works mist" }, right: { ar: "لوشن بنفس الرائحة يثبّتها أطول بمرتين", en: "The matching lotion that makes it last twice as long" } },
            { left: { ar: "أخذت أحمر شفاه", en: "She took a lipstick" }, right: { ar: "مثبّت يخلّيه يصمد للعشاء", en: "A setter so it survives dinner" } },
            { left: { ar: "أخذت كزبونة أساس من ألتا بيوتي", en: "She took a foundation at Ulta Beauty" }, right: { ar: "إسفنجة تعطي تطبيق أنعم", en: "A sponge for a smoother finish" } },
            { left: { ar: "أخذت غسول وجه من بوتس", en: "She took a face wash at Boots" }, right: { ar: "مرطّب يكمّل الروتين", en: "A moisturizer that completes the routine" } }
          ],
          feedback: { ar: "⭐ كل إضافة هنا لها سبب منطقي يخدم الزبونة. هذا الفرق بين «توصية» و«بيع بالضغط».", en: "⭐ Every add-on here has a logical reason that serves her. That's the line between a recommendation and a hard sell." }
        }
      ]
    },

    /* ---------- ROUND 3 · order — The Last 30 Seconds ---------- */
    {
      id: "r3",
      mechanic: "order",
      title: { ar: "آخر 30 ثانية", en: "The Last 30 Seconds" },
      intro: {
        ar: "البيع ما ينخسر عند الرفض. ينخسر بالتردد الصامت.\nوالنهاية؟ النهاية هي اللي تبقى بذاكرة الزبون بعد ما يطلع.\nمهمتك: اسحب الخطوات ورتّبها صح. امتلك آخر 30 ثانية.",
        en: "Sales aren't lost at rejection. They're lost in silent hesitation.\nAnd the ending? The ending is what stays in their memory after they walk out.\nYour mission: drag the steps into the right order. Own the last 30 seconds."
      },
      media: "retailR3_intro",
      questions: [
        {
          instruction: { ar: "قرر يشتري. رتّب تجربة دفع تخلّيه يطلع مبسوط.", en: "He's decided to buy. Order a checkout that sends him out happy." },
          media: "retailR3_q1",
          steps: [
            { ar: "رحّب باختياره: «خيار موفّق»", en: "Acknowledge the choice: \"great pick\"" },
            { ar: "وجّهه للكاشير", en: "Guide him to the till" },
            { ar: "أكّد المنتج بهدوء", en: "Confirm the item calmly" },
            { ar: "غلّفه بعناية", en: "Pack it with care" },
            { ar: "ودّعه بحرارة", en: "Send him off warmly" }
          ],
          feedback: { ar: "🔥 سلس وإنساني! لاحظ إنك بدأت بتأكيد اختياره. هذي الجملة تشيل الشك اللي في راسه قبل ما يدفع.", en: "🔥 Smooth and human! Notice you started by validating his choice. That line kills the doubt in his head before he pays." }
        },
        {
          instruction: { ar: "زبون واقف ساكت، يطالع القطعة ويحرّك رجله. مو مقتنع، ومو رافض. رتّب حركتك.", en: "A customer stands silent, staring at the item, foot tapping. Not sold, not saying no. Order your move." },
          media: "retailR3_q2",
          steps: [
            { ar: "لاحظ التردد", en: "Notice the hesitation" },
            { ar: "وضّح الفايدة اللي تهمه هو", en: "Clarify the benefit he cares about" },
            { ar: "طمّنه على اختياره", en: "Reassure him on his choice" },
            { ar: "وجّهه بلطف: «أجهّزه لك؟»", en: "Guide gently: \"shall I get it ready?\"" }
          ],
          feedback: { ar: "💚 التردد مو رفض! هو طلب طمأنة بصيغة صمت. وضّح، طمّن، وجّه. بدون أي ضغط.", en: "💚 Hesitation isn't rejection! It's a request for reassurance in the form of silence. Clarify, reassure, guide. Zero pressure." }
        },
        {
          instruction: { ar: "آخر 30 ثانية بالكامل. رتّبها زي المحترفين.", en: "The full last 30 seconds. Order it like a pro." },
          media: "retailR3_q3",
          steps: [
            { ar: "رحّب فيه من جديد عند الكاشير", en: "Greet him again at the till" },
            { ar: "خلّك حاضر: ابتسامة وتواصل بصري", en: "Be present: smile and eye contact" },
            { ar: "اذكر مزايا أورا", en: "Mention Aura benefits" },
            { ar: "غلّف بعناية", en: "Pack with care" },
            { ar: "ودّعه ودعوة يرجع", en: "Farewell plus an invite back" }
          ],
          feedback: { ar: "⭐ هنا يضيع أغلب البيع! الكاشير مو محطة إجراءات، هو آخر مشهد بالفيلم. وأورا هي اللي ترجّعه.", en: "⭐ This is where most sales leak! The till isn't a process station, it's the final scene of the film. And Aura is what brings him back." }
        },
        {
          instruction: { ar: "زبون ماسك قطعتين، وحدة بكل يد، ويقارن من دقيقتين. رتّب تصرّفك.", en: "A customer holds two items, one in each hand, comparing for two minutes. Order your response." },
          media: "retailR3_q4",
          steps: [
            { ar: "لاحظ إنه يقارن", en: "Notice he's comparing" },
            { ar: "أعطه خيار: «أيهم تحس يناسبك أكثر؟»", en: "Offer a choice: \"which feels more like you?\"" },
            { ar: "طمّنه: «هذا من أكثرها طلب»", en: "Reassure: \"this one's a favourite here\"" },
            { ar: "وجّهه: «أجهّزه لك؟»", en: "Guide: \"shall I get it ready?\"" }
          ],
          feedback: { ar: "🎯 ذكي! ما اخترت له، خليته يختار. السؤال يحوّل الحيرة لقرار، والقرار له هو مو لك.", en: "🎯 Smart! You didn't choose for him, you let him choose. The question turns confusion into a decision, and it's his decision." }
        },
        {
          instruction: { ar: "من لحظة القرار لين يطلع من الباب. رتّب الرحلة كاملة.", en: "From the moment he decides to the moment he's out the door. Order the full journey." },
          media: "retailR3_q5",
          steps: [
            { ar: "الزبون قرر الشراء", en: "The customer decides to buy" },
            { ar: "رحّب باختياره: «خيار موفّق»", en: "Acknowledge the choice: \"great pick\"" },
            { ar: "اقترح إضافة وحدة طبيعية", en: "Suggest one natural add-on" },
            { ar: "أنهِ الدفع بسلاسة", en: "Complete payment smoothly" },
            { ar: "ودّعه بطاقة إيجابية", en: "Close with positive energy" }
          ],
          feedback: { ar: "🔥 إضافة وحدة. وحدة بس. الفرق بين «خدمة» و«إزعاج» هو الرقم 1.", en: "🔥 One add-on. Just one. The difference between service and annoyance is the number 1." }
        },
        {
          instruction: { ar: "زبون ياخذ عطر هدية من باث آند بودي ووركس. رتّب تجربة تخلّي الهدية تبدأ من عندك.", en: "A customer is buying a Bath & Body Works gift fragrance. Order an experience where the gift starts with you." },
          media: "retailR3_q6",
          steps: [
            { ar: "رحّب باختياره للهدية", en: "Acknowledge his gift choice" },
            { ar: "اقترح تغليف هدية أنيق", en: "Offer elegant gift wrapping" },
            { ar: "اذكر مزايا أورا", en: "Mention Aura benefits" },
            { ar: "غلّفها بعناية", en: "Pack it with care" },
            { ar: "ودّعه بحرارة", en: "Send him off warmly" }
          ],
          feedback: { ar: "💚 لاحظ: هو ما يشتري عطر، يشتري لحظة بيعطيها لأحد يحبه. التغليف مو خدمة، هو جزء من الهدية.", en: "💚 Notice: he isn't buying a fragrance, he's buying a moment he'll hand to someone he loves. Wrapping isn't a service, it's part of the gift." }
        },
        {
          instruction: { ar: "زبونة تسأل عن روتين بشرة بسيط في بوتس وتقول «ما أفهم بهالأشياء». رتّب توصيتك.", en: "A customer at Boots asks for a simple skincare routine and says \"I don't get this stuff\". Order your recommendation." },
          media: "retailR3_q7",
          steps: [
            { ar: "افهم نوع بشرتها أول", en: "Understand her skin type first" },
            { ar: "اقترح الغسول المناسب", en: "Suggest the right cleanser" },
            { ar: "أضف المرطّب كخطوة طبيعية", en: "Add the moisturizer as the natural next step" },
            { ar: "اختم بنصيحة استخدام بسيطة", en: "Finish with one simple usage tip" }
          ],
          feedback: { ar: "⭐ خطوة خطوة! لما تبسّط الروتين، تبيع الثقة قبل المنتج. وهي بترجع لك، لأنك ما ضيّعتيها بالمصطلحات.", en: "⭐ Step by step! Simplify the routine and you sell confidence before product. She'll come back, because you didn't lose her in jargon." }
        }
      ]
    },

    /* ---------- ROUND 4 · scenario — Rescue Mode ---------- */
    {
      id: "r4",
      mechanic: "scenario",
      title: { ar: "وضع الإنقاذ: أنقذ اللحظة", en: "Rescue Mode: Save the Moment" },
      intro: {
        ar: "كل زبون منزعج هو زبون وفي محتمل. الفرق؟ وش بتسوي بالدقيقة الجاية.\nالزبون يبي 3 أشياء: يُسمع، يُحترم، ويشوف فعل.\nمهمتك: اقرأ الموقف، واختر الحركة اللي تنقذها. الإجابات مو واضحة، فكّر زين.",
        en: "Every upset customer is a potential loyal one. The difference? What you do in the next 60 seconds.\nCustomers need 3 things: to be heard, respected, and to see action.\nYour mission: read the moment and pick the move that saves it. The answers aren't obvious. Think."
      },
      media: "retailR4_intro",
      questions: [
        {
          scenario: { ar: "الجمعة، الطابور طويل. زبونة انتظرت 12 دقيقة ووصلت لك وهي واضح إنها متضايقة ومستعجلة.", en: "Friday, long queue. A customer waited 12 minutes and reaches you visibly annoyed and in a hurry." },
          media: "retailR4_q1",
          options: [
            { ar: "أخلّص طلبها بأقصى سرعة وبدون كلام زايد عشان ما أعطّلها أكثر", en: "Serve her as fast as possible with no extra talk so I don't delay her more" },
            { ar: "أسمعها، أعتذر عن الانتظار، أخلّص بسرعة، وأشكرها على صبرها", en: "Hear her, apologize for the wait, serve fast, and thank her for waiting" },
            { ar: "أشرح لها إن يوم الجمعة دايم زحمة عشان تتفهم الوضع", en: "Explain that Fridays are always busy so she understands the situation" }
          ],
          correct: 1,
          feedback: { ar: "💚 السرعة وحدها ما تكفي! الاعتراف باللحظة («عذراً على الانتظار») هو اللي يهدّي، والشكر هو اللي يرجّعها. الشرح؟ يحس الزبون إنك تدافع عن نفسك.", en: "💚 Speed alone isn't enough! Acknowledging the moment is what calms her, and the thank-you is what brings her back. Explaining? It sounds like you're defending yourself." }
        },
        {
          scenario: { ar: "إتش آند إم. زبونة لقت الفستان اللي تبيه بالضبط، بس مقاسها مو موجود بالفرع.", en: "H&M. A customer found exactly the dress she wants, but her size isn't in this store." },
          media: "retailR4_q2",
          options: [
            { ar: "أقول لها المقاس خلص وأقترح عليها مقاس ثاني موجود", en: "Tell her it's out of stock and suggest another available size" },
            { ar: "أعتذر وأنصحها تتابع الموقع، ممكن يرجع", en: "Apologize and suggest she watch the website in case it returns" },
            { ar: "أعتذر، وأتحقق من فرع ثاني أو أونلاين، وأوفّر لها حل فعلي", en: "Apologize, check another branch or online, and give her a real solution" }
          ],
          correct: 2,
          feedback: { ar: "🎯 هذا الفرق! الاعتذار بدون حل = زبونة خسرناها بأدب. استعادة الخدمة تعني فعل، مو كلام حلو.", en: "🎯 That's the difference! An apology with no solution is a customer lost politely. Recovery means action, not nice words." }
        },
        {
          scenario: { ar: "زبون عند الكاشير: «السعر على الرف مكتوب 199، وأنت تقول 249؟»", en: "A customer at the till: \"The shelf says 199 and you're saying 249?\"" },
          media: "retailR4_q3",
          options: [
            { ar: "أتأكد بهدوء، وإذا فيه خطأ أصلحه وأشكره إنه نبّهنا", en: "Calmly verify, fix it if it's our error, and thank him for flagging it" },
            { ar: "أوضّح له إن السعر بالنظام هو المعتمد دايماً", en: "Explain that the system price is always the official one" },
            { ar: "أنادي المشرف وأخلّيه يتصرّف", en: "Call the supervisor and let them handle it" }
          ],
          correct: 0,
          feedback: { ar: "⭐ الهدوء + الحل العادل = ثقة. والشكر يحوّل «شكوى» إلى «خدمة». الهروب للمشرف يخلّي الزبون يحس إنك مو معه.", en: "⭐ Calm plus a fair fix equals trust. The thank-you turns a complaint into service. Passing it to a supervisor makes him feel you're not on his side." }
        },
        {
          scenario: { ar: "أنت مع زبون، وتحس بزبون ثاني واقف من دقيقة ينتظر ويتنهد. بدأ يضيق.", en: "You're with a customer, and you can feel another one waiting for a minute, sighing. He's losing patience." },
          media: "retailR4_q4",
          options: [
            { ar: "أخلّص مع اللي معي بسرعة عشان أوصل للثاني", en: "Rush the customer I'm with so I can get to the other one" },
            { ar: "أعتذر للثاني، أعطيه تواصل بصري، وأقول «معك بعد لحظة»", en: "Acknowledge him, give eye contact, and say \"I'll be with you in a moment\"" },
            { ar: "أكمّل مع اللي معي، حقه يخلص أول", en: "Continue with my customer, he has the right to finish first" }
          ],
          correct: 1,
          feedback: { ar: "🔥 3 ثواني تنقذ زبونين! لا استعجلت الأول ولا تجاهلت الثاني. جملة وحدة تخلّيه يحس مرئي، والانتظار يصير مقبول.", en: "🔥 Three seconds saves two customers! You didn't rush the first or ignore the second. One sentence makes him feel seen, and waiting becomes acceptable." }
        },
        {
          scenario: { ar: "زبون خلّص شراءه وهو مبسوط، وواقف عند الكاشير ينتظر الكيس.", en: "A customer finished his purchase happy, standing at the till waiting for his bag." },
          media: "retailR4_q5",
          options: [
            { ar: "أعطيه الكيس بابتسامة وأقول «تسلم»", en: "Hand him the bag with a smile and say \"thanks\"" },
            { ar: "أشكره بصدق، أعرّفه على أورا، وأدعوه يرجع", en: "Thank him sincerely, introduce Aura, and invite him back" },
            { ar: "أخلّص بسرعة عشان الطابور وراه", en: "Wrap up fast because of the queue behind him" }
          ],
          correct: 1,
          feedback: { ar: "💚 الابتسامة حلوة، بس ضاعت فرصة! هذي اللحظة اللي يتذكرها. شكر + أورا + دعوة ترجع = زبون دايم، مو عملية بيع.", en: "💚 The smile is nice, but you left value on the table! This is the moment he remembers. Thanks + Aura + an invite equals a regular, not a transaction." }
        },
        {
          scenario: { ar: "زبونة رجعت بعد يومين: «كزبونة الأساس اللي أخذته لونه ما ضبط معي أبداً».", en: "A customer returns two days later: \"The foundation I bought doesn't match me at all.\"" },
          media: "retailR4_q6",
          options: [
            { ar: "أشرح لها إن الدرجة تختلف بإضاءة المحل عن البيت", en: "Explain that shades look different in store lighting versus at home" },
            { ar: "أوجّهها لخدمة الزبائن عشان الاستبدال", en: "Direct her to customer service for the exchange" },
            { ar: "أعتذر، وأساعدها تلاقي الدرجة الصح، وأجرّبها على الفك مو اليد", en: "Apologize, help her find the right shade, and test it on the jaw not the hand" }
          ],
          correct: 2,
          feedback: { ar: "⭐ حل فعلي + معلومة تفيدها! الاختبار على الفك مو على اليد يمنع تتكرر الغلطة. علّمتيها شي، فصرتي مصدر ثقة مو بائعة.", en: "⭐ A real fix plus something useful! Testing on the jaw not the hand stops it happening again. You taught her something, so now you're a trusted source, not a salesperson." }
        },
        {
          scenario: { ar: "زبونة في ألتا بيوتي واقفة قدام التسترات، تبي تجرّب بس مترددة وتقول «ما أدري منو استخدمه قبلي».", en: "A customer at Ulta Beauty hovers over the testers, wanting to try but hesitant: \"I don't know who used this before me.\"" },
          media: "retailR4_q7",
          options: [
            { ar: "أطمّنها إن التسترات تتنظّف بشكل يومي", en: "Reassure her that the testers are cleaned daily" },
            { ar: "أطمّنها، وأوفّر لها عيّنة نظيفة أو أداة استخدام مرة وحدة", en: "Reassure her and offer a clean sample or a single-use applicator" },
            { ar: "أقترح عليها تشتري وتجرّب بالبيت وترجعه لو ما ضبط", en: "Suggest she buy it, try at home, and return it if it doesn't work" }
          ],
          correct: 1,
          feedback: { ar: "🎯 الكلام يطمّن، بس الفعل يبيع! أداة وحدة تشيل قلقها بالكامل وتخلّيها تجرّب. القلق اللي ما ينحل = بيع ما يصير.", en: "🎯 Words reassure, but action sells! One applicator removes her worry entirely and gets her trying. An unresolved worry equals an unmade sale." }
        }
      ]
    },

    /* ---------- ROUND 5 · rush (BONUS · Peak Season) ---------- */
    {
      id: "r5",
      mechanic: "rush",
      bonus: true,
      seconds: 8,
      title: { ar: "ذروة الموسم", en: "Peak Season Rush" },
      intro: {
        ar: "الجمعة البيضا. المحل مليان. الطابور طويل. والوقت يركض.\nقرارات خاطفة، 8 ثواني لكل وحدة. كل ما كنت أسرع وأصح، طاقتك ترتفع ⚡\nموسم الذروة مو ضغط. هو إثبات.",
        en: "Black Friday. The store is packed. The queue is long. The clock is running.\nSnap decisions, 8 seconds each. The faster and sharper you are, the higher your energy ⚡\nPeak isn't pressure. It's proof."
      },
      media: "retailR5_intro",
      questions: [
        { prompt: { ar: "بداية دوامك بموسم الذروة؟", en: "Your peak-season shift starts?" },
          media: "retailR5_q1",
          options: [ { ar: "أدخل بطاقة وثقة وابتسامة", en: "Walk in switched on, confident, smiling" }, { ar: "أدخل متوتر وراسي طايح", en: "Walk in tense and low" } ],
          correct: 0, feedback: { ar: "⚡ الطاقة اللي تجي فيها هي أول شي يحسه الزبون.", en: "⚡ The energy you bring is the first thing they feel." } },
        { prompt: { ar: "زميلك غرقان بالطابور وأنت فاضي ثانية؟", en: "Teammate is drowning at the till and you're free for a second?" },
          media: "retailR5_q2",
          options: [ { ar: "أنتظر لين يخلص، هذا قسمه", en: "Wait for him to finish, it's his station" }, { ar: "أفتح صندوق وأساعد فوراً", en: "Open a till and jump in now" } ],
          correct: 1, feedback: { ar: "🔥 نتحرك كفريق واحد. الزبون يحس الإيقاع.", en: "🔥 We move as one team. Customers feel the rhythm." } },
        { prompt: { ar: "زبون داخل والمحل زحمة؟", en: "A customer walks in and it's packed?" },
          media: "retailR5_q3",
          options: [ { ar: "تواصل بصري وابتسامة خلال 5 ثواني", en: "Eye contact and a smile within 5 seconds" }, { ar: "أكمل شغلي، بيشوف إني مشغول", en: "Keep working, he can see I'm busy" } ],
          correct: 0, feedback: { ar: "💚 أول 5 ثواني تقول له إنه بالمكان الصح.", en: "💚 The first 5 seconds tell him he's in the right place." } },
        { prompt: { ar: "الضغط طلع براسك بين زبونين؟", en: "Stress spikes between two customers?" },
          media: "retailR5_q4",
          options: [ { ar: "أكمل بنفس التوتر، الوقت ما يسمح", en: "Push on with the same tension, no time" }, { ar: "نفس، ابتسامة، وإعادة ضبط", en: "One breath, a smile, reset" } ],
          correct: 1, feedback: { ar: "⚡ نقود المشاعر، ما نتبعها.", en: "⚡ We lead emotions, we don't follow them." } },
        { prompt: { ar: "وقت الزحمة عند الكاشير؟", en: "Crunch time at the till?" },
          media: "retailR5_q5",
          options: [ { ar: "أغلّف وأنا أتكلم وأختم بشكر", en: "Bag while talking, finish with a thank-you" }, { ar: "أصير صامت وأستعجل", en: "Go silent and rush" } ],
          correct: 0, feedback: { ar: "🔥 نظيف وسريع وبطاقة. كل دفعة تأكّد القيمة.", en: "🔥 Clean, fast, energetic. Every checkout confirms the value." } },
        { prompt: { ar: "صار خطأ بسيط قدام الزبون؟", en: "A small slip in front of the customer?" },
          media: "retailR5_q6",
          options: [ { ar: "أتجاهله وأكمل بسرعة", en: "Ignore it and move on fast" }, { ar: "أعترف وأصلحه باللحظة", en: "Own it and fix it on the spot" } ],
          correct: 1, feedback: { ar: "⭐ نحوّل التوتر لنجاح بسرعة التصرّف.", en: "⭐ We turn stress into a win by acting fast." } },
        { prompt: { ar: "عندك منتج البطل بالموسم؟", en: "You've got the season's hero product?" },
          media: "retailR5_q7",
          options: [ { ar: "أعرفه بجملة وحدة واضحة وحماسية", en: "Know it in one clear, exciting line" }, { ar: "ما أذكره عشان أوفّر وقت", en: "Skip it to save time" } ],
          correct: 0, feedback: { ar: "💚 الفخر بالمنتج يبيع بشكل طبيعي.", en: "💚 Pride in the product sells by itself." } },
        { prompt: { ar: "زبونة حايرة بين عطرين والطابور وراها؟", en: "A customer is torn between two mists and there's a queue behind her?" },
          media: "retailR5_q9",
          options: [ { ar: "أخليها تقرر لحالها", en: "Let her decide on her own" }, { ar: "«منعش ولا دافئ؟» وأرشّح بسرعة", en: "\"Fresh or warm?\" then recommend fast" } ],
          correct: 1, feedback: { ar: "⚡ سؤال واحد يفك الحيرة بثانيتين.", en: "⚡ One question breaks the tie in two seconds." } },
        { prompt: { ar: "التستر خلص قدام الزبونة؟", en: "The tester runs out in front of her?" },
          media: "retailR5_q10",
          options: [ { ar: "أبدّله بسرعة وأكمل بابتسامة", en: "Swap it fast and carry on with a smile" }, { ar: "أعتذر وأقول ما فيه بديل حالياً", en: "Apologize and say there's no replacement right now" } ],
          correct: 0, feedback: { ar: "🔥 حل سريع يحافظ على التجربة.", en: "🔥 A fast fix protects the experience." } },
        { prompt: { ar: "ختام كل تفاعل بموسم الذروة؟", en: "Ending every peak-season interaction?" },
          media: "retailR5_q8",
          options: [ { ar: "أنهي بسرعة، الطابور طويل", en: "End fast, the queue is long" }, { ar: "فوز واحد، شكر واحد، وابتسامة", en: "One win, one thank-you, one smile" } ],
          correct: 1, feedback: { ar: "⭐ الطاقة تنتشر. ودّعهم وهم مبتسمين.", en: "⭐ Energy spreads. Send them out smiling." } }
      ]
    }

  ]
};

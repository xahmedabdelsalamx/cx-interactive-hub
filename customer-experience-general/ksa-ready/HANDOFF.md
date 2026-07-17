# KSA New-Hire Game — Project Handoff

**Purpose of this file:** paste it (or upload it) at the start of a new chat, together with `ksa-gamification.zip`, so work can continue with no loss of context.

**Owner:** Ahmed Abdelsalam — Customer Experience Hub team, Alshaya Group (ahmed.abdelsalam@alshaya.com)
**Last updated:** 17 July 2026 (Gen Z rewrite + Starbucks + mini-games)

---

## 1. What this is

A bilingual (Arabic default / English secondary) onboarding gamification web app for **~3,000 KSA new hires** across three divisions. Learners enter their details, pick a character, play 4 scored rounds + 1 bonus round, and earn a certificate badge.

- **Arabic = KSA Saudi Arabic** (natural, warm, light Khaleeji — not heavy slang, not stiff MSA).
- Built in **vanilla HTML/JS, no frameworks**. Hosted **GitHub → Azure Static Web Apps**.
- Expands an earlier project ("AURA PASS") used as the visual/architectural reference.

### The three divisions ("worlds")

| Division | Title | Colour | CX Hub learn URL |
|---|---|---|---|
| `retail` | The Art of Selling / فن البيع | `#e43c50` | `.../SitePageModern/228974/retail?channelId=230797` |
| `hospitality` | The Art of Guest Experience / فن تجربة الضيوف | `#f15a24` | `.../SitePageModern/229096/art-of-guest-experience-hospitality?channelId=238821` |
| `starbucks` | The Art of Connection / فن التواصل | `#006241` | `.../SitePageModern/229098/art-of-connection-starbucks?channelId=238822` |

(Base URL for all: `https://connectnow.alshaya.com/sites/customer-experience-hub`)
Entry/intake screen uses a vibrant **KSA green `#005430`**.

---

## 2. Current status (read this first)

| Area | Status |
|---|---|
| **Retail content** | ✅ Complete — 5 rounds, 38 questions, authored from 5 real PPT decks + beauty-brand questions |
| **Hospitality content** | ✅ Complete — 5 rounds, 28 questions (R1/R2/R5 from decks; **R3 & R4 authored by Claude**, no deck existed) |
| **Starbucks content** | ✅ Complete — 5 rounds, 28 questions, from the condensed master guide (6 modules) |
| **Mechanics** | ✅ ALL built: swipe, convo, match, order, scenario, speed, rush |
| **Mini-games** | ✅ 3 brain-break games between rounds (penalty, stack, quick), auto-themed per world, zero scoring impact |
| **Voice** | ✅ All 94 questions rewritten Gen Z immersive: micro-stories, brand-authentic, role-based (no personal names), Arabic has zero Latin characters |
| **Media (Lottie/PNG)** | ⚙️ All 80 slots wired to Lottie paths; **actual .json files not yet created** (graceful fallback showing) |
| **Character art** | ⚙️ Slots defined (4 male + 4 female per division); **PNGs not yet created** (fallback showing) |
| **Backend** | ⚙️ AppsScript written; **not deployed** — `CONFIG.scriptUrl` is empty, so the app runs offline-safe |
| **Copywriter review** | ⏳ `KSA_Game_Questions_Retail_Hospitality.docx` generated and sent; **edits not yet returned** |

---

## 3. Architecture

**One shared engine + pure-data division files.** `engine.js` renders a question by reading its `mechanic` field. `divisions/*.js` contain **zero logic** — only data. To add a division, write a data file; don't touch the engine (unless it needs a brand-new mechanic).

```
ksa-gamification/
  index.html            shell: ALL CSS, screens, one big white "window", footer, favicon
  engine.js             ALL logic (943 lines)
  lottie-player.js      vendored, never edited
  favicon.png           square CX Hub symbol (cropped from the logo)
  config/shared.js      CONFIG, BRANDS (30), footer, KSA green
  config/worlds.js      per-world theme/gradient/floaters/logos/learnUrl/characters
  media/media-config.js all 80 media slots (key → lottie/png/placeholder)
  divisions/retail.js   ✅ complete
  divisions/hospitality.js ✅ complete
  divisions/starbucks.js   ❌ does not exist yet (script tag commented out in index.html)
  AppsScript.gs         Google Sheets backend (not deployed)
  assets/logos/*.png    cx-hub-{color,white}, art-of-{selling,guest-experience,connection}-{color,white}, alshaya-group-{color,white}
  assets/characters/    EMPTY — user adds PNGs
  assets/images/        EMPTY — user adds PNGs
  assets/lottie/        EMPTY — user adds .json animations
  README.md, HANDOFF.md
```

### Flow
`init → buildIntake → enterWorld → buildCharacter → intro → playRound → showRoundIntro → beginRound → showResult`

- Main rounds are **navigable**: Previous/Next, no auto-advance, answers changeable, scored on Finish.
- `rush` branches to `runRush()` (timed, auto-advance, no back).
- `ADAPTERS` object holds per-mechanic `{ answered, correct, render }`.

---

## 4. Locked decisions (do not silently change)

- **Pass mark 80%**, unlimited retries until pass. Certified once passed (backend `doGet` pass-once check).
- **Bonus round scores EXTRA** — pass % = mean of **non-bonus** rounds only. Bonus stored in `state.bonus = {score, energy, streak}`.
- **Characters are cosmetic only** (avatar + entered name).
- **Gender selection on entry** (Male/Female, required) filters the character carousel to the matching set.
- Backgrounds are **darker animated gradients** (`bgshift`); buttons keep the lighter `--grad` + shine sweep.
- Logos: **white variants over coloured backgrounds, colour variants on white cards.**
- Everything lives inside a single big white **window**, with an in-window header (colour CX Hub logo + language toggle) and a footer attached beneath (CX Hub + Alshaya Group logos, © line, "Developed by Customer Experience team · 2026 · contact here").
- Media renders **above** the question text in every mechanic.
- Match & order give **2 trials**, then lock and reveal the correct answer + explanation.
- Order is **drag-and-drop** and the dragged card **physically follows the finger** (pointer events).

---

## 5. Language & style rules (strictly enforced)

1. **Retail: زبون / زبائن only. NEVER عميل / عملاء.** Hospitality may use ضيف / ضيوف.
2. **Western/ASCII digits everywhere, even inside Arabic** (7 not ٧, 93% not ٩٣٪).
3. **No em dash "—"** in any `ar` or `en` text. Use a comma (`،` Arabic, `,` English) or rephrase.
4. Prompts stay mobile-short (1–2 lines).
5. Content is **grounded in the source decks**. Independently authored content must be flagged.

Validate before every delivery:
```bash
node --check engine.js divisions/*.js config/*.js media/media-config.js   # syntax
grep -rn "عميل\|عملاء" divisions/                                          # must be empty
python3 -c "…"  # no Arabic-Indic digits, no em dash inside ar/en fields
```

---

## 6. Data contracts (engine adapter field names)

Round object:
```js
{ id, mechanic, [bonus:true, seconds:8], title:{ar,en}, intro:{ar,en}, media:"<key>", questions:[…] }
```
Division object:
```js
window.DIVISION_<id> = { id, world, logo:"assets/logos/…-color.png", title:{ar,en}, rounds:[…] }
```

| Mechanic | Question shape | Scoring |
|---|---|---|
| `swipe` | `{prompt:{ar,en}, media, isOpportunity:bool, feedback:{ar,en}}` | right = opportunity |
| `convo` | `{guest:{ar,en}, media, replies:[{ar,en}×3], correct:idx, feedback}` | pick best reply |
| `scenario` | `{scenario:{ar,en}, media, options:[{ar,en}×3], correct:idx, feedback}` | pick best action |
| `match` | `{instruction:{ar,en}, media, pairs:[{left:{ar,en},right:{ar,en}}×4], feedback}` | **pairs listed in CORRECT order**; engine shuffles rights. Saved: `{assign,tries,locked,ok}` |
| `order` | `{instruction:{ar,en}, media, steps:[{ar,en}×4-5]}` + `feedback` | **steps listed in CORRECT order**; engine shuffles. Saved: `{order,tries,locked,ok}` |
| `rush` | `{prompt:{ar,en}, media, options:[{ar,en}×2], correct:idx, feedback}` | timed, 2 options only |
| `speed` | **NOT BUILT** — planned true/false quick-fire for Starbucks R3 | — |

---

## 7. Round mapping (one mechanic per round)

| Round | Retail | Hospitality | Starbucks (planned) |
|---|---|---|---|
| R1 | swipe — First Impression & Discovery | convo — Warm Welcome & Curated Conversations | swipe — Warm Welcome & Power of Connection |
| R2 | match — Storytelling & Recommendation | match — Culinary Storytelling & Pairings | match — Selling Starbucks Products |
| R3 | order — Closing & Seamless Checkout | order — Memorable Moments & Farewell | **speed** — Sampling, Hand-Off & Speed of Service |
| R4 | scenario — Loyalty & Service Recovery | scenario — Genuine Gratitude & Recovery | scenario — Power of Loyalty & Recovery |
| R5 | rush (bonus) — Peak Season | rush (bonus) — Peak Service | rush (bonus) — Peak Service |

**Current counts:** Retail 7/7/7/7/10 = 38 · Hospitality 5/5/5/5/8 = 28 (Retail is larger because beauty-brand questions were added).

### Key source-deck concepts baked into content
- **Retail:** 7-second first impression; 55/38/7 (93% non-verbal); Notice→Ask→Guide; "Busy is normal, Cold is a choice"; features→feelings; "Say less, help more"; CLARIFY→CONNECT→COMPLETE; hesitation = opportunity, rejection = decision; "Own the Last 30 Seconds"; **Aura** loyalty; SEE→OWN→RESTORE→INVITE; "Peak is not pressure, it's proof."
- **Hospitality:** first 7 seconds; guests remember how they felt; 3 conversation styles = **Explorer / Confirmer / Elevator**; storytelling = name→sensory→special→invite; pairings = Look→Match→Suggest; helpful vs pushy; "the farewell is the last taste of the brand"; "every goodbye starts the next visit"; warm tone first, action second; "Peak doesn't break great teams, it reveals them."
- **Beauty brands** (Retail): Bath & Body Works, Charlotte Tilbury, Ulta Beauty — mist/lotion pairing, lipstick, foundation shade recovery, tester hygiene, skincare routine.

---

## 8. Media system

**One file controls everything: `media/media-config.js`.** Questions reference a key; never hardcode paths in division files.

```js
retailR1_q1: { type:"lottie", src:"assets/lottie/retailR1_q1.json" },   // current default for all 80 slots
retailR1_q1: { type:"png",    src:"assets/images/retailR1_q1.png" },    // alternative
retailR1_q1: { type:"placeholder", label:{en:"…",ar:"…"} },             // shows a labelled grey box
```

**Convention:** every slot points at `assets/lottie/<same-key-name>.json`. So the user just drops `retailR1_q1.json` into `assets/lottie/` and it appears — **no config editing needed**. If a file is missing, the renderer falls back to the labelled placeholder box (never broken/empty).

**Slot names:** `<div>R<n>_intro` and `<div>R<n>_q<n>` where `<div>` is `retail` or `hosp`.
- Retail: R1 q1–q7, R2 q1–q7, R3 q1–q7, R4 q1–q7, R5 q1–q10 (+5 intros)
- Hospitality: R1–R4 q1–q5 each, R5 q1–q8 (+5 intros)
- Plus `ksaFlag` (entry screen) and three unused legacy keys (`retailIntro`, `hospIntro`, `sbuxIntro`).

**Display sizes:**

| Context | Box | Recommended source |
|---|---|---|
| Round intro (`*_intro`) | 172 × 172 | ~344 × 344 |
| Swipe cards (Retail R1) | 150 × 140 | ~300 × 280 |
| All other questions | 128 × 128 | ~256 × 256 |
| `ksaFlag` | Lottie 140 × 92, PNG 74px tall | ~300 × 200 |

Images are **contained** (never cropped), so aspect ratio is forgiving. PNGs should have transparent backgrounds.

---

## 9. Character art

4 male + 4 female per division. Gender chosen at entry filters the set.

| Division | Male | Female |
|---|---|---|
| Retail | `retail-male-1…4.png` | `retail-female-1…4.png` |
| Hospitality | `hosp-male-1…4.png` | `hosp-female-1…4.png` |
| Starbucks | `sbux-male-1…4.png` | `sbux-female-1…4.png` |

All in `assets/characters/`. **Transparent PNG, portrait, ~600–900px tall, face near the top** (the selection screen shows a large circle, cover-cropped from the top; the question screens show a small circular avatar chip). Missing files fall back to a coloured circle with the world emoji.

---

## 10. Backend (Google Sheets via Apps Script)

`AppsScript.gs`, `SECRET_TOKEN = "CXHUBKSA"`.

**Scores headers:** Timestamp, Division, Brand, EmpID, Name, **Gender**, Character, Round1%–Round4%, **Bonus%**, **Energy**, Total%, Passed, Lang, ClientTime. Plus a Feedback tab. `doGet?action=check` does the pass-once check.

**⏳ PENDING (user action):** run `setup()`, deploy as a web app, paste the `/exec` URL into `CONFIG.scriptUrl` in `config/shared.js`. Until then `scriptUrl` is empty and the app is offline-safe (the "تم حفظ نتيجتك" note only shows when the backend confirms).

---

## 11. Brands (30, in `config/shared.js`)

**Retail (22):** American Eagle, Foot Locker, Victoria's Secret, H&M, Bath & Body Works, Primark, Charlotte Tilbury, & Other Stories, Boots, Claire's, COS, Disney Store, Jo Malone London, MAC, Mothercare, MUJI, New Balance, Next, NYX, The Body Shop, Ulta Beauty, **Milano** ⚠️
**Hospitality (7):** The Cheesecake Factory, P.F. Chang's, Pinkberry, Asha's, Chipotle, Raising Cane's, Shake Shack
**Starbucks (1):** Starbucks

⚠️ **Open question:** Milano is currently mapped to retail — confirm it isn't hospitality.

---

## 12. Working conventions

- **After every change:** re-zip the whole folder to `/mnt/user-data/outputs/ksa-gamification.zip`, present it, and list changed files with ✏️ markers ("Files changed this update").
- **Validate before delivering:** `node --check` all JS; confirm no عميل/عملاء; confirm every media key referenced by a division exists in `media-config.js`.
- User tests on **real devices** and sends screenshots; expect UX iteration.
- User preference: **always use the most appropriate custom skill** (brainstorming / writing-plans / pptx / docx).
- Reusable ChatGPT question-authoring prompt lives at `/mnt/user-data/outputs/question-authoring-prompt.md` — PPTX-aware, schema-locked, includes the bonus round and the digit/dash rules.

---

## 13. Next steps / open items

1. **Starbucks division** — awaiting 5 decks (4 main + 1 peak). Requires building the **`speed`** mechanic (R3), then `divisions/starbucks.js` + media keys + enabling the script tag in `index.html`.
2. **Copywriter edits** — `KSA_Game_Questions_Retail_Hospitality.docx` is out for review. When returned (edited .docx or a list of "Division → Round → Q# → field → new text"), fold changes into `divisions/*.js`.
3. **Assets** — Lottie `.json` files into `assets/lottie/`, character PNGs into `assets/characters/`, optional `ksaFlag` file.
4. **Backend deploy** — run `setup()`, deploy, paste `/exec` URL into `CONFIG.scriptUrl`.
5. **Confirm Milano's division.**
6. Optional: expand Hospitality from 5 → 7 questions per main round to match Retail's depth.
7. Optional: delete the 3 unused legacy media keys (`retailIntro`, `hospIntro`, `sbuxIntro`).

---

## 14. How to resume in a new chat

Upload **`ksa-gamification.zip`** + **this `HANDOFF.md`**, then say what you want next. Claude should unzip to `/mnt/user-data/outputs/ksa-gamification/`, read this file, and continue — respecting sections 4 (locked decisions), 5 (language rules), 6 (data contracts), and 12 (working conventions).

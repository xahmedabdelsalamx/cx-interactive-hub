# KSA New-Hire Game — Project Handoff

**Purpose of this file:** paste it (or upload it) at the start of a new chat, together with `ksa-gamification.zip`, so work can continue with no loss of context.

**Owner:** Ahmed Abdelsalam — Customer Experience Hub team, Alshaya Group (ahmed.abdelsalam@alshaya.com)
**Last updated:** 22 July 2026 (review round 3 applied — LAUNCH CANDIDATE. 50 brands, brand-code directory, two true/false answer-key bugs fixed)

> **Content review status:** TWO review rounds actioned (22 July). Round 1 fixed factual/policy/Arabic errors. Round 2 fixed: ~25 distractors rewritten from "obviously careless" to "plausible but incomplete"; exaggerated claims softened (no more "you know everything", "saved a customer for life", "a discount buys silence"); RET-R1-Q7 and SBX-R1-Q5 ambiguity resolved; RET-R3-Q4 sequence made logical; SBX-R2-Q2 pairings given unique context; SBX-R3 true/false made nuanced; HOS-R4-Q4 Pinkberry moved to the counter (Aura before payment); Arabic polish pass.
> **Round 3 (final):** fixed TWO LAUNCH BLOCKERS — SBX-R3-Q2 and Q5 had `isTrue: true` while their feedback taught the opposite (caused by replacing statement text in round 2 without flipping the answer key). SBX-R3-Q4 replaced (duplicated Q2) and the round rebalanced to 2 true / 3 false so the pattern isn't guessable. Also: RET-R5-Q5 now tests acknowledgement vs silence; RET-R5-Q9 no longer assumes a spare tester exists; HOS-R3-Q1/Q4 step order made causal; remaining absolute claims softened ("can", "often", "helps"); final Arabic polish.
> **Still open:** order-round repetition (RET-R3 five similar checkout questions, HOS-R3 similar farewells) — needs 2-3 questions REPLACED with genuinely different moments, not reworded. Bonus rounds still share a pattern across divisions. Both are content-authoring jobs best done after piloting.
>
> ⚠ **LESSON: when changing a true/false statement, ALWAYS re-check `isTrue`.** Swapping the text without flipping the key silently inverts the answer and the game then punishes the correct behaviour.

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
| **Mechanics** | ✅ ALL built: swipe, convo, match (Rapid Match), order, scenario, speed, rush |
| **Mini-games** | ✅ 3 brain-break games between rounds (penalty, stack, quick), auto-themed per world, zero scoring impact. **4-per-world plan still pending user go/no-go.** |
| **Voice** | ✅ All 94 questions Gen Z immersive: micro-stories, brand-authentic, role-based (no personal names), Arabic zero Latin, answer positions varied |
| **Result screen** | ✅ Trophy on pass, feedback form on BOTH pass & fail, world-coloured confetti, share line, **downloadable badge PNG** |
| **Returning players** | ✅ On Emp-ID entry, `action=history` fetches their best/last score + attempts → "welcome back" panel with progress + encouraging message. Unlimited replays. |
| **Mini-game intros** | ✅ Each brain-break now opens with an intro screen (emoji, name, "cool down" line, how-to-play, "no score impact", Let's play / Skip) so players aren't dropped in cold. |
| **Live dashboard** | ✅ `dashboard.html` — play-based only now: exec summary, KPIs, per-world pass-rate donuts, round-difficulty bars, activity sparkline, language split, brands, feedback. No roster/store (those live in completion-report.html). No chart library. |
| **Backend** | ✅ LIVE, and **privacy-redesigned**: the sheet now stores ONLY game data (EmpID, name, brand, division, gender, scores, feedback). **No active list, no HR export.** Tabs: Scores, Feedback, Summary, _Agg. |
| **Completion reporting** | ✅ Moved OFFLINE to `completion-report.html` — runs 100% in the browser on Ahmed's machine. Active list is dropped in locally, joined to results, never uploaded. |
| **Preview shortcut** | ✅ `?preview=pass` / `?preview=fail` (+ `&world=` `&lang=` `&gender=`) jumps to result screen; never writes to backend |
| **Media (Lottie/PNG)** | ⚙️ All 113 slots wired to Lottie paths; **actual .json files not yet created** (graceful fallback showing) |
| **Character art** | ⚙️ Slots defined (4 male + 4 female per division); **PNGs not yet created** (fallback showing) |
| **Copywriter review** | ⏳ `KSA_Game_Questions_Review.docx` regenerated (all options shown, stable IDs); **edits not yet returned** |

### Known open decisions (awaiting user)
- **4 mini-games per world** (Bag Drop / Burger Stack / Cup Stack + Tag Pop / Order Up / Bean Catch) — proposed, not built.
- **Exclude "Support" staff** (1,013 non-store rows) from completion denominator — one-line filter, not yet applied.
- **New-joiner filter:** roster is all 7,086 KSA staff, so completion % looks low. If a hire-date column is ever added, filter the denominator.

---

## 3. Architecture

**One shared engine + pure-data division files.** `engine.js` renders a question by reading its `mechanic` field. `divisions/*.js` contain **zero logic** — only data. To add a division, write a data file; don't touch the engine (unless it needs a brand-new mechanic).

```
ksa-gamification/
  index.html            shell: ALL CSS, screens, one big white "window", footer, favicon
  engine.js             ALL logic
  minigames.js          3 brain-break games (penalty, stack, quick) + emoji/how-to metadata
  lottie-player.js      vendored, never edited
  xlsx.min.js           vendored SheetJS — used ONLY by completion-report.html (no CDN)
  favicon.png           square CX Hub symbol (cropped from the logo)
  config/shared.js      CONFIG (scriptUrl LIVE, secretToken), BRANDS (30), footer, KSA green
  config/worlds.js      per-world theme/gradient/floaters/logos/learnUrl/characters (gender-split)
  media/media-config.js all 113 media slots (key → lottie, with graceful fallback)
  divisions/retail.js       ✅ complete (38 Q)
  divisions/hospitality.js  ✅ complete (28 Q)
  divisions/starbucks.js    ✅ complete (28 Q)
  AppsScript.gs         Google Sheets backend — DEPLOYED. Game data only, no HR data.
  dashboard.html        live management dashboard (play-based). Reads action=stats.
  assets/logos/*.png    cx-hub-{color,white}, art-of-{selling,guest-experience,connection}-{color,white}, alshaya-group-{color,white}
  assets/characters/    EMPTY — user adds PNGs
  assets/images/        EMPTY — user adds PNGs
  assets/lottie/        EMPTY — user adds .json animations
  README.md, HANDOFF.md
```

**Deployment note:** `index.html` + game files go to GitHub → Azure. `dashboard.html` is for management (hosted or local).

**The completion report now ships as a SEPARATE project** at `/mnt/user-data/outputs/completion-report/` (its own folder: `index.html`, `config.js`, `xlsx.min.js`, `README.md`, assets). Ahmed uploads it to his **own private GitHub**, never to the company Azure. It is self-contained and shares nothing with the game folder except the Apps Script URL + token, which are duplicated in its `config.js` (keep both in sync if the script is ever redeployed).

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

| Round | Retail | Hospitality | Starbucks |
|---|---|---|---|
| R1 | swipe — Radar Mode | convo — Welcome Mode | swipe — Connection Radar |
| R2 | match (Rapid Match) — Story Mode | match (Rapid Match) — Menu Storyteller | match (Rapid Match) — Recommendation Engine |
| R3 | order — The Last 30 Seconds | order — Memory Makers & Farewell | **speed** — Rapid Truth (sampling/hand-off) |
| R4 | scenario — Rescue Mode | scenario — The Restaurant Promise | scenario — Make It Right |
| R5 | rush (bonus) — Peak Season | rush (bonus) — Peak Service | rush (bonus) — Peak Service |

**Current counts:** Retail 7/7/7/7/10 = 38 · Hospitality 5/5/5/5/8 = 28 · Starbucks 5/5/5/5/8 = 28. **Total 94.** (Retail is larger because beauty-brand questions were added.)

**Match = Rapid Match:** one left item on a coloured card, tap the correct right from 3 options (distractors pulled from other pairs in the same question), instant feedback, end-of-question ✓/✗ summary. Replaced the heavy 8-chip grid (was ~63 taps in Retail → now 28). Same data shape (`pairs` still in correct order).
**Order = drag-and-drop, always exactly 4 steps** (24 arrangements — 3 was too easy, 5 frustrating). Dragged card physically follows the finger via pointer events.
**Feedback differentiates right vs wrong:** correct → praise + lesson; wrong → rotating hard-luck opener + "the right move was: X" + lesson (never the praise). Applied at all 3 render points (navigable rounds, rush incl. timeout, speed).

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

## 10. Backend, dashboard & offline reporting

### Privacy model (IMPORTANT — this drove a redesign on 19 July)
The company active list is HR personal data (30,173 rows: employee names, numbers, **line manager names**, job titles, store locations). Storing it on a personal Google Drive is a governance risk. So:

- **The Google Sheet holds game data ONLY**: EmpID, Name, Brand, Division, Gender, round scores, total, passed, lang, feedback. Nothing else. No ActiveList tab, no roster, no HR export.
- **Completion vs the active list is produced OFFLINE** in `completion-report.html`, which runs entirely in the browser on Ahmed's own machine. The list is never uploaded, never saved, gone when the tab closes.

### `AppsScript.gs` (deployed, `SECRET_TOKEN = "CXHUBKSA"`)
Tabs: `Scores`, `Feedback`, `Summary` (play-based rollup), `_Agg` (hidden, best score per player), **`Roster` (OPTIONAL)**.

**`Roster` tab (optional sign-in convenience):** paste ONLY `EmpID | Name | Brand | Market`, KSA rows only. On Emp-ID blur the game calls `action=lookup` and prefills the name + auto-selects the brand so the player can hit Start immediately. **Name is optional** — paste `EmpID | (blank) | Brand | Market` to hold no names at all and still get brand auto-select. Empty tab = game asks for everything, as before. Never blocks. Brand matching resolves the company's 3-letter codes via `window.BRAND_CODES` in `config/shared.js` (58 codes, e.g. STA→Starbucks, HEN→H&M, BAT→Bath & Body Works, ULT→Ulta Beauty), then falls back to English/Arabic name matching. Codes flagged `internal:true` (APP, WEL, HOS, FNB, LEW, ATE) are divisions/support units — they resolve to a readable name but do NOT auto-pick a world, so the player chooses.
Actions: `doGet ?action=check` (pass-once) · `?action=history` (returning player best/last/attempts → welcome-back panel) · `?action=stats` (dashboard JSON incl. feedback distribution + up to 120 recent comments, 1-min cache) · `?action=export` (row-level game data **and feedback** for the offline report). `doPost action=score / action=feedback`.

**Pagination:** every growing list is paged, never infinite-scrolled. Dashboard: feedback 6/page, brands 10/page. Completion report: stores 25/page, unmatched 12/page, feedback 8/page. Both files share a small `paginate({items, perPage, pager, render})` helper.

### `dashboard.html` — live, play-based
Exec summary, KPI row (unique / attempts / repetition / certified / not-yet-passed / avg score), per-world **pass-rate** donuts, round-difficulty bars, activity sparkline, language split, top brands, latest feedback. CSS/SVG only, no chart library.

### `completion-report.html` — offline completion vs the active list
Runs from the local folder (double-click). Vendored `xlsx.min.js` (no CDN) reads .xlsx/.csv.
1. Drop the active list → parsed in-browser, filtered to Market = Saudi, Division mapped to the 3 art worlds (Apparel + Wellness + H&M + Primark → retail; Hospitality Division → hospitality; Starbucks → starbucks).
2. Click the results panel → fetches game rows from `action=export` (or drop an exported Scores CSV if offline).
3. Joins locally on normalised Emp ID and shows: exec summary, KPIs (roster / played / certified / attempts), per-world donuts, **completion by store with live search**, by company division, unmatched players, top brands.
4. **Download full report (CSV)** for sharing.
Verified against the real 7,086-row KSA roster (retail 1,841 / hospitality 1,843 / starbucks 3,402).

### How replays count (unlimited replays allowed)
Every play appends ONE row to `Scores`. Reporting de-duplicates by Emp ID: **unique players** = distinct IDs; **attempts** = raw rows (the repetition figure); **certified** = an ID counts once, so retries can only improve status, never double-count.

### Preview shortcut
`index.html?preview=pass` / `?preview=fail` (+ `&world=` `&lang=` `&gender=` `&name=`). Jumps to the result screen with sample data. Sets `state.preview=true`, which guards `post()` so preview **never writes to the backend**.

## 11. Brands (50, in `config/shared.js`)

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

## 12b. Hard-won gotchas (do not repeat these)

1. **NEVER bulk find/replace Arabic substrings.** Removing personal names with a blind `ريم → زبونة` replace silently corrupted `كريم` (cream) into `كزبونة` in 3 places. It survived weeks and was caught by an external reviewer, not by validation. If a replace is unavoidable, anchor on word boundaries and diff the output.
2. **Adapters must not render their own feedback panel.** The round's `draw()` already creates one and calls `showFb()`. The `speed` adapter created a second `.fb` div, so the explanation appeared twice on screen. Any new mechanic must rely on the round's `fb`.
3. **Bidi isolation matters.** Names, brands, comments and question text carry `unicode-bidi:isolate` so an Arabic name inside an English UI (or vice versa) does not drag digits/punctuation to the wrong side. All CSS is logical (`text-align:start`, `inset-inline-*`) — never introduce `left:`/`right:`/`margin-left` etc.
4. **Loyalty (Aura) timing is a recurring content trap.** Points must be offered BEFORE payment. Two questions shipped with scenarios where the customer had already paid but the correct answer said "collect points before payment". Check any new loyalty question against its own timeline.
5. **Policy-sensitive content needs Ops/Brand sign-off** — returns/exchanges (especially opened cosmetics), price overrides, testers, giveaways, product performance claims. Do not assert what the company may not permit.
6. **True/false answer keys**: changing a `statement` without re-checking `isTrue` inverts the answer. Two questions shipped this way in review round 2 and had to be caught by an external reviewer. After any speed-mechanic edit, assert that the feedback text agrees with `isTrue`.
7. **Validate after every content edit**: `node --check` all JS; zero Latin inside `ar:` fields; zero Arabic-Indic digits; no em dashes; retail/starbucks have no `عميل/عملاء`; hospitality has no `زبون/زبائن`; all media keys resolve.

## 13. Next steps / open items

**Content review follow-ups (NOT yet done — need your call):**
0a. **Distractor realism** — reviewer is right that many wrong options are obviously careless ("ignore it, maybe they won't notice"). Should be "reasonable but incomplete" instead. Affects ~20-25 questions.
0b. **Difficulty balance** — currently ~80-85% easy; target 55% easy / 35% medium / 10% stretch.
0c. **HOS-R3 repetition** — Q1/Q3/Q4/Q5 all teach thank + invite + farewell. Replace 2-3 with different closing moments.
0d. **Bonus-round differentiation** — the 3 divisions' R5 use near-identical patterns; make them division-specific.
0e. **SBX-R3 True/False too obvious** — add nuanced statements.
0f. **Ops/Brand sign-off** required on any question touching returns, price overrides, testers, loyalty timing, product claims.

**Awaiting user decision:**
1. **4 mini-games per world** (Bag Drop / Burger Stack / Cup Stack + unique Tag Pop / Order Up / Bean Catch) — proposed, not built. Currently 3 games rotate.
2. **Exclude "Support" staff** (1,013 non-store rows) from the completion denominator — would now be a filter inside `completion-report.html`, not the sheet.
3. **Confirm Milano's division** (currently mapped to retail).

**Awaiting external input:**
4. **Copywriter edits** — `KSA_Game_Questions_Review.docx` is out for review (all options shown, stable IDs like `RET-R1-Q3`). When returned, fold changes into `divisions/*.js` by matching IDs.
5. **Assets** — Lottie `.json` into `assets/lottie/`, character PNGs into `assets/characters/` (`<div>-male-1..4.png` / `<div>-female-1..4.png`), optional `ksaFlag` file.

**Operations (recurring):**
6. **To report completion:** open `completion-report.html` locally → drop the current active list → fetch results → download CSV. **Never paste the active list into the Google Sheet.**
7. If backend *code* changes: **Deploy → Manage deployments → Edit → New version**.
8. **New-joiner filter:** roster = all 7,086 KSA staff, so completion % reads low. If a hire-date/new-joiner column appears in the export, filter the denominator in `completion-report.html`.

**Optional polish:**
9. Expand Hospitality/Starbucks main rounds from 5 → 7 questions to match Retail's depth.
10. Delete 3 unused legacy media keys (`retailIntro`, `hospIntro`, `sbuxIntro`).

**Recently completed (so a new chat doesn't redo them):** Gen Z rewrite of all 94 Qs · Starbucks + `speed` mechanic · Rapid Match (replaced heavy grid) · order rounds trimmed to 4 steps · 3 mini-games wired between rounds + intro screens · differentiated right/wrong feedback · trophy + feedback-on-both + confetti + downloadable badge PNG · preview shortcut · welcome-back panel for returning players (`action=history`) · live play-based dashboard · **privacy redesign: active list removed from Google Sheets, offline `completion-report.html` built** · bug fixes (phantom "1" in Summary via `COUNTUNIQUEIFS`; empty ClientTime column now sent).

---

## 14. How to resume in a new chat

Upload **`ksa-gamification.zip`** + **this `HANDOFF.md`**, then say what you want next. Claude should unzip to `/mnt/user-data/outputs/ksa-gamification/`, read this file, and continue — respecting sections 4 (locked decisions), 5 (language rules), 6 (data contracts), and 12 (working conventions).

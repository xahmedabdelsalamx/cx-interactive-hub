# CX Interactive Hub — Project State (read me first)

Single source of truth for this project. If you are resuming in a **fresh AI chat**, attach the
project zip and paste the **Resume prompt** at the bottom — this file plus the zip reconstructs
everything without losing detail.

Owner: Ahmed (Customer Experience team, Alshaya Group).

---

## 1. What it is
A gamified, **bilingual (EN/AR + full RTL)** learning platform for Alshaya customer-experience
staff across **Retail, Hospitality and Starbucks**. Plain static site (HTML/CSS/JS), hosted on
**GitHub Pages** today, with a planned move to **Azure Static Web Apps + Microsoft Entra SSO**.
Ahmed hand-applies changes to the live site.

## 2. Core model
- **One entry gate** captures **Employee ID · Full name · Brand · Market** (no gender/character).
  Brand routes the player to their **division journey** (Foot Locker → retail, Raising Cane's →
  hospitality, Starbucks → starbucks). Each person belongs to exactly one division.
- **Journeys** = the three division worlds, each a vertical trail of levels (games).
- **General projects** (AURA Pass, KSA Ready…) are **standalone**: own entry screens, own Google
  Sheet + Apps Script. The hub only links to them, filtered by the player's market.
  ⚠ **`customer-experience-general/` is maintained separately by Ahmed and is deliberately
  EXCLUDED from packaged zips.** Never overwrite it; unzip *over* the existing folder.
  `config.GENERAL` still lists the projects, so the folder must stay on the live site.
- Identity is captured **once**; games only ever read it. That is what makes SSO a drop-in later.

## 3. Entry gate behaviour (current)
Field order is **Employee ID first** (auto-focused), then Full name, Brand, Market — because the
ID drives the auto-fill of everything below it.

- **Input rules**: name strips digits as they type; Employee ID strips non-digits and uses the
  numeric keypad on mobile (`inputmode="numeric"`); placeholder `e.g. 323999`.
- **Roster lookup**: typing an ID fires a **debounced (350 ms)** `action=lookup` call over JSONP.
  On a hit it fills name, brand and market and shows a green "Found you, {name} — details filled in."
- **Name box locks** (greyed, shimmering) while the lookup runs, so nobody types over the answer;
  it unlocks on any outcome — found, miss, or failure.
- **Changing the ID replaces the previous person's details.** The gate remembers which values it
  auto-filled (`lk.autoName/autoBrand/autoMarket`); when the ID changes, those are cleared. Values
  the person typed themselves are never overwritten or cleared.
- **A miss never blocks**: "We couldn't find that ID — just fill in your details below."
- **A failed call is visible** ("Couldn't reach the directory…") and clears the guard so retyping
  retries. Never triggered on `blur`.
- Console diagnostic: **`CXHub.testLookup("100086")`** prints the URL called, the raw answer, and
  what each failure mode means.

## 4. Roster (sign-in convenience)
- Optional **`Roster`** tab in the journeys Sheet: **`EmpID | Name | Brand | Market`** — nothing
  else. That is the deliberate privacy ceiling. The full HR active list (payroll name, line
  manager, position, job, store, org type) **never goes to the cloud**.
- Source: `FilteredActiveList_P6_Full.xlsx` → extract `Roster_AllMarkets.csv` (**30,173 rows, all
  markets, all divisions**). Verified: 0 duplicate IDs, 0 blanks. IDs are 5–6 digits.
- The HR list stores **3-letter brand codes** (STA, HEN, BAT…). The extract already resolves the
  **21 hub brands** to canonical English names (~**87%** of staff); the rest keep their code and
  the person simply picks their brand manually. `brand-codes.js` holds the code directory.
- Markets normalised to hub naming (`UAE`→United Arab Emirates, `Saudi`→Saudi Arabia).
  **Morocco (129 staff) exists in HR but is NOT in the hub's 9 markets** — add it to config or
  those people pick their market by hand.
- Leave the Roster tab empty and the gate behaves exactly as before.
- ⚠ **Never commit the roster file to the repo / hosted site.** Sheet only.

## 5. Where things live
```
index.html                      shell: topbar (logo = internal Home), #app, modal, footer (logo -> CX Hub site)
assets/js/config.js             ★ EDIT THIS: SSO flag, LINKS, CERT messages, worlds (+hubUrl), levels,
                                  brands, markets, general games, ranks/badges, icons
assets/js/app.js                engine: gate + roster lookup, routing, world map, ranks, certificate,
                                  welcome popup, modal, hydrate, sign-out
assets/js/cxhub-sync.js         ★ journeys backend bridge — holds scriptUrl + secretToken
assets/css/styles.css           all styling + animated backgrounds
assets/logos|icons|worlds|badges|lottie/   media (official CX Hub / Art-of / Alshaya logos live here)
backend/AppsScript.gs           journeys Google Apps Script (paste into the Sheet)
backend/README.md               backend setup steps
GAME_BUILDER_PROMPT.md          paste into a new chat to build a journey game
PROJECT_STATE.md                this file
sync-test.html                  open on the live site to verify the Sheet round-trip
<world-folder>/<level-id>/index.html    each journey game (17 placeholders scaffolded)
```
World folders: retail → `art-of-selling-retail` (9 levels), hospitality → `art-of-guest-experience`
(4), starbucks → `art-of-connection` (4), general → `customer-experience-general` (excluded).

## 6. Storage contract (shared localStorage, same origin)
- `cxhub_profile`  = `{ eid, name, market }`
- `cxhub_brands`   = `{ "<division>": "<brand>" }` (one entry — the player's brand)
- `cxhub_progress` = `{ "<world>:<levelId>": {stars, score, date} }` (best-of, what the hub shows)
- `cxhub_outbox`   = queued Sheet writes (offline safety)

## 7. Journeys backend (one Google Sheet + Apps Script)
- Tabs: **Profiles** (one row per employee, upsert by EmpID, duplicates auto-removed),
  **Results** (one row per attempt — appended), **Feedback**, optional **Roster**.
- `cxhub-sync.js` API: `getProfile()`, `register(division)`, `saveResult(world, levelId, {score,
  stars, passed})`, `sendFeedback()`, `hydrate()`, `flush()`, `lookup(empId)`, `warm()`.
- **Writes** use `fetch(..., {mode:"no-cors"})` — fire-and-forget, so a blocked CORS read can
  never cause a retry and duplicate rows. A **flush lock + FIFO drain** prevents double-sends.
- **Reads** use **JSONP** (`doGet` answers `callback(...)`), because Apps Script sends no CORS
  headers. Client timeout **15 s with one retry**, plus an in-session memo so re-typing an ID
  costs nothing.
- **`hydrate()`** on load: flush → read the player's results → **rebuild progress authoritatively**
  (a Results row deleted in the Sheet resets that level). If the player's **Profiles** row is gone
  → **sign out** to the gate (only when confirmed, never while writes are pending).
- **Attempt number** is computed server-side (counts prior tries) — games never send it.
- **`rosterLookup`** uses native **TextFinder** (no 30k-row read), with a normalising fallback scan
  only if that misses. Results cached **6 h** for a hit, **10 min** for a miss. The response
  includes **`ms`** (server time) — if `ms` is absent, an OLD version is deployed.
- **`action=warm`** wakes the container; the hub pings it when the gate opens (cold start ~5-10 s).
- Token + URL live in `cxhub-sync.js` (`CXHUB_SYNC`) and must match `SECRET_TOKEN` in
  `AppsScript.gs`. Current: `…AKfycbzkwewEo806PQv7IZCXgbM9L…/exec`, token `cxinteractivehub2030`.
  AURA/KSA have their **own** separate URL + token — never touch those.

## 8. Ranks / badges
Per-division completion % (completed ÷ that division's total: retail 9, hospitality 4, starbucks 4)
maps to `config.RANKS`: Beginner 0 → Explorer 20 → Achiever 40 → Expert 60 → Master 80 →
Champion 100. Shown as a rank card + connected badge ladder. Icons are swappable
(`assets/badges/*.png`, or `{lottie:…}` / `{emoji:…}`). Purely client-side.

## 9. Certificate
At 100% a gold button downloads an **A4-landscape PNG (2480×1754)**: world artwork + wavy divide on
the left; world-coloured cream panel on the right with the CX Hub logo, name, employee ID, the
Art-of-X logo, the per-world message (`config.CERT[division]`), a coloured seal (lower-left),
completion date, "Customer Experience Team", and the **Alshaya logo**. All text is drawn on canvas
(never lifted from images). Filename: **`[Name] [EmpID] [World].png`**. Canvas export only works on
the **hosted https site**. Preview anytime: **`CXHub.previewCert()`**. All positions are plain
numbers inside `buildCertificate()`.

## 10. Other world-screen features
- **Welcome-back popup** for returning players (rank badge + levels done / progress % / stars),
  once per browser session; first-time sign-ups don't see it.
- **"Learn more" card** per world → that world's CX Hub page (`WORLDS[x].hubUrl`).
- Header logo = internal Home; **footer logo** → main CX Hub (`config.LINKS.cxHub`).
- Fancy **START / FINISH** markers (checkered racing tape), animated per-division backgrounds.

## 11. SSO (future, behind a flag)
`config.SSO:false` today → the hub never calls `/.auth/me`. Store staff share ONE store login, so
SSO fills **brand + market** (store-level, locked) while the person still enters **name + employee
ID**. When Azure/Entra is live: set `SSO:true` and map two claim names in `resolveIdentity()`.
Full instructions: `CX_Hub_SSO_Migration_Guide.docx` (delivered separately).

## 12. Building a new journey game
Fill in `GAME_BUILDER_PROMPT.md` and paste it into a new chat. Contract: self-contained
`index.html` in the level folder, never asks for identity (reads `cxhub_profile` /
`cxhub_brands`), bilingual EN/AR + RTL, and on finish calls once:
```js
CXHubSync.saveResult("<world>", "<level-id>", { score: 0-100, stars: 0-3, passed: true });
```
Then set that level's `released:true` in `config.js`. **No limit** on question count or interaction
type — only the final `score`/`stars` matter. Suggested convention: pass at 80, 2★ at pass, 3★ at 90+.
Players can **replay unlimited times**; each attempt appends a Results row (full history) and the
hub always shows their **best**. Nothing extra is needed per level or per division.

## 13. Deploy checklist (whenever `AppsScript.gs` changes)
1. Paste the new code into the Apps Script editor → **Save**.
2. If the schema changed: delete the affected tabs and run **`setup()`** once.
3. **Deploy → Manage deployments → ✏️ → Version: New version → Deploy** (URL stays the same).
4. Verify: open `…/exec?token=<TOKEN>&action=lookup&empId=100086` — the answer must contain **`ms`**.
5. On the site, **hard-refresh** (Ctrl/Cmd+Shift+R) so the new JS loads.

## 14. Working style
- Deliver **only the changed files with exact paths** (not the whole zip) unless asked for
  everything. Multiple files with the same basename → a small zip preserving paths.
- On any `AppsScript.gs` change, always remind about the redeploy.
- Keep it config-driven, bilingual, mobile-first, plug-and-play.
- Verify changes headlessly (playwright) before delivering; sandbox blocks `script.google.com` and
  Google Fonts, so those console errors are expected and not real bugs.

## 15. Known notes (by design, not bugs)
- The JSONP read puts the token + empId in the URL — fine internally, but keep the Sheet restricted.
- `Results` keeps one row per attempt; use a pivot for "best per person per level".
- A Kuwait player sees **no** General tiles (AURA is UAE-only, KSA Ready is Saudi-only) — that is
  the market gating working.
- The certificate cannot export from `file://` (tainted canvas) — hosted site only.

---

## Resume prompt (paste into a new chat, attach the zip)
> I'm continuing the **CX Interactive Hub** project (zip attached). Read **`PROJECT_STATE.md`** at
> the root first — it describes the architecture, the entry gate + roster lookup, the storage
> contract, the backend, the certificate, and the conventions. Follow the working style in it:
> give me only the changed files with exact paths, and remind me to redeploy when
> `AppsScript.gs` changes. Note that `customer-experience-general/` is maintained separately and is
> not in the zip — never overwrite it. Today I want to: **[your task]**.

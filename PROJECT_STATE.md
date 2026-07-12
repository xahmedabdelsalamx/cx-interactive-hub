# CX Interactive Hub — Project State (read me first)

This file is the single source of truth for what this project is and how it works.
If you're resuming in a **fresh AI chat**, attach the project zip and paste the
"Resume prompt" at the bottom — that plus this file reconstructs everything.

---

## What it is
A gamified, **bilingual (EN/AR + full RTL)** learning platform for Alshaya customer
experience staff across **Retail, Hospitality, and Starbucks**. Static site
(HTML/CSS/JS), hosted on **GitHub Pages** today, planned move to **Azure Static Web
Apps + Microsoft Entra SSO** later. Changes are hand-applied to the live site.

## Core model (important)
- **One identity gate** at the hub root captures **Name · Employee ID · Brand · Market**
  (no gender/character). The brand routes the player straight to their **division
  journey** (Foot Locker → retail, Raising Cane's → hospitality, Starbucks → starbucks).
- **Journeys** = the three division worlds, each a vertical trail of **levels** (games).
- **General projects** (AURA Pass, KSA Ready, future ones) are **standalone**: their own
  entry screens and their own Google Sheets/Apps Script. The hub only links to them,
  **filtered by the player's market**. They are NOT part of the journey progress system.
- Identity is captured **once**; games only read it. This is what makes SSO a drop-in.

## Ranks / badges
- Each division has its own staff; a player only ever sees their own division journey.
- The world screen shows a **rank card + badge ladder** based on **journey completion %**
  = completed levels ÷ that division's total levels (Retail /9, Hospitality /4, Starbucks /4).
- Tiers live in `config.RANKS` (Beginner 0% → Explorer 20% → Achiever 40% → Expert 60% →
  Master 80% → Champion 100%), each with a bilingual name and a swappable icon media spec
  (`assets/badges/*.png`, or a Lottie/emoji). Purely client-side (derived from progress) —
  no backend involvement. Games do nothing extra; finishing levels advances the rank.

## Where things live
```
index.html                      hub shell (topbar, #app, modal, footer)
assets/js/config.js             ★ EDIT THIS: SSO flag, worlds, levels, brands, markets, general games, ranks/badges, icons
assets/js/app.js                engine (gate, routing, world map, modal, hydrate, sign-out)
assets/js/cxhub-sync.js         ★ journeys backend bridge — holds scriptUrl + secretToken
assets/css/styles.css           all styling + animated backgrounds
assets/logos|icons|worlds|characters|lottie/   assets (media specs support img/lottie/emoji)
backend/AppsScript.gs           journeys Google Apps Script (paste into the Sheet)
backend/README.md               backend setup steps
GAME_BUILDER_PROMPT.md          paste into a new chat to build a journey game
sync-test.html                  open on live site to verify Sheet round-trip
<world-folder>/<level-id>/index.html    each journey game (17 placeholders scaffolded)
customer-experience-general/aura-pass|ksa-ready/   standalone General projects
```
World folders: retail → `art-of-selling-retail`, hospitality → `art-of-guest-experience`,
starbucks → `art-of-connection`, general → `customer-experience-general`.

## Data / storage contract (shared localStorage on the same origin)
- `cxhub_profile`  = `{ eid, name, market }`
- `cxhub_brands`   = `{ "<division>": "<brand>" }`  (one entry — the player's brand)
- `cxhub_progress` = `{ "<world>:<levelId>": {stars, score, date} }` (best-of, shown by hub)
- `cxhub_outbox`   = queued Sheet writes (offline safety)

## Journeys backend (central Google Sheet + Apps Script)
- Tabs: **Profiles** (one row per employee, upsert by EmpID), **Results** (one row per
  attempt — appended), **Feedback**.
- `cxhub-sync.js` API: `getProfile()`, `register(division)`, `saveResult(world,levelId,{score,stars,passed})`,
  `sendFeedback()`, `hydrate()`, `flush()`.
- **Writes** use `fetch(..., {mode:"no-cors"})` — fire-and-forget, so a blocked CORS read
  never causes a retry/duplicate row.
- **Reads** use **JSONP** (`doGet` returns `callback(...)`), because Apps Script sends no
  CORS headers.
- **hydrate()** on load: flushes pending → reads the player's results → **rebuilds progress
  authoritatively** (deleting a Results row resets that level). If the player's **Profiles**
  row is gone → **signs them out** to the gate (only when confirmed, not while writes pend).
- **Attempt number** is computed server-side (counts prior tries) — games don't send it.
- Token + URL live in `cxhub-sync.js` (`CXHUB_SYNC`) and must match `SECRET_TOKEN` in
  `AppsScript.gs`. AURA/KSA have their **own** separate token+URL (do not touch).

## SSO (future)
- `config.js` has `SSO: false`. While false the hub never calls `/.auth/me` and just shows
  the form. When Azure/Entra is live, set `SSO: true` and map the two claim names in
  `app.js` → `resolveIdentity()`.
- Because store staff share a **store login**, SSO fills **brand + market** (store-level)
  and locks them; the person still enters **name + employee ID**. Full steps in the Word
  doc `CX_Hub_SSO_Migration_Guide.docx`.

## Building a new journey game
Fill `GAME_BUILDER_PROMPT.md` and paste into a new chat. Rules: self-contained
`index.html` in the level folder, never asks for identity (reads the saved profile), EN/AR
+ RTL, and on finish calls once:
`CXHubSync.saveResult("<world>","<level-id>",{score:0-100, stars:0-3, passed:true})`.
Then set that level's `released:true` in `config.js`. **No limit** on question count or
interaction type; only the final `score`/`stars` matter. Suggested convention: pass at 80,
2★ at pass, 3★ at 90+.

## When the backend (AppsScript.gs) changes
Paste new code → (if schema changed, delete the 3 tabs and run `setup()`) →
**Deploy → Manage deployments → New version → Deploy** (URL stays the same).

## Working style
- Deliver **only the changed files with exact paths** (not the whole zip) unless asked for
  everything.
- On any `AppsScript.gs` change, remind to redeploy.
- Keep it config-driven, bilingual, mobile-first, plug-and-play.

## Known long-term notes (by design, not bugs)
- JSONP read puts token + empId in the URL — fine for internal use, but keep the Sheet
  access-restricted.
- `Results` keeps one row per attempt (full history); the hub shows best-of. Use a pivot
  for "best per person per level".

---

## Resume prompt (paste into a new chat, attach the zip)
> I'm continuing the **CX Interactive Hub** project (attached zip). Please read
> `PROJECT_STATE.md` at the root first — it describes the whole architecture, data
> contract, backend, and conventions. Follow the working style in it (give me only the
> changed files with exact paths, remind me to redeploy when `AppsScript.gs` changes).
> Today I want to: [your task].

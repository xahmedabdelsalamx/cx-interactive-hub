# CX Onboarding Challenge — KSA New Hires

Bilingual (KSA-Arabic default) onboarding game. **One engine, many data files.**
Built on the AURA PASS pattern. Retail is the working reference division.

## Run it
Open `index.html` in a browser (or any static server). It runs **fully offline** until
you add the backend URL. The footer CX Hub link and the breathing media slots work out of the box.

> Tip: a quick local server avoids file:// quirks — `python3 -m http.server` then open the printed URL.

## What's live right now
- Intake (KSA-Arabic) → brand-based world routing → world reveal → character select (breathing slots) → division intro → rounds → result → retry-until-pass → star feedback.
- Two mechanics fully working: **swipe** (Round 1) and **scenario** (Round 4).
- Retail content is **placeholder** (2 short rounds) so the loop plays end-to-end.

## What's next (per the plan)
- The other 6 mechanics: match, order, slider, speed, convo, hotspot (same `render*` pattern in `engine.js`).
- Real Retail content (4 rounds × 5 Qs), then clone `divisions/retail.js` → hospitality / starbucks.
- Character PNGs into `assets/characters/`.

## Edit map (what to touch)
| You want to… | Edit |
|---|---|
| Add/change a question | `divisions/retail.js` (data only) |
| Set an image/animation | `media/media-config.js` |
| Change world colors / floaters / characters | `config/worlds.js` |
| Add a brand or set the backend URL | `config/shared.js` |
| Change game logic / add a mechanic | `engine.js` |

## Backend
`AppsScript.gs` — deploy as a Web App, paste the `/exec` URL into `config/shared.js`.
Stores `Scores` + `Feedback` tabs, division-aware, with a pass-once certification check.

## Colors
Retail `#e43c50` · Hospitality `#f15a24` · Starbucks `#006241`

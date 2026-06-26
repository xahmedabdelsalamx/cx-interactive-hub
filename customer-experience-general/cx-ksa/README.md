# CX Onboarding Challenge — KSA New Hires

Bilingual (KSA-Arabic default) onboarding game. **One engine, many data files.**
Retail is the working reference division.

## Run it
Open `index.html`, or for the smoothest experience run `python3 -m http.server` in this
folder and open the printed URL. Runs **fully offline** until you add the backend URL.

## What's live now
- Vibrant KSA-green (#005430) entry → brand-based routing → branded world gradient.
- Header logos auto-swap: **white** over colored backgrounds, **colored** inside white cards.
- Footer attached under the card (AURA-style): © Alshaya + Customer Experience team · 2026 + a
  `contact here` mailto to ahmed.abdelsalam@alshaya.com.
- **Game-style character select**: full-body figure on a stand, ‹ / › to browse one at a time.
- **Navigable questions**: Previous / Next, no auto-advance, answers can be changed before finishing.
- Two mechanics working (swipe + scenario); retry-until-pass; star feedback.
- Full 30-brand list, all routed to retail / hospitality / starbucks.

## Assets
- `assets/logos/` — transparent PNGs, `*-white.png` and `*-color.png` per logo.
- `assets/characters/` — drop full-body character PNGs (portrait, transparent): `retail-1.png` … etc.
- `assets/images/` — content PNGs referenced from `media/media-config.js`.

## Edit map
| You want to… | Edit |
|---|---|
| Add/change a question | `divisions/retail.js` |
| Set an image/animation | `media/media-config.js` |
| World colors / floaters / characters / logos | `config/worlds.js` |
| Brands, backend URL, footer, KSA-green | `config/shared.js` |
| Game logic / add a mechanic | `engine.js` |

## Backend
`AppsScript.gs` — deploy as Web App, paste `/exec` into `config/shared.js`. Division-aware
Scores + Feedback tabs, pass-once certification check.

## Colors
Entry KSA green `#005430` · Retail `#e43c50` · Hospitality `#f15a24` · Starbucks `#006241`

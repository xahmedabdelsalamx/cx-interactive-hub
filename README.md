# CX Interactive Hub

A gamified launcher for the Customer Experience learning modules. Players pick a
**world** (division), enter their details and a character, then work through the
**levels** (games). Progress is saved and shown with stars + scores.

---

## Folder structure

```
cx-interactive-hub/
├── index.html                     ← the Hub (home, onboarding, world maps)
├── assets/
│   ├── css/styles.css             ← all styling
│   ├── js/config.js               ← ★ EDIT THIS: worlds, games, brands, characters, icons
│   ├── js/app.js                  ← engine (rarely needs editing)
│   ├── favicon.png
│   ├── logos/                     ← cx-hub, art-of-selling/-guest-experience/-connection, aura-white
│   ├── icons/                     ← ksa-flag (+ your own icon PNGs / SVGs)
│   ├── worlds/                    ← retail.jpg, hospitality.jpg, starbucks.jpg (world backgrounds)
│   ├── characters/                ← m1–m4, f1–f4 (swap for real character art)
│   └── lottie/                    ← drop .json / .lottie animations here
├── art-of-selling-retail/<game>/index.html          ← 9 game placeholders
├── art-of-guest-experience/<game>/index.html        ← 4 game placeholders
├── art-of-connection/<game>/index.html              ← 4 game placeholders
└── customer-experience-general/<game>/index.html    ← aura-pass, ksa-ready
```

## Editing — everything lives in `assets/js/config.js`

**Any image or icon is a "media spec"** — use whichever you want:
```js
{ img:    "assets/icons/thing.png" }              // PNG / SVG / JPG
{ lottie: "assets/lottie/thing.json" }            // local Lottie
{ lottie: "https://lottie.host/xxxx/data.json" }  // hosted Lottie
{ emoji:  "☕" }                                   // plain emoji (no file)
```
This applies to world logos, the challenge icons, the general-game tiles, and characters.

**Release a game:** in `config.js`, set the level's `released:true`. Until then it
shows as *Coming soon* (its placeholder folder already exists).

**Change brands / characters / level names:** edit the `BRANDS`, `CHARS`, and
`WORLDS[...].levels` arrays.

## How progress works (important)

The Hub and every game live on the **same domain**, so they share `localStorage`:

- `cxhub_profile`  — `{eid, name, gender, character}` (captured once at onboarding)
- `cxhub_brands`   — `{retail, hospitality, starbucks}`
- `cxhub_progress` — `{ "<world>:<levelId>": {stars, score, date} }`

When a **game** finishes, it records the result with one line (see any placeholder
`index.html`):
```js
saveResult("retail","driving-conversion",{stars:2, score:78});
```
The Hub reads that back and shows the level as **Completed** with its stars and
score — so when you release Module 2 later, the returning player still sees
Module 1 as done. (Progress persists only when the site is hosted, not in a local
preview.)

## Adding a brand-new game

1. Add a level object to the right world in `config.js` (`id`, `en`, `ar`, `url`, `released`).
2. Create the folder `\<world-folder>/\<id>/` with an `index.html` (copy a placeholder).
3. Make the game call `saveResult(...)` when the player finishes.

---
Developed by the Customer Experience team · 2026 · ahmed.abdelsalam@alshaya.com

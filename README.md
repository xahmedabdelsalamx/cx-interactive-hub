# CX Interactive Hub

A gamified launcher for the Customer Experience learning modules. Players enter their
details **once** at the hub's front door (name · employee ID · brand); their brand
routes them straight to their division's journey. General games (AURA Pass, KSA Ready)
are shown to everyone. Games never ask for details again — they read the saved profile.
Progress is saved to a Google Sheet and shown with stars + scores.

Identity is captured in one place, so adding SSO later (Azure Entra) is a drop-in:
`resolveIdentity()` in `assets/js/app.js` already tries Azure's `/.auth/me`.

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

- `cxhub_profile`  — `{eid, name, market}` (captured once at the entry gate)
- `cxhub_brands`   — `{ "<division>": "<brand>" }` (the player's single brand)
- `cxhub_progress` — `{ "<world>:<levelId>": {stars, score, date} }`

When a **game** finishes, it records the result with one line (see any placeholder
`index.html`):
```js
CXHubSync.saveResult("retail","driving-conversion",{stars:2, score:78, passed:true});
```
The Hub reads that back and shows the level as **Completed** with its stars and
score — so when you release Module 2 later, the returning player still sees
Module 1 as done. (Progress persists only when the site is hosted, not in a local
preview.)

## Player rewards & extras (client-side, no backend)

- **Ranks & badges** — journey completion % maps to a rank tier (Beginner → Champion),
  shown as a rank card + badge ladder. Tiers/images in `config.RANKS`.
- **Welcome-back popup** — returning players get a greeting with their stats once per session.
- **Certificate** — at 100% a gold button downloads an **A4-landscape** PNG (world artwork +
  world colour + official logos + seal), filename `[Name] [EmpID] [World].png`. Per-world
  message in `config.CERT`. Preview in the console with `CXHub.previewCert()`. Only exports
  on the hosted https site.
- **"Learn more" / CX Hub links** — each world links to its CX Hub page (`WORLDS[x].hubUrl`);
  the footer logo opens the main CX Hub (`config.LINKS.cxHub`).

## How to build a new game (mini-game inside a journey)

The easiest path: open **`GAME_BUILDER_PROMPT.md`** in this project, fill in the short
`>>> FILL THIS IN <<<` block (world, level id, title, your questions, pass mark), and
paste the whole thing into a **new AI chat**. It hands that chat the entire environment
so the game plugs in with no extra wiring. When it returns the finished `index.html`:

1. Drop it at `\<world-folder>/\<level-id>/index.html` (the folder already exists as a
   placeholder — replace its `index.html`).
2. In `assets/js/config.js`, set that level's `released:true` to make it playable.

That's it. If you'd rather build it yourself, the whole contract is just:

- A **self-contained `index.html`** in the level folder.
- It **never asks for identity** — it reads the saved player from `localStorage`
  (`cxhub_profile` = `{eid,name,market}`, `cxhub_brands`), or calls
  `CXHubSync.getProfile()`. The hub already captured everything at the front door.
- **Bilingual EN/AR with RTL**, themed to the world's accent colour.
- On finish, **one call** reports the result — it updates the hub's completion display
  *and* writes a row to the journeys Google Sheet:
  ```js
  CXHubSync.saveResult("<world>", "<level-id>", { score: 0-100, stars: 0-3, passed: true });
  ```
  (`<world>` is `retail` | `hospitality` | `starbucks`.)

### You are not limited on questions or interactivity

The hub is the shell and the scoreboard; each game is a self-contained world you design
however you like. You can use:

- **Any number of questions** — 3, 30, or a branching path with no fixed count.
- **Any interaction type** — multiple choice, drag-and-drop, sorting, matching,
  hotspots, sliders, timed rounds, scenario/role-play branching, typing, memory games,
  conversation simulations, character-led scenes, etc.
- **Any rich media** — images, Lottie, audio narration, video.
- **Any scoring model** — the only requirement is that at the end you convert performance
  into a `score` (0–100) and `stars` (0–3). How you get there is entirely yours.

Keep a **consistent pass mark and star rule** across games (suggested: pass at 80,
2★ at pass, 3★ at 90+) so completion feels fair across divisions — a convention, not a
technical limit.

### Replays and records

Players can **replay any released level as many times as they like** (the popup shows
"Replay level" once done). Each attempt appends **one row** to the `Results` tab — that's
intentional history (improvement over time, tries per level). The `Profiles` tab stays
**one row per employee** (no duplicates). The hub always shows the player's **best** score
per level, so replays only ever help. For a clean "best per person per level" report,
use a pivot on `Results`.

---
Developed by the Customer Experience team · 2026 · ahmed.abdelsalam@alshaya.com

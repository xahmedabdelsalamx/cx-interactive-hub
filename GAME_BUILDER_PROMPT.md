# CX Interactive Hub — Game Builder Prompt

Paste everything below into a **new chat** when you build a game/level. Fill in the
`>>> FILL THIS IN <<<` block first. It tells that chat the environment so the game
plugs straight into the hub (progress + Google Sheet) with zero extra wiring.

---

## >>> FILL THIS IN <<<
- **World (division):** `retail` | `hospitality` | `starbucks` | `general`
- **Level ID (folder name):** e.g. `first-impression`
- **Game title (EN / AR):** e.g. `The Power of the First Impression` / `قوة الانطباع الأول`
- **Brand accent colour:** retail `#E94858` · hospitality `#F15A24` · starbucks `#007042` · general `#c11d77`
- **Topic / questions:** (paste your content, scenarios, quiz items, scoring rules)
- **Pass mark:** e.g. `80`

---

## Environment brief (paste as-is)

I'm building ONE game (a "level") for an existing gamified learning platform called
the **CX Interactive Hub**, hosted on GitHub Pages at
`https://xahmedabdelsalamx.github.io/cx-interactive-hub/`. Build the game to these rules
so it plugs into the hub with no changes on the hub side.

**Deliverable**
- A single self-contained `index.html` (inline CSS/JS; external files only for images/lottie/fonts).
- It will live at: `cx-interactive-hub/<WORLD-FOLDER>/<LEVEL-ID>/index.html`
  - world folders: retail → `art-of-selling-retail`, hospitality → `art-of-guest-experience`, starbucks → `art-of-connection`, general → `customer-experience-general`.
- Bilingual **English + Arabic** with a language toggle and full **RTL** for Arabic.
- Themed with the world's brand accent colour (above); mobile-first; works offline.
- **Fonts: local only — never link Google Fonts.** Use the hub's sheet:
  `<link rel="stylesheet" href="../../assets/css/fonts.css">` and the stacks
  `'Poppins','Cairo',system-ui,sans-serif` for English / `'Cairo','Poppins',system-ui,sans-serif`
  for Arabic (weights 400-800 available). Ad blockers and corporate proxies inject a
  `style-src 'self'` CSP that silently strips Google Fonts and drops the page to Times New Roman.
- **Strictly CSP-friendly**: no `eval`, and **no remote scripts or stylesheets at all** — every
  asset must be same-origin. (The hub self-hosts its Lottie player at `assets/js/lottie-player.js`
  if you need it.)

**Player identity — NEVER show an entry/intake screen.**
The hub captures the player ONCE at its front door (name · employee ID · brand) and
saves it. Your game must NOT ask for name, ID, or brand — just read the saved profile
and start. (If the profile is somehow missing — game opened directly — you may collect
it, but that's the exception.)
- `cxhub_profile` = `{ eid, name, market }`
- `cxhub_brands`  = `{ "<division>": "<brand>" }`  (the player's single brand)
- Easiest: `var me = CXHubSync.getProfile();`  → `{ eid, name, brands }`.

**On completion — report the result (this is the important part).**
When the player finishes, call the shared helper:
```html
<script src="../../assets/js/cxhub-sync.js"></script>
```
```js
CXHubSync.saveResult("<WORLD>", "<LEVEL-ID>", {
  score: 0-100,        // integer percentage
  stars: 0-3,          // 90+ = 3, pass mark = 2, else 1  (or your own rule)
  passed: true/false,  // score >= pass mark
  // attempt is counted automatically by the backend — you don't send it
  durationSec: 0,      // optional
  meta: {}             // optional: per-question breakdown, etc.
});
```
That one call (a) writes `cxhub_progress` so the **hub shows this level completed**
with the score/stars, and (b) posts a row to the central **Google Sheet**. It also
auto-fills the player identity, so you don't pass eid/name/brand yourself.

Optional feedback: `CXHubSync.sendFeedback("<WORLD>","<LEVEL-ID>", rating, comment);`

**If the shared helper isn't available** (you're building standalone, outside the repo),
drop in this inline fallback instead — same effect, self-contained:
```js
function cxhubSaveResult(world, levelId, res){
  try{
    var p={}; try{p=JSON.parse(localStorage.getItem("cxhub_progress"))||{}}catch(e){}
    var key=world+":"+levelId, prev=p[key];
    if(!prev || (res.score||0)>(prev.score||0))
      p[key]={stars:res.stars||0, score:res.score||0, date:new Date().toISOString()};
    localStorage.setItem("cxhub_progress", JSON.stringify(p));
    // optional Google Sheet post (fill URL + token to match backend/AppsScript.gs)
    var SCRIPT_URL="https://script.google.com/macros/s/AKfycbzkwewEo806PQv7IZCXgbM9L-7LZt7VRH3KzbAtkjkG2Rty_dyWjMsjNuFrD5bXY1nBEg/exec", TOKEN="cxinteractivehub2030";
    if(SCRIPT_URL){
      var pr={}; try{pr=JSON.parse(localStorage.getItem("cxhub_profile"))||{}}catch(e){}
      var br={}; try{br=JSON.parse(localStorage.getItem("cxhub_brands"))||{}}catch(e){}
      fetch(SCRIPT_URL,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},
        body:JSON.stringify({token:TOKEN,action:"submit",world:world,division:world,levelId:levelId,
          empId:pr.eid||"",name:pr.name||"",market:pr.market||"",brand:br[world]||"",
          score:res.score||0,stars:res.stars||0,passed:res.passed?"YES":"NO",
          lang:document.documentElement.lang||"en",clientTime:new Date().toISOString()})});
    }
  }catch(e){}
}
```

**Central Google Sheet contract (for reference — the hub owns the backend).**
Results are appended with these fields: `Timestamp, EmpID, Name, Brand, Division,
World, LevelID, Score, Stars, Passed, Attempt, DurationSec, Lang, ClientTime, Meta`.
The game only ever sends `saveResult(...)`; the hub/script handle the columns.

**Ranks are automatic.** Completing levels advances the player's division rank/badge
(Beginner → Champion), shown on the hub. Your game does nothing extra for this — it's
derived from the same progress your `saveResult(...)` writes.

**When done**, give me the finished `index.html` and tell me it goes in
`cx-interactive-hub/<WORLD-FOLDER>/<LEVEL-ID>/`. In the hub's `assets/js/config.js`
I'll set that level's `released:true` to make it playable.

---

## Level ID reference (so you pick the right one)

**retail** (`art-of-selling-retail`): `driving-conversion` · `first-impression` · `discovery` ·
`product-storytelling` · `elevated-recommendations` · `closing-the-sale` · `seamless-checkout` ·
`lasting-impressions` · `service-recovery`

**hospitality** (`art-of-guest-experience`): `warm-welcome-curated-conversations` ·
`culinary-storytelling-thoughtful-pairings` · `memorable-moments-seamless-farewell` ·
`genuine-gratitude-service-recovery`

**starbucks** (`art-of-connection`): `warm-welcome-connection` · `selling-starbucks-products` ·
`sampling-handoff-speed` · `loyalty-service-recovery`

**general** (`customer-experience-general`): standalone projects with their OWN entry
screen and their OWN Google Sheet/Apps Script (e.g. AURA Pass, KSA Ready). **Do not
build these with this prompt** — this environment is only for the three journey worlds
above.

# Completion Report — Art Series: KSA Ready

Produces completion and pass-rate reporting for the KSA new-hire game **against the company active list**, without ever putting that list online.

---

## Why this exists

The company active list is HR personal data (employee names, employee numbers, line manager names, job titles, store locations). It must **not** live on Google Drive or in any shared cloud sheet.

So the split is:

| Where | What it holds |
|---|---|
| **Google Sheet** (the game's backend) | Game results only — Employee ID, name, brand, division, score, feedback |
| **This tool** (your machine / private repo) | Reads the active list **locally in your browser** and joins it to those results |

The active list is parsed inside the browser tab. It is **never uploaded, never saved, never transmitted**. Close the tab and it is gone.

---

## How to use it (about 30 seconds)

1. Open the page (locally, or from your private GitHub Pages URL).
2. **Drop the active list** onto panel 1 — `.xlsx` or `.csv`, straight from the HR export, no cleanup needed.
3. **Click panel 2** to pull the game results from the live sheet.
   *(If that fails — e.g. running from a `file://` path — export the sheet's `Scores` tab as CSV and drag it onto panel 2 instead.)*
4. Click **Build the report**.
5. Click **Download full report (CSV)** to share the numbers.

---

## What you get

- **Executive summary** in plain English
- **KPIs** — on active list · played · certified · attempts
- **Per-division donuts** — Art of Selling / Guest Experience / Connection
- **Completion by store**, with live search across all locations
- **By company division** (Apparel, Wellness, H&M, Hospitality, Starbucks…)
- **Played but not on the list** — new joiners or typos, so nobody is lost
- **Top brands**
- **CSV export** of the full employee-level table

---

## Division mapping

The active list's `Division` column is rolled up into the three art divisions:

| Company Division | Art division |
|---|---|
| Apparel Division, Wellness Division, H & M, Primark | **retail** — The Art of Selling |
| Hospitality Division | **hospitality** — The Art of Guest Experience |
| Starbucks | **starbucks** — The Art of Connection |

Only rows where `Market = Saudi` are counted. To change either rule, edit `DIV_MAP` / `MARKET` near the top of the script block in `index.html`.

---

## Files

```
index.html      the tool (all UI + logic)
config.js       the Apps Script URL + token — must match the game's config/shared.js
xlsx.min.js     SheetJS, bundled so .xlsx reading works offline with no CDN
assets/, favicon.png   branding
```

---

## Notes

- **Keep this repo private.** The code holds no data, but a public page saying "drop the active list here" invites questions you don't need.
- **Do not deploy this to the company Azure site.** It belongs with you, not with the game.
- If the Apps Script is ever redeployed to a new `/exec` URL, update it in **both** `config.js` here and `config/shared.js` in the game project.
- Every replay adds a row to the sheet. This tool counts an employee once (played / certified), so retries never double-count — the "attempts" figure is where repetition shows.

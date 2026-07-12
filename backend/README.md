# CX Interactive Hub — Central backend

Standalone Google Sheet + Apps Script for the whole hub (roster + results + feedback).
Independent of the AURA Pass and KSA scripts.

## One-time setup
1. Create a **new** Google Sheet.
2. Extensions → Apps Script → paste `AppsScript.gs` (replace the sample).
3. Change `SECRET_TOKEN` at the top to your own string.
4. Run `setup()` once (creates tabs `Profiles`, `Results`, `Feedback`). Authorise.
5. Deploy → New deployment → **Web app** · Execute as: **Me** · Access: **Anyone**.
6. Copy the `/exec` URL.

## Connect the hub + games
Open `assets/js/cxhub-sync.js` and set the two values to match:
```js
window.CXHUB_SYNC = {
  scriptUrl:   "https://script.google.com/macros/s/……/exec",
  secretToken: "your-token-here"
};
```
That's it. The hub then registers players on onboarding, and every game that calls
`CXHubSync.saveResult(...)` writes to `Results` automatically.

## Tabs
- **Profiles** — one row per employee (auto-updated by EmpID).
- **Results** — one row per completed level attempt.
- **Feedback** — optional ratings/comments.

Note: EmpID + Name are personal data — keep this Sheet access-restricted.

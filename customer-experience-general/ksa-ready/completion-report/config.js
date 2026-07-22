/* ============================================================
   Completion Report — connection settings
   ------------------------------------------------------------
   These two values let the tool pull GAME RESULTS from your Google Sheet
   (Employee ID, name, brand, score). Nothing sensitive is stored here.

   ⚠ KEEP IN SYNC: these must match config/shared.js in the main game
   project. If you ever redeploy the Apps Script and get a new /exec URL,
   update it in BOTH places.

   If you leave scriptUrl empty, the tool still works — you just export the
   Scores tab from the sheet as CSV and drag that in instead.
   ============================================================ */
window.CONFIG = {
  scriptUrl:   "https://script.google.com/macros/s/AKfycbxKNzh4JS1wGcpf7e2piOfD7aJeaqh7117ihBHUK2BcPf3BYvwPSBut2uIAWVdq1SEf/exec",
  secretToken: "CXHUBKSA"
};

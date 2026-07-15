ATLAS — Your CX Intelligence Partner
Part of the CX Hub · Developed by the Customer Experience team · 2026

==================================================
WHAT'S IN THIS FOLDER
==================================================
index.html                  The app. Do not edit. Upload as-is.
library-retail.json         Retail content — Art of Selling
library-hospitality.json    Hospitality content — Art of Guest Experience
library-starbucks.json      Starbucks content — Art of Connection
library-shared.json         Optional: cards shown in EVERY division
cxhub-logo.png / atlas-avatar.png / atlas-favicon.png   spare artwork

==================================================
HOW IT'S ORGANISED
==================================================
ONE app, THREE separate content files — one per division.

  index.html  ......  never changes
  library-<division>.json  ......  each division owns its own file

A division only ever searches its OWN file. Retail staff can never
get a Starbucks answer, and vice versa — the other content isn't
even loaded. Editing one file can never break another division.

==================================================
HOW TO PUT IT LIVE
==================================================
Upload index.html and all library-*.json files into the SAME folder
on Azure Static Web Apps. No API key, no server, no integration.

DIRECT LINKS (put the right one on the right CX Hub page):
  .../atlas/?d=retail
  .../atlas/?d=hospitality
  .../atlas/?d=starbucks

Open in Arabic:      .../atlas/?d=retail&lang=ar
No ?d= in the link?  ATLAS shows a division picker instead.
Staff can switch division any time using the chip under the ATLAS name.

==================================================
HOW TO ADD A NEW TOPIC
==================================================
Open the JSON file for THAT division. Copy one card block, paste it,
change the text. Keep the commas and brackets exactly as they are.

{
  "id": "unique-name",
  "keywords_en": "words staff might type in english",
  "keywords_ar": "الكلمات التي قد يكتبها الموظف بالعربية",
  "en": { "title": "Question or topic", "body": "The answer in plain words." },
  "ar": { "title": "العنوان", "body": "الإجابة بكلمات بسيطة." },
  "source": { "en": "Module name", "ar": "اسم الوحدة" },
  "link": "https://connectnow.alshaya.com/...",        <- optional
  "videos": [                                          <- optional
    { "type": "link",
      "url": "https://connectnow.alshaya.com/...",
      "title": { "en": "Video name", "ar": "اسم الفيديو" } }
  ]
}

TIPS
- "link" and "videos" are optional — delete the lines if not needed.
- More keywords = better matching. Add the words staff actually say.
- After editing, check the file at jsonlint.com to catch typos.
- Word/PPT/PDF can't be dropped in raw — turn each document into cards.
- A card with id "EXAMPLE-delete-me" is a template and is ignored by
  the app. Delete it once real content is added.

==================================================
ADDING A WHOLE NEW DIVISION LATER
==================================================
1. Create library-<name>.json (copy the shape of an existing one).
2. In index.html, find "const DIVISIONS" near the top of the script
   and copy one block, changing file name, labels and icon.

==================================================
GOOD TO KNOW
==================================================
- Bilingual EN/AR with full right-to-left support.
- Terminology: Arabic uses زبون / زبائن. The old words عميل / عملاء
  still WORK as search terms, so staff typing them still find answers.
- Fonts load from Google when online and fall back to system fonts if
  the network blocks them — nothing breaks.
- ConnectNow video/module links open in a new tab and need an Alshaya
  sign-in (fine on company devices with SSO).

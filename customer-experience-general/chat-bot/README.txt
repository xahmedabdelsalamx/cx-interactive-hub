ATLAS — Your CX Intelligence Partner
Part of the CX Hub · Developed by the Customer Experience team · 2026

--------------------------------------------------
WHAT'S IN THIS FOLDER
--------------------------------------------------
index.html        The app. Do not edit. Upload as-is.
library.json      ALL the content. This is the ONLY file you edit.
cxhub-logo.png    CX Hub logo (spare copy — already inside the app)
atlas-avatar.png  ATLAS robot artwork (spare copy — already inside the app)
atlas-favicon.png ATLAS face icon (spare copy — already inside the app)

--------------------------------------------------
HOW TO PUT IT LIVE
--------------------------------------------------
Upload index.html and library.json into the SAME folder on
Azure Static Web Apps. That's it — no API key, no server,
no integration required. index.html is the standard entry
point, so it serves at the root URL automatically.

--------------------------------------------------
HOW TO ADD A NEW TOPIC
--------------------------------------------------
Open library.json in any text editor (VS Code, Notepad++).
Copy one existing card block, paste it, change the text.
Keep the commas and brackets exactly as they are.

A card looks like this:

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
- Word/PPT/PDF files can't be dropped in raw — turn each document
  into a few cards like the ones above.

--------------------------------------------------
GOOD TO KNOW
--------------------------------------------------
- Works with no internet: content, logos and artwork are all
  inside index.html. Fonts load from Google when online and fall
  back to system fonts if your network blocks them — nothing breaks.
- ConnectNow video/module links open in a new tab and need an
  Alshaya sign-in (fine on company devices with SSO).
- Bilingual EN/AR with full right-to-left support.

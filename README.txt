
Thrift Tracker — PWA Bundle
===========================
This version can be hosted on GitHub Pages, Netlify, Cloudflare Pages, etc. and installed full-screen on iOS.

Files:
- index.html  (UI; replace EXEC_URL with your Apps Script /exec link if you want to POST data)
- manifest.webmanifest  (PWA manifest)
- sw.js  (Service Worker for offline + installability)
- icon-192.png, icon-256.png, icon-512.png  (app icons)

GitHub Pages quick deploy:
1) Make a new repo (e.g., thrift-tracker).
2) Upload ALL these files at the repo root.
3) Repo Settings → Pages → Deploy from branch → main / root → Save.
4) Open the GitHub Pages URL on your iPhone in Safari.
5) Tap Share → Add to Home Screen. It will open like a real app.

Connect to Apps Script:
- Open index.html, find EXEC_URL and paste your /exec URL.
- Saves still stay locally either way; EXEC_URL just adds a POST to your sheet.

# Abhimanyu Learning Space — SFI IMSc Digital Library

Static site. No build step, no install, no environment variables.

## Files this repo needs (all at the repository root, no folders)

From this package:
- `index.html`, `sw.js`, `manifest.webmanifest`, `README.md`

Copied from the old repo (same filenames):
- `config.js` (holds the Google Sheet and Apps Script URLs)
- `abhimanyu.png`, `sfi-imsc-logo.png`
- `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`
- `fonts.css`, `plus-jakarta-0.ttf`, `plus-jakarta-1.ttf`, `plus-jakarta-2.ttf` (optional; the site falls back to system fonts)

Do not copy `app.js`, `core.js`, `storage.js`, `pwa.js`, `styles.css`, `vue.global.prod.js`,
`papaparse.min.js`, `update-cache.mjs`, `sw.template.js` or the test/Tailwind files. They are no longer used.

## Catalogue
Edit the Google Sheet as usual. Required headings: Title, Semester, Type, Subject, Link.
The site picks up changes within 5 minutes (or instantly with Refresh).

## Changing the site later
Edit `index.html`, commit, and change `V` in `sw.js` (e.g. `imsc-lib-v3`) so phones drop old cached files.

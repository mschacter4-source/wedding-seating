# Matt & Anna — Wedding Seating Chart

An interactive drag-and-drop seating chart for the wedding reception.

**Live site:** https://mschacter4-source.github.io/wedding-seating/

---

## Features

- Drag guests between tables
- Search guests by name
- Highlight guests by group (family, friends, etc.)
- Add or remove guests
- Toggle table shapes (round / rectangular)
- Floor plan overview

## Running Locally

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Project Structure

```
wedding-seating/
├── .github/workflows/deploy.yml  ← Auto-deploys to GitHub Pages on push to main
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    └── App.jsx                   ← Seating data + all UI
```

## Deployment

The site auto-deploys to GitHub Pages via GitHub Actions whenever you push to `main`.

To update the seating chart, edit `src/App.jsx` and push to `main`.

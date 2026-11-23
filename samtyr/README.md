# Samtyr Hotel · Restaurant QR menu v3.0

A mobile-first restaurant menu in Russian and English, built in React and Vite. It contains 43 verified menu items in nine categories; all prices are in Kyrgyz som (KGS). The photographs illustrate the restaurant's atmosphere and are not matched to individual dishes. WhatsApp is a link to the restaurant's stated contact, not an ordering or payment feature.

## Run locally

Use Node.js 22.12+ (or a current supported LTS).

```sh
npm ci
npm run dev
npm run build
npm run preview
```

The deployable output is `dist/`. Built asset paths are relative, so the same build can be served at a repository subpath on GitHub Pages. No deployment is configured or performed here.

Menu data is in `src/menu.json`: Russian first, English second. Serving volumes stay as printed in item names. No external dependencies are fetched by the built menu at runtime. The only outbound link, WhatsApp, activates when a visitor chooses it.

The production build prerenders the Russian menu and fixed WhatsApp link in HTML; React adds language switching and active-section navigation. Editorial typography uses locally hosted, Cyrillic-verified subsets of Noto Serif Display and Noto Sans under the SIL Open Font License 1.1 (see `public/licenses/Noto-OFL.txt`).

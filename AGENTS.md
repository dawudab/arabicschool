# Mahdara Al-Andalous – website

Static showcase site: Vite + React 19 + Tailwind CSS v4 + react-i18next, deployed to Firebase Hosting.

## Commands
- `npm run dev` – dev server (http://localhost:5173)
- `npm run build` – production build to `dist/` (this is the verification step; no tests/linter configured)
- `npm run preview` – serve the built `dist/`
- `npm run deploy` – build + `firebase deploy --only hosting` (requires `firebase-tools` and a real project id in `.firebaserc`)

## Conventions
- Translations live in `src/locales/{ar,en,fr}.json`. Arabic is the default; `fr` falls back to `en` until translated.
- Language is routed by URL prefix (`/ar`, `/en`, `/fr`), handled in `src/i18n.js`, which also sets `<html lang dir>`.
- RTL: use logical utilities (`ms-/me-`, `ps-/pe-`, `start-/end-`, `border-s`, `text-start`) and `rtl:` variants, never `left/right`.
- Light theme. Brand colours (sampled from the logo) are Tailwind tokens in `src/index.css`: `brand-*` (blue, logo = `brand-600` #2c599d), `accent-*` (orange, logo = `accent-400` #fb9b51), `ink` (#666). Don't reintroduce ad-hoc colours.
- Glass panels use the `glass` / `glass-strong` utilities (light surfaces) and `glass-dark` (on blue surfaces), defined in `src/index.css`.
- Photos live in `public/images/` and are registered in `PHOTOS` (`src/constants.js`); render them with `<Photo name="..." />` (alt text comes from `photos.<key>` in the locale files). Used in Hero, About, Mission & Vision, Objectives (first card), Activities, Achievements ("Honouring Our Memorizers" strip) and the Gallery section (curated order + lightbox in `Gallery.jsx`).
- Logos live in `public/`: `logo-mark.png` (circular, used in navbar/footer via `<Logo />`), `logo-full.png` (transparent lockup, hero), plus `favicon.png` / `apple-touch-icon.png`.
- WhatsApp URL and shared constants: `src/constants.js`.

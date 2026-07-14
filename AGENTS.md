# AGENTS.md

## Cursor Cloud specific instructions

This repository is the **Ovora Labs** marketing/e-commerce website — a single Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 4 app. It is entirely static/statically-generated content: there is **no backend service, database, or environment variables required**. Product catalog data is hardcoded in `src/data/products.ts`.

### Services

There is one service (the Next.js app). Standard commands (see `package.json`):

- Dev server: `npm run dev` — runs on http://localhost:3000 (Turbopack).
- Lint: `npm run lint` (ESLint 9 / `eslint-config-next`).
- Production build: `npm run build`, then `npm run start` to serve the build.

### Non-obvious notes

- **Age/researcher gate blocks all UI testing.** The first thing a visitor sees is a client-side "Researcher verification" modal (`src/components/AgeGate.tsx`). Content behind it is not reachable until both checkboxes are checked and "Enter Ovora Labs" is clicked. The acceptance is persisted in the browser's `localStorage`, so when doing manual/GUI testing you must dismiss this gate first (and it may reappear in a fresh browser profile/incognito session).
- Node 22 is used in this environment; the app targets Next.js 15 which requires Node 18.18+.
- No `.env` files are needed to run, build, or test the app.

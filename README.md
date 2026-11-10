# Ovora Labs Website

Premium research-grade peptides website for **Ovora Labs**.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- Tidio / Lyro AI chat widget

## Develop

```bash
npm install
cp .env.example .env.local
# add your Tidio public key to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

Hosting and Namecheap DNS steps are in [DEPLOY.md](DEPLOY.md). The simplest host for this app is Vercel.

Before a public launch, replace every on-page note that starts with **Owner placeholder**. Those are unfinished business details (payment, legal entity, COA files, email signup, and similar). Do not invent them in code.

## Tidio Lyro setup

### 1. Site install (code — already wired)

1. Create / log into [Tidio](https://www.tidio.com/)
2. Open **Settings → Developer → Project data** (or **Settings → Installation**)
3. Copy your **public key** (the ID in `https://code.tidio.co/YOUR_KEY.js`)
4. Put it in `.env.local`:

```bash
NEXT_PUBLIC_TIDIO_PUBLIC_KEY=your_public_key_here
```

5. Restart `npm run dev` — the chat widget loads sitewide via `TidioChat` in the root layout.

If the key is empty, the widget is skipped (no broken script).

### 2. Enable Lyro (dashboard — no extra code)

Lyro runs on top of the same Tidio widget:

1. In Tidio, open **Lyro AI Agent**
2. **Set up Lyro** and add data sources (site URLs / FAQ / product pages)
3. Review generated Q&A in **Knowledge**
4. Turn Lyro **On** under **Configure → General**
5. Optionally enable Lyro on the **Live Chat** channel

Useful pages for Lyro to scrape once the site is public: `/`, `/store`, `/faq`, `/shipping`, `/research-use`, `/disclaimer`, product URLs.

## Key pages

- `/` — Homepage
- `/research-use` — Research Use Only
- `/store` — Researcher catalog (sign-in required)
- `/products/[slug]` — Product detail
- `/contact`, `/faq`, `/shipping`, `/quality`, `/coa`, `/research`
- `/disclaimer`, `/terms`, `/privacy`, `/returns`

All products are presented as research-use only.

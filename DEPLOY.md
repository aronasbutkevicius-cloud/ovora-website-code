# Deploy Ovora Labs

This is a Next.js 15 App Router site. It uses server-rendered pages, a client-side cart, and route metadata (`sitemap.ts`, `robots.ts`, Open Graph image). It is not a static HTML export.

**Use Vercel.** It runs this stack with no extra adapter. Netlify also supports Next.js if you already have an account there. GitHub Pages cannot host this app as-is, because Pages only serves static files and this project is not configured with `output: "export"`.

The site URL defaults to `https://ovoralabs.com` because that is the domain in `support@ovoralabs.com`. If the Namecheap domain is different, set `NEXT_PUBLIC_SITE_URL` to that exact origin (no trailing slash) before the production build. Canonical links, the sitemap, and `robots.txt` all use it.

## 1. Put the project on GitHub

Vercel deploys from a Git repository.

1. Push this repo to GitHub (the production branch can be `main`).
2. Confirm `.env.local` is not committed. Only `.env.example` belongs in Git.

## 2. Create the Vercel project

1. Sign in at [https://vercel.com](https://vercel.com) and choose **Add New… → Project**.
2. Import the GitHub repository. Framework preset: **Next.js**. `vercel.json` sets `"framework": "nextjs"` so Vercel does not leave the project on **Other**. Root directory: the repo root. Build command: `npm run build`, which runs `next build` (the webpack production build). Do not switch that command to `next build --turbopack`. On Vercel, Turbopack’s Google font loader fails while resolving `next/font` (`@vercel/turbopack-next/internal/font/google/font`). Leave the output as the Next.js default. Do not set an output directory.
3. Environment variables (Production):
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain` (the Namecheap domain, `https://` included, no path and no trailing slash)
   - `NEXT_PUBLIC_TIDIO_PUBLIC_KEY` = the Tidio public key, or leave it unset to ship without the chat widget
4. Deploy. Vercel gives you a `*.vercel.app` URL. Open it and click through the home page, catalog, a product, cart, and contact page before attaching the real domain.

`vercel.json` sets the Next.js framework and adds basic response headers. You do not need more config for a standard deploy.

## 3. Attach the Namecheap domain

Do this after the Vercel project exists. Add the domain in Vercel first so the dashboard can show the exact DNS values for this project. Those values win over the examples below.

### In Vercel

1. Open the project → **Settings → Domains**.
2. Add the apex domain, for example `ovoralabs.com`.
3. When Vercel offers the `www` host, add that too.
4. Set one as the primary domain and redirect the other to it (Vercel’s **Edit → Redirect**). Use the apex (`ovoralabs.com`) as primary unless you prefer `www`.
5. Leave this tab open. It shows the records to create, and later a **Refresh** button.

Vercel’s current docs say:

- An apex domain uses an **A** record. The shared address is `76.76.21.21`. The domain card in the dashboard may show that address or a different one. Copy the value from the card.
- `www` uses a **CNAME**. It is often unique per project (a name like `d1d4fc829fe7bc7c.vercel-dns-017.com`). Copy it from the same card. Use `cname.vercel-dns.com` only when that is the target Vercel prints.

If Vercel also shows a **TXT** record at `_vercel`, add that too. It proves you control the domain. You can remove it after the domain shows as valid.

### In Namecheap

Keep Namecheap’s nameservers (BasicDNS). Do not switch the domain to Vercel’s nameservers unless you have copied every existing record first, including email (MX) records. The site already publishes `support@ovoralabs.com`, and moving nameservers without those mail records will break the mailbox.

1. Namecheap → **Domain List → Manage** next to the domain.
2. Open **Advanced DNS**.
3. Delete records that conflict with the website:
   - URL Redirect records for `@` or `www`
   - The parking CNAME `www` → `parkingpage.namecheap.com`
   - Any other A or CNAME record already set on `@` or `www`
4. Add the records from the Vercel domain card. For the common shared values that looks like:

   | Type | Host | Value | TTL |
   | --- | --- | --- | --- |
   | A Record | `@` | `76.76.21.21` | Automatic |
   | CNAME Record | `www` | the CNAME from Vercel | Automatic |

   Namecheap’s host field wants `@` and `www`, not the full domain. If Vercel’s CNAME ends with a dot, you can omit the dot; Namecheap adds it.
5. Save. Do not add an AAAA record. Vercel does not use IPv6 for these domains, and a leftover AAAA record can make the configuration invalid.

### Check

1. Wait a few minutes, then in Vercel click **Refresh** on the domain. Both hosts should read **Valid Configuration**.
2. From a terminal:

   ```bash
   dig +short your-domain
   dig +short www.your-domain
   ```

   The apex should return the A record you entered. `www` should point at the Vercel CNAME.
3. Open `https://your-domain`. The certificate is issued by Vercel after DNS is valid. If it stays pending, the A or CNAME value does not match the dashboard, or the old parking record is still present.

Propagation is often a few minutes and can take up to 48 hours.

## 4. Email on the same domain

This repo does not configure mail. `support@ovoralabs.com` is only a `mailto:` address. Buy mailbox hosting separately (Namecheap Private Email, Google Workspace, or similar) and add the MX and SPF records that provider gives you, in Namecheap Advanced DNS, next to the Vercel A and CNAME records. Do not replace the website records with the mail records.

## 5. Later deploys

Push to the production branch. Vercel builds again. Change `NEXT_PUBLIC_SITE_URL` or the Tidio key in **Project Settings → Environment Variables**, then redeploy so the new values are baked into the client bundle.

## Local production check

```bash
npm install
cp .env.example .env.local
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Confirm before launch

These items are marked on the site with **Owner placeholder**, or they are claims already written into the pages. This deploy does not fill them in.

- Payment provider. Checkout collects a shipping address and then stops. It does not charge a card or create an order.
- Contact form and footer newsletter. Both open or instruct an email to `support@ovoralabs.com`. Nothing is stored.
- Tidio public key, if you want the chat widget.
- Legal entity name, mailing address, governing state, and policy effective dates on Terms and Privacy.
- Phone number and street address on the contact page. Hours are currently written as Mon–Fri, 9am–6pm ET.
- Public COA files. The COA page describes a certificate; it has no downloads.
- Research citations. The research library lists catalog products only.
- Product photos for the three nasal sprays (MT-2, Selank, Semax). Those pages use a drawn bottle.
- Whether `https://ovoralabs.com` is the domain you registered. If not, set `NEXT_PUBLIC_SITE_URL`.
- Whether the mailbox `support@ovoralabs.com` exists.
- Business copy already on the pages: 99%+ purity, ISO 17025 third-party testing, US operations, free shipping over $100, an $8.99 US shipping estimate under $100, overnight shipping, 0–2 business day processing, and the 14-day unopened-return note. Confirm each one before relying on it.
- Pack wording and stock counts in `src/data/products.ts` are uneven (`10-pack`, `pack`, and stock only on some SKUs). Stock is not shown in the UI.

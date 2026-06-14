# Developer Portfolio — Md. Mehedi Hasan Polash

Personal portfolio of **Md. Mehedi Hasan Polash** — MERN Stack Developer at NEXOGS Systems Ltd
and Cisco CCNA networking enthusiast.

Built with React + Vite, pre-rendered to static HTML for SEO, with a Vercel serverless backend
(MongoDB Atlas) powering an owner-only admin panel and automatic Cisco/Credly badge sync.

## Tech stack

- **Frontend:** React 18, Vite 6, custom CSS (Cosmic Indigo theme, light/dark, 3D effects)
- **SEO:** build-time pre-rendering (SSG via `react-dom/server`), Open Graph / Twitter cards,
  JSON-LD `Person` schema, `sitemap.xml`, `robots.txt`
- **Backend:** Vercel serverless functions (`/api`), MongoDB Atlas, JWT single-admin auth
- **Badges:** Cisco Networking Academy badges synced automatically from your public Credly profile

## Local development

```bash
npm install
npm run dev          # dev server (frontend only; API runs on Vercel)
npm run build        # production build + pre-render
npm run preview      # preview the production build
```

To run the serverless API locally, use the Vercel CLI: `npm i -g vercel && vercel dev`.

## Environment variables

Copy `.env.example` and fill these in (set them in the Vercel dashboard for production):

| Variable | What it is |
| --- | --- |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `MONGODB_DB` | Database name (default `portfolio`) |
| `ADMIN_EMAIL` | Your login email |
| `ADMIN_PASSWORD_HASH` | bcrypt hash — `node scripts/hash-password.mjs "your-password"` |
| `JWT_SECRET` | Long random string for signing admin tokens |
| `CREDLY_USERNAME` | Your Credly vanity slug (`credly.com/users/<slug>`) |
| `CRON_SECRET` | Random string protecting manual badge-sync calls |

### Connecting your Cisco badges (Credly)

NetAcad has no public API, but Cisco issues the same badges through **Credly**, which does.
In your NetAcad account, link/claim your badges to a free Credly account, then set
`CREDLY_USERNAME`. A daily Vercel Cron job (`vercel.json`) refreshes the cache, and the admin
panel has a **"Sync from Credly now"** button for an immediate refresh.

## Admin panel

Visit `/admin` and log in with your `ADMIN_EMAIL` + password. Only you can access it (JWT auth,
no public sign-up). From there you can edit Profile, Experience, Projects and Skills (saved to
MongoDB and shown live over the static defaults) and trigger a badge sync. `/admin` is excluded
from search engines via `robots.txt`.

## Deploying to Vercel

1. Push to GitHub and import the repo in Vercel.
2. Add the environment variables above.
3. Update the canonical/OG URLs in `index.html`, `asset/robots.txt` and `asset/sitemap.xml`
   to your real domain.
4. Deploy. The build command (`npm run build`) produces the pre-rendered `dist/` and Vercel
   serves `/api/*` as serverless functions; the cron job is configured in `vercel.json`.

## Project structure

```
src/
├── App.jsx          # all sections + content context + /admin routing
├── Admin.jsx        # owner-only editor (login, content editor, badge sync)
├── data.js          # static default content (profile, skills, experience, projects)
├── entry-server.jsx # SSR entry used by the pre-render step
├── index.css        # theme + styles
└── main.jsx         # client entry (hydrates pre-rendered HTML)
api/
├── _lib/            # db, auth (JWT), Credly fetch helpers
├── badges.js        # GET public badges
├── content.js       # GET public content / PUT admin content
├── login.js         # POST admin login
└── sync-badges.js   # refresh badge cache from Credly (cron + admin)
scripts/
├── prerender.mjs    # injects rendered HTML into dist/index.html
└── hash-password.mjs# generate ADMIN_PASSWORD_HASH
asset/               # CV, photo, screenshots, robots.txt, sitemap.xml (served at site root)
```

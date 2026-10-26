# Stamped Energy - Marketing Website

Prescriptive energy intelligence for Indian manufacturers. This repository powers the public marketing site at **[stamped.work](https://stamped.work)** - landing page, product narrative, industries, blog, case studies, contact funnel, and an internal CMS for content and lead review.

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + brand tokens in `styles/theme.css` |
| Motion | GSAP, ScrollTrigger, Lenis smooth scroll |
| Database | PostgreSQL via Prisma |
| Email | Resend (contact form notifications) |
| Analytics | Vercel Analytics |
| Deploy | Vercel |

## Quick start

### Prerequisites

- Node.js 20+
- PostgreSQL (local or [Supabase](https://supabase.com))

### Setup

```bash
git clone https://github.com/Stamp-ed/Stamped-Energy-Website.git
cd Stamped-Energy-Website
npm install
cp .env.example .env   # fill in values - see below
npm run db:setup         # push schema + seed admin user
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.example` to `.env`. Required for full functionality:

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection (pooled, port 6543 for Supabase) |
| `DIRECT_URL` | Direct DB URL for migrations/seed (port 5432) |
| `SESSION_SECRET` | Signs admin session cookies (32+ chars) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Initial CMS user (used by seed) |
| `RESEND_API_KEY` | Contact form email delivery |
| `CONTACT_FROM_EMAIL` / `CONTACT_NOTIFY_EMAILS` | Outbound & inbox addresses |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |
| `ADMIN_APP_ORIGIN` | Optional admin subdomain (e.g. `https://admin.stamped.work`) |
| Showcase | Live product dashboard at [showcase.stamped.work](https://showcase.stamped.work) (canonical URL in `lib/seo/constants.ts`) |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |
| `npm run db:setup` | Push schema and seed |
| `npm run db:seed` | Re-run seed only |
| `npm run db:migrate` | Create/apply Prisma migrations |

## Project structure

```
app/                 Routes & API handlers
components/          React UI (sections, layout, blog admin, how-it-works)
lib/content/         Marketing copy & nav config - edit text here
lib/motion/          Animation setup & scroll triggers
public/              Logos, industry images, hero video
prisma/              Database schema & seed
docs/design/         Brand tokens & page design specifications
styles/theme.css     Brand colors (single source of truth)
```

## Key routes

| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/how-it-works` | Product workflow & capabilities |
| `/industries` | Industry hub |
| `/industries/automotive` | Automotive vertical |
| `/blog` | Public blog |
| `/case-studies` | Customer outcomes |
| `/contact` | Discovery call form |
| `/blog/admin` | CMS (posts, case studies, contact inquiries) |

## Editing content

- **Marketing copy** - `lib/content/*.ts` (typed, imported by page components)
- **Colors / theme** - `styles/theme.css` only
- **Brand reference** - `docs/design/brand-tokens.md`
- **How It Works design spec** - `docs/design/how-it-works-page.md`
- **Blog & case studies** - CMS at `/blog/admin` or `prisma/seed.ts` for dev data

## Hero video

The landing hero uses a looping WebM walkthrough:

- Video: `public/video/how-it-works-cinematic.webm`
- Poster: `public/video/how-it-works-poster.png`
- Component: `components/ui/HeroVideo.tsx`

## Documentation for contributors

| File | Purpose |
|------|---------|
| `README.md` | This file - setup & orientation |
| `PROJECT_OVERVIEW.md` | Architecture & constraints |
| `AGENTS.md` | AI/agent workflow rules |
| `DECISIONS.md` | Architecture decision log |
| `IMPLEMENTATION_PLAN.md` | Approved phases |
| `PROGRESS.md` | Current status |

## Deployment

Connected to Vercel from the `main` branch. Push to `main` triggers a production deploy. Ensure `public/video/` assets and environment variables are configured in the Vercel project settings.

## License

Private - Stamped Energy. All rights reserved.

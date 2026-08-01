# Project Overview

## Purpose

Main marketing website for Stamped Energy - prescriptive energy intelligence for Indian manufacturers. The site communicates verified rupee outcomes, the Connect-to-Verify workflow, industry verticals, case studies, and a discovery-call contact funnel.

## System Overview

- **Public site** - Next.js App Router marketing pages (landing, Solutions, Platform, Industries, About, Contact, Case Studies & Blogs at `/case-studies`)
- **Blog CMS** - Authenticated admin at `/blog/admin` for posts, case studies (admin-only), and contact inquiry review
- **Contact pipeline** - Form submissions stored in PostgreSQL; optional email notifications via Resend
- **Analytics** - Vercel Analytics on all public routes

Production: [stamped.work](https://stamped.work) (marketing) with optional admin split via `ADMIN_APP_ORIGIN`.

## High-Level Architecture

```
app/
  layout.tsx              # Root layout, fonts, Analytics, MotionProvider
  page.tsx                # Landing page
  how-it-works/           # Workflow & capability walkthrough
  industries/               # Hub + automotive vertical
  blog/                     # Article routes /blog/[slug] + admin CMS; /blog → /case-studies
  case-studies/             # Public Case Studies & Blogs listing (CRM blogs)
  about/ contact/           # Company & lead capture
  api/                      # Contact, blog, auth routes
components/
  layout/ sections/         # Site chrome & page sections
  how-it-works/ industries/ # Route-specific UI
  blog/                     # Public + admin CMS components
  ui/                       # Shared primitives
lib/
  content/                  # Typed copy & config (edit text here)
  motion/                   # GSAP, Lenis, scroll triggers
  blog/ contact/ seo/       # Domain helpers
prisma/                     # Schema & seed
public/                     # Static assets (images, video, logos)
styles/
  theme.css                 # Brand color tokens (single source of truth)
docs/
  design/                   # Brand tokens & page design specs
```

## Constraints

- Brand colors: change only in `styles/theme.css` (see `docs/design/brand-tokens.md`)
- Marketing copy: prefer `lib/content/` over hardcoding in components
- Agent workflow: see `AGENTS.md` and `.cursor/rules/`

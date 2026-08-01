# Phase 9 Completion — Merge Blog + Case Studies (Public UI)

**Date:** 2026-07-31  
**Branch:** `feat/merge-case-studies-blog-ui`

## Completed work

- Single public nav/footer entry: **Case Studies** → `/blog`
- Permanent redirects for `/case-studies` and `/case-studies/*` → `/blog` (`next.config.ts` + route fallbacks)
- `/blog` listing and article chrome labeled Case Studies; data from CRM `BlogPost` only
- Homepage spotlight and static resource fallbacks blog-only; badges use **Insight**
- Sitemap / `llms.txt` / `llms-full.txt` updated; Case Study admin CRM left untouched
- Docs: ADR-009, IMPLEMENTATION_PLAN Phase 9, PROGRESS, PROJECT_OVERVIEW, SEO_GEO_AEO

## Files modified

- `lib/content/site.ts`, `resources.ts`, `homepage-spotlight.ts`
- `components/sections/FutureMedia.tsx`
- `components/blog/BlogArticleView.tsx`, `BlogFeatured.tsx`
- `components/industries/shared/IndustryResources.tsx`
- `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`
- `app/case-studies/page.tsx`, `app/case-studies/[slug]/page.tsx`
- `app/sitemap.ts`, `app/llms-full.txt/route.ts`, `public/llms.txt`
- `lib/seo/pages.ts`, `lib/layout/nav-theme.ts`, `next.config.ts`
- `DECISIONS.md`, `IMPLEMENTATION_PLAN.md`, `PROGRESS.md`, `PROJECT_OVERVIEW.md`, `SEO_GEO_AEO.md`

## Architectural changes

- Public IA: one Case Studies surface at `/blog`
- Public case-study routes are redirects only
- Admin CaseStudy paths and APIs unchanged (ADR-009)

## Validation performed

- `npx tsc --noEmit` — pass
- `npm run lint` — pass (exit 0)
- `npm run build` — pass (exit 0)

## Known issues

- Admin “View case studies” / live CaseStudy links still target `/case-studies/[slug]` and redirect to `/blog` (accepted; CRM untouched)
- Homepage spotlight may show fewer items if only blogs are `homepageFeatured`

## Next phase objectives

- Optional: rename admin marketing link labels to match public Case Studies IA
- Optional: publish more CRM blog posts for homepage spotlight density

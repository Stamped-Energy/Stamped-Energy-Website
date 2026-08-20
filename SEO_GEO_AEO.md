# SEO, GEO & AEO - Stamped Energy (`stamped.work`)

Living record of search, generative-engine, and answer-engine optimizations for the marketing site.  
**Last updated:** 2026-08-20 · **Domain:** `https://stamped.work`

---

## Positioning (source of truth)

All SEO, GEO, and AEO copy derives from **`lib/content/icp.ts`**. Do not hardcode positioning in components.

| Field | Current value |
|-------|----------------|
| **Category** | AI-powered energy intelligence |
| **Alternate category** | AI-powered prescriptive energy intelligence |
| **Entity definition** | Stamped Energy is AI-powered prescriptive energy intelligence software for energy-intensive plants in India. Connects meters, SCADA, PLCs, and DISCOM bills into ranked prescriptions with outcomes verified with evidence (DISCOM bill confirmation optional). |
| **ICP bill filter** | Built for plants with ₹20 lakh+ monthly electricity bills. |
| **Audience** | Plant directors, VP Operations, electrical heads, CFOs at energy-intensive plants in India (₹200 Cr+ revenue). |
| **Verticals** | Cement, steel, pharmaceutical, chemical, automotive |
| **Benchmark outcomes** | 12-20% monthly bill reduction; 15-25% MD reduction - always labelled indicative; pilot replaces with plant figures |
| **Not** | Passive EMS dashboard or SCADA replacement |

**Homepage hero (2026-08 live):**

- Badge: For industrial plants
- H1: Act on energy opportunities in real time.
- Supporting: rupee-scored prescriptions from plant, application, and live market data
- FAQ: remounted on homepage (`HomeTerminalBand`) with FAQPage JSON-LD

---

## Purpose

| Discipline | Goal |
|------------|------|
| **SEO** | Rank for brand, category, and vertical-intent queries in Google/Bing |
| **AEO** | Be cited as the authoritative answer in AI assistants (ChatGPT, Perplexity, Google AI Overviews, Claude) |
| **GEO** | Establish **Stamped Energy** as a recognizable entity across the web (schema, profiles, Wikidata, consistent entity sentences) |

---

## Keyword strategy

### Tier 1 - Brand

| Keyword | Primary page |
|---------|--------------|
| `stamped energy` | `/` |
| `stamped energy india` | `/` |
| `stamped.work` | `/` |

### Tier 2 - Category

| Keyword | Primary page |
|---------|--------------|
| `AI-powered energy intelligence India` | `/` |
| `prescriptive energy intelligence India` | `/`, `/platform` |
| `energy management software for plants India` | `/solutions/load-energy` |
| `maximum demand reduction India` | `/resources/maximum-demand-india` |
| `DISCOM bill savings India` | `/resources/discom-bill-guide` |
| `Stamped vs EMS` / SCADA disambiguation | `/resources/stamped-vs-ems` |

### Tier 3 - Vertical

| Vertical | Primary page |
|----------|--------------|
| Cement | `/industries/cement` |
| Steel | `/industries/steel` |
| Pharma | `/industries/pharma` |
| Chemical | `/industries/chemical` |
| Automotive | `/industries/automotive` |

Per-page `keywords` arrays live on each `PAGE_SEO` entry in `lib/seo/pages.ts` (not only the global `SEO_KEYWORDS` fallback).

---

## Code architecture

| File | Responsibility |
|------|----------------|
| `lib/content/icp.ts` | Positioning SSOT |
| `lib/seo/pages.ts` | Titles, descriptions, **per-page keywords**, paths |
| `lib/seo/metadata.ts` | `buildPageMetadata()` / `buildPageMetadataFromConfig()` |
| `lib/seo/constants.ts` | `SITE_URL`, OG, `SEO_KEYWORDS`, `COMPANY_LINKEDIN_URL` |
| `lib/seo/schemas.ts` | JSON-LD |
| `lib/seo/llms-index.ts` | Builders for `llms.txt` body + `/llms-full.txt` |
| `lib/content/resource-guides/` | SEO lander copy SSOT |
| `app/sitemap.ts` | Static + uncapped blogs + case studies + resources |
| `public/llms.txt` | Static AI site guide (regen via `buildLlmsTxtBody`) |
| `app/llms-full.txt/route.ts` | Dynamic full index |

**Environment:** Set `NEXT_PUBLIC_SITE_URL=https://stamped.work` in production.

---

## Completed (2026-08-20 full SEO pass — ADR-029)

- [x] Sitemap soft-fail + uncapped post/case helpers (`listPublishedPostsForSitemap`, `listPublishedCaseStudiesForSitemap`)
- [x] Homepage FAQ remounted + FAQPage + Speakable JSON-LD; speakable CSS classes on hero/impact
- [x] WebSite SearchAction → `/case-studies?search={search_term_string}` with catalog hydration
- [x] Per-page keywords on all `PAGE_SEO` routes including `/resources/*`
- [x] `COMPANY_LINKEDIN_URL` constant wired into Organization `sameAs` (empty until URL confirmed)
- [x] `/case-studies/[slug]` restored from CMS (no longer 308 to listing)
- [x] `/resources` hub + stamped-vs-ems + maximum-demand-india + discom-bill-guide
- [x] Extremely detailed `public/llms.txt` + expanded `/llms-full.txt`
- [x] Nav/footer Resources → `/resources` with guide links
- [x] `npm run build` green (resources routes + case study SSG present)

---

## Remaining (owner: Marketing / Founders)

| Item | Status |
|------|--------|
| Paste LinkedIn Company URL into `COMPANY_LINKEDIN_URL` | Pending your URL |
| Google Search Console: resubmit sitemap after deploy; URL Inspection | You |
| Google Business Profile | Not done |
| Wikidata | Not done |
| Custom OG images per major page | Medium |
| Per-vertical blog depth (pharma HVAC, steel furnace) | Medium |
| Real named M&V case studies | When plant permission exists |

---

## How to update when positioning changes

1. Update `lib/content/icp.ts` first.
2. Sync `lib/seo/pages.ts` / `constants.ts` if needed.
3. Regenerate `public/llms.txt`: `npx tsx -e "import { buildLlmsTxtBody } from './lib/seo/llms-index.ts'; import { writeFileSync } from 'fs'; writeFileSync('public/llms.txt', buildLlmsTxtBody());"`
4. Update this file.

## How to add a resource guide

1. Add module under `lib/content/resource-guides/`.
2. Register in `index.ts` + `PAGE_SEO` + `app/resources/{slug}/page.tsx`.
3. Add to `app/sitemap.ts` STATIC_PATHS.
4. Regen `public/llms.txt`.

---

## Validation checklist

- [x] `npm run build` passes (2026-08-20)
- [ ] Production `https://stamped.work/sitemap.xml` returns 200 after deploy
- [ ] Rich Results Test on `/`, one blog, one case study, one resource guide
- [ ] GSC sitemap resubmit
- [ ] `llms.txt` uses `https://stamped.work` (not localhost)

---

## Related docs

- `PROGRESS.md`, `DECISIONS.md` (ADR-029), `IMPLEMENTATION_PLAN.md`
- `lib/content/icp.ts`, `lib/seo/llms-index.ts`

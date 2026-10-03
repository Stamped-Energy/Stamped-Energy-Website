# SEO, GEO and AEO - Stamped (`stamped.work`)

How the site is set up for search engines (SEO), for being named as an entity by AI systems (GEO), and for being quoted as the answer by AI assistants (AEO), and how to check it.

**Last updated:** 2026-10-03 (ADR-040) · **Domain:** `https://stamped.work`

---

## Positioning

All search and answer copy comes from `lib/content/`, mainly `icp.ts`, `landing.ts`, `solutions.ts` and `platform.ts`. Do not hardcode positioning in components or SEO files.

| Field | Current value |
|-------|---------------|
| Brand | Stamped (alternate names in schema: Stamped Energy, stamped.work) |
| Category | AI for industrial plants. Tagline: AI for plant operations |
| What it does | Models the plant from the data it already records and improves process, quality, planning and maintenance. Energy is counted inside every action. |
| Audience | Plant heads, operations, quality and maintenance leaders at Indian manufacturing plants. Auto components, steel, cement, pharma and chemicals |
| Proof stance | Results are checked against the plant's own baseline. No published ₹ or % outcome figures until a named pilot exists |
| Control line | Stamped recommends and your team decides. |
| Not | Another MES, CMMS or dashboard. Works alongside MES, ERP and SCADA |

---

## Code map

| File | Responsibility |
|------|----------------|
| `lib/seo/pages.ts` | Title, description, path and keywords per page (`PAGE_SEO`) |
| `lib/seo/metadata.ts` | `buildPageMetadata()`, canonical, OG, Twitter, RSS alternate |
| `lib/seo/constants.ts` | `SITE_URL`, OG image, `CONTENT_UPDATED`, `SEO_KEYWORDS`, `COMPANY_LINKEDIN_URL` |
| `lib/seo/schemas.ts` | JSON-LD builders, typed with `schema-dts` |
| `lib/seo/crawlers.ts` | Search and AI crawler list for `robots.txt` |
| `lib/seo/llms-index.ts` | Builders for `public/llms.txt` and `/llms-full.txt` |
| `lib/seo/ai-discovery.ts` | Builders for `/.well-known/ai.txt` and `/ai/*.json` |
| `app/sitemap.ts`, `app/robots.ts` | Sitemap (static `lastModified` = `CONTENT_UPDATED`) and robots |
| `app/feed.xml/route.ts` | RSS 2.0 feed of posts and case studies |

**Environment:** set `NEXT_PUBLIC_SITE_URL=https://stamped.work` in production.

### Structured data by page

| Page | JSON-LD |
|------|---------|
| All pages (layout) | Organization (logo, founders, `sameAs` LinkedIn, slogan), WebSite with SearchAction |
| Every marketing page | WebPage (or AboutPage, ContactPage, CollectionPage) with `dateModified`, BreadcrumbList |
| `/` | SoftwareApplication, FAQPage, Speakable |
| `/platform` | HowTo, FAQPage |
| `/solutions/{process,quality,planning,maintenance}` | Service, FAQPage |
| `/industries/*` | FAQPage |
| `/blog/*`, `/case-studies/*` | Article with Person authors |

### FAQs

Visible FAQs and FAQPage schema come from the same arrays, so they cannot drift: `landingContent.faq`, `platformContent.faq`, each `solutionsContent.areas[].faq`, and each vertical page `faq`. Answers are written answer-first and use approved copy only. `/ai/faq.json` and `llms.txt` read the same arrays.

---

## Tools and commands

| Command | What it checks |
|---------|----------------|
| `npm run seo:check` | Every `PAGE_SEO` title is 60 characters or fewer and description 160 or fewer. Fails the run otherwise |
| `npm run seo:audit` | GEO Optimizer 4.18.3 on 11 key pages; writes `reports/seo/geo-<stamp>.json`. Needs `uv` installed |
| Unlighthouse (below) | Lighthouse performance, accessibility, best practices and SEO for the same 11 pages |

Run audits against a production build, not the dev server:

```bash
npx next build
npx next start -p 3100
SEO_BASE_URL=http://localhost:3100 npm run seo:audit
npx -y @unlighthouse/cli@latest --site http://localhost:3100 --ci --reporter jsonExpanded \
  --output-path reports/seo/unlighthouse-<name> \
  --urls "/,/platform,/solutions,/solutions/process,/solutions/quality,/solutions/planning,/solutions/maintenance,/industries/automotive,/about,/case-studies,/contact" \
  --disable-robots-txt --disable-sitemap --throttle false
```

`reports/` is gitignored. GEO Optimizer blocks localhost by default; `scripts/geo-audit.py` lifts that block for local runs only.

---

## Scores (2026-10-03, local production build)

| Audit | Baseline | After ADR-040 |
|-------|----------|---------------|
| GEO Optimizer average (11 pages) | 69.9 | 86.5 |
| Lighthouse performance (average) | 0.73 | 0.86 |
| Lighthouse accessibility | 0.92 | 0.96 |
| Lighthouse best practices | 0.96 | 0.96 |
| Lighthouse SEO | 0.978 | 0.985, with 1.0 on `/solutions` in a re-run after the link-text fix |

The remaining Lighthouse SEO misses are robots.txt fetch timeouts on the local server, not site issues. Performance moves between local runs, so treat it as indicative.

What still costs GEO points:
- Knowledge-graph `sameAs` covers only LinkedIn (needs the off-site profiles below).
- Keyword density and a few decorative images without alt text.

---

## Off-site checklist (owner: founders)

| Item | Status |
|------|--------|
| LinkedIn Company Page (`linkedin.com/company/stampedwork`) | Done, in Organization `sameAs` |
| Google Search Console: submit `sitemap.xml`, inspect key URLs after deploy | Registered; resubmit after deploy |
| Bing Webmaster Tools (also feeds ChatGPT search and Copilot): import from Search Console | Not done |
| Wikidata item for Stamped (then add its URL to `sameAs`) | Not done |
| Crunchbase profile (then add to `sameAs`) | Not done |
| Google Business Profile | Not done |
| Rich Results Test on `/`, one solution page, one blog post | After deploy |

When a new profile exists, add its URL to `sameAs` in `organizationSchema` (`lib/seo/schemas.ts`) and to `buildAiSummary` (`lib/seo/ai-discovery.ts`).

---

## When copy or positioning changes

1. Edit `lib/content/` first.
2. Update `lib/seo/pages.ts` if titles or descriptions change, then run `npm run seo:check`.
3. Bump `CONTENT_UPDATED` in `lib/seo/constants.ts`.
4. Regenerate `public/llms.txt`: `npx tsx -e "import { buildLlmsTxtBody } from './lib/seo/llms-index'; import { writeFileSync } from 'fs'; writeFileSync('public/llms.txt', buildLlmsTxtBody());"`
5. Re-run the audits and update the scores above.

---

## History

- ADR-029 (2026-08): first full pass under the old energy positioning.
- ADR-032: `/resources` folded into `/case-studies`.
- ADR-033 to ADR-039: copy v3, rebrand to Stamped, four improvement areas.
- ADR-040 (2026-10-03): audit-driven pass described here.

Related: `PROGRESS.md`, `DECISIONS.md`, `docs/copy/stamped-copy-v3.md`.

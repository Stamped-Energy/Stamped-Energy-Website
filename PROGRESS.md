# Progress

## Current Phase

Helvetica Neue site-wide typography (ADR-014) - complete (2026-08-01) on `feat/ia-solutions-platform`

## Completed Phases

- [x] Project rules created (`.cursor/rules/`)
- [x] Documentation stubs created
- [x] `AGENTS.md` orchestration added
- [x] Site architecture and tech stack defined
- [x] Next.js 15 + Tailwind v4 + GSAP + Lenis scaffold
- [x] Centralized theme tokens (`styles/theme.css`)
- [x] Typed content layer (`lib/content/`)
- [x] Landing page sections implemented
- [x] Contact form + `/api/contact` stub route
- [x] Production build and lint validation
- [x] GSAP + ScrollTrigger + Lenis motion provider (replaced Framer Motion)
- [x] SEO/AEO - page titles, meta descriptions, canonical/OG/Twitter on all routes
- [x] SEO/AEO - JSON-LD (Organization, WebSite, FAQ, HowTo, Article, Breadcrumb, Person, Speakable)
- [x] SEO/AEO - dynamic sitemap priorities, robots.ts, `llms.txt`
- [x] Multi-vertical industries + ICP + scenario content
- [x] Merge Blog + Case Studies public UI (ADR-009)
- [x] Flat theme overhaul (ADR-010)
- [x] **IA overhaul (ADR-011)** - Solutions hub + pillars; `/platform` + `/how-it-works` 308; six-step Improve loop; homepage 7 sections; slim About/Contact; Verified with evidence copy; orphan cleanup
- [x] **Polish pass** - homepage outcomes band; detailed Solutions pillar pages; IU-style Industries hub (thesis + comparison + FAQ); thinner vertical pages; real-time intelligence copy; em-dash scrub; footer craft
- [x] **Nav mega-menus (ADR-012)** - Solutions + Industries IU-style numbered list dropdowns (click hub / hover items); Solutions hub numbered briefs + Explore CTAs; homepage outcomes/Rx commit `e8823c8`
- [x] **Solutions craft (ADR-013)** - photo heroes, bordered outcomes, Rx cards, numbered levers; Improve copy = decisions taken / verified outcomes (no followed-vs-ignored)
- [x] **Typography (ADR-014)** - Helvetica Neue system stack for display + body site-wide; drop Inter / Plus Jakarta; C3-inspired type rhythm only
- [x] **Solutions ML narrative** - agentic load-energy + plant-tuned models copy; AgenticEnergyVisual + EarlyDetectionVisual (illustrative, GSAP); problem band dark / method band light with black visual cards; equipment chart shows dual paths + single “40-50% earlier…” line (no badge box)
- [x] **Industries By industry zig-zag (ADR-015)** - black alternating image/copy cards from existing vertical metrics/equipment; full-card links; no fleet claims or named customers; replaces comparison table
- [x] **Client-facing QA (2026-08-01)** - vertical copy scrub (truncated %, run-ons, competitor-style attributions); hero isometric bg matched to `#f7faf5`; `tsc` + `next build` green

## Remaining Phases

See **`SEO_GEO_AEO.md` → Remaining & ongoing maintenance** for the full list. Highlights:

- [ ] **Google Business Profile** (Section 12 #3)
- [ ] **LinkedIn Company Page** (Section 12 #4) - then update Organization schema `sameAs`
- [ ] **Wikidata entry** for Stamped Energy (Section 12 #5)
- [ ] Replace placeholder industry hero images (cement, steel, pharma, chemical photo shoot)
- [ ] Dashboard walkthrough video for homepage prescription section
- [ ] Industries vertical rewrite (deferred from IA overhaul)
- [ ] Case Studies redesign (deferred)
- [ ] Per-vertical blog posts (content roadmap P2)
- [ ] Real case studies for cement/steel/pharma/chemical
- [ ] Contact form email/CRM forwarding
- [ ] Customer logos, testimonials

## Active Blockers

None.

## Push / PR readiness

Branch `feat/ia-solutions-platform` (from `feat/flat-theme-tokens`): `npx tsc --noEmit` and `npm run build` passed 2026-08-01. Not pushed until requested.

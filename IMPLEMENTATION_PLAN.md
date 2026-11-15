# Implementation Plan — Website v4 products overhaul (ADR-050..054)

_Status: Approved. Branch `redesign/v4-products`. In progress Phase 0 (15 Nov 2026)._

## Goal

Rebuild stamped.work around two products (Quelta = Process and Quality with maintenance flags; Orrery = Ask), Scheduling as coming soon, outcome claims, NVIDIA Inception + AWS for Startups trust strip, a six-rung vision ladder, and a clean modern YC-style design system. Write a new DESIGN.md from the finished site.

## Scope

- Full public site (home, products, platform, industries, about, contact, resources, 404, OG)
- Nav, footer, mega menus, redirects from `/solutions/*`
- Design system v4 (OKLCH tokens, Geist, AA contrast script)
- Mascot port for Orrery
- SEO/GEO/AEO updates
- Agent research and review gates
- Docs: ADRs 050–054, copy deck, DESIGN.md, PROGRESS, VOICE_AND_CLAIMS, STAMPED_CONTEXT

## Non-goals

- Machining on the site
- Prices, client logos, 17% figure
- Blog admin restyle
- Database/Prisma changes without approval
- Bundle price decision
- Editing the Cursor plan file

## Phase breakdown

0. Plan, ADRs, canon, locked copy deck
1. Agent design research + `docs/design/v4-direction.md`
2. Design system + hero/products checkpoint (approval gate)
3. Content model, nav, `/products` routes, redirects
4. Homepage nine bands; retire old sections/slots
5. Agent review A (homepage + chrome); apply fixes
6. Product pages + mascot
7. Secondary pages
8. Agent review B + SEO
9. Final QA, new DESIGN.md, PR

## Dependencies

- Official NVIDIA Inception and AWS for Startups badge assets (founder-supplied)
- Design sign-off on logo-as-mascot
- Evidence for 30% / 10% claims
- Demo screenshots from `Core/experience-integration/demo`

## Risks

- "Backed by" wording vs programme rules (accepted)
- Quelta / Orrery trademark clearance pending
- Search ranking on `/solutions/*` (308 + sitemap + IndexNow)
- Space Grotesk drop vs demo owner view
- No automated E2E suite

## Deliverables

- Live two-product site on branch `redesign/v4-products`
- `docs/copy/v4-copy-deck.md`, `docs/design/v4-direction.md`, new `DESIGN.md`
- Phase completion reports PHASE_0..9

## Copy SSOT

`docs/copy/v4-copy-deck.md` then `lib/content/products.ts` + updated landing/site/about/contact.

---

# Implementation Plan â€” Full SEO / GEO / AEO (ADR-029)

_Status: Implementation complete in-repo 2026-08-20. Deploy + GSC + LinkedIn URL pending founders._

## Goal

Make stamped.work crawlable, FAQ-ready for AEO, entity-ready for GEO, keyword-mapped per route, and content-rich with `/resources` landers and durable case-study URLs.

## Scope

- Sitemap helpers and soft-fail
- Homepage FAQ + Speakable + SearchAction
- Per-page keywords + `COMPANY_LINKEDIN_URL`
- Restore `/case-studies/[slug]`
- `/resources` hub + three guides
- Detailed `llms.txt` / `llms-full.txt`
- Docs: `SEO_GEO_AEO.md`, `PROGRESS.md`, `DECISIONS.md`

## Non-goals

- Guaranteeing #1 for global EMS head terms
- Inventing customers or fleet metrics
- Editing the Cursor plan file
- Creating GBP / Wikidata / LinkedIn page (founder actions)

## Phase breakdown

1. Sitemap completeness  
2. Homepage FAQ / AEO  
3. Keywords + entity constant  
4. Case study detail restore  
5. Resource guides  
6. llms expansion  
7. Docs + build validation  

## Validation

- `npm run build` green (resources + case-study routes present)
- Post-deploy: GSC sitemap resubmit

---

# Implementation Plan â€” `/platform` static product page (ADR-026)

_Status: Implementation complete. Hero layout updated 2026-08-20 (ADR-028)._

## Goal

Rebuild `/platform` as a static product page: short hero, three surfaces, four models, technical core capabilities, bordered Connect-to-Improve loop, already-have vs Stamped-adds, weeks-only close.

## Scope

- `lib/content/platform.ts`
- `app/platform/page.tsx`
- `HiwOpening`, `HiwProseStack`, `HiwStaticLoop`, `HiwOutcomesBand`, `HiwDeployment`
- Unmount `HiwPinnedJourney` and live dashboard
- Docs: `docs/website-copy.md`, `PAGE_SEO.platform`, HowTo JSON-LD, ADR-026

## Non-goals

- Homepage HIW pin
- Inner-page closing CTA
- Cloning CVector chrome or eight-model catalog
- Editing the Cursor plan file

## Phase breakdown

1. Content SSOT
2. Layout (hero, surfaces, models, capabilities, static loop)
3. Compare + two-week deployment
4. Docs / SEO

---

# Implementation Plan â€” About CVector-style structure (ADR-023)

_Status: Implementation complete. Four conventional commits: content â†’ layout â†’ inner CTA strip â†’ docs._

## Goal

Restructure `/about` to CVector section order (photo hero with white type, narrative Our Story, founders, values last) and remove shared inner-page closing CTAs everywhere except the homepage.

## Scope

- `lib/content/about.ts` and inner-page `finalCta` keys / `VerticalPage` type
- `components/about/*`
- Unmount and delete `MarketingClosingCta`, `HiwPageCta`, `IndustryPageCta`
- Docs: `DECISIONS.md` ADR-023, `PROGRESS.md`, `docs/website-copy.md`

## Non-goals

- Careers, investors, job listings
- New hero or founder photography
- Homepage `LandingClosingCta`, navbar, or footer
- Cloning CVector type, colors, or sentences

## Dependencies

- Existing `/industries/die-casting.jpeg` and `/team/*` photos
- GSAP + `SectionBadge` already on About
- `/about` already in dark-hero nav allowlist

## Risks

- White headline contrast on the photo (bottom-weighted scrim)
- Conversion: inner pages lose the dedicated discovery band; Contact remains in nav/footer

## Deliverables

- `/about`: cinematic hero â†’ narrative story â†’ founders â†’ values
- Homepage-only page-level closing CTA
- ADR-023 recorded

---

# Implementation Plan â€” Homepage hero plant-flow (ADR-022)

_Status: Implementation complete. Visual QA against `handoff/hero-plant-flow/hero-plant-flow.html` remaining._

## Goal

Replace the homepage hero MotionSlot with the handed-off Stamped plant-flow motion graphic, ported faithfully into Next.js.

## Scope

- `components/sections/hero/HeroPlantFlow.tsx` (client)
- `components/sections/hero/HeroPlantFlow.css`
- `components/sections/hero/heroPlantFlowEngine.ts`
- `components/sections/Hero.tsx` visual slot
- IBM Plex Mono 600/700 for chip/live tags
- Docs: ADR-022, PROGRESS

## Non-goals

- Deleting `handoff/hero-plant-flow/`
- Replacing other MotionSlots (HIW, WhatIs, Solutions, Problem)
- New visual language or invented fleet metrics
- EMS / MES / PLC-replacement claims
- Dev preview route

## Dependencies

- Public assets `/hero-plant-flow/plant.png` and `/hero-plant-flow/logo.png`
- Existing hero GSAP intro on `[data-hero-animate="visual"]`
- Site fonts: Space Grotesk, Inter, IBM Plex Mono

## Risks

- Chip (0,0) flash if visibility is forced before SVG layout
- Prescriptions panel clipped if stage is shorter than Frame 10 aspect
- GSAP `autoAlpha` racing the plant-flow open sequence
- Mobile viewport vs stage width (graphic uses min-width 860px + horizontal scroll)

## Deliverables

- Animated plant â†’ Stamped â†’ prescriptions flow on `/`
- Reduced-motion static placement
- Handoff folder left in place

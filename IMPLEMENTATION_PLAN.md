# Implementation Plan — `/platform` static product page (ADR-026)

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

# Implementation Plan — About CVector-style structure (ADR-023)

_Status: Implementation complete. Four conventional commits: content → layout → inner CTA strip → docs._

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

- `/about`: cinematic hero → narrative story → founders → values
- Homepage-only page-level closing CTA
- ADR-023 recorded

---

# Implementation Plan — Homepage hero plant-flow (ADR-022)

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

- Animated plant → Stamped → prescriptions flow on `/`
- Reduced-motion static placement
- Handoff folder left in place

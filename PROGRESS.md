# Progress

## Current Phase

Platform product hero (ADR-028): CVector `/product` rhythm on `/platform`; contact form two-column polish. Industry zig-zag (ADR-027) remains shipped. Mobile distill: three Impact stats below `md`; denser home and zig-zag copy hidden or clamped.

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
- [x] **Mobile UX polish** - About stacked founders + shorter copy; Improve loop vertical on mobile; industries zig-zag stacks; larger ML visual taps; navbar `h-11` menu button
- [x] **Founder bios + hero trim (2026-08-02)** - restore medium-long founder bios (mobile clamp kept); remove homepage hero ICP bill floor line
- [x] **CVector-inspired home content (ADR-016 Phase 1)** - ₹-scored CVector-shaped copy; solution display rename; footer columns
- [x] **CVector chrome (ADR-016 Phase 2)** - navbar/footer restyle
- [x] **CVector homepage structure (ADR-016 Phase 3)** - new section stack + MotionSlot placeholders; FAQ off home
- [x] **CVector docs/SEO (ADR-016 Phase 4)** - ADR-016, meta titles, build green
- [x] **CVector visual QA (ADR-016 Phase 5)** - founder-reviewed; no further layout fixes this pass
- [x] **Typography (ADR-017)** - Space Grotesk + Inter + IBM Plex Mono replacing Helvetica Neue
- [x] **Homepage HIW pin (ADR-018)** - client GSAP ScrollTrigger pin/scrub through Data → Analysis → Prescriptions → Decisions; stacked mobile / reduced-motion
- [x] **CVector-style nav dropdowns (ADR-018)** - Solutions/Industries button triggers (not hub links); compact hover panel; item links only
- [x] **Stitch DESIGN.md** - overwrite root DESIGN.md with YAML tokens + six Stitch sections extracted from homepage/chrome; North Star “Plant-office decision layer”
- [x] **OpenMontage brand pack (ADR-019)** - self-contained product context + C-Vector motion audit + Impeccable `DESIGN_VIDEO` + `stamped-industrial` playbook + prompts; four docs commits
- [x] **Remaining pages DESIGN.md pass (ADR-020)** - shared SectionBadge + MarketingClosingCta; Solutions hub/pillars; Platform outcomes band (pin kept); Industries hub + segments; About story; Contact; Case Studies shell polish; `tsc` + `next build` green (2026-08-11)
- [x] **CVector solution pillars (ADR-021)** - Outcomes → 4 How-it-works zig-zag (reserved media) → 3 practical Rx examples → Industries → CTA on both pillars; no Benefits band
- [x] **Homepage hero plant-flow (ADR-022)** - OpenMontage handoff ported into `HeroPlantFlow`; replaces MotionSlot in homepage hero visual slot
- [x] **About CVector-style structure (ADR-023)** - cinematic photo hero, narrative Our Story, founders, values last; inner-page closing CTAs removed except home `LandingClosingCta`
- [x] **Origin story copy (ADR-024)** - company-voice Our Story + intelligence layer hero; light homepage problem/what-is; canon in STAMPED_CONTEXT / VOICE_AND_CLAIMS; `external/` still pending
- [x] **Public copy canon in external (ADR-025)** - `external/brand/` COPY_CANON + WEBSITE_COPY; rupee-scored / rupee-ranked on site; old About hero superseded
- [x] **Platform page static revamp (ADR-026)** - surfaces, models, capabilities, static loop, weeks-only close; dashboard and pin unmounted
- [x] **Industry pages plant zig-zag (ADR-027)** - accordion unmounted; in-this-plant photo zig-zag; three Rx; three gains; FAQ dropdowns; automotive template applied to all five verticals
- [x] **Platform product hero (ADR-028)** - homepage-style split: H1 left, body/CTAs right; no side chrome; contact two-column form + hero CTA
- [x] **Mobile content distill** - Impact three stats on small screens; HIW bullets and resource blurbs hidden on phone; zig-zag bodies clamped. Problem chromes stay on mobile. Desktop unchanged.
- [x] **Solution Rx cards** - both pillars use separated industry-style cards; copy distilled to title, one line, ₹, assignee.
- [x] **Industry photo rematch (2026-08-20)** - steel zig-zag uses mill/forging/cooling shots; pharma hero + band use cleanroom/chillers/utility hall

## Remaining Phases

- [x] Homepage MotionSlots A01–A04, A09–A10 — problem strips, product visual, solutions chromes (`components/motion-slots/`)
- [x] Homepage HIW stage visuals (A05–A08) — `HiwStageVisuals` in `HomeHowItWorks`
- [x] `/solutions/load-energy` How it works chromes — `LoadEnergyHiwVisuals`
- [x] `/solutions/equipment-intelligence` How it works chromes — `AssetHealthHiwVisuals`
- [ ] First OpenMontage production using `stamped-industrial` playbook (outside this repo)
- See **`SEO_GEO_AEO.md` → Remaining & ongoing maintenance** for SEO list. Highlights:
- [ ] **Google Business Profile** (Section 12 #3)
- [ ] **LinkedIn Company Page** (Section 12 #4) - then update Organization schema `sameAs`
- [ ] **Wikidata entry** for Stamped Energy (Section 12 #5)
- [ ] Replace placeholder industry hero images (cement, steel, pharma, chemical photo shoot)
- [ ] Industries hub live page (still redirects to automotive)
- [ ] Case Studies deeper editorial redesign (listing/shell polished in ADR-020; full rewrite still open)
- [ ] Per-vertical blog posts (content roadmap P2)
- [ ] Real case studies for cement/steel/pharma/chemical
- [ ] Contact form email/CRM forwarding
- [ ] Customer logos, testimonials

## Active Blockers

None.

## Push / PR readiness

`main` is ahead of origin with ADR-023/024/025 About, origin-story, and copy-canon work. Push when requested or at auto-push threshold. Submodule `external/` brand files are local until stamped-external is committed and the pin is bumped.

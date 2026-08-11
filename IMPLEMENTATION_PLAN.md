# Implementation Plan

_Status: active; CVector-inspired homepage + chrome revamp (ADR-016) in progress 2026-08-11._

## Approved Requirements

- Next.js 15 + TypeScript + Tailwind v4 + GSAP + Lenis
- Nav: Solutions · Platform · Industries · Case Studies · About · Contact
- Routes: `/solutions` + pillars; `/platform` (308 from `/how-it-works`); Industries; Case Studies; About; Contact
- Homepage follows CVector narrative arc (ADR-016): Hero → Problem → What is → How it works → Impact → Solutions (2) → Industries → Resources → Closing CTA. No testimonials/security. Motion placeholders only this pass.
- Public solution names: Industry Energy Management; Asset Health Intelligence (slugs unchanged)
- Proof: Verified with evidence; indicative impact ranges + disclaimer; no MES / Plant Margin live claims
- Scroll-driven GSAP animations with reduced-motion fallback (full Rive/complex motion later)
- On-page contact form posting to Next.js API route stub
- Centralized theming via `styles/theme.css` (flat Forge tokens)
- Content separated into typed `lib/content/` layer

## Architecture Decisions

See `DECISIONS.md`.

## Phase Breakdown

### Phase 1 - Scaffold (complete)

- Next.js project setup, theme tokens, content layer, layout shells, route stubs

### Phase 2 - Motion + Hero (complete)

- Lenis smooth scroll, GSAP registration, Reveal helper, animated hero

### Prior marketing IA (complete)

- ADR-011 through ADR-015 and polish passes; see `PROGRESS.md`

### ADR-016 - CVector home + chrome (in progress)

1. Content + IA map (complete)
2. Navbar + Footer chrome (complete)
3. Homepage sections + MotionSlot (complete)
4. SEO, docs, build validation (this phase)
5. Extensive visual QA (next)

## Deliverables

- Marketing site with CVector-inspired home narrative on Stamped brand
- Shared chrome matching the new visual lane
- Animation backlog via labeled MotionSlot regions

## Risks

- Long homepage vs prior section cap (accepted)
- Close copy adaptation must stay Stamped-specific (no CVector claims)
- Impact % band requires disclaimer discipline

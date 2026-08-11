# Implementation Plan

_Status: Remaining pages CVector-inspired DESIGN.md pass (ADR-019) — in progress._

## Mode

**feature** — hybrid depth 2.5: visual system + light Stamped-truth copy + selective section restructure (not a CVector clone).

## Goal

Every public marketing page feels like one Stamped brand system (home-caliber chrome, SectionBadge, rhythm, closing CTAs) while staying product-true for Indian energy-intensive plants.

## Scope

- Shared primitives: `SectionBadge`, `MarketingClosingCta`
- Solutions hub + 2 pillars; Platform; Industries hub + 5 verticals; About; Contact; Case Studies listing (+ light article shell)
- Light content polish in `lib/content/*` (no invented fleet metrics)
- ADR-019 + PROGRESS; `tsc` + `next build`

## Non-goals

- Homepage redesign (ADR-016/018 baseline)
- Blog admin / CMS UI
- Plant Margin, Custom Model Integration, Dispatchable Power
- Careers board, sitewide testimonials, ISO/TSA claims Stamped cannot make
- Real Rive replacing MotionSlots
- Route / IA hub changes

## Authority

- `DESIGN.md` (Stitch SoT), `PRODUCT.md`, `styles/theme.css`, ADR-016/017/018
- CVector.com = structure inspiration only

## Phase breakdown

| Phase | Objective | Exit gate |
|-------|-----------|-----------|
| **0** | Shared SectionBadge + MarketingClosingCta | Visual smoke on pilot |
| **A** | Solutions hub + both pillars selective restructure | Desktop + mobile smoke |
| **B** | Platform badges/bands/CTA; keep HIW pin | Smoke + reduced-motion |
| **C** | Industries hub + vertical template | All 5 verticals render |
| **D** | About, Contact, Case Studies | Forms/links work |
| **E** | ADR-019, PROGRESS, tsc/build, home regression | Gates green |

## Commit matrix (8)

1. `refactor(ui): shared SectionBadge and closing CTA for inner pages`
2. `feat(solutions): hub and pillars DESIGN.md pass`
3. `feat(platform): align platform to DESIGN.md`
4. `feat(industries): hub and vertical template polish`
5. `feat(company): about and contact DESIGN.md pass`
6. `feat(resources): case-studies listing polish`
7. `docs: ADR-019 and PROGRESS for remaining-pages pass`
8. `chore: typecheck and build after remaining-pages pass`

## Risks

- Over-cloning CVector → hybrid rule + copy differentiation
- Platform pin break → smoke after Phase B
- Content voice drift → light polish only

## Prior complete work

- ADR-016 CVector homepage + chrome
- Stitch-format `DESIGN.md` as system of record

# DESIGN.md — Stamped website v4

Derived from the shipped `redesign/v4-products` artifact (15 Nov 2026). Direction: `docs/design/v4-direction.md`. Decisions: ADR-051.

## Intent

Clean, modern, YC-style marketing site for industrial AI. Coral and the logo mark are the brand anchors. Real product UI is the primary visual proof.

## Colour

| Role | Token | Value |
|------|-------|-------|
| Canvas | `--brand-neutral-25` | `#FCFCFB` |
| Muted band | `--brand-neutral-50` | `#F7F7F5` |
| Card | white | `#FFFFFF` |
| Ink / dark band | `--brand-inverse-surface` | `#0B0B0A` |
| Text | `--brand-neutral-950` | `#0D0C0B` |
| Secondary text | `--brand-neutral-600` | `#5E5C57` |
| Accent | coral-500 | `#F75440` |
| Link on light | coral-600 | `#D33C28` |
| Verified | `--brand-verified` | `#1F8A70` |

Primary buttons are **ink with white text**, never coral fill with white text (AA).

Contrast pairs are guarded by `npm run contrast` / `scripts/check-contrast.mjs`.

## Typography

- **Geist Sans** for display and body (`geist/font/sans`)
- **Geist Mono** for eyebrows and data (`geist/font/mono`)
- Display XL ~72–80px desktop; H2 ~44px; body 17/28
- Headings: `text-wrap: balance`. Body: `pretty`.

## Layout

- Max content width: 1200px (`--container-max`)
- Section vertical rhythm: `.section-y` (~80–128px)
- Radius: 12px cards, 8px controls
- Hairline borders (`outline-variant`); one soft shadow on `ProductFrame` only

## Components

| Component | Path | Notes |
|-----------|------|-------|
| Button | `components/ui/Button.tsx` | primary ink, on-dark white, ghost, outline |
| Section | `components/ui/Section.tsx` | light / muted / dark |
| Eyebrow | `components/ui/Eyebrow.tsx` | mono + coral dot |
| ProductFrame | `components/ui/ProductFrame.tsx` | window chrome + optional float |
| StatBand | `components/ui/StatBand.tsx` | tabular outcome figures |
| BadgeStrip | `components/ui/BadgeStrip.tsx` | Backed by partners |
| StampedMascot | `components/mascot/StampedMascot.tsx` | Orrery face |

Preview: `/design-system` (noindex).

## Motion

GSAP + Lenis. Short ease-out reveals. Hero uses `[data-hero-animate]` with SSR pending guard (`data-motion-pending`). Respect `prefers-reduced-motion`.

## Page rhythm

Dark: hero, how it works, vision, closing CTA, footer.  
Light/muted: outcomes, products, roles, industries, resources, FAQ.

## Products (visual)

- **Quelta** — product frames from demo captures
- **Orrery** — mascot + Ask thread frame
- **Scheduling** — coming soon treatment only

## Do not

- Purple gradients, cream+serif terracotta, glow spam
- Coral buttons with white text
- Abstract MotionSlots as the only product proof
- Em dashes in customer copy

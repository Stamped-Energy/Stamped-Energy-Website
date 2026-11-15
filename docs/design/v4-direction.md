# Design direction v4

_Status: Phase 1 research output for `redesign/v4-products` (15 Nov 2026)._  
_Followed by ADR-051. Supersedes visual guidance in ADR-010, 014, 016, 017 for the marketing site._

## Goal

A clean, modern, recently funded YC-style marketing site with industrial credibility. Coral `#F75440` and the Stamped logo mark are the only carry-overs from the prior system. Everything else is rebuilt.

## Reference table

| Site | Hero | Trust / proof | Product visual | Borrow for Stamped |
|------|------|---------------|----------------|--------------------|
| Linear | Dark, sparse, one accent | Quiet social proof | Product UI as hero | Ink buttons, hairline chrome, one accent |
| Vercel | Black/white, huge type | Logo cloud | Abstract + UI | Display scale, whitespace |
| Resend | Light, calm | Simple badges | Product frame | Clean light bands between dark |
| Mintlify | Light, bento | Docs-led | Cards | Bento for capabilities |
| Cal.com | Product-forward | Integrations strip | App UI | Product frame window chrome |
| Retool / Hex | UI as proof | Customer logos | Dashboards | Role tabs with real screens |
| Anduril | Dark, confident | Sparse | Hardware/product | Dark vision / HIW bands |
| Haber | Industrial AI peer | Results + certs | Role views | Outcomes band + trust strip placement |
| stamped.work (current) | Light, many sections | None | Abstract MotionSlots | Keep coral + Industrial AI badge + HIW pin idea; replace structure and chrome |

Demo product UI (`Core/experience-integration/demo`): Geist, warm `#FAFAF9`, coral for decisions only, hairline borders. Marketing site should feel like the same family as that console.

## Anti-patterns (do not ship)

- Purple-on-white / purple-indigo gradients
- Warm cream + serif + terracotta “AI default”
- Broadsheet dense newspaper columns
- Glow spam, multi-layer shadows, rounded-full pill clusters
- Coral fill buttons with white text (fails WCAG AA ~3.3:1)
- Abstract SVG loops as the only product proof

## Colour rationale

- **60 / 30 / 10:** canvas / ink / coral
- Neutrals tinted ~3% toward coral hue so greys are warm, not clinical blue-grey
- Coral-500 for marks, focus, large display accents, mascot; coral-600 for links on light
- Primary CTAs: ink on light, white on dark
- Verified teal `#1F8A70` as near-complement; amber/alarm only inside product frames

Token values: see plan §4 and `styles/theme.css` (Phase 2).

## Type rationale

- Geist Sans + Geist Mono via `next/font` (matches demo; drops Space Grotesk / Inter / IBM Plex Mono on marketing)
- Display ~72–80px desktop, tight tracking
- Body 17/28, ~64ch measure
- Tabular figures for stats

## Patterns to borrow per homepage band

| Band | Pattern source | Spec |
|------|----------------|------|
| Hero | Linear + Haber + Retool | Dark full-bleed; centred eyebrow/H1/sub/CTAs; “Backed by” badge strip under CTAs; large ProductFrame below with decision-card float |
| Outcomes | Haber results | Two huge tabular stats, hairline divider, caption under |
| Products | Mintlify bento + Cal cards | 7/12 Quelta + 5/12 Orrery; Scheduling soon row |
| How it works | Current pin + Hex | Dark; stage list + swapping ProductFrame; five stages |
| Roles | Haber role switcher | Tabs + matching demo Home view |
| Vision | Anduril sparse ladder | Six rungs, Now/Next/Later tags; Orrery line under |
| Industries | Vercel grid | Featured auto-components + four small tiles |
| Resources | Resend list/cards | Three cards |
| FAQ + CTA | Linear FAQ + Vercel CTA | Split FAQ; dark closing band |

## Demo screens to capture (Phase 2)

Prefer fresh 2x captures into `public/images/product/v4/`:

1. Owner value / Verified view (hero)
2. Decision card ex-p1 (float)
3. Lot at risk (Quelta)
4. Investigation / likely causes
5. Ask thread with records (Orrery)
6. Plant / data health (Connect stage)
7. Limits band on proposal (Test and approve)
8. Role homes: plant head, quality, process, operator

Existing QA shots in demo `docs/screenshots/` are fallback only (too plain for hero).

## Checkpoint gate (Phase 2)

Ship `/design-system` (noindex) plus desktop 1440 and mobile 390 screenshots of Hero, trust strip, Outcomes, Products. Human approval before rolling design across the rest of the site.

## Motion

Short ease-out only. Two show moments: HIW pin, mascot. Respect `prefers-reduced-motion`. Keep GSAP + Lenis.

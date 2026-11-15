# Brand tokens (v4)

**Status:** Active for `redesign/v4-products` (ADR-051).  
**Source of truth in code:** `styles/theme.css`  
**Direction:** `docs/design/v4-direction.md`  
**Full system doc:** `DESIGN.md` (written Phase 9 from the finished site)

## Carry-overs

- Coral brand colour `#F75440` (coral-500)
- Stamped logo mark

## Surfaces

| Token | Hex | Use |
|-------|-----|-----|
| neutral-25 | `#FCFCFB` | Page canvas |
| neutral-50 | `#F7F7F5` | Muted bands |
| white | `#FFFFFF` | Cards |
| ink | `#0B0B0A` | Dark bands |

## Coral

| Step | Hex | Use |
|------|-----|-----|
| 500 | `#F75440` | Marks, focus, large accent, mascot; OK on ink |
| 600 | `#D33C28` | Links on light (AA) |

**Do not** use coral fill + white text for buttons (fails AA). Primary buttons are ink.

## Type

Geist Sans (display + body) · Geist Mono (eyebrows, data). See CSS `--type-*` variables.

## Supersedes

ADR-010 flat theme surfaces, ADR-014 Helvetica, ADR-016 CVector chrome, ADR-017 Space Grotesk typography for the marketing site.

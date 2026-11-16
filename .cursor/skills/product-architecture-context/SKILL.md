---
name: product-architecture-context
description: >
  Use PRODUCT.md, DESIGN.md, DECISIONS.md, and content SSOT paths so agents
  inherit product sense and boundaries. Use when onboarding an agent, starting
  a feature, or explaining where copy and tokens live.
---

# Product and architecture context

Lint catches slop syntax. **Structure and vocabulary** catch wrong product behavior on a marketing site.

## Canonical files (this repo)

| File | Purpose |
|------|---------|
| `PRODUCT.md` | Users, value props, IA, anti-references, voice |
| `DESIGN.md` | Brand colors, typography, motion tokens |
| `AGENTS.md` | Agent entry, copy SSOT, workflow orchestration |
| `DECISIONS.md` | ADR log (extend with new sections; do not fork a second ADR tree) |
| `PROJECT_OVERVIEW.md` | System overview and constraints |
| `lib/content/*.ts` | Public marketing copy (homepage, solutions, about, site) |
| `docs/design/brand-tokens.md` | Token reference aligned with `styles/theme.css` |

Optional templates for greenfield notes: [templates/thinking/](../../../templates/thinking/). There is no separate `CONTEXT.md` or `FEATURE_MAP.md` here; use the table above instead of inventing parallel docs.

## Layout conventions

- **Routes:** `app/` (App Router), API handlers alongside pages.
- **UI:** `components/` by section; motion in `lib/motion/`.
- **Content changes:** prefer `lib/content/` and brand canon under `docs/openmontage-brand/` / `external/brand/` per `AGENTS.md`.
- **Do not** treat this repo as the product backend; showcase lives at `showcase.stamped.work` (see README).

## Agent routine

1. Read `AGENTS.md`, then `PRODUCT.md` for task framing.
2. For UI or motion work, read `DESIGN.md` and nearest section in `lib/content/`.
3. New cross-cutting decision: add an ADR block to `DECISIONS.md` before merge when the choice is enduring.
4. Respect active holds documented in `PROGRESS.md` or the user message (e.g. deploy incidents, copy freezes).

## Out of scope for agents unless asked

Deploy config, production env, Netlify/Vercel project settings, and customer-facing copy rewrites that contradict `VOICE_AND_CLAIMS.md`.
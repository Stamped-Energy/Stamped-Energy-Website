# Thinking skills (Stamped Energy Website)

Vinayak's [cursor-config-coding](https://github.com/Vinayak-RZ/cursor-config-coding) thinking pack is vendored for **local and cloud** Cursor agents. Cloud agents only see skills and rules committed under `.cursor/` in this repo.

## Skills

| Skill | When |
|-------|------|
| `think-before-ship` | Size the ask; design note + adversarial pass on large work |
| `briefing-and-planning` | 8-part brief before cloud agents / Task workers |
| `product-architecture-context` | `PRODUCT.md`, `DESIGN.md`, copy SSOT, `DECISIONS.md` |
| `formal-verification-starter` | Rare; concurrent state / costly races only |

## Rules

Always-on routers: `think-before-code.mdc`, `briefing.mdc`. They point at skills instead of duplicating `planning.mdc`, `communication.mdc`, and `execution.mdc`.

## Templates

- `templates/thinking/` — design notes and task briefs
- `templates/plans/` — plan-then-build outline (works with root `IMPLEMENTATION_PLAN.md`)
- `templates/formal/` — TLA+ / Lean starters (almost never used on this site)

## Verify

No `scripts/check.sh` from the upstream pack. Use `npm run lint` and `npm run build` when you change behaviour (see `quality-gates.mdc`).

## Optional

pstack plugin (`/add-plugin pstack`) enhances statecharts and interrogation; skills include fallbacks without it.

## Not installed from upstream

- `quality-pack/`, Dune layout, `ponytail`, and most of the 21-rule lab — this repo already has its own `.cursor/rules` workflow.
- `CONTEXT.md` / `FEATURE_MAP.md` — replaced by `PRODUCT.md`, `DESIGN.md`, and `AGENTS.md` (see `product-architecture-context` skill).
# Stamped Energy - Agent Instructions

## Project

Main website for Stamped. Design system v4 lives in `docs/design/` (`v4-direction.md` during redesign; `DESIGN.md` after Phase 9). Tokens: `styles/theme.css`.

## Active redesign

Branch `redesign/v4-products` (ADR-050..054). Products: **Quelta** (Process and Quality) and **Orrery** (Ask); Scheduling coming soon. Copy deck: `docs/copy/v4-copy-deck.md`. Do not restore four-area "What we improve" IA or retired MotionSlots A01–A04 / A09–A12.

## Copy SSOT

1. `docs/copy/v4-copy-deck.md` (locked intent)
2. Live `lib/content/` (`products.ts`, `landing.ts`, `site.ts`, `about.ts`, `platform.ts`, `contact.ts`, …)
3. Claims: `docs/openmontage-brand/context/VOICE_AND_CLAIMS.md`
4. Identity: `docs/openmontage-brand/context/STAMPED_CONTEXT.md` (use the **v4** Identity block)

When writing customer-facing copy: use that voice (or close paraphrases). Do not restore superseded About hero *Your plant has the data. It lacks the decision layer.* Write **rupee-scored** / **rupee-ranked**, never `₹-scored` / `₹-ranked`. Keep `₹` on amounts. No em dashes. No "prescriptive intelligence". Outcome figures always with "Seen across plants using Stamped."

## Workflow Orchestration

Before any task:

1. Follow `planning.mdc` - analyze requirements, create a plan, get approval.
2. Follow `communication.mdc` - surface uncertainty, risks, and tradeoffs explicitly.
3. Follow `documentation.mdc` - keep project docs at the repo root in sync.

During implementation:

4. Apply `execution.mdc` - phase-based work only; preserve architecture.

Before completion:

5. Apply `quality-gates.mdc` - validate, report, update progress.

## Documentation (repo root)

| File | Purpose |
|------|---------|
| `PROJECT_OVERVIEW.md` | Purpose, architecture, constraints |
| `IMPLEMENTATION_PLAN.md` | Approved plan and phases (v4 at top) |
| `DECISIONS.md` | Architecture decision log (ADR-050+) |
| `PROGRESS.md` | Current status and blockers |
| `SEO_GEO_AEO.md` | SEO, GEO, and AEO implementation log |
| `docs/copy/v4-copy-deck.md` | Locked v4 marketing copy |
| `docs/design/v4-direction.md` | Moodboard and design direction (Phase 1) |
| `DESIGN.md` | Design system from finished site (Phase 9) |
| `docs/openmontage-brand/references/homepage-animation-backlog.md` | **Superseded by ADR-052** — historical MotionSlots inventory |

## Open work — website v4

See `PROGRESS.md` and `IMPLEMENTATION_PLAN.md` (v4 header). Phases 0–9 on `redesign/v4-products`.

## Rule Activation

| Rule | When |
|------|------|
| rule-awareness | Always - load all rules before acting |
| planning, communication, documentation | Always |
| execution | Implementation phases |
| quality-gates | Validation and completion |

If a rule is not auto-loaded, reference it with `@execution` or `@quality-gates` in chat.

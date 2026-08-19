# Stamped Energy - Agent Instructions

## Project

Main website for Stamped Energy. Design tokens and brand direction live in `docs/design/brand-tokens.md`.

## Copy SSOT

Public homepage, solutions, and About copy live in `lib/content/` (`landing.ts`, `solutions.ts`, `about.ts`, `site.ts`). Transcript: `docs/website-copy.md`. Distilled canon: `docs/openmontage-brand/context/STAMPED_CONTEXT.md` + `VOICE_AND_CLAIMS.md`. Portable twin for other repos: `external/brand/`.

When writing customer-facing copy: use that voice (or close paraphrases). Do not restore superseded About hero *Your plant has the data. It lacks the decision layer.* Write **rupee-scored** / **rupee-ranked**, never `₹-scored` / `₹-ranked`. Keep `₹` on amounts.

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
| `IMPLEMENTATION_PLAN.md` | Approved plan and phases |
| `DECISIONS.md` | Architecture decision log |
| `PROGRESS.md` | Current status and blockers |
| `SEO_GEO_AEO.md` | SEO, GEO, and AEO implementation log and remaining checklist |
| `docs/openmontage-brand/references/homepage-animation-backlog.md` | **Homepage MotionSlots** — A00–A10 shipped. Twin: OpenMontage `brand/stamped/references/…` |
| `external/brand/` | Portable public copy canon for agents in the platform pack |

## Open work — homepage animations

Hero (A00), problem (A01–A03), product (A04), How it works (A05–A08), and solutions (A09–A10) are shipped. Optional P1 polish is inventoried in [`docs/openmontage-brand/references/homepage-animation-backlog.md`](docs/openmontage-brand/references/homepage-animation-backlog.md). Status checkbox: `PROGRESS.md`.

## Rule Activation

| Rule | When |
|------|------|
| rule-awareness | Always - load all rules before acting |
| planning, communication, documentation | Always |
| execution | Implementation phases |
| quality-gates | Validation and completion |

If a rule is not auto-loaded, reference it with `@execution` or `@quality-gates` in chat.

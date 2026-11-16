# Plan then build

Split non-trivial work into a **planning** pass and a **build** pass. Matches `briefing-and-planning` and existing `planning.mdc` approval gates.

## When to split

- New user-facing flow, cross-route refactor, CMS behaviour, or multi-file motion work.
- **Do not split** for typo, copy tweak, single-line fix, or dependency-only bump (mark **trivial**).

## Planning pass

1. Write the 8-part brief (`templates/thinking/TASK_BRIEF.md`) in the hand-off or PR description.
2. For **Large** work, run `think-before-ship` (design note in `docs/design-notes/` or update root `IMPLEMENTATION_PLAN.md`).
3. Use `templates/plans/IMPLEMENTATION_PLAN.md` for structure; record alternatives and verification commands.
4. Stop. Request human approval unless they said skip approval.

## Build pass

Give the executor: brief link, approved plan path, in/out of scope, and **"Do not replan; ask if the plan is wrong."**

Follow `execution.mdc` for phased implementation and `quality-gates.mdc` before claiming done.
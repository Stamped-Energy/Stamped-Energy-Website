# Phase completion — `/platform` static revamp (ADR-026)

## Completed

- Rewrote `lib/content/platform.ts` (hero, surfaces, models, capabilities, loop, compare, weeks-only deployment).
- Reordered `/platform`: hero → surfaces → models → capabilities → static loop → already-have vs adds → weeks.
- Removed live dashboard and scroll hint from `HiwOpening`.
- Unmounted `HiwPinnedJourney` (file kept). Homepage HIW pin unchanged.
- Synced `docs/website-copy.md`, `PAGE_SEO.platform`, HowTo JSON-LD.

## Files modified

See git diff for this change set. Primary: `lib/content/platform.ts`, `app/platform/page.tsx`, `HiwOpening.tsx`, `HiwProseStack.tsx`, `HiwStaticLoop.tsx`, `HiwOutcomesBand.tsx`, `HiwDeployment.tsx`.

## Architectural changes

`/platform` is a static product page. Connect to Improve is the loop H2, not the page H1.

## Validation

`npx tsc --noEmit` and lint on touched files (run after this report).

## Known issues

`HiwPinnedJourney` and `LiveDemoFrame` remain in the repo unused.

## Next

Visual QA on `/platform`. Push when requested.

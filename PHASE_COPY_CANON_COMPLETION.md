# PHASE COPY CANON COMPLETION (ADR-025)

## Completed work

- Replaced `₹-scored` / `₹-ranked` / `₹-scores` / `₹-ranks` with spelled-out rupee compounds on live pages, SEO, website transcript, and agent-facing brand docs. Amounts (`₹2-5L`) unchanged.
- Aligned OpenMontage canon with live About (four paragraphs), homepage problem/solution, and solutions framing. Old About hero marked superseded.
- Added `external/brand/` portable copy pack plus `stamped-copy.mdc` so copy-writing agents in the platform pack use current website voice.

## Files modified

- Live: `lib/content/site.ts`, `landing.ts`, `solutions.ts`, `lib/seo/pages.ts`
- Transcript / canon: `docs/website-copy.md`, `docs/openmontage-brand/**`, `AGENTS.md`, `DESIGN.md`
- Platform pack: `external/brand/*`, `external/AGENTS.md`, `external/README.md`, `external/CHANGELOG.md`, `external/.cursor/rules/stamped-copy.mdc`
- Project: `DECISIONS.md` ADR-025, `PROGRESS.md`

## Architectural changes

Public marketing voice now has a portable twin under `external/brand/`. Live string SSOT remains Main_Website `lib/content/`.

## Validation performed

- Grep `lib/` for `₹-scored|₹-ranked|₹-score|₹-rank`: none
- Remaining `₹-` mentions are the rule itself (do-not-write examples) or historical ADR-016/PROGRESS lines
- Amounts such as `₹2-5L` and “₹ impact” still present in content files

## Known issues

- `external/` is a submodule. These brand files are local until committed in stamped-external and the Main_Website pin is bumped.
- `WEBSITE_COPY.md` will drift if home / solutions / About change without a sync.

## Next

Commit only when asked. Then commit stamped-external and bump the submodule pointer if releasing the pack.

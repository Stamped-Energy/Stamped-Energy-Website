# Phase 1 Completion — CMS rich-text H1

## Completed work

- TipTap rich extensions allow heading levels 1–3
- Admin editor toolbar includes an H1 control
- Published/editor CSS styles `h1` larger than `h2` (including mobile reading view)
- Markdown import accepts `#` headings
- FAQ extractors accept H1 question headings
- Blog and case-study AI writer prompts allow `#` sparingly

## Files modified

- `lib/rich-content/document.ts`
- `components/rich-content/RichArticleEditor.tsx`
- `styles/rich-article.css`
- `components/blog/BlogMarkdown.tsx`
- `lib/seo/extract-faq.ts`
- `lib/blog/ai-workflow.ts`
- `lib/case-studies/ai-workflow.ts`
- `DECISIONS.md`, `PROGRESS.md`, `PROJECT_OVERVIEW.md`

## Architectural changes

None. Shared rich-content stack only; no new dependencies.

## Validation performed

- Markdown→rich parse smoke test: levels `[1, 2, 3]`
- `npm run lint` — pass (pre-existing warnings only)
- `npm run build` — pass (expected `DATABASE_URL` soft failures in this environment)

## Known issues

- Body H1s can coexist with the page title H1 (accepted per request)
- Local build lacks `DATABASE_URL`; CI should supply it

## Next phase objectives

- Push branch, open PR, confirm GitHub CI green

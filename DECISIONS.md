# Decisions

Architecture and workflow decisions for this project.

---

## ADR-001: Cursor workflow rules

**Date:** 2026-06-08

**Context:** Need a disciplined, phase-based AI development workflow for this repository.

**Alternatives:**

1. Single monolithic `.cursorrules` file
2. Modular `.cursor/rules/*.mdc` with scoped activation
3. `AGENTS.md` only

**Selected:** Modular `.mdc` rules + `AGENTS.md` orchestration.

**Rationale:** `.mdc` supports `alwaysApply` and intelligent activation; rules are version-controlled and shareable; `AGENTS.md` provides a single entry point without extra token cost.

---

## ADR-002: Centralized theme and content layers

**Date:** 2026-06-08

**Context:** Founder requires easy re-theming and maintainable edits for both humans and AI agents.

**Alternatives:**

1. Hardcode colors and copy in components
2. Tailwind config-only tokens without a dedicated theme file
3. `styles/theme.css` for colors + `lib/content/` for copy

**Selected:** `styles/theme.css` (all brand colors as CSS variables) + `lib/content/` (typed site and landing content).

**Rationale:** Re-theming is a one-file edit; copy changes do not require touching layout or animation code; strict separation improves maintainability and reduces regression risk.

---

## ADR-003: Frontend stack for marketing site

**Date:** 2026-06-08

**Context:** Need a premium industrial SaaS landing page with scroll-driven animation.

**Alternatives:**

1. Next.js + Framer Motion only
2. Next.js + GSAP + Lenis
3. Static HTML/CSS

**Selected:** Next.js 15 App Router + TypeScript + Tailwind v4 + GSAP/ScrollTrigger + Lenis.

**Rationale:** Matches approved plan and competitor-quality scroll storytelling; GSAP gives precise pinned/scrub control; Lenis provides premium smooth scroll; Next.js supports API route for contact form.

---

## ADR-004: Revert Framer Motion to GSAP + Lenis

**Date:** 2026-06-08

**Context:** Framer Motion scroll reveals and hero entrance did not run reliably in Next.js 15 due to SSR/hydration and `whileInView` remount issues. Greenovative’s live platform uses GSAP 3.11, ScrollTrigger, Lenis, and AOS - all client-only.

**Alternatives:**

1. Keep debugging Framer Motion (`useAnimation`, `useInView`, hydration gates)
2. CSS-only Intersection Observer reveals
3. GSAP + ScrollTrigger + Lenis with client-only `MotionProvider` (Greenovative stack)

**Selected:** GSAP + ScrollTrigger + Lenis via centralized `MotionProvider`, `useGSAP` in `Reveal` / `StaggerReveal` / `Hero`.

**Rationale:** Same proven stack as Greenovative; no SSR animation state; ScrollTrigger waits for Lenis `scrollerProxy` before child components animate; `useGSAP` handles cleanup on route unmount.

---

## ADR-005: How It Works opening - interactive SLD (Option C)

**Date:** 2026-06-08

**Context:** Opening needed to explain unified plant data without a GIF-first hero. Three options were considered: GIF animation, static diagram, or interactive single-line diagram (Locus-style).

**Alternatives:**

1. GIF/WebM plant animation (high production cost, not interactive)
2. Static illustrated SLD (clear but passive)
3. Interactive SVG SLD with hover/tap tooltips + core capabilities strip below hero

**Selected:** Option C - `PlantSldDiagram` (9 nodes, hub-and-spoke) + `HiwCapabilities` (4 cards) + refreshed hero copy.

**Rationale:** Teaches the data model on first paint; no asset dependency for MVP; optional custom icons can be swapped in later without layout changes.

---

## ADR-006: Generic vertical page template vs duplicated industry pages

**Date:** 2026-06-08

**Context:** Expand from automotive-only to five industry verticals (cement, steel, pharma, chemical, automotive) with full 8-section template and new ICP (₹200 Cr+, ₹20-30L+/month bills).

**Alternatives:**

1. Duplicate automotive page structure per vertical (5× page files + components)
2. Shared `VerticalPageContent` model + generic `components/industries/vertical/*` + dynamic `app/industries/[slug]/page.tsx`
3. CMS-driven vertical pages (deferred - no CMS for marketing copy yet)

**Selected:** Shared content model (`lib/content/vertical-pages/`) + slug-agnostic components + dynamic route with `generateStaticParams`. Keep `/industries/automotive` as thin wrapper for backward compatibility.

**Rationale:** One template enforces strategy doc section order; copy changes stay in typed content files; adding a sixth vertical is content-only. Automotive segments preserved; other verticals use optional segments block.

**Impact:** Hub, mega menu, homepage tiles, sitemap, and FAQ schema auto-include all live verticals from `industriesContent.verticals[]`.

---

## ADR-007: Homepage FAQ - single content source feeding both UI and schema

**Date:** 2026-06-24

**Context:** Sustainability positioning required 3 new FAQ items. Previously `homepageFaqSchema` held 5 hard-coded Q&As that were never rendered to users (schema-only). Google expects FAQPage schema content to be visible on the page.

**Alternatives:**

1. Add the 3 items to schema only (keeps invisible-content risk, duplicates copy)
2. Single `landingContent.faq` source rendered as a visible accordion (`HomeFaq`) and used to derive `homepageFaqSchema`
3. Separate visible FAQ component with its own copy, schema unchanged (drift between the two)

**Selected:** Option 2 - one typed source (`landingContent.faq`, 8 items), a visible `HomeFaq` accordion, and `homepageFaqSchema.mainEntity` mapped from the same array.

**Rationale:** Eliminates schema/UI drift, makes all FAQ content visible (Google requirement), and adds the sustainability items in both places from one edit point.

**Impact:** Editing `landingContent.faq` updates both the rendered accordion and the JSON-LD. Positioning update is additive only - hero H1 and the four-stat recovery band (`Outcomes`) are unchanged.

---

## ADR-008: Homepage IA - challenge/solution framing over triple workflow loop

**Date:** 2026-06-29

**Context:** Homepage told the same Connect→Verify story three times (hero loop strip, mid-page HowItWorks, Industry 4.0 band), causing scroll fatigue. ENLYZE-style challenge→solution framing and a Traditional vs Stamped investment/ROI chart were desired without changing brand colors or hero layout.

**Alternatives:**

1. Full IA rewrite per marketing plan (new identity line section, accordion challenges, six pay-as-you-save placements)
2. Targeted cut of redundancy + extend existing Problem section + add comparison chart
3. Keep all three loop sections; only edit copy

**Selected:** Option 2 - remove hero `HeroEnergyLoop`, homepage `HowItWorks`, and `IndustryFourPointZero`; extend `Problem` with solution bullets; add `PayAsYouSaveComparison` with SVG chart using brand tokens; surface pay-as-you-save in hero badge, Why Stamped card, FAQ, and closing CTA. Skip separate identity-line section (Problem intro carries the message). ICP bill floor stays ₹20 lakh+.

**Rationale:** ~25% shorter homepage with clearer narrative (problems → commercial model → prescription proof → trust). Reuses existing card patterns; full workflow detail remains on `/how-it-works` only.

**Impact:** Homepage section order changed. `HeroEnergyLoop`, `HowItWorks`, and `IndustryFourPointZero` components remain in repo but are not mounted on `/`. FAQ count increases to 9 items (schema auto-updates from `landingContent.faq`).

---

## ADR-009: Public Case Studies nav merges onto `/blog` (CRM CaseStudy untouched)

**Date:** 2026-07-31

**Context:** Nav exposed both Blog and Case Studies as separate public surfaces. Product intent is one public section labeled Case Studies, fed by CRM blog posts, while Case Study admin/CRM remains for later.

**Alternatives:**

1. Move listing to `/case-studies` and redirect `/blog` there; migrate article URLs
2. Keep `/blog` as the canonical path; nav/footer label **Case Studies**; permanent-redirect `/case-studies*` to `/blog`; article URLs stay `/blog/[slug]`
3. New `/insights` route and dual redirects

**Selected:** Option 2 initially; refined so the **canonical listing is `/case-studies`**, with exact `/blog` → `/case-studies` redirect. Article URLs remain `/blog/[slug]`. UI copy uses **Case studies & blogs**.

**Rationale:** Nav label Case Studies matches the public path; article SEO stays on `/blog/[slug]`. Case Study Prisma model and `/blog/admin/case-studies` stay unchanged.

**Impact:** Homepage spotlight public fetch is blog-only. Sitemap lists `/case-studies` + `/blog/{slug}`. Exact `/blog` redirect must not catch `/blog/admin` or `/blog/[slug]`.

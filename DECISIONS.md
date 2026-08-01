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

---

## ADR-010: Flat surfaces, demo-deck beige, near-black green

**Date:** 2026-08-01

**Context:** Marketing site used pervasive decorative gradients and a greener surface (`#f0f4ee`) / secondary (`#031811`) that no longer matched product demo decks in `stamped-external`.

**Alternatives:**

1. Keep gradients; only nudge token hexes
2. Flat UI: remove all marketing gradients; adopt demo-deck `--surface` `#f7faf5`; push secondary to near-black green `#000a07`; pin platform pack to `v2026.08.01`

**Selected:** Option 2.

**Rationale:** Demo decks are the cross-repo visual reference. Flat overlays preserve photo contrast without wash/glow. Token changes stay centralized in `styles/theme.css`.

**Impact:** ~30 components lose gradient layers (solid `bg-secondary/70` scrims where needed). Submodule `external/` pinned to `v2026.08.01`. `tsconfig.json` excludes `external/` so consumer fixtures are not typechecked by the website.

---

## ADR-011: Solutions hub + Platform IA (two pillars, Improve loop)

**Date:** 2026-08-01

**Context:** Marketing IA still centered on “How It Works” and a long homepage that retold the loop multiple times. Product SSOT (ADR-026 / stamped-external) defines one **Stamped Intelligence** product with two pillars and a six-step Improve loop. Public proof language must lead with **Verified with evidence**, not DISCOM-as-hero.

**Alternatives:**

1. Keep `/how-it-works` label; add Solutions as a mega-menu
2. Simple nav: Solutions · Platform · Industries · Case Studies · About · Contact; `/platform` replaces `/how-it-works` (308); Solutions hub + two pillar routes; homepage distilled to seven sections

**Selected:** Option 2.

**Rationale:** Matches Infinite Uptime–style product IA without cloning visuals. Pillars map to customer language (load/energy efficiency vs equipment intelligence). Improve is public with non-creepy calibration copy. Distill gates prevent Platform and home from triple-retelling the loop.

**Impact:**

- Routes: `/solutions`, `/solutions/load-energy`, `/solutions/equipment-intelligence`, `/platform`
- Redirect: `/how-it-works` → `/platform` (308)
- Content SSOT: `lib/content/solutions.ts`, `lib/content/platform.ts`
- Homepage mount ≤7 sections; About ≤3 blocks; Contact = form + email
- HowTo JSON-LD = 6 steps; sitemap + `llms.txt` updated
- Proof copy sitewide: Verified with evidence; bill confirmation optional

---

## ADR-012: List mega-menus for Solutions and Industries

**Date:** 2026-08-01

**Context:** Industries nav used an image-heavy explorer panel. Solutions had no hover menu. Infinite Uptime’s Solutions dropdown (numbered text rows, hub click vs item click) is the structural reference.

**Alternatives:**

1. Keep image tiles for Industries; add Solutions as a flat link only
2. Shared list mega-menu: click label → hub; hover items → pillar/vertical pages; no images in the dropdown

**Selected:** Option 2 (`ListMegaMenu` + Solutions/Industries wrappers).

**Rationale:** Faster scan for B2B buyers; matches approved IA; keeps brand tokens (no IU purple clone). Hub pages still carry richer content.

**Impact:** `megaMenu: "solutions" | "industries"` on nav links; IndustriesExplorerPanel remains for optional hub explorer only.

---

## ADR-013: Solutions page craft + Improve public copy

**Date:** 2026-08-01

**Context:** Solutions hub and pillar pages were thin text stacks vs Industries photo heroes and homepage Rx craft. Public Improve-step copy used “followed vs ignored,” which reads surveillance-adjacent.

**Alternatives:**

1. Keep flat Solutions pages; keep followed-vs-ignored Improve language
2. Match Industries/Platform section grammar (photo heroes, bordered outcomes, Rx cards); reframe Improve as decisions taken / verified outcomes

**Selected:** Option 2.

**Rationale:** Craft parity for buyer trust. Improve language stays human-gated without implying tracking of follow/ignore behavior.

**Impact:** `SolutionsHero`, enriched hub/pillar sections; copy updates in landing, platform, solutions, HomeImproveLoop, SEO HowTo, PRODUCT.md. `external/` SSOT untouched.

---

## ADR-014: Helvetica Neue site-wide typography

**Date:** 2026-08-01

**Context:** Dual Google fonts (Inter + Plus Jakarta Sans) felt generic vs enterprise industrial positioning. User asked for C3 AI–style typography (Helvetica Neue) and spacing, not C3 brand colors or IA.

**Alternatives:**

1. Keep Inter + Plus Jakarta
2. Licensed Helvetica Now webfonts (requires purchase)
3. System Helvetica Neue stack site-wide for display and body

**Selected:** Option 3.

**Rationale:** Matches C3’s Helvetica Neue character legally without a webfont license. One family for display and body. Apple renders Helvetica Neue; Windows falls back to Arial.

**Impact:** Removed `next/font` Inter/Jakarta from `app/layout.tsx`. Tokens in `app/globals.css`. Admin and rich-article styles updated. `DESIGN.md` identity fonts updated.

---

## ADR-015: Industries hub By industry zig-zag cards

**Date:** 2026-08-01

**Context:** Hub “By industry” was a Generic EMS vs Stamped comparison table. User wanted a reference-style alternating image/copy band on black, with existing process data only.

**Alternatives:**

1. Keep comparison table; add a separate photo strip
2. Replace table with zig-zag industry cards (existing metrics/equipment tags; no fleet claims or named customers)

**Selected:** Option 2.

**Rationale:** Matches requested layout and buyer scan path. Full-card links to vertical pages. Indicative ranges only from published vertical content.

**Impact:** `hub.byIndustry` in `lib/content/industries.ts`; `IndustriesHubComparison` rewritten. Anchor `#comparison` preserved for hero CTA.

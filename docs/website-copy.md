# Stamped: Current Website Copy

Live marketing copy as of 3 October 2026 (copy v3, ADR-033). The approved wording lives in
[`docs/copy/stamped-copy-v3.md`](copy/stamped-copy-v3.md); voice rules are in `STAMPED_COPY_GUIDE.md`
(research workspace). This page maps each public page to the file that renders it, so the copy has one source.

**Rules that apply everywhere:** brand is "Stamped" (never "Stamped Energy" in customer copy); say
"machine learning and AI"; approved outcome paragraphs are used word for word; no unbacked % or rupee
figures; example action cards keep their [bracketed] placeholders and carry an "Example" label; primary
CTA is "Book a site survey" → `/contact`; no em dashes.

---

## 1. Global chrome

| Element | Copy | Source |
| --- | --- | --- |
| Name / tagline | Stamped · AI for plant operations | `lib/content/site.ts` |
| Nav | What we improve · How it works · Industries · Resources · About · Contact | `lib/content/site.ts` |
| Primary CTA | Book a site survey | `siteConfig.primaryCta` |
| Footer | "Turn plant data into action." / "No rip-and-replace. Full record from day one." | `components/layout/Footer.tsx`, `landing.closingCta.smallLine` |
| WhatsApp buttons | "WhatsApp us", shown only when `NEXT_PUBLIC_WHATSAPP_URL` is set | `site.whatsappUrl` |

## 2. Homepage `/`

Copy v3 section 9, top to bottom. Source: `lib/content/landing.ts`.

- **Hero:** "From monitoring your plant to improving it." + approved short subhead. Example action ticker
  (`hero.actionCards`, rendered by `components/sections/hero/HeroPlantFlow.tsx`).
- **Problem:** "Every plant has data. Very few turn it into action." (`homeProblem`).
- **What Stamped does:** approved short outcomes text, word for word (`whatIs.paragraphs`).
- **How it works:** "From plant data to operator actions." with the Plant data → Models → Actions → Results
  diagram (`components/diagrams/PlantFlowDiagram.tsx`) and the section 9 paragraphs ("on WhatsApp or on screen").
- **Impact:** four outcome lines + footnote (`impact`).
- **What we improve:** four areas from `lib/content/solutions.ts`, footnote "Energy is counted in all four."
- **Industries:** auto components, forging, heat treatment, precision machining (`industries`).
- **Resources:** "Notes from the plant floor." (CMS posts, fallback `lib/content/resources.ts`).
- **FAQ:** seven Q&As (`faq`), also emitted as FAQPage JSON-LD.
- **Closing CTA:** `closingCta`.

## 3. What we improve `/solutions` and `/solutions/{process,quality,planning,maintenance}`

Copy v3 section 5. Source: `lib/content/solutions.ts` (`hub`, `areas`, `energy`). Hub:
`components/solutions/SolutionsHub.tsx`; area pages: `components/solutions/SolutionAreaPage.tsx`.
Old URLs `/solutions/load-energy` and `/solutions/equipment-intelligence` 308 to `process` and `maintenance`.

## 4. How it works `/platform`

Source: `lib/content/platform.ts`. Hero "From plant data to operator actions."; "What we do" is the approved
long outcomes-and-how text, word for word; the loop uses the copy v3 section 4 paragraphs plus
"Stamped recommends and your team decides."; surfaces, models, capabilities, before/after and deployment
(site survey → 8 to 12 week paid pilot).

## 5. Industries `/industries` and `/industries/automotive`

Sources: `lib/content/industries.ts`, `lib/content/vertical-pages/automotive.ts`. Automotive hero:
"Fewer rejections reach your OEM." Forging, heat treatment and precision machining sections; example action
cards. Cement, steel, pharma and chemical pages were retired and 308 to `/industries`.

## 6. About `/about`

Source: `lib/content/about.ts`. H1 "Plants have the data to run better, and we build the way to act on it.";
copy v3 section 7 story; "What we do" (approved long text, shared with `/platform`); founders; values.

## 7. Contact `/contact`

Source: `lib/content/contact.ts`, `components/ui/ContactForm.tsx`. H1 "Book a site survey."; form fields
include "Main processes", "What's on your mind" and "Best way to reach you" (stored together in the
`billSize` column, ADR-033).

## 8. Resources `/case-studies`

Source: `lib/content/caseStudies.ts` hero ("Notes from the plant floor"); posts come from the CMS.

## 9. SEO, schema and llms

`lib/seo/pages.ts` (titles and descriptions), `lib/seo/schemas.ts` (Organization "Stamped", HowTo loop,
FAQ), `lib/seo/constants.ts` (keywords, OG alt, LinkedIn `stampedwork`), `lib/seo/llms-index.ts`
→ `public/llms.txt` and `/llms-full.txt`. Entity sentence: `lib/content/icp.ts`.

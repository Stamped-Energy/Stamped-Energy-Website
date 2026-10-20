# Plan: realign stamped.work with current positioning

Prepared 20 October 2026 (IST). This is a plan only. It changes no site code, content, config or SEO files. Nothing here is built until Vinayak has reviewed the structure and copy.

**Inputs**

- Brief: `stamped-pitch/website-improvement-plan-2026-10-20.md` (sitemap, section plan with drafted copy, removals, SEO fixes, decisions D1 to D16).
- Positioning: `stamped-external/docs/copy/STAMPED_COPY_GUIDE.md` (official since 19 Oct, "CG" below), `research/quality-plus-process/` and `research/domain-systems-2026-10/` (FOUNDER-VISION and the locked shape in its README).
- This codebase at `origin/main` 1f776ad (after PR #15).
- Earlier instructions from Vinayak on this repo (3 Oct): keep every industry page, keep the full automotive page, and say that the site survey only sets the price of the pilot, with the annual price set from the pilot's results.

**Copy rules for everything below:** CG section 9. Straight quotes, no em dashes, no banned words, "platform" never used as the pitch, "real time" at most once per page, no invented numbers, customers, logos, quotes or testimonials, no unbacked percentage or rupee claims. Where a number is needed, `[PLACEHOLDER: ...]`. CG message-bank lines are used exactly as written.

**How differences are marked.** Where this plan departs from the brief, the line starts with **DIFFERS FROM BRIEF** and gives the reason. A full list is in section 11.

---

## 1. Top changes

1. **New first screen** from the CG message bank: eyebrow "Self-improving AI for plant operations.", H1 "AI agents that work on your plant's data, every batch.", the CG subhead and proof line. Two fallbacks kept for the prospect test (D1).
2. **New authority line.** "Stamped recommends and your team decides." is removed from all nine places and replaced by "Stamped works inside limits set beforehand." (D3).
3. **New three-step journey** on home: see every batch, decide with evidence, run on its own inside your limits (D4).
4. **Solution cards with status.** Process and control, Quality and lot checks, Planning and scheduling live. Maintenance shown "Coming soon", no CTA, no example actions, no FAQ schema, `noindex` (D5, D6).
5. **Outcome first, method lower.** Home leads with good parts lost and follows the part through the line; the method (machine models, prediction, recommended setting, always-on agents) moves down.
6. **Forging and heat treatment leads**, with a new `/industries/forging-heat-treatment` page. **DIFFERS FROM BRIEF:** the other industry pages stay live (see 2.3 and D8).
7. **Honest proof and a concrete CTA.** Illustrative findings grid in place of `HomeImpact`; "First finding usually within about two weeks" and the zero-trust / India-hosting claim come off every page until confirmed; "Book a site survey" promises a worst-lot replay and a written read-out.
8. **SEO repair.** Fix redirects that end in 404, clean sitemap and RSS, reverse `/platform` and `/case-studies` to `/how-it-works` and `/blog`, keep "Stamped Energy" findable through a visible "formerly Stamped Energy" line plus schema, regenerate `public/llms.txt`, bump `CONTENT_UPDATED`.

---

## 2. Sitemap, URLs and redirects

### 2.1 Current (origin/main)

`app/sitemap.ts` `STATIC_PATHS`: `/`, `/platform`, `/solutions`, `/solutions/{process,quality,planning,maintenance}`, `/about`, `/case-studies`, `/contact`, `/industries`, `/industries/{automotive,steel,cement,pharma,chemical}`, plus published blog posts and case studies from the database.

`next.config.ts` redirects today:

| Source | Destination | Problem |
|---|---|---|
| `/blog` | `/case-studies` | Blog index hidden behind "case studies" with none published |
| `/how-it-works`, `/how-it-works/:path*` | `/platform` | "Platform" is the URL of the pitch |
| `/resources`, `/resources/:path*` | `/case-studies` | Fine once retargeted |
| `/solutions/load-energy` | `/solutions/process` | Fine |
| `/solutions/equipment-intelligence` | `/solutions/maintenance` | Points at a page that becomes Coming soon |
| `/blog/prescriptive-energy-forging-heat-treatment-plants` | `/blog/weekend-furnace-holding-silent-cost` | Target is 404 (LIVE, 20 Oct) |
| `/blog/weekend-furnace-holding-heat-treatment-cost` | `/blog/weekend-furnace-holding-silent-cost` | Target is 404; linked from home and listed in sitemap and RSS |
| `/blog/shift-start-die-casting-margins` | `/blog/why-shift-start-kills-die-casting-margins` | Target is 404; linked from home |

Note from the code: `app/blog/page.tsx` itself calls `permanentRedirect` to `/case-studies`, so removing the config redirect is not enough. The page has to be rewritten to render the index.

### 2.2 Proposed

| URL | Nav label | Change | Code |
|---|---|---|---|
| `/` | Home | Rebuilt (section 3) | `app/page.tsx`, `lib/content/landing.ts` |
| `/how-it-works` | How it works | New route; content from `/platform` | Move `app/platform/page.tsx` to `app/how-it-works/page.tsx` |
| `/platform` | none | 301 to `/how-it-works` | `next.config.ts` (reverse both `/how-it-works` rules) |
| `/solutions` | What we improve | Hub, four cards, Maintenance "Coming soon" | `components/solutions/SolutionsHub.tsx` |
| `/solutions/process`, `/quality`, `/planning` | Mega menu | Rewritten | `lib/content/solutions.ts` |
| `/solutions/maintenance` | Mega menu, "Coming soon" badge | Slim page, `noindex`, out of sitemap | `app/solutions/[slug]/page.tsx` branch on `status` |
| `/solutions/equipment-intelligence` | none | 301 to `/solutions` (not to a Coming soon page) | `next.config.ts` |
| `/industries/forging-heat-treatment` | Industries menu, first item | New lead page | `lib/content/vertical-pages/forging-heat-treatment.ts` |
| `/industries/automotive` | Industries menu | **DIFFERS FROM BRIEF:** stays live, rewritten to point forge and heat-treat readers to the new page, keeps machining, die casting and rubber moulding | `app/industries/automotive/page.tsx`, `vertical-pages/automotive.ts` |
| `/industries/steel`, `/cement`, `/pharma`, `/chemical` | Industries menu, "Other industries" group | **DIFFERS FROM BRIEF:** stay live and indexed, copy aligned to CG, energy and tariff framing removed (D8) | `vertical-pages/*.ts` |
| `/industries` | Industries | Hub: "We start on forge and heat-treat lines", then the other industries | `lib/content/industries.ts`, `components/industries/*` |
| `/blog` | Notes | Becomes the index | `app/blog/page.tsx` rewritten; delete the `/blog` rule in `next.config.ts` |
| `/case-studies` (index only) | none | 301 to `/blog` until a permitted case study exists | `next.config.ts`; keep `app/case-studies/[slug]` and the admin CMS so real case studies can return |
| `/resources`, `/resources/:path*` | none | Retarget to `/blog` (one hop, no chain) | `next.config.ts` |
| `/blog/weekend-furnace-holding-heat-treatment-cost`, `/blog/prescriptive-energy-forging-heat-treatment-plants`, `/blog/shift-start-die-casting-margins` | none | Point each straight at a live post, or remove the rule and restore the post in the CMS (D11) | `next.config.ts`, CMS |
| `/blog/energy-decision-layer-large-chemical-plants-india` | none | Currently 404; add a 301 to `/blog` | `next.config.ts` |
| `/about`, `/contact` | About, Book a site survey | Rewritten in part | `lib/content/about.ts`, `lib/content/contact.ts` |
| `/privacy` | Footer | New, `[CONFIRM: counsel]` (form collects WhatsApp numbers) | `app/privacy/page.tsx` |

All redirects stay `permanent: true` (308 in Next.js; fine for search engines).

Primary nav (`components/layout/Navbar.tsx`): What we improve, How it works, Industries (forging and heat treatment first), Notes, About, and the "Book a site survey" button. **DIFFERS FROM BRIEF:** the brief turns `IndustriesMegaMenu.tsx` into a single "Forging and heat treatment" link; this plan keeps the menu with forging and heat treatment on top so other industries stay discoverable.

---

## 3. Home page, section by section

Current order in `app/page.tsx`: `Hero`, `HomeProblem`, `HomeWhatIs`, `HomeHowItWorks`, `HomeImpact`, `HomeSolutionsRows`, `HomeIndustries`, `HomeResources`, `HomeTerminalBand`.

Proposed order: Hero, Problem, Journey (new), What we improve, Illustrative findings (new, replaces `HomeImpact`), How it works, Site survey offer (new, replaces `BeforeYouBook` on home), Industries strip (slimmed `HomeIndustries`), Notes from the plant floor (only once linked posts load), FAQ, Closing CTA. `HomeWhatIs` is removed; its useful lines move into Problem and How it works.

**DIFFERS FROM BRIEF:** the brief removes `HomeIndustries`. This plan keeps a slim one-row strip (forging and heat treatment first, then automotive, steel, cement, pharma, chemical) because Vinayak does not want a buyer to leave thinking their industry is not served.

### 3.1 Hero (`components/sections/Hero.tsx`, `landingContent.hero`, `components/sections/hero/HeroPlantFlow.tsx`)

> **SUPERSEDED (20 Oct, 14:30 IST).** The hero copy below is replaced by the options in section 12. Layout notes in this subsection still apply.

- Eyebrow: Self-improving AI for plant operations.
- H1: AI agents that work on your plant's data, every batch.
- Subhead: They monitor every process, tune each machine toward its best settings, and catch a batch at risk of rejection before it ships, inside limits set beforehand.
- Primary CTA: Book a site survey
- Secondary text link: See how it works
- Proof line: Every finding shows its evidence, and every gain is measured in your own numbers.

Word count 45 without the proof line and link (CG 8 says under 45). If held strictly, the proof line moves below the fold; approved lines are not shortened.

Fallback A (CG 12): H1 "Every batch should make the next one better." Subhead "Stamped's agents are always on. They watch every process and every batch, on every shift, and flag a problem while the batch can still be saved."

Fallback B (brief, new copy, not in CG Appendix A yet): H1 "Catch the bad batch while it can still be saved." Subhead "Stamped's AI agents read the records your forge and heat-treat lines already keep, watch every load on every shift, and tell the right person what to change before the parts are lost, inside limits set beforehand."

Layout:
- Remove the three chips (`landingContent.hero` chip list, `id: "first-finding"` and the two fragments).
- Keep the `HeroPlantFlow` animation (data into the Stamped mark, cards out). Retitle the panel "Illustrative examples", subtitle "What a card from Stamped looks like. Your own records write the real ones."
- **Improvement on the brief:** keep the H1 on three lines at desktop width (Vinayak's 3 Oct rule for the hero). The new H1 is longer than the current one, so the H1 size token in `Hero.tsx` will need retuning and a check at 1280 and 1440 px.
- **DIFFERS FROM BRIEF:** the brief drops the planner and setter cards. This plan keeps one planning card (re-plan after a press stop) because Planning stays live; it drops the setter card and the "Energy" pill becomes "Good parts".
- Rebuild `og-default.png` and its alt text in `lib/seo/metadata.ts`.

### 3.2 Problem: good parts lost (`HomeProblem`, `landingContent.problem`, `ProblemStripVisuals`)

- H2: A rejected part has already used up the steel, gas and furnace hours you paid for.
- Body: Follow one part through your line. The billet is cut and heated, forged, trimmed, then hardened, quenched and tempered. By the time a hardness check or a case-depth cut-up says the load is wrong, every one of those steps has been paid for. A re-treat costs a second furnace cycle and the gas to run it, and it also costs the slot another order was waiting for. A scrapped load costs the lot.
- Worked example (labelled "Illustrative arithmetic. Your survey read-out uses your own records."): One re-treated load of `[PLACEHOLDER: kg]` kg costs about ₹`[PLACEHOLDER]` in gas and power, plus `[PLACEHOLDER: hours]` furnace hours that were meant for the next order. At `[PLACEHOLDER: count]` such loads a month, that is ₹`[PLACEHOLDER]` a year before anyone counts scrap, rework labour or a late delivery.
- Closing line: Most of this can be seen coming. The signals are already in the furnace logs, the press records and the QC sheets your team keeps today.

Build note: the placeholders must not ship as literal brackets. Either fill them from a permitted plant read-out or render the example as a formula without figures (D14 covers the calculator later).

### 3.3 Journey: three steps (new `components/sections/HomeJourney.tsx`, `landingContent.journey`)

> **SUPERSEDED (20 Oct, 14:30 IST).** Step copy is replaced by the capability ladder variants in section 12.3. Component and layout notes still apply.

- H2: Three steps, each earned on your own line.
- Step 1, "See every batch.": Stamped connects to the data you already log, watches every process on every shift, and shows where good parts are lost, while the batch can still be saved.
- Step 2, "Decide with evidence.": Stamped tests a better setting on a model of your line and brings it to your team with the reasons and the expected result, and the result is measured in your own numbers.
- Step 3, "Run on its own, inside your limits.": Once a kind of change has proven itself on your line, your engineers can let Stamped apply it automatically, always inside limits they signed beforehand. Anything new still goes back to them.
- Caption under step 3: Step 3 starts only when your engineers sign it, and only for a kind of change that has already proven itself.
- No CTA. Three columns on desktop, stacked on mobile, reusing `components/ui/StepsVisualSection.tsx`.

**DIFFERS FROM BRIEF (step 2):** the brief's "Your team approves, and the result is measured" implies a person approves every change, which CG 7 forbids. This plan folds the measurement into one sentence and drops "approves"; the per-case approval story belongs to decks (CG 3a). Flagged in D4.

Step 3 conflicts with CG 3a and 7 ("Do not describe Stamped changing settings on its own", "Do not claim autonomous action") and runs ahead of ADR-035. It matches FOUNDER-VISION (standing approval of a class inside a signed window). Fallback if D4 is no: "Grow what it handles. As each kind of change proves itself, your engineers decide how much more Stamped takes on, always inside limits they signed beforehand."

### 3.4 What we improve (`HomeSolutionsRows`, `lib/content/solutions.ts`, `SolutionsAreaVisuals`)

- H2: What Stamped improves first.
- Process and control. Title: Run every machine beyond its best runs. Body: Stamped learns from your best loads and best shifts how each press, furnace and quench behaves, and recommends the setting that holds the result inside your limits. CTA: See process and control.
- Quality and lot checks. Title: Catch the batch at risk while it can still be saved. Body: Stamped reads every load as it runs, flags the one heading for a hardness or case-depth reject, and tells the right person what to check before the parts move on. CTA: See quality and lot checks.
- Planning and scheduling. Title: Have the re-plan ready when a press goes down. Body: When a machine stops or a furnace runs late, Stamped works out what that does to the day's orders and puts a revised plan in front of your planner, with the trade-off spelt out. CTA: See planning and scheduling.
- Maintenance, badge "Coming soon". Title: Maintenance ranked by what a stop costs you. Body: We are building this next. It will rank maintenance by what each stop would cost in good parts and missed orders. Optional line: Ask us about it during your site survey. No CTA.

Code: add `status: "live" | "coming-soon"` to `SolutionArea` in `lib/content/types.ts` / `solutions.ts`. When `coming-soon`: muted badge, no CTA, no `exampleActions`, no FAQ in `lib/seo/schemas.ts` / `extract-faq.ts`, badge in `SolutionsMegaMenu.tsx`, `robots: { index: false }` in `app/solutions/[slug]/page.tsx`, filtered out of `app/sitemap.ts`, `lib/seo/llms-index.ts` and `app/ai/*.json` routes.

### 3.5 Illustrative findings (new `components/sections/HomeFindings.tsx`, replaces `HomeImpact`)

- H2: What a finding looks like.
- Intro: These are illustrative. They show the kind of thing Stamped looks for on forge and heat-treat lines. Your survey read-out uses your own records.
- Card 1, case depth and soak: Loads from furnace `[PLACEHOLDER]` that came out light on case depth all had a shorter soak after a door-open delay. Stamped flags the next load with the same pattern and suggests holding the soak until the temperature recovers. Evidence: the furnace log and the cut-up results for the last `[PLACEHOLDER]` loads.
- Card 2, quench agitator trip: The quench agitator tripped for a few minutes during a load, and hardness on that load came out low. Stamped notices the trip as it happens and asks the shift lead to hold the load for a hardness check before it moves on.
- Card 3, billet cold after a press stop: After a press stop, billets that sat in the heater too long or cooled at the press made more laps and rejects. Stamped spots the gap and recommends reheating or setting those billets aside.
- Card 4, carburising carbon potential low: The carbon potential ran below its aim for part of a cycle. Stamped estimates the effect on case depth and suggests extending the boost step, inside the limits your metallurgist set.

Each card: visible "Illustrative" tag and three lines, "What it saw", "What it suggested", "How it is measured". 2x2 grid. No logos, names or figures.

### 3.6 How it works, home version (`HomeHowItWorks`, `HiwStageVisuals`)

- H2: A model of each machine, and agents that never switch off.
- Paragraph 1: Stamped starts by building a model of each piece of core equipment, such as a press, a furnace or a quench tank, from the records your plant already keeps. Each model learns how that machine behaves on your line, including how it responds when an input changes.
- Paragraph 2: With those models, Stamped predicts how a load will turn out while it is still running, so a load heading for a reject shows up before the inspection result does.
- Paragraph 3: When a prediction is off target, Stamped works out which setting would bring the load back and how sure it is, and it shows the evidence behind the suggestion.
- Paragraph 4: On top of the models, Stamped's agents are always on. They notice when something changes, look into the cause in your records, test a fix on the model, check with the person who owns the decision, and measure what happened. A change that keeps working becomes part of how the line runs. Every change stays inside limits set beforehand.
- Closing: Every finding shows its evidence, and every gain is measured in your own numbers.

**DIFFERS FROM BRIEF (small):** "ask the person who owns the decision, and once that person approves" becomes "check with the person who owns the decision", for the same CG 7 reason as 3.3.

Diagram: three layers (machine models, prediction, recommended setting) with an agent loop (notice, research, simulate, ask, measure, adopt). Remove present-tense "digital twin", "reinforcement learning", "real-time lot scoring", "one-step rollback" and "lessons on what helped and what hurt" (CAP 5) unless engineering confirms.

### 3.7 Site survey offer (new `components/sections/HomeSurveyOffer.tsx`)

- H2: Bring us your worst lot.
- Body: In a site survey, we take the records from one bad lot your team still remembers, such as furnace logs, press data and QC results, and replay it. You get a written read-out of what the signals showed before the lot went wrong, when Stamped would have flagged it, and what it would have suggested. The survey takes `[PLACEHOLDER: days]` days on site and the read-out follows within `[PLACEHOLDER: days]` days. `[CONFIRM: free or paid]`
- What happens next: **DIFFERS FROM BRIEF:** uses Vinayak's 3 Oct pricing rule. "During the site survey we agree only the price of the pilot. If the read-out is useful, the next step is `[CONFIRM: one live week on your line, then]` a paid pilot of `[CONFIRM: 8 to 12 or 10 to 12]` weeks on one line, priced on its own. The annual price comes later, once you have seen what the pilot did in your plant."
- CTA: Book a site survey

### 3.8 Industries strip (slimmed `HomeIndustries`)

- H2: We start on forge and heat-treat lines.
- Body: Our first deployments are with forging and heat-treatment plants. Stamped works the same way in other plants that already keep machine and quality records, starting with a site survey.
- Links: Forging and heat treatment, Automotive components, Steel, Cement, Pharma, Chemicals.

(New section; not in the brief.)

### 3.9 Notes from the plant floor (`HomeResources`)

Rename from "Resources", link to `/blog`. Show only once the two linked posts load, and only posts that pass CG 9.

### 3.10 FAQ (`HomeFaq`, `landingContent.faq`, FAQ JSON-LD via `lib/seo/schemas.ts`, `app/ai/faq.json`)

1. What does Stamped do? Stamped puts AI agents to work on your plant's data, on every batch. They monitor every process, tune each machine toward its best settings, and catch a batch at risk of rejection before it ships, inside limits set beforehand.
2. Do we need to install new sensors or software? Usually not to start. Stamped works from the records your plant already keeps, such as furnace and press logs, PLC or SCADA exports and QC sheets. If something important is missing, the site survey will say so plainly.
3. Will Stamped change settings on our machines? **DIFFERS FROM BRIEF:** answer taken from CG 10 instead of the brief's "every change Stamped suggests goes to your team for approval" (CG 7): "Stamped works inside limits set beforehand. Every new setting is tested in simulation first and checked by a safety filter, the control policy runs in shadow mode before it goes live, and every change is visible to your team, who can switch it off at any time." `[CONFIRM: D4]`
4. How do we know a finding is right? Every finding shows its evidence: the records it used, what it expects to happen and how sure it is. Every gain is measured in your own numbers, against your own baseline.
5. What if the model is wrong? It will be sometimes, so it shows how sure it is and never acts outside limits set beforehand. A suggestion that does not work is recorded, and the model learns from it.
6. Where is our data kept? Held for D2. Draft (a), if India hosting is confirmed: "Your data is processed and stored on servers in India, and model providers used through our gateway keep none of it." Draft (b), until then: "Your data stays in a dedicated environment for your plant, and on site where needed. We will tell you exactly where it is stored before you share anything, and we do not let model providers keep it." Note: "on site where needed" is itself an on-site mode promise that CG 9 holds until confirmed, so (b) may need to drop it.
7. How long before we see something useful? The site survey read-out shows what your own worst lot would have looked like. The live week shows what Stamped sees on your line today. `[CONFIRM: timing]`
8. What does it cost? **DIFFERS FROM BRIEF:** "During the site survey we agree only the price of the pilot. The pilot is a fixed fee for `[CONFIRM: weeks]` weeks on one line. The annual price is set afterwards, from what the pilot did in your plant." Survey `[CONFIRM: free or paid]`.
9. Which plants is Stamped for? We start with forging and heat-treatment plants that already keep furnace, press and QC records, and we work with other plants that keep machine and quality records the same way, starting with a site survey.
10. Who on our team needs to be involved? A plant head who owns the result, and a process or quality engineer who knows the line. Findings reach the right person on WhatsApp or on screen.
11. What if our data is messy? Most plant data is. Part of the survey is showing which records can be trusted and what is missing, so nobody is surprised later.

Keep the 3 Oct owner FAQs ("Half my records are on paper or Excel", "My supervisors already know this") where they still fit; 11 covers the first. Retire "Is Stamped an AI agent for manufacturing?" and "Is this predictive maintenance?" (added 8 Oct for keywords) or rewrite them answer-first.

### 3.11 Closing CTA (`HomeTerminalBand`, `LandingClosingCta`)

- H2: Every batch should make the next one better.
- Body: Start with one survey and your worst lot.
- CTA: Book a site survey
- Remove `smallLine` "First finding usually within about two weeks."

### 3.12 Footer (`components/layout/Footer.tsx`, `lib/content/site.ts`)

- Tagline: AI for plant operations.
- **Code note:** line 60 of `Footer.tsx` hardcodes "There is nothing new to install to start, and Stamped recommends and your team decides." Move it into `site.ts` and replace.
- Links: What we improve, How it works, Industries, Notes, About, Book a site survey, Privacy.
- Legal line: "Stamped, formerly Stamped Energy" `[CONFIRM: legal entity name, D13]`.
- One LinkedIn URL everywhere (D13).
- Contact email stays `stamped.energy@gmail.com` until a domain mailbox exists (3 Oct note).

---

## 4. Other pages

### 4.1 `/how-it-works` (from `/platform`; `lib/content/platform.ts`, `components/how-it-works/Hiw*`, `PlatformLearningVisuals`)

- H1: How Stamped works on your line.
- Intro: Stamped builds a model of each core machine from your own records, predicts how each load will turn out, and recommends the setting that keeps it on target. Its agents stay on around the clock, inside limits set beforehand.
- Sections: the records we start from; a model of each machine; predicting the load while it runs; recommending a setting, with the evidence; always-on agents (notice, research, simulate, ask, measure, adopt); limits set beforehand (who signs them, and how more is handed over one kind of change at a time, wording held for D4; no published hard-stop list, CG 7); where it runs (held for D2).
- "AI-based predictive control" may appear here once (CG 9 allows it on technical pages).
- Remove `controlLine: "Stamped recommends and your team decides."` and the other two uses in `platform.ts`, and the CAP 5 claims.
- Rename identifiers lightly (`platformContent` can stay internal; only URLs and headings matter).

### 4.2 `/solutions` hub (`SolutionsHub`, `SolutionsHero`, `SolutionExampleCards`)

- H1: What Stamped improves first. Four cards from 3.4.
- **DIFFERS FROM BRIEF:** the brief removes steel and cement examples from `SolutionExampleCards`. This plan keeps them as secondary examples under a "Beyond forging" label, since those pages stay.

### 4.3 `/solutions/process`, `/quality`, `/planning` (`SolutionAreaPage`, `SolutionMethodSection`)

Pattern: outcome H1 (card title from 3.4), a follow-the-part example from forge or heat treatment, two or three illustrative findings, how it is measured, the site survey band, a short FAQ, then `BeforeYouBook`.

- Process: replace the FAQ line at `solutions.ts:118` with the CG 10 control answer. Heat-treatment examples stay recommendations only (ADR-035).
- Quality: lead with hardness, case depth, laps and cracks. Remove "real-time lot scoring" as a present-tense claim.
- Planning: replace the authority line at `solutions.ts:270` ("The planner. Stamped recommends and your team decides...") with "Your planner chooses. Stamped puts the revised plan and its trade-off in front of them." (Planning is a recommendation surface even in FOUNDER-VISION, so a person deciding is accurate here.)

### 4.4 `/solutions/maintenance`

- H1: Maintenance, coming soon.
- Body: We are building maintenance next. It will rank work by what each stop would cost in good parts and missed orders, using the same machine models. If it matters to your plant, tell us during your site survey.
- Only the site survey link, no FAQ schema, `noindex`, out of the sitemap.

### 4.5 `/industries/forging-heat-treatment` (new; `vertical-pages/forging-heat-treatment.ts`, `IndustryVerticalPage`)

- H1: AI for forging and heat-treatment lines.
- Body: follow-the-part story from billet to final inspection, the four illustrative findings, the records Stamped reads (heater, press, furnace, quench, temper, QC), "Before you book", and the site survey band.
- Register in `vertical-pages/index.ts` and `industries.ts` `verticals`; route via `app/industries/[slug]/page.tsx`.

### 4.6 Other industry pages (`automotive.ts`, `steel.ts`, `cement.ts`, `pharma.ts`, `chemical.ts`)

**DIFFERS FROM BRIEF.** Keep all five live. Align each to CG: remove "Stamped recommends and your team decides" and similar lines (`cement.ts:170`, `chemical.ts:170`, `pharma.ts:170`), remove energy-only and tariff framing, use the authority line, and keep the 3 Oct line "Our first deployments are with auto-component makers. In this industry we start the same way, with a site survey..." updated to "forging and heat-treatment plants". Automotive keeps forging, heat treatment, machining, die casting and rubber moulding, with a link to the new forging page.

### 4.7 `/about` (`lib/content/about.ts`, `components/about/*`)

- Keep the founder story. Replace the retired authority line.
- Former name: "Stamped was founded as Stamped Energy. We now build AI for plant operations." `[CONFIRM: D13]`
- Candour line: "We are early. We would rather show you a replay of your own worst lot than a slide of someone else's results." `[CONFIRM: D15]`
- Co-founder bios: see note N1 in section 10.

### 4.8 `/contact` (`lib/content/contact.ts`, `components/contact/ContactPageView.tsx`, `components/ui/ContactForm.tsx`)

- H1: Book a site survey.
- Body: Tell us about your line and the lot you would most like to understand. We will come back within `[PLACEHOLDER]` working days to plan the survey.
- Form: name, plant, role, phone or WhatsApp, line or process, "Your worst lot (optional)". The new field goes into the existing free-text field the 3 Oct questions used, so no migration (`app/api/contact/route.ts`). Link to `/privacy`.
- Keep the 3 Oct pricing wording ("During the site survey we agree only the price of the pilot...").

### 4.9 `/blog` (`app/blog/page.tsx`, `components/blog/*`)

- H1: Notes from the plant floor. Rewrite `app/blog/page.tsx` to render `BlogCatalog` instead of redirecting.
- Fix the two broken posts (CMS) and hold the energy-era posts for D11. Post content lives in the database, not this repo.

### 4.10 `BeforeYouBook` and `EngagementSteps` (`lib/content/engagement.ts`)

- Remove the zero-trust / India-hosting sentence at `engagement.ts:80` (and its copy at `landing.ts:301`, `public/llms.txt:115`) until D2 is settled. See note N2.
- Steps: site survey and worst-lot replay; `[CONFIRM: one live week]`; a paid pilot of `[CONFIRM]` weeks on one line, priced on its own; the annual price, set by the results.

---

## 5. Components to add or change

| Path | Change |
|---|---|
| `components/sections/HomeJourney.tsx` | New |
| `components/sections/HomeFindings.tsx` | New (replaces `HomeImpact` on home; delete `HomeImpact.tsx` in the cleanup PR) |
| `components/sections/HomeSurveyOffer.tsx` | New |
| `components/sections/Hero.tsx`, `hero/HeroPlantFlow.tsx`, `hero/heroPlantFlowEngine.ts` | New copy, no chips, panel retitle, cards and pill text, H1 size for three lines |
| `components/sections/HomeProblem.tsx`, `motion-slots/ProblemStripVisuals.tsx` | Follow-the-part strip |
| `components/sections/HomeIndustries.tsx` | Slim strip |
| `components/sections/HomeWhatIs.tsx` | Removed from `app/page.tsx` |
| `components/sections/HomeSolutionsRows.tsx`, `solutions/SolutionsHub.tsx`, `layout/SolutionsMegaMenu.tsx` | `status` badge, no CTA when coming soon |
| `components/layout/Navbar.tsx`, `IndustriesMegaMenu.tsx`, `Footer.tsx` | Nav, forging first, footer copy into `site.ts` |
| `components/ui/StepsVisualSection.tsx` | Reused by journey |
| `app/how-it-works/page.tsx` | New (moved from `app/platform`) |
| `app/blog/page.tsx` | Render index |
| `app/privacy/page.tsx` | New |
| `lib/content/types.ts`, `solutions.ts`, `landing.ts`, `platform.ts`, `engagement.ts`, `about.ts`, `contact.ts`, `industries.ts`, `site.ts`, `icp.ts`, `vertical-pages/*` | Copy |

---

## 6. Content to retire

| Item | Where |
|---|---|
| H1 "Turn plant data into action." and OG alt | `landing.ts`, `lib/seo/metadata.ts`, `public/og-default.png` |
| "Stamped recommends and your team decides." (nine places) | `landing.ts:128`, `landing.ts:289`, `platform.ts:29`, `platform.ts:65`, `solutions.ts:118`, `solutions.ts:270`, `Footer.tsx:60`, `llms-index.ts:217`, `about.ts` |
| "First finding usually within about two weeks" | `landing.ts:93`, `landing.ts:203`, `landing.ts:333` |
| Zero-trust / India-hosting sentence | `engagement.ts:80`, `landing.ts:301`, `public/llms.txt` |
| Hero chips as fragments | `landing.ts` |
| `HomeWhatIs`, `HomeImpact` on home | `app/page.tsx` |
| Setter card and "Energy" pill in hero | `HeroPlantFlow` data |
| Present-tense "digital twin", "reinforcement learning", "real-time lot scoring", "one-step rollback", "lessons on what helped and what hurt", "self-improving" outside the eyebrow | `platform.ts`, `solutions.ts`, `how-it-works/*` |
| Maintenance example actions, FAQ schema, "Learn more" CTA | `solutions.ts` |
| "Stamped Energy" and "Stamped Industrial Intelligence Suite" as product lines | `lib/seo/brand.ts:17`, `schemas.ts:463` |
| "Stamped Energy & operations" title | `lib/seo/pages.ts:51` |
| Energy-era blog claims (D11) | CMS |
| `/case-studies` label on an index with no case studies | `next.config.ts`, `app/case-studies/page.tsx` |
| "Platform" in headings and URL | `app/platform`, `platform.ts` |

**DIFFERS FROM BRIEF:** steel, cement, pharma and chemical pages and their menu entries are not retired (D8).

---

## 7. SEO fixes

### 7.1 Why "stamped energy" searches no longer find the site

Titles and visible copy now say "Stamped" only. The `Organization` schema already lists `alternateName: ["Stamped Energy", "stamped.work", STAMPED_SUITE_NAME]` (`lib/seo/schemas.ts:62`), but nothing on a visible page says the company used to be called Stamped Energy, and the old pages that carried the name now redirect into 404s, so they lose their ranking. The only visible use is the confusing `/solutions` title.

### 7.2 Fixes

- **Visible former name:** About title "About Stamped (formerly Stamped Energy)", one sentence in the About body, footer legal line "Stamped, formerly Stamped Energy". Keep `alternateName` with "Stamped Energy"; drop `STAMPED_SUITE_NAME` from it.
- `lib/seo/brand.ts`: remove "Stamped Energy" and "Stamped Industrial Intelligence Suite" from product lines.
- Redirects: one hop to a live page for every old slug (section 2.2).
- `app/sitemap.ts`: replace `/platform` with `/how-it-works`, `/case-studies` with `/blog`, add `/industries/forging-heat-treatment` and `/privacy`, drop `/solutions/maintenance`; keep the other industries. Filter DB posts whose slugs have redirect rules.
- `app/feed.xml/route.ts`: same filtering.
- JSON-LD (`lib/seo/schemas.ts`): regenerate FAQ schema from the new FAQ; none for Maintenance; `Service` entries for the three live areas; one LinkedIn URL in `sameAs`.
- `lib/seo/pages.ts` (`PAGE_SEO`): titles and descriptions from the brief's table (8.3), reproduced below.
- `lib/seo/llms-index.ts` and committed `public/llms.txt`: **improvement on the brief.** `public/llms.txt` is a static committed file generated from `llms-index.ts` (it still contains the zero-trust answer and the old `/solutions` title), so it must be regenerated in the same PR, along with `/llms-full.txt` (dynamic), `app/ai/summary.json`, `app/ai/service.json`, `app/ai/faq.json` and `app/.well-known/ai.txt`, which all read `lib/content/icp.ts`. Update `icp.ts` (entity sentence) to the CG one-sentence description and "formerly Stamped Energy".
- `CONTENT_UPDATED` in `lib/seo/constants.ts` (now 2026-10-08) bumped on release; IndexNow ping (`lib/seo/indexnow.ts`, added in PR #15) after deploy.
- Search Console re-indexing for `/`, `/about` and the fixed blog URLs `[CONFIRM: who owns Search Console]`.

| URL | Title | Meta description |
|---|---|---|
| `/` | Stamped \| AI for plant operations, every batch | Stamped's AI agents work on your plant's data, catch a batch at risk of rejection before it ships, and tune each machine inside limits set beforehand. |
| `/how-it-works` | How Stamped works \| Machine models and AI agents | Stamped models each press, furnace and quench from your records, predicts each load, and recommends settings with the evidence, inside limits set beforehand. |
| `/solutions` | What Stamped improves \| Process, quality, planning | Process and control, quality and lot checks, and planning for forge and heat-treat lines. Maintenance is coming soon. |
| `/solutions/process` | Process and control for forge lines \| Stamped | Stamped learns from your best loads how each machine behaves and recommends the setting that holds the result inside your limits. |
| `/solutions/quality` | Quality and lot checks for heat treatment \| Stamped | Catch the load heading for a hardness or case-depth reject while it can still be saved, with the evidence behind every flag. |
| `/solutions/planning` | Planning and scheduling for forge plants \| Stamped | When a press stops or a furnace runs late, Stamped puts a revised plan in front of your planner, with the trade-off spelt out. |
| `/industries/forging-heat-treatment` | AI for forging and heat-treatment plants \| Stamped | Stamped reads heater, press, furnace, quench and QC records to catch bad loads early. Book a site survey and bring your worst lot. |
| `/about` | About Stamped (formerly Stamped Energy) | Stamped builds AI agents for plant operations, starting with forging and heat treatment. Founded as Stamped Energy. |
| `/contact` | Book a site survey \| Stamped | Bring us your worst lot. We replay it from your records and give you a written read-out of what Stamped would have caught. |
| `/blog` | Notes from the plant floor \| Stamped | Field notes on forge and heat-treat lines: where good parts are lost and how plant data shows it coming. |
| `/solutions/maintenance` | Maintenance, coming soon \| Stamped | `noindex` |

Other industry pages keep their current titles with "energy" framing removed.

---

## 8. Release order (small PRs, each built and checked locally; Vinayak deploys manually)

1. **Fixes, no copy decisions needed:** broken blog redirects, sitemap and RSS cleanup, `/solutions` title, `brand.ts` product lines, remove "about two weeks" and the zero-trust / India-hosting sentence, regenerate `public/llms.txt`.
2. **Hero and authority line** (after D1, D3): hero copy, three-line H1, hero panel, footer, all nine authority-line replacements, OG image.
3. **Solution status and Maintenance Coming soon** (D5, D6).
4. **Home body:** problem, journey (D4), findings, survey offer (D9), industries strip, FAQ and schema (D2).
5. **URL renames** (D12): `/how-it-works`, `/blog`.
6. **Industries:** new forging and heat-treatment page, other pages aligned (D8).
7. **About, contact, privacy** (N1, D13, D15).
8. **Cleanup:** delete dead components, bump `CONTENT_UPDATED`, IndexNow, Search Console.

---

## 9. Open decisions (copied from the brief, unresolved)

| # | Decision | Options | Brief's recommendation |
|---|---|---|---|
| D1 | Hero | CG line as written, Alternative A (point of view), Alternative B (outcome first) | Launch the CG line and test A and B in prospect conversations (CG 12). B needs adding to CG Appendix A first |
| D2 | Data hosting FAQ | (a) India hosting, if confirmed; (b) a no-location promise until it is | (b) for now. CG 9 bans promising India hosting and MD lists it as open |
| D3 | Authority line | Keep "Stamped recommends and your team decides" or use "Stamped works inside limits set beforehand" | Use the CG authority line everywhere |
| D4 | Journey step 3 | Founder draft (engineers can let Stamped apply proven changes) or the fallback "Grow what it handles" | Conflicts with CG 3a and 7 and with ADR-035. Either amend CG and agree a new ADR, or use the fallback |
| D5 | Planning live | Keep live (founder decision) or mark Coming soon (MD 4.4 "Not in the first offer") | Confirm. If live, the copy promises recommendations only |
| D6 | Maintenance page | `noindex` Coming soon page, or remove the page and keep only the card | `noindex` page |
| D7 | Product names | Process and quality products are still `[NAME]` in MD | Use plain area names on the site until names are chosen |
| D8 | Industries | Retire steel, cement, pharma and chemicals with 301s | Retire |
| D9 | Survey and pilot terms | Survey free or paid; pilot 8 to 12 weeks (site) or 10 to 12 (MD) | Confirm, then fill the placeholders |
| D10 | "First finding in about two weeks" | Remove, or keep with evidence | Remove |
| D11 | Energy-era blog posts | Rewrite, unpublish with 301, or keep with an "archived" note | Unpublish or rewrite. They carry benchmark percentages and "verified on the bill" |
| D12 | URL renames | `/platform` to `/how-it-works`, `/case-studies` to `/blog` | Rename with 301s |
| D13 | Name and LinkedIn | Legal name "Stamped Energy" in footer and schema; LinkedIn URL (stamped-energy or stampedwork) | "Stamped, formerly Stamped Energy"; pick one LinkedIn URL |
| D14 | Loss calculator | Add an interactive re-treat cost calculator later | Later, after the first survey read-out |
| D15 | Candour line on About | Use or skip | Use |
| D16 | Release order | One release, or hero, authority line and broken links first | Ship the fixes and the hero first, then the rest |
| D17 | Autonomy wording | Amend CG 7 and 9 (and possibly ADR-035) so public copy can describe step 3, or keep "Autonomous execution" as a small step label only, with copy "on its own, inside limits signed beforehand", never "silent" | Added 20 Oct from Positioning & Marketing; see 12.5 |
| D18 | Hero choice | Updated 20 Oct, 15:07 IST: Vinayak's general direction (section 13) supersedes section 12. Eyebrow "Industrial AI"; H1 G1 "From monitoring your plant to improving it." (recommended), G2 "Turn plant data into better operations.", G3 "AI that runs your plant better, every shift.", G4 "Your plant already has the data. Stamped puts it to work."; opening line in 13.2. Section 12 options stay on file as alternates | G1 with the 13.2 opening line; see 13.3 for checks |

Context for D8 from this plan: on 3 Oct Vinayak asked for every industry page to stay so no buyer is turned away. This plan is drafted on that basis; D8 decides it.

Context for D9 from this plan: on 3 Oct Vinayak set the rule that the survey only fixes the pilot price and the annual price follows the pilot's results. Whatever D9 decides on length and "free or paid", that rule is kept.

---

## 10. Pending notes (not decisions from the brief)

- **N1. About co-founder roles are wrong** (awaiting Vinayak's approval). `about.ts:48` says Vinayak "Leads core technical work, strategy and marketing"; `about.ts:57` says Utso "Leads sales, outreach and software engineering ... Builds the product". Proposed: Vinayak "Leads technology, product, engineering and strategy, and some of marketing." Utso "Leads sales, outreach, finance and fundraising.", dropping "Builds the product" and keeping the site surveys and pilots line.
- **N2. The 8 Oct data answer** ("zero-trust architecture with encryption", "stored on cloud servers in India") makes security and hosting claims that CG 9 and 10 say must not be promised until confirmed. Needs confirmation before it stays anywhere (D2).
- **N3.** Company email (`stamped.energy@gmail.com`), WhatsApp link and phone or city are still open from the 3 Oct review.
- **N4.** Blog post bodies, titles and publishing state live in the CMS database, not this repo; D11 changes happen there.

---

## 11. Where this plan differs from the brief

1. **Industries kept** (2.2, 3.8, 4.2, 4.6, 6, 7.2): the brief retires steel, cement, pharma and chemical and replaces automotive. Vinayak asked on 3 Oct to keep them all. This plan adds forging and heat treatment as the lead page and keeps the rest live, aligned to CG. D8 still decides.
2. **Industries menu kept** with forging first, and a slim home industries strip, instead of a single nav link and no home section.
3. **Approval wording** (3.3 step 2, 3.6 paragraph 4, 3.10 FAQ 3): the brief implies a person approves every change, which CG 7 bans. This plan uses CG 10 wording.
4. **Pilot pricing** (3.7, 3.10 FAQ 8, 4.10): keeps Vinayak's rule that the survey prices only the pilot and the annual price follows the results.
5. **Hero:** keeps one planning card in the animation (Planning is live) and keeps the three-line H1 constraint.
6. **`/solutions/equipment-intelligence`** goes to `/solutions`, not to the Coming soon page.
7. **Code facts the brief missed:** `app/blog/page.tsx` redirects in code too; `Footer.tsx` hardcodes the authority line; `public/llms.txt` is a committed file and the `app/ai/*` and `.well-known/ai.txt` routes also carry positioning; `/case-studies/[slug]` and the CMS stay for future real case studies.
8. **FAQ 6 draft (b)** flagged: "on site where needed" is an on-site promise CG 9 holds.
9. **Placeholders in the problem example** must not ship as literal brackets.

---

## 12. Hero and three-step copy options (for Vinayak to choose)

> **SUPERSEDED IN PART (20 Oct, 15:07 IST).** Vinayak chose a general direction (section 13). The hero options and the forge-specific step copy below are kept as alternates and research only.

Added 20 October 2026 (IST) after Vinayak's feedback: the hero must sound technically strong and credible, and the three steps must map to a capability ladder (Monitoring, Decision making, Autonomous execution inside limits set beforehand). Supersedes the hero in 3.1 and the step copy in 3.3.

Sources read for this section: `docs/copy/STAMPED_COPY_GUIDE.md`, `docs/copy/stamped-copy-2026-10-19.md` (approved lines), `research/quality-plus-process/STAMPED_TECH_INNOVATION.md` (plain copy lines and the control staging in its section 4), `competitor-ai-marketing-2026-10-13.md`, `positioning-playbook-notes-2026-10-15.md`, `research/domain-systems-2026-10/README.md` and `FOUNDER-VISION.md`.

### 12.1 What credible industrial AI heroes do (research, 20 Oct)

Patterns from live vendor sites (vendors are named here only as research; never in Stamped copy):

- Imubit (imubit.com): names its category ("Closed-Loop Physical AI"), then shows the loop in three verbs (Map, Model, Control), and its control step reads "Key decisions executed autonomously ... within constraints", backed by "deterministic controller your engineers can certify" and "under operator supervision". Credibility comes from naming the model type ("nonlinear, dynamic AI process models ... guided by first principles") and the safety frame, not from adjectives. It also leads with headline percentages, which Stamped does not copy (CG 6).
- Basetwo (basetwo.ai): "Your agentic platform for ..." then a before/after table ("Process deviations are only identified when sampling occurs" against "Anticipate process drift ... to prevent out-of-spec batches"). The concrete before/after is strong; "platform" as the pitch is banned for us.
- Phaidra (phaidra.ai): outcome H1, then a subhead that names what the agents ingest ("telemetry across compute, power, cooling") and that it is "a continuous learning model". Named agents per job.
- From the internal competitor scan: Sight Machine "Control quality continuously before it becomes a defect."; Arch "Most software shows you what happened. Arch tells you what to do about it." (an "it's not X, it's Y" shape banned by CG 9); Haber uses a predict, prescribe, then "controlled autonomy" ladder.

What we take: (1) name the physical thing being modelled (furnace, heater, press, quench) and the predicted quantity (hardness, case depth), because that is what reads as technically real to an engineer; (2) put the safety frame in the same sentence as the capability (CG 7); (3) a three-rung ladder from watch to act is a recognised pattern in this category; (4) no headline numbers.

Three-line H1 check: the current H1 was sized for three lines at 1280px. As a working rule, an H1 of up to about 50 characters keeps three lines at the current size token; 50 to 60 characters needs a one-step size reduction; above 60 risks four lines. Each option states its length. This has to be confirmed in a local render when built (this PR changes no code).

### 12.2 Website bot hero options

**S1 (recommended).**
- Eyebrow: Self-improving AI for plant operations.
- H1: Predict every batch while it can still be saved.
- Subhead: Stamped's AI agents model each furnace, heater and press from your own runs, predict hardness and case depth on every batch as it runs, and tune each machine toward its best settings, inside limits set beforehand.
- Proof line: Every finding shows its evidence, and every gain is measured in your own numbers.
- Rationale: "Predict" plus a named physical model and named quality quantities reads as engineering, and "while it can still be saved" is a CG repeated phrase. Passes the swap test better than "AI agents" alone (CG 11).
- Check: no em dashes; no numbers; authority line present in the subhead; no approval or autonomy claim; H1 48 characters, three lines at the current size. New copy: H1 and subhead must be added to CG Appendix A before going live (CG 11 "approved lines used as written"). The subhead adapts the approved subhead, so it also needs Appendix A.

**S2 (approved lines as written).**
- Eyebrow: Self-improving AI for plant operations.
- H1: AI agents that work on your plant's data, every batch.
- Subhead: They monitor every process, tune each machine toward its best settings, and catch a batch at risk of rejection before it ships, inside limits set beforehand.
- Proof line: Every finding shows its evidence, and every gain is measured in your own numbers.
- Rationale: fully approved today, ships without a guide change. Vinayak found it not technical enough; "AI agents" alone is the swap-test risk the guide itself names (CG 12).
- Check: compliant as is; H1 54 characters, needs one size step down for three lines.

**S3 (control-led).**
- Eyebrow: Self-improving AI for plant operations.
- H1: Control that learns from your best runs, every batch.
- Subhead: Stamped models each machine from the data your plant already records, tests every new setting in simulation before the line sees it, and catches a batch at risk of rejection before it ships, inside limits set beforehand.
- Proof line: Every finding shows its evidence, and every gain is measured in your own numbers.
- Rationale: built from TI plain copy lines ("A control policy that learns from your best runs", "tests a move before the line sees it"); leads with smarter control, the pillar that drove the largest estimated value.
- Check: compliant; H1 53 characters, one size step down. New copy, Appendix A.

**S4 (the model that sees what sensors miss).**
- Eyebrow: AI for plant operations.
- H1: A model of each machine that sees what sensors miss.
- Subhead: Stamped's AI agents build it from your own furnace, press and lab records, watch every batch on every shift, and flag the one heading for rejection while it can still be saved, inside limits set beforehand.
- Proof line: Every finding shows its evidence, and every gain is measured in your own numbers.
- Rationale: TI plain line for the process models; most "technically great" of the options without naming a method.
- Check: compliant; borderline CG 4 ("no method names in a headline": "a model of each machine" is the guide's own plain wording, not a method name); H1 52 characters. New copy, Appendix A.

**S5 (point of view, CG 12 fallback).**
- Eyebrow: Self-improving AI for plant operations.
- H1: Every batch should make the next one better.
- Subhead: Stamped's agents are always on. They watch every process and every batch, on every shift, and flag a problem while the batch can still be saved.
- Proof line: Every finding shows its evidence, and every gain is measured in your own numbers.
- Rationale: approved lines only; strongest belief, weakest on technical credibility.
- Check: compliant; H1 44 characters; subhead has no authority line, so the proof line or a nearby line must carry "Stamped works inside limits set beforehand." (CG 11).

**S6 (outcome for the quality head).**
- Eyebrow: AI for plant operations.
- H1: Catch the bad load before the hardness test does.
- Subhead: Stamped's AI agents predict case depth and hardness from the furnace record on every load, flag drift as it starts, and point to the setting that brings the load back, inside limits set beforehand.
- Proof line: Every finding shows its evidence, and every gain is measured in your own numbers.
- Rationale: visceral and floor-level; overlaps Positioning & Marketing P3.
- Check: compliant; H1 49 characters. New copy, Appendix A.

### 12.3 Three-step capability ladder (Website bot variants)

Each step carries a small rung label (1 Monitoring, 2 Decision making, 3 Autonomous execution) above a technical title and one or two lines. Component: `HomeJourney.tsx` as in 3.3.

**Variant A (technical titles).** Section heading: From live monitoring to control inside your limits.
- 1 Monitoring. Title: A live model of every batch. Lines: Stamped joins each batch to its furnace, quench and lab records and runs a model of each machine alongside it, so drift in temperature, carbon potential or timing shows up while the batch can still be saved.
- 2 Decision making. Title: Every setting tested in simulation first. Lines: Stamped searches for a better setting on the machine model, then brings your engineer the change, the predicted result and the records behind it. The result is measured against matched batches from your own line.
- 3 Autonomous execution. Title: Closed-loop control inside a signed window. Lines: Once a kind of change has proven itself on your line, Stamped applies it through your plant's controller, inside limits a named engineer signed, with the safety filter checking every move and every change logged. Anything new goes back to your engineers.

**Variant B (plainer titles, same ladder).** Section heading: Watch, decide, then run on its own.
- 1 Monitoring. Title: Drift caught as it starts. Lines: Always-on agents watch every process and every batch, on every shift, against a model of each machine built from your own runs.
- 2 Decision making. Title: The better setting, with its evidence. Lines: Stamped proposes the setting that brings the batch back, shows what the model predicts and why, and measures the outcome in your own numbers.
- 3 Autonomous execution. Title: Proven changes, run on their own. Lines: A kind of change that has held on your line can run on its own, always inside limits set beforehand, checked by a safety filter and visible to your team.

Both variants avoid "your team approves every change" (CG 7) and never say "silent". Both describe step 3, which conflicts with the guide (12.5).

### 12.4 Positioning & Marketing options

Received 20 Oct from Stamped Positioning & Marketing, reproduced verbatim.

HERO OPTIONS (eyebrow / H1 / subhead)
1. RECOMMENDED. Eyebrow: AI for plant operations. H1: "Know how every batch will turn out while you can still change it." Sub: "Stamped builds models of your furnaces, induction heaters and presses from the data you already log. Its agents use them to predict hardness, case depth and rejection risk on every batch as it runs, and recommend the control change that keeps it in spec, inside limits your engineers set beforehand." Why: outcome-led H1 that passes the swap test; sub carries technical credibility.
2. Eyebrow: Self-improving AI for plant operations. H1: "Every batch should make the next one better." Sub: "Stamped's agents run live models of your heat-treat and forging equipment, catch a batch drifting out of spec while it can still be saved, and turn each proven fix into how the line runs, inside limits set beforehand." Why: guide POV line; less concrete.
3. Eyebrow: AI for plant operations. H1: "Catch the bad batch before it reaches the lab." Sub: "Models of your core equipment predict each batch's outcome from live process data, and always-on agents recommend the correction, test it on the model first, and apply it within limits your engineers signed." Why: most visceral for a quality head; new copy, needs adding to guide.
4. Eyebrow: AI for plant operations. H1: "Your best shift's results, on every shift, and then better." Sub: as option 1. Why: owner-facing; weaker swap test.
5. (Breaks no-method-in-headline rule) H1: "Predictive control for forging and heat treatment, always on."

THREE STEPS. Section heading: "From watching your line to running it better"
Step 1, Monitoring: "Watch every batch." Live models of each furnace, heater and press compare what the batch is doing with what it should be doing, and flag drift in temperature, carbon potential or timing while the batch can still be saved.
Step 2, Decision making: "Recommend with evidence." Stamped searches for a better setting on the equipment model first, then brings your engineer the proposed change, the predicted result and the records behind it. The outcome is measured in your own numbers.
Step 3, Autonomous execution: "Run it inside your limits." Once a kind of change has proven itself on your line, Stamped applies it through your plant's controller on its own, every time within limits signed beforehand, with the checks running first and every result logged. Anything new goes back to your engineers.

GUIDE CONFLICTS: 'Autonomous' is banned by the guide and ADR-035 rules out heat-treat setpoint writes; Vinayak explicitly asked for autonomous execution and his 15-19 Oct vision (authority ladder per class of change) supports it, so it needs a guide amendment (and possibly ADR-035), or keep 'Autonomous execution' as a small step label only with copy 'on its own, inside limits signed beforehand', never 'silent'. Step 2 avoids 'your team approves every change'. Options 1 and 3 are new hero copy and must be added to the guide before going live. Add these as open decisions D17 (autonomy wording / guide + ADR-035 amendment) and D18 (hero choice).

### 12.5 Reconciliation and recommendation

**Overlaps.** Both sets converge on the same idea: predict the batch outcome from a model of named equipment, while there is still time to act, with the limits in the same sentence. S1 and P1 are near twins; S6 and P3 are near twins; S5 and P2 share the approved H1. Both three-step sets use the same rung labels, the same step 2 shape (search on the model, bring the engineer change plus prediction plus records, measure in own numbers) and the same step 3 shape (proven class of change, through the plant's controller, inside signed limits, anything new goes back).

**Differences.**
- H1 length: P1 is 65 characters and would likely break to four lines at 1280px at the current size; S1 (48) says the same thing in three lines. P4 is 59 and has the weaker swap test both teams note.
- P1's subhead is the most technically specific of all options (induction heaters, rejection risk, "recommend the control change that keeps it in spec") and is two sentences, which helps readability. It uses "limits your engineers set beforehand", a small variation on the approved authority line; CG wants the authority line as written, so either restore "inside limits set beforehand" or log the variant in Appendix A.
- P3's subhead says agents "apply it within limits your engineers signed" in the hero. That is the autonomy claim on the first screen; it needs D17 resolved first.
- P2's "turn each proven fix into how the line runs" also implies step 3 on the first screen.
- P5 breaks CG 4 (method in a headline); listed for completeness only.
- Step titles: P&M ("Watch every batch", "Recommend with evidence", "Run it inside your limits") are plainer and closer to Variant B; Variant A is the more technical reading Vinayak asked for.

**Recommended pick (D18).** H1 from S1, "Predict every batch while it can still be saved.", with P1's subhead, with "inside limits your engineers set beforehand" changed back to "inside limits set beforehand", and the eyebrow "Self-improving AI for plant operations." The proof line stays as approved. Fallback if the shorter H1 tests worse than P1's in prospect conversations: P1 H1 with the size token reduced one step. Either way the new lines go into CG Appendix A first.

**Recommended three steps.** Variant A titles with P&M's step 1 and step 3 body wording where it is more concrete (furnace, heater and press; "Anything new goes back to your engineers"), subject to D17.

**Guide conflicts to resolve (D17).**
- CG 9 banned claims: "Do not claim autonomous action, silent control". The rung label "Autonomous execution" and any step 3 body copy conflict.
- CG 7: "Do not say Stamped or its agents control the furnace or change settings on their own." Step 3 in every variant says exactly that.
- CG 3a and TI section 4: earned optimisation (stage 3) is described only in decks and meetings, not on the website.
- ADR-035 and the master document exclude heat-treatment setpoint writes for now; a new ADR is needed before stage 2 or 3 is real.
- FOUNDER-VISION (standing approval per class of change, signed window, writer as the only path) supports the ladder.
- Options: amend CG 7, 9 and 3a, and agree an ADR, before step 3 ships; or ship steps 1 and 2 now with the step 3 fallback from 3.3 ("Grow what it handles ...") until then.
- The new hero H1s (S1, S3, S4, S6, P1, P3, P4) all need CG Appendix A entries before release (CG 11).

---

## 13. General positioning direction (20 Oct, Vinayak)

### 13.1 Direction

Vinayak's direction, 20 Oct, supersedes the hero recommendation in 12.5:

- The eyebrow is short. Proposed: "Industrial AI".
- The headline is general. It is not tied to one pain point or one industry. Vinayak prefers "From monitoring your plant to improving it." to the specific options in section 12.
- The opening line does not explain exact mechanics: no hardness, case depth or furnaces on the first screen.
- The whole site is positioned as industrial AI, AI for industries in general. It is not forging or heat-treat specific.

Knock-on effects on earlier sections of this plan (to be applied when built, after the guide is updated):

- 1 (item 6), 2.2, 3.8, 4.5 and 7.2: forging and heat treatment is no longer the lead industry. `/industries/forging-heat-treatment` becomes one industry page among equals (or is folded into `/industries/automotive`, see D8), and the Industries menu lists industries without a "first" one.
- 3.2 (Problem), 3.5 (Illustrative findings), 3.7 (Survey offer) and the solution card bodies in 3.4: keep the structure, but rewrite examples across industries (one forge or heat-treat example may stay among several). Body copy below the fold may still be concrete; only the first screen stays general.
- 7.2 titles and meta descriptions: drop "forge" and "heat treatment" from home, solutions and blog titles. Proposed home title: "Stamped | Industrial AI for plant operations" (44 characters).
- Copy guide conflict: CG section 1 and 5a say Stamped "starts with forge and heat-treat lines", and the approved eyebrow is "Self-improving AI for plant operations." The new eyebrow and general framing need a CG update (section 1, message bank, Appendix A) before release. This sits under D18.

### 13.2 Hero options

Eyebrow (all options): Industrial AI

| # | H1 | Characters | Three lines at 1280px |
|---|---|---|---|
| G1 (recommended) | From monitoring your plant to improving it. | 43 | Yes. This line was the live H1 that the current size token was tuned to |
| G2 | Turn plant data into better operations. | 39 | Yes, likely two lines; can take a larger size |
| G3 | AI that runs your plant better, every shift. | 44 | Yes |
| G4 | Your plant already has the data. Stamped puts it to work. | 57 | Needs one size step down; two sentences make the break harder to control |

Opening line (all options): Stamped's AI agents learn how your plant runs from the data it already records. They watch every line, find where output, quality and energy are being lost, and recommend the change that fixes it, inside limits set beforehand.

Primary CTA: Book a site survey. Secondary text link: See how it works. Proof line: Every finding shows its evidence, and every gain is measured in your own numbers.

### 13.3 Checks

- No em dashes, no numbers, no named industry or method on the first screen.
- Authority line present in the opening line.
- G1: general, owner-friendly, and it states the ladder (monitor, then improve). Swap test: weak on its own (any monitoring vendor could say it). The opening line carries the Stamped-specific part (AI agents, the plant's own records, inside limits set beforehand). Accept that trade-off or pair G1 with the CG point-of-view line lower on the page.
- G2: close to the retired "Turn plant data into action."; swap test weak.
- G3: "runs your plant" implies autonomous control on the first screen, which CG 7 and 9 bar unless D17 amends them.
- G4: strongest swap test of the four and most concrete. Two short sentences is allowed (CG 9 bans runs of very short sentences, which this is not).
- Opening line: "recommend the change that fixes it" is a recommendation, so it is compliant without D17. "Energy" is listed with output and quality, so it does not read energy-only (CG 9).
- "Industrial AI" eyebrow: not in the CG message bank; needs an Appendix A entry. It also helps search, since it is a category people search for.

### 13.4 General three steps

Section heading (proposed): From watching your plant to running it better.

- 1 Monitoring. Title: See every process as it runs. Line: A live model of your plant spots drift while there is still time to act.
- 2 Decision making. Title: The next best move, with its evidence. Line: Every change is tested on the model first, and the result is measured in your own numbers.
- 3 Autonomous execution. Title: Proven changes, run on their own. Line: Only changes that have already worked on your line, always inside limits set beforehand.

Checks: step 2 does not say a person approves every change (CG 7). Step 3 and its label still conflict with CG 7 and 9 and with ADR-035 for heat-treat setpoints (D17). Fallback for step 3 until D17 is settled: "Grow what it handles. As each kind of change proves itself, your engineers decide how much more Stamped takes on, always inside limits they signed beforehand." Step 3's line is a fragment; when built, write it as a sentence: "Once a change has already worked on your line, Stamped can run it on its own, always inside limits set beforehand."

---

## 14. Inspiration from Faclon and Munshi OS

Reviewed 20 Oct 2026 (IST): faclon.com home and `/industry/automobile-autoparts`, munshios.com home and `/industries/forging/`, plus both sites' navigation link lists. Patterns only. None of their wording is used, and neither company is named on stamped.work (CG 1a, CG 9).

### 14.1 Faclon (faclon.com)

Structure seen: product-suite hero ("One platform ..." style H1 with a list of benefits), a band of headline metrics, an interactive digital-maturity self-assessment with three levels (foundation, intelligent, autonomous), a platform section with named modules, testimonials with names and titles, a per-industry grid (focus, benefits, solutions), "impact across the org chart" by role, named solution experts, case studies titled with percentages and dollar savings, Mumbai and US addresses and phone numbers in the footer. Nav: products, solutions (long list), industries (11), case studies, comparison, book a demo.

Worth taking:
- The three-level maturity ladder (descriptive and diagnostic, then predictive and prescriptive, then closed-loop autonomous) is the same shape as our three steps, which confirms the ladder reads as credible in this category.
- A role-based "who gets what" section (CXO, plant head, maintenance engineer) makes value concrete for each buyer in the room.
- Per-industry pages organised as pain, benefit and what is monitored, with a long list of named equipment, show breadth without a separate pitch per industry.
- A connectivity section naming protocols and sources (PLC, SCADA, OPC, Modbus, ERP) answers "will it work with my plant" before anyone asks.
- A real Indian address and phone number in the footer is a trust signal for Indian buyers (our open note N3).
- A self-assessment as a lead magnet (later; it sits next to D14).

Avoid:
- Headline metric bands and percentage or dollar case-study titles (CG 6 and 9; we have no verified results).
- Testimonial and logo walls (we have none and must not invent them).
- "One platform" and named module sprawl (CG 9 bans "platform" as the pitch; too many product names dilutes two products).
- Buzzword H1s that list four benefits at once.

### 14.2 Munshi OS (munshios.com)

Structure seen: H1 about hidden losses, a row of capability tags, a pain-led opening paragraph that lists losses in floor language, an illustrative alert card (reading, threshold, action, escalation path supervisor to ops head to plant head), four function cards, a comparison of what the ERP records against where the causes live, "two streams" (machine data plus operator reports), loss attribution to machine, shift and batch, per-function deep sections with bullet lists, an illustrative KPI dashboard labelled "Illustrative data", an energy and carbon section, an "audit-ready" section, illustrative "kind of losses surfaced in the first weeks" cards, and a CTA asking the visitor to name one line or machine. Industry pages follow the material stage by stage (billet heating, press, heat treatment, shot blasting, inspection) with the loss hidden in each stage. Nav: features, modules, industries with sub-stages, blog, "the ERP gap".

Worth taking:
- Industry pages that follow the material stage by stage, with the loss hidden in each stage, are the clearest way to show we understand an industry without a long pitch. This fits all our industry pages, not just forging.
- An illustrative product card that shows the reading, the suggested action and who it escalates to makes the product tangible. Our `HeroPlantFlow` cards can carry the "who gets it" line.
- Clearly labelled illustrative findings ("the kind of losses teams find") confirm the 3.5 approach; the label must be visible.
- A "where your existing systems stop" comparison (ERP and MES record what happened; the cause sits between systems) explains the gap Stamped fills in one screen.
- Machine data plus people's records in one record matches CG ("records the plant already keeps", load cards and lab sheets) and is worth a short section.
- An audit-ready angle (every batch's record ready when the auditor or customer asks) is already a CG proof point; give it a home on the Quality page.
- The CTA that asks for one line or machine where you suspect losses, with a stated reply time, is concrete and low effort.

Avoid:
- Heavy use of em dashes and the "X tells you the numbers, Y tells you the causes" shape (CG 9 bans the shape and em dashes).
- Illustrative dashboards full of specific-looking percentages; even labelled, they read as results. Ours use placeholders or no figures.
- "All four systems in one" replacement framing (CG 1: Stamped is not a replacement for MES, quality or maintenance systems).
- Monitoring-and-dashboard framing as the core (CG: Stamped is not a dashboard).
- Carbon and ISO certification claims we cannot back.

### 14.3 Proposed changes for stamped.work

| # | Change | Page and component | Draft copy (ours) |
|---|---|---|---|
| C1 | "Where your current systems stop" section, replacing the removed `HomeWhatIs` | Home, `components/sections/HomeWhatIs.tsx` repurposed as `HomeSystemsGap.tsx`, `landingContent.systemsGap` | H2: Your plant already records most of what it needs. Body: Your ERP, your machine controllers and your quality sheets each hold part of the story, and the cause of a loss usually sits between them. Stamped joins them into one record for every batch and works on that record, on every shift. |
| C2 | Role section: what each person gets | Home, new `components/sections/HomeRoles.tsx`, `landingContent.roles` | Owner: losses counted in your own numbers. Plant head: where output, quality and energy are slipping this week. Process and quality engineers: the evidence behind every suggestion. Operators and shift leads: the right setting for the job, and why. (Write as sentences when built, CG 9.) |
| C3 | "Who gets it" line on the illustrative cards | Home hero panel, `components/sections/hero/HeroPlantFlow.tsx` and its card data | Each card ends with a routing line such as "Goes to: shift lead, then plant head if not closed". Cards stay labelled "Illustrative examples". |
| C4 | Stage-by-stage industry pages | Every industry page, `components/industries/vertical/IndustryPlantZigZag.tsx`, `lib/content/vertical-pages/*.ts` (new `stages` array) | For each industry, the process stages in order with one plain line on what leaks at that stage. Example for cement (ours): raw mill, kiln, cooler, cement mill, packing. |
| C5 | Industries hub grid by industry: what goes wrong, what Stamped watches | `/industries`, `components/industries/IndustriesHubMatrix.tsx` | One row per industry, no metrics. Keeps all industries equal under section 13. |
| C6 | "Works with what you have" connectivity strip | `/how-it-works`, `components/how-it-works/HiwDeployment.tsx` | Sources Stamped reads: PLC and SCADA exports, historians, ERP extracts, Excel, and photographed paper cards and lab sheets. `[CONFIRM: exact connectors and protocols built]` |
| C7 | Audit-ready lot record | `/solutions/quality`, `SolutionAreaPage` section | CG pillar proof line used as written: "Every finding opens to the record behind it, so each lot's quality record is ready when the auditor or the customer asks." |
| C8 | Ladder visual for the three steps | Home `HomeJourney.tsx` (13.4) | Three rungs with the labels Monitoring, Decision making, Autonomous execution; no maturity score or quiz for now. |
| C9 | Concrete CTA ask and reply time | `/contact`, `lib/content/contact.ts`; home survey band | "Tell us one line where you think you are losing output, quality or energy. We reply within `[PLACEHOLDER]` working days." |
| C10 | Indian address and phone in the footer | `components/layout/Footer.tsx`, `lib/content/site.ts` | `[CONFIRM: address, phone, company email]` (note N3). |
| C11 | Self-assessment (later) | New page, after the first survey read-out | Grouped with D14. |

Hero and eyebrow refinements suggested by the review:

- "Industrial AI" as the eyebrow fits the category language both sites use for search and navigation. Keep it as the eyebrow, and keep "AI for plant operations" in titles and the Organization description.
- Both sites lead with losses; G1 leads with the journey. Keep G1, and let the opening line name the losses (output, quality, energy), as 13.2 already does.
- Optional opening-line variant that adds the "cause sits between systems" idea: "Stamped's AI agents learn how your plant runs from the data it already records, across machines, quality sheets and production logs. They find where output, quality and energy are being lost, and recommend the change that fixes it, inside limits set beforehand."

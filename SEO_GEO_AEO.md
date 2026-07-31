# SEO, GEO & AEO - Stamped Energy (`stamped.work`)

Living record of search, generative-engine, and answer-engine optimizations for the marketing site.  
**Last updated:** 2026-06-08 · **Domain:** `https://stamped.work`

---

## Positioning (source of truth)

All SEO, GEO, and AEO copy derives from **`lib/content/icp.ts`**. Do not hardcode positioning in components.

| Field | Current value |
|-------|----------------|
| **Category** | AI-powered energy intelligence |
| **Alternate category** | AI-powered prescriptive energy intelligence |
| **Entity definition** | Stamped Energy is AI-powered prescriptive energy intelligence software for energy-intensive plants in India. Connects meters, SCADA, PLCs, and DISCOM bills into ranked prescriptions with bill-verified savings. |
| **ICP bill filter** | Built for plants with ₹20 lakh+ monthly electricity bills. |
| **Audience** | Plant directors, VP Operations, electrical heads, CFOs at energy-intensive plants in India (₹200 Cr+ revenue). |
| **Verticals** | Cement, steel, pharmaceutical, chemical, automotive |
| **Benchmark outcomes** | 12-20% monthly bill reduction; 15-25% MD reduction - always verified in pilot M&V |
| **Not** | Passive EMS dashboard or SCADA replacement |

**Homepage hero (2026-06):**

- Eyebrow: AI-Powered Energy Intelligence
- H1: From plant data / to verified savings
- Sub: AI-powered prescriptive intelligence that identifies cost-saving opportunities and delivers actions to improve efficiency.
- ICP line: Built for plants with ₹20 lakh+ monthly electricity bills.

**Why "plants" not "manufacturers":** ICP includes cement, steel, pharma, chemical, and automotive sites that may not self-identify as generic "manufacturers." Bill size (₹20L+/month) is the qualifying filter for copy and SEO.

---

## Purpose

| Discipline | Goal |
|------------|------|
| **SEO** | Rank for brand, category, and vertical-intent queries in Google/Bing |
| **AEO** | Be cited as the authoritative answer in AI assistants (ChatGPT, Perplexity, Google AI Overviews, Claude) |
| **GEO** | Establish **Stamped Energy** as a recognizable entity across the web (schema, profiles, Wikidata, consistent entity sentences) |

---

## Keyword strategy

### Tier 1 - Brand (must dominate)

| Keyword | Intent | Primary page |
|---------|--------|--------------|
| `stamped energy` | Navigational | `/` |
| `stamped energy india` | Navigational | `/` |
| `stamped.work` | Navigational | `/` |

### Tier 2 - Category (solution-aware)

| Keyword | Primary page |
|---------|--------------|
| `AI-powered energy intelligence India` | `/` |
| `prescriptive energy intelligence India` | `/`, `/how-it-works` |
| `energy management software for plants India` | `/` |
| `reduce electricity bill industrial plant India` | `/`, `/blog` |
| `maximum demand reduction India` | `/how-it-works`, `/blog` |
| `DISCOM bill savings India` | `/how-it-works`, `/blog` |
| `SEC reduction industrial plant India` | `/industries`, vertical pages |

### Tier 3 - Vertical (high intent)

| Vertical | Primary page | Supporting keywords |
|----------|--------------|---------------------|
| Cement | `/industries/cement` | cement plant energy management India, kWh/ton cement, WHR dispatch |
| Steel | `/industries/steel` | steel plant energy efficiency India, induction furnace MD, PAT SEC steel |
| Pharma | `/industries/pharma` | pharmaceutical plant HVAC energy savings, chiller staging pharma |
| Chemical | `/industries/chemical` | chemical plant batch energy optimization, reactor stagger MD |
| Automotive | `/industries/automotive` | auto component energy cost reduction, die casting MD, shift-start |

### Tier 4 - Long-tail / AEO questions

Target these in FAQ schema, blog H2/H3 (`?` headings), and sr-only AEO headings:

- What is prescriptive energy intelligence?
- What is AI-powered energy intelligence for plants?
- How is Stamped Energy different from EMS or SCADA?
- How much can plants reduce their electricity bill?
- Does Stamped require hardware retrofit?
- How are energy savings verified on the DISCOM bill?
- How does Stamped work for [cement / steel / pharma / chemical / automotive] plants?

---

## Code architecture

All SEO logic lives under `lib/seo/` and is applied in App Router `page.tsx` / `layout.tsx` files. **No SEO config in UI components** except content classes (e.g. `.hero-headline`, `.value-proposition` for Speakable schema).

| File | Responsibility |
|------|----------------|
| `lib/content/icp.ts` | **Positioning source of truth** - category, entity definition, audience, ICP bill line |
| `lib/seo/pages.ts` | Canonical **title tags** and **meta descriptions** for static routes |
| `lib/seo/metadata.ts` | `buildPageMetadata()`, OG/Twitter, canonical, `en-IN` geo tags |
| `lib/seo/constants.ts` | `SITE_URL`, OG image, `SEO_KEYWORDS`, re-exports entity definition |
| `lib/seo/schemas.ts` | JSON-LD (Organization, FAQ, HowTo, Article, SoftwareApplication, etc.) |
| `lib/seo/breadcrumbs.ts` | `generateBreadcrumbSchema()` helper |
| `lib/seo/crawlers.ts` | Search + AI crawler allow-list for `robots.ts` |
| `components/seo/JsonLd.tsx` | Renders `<script type="application/ld+json">` |
| `app/robots.ts` | Dynamic `/robots.txt` |
| `app/sitemap.ts` | Dynamic `/sitemap.xml` (all static routes + blog posts; `/case-studies` redirects to `/blog`) |
| `lib/seo/extract-faq.ts` | Auto-extract FAQ JSON-LD from blog/case study `?` headings |
| `app/llms-full.txt/route.ts` | Dynamic CMS index with entity definition header |
| `public/llms.txt` | Static site guide for AI crawlers (**not linked in UI**) |
| `public/og-default.png` | Default Open Graph image (1200×630). After replacing the file, bump `DEFAULT_OG_IMAGE_VERSION` in `lib/seo/constants.ts` so LinkedIn/WhatsApp refetch (they cache by full `og:image` URL). |

**Environment:** Set `NEXT_PUBLIC_SITE_URL=https://stamped.work` in production so canonicals, OG URLs, and schema `@id`s resolve correctly.

---

## Completed - technical SEO

### Metadata (all public routes)

Every public route has spec-aligned **title**, **meta description**, **canonical URL**, **Open Graph**, and **Twitter Card** tags via `PAGE_SEO` in `lib/seo/pages.ts`.

| Route | Title pattern |
|-------|---------------|
| `/` | Stamped Energy \| AI-Powered Energy Intelligence for Plants in India |
| `/how-it-works` | How It Works \| Stamped Energy - 5-Step Energy Loop |
| `/about` | About Stamped Energy \| IIT Roorkee Engineers, Verified Savings |
| `/blog` | Case Studies & Industry Insights \| Stamped Energy |
| `/case-studies` | Permanent redirect → `/blog` |
| `/contact` | Book a Discovery Call \| Stamped Energy |
| `/industries` | Industries \| Stamped Energy - Cement, Steel, Pharma, Chemical, Auto |
| `/industries/[slug]` | Vertical-specific titles (automotive, cement, steel, pharma, chemical) |
| `/blog/[slug]` | `{Post Title} \| Stamped Energy` |
| `/case-studies/[slug]` | Permanent redirect → `/blog` |

Blog posts emit `article` Open Graph with `publishedTime`, `modifiedTime`, `authors`, and `tags`.

### Global metadata defaults (root layout)

- **`SEO_KEYWORDS`** - from `lib/seo/constants.ts`; applied via `buildPageMetadataFromConfig()`
- **`robots`** - `index, follow` with `googleBot` `max-image-preview: large`, `max-snippet: -1`
- **Default OG/Twitter** - fallback images on all pages via `siteMetadataBase`
- **`app/not-found.tsx`** - `noindex, nofollow` for 404 pages

### Region & language

- `<html lang="en-IN">` in root layout
- Metadata `other`: `geo.region: IN`, `geo.placename: India`, `content-language: en-IN`
- Open Graph `locale: en_IN`

### Crawling & discovery

- **`app/robots.ts`** - welcomes `*` plus search crawlers (Googlebot, Bingbot) and AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, and others). Blocks `/blog/admin`, `/api/`, `/_next/`.
- **`app/sitemap.ts`** - all five industry verticals at priority 0.85-0.9; homepage 1.0; dynamic blog/case study URLs.
- **`public/llms.txt`** - entity definition, AEO Q&A block, core pages, keywords, audience, disambiguation ("what we are not").
- **`/llms-full.txt`** - auto-generated CMS index with entity definition header from `icp.seo.entityDefinition`.

### Admin & non-public routes

All `/blog/admin/*` pages export `robots: { index: false, follow: false }`.

---

## Completed - structured data / JSON-LD

| Schema | Where | Purpose |
|--------|-------|---------|
| **Organization** | `app/layout.tsx` (every page) | Brand entity; `knowsAbout` includes all five verticals + AI-powered energy intelligence |
| **SoftwareApplication** | Homepage | Product entity; feature list includes AI-powered prescriptive intelligence |
| **WebSite** + SearchAction | Homepage | Site entity; blog search template |
| **FAQPage** | Homepage | 5 product FAQs (plants in India wording) |
| **FAQPage** | Each `/industries/[slug]` | Vertical-specific FAQs from content model |
| **FAQPage** | Blog/case study posts (auto) | Extracted from `?`-ending H2/H3 headings |
| **HowTo** (5 steps) | `/how-it-works` | Connect → Verify workflow with anchor URLs |
| **ContactPage** | `/contact` | Discovery call page entity |
| **CollectionPage** | `/blog` | Case Studies listing (CRM blog posts) |
| **Person** × 2 | `/about` | Founders (IIT Roorkee alumni) |
| **Article** | Each blog post + case study | With `about` pointing to plant energy management in India |
| **SpeakableSpecification** | Homepage | `.hero-headline`, `.value-proposition`, `.key-numbers` |
| **SpeakableSpecification** | Each blog post | `.blog-article-prose h1`, `.blog-article-prose p` |
| **BreadcrumbList** | All non-homepage routes | Home → section → page |

**Entity sentence rule:** Organization, WebSite, and SoftwareApplication `description` fields use `icp.seo.entityDefinition` verbatim for cross-platform consistency (GEO).

---

## AEO - Answer Engine Optimization

### Entity clarity (required on every major surface)

Use this sentence (from `icp.seo.entityDefinition`) wherever AI systems might scrape for "what is Stamped Energy":

> Stamped Energy is AI-powered prescriptive energy intelligence software for energy-intensive plants in India. It connects existing incomer meters, SCADA, PLCs, and DISCOM bills into ranked prescriptions - what to change, who owns it, rupee impact, and verified savings on the next electricity bill.

Surfaces that must carry it or a derivative:

- `public/llms.txt` (entity definition block)
- `/llms-full.txt` (header)
- Organization + SoftwareApplication JSON-LD
- `lib/content/site.ts` description
- Homepage FAQ schema answers

### Disambiguation (what we are NOT)

Always pair category claims with:

> Not a passive EMS dashboard or SCADA replacement. Stamped is the prescription and accountability layer.

This prevents AI systems from categorizing Stamped as generic "energy monitoring software."

### Speakable / voice search targets

Homepage CSS selectors wired in `homepageSpeakableSchema`:

- `.hero-headline` - From plant data to verified savings
- `.value-proposition` - AI-powered prescriptive intelligence subheading
- `.key-numbers` - Outcome stats section

### FAQ extraction for blog/case studies

Posts with H2/H3 headings ending in `?` followed by answer paragraphs auto-generate FAQPage JSON-LD via `lib/seo/extract-faq.ts`. **Content guideline:** write one FAQ-style heading per post on a question plant heads actually ask.

### AI crawler policy

`lib/seo/crawlers.ts` explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, and others on public routes. Keep this list updated as new AI crawlers emerge.

---

## GEO - Generative Engine Optimization

GEO = entity recognition across the web so LLMs and search AI associate "Stamped Energy" with a specific product category.

### On-site entity graph

```
Stamped Energy (Organization)
├── SoftwareApplication (product)
├── WebSite (stamped.work)
├── Person × 2 (founders)
├── FAQPage (homepage + verticals)
├── HowTo (5-step loop)
└── Article (blog + case studies)
    └── about: energy management for plants in India
```

### Off-site entity establishment (manual)

| # | Item | Status | Action |
|---|------|--------|--------|
| 1 | Google Search Console | Done | Monitor AI Overview impressions |
| 2 | Sitemap submitted | Done | Resubmit after major URL additions |
| 3 | **Google Business Profile** | Not done | Category: Software Company; location: IIT Roorkee; URL: stamped.work |
| 4 | **LinkedIn Company Page** | Not done | Create Stamped Energy page; add to Organization `sameAs` |
| 5 | **Wikidata entry** | Not done | Instance of software company; country India; website stamped.work; founded 2025 |

After LinkedIn Company Page exists:

```ts
// lib/seo/schemas.ts → organizationSchema.sameAs
sameAs: [
  "https://www.linkedin.com/in/vinayak-rz/",
  "https://www.linkedin.com/in/utso/",
  "https://www.linkedin.com/company/stamped-energy", // actual URL
],
```

### Consistency rule

Name, URL, category label, and entity definition must match across:

- Website schema + llms.txt
- LinkedIn Company Page
- Google Business Profile
- Wikidata
- Any directory listings

Inconsistency degrades AI entity confidence.

---

## E-E-A-T signals (Experience, Expertise, Authoritativeness, Trustworthiness)

| Signal | Implementation |
|--------|----------------|
| **Experience** | Case studies with M&V methodology; blog field notes from plant contexts |
| **Expertise** | IIT Roorkee electrical engineering founders; Person schema with `knowsAbout` |
| **Authoritativeness** | Vertical-specific pages with process-aware content; FAQ schema per vertical |
| **Trustworthiness** | Benchmark ranges labelled; bill-verified savings claim; no fabricated stats |

**Trust copy rules:**

- Never state customer results without M&V citation
- Use `` for benchmark ranges in body copy
- "Verified on your DISCOM bill" is the trust anchor - repeat in meta descriptions and FAQs

---

## Content & on-page SEO (current state)

### Homepage

- H1: From plant data / to verified savings (two-line)
- Eyebrow: AI-Powered Energy Intelligence
- Subheading: AI-powered prescriptive intelligence + ICP bill line
- sr-only span: vertical keywords for crawlers
- Speakable targets wired

### How It Works

- H1: Prescriptive intelligence across your entire energy stack
- Sub: meters/SCADA gap → bill-verified savings narrative
- HowTo schema with 5 anchored steps
- sr-only AEO question headings in pinned journey section

### Industries hub + 5 verticals

- Hub: "Industries we serve" + purpose-built AI-powered energy intelligence
- Each vertical: Greenovative-style hero (AI-driven/powered energy intelligence), Energy challenges section, Actionable energy intelligence waste table, What you gain outcomes
- FAQ schema per vertical from content model
- All verticals in sitemap at priority 0.85-0.9

### Internal linking

- Homepage industries section → each vertical
- Blog posts → related articles + industry anchors + `/how-it-works`
- Industry segments → `relatedArticle` blog links where configured
- Mega menu → vertical pages with hover preview

---

## Remaining & ongoing maintenance

### High priority

| Item | Owner |
|------|-------|
| Google Business Profile | Marketing |
| LinkedIn Company Page + schema `sameAs` | Marketing + Dev |
| Wikidata entry | Marketing |
| GSC monitoring - AI Overview impressions weekly | Marketing |
| OG image QA (Twitter Card Validator, LinkedIn Post Inspector) after deploys | Marketing |

### Medium priority

| Item | Notes |
|------|-------|
| Custom OG images per major page | Branded 1200×630 for home, how-it-works, top verticals |
| Blog content for each vertical | Improves long-tail and AEO citation depth |
| Forging blog post + segment link | Spec gap |
| Heading audit on `/about`, listing pages | Single H1, no skipped levels |

### Low priority / periodic

| Item | Notes |
|------|-------|
| Refresh `llms.txt` when positioning changes | Sync with `icp.seo` |
| Add new AI crawlers to `lib/seo/crawlers.ts` | As landscape evolves |
| AEO mention tracking | Search brand in ChatGPT, Perplexity, Google AI Overviews monthly |
| Resubmit sitemap in GSC after major URL changes | |

---

## How to update when positioning changes

1. Update **`lib/content/icp.ts`** first (`seo.entityDefinition`, `heroBillLine`, `categoryLabel`, etc.).
2. Sync **`lib/seo/constants.ts`** keywords if category terms change.
3. Update **`lib/seo/pages.ts`** titles/descriptions.
4. Verify **`lib/seo/schemas.ts`** pulls from `icp` (Organization, FAQ, SoftwareApplication).
5. Update **`public/llms.txt`** entity block and AEO Q&A section.
6. Update **`SEO_GEO_AEO.md`** (this file).
7. Run validation checklist below.

---

## How to add new content

### New static page

1. Add entry to `lib/seo/pages.ts`.
2. In route `page.tsx`: `export const metadata = buildPageMetadataFromConfig(PAGE_SEO.myPage)`.
3. Add `<JsonLd>` for breadcrumb + page-specific schema.
4. Add to `STATIC_PATHS` and `STATIC_PRIORITIES` in `app/sitemap.ts`.
5. Add link + description to `public/llms.txt`.

### New blog post

- Title: `{title} | Stamped Energy` (automatic).
- Article + Speakable + Breadcrumb JSON-LD automatic.
- FAQ schema auto-generated from `?` headings.
- Sitemap and `/llms-full.txt` pick up published posts automatically.
- Prefer one FAQ-style H2 per post for AEO.

### New industry vertical

1. Add vertical content in `lib/content/vertical-pages/`.
2. Add `PAGE_SEO.industries*` entry.
3. Add route with FAQ schema via `verticalFaqSchema(slug)`.
4. Add to sitemap, `llms.txt`, industries hub.
5. Add to Organization `knowsAbout` in schemas if new sector.

---

## Validation checklist (run after major SEO changes)

- [ ] `npm run build` passes
- [ ] Positioning consistent: grep for "Indian manufacturers" - should only appear in legacy blog/seed content, not live SEO surfaces
- [ ] [Rich Results Test](https://search.google.com/test/rich-results) on `/`, one blog post, `/how-it-works`, one vertical
- [ ] [Schema validator](https://validator.schema.org) on Organization + SoftwareApplication + one Article
- [ ] `https://stamped.work/robots.txt` - AI bots listed with `Allow: /`
- [ ] `https://stamped.work/sitemap.xml` - all five verticals present
- [ ] `https://stamped.work/llms.txt` - entity definition matches `icp.seo.entityDefinition`
- [ ] `https://stamped.work/llms-full.txt` - entity header present
- [ ] No duplicate H1s; canonical URLs match production
- [ ] Resubmit sitemap in GSC if URL count changed

---

## Git history (SEO-related commits)

| Commit | Summary |
|--------|---------|
| `0b6a98d` | Full SEO/AEO metadata, JSON-LD, content optimizations |
| `07c5f75` | AI + search crawler welcome policy, llms.txt |
| `efe740f` | Phase 2: FAQ auto-extract, case study Article, llms-full.txt |
| `2104277` | Hero + industries copy refresh (AI-powered energy intelligence) |
| *(pending)* | Positioning shift: plants ICP, expanded SEO/AEO doc, schema + llms sync |

---

## Related docs

- `lib/content/icp.ts` - positioning source of truth
- `PROGRESS.md` - project phase tracking
- `DECISIONS.md` - architecture decision log
- `.agents/skills/seo-aeo-best-practices/` - general SEO/AEO principles reference

**Maintenance rule:** Update this file whenever SEO, GEO, or AEO implementation changes - especially when `icp.seo` positioning changes.

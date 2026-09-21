import { AI_DISCOVERY_PHASE } from "@/lib/admin/ai-discovery";
import {
  normalizeStatus,
  parseJsonField,
  parseYamlFrontmatter,
  stripOuterCodeFence,
} from "@/lib/admin/parse-yaml-frontmatter";
import { slugify } from "@/lib/blog/utils";
import {
  CASE_STUDY_CATEGORIES,
  CASE_STUDY_CATEGORY_IDS,
  type CaseStudyMetric,
} from "@/lib/case-studies/constants";
import { siteConfig } from "@/lib/content/site";
import { COVER_IMAGE_OPTIONS } from "@/lib/blog/ai-workflow";
import { markdownToRichDoc, serializeRichDoc } from "@/lib/rich-content/document";

export type AiCaseStudyImport = {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  bodyJson?: string;
  category?: string;
  industry?: string;
  clientContext?: string;
  tag?: string;
  metrics?: CaseStudyMetric[];
  outcomes?: string[];
  disclaimer?: string;
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  featured?: boolean;
  coverImage?: string;
  coverImageAlt?: string;
};

const CATEGORY_LIST = CASE_STUDY_CATEGORIES.map(
  (category) => `- \`${category.id}\` , ${category.label}`,
).join("\n");

/**
 * Master prompt for case study writing with discovery Q&A, then YAML + Markdown.
 */
export function buildAiCaseStudyWriterPrompt(topic?: string): string {
  const topicBlock = topic?.trim()
    ? `\n## Seed topic (optional starting point)\nThe author has this in mind: **${topic.trim()}**\nUse it as a starting point in discovery, not as a final title.\n`
    : "";

  return `You are a case study writing assistant for **${siteConfig.name}**, an AI-powered prescriptive energy intelligence company for energy-intensive plants in India.

${AI_DISCOVERY_PHASE}

**Case study discovery extras** (ask these during Phase 1 when relevant)
- Is this a named client, anonymized plant, or reference benchmark only?
- What process or plant type (die casting, forging, heat treatment, rubber moulding, etc.)?
- What verified or benchmark metrics should appear in the hero (₹ savings, MD reduction, SEC, payback)?
- What problem → approach → proof arc should the story follow?

---

## Company context (for Phase 2 writing)
- ${siteConfig.tagline}
- Audience: plant heads, procurement, and energy HODs at auto component SMEs in India
- Tone: credible, field-grounded, rupee outcomes. Label benchmarks clearly when not a named client
- Avoid: em dashes, vague AI language, unverified superlatives, naming clients without confirmation

## Case study structure (Phase 2)
- Hero fields: title, excerpt, client context, 2-4 headline metrics, 3-5 outcome bullets
- Body: Problem → Approach → Results (and optional "What we learned")
- 900-1,600 words unless discovery agreed otherwise
- If discovery agreed on diagrams or GIFs, use \`![describe the visual](/path/or-url.jpg)\` or \`[GIF: description]\` placeholders

## Categories (pick exactly one \`category\` id)
${CATEGORY_LIST}

## Cover images (pick one path or leave empty)
${COVER_IMAGE_OPTIONS.map((src) => `- \`${src}\``).join("\n")}
${topicBlock}
## REQUIRED Phase 2 output format
Reply with **only** the case study package below.

\`\`\`
---
title: [Outcome-led title, e.g. "Rubber moulding: SEC baseline in 30 days"]
slug: [lowercase-hyphenated-url-slug]
excerpt: [2-3 sentences for cards, max 320 chars]
category: [one category id from list above]
industry: [e.g. Rubber moulding supplier, western India]
client_context: [One sentence for hero/card, plant type and scope]
tag: [optional badge, e.g. Field pilot, or leave empty]
status: draft
featured: false
cover_image: [path from list above, or leave empty]
cover_image_alt: [describe the cover photo]
metrics_json: [{"label":"Monthly savings","value":"₹8-12L"},{"label":"MD reduction","value":"15-18%"}]
outcomes_json: ["Outcome bullet one","Outcome bullet two","Outcome bullet three"]
disclaimer: [Optional M&V or benchmark disclaimer, or leave empty]
---

## The problem

What the plant faced. Specific loads, bills, or operational pain.

## Our approach

How Stamped Energy connected data and assigned fixes. Use bullets if helpful.

## Results

Verified or benchmark outcomes tied to methodology.

## What we learned

Optional short closing takeaway for similar plants.
\`\`\`

## Field rules
- \`metrics_json\` must be valid JSON array of \`{"label":"...","value":"..."}\` objects (2-4 items)
- \`outcomes_json\` must be valid JSON array of strings (3-5 short bullets)
- Body may use \`#\` / \`##\` / \`###\` headings (\`##\` preferred for sections; \`#\` sparingly for larger in-body titles)
- No HTML in the body

When discovery is complete and the author confirms, output the frontmatter block and markdown body.`;
}

function normalizeCategory(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const id = value.trim();
  if (CASE_STUDY_CATEGORY_IDS.includes(id as (typeof CASE_STUDY_CATEGORY_IDS)[number])) {
    return id;
  }
  const byLabel = CASE_STUDY_CATEGORIES.find(
    (category) => category.label.toLowerCase() === id.toLowerCase(),
  );
  return byLabel?.id;
}

export function parseAiCaseStudyOutput(raw: string): {
  data: AiCaseStudyImport;
  warnings: string[];
} {
  const warnings: string[] = [];
  const text = stripOuterCodeFence(raw);

  const parsed = parseYamlFrontmatter(text);

  if (!parsed) {
    if (text.length > 0) {
      warnings.push("No YAML frontmatter found. Imported as content only.");
      return { data: { content: text }, warnings };
    }
    warnings.push("Nothing to import.");
    return { data: {}, warnings };
  }

  const { meta, body } = parsed;
  const data: AiCaseStudyImport = {};

  if (typeof meta.title === "string" && meta.title.trim()) {
    data.title = meta.title.trim();
  }
  if (typeof meta.slug === "string" && meta.slug.trim()) {
    data.slug = slugify(meta.slug);
  } else if (data.title) {
    data.slug = slugify(data.title);
  }
  if (typeof meta.excerpt === "string" && meta.excerpt.trim()) {
    data.excerpt = meta.excerpt.trim();
  }
  if (typeof meta.industry === "string" && meta.industry.trim()) {
    data.industry = meta.industry.trim();
  }
  if (typeof meta.client_context === "string" && meta.client_context.trim()) {
    data.clientContext = meta.client_context.trim();
  } else if (typeof meta.clientContext === "string" && meta.clientContext.trim()) {
    data.clientContext = meta.clientContext.trim();
  }
  if (typeof meta.tag === "string" && meta.tag.trim()) {
    data.tag = meta.tag.trim();
  }
  if (typeof meta.disclaimer === "string" && meta.disclaimer.trim()) {
    data.disclaimer = meta.disclaimer.trim();
  }
  if (body) {
    data.content = body;
    data.bodyJson = serializeRichDoc(markdownToRichDoc(body));
  }

  const category = normalizeCategory(meta.category);
  if (category) {
    data.category = category;
  } else if (meta.category) {
    warnings.push(`Unknown category "${String(meta.category)}". Pick one manually.`);
  }

  const metrics =
    parseJsonField<CaseStudyMetric[]>(meta.metrics_json) ??
    parseJsonField<CaseStudyMetric[]>(meta.metricsJson);
  if (metrics?.length) {
    data.metrics = metrics.filter((m) => m.label && m.value);
  }

  const outcomes =
    parseJsonField<string[]>(meta.outcomes_json) ?? parseJsonField<string[]>(meta.outcomesJson);
  if (outcomes?.length) {
    data.outcomes = outcomes.filter(Boolean);
  }

  const status = normalizeStatus(meta.status);
  if (status) {
    data.status = status;
  }

  if (typeof meta.featured === "boolean") {
    data.featured = meta.featured;
  }

  const cover =
    (typeof meta.cover_image === "string" && meta.cover_image) ||
    (typeof meta.coverImage === "string" && meta.coverImage);
  if (typeof cover === "string" && cover.trim()) {
    data.coverImage = cover.trim();
  }

  const coverAlt =
    (typeof meta.cover_image_alt === "string" && meta.cover_image_alt) ||
    (typeof meta.coverImageAlt === "string" && meta.coverImageAlt);
  if (typeof coverAlt === "string" && coverAlt.trim()) {
    data.coverImageAlt = coverAlt.trim();
  }

  if (!data.title) warnings.push("Missing title in frontmatter.");
  if (!data.excerpt) warnings.push("Missing excerpt in frontmatter.");
  if (!data.content) warnings.push("Missing markdown body after frontmatter.");
  if (!data.metrics?.length) warnings.push("Missing or invalid metrics_json.");
  if (!data.outcomes?.length) warnings.push("Missing or invalid outcomes_json.");

  return { data, warnings };
}

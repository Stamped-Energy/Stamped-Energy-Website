import { AI_DISCOVERY_PHASE } from "@/lib/admin/ai-discovery";
import {
  normalizeStatus,
  normalizeTags,
  parseYamlFrontmatter,
  stripOuterCodeFence,
} from "@/lib/admin/parse-yaml-frontmatter";
import { BLOG_CATEGORIES, BLOG_CATEGORY_IDS } from "@/lib/blog/constants";
import { siteConfig } from "@/lib/content/site";
import { slugify } from "@/lib/blog/utils";
import { markdownToRichDoc, serializeRichDoc } from "@/lib/rich-content/document";

export type AiBlogImport = {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  bodyJson?: string;
  category?: string;
  tags?: string[];
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  featured?: boolean;
  coverImage?: string;
};

const COVER_IMAGE_OPTIONS = [
  "/industries/die-casting.jpeg",
  "/industries/forging.jpg",
  "/industries/heat-treatment.webp",
  "/industries/rubber-moulding.jpg",
] as const;

const CATEGORY_LIST = BLOG_CATEGORIES.map(
  (category) => `- \`${category.id}\` , ${category.label}`,
).join("\n");

/**
 * Master prompt to paste into ChatGPT, Claude, Gemini, etc.
 * Phase 1: AI asks discovery questions. Phase 2: YAML frontmatter + Markdown body.
 */
export function buildAiBlogWriterPrompt(topic?: string): string {
  const topicBlock = topic?.trim()
    ? `\n## Seed topic (optional starting point)\nThe author has this in mind: **${topic.trim()}**\nUse it as a starting point in discovery, not as a final title.\n`
    : "";

  return `You are a blog writing assistant for **${siteConfig.name}**, an AI-powered prescriptive energy intelligence company for energy-intensive plants in India.

Your job is to help me shape and write **credible, plant-floor-grounded blog posts** that our CMS editor can import without manual cleanup.

${AI_DISCOVERY_PHASE}

---

## Company context (for Phase 2 writing)
- ${siteConfig.tagline}
- Audience: plant heads, energy managers, and ops leaders at auto component and process-intensive SME plants in India
- Tone: practical, credible, plant-floor grounded. Rupee-denominated outcomes where relevant. No hype, no generic AI buzzwords
- Avoid: em dashes, fluff intros that repeat the title, unsupported superlatives, unrelated consumer energy tips

## Editorial goals (Phase 2)
- Teach something actionable from real manufacturing energy patterns (MD spikes, shift-start, furnaces, compressors, SEC, holding loads)
- Use Indian context where natural (₹, HT tariffs, SME plants, shift patterns)
- 800-1,400 words unless discovery agreed on a different length
- Structure with \`#\` / \`##\` / \`###\` headings as needed (page title stays in frontmatter; prefer \`##\` for most sections, use \`#\` sparingly for larger in-body titles)
- Include 1-2 concrete examples or numbers as **reference ranges** when citing savings (e.g. "₹4-8L/month", "15-22% MD reduction") and label as benchmarks if not a named client
- If discovery agreed on diagrams or GIFs, include Markdown image placeholders: \`![describe the visual](/path/or-url.jpg)\` with a short caption in alt text, or note \`[GIF: description]\` where the author will swap in a file

## Categories (pick exactly one \`category\` id)
${CATEGORY_LIST}

## Cover images (pick one path or leave empty)
${COVER_IMAGE_OPTIONS.map((src) => `- \`${src}\``).join("\n")}
${topicBlock}
## REQUIRED Phase 2 output format
Reply with **only** the blog package below.

\`\`\`
---
title: [Compelling title, sentence case, max ~90 chars]
slug: [lowercase-hyphenated-url-slug]
excerpt: [2-3 sentences, max 320 chars, works as card preview]
category: [one category id from list above]
tags: [comma-separated, 2-5 tags, lowercase where sensible]
status: draft
featured: false
cover_image: [one path from list above, or leave empty]
---

## First section heading

Body in Markdown. Use **bold** sparingly. Use bullet lists where helpful.

## Second section heading

More content...

## Bottom line

Short closing paragraph with one clear takeaway.
\`\`\`

## CMS editor formatting rules (CRITICAL - follow exactly)

The blog body is imported into a **TipTap rich-text editor**. Use only Markdown patterns below so headings, links, tables, images, and embeds render correctly without manual fixes.

### Structure
- Page title lives in frontmatter (separate from body headings)
- Use \`#\` for H1, \`##\` for H2, and \`###\` for H3 in the body when needed
- Prefer \`##\` for main sections and \`###\` for subsections; use \`#\` sparingly for larger in-body titles
- Keep paragraphs short (2-4 sentences)
- Separate sections with a blank line

### Inline formatting
- **Bold**: \`**text**\`
- *Italic*: \`*text*\`
- Inline code: \`\`code\`\`
- Links: \`[link label](https://full-url.example)\` - always use descriptive link text, never bare URLs in prose

### Lists
- Bullet lists: \`- item\` or \`* item\`
- Numbered lists: \`1. item\` (sequential numbers)

### Tables (GitHub-flavored Markdown)
Use pipe tables with a header row and \`| --- |\` separator. Example:

| Metric | Typical range | Notes |
| --- | --- | --- |
| MD reduction | 15-22% | After shift-start tuning |
| Monthly savings | ₹4-8L | HT industrial tariff |

Rules: include header row; align columns with pipes; no HTML tables; keep cell text concise

### Images
- \`![Alt text describing the visual](/industries/forging.jpg)\` on its own line
- Use paths from the cover image list when possible

### YouTube embeds
- Put a full YouTube watch or youtu.be URL **alone on its own line** (no other text on that line)

### Mermaid diagrams (optional)
Use a fenced code block with language \`mermaid\`:

\`\`\`mermaid
flowchart TD
  A[Plant data] --> B[Stamped prescriptions]
\`\`\`

### Do NOT use
- HTML tags (\`<table>\`, \`<div>\`, \`<br>\`, etc.)
- Bare URLs for links - always \`[label](url)\`
- Markdown features outside this list (footnotes, task lists, etc.)

When discovery is complete and the author confirms, output the frontmatter block and markdown body.`;
}

function normalizeCategory(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const id = value.trim();
  if (BLOG_CATEGORY_IDS.includes(id as (typeof BLOG_CATEGORY_IDS)[number])) {
    return id;
  }
  const byLabel = BLOG_CATEGORIES.find(
    (category) => category.label.toLowerCase() === id.toLowerCase(),
  );
  return byLabel?.id;
}

/**
 * Parse AI output: YAML frontmatter + markdown body, or raw markdown fallback.
 */
export function parseAiBlogOutput(raw: string): {
  data: AiBlogImport;
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
  const data: AiBlogImport = {};

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

  const tags = normalizeTags(meta.tags);
  if (tags?.length) {
    data.tags = tags;
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

  if (!data.title) warnings.push("Missing title in frontmatter.");
  if (!data.excerpt) warnings.push("Missing excerpt in frontmatter.");
  if (!data.content) warnings.push("Missing markdown body after frontmatter.");

  return { data, warnings };
}

export { COVER_IMAGE_OPTIONS };

import { landingContent } from "@/lib/content/landing";
import { PRICING_ANSWER } from "@/lib/content/engagement";
import { icp } from "@/lib/content/icp";
import { platformContent } from "@/lib/content/platform";
import { navLinks } from "@/lib/content/site";
import { solutionsContent } from "@/lib/content/solutions";
import { VERTICAL_SLUGS, getVerticalPage } from "@/lib/content/vertical-pages";
import { COMPANY_LINKEDIN_URL, SEO_KEYWORDS } from "@/lib/seo/constants";
import { PAGE_SEO, type PageSeoConfig } from "@/lib/seo/pages";

/** Prefer production origin for static public/llms.txt (committed file). */
function llmsSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }
  return "https://stamped.work";
}

const STATIC_SEO_ENTRIES: PageSeoConfig[] = [
  PAGE_SEO.home,
  PAGE_SEO.platform,
  PAGE_SEO.solutions,
  PAGE_SEO.solutionsProcess,
  PAGE_SEO.solutionsQuality,
  PAGE_SEO.solutionsPlanning,
  PAGE_SEO.solutionsMaintenance,
  PAGE_SEO.industries,
  PAGE_SEO.industriesAutomotive,
  PAGE_SEO.industriesSteel,
  PAGE_SEO.industriesCement,
  PAGE_SEO.industriesPharma,
  PAGE_SEO.industriesChemical,
  PAGE_SEO.caseStudies,
  PAGE_SEO.about,
  PAGE_SEO.contact,
];

function pushBlank(lines: string[]) {
  lines.push("");
}

/** Static site guide for AI crawlers (llms.txt body). Copy canon: Stamped copy v3 (3 Oct 2026). */
export function buildLlmsTxtBody(): string {
  const SITE_URL = llmsSiteUrl();
  const lines: string[] = [];

  lines.push("# Stamped");
  pushBlank(lines);
  lines.push(`> ${icp.seo.entityDefinition}`);
  pushBlank(lines);
  lines.push(`Public marketing site: ${SITE_URL}`);
  lines.push(`Contact: stamped.energy@gmail.com`);
  lines.push(`Sitemap: ${SITE_URL}/sitemap.xml`);
  lines.push(`Extended index: ${SITE_URL}/llms-full.txt`);
  pushBlank(lines);

  lines.push("## Brand");
  pushBlank(lines);
  lines.push("- Company: Stamped");
  lines.push(`- Tagline: ${icp.seo.categoryLabel}`);
  lines.push(`- Positioning: ${icp.positioning}`);
  lines.push("- Primary CTA: Book a site survey (/contact)");
  lines.push("- Secondary CTA: See how it works (/platform)");
  pushBlank(lines);

  lines.push("## Entity definition (for AI answer engines)");
  pushBlank(lines);
  lines.push(icp.seo.entityDefinition);
  pushBlank(lines);
  lines.push(`Category: ${icp.seo.categoryLabel}`);
  lines.push("Geography: India (en-IN)");
  lines.push(`ICP: ${icp.seo.audienceLine}`);
  lines.push(`Buyers: ${icp.buyerTitles.join(", ")}`);
  pushBlank(lines);

  lines.push("## What Stamped is not");
  pushBlank(lines);
  lines.push(icp.seo.notA);
  pushBlank(lines);

  lines.push("## What Stamped does");
  pushBlank(lines);
  for (const paragraph of platformContent.whatWeDo.paragraphs) {
    lines.push(paragraph);
    pushBlank(lines);
  }

  lines.push("## Navigation");
  pushBlank(lines);
  lines.push(navLinks.map((item) => item.label).join(" · "));
  lines.push("Hub routes: /solutions, /platform, /industries, /case-studies, /about, /contact");
  pushBlank(lines);

  lines.push("## How it works");
  pushBlank(lines);
  lines.push("Plant data → Models → Actions → Results, with team feedback going back into the models.");
  for (const step of platformContent.flow.steps) {
    lines.push(`${step.label}: ${step.description}`);
  }
  lines.push(platformContent.flow.feedback);
  lines.push(platformContent.flow.controlLine);
  pushBlank(lines);

  lines.push("## What Stamped improves");
  pushBlank(lines);
  for (const area of solutionsContent.areas) {
    lines.push(`- [${area.title}](${SITE_URL}${area.href}): ${area.homeSummary}`);
  }
  lines.push(`- Energy: ${solutionsContent.energy.heading} Counted inside every action in all four areas.`);
  lines.push(`Hub: [What we improve](${SITE_URL}/solutions)`);
  pushBlank(lines);

  lines.push("## Core pages (live)");
  pushBlank(lines);
  for (const page of STATIC_SEO_ENTRIES) {
    lines.push(`- [${page.absoluteTitle}](${SITE_URL}${page.path}): ${page.description}`);
  }
  pushBlank(lines);

  lines.push("## Homepage snapshot");
  pushBlank(lines);
  lines.push(`- Badge: ${landingContent.hero.badge}`);
  lines.push(`- H1: ${landingContent.hero.headline}`);
  lines.push(`- Supporting: ${landingContent.hero.supportingLine}`);
  lines.push("- FAQ section: visible on homepage with FAQPage JSON-LD");
  pushBlank(lines);

  lines.push("## Homepage FAQ");
  pushBlank(lines);
  for (const item of landingContent.faq.items) {
    lines.push(`- Q: ${item.question}`);
    lines.push(`  A: ${item.answer}`);
  }
  pushBlank(lines);

  lines.push("## Common questions Stamped answers");
  pushBlank(lines);
  lines.push(`- What is Stamped? → ${icp.seo.entityDefinition}`);
  lines.push(
    "- How is Stamped different from MES, ERP, SCADA or a dashboard? → It works alongside them. It reads the data they already hold, learns how the plant actually runs, finds where efficiency is lost, and sends ranked actions to the person who can act, then checks the result with the plant team.",
  );
  lines.push(`- Who is it for? → ${icp.seo.audienceLine}`);
  lines.push(
    "- Does it need new hardware? → No. Stamped connects to the systems the plant already runs, so there is nothing new to install before work starts.",
  );
  lines.push(
    "- How are results measured? → Against the plant's own baseline, in the units the team already tracks. What the pilot should achieve is agreed in writing during the site survey, together with the price of the pilot.",
  );
  lines.push(
    "- How does an engagement start? → A site survey of a few days on the floor, then a written read-out, then, if it makes sense, a paid pilot on one line for 8 to 12 weeks.",
  );
  lines.push(`- How is it priced? → ${PRICING_ANSWER}`);
  pushBlank(lines);

  lines.push("## Industry FAQs (summary)");
  pushBlank(lines);
  for (const slug of VERTICAL_SLUGS) {
    const page = getVerticalPage(slug);
    if (!page) continue;
    lines.push(`### ${page.hero.title}`);
    for (const item of page.faq) {
      lines.push(`- Q: ${item.question}`);
      lines.push(`  A: ${item.answer}`);
    }
    pushBlank(lines);
  }

  lines.push("## Notes from the plant floor");
  pushBlank(lines);
  lines.push(`- [Index](${SITE_URL}/case-studies): articles and case studies from Indian plant floors`);
  lines.push(`- Individual articles at \`${SITE_URL}/blog/{slug}\` - Article JSON-LD on each post`);
  lines.push(`- Individual case studies at \`${SITE_URL}/case-studies/{slug}\` when published in CMS`);
  lines.push(`- Auto-updated index: ${SITE_URL}/llms-full.txt`);
  pushBlank(lines);

  lines.push("## Priority keywords");
  pushBlank(lines);
  lines.push(SEO_KEYWORDS.join(", "));
  pushBlank(lines);

  lines.push("## Target audience");
  pushBlank(lines);
  lines.push(icp.seo.audienceLine);
  pushBlank(lines);

  lines.push("## Proof phrases");
  pushBlank(lines);
  lines.push("- Measured against your own plant's baseline, in the units your team already tracks");
  lines.push("- Stamped recommends and your team decides");
  lines.push("- Example actions use placeholders in [brackets]; pilots write these from plant data");
  pushBlank(lines);

  lines.push("## About (safe facts)");
  pushBlank(lines);
  lines.push("- Founders: Vinayak Raizada (Co-Founder), Utso Sarkar (Co-Founder)");
  lines.push("- IIT Roorkee engineers");
  lines.push("- Founded: 2025");
  lines.push("- Do not invent additional executives, offices, or funding rounds");
  pushBlank(lines);

  lines.push("## Off-site GEO status");
  pushBlank(lines);
  lines.push("- Google Search Console: registered by team");
  lines.push(
    `- LinkedIn Company Page sameAs: ${COMPANY_LINKEDIN_URL || "pending (set COMPANY_LINKEDIN_URL in lib/seo/constants.ts)"}`,
  );
  lines.push("- Google Business Profile: not done");
  lines.push("- Wikidata: not done");
  pushBlank(lines);

  lines.push("## Crawling");
  pushBlank(lines);
  lines.push(
    "All public pages are open to search and AI crawlers. Admin CMS (`/blog/admin`), API routes (`/api/`), and build assets (`/_next/`) are disallowed in robots.txt.",
  );
  pushBlank(lines);

  return lines.join("\n");
}

/** Dynamic full index for /llms-full.txt */
export async function buildLlmsFullTxtBody(): Promise<string> {
  const { listPublishedPostsForSitemap } = await import("@/lib/blog/posts");
  const { listPublishedCaseStudiesForSitemap } = await import("@/lib/case-studies/studies");
  const { safeDbQuery } = await import("@/lib/db/safe-query");
  const { SITE_URL } = await import("@/lib/seo/constants");

  const lines: string[] = [];

  lines.push("# Stamped - Full Content Index");
  pushBlank(lines);
  lines.push(
    "> Auto-generated index of published case studies, blogs, FAQs, and static pages for AI crawlers and answer engines.",
  );
  pushBlank(lines);
  lines.push(icp.seo.entityDefinition);
  pushBlank(lines);
  lines.push(`Site: ${SITE_URL}`);
  lines.push(`Category: ${icp.seo.categoryLabel}`);
  lines.push(`Audience: ${icp.seo.audienceLine}`);
  lines.push(icp.seo.notA);
  lines.push(`For overview see ${SITE_URL}/llms.txt`);
  pushBlank(lines);

  lines.push("## Static pages");
  pushBlank(lines);
  for (const page of STATIC_SEO_ENTRIES) {
    lines.push(`- [${page.absoluteTitle}](${SITE_URL}${page.path}): ${page.description}`);
  }
  pushBlank(lines);

  lines.push("## Homepage FAQ");
  pushBlank(lines);
  for (const item of landingContent.faq.items) {
    lines.push(`### ${item.question}`);
    lines.push(item.answer);
    pushBlank(lines);
  }

  lines.push("## Industry FAQs");
  pushBlank(lines);
  for (const slug of VERTICAL_SLUGS) {
    const page = getVerticalPage(slug);
    if (!page) continue;
    lines.push(`### ${slug}: ${page.hero.title}`);
    pushBlank(lines);
    for (const item of page.faq) {
      lines.push(`Q: ${item.question}`);
      lines.push(`A: ${item.answer}`);
      pushBlank(lines);
    }
  }

  const postsResult = await safeDbQuery(() => listPublishedPostsForSitemap(), []);
  const studiesResult = await safeDbQuery(() => listPublishedCaseStudiesForSitemap(), []);

  lines.push("## Published blogs");
  pushBlank(lines);
  if (postsResult.databaseError) {
    lines.push("- (Database unavailable; blog list omitted)");
  } else if (postsResult.data.length === 0) {
    lines.push("- (No published posts yet)");
  } else {
    for (const post of postsResult.data) {
      lines.push(`- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.excerpt}`);
    }
  }
  pushBlank(lines);

  lines.push("## Published case studies");
  pushBlank(lines);
  if (studiesResult.databaseError) {
    lines.push("- (Database unavailable; case study list omitted)");
  } else if (studiesResult.data.length === 0) {
    lines.push("- (No published case studies yet)");
  } else {
    for (const study of studiesResult.data) {
      lines.push(
        `- [${study.title}](${SITE_URL}/case-studies/${study.slug}): ${study.excerpt}`,
      );
    }
  }
  pushBlank(lines);

  return lines.join("\n");
}

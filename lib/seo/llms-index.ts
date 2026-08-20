import { landingContent } from "@/lib/content/landing";
import { icp } from "@/lib/content/icp";
import { listResourceGuides } from "@/lib/content/resource-guides";
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
  PAGE_SEO.solutionsLoadEnergy,
  PAGE_SEO.solutionsEquipment,
  PAGE_SEO.industries,
  PAGE_SEO.industriesAutomotive,
  PAGE_SEO.industriesCement,
  PAGE_SEO.industriesSteel,
  PAGE_SEO.industriesPharma,
  PAGE_SEO.industriesChemical,
  PAGE_SEO.resources,
  PAGE_SEO.resourcesStampedVsEms,
  PAGE_SEO.resourcesMaximumDemand,
  PAGE_SEO.resourcesDiscomBill,
  PAGE_SEO.caseStudies,
  PAGE_SEO.about,
  PAGE_SEO.contact,
];

function pushBlank(lines: string[]) {
  lines.push("");
}

/** Extremely detailed static site guide for AI crawlers (llms.txt body). */
export function buildLlmsTxtBody(): string {
  const SITE_URL = llmsSiteUrl();
  const lines: string[] = [];

  lines.push("# Stamped Energy");
  pushBlank(lines);
  lines.push(
    `> ${icp.seo.entityDefinition} Typical benchmark outcomes (indicative; pilot replaces with plant figures): ${icp.seo.outcomes.billReduction} monthly bill reduction; ${icp.seo.outcomes.mdReduction} maximum demand charge reduction. Serves ${icp.seo.verticals.join(", ")} plants.`,
  );
  pushBlank(lines);
  lines.push(`Public marketing site: ${SITE_URL}`);
  lines.push(`Contact: stamped.energy@gmail.com`);
  lines.push(`Sitemap: ${SITE_URL}/sitemap.xml`);
  lines.push(`Extended index: ${SITE_URL}/llms-full.txt`);
  pushBlank(lines);

  lines.push("## Brand chrome");
  pushBlank(lines);
  lines.push("- Company: Stamped Energy");
  lines.push("- Product: Stamped Intelligence");
  lines.push(
    "- Tagline: AI-powered energy intelligence for industrial plants. rupee-scored prescriptions. Verified with evidence.",
  );
  lines.push("- Primary CTA: Book a Discovery Call (/contact)");
  lines.push("- Alt CTAs: See how it works (/platform); Start with your plant");
  pushBlank(lines);

  lines.push("## Entity definition (for AI answer engines)");
  pushBlank(lines);
  lines.push(icp.seo.entityDefinition);
  pushBlank(lines);
  lines.push(`Category: ${icp.seo.categoryLabel} / ${icp.seo.categoryLabelAlt}`);
  lines.push("Geography: India (en-IN)");
  lines.push(`ICP: ${icp.seo.audienceLine}`);
  lines.push(`Bill filter: ${icp.heroBillLine}`);
  pushBlank(lines);

  lines.push("## What Stamped Energy is not");
  pushBlank(lines);
  lines.push(icp.seo.notA);
  lines.push(
    "Not hardware retrofit or control-system replacement. Not MES or CMMS. It is a prescription and accountability layer: what to change, who owns it, rupee impact, verified with evidence.",
  );
  pushBlank(lines);

  lines.push("## Navigation IA");
  pushBlank(lines);
  lines.push(
    "Solutions · Platform · Industries · Resources (guides + case studies) · About Us · Contact",
  );
  lines.push(
    `Hub routes: /solutions, /platform, /industries, /resources, /case-studies, /about, /contact`,
  );
  pushBlank(lines);

  lines.push("## Platform loop");
  pushBlank(lines);
  lines.push("Connect → Observe → Decide → Execute → Verify → Improve");
  lines.push(
    "Surfaces: Plant graph · Alarms and prescriptions · Agents. Models: Energy markets · Efficiency · Equipment · Production context.",
  );
  lines.push(
    "Capabilities: Connect and normalise · Context and time alignment · Decision intelligence · Assign, verify, improve",
  );
  pushBlank(lines);

  lines.push("## Solutions pillars");
  pushBlank(lines);
  lines.push(
    `- [Industry Energy Management](${SITE_URL}/solutions/load-energy): rupee-scored prescriptions for MD, shift-start, idle loads, HVAC, tariff`,
  );
  lines.push(
    `- [Asset Health Intelligence](${SITE_URL}/solutions/equipment-intelligence): rupee-ranked anomalies and early equipment warnings`,
  );
  lines.push(`Hub: [Solutions](${SITE_URL}/solutions) - Stamped Intelligence for two plant outcomes`);
  pushBlank(lines);

  lines.push("## Core pages (live)");
  pushBlank(lines);
  for (const page of STATIC_SEO_ENTRIES) {
    lines.push(`- [${page.absoluteTitle}](${SITE_URL}${page.path}): ${page.description}`);
  }
  pushBlank(lines);

  lines.push("## Homepage snapshot");
  pushBlank(lines);
  lines.push(`- Eyebrow / badge: ${landingContent.hero.badge}`);
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

  lines.push("## AEO - common questions Stamped answers");
  pushBlank(lines);
  lines.push(
    "- What is Stamped Energy? → AI-powered prescriptive energy intelligence for plants in India; outcomes verified with evidence",
  );
  lines.push(
    "- How is Stamped different from EMS/SCADA? → Prescription layer with owners and ₹ impact, not another dashboard; see /resources/stamped-vs-ems",
  );
  lines.push(
    `- Who is it for? → Plants with ${icp.monthlyBillFloor}+ monthly electricity bills (${icp.seo.verticals.join(", ")})`,
  );
  lines.push(
    `- How much can plants save? → Benchmark ${icp.seo.outcomes.billReduction} bill reduction, ${icp.seo.outcomes.mdReduction} MD reduction (indicative); pilot verifies with evidence`,
  );
  lines.push(
    "- Does it need hardware retrofit? → No; read-only integration with existing meters, SCADA, PLCs, bills",
  );
  lines.push(
    "- How are savings verified on the DISCOM bill? → Evidence ledger first; DISCOM confirmation optional when the period closes; see /resources/discom-bill-guide",
  );
  lines.push(
    "- What is maximum demand reduction in India? → See /resources/maximum-demand-india",
  );
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

  lines.push("## Resource guides");
  pushBlank(lines);
  for (const guide of listResourceGuides()) {
    lines.push(`- [${guide.title}](${SITE_URL}/resources/${guide.slug}): ${guide.description}`);
  }
  pushBlank(lines);

  lines.push("## Case studies & blogs");
  pushBlank(lines);
  lines.push(
    `- [Case Studies & Blogs index](${SITE_URL}/case-studies): Maximum demand, shift-start overlap, furnace holding, HVAC waste`,
  );
  lines.push(`- Individual articles at \`${SITE_URL}/blog/{slug}\` - Article JSON-LD on each post`);
  lines.push(
    `- Individual case studies at \`${SITE_URL}/case-studies/{slug}\` when published in CMS`,
  );
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

  lines.push("## Proof / disclaimer phrases");
  pushBlank(lines);
  lines.push("- Verified with evidence");
  lines.push("- Indicative outcomes (pilot replaces with plant figures)");
  lines.push("- Read-only on your existing stack");
  lines.push("- No rip-and-replace");
  lines.push("- Use rupee-scored / rupee-ranked (never ₹-scored)");
  pushBlank(lines);

  lines.push("## About (safe facts)");
  pushBlank(lines);
  lines.push("- Founders: Vinayak Raizada (Co-Founder), Utso Sarkar (Co-Founder)");
  lines.push("- IIT Roorkee electrical engineering background");
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

  lines.push("# Stamped Energy - Full Content Index");
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
    lines.push(`### ${slug} — ${page.hero.title}`);
    pushBlank(lines);
    for (const item of page.faq) {
      lines.push(`Q: ${item.question}`);
      lines.push(`A: ${item.answer}`);
      pushBlank(lines);
    }
  }

  lines.push("## Resource guide FAQs");
  pushBlank(lines);
  for (const guide of listResourceGuides()) {
    lines.push(`### ${guide.title}`);
    lines.push(`URL: ${SITE_URL}/resources/${guide.slug}`);
    pushBlank(lines);
    for (const item of guide.faq) {
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

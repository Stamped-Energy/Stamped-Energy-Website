import { landingContent } from "@/lib/content/landing";
import { platformContent } from "@/lib/content/platform";
import { siteConfig } from "@/lib/content/site";
import { solutionsContent } from "@/lib/content/solutions";
import { COMPANY_LINKEDIN_URL, CONTENT_UPDATED, SITE_URL } from "@/lib/seo/constants";
import { PAGE_SEO } from "@/lib/seo/pages";

/** geo-checklist.dev discovery files (/.well-known/ai.txt, /ai/*.json), generated from lib/content. */

export function buildAiTxt(): string {
  return [
    `# ${siteConfig.name}`,
    `# ${PAGE_SEO.home.description}`,
    "",
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin",
    "Disallow: /api",
    "",
    `Summary: ${SITE_URL}/ai/summary.json`,
    `FAQ: ${SITE_URL}/ai/faq.json`,
    `Service: ${SITE_URL}/ai/service.json`,
    `LLMs: ${SITE_URL}/llms.txt`,
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");
}

export function buildAiSummary() {
  return {
    name: siteConfig.name,
    description: PAGE_SEO.home.description,
    url: SITE_URL,
    category: "AI for industrial plants",
    areaServed: "India",
    sameAs: [COMPANY_LINKEDIN_URL],
    pages: [PAGE_SEO.platform, PAGE_SEO.solutions, PAGE_SEO.about, PAGE_SEO.contact].map((page) => ({
      description: page.description,
      url: `${SITE_URL}${page.path}`,
    })),
    dateModified: CONTENT_UPDATED,
  };
}

export function buildAiFaq() {
  const items = [...landingContent.faq.items, ...platformContent.faq, ...solutionsContent.areas.flatMap((area) => area.faq)];
  return {
    faqs: items.map(({ question, answer }) => ({ question, answer })),
    dateModified: CONTENT_UPDATED,
  };
}

export function buildAiService() {
  return {
    name: siteConfig.name,
    description: PAGE_SEO.home.description,
    url: SITE_URL,
    capabilities: solutionsContent.areas.map((area) => ({
      name: area.title,
      description: area.homeSummary,
      url: `${SITE_URL}${area.href}`,
    })),
    dateModified: CONTENT_UPDATED,
  };
}

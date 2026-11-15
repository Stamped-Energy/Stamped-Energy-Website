import { platformContent } from "@/lib/content/platform";
import { productsContent, getLiveProducts } from "@/lib/content/products";
import { siteConfig } from "@/lib/content/site";
import { COMPANY_LINKEDIN_URL, CONTENT_UPDATED, SHOWCASE_URL, SITE_URL } from "@/lib/seo/constants";
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
    sameAs: [COMPANY_LINKEDIN_URL, SHOWCASE_URL],
    pages: [PAGE_SEO.platform, PAGE_SEO.products, PAGE_SEO.productsProcessQuality, PAGE_SEO.productsAsk, PAGE_SEO.about, PAGE_SEO.contact].map(
      (page) => ({
        description: page.description,
        url: `${SITE_URL}${page.path}`,
      }),
    ),
    dateModified: CONTENT_UPDATED,
  };
}

export function buildAiFaq() {
  const items = [
    ...productsContent.faq.items,
    ...platformContent.faq,
    ...productsContent.quelta.faq,
  ];
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
    capabilities: getLiveProducts().map((product) => ({
      name: product.name,
      description: `${product.descriptor}. ${product.summary}`,
      url: `${SITE_URL}${product.href}`,
    })),
    dateModified: CONTENT_UPDATED,
  };
}

import type { Metadata } from "next";

import { SolutionsHub } from "@/components/solutions/SolutionsHub";
import { JsonLd } from "@/components/seo/JsonLd";
import { BEFORE_YOU_BOOK } from "@/lib/content/engagement";
import { solutionsContent } from "@/lib/content/solutions";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";
import { SITE_URL } from "@/lib/seo/constants";
import { buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schemas";
import type { WebPage } from "schema-dts";

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.solutions);

const breadcrumbSchema = generateBreadcrumbSchema([
  breadcrumbHome(),
  { name: "What we improve", url: PAGE_SEO.solutions.path },
]);

const collectionSchema = buildWebPageSchema(PAGE_SEO.solutions, {
  "@type": "CollectionPage",
  hasPart: solutionsContent.areas.map((area) => ({
    "@type": "WebPage",
    name: area.title,
    url: `${SITE_URL}${area.href}`,
  })),
} as Partial<WebPage>);

const solutionsHubFaqSchema = buildFaqSchema(
  BEFORE_YOU_BOOK.items.map((item) => ({
    question: item.question,
    answer: item.answer,
  })),
);

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema, collectionSchema, ...(solutionsHubFaqSchema ? [solutionsHubFaqSchema] : [])]} />
      <SolutionsHub />
    </>
  );
}

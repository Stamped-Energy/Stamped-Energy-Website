import type { Metadata } from "next";

import { SolutionsHub } from "@/components/solutions/SolutionsHub";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";
import { SITE_URL } from "@/lib/seo/constants";

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.solutions);

const breadcrumbSchema = generateBreadcrumbSchema([
  breadcrumbHome(),
  { name: "Solutions", url: PAGE_SEO.solutions.path },
]);

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Stamped Energy Solutions",
  description: PAGE_SEO.solutions.description,
  url: `${SITE_URL}/solutions`,
  hasPart: [
    {
      "@type": "WebPage",
      name: "Load management and energy efficiency",
      url: `${SITE_URL}/solutions/load-energy`,
    },
    {
      "@type": "WebPage",
      name: "Prescriptive equipment intelligence",
      url: `${SITE_URL}/solutions/equipment-intelligence`,
    },
  ],
};

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema, collectionSchema]} />
      <SolutionsHub />
    </>
  );
}

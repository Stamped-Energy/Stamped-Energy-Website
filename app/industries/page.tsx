import type { Metadata } from "next";

import { IndustriesHubPage } from "@/components/industries/IndustriesHubPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.industries);

const breadcrumbSchema = generateBreadcrumbSchema([
  breadcrumbHome(),
  { name: "Industries", url: PAGE_SEO.industries.path },
]);

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <IndustriesHubPage />
    </>
  );
}

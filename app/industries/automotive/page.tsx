import type { Metadata } from "next";

import { IndustryVerticalPage } from "@/components/industries/IndustryVerticalPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";
import { verticalFaqSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.industriesAutomotive);

const breadcrumbSchema = generateBreadcrumbSchema([
  breadcrumbHome(),
  { name: "Industries", url: PAGE_SEO.industries.path },
  { name: "Auto components", url: PAGE_SEO.industriesAutomotive.path },
]);

export default function AutomotiveIndustryPage() {
  return (
    <>
      <JsonLd data={[verticalFaqSchema("automotive"), breadcrumbSchema]} />
      <IndustryVerticalPage slug="automotive" />
    </>
  );
}

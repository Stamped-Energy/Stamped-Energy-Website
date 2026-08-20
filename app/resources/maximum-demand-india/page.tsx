import type { Metadata } from "next";

import { ResourceGuidePage } from "@/components/resources/ResourceGuidePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getResourceGuide } from "@/lib/content/resource-guides";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";
import { buildFaqSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.resourcesMaximumDemand);

const guide = getResourceGuide("maximum-demand-india");

const breadcrumbSchema = generateBreadcrumbSchema([
  breadcrumbHome(),
  { name: "Resources", url: PAGE_SEO.resources.path },
  { name: guide.title, url: PAGE_SEO.resourcesMaximumDemand.path },
]);

const faqSchema = buildFaqSchema(guide.faq);

export default function MaximumDemandIndiaPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema, faqSchema].filter(Boolean)} />
      <ResourceGuidePage guide={guide} />
    </>
  );
}

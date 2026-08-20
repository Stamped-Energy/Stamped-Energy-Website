import type { Metadata } from "next";

import { ResourceGuidePage } from "@/components/resources/ResourceGuidePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getResourceGuide } from "@/lib/content/resource-guides";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";
import { buildFaqSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.resourcesStampedVsEms);

const guide = getResourceGuide("stamped-vs-ems");

const breadcrumbSchema = generateBreadcrumbSchema([
  breadcrumbHome(),
  { name: "Resources", url: PAGE_SEO.resources.path },
  { name: guide.title, url: PAGE_SEO.resourcesStampedVsEms.path },
]);

const faqSchema = buildFaqSchema(guide.faq);

export default function StampedVsEmsPage() {
  return (
    <>
      <JsonLd data={[breadcrumbSchema, faqSchema].filter(Boolean)} />
      <ResourceGuidePage guide={guide} />
    </>
  );
}

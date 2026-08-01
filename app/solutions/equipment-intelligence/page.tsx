import type { Metadata } from "next";

import { SolutionPillarPage } from "@/components/solutions/SolutionPillarPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSolutionPillar } from "@/lib/content/solutions";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.solutionsEquipment);

const pillar = getSolutionPillar("equipment-intelligence");

const breadcrumbSchema = generateBreadcrumbSchema([
  breadcrumbHome(),
  { name: "Solutions", url: PAGE_SEO.solutions.path },
  { name: "Equipment intelligence", url: PAGE_SEO.solutionsEquipment.path },
]);

export default function EquipmentIntelligenceSolutionPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <SolutionPillarPage pillar={pillar} />
    </>
  );
}

import type { Metadata } from "next";

import { SolutionPillarPage } from "@/components/solutions/SolutionPillarPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSolutionPillar } from "@/lib/content/solutions";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.solutionsLoadEnergy);

const pillar = getSolutionPillar("load-energy");

const breadcrumbSchema = generateBreadcrumbSchema([
  breadcrumbHome(),
  { name: "Solutions", url: PAGE_SEO.solutions.path },
  { name: "Load and energy", url: PAGE_SEO.solutionsLoadEnergy.path },
]);

export default function LoadEnergySolutionPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <SolutionPillarPage pillar={pillar} />
    </>
  );
}

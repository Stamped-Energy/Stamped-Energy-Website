import type { Metadata } from "next";

import { HiwBeforeAfter } from "@/components/how-it-works/HiwBeforeAfter";
import { HiwCapabilities } from "@/components/how-it-works/HiwCapabilities";
import { HiwDeployment } from "@/components/how-it-works/HiwDeployment";
import { HiwIntelligenceStack } from "@/components/how-it-works/HiwIntelligenceStack";
import { HiwOpening } from "@/components/how-it-works/HiwOpening";
import { HiwPageCta } from "@/components/how-it-works/HiwPageCta";
import { HiwPinnedJourney } from "@/components/how-it-works/HiwPinnedJourney";
import { HiwPrescriptionWalkthrough } from "@/components/how-it-works/HiwPrescriptionWalkthrough";
import { DynamicIndustryResources } from "@/components/industries/shared/DynamicIndustryResources";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";
import { howToSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.platform);

const breadcrumbSchema = generateBreadcrumbSchema([
  breadcrumbHome(),
  { name: "Platform", url: PAGE_SEO.platform.path },
]);

export default function PlatformPage() {
  return (
    <>
      <JsonLd data={[howToSchema, breadcrumbSchema]} />
      <HiwOpening />
      <HiwPinnedJourney />
      <HiwIntelligenceStack />
      <HiwPrescriptionWalkthrough />
      <HiwCapabilities />
      <HiwBeforeAfter />
      <HiwDeployment />
      <DynamicIndustryResources />
      <HiwPageCta />
    </>
  );
}

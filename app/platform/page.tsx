import type { Metadata } from "next";

import { HiwCapabilities } from "@/components/how-it-works/HiwCapabilities";
import { HiwDeployment } from "@/components/how-it-works/HiwDeployment";
import { HiwOpening } from "@/components/how-it-works/HiwOpening";
import { HiwOutcomesBand } from "@/components/how-it-works/HiwOutcomesBand";
import { HiwPinnedJourney } from "@/components/how-it-works/HiwPinnedJourney";
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
      <HiwOutcomesBand />
      <HiwCapabilities />
      <HiwDeployment />
    </>
  );
}

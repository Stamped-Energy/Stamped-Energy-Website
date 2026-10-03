import type { Metadata } from "next";

import { HiwCapabilities } from "@/components/how-it-works/HiwCapabilities";
import { HiwDeployment } from "@/components/how-it-works/HiwDeployment";
import { HiwOpening } from "@/components/how-it-works/HiwOpening";
import { HiwOutcomesBand } from "@/components/how-it-works/HiwOutcomesBand";
import { HiwModelsGrid } from "@/components/how-it-works/HiwModelsGrid";
import { HiwProseStack } from "@/components/how-it-works/HiwProseStack";
import { HiwWhatWeDo } from "@/components/how-it-works/HiwWhatWeDo";
import { BeforeYouBook } from "@/components/engagement/BeforeYouBook";
import { JsonLd } from "@/components/seo/JsonLd";
import { platformContent } from "@/lib/content";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";
import { buildWebPageSchema, howToSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.platform);

const breadcrumbSchema = generateBreadcrumbSchema([
  breadcrumbHome(),
  { name: "How it works", url: PAGE_SEO.platform.path },
]);

export default function PlatformPage() {
  return (
    <>
      <JsonLd data={[buildWebPageSchema(PAGE_SEO.platform), howToSchema, breadcrumbSchema]} />
      <HiwOpening />
      <HiwWhatWeDo />
      <HiwProseStack content={platformContent.surfaces} sectionId="surfaces" />
      <HiwModelsGrid />
      <HiwCapabilities />
      <HiwOutcomesBand />
      <HiwDeployment />
      <BeforeYouBook />
    </>
  );
}

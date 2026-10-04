import type { Metadata } from "next";

import { HiwCapabilities } from "@/components/how-it-works/HiwCapabilities";
import { HiwDeployment } from "@/components/how-it-works/HiwDeployment";
import { HiwOpening } from "@/components/how-it-works/HiwOpening";
import { HiwOutcomesBand } from "@/components/how-it-works/HiwOutcomesBand";
import { HiwModelsGrid } from "@/components/how-it-works/HiwModelsGrid";
import { HiwProseStack } from "@/components/how-it-works/HiwProseStack";
import { HiwWhatWeDo } from "@/components/how-it-works/HiwWhatWeDo";
import { BeforeYouBook } from "@/components/engagement/BeforeYouBook";
import { ImproveLoopVisual } from "@/components/motion-slots/PlatformLearningVisuals";
import { StepsVisualSection } from "@/components/ui/StepsVisualSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { platformContent } from "@/lib/content";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";
import { buildFaqSchema, buildWebPageSchema, howToSchema } from "@/lib/seo/schemas";
import { FaqSection } from "@/components/ui/FaqSection";

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.platform);

const breadcrumbSchema = generateBreadcrumbSchema([
  breadcrumbHome(),
  { name: "How it works", url: PAGE_SEO.platform.path },
]);

export default function PlatformPage() {
  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema(PAGE_SEO.platform),
          howToSchema,
          buildFaqSchema(platformContent.faq),
          breadcrumbSchema,
        ]}
      />
      <HiwOpening />
      <HiwWhatWeDo />
      <HiwProseStack content={platformContent.surfaces} sectionId="surfaces" />
      <HiwModelsGrid />
      <StepsVisualSection
        id="self-improving"
        badge={platformContent.improve.badge}
        heading={platformContent.improve.heading}
        paragraph={platformContent.improve.paragraph}
        steps={platformContent.improve.steps}
        visual={<ImproveLoopVisual />}
      />
      <HiwCapabilities />
      <HiwOutcomesBand />
      <HiwDeployment />
      <FaqSection items={platformContent.faq} title="Questions about how it works" />
      <BeforeYouBook />
    </>
  );
}

import type { Metadata } from "next";
import type { FAQPage, WithContext } from "schema-dts";

import { HeroV4 } from "@/components/sections/v4/HeroV4";
import { HomeHowItWorksV4 } from "@/components/sections/v4/HomeHowItWorksV4";
import { HomeIndustriesV4 } from "@/components/sections/v4/HomeIndustriesV4";
import { HomeOutcomes } from "@/components/sections/v4/HomeOutcomes";
import { HomeProducts } from "@/components/sections/v4/HomeProducts";
import { HomeResourcesV4 } from "@/components/sections/v4/HomeResourcesV4";
import { HomeRolesV4 } from "@/components/sections/v4/HomeRolesV4";
import { HomeTerminalV4 } from "@/components/sections/v4/HomeTerminalV4";
import { HomeVisionV4 } from "@/components/sections/v4/HomeVisionV4";
import { JsonLd } from "@/components/seo/JsonLd";
import { productsContent } from "@/lib/content/products";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";
import {
  buildWebPageSchema,
  homepageSpeakable,
  softwareApplicationSchema,
} from "@/lib/seo/schemas";

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.home);

const homeBreadcrumbSchema = generateBreadcrumbSchema([breadcrumbHome()]);

const homepageFaqSchema: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: productsContent.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema(PAGE_SEO.home, homepageSpeakable),
          softwareApplicationSchema,
          homepageFaqSchema,
          homeBreadcrumbSchema,
        ]}
      />
      <HeroV4 />
      <HomeOutcomes />
      <HomeProducts />
      <HomeHowItWorksV4 />
      <HomeRolesV4 />
      <HomeVisionV4 />
      <HomeIndustriesV4 />
      <HomeResourcesV4 />
      <HomeTerminalV4 />
    </>
  );
}

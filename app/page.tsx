import type { Metadata } from "next";

import { Hero } from "@/components/sections/Hero";
import { HomeHowItWorks } from "@/components/sections/HomeHowItWorks";
import { HomeImpact } from "@/components/sections/HomeImpact";
import { HomeIndustries } from "@/components/sections/HomeIndustries";
import { HomeProblem } from "@/components/sections/HomeProblem";
import { HomeResources } from "@/components/sections/HomeResources";
import { HomeSolutionsRows } from "@/components/sections/HomeSolutionsRows";
import { HomeTerminalBand } from "@/components/sections/HomeTerminalBand";
import { HomeWhatIs } from "@/components/sections/HomeWhatIs";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";
import {
  buildWebPageSchema,
  homepageFaqSchema,
  homepageSpeakable,
  softwareApplicationSchema,
} from "@/lib/seo/schemas";

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.home);

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema(PAGE_SEO.home, homepageSpeakable),
          softwareApplicationSchema,
          homepageFaqSchema,
        ]}
      />
      <Hero />
      <HomeProblem />
      <HomeWhatIs />
      <HomeHowItWorks />
      <HomeImpact />
      <HomeSolutionsRows />
      <HomeIndustries />
      <HomeResources />
      <HomeTerminalBand />
    </>
  );
}

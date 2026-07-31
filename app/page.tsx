import type { Metadata } from "next";

import { Hero } from "@/components/sections/Hero";
import { HomeImproveLoop } from "@/components/sections/HomeImproveLoop";
import { HomeProofBand } from "@/components/sections/HomeProofBand";
import { HomeSolutionsEntry } from "@/components/sections/HomeSolutionsEntry";
import { HomeTerminalBand } from "@/components/sections/HomeTerminalBand";
import { HomeValueProps } from "@/components/sections/HomeValueProps";
import { PrescriptionExample } from "@/components/sections/PrescriptionExample";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";
import {
  homepageFaqSchema,
  homepageSpeakableSchema,
  softwareApplicationSchema,
  websiteSchema,
} from "@/lib/seo/schemas";

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.home);

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          websiteSchema,
          softwareApplicationSchema,
          homepageFaqSchema,
          homepageSpeakableSchema,
        ]}
      />
      <Hero />
      <HomeValueProps />
      <HomeSolutionsEntry />
      <HomeImproveLoop />
      <PrescriptionExample />
      <HomeProofBand />
      <HomeTerminalBand />
    </>
  );
}

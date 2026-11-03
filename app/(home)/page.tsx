import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { Hero } from "@/components/sections/Hero";
import { HomeMobileHeroMount } from "@/components/sections/hero/HomeMobileHeroMount";
import { HomeIndustries } from "@/components/sections/HomeIndustries";
import { HomeProblem } from "@/components/sections/HomeProblem";
import { HomeResources } from "@/components/sections/HomeResources";
import { HomeSolutionsRows } from "@/components/sections/HomeSolutionsRows";
import { HomeTerminalBand } from "@/components/sections/HomeTerminalBand";
import { HomeWhatIs } from "@/components/sections/HomeWhatIs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";
import {
  buildWebPageSchema,
  homepageFaqSchema,
  homepageSpeakable,
  softwareApplicationSchema,
} from "@/lib/seo/schemas";

const HomeLadder = dynamic(
  () => import("@/components/sections/HomeLadder").then((mod) => mod.HomeLadder),
  { loading: () => null },
);
const HomeHowItWorks = dynamic(
  () => import("@/components/sections/HomeHowItWorks").then((mod) => mod.HomeHowItWorks),
  { loading: () => null },
);
const HomeImpact = dynamic(
  () => import("@/components/sections/HomeImpact").then((mod) => mod.HomeImpact),
  { loading: () => null },
);
const HomeAgents = dynamic(
  () => import("@/components/sections/HomeAgents").then((mod) => mod.HomeAgents),
  { loading: () => null },
);

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.home);

const homeBreadcrumbSchema = generateBreadcrumbSchema([breadcrumbHome()]);

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
      <Hero />
      <HomeMobileHeroMount />
      <HomeProblem />
      <HomeWhatIs />
      <HomeLadder />
      <HomeHowItWorks />
      <HomeImpact />
      <HomeSolutionsRows />
      <HomeAgents />
      <HomeIndustries />
      <HomeResources />
      <HomeTerminalBand />
    </>
  );
}

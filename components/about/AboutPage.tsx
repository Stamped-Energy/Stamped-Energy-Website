"use client";

import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutTeam } from "@/components/about/AboutTeam";
import { AboutValues } from "@/components/about/AboutValues";
import { MarketingClosingCta } from "@/components/ui/MarketingClosingCta";
import { aboutContent } from "@/lib/content/about";

export function AboutPageView() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutTeam />
      <AboutValues />
      <MarketingClosingCta content={aboutContent.finalCta} />
    </>
  );
}

"use client";

import { AboutBackedBy } from "@/components/about/AboutBackedBy";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutMission } from "@/components/about/AboutMission";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutTeam } from "@/components/about/AboutTeam";
import { AboutValues } from "@/components/about/AboutValues";

export function AboutPageView() {
  return (
    <>
      <AboutHero />
      <AboutMission />
      <AboutStory />
      <AboutTeam />
      <AboutBackedBy />
      <AboutValues />
    </>
  );
}

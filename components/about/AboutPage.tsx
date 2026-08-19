"use client";

import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutTeam } from "@/components/about/AboutTeam";
import { AboutValues } from "@/components/about/AboutValues";

export function AboutPageView() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutTeam />
      <AboutValues />
    </>
  );
}

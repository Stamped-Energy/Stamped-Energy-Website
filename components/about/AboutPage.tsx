"use client";

import { AboutHero } from "@/components/about/AboutHero";
import { AboutIntro } from "@/components/about/AboutIntro";
import { AboutTeam } from "@/components/about/AboutTeam";

export function AboutPageView() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <AboutTeam />
    </>
  );
}

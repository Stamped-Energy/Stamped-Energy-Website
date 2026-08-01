"use client";

import { AboutHero } from "@/components/about/AboutHero";
import { AboutTeam } from "@/components/about/AboutTeam";
import { AboutValues } from "@/components/about/AboutValues";

export function AboutPageView() {
  return (
    <>
      <AboutHero />
      <AboutTeam />
      <AboutValues />
    </>
  );
}

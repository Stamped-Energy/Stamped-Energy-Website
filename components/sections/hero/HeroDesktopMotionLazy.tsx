"use client";

import dynamic from "next/dynamic";

const HeroVisualDesktopMotion = dynamic(
  () =>
    import("@/components/sections/hero/HeroVisualDesktopMotion").then(
      (mod) => mod.HeroVisualDesktopMotion,
    ),
  { ssr: false },
);

export function HeroDesktopMotionLazy() {
  return <HeroVisualDesktopMotion />;
}

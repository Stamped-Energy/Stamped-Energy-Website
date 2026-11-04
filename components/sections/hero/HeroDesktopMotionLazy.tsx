"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroVisualDesktopMotion = dynamic(
  () =>
    import("@/components/sections/hero/HeroVisualDesktopMotion").then(
      (mod) => mod.HeroVisualDesktopMotion,
    ),
  { ssr: false },
);

/** Desktop-only hero motion — skips dynamic import on mobile viewports. */
export function HeroDesktopMotionLazy() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  if (!isDesktop) {
    return null;
  }

  return <HeroVisualDesktopMotion />;
}

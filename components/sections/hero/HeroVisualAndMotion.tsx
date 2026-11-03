"use client";

"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroVisualMobile = dynamic(
  () => import("@/components/sections/hero/HeroVisualMobile").then((mod) => mod.HeroVisualMobile),
  {
    ssr: false,
    loading: () => <div className="min-h-[14rem] lg:hidden" aria-hidden />,
  },
);

const HeroVisualDesktopMotion = dynamic(
  () =>
    import("@/components/sections/hero/HeroVisualDesktopMotion").then(
      (mod) => mod.HeroVisualDesktopMotion,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="hidden aspect-[2529/1274] w-full rounded-md bg-surface-container/35 lg:block"
        aria-hidden
      />
    ),
  },
);

export function HeroVisualAndMotion() {
  const [viewport, setViewport] = useState<"unknown" | "mobile" | "desktop">("unknown");

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const sync = () => {
      setViewport(desktopQuery.matches ? "desktop" : "mobile");
    };
    sync();
    desktopQuery.addEventListener("change", sync);
    return () => desktopQuery.removeEventListener("change", sync);
  }, []);

  return (
    <div
      data-hero-animate="visual"
      className="mt-6 border-t border-outline-variant/40 pt-5 md:mt-8 md:pt-8 lg:mt-8 lg:pt-10"
    >
      {viewport === "desktop" ? <HeroVisualDesktopMotion /> : null}
      {viewport === "mobile" ? <HeroVisualMobile /> : null}
      {viewport === "unknown" ? <div className="min-h-[14rem] lg:min-h-0" aria-hidden /> : null}
    </div>
  );
}

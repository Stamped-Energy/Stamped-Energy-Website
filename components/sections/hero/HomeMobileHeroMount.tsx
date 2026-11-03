"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const HeroVisualMobile = dynamic(
  () =>
    import("@/components/sections/hero/HeroVisualMobile").then((mod) => mod.HeroVisualMobile),
  { ssr: false },
);

/** Mounts mobile hero visuals after load into #hero-mobile-mount (SSR placeholder only). */
export function HomeMobileHeroMount() {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMountNode(document.getElementById("hero-mobile-mount"));

    const reveal = () => setReady(true);
    if (document.readyState === "complete") {
      reveal();
      return;
    }
    window.addEventListener("load", reveal, { once: true });
  }, []);

  if (!mountNode || !ready) {
    return null;
  }

  return createPortal(<HeroVisualMobile />, mountNode);
}

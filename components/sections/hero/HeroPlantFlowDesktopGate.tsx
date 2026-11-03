"use client";

import { useEffect, useState } from "react";

import { HeroPlantFlow } from "@/components/sections/hero/HeroPlantFlow";

/** Avoids shipping desktop plant assets/preloads on phone viewports. */
export function HeroPlantFlowDesktopGate() {
  const [showDesktop, setShowDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setShowDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (!showDesktop) {
    return null;
  }

  return <HeroPlantFlow variant="full" />;
}

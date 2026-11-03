"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroPlantFlowMobile = dynamic(
  () =>
    import("@/components/sections/hero/HeroPlantFlow").then((mod) => {
      function MobileFlow() {
        return <mod.HeroPlantFlow variant="mobileLight" />;
      }
      return MobileFlow;
    }),
  {
    ssr: false,
    loading: () => (
      <div
        className="max-h-40 w-full rounded-md bg-surface-container/35 lg:hidden"
        style={{ aspectRatio: "2529 / 1274" }}
        aria-hidden
      />
    ),
  },
);

const HeroMobileActions = dynamic(
  () =>
    import("@/components/sections/hero/HeroMobileActions").then((mod) => ({
      default: mod.HeroMobileActions,
    })),
  {
    ssr: false,
    loading: () => <div className="mt-4 min-h-[11rem] lg:hidden" aria-hidden />,
  },
);

export function HeroVisualMobile() {
  const [showMobileChrome, setShowMobileChrome] = useState(false);

  useEffect(() => {
    const reveal = () => setShowMobileChrome(true);

    if (document.readyState === "complete") {
      reveal();
      return;
    }

    window.addEventListener("load", reveal, { once: true });
    return () => window.removeEventListener("load", reveal);
  }, []);

  if (!showMobileChrome) {
    return <div className="min-h-[14rem] lg:hidden" aria-hidden />;
  }

  return (
    <div className="lg:hidden">
      <HeroPlantFlowMobile />
      <HeroMobileActions />
    </div>
  );
}

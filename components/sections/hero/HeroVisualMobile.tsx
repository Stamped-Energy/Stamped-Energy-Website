"use client";

import dynamic from "next/dynamic";

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
        className="max-h-40 w-full rounded-md bg-surface-container/35"
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
    loading: () => <div className="mt-4 min-h-[11rem]" aria-hidden />,
  },
);

export function HeroVisualMobile() {
  return (
    <>
      <HeroPlantFlowMobile />
      <HeroMobileActions />
    </>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { HeroPlantFlowDesktopGate } from "@/components/sections/hero/HeroPlantFlowDesktopGate";
import { easeOut, heroDelay, heroDuration, heroStagger } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

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

export function HeroVisualAndMotion() {
  const introPlayedRef = useRef(false);
  const { isReady, prefersReducedMotion } = useMotion();
  const [showMobileChrome, setShowMobileChrome] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(min-width: 1024px)").matches) {
      return;
    }

    const reveal = () => setShowMobileChrome(true);

    if (document.readyState === "complete") {
      reveal();
      return;
    }

    window.addEventListener("load", reveal, { once: true });
    return () => window.removeEventListener("load", reveal);
  }, []);

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || introPlayedRef.current) {
        return;
      }

      if (window.matchMedia("(max-width: 1023px)").matches) {
        return;
      }

      introPlayedRef.current = true;

      const section = document.getElementById("landing-hero");
      if (!section) {
        return;
      }

      const fadeTargets = section.querySelectorAll<HTMLElement>("[data-hero-animate]");
      gsap.set(fadeTargets, { autoAlpha: 0, y: 18 });

      const headline = section.querySelector<HTMLElement>("[data-hero-lcp='headline']");
      if (headline) {
        gsap.set(headline, { y: 14, autoAlpha: 1 });
      }

      const timeline = gsap.timeline({
        defaults: { ease: easeOut, duration: heroDuration },
        delay: heroDelay,
      });

      timeline
        .to("#landing-hero [data-hero-animate='badge']", { autoAlpha: 1, y: 0 })
        .to("#landing-hero [data-hero-lcp='headline']", { y: 0 }, "-=0.45")
        .to("#landing-hero [data-hero-animate='copy']", { autoAlpha: 1, y: 0, stagger: heroStagger }, "-=0.4")
        .to("#landing-hero [data-hero-animate='visual']", { autoAlpha: 1, y: 0 }, "-=0.55");
    },
    {
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <div data-hero-animate="visual" className="mt-6 border-t border-outline-variant/40 pt-5 md:mt-8 md:pt-8 lg:mt-8 lg:pt-10">
      <div className="hidden lg:block">
        <HeroPlantFlowDesktopGate />
      </div>
      <div className="lg:hidden">
        {showMobileChrome ? (
          <>
            <HeroPlantFlowMobile />
            <HeroMobileActions />
          </>
        ) : (
          <div className="min-h-[14rem]" aria-hidden />
        )}
      </div>
    </div>
  );
}

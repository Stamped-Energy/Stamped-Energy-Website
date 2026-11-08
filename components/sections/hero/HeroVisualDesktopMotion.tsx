"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { HeroPlantFlowDesktopGate } from "@/components/sections/hero/HeroPlantFlowDesktopGate";
import { easeOut, heroDelay, heroDuration, heroStagger } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function HeroVisualDesktopMotion() {
  const introPlayedRef = useRef(false);
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || introPlayedRef.current) {
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
    <div className="hidden lg:block">
      <HeroPlantFlowDesktopGate />
    </div>
  );
}

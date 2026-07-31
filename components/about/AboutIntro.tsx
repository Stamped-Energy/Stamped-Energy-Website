"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { aboutContent } from "@/lib/content/about";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function AboutIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const { intro, visionMission } = aboutContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-about-intro]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      className="border-b border-outline-variant/40 bg-surface py-10 md:section-y"
    >
      <Container>
        <div className="mx-auto max-w-2xl">
          <p
            data-about-intro
            className="text-xs font-semibold uppercase tracking-[0.14em] text-primary"
          >
            {intro.eyebrow}
          </p>
          <h2
            data-about-intro
            className="mt-2 font-display text-2xl font-bold text-on-surface md:text-3xl"
          >
            {intro.title}
          </h2>
          <p
            data-about-intro
            className="mt-4 text-sm leading-7 text-on-surface-variant md:text-base"
          >
            {intro.description}
          </p>
          <p
            data-about-intro
            className="mt-6 text-sm leading-7 text-on-surface-variant md:text-base"
          >
            {visionMission.mission.description}
          </p>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { howItWorksContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function HiwOpening() {
  const sectionRef = useRef<HTMLElement>(null);
  const { hero } = howItWorksContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-hiw-opening]", {
        autoAlpha: 0,
        y: 28,
        duration: 0.85,
        stagger: 0.12,
        ease: "power2.out",
      });
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section
      ref={sectionRef}
      className="page-hero relative overflow-hidden border-b border-outline-variant/40 bg-surface"
    >
      <Container className="relative z-10 w-full">
        <div data-hiw-opening className="mb-5 md:mb-10">
          <SectionBadge label={hero.eyebrow} />
        </div>

        <div className="grid gap-5 md:gap-8 lg:grid-cols-2 lg:items-end lg:gap-16 xl:gap-20">
          <h1
            data-hiw-opening
            className="font-display text-[2.15rem] font-bold leading-[1.08] tracking-[-0.03em] text-on-surface sm:text-5xl md:text-6xl lg:text-[3.75rem]"
          >
            {hero.title}
          </h1>

          <div data-hiw-opening className="w-full min-w-0">
            <p className="text-sm leading-7 text-on-surface/80 md:text-lg md:leading-8">
              {hero.description}
            </p>
            <div className="relative z-20 mt-4 flex w-full flex-col items-stretch gap-3 sm:mt-7 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
              <Button href={hero.primaryCta.href} variant="primary" className="w-full sm:w-auto">
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="outline" className="w-full sm:w-auto">
                {hero.secondaryCta.label}
              </Button>
            </div>
            {hero.supportLine ? (
              <p className="mt-4 text-sm leading-6 text-on-surface-variant">{hero.supportLine}</p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useRef } from "react";

import { PlatformZigZagVisual } from "@/components/how-it-works/PlatformZigZagVisual";
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
      className="page-hero relative overflow-hidden border-b border-outline-variant/40 bg-surface md:min-h-[70vh] md:flex md:items-center"
    >
      <Container className="relative z-10 w-full">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="max-w-xl">
            <div data-hiw-opening>
              <SectionBadge label={hero.eyebrow} />
            </div>
            <h1
              data-hiw-opening
              className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-on-surface md:text-4xl lg:text-[2.65rem]"
            >
              {hero.title}
            </h1>
            <p
              data-hiw-opening
              className="mt-4 max-w-lg text-sm leading-7 text-on-surface-variant md:text-base md:leading-8"
            >
              {hero.description}
            </p>
            <div
              data-hiw-opening
              className="relative z-20 mt-6 flex w-full flex-col items-stretch gap-3 sm:mt-7 sm:w-auto sm:flex-row sm:items-center"
            >
              <Button href={hero.primaryCta.href} variant="primary" className="w-full sm:w-auto">
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="outline" className="w-full sm:w-auto">
                {hero.secondaryCta.label}
              </Button>
            </div>
            {hero.supportLine ? (
              <p data-hiw-opening className="mt-4 text-sm text-on-surface-variant">
                {hero.supportLine}
              </p>
            ) : null}
          </div>

          <div data-hiw-opening className="min-w-0">
            <div className="min-h-[16rem] overflow-hidden rounded-md border border-outline-variant/50 bg-surface-low md:min-h-[22rem]">
              <PlatformZigZagVisual itemId="plant-graph" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

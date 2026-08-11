"use client";

import { useRef } from "react";

import { LiveDemoFrame } from "@/components/how-it-works/LiveDemoFrame";
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

      gsap.from("[data-hiw-opening-fade]", {
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.12,
        delay: 0.2,
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
      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div data-hiw-opening className="flex justify-center">
            <SectionBadge label={hero.eyebrow} />
          </div>
          <h1
            data-hiw-opening
            className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-on-surface md:text-4xl lg:text-[2.5rem]"
          >
            {hero.title}
          </h1>
          <p
            data-hiw-opening
            className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-on-surface-variant md:text-base"
          >
            {hero.description}
          </p>
          <div
            data-hiw-opening
            className="relative z-20 mt-6 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-7 sm:w-auto sm:flex-row sm:items-center"
          >
            <Button href={hero.primaryCta.href} variant="primary" className="w-full sm:w-auto">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline" className="w-full sm:w-auto">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div data-hiw-opening-fade className="relative z-0 mx-auto mt-8 w-full max-w-6xl">
          <LiveDemoFrame
            src="https://demo.stamped.work/"
            title="Stamped Energy live intelligence dashboard demo"
            displayUrl="demo.stamped.work"
          />
          <p className="mt-3 text-center text-xs font-medium text-on-surface-variant/80">
            Live interactive demo - click to explore the dashboard above.
          </p>
        </div>

        <p
          data-hiw-opening-fade
          className="mx-auto mt-6 text-center text-xs font-medium uppercase tracking-[0.14em] text-on-surface-variant/80"
          aria-hidden="true"
        >
          ↓ Scroll the workflow
        </p>
      </Container>
    </section>
  );
}

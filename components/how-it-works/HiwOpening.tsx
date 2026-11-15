"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProductFrame } from "@/components/ui/ProductFrame";
import { Section } from "@/components/ui/Section";
import { howItWorksContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function HiwOpening() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { hero, trustLines } = howItWorksContent;
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
    <div ref={sectionRef}>
      <Section tone="light" className="!pt-28 md:!pt-32">
        <div data-hiw-opening>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
        </div>

        <div className="mt-5 grid gap-8 lg:mt-8 lg:grid-cols-2 lg:items-end lg:gap-16 xl:gap-20">
          <h1
            data-hiw-opening
            className="font-display text-[length:var(--type-display-l)] font-semibold leading-[1.08] tracking-[-0.03em] text-balance"
          >
            {hero.title}
          </h1>

          <div data-hiw-opening className="w-full min-w-0">
            <p className="text-base leading-7 text-on-surface-variant md:text-lg md:leading-8">
              {hero.description}
            </p>
            <div className="relative z-20 mt-6 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
              <Button href={hero.primaryCta.href} variant="primary" size="lg" className="w-full sm:w-auto">
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="secondary" size="lg" className="w-full sm:w-auto">
                {hero.secondaryCta.label}
              </Button>
            </div>
            <ul className="mt-6 space-y-1.5 text-sm text-on-surface-variant">
              {trustLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <div data-hiw-opening className="mx-auto mt-12 max-w-4xl md:mt-16">
          <ProductFrame
            src="/images/product/v4/data-health.png"
            alt="Plant records joined on one timeline"
            title="How it works · Connect"
          />
        </div>
      </Section>
    </div>
  );
}

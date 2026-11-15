"use client";

import Image from "next/image";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { aboutContent } from "@/lib/content/about";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function AboutHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { hero } = aboutContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-about-hero]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.75,
        stagger: 0.08,
        ease: "power2.out",
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <div ref={sectionRef}>
      <Section tone="light" className="!pt-28 md:!pt-32">
        <div data-about-hero>
          <Eyebrow>{hero.eyebrow}</Eyebrow>
        </div>
        <div className="mt-5 grid gap-5 md:mt-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <h1
            data-about-hero
            className="font-display text-[length:var(--type-display-l)] font-semibold leading-[1.08] tracking-[-0.03em] text-balance"
          >
            {hero.title}
          </h1>
          <p
            data-about-hero
            className="text-base leading-7 text-on-surface-variant md:text-lg md:leading-8"
          >
            {hero.description}
          </p>
        </div>

        <div
          data-about-hero
          className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] border border-outline-variant md:mt-14 md:aspect-[2/1]"
        >
          <Image
            src={hero.heroImageSrc}
            alt={hero.heroImageAlt}
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 1280px) 100vw, 1200px"
          />
        </div>
      </Section>
    </div>
  );
}

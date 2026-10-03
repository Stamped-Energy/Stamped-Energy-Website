"use client";

import Image from "next/image";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { aboutContent } from "@/lib/content/about";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
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
    <section ref={sectionRef} className="page-hero relative overflow-hidden bg-surface">
      <Container className="relative z-10">
        <div data-about-hero>
          <SectionBadge label={hero.eyebrow} />
        </div>
        <div className="mt-5 grid gap-5 md:mt-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <h1
            data-about-hero
            className="font-display text-[1.9rem] font-extrabold leading-[1.12] tracking-tight text-on-surface sm:text-4xl lg:text-[3rem]"
          >
            {hero.title}
          </h1>
          <p
            data-about-hero
            className="text-base leading-7 text-on-surface/75 md:text-lg md:leading-8"
          >
            {hero.description}
          </p>
        </div>

        <div
          data-about-hero
          className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl md:mt-14 md:aspect-[21/8]"
        >
          <Image
            src={hero.heroImageSrc}
            alt={hero.heroImageAlt}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1280px) 100vw, 1200px"
          />
        </div>
      </Container>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
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
        y: 28,
        duration: 0.85,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      className="page-hero relative overflow-hidden border-b border-outline-variant/40 bg-surface"
    >
      <div className="absolute inset-0">
        <Image
          src={hero.heroImageSrc}
          alt={hero.heroImageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-secondary/70" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <p
            data-about-hero
            className="text-xs font-semibold uppercase tracking-[0.16em] text-inverse-primary"
          >
            {hero.eyebrow}
          </p>
          <h1
            data-about-hero
            className="mt-3 font-display text-[1.65rem] font-extrabold leading-[1.15] text-on-secondary sm:text-3xl md:text-4xl lg:text-[2.75rem]"
          >
            {hero.title}
          </h1>
          <p
            data-about-hero
            className="mt-3 max-w-xl text-sm leading-6 text-on-secondary/85 sm:mt-4 sm:leading-7 md:text-base"
          >
            {hero.description}
          </p>
        </div>
      </Container>
    </section>
  );
}

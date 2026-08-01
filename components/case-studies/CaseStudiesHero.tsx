"use client";

import Image from "next/image";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { caseStudiesContent } from "@/lib/content/caseStudies";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function CaseStudiesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { hero } = caseStudiesContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-cs-hero]", {
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
            data-cs-hero
            className="text-xs font-semibold uppercase tracking-[0.16em] text-inverse-primary"
          >
            {hero.eyebrow}
          </p>
          <h1
            data-cs-hero
            className="mt-3 font-display text-3xl font-extrabold leading-tight text-on-secondary md:text-4xl lg:text-[2.75rem]"
          >
            {hero.title}
          </h1>
          <p
            data-cs-hero
            className="mt-4 max-w-xl text-sm leading-7 text-on-secondary/85 md:text-base"
          >
            {hero.description}
          </p>
          <div data-cs-hero className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
            <Button href={hero.primaryCta.href} variant="primary" className="w-full sm:w-auto">
              {hero.primaryCta.label}
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="outline"
              className="w-full border-on-secondary/30 bg-on-secondary/5 text-on-secondary hover:bg-on-secondary/10 sm:w-auto"
            >
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

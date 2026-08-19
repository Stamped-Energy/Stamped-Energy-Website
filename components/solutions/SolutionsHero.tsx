"use client";

import Image from "next/image";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type { CtaLink } from "@/lib/content/types";
import { gsap, useGSAP } from "@/lib/motion/gsap";

type SolutionsHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  heroImageSrc: string;
  heroImageAlt: string;
  heroObjectPosition?: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
};

export function SolutionsHero({
  eyebrow,
  title,
  description,
  heroImageSrc,
  heroImageAlt,
  heroObjectPosition = "center 40%",
  primaryCta,
  secondaryCta,
}: SolutionsHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-solutions-hero]", {
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
      className="page-hero relative overflow-hidden bg-secondary"
    >
      <div className="absolute inset-0">
        <Image
          src={heroImageSrc}
          alt={heroImageAlt}
          fill
          priority
          className="object-cover"
          style={{ objectPosition: heroObjectPosition }}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-secondary/70" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <div data-solutions-hero>
            <SectionBadge label={eyebrow} alternate />
          </div>
          <h1
            data-solutions-hero
            className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-on-secondary md:text-4xl lg:text-[2.65rem]"
          >
            {title}
          </h1>
          <p
            data-solutions-hero
            className="mt-4 max-w-xl text-sm leading-7 text-on-secondary/85 md:text-base"
          >
            {description}
          </p>
          <div data-solutions-hero className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
            <Button href={primaryCta.href} variant="primary" className="w-full sm:w-auto">
              {primaryCta.label}
            </Button>
            <Button
              href={secondaryCta.href}
              variant="outline"
              className="w-full border-on-secondary/30 bg-on-secondary/5 text-on-secondary hover:bg-on-secondary/10 sm:w-auto"
            >
              {secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

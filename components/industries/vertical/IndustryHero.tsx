"use client";

import Image from "next/image";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { getIndustryVertical, getVerticalPage, type VerticalSlug } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

type IndustryHeroProps = {
  slug: VerticalSlug;
};

export function IndustryHero({ slug }: IndustryHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const page = getVerticalPage(slug);
  const vertical = getIndustryVertical(slug);
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-industry-hero]", {
        autoAlpha: 0,
        y: 28,
        duration: 0.85,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  if (!page || !vertical) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className="page-hero relative overflow-hidden border-b border-outline-variant/40 bg-surface"
    >
      <div className="absolute inset-0">
        <Image
          src={vertical.heroImageSrc}
          alt={vertical.heroImageAlt}
          fill
          priority
          className="object-cover object-[center_40%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-secondary/70" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-2xl">
          <div data-industry-hero>
            <SectionBadge label={page.hero.eyebrow} alternate />
          </div>
          <h1
            data-industry-hero
            className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-on-secondary md:text-4xl lg:text-[2.65rem]"
          >
            {page.hero.title}
          </h1>
          <p data-industry-hero className="mt-4 max-w-xl text-sm leading-7 text-on-secondary/85 md:text-base">
            {page.hero.description}
          </p>
          <div data-industry-hero className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row">
            <Button href={page.hero.primaryCta.href} variant="primary" className="w-full sm:w-auto">
              {page.hero.primaryCta.label}
            </Button>
            <Button
              href={page.hero.secondaryCta.href}
              variant="outline"
              className="w-full border-on-secondary/30 bg-on-secondary/5 text-on-secondary hover:bg-on-secondary/10 sm:w-auto"
            >
              {page.hero.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

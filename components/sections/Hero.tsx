"use client";

import Link from "next/link";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { HeroPlantFlow } from "@/components/sections/hero/HeroPlantFlow";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { landingContent } from "@/lib/content";
import { easeOut, heroDelay, heroDuration, heroStagger } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const introPlayedRef = useRef(false);
  const { hero } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || introPlayedRef.current) {
        return;
      }

      introPlayedRef.current = true;

      const section = sectionRef.current;
      if (!section) {
        return;
      }

      const targets = section.querySelectorAll<HTMLElement>("[data-hero-animate]");
      gsap.set(targets, { autoAlpha: 0, y: 18 });

      const timeline = gsap.timeline({
        defaults: { ease: easeOut, duration: heroDuration },
        delay: heroDelay,
      });

      timeline
        .to("[data-hero-animate='badge']", { autoAlpha: 1, y: 0 })
        .to("[data-hero-animate='headline']", { autoAlpha: 1, y: 0 }, "-=0.5")
        .to("[data-hero-animate='copy']", { autoAlpha: 1, y: 0, stagger: heroStagger }, "-=0.45")
        .to("[data-hero-animate='visual']", { autoAlpha: 1, y: 0 }, "-=0.55");
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  const primaryCta = cn(
    "inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-primary bg-primary px-6 text-sm font-semibold uppercase tracking-[0.06em] text-on-primary sm:w-auto",
    "transition-[transform,filter] duration-200 hover:-translate-y-0.5 hover:brightness-[1.04]",
  );

  const secondaryCta = cn(
    "inline-flex h-12 w-full items-center justify-center rounded-md border border-on-surface/25 bg-transparent px-6 text-sm font-semibold text-on-surface sm:w-auto",
    "transition-colors duration-200 hover:border-on-surface/45 hover:bg-on-surface/5",
  );

  return (
    <section ref={sectionRef} className="relative overflow-x-clip bg-surface pb-8 pt-24 md:pb-14 md:pt-28 lg:pt-24">
      <Container>
        <div className="grid gap-5 md:gap-6 lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-14">
          <div data-hero-animate="headline" className="flex flex-col gap-5 md:gap-6 lg:gap-4">
            <SectionBadge label={hero.badge} />
            <h1 className="hero-headline max-w-[16ch] font-display text-[2.15rem] font-bold leading-[1.06] tracking-[-0.03em] text-on-surface sm:text-5xl md:text-6xl lg:max-w-none lg:text-[4.75rem] lg:leading-[1.02] xl:text-[5.25rem]">
              <span className="block">{hero.headlineLine1}</span>
              <span className="block">{hero.headlineLine2}</span>
              <span className="block">{hero.headlineLine3}</span>
            </h1>
          </div>

          <div
            data-hero-animate="copy"
            className="flex w-full min-w-0 flex-col justify-center lg:max-w-[32rem] lg:justify-self-end lg:pt-14 xl:pt-[3.75rem]"
          >
            <p className="line-clamp-2 text-sm leading-5 text-on-surface/80 md:hidden">
              {hero.supportingLineMobile}
            </p>
            <p className="value-proposition hidden text-base leading-7 text-on-surface/80 md:block lg:text-sm lg:leading-[1.7] xl:text-[0.9375rem] xl:leading-[1.65]">
              {hero.supportingLine}
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:mt-5">
              <Link href={hero.primaryCta.href} className={primaryCta}>
                {hero.primaryCta.label}
                <span aria-hidden>»</span>
              </Link>
              <Link href={hero.secondaryCta.href} className={secondaryCta}>
                {hero.secondaryCta.label}
              </Link>
            </div>
            <p className="mt-3 hidden text-xs leading-5 text-on-surface-variant md:block lg:mt-4">
              {hero.microcopy}
            </p>
          </div>
        </div>

        <div data-hero-animate="visual" className="mt-6 border-t border-outline-variant/40 pt-5 md:mt-12 md:pt-8 lg:mt-14 lg:pt-10">
          <HeroPlantFlow />
        </div>
      </Container>
    </section>
  );
}

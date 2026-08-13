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
    <section ref={sectionRef} className="relative overflow-x-clip bg-surface pb-8 pt-24 md:pb-14 md:pt-32">
      <Container>
        <div data-hero-animate="badge" className="mb-5 md:mb-10">
          <SectionBadge label={hero.badge} />
        </div>

        <div className="grid gap-5 md:gap-8 lg:grid-cols-2 lg:items-end lg:gap-16 xl:gap-20">
          <h1
            data-hero-animate="headline"
            className="max-w-[14ch] font-display text-[2.15rem] font-bold leading-[1.08] tracking-[-0.03em] text-on-surface sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          >
            {hero.headline}
          </h1>

          <div data-hero-animate="copy" className="w-full min-w-0">
            <p className="line-clamp-2 text-sm leading-5 text-on-surface/80 md:hidden">
              {hero.supportingLineMobile}
            </p>
            <p className="hidden text-base leading-7 text-on-surface/80 md:block md:text-lg md:leading-8">
              {hero.supportingLine}
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-7">
              <Link href={hero.primaryCta.href} className={primaryCta}>
                {hero.primaryCta.label}
                <span aria-hidden>»</span>
              </Link>
              <Link href={hero.secondaryCta.href} className={secondaryCta}>
                {hero.secondaryCta.label}
              </Link>
            </div>
            <p className="mt-4 hidden text-sm leading-6 text-on-surface-variant md:block">{hero.microcopy}</p>
          </div>
        </div>

        <div data-hero-animate="visual" className="mt-6 border-t border-outline-variant/40 pt-5 md:mt-16 md:pt-10">
          <HeroPlantFlow />
        </div>
      </Container>
    </section>
  );
}

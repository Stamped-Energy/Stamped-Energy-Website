"use client";

import Link from "next/link";
import { useRef } from "react";

import { HeroFeatureBar } from "@/components/sections/hero/HeroFeatureBar";
import { HeroPromoVideo } from "@/components/sections/hero/HeroPromoVideo";
import { ArrowRightIcon, PlayCircleIcon } from "@/components/sections/hero/HeroIcons";
import { HeroIsometricVisual } from "@/components/sections/hero/HeroIsometricVisual";
import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
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
      gsap.set(targets, { autoAlpha: 0, y: 20 });
      gsap.set("[data-hero-animate='visual']", { scale: 0.96 });

      const timeline = gsap.timeline({
        defaults: { ease: easeOut, duration: heroDuration },
        delay: heroDelay,
      });

      timeline
        .to("[data-hero-animate='eyebrow']", { autoAlpha: 1, y: 0 })
        .to(
          "[data-hero-animate='line1'], [data-hero-animate='line2']",
          { autoAlpha: 1, y: 0, stagger: heroStagger },
          "-=0.55",
        )
        .to("[data-hero-animate='subheadline']", { autoAlpha: 1, y: 0 }, "-=0.5")
        .to("[data-hero-animate='supporting']", { autoAlpha: 1, y: 0 }, "-=0.45")
        .to("[data-hero-animate='ctas']", { autoAlpha: 1, y: 0 }, "-=0.45")
        .to("[data-hero-animate='visual']", { autoAlpha: 1, y: 0, scale: 1 }, "-=0.65");
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  const ctaPrimaryClass = cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-md border border-primary bg-primary px-5 text-sm font-semibold text-on-primary",
    "shadow-[0_2px_10px_-4px_color-mix(in_srgb,var(--brand-primary)_45%,transparent)] transition-[transform,box-shadow,filter] duration-200",
    "hover:-translate-y-0.5 hover:brightness-[1.04] sm:h-12 sm:px-6",
  );

  const ctaSecondaryClass = cn(
    "inline-flex h-11 items-center justify-center gap-2 rounded-md border-2 border-primary bg-transparent px-5 text-sm font-semibold text-primary",
    "transition-colors duration-200 hover:bg-primary/8 sm:h-12 sm:px-6",
  );

  return (
    <section ref={sectionRef} className="landing-hero relative overflow-x-clip bg-surface pb-0">
      <Container className="relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-6 xl:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] xl:gap-8">
          <div className="max-w-xl lg:max-w-md xl:max-w-lg">
            <p
              data-hero-animate="eyebrow"
              className="text-xs font-semibold uppercase tracking-[0.18em] text-primary"
            >
              {hero.eyebrow}
            </p>

            <h1 className="hero-headline mt-4 font-display text-[2.15rem] font-extrabold leading-[1.08] tracking-tight text-on-surface sm:text-5xl lg:text-[3.25rem]">
              <span data-hero-animate="line1" className="block">
                {hero.headlineLine1}
              </span>
              <span data-hero-animate="line2" className="mt-1 block text-on-surface">
                {hero.headlineLine2}
              </span>
              {hero.subheadline ? (
                <span
                  data-hero-animate="subheadline"
                  className="mt-1 block text-lg font-medium text-on-surface sm:text-xl lg:text-[3.25rem] lg:font-extrabold lg:leading-[1.08] lg:tracking-tight"
                >
                  {hero.subheadline}
                </span>
              ) : null}
            </h1>
            <span className="sr-only">
              AI-powered prescriptive energy intelligence for cement, steel, pharma, chemical, and
              automotive plants in India.
            </span>

            <p
              data-hero-animate="supporting"
              className="value-proposition mt-4 max-w-lg text-sm leading-7 text-on-surface-variant sm:text-base"
            >
              {hero.supportingLine}
            </p>
            {hero.supportingLine2 ? (
              <p
                data-hero-animate="supporting"
                className="mt-3 max-w-lg text-sm leading-7 text-on-surface-variant sm:text-base"
              >
                {hero.supportingLine2}
              </p>
            ) : null}

            {hero.commercialBadge ? (
              <p
                data-hero-animate="supporting"
                className="mt-4 inline-flex rounded-full border border-primary/25 bg-primary/8 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-primary"
              >
                {hero.commercialBadge}
              </p>
            ) : null}

            <div
              data-hero-animate="ctas"
              className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Link href={hero.primaryCta.href} className={ctaPrimaryClass}>
                {hero.primaryCta.label}
                <ArrowRightIcon />
              </Link>
              <Link href={hero.secondaryCta.href} className={ctaSecondaryClass}>
                <PlayCircleIcon />
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <HeroIsometricVisual />
        </div>
      </Container>

      <div className="relative z-10 mt-10 md:mt-12">
        <HeroFeatureBar />
        <HeroPromoVideo />
      </div>
    </section>
  );
}

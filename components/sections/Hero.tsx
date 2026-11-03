"use client";

import Link from "next/link";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { HeroPlantFlow } from "@/components/sections/hero/HeroPlantFlow";
import { HeroPlantFlowDesktopGate } from "@/components/sections/hero/HeroPlantFlowDesktopGate";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { landingContent } from "@/lib/content";
import { easeOut, heroDelay, heroDuration, heroStagger } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

const MOBILE_CARD_IDS = ["inspector", "shift-lead", "planner", "maintenance-lead", "ht-heatup"];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const introPlayedRef = useRef(false);
  const { hero } = landingContent;
  const mobileActionCards = hero.actionCards.filter((card) => MOBILE_CARD_IDS.includes(card.id));
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || introPlayedRef.current) {
        return;
      }

      if (window.matchMedia("(max-width: 1023px)").matches) {
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
        <div className="grid gap-5 md:gap-6 lg:grid-cols-12 lg:items-end lg:gap-10 xl:gap-14">
          <div data-hero-animate="headline" className="flex flex-col gap-5 md:gap-6 lg:col-span-7 lg:gap-5">
            <SectionBadge label={hero.badge} />
            <h1 className="hero-headline max-w-[17ch] text-balance font-display text-[2.15rem] font-bold leading-[1.06] tracking-[-0.03em] text-on-surface sm:text-5xl md:text-6xl lg:max-w-[14.5ch] lg:text-[clamp(3.5rem,5.2vw,5rem)] lg:leading-[1.02]">
              {hero.headline}
            </h1>
          </div>

          <div
            data-hero-animate="copy"
            className="flex w-full min-w-0 flex-col lg:col-span-5 lg:max-w-[30rem] lg:justify-self-end lg:pb-2"
          >
            <p className="value-proposition text-sm leading-6 text-on-surface/80 md:text-base md:leading-7 lg:text-[0.975rem] lg:leading-[1.7]">
              {hero.supportingLine}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:mt-6">
              <Link href={hero.primaryCta.href} className={primaryCta}>
                {hero.primaryCta.label}
                <span aria-hidden>»</span>
              </Link>
              <Link href={hero.secondaryCta.href} className={secondaryCta}>
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>

        <ul data-hero-animate="copy" className="mt-5 grid gap-1.5 text-[0.8rem] leading-5 text-on-surface-variant sm:flex sm:flex-wrap sm:gap-x-10 sm:gap-y-2 lg:mt-8">
          {hero.features.map((feature) => (
            <li key={feature.id} className="flex items-start gap-2">
              <span aria-hidden className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{feature.title}</span>
            </li>
          ))}
        </ul>

        <div data-hero-animate="visual" className="mt-6 border-t border-outline-variant/40 pt-5 md:mt-8 md:pt-8 lg:mt-8 lg:pt-10">
          <div className="hidden lg:block">
            <HeroPlantFlowDesktopGate />
          </div>
          <div className="lg:hidden">
            <HeroPlantFlow variant="mobileLight" />
            <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.12em] text-primary sm:text-[0.68rem]">
              {hero.actionPanel.title}
            </p>
            <div className="relative mt-3">
              <div
                className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-10 bg-gradient-to-l from-surface via-surface/80 to-transparent sm:w-12"
                aria-hidden
              />
              <div role="region" aria-label={hero.actionPanel.title}>
                <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6">
                  {mobileActionCards.map((card) => (
                    <li
                      key={card.id}
                      className="w-[78%] shrink-0 snap-start rounded-md border border-outline-variant/50 bg-surface-lowest p-4 sm:w-[46%]"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-on-surface px-2.5 py-1 font-mono text-xs font-medium uppercase tracking-[0.1em] text-surface sm:text-[0.62rem]">
                          {card.role}
                        </span>
                        <span className="rounded-full border border-outline-variant/70 px-2.5 py-1 font-mono text-xs uppercase tracking-[0.1em] text-on-surface-variant sm:text-[0.62rem]">
                          {card.area}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-on-surface">{card.copy}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-2 font-mono text-xs text-on-surface-variant/80" aria-hidden>
                Swipe
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

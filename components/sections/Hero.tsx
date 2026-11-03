"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { HeroPlantFlowDesktopGate } from "@/components/sections/hero/HeroPlantFlowDesktopGate";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { landingContent } from "@/lib/content";
import { easeOut, heroDelay, heroDuration, heroStagger } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

const HeroPlantFlowMobile = dynamic(
  () =>
    import("@/components/sections/hero/HeroPlantFlow").then((mod) => {
      function MobileFlow() {
        return <mod.HeroPlantFlow variant="mobileLight" />;
      }
      return MobileFlow;
    }),
  {
    ssr: false,
    loading: () => (
      <div
        className="max-h-40 w-full rounded-md bg-surface-container/35 lg:hidden"
        style={{ aspectRatio: "2529 / 1274" }}
        aria-hidden
      />
    ),
  },
);

const HeroMobileActions = dynamic(
  () =>
    import("@/components/sections/hero/HeroMobileActions").then((mod) => ({
      default: mod.HeroMobileActions,
    })),
  {
    ssr: false,
    loading: () => <div className="mt-4 min-h-[11rem] lg:hidden" aria-hidden />,
  },
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const introPlayedRef = useRef(false);
  const { hero } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();
  const [showMobileActions, setShowMobileActions] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (window.matchMedia("(min-width: 1024px)").matches) {
      return;
    }

    let cancelled = false;
    const reveal = () => {
      if (!cancelled) {
        setShowMobileActions(true);
      }
    };

    const idleHandle =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(reveal, { timeout: 2800 })
        : window.setTimeout(reveal, 400);

    return () => {
      cancelled = true;
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleHandle as number);
      } else {
        window.clearTimeout(idleHandle as number);
      }
    };
  }, []);

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

      const fadeTargets = section.querySelectorAll<HTMLElement>("[data-hero-animate]");
      gsap.set(fadeTargets, { autoAlpha: 0, y: 18 });

      const headline = section.querySelector<HTMLElement>("[data-hero-lcp='headline']");
      if (headline) {
        gsap.set(headline, { y: 14, autoAlpha: 1 });
      }

      const timeline = gsap.timeline({
        defaults: { ease: easeOut, duration: heroDuration },
        delay: heroDelay,
      });

      timeline
        .to("[data-hero-animate='badge']", { autoAlpha: 1, y: 0 })
        .to("[data-hero-lcp='headline']", { y: 0 }, "-=0.45")
        .to("[data-hero-animate='copy']", { autoAlpha: 1, y: 0, stagger: heroStagger }, "-=0.4")
        .to("[data-hero-animate='visual']", { autoAlpha: 1, y: 0 }, "-=0.55");
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  const primaryCta = cn(
    "inline-flex h-12 w-full items-center justify-center gap-2 rounded-md border border-primary bg-primary px-6 text-sm font-semibold uppercase tracking-[0.06em] text-on-primary sm:w-auto",
    "max-lg:border-on-primary/40 max-lg:bg-[color-mix(in_srgb,var(--brand-primary)_88%,#1a0503)]",
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
          <div className="flex flex-col gap-5 md:gap-6 lg:col-span-7 lg:gap-5">
            <div data-hero-animate="badge">
              <SectionBadge label={hero.badge} />
            </div>
            <h1
              data-hero-lcp="headline"
              className="hero-headline max-w-[17ch] text-balance font-display text-[2.15rem] font-bold leading-[1.06] tracking-[-0.03em] text-on-surface sm:text-5xl md:text-6xl lg:max-w-[14.5ch] lg:text-[clamp(3.5rem,5.2vw,5rem)] lg:leading-[1.02]"
            >
              {hero.headline}
            </h1>
          </div>

          <div
            data-hero-lcp="copy"
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

        <ul
          data-hero-animate="copy"
          className="mt-5 grid gap-1.5 text-[0.8rem] leading-5 text-on-surface-variant sm:flex sm:flex-wrap sm:gap-x-10 sm:gap-y-2 lg:mt-8"
        >
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
            <HeroPlantFlowMobile />
            {showMobileActions ? <HeroMobileActions /> : <div className="mt-4 min-h-[11rem]" aria-hidden />}
          </div>
        </div>
      </Container>
    </section>
  );
}

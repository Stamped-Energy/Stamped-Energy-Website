"use client";

import Image from "next/image";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { industriesContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function IndustriesHubHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { hub } = industriesContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-hub-hero]", {
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
      className="relative overflow-hidden bg-[var(--brand-inverse-surface)] text-inverse-on-surface"
    >
      <div className="absolute inset-0">
        <Image
          src={hub.heroImageSrc}
          alt={hub.heroImageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[var(--brand-inverse-surface)]/70" />
      </div>

      <div className="container-page relative z-10 section-y !pt-28 md:!pt-32">
        <div className="max-w-2xl">
          <div data-hub-hero>
            <Eyebrow tone="dark">{hub.eyebrow}</Eyebrow>
          </div>
          <h1
            data-hub-hero
            className="mt-5 font-display text-[length:var(--type-display-l)] font-semibold leading-[1.08] tracking-[-0.03em] text-balance"
          >
            {hub.title}
          </h1>
          <p
            data-hub-hero
            className="mt-4 max-w-xl text-base leading-7 text-white/70 md:text-lg md:leading-8"
          >
            {hub.description}
          </p>
          <div data-hub-hero className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <Button href={hub.primaryCta.href} variant="on-dark" size="lg" className="w-full sm:w-auto">
              {hub.primaryCta.label}
            </Button>
            <Button
              href={hub.secondaryCta.href}
              variant="ghost"
              size="lg"
              className="w-full text-white hover:bg-white/10 sm:w-auto"
            >
              {hub.secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

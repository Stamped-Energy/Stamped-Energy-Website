"use client";

import Image from "next/image";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
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
        y: 24,
        duration: 0.75,
        stagger: 0.08,
        ease: "power2.out",
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <section ref={sectionRef} className="page-hero relative overflow-hidden bg-secondary">
      <Container className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <div data-about-hero>
            <SectionBadge label={hero.eyebrow} alternate />
          </div>
          <h1
            data-about-hero
            className="mt-5 max-w-2xl font-display text-[1.75rem] font-extrabold leading-[1.15] tracking-tight text-on-secondary sm:text-4xl lg:text-[2.85rem]"
          >
            {hero.title}
          </h1>
          <p
            data-about-hero
            className="mt-4 max-w-xl text-base leading-7 text-on-secondary/85 md:text-lg md:leading-8"
          >
            {hero.description}
          </p>
          <ul data-about-hero className="mt-6 flex flex-wrap gap-2">
            {hero.facts.map((fact) => (
              <li
                key={fact}
                className="rounded-full border border-on-secondary/20 bg-on-secondary/5 px-3.5 py-1.5 text-sm font-medium text-on-secondary/90"
              >
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <div
          data-about-hero
          className="relative aspect-[4/3] overflow-hidden rounded-xl border border-on-secondary/15"
        >
          <Image
            src={hero.heroImageSrc}
            alt={hero.heroImageAlt}
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      </Container>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
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
        y: 28,
        duration: 0.85,
        ease: "power2.out",
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[70vh] items-end overflow-hidden bg-secondary md:min-h-[80vh]"
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
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/55 to-secondary/20" />
      </div>

      <Container className="relative z-10 pb-12 pt-24 md:pb-16 md:pt-28 lg:pb-20">
        <h1
          data-about-hero
          className="max-w-3xl font-display text-3xl font-extrabold leading-[1.12] tracking-tight text-on-secondary sm:text-4xl md:text-5xl lg:text-[3.25rem]"
        >
          {hero.title}
        </h1>
      </Container>
    </section>
  );
}

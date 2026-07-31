"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { gsap, useGSAP } from "@/lib/motion/gsap";

type BlogHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function BlogHero({ eyebrow, title, description }: BlogHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-blog-hero]", {
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
      className="page-hero relative overflow-hidden border-b border-outline-variant/40 bg-secondary"
    >
      <Container className="relative z-10">
        <div className="max-w-2xl">
          <p
            data-blog-hero
            className="text-xs font-semibold uppercase tracking-[0.16em] text-inverse-primary"
          >
            {eyebrow}
          </p>
          <h1
            data-blog-hero
            className="mt-3 font-display text-[1.65rem] font-extrabold leading-[1.15] text-on-secondary sm:text-3xl md:text-4xl lg:text-[2.75rem]"
          >
            {title}
          </h1>
          <p
            data-blog-hero
            className="mt-3 max-w-xl text-sm leading-6 text-on-secondary/85 sm:mt-4 sm:leading-7 md:text-base"
          >
            {description}
          </p>
          <div data-blog-hero className="mt-5 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3">
            <Button href="#blog-catalog" variant="primary" className="w-full sm:w-auto">
              Browse articles
            </Button>
            <Button
              href="/platform"
              variant="outline"
              className="hidden w-full border-on-secondary/30 bg-on-secondary/5 text-on-secondary hover:bg-on-secondary/10 sm:inline-flex sm:w-auto"
            >
              See how it works
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

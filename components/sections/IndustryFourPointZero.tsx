"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function IndustryFourPointZero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { industry40 } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-i40-bullet]", {
        autoAlpha: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.09,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <section
      id="industry-4-0"
      ref={sectionRef}
      className="relative overflow-hidden bg-secondary section-y text-on-secondary"
    >
      <Container className="relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow={industry40.eyebrow}
            title={industry40.title}
            dark
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <ol className="mt-8 grid gap-4 md:mt-12 md:grid-cols-2 xl:grid-cols-4">
          {industry40.bullets.map((bullet, index) => (
            <li
              key={bullet.id}
              data-i40-bullet
              className="rounded-xl border border-on-secondary/15 bg-surface-lowest p-5 text-on-surface shadow-lg sm:p-6"
            >
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 font-display text-xs font-extrabold text-primary"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-bold text-on-surface">{bullet.title}</h3>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">{bullet.description}</p>
            </li>
          ))}
        </ol>

        <Reveal className="mx-auto mt-8 max-w-3xl md:mt-10">
          <p className="text-center text-sm leading-7 text-on-secondary/80 md:text-base">
            {industry40.closer}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

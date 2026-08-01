"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { aboutContent } from "@/lib/content/about";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function AboutValues() {
  const sectionRef = useRef<HTMLElement>(null);
  const { values } = aboutContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-about-value]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.55,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      className="border-b border-outline-variant/40 bg-surface-low py-10 md:section-y"
    >
      <Container>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {values.eyebrow}
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-xl font-bold text-on-surface sm:text-2xl md:text-3xl">
            {values.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-on-surface-variant sm:leading-7 md:text-base">
            {values.description}
          </p>
        </Reveal>

        <ol className="mt-6 grid gap-3 sm:mt-8 md:mt-10 md:grid-cols-3 md:gap-6">
          {values.items.map((item, index) => (
            <li
              key={item.id}
              data-about-value
              className="flex h-full flex-col border border-outline-variant/50 bg-surface-lowest p-4 sm:p-6 md:p-8"
            >
              <p className="font-mono text-xs font-semibold text-on-surface-variant">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-display text-lg font-bold text-on-surface md:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">{item.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

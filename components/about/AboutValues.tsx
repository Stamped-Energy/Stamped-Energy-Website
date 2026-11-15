"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { aboutContent } from "@/lib/content/about";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function AboutValues() {
  const sectionRef = useRef<HTMLDivElement>(null);
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
    <div ref={sectionRef}>
      <Section tone="muted">
        <Reveal>
          <Eyebrow>{values.eyebrow}</Eyebrow>
          <h2 className="mt-5 max-w-2xl font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em]">
            {values.title}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-on-surface-variant">
            {values.description}
          </p>
        </Reveal>

        <ol className="mt-8 grid gap-3 md:mt-10 md:grid-cols-3 md:gap-6">
          {values.items.map((item, index) => (
            <li
              key={item.id}
              data-about-value
              className="flex h-full flex-col rounded-[var(--radius-card)] border border-outline-variant bg-surface-lowest p-4 sm:p-6 md:p-8"
            >
              <p className="font-mono text-xs font-semibold text-on-surface-variant">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 font-display text-lg font-semibold text-on-surface md:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">{item.description}</p>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}

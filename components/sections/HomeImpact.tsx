"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { landingContent } from "@/lib/content";
import { easeOut, scrollTriggerDefaults, staggerGap } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function HomeImpact() {
  const { impact } = landingContent;
  const listRef = useRef<HTMLUListElement>(null);
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || !listRef.current) return;
      gsap.from("[data-impact-rule]", {
        scaleX: 0,
        duration: 0.9,
        ease: easeOut,
        stagger: staggerGap,
        scrollTrigger: { trigger: listRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: listRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <section className="section-y bg-secondary text-on-secondary">
      <Container>
        <Reveal>
          <SectionBadge label={impact.badge} alternate />
          <h2 className="mt-6 max-w-3xl font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
            {impact.title}
          </h2>
        </Reveal>

        <ul ref={listRef} className="key-numbers mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:gap-10">
          {impact.items.map((item, index) => (
            <li key={item.id} className="relative border-t border-on-secondary/15 pt-6">
              <span
                data-impact-rule
                className="absolute -top-px left-0 h-0.5 w-16 origin-left bg-primary"
                aria-hidden
              />
              <Reveal delay={index * staggerGap}>
                <p className="text-lg leading-8 text-on-secondary/80 md:text-xl md:leading-9">
                  <strong className="font-display font-bold text-on-secondary">{item.title}</strong>{" "}
                  {item.detail}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <p className="mt-12 max-w-2xl text-sm leading-7 text-on-secondary/65 md:text-base">
            {impact.footnote}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

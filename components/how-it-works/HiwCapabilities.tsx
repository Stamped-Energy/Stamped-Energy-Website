"use client";

import { useRef } from "react";

import { CapabilityVisual } from "@/components/how-it-works/capabilities/CapabilityVisual";
import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorksContent } from "@/lib/content";
import { getHiwScrollStart } from "@/lib/motion/hiwScrollTrigger";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function HiwCapabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const { capabilities } = howItWorksContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>("[data-capability-card]");
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.set(cards, { autoAlpha: 0, y: 28 });
        gsap.to(cards, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: getHiwScrollStart("sectionReveal", false),
            once: true,
          },
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(cards, { autoAlpha: 0, y: 28 });
        gsap.to(cards, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: getHiwScrollStart("sectionReveal", true),
            once: true,
          },
        });
      });

      return () => mm.revert();
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-surface py-[3.6rem] text-on-surface md:py-[5.4rem]"
    >
      <Container>
        <SectionHeading
          eyebrow={capabilities.eyebrow}
          title={capabilities.title}
          description={capabilities.description}
          align="center"
          className="mx-auto"
        />

        <div className="mt-11 grid gap-5 md:grid-cols-2 xl:gap-7">
          {capabilities.items.map((item) => (
              <article
                key={item.id}
                data-capability-card
                className="group flex flex-col overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-lowest shadow-sm transition-shadow duration-300 hover:shadow-[0_20px_48px_-28px_color-mix(in_srgb,var(--brand-primary)_45%,transparent)]"
              >
                <div className="relative min-h-[15rem] overflow-hidden border-b border-outline-variant/40 bg-surface-lowest sm:min-h-[12.5rem] sm:aspect-[16/10] md:min-h-0">
                  <CapabilityVisual capability={item} />
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h3 className="text-lg font-bold md:text-xl">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant md:text-[15px] md:leading-7">
                    {item.description}
                  </p>
                </div>
              </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

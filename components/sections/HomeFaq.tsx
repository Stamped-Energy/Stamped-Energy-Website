"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function HomeFaq() {
  const sectionRef = useRef<HTMLElement>(null);
  const { faq } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-home-faq-item]", {
        autoAlpha: 0,
        y: 18,
        duration: 0.45,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <section id="faq" ref={sectionRef} className="bg-surface section-y">
      <Container>
        <Reveal className="mx-auto">
          <SectionHeading eyebrow={faq.eyebrow} title={faq.title} align="center" className="mx-auto" />
        </Reveal>

        <div className="mx-auto mt-8 max-w-3xl divide-y divide-outline-variant/40 border-y border-outline-variant/40 md:mt-12">
          {faq.items.map((item) => (
            <details
              key={item.id}
              data-home-faq-item
              className="group px-1 py-4 md:px-2 md:py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-on-surface outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:text-lg">
                {item.question}
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 shrink-0 items-center justify-center text-lg leading-none text-primary transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

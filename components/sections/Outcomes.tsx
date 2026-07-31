"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { animateStatValue } from "@/lib/motion/countUp";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function Outcomes() {
  const sectionRef = useRef<HTMLElement>(null);
  const { outcomes } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>("[data-outcome-card]");

      cards.forEach((card, index) => {
        const valueEl = card.querySelector<HTMLElement>("[data-outcome-value]");
        const lineEl = card.querySelector<HTMLElement>("[data-outcome-line]");

        gsap.set(card, { autoAlpha: 0, y: 28 });
        if (lineEl) {
          gsap.set(lineEl, { scaleX: 0, transformOrigin: "left center" });
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 86%",
            once: true,
          },
          delay: index * 0.08,
        });

        timeline.to(card, { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out" });

        if (lineEl) {
          timeline.to(lineEl, { scaleX: 1, duration: 0.5, ease: "power2.out" }, "-=0.35");
        }

        if (valueEl) {
          timeline.add(animateStatValue(valueEl, valueEl.dataset.value ?? "", 1.1), "-=0.25");
        }
      });
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section ref={sectionRef} className="key-numbers relative overflow-hidden section-y">
      <Container className="relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow={outcomes.eyebrow}
            title={outcomes.title}
            description={outcomes.disclaimer}
          />
        </Reveal>

        <div className="mt-8 grid md:mt-12 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {outcomes.stats.map((stat) => (
            <article
              key={stat.id}
              data-outcome-card
              className="group relative h-full overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-lowest p-6 shadow-sm transition-shadow duration-300 hover:shadow-[0_20px_40px_-28px_color-mix(in_srgb,var(--brand-primary)_45%,transparent)]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/8 blur-2xl transition-opacity duration-300 group-hover:bg-primary/14"
              />
              <div
                data-outcome-line
                className="mb-4 h-1 w-10 rounded-full bg-primary"
                aria-hidden="true"
              />
              <p
                data-outcome-value
                data-value={stat.value}
                className="font-display text-3xl font-extrabold tracking-tight text-primary md:text-4xl"
              >
                {stat.value}
              </p>
              <p className="mt-3 text-sm font-semibold text-on-surface">{stat.label}</p>
              {stat.detail ? (
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">{stat.detail}</p>
              ) : null}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

const PROBLEM_MARKERS = ["01", "02", "03"];

export function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const { problem } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>("[data-problem-card]");

      cards.forEach((card, index) => {
        gsap.set(card, { autoAlpha: 0, y: 28 });

        gsap.to(card, {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        });
      });
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section
      ref={sectionRef}
      id="why-energy-projects-fail"
      className="relative overflow-hidden bg-secondary py-10 text-on-secondary md:section-y"
    >
      <Container className="relative z-10">
        <Reveal>
          <SectionHeading
            eyebrow={problem.eyebrow}
            title={problem.title}
            description={problem.description}
            dark
            align="center"
            className="mx-auto max-w-2xl"
          />
        </Reveal>

        <div className="mt-6 grid gap-4 md:mt-12 lg:grid-cols-3 lg:gap-5">
          {problem.items.map((item, index) => (
            <article
              key={item.id}
              data-problem-card
              className="flex h-full flex-col rounded-2xl border border-on-secondary/15 bg-surface-lowest p-4 text-on-surface shadow-lg sm:p-5 md:p-6"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 font-display text-xs font-extrabold text-primary sm:h-10 sm:w-10 sm:text-sm"
                >
                  {PROBLEM_MARKERS[index]}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold leading-snug text-on-surface sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{item.description}</p>
                </div>
              </div>

              {item.solutionPoints && item.solutionPoints.length > 0 ? (
                <div className="mt-4 flex-1 rounded-xl bg-primary/[0.06] p-3.5 sm:mt-5 sm:p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary sm:text-xs">
                    {item.solutionHeading ?? "How Stamped closes it"}
                  </p>
                  <ul className="mt-2.5 space-y-2">
                    {item.solutionPoints.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2.5 text-sm leading-5 text-on-surface-variant"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

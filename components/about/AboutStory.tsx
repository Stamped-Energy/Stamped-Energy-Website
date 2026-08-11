"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { aboutContent } from "@/lib/content/about";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

/** Dark story / journey band for About (selective restructure). */
export function AboutStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const { journey } = aboutContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-about-milestone]", {
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
    <section ref={sectionRef} className="bg-secondary section-y text-on-secondary">
      <Container>
        <Reveal>
          <SectionBadge label={journey.eyebrow} alternate />
          <h2 className="mt-5 max-w-2xl font-display text-2xl font-bold tracking-tight text-on-secondary md:text-3xl">
            {journey.title}
          </h2>
        </Reveal>

        <ol className="mt-10 space-y-8 md:mt-12 md:space-y-10">
          {journey.milestones.map((milestone, index) => (
            <li
              key={milestone.id}
              data-about-milestone
              className="grid gap-3 border-t border-on-secondary/15 pt-8 md:grid-cols-[8rem_1fr] md:gap-10"
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-inverse-primary">
                {milestone.period}
              </p>
              <div>
                <p className="font-mono text-[11px] font-semibold text-on-secondary/45">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold text-on-secondary md:text-xl">
                  {milestone.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-on-secondary/75">
                  {milestone.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

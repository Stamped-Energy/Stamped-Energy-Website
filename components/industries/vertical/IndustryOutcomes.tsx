"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getVerticalPage, type VerticalSlug } from "@/lib/content";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

type IndustryOutcomesProps = {
  slug: VerticalSlug;
};

export function IndustryOutcomes({ slug }: IndustryOutcomesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const page = getVerticalPage(slug);
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-outcome-card]", {
        autoAlpha: 0,
        y: 22,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  if (!page) {
    return null;
  }

  const { outcomes } = page;
  const gainItems = outcomes.items.slice(0, 3);

  return (
    <section ref={sectionRef} className="bg-secondary section-y text-on-secondary">
      <Container>
        <Reveal className="mx-auto">
          <SectionHeading
            eyebrow={outcomes.eyebrow}
            title={outcomes.title}
            description={outcomes.disclaimer}
            align="center"
            dark
            className="mx-auto"
          />
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:mt-12 md:grid-cols-3 md:gap-5">
          {gainItems.map((item) => (
            <article
              key={item.id}
              data-outcome-card
              className="rounded-xl border border-on-secondary/20 bg-on-secondary/5 p-5 md:p-6"
            >
              <h3 className="text-lg font-bold text-on-secondary">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-on-secondary/75 md:leading-7">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

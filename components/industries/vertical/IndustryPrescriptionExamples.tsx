"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getVerticalPage, type VerticalSlug } from "@/lib/content";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

type IndustryPrescriptionExamplesProps = {
  slug: VerticalSlug;
};

export function IndustryPrescriptionExamples({ slug }: IndustryPrescriptionExamplesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const page = getVerticalPage(slug);
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-prescription-card]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.55,
        stagger: 0.09,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  if (!page) {
    return null;
  }

  const { prescriptionExamples } = page;

  return (
    <section ref={sectionRef} className="bg-surface section-y">
      <Container>
        <Reveal className="mx-auto">
          <SectionHeading
            eyebrow={prescriptionExamples.eyebrow}
            title={prescriptionExamples.title}
            description={prescriptionExamples.description}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mx-auto mt-8 grid max-w-6xl gap-4 md:mt-12 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {prescriptionExamples.items.map((item) => (
            <article
              key={item.id}
              data-prescription-card
              className="flex flex-col rounded-xl border border-outline-variant/50 bg-surface-lowest p-5 md:p-6"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                  {item.impactRange}
                </span>
                {item.area ? (
                  <span className="rounded-full border border-outline-variant/60 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                    {item.area}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-on-surface-variant">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-7 text-on-surface md:text-base">{item.description}</p>
              {item.assignee ? (
                <p className="mt-4 border-t border-outline-variant/35 pt-4 text-xs text-on-surface-variant">
                  Assigned: {item.assignee}
                </p>
              ) : null}
            </article>
          ))}
        </div>

        {prescriptionExamples.attribution ? (
          <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-5 text-on-surface-variant">
            {prescriptionExamples.attribution.text}{" "}
            <span className="italic">[{prescriptionExamples.attribution.source}]</span>
          </p>
        ) : null}

        <p className="mx-auto mt-4 max-w-3xl text-center text-xs leading-5 text-on-surface-variant">
          {prescriptionExamples.footnote}
        </p>
      </Container>
    </section>
  );
}

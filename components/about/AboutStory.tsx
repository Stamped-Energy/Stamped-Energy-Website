"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { aboutContent } from "@/lib/content/about";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function AboutStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const { story } = aboutContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-about-story]", {
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
      className="border-b border-outline-variant/40 bg-surface section-y"
    >
      <Container>
        <div className="grid gap-8 md:grid-cols-[5rem_1fr] md:gap-12 lg:gap-16">
          <Reveal>
            <SectionBadge label={story.eyebrow} />
          </Reveal>
          <div className="min-w-0">
            <Reveal>
              <h2 className="max-w-2xl font-display text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
                {story.title}
              </h2>
            </Reveal>
            <div className="mt-8 space-y-6 md:mt-10">
              {story.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  data-about-story
                  className="max-w-2xl text-sm leading-7 text-on-surface-variant md:text-base md:leading-8"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

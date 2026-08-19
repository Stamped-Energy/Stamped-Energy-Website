"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
        <Reveal className="mx-auto max-w-3xl">
          <SectionHeading eyebrow={story.eyebrow} title={story.title} align="center" />
        </Reveal>
        <div className="mx-auto mt-8 max-w-3xl space-y-6 text-center md:mt-10">
          {story.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              data-about-story
              className="text-sm leading-7 text-on-surface-variant md:text-base md:leading-8"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}

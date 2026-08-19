"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent } from "@/lib/content/about";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

function StoryParagraph({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={index} className="font-semibold text-on-surface">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

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
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <SectionHeading
              eyebrow={story.eyebrow}
              title={story.title}
              align="center"
              className="max-w-none"
            />
          </Reveal>
          <div className="mt-8 space-y-6 text-left md:mt-10">
            {story.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                data-about-story
                className="text-base leading-8 text-on-surface-variant md:text-lg md:leading-9"
              >
                <StoryParagraph text={paragraph} />
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

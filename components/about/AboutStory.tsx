"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
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
  const sectionRef = useRef<HTMLDivElement>(null);
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
    <div ref={sectionRef}>
      <Section tone="light">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="text-center">
              <Eyebrow className="justify-center">{story.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em]">
                {story.title}
              </h2>
            </div>
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
          <h2
            data-about-story
            className="mt-12 font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em] text-on-surface"
          >
            {story.whatWeDo.title}
          </h2>
          <div className="mt-6 space-y-6 text-left">
            {story.whatWeDo.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                data-about-story
                className="text-base leading-8 text-on-surface-variant md:text-lg md:leading-9"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

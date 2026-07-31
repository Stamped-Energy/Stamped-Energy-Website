"use client";

import Image from "next/image";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent } from "@/lib/content/about";
import { scrollTriggerDefaults } from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function AboutIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const { intro } = aboutContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      gsap.from("[data-about-intro]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, ...scrollTriggerDefaults },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <section ref={sectionRef} className="border-b border-outline-variant/40 bg-surface py-10 md:section-y">
      <Container>
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div
            data-about-intro
            className="relative order-1 aspect-[16/10] overflow-hidden rounded-2xl border border-outline-variant/50 shadow-md sm:aspect-[5/4] lg:order-2 lg:aspect-[3/4]"
          >
            <Image
              src={intro.imageSrc}
              alt={intro.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-secondary/70" />
          </div>

          <Reveal className="order-2 lg:order-1">
            <SectionHeading
              eyebrow={intro.eyebrow}
              title={intro.title}
              description={intro.description}
            />
            <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {intro.pillars.map((pillar) => (
                <article
                  key={pillar.id}
                  data-about-intro
                  className="rounded-xl border border-outline-variant/50 bg-surface-lowest p-4 shadow-sm sm:p-5"
                >
                  <h3 className="text-sm font-bold text-on-surface sm:text-base">{pillar.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-on-surface-variant sm:mt-2">
                    {pillar.description}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

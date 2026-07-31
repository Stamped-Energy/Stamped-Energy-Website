"use client";

import Link from "next/link";
import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function OperationalSustainability() {
  const sectionRef = useRef<HTMLElement>(null);
  const { operationalSustainability } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const cards = gsap.utils.toArray<HTMLElement>("[data-sustainability-stat]");

      gsap.set(cards, { autoAlpha: 0, y: 24 });

      gsap.to(cards, {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <section
      id="operational-sustainability"
      ref={sectionRef}
      className="relative overflow-hidden bg-surface section-y"
    >
      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-14">
          <Reveal>
            <SectionHeading
              eyebrow={operationalSustainability.eyebrow}
              title={operationalSustainability.title}
            />
            <div className="mt-6 space-y-4">
              {operationalSustainability.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-7 text-on-surface-variant md:text-base">
                  {paragraph}
                </p>
              ))}
            </div>
            <Link
              href={operationalSustainability.cta.href}
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary outline-none transition-colors hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {operationalSustainability.cta.label}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {operationalSustainability.stats.map((stat) => (
              <article
                key={stat.id}
                data-sustainability-stat
                className="relative overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-lowest p-5 shadow-sm md:p-6"
              >
                <div className="mb-3 h-1 w-10 rounded-full bg-primary" aria-hidden="true" />
                <p className="font-display text-2xl font-extrabold tracking-tight text-primary md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm font-semibold text-on-surface">{stat.label}</p>
                {stat.detail ? (
                  <p className="mt-1.5 text-xs leading-6 text-on-surface-variant">{stat.detail}</p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorksContent } from "@/lib/content";
import { getHiwScrollStart } from "@/lib/motion/hiwScrollTrigger";
import { gsap, useGSAP } from "@/lib/motion/gsap";

export function HiwDeployment() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { deployment } = howItWorksContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.from("[data-deploy-phase]", {
          autoAlpha: 0,
          y: 24,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trackRef.current,
            start: getHiwScrollStart("deploymentReveal", false),
            once: true,
          },
        });

        gsap.fromTo(
          "[data-deploy-progress]",
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: trackRef.current,
              start: getHiwScrollStart("deploymentScrub", false),
              end: "bottom 50%",
              scrub: 0.6,
            },
          },
        );
      });

      mm.add("(max-width: 767px)", () => {
        gsap.from("[data-deploy-phase]", {
          autoAlpha: 0,
          y: 24,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: trackRef.current,
            start: getHiwScrollStart("deploymentReveal", true),
            once: true,
          },
        });

        gsap.fromTo(
          "[data-deploy-progress-mobile]",
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: trackRef.current,
              start: getHiwScrollStart("deploymentScrub", true),
              end: "bottom 40%",
              scrub: 0.6,
            },
          },
        );
      });

      return () => mm.revert();
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section ref={sectionRef} className="overflow-x-hidden bg-surface-low section-y">
      <Container>
        <SectionHeading
          eyebrow={deployment.eyebrow}
          title={deployment.title}
          description={deployment.description}
          align="center"
          className="mx-auto"
        />

        <div ref={trackRef} className="relative mx-auto mt-10 max-w-4xl md:mt-14">
          {/* Mobile: vertical timeline */}
          <div className="relative md:hidden">
            <div
              aria-hidden="true"
              className="absolute bottom-4 left-[1.125rem] top-4 w-0.5 overflow-hidden rounded-full bg-outline-variant/30"
            >
              <div
                data-deploy-progress-mobile
                className="h-full w-full origin-top bg-primary"
              />
            </div>

            <ol className="relative space-y-5">
              {deployment.phases.map((phase, index) => (
                <li key={phase.id}>
                  <article
                    data-deploy-phase
                    className="relative ml-10 rounded-lg border border-outline-variant/50 bg-surface-lowest p-4"
                  >
                    <span className="absolute -left-10 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary">
                      {index + 1}
                    </span>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                      {phase.week}
                    </p>
                    <h3 className="mt-1.5 text-base font-bold text-on-surface">{phase.title}</h3>
                    <p className="mt-1.5 text-xs leading-5 text-on-surface-variant">
                      {phase.description}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </div>

          {/* Desktop: horizontal phases */}
          <div className="relative hidden md:block">
            <div className="absolute left-0 right-0 top-8 h-1 overflow-hidden rounded-full bg-outline-variant/30">
              <div data-deploy-progress className="h-full w-full bg-primary" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              {deployment.phases.map((phase, index) => (
                <article
                  key={phase.id}
                  data-deploy-phase
                  className="relative rounded-lg border border-outline-variant/50 bg-surface-lowest p-5 pt-10"
                >
                  <span className="absolute left-1/2 top-0 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary">
                    {index + 1}
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                    {phase.week}
                  </p>
                  <h3 className="mt-2 text-base font-bold text-on-surface">{phase.title}</h3>
                  <p className="mt-1.5 text-xs leading-5 text-on-surface-variant">
                    {phase.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

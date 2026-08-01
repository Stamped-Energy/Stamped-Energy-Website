"use client";

import { useRef } from "react";

import { StepDiagram } from "@/components/how-it-works/diagrams/StepDiagram";
import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorksContent } from "@/lib/content";
import { animateDiagramPanel } from "@/lib/motion/animateDiagram";
import { hiwScrollStarts } from "@/lib/motion/hiwScrollTrigger";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { getPinScrollStart } from "@/lib/motion/pinLayout";
import { cn } from "@/lib/utils";

export function HiwPinnedJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(-1);
  const { journey } = howItWorksContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-journey-panel]");
        const stepNav = gsap.utils.toArray<HTMLElement>("[data-journey-step]");

        if (!panels.length) {
          return;
        }

        const setActivePanel = (index: number) => {
          panels.forEach((panel, panelIndex) => {
            const isActive = panelIndex === index;
            gsap.set(panel, {
              autoAlpha: isActive ? 1 : 0,
              visibility: isActive ? "visible" : "hidden",
              pointerEvents: isActive ? "auto" : "none",
            });
          });

          stepNav.forEach((step, stepIndex) => {
            const isActive = stepIndex === index;
            const tagline = step.querySelector<HTMLElement>("[data-journey-tagline]");

            gsap.set(step, {
              autoAlpha: isActive ? 1 : 0.55,
              scale: isActive ? 1.02 : 1,
            });

            if (tagline) {
              tagline.classList.toggle("hidden", !isActive);
            }

            step.classList.toggle("border-primary/50", isActive);
            step.classList.toggle("bg-primary/5", isActive);
            step.classList.toggle("shadow-md", isActive);
          });
        };

        const activateStep = (index: number) => {
          if (index === activeIndexRef.current) {
            return;
          }

          activeIndexRef.current = index;
          setActivePanel(index);
          requestAnimationFrame(() => {
            animateDiagramPanel(panels[index]);
          });
        };

        activateStep(0);

        const scrollTrigger = ScrollTrigger.create({
          trigger: pinRef.current,
          start: getPinScrollStart(),
          end: () => `+=${(panels.length - 1) * 100}%`,
          pin: pinRef.current,
          pinSpacing: true,
          scrub: 0.35,
          anticipatePin: 0,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.15, max: 0.35 },
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            const index = Math.min(
              Math.round(self.progress * (panels.length - 1)),
              panels.length - 1,
            );
            activateStep(index);
          },
        });

        return () => {
          scrollTrigger.kill();
          gsap.set(panels, { clearProps: "visibility,opacity,transform" });
          gsap.set(stepNav, { clearProps: "opacity,transform" });
        };
      });

      mm.add("(max-width: 1023px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-journey-panel-mobile]");

        panels.forEach((panel) => {
          const diagram = panel.querySelector<HTMLElement>("[data-step-diagram]");

          gsap.from(panel, {
            autoAlpha: 0,
            y: 36,
            duration: 0.75,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              start: hiwScrollStarts.journeyMobileFade.mobile,
              once: true,
            },
          });

          ScrollTrigger.create({
            trigger: diagram ?? panel,
            start: hiwScrollStarts.journeyMobileDiagram.mobile,
            once: true,
            onEnter: () => animateDiagramPanel(panel),
          });
        });
      });

      return () => mm.revert();
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section ref={sectionRef} className="overflow-x-hidden bg-surface-low">
      <Container className="pt-16 pb-6 md:pt-20 md:pb-8">
        <SectionHeading
          eyebrow={journey.eyebrow}
          title={journey.title}
          align="center"
          className="mx-auto"
        />
      </Container>

      <Container className="sr-only">
        <h2>How does Stamped Energy connect to my existing plant systems?</h2>
        <h2>How are prescriptions delivered to the plant floor team?</h2>
        <h2>How are energy savings verified with evidence?</h2>
      </Container>

      <div ref={pinRef} className="hidden lg:block">
        <Container className="w-full pb-12">
          <div className="grid grid-cols-12 items-center gap-10 xl:gap-14">
            <div className="col-span-3 flex flex-col gap-2 xl:col-span-3">
              {journey.steps.map((step, index) => (
                <div
                  key={step.id}
                  data-journey-step
                  className={cn(
                    "rounded-xl border border-outline-variant/40 bg-surface-lowest/95 px-4 py-3 transition-colors",
                    index === 0 && "border-primary/50 bg-primary/5 shadow-md",
                  )}
                >
                  <div className="flex items-baseline gap-3">
                    <p className="font-display text-2xl font-extrabold leading-none text-primary">
                      {String(step.step).padStart(2, "0")}
                    </p>
                    <p className="text-base font-bold text-on-surface">{step.title}</p>
                  </div>
                  <p
                    data-journey-tagline
                    className={cn(
                      "mt-1.5 text-sm leading-5 text-on-surface-variant",
                      index !== 0 && "hidden",
                    )}
                  >
                    {step.tagline}
                  </p>
                </div>
              ))}
            </div>

            <div className="relative col-span-9 min-h-[min(62vh,600px)] xl:col-span-9">
              {journey.steps.map((step, index) => (
                <article
                  key={step.id}
                  id={step.id}
                  data-journey-panel
                  className="absolute inset-0 grid grid-cols-1 items-center gap-8 xl:grid-cols-12 xl:gap-10"
                  style={{
                    visibility: index === 0 ? "visible" : "hidden",
                    opacity: index === 0 ? 1 : 0,
                  }}
                >
                  <div className="w-full xl:col-span-7 xl:min-w-0">
                    <StepDiagram diagram={step.diagram} />
                  </div>
                  <div className="max-w-sm xl:col-span-5">
                    <h3 className="text-2xl font-bold text-on-surface md:text-3xl">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm font-medium leading-6 text-on-surface-variant md:text-base">
                      {step.tagline}
                    </p>
                    {step.description ? (
                      <p className="mt-3 text-sm leading-6 text-on-surface-variant">
                        {step.description}
                      </p>
                    ) : null}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {step.bullets.map((bullet) => (
                        <span
                          key={bullet}
                          className="rounded-full border border-primary/25 bg-primary/8 px-3 py-1.5 text-xs font-medium text-on-surface md:text-sm"
                        >
                          {bullet}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <Container className="space-y-6 py-8 sm:space-y-8 sm:py-10 lg:hidden">
        {journey.steps.map((step) => (
          <article
            key={step.id}
            id={step.id}
            data-journey-panel-mobile
            className="min-w-0 overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-lowest"
          >
            <div data-step-diagram className="min-w-0 p-3 pb-0 sm:p-4">
              <StepDiagram diagram={step.diagram} />
            </div>
            <div className="p-4 pt-3 sm:p-5 sm:pt-4">
              <p className="font-display text-2xl font-extrabold text-primary">
                {String(step.step).padStart(2, "0")}
              </p>
              <h3 className="mt-1 text-lg font-bold text-on-surface">{step.title}</h3>
              <p className="mt-1 text-sm text-on-surface-variant">{step.tagline}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {step.bullets.map((bullet) => (
                  <span
                    key={bullet}
                    className="rounded-full border border-primary/25 bg-primary/8 px-2.5 py-1 text-xs font-medium text-on-surface"
                  >
                    {bullet}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </Container>
    </section>
  );
}

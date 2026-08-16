"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { hiwStageVisuals } from "@/components/motion-slots/HiwStageVisuals";
import { MotionSlot } from "@/components/ui/MotionSlot";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { landingContent } from "@/lib/content";
import { hiwScrollStarts } from "@/lib/motion/hiwScrollTrigger";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

function StepCopy({
  title,
  description,
  bullets,
}: {
  title: string;
  description: string;
  bullets: readonly string[];
}) {
  return (
    <div>
      <h3 className="font-display text-xl font-bold tracking-tight md:text-2xl lg:text-[1.65rem] lg:leading-tight">{title}</h3>
      <p className="mt-4 text-base leading-8 text-on-surface/80">{description}</p>
      <ul className="mt-6 space-y-3">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3 text-sm leading-6 text-on-surface/75 md:text-base">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HomeHowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const activeIndexRef = useRef(-1);
  const { homeHowItWorks } = landingContent;
  const steps = homeHowItWorks.steps;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-hiw-panel]");
        const stepNav = gsap.utils.toArray<HTMLElement>("[data-hiw-step]");

        if (!panels.length || !pinRef.current) {
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
            const num = step.querySelector<HTMLElement>("[data-hiw-step-num]");
            step.classList.toggle("text-on-surface", isActive);
            step.classList.toggle("text-on-surface/45", !isActive);
            if (num) {
              num.classList.toggle("bg-primary", isActive);
              num.classList.toggle("text-on-primary", isActive);
              num.classList.toggle("bg-on-surface/8", !isActive);
              num.classList.toggle("text-on-surface/70", !isActive);
            }
          });
        };

        const activateStep = (index: number) => {
          if (index === activeIndexRef.current) {
            return;
          }
          activeIndexRef.current = index;
          setActivePanel(index);
        };

        activateStep(0);

        const scrollTrigger = ScrollTrigger.create({
          trigger: pinRef.current,
          start: "center center",
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

        scrollTriggerRef.current = scrollTrigger;

        const onStepClick = (event: Event) => {
          const target = event.currentTarget as HTMLElement;
          const index = Number(target.dataset.hiwStepIndex);
          if (Number.isNaN(index) || !scrollTriggerRef.current) {
            return;
          }
          const progress = panels.length <= 1 ? 0 : index / (panels.length - 1);
          scrollTriggerRef.current.scroll(
            scrollTriggerRef.current.start +
              progress * (scrollTriggerRef.current.end - scrollTriggerRef.current.start),
          );
        };

        stepNav.forEach((step) => {
          step.addEventListener("click", onStepClick);
        });

        return () => {
          stepNav.forEach((step) => {
            step.removeEventListener("click", onStepClick);
          });
          scrollTrigger.kill();
          scrollTriggerRef.current = null;
          activeIndexRef.current = -1;
          gsap.set(panels, { clearProps: "visibility,opacity,transform,pointerEvents" });
        };
      });

      mm.add("(max-width: 1023px)", () => {
        const panels = gsap.utils.toArray<HTMLElement>("[data-hiw-panel-mobile]");

        panels.forEach((panel) => {
          gsap.from(panel, {
            autoAlpha: 0,
            y: 28,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: panel,
              start: hiwScrollStarts.journeyMobileFade.mobile,
              once: true,
            },
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
    <section
      ref={sectionRef}
      id="hiw"
      className="scroll-mt-24 overflow-x-hidden bg-surface-low"
    >
      <Container className="section-y pb-6 md:pb-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <SectionBadge label={homeHowItWorks.badge} />
          </div>
          <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
            {homeHowItWorks.title}
          </h2>
        </div>
      </Container>

      {/* Desktop pinned stage */}
      <div
        ref={pinRef}
        className={cn("hidden", !prefersReducedMotion && "lg:block")}
      >
        <Container className="w-full py-8 lg:py-10">
          <div className="grid w-full grid-cols-12 items-center gap-8 xl:gap-10">
            <nav
              aria-label="How it works steps"
              className="col-span-2 flex flex-col gap-0"
            >
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  type="button"
                  data-hiw-step
                  data-hiw-step-index={index}
                  className={cn(
                    "flex w-full items-center gap-3 border-b border-outline-variant/35 py-5 text-left transition-colors",
                    index === 0 ? "text-on-surface" : "text-on-surface/45",
                  )}
                >
                  <span
                    data-hiw-step-num
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-xs font-bold",
                      index === 0
                        ? "bg-primary text-on-primary"
                        : "bg-on-surface/8 text-on-surface/70",
                    )}
                  >
                    {step.step}
                  </span>
                  <span className="text-sm font-semibold tracking-tight md:text-base">
                    {step.label}
                  </span>
                </button>
              ))}
            </nav>

            <div className="relative col-span-10 min-h-[min(68vh,620px)]">
              {steps.map((step, index) => {
                const Visual = hiwStageVisuals[index];
                return (
                <article
                  key={step.id}
                  data-hiw-panel
                  className="absolute inset-0 grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(220px,0.72fr)_minmax(0,1.55fr)] lg:gap-8"
                  style={{
                    visibility: index === 0 ? "visible" : "hidden",
                    opacity: index === 0 ? 1 : 0,
                  }}
                >
                  <StepCopy
                    title={step.title}
                    description={step.description}
                    bullets={step.bullets}
                  />
                  <MotionSlot
                    label={`${step.label} visual`}
                    aspectClassName="aspect-[16/10] w-full"
                  >
                    {Visual ? <Visual /> : null}
                  </MotionSlot>
                </article>
                );
              })}
            </div>
          </div>
        </Container>
      </div>

      {/* Mobile / reduced-motion stacked steps */}
      <Container
        className={cn(
          "space-y-8 pb-16 pt-2",
          prefersReducedMotion ? "block" : "lg:hidden",
        )}
      >
        {steps.map((step, index) => {
          const Visual = hiwStageVisuals[index];
          return (
          <article
            key={step.id}
            data-hiw-panel-mobile
            className="border-t border-outline-variant/40 pt-8"
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-primary text-xs font-bold text-on-primary">
                {step.step}
              </span>
              <span className="text-sm font-semibold tracking-tight">{step.label}</span>
            </div>
            <div className="grid gap-6">
              <StepCopy
                title={step.title}
                description={step.description}
                bullets={step.bullets}
              />
              <MotionSlot
                label={`${step.label} visual`}
                aspectClassName="aspect-[16/10] w-full"
              >
                {Visual ? <Visual /> : null}
              </MotionSlot>
            </div>
          </article>
          );
        })}
      </Container>
    </section>
  );
}

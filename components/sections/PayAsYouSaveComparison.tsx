"use client";

import { useRef } from "react";

import { PayAsYouSaveChartVisual } from "@/components/sections/comparison/PayAsYouSaveChartVisual";
import { useMotion } from "@/components/motion/MotionProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

function ApproachCard({
  approach,
  isStamped,
}: {
  approach: (typeof landingContent.payAsYouSave.approaches)[number];
  isStamped: boolean;
}) {
  return (
    <article
      data-pay-card
      className={cn(
        "overflow-hidden rounded-2xl border bg-surface-lowest shadow-sm",
        isStamped
          ? "order-1 border-2 border-primary/35 shadow-[0_16px_40px_-28px_color-mix(in_srgb,var(--brand-primary)_50%,transparent)] md:order-2"
          : "order-3 border-outline-variant/60 md:order-1",
      )}
    >
      <div
        className={cn(
          "border-b px-4 py-3.5 sm:px-5 sm:py-4",
          isStamped
            ? "border-primary/20 bg-primary/10"
            : "border-outline-variant/50 bg-surface-dim/60",
        )}
      >
        <div className="flex flex-wrap items-center gap-2">
          <h3
            className={cn(
              "text-base font-bold sm:text-lg",
              isStamped ? "text-on-surface" : "text-on-surface-variant",
            )}
          >
            {approach.label}
          </h3>
          {isStamped ? (
            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-on-primary">
              Recommended
            </span>
          ) : null}
        </div>
        <p className="mt-1.5 text-sm leading-6 text-on-surface-variant">{approach.description}</p>
      </div>

      <div className="p-2.5 sm:p-3 md:p-4">
        <div className="overflow-hidden rounded-xl border border-outline-variant/40 bg-surface-low/60 p-2 sm:p-3">
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary sm:mb-2 sm:text-xs">
            Investment vs return
          </p>
          <PayAsYouSaveChartVisual variant={approach.variant} />
        </div>
      </div>
    </article>
  );
}

export function PayAsYouSaveComparison() {
  const sectionRef = useRef<HTMLElement>(null);
  const { payAsYouSave } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  const [traditional, stamped] = payAsYouSave.approaches;

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || !sectionRef.current) {
        return;
      }

      const cardTween = gsap.from("[data-pay-card]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.65,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const benefitTween = gsap.from("[data-pay-benefit]", {
        autoAlpha: 0,
        y: 16,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-pay-benefits]",
          start: "top 90%",
          once: true,
        },
      });

      return () => {
        cardTween.scrollTrigger?.kill();
        cardTween.kill();
        benefitTween.scrollTrigger?.kill();
        benefitTween.kill();
      };
    },
    {
      scope: sectionRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <section ref={sectionRef} id="pay-as-you-save" className="relative overflow-hidden bg-surface-low py-10 md:section-y">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-primary/30"
      />

      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={payAsYouSave.eyebrow}
            title={payAsYouSave.title}
            description={payAsYouSave.description}
            align="center"
            className="mx-auto max-w-2xl"
          />
        </Reveal>

        <div className="relative mx-auto mt-6 flex max-w-6xl flex-col gap-3 md:mt-10 md:grid md:grid-cols-2 md:gap-8 lg:gap-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-outline-variant/60 bg-surface-lowest text-xs font-bold uppercase tracking-wide text-primary shadow-sm md:flex"
          >
            vs
          </div>

          <ApproachCard approach={stamped} isStamped />

          <div className="order-2 flex items-center justify-center py-0.5 md:hidden" aria-hidden="true">
            <span className="rounded-full border border-outline-variant/60 bg-surface-lowest px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary shadow-sm">
              vs
            </span>
          </div>

          <ApproachCard approach={traditional} isStamped={false} />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-1 text-[11px] font-medium uppercase tracking-[0.1em] text-on-surface-variant sm:mt-8 sm:gap-x-6 sm:text-xs sm:tracking-[0.12em]">
          {payAsYouSave.legend.map((item, index) => (
            <span key={item} className="inline-flex items-center gap-1.5 sm:gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="hidden text-outline-variant sm:inline">
                  ·
                </span>
              ) : null}
              {item === "Investment" ? (
                <span
                  aria-hidden="true"
                  className="inline-block h-2 w-2 rounded-sm bg-[var(--brand-on-secondary-container)] sm:h-2.5 sm:w-2.5"
                />
              ) : item === "ROI" ? (
                <span
                  aria-hidden="true"
                  className="inline-block h-0.5 w-4 rounded-full bg-primary sm:w-5"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="inline-block h-2 w-2 rounded-full bg-primary sm:h-2.5 sm:w-2.5"
                />
              )}
              {item}
            </span>
          ))}
        </div>

        <div
          data-pay-benefits
          className="mx-auto mt-8 grid max-w-4xl gap-3 sm:mt-10 sm:gap-4 md:grid-cols-3 md:gap-5"
        >
          {payAsYouSave.benefits.map((benefit) => (
            <article
              key={benefit.id}
              data-pay-benefit
              className="rounded-xl border border-outline-variant/50 bg-surface-lowest px-4 py-3.5 sm:p-5 md:text-center"
            >
              <h4 className="font-display text-sm font-bold text-on-surface sm:text-base">
                {benefit.title}
              </h4>
              <p className="mt-1.5 text-sm leading-6 text-on-surface-variant sm:mt-2">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>

        <Reveal className="mt-8 flex justify-center sm:mt-10">
          <Button href={payAsYouSave.cta.href} variant="primary" className="w-full sm:w-auto">
            {payAsYouSave.cta.label}
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

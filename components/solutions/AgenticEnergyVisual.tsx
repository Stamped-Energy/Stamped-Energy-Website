"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: "signals",
    label: "Signals",
    detail: "Meters · SCADA · bills",
    body: "Incomer, sub-meters, SCADA tags, and bills stream into one energy graph. No hardware retrofit required to start.",
  },
  {
    id: "detect",
    label: "Detect",
    detail: "ML anomalies",
    body: "Models flag co-starts, idle draw, tariff misalignment, and load-shape drift as they appear across the plant.",
  },
  {
    id: "decide",
    label: "Decide",
    detail: "Industry standards",
    body: "Actions are ranked against MD practice, tariff windows, and plant constraints so the next step is clear.",
  },
  {
    id: "prescribe",
    label: "Prescribe",
    detail: "Owner · ₹ impact",
    body: "An assigned prescription lands with who owns it, effort, and monthly rupee impact. Verified with evidence.",
  },
] as const;

type StepId = (typeof STEPS)[number]["id"];

type AgenticEnergyVisualProps = {
  className?: string;
  activePointIndex?: number;
  onActivePointChange?: (index: number) => void;
};

export function AgenticEnergyVisual({
  className,
  activePointIndex,
  onActivePointChange,
}: AgenticEnergyVisualProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const controlled = typeof activePointIndex === "number";
  const [internalId, setInternalId] = useState<StepId>("signals");
  const [autoPlay, setAutoPlay] = useState(!controlled);
  const { isReady, prefersReducedMotion } = useMotion();

  const activeIndex = controlled
    ? Math.min(Math.max(activePointIndex, 0), STEPS.length - 1)
    : STEPS.findIndex((step) => step.id === internalId);
  const safeIndex = activeIndex < 0 ? 0 : activeIndex;
  const activeStep = STEPS[safeIndex] ?? STEPS[0];

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || !rootRef.current) {
        return;
      }

      const nodes = gsap.utils.toArray<HTMLElement>("[data-pipeline-node]");
      gsap.from(nodes, {
        autoAlpha: 0,
        y: 20,
        scale: 0.92,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
        clearProps: "transform",
      });
    },
    { scope: rootRef, dependencies: [isReady, prefersReducedMotion] },
  );

  useEffect(() => {
    if (!autoPlay || prefersReducedMotion || controlled) {
      return;
    }

    const timer = window.setInterval(() => {
      setInternalId((current) => {
        const index = STEPS.findIndex((step) => step.id === current);
        const next = STEPS[(index + 1) % STEPS.length];
        return next?.id ?? "signals";
      });
    }, 2800);

    return () => window.clearInterval(timer);
  }, [autoPlay, prefersReducedMotion, controlled]);

  useEffect(() => {
    if (!isReady || prefersReducedMotion || !rootRef.current) {
      return;
    }

    const panel = rootRef.current.querySelector<HTMLElement>("[data-step-panel]");
    const fill = rootRef.current.querySelector<HTMLElement>("[data-progress-fill]");
    if (panel) {
      gsap.fromTo(
        panel,
        { autoAlpha: 0.35, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" },
      );
    }
    if (fill) {
      gsap.to(fill, {
        width: `${((safeIndex + 1) / STEPS.length) * 100}%`,
        duration: 0.45,
        ease: "power2.out",
      });
    }
  }, [safeIndex, isReady, prefersReducedMotion]);

  const selectStep = useCallback(
    (index: number) => {
      setAutoPlay(false);
      const step = STEPS[index];
      if (!step) {
        return;
      }
      if (controlled) {
        onActivePointChange?.(index);
      } else {
        setInternalId(step.id);
      }
    },
    [controlled, onActivePointChange],
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "overflow-hidden border border-on-secondary/20 bg-secondary text-on-secondary",
        className,
      )}
    >
      <div className="flex flex-col gap-2 border-b border-on-secondary/15 px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:px-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-inverse-primary">
          Agentic loop · tap a step
        </p>
        {!controlled ? (
          <button
            type="button"
            className="min-h-10 w-fit px-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-on-secondary/60 transition-colors hover:text-on-secondary"
            onClick={() => setAutoPlay((value) => !value)}
          >
            {autoPlay ? "Pause autoplay" : "Resume autoplay"}
          </button>
        ) : (
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-on-secondary/55">
            Synced with points
          </p>
        )}
      </div>

      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <div className="mb-6 h-1 overflow-hidden rounded-full bg-on-secondary/15">
          <div
            data-progress-fill
            className="h-full bg-primary"
            style={{ width: `${((safeIndex + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 md:gap-4">
          {STEPS.map((step, index) => {
            const isActive = index === safeIndex;
            return (
              <li key={step.id}>
                <button
                  type="button"
                  data-pipeline-node
                  onClick={() => selectStep(index)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex min-h-14 w-full flex-row items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors duration-200 sm:min-h-0 sm:flex-col sm:gap-0 sm:px-2 sm:py-4 sm:text-center",
                    isActive
                      ? "border-primary bg-primary/15"
                      : "border-on-secondary/20 bg-secondary hover:border-on-secondary/40 hover:bg-on-secondary/5",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-full border font-display text-sm font-bold",
                      isActive
                        ? "border-primary bg-primary text-on-primary"
                        : "border-on-secondary/30 text-on-secondary",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex min-w-0 flex-col sm:mt-3 sm:items-center">
                    <span className="font-display text-sm font-bold">{step.label}</span>
                    <span className="mt-0.5 text-xs text-on-secondary/65 sm:mt-1">{step.detail}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div
          data-step-panel
          className="mt-6 border border-on-secondary/20 bg-on-secondary/5 px-4 py-4 sm:px-5 sm:py-5"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-inverse-primary">
            {activeStep.label}
          </p>
          <p className="mt-2 text-sm leading-7 text-on-secondary/85">{activeStep.body}</p>
        </div>
      </div>
    </div>
  );
}

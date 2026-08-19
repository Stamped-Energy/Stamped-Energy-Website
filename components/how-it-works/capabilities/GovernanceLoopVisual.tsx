"use client";

import { useMemo, useRef } from "react";

import { useCompactVisual } from "@/components/how-it-works/capabilities/useCompactVisual";
import { useMotion } from "@/components/motion/MotionProvider";
import { getHiwScrollStart } from "@/lib/motion/hiwScrollTrigger";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

const VIEW_W = 800;
const VIEW_H = 560;

type GovLayout = {
  square: {
    left: number;
    right: number;
    top: number;
    bottom: number;
    cx: number;
    cy: number;
  };
  verifyBoxEdge: number;
  ledgerCardTop: number;
  ledgerCardCenter: number;
  arrowEnd: number;
};

function buildLayout(compact: boolean): GovLayout {
  if (!compact) {
    const square = { left: 188, right: 612, top: 72, bottom: 352, cx: 400, cy: 212 };
    const ledgerCardTop = square.bottom + 124;
    return {
      square,
      verifyBoxEdge: square.bottom + 34,
      ledgerCardTop,
      ledgerCardCenter: square.bottom + 160,
      arrowEnd: ledgerCardTop - 8,
    };
  }

  const square = { left: 252, right: 548, top: 88, bottom: 262, cx: 400, cy: 175 };
  const ledgerCardTop = square.bottom + 116;
  return {
    square,
    verifyBoxEdge: square.bottom + 28,
    ledgerCardTop,
    ledgerCardCenter: square.bottom + 154,
    arrowEnd: ledgerCardTop - 8,
  };
}

const TIMING = {
  segmentDraw: 0.38,
  segmentStagger: 0.07,
  stepsAt: 0.28,
  stepStagger: 0.1,
  stepPop: 0.36,
  highlightAt: 0.9,
  highlightStagger: 0.72,
  highlightIn: 0.3,
  highlightOut: 0.22,
  arrowAt: 3.95,
  arrowDraw: 0.55,
  ledgerAt: 4.35,
  ledgerPop: 0.42,
  barFill: 0.48,
} as const;

function toPercent(x: number, y: number) {
  return {
    left: `${(x / VIEW_W) * 100}%`,
    top: `${(y / VIEW_H) * 100}%`,
  };
}

export function GovernanceLoopVisual() {
  const stageRef = useRef<HTMLDivElement>(null);
  const ledgerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const compact = useCompactVisual();
  const { isReady, prefersReducedMotion } = useMotion();

  const layout = useMemo(() => buildLayout(compact), [compact]);
  const { square } = layout;

  const loopSegments = useMemo(
    () => [
      { id: "assign-notify", d: `M ${square.left} ${square.cy} L ${square.cx} ${square.top}` },
      { id: "notify-track", d: `M ${square.cx} ${square.top} L ${square.right} ${square.cy}` },
      { id: "track-verify", d: `M ${square.right} ${square.cy} L ${square.cx} ${square.bottom}` },
      { id: "verify-assign", d: `M ${square.cx} ${square.bottom} L ${square.left} ${square.cy}` },
    ],
    [square],
  );

  const verifyToLedger = `M ${square.cx} ${layout.verifyBoxEdge} L ${square.cx} ${layout.arrowEnd}`;

  const steps = useMemo(
    () => [
      { id: "assign", label: "Assign", sub: "Owner set", x: square.left, y: square.cy },
      { id: "notify", label: "WhatsApp", sub: "To the floor", x: square.cx, y: square.top },
      { id: "verify", label: "Verify", sub: "Evidence", x: square.right, y: square.cy },
      { id: "improve", label: "Improve", sub: "Human-gated", x: square.cx, y: square.bottom },
    ],
    [square],
  );

  const ledgerPos = toPercent(square.cx, layout.ledgerCardCenter);

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || !stageRef.current) {
        return;
      }

      const scope = stageRef.current;
      const segments = gsap.utils.toArray<SVGPathElement>("[data-gov-segment]", scope);
      const arrow = scope.querySelector<SVGPathElement>("[data-gov-arrow]");
      const stepEls = gsap.utils.toArray<HTMLElement>("[data-gov-step]", scope);

      segments.forEach((segment) => {
        const length = segment.getTotalLength();
        segment.setAttribute("stroke-dasharray", String(length));
        gsap.set(segment, { strokeDashoffset: length, autoAlpha: 0.45 });
      });

      if (arrow) {
        const length = arrow.getTotalLength();
        arrow.setAttribute("stroke-dasharray", String(length));
        gsap.set(arrow, { strokeDashoffset: length, autoAlpha: 0 });
      }

      gsap.set(stepEls, { autoAlpha: 0, scale: 0.84 });
      gsap.set("[data-gov-step-active]", { autoAlpha: 0, scale: 0.88 });
      gsap.set("[data-gov-arrow-head]", { autoAlpha: 0 });
      gsap.set(ledgerRef.current, { autoAlpha: 0, scale: 0.82, y: -12 });
      gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left center" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: getHiwScrollStart("capabilityDiagram", compact),
          once: true,
        },
      });

      segments.forEach((segment, index) => {
        timeline.to(
          segment,
          {
            strokeDashoffset: 0,
            autoAlpha: 1,
            duration: TIMING.segmentDraw,
            ease: "power2.inOut",
          },
          index * TIMING.segmentStagger,
        );
      });

      stepEls.forEach((step, index) => {
        timeline.to(
          step,
          { autoAlpha: 1, scale: 1, duration: TIMING.stepPop, ease: "back.out(1.5)" },
          TIMING.stepsAt + index * TIMING.stepStagger,
        );
      });

      stepEls.forEach((step, index) => {
        const ring = step.querySelector<HTMLElement>("[data-gov-step-active]");
        const highlightAt = TIMING.highlightAt + index * TIMING.highlightStagger;

        timeline.to(
          ring,
          { autoAlpha: 1, scale: 1, duration: TIMING.highlightIn, ease: "power2.out" },
          highlightAt,
        );
        timeline.to(
          step,
          {
            borderColor: "color-mix(in srgb, var(--brand-primary) 55%, var(--brand-outline-variant))",
            duration: TIMING.highlightIn,
            ease: "power2.out",
          },
          highlightAt,
        );
        timeline.to(
          ring,
          { autoAlpha: 0, duration: TIMING.highlightOut, ease: "power2.out" },
          highlightAt + TIMING.highlightIn + 0.18,
        );
      });

      if (arrow) {
        timeline.to(
          arrow,
          {
            strokeDashoffset: 0,
            autoAlpha: 1,
            duration: TIMING.arrowDraw,
            ease: "power2.in",
          },
          TIMING.arrowAt,
        );
      }

      timeline.to(
        "[data-gov-arrow-head]",
        { autoAlpha: 1, duration: 0.22, ease: "power2.in" },
        TIMING.arrowAt + TIMING.arrowDraw - 0.12,
      );

      timeline.to(
        ledgerRef.current,
        { autoAlpha: 1, scale: 1, y: 0, duration: TIMING.ledgerPop, ease: "back.out(1.6)" },
        TIMING.ledgerAt,
      );

      timeline.to(
        barRef.current,
        { scaleX: 1, duration: TIMING.barFill, ease: "power2.inOut" },
        TIMING.ledgerAt + 0.14,
      );

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    { scope: stageRef, dependencies: [isReady, prefersReducedMotion, compact, layout] },
  );

  return (
    <div ref={stageRef} className="relative h-full w-full overflow-hidden bg-surface-lowest px-1 sm:px-0">
      <div className={cn("relative mx-auto h-full w-full origin-center", compact ? "scale-[0.92]" : "scale-100")}>
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {loopSegments.map((segment) => (
            <path
              key={segment.id}
              data-gov-segment
              d={segment.d}
              fill="none"
              stroke="var(--brand-primary)"
              strokeWidth="2.5"
              strokeOpacity="0.45"
              strokeLinecap="round"
            />
          ))}

          {[
            { x: square.cx, y: square.top + 16, rot: 90 },
            { x: square.right - 16, y: square.cy, rot: 0 },
            { x: square.cx, y: square.bottom - 16, rot: 270 },
            { x: square.left + 16, y: square.cy, rot: 180 },
          ].map((head, index) => (
            <polygon
              key={index}
              points="0,-6 12,0 0,6"
              fill="var(--brand-primary)"
              fillOpacity="0.55"
              transform={`translate(${head.x} ${head.y}) rotate(${head.rot})`}
            />
          ))}

          <path
            data-gov-arrow
            d={verifyToLedger}
            fill="none"
            stroke="var(--brand-primary)"
            strokeWidth="2.25"
            strokeOpacity="0.6"
            strokeLinecap="round"
          />
          <polygon
            data-gov-arrow-head
            points={`${square.cx},${layout.arrowEnd + 2} ${square.cx - 8},${layout.arrowEnd - 10} ${square.cx + 8},${layout.arrowEnd - 10}`}
            fill="var(--brand-primary)"
            fillOpacity="0.75"
          />
        </svg>

        {steps.map((step) => {
          const pos = toPercent(step.x, step.y);
          return (
            <article
              key={step.id}
              data-gov-step
              className={cn(
                "absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg border border-outline-variant/50 bg-surface-lowest text-center shadow-sm",
                compact ? "w-[4rem] px-1.5 py-1.5" : "w-[5.25rem] px-2 py-1.5 md:w-[5.75rem] md:py-2",
              )}
              style={{ left: pos.left, top: pos.top }}
            >
              <span
                data-gov-step-active
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-lg bg-primary/8"
              />
              <span className={cn("relative font-bold text-on-surface", compact ? "text-[9px]" : "text-[10px] md:text-[11px]")}>
                {step.label}
              </span>
              <span className={cn("relative mt-0.5 text-on-surface-variant", compact ? "text-[7px]" : "text-[8px] md:text-[9px]")}>
                {step.sub}
              </span>
            </article>
          );
        })}

        <div
          ref={ledgerRef}
          className={cn(
            "absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-primary/40 bg-surface-lowest px-3 py-2.5 shadow-[0_14px_40px_-18px_color-mix(in_srgb,var(--brand-primary)_50%,transparent)] sm:px-4 sm:py-3.5",
            compact ? "w-[min(84%,10.5rem)]" : "w-[min(72%,15rem)] md:py-3.5",
          )}
          style={{ left: ledgerPos.left, top: ledgerPos.top }}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="text-left">
              <p className={cn("font-bold uppercase tracking-[0.12em] text-primary", compact ? "text-[9px]" : "text-[10px] md:text-[11px]")}>
                Verified with evidence
              </p>
              <p className={cn("mt-0.5 text-on-surface-variant", compact ? "text-[8px]" : "text-[9px] md:text-[10px]")}>
                Expected vs observed
              </p>
            </div>
            <span className="shrink-0 rounded-lg bg-primary/10 px-2 py-0.5 text-sm font-extrabold text-primary">
              ₹
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-outline-variant/25">
            <div ref={barRef} className="h-full w-full rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

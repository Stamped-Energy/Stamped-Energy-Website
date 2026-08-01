"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

const VIEW_W = 800;
const VIEW_H = 440;
const BASELINE = 340;
const CHART_LEFT = 48;
const CHART_RIGHT = 752;

/** Position along the Stamped ROI path where scale begins (after verified savings). */
const SCALE_PATH_RATIO = 0.64;

type BarSpec = { id: string; x: number; height: number };

const TRADITIONAL_BARS: BarSpec[] = [
  { id: "t1", x: 108, height: 200 },
  { id: "t2", x: 188, height: 168 },
  { id: "t3", x: 268, height: 128 },
  { id: "t4", x: 348, height: 88 },
  { id: "t5", x: 428, height: 64 },
  { id: "t6", x: 508, height: 48 },
];

const STAMPED_BARS: BarSpec[] = [
  { id: "s1", x: 148, height: 96 },
  { id: "s2", x: 248, height: 28 },
  { id: "s3", x: 348, height: 28 },
  { id: "s4", x: 448, height: 28 },
  { id: "s5", x: 548, height: 28 },
  { id: "s6", x: 648, height: 28 },
];

const TRADITIONAL_ROI =
  "M48,340 C88,340 108,334 148,322 C188,310 228,292 288,268 C348,244 408,212 468,172 C528,132 588,96 648,68 C688,48 720,32 752,20";

const STAMPED_ROI =
  "M48,340 C96,340 120,332 160,312 C200,292 248,260 308,216 C368,172 428,124 488,80 C548,44 608,24 668,12 C708,4 732,0 752,0";

const INTRO = {
  grid: 0.65,
  barStagger: 0.08,
  barGrow: 0.52,
  barsAt: 0.35,
  fillAt: 1.05,
  fillDur: 0.75,
  lineAt: 0.75,
  lineDraw: 2.1,
  scaleAt: 2.65,
  scalePop: 0.55,
} as const;

type PayAsYouSaveChartVisualProps = {
  variant: "traditional" | "stamped";
  className?: string;
};

export function PayAsYouSaveChartVisual({ variant, className }: PayAsYouSaveChartVisualProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const { isReady, prefersReducedMotion } = useMotion();
  const isStamped = variant === "stamped";
  const bars = isStamped ? STAMPED_BARS : TRADITIONAL_BARS;
  const roiPath = isStamped ? STAMPED_ROI : TRADITIONAL_ROI;

  useGSAP(
    () => {
      if (!isReady || !stageRef.current) {
        return;
      }

      const scope = stageRef.current;
      const line = scope.querySelector<SVGPathElement>("[data-pay-roi-line]");
      const scaleGroup = scope.querySelector<SVGGElement>("[data-pay-scale-group]");

      if (isStamped && line && scaleGroup) {
        const scalePoint = line.getPointAtLength(line.getTotalLength() * SCALE_PATH_RATIO);
        scaleGroup.setAttribute("transform", `translate(${scalePoint.x}, ${scalePoint.y})`);
      }

      if (prefersReducedMotion) {
        gsap.set("[data-pay-grid]", { autoAlpha: 1 });
        gsap.set("[data-pay-bar]", { scaleY: 1 });
        gsap.set("[data-pay-roi-fill]", { autoAlpha: isStamped ? 0.14 : 0.08 });
        gsap.set("[data-pay-roi-line]", { strokeDashoffset: 0, autoAlpha: 1 });
        gsap.set("[data-pay-scale-group]", { autoAlpha: isStamped ? 1 : 0, scale: 1 });
        return;
      }

      if (line) {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length, autoAlpha: 1 });
      }

      gsap.set("[data-pay-grid]", { autoAlpha: 0 });
      gsap.set("[data-pay-bar]", { scaleY: 0, transformOrigin: "50% 100%" });
      gsap.set("[data-pay-roi-fill]", { autoAlpha: 0 });
      gsap.set("[data-pay-scale-group]", { autoAlpha: 0, scale: 0 });

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: "top 72%",
          once: true,
        },
      });

      intro.to("[data-pay-grid]", { autoAlpha: 1, duration: INTRO.grid, ease: "power2.out" });

      intro.to(
        "[data-pay-bar]",
        {
          scaleY: 1,
          duration: INTRO.barGrow,
          stagger: INTRO.barStagger,
          ease: "power2.out",
        },
        INTRO.barsAt,
      );

      intro.to(
        "[data-pay-roi-fill]",
        { autoAlpha: isStamped ? 0.14 : 0.08, duration: INTRO.fillDur, ease: "power2.out" },
        INTRO.fillAt,
      );

      if (line) {
        intro.to(
          line,
          { strokeDashoffset: 0, duration: INTRO.lineDraw, ease: "power2.inOut" },
          INTRO.lineAt,
        );
      }

      if (isStamped) {
        intro.to(
          "[data-pay-scale-group]",
          { autoAlpha: 1, scale: 1, duration: INTRO.scalePop, ease: "back.out(2)" },
          INTRO.scaleAt,
        );
      }

      return () => {
        intro.scrollTrigger?.kill();
        intro.kill();
      };
    },
    { scope: stageRef, dependencies: [isReady, prefersReducedMotion, variant] },
  );

  return (
    <div
      ref={stageRef}
      className={cn(
        "relative h-full min-h-[168px] w-full overflow-hidden bg-surface-lowest sm:min-h-[220px] md:min-h-[260px]",
        className,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={
          isStamped
            ? "Chart: moderate pilot investment with faster return and scale point"
            : "Chart: high upfront investment with delayed return"
        }
      >
        <g data-pay-grid opacity="0">
          {[260, 220, 180, 140, 100].map((y) => (
            <line
              key={y}
              x1={CHART_LEFT}
              y1={y}
              x2={CHART_RIGHT}
              y2={y}
              stroke="var(--brand-outline-variant)"
              strokeOpacity={0.22}
              strokeWidth={1}
              strokeDasharray={y === BASELINE ? undefined : "5 7"}
            />
          ))}
          <line
            x1={CHART_LEFT}
            y1={BASELINE}
            x2={CHART_RIGHT}
            y2={BASELINE}
            stroke="var(--brand-outline-variant)"
            strokeOpacity={0.45}
            strokeWidth={1.5}
          />
          <text
            x={CHART_LEFT}
            y={56}
            className="fill-[var(--brand-on-surface-variant)] text-[11px] font-semibold uppercase tracking-[0.1em]"
          >
            Return on investment
          </text>
          <text
            x={CHART_LEFT}
            y={BASELINE + 28}
            className="fill-[var(--brand-on-surface-variant)] text-[11px] font-semibold uppercase tracking-[0.08em]"
          >
            Time →
          </text>
        </g>

        {bars.map((bar) => (
          <g key={bar.id} transform={`translate(${bar.x}, ${BASELINE})`}>
            <rect
              data-pay-bar
              x={-20}
              y={-bar.height}
              width={40}
              height={bar.height}
              fill="var(--brand-on-secondary-container)"
            />
          </g>
        ))}

        <path
          data-pay-roi-fill
          d={`${roiPath} L752,${BASELINE} L48,${BASELINE} Z`}
          fill="var(--brand-primary)"
          fillOpacity="0.12"
          opacity={0}
        />

        <path
          data-pay-roi-line
          d={roiPath}
          fill="none"
          stroke="var(--brand-primary)"
          strokeWidth={3.25}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {isStamped ? (
          <g data-pay-scale-group opacity={0}>
            <circle
              data-pay-scale-dot
              cx={0}
              cy={0}
              r={11}
              fill="var(--brand-surface-lowest)"
              stroke="var(--brand-primary)"
              strokeWidth={2.75}
            />
            <circle cx={0} cy={0} r={4.5} fill="var(--brand-primary)" />
            <text
              x={0}
              y={-36}
              textAnchor="middle"
              className="fill-[var(--brand-primary)] text-[11px] font-bold uppercase tracking-[0.08em]"
            >
              Scale
            </text>
          </g>
        ) : null}
      </svg>
    </div>
  );
}

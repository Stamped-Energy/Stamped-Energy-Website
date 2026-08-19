"use client";

import { useRef } from "react";

import { useCompactVisual } from "@/components/how-it-works/capabilities/useCompactVisual";
import { useMotion } from "@/components/motion/MotionProvider";
import { getHiwScrollStart } from "@/lib/motion/hiwScrollTrigger";
import { gsap, useGSAP } from "@/lib/motion/gsap";

const VIEW_W = 800;
const VIEW_H = 560;

/** Expanded chart area - uses more of the card. */
const CHART = { left: 36, right: 768, top: 56, bottom: 448, baselineY: 348 };

const CONSUMPTION_LINE =
  "36,348 148,322 238,334 332,326 418,330 502,132 592,328 682,316 768,324";

const BASELINE_BAND =
  `${CHART.left},${CHART.baselineY} ${CHART.right},${CHART.baselineY} ${CHART.right},${CHART.baselineY + 42} ${CHART.left},${CHART.baselineY + 42}`;

const SPIKE = { x: 502, y: 132 };

/** ~5s total: grid → line → anomaly → prescription. */
const TIMING = {
  gridFade: 0.68,
  bandAt: 0.53,
  bandFade: 0.83,
  lineDraw: 2.05,
  lineAt: 0.38,
  spikeAt: 2.36,
  spikePop: 0.53,
  spikePulse: 0.83,
  spikeRingFade: 0.98,
  rxAt: 3.22,
  rxSlide: 1.14,
  impactAt: 4.17,
  impactPop: 0.83,
} as const;

export function IntelligenceChartVisual() {
  const stageRef = useRef<HTMLDivElement>(null);
  const rxRef = useRef<HTMLDivElement>(null);
  const compact = useCompactVisual();
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || !stageRef.current) {
        return;
      }

      const scope = stageRef.current;
      const line = scope.querySelector<SVGPolylineElement>("[data-intel-chart-line]");

      if (line) {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      }

      gsap.set("[data-intel-grid]", { autoAlpha: 0 });
      gsap.set("[data-intel-band]", { autoAlpha: 0 });
      gsap.set("[data-intel-spike-ring]", { autoAlpha: 0, scale: 0.6 });
      gsap.set("[data-intel-spike-dot]", { autoAlpha: 0, scale: 0 });
      gsap.set(rxRef.current, { autoAlpha: 0, x: 24, y: 10 });
      gsap.set("[data-intel-impact]", { autoAlpha: 0, scale: 0.85 });
      gsap.set("[data-intel-reject]", { autoAlpha: 0, y: 8 });
      gsap.set("[data-intel-score]", { autoAlpha: 0, y: 8 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: getHiwScrollStart("capabilityDiagram", compact),
          once: true,
        },
      });

      timeline.to("[data-intel-grid]", {
        autoAlpha: 1,
        duration: TIMING.gridFade,
        ease: "power2.out",
      });

      timeline.to(
        "[data-intel-band]",
        { autoAlpha: 1, duration: TIMING.bandFade, ease: "power2.out" },
        TIMING.bandAt,
      );

      if (line) {
        timeline.to(
          line,
          { strokeDashoffset: 0, duration: TIMING.lineDraw, ease: "power2.inOut" },
          TIMING.lineAt,
        );
      }

      timeline.to(
        "[data-intel-spike-dot]",
        { autoAlpha: 1, scale: 1, duration: TIMING.spikePop, ease: "back.out(2)" },
        TIMING.spikeAt,
      );

      timeline.to(
        "[data-intel-spike-ring]",
        { autoAlpha: 0.85, scale: 1, duration: TIMING.spikePulse, ease: "power2.out" },
        TIMING.spikeAt,
      );

      timeline.to(
        "[data-intel-spike-ring]",
        { scale: 1.35, autoAlpha: 0, duration: TIMING.spikeRingFade, ease: "power2.out" },
        TIMING.spikeAt + TIMING.spikePop,
      );

      timeline.to(
        rxRef.current,
        { autoAlpha: 1, x: 0, y: 0, duration: TIMING.rxSlide, ease: "power2.out" },
        TIMING.rxAt,
      );

      timeline.to(
        "[data-intel-impact]",
        { autoAlpha: 1, scale: 1, duration: TIMING.impactPop, ease: "back.out(1.6)" },
        TIMING.impactAt,
      );

      timeline.to(
        "[data-intel-reject]",
        { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
        TIMING.impactAt + 0.15,
      );

      timeline.to(
        "[data-intel-score]",
        { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" },
        TIMING.impactAt + 0.45,
      );

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    { scope: stageRef, dependencies: [isReady, prefersReducedMotion, compact] },
  );

  return (
    <div ref={stageRef} className="relative h-full w-full overflow-hidden bg-surface-lowest">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <g data-intel-grid opacity="0">
          {[168, 248, 328, 408].map((y) => (
            <line
              key={y}
              x1={CHART.left}
              y1={y}
              x2={CHART.right}
              y2={y}
              stroke="var(--brand-outline-variant)"
              strokeOpacity="0.22"
              strokeWidth="1"
            />
          ))}
          <line
            x1={CHART.left}
            y1={CHART.bottom}
            x2={CHART.right}
            y2={CHART.bottom}
            stroke="var(--brand-outline-variant)"
            strokeOpacity="0.35"
            strokeWidth="1.5"
          />
          <text
            x={CHART.left}
            y={CHART.top - 10}
            className="fill-[var(--brand-on-surface-variant)] text-[12px] font-semibold"
          >
            Production-normalized load
          </text>
          <text
            x={CHART.left}
            y={CHART.baselineY - 12}
            className="fill-[var(--brand-primary)] text-[11px] font-semibold"
          >
            Plant baseline
          </text>
        </g>

        <polygon
          data-intel-band
          points={BASELINE_BAND}
          fill="var(--brand-primary)"
          fillOpacity="0.07"
          stroke="var(--brand-primary)"
          strokeOpacity="0.2"
          strokeWidth="1"
          strokeDasharray="5 4"
        />

        <polyline
          data-intel-chart-line
          points={CONSUMPTION_LINE}
          fill="none"
          stroke="var(--brand-primary)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle
          data-intel-spike-ring
          cx={SPIKE.x}
          cy={SPIKE.y}
          r="24"
          fill="none"
          stroke="var(--brand-primary)"
          strokeWidth="2"
          strokeOpacity="0.45"
          style={{ transformOrigin: `${SPIKE.x}px ${SPIKE.y}px` }}
        />
        <circle data-intel-spike-dot cx={SPIKE.x} cy={SPIKE.y} r="10" fill="var(--brand-primary)" />

        <line
          x1={SPIKE.x}
          y1={SPIKE.y + 14}
          x2={SPIKE.x}
          y2={CHART.baselineY}
          stroke="var(--brand-primary)"
          strokeOpacity="0.35"
          strokeWidth="1.75"
          strokeDasharray="4 4"
        />
        <text
          x={SPIKE.x}
          y={SPIKE.y - 20}
          textAnchor="middle"
          className="fill-[var(--brand-primary)] text-[11px] font-bold"
        >
          Deviation
        </text>
      </svg>

      <div
        ref={rxRef}
        className="absolute left-[3%] top-[6%] z-10 w-[min(42%,10.5rem)] rounded-lg border border-primary/40 bg-surface-lowest p-2 shadow-[0_12px_32px_-16px_color-mix(in_srgb,var(--brand-primary)_45%,transparent)] md:w-[11.25rem] md:p-3"
      >
        <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-primary md:text-[10px]">
          Scored move
        </p>
        <p className="mt-1 text-[10px] font-semibold leading-snug text-on-surface md:text-[11px]">
          Stagger compressor 1 startup
        </p>
        <p className="mt-1 text-[9px] text-on-surface-variant md:text-[10px]">
          Feasible · Shift B
        </p>
        <p
          data-intel-impact
          className="mt-1.5 inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold text-primary md:text-[11px]"
        >
          ₹ 0.6L / month
        </p>
        <p
          data-intel-reject
          className="mt-2 text-[9px] leading-snug text-on-surface-variant md:text-[10px]"
        >
          Shed HVAC blocked · production window
        </p>
        <p
          data-intel-score
          className="mt-1 text-[9px] font-semibold text-primary md:text-[10px]"
        >
          Rupee-scored against ToD and MD
        </p>
      </div>
    </div>
  );
}

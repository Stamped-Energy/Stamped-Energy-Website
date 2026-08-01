"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

/**
 * Illustrative paths - not plant telemetry.
 * Stamped path rises early; generic stays flat until near failure.
 */
const STAMPED_PATH =
  "M8 58 C40 56, 70 54, 100 48 C130 38, 160 28, 200 22 C240 16, 280 14, 320 12 C360 10, 390 9, 400 8";
const GENERIC_PATH =
  "M8 56 C60 55, 120 54, 200 53 C260 52, 300 50, 330 42 C350 34, 370 22, 400 10";

type Mode = "stamped" | "generic";

type EarlyDetectionVisualProps = {
  className?: string;
  activePointIndex?: number;
};

export function EarlyDetectionVisual({
  className,
  activePointIndex = 0,
}: EarlyDetectionVisualProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("stamped");
  const [replayKey, setReplayKey] = useState(0);
  const { isReady, prefersReducedMotion } = useMotion();

  useEffect(() => {
    if (activePointIndex >= 2) {
      setMode("stamped");
    }
  }, [activePointIndex]);

  const runAnimation = useCallback(() => {
    if (!rootRef.current || prefersReducedMotion) {
      return;
    }

    const paths = gsap.utils.toArray<SVGPathElement>(
      rootRef.current.querySelectorAll("[data-chart-path]"),
    );
    const markers = gsap.utils.toArray<HTMLElement>(
      rootRef.current.querySelectorAll("[data-chart-marker]"),
    );
    const shade = rootRef.current.querySelector<SVGRectElement>("[data-lead-shade]");
    const leadLine = rootRef.current.querySelector<HTMLElement>("[data-lead-line]");
    const stampedLine = rootRef.current.querySelectorAll("[data-marker-stamped]");
    const genericLine = rootRef.current.querySelectorAll("[data-marker-generic]");

    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    gsap.set(markers, { autoAlpha: 0, y: -6 });
    if (shade) {
      gsap.set(shade, { autoAlpha: 0 });
    }
    if (leadLine) {
      gsap.set(leadLine, { autoAlpha: 0 });
    }

    gsap.set(stampedLine, { autoAlpha: mode === "stamped" ? 1 : 0.3 });
    gsap.set(genericLine, { autoAlpha: mode === "generic" ? 1 : 0.4 });

    const timeline = gsap.timeline({ defaults: { ease: "power2.out" } });

    paths.forEach((path, index) => {
      timeline.to(path, { strokeDashoffset: 0, duration: 1.15 }, index * 0.12);
    });

    if (shade) {
      timeline.to(shade, { autoAlpha: 1, duration: 0.45 }, 0.65);
    }

    const stampedMarker = markers[0];
    const genericMarker = markers[1];

    timeline.to(stampedLine, { autoAlpha: mode === "stamped" ? 1 : 0.35, duration: 0.3 }, 0.7);
    if (stampedMarker) {
      timeline.to(stampedMarker, { autoAlpha: 1, y: 0, duration: 0.35 }, 0.75);
    }
    timeline.to(genericLine, { autoAlpha: mode === "generic" ? 1 : 0.45, duration: 0.3 }, 0.95);
    if (genericMarker) {
      timeline.to(genericMarker, { autoAlpha: 1, y: 0, duration: 0.35 }, 1.0);
    }
    if (leadLine) {
      timeline.to(leadLine, { autoAlpha: 1, duration: 0.4 }, 1.1);
    }
  }, [mode, prefersReducedMotion]);

  useGSAP(
    () => {
      if (!isReady) {
        return;
      }
      runAnimation();
    },
    { scope: rootRef, dependencies: [isReady, mode, replayKey, runAnimation] },
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "overflow-hidden border border-on-secondary/20 bg-secondary text-on-secondary",
        className,
      )}
    >
      <div className="flex flex-col gap-3 border-b border-on-secondary/15 px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-on-secondary/85">
          Kiln main drive · early vs late
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <div
            className="inline-flex items-center rounded-full border border-on-secondary/20 p-0.5 text-[11px] font-semibold uppercase tracking-[0.1em]"
            role="group"
            aria-label="Compare detection mode"
          >
            <button
              type="button"
              onClick={() => setMode("generic")}
              className={cn(
                "min-h-10 rounded-full px-3.5 py-2 transition-colors",
                mode === "generic"
                  ? "bg-error text-on-error"
                  : "text-on-secondary/45 hover:text-on-secondary",
              )}
            >
              Generic
            </button>
            <button
              type="button"
              onClick={() => setMode("stamped")}
              className={cn(
                "min-h-10 rounded-full px-3.5 py-2 transition-colors",
                mode === "stamped"
                  ? "bg-primary text-on-primary"
                  : "text-on-secondary/45 hover:text-on-secondary",
              )}
            >
              Stamped
            </button>
          </div>
          <button
            type="button"
            onClick={() => setReplayKey((value) => value + 1)}
            className="min-h-10 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-on-secondary/60 transition-colors hover:text-on-secondary"
          >
            Replay
          </button>
        </div>
      </div>

      <div className="relative px-3 py-5 sm:px-5 sm:py-6">
        <div className="mb-2 flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.12em]">
          <span className="text-primary">Stamped signal</span>
          <span className="text-error/90">Generic alert</span>
        </div>

        <div className="relative h-44 overflow-hidden border border-on-secondary/15 bg-[#050a08] sm:h-52">
          <svg viewBox="0 0 408 120" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
            {/* Lead-time band between Stamped prescribe (x≈110) and Generic alert (x≈340) */}
            <rect
              data-lead-shade
              x="110"
              y="0"
              width="230"
              height="120"
              fill="color-mix(in srgb, var(--brand-primary) 18%, transparent)"
            />

            <path
              data-chart-path
              d={GENERIC_PATH}
              fill="none"
              stroke="color-mix(in srgb, var(--brand-error) 75%, white)"
              strokeWidth="2"
              strokeDasharray="5 4"
              opacity="0.9"
            />
            <path
              data-chart-path
              d={STAMPED_PATH}
              fill="none"
              stroke="var(--brand-primary)"
              strokeWidth="2.75"
            />

            <path
              data-marker-stamped
              d="M110 8 V112"
              fill="none"
              stroke="var(--brand-primary)"
              strokeWidth="2"
            />
            <path
              data-marker-generic
              d="M340 8 V112"
              fill="none"
              stroke="color-mix(in srgb, var(--brand-error) 85%, white)"
              strokeWidth="2"
              strokeDasharray="4 3"
            />

            <circle cx="110" cy="48" r="4" fill="var(--brand-primary)" />
            <circle cx="340" cy="42" r="4" fill="color-mix(in srgb, var(--brand-error) 85%, white)" />
          </svg>
        </div>

        <div className="relative mt-3 h-8">
          <button
            type="button"
            data-chart-marker
            onClick={() => setMode("stamped")}
            className="absolute left-[24%] top-0 -translate-x-1/2 text-center sm:left-[26%]"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-primary">
              Stamped · prescribe
            </p>
          </button>
          <button
            type="button"
            data-chart-marker
            onClick={() => setMode("generic")}
            className="absolute left-[82%] top-0 -translate-x-1/2 text-center sm:left-[83%]"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-error">
              Generic · alert
            </p>
          </button>
        </div>

        <div className="mt-3 grid grid-cols-[auto_1fr_auto] items-center gap-2 text-[10px] font-medium uppercase tracking-[0.12em] text-on-secondary/50 sm:gap-3">
          <span>T-early</span>
          <p
            data-lead-line
            className="text-center text-[11px] font-semibold normal-case tracking-normal text-on-secondary/90 sm:text-xs"
          >
            40-50% earlier than generic alert systems
          </p>
          <span>Failure</span>
        </div>
      </div>
    </div>
  );
}

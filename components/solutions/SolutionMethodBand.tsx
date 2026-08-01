"use client";

import { useState } from "react";

import { AgenticEnergyVisual } from "@/components/solutions/AgenticEnergyVisual";
import { EarlyDetectionVisual } from "@/components/solutions/EarlyDetectionVisual";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { SolutionPillarPage as PillarContent } from "@/lib/content/solutions";
import { cn } from "@/lib/utils";

type SolutionMethodBandProps = {
  method: PillarContent["method"];
  slug: PillarContent["slug"];
};

export function SolutionMethodBand({ method, slug }: SolutionMethodBandProps) {
  const [activePoint, setActivePoint] = useState(0);

  return (
    <section className="border-b border-outline-variant/30 bg-surface section-y">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {method.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-on-surface md:text-3xl">
              {method.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-on-surface-variant md:text-base">
              {method.body}
            </p>
            <ul className="mt-8 space-y-3">
              {method.points.map((point, index) => {
                const isActive = index === activePoint;
                return (
                  <li key={point}>
                    <button
                      type="button"
                      onClick={() => setActivePoint(index)}
                      className={cn(
                        "w-full border px-4 py-3.5 text-left transition-colors duration-200",
                        isActive
                          ? "border-primary/45 bg-primary/8"
                          : "border-outline-variant/50 bg-surface-lowest hover:border-primary/30 hover:bg-primary/5",
                      )}
                    >
                      <span className="flex gap-3">
                        <span
                          className={cn(
                            "mt-0.5 font-mono text-[11px] font-semibold",
                            isActive ? "text-primary" : "text-on-surface-variant",
                          )}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "text-sm leading-6",
                            isActive ? "text-on-surface" : "text-on-surface-variant",
                          )}
                        >
                          {point}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <div>
            {slug === "load-energy" ? (
              <AgenticEnergyVisual
                activePointIndex={activePoint}
                onActivePointChange={setActivePoint}
              />
            ) : (
              <EarlyDetectionVisual activePointIndex={activePoint} />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

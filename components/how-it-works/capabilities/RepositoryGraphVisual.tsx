"use client";

import { useRef } from "react";

import { useCompactVisual } from "@/components/how-it-works/capabilities/useCompactVisual";
import { useMotion } from "@/components/motion/MotionProvider";
import { getHiwScrollStart } from "@/lib/motion/hiwScrollTrigger";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

const VIEW_W = 800;
const VIEW_H = 560;

const HUB = { id: "hub", label: "Common timeline", x: 400, y: 96 };

const GRAPH_NODES_DESKTOP = [
  { id: "assets", label: "Assets", x: 152, y: 252 },
  { id: "feeders", label: "Feeders", x: 278, y: 288 },
  { id: "shifts", label: "Shifts", x: 522, y: 288 },
  { id: "batches", label: "Batches", x: 648, y: 252 },
  { id: "tariffs", label: "Tariffs", x: 400, y: 398 },
] as const;

/** Wider star layout - same topology, nodes spread on compact viewports. */
const GRAPH_NODES_COMPACT = [
  { id: "assets", label: "Assets", x: 168, y: 244 },
  { id: "feeders", label: "Feeders", x: 288, y: 276 },
  { id: "shifts", label: "Shifts", x: 512, y: 276 },
  { id: "batches", label: "Batches", x: 632, y: 244 },
  { id: "tariffs", label: "Tariffs", x: 400, y: 388 },
] as const;

const TIMING = {
  hubAppear: 1.04,
  nodesAt: 0.84,
  nodeSpawn: 1.32,
  nodeStagger: 0.14,
  linesAt: 2.78,
  linesDraw: 1.46,
  linesStagger: 0.15,
} as const;

function toPercent(x: number, y: number) {
  return {
    left: `${(x / VIEW_W) * 100}%`,
    top: `${(y / VIEW_H) * 100}%`,
  };
}

function getEdgeEndpoints(
  nodeX: number,
  nodeY: number,
  hubRadius: number,
  nodeHalfW: number,
  nodeHalfH: number,
) {
  const dx = nodeX - HUB.x;
  const dy = nodeY - HUB.y;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  const nodeExtent = Math.abs(ux) * nodeHalfW + Math.abs(uy) * nodeHalfH;

  return {
    x1: HUB.x + ux * (hubRadius + 2),
    y1: HUB.y + uy * (hubRadius + 2),
    x2: nodeX - ux * (nodeExtent + 2),
    y2: nodeY - uy * (nodeExtent + 2),
  };
}

export function RepositoryGraphVisual() {
  const stageRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const compact = useCompactVisual();
  const { isReady, prefersReducedMotion } = useMotion();

  const graphNodes = compact ? GRAPH_NODES_COMPACT : GRAPH_NODES_DESKTOP;
  const hubRadius = compact ? 28 : 34;
  const nodeHalfW = compact ? 26 : 34;
  const nodeHalfH = compact ? 18 : 22;
  const hubPos = toPercent(HUB.x, HUB.y);

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || !stageRef.current) {
        return;
      }

      const nodes = gsap.utils.toArray<HTMLElement>("[data-graph-node]", stageRef.current);
      const lines = gsap.utils.toArray<SVGLineElement>("[data-graph-line]", stageRef.current);

      lines.forEach((line, index) => {
        const node = graphNodes[index];
        if (!node) {
          return;
        }
        const { x1, y1, x2, y2 } = getEdgeEndpoints(
          node.x,
          node.y,
          hubRadius,
          nodeHalfW,
          nodeHalfH,
        );
        const length = Math.hypot(x2 - x1, y2 - y1);
        line.setAttribute("x1", String(x1));
        line.setAttribute("y1", String(y1));
        line.setAttribute("x2", String(x2));
        line.setAttribute("y2", String(y2));
        line.setAttribute("stroke-dasharray", String(length));
        gsap.set(line, { strokeDashoffset: length, autoAlpha: 0 });
      });

      gsap.set(hubRef.current, { autoAlpha: 0, scale: 0.72 });
      gsap.set(nodes, { autoAlpha: 0, scale: 0.55, left: hubPos.left, top: hubPos.top });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: getHiwScrollStart("capabilityDiagram", compact),
          once: true,
        },
      });

      timeline.to(hubRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: TIMING.hubAppear,
        ease: "back.out(1.5)",
      });

      nodes.forEach((nodeEl, index) => {
        const node = graphNodes[index];
        if (!node) {
          return;
        }
        const target = toPercent(node.x, node.y);
        timeline.to(
          nodeEl,
          {
            autoAlpha: 1,
            scale: 1,
            left: target.left,
            top: target.top,
            duration: TIMING.nodeSpawn,
            ease: "power2.out",
          },
          TIMING.nodesAt + index * TIMING.nodeStagger,
        );
      });

      timeline.to(
        lines,
        {
          strokeDashoffset: 0,
          autoAlpha: 1,
          duration: TIMING.linesDraw,
          stagger: TIMING.linesStagger,
          ease: "power2.out",
        },
        TIMING.linesAt,
      );

      const playhead = stageRef.current.querySelector<SVGLineElement>("[data-graph-playhead]");
      const ticks = gsap.utils.toArray<SVGElement>("[data-graph-tick]", stageRef.current);
      gsap.set("[data-graph-rail]", { autoAlpha: 0 });
      gsap.set(playhead, { autoAlpha: 0, attr: { x1: 120, x2: 120 } });
      gsap.set(ticks, { autoAlpha: 0 });

      timeline.to("[data-graph-rail]", { autoAlpha: 1, duration: 0.4, ease: "power2.out" }, "-=0.2");
      timeline.to(ticks, { autoAlpha: 1, stagger: 0.05, duration: 0.25 }, "<0.1");
      timeline.to(playhead, { autoAlpha: 1, duration: 0.2 }, "<");

      let playLoop: gsap.core.Timeline | undefined;
      timeline.eventCallback("onComplete", () => {
        if (!playhead) {
          return;
        }
        playLoop = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
        playLoop.fromTo(
          playhead,
          { attr: { x1: 120, x2: 120 } },
          { attr: { x1: 680, x2: 680 }, duration: 3.2 },
        );
      });

      return () => {
        playLoop?.kill();
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    {
      scope: stageRef,
      dependencies: [isReady, prefersReducedMotion, compact, graphNodes],
    },
  );

  return (
    <div ref={stageRef} className="relative h-full w-full overflow-hidden bg-surface-lowest px-1 sm:px-0">
      <div className={cn("relative mx-auto h-full w-full origin-center", compact ? "scale-[0.9]" : "scale-100")}>
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {graphNodes.map((node) => {
            const { x1, y1, x2, y2 } = getEdgeEndpoints(
              node.x,
              node.y,
              hubRadius,
              nodeHalfW,
              nodeHalfH,
            );
            const length = Math.hypot(x2 - x1, y2 - y1);
            return (
              <line
                key={node.id}
                data-graph-line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--brand-primary)"
                strokeWidth="1.75"
                strokeOpacity="0.45"
                strokeDasharray={length}
                strokeDashoffset={length}
              />
            );
          })}
          <g data-graph-rail opacity="0">
            <line
              x1="120"
              y1="508"
              x2="680"
              y2="508"
              stroke="var(--brand-outline-variant)"
              strokeWidth="2"
              strokeOpacity="0.7"
            />
            {[180, 280, 380, 480, 580].map((x) => (
              <line
                key={x}
                data-graph-tick
                x1={x}
                y1="500"
                x2={x}
                y2="516"
                stroke="var(--brand-primary)"
                strokeWidth="1.5"
                strokeOpacity="0.55"
              />
            ))}
            <text
              x="120"
              y="536"
              className="fill-[var(--brand-on-surface-variant)] text-[11px] font-semibold"
            >
              Same moment
            </text>
            <line
              data-graph-playhead
              x1="120"
              y1="488"
              x2="120"
              y2="528"
              stroke="var(--brand-primary)"
              strokeWidth="2.25"
              strokeLinecap="round"
            />
          </g>
        </svg>

        <div
          ref={hubRef}
          className={cn(
            "absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-lg border-2 border-primary bg-surface-lowest px-2 py-2 text-center shadow-[0_0_28px_-8px_color-mix(in_srgb,var(--brand-primary)_50%,transparent)]",
            compact ? "h-12 w-[6.4rem]" : "h-14 w-[7.25rem] md:h-[3.85rem] md:w-[8rem]",
          )}
          style={{ left: hubPos.left, top: hubPos.top }}
        >
          <span
            className={cn(
              "font-bold uppercase leading-tight tracking-wide text-primary",
              compact ? "text-[7px]" : "text-[8px] md:text-[9px]",
            )}
          >
            {HUB.label}
          </span>
        </div>

        {graphNodes.map((node) => {
          const pos = toPercent(node.x, node.y);
          return (
            <article
              key={node.id}
              data-graph-node
              className={cn(
                "absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-outline-variant/50 bg-surface-lowest px-1.5 py-1.5 text-center shadow-sm",
                compact ? "w-[4.25rem]" : "w-[5.25rem] md:w-[5.75rem] md:px-2 md:py-2.5",
              )}
              style={{ left: pos.left, top: pos.top }}
            >
              <h4
                className={cn(
                  "font-bold leading-tight text-on-surface",
                  compact ? "text-[8px]" : "text-[9px] md:text-[10px]",
                )}
              >
                {node.label}
              </h4>
            </article>
          );
        })}
      </div>
    </div>
  );
}

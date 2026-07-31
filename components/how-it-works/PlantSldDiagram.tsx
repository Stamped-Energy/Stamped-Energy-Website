"use client";

import { useCallback, useRef, useState } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import type { HiwSldNode } from "@/lib/content/types";
import { getHiwScrollStart } from "@/lib/motion/hiwScrollTrigger";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

const VIEW_W = 800;
const VIEW_H = 450;

function toSvgPoint(node: HiwSldNode) {
  return {
    x: (node.x / 100) * VIEW_W,
    y: (node.y / 100) * VIEW_H,
  };
}

type PlantSldDiagramProps = {
  nodes: HiwSldNode[];
  hint: string;
  className?: string;
};

export function PlantSldDiagram({ nodes, hint, className }: PlantSldDiagramProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { isReady, prefersReducedMotion } = useMotion();

  const hub = nodes.find((node) => node.kind === "hub");
  const hubPoint = hub ? toSvgPoint(hub) : { x: VIEW_W / 2, y: VIEW_H / 2 };

  const connections = nodes
    .filter((node) => node.kind !== "hub")
    .map((node) => {
      const point = toSvgPoint(node);
      return { id: node.id, x1: point.x, y1: point.y, x2: hubPoint.x, y2: hubPoint.y };
    });

  const activeNode = nodes.find((node) => node.id === activeId) ?? null;

  const handleNodeEnter = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  const handleNodeLeave = useCallback(() => {
    setActiveId(null);
  }, []);

  const handleNodeClick = useCallback((id: string) => {
    setActiveId((current) => (current === id ? null : id));
  }, []);

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const lines = gsap.utils.toArray<SVGLineElement>("[data-sld-line]");
      const nodeEls = gsap.utils.toArray<HTMLElement>("[data-sld-node]");

      lines.forEach((line) => {
        const length = Number(line.getAttribute("data-length") ?? 200);
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length, autoAlpha: 0.35 });
      });
      gsap.set(nodeEls, { autoAlpha: 0, scale: 0.92 });

      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: getHiwScrollStart("diagram", false),
            once: true,
          },
        });

        timeline.to(lines, {
          strokeDashoffset: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: "power2.inOut",
        });

        timeline.to(
          nodeEls,
          { autoAlpha: 1, scale: 1, duration: 0.45, stagger: 0.05, ease: "back.out(1.4)" },
          "-=0.45",
        );

        return () => timeline.kill();
      });

      mm.add("(max-width: 767px)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: getHiwScrollStart("diagram", true),
            once: true,
          },
        });

        timeline.to(lines, {
          strokeDashoffset: 0,
          autoAlpha: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: "power2.inOut",
        });

        timeline.to(
          nodeEls,
          { autoAlpha: 1, scale: 1, duration: 0.45, stagger: 0.05, ease: "back.out(1.4)" },
          "-=0.45",
        );

        return () => timeline.kill();
      });

      return () => mm.revert();
    },
    {
      scope: rootRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-lowest shadow-[0_24px_60px_-32px_color-mix(in_srgb,var(--brand-primary)_35%,transparent)]",
        className,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <circle
          cx={hubPoint.x}
          cy={hubPoint.y}
          r="56"
          fill="var(--brand-primary)"
          fillOpacity="0.08"
        />
        {connections.map((line) => {
          const length = Math.hypot(line.x2 - line.x1, line.y2 - line.y1);
          const isActive =
            activeId === line.id || activeId === "stamped" || activeId === null;
          return (
            <line
              key={line.id}
              data-sld-line
              data-length={length}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="var(--brand-primary)"
              strokeWidth={isActive && activeId ? 2.5 : 2}
              strokeOpacity={activeId && activeId !== line.id && activeId !== "stamped" ? 0.2 : 0.45}
              strokeDasharray="6 5"
            />
          );
        })}
      </svg>

      {nodes.map((node) => (
        <button
          key={node.id}
          type="button"
          data-sld-node
          className={cn(
            "absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-lg border px-2.5 py-2 text-left shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            node.kind === "hub"
              ? "min-w-[7.5rem] border-2 border-primary bg-surface-lowest text-center"
              : "min-w-[6.5rem] border-outline-variant/60 bg-surface-lowest/95 hover:border-primary/40 md:min-w-[7rem]",
            activeId === node.id && "border-primary/60 bg-primary/8 shadow-md",
          )}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          onMouseEnter={() => handleNodeEnter(node.id)}
          onMouseLeave={handleNodeLeave}
          onFocus={() => handleNodeEnter(node.id)}
          onBlur={handleNodeLeave}
          onClick={() => handleNodeClick(node.id)}
          aria-label={`${node.label}: ${node.tooltip}`}
        >
          <span
            className={cn(
              "block text-[10px] font-bold uppercase tracking-wide md:text-[11px]",
              node.kind === "hub" ? "text-primary" : "text-on-surface",
            )}
          >
            {node.label}
          </span>
        </button>
      ))}

      <div
        className={cn(
          "pointer-events-none absolute bottom-3 left-3 right-3 rounded-lg border border-outline-variant/50 bg-surface-lowest/95 px-3 py-2.5 text-xs leading-5 text-on-surface-variant backdrop-blur-sm transition-all duration-200 md:bottom-4 md:left-4 md:right-4 md:px-4",
          activeNode ? "translate-y-0 opacity-100" : "translate-y-1 opacity-90",
        )}
        aria-live="polite"
      >
        {activeNode ? (
          <>
            <span className="font-semibold text-on-surface">{activeNode.label}</span>
            <span className="text-on-surface-variant"> · {activeNode.tooltip}</span>
          </>
        ) : (
          <span>{hint}</span>
        )}
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";

import { useCompactVisual } from "@/components/how-it-works/capabilities/useCompactVisual";
import { useMotion } from "@/components/motion/MotionProvider";
import { getHiwScrollStart } from "@/lib/motion/hiwScrollTrigger";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

const SOURCE_COUNT = 6;
const LINE_GAP = 2;

const INGESTION_SOURCES = [
  { id: "meters", label: "Meters" },
  { id: "scada", label: "SCADA" },
  { id: "bills", label: "DISCOM bills" },
  { id: "tariff", label: "Tariff" },
  { id: "erp", label: "ERP" },
  { id: "ops", label: "Operators" },
];

const GRID_OFFSETS = [
  { x: -158, y: -86 },
  { x: 0, y: -86 },
  { x: 158, y: -86 },
  { x: -158, y: 86 },
  { x: 0, y: 86 },
  { x: 158, y: 86 },
];

const TIMING = {
  hubRise: 1.08,
  cardsAt: 0.78,
  cardsMove: 1.92,
  linesAt: 2.72,
  linesDraw: 1.5,
  linesStagger: 0.17,
} as const;

function getOrbitOffset(index: number, radius: number) {
  const angle = (index / SOURCE_COUNT) * Math.PI * 2 - Math.PI / 2;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
}

function clientToSvg(svg: SVGSVGElement, clientX: number, clientY: number) {
  const point = svg.createSVGPoint();
  point.x = clientX;
  point.y = clientY;
  const matrix = svg.getScreenCTM();
  if (!matrix) {
    return { x: 0, y: 0 };
  }
  const svgPoint = point.matrixTransform(matrix.inverse());
  return { x: svgPoint.x, y: svgPoint.y };
}

function measureConnector(
  svg: SVGSVGElement,
  hubEl: HTMLElement,
  cardEl: HTMLElement,
) {
  const hubRect = hubEl.getBoundingClientRect();
  const cardRect = cardEl.getBoundingClientRect();

  const hubCenterClient = {
    x: hubRect.left + hubRect.width / 2,
    y: hubRect.top + hubRect.height / 2,
  };
  const cardCenterClient = {
    x: cardRect.left + cardRect.width / 2,
    y: cardRect.top + cardRect.height / 2,
  };

  const dx = cardCenterClient.x - hubCenterClient.x;
  const dy = cardCenterClient.y - hubCenterClient.y;
  const dist = Math.hypot(dx, dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;

  const hubRadius = Math.min(hubRect.width, hubRect.height) / 2;
  const cardExtent =
    Math.abs(ux) * (cardRect.width / 2) + Math.abs(uy) * (cardRect.height / 2);

  const hubEdgeClient = {
    x: hubCenterClient.x + ux * (hubRadius + 1),
    y: hubCenterClient.y + uy * (hubRadius + 1),
  };
  const cardEdgeClient = {
    x: cardCenterClient.x - ux * (cardExtent + LINE_GAP),
    y: cardCenterClient.y - uy * (cardExtent + LINE_GAP),
  };

  const start = clientToSvg(svg, hubEdgeClient.x, hubEdgeClient.y);
  const end = clientToSvg(svg, cardEdgeClient.x, cardEdgeClient.y);

  return { x1: start.x, y1: start.y, x2: end.x, y2: end.y };
}

function applyLineEndpoints(line: SVGLineElement, x1: number, y1: number, x2: number, y2: number) {
  const length = Math.hypot(x2 - x1, y2 - y1);
  line.setAttribute("x1", String(x1));
  line.setAttribute("y1", String(y1));
  line.setAttribute("x2", String(x2));
  line.setAttribute("y2", String(y2));
  line.setAttribute("stroke-dasharray", String(length));
  return length;
}

export function IngestionOrbitVisual() {
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const compact = useCompactVisual();
  const { isReady, prefersReducedMotion } = useMotion();

  const orbitRadius = compact ? 108 : 156;
  const gridScale = compact ? 0.68 : 1;

  useGSAP(
    () => {
      if (!isReady || !stageRef.current || !svgRef.current || !hubRef.current) {
        return;
      }

      const svg = svgRef.current;
      const hub = hubRef.current;
      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-ingest-orbit-card]",
        stageRef.current,
      );
      const lines = gsap.utils.toArray<SVGLineElement>(
        "[data-ingest-orbit-line]",
        stageRef.current,
      );

      const packets = gsap.utils.toArray<SVGCircleElement>(
        "[data-ingest-packet]",
        stageRef.current,
      );

      const syncLines = () => {
        lines.forEach((line, index) => {
          const card = cards[index];
          if (!card) {
            return;
          }
          const { x1, y1, x2, y2 } = measureConnector(svg, hub, card);
          const length = applyLineEndpoints(line, x1, y1, x2, y2);
          gsap.set(line, { strokeDashoffset: length });
        });
      };

      gsap.set(hub, { autoAlpha: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : compact ? 72 : 96, xPercent: -50, yPercent: -50 });

      cards.forEach((card, index) => {
        const orbit = getOrbitOffset(index, orbitRadius);
        const grid = GRID_OFFSETS[index];
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          x: prefersReducedMotion ? orbit.x : grid.x * gridScale,
          y: prefersReducedMotion ? orbit.y : grid.y * gridScale,
          autoAlpha: 1,
        });
      });

      if (prefersReducedMotion) {
        syncLines();
        gsap.set(lines, { strokeDashoffset: 0, autoAlpha: 1 });
        gsap.set(packets, { autoAlpha: 0 });
        return;
      }

      gsap.set(lines, { autoAlpha: 0 });
      gsap.set(packets, { autoAlpha: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: getHiwScrollStart("capabilityDiagram", compact),
          once: true,
        },
      });

      timeline.to(hub, {
        autoAlpha: 1,
        y: 0,
        duration: TIMING.hubRise,
        ease: "power2.out",
      });

      cards.forEach((card, index) => {
        const orbit = getOrbitOffset(index, orbitRadius);
        timeline.to(
          card,
          { x: orbit.x, y: orbit.y, duration: TIMING.cardsMove, ease: "power2.inOut" },
          TIMING.cardsAt,
        );
      });

      timeline.add(syncLines, TIMING.linesAt - 0.02);

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

      let packetLoop: gsap.core.Timeline | undefined;

      timeline.eventCallback("onComplete", () => {
        packetLoop = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
        packets.forEach((packet, index) => {
          const line = lines[index];
          if (!line) {
            return;
          }
          const x1 = Number(line.getAttribute("x1"));
          const y1 = Number(line.getAttribute("y1"));
          const x2 = Number(line.getAttribute("x2"));
          const y2 = Number(line.getAttribute("y2"));
          gsap.set(packet, { attr: { cx: x2, cy: y2 }, autoAlpha: 0.9 });
          packetLoop?.fromTo(
            packet,
            { attr: { cx: x2, cy: y2 }, autoAlpha: 0.95 },
            {
              attr: { cx: x1, cy: y1 },
              autoAlpha: 0,
              duration: 1.55,
              delay: index * 0.22,
            },
            0,
          );
        });
      });

      return () => {
        packetLoop?.kill();
        timeline.scrollTrigger?.kill();
        timeline.kill();
      };
    },
    {
      scope: stageRef,
      dependencies: [isReady, prefersReducedMotion, compact, orbitRadius, gridScale],
    },
  );

  return (
    <div ref={stageRef} className="relative h-full w-full overflow-hidden bg-surface-lowest px-1 sm:px-0">
      <div
        className={cn(
          "relative mx-auto h-full w-full max-w-full origin-center",
          compact ? "scale-[0.88]" : "scale-100",
        )}
      >
        <svg
          ref={svgRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 800 560"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {INGESTION_SOURCES.map((source) => (
            <g key={source.id}>
              <line
                data-ingest-orbit-line
                x1={400}
                y1={280}
                x2={400}
                y2={280}
                stroke="var(--brand-primary)"
                strokeWidth="1.75"
                strokeOpacity="0.5"
                strokeLinecap="round"
              />
              <circle
                data-ingest-packet
                r="3.5"
                fill="var(--brand-primary)"
                opacity="0"
              />
            </g>
          ))}
        </svg>

        <div
          ref={hubRef}
          className={cn(
            "absolute left-1/2 top-1/2 z-20 flex flex-col items-center justify-center rounded-full border-2 border-primary bg-surface-lowest text-center shadow-[0_0_32px_-10px_color-mix(in_srgb,var(--brand-primary)_55%,transparent)]",
            compact ? "h-12 w-[3.6rem]" : "h-16 w-[4.4rem] md:h-[4.25rem] md:w-[4.75rem]",
          )}
        >
          <span
            className={cn(
              "font-bold uppercase leading-tight tracking-wide text-primary",
              compact ? "text-[7px]" : "text-[8px] md:text-[9px]",
            )}
          >
            Stamped
          </span>
          <span className={cn("text-on-surface-variant", compact ? "text-[6px]" : "text-[7px] md:text-[8px]")}>
            Read-only
          </span>
        </div>

        {INGESTION_SOURCES.map((source) => (
          <article
            key={source.id}
            data-ingest-orbit-card
            className={cn(
              "absolute left-1/2 top-1/2 z-10 flex flex-col items-center justify-center rounded-lg border border-outline-variant/50 bg-surface-lowest px-1.5 py-1.5 text-center shadow-sm",
              compact ? "w-[4.5rem]" : "w-[5.5rem] md:w-[6.25rem] md:px-2 md:py-2.5",
            )}
          >
            <h4
              className={cn(
                "font-bold leading-tight text-on-surface",
                compact ? "text-[8px]" : "text-[9px] md:text-[10px]",
              )}
            >
              {source.label}
            </h4>
          </article>
        ))}
      </div>
    </div>
  );
}

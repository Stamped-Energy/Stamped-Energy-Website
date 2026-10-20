"use client";

import { landingContent } from "@/lib/content";
import { gsap } from "@/lib/motion/gsap";

import "./ladder.css";

const { visual } = landingContent.ladder;

/** Draws an SVG path from nothing to full length. */
function drawPath(path: SVGPathElement | null, duration: number) {
  if (!path) return gsap.timeline();
  const length = path.getTotalLength();
  return gsap
    .timeline()
    .fromTo(
      path,
      { strokeDasharray: length, strokeDashoffset: length },
      { strokeDashoffset: 0, duration, ease: "power2.inOut" },
    );
}

/* ------------------------------------------------------------------ */
/* Stage 1: data flows into a model of the plant, and drift is spotted */
/* ------------------------------------------------------------------ */

const BLOCKS = [
  { x: 214, y: 46 },
  { x: 284, y: 46 },
  { x: 214, y: 118 },
  { x: 284, y: 118 },
];

const SPARK =
  "M196 252 C210 246 220 258 234 252 S256 244 268 250 S288 256 300 248 S318 232 340 222";

export function LadderModelVisual() {
  return (
    <div className="ladder-stage ladder-forest" data-ladder-stage="model">
      <p className="ladder-kicker">{visual.modelLabel}</p>
      <div className="relative mt-2 min-h-0 flex-1">
        <svg viewBox="0 0 360 290" preserveAspectRatio="xMidYMid meet" aria-hidden>
          {visual.sources.map((source, i) => {
            const y = 40 + i * 78;
            return (
              <g key={source} data-l1-chip>
                <rect x="0" y={y} width="148" height="34" rx="4" className="ladder-line" strokeWidth="1.3" />
                <circle cx="13" cy={y + 17} r="3" fill="currentColor" />
                <text x="23" y={y + 20.5} className="ladder-svg-lbl">
                  {source}
                </text>
              </g>
            );
          })}
          {visual.sources.map((source, i) => {
            const y = 57 + i * 78;
            const target = [70, 106, 142][i];
            return (
              <path
                key={`${source}-stream`}
                data-l1-stream
                d={`M148 ${y} C176 ${y} 180 ${target} 204 ${target}`}
                className="ladder-line"
                strokeWidth="1.2"
                strokeDasharray="3 4"
                opacity="0.75"
              />
            );
          })}
          <rect x="202" y="32" width="146" height="144" rx="6" className="ladder-line" strokeWidth="1" opacity="0.35" />
          <path d="M260 66 H284 M260 138 H284 M237 86 V118 M307 86 V118" className="ladder-line" strokeWidth="1.2" data-l1-flow />
          {BLOCKS.map((block, i) => (
            <rect
              key={`${block.x}-${block.y}`}
              data-l1-block
              x={block.x}
              y={block.y}
              width="46"
              height="40"
              rx="4"
              fill={i === 3 ? "#eef981" : "currentColor"}
              fillOpacity={i === 3 ? 1 : 0.16}
              className="ladder-line"
              strokeWidth="1.3"
            />
          ))}
          <path d={SPARK} className="ladder-line" strokeWidth="1.8" data-l1-spark />
          <line x1="196" y1="270" x2="344" y2="270" className="ladder-line" strokeWidth="0.8" opacity="0.35" />
          <circle cx="340" cy="222" r="11" fill="none" stroke="#eef981" strokeWidth="1.4" data-l1-pulse />
          <circle cx="340" cy="222" r="4.5" fill="#eef981" data-l1-dot />
          <g data-l1-drift>
            <rect x="196" y="194" width="98" height="20" rx="10" fill="#eef981" />
            <text x="206" y="207.5" className="ladder-svg-lbl" fill="#2f3218" style={{ fill: "#2f3218" }}>
              {visual.driftLabel}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}

export function buildModelTimeline(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline();
  tl.fromTo(q("[data-l1-chip]"), { autoAlpha: 0, x: -14 }, { autoAlpha: 1, x: 0, stagger: 0.08, duration: 0.35 })
    .fromTo(q("[data-l1-stream]"), { autoAlpha: 0 }, { autoAlpha: 0.75, stagger: 0.08, duration: 0.3 }, "-=0.1")
    .fromTo(
      q("[data-l1-block]"),
      { autoAlpha: 0, scale: 0.7, transformOrigin: "50% 50%" },
      { autoAlpha: 1, scale: 1, stagger: 0.06, duration: 0.3, ease: "back.out(1.6)" },
      "-=0.15",
    )
    .fromTo(q("[data-l1-flow]"), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, "-=0.1")
    .add(drawPath(root.querySelector<SVGPathElement>("[data-l1-spark]"), 0.6), "-=0.05")
    .fromTo(
      q("[data-l1-dot]"),
      { scale: 0, transformOrigin: "50% 50%" },
      { scale: 1, duration: 0.2, ease: "back.out(2)" },
    )
    .fromTo(
      q("[data-l1-pulse]"),
      { autoAlpha: 0, scale: 0.4, transformOrigin: "50% 50%" },
      { autoAlpha: 1, scale: 1, duration: 0.3 },
      "<",
    )
    .fromTo(q("[data-l1-drift]"), { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.25 }, "-=0.1");
  return tl;
}

/* ------------------------------------------------------------------ */
/* Stage 2: a recommendation card with its evidence                    */
/* ------------------------------------------------------------------ */

export function LadderRecommendationVisual() {
  const { card } = visual;
  return (
    <div className="ladder-stage ladder-acid" data-ladder-stage="recommendation">
      <div className="flex min-h-0 flex-1 items-center">
        <div
          data-l2-card
          className="w-full rounded-md border border-[#2f3218]/35 bg-[#fbfcf9]/70 px-4 py-3 shadow-[0_10px_30px_-18px_rgba(47,50,24,0.6)]"
        >
          <div className="flex items-center justify-between gap-3 pb-2">
            <p className="ladder-kicker">{card.title}</p>
            <span
              data-l2-check
              className="inline-flex items-center gap-1.5 rounded-full bg-[#2f3218] px-2.5 py-1 font-mono text-[0.56rem] uppercase tracking-[0.1em] text-[#eef981]"
            >
              <svg viewBox="0 0 12 12" className="!h-2.5 !w-2.5" aria-hidden>
                <path d="M2 6.5 L5 9 L10 3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              {card.check}
            </span>
          </div>
          {card.rows.map((row) => (
            <div key={row.label} data-l2-row className="ladder-card-row py-2">
              <p className="font-mono text-[0.56rem] uppercase tracking-[0.12em] opacity-70">{row.label}</p>
              <p className="mt-0.5 text-[0.8rem] font-medium leading-snug">{row.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function buildRecommendationTimeline(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  return gsap
    .timeline()
    .fromTo(q("[data-l2-card]"), { autoAlpha: 0, y: 28, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45 })
    .fromTo(q("[data-l2-row]"), { autoAlpha: 0, x: -10 }, { autoAlpha: 1, x: 0, stagger: 0.14, duration: 0.3 }, "-=0.1")
    .fromTo(
      q("[data-l2-check]"),
      { autoAlpha: 0, scale: 0.6 },
      { autoAlpha: 1, scale: 1, duration: 0.25, ease: "back.out(2)" },
    );
}

/* ------------------------------------------------------------------ */
/* Stage 3: a change applied, the run settles inside the limits band   */
/* ------------------------------------------------------------------ */

const TRACE =
  "M20 112 C34 106 44 116 58 108 S82 100 96 106 S118 98 132 102 S150 96 168 99 L176 99 C188 128 204 140 222 141 S262 139 284 140 S320 140 340 140";

export function LadderExecutionVisual() {
  return (
    <div className="ladder-stage ladder-wine" data-ladder-stage="execution">
      <div className="relative min-h-0 flex-1">
        <svg viewBox="0 0 360 270" preserveAspectRatio="xMidYMid meet" aria-hidden>
          <g data-l3-band>
            <rect x="14" y="84" width="332" height="112" rx="4" fill="currentColor" fillOpacity="0.1" />
            <line x1="14" y1="84" x2="346" y2="84" className="ladder-line" strokeWidth="1" strokeDasharray="5 5" opacity="0.7" />
            <line x1="14" y1="196" x2="346" y2="196" className="ladder-line" strokeWidth="1" strokeDasharray="5 5" opacity="0.7" />
            <text x="14" y="72" className="ladder-svg-lbl" opacity="0.85">
              {visual.bandLabel}
            </text>
          </g>
          <line x1="14" y1="140" x2="346" y2="140" className="ladder-line" strokeWidth="0.7" opacity="0.25" />
          <path d={TRACE} className="ladder-line" strokeWidth="2" data-l3-trace />
          <g data-l3-marker>
            <line x1="176" y1="60" x2="176" y2="216" stroke="#eef981" strokeWidth="1.2" />
            <rect x="182" y="210" width="118" height="20" rx="10" fill="#eef981" />
            <text x="193" y="223.5" className="ladder-svg-lbl" style={{ fill: "#2f3218" }}>
              {visual.appliedLabel}
            </text>
          </g>
          <circle cx="340" cy="140" r="4.5" fill="#eef981" data-l3-end />
        </svg>
      </div>
      <p
        data-l3-log
        className="mt-1 inline-flex items-center gap-2 self-start rounded-full border border-[#fbfcf9]/35 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em]"
      >
        <svg viewBox="0 0 12 12" className="!h-2.5 !w-2.5" aria-hidden>
          <path d="M2 6.5 L5 9 L10 3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        {visual.logLine}
      </p>
    </div>
  );
}

export function buildExecutionTimeline(root: HTMLElement) {
  const q = gsap.utils.selector(root);
  return gsap
    .timeline()
    .fromTo(
      q("[data-l3-band]"),
      { autoAlpha: 0, scaleY: 0.6, transformOrigin: "50% 50%" },
      { autoAlpha: 1, scaleY: 1, duration: 0.35 },
    )
    .add(drawPath(root.querySelector<SVGPathElement>("[data-l3-trace]"), 0.9), "-=0.05")
    .fromTo(
      q("[data-l3-marker]"),
      { autoAlpha: 0, y: 6 },
      { autoAlpha: 1, y: 0, duration: 0.25 },
      "-=0.55",
    )
    .fromTo(
      q("[data-l3-end]"),
      { scale: 0, transformOrigin: "50% 50%" },
      { scale: 1, duration: 0.2, ease: "back.out(2)" },
      "-=0.05",
    )
    .fromTo(q("[data-l3-log]"), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.25 });
}

export const ladderStages = [
  { Visual: LadderModelVisual, build: buildModelTimeline },
  { Visual: LadderRecommendationVisual, build: buildRecommendationTimeline },
  { Visual: LadderExecutionVisual, build: buildExecutionTimeline },
] as const;

"use client";

import type { ComponentType } from "react";

import type { SolutionAreaSlug } from "@/lib/content/solutions";

import { poly, StageShell, wait } from "./HiwStageVisuals";
import type { SlotLoopOptions } from "./useSlotLoop";

import "./solutions-areas.css";

const TITLE = { fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 20 } as const;
const SUB = { fontFamily: "Inter, sans-serif", fontSize: 13 } as const;
const PILL = { fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 14 } as const;

export function setText(root: HTMLElement, sel: string, text: string) {
  const el = root.querySelector(sel);
  if (el) el.textContent = text;
}

/** Runs [action, holdMs] steps in order, forever, until stopped. */
export function cycle(steps: Array<[() => void, number]>) {
  let live = true;
  const isLive = () => live;
  void (async () => {
    try {
      while (live) {
        for (const [run, ms] of steps) {
          run();
          await wait(ms, isLive);
        }
      }
    } catch {
      /* stopped */
    }
  })();
  return () => {
    live = false;
  };
}

function ActionCard({ role, title, sub, pill }: { role: string; title: string; sub: string; pill?: string }) {
  return (
    <g>
      <rect className="rx" x="416" y="20" width="204" height="240" rx="8" />
      <circle className="live-dot" cx="436" cy="48" r="4" />
      <text className="lbl lbl-hi" x="448" y="52">
        {role}
      </text>
      <text data-sa-title className="val" x="436" y="104" {...TITLE}>
        {title}
      </text>
      <text data-sa-sub className="mute-txt" x="436" y="132" {...SUB}>
        {sub}
      </text>
      {pill ? (
        <g data-sa-pill className="sa-pop">
          <rect className="pill-fill" x="436" y="160" width="96" height="30" rx="4" />
          <text className="pill-ink" x="448" y="180" {...PILL}>
            {pill}
          </text>
        </g>
      ) : null}
      <text className="lbl" x="436" y="240">
        Example action
      </text>
    </g>
  );
}

/* Process: today's rule lets the line drift, a better rule tested on the twin brings it into a tighter band. */
function startProcess(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const path = root.querySelector<SVGPathElement>("[data-sa-spark]");
  const pill = root.querySelector("[data-sa-pill]");
  if (!path) return () => undefined;

  const CYCLE = 7;
  const smooth = (a: number, b: number, x: number) => {
    const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  const period = (t: number) => ((t % CYCLE) + CYCLE) % CYCLE;
  const yAt = (t: number) => {
    const p = period(t);
    const drift = smooth(1, 3, p) * (1 - smooth(4.2, 5.6, p));
    return 142 - 72 * drift + 4 * Math.sin(t * 3.1) + 2 * Math.sin(t * 7.3);
  };
  const STATES = {
    steady: ["In band", "Today's control rule"],
    drift: ["Better rule", "Tested on digital twin"],
    aim: ["New rule ready", "Ready for your review"],
  } as const;
  let phase: keyof typeof STATES | "" = "";

  const paint = (elapsed: number) => {
    const xs: number[] = [];
    const ys: number[] = [];
    for (let i = 0; i < 90; i++) {
      const frac = i / 89;
      xs.push(36 + frac * 348);
      ys.push(yAt(elapsed - (1 - frac) * 6));
    }
    path.setAttribute("d", poly(xs, ys));
    const p = period(elapsed);
    const next = p >= 2.6 && p < 4.2 ? "drift" : p >= 4.2 && p < 6.6 ? "aim" : "steady";
    if (next !== phase) {
      phase = next;
      setText(root, "[data-sa-title]", STATES[next][0]);
      setText(root, "[data-sa-sub]", STATES[next][1]);
      pill?.classList.toggle("is-on", next === "aim");
    }
  };

  if (reduce) {
    paint(4.5);
    return () => undefined;
  }
  let raf = 0;
  const t0 = performance.now();
  const tick = (now: number) => {
    paint((now - t0) / 1000);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

function ProcessVisual() {
  return (
    <StageShell className="hiw-forest sa-slot" label="A process setting drifts under today's control rule, and a better rule tested on a digital twin brings it back into an improved band." start={startProcess}>
      <svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg">
        <rect width="640" height="280" fill="#4A634D" />
        <rect className="chip" x="20" y="20" width="380" height="240" rx="8" />
        <text className="lbl" x="36" y="44">
          Line 2 · heater aim
        </text>
        <text className="lbl lbl-hi" x="36" y="112">
          Improved aim
        </text>
        <rect className="sa-band" x="36" y="120" width="348" height="44" />
        <line className="axis" x1="36" y1="236" x2="384" y2="236" />
        <path className="spark" data-sa-spark d="" />
        <ActionCard role="Process engineer" title="In band" sub="Today's control rule" pill="Review" />
      </svg>
    </StageShell>
  );
}

/* Quality: a live alert fires while a lot can still be saved, and the lot moves to the saved lane. */
const LOTS = ["2417", "2418", "2419", "2420"];
const ALERTS = [
  { sub: "Ageing 12 min over", act: "Pull it now", done: "Lot saved in time" },
  { sub: "Quench water 6°C high", act: "Hold the charge", done: "Water back in band" },
] as const;

function startQuality(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const tiles = [...root.querySelectorAll<SVGGElement>("[data-sa-tile]")];
  const reset = () => {
    tiles.forEach((t) => t.classList.remove("is-flag", "is-held"));
    setText(root, "[data-sa-title]", "Watching lots");
    setText(root, "[data-sa-sub]", "Live, linked to process");
  };
  const flag = (i: number, alert: (typeof ALERTS)[number]) => {
    tiles[i]?.classList.add("is-flag");
    setText(root, "[data-sa-title]", `Lot ${LOTS[i]} alert`);
    setText(root, "[data-sa-sub]", alert.sub);
  };
  const hold = (i: number, alert: (typeof ALERTS)[number]) => {
    tiles[i]?.classList.add("is-held");
    setText(root, "[data-sa-title]", alert.act);
    setText(root, "[data-sa-sub]", alert.done);
  };

  if (reduce) {
    flag(1, ALERTS[0]);
    hold(1, ALERTS[0]);
    return () => undefined;
  }
  const order = [1, 3, 0, 2];
  let n = 0;
  return cycle([
    [reset, 900],
    [() => flag(order[n % order.length], ALERTS[n % ALERTS.length]), 1500],
    [() => hold(order[n % order.length], ALERTS[n % ALERTS.length]), 2200],
    [
      () => {
        tiles.forEach((t) => t.classList.remove("is-held"));
        n += 1;
      },
      700,
    ],
  ]);
}

function QualityVisual() {
  return (
    <StageShell className="hiw-acid sa-slot" label="A live alert fires while a lot can still be saved, such as ageing running over or quench water out of band, and the lot is saved in time." start={startQuality}>
      <svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg">
        <rect width="640" height="280" fill="#EEF981" />
        <rect className="chip" x="20" y="20" width="380" height="240" rx="8" />
        <text className="lbl" x="36" y="44">
          Lots on the floor
        </text>
        {LOTS.map((lot, i) => (
          <g key={lot} data-sa-tile className="sa-tile">
            <rect className="chip" x={36 + i * 88} y="60" width="76" height="64" rx="6" />
            <text className="lbl" x={48 + i * 88} y="84">
              Lot
            </text>
            <text className="val" x={48 + i * 88} y="108" {...PILL}>
              {lot}
            </text>
          </g>
        ))}
        <line className="sa-lane" x1="36" y1="160" x2="384" y2="160" />
        <text className="lbl" x="36" y="152">
          Saved in time
        </text>
        <ActionCard role="Shift lead" title="Watching lots" sub="Live, linked to process" />
      </svg>
    </StageShell>
  );
}

/* Planning: Press 3 goes down, its job moves to Press 2, a re-plan is ready. */
function startPlanning(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const pill = root.querySelector("[data-sa-pill]");
  const state = (down: boolean, replan: boolean, title: string, sub: string) => () => {
    root.classList.toggle("is-down", down);
    root.classList.toggle("is-replan", replan);
    pill?.classList.toggle("is-on", replan);
    setText(root, "[data-sa-title]", title);
    setText(root, "[data-sa-sub]", sub);
  };
  const onPlan = state(false, false, "On plan", "Sequence running");
  const down = state(true, false, "Press 3 down", "Unplanned stop");
  const replan = state(true, true, "Re-plan ready", "Whole plant checked");

  if (reduce) {
    replan();
    return () => undefined;
  }
  return cycle([
    [onPlan, 1400],
    [down, 1300],
    [replan, 2600],
  ]);
}

function PlanningVisual() {
  const rows = ["Press 1", "Press 2", "Press 3"];
  return (
    <StageShell className="hiw-ember sa-slot" label="A press goes down and its job moves to another press in a re-plan checked against the whole plant." start={startPlanning}>
      <svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg">
        <rect width="640" height="280" fill="#E35F3F" />
        <rect className="chip" x="20" y="20" width="380" height="240" rx="8" />
        <text className="lbl" x="36" y="44">
          Today&apos;s plan
        </text>
        {rows.map((row, i) => (
          <g key={row}>
            <text className="lbl" x="36" y={98 + i * 60}>
              {row}
            </text>
            <line className="axis" x1="110" y1={116 + i * 60} x2="384" y2={116 + i * 60} />
          </g>
        ))}
        <rect className="sa-job" x="110" y="78" width="90" height="30" rx="3" />
        <rect className="sa-job" x="208" y="78" width="92" height="30" rx="3" />
        <rect className="sa-job" x="110" y="138" width="120" height="30" rx="3" />
        <rect className="sa-job" x="110" y="198" width="60" height="30" rx="3" />
        <g className="sa-down">
          <rect x="178" y="198" width="112" height="30" rx="3" />
          <text className="lbl lbl-hi" x="190" y="218">
            Down
          </text>
        </g>
        <rect className="sa-job sa-move" x="178" y="198" width="112" height="30" rx="3" />
        <ActionCard role="For the planner" title="On plan" sub="Sequence running" pill="Confirm" />
      </svg>
    </StageShell>
  );
}

/* Maintenance: gas per kg creeps up on the same recipe, then a card goes to maintenance. */
const TREND = (() => {
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i < 60; i++) {
    const f = i / 59;
    xs.push(36 + f * 348);
    ys.push(178 - 80 * f * f + 6 * Math.sin(i * 1.7) + 3 * Math.sin(i * 4.1));
  }
  return poly(xs, ys);
})();

function startMaintenance(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const line = root.querySelector<SVGPathElement>("[data-sa-trend]");
  const pill = root.querySelector("[data-sa-pill]");
  if (!line) return () => undefined;
  const len = line.getTotalLength();
  line.style.strokeDasharray = String(len);

  const card = (on: boolean) => {
    pill?.classList.toggle("is-on", on);
    setText(root, "[data-sa-title]", on ? "Check burners" : "Furnace 1");
    setText(root, "[data-sa-sub]", on ? "Before Thu changeover" : "Gas per kg rising");
  };

  if (reduce) {
    line.style.strokeDashoffset = "0";
    card(true);
    return () => undefined;
  }
  return cycle([
    [
      () => {
        card(false);
        line.style.transition = "none";
        line.style.strokeDashoffset = String(len);
      },
      300,
    ],
    [
      () => {
        line.style.transition = "stroke-dashoffset 2.8s cubic-bezier(0.25, 1, 0.5, 1)";
        line.style.strokeDashoffset = "0";
      },
      2900,
    ],
    [() => card(true), 2800],
  ]);
}

function MaintenanceVisual() {
  return (
    <StageShell className="hiw-wine sa-slot" label="Gas per kilo creeps up on the same recipe and maintenance gets a prescribed burner check, timed before the next changeover." start={startMaintenance}>
      <svg viewBox="0 0 640 280" xmlns="http://www.w3.org/2000/svg">
        <rect width="640" height="280" fill="#761438" />
        <rect className="chip" x="20" y="20" width="380" height="240" rx="8" />
        <text className="lbl" x="36" y="44">
          Gas per kg · same recipe
        </text>
        <line className="base-line" x1="36" y1="180" x2="384" y2="180" />
        <text className="lbl" x="36" y="200">
          Normal
        </text>
        <line className="axis" x1="36" y1="236" x2="384" y2="236" />
        <path className="spark" data-sa-trend d={TREND} />
        <ActionCard role="Maintenance lead" title="Furnace 1" sub="Gas per kg rising" pill="Prescribed" />
      </svg>
    </StageShell>
  );
}

const VISUALS: Record<SolutionAreaSlug, ComponentType> = {
  process: ProcessVisual,
  quality: QualityVisual,
  planning: PlanningVisual,
  maintenance: MaintenanceVisual,
};

export function SolutionAreaVisual({ slug }: { slug: SolutionAreaSlug }) {
  const Visual = VISUALS[slug];
  return <Visual />;
}

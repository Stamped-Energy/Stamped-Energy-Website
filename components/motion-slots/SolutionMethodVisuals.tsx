"use client";

import type { ComponentType } from "react";

import type { SolutionAreaSlug } from "@/lib/content/solutions";

import { poly, StageShell } from "./HiwStageVisuals";
import { cycle, setText } from "./SolutionsAreaVisuals";
import type { SlotLoopOptions } from "./useSlotLoop";

import "./method-visuals.css";

const PILL = { fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 14 } as const;
const TITLE = { fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 20 } as const;

export const toggle = (root: HTMLElement, sel: string, name: string, on: boolean) =>
  root.querySelectorAll(sel).forEach((el) => el.classList.toggle(name, on));

const moveTo = (root: HTMLElement, sel: string, x: number, y: number) =>
  root.querySelectorAll<SVGGElement>(sel).forEach((el) => {
    el.style.transform = `translate(${x}px, ${y}px)`;
  });

function Panel({ label }: { label: string }) {
  return (
    <>
      <rect className="chip" x="20" y="20" width="380" height="360" rx="8" />
      <text className="lbl" x="36" y="44">
        {label}
      </text>
    </>
  );
}

function SidePanel({ label }: { label: string }) {
  return (
    <>
      <rect className="rx" x="416" y="20" width="204" height="360" rx="8" />
      <circle className="live-dot" cx="436" cy="44" r="4" />
      <text className="lbl lbl-hi" x="448" y="48">
        {label}
      </text>
    </>
  );
}

/* Process: the line drifts out of its aim band; rules A and B overshoot on the model, rule C holds the band. */
const trend = (amp: number, from = 200) => {
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i < 80; i++) {
    const x = 36 + (i / 79) * 348;
    const today = 180 - 110 * Math.pow((x - 36) / 348, 2) + 3 * Math.sin(i * 1.9);
    if (x < from || amp < 0) {
      ys.push(today);
    } else {
      const d = x - from;
      const settle = 1 - Math.exp(-d / 40);
      const start = 180 - 110 * Math.pow((from - 36) / 348, 2);
      ys.push(start + (180 - start) * settle + amp * Math.sin(d / 22) * Math.exp(-d / 160));
    }
    xs.push(x);
  }
  return poly(xs, ys);
};
const TODAY = trend(-1);
const TRIALS = [
  { id: "a", path: trend(70), name: "Rule A", note: "Overshoots the band" },
  { id: "b", path: trend(44), name: "Rule B", note: "Overshoots on restart" },
  { id: "c", path: trend(10), name: "Rule C", note: "Holds the band" },
];

function startProcess(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const reset = () => {
    toggle(root, ".sm-trial, [data-row], [data-card]", "is-on", false);
    toggle(root, ".sm-trial", "is-fail", false);
    toggle(root, ".sm-trial", "is-best", false);
  };
  const tryRule = (n: number) => () => {
    TRIALS.forEach((t, i) => {
      root.querySelector(`[data-trial="${t.id}"]`)?.classList.toggle("is-fail", i < n);
    });
    root.querySelector(`[data-trial="${TRIALS[n].id}"]`)?.classList.add("is-on");
    root.querySelector(`[data-row="${TRIALS[n].id}"]`)?.classList.add("is-on");
    if (n === TRIALS.length - 1) root.querySelector('[data-trial="c"]')?.classList.add("is-best");
  };
  const card = () => toggle(root, "[data-card]", "is-on", true);

  if (reduce) {
    TRIALS.forEach((_, i) => tryRule(i)());
    card();
    return () => undefined;
  }
  return cycle([
    [reset, 1200],
    [tryRule(0), 1300],
    [tryRule(1), 1300],
    [tryRule(2), 1300],
    [card, 2600],
  ]);
}

function ProcessMethodVisual() {
  return (
    <StageShell
      className="hiw-forest sm-slot"
      label="A line drifts out of its aim band. Three control rules are tried on a model of the line: two overshoot, the third holds the band and is ready for a step test."
      start={startProcess}
    >
      <svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="640" height="400" fill="#4A634D" />
        <Panel label="Line 2 · heater aim" />
        <rect className="sm-band" x="36" y="150" width="348" height="60" />
        <text className="lbl lbl-hi" x="36" y="142">
          Aim band
        </text>
        <line className="axis" x1="36" y1="340" x2="384" y2="340" />
        <path className="spark" d={TODAY} />
        {TRIALS.map((t) => (
          <path key={t.id} data-trial={t.id} className="sm-trial sm-reveal" d={t.path} />
        ))}
        <text className="lbl" x="36" y="364">
          Today&apos;s rule, then trials on the model
        </text>
        <SidePanel label="Model · trials" />
        {TRIALS.map((t, i) => (
          <g key={t.id} data-row={t.id} className="sm-reveal">
            <text className="val" x="436" y={96 + i * 54} {...PILL}>
              {t.name}
            </text>
            <text className="mute-txt" x="436" y={116 + i * 54} fontSize="12">
              {t.note}
            </text>
          </g>
        ))}
        <g data-card className="sm-reveal">
          <rect className="pill-fill" x="436" y="276" width="168" height="30" rx="4" />
          <text className="pill-ink" x="448" y="296" {...PILL}>
            Ready for step test
          </text>
          <text className="mute-txt" x="436" y="330" fontSize="12">
            Line [2] · for your review
          </text>
        </g>
      </svg>
    </StageShell>
  );
}

/* Quality: one lot's quench signal leaves its band, the lot is flagged, the charge is held and the lot is saved. */
const LOTS = ["2417", "2418", "2419", "2420"];
const strip = (i: number, out: boolean) => {
  const xs: number[] = [];
  const ys: number[] = [];
  for (let k = 0; k < 24; k++) {
    const f = k / 23;
    xs.push(40 + i * 88 + f * 68);
    ys.push(180 + 9 * Math.sin(k * 1.3 + i) - (out ? 44 * Math.max(0, f - 0.45) * 1.8 : 0));
  }
  return poly(xs, ys);
};
const RISKY = 2;

function startQuality(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const state = (out: boolean, flagged: boolean, saved: boolean, title: string, sub: string) => () => {
    root.querySelector("[data-out]")?.classList.toggle("is-on", out);
    root.querySelector("[data-in]")?.classList.toggle("is-on", !out);
    root.querySelector("[data-risky]")?.classList.toggle("is-flag", flagged);
    toggle(root, "[data-bang]", "is-on", flagged && !saved);
    toggle(root, "[data-saved], [data-card]", "is-on", saved);
    toggle(root, "[data-pill]", "is-on", flagged);
    setText(root, "[data-sm-title]", title);
    setText(root, "[data-sm-sub]", sub);
  };
  const watch = state(false, false, false, "Watching lots", "Linked to process");
  const drift = state(true, false, false, "Watching lots", "Quench water rising");
  const alert = state(true, true, false, `Lot ${LOTS[RISKY]} alert`, "Quench water out of band");
  const saved = state(false, true, true, "Saved in time", "Charge held, lot in spec");

  if (reduce) {
    saved();
    return () => undefined;
  }
  return cycle([
    [watch, 1400],
    [drift, 1100],
    [alert, 1700],
    [saved, 2300],
  ]);
}

function QualityMethodVisual() {
  return (
    <StageShell
      className="hiw-acid sm-slot"
      label="Each lot carries its process record. One lot's quench signal leaves its band, the lot is flagged, the next charge is held and the lot is saved in time."
      start={startQuality}
    >
      <svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="640" height="400" fill="#EEF981" />
        <Panel label="Lots · process record" />
        {LOTS.map((lot, i) => (
          <g key={lot} {...(i === RISKY ? { "data-risky": "" } : {})}>
            <rect className="sm-fillbox" x={36 + i * 88} y="64" width="76" height="56" rx="6" />
            <text className="lbl" x={48 + i * 88} y="86">
              Lot
            </text>
            <text className="val" x={48 + i * 88} y="108" {...PILL}>
              {lot}
            </text>
            <rect className="sm-band" x={36 + i * 88} y="162" width="76" height="36" />
            {i === RISKY ? (
              <>
                <path data-in className="spark sm-reveal is-on" d={strip(i, false)} />
                <path data-out className="spark sm-reveal" d={strip(i, true)} />
                <text data-bang className="val sm-reveal" x={96 + i * 88} y="86" {...PILL}>
                  !
                </text>
                <text data-saved className="lbl lbl-hi sm-reveal" x={36 + i * 88} y="236">
                  Saved
                </text>
              </>
            ) : (
              <path className="spark" d={strip(i, false)} />
            )}
          </g>
        ))}
        <text className="lbl" x="36" y="150">
          Quench water · band
        </text>
        <line className="axis" x1="36" y1="260" x2="384" y2="260" />
        <text className="lbl" x="36" y="290">
          Link · Watch · Act
        </text>
        <SidePanel label="Heat-treatment lead" />
        <text data-sm-title className="val" x="436" y="104" {...TITLE}>
          Watching lots
        </text>
        <text data-sm-sub className="mute-txt" x="436" y="132" fontSize="13">
          Linked to process
        </text>
        <g data-pill className="sm-reveal">
          <rect className="pill-fill" x="436" y="160" width="128" height="30" rx="4" />
          <text className="pill-ink" x="448" y="180" {...PILL}>
            Hold charge
          </text>
        </g>
        <g data-card className="sm-reveal">
          <text className="mute-txt" x="436" y="232" fontSize="12">
            Record attached for the audit
          </text>
        </g>
      </svg>
    </StageShell>
  );
}

/* Planning: a die change runs long, three re-plans are compared, the best moves a job to Press 3. */
const OPTIONS = [
  { id: "a", name: "Option A", note: "Wait · two dispatches late" },
  { id: "b", name: "Option B", note: "Move job · all on time" },
  { id: "c", name: "Option C", note: "Overtime · more energy" },
];

function startPlanning(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const die = root.querySelector<SVGRectElement>("[data-die]");
  const late = (on: boolean) => {
    if (die) die.style.transform = on ? "scaleX(1.9)" : "scaleX(1)";
    die?.classList.toggle("is-late", on);
    toggle(root, "[data-late]", "is-on", on);
  };
  const reset = () => {
    late(false);
    moveTo(root, "[data-job]", 0, 0);
    toggle(root, "[data-opt], [data-card]", "is-on", false);
    toggle(root, "[data-optrow]", "is-on", false);
  };
  const compare = () => {
    toggle(root, "[data-optrow]", "is-on", true);
  };
  const best = () => {
    root.querySelector('[data-opt="b"]')?.classList.add("is-on");
  };
  const replan = () => {
    moveTo(root, "[data-job]", 50, 70);
    toggle(root, "[data-card]", "is-on", true);
  };

  if (reduce) {
    late(true);
    compare();
    best();
    replan();
    return () => undefined;
  }
  return cycle([
    [reset, 1300],
    [() => late(true), 1400],
    [compare, 1100],
    [best, 1000],
    [replan, 2600],
  ]);
}

function PlanningMethodVisual() {
  const rows = ["Press 1", "Press 2", "Press 3"];
  return (
    <StageShell
      className="hiw-ember sm-slot"
      label="A die change on Press 2 runs long. Three re-plans are compared for output, energy and delivery, and the best one moves a job to Press 3."
      start={startPlanning}
    >
      <svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="640" height="400" fill="#E35F3F" />
        <Panel label="Today's plan" />
        {rows.map((row, i) => (
          <g key={row}>
            <text className="lbl" x="36" y={104 + i * 70}>
              {row}
            </text>
            <line className="axis" x1="110" y1={122 + i * 70} x2="384" y2={122 + i * 70} />
          </g>
        ))}
        <rect className="sm-job" x="110" y="84" width="100" height="30" rx="3" />
        <rect className="sm-job" x="218" y="84" width="90" height="30" rx="3" />
        <rect data-die className="sm-job sm-stretch" x="110" y="154" width="70" height="30" rx="3" />
        <text className="lbl lbl-hi" x="118" y="174">
          Die chg
        </text>
        <rect className="sm-job" x="110" y="224" width="120" height="30" rx="3" />
        <g data-job className="sm-move">
          <rect className="sm-job" x="188" y="154" width="110" height="30" rx="3" />
          <text className="lbl lbl-hi" x="198" y="174">
            Lot [N]
          </text>
        </g>
        <text data-late className="lbl lbl-hi sm-reveal" x="110" y="208">
          Die change +[N] h
        </text>
        <text className="lbl" x="36" y="300">
          Track · Compare · Choose
        </text>
        <SidePanel label="Re-plan options" />
        {OPTIONS.map((o, i) => (
          <g key={o.id} data-optrow className="sm-reveal">
            <g data-opt={o.id} className="sm-dim">
              <text className="val" x="436" y={96 + i * 54} {...PILL}>
                {o.name}
              </text>
              <text className="mute-txt" x="436" y={116 + i * 54} fontSize="12">
                {o.note}
              </text>
            </g>
          </g>
        ))}
        <g data-card className="sm-reveal">
          <rect className="pill-fill" x="436" y="276" width="136" height="30" rx="4" />
          <text className="pill-ink" x="448" y="296" {...PILL}>
            Re-plan ready
          </text>
          <text className="mute-txt" x="436" y="330" fontSize="12">
            Confirm by [time]
          </text>
        </g>
      </svg>
    </StageShell>
  );
}

/* Maintenance: energy per unit drifts above normal, stops re-rank by cost, the fix slots into a plan gap. */
const DRIFT = (() => {
  const xs: number[] = [];
  const ys: number[] = [];
  for (let i = 0; i < 60; i++) {
    const f = i / 59;
    xs.push(36 + f * 348);
    ys.push(132 - 64 * f * f + 4 * Math.sin(i * 1.7) + 2 * Math.sin(i * 4.1));
  }
  return poly(xs, ys);
})();
const STOPS = [
  { id: "press", name: "Press 2 · clamp", start: 0, end: 1 },
  { id: "furnace", name: "Furnace 1 · burners", start: 1, end: 0 },
  { id: "belt", name: "Conveyor · belt", start: 2, end: 2 },
];

function startMaintenance(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const line = root.querySelector<SVGPathElement>("[data-drift]");
  if (!line) return () => undefined;
  const len = line.getTotalLength();
  line.style.strokeDasharray = String(len);

  const rank = (key: "start" | "end") =>
    STOPS.forEach((s) => moveTo(root, `[data-stop="${s.id}"]`, 0, s[key] * 46));
  const reset = () => {
    line.style.transition = "none";
    line.style.strokeDashoffset = String(len);
    rank("start");
    toggle(root, '[data-stop="furnace"] .sm-dim', "is-on", false);
    toggle(root, "[data-card]", "is-on", false);
    moveTo(root, "[data-fix]", 0, 70);
    toggle(root, "[data-fix]", "is-on", false);
  };
  const draw = () => {
    line.style.transition = "stroke-dashoffset 2.4s cubic-bezier(0.25, 1, 0.5, 1)";
    line.style.strokeDashoffset = "0";
  };
  const rerank = () => {
    rank("end");
    toggle(root, '[data-stop="furnace"] .sm-dim', "is-on", true);
  };
  const slot = () => {
    moveTo(root, "[data-fix]", 0, 0);
    toggle(root, "[data-fix], [data-card]", "is-on", true);
  };

  if (reduce) {
    line.style.strokeDashoffset = "0";
    rerank();
    slot();
    return () => undefined;
  }
  return cycle([
    [reset, 500],
    [draw, 2600],
    [rerank, 1300],
    [slot, 2600],
  ]);
}

function MaintenanceMethodVisual() {
  return (
    <StageShell
      className="hiw-wine sm-slot"
      label="Gas per kilo on the same recipe drifts above normal, Furnace 1 moves to the top of the stops ranked by cost, and the burner check slots into a gap in this week's plan."
      start={startMaintenance}
    >
      <svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="640" height="400" fill="#761438" />
        <Panel label="Gas per kg · same recipe" />
        <line className="base-line" x1="36" y1="132" x2="384" y2="132" />
        <text className="lbl" x="36" y="152">
          Normal
        </text>
        <path className="spark" data-drift d={DRIFT} />
        <text className="lbl" x="36" y="208">
          This week&apos;s plan
        </text>
        <rect className="sm-job" x="36" y="222" width="96" height="34" rx="3" />
        <rect className="sm-job" x="140" y="222" width="70" height="34" rx="3" />
        <rect className="sm-gap" x="218" y="222" width="80" height="34" rx="3" />
        <rect className="sm-job" x="306" y="222" width="78" height="34" rx="3" />
        <g data-fix className="sm-move sm-reveal">
          <rect className="pill-fill" x="218" y="222" width="80" height="34" rx="3" />
          <text className="pill-ink" x="226" y="244" fontSize="11" fontWeight="700">
            Burner chk
          </text>
        </g>
        <text className="lbl" x="36" y="300">
          Rank · Watch the drift · Plan the window
        </text>
        <SidePanel label="Stops by cost" />
        {STOPS.map((s) => (
          <g key={s.id} data-stop={s.id} className="sm-move" style={{ transform: `translate(0px, ${s.start * 46}px)` }}>
            <g className={s.id === "furnace" ? "sm-dim" : undefined}>
              <text className="val" x="436" y="96" fontSize="13" fontWeight="700">
                {s.name}
              </text>
            </g>
          </g>
        ))}
        <g data-card className="sm-reveal">
          <rect className="pill-fill" x="436" y="276" width="112" height="30" rx="4" />
          <text className="pill-ink" x="448" y="296" {...PILL}>
            Prescribed
          </text>
          <text className="mute-txt" x="436" y="330" fontSize="12">
            Moves no charge
          </text>
        </g>
      </svg>
    </StageShell>
  );
}

const VISUALS: Record<SolutionAreaSlug, ComponentType> = {
  process: ProcessMethodVisual,
  quality: QualityMethodVisual,
  planning: PlanningMethodVisual,
  maintenance: MaintenanceMethodVisual,
};

export function SolutionMethodVisual({ slug }: { slug: SolutionAreaSlug }) {
  const Visual = VISUALS[slug];
  return <Visual />;
}

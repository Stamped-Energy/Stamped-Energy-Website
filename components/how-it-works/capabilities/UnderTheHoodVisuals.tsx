"use client";

import type { ComponentType } from "react";

import { StageShell } from "@/components/motion-slots/HiwStageVisuals";
import { cycle, setText } from "@/components/motion-slots/SolutionsAreaVisuals";
import type { SlotLoopOptions } from "@/components/motion-slots/useSlotLoop";

import "./under-the-hood.css";

const TITLE = { fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 18 } as const;
const SUB = { fontFamily: "Inter, sans-serif", fontSize: 13 } as const;
const PILL = { fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 14 } as const;
const MONO = { fontFamily: "IBM Plex Mono, monospace", fontSize: 13, letterSpacing: 0.3 } as const;
const ROW = { fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 14 } as const;

function Card({
  role,
  title,
  sub,
  sub2,
  pill,
  foot,
}: {
  role: string;
  title: string;
  sub: string;
  sub2?: string;
  pill: string;
  foot: string;
}) {
  return (
    <g>
      <rect className="rx" x="396" y="20" width="224" height="360" rx="8" />
      <circle className="live-dot" cx="416" cy="48" r="4" />
      <text className="lbl lbl-hi" x="428" y="52">
        {role}
      </text>
      <text data-uh-title className="val" x="416" y="148" {...TITLE}>
        {title}
      </text>
      <text data-uh-sub className="mute-txt" x="416" y="176" {...SUB}>
        {sub}
      </text>
      <text data-uh-sub2 className="mute-txt" x="416" y="196" {...SUB}>
        {sub2 ?? ""}
      </text>
      <g data-uh-pill className="uh-pop">
        <rect className="pill-fill" x="416" y="216" width="104" height="30" rx="4" />
        <text className="pill-ink" x="428" y="236" {...PILL}>
          {pill}
        </text>
      </g>
      <text className="lbl" x="416" y="360">
        {foot}
      </text>
    </g>
  );
}

function setCard(root: HTMLElement, title: string, sub: string, sub2 = "", pill = false) {
  setText(root, "[data-uh-title]", title);
  setText(root, "[data-uh-sub]", sub);
  setText(root, "[data-uh-sub2]", sub2);
  root.querySelector("[data-uh-pill]")?.classList.toggle("is-on", pill);
}

/* Connect and clean up: each source arrives in its own format and is lined up to one clock and one set of names. */
const SOURCES = [
  { src: "Machines", raw: "PRS_02 · 08:32:07Z", clean: "Press 2 · 14:02" },
  { src: "Control", raw: "TT-104 · 1412.6 °F", clean: "Furnace 1 · 767 °C" },
  { src: "Meters", raw: "MTR7 · 0.1 kWh units", clean: "Press 2 · kWh" },
  { src: "ERP", raw: "WO-5531 / L2417", clean: "Lot 2417 · Press 2" },
  { src: "Quality", raw: "b2417 · 2:05 PM", clean: "Lot 2417 · 14:05" },
  { src: "Operators", raw: "“die chngd p2”", clean: "Die change · Press 2" },
] as const;

function startConnect(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const rows = [...root.querySelectorAll<SVGGElement>("[data-uh-row]")];
  const reset = () => {
    rows.forEach((row) => row.classList.remove("is-done"));
    setCard(root, "Reading sources", "Six systems, as recorded");
  };
  const done = () => setCard(root, "Lined up", "One clock, one set of names", "Units converted", true);

  if (reduce) {
    rows.forEach((row) => row.classList.add("is-done"));
    done();
    return () => undefined;
  }
  return cycle([
    [reset, 1200],
    ...rows.map((row): [() => void, number] => [() => row.classList.add("is-done"), 420]),
    [done, 2800],
  ]);
}

function ConnectVisual() {
  return (
    <StageShell
      className="hiw-forest uh-slot"
      label="Records from machines, control systems, meters, ERP, quality and operators arrive in different formats and are lined up to one clock, one set of units and one set of names."
      start={startConnect}
    >
      <svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="640" height="400" fill="#4A634D" />
        <rect className="chip" x="20" y="20" width="360" height="360" rx="8" />
        <text className="lbl" x="36" y="48">
          Your systems · as recorded
        </text>
        {SOURCES.map((row, i) => {
          const y = 98 + i * 48;
          return (
            <g key={row.src} data-uh-row className="uh-row">
              <text className="lbl" x="36" y={y}>
                {row.src}
              </text>
              <text className="val uh-raw" x="128" y={y} {...MONO}>
                {row.raw}
              </text>
              <text className="val uh-clean" x="128" y={y} {...ROW}>
                {row.clean}
              </text>
              <text className="val uh-tick" x="350" y={y} {...ROW}>
                ✓
              </text>
              <line className="axis" x1="36" y1={y + 16} x2="364" y2={y + 16} />
            </g>
          );
        })}
        <Card role="Stamped" title="Reading sources" sub="Six systems, as recorded" pill="Ready" foot="Nothing new to install" />
      </svg>
    </StageShell>
  );
}

/* One timeline: a playhead runs along press, furnace, shift and lot lanes and stops at the moment a rejected lot was made. */
const LANE_X0 = 116;
const LANE_X1 = 364;
const MOMENT_X = 286;
const LANES = ["Press 2", "Furnace 1", "Shift", "Lots"] as const;
const LANE_Y = [92, 148, 204, 260];
const LOTS = [
  { id: "2414", x: 140 },
  { id: "2415", x: 188 },
  { id: "2416", x: 236 },
  { id: "2417", x: MOMENT_X, hot: true },
  { id: "2418", x: 334 },
];

function startTimeline(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const head = root.querySelector<SVGGElement>("[data-uh-head]");
  if (!head) return () => undefined;
  const moveTo = (x: number, seconds: number) => {
    head.style.transition = seconds ? `transform ${seconds}s cubic-bezier(0.45, 0, 0.25, 1)` : "none";
    head.style.transform = `translateX(${x - LANE_X0}px)`;
  };
  const reset = () => {
    root.classList.remove("is-found");
    moveTo(LANE_X0, 0);
    setCard(root, "Following lots", "Every source, one timeline");
  };
  const found = () => {
    root.classList.add("is-found");
    setCard(root, "Lot 2417 rejected", "Press 2 die running cold", "Furnace 1 late · night shift", true);
  };

  if (reduce) {
    moveTo(MOMENT_X, 0);
    found();
    return () => undefined;
  }
  return cycle([
    [reset, 500],
    [() => moveTo(MOMENT_X, 2.2), 2300],
    [found, 3200],
  ]);
}

function TimelineVisual() {
  return (
    <StageShell
      className="hiw-acid uh-slot"
      label="Press, furnace, shift and lot records on one timeline. A rejected lot is traced to what the press, the furnace and the shift were doing when it was made."
      start={startTimeline}
    >
      <svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="640" height="400" fill="#EEF981" />
        <rect className="chip" x="20" y="20" width="360" height="360" rx="8" />
        <text className="lbl" x="36" y="48">
          One timeline · whole plant
        </text>
        {LANES.map((lane, i) => (
          <g key={lane}>
            <text className="lbl" x="36" y={LANE_Y[i] + 4}>
              {lane}
            </text>
            <line className="axis" x1={LANE_X0} y1={LANE_Y[i] + 18} x2={LANE_X1} y2={LANE_Y[i] + 18} />
          </g>
        ))}
        <rect className="uh-seg" x={LANE_X0} y={LANE_Y[0] - 10} width="140" height="20" rx="3" />
        <rect className="uh-seg uh-hot" x="262" y={LANE_Y[0] - 10} width="48" height="20" rx="3" />
        <rect className="uh-seg" x="316" y={LANE_Y[0] - 10} width="48" height="20" rx="3" />
        <rect className="uh-seg" x={LANE_X0} y={LANE_Y[1] - 10} width="110" height="20" rx="3" />
        <rect className="uh-seg uh-hot" x="232" y={LANE_Y[1] - 10} width="78" height="20" rx="3" />
        <rect className="uh-seg" x={LANE_X0} y={LANE_Y[2] - 10} width="132" height="20" rx="3" />
        <rect className="uh-seg uh-hot" x="252" y={LANE_Y[2] - 10} width="112" height="20" rx="3" />
        <text className="lbl" x="124" y={LANE_Y[2] + 4}>
          Day
        </text>
        <text className="lbl uh-hot-lbl" x="260" y={LANE_Y[2] + 4}>
          Night
        </text>
        {LOTS.map((lot) => (
          <g key={lot.id}>
            <rect className={lot.hot ? "uh-lot uh-hot" : "uh-lot"} x={lot.x - 18} y={LANE_Y[3] - 10} width="36" height="20" rx="3" />
            <text className="pill-ink" x={lot.x} y={LANE_Y[3] + 4} textAnchor="middle" {...MONO} fontSize="10">
              {lot.id}
            </text>
          </g>
        ))}
        <g data-uh-head>
          <line className="uh-head" x1={LANE_X0} y1="68" x2={LANE_X0} y2="292" />
          <circle className="live-dot" cx={LANE_X0} cy="68" r="4" />
        </g>
        <text className="lbl" x="36" y="340">
          Same moment, every source
        </text>
        <Card role="Quality engineer" title="Following lots" sub="Every source, one timeline" pill="In context" foot="Traced in one view" />
      </svg>
    </StageShell>
  );
}

/* Model and rank: losses found against the plant's normal, fixes checked against today's plan, the rest ranked by cost. */
const LOSSES = [
  { id: "restarts", label: "Restarts differ by shift", w: 150, rank: 1 },
  { id: "speed", label: "Raise line speed", w: 200, rank: 3, blocked: "Next station is full" },
  { id: "die", label: "Die running cold", w: 250, rank: 0 },
  { id: "wait", label: "Lots wait for furnace", w: 100, rank: 2 },
] as const;
const RANK_Y0 = 84;
const RANK_STEP = 64;

function startRank(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const rows = [...root.querySelectorAll<SVGGElement>("[data-uh-rank]")];
  const place = (ranked: boolean) => {
    rows.forEach((row, i) => {
      const slot = ranked ? LOSSES[i].rank : i;
      row.style.transform = `translateY(${(slot - i) * RANK_STEP}px)`;
    });
    root.classList.toggle("is-ranked", ranked);
  };
  const block = (on: boolean) => {
    rows.forEach((row, i) => row.classList.toggle("is-blocked", on && "blocked" in LOSSES[i]));
  };
  const reset = () => {
    place(false);
    block(false);
    setCard(root, "Normal learned", "From Line 2's own history", "Digital twin of the line");
  };
  const check = () => {
    block(true);
    setCard(root, "Fixes checked", "Against today's plan", "One option blocked");
  };
  const rank = () => {
    place(true);
    setCard(root, "Die running cold", "Top loss by cost", "For the process engineer", true);
  };

  if (reduce) {
    block(true);
    place(true);
    rank();
    return () => undefined;
  }
  return cycle([
    [reset, 1800],
    [check, 1800],
    [rank, 3200],
  ]);
}

function RankVisual() {
  return (
    <StageShell
      className="hiw-ember uh-slot"
      label="Losses found against the line's normal running. Each fix is checked against today's plan, one is blocked, and the rest are ranked by what they cost."
      start={startRank}
    >
      <svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="640" height="400" fill="#E35F3F" />
        <rect className="chip" x="20" y="20" width="360" height="360" rx="8" />
        <text className="lbl" x="36" y="48">
          Losses found · Line 2
        </text>
        {LOSSES.map((loss, i) => {
          const y = RANK_Y0 + i * RANK_STEP;
          return (
            <g key={loss.id} data-uh-rank className="uh-rank">
              <text className="lbl uh-num" x="36" y={y + 6}>
                {`0${loss.rank + 1}`}
              </text>
              <text className="val" x="68" y={y + 6} {...ROW}>
                {loss.label}
              </text>
              <rect className="uh-bar" x="68" y={y + 18} width={loss.w} height="10" rx="2" />
              {"blocked" in loss ? (
                <g className="uh-strike">
                  <line className="axis" x1="64" y1={y + 1} x2="200" y2={y + 1} style={{ opacity: 1 }} />
                  <text className="lbl lbl-hi" x="68" y={y + 46}>
                    {loss.blocked}
                  </text>
                </g>
              ) : null}
            </g>
          );
        })}
        <text className="lbl" x="36" y="364">
          Bar length · what it costs
        </text>
        <Card role="Models" title="Normal learned" sub="From Line 2's own history" sub2="Digital twin of the line" pill="Rank 1" foot="Ranked by what it costs" />
      </svg>
    </StageShell>
  );
}

/* Send, follow up and check: one action moves from sent to closed, with the result checked and kept on record. */
const STEPS = [
  { label: "Sent on WhatsApp", sub: "To the shift lead", title: "Sent", note: "Open until closed" },
  { label: "Accepted by your team", sub: "Your team decides", title: "Accepted", note: "Owner: shift lead" },
  { label: "Change made on Line 2", sub: "Heater kept warm", title: "Change made", note: "Logged with the shift" },
  { label: "Checked against baseline", sub: "Your own numbers", title: "Result checked", note: "Against your baseline" },
  { label: "Kept on record", sub: "Decision and result", title: "On record", note: "Decision and result kept" },
] as const;

function startFollow(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const steps = [...root.querySelectorAll<SVGGElement>("[data-uh-step]")];
  const show = (n: number) => () => {
    steps.forEach((step, i) => step.classList.toggle("is-on", i <= n));
    const step = STEPS[n];
    setCard(root, step.title, step.note, "", n === STEPS.length - 1);
  };
  const reset = () => {
    steps.forEach((step) => step.classList.remove("is-on"));
    setCard(root, "New action", "Keep heater warm on stops");
  };

  if (reduce) {
    show(STEPS.length - 1)();
    return () => undefined;
  }
  return cycle([[reset, 1200], ...STEPS.map((_, i): [() => void, number] => [show(i), i === STEPS.length - 1 ? 2800 : 1000])]);
}

function FollowVisual() {
  return (
    <StageShell
      className="hiw-wine uh-slot"
      label="An action is sent to its owner, accepted by the team, carried out, checked against the plant's own baseline and kept on record."
      start={startFollow}
    >
      <svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="640" height="400" fill="#761438" />
        <rect className="chip" x="20" y="20" width="360" height="360" rx="8" />
        <text className="lbl" x="36" y="48">
          Action · keep heater warm
        </text>
        <line className="axis" x1="48" y1="92" x2="48" y2={92 + (STEPS.length - 1) * 58} />
        {STEPS.map((step, i) => {
          const y = 92 + i * 58;
          return (
            <g key={step.label} data-uh-step className="uh-step">
              <circle className="uh-dot" cx="48" cy={y} r="7" />
              <text className="val" x="72" y={y + 2} {...ROW}>
                {step.label}
              </text>
              <text className="mute-txt" x="72" y={y + 20} {...SUB}>
                {step.sub}
              </text>
            </g>
          );
        })}
        <Card role="Shift lead" title="New action" sub="Keep heater warm on stops" pill="Closed" foot="Your team decides" />
      </svg>
    </StageShell>
  );
}

export const UNDER_THE_HOOD_VISUALS: Record<string, ComponentType> = {
  ingestion: ConnectVisual,
  repository: TimelineVisual,
  intelligence: RankVisual,
  governance: FollowVisual,
};

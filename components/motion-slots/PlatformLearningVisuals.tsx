"use client";

import { StageShell } from "./HiwStageVisuals";
import { toggle } from "./SolutionMethodVisuals";
import { cycle, setText } from "./SolutionsAreaVisuals";
import type { SlotLoopOptions } from "./useSlotLoop";

import "./method-visuals.css";

const BOLD = { fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 } as const;

/* Self-improvement: last week's decisions feed playbook counts, a candidate beats the live version on replay, the team approves. */
const DECISIONS = [
  { id: "ok", text: "Accepted · worked" },
  { id: "no", text: "Turned down · no change" },
  { id: "held", text: "Held back · checked later" },
];
const PLAYBOOK = [
  { id: "warm", text: "Warm heater on short stops", before: "helped 12 · hurt 1", after: "helped 13 · hurt 1" },
  { id: "quench", text: "Hold charge on hot quench", before: "helped 8 · hurt 2", after: "helped 9 · hurt 2" },
];

function startImprove(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const candidate = root.querySelector<SVGRectElement>("[data-candidate]");
  const counts = (key: "before" | "after") =>
    PLAYBOOK.forEach((p) => setText(root, `[data-count="${p.id}"]`, p[key]));
  const score = (better: boolean) => {
    if (candidate) candidate.style.transform = better ? "scaleX(1.3)" : "scaleX(0.7)";
  };
  const reset = () => {
    toggle(root, "[data-decision], [data-replay], [data-card]", "is-on", false);
    counts("before");
    score(false);
  };
  const decide = (i: number) => () => root.querySelector(`[data-decision="${DECISIONS[i].id}"]`)?.classList.add("is-on");
  const learn = () => counts("after");
  const replay = () => {
    toggle(root, "[data-replay]", "is-on", true);
    score(true);
  };
  const approve = () => toggle(root, "[data-card]", "is-on", true);

  if (reduce) {
    DECISIONS.forEach((_, i) => decide(i)());
    learn();
    replay();
    approve();
    return () => undefined;
  }
  return cycle([
    [reset, 1000],
    [decide(0), 650],
    [decide(1), 650],
    [decide(2), 900],
    [learn, 1200],
    [replay, 1500],
    [approve, 2600],
  ]);
}

export function ImproveLoopVisual() {
  return (
    <StageShell
      className="hiw-forest sm-slot"
      label="Last week's decisions, accepted, turned down and held back, update the playbook's helped and hurt counts. An improved version beats the live one on a replay of past shifts, and the team approves it."
      start={startImprove}
    >
      <svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="640" height="400" fill="#4A634D" />
        <rect className="chip" x="20" y="20" width="380" height="170" rx="8" />
        <text className="lbl" x="36" y="44">
          Last week&apos;s decisions
        </text>
        {DECISIONS.map((d, i) => (
          <g key={d.id} data-decision={d.id} className="sm-reveal">
            <circle className="live-dot" cx="42" cy={82 + i * 38} r="4" />
            <text className="val" x="56" y={87 + i * 38} {...BOLD} fontSize="15">
              {d.text}
            </text>
          </g>
        ))}
        <rect className="chip" x="20" y="206" width="380" height="174" rx="8" />
        <text className="lbl" x="36" y="230">
          Replay on past shifts
        </text>
        <text className="mute-txt" x="36" y="268" fontSize="12">
          Live version
        </text>
        <rect className="sm-job" x="36" y="276" width="200" height="22" rx="3" />
        <text className="mute-txt" x="36" y="324" fontSize="12">
          Improved version
        </text>
        <rect
          data-candidate
          className="sm-job sm-stretch is-late"
          x="36"
          y="332"
          width="200"
          height="22"
          rx="3"
          style={{ transform: "scaleX(0.7)" }}
        />
        <text data-replay className="lbl lbl-hi sm-reveal" x="310" y="348">
          Better
        </text>
        <rect className="rx" x="416" y="20" width="204" height="360" rx="8" />
        <circle className="live-dot" cx="436" cy="44" r="4" />
        <text className="lbl lbl-hi" x="448" y="48">
          Playbook
        </text>
        {PLAYBOOK.map((p, i) => (
          <g key={p.id}>
            <text className="val" x="436" y={92 + i * 62} {...BOLD} fontSize="12">
              {p.text}
            </text>
            <text data-count={p.id} className="mute-txt" x="436" y={114 + i * 62} fontSize="12">
              {p.before}
            </text>
          </g>
        ))}
        <g data-card className="sm-reveal">
          <rect className="pill-fill" x="436" y="276" width="140" height="30" rx="4" />
          <text className="pill-ink" x="448" y="296" {...BOLD} fontSize="14">
            Team approved
          </text>
          <text className="mute-txt" x="436" y="330" fontSize="12">
            Live · one-step rollback
          </text>
        </g>
      </svg>
    </StageShell>
  );
}

/* Ask: a question, the records Stamped reads, a checked answer, and the answer becoming an action. */
const SOURCES = ["Heater log", "Rejections", "Shift roster"];

function startAsk(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const reset = () => toggle(root, "[data-q], [data-src], [data-answer], [data-card]", "is-on", false);
  const ask = () => toggle(root, "[data-q]", "is-on", true);
  const read = (i: number) => () => root.querySelector(`[data-src="${i}"]`)?.classList.add("is-on");
  const answer = () => toggle(root, "[data-answer]", "is-on", true);
  const act = () => toggle(root, "[data-card]", "is-on", true);

  if (reduce) {
    ask();
    SOURCES.forEach((_, i) => read(i)());
    answer();
    act();
    return () => undefined;
  }
  return cycle([
    [reset, 900],
    [ask, 1100],
    [read(0), 550],
    [read(1), 550],
    [read(2), 800],
    [answer, 1400],
    [act, 2600],
  ]);
}

export function AskPlantVisual() {
  return (
    <StageShell
      className="hiw-acid sm-slot"
      label="Someone asks where good parts are being lost this week. Stamped reads the heater log, the rejections and the shift roster, answers with every number checked, and the answer becomes an action for the shift lead."
      start={startAsk}
    >
      <svg viewBox="0 0 720 450" xmlns="http://www.w3.org/2000/svg">
        <rect width="720" height="450" fill="#EEF981" />
        <g data-q className="sm-reveal">
          <rect className="rx" x="228" y="28" width="464" height="56" rx="8" />
          <text className="val" x="248" y="62" {...BOLD} fontSize="18">
            Where are we losing good parts this week?
          </text>
        </g>
        {SOURCES.map((s, i) => (
          <g key={s} data-src={i} className="sm-reveal">
            <rect className="chip" x={28 + i * 196} y="108" width="184" height="40" rx="6" />
            <text className="lbl lbl-hi" x={44 + i * 196} y="133">
              Read · {s}
            </text>
          </g>
        ))}
        <g data-answer className="sm-reveal">
          <rect className="chip" x="28" y="172" width="664" height="160" rx="8" />
          <text className="lbl" x="48" y="198">
            Answer
          </text>
          <text className="val" x="48" y="236" {...BOLD} fontSize="24">
            Restarts on Press 2
          </text>
          <text className="mute-txt" x="48" y="268" fontSize="16">
            [N] parts out of window after short stops, mostly on night shift
          </text>
          <text className="mute-txt" x="48" y="306" fontFamily="IBM Plex Mono, monospace" fontSize="13" letterSpacing="0.4">
            Every number checked against the records
          </text>
        </g>
        <g data-card className="sm-reveal">
          <rect className="pill-fill" x="28" y="356" width="200" height="36" rx="4" />
          <text className="pill-ink" x="44" y="380" {...BOLD} fontSize="17">
            Make it an action
          </text>
          <text className="mute-txt" x="248" y="380" fontSize="15">
            For the shift lead, with a check after
          </text>
        </g>
      </svg>
    </StageShell>
  );
}

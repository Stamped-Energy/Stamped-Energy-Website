"use client";

import { useId } from "react";

import { useSlotLoop, type SlotLoopOptions } from "./useSlotLoop";

import "./problem-strips.css";

type TweenJob = {
  from: number;
  to: number;
  dur: number;
  t0: number;
  apply: (v: number) => void;
  resolve: () => void;
};

const SLIDER_PATHS = [
  [78, 22, 64, 18, 86, 40, 12, 70],
  [50, 84, 28, 72, 16, 58, 90, 34],
  [16, 60, 88, 30, 74, 20, 52, 82],
  [60, 14, 48, 80, 26, 68, 10, 44],
  [36, 76, 20, 54, 86, 32, 66, 12],
];

function startPriorities(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const knobs = [
    { el: root.querySelector<SVGCircleElement>("[data-k='1']"), on: false },
    { el: root.querySelector<SVGCircleElement>("[data-k='2']"), on: true },
    { el: root.querySelector<SVGCircleElement>("[data-k='3']"), on: false },
  ];
  const sliders = [...root.querySelectorAll<SVGCircleElement>("[data-slider]")];
  const sandTop = root.querySelector<SVGPathElement>("[data-sand='top']");
  const sandBot = root.querySelector<SVGPathElement>("[data-sand='bot']");
  const stream = root.querySelector<SVGLineElement>("[data-sand='stream']");
  if (!sandTop || !sandBot || knobs.some((k) => !k.el)) return () => undefined;
  if (reduce) return () => undefined;

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);
  const jobs: TweenJob[] = [];
  const timers: number[] = [];
  let raf = 0;
  let live = true;
  let dash = 0;
  let streamAmt = 0.55;

  const tween = (from: number, to: number, dur: number, apply: (v: number) => void) =>
    new Promise<void>((resolve) => {
      if (!live) {
        resolve();
        return;
      }
      jobs.push({ from, to, dur, apply, resolve, t0: performance.now() });
    });

  const wait = (ms: number) =>
    new Promise<void>((resolve) => {
      if (!live) {
        resolve();
        return;
      }
      timers.push(window.setTimeout(resolve, ms));
    });

  const paintSand = (u: number) => {
    const topY = 8 + 28 * (1 - u);
    const topHalf = 2.2 + 11.5 * u;
    sandTop.setAttribute("d", `M${18 - topHalf} ${topY} L${18 + topHalf} ${topY} L18 41 Z`);
    sandTop.setAttribute("opacity", String(0.22 + 0.63 * u));
    const botY = 82 - 28 * (1 - u);
    const botHalf = 2.2 + 11.5 * (1 - u);
    sandBot.setAttribute("d", `M${18 - botHalf} ${botY} L${18 + botHalf} ${botY} L18 51 Z`);
    sandBot.setAttribute("opacity", String(0.22 + 0.63 * (1 - u)));
  };

  const knobsLoop = async () => {
    const order = [0, 1, 2, 0, 2, 1];
    let i = 0;
    while (live) {
      const k = knobs[order[i % order.length]];
      if (!k?.el) return;
      const from = k.on ? 27 : 9;
      const to = k.on ? 9 : 27;
      k.on = !k.on;
      const move = tween(from, to, 720, (v) => k.el!.setAttribute("cx", String(v)));
      await wait(380);
      await move;
      i += 1;
    }
  };

  const sliderLoop = async (el: SVGCircleElement, idx: number) => {
    const path = SLIDER_PATHS[idx] ?? SLIDER_PATHS[0];
    let cur = parseFloat(el.getAttribute("cy") || "") || path[0] || 50;
    await wait(70 + idx * 170);
    let n = 0;
    while (live) {
      n = (n + 1) % path.length;
      const to = path[n] ?? cur;
      await tween(cur, to, 980 + idx * 70, (v) => el.setAttribute("cy", String(v)));
      cur = to;
      await wait(120 + (idx % 3) * 80);
    }
  };

  const sandLoop = async () => {
    paintSand(1);
    while (live) {
      streamAmt = 1;
      await tween(1, 0, 3800, paintSand);
      streamAmt = 0.18;
      await wait(460);
      streamAmt = 0.5;
      await tween(0, 1, 3400, paintSand);
      streamAmt = 0.12;
      await wait(380);
    }
  };

  const frame = (now: number) => {
    if (!live) return;
    dash += 0.52;
    if (stream) {
      stream.setAttribute("stroke-dashoffset", String(-dash));
      stream.setAttribute("opacity", String(0.18 + 0.5 * streamAmt));
    }
    for (let i = jobs.length - 1; i >= 0; i--) {
      const job = jobs[i];
      const u = Math.min(1, (now - job.t0) / job.dur);
      job.apply(job.from + (job.to - job.from) * easeOut(u));
      if (u >= 1) {
        job.resolve();
        jobs.splice(i, 1);
      }
    }
    raf = requestAnimationFrame(frame);
  };

  raf = requestAnimationFrame(frame);
  void knobsLoop();
  sliders.forEach((el, i) => {
    void sliderLoop(el, i);
  });
  void sandLoop();

  return () => {
    live = false;
    cancelAnimationFrame(raf);
    timers.forEach((id) => window.clearTimeout(id));
    jobs.splice(0).forEach((job) => job.resolve());
  };
}

export function ProblemPrioritiesVisual() {
  const ref = useSlotLoop(startPriorities);

  return (
    <div
      ref={ref}
      className="hp-strip"
      role="img"
      aria-label="Signals without a ranked next action: toggles, sliders, and an hourglass."
    >
      <svg viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke="#fbfcf9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <g transform="translate(28, 36)">
            <rect x="0" y="0" width="36" height="18" rx="9" />
            <circle data-k="1" cx="9" cy="9" r="6" fill="#fbfcf9" stroke="none" />
            <rect x="0" y="30" width="36" height="18" rx="9" />
            <circle data-k="2" cx="27" cy="39" r="6" fill="#fbfcf9" stroke="none" />
            <rect x="0" y="60" width="36" height="18" rx="9" />
            <circle data-k="3" cx="9" cy="69" r="6" fill="#fbfcf9" stroke="none" />
          </g>
          <g transform="translate(88, 30)">
            <line x1="0" y1="0" x2="0" y2="100" />
            <line x1="20" y1="0" x2="20" y2="100" />
            <line x1="40" y1="0" x2="40" y2="100" />
            <line x1="60" y1="0" x2="60" y2="100" />
            <line x1="80" y1="0" x2="80" y2="100" />
            <circle data-slider cx="0" cy="78" r="5.5" fill="#fbfcf9" stroke="none" />
            <circle data-slider cx="20" cy="50" r="5.5" fill="#fbfcf9" stroke="none" />
            <circle data-slider cx="40" cy="16" r="5.5" fill="#fbfcf9" stroke="none" />
            <circle data-slider cx="60" cy="60" r="5.5" fill="#fbfcf9" stroke="none" />
            <circle data-slider cx="80" cy="36" r="5.5" fill="#fbfcf9" stroke="none" />
          </g>
          <g transform="translate(188, 34)">
            <path d="M0 0 H36 M0 92 H36 M0 0 L18 46 L36 0 M0 92 L18 46 L36 92" />
            <path data-sand="top" d="M6.5 8 L29.5 8 L18 41 Z" fill="#fbfcf9" stroke="none" opacity="0.85" />
            <path data-sand="bot" d="M16 80 L20 80 L18 51 Z" fill="#fbfcf9" stroke="none" opacity="0.22" />
            <line
              data-sand="stream"
              className="hp-a01-stream"
              x1="18"
              y1="42"
              x2="18"
              y2="51"
              opacity="0.55"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function startWindows(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const path = root.querySelector<SVGPathElement>("[data-tod-path]");
  const dot = root.querySelector<SVGCircleElement>("[data-tod-dot]");
  if (!path || !dot) return () => undefined;

  const len = path.getTotalLength();
  path.style.strokeDasharray = String(len);

  const placeDot = (dist: number) => {
    const p = path.getPointAtLength(Math.max(0, Math.min(len, dist)));
    dot.setAttribute("cx", String(p.x));
    dot.setAttribute("cy", String(p.y));
  };

  if (reduce) {
    path.style.strokeDashoffset = "0";
    placeDot(len);
    return () => undefined;
  }

  const DRAW_MS = 2200;
  const HOLD_MS = 500;
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);
  let raf = 0;
  let hold = 0;
  let live = true;

  const cycle = () => {
    if (!live) return;
    path.style.strokeDashoffset = String(len);
    placeDot(0);
    const t0 = performance.now();
    const frame = (now: number) => {
      if (!live) return;
      const u = Math.min(1, (now - t0) / DRAW_MS);
      const dist = easeOut(u) * len;
      path.style.strokeDashoffset = String(len - dist);
      placeDot(dist);
      if (u < 1) raf = requestAnimationFrame(frame);
      else hold = window.setTimeout(cycle, HOLD_MS);
    };
    raf = requestAnimationFrame(frame);
  };
  cycle();

  return () => {
    live = false;
    cancelAnimationFrame(raf);
    window.clearTimeout(hold);
  };
}

export function ProblemWindowsVisual() {
  const ref = useSlotLoop(startWindows);

  return (
    <div
      ref={ref}
      className="hp-strip"
      role="img"
      aria-label="A stepped time-of-day path drawing left to right before the window closes."
    >
      <svg viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
        <line x1="24" y1="22" x2="216" y2="22" stroke="#fbfcf9" strokeWidth="1.5" />
        <g fill="none" stroke="#fbfcf9" strokeWidth="1.5" strokeLinecap="square">
          <line x1="36" y1="36" x2="36" y2="158" />
          <line x1="30" y1="44" x2="36" y2="44" />
          <line x1="30" y1="58" x2="36" y2="58" />
          <line x1="30" y1="72" x2="36" y2="72" />
          <line x1="30" y1="86" x2="36" y2="86" />
          <line x1="30" y1="100" x2="36" y2="100" />
          <line x1="30" y1="114" x2="36" y2="114" />
          <line x1="30" y1="128" x2="36" y2="128" />
          <line x1="30" y1="142" x2="36" y2="142" />
          <line x1="30" y1="156" x2="36" y2="156" />
          <line x1="36" y1="100" x2="216" y2="100" strokeDasharray="2 4" opacity="0.55" />
        </g>
        <path
          className="hp-a02-path"
          data-tod-path
          d="M36 114 H56 V72 H76 V128 H96 V58 H116 V142 H136 V86 H156 V128 H176 V72 H196 V100 H216"
        />
        <circle className="hp-a02-dot" data-tod-dot cx="36" cy="114" r="4.5" />
      </svg>
    </div>
  );
}

function startDecisions(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const stack = root.querySelector<SVGGElement>("[data-a03-stack]");
  const cursor = root.querySelector<SVGGElement>("[data-a03-cursor]");
  if (!stack || !cursor) return () => undefined;

  const CARD_H = 96;
  const GAP = 14;
  const STEP = CARD_H + GAP;
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
  const tasks = [
    { a: 108, b: 78, pick: "ok" as const, read: 340, hover: 260 },
    { a: 96, b: 62, pick: "x" as const, read: 480, hover: 420 },
    { a: 114, b: 88, pick: "ok" as const, read: 280, hover: 220 },
    { a: 84, b: 50, pick: "ok" as const, read: 400, hover: 310 },
    { a: 102, b: 70, pick: "x" as const, read: 520, hover: 460 },
    { a: 90, b: 58, pick: "ok" as const, read: 300, hover: 240 },
  ];

  const cardMarkup = (taskIndex: number, slot: number) => {
    const t = tasks[taskIndex % tasks.length];
    const y = slot * STEP;
    return `<g class="decision-card" data-slot="${slot}" transform="translate(48, ${26 + y})">
      <rect class="hp-a03-frame" x="0" y="0" width="144" height="${CARD_H}" rx="2" />
      <line class="hp-a03-line" x1="16" y1="22" x2="${t.a}" y2="22" />
      <line class="hp-a03-line" x1="16" y1="36" x2="${t.b}" y2="36" opacity="0.75" />
      <g class="btn-group" data-btn="ok" transform="translate(16, 54)">
        <rect class="hp-a03-btn" x="0" y="0" width="50" height="28" rx="1" />
        <path class="hp-a03-icon" d="M14 14 L21 21 L36 8" />
      </g>
      <g class="btn-group" data-btn="x" transform="translate(78, 54)">
        <rect class="hp-a03-btn" x="0" y="0" width="50" height="28" rx="1" />
        <path class="hp-a03-icon" d="M16 8 L34 26 M34 8 L16 26" />
      </g>
    </g>`;
  };

  let head = 0;
  const render = (dy: number) => {
    stack.innerHTML = [0, 1, 2].map((slot) => cardMarkup(head + slot, slot)).join("");
    stack.setAttribute("transform", `translate(0, ${dy})`);
  };

  const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
  const tween = (ms: number, fn: (e: number, t: number) => void) =>
    new Promise<void>((resolve) => {
      const t0 = performance.now();
      const frame = (now: number) => {
        if (!live) return resolve();
        const t = Math.min(1, (now - t0) / ms);
        fn(easeOut(t), t);
        if (t < 1) requestAnimationFrame(frame);
        else resolve();
      };
      requestAnimationFrame(frame);
    });

  const pos = { ok: { x: 86, y: 88 }, x: { x: 148, y: 88 } };
  let cur = { x: 118, y: 72 };
  let live = true;

  const placeCursor = (p: { x: number; y: number }) => {
    cur = p;
    cursor.style.transform = `translate(${p.x}px, ${p.y}px)`;
  };

  const setHot = (pick: "ok" | "x" | null) => {
    stack.querySelectorAll(".btn-group").forEach((g) => g.classList.remove("is-hot"));
    if (!pick) return;
    const card = stack.querySelector('[data-slot="0"]');
    card?.querySelector(`[data-btn="${pick}"]`)?.classList.add("is-hot");
  };

  const moveCursor = (to: { x: number; y: number }, ms: number, onPass?: () => void) => {
    const from = { ...cur };
    let armed = false;
    return tween(ms, (e, t) => {
      const arc = Math.sin(Math.PI * t) * 7;
      placeCursor({
        x: from.x + (to.x - from.x) * e,
        y: from.y + (to.y - from.y) * e - arc,
      });
      if (!armed && t > 0.48) {
        armed = true;
        onPass?.();
      }
    });
  };

  render(0);
  placeCursor(cur);

  if (reduce) {
    placeCursor(pos.ok);
    setHot("ok");
    return () => undefined;
  }

  const press = (base: { x: number; y: number }) =>
    tween(280, (_e, t) => {
      const dip = Math.sin(Math.PI * t) * 2.4;
      placeCursor({ x: base.x + dip * 0.35, y: base.y + dip });
    });

  const dismiss = async () => {
    const leaving = stack.querySelector<SVGGElement>('[data-slot="0"]');
    await tween(640, (e) => {
      stack.setAttribute("transform", `translate(0, ${-STEP * e})`);
      if (leaving) leaving.style.opacity = String(1 - e * 0.85);
    });
    if (!live) return;
    head += 1;
    render(0);
  };

  const cycle = async () => {
    while (live) {
      const task = tasks[head % tasks.length];
      const next = tasks[(head + 1) % tasks.length];
      const target = pos[task.pick];
      const already = Math.hypot(cur.x - target.x, cur.y - target.y) < 6;
      if (already) {
        setHot(task.pick);
        await wait(task.hover);
      } else {
        await wait(task.read);
        if (!live) return;
        await moveCursor(target, task.pick === "x" ? 740 : 640, () => setHot(task.pick));
        await wait(task.hover);
      }
      if (!live) return;
      await press(target);
      if (!live) return;
      const leaving = dismiss();
      const going = moveCursor(pos[next.pick], 760);
      await leaving;
      if (!live) return;
      setHot(null);
      await going;
    }
  };

  void cycle();

  return () => {
    live = false;
  };
}

export function ProblemDecisionsVisual() {
  const uid = useId().replace(/:/g, "");
  const ref = useSlotLoop(startDecisions);

  return (
    <div
      ref={ref}
      className="hp-strip hp-a03"
      role="img"
      aria-label="An operator accepts or rejects one incoming task, then the next card arrives."
    >
      <svg viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
        <line className="hp-a03-rail" x1="36" y1="18" x2="204" y2="18" />
        <defs>
          <clipPath id={`${uid}-clip`}>
            <rect x="36" y="26" width="168" height="128" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${uid}-clip)`}>
          <g data-a03-stack />
        </g>
        <g data-a03-cursor className="hp-a03-cursor" style={{ transform: "translate(118px, 72px)" }}>
          <path d="M0 0 L0 18 L5 13.5 L9 22 L12.5 20.5 L8.5 12 L15 12 Z" />
        </g>
        <path className="hp-a03-bracket" d="M48 168 H192 M48 168 V162 M192 168 V162" />
      </svg>
    </div>
  );
}

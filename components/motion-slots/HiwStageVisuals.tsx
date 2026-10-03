"use client";

import { useId, type ReactNode } from "react";

import { useSlotLoop, type SlotLoopOptions } from "./useSlotLoop";

import "./hiw-chromes.css";

const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

const noop = () => {};

export function poly(xs: number[], ys: number[]) {
  return xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${ys[i].toFixed(1)}`).join(" ");
}

export function wait(ms: number, live: () => boolean) {
  return new Promise<void>((resolve) => {
    window.setTimeout(() => resolve(), ms);
  }).then(() => {
    if (!live()) throw new Error("stop");
  });
}

function tweenVal(
  from: number,
  to: number,
  duration: number,
  apply: (v: number) => void,
  live: () => boolean,
) {
  return new Promise<void>((resolve) => {
    const t0 = performance.now();
    const frame = (now: number) => {
      if (!live()) return resolve();
      const t = Math.min(1, (now - t0) / duration);
      apply(from + (to - from) * easeOut(t));
      if (t < 1) requestAnimationFrame(frame);
      else resolve();
    };
    requestAnimationFrame(frame);
  });
}

const RX = [
  {
    title: "Check quench delay",
    owner: "For the shift lead",
    rupee: "Next batch",
    ev: "Why · delay drifting up on Furnace 2",
  },
  {
    title: "Re-plan Press 3 stop",
    owner: "For the planner",
    rupee: "This shift",
    ev: "Why · keeps today's dispatches on time",
  },
  {
    title: "Check burner drift",
    owner: "For maintenance",
    rupee: "This week",
    ev: "Why · more gas per kg, same recipe",
  },
] as const;

const TOD = ["Lot 2417", "Lot 2418", "Lot 2419", "Lot 2420"];

const FINDINGS = [
  {
    title: "Die running cold",
    sub: "After short stops on Press 2",
    next: "Flag before next lot",
    cat: "Came before past rejections",
    die: "Drifting",
    restarts: "Night shift",
  },
  {
    title: "Restarts differ",
    sub: "Night shift vs day shift",
    next: "Review restart steps",
    cat: "Output lost after every stop",
    die: "Steady",
    restarts: "Night shift",
  },
  {
    title: "Lots wait for furnace",
    sub: "Forge to heat treatment",
    next: "Re-time furnace start",
    cat: "Linked to late quench",
    die: "Steady",
    restarts: "Day shift",
  },
] as const;

function startData(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const path = root.querySelector<SVGPathElement>("[data-a05-spark]");
  const dot = root.querySelector<SVGCircleElement>("[data-a05-dot]");
  const now = root.querySelector<SVGLineElement>("[data-a05-now]");
  const liveDot = root.querySelector<SVGCircleElement>("[data-a05-livedot]");
  const tod = root.querySelector<SVGTextElement>("[data-a05-tod]");
  const sigs = [...root.querySelectorAll<SVGElement>("[data-sig]")];
  const srcs = [...root.querySelectorAll<SVGGElement>(".src-chip")];
  if (!path || !dot || !now || !liveDot || !tod) return noop;

  let live = true;
  let raf = 0;
  const X0 = 52;
  const X1 = 284;
  const Y_FLOOR = 392;
  const Y_TOP = 148;
  const N = 96;
  const t0 = performance.now();

  const kwAt = (t: number) => {
    const base = 0.46 + 0.2 * Math.sin(t * 0.21);
    const pocket = 0.14 * Math.sin(t * 0.74 + 0.5);
    const chatter = 0.06 * Math.sin(t * 2.3);
    return Math.max(0.14, Math.min(0.92, base + pocket + chatter));
  };

  const paint = (elapsed: number) => {
    const xs: number[] = [];
    const ys: number[] = [];
    for (let i = 0; i < N; i++) {
      const frac = i / (N - 1);
      const t = elapsed - (1 - frac) * 4.2;
      xs.push(X0 + frac * (X1 - X0));
      ys.push(Y_FLOOR - kwAt(t) * (Y_FLOOR - Y_TOP));
    }
    path.setAttribute("d", poly(xs, ys));
    dot.setAttribute("cx", String(X1));
    dot.setAttribute("cy", String(ys[N - 1]));
    now.setAttribute("x1", String(X1));
    now.setAttribute("x2", String(X1));
    const pulse = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(elapsed * 3.2));
    liveDot.setAttribute("opacity", pulse.toFixed(2));
  };

  const setSource = (n: number) => {
    sigs.forEach((el, i) => el.classList.toggle("is-on", i === n));
    srcs.forEach((el, i) => el.classList.toggle("is-on", i === n));
    tod.textContent = TOD[n];
  };

  paint(8);
  setSource(0);
  if (reduce) return () => {
    live = false;
  };

  const tick = (nowTs: number) => {
    if (!live) return;
    paint((nowTs - t0) / 1000 + 8);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  void (async () => {
    let n = 0;
    try {
      while (live) {
        setSource(n);
        n = (n + 1) % 4;
        await wait(1600, () => live);
      }
    } catch {
      /* stopped */
    }
  })();

  return () => {
    live = false;
    cancelAnimationFrame(raf);
  };
}

function startAnalysis(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const base = root.querySelector<SVGPathElement>("[data-a06-base]");
  const act = root.querySelector<SVGPathElement>("[data-a06-act]");
  const fill = root.querySelector<SVGPathElement>("[data-a06-fill]");
  const now = root.querySelector<SVGLineElement>("[data-a06-now]");
  if (!base || !act || !fill || !now) return noop;

  const legs = {
    drift: root.querySelector('[data-leg="drift"]'),
    restarts: root.querySelector('[data-leg="restarts"]'),
    waits: root.querySelector('[data-leg="waits"]'),
  };
  let live = true;
  let raf = 0;
  const X0 = 52;
  const X1 = 284;
  const N = 112;
  const Y_FLOOR = 396;
  const Y_TOP = 170;
  const V_MIN = 78;
  const V_MAX = 372;
  const CYCLE = 8;
  const WINDOW = 8;
  const t0 = performance.now();

  const smoothstep = (a: number, b: number, x: number) => {
    const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  const gate = (p: number, on: [number, number], off: [number, number]) =>
    smoothstep(on[0], on[1], p) * (1 - smoothstep(off[0], off[1], p));
  const period = (t: number) => ((t % CYCLE) + CYCLE) % CYCLE;

  const bestRun = (t: number) => {
    const p = period(t);
    return 198 + 52 * gate(p, [1.3, 2.0], [6.6, 7.6]) + 5 * Math.sin(t * 0.22);
  };

  const today = (t: number) => {
    const p = period(t);
    const chatter = 7 * Math.sin(t * 2.15) + 3.4 * Math.sin(t * 4.6 + 0.8);
    let v = 86 + chatter * 0.45;
    v += 158 * gate(p, [1.5, 2.2], [6.3, 7.4]);
    v += 52 * gate(p, [3.05, 3.4], [4.15, 4.5]);
    v -= 62 * gate(p, [4.4, 4.65], [4.78, 5.1]);
    v += 128 * gate(p, [5.1, 5.45], [5.9, 6.25]);
    return Math.max(V_MIN, Math.min(V_MAX, v));
  };

  const yOf = (v: number) => Y_FLOOR - ((v - V_MIN) / (V_MAX - V_MIN)) * (Y_FLOOR - Y_TOP);

  const phaseAt = (t: number) => {
    const p = period(t);
    if (p >= 3.0 && p < 4.55) return "restarts";
    if (p >= 5.05 && p < 6.35) return "waits";
    return "drift";
  };

  const paint = (elapsed: number) => {
    const xs: number[] = [];
    const yB: number[] = [];
    const yA: number[] = [];
    for (let i = 0; i < N; i++) {
      const frac = i / (N - 1);
      const t = elapsed - (1 - frac) * WINDOW;
      xs.push(X0 + frac * (X1 - X0));
      yB.push(yOf(bestRun(t)));
      yA.push(yOf(today(t)));
    }
    base.setAttribute("d", poly(xs, yB));
    act.setAttribute("d", poly(xs, yA));
    let d = `M${xs[0].toFixed(1)} ${yB[0].toFixed(1)} `;
    for (let i = 0; i < N; i++) d += `L${xs[i].toFixed(1)} ${yA[i].toFixed(1)} `;
    for (let i = N - 1; i >= 0; i--) d += `L${xs[i].toFixed(1)} ${yB[i].toFixed(1)} `;
    fill.setAttribute("d", `${d}Z`);
    now.setAttribute("x1", String(X1));
    now.setAttribute("x2", String(X1));
    const phase = phaseAt(elapsed);
    (Object.keys(legs) as Array<keyof typeof legs>).forEach((k) => {
      legs[k]?.classList.toggle("is-on", k === phase);
    });
  };

  const setFinding = (n: number) => {
    const f = FINDINGS[n];
    const set = (sel: string, text: string) => {
      const el = root.querySelector(sel);
      if (el) el.textContent = text;
    };
    set("[data-a06-title]", f.title);
    set("[data-a06-sub]", f.sub);
    set("[data-a06-next]", f.next);
    set("[data-a06-cat]", f.cat);
    set("[data-a06-die]", f.die);
    set("[data-a06-restarts]", f.restarts);
  };

  paint(5);
  setFinding(0);
  if (reduce) {
    return () => {
      live = false;
    };
  }

  const tick = (nowTs: number) => {
    if (!live) return;
    paint((nowTs - t0) / 1000 + 5);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  void (async () => {
    let n = 0;
    try {
      while (live) {
        setFinding(n);
        n = (n + 1) % FINDINGS.length;
        await wait(3200, () => live);
      }
    } catch {
      /* stopped */
    }
  })();

  return () => {
    live = false;
    cancelAnimationFrame(raf);
  };
}

function startPrescriptions(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const rows = [...root.querySelectorAll(".rank-row")];
  let live = true;

  const setRx = (i: number) => {
    const item = RX[i];
    const set = (sel: string, text: string) => {
      const el = root.querySelector(sel);
      if (el) el.textContent = text;
    };
    set("[data-a07-title]", item.title);
    set("[data-a07-owner]", item.owner);
    set("[data-a07-rupee]", item.rupee);
    set("[data-a07-ev]", item.ev);
    rows.forEach((row, n) => row.classList.toggle("is-on", n === i));
  };

  setRx(0);
  if (reduce) {
    return () => {
      live = false;
    };
  }

  void (async () => {
    let n = 0;
    try {
      while (live) {
        await wait(2400, () => live);
        n = (n + 1) % RX.length;
        setRx(n);
      }
    } catch {
      /* stopped */
    }
  })();

  return () => {
    live = false;
  };
}

function startDecisions(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const tick = root.querySelector<SVGPathElement>("[data-a08-tick]");
  const note = root.querySelector<SVGTextElement>("[data-a08-vtitle]");
  const cursor = root.querySelector<SVGGElement>("[data-a08-cursor]");
  if (!tick || !note || !cursor) return noop;

  const pos = {
    ok: { x: 548, y: 158 },
    adj: { x: 548, y: 218 },
    x: { x: 548, y: 278 },
  };
  const logged = {
    ok: "Accept logged",
    adj: "Adjust logged",
    x: "Decline logged",
  } as const;
  type PickName = keyof typeof pos;

  let live = true;
  let raf = 0;
  let len = 0;
  try {
    len = tick.getTotalLength();
  } catch {
    return noop;
  }
  tick.style.strokeDasharray = String(len);

  const clearLedger = () => {
    tick.style.strokeDashoffset = String(len);
    note.textContent = "Awaiting decision";
  };

  const setHot = (name: PickName) => {
    root.querySelectorAll(".btn-group").forEach((g) => g.classList.remove("is-hot"));
    root.querySelector(`.btn-group[data-btn="${name}"]`)?.classList.add("is-hot");
  };

  const placeCursor = (p: { x: number; y: number }) => {
    cursor.style.transform = `translate(${p.x}px, ${p.y}px)`;
  };

  const moveCursor = (
    from: { x: number; y: number },
    to: { x: number; y: number },
    ms: number,
    onPass: () => void,
  ) =>
    new Promise<void>((resolve) => {
      const t0 = performance.now();
      let armed = false;
      const frame = (now: number) => {
        if (!live) return resolve();
        const t = Math.min(1, (now - t0) / ms);
        const e = easeOut(t);
        const arc = Math.sin(Math.PI * t) * 8;
        placeCursor({
          x: from.x + (to.x - from.x) * e,
          y: from.y + (to.y - from.y) * e - arc,
        });
        if (!armed && t > 0.48) {
          armed = true;
          onPass();
        }
        if (t < 1) {
          raf = requestAnimationFrame(frame);
        } else resolve();
      };
      raf = requestAnimationFrame(frame);
    });

  const logDecision = (pick: PickName) => {
    note.textContent = logged[pick];
    tick.style.strokeDashoffset = String(len);
    return tweenVal(len, 0, 380, (v) => {
      tick.style.strokeDashoffset = String(v);
    }, () => live);
  };

  placeCursor(pos.ok);
  setHot("ok");
  if (reduce) {
    tick.style.strokeDashoffset = "0";
    note.textContent = "Accept logged";
    return () => {
      live = false;
    };
  }

  clearLedger();
  const picks: PickName[] = ["ok", "adj", "ok", "x"];

  void (async () => {
    let i = 0;
    let cur = pos.ok;
    try {
      while (live) {
        const pick = picks[i % picks.length];
        if (i > 0) {
          await wait(480, () => live);
          clearLedger();
          await moveCursor(cur, pos[pick], 680, () => setHot(pick));
          cur = pos[pick];
        } else {
          await wait(640, () => live);
        }
        await wait(140, () => live);
        await tweenVal(0, 1, 240, (u) => {
          const dip = Math.sin(Math.PI * u) * 2.2;
          placeCursor({ x: cur.x, y: cur.y + dip });
        }, () => live);
        await logDecision(pick);
        await wait(980, () => live);
        i += 1;
      }
    } catch {
      /* stopped */
    }
  })();

  return () => {
    live = false;
    cancelAnimationFrame(raf);
  };
}

export function StageShell({
  className,
  label,
  children,
  start,
}: {
  className: string;
  label: string;
  children: ReactNode;
  start: (root: HTMLElement, opts: SlotLoopOptions) => () => void;
}) {
  const ref = useSlotLoop(start);
  return (
    <div ref={ref} className={`hiw-slot ${className}`} role="img" aria-label={label}>
      {children}
    </div>
  );
}

export function DataStageVisual() {
  const uid = useId().replace(/:/g, "");
  return (
    <StageShell
      className="hiw-forest"
      label="Plant signals stored and modeled in one picture of the plant."
      start={startData}
    >
      <svg viewBox="0 0 720 450" xmlns="http://www.w3.org/2000/svg">
        <rect width="720" height="450" fill="#4A634D" />
        <g className="src-chip is-on" data-src="0">
          <rect className="chip" x="28" y="24" width="132" height="44" rx="6" />
          <text className="lbl" x="42" y="42">Machines</text>
          <text className="val" x="42" y="58" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="15">
            Live
          </text>
        </g>
        <g className="src-chip" data-src="1">
          <rect className="chip" x="172" y="24" width="132" height="44" rx="6" />
          <circle className="live-dot" data-a05-livedot cx="188" cy="38" r="3.2" />
          <text className="lbl lbl-hi" x="198" y="42">Control</text>
          <text className="val" x="188" y="58" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="15">
            Live
          </text>
        </g>
        <g className="src-chip" data-src="2">
          <rect className="chip" x="316" y="24" width="132" height="44" rx="6" />
          <text className="lbl" x="330" y="42">ERP</text>
          <text className="val" x="330" y="58" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="15">
            Plans
          </text>
        </g>
        <g className="src-chip" data-src="3">
          <rect className="chip" x="460" y="24" width="148" height="44" rx="6" />
          <text className="lbl" x="474" y="42">Quality</text>
          <text
            data-a05-tod
            className="val"
            x="474"
            y="58"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="700"
            fontSize="15"
          >
            Lot 2417
          </text>
        </g>
        <g>
          <rect className="chip" x="28" y="86" width="280" height="340" rx="8" />
          <text className="lbl" x="44" y="112">Plant picture · live</text>
          <defs>
            <clipPath id={`${uid}-a05`}>
              <rect x="44" y="126" width="248" height="276" />
            </clipPath>
          </defs>
          <line className="axis" x1="52" y1="392" x2="284" y2="392" />
          <g clipPath={`url(#${uid}-a05)`}>
            <path className="spark" data-a05-spark d="" />
            <line className="now-rule" data-a05-now x1="284" y1="128" x2="284" y2="392" />
            <circle data-a05-dot className="live-dot" cx="284" cy="248" r="4.2" />
          </g>
        </g>
        <g>
          <rect className="rx" x="328" y="86" width="364" height="340" rx="8" />
          <circle className="live-dot" cx="352" cy="118" r="4" />
          <text className="lbl lbl-hi" x="364" y="122">Signals stored</text>
          <text className="val" x="352" y="168" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="26">
            Updated as data comes in
          </text>
          <text data-sig="0" className="sig is-on mute-txt" x="352" y="222" fontFamily="Inter, sans-serif" fontSize="18">
            Machines · press and furnace
          </text>
          <text data-sig="1" className="sig mute-txt" x="352" y="264" fontFamily="Inter, sans-serif" fontSize="18">
            Control systems · the floor
          </text>
          <text
            data-sig="2"
            className="sig mute-txt"
            x="352"
            y="306"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="15"
            letterSpacing="0.4"
          >
            ERP · plans and orders
          </text>
          <text
            data-sig="3"
            className="sig mute-txt"
            x="352"
            y="348"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="15"
            letterSpacing="0.4"
          >
            Quality · lot records
          </text>
        </g>
      </svg>
    </StageShell>
  );
}

export function AnalysisStageVisual() {
  const uid = useId().replace(/:/g, "");
  const chipVal = { fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, fontSize: 15 } as const;
  const mono = { fontFamily: "IBM Plex Mono, monospace", fontSize: 15, letterSpacing: 0.4 } as const;
  return (
    <StageShell
      className="hiw-acid"
      label="Today's run compared with an improved control policy, with the causes of drift highlighted."
      start={startAnalysis}
    >
      <svg viewBox="0 0 720 450" xmlns="http://www.w3.org/2000/svg">
        <rect width="720" height="450" fill="#EEF981" />
        <g>
          <rect className="chip" x="28" y="24" width="148" height="44" rx="6" />
          <text className="lbl" x="42" y="42">Compare</text>
          <text className="val" x="42" y="58" {...chipVal}>
            Best week
          </text>
        </g>
        <g>
          <rect className="chip" x="188" y="24" width="132" height="44" rx="6" />
          <circle className="live-dot" cx="204" cy="38" r="3.2" />
          <text className="lbl lbl-hi" x="214" y="42">Die temp</text>
          <text data-a06-die className="val" x="204" y="58" {...chipVal}>
            Drifting
          </text>
        </g>
        <g>
          <rect className="chip" x="332" y="24" width="132" height="44" rx="6" />
          <text className="lbl" x="346" y="42">Restarts</text>
          <text data-a06-restarts className="val" x="346" y="58" {...chipVal}>
            Night shift
          </text>
        </g>
        <g>
          <rect className="chip" x="476" y="24" width="132" height="44" rx="6" />
          <text className="lbl" x="490" y="42">Baseline</text>
          <text className="val" x="490" y="58" {...chipVal}>
            Your plant
          </text>
        </g>
        <g>
          <rect className="chip" x="28" y="86" width="280" height="340" rx="8" />
          <text className="lbl" x="44" y="112">Improved control vs today</text>
          <g className="leg is-on" data-leg="drift">
            <rect className="chip" x="44" y="128" width="72" height="26" rx="4" />
            <text className="lbl lbl-hi" x="54" y="145">Drift</text>
          </g>
          <g className="leg" data-leg="restarts">
            <rect className="chip" x="124" y="128" width="80" height="26" rx="4" />
            <text className="lbl lbl-hi" x="134" y="145">Restarts</text>
          </g>
          <g className="leg" data-leg="waits">
            <rect className="chip" x="212" y="128" width="72" height="26" rx="4" />
            <text className="lbl lbl-hi" x="222" y="145">Waits</text>
          </g>
          <defs>
            <clipPath id={`${uid}-a06`}>
              <rect x="44" y="164" width="248" height="232" />
            </clipPath>
          </defs>
          <line className="axis" x1="52" y1="396" x2="284" y2="396" />
          <g clipPath={`url(#${uid}-a06)`}>
            <path className="waste-fill" data-a06-fill d="" />
            <path className="base-line" data-a06-base d="" />
            <path className="waste-line" data-a06-act d="" />
            <line className="now-rule" data-a06-now x1="284" y1="168" x2="284" y2="396" />
          </g>
        </g>
        <g>
          <rect className="rx" x="328" y="86" width="364" height="340" rx="8" />
          <circle className="live-dot" cx="352" cy="118" r="4" />
          <text className="lbl lbl-hi" x="364" y="122">Model finding</text>
          <text data-a06-title className="val" x="352" y="176" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="26">
            Die running cold
          </text>
          <text data-a06-sub className="mute-txt" x="352" y="220" fontFamily="Inter, sans-serif" fontSize="18">
            After short stops on Press 2
          </text>
          <text data-a06-next className="val" x="352" y="268" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="22">
            Flag before next lot
          </text>
          <text data-a06-cat className="mute-txt" x="352" y="322" {...mono}>
            Came before past rejections
          </text>
          <text className="mute-txt" x="352" y="358" {...mono}>
            Evidence · your plant&apos;s own history
          </text>
        </g>
      </svg>
    </StageShell>
  );
}

export function PrescriptionsStageVisual() {
  return (
    <StageShell
      className="hiw-ember"
      label="Ranked example actions in a live queue."
      start={startPrescriptions}
    >
      <svg viewBox="0 0 720 450" xmlns="http://www.w3.org/2000/svg">
        <rect width="720" height="450" fill="#E35F3F" />
        <g>
          <rect className="chip" x="28" y="24" width="132" height="44" rx="6" />
          <circle className="live-dot" cx="44" cy="38" r="3.2" />
          <text className="lbl lbl-hi" x="54" y="42">Live</text>
          <text className="val" x="44" y="58" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="15">
            Ranked
          </text>
        </g>
        <g>
          <rect className="chip" x="172" y="24" width="148" height="44" rx="6" />
          <text className="lbl" x="186" y="42">Top action</text>
          <text className="val" x="186" y="58" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="15">
            By cost
          </text>
        </g>
        <g>
          <rect className="chip" x="332" y="24" width="148" height="44" rx="6" />
          <text className="lbl" x="346" y="42">Window</text>
          <text className="val" x="346" y="58" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="15">
            This shift
          </text>
        </g>
        <g>
          <rect className="chip" x="492" y="24" width="128" height="44" rx="6" />
          <text className="lbl" x="506" y="42">Line</text>
          <text className="val" x="506" y="58" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="15">
            Line B
          </text>
        </g>
        <g>
          <rect className="chip" x="28" y="86" width="280" height="340" rx="8" />
          <text className="lbl" x="44" y="112">Ranked queue</text>
          <g className="rank-row is-on" data-rank="0" transform="translate(44, 128)">
            <rect className="chip" x="0" y="0" width="248" height="78" rx="6" />
            <text className="lbl lbl-hi" x="16" y="22">01</text>
            <text className="val" x="16" y="46" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="19">
              Check quench delay
            </text>
            <text className="mute-txt" x="16" y="66" fontFamily="IBM Plex Mono, monospace" fontSize="13" letterSpacing="0.4">
              Shift lead
            </text>
          </g>
          <g className="rank-row" data-rank="1" transform="translate(44, 214)">
            <rect className="chip" x="0" y="0" width="248" height="78" rx="6" />
            <text className="lbl lbl-hi" x="16" y="22">02</text>
            <text className="val" x="16" y="46" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="19">
              Re-plan Press 3 stop
            </text>
            <text className="mute-txt" x="16" y="66" fontFamily="IBM Plex Mono, monospace" fontSize="13" letterSpacing="0.4">
              Planner
            </text>
          </g>
          <g className="rank-row" data-rank="2" transform="translate(44, 300)">
            <rect className="chip" x="0" y="0" width="248" height="78" rx="6" />
            <text className="lbl lbl-hi" x="16" y="22">03</text>
            <text className="val" x="16" y="46" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="19">
              Check burner drift
            </text>
            <text className="mute-txt" x="16" y="66" fontFamily="IBM Plex Mono, monospace" fontSize="13" letterSpacing="0.4">
              Maintenance
            </text>
          </g>
        </g>
        <g>
          <rect className="rx" x="328" y="86" width="364" height="340" rx="8" />
          <circle className="live-dot" cx="352" cy="118" r="4" />
          <text className="lbl lbl-hi" x="364" y="122">Example action</text>
          <text
            data-a07-title
            className="val"
            x="352"
            y="176"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="700"
            fontSize="26"
          >
            Check quench delay
          </text>
          <text data-a07-owner className="mute-txt" x="352" y="220" fontFamily="Inter, sans-serif" fontSize="18">
            For the shift lead
          </text>
          <g>
            <rect className="pill-fill" x="352" y="244" width="168" height="34" />
            <text
              data-a07-rupee
              className="pill-ink"
              x="366"
              y="268"
              fontFamily="Space Grotesk, sans-serif"
              fontWeight="700"
              fontSize="22"
            >
              Next batch
            </text>
          </g>
          <text
            data-a07-ev
            className="mute-txt"
            x="352"
            y="312"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="15"
            letterSpacing="0.4"
          >
            Why · delay drifting up on Furnace 2
          </text>
          <text
            className="mute-txt"
            x="352"
            y="352"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="15"
            letterSpacing="0.4"
          >
            Reasoning on file for review
          </text>
        </g>
      </svg>
    </StageShell>
  );
}

export function DecisionsStageVisual() {
  return (
    <StageShell
      className="hiw-wine"
      label="The team accepts, adjusts or declines an action, and the result is checked."
      start={startDecisions}
    >
      <svg viewBox="0 0 720 450" xmlns="http://www.w3.org/2000/svg">
        <rect width="720" height="450" fill="#761438" />
        <g>
          <rect className="chip" x="28" y="24" width="148" height="44" rx="6" />
          <text className="lbl" x="42" y="42">Operator</text>
          <text className="val" x="42" y="58" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="15">
            Floor lead
          </text>
        </g>
        <g>
          <rect className="chip" x="188" y="24" width="132" height="44" rx="6" />
          <circle className="live-dot" cx="204" cy="38" r="3.2" />
          <text className="lbl lbl-hi" x="214" y="42">Shift</text>
          <text className="val" x="204" y="58" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="15">
            Night
          </text>
        </g>
        <g>
          <rect className="chip" x="332" y="24" width="168" height="44" rx="6" />
          <text className="lbl" x="346" y="42">Control</text>
          <text className="val" x="346" y="58" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="15">
            Team decides
          </text>
        </g>
        <g>
          <rect className="chip" x="512" y="24" width="128" height="44" rx="6" />
          <text className="lbl" x="526" y="42">Asset</text>
          <text className="val" x="526" y="58" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="15">
            Press 3
          </text>
        </g>
        <g>
          <rect className="rx" x="28" y="86" width="364" height="340" rx="8" />
          <circle className="live-dot" cx="52" cy="118" r="4" />
          <text className="lbl lbl-hi" x="64" y="122">Example action</text>
          <text className="val" x="52" y="176" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="26">
            Check Press 3 hydraulics
          </text>
          <text className="mute-txt" x="52" y="220" fontFamily="Inter, sans-serif" fontSize="18">
            For maintenance
          </text>
          <g>
            <rect className="pill-fill" x="52" y="244" width="148" height="36" />
            <text className="pill-ink" x="66" y="270" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="22">
              This week
            </text>
          </g>
          <text
            className="mute-txt"
            x="52"
            y="318"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="15"
            letterSpacing="0.4"
          >
            Why · cycle time creeping up, same die
          </text>
          <text className="lbl" x="52" y="392">Example action · review on the floor</text>
        </g>
        <g>
          <rect className="chip" x="408" y="86" width="284" height="340" rx="8" />
          <text className="lbl" x="428" y="112">Decide</text>
          <g className="btn-group is-hot" data-btn="ok" transform="translate(428, 136)">
            <rect className="btn" x="0" y="0" width="244" height="48" rx="6" />
            <text className="val" x="20" y="31" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="19">
              Accept
            </text>
          </g>
          <g className="btn-group" data-btn="adj" transform="translate(428, 196)">
            <rect className="btn" x="0" y="0" width="244" height="48" rx="6" />
            <text className="val" x="20" y="31" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="19">
              Adjust
            </text>
          </g>
          <g className="btn-group" data-btn="x" transform="translate(428, 256)">
            <rect className="btn" x="0" y="0" width="244" height="48" rx="6" />
            <text className="val" x="20" y="31" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="19">
              Decline
            </text>
          </g>
          <g>
            <rect className="chip" x="428" y="320" width="244" height="62" rx="6" />
            <rect className="chip" x="440" y="334" width="22" height="22" rx="4" />
            <path className="tick-draw" data-a08-tick d="M446 345 L450.5 350 L458 337" />
            <text className="verify-kicker" x="474" y="342">Check</text>
            <text
              data-a08-vtitle
              className="val"
              x="474"
              y="362"
              fontFamily="Space Grotesk, sans-serif"
              fontWeight="700"
              fontSize="17"
            >
              Awaiting decision
            </text>
          </g>
          <text
            className="mute-txt"
            x="428"
            y="406"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="12"
            letterSpacing="0.4"
          >
            Feedback · next action improves
          </text>
        </g>
        <g data-a08-cursor className="cursor-arrow" style={{ transform: "translate(548px, 158px)" }}>
          <path d="M0 0 L0 18 L5 13.5 L9 22 L12.5 20.5 L8.5 12 L15 12 Z" />
        </g>
      </svg>
    </StageShell>
  );
}

export const hiwStageVisuals = [
  DataStageVisual,
  AnalysisStageVisual,
  PrescriptionsStageVisual,
  DecisionsStageVisual,
] as const;

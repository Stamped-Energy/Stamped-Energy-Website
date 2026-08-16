"use client";

import { useId, type ComponentType, type ReactNode } from "react";

import { useSlotLoop, type SlotLoopOptions } from "./useSlotLoop";

import "./load-energy-hiw.css";

const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

const noop = () => {};

function poly(xs: number[], ys: number[]) {
  return xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${ys[i].toFixed(1)}`).join(" ");
}

function wait(ms: number, live: () => boolean) {
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

const LOADS = [
  { model: 142, max: 250, base: 168, swing: 48, chatter: 14, freq: 0.55, phase: 0.2 },
  { model: 388, max: 480, base: 402, swing: 28, chatter: 10, freq: 0.41, phase: 1.1 },
  { model: 38, max: 160, base: 72, swing: 54, chatter: 8, freq: 0.33, phase: 2.4 },
  { model: 220, max: 280, base: 224, swing: 22, chatter: 9, freq: 0.62, phase: 0.7 },
] as const;

const RX_CTRL = [
  { title: "Hold feeder 2 · 10 min", rupee: "₹ 0.6L / mo", ev: "Evidence · two feeders overlapped" },
  { title: "Shed idle chiller", rupee: "₹ 0.8L / mo", ev: "Evidence · 94 kW vs 38 kW model" },
  { title: "Shift dryer warm-up", rupee: "₹ 0.4L / mo", ev: "Evidence · cheaper ToD window" },
] as const;

function startEquipment(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const cells = [...root.querySelectorAll<SVGGElement>(".cell")];
  const BAR = 286;
  const shown = LOADS.map((l) => l.base);
  let live = true;
  let raf = 0;

  const kwAt = (load: (typeof LOADS)[number], t: number) => {
    const cycle = Math.sin(t * load.freq + load.phase);
    const burst = Math.max(0, Math.sin(t * load.freq * 0.47 + load.phase + 1.2));
    const chatter = Math.sin(t * 2.8 + load.phase) * load.chatter;
    const idleDip = load.model < 50 ? -36 * (0.5 + 0.5 * Math.sin(t * 0.18 + 1.7)) : 0;
    return Math.max(12, load.base + cycle * load.swing + burst * (load.swing * 0.55) + chatter + idleDip);
  };

  const paintLoad = (i: number, t: number) => {
    const load = LOADS[i];
    const target = kwAt(load, t);
    shown[i] += (target - shown[i]) * 0.16;
    const kw = shown[i];
    const x = Math.max(0.06, Math.min(1, kw / load.max));
    const kwEl = root.querySelector(`[data-le-kw="${i}"]`);
    const bar = root.querySelector(`[data-le-bar="${i}"]`);
    const mark = root.querySelector(`[data-le-mark="${i}"]`);
    const delta = root.querySelector(`[data-le-delta="${i}"]`);
    if (kwEl) kwEl.textContent = `${Math.round(kw)} kW`;
    bar?.setAttribute("transform", `scale(${x.toFixed(3)},1)`);
    const mx = (load.model / load.max) * BAR;
    mark?.setAttribute("x1", mx.toFixed(1));
    mark?.setAttribute("x2", mx.toFixed(1));
    const d = Math.round(kw - load.model);
    const note = Math.abs(d) < 12 ? "in band" : d > 0 ? `+${d}` : String(d);
    if (delta) delta.textContent = `Modeled ${load.model} kW · ${note}`;
  };

  const setLoad = (n: number) => {
    cells.forEach((el, i) => el.classList.toggle("is-on", i === n));
  };

  const t0 = performance.now();
  const tick = (now: number) => {
    if (!live) return;
    const t = (now - t0) / 1000;
    for (let i = 0; i < LOADS.length; i++) paintLoad(i, t);
    if (!reduce) raf = requestAnimationFrame(tick);
  };

  setLoad(0);
  tick(t0);
  if (reduce) {
    cells.forEach((el) => el.classList.add("is-on"));
    return () => {
      live = false;
    };
  }

  void (async () => {
    let n = 0;
    try {
      while (live) {
        setLoad(n);
        n = (n + 1) % cells.length;
        await wait(2400, () => live);
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

function startTariff(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const path = root.querySelector<SVGPathElement>("[data-le-spark]");
  const dot = root.querySelector<SVGCircleElement>("[data-le-dot]");
  const now = root.querySelector<SVGLineElement>("[data-le-now]");
  const chip = root.querySelector<SVGTextElement>("[data-le-kva]");
  const liveDot = root.querySelector<SVGCircleElement>("[data-le-livedot]");
  const slabs = [...root.querySelectorAll<SVGGElement>(".slab")];
  if (!path || !dot || !now || !chip || !liveDot) return noop;

  let live = true;
  let raf = 0;
  const X0 = 48;
  const X1 = 672;
  const Y_FLOOR = 410;
  const Y_MD = 352;
  const N = 128;
  const DT = 0.038;
  const t0 = performance.now();
  let shown = 2180;

  const kvaAt = (t: number) => {
    const cycle = 0.5 + 0.5 * Math.sin(t * 0.19);
    const base = 1920 + cycle * 320;
    const ramp = 110 * Math.sin(t * 0.48 + 0.6);
    const motors = 70 * Math.sin(t * 1.15) * (0.35 + cycle);
    const peakKiss = Math.max(0, Math.sin(t * 0.11) - 0.42) * 260;
    return Math.max(1780, Math.min(2438, base + ramp + motors + peakKiss));
  };

  const yOf = (kva: number) => {
    const u = (kva - 1760) / (2450 - 1760);
    return Y_FLOOR - u * (Y_FLOOR - (Y_MD + 6));
  };

  const paint = (elapsed: number) => {
    const windowSec = (N - 1) * DT;
    const xs: number[] = [];
    const ys: number[] = [];
    for (let i = 0; i < N; i++) {
      const frac = i / (N - 1);
      const t = elapsed - (1 - frac) * windowSec;
      xs.push(X0 + frac * (X1 - X0));
      ys.push(yOf(kvaAt(t)));
    }
    path.setAttribute("d", poly(xs, ys));
    dot.setAttribute("cx", String(X1));
    dot.setAttribute("cy", ys[N - 1].toFixed(1));
    now.setAttribute("x1", String(X1));
    now.setAttribute("x2", String(X1));
    shown += (kvaAt(elapsed) - shown) * 0.18;
    chip.textContent = `${Math.round(shown).toLocaleString("en-IN")} kVA`;
    const pulse = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(elapsed * 3.2));
    liveDot.setAttribute("opacity", pulse.toFixed(2));
  };

  const setSlab = (n: number) => {
    slabs.forEach((el, i) => el.classList.toggle("is-on", i === n));
  };

  paint(8);
  setSlab(2);
  if (reduce) {
    return () => {
      live = false;
    };
  }

  const tick = (nowTs: number) => {
    if (!live) return;
    paint((nowTs - t0) / 1000 + 8);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  void (async () => {
    let n = 2;
    try {
      while (live) {
        setSlab(n);
        n = (n + 1) % slabs.length;
        await wait(2800, () => live);
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

function startControl(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const tick = root.querySelector<SVGPathElement>("[data-le-tick]");
  const note = root.querySelector<SVGTextElement>("[data-le-vtitle]");
  const cursor = root.querySelector<SVGGElement>("[data-le-cursor]");
  if (!tick || !note || !cursor) return noop;

  const pos = {
    ok: { x: 200, y: 248 },
    adj: { x: 424, y: 248 },
    x: { x: 648, y: 248 },
  };
  const logged = { ok: "Accept logged", adj: "Adjust logged", x: "Reject logged" };
  const len = tick.getTotalLength();
  tick.style.strokeDasharray = String(len);
  let live = true;

  const clearLedger = () => {
    tick.style.strokeDashoffset = String(len);
    note.textContent = "Awaiting decision";
  };

  const setHot = (name: string) => {
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
  ) => {
    return new Promise<void>((resolve) => {
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
        if (t < 1) requestAnimationFrame(frame);
        else resolve();
      };
      requestAnimationFrame(frame);
    });
  };

  const logDecision = (pick: keyof typeof logged) => {
    note.textContent = logged[pick];
    tick.style.strokeDashoffset = String(len);
    return tweenVal(len, 0, 380, (v) => {
      tick.style.strokeDashoffset = String(v);
    }, () => live);
  };

  const setRx = (n: number) => {
    const item = RX_CTRL[n % RX_CTRL.length];
    const title = root.querySelector("[data-le-title]");
    const rupee = root.querySelector("[data-le-rupee]");
    const ev = root.querySelector("[data-le-ev]");
    if (title) title.textContent = item.title;
    if (rupee) rupee.textContent = item.rupee;
    if (ev) ev.textContent = item.ev;
  };

  placeCursor(pos.ok);
  setHot("ok");
  setRx(0);
  if (reduce) {
    tick.style.strokeDashoffset = "0";
    note.textContent = "Accept logged";
    return () => {
      live = false;
    };
  }

  clearLedger();
  const picks = ["ok", "adj", "ok", "x"] as const;

  void (async () => {
    let i = 0;
    let cur = pos.ok;
    try {
      while (live) {
        const pick = picks[i % picks.length];
        setRx(i);
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
  };
}

function startRanked(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const rows = [...root.querySelectorAll(".rank-row")];
  let live = true;

  const setRx = (n: number) => {
    rows.forEach((row, i) => row.classList.toggle("is-on", i === n));
  };

  setRx(0);
  if (reduce) {
    rows.forEach((el) => el.classList.add("is-on"));
    return () => {
      live = false;
    };
  }

  void (async () => {
    let n = 0;
    try {
      while (live) {
        setRx(n);
        n = (n + 1) % rows.length;
        await wait(2400, () => live);
      }
    } catch {
      /* stopped */
    }
  })();

  return () => {
    live = false;
  };
}

function StageShell({
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
    <div ref={ref} className={`le-slot ${className}`} role="img" aria-label={label}>
      {children}
    </div>
  );
}

export function EquipmentModelVisual() {
  return (
    <StageShell className="le-cream" label="Equipment-level energy modeling" start={startEquipment}>
      <svg viewBox="0 0 720 450" xmlns="http://www.w3.org/2000/svg">
        <rect width="720" height="450" fill="#EEEAE3" />

        <g className="cell is-on" data-n="0">
          <rect className="chip" x="28" y="24" width="326" height="190" rx="8" />
          <circle className="live-dot" cx="52" cy="52" r="3.2" />
          <text className="lbl lbl-hi" x="64" y="56">Compressor</text>
          <text className="val" data-le-kw="0" x="48" y="108" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="28">
            186 kW
          </text>
          <g transform="translate(48,128)">
            <rect className="chip" x="0" y="0" width="286" height="22" rx="4" />
            <rect className="bar-fill" data-le-bar="0" x="0" y="0" width="286" height="22" rx="4" transform="scale(0.74,1)" />
            <line className="bar-mark" data-le-mark="0" x1="162" y1="0" x2="162" y2="22" />
          </g>
          <text className="mute-txt" data-le-delta="0" x="48" y="176" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="0.5">
            Modeled 142 kW · +44
          </text>
        </g>

        <g className="cell" data-n="1">
          <rect className="chip" x="366" y="24" width="326" height="190" rx="8" />
          <circle className="live-dot" cx="390" cy="52" r="3.2" />
          <text className="lbl" x="402" y="56">Furnace</text>
          <text className="val" data-le-kw="1" x="386" y="108" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="28">
            410 kW
          </text>
          <g transform="translate(386,128)">
            <rect className="chip" x="0" y="0" width="286" height="22" rx="4" />
            <rect className="bar-fill" data-le-bar="1" x="0" y="0" width="286" height="22" rx="4" transform="scale(0.85,1)" />
            <line className="bar-mark" data-le-mark="1" x1="232" y1="0" x2="232" y2="22" />
          </g>
          <text className="mute-txt" data-le-delta="1" x="386" y="176" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="0.5">
            Modeled 388 kW · +22
          </text>
        </g>

        <g className="cell" data-n="2">
          <rect className="chip" x="28" y="226" width="326" height="200" rx="8" />
          <circle className="live-dot" cx="52" cy="254" r="3.2" />
          <text className="lbl" x="64" y="258">Chiller</text>
          <text className="val" data-le-kw="2" x="48" y="310" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="28">
            94 kW
          </text>
          <g transform="translate(48,330)">
            <rect className="chip" x="0" y="0" width="286" height="22" rx="4" />
            <rect className="bar-fill" data-le-bar="2" x="0" y="0" width="286" height="22" rx="4" transform="scale(0.59,1)" />
            <line className="bar-mark" data-le-mark="2" x1="68" y1="0" x2="68" y2="22" />
          </g>
          <text className="mute-txt" data-le-delta="2" x="48" y="378" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="0.5">
            Modeled 38 kW · +56
          </text>
        </g>

        <g className="cell" data-n="3">
          <rect className="chip" x="366" y="226" width="326" height="200" rx="8" />
          <circle className="live-dot" cx="390" cy="254" r="3.2" />
          <text className="lbl" x="402" y="258">Press</text>
          <text className="val" data-le-kw="3" x="386" y="310" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="28">
            228 kW
          </text>
          <g transform="translate(386,330)">
            <rect className="chip" x="0" y="0" width="286" height="22" rx="4" />
            <rect className="bar-fill" data-le-bar="3" x="0" y="0" width="286" height="22" rx="4" transform="scale(0.82,1)" />
            <line className="bar-mark" data-le-mark="3" x1="226" y1="0" x2="226" y2="22" />
          </g>
          <text className="mute-txt" data-le-delta="3" x="386" y="378" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="0.5">
            Modeled 220 kW · in band
          </text>
        </g>
      </svg>
    </StageShell>
  );
}

export function TariffMdVisual() {
  const uid = useId().replace(/:/g, "");
  const clip = `le-clip-${uid}`;
  return (
    <StageShell className="le-forest" label="Continuous DISCOM, ToD, and MD analysis" start={startTariff}>
      <svg viewBox="0 0 720 450" xmlns="http://www.w3.org/2000/svg">
        <rect width="720" height="450" fill="#4A634D" />

        <g className="slab is-on" data-slab="0">
          <rect className="chip" x="28" y="24" width="216" height="272" rx="8" />
          <text className="lbl" x="48" y="52">Off-peak</text>
          <text className="val" x="48" y="88" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="22">
            00-06
          </text>
          <text className="mute-txt" x="48" y="118" fontFamily="Inter, sans-serif" fontSize="13">
            Hold warm-up here
          </text>
          <g>
            <rect className="pill-fill" x="48" y="236" width="132" height="30" />
            <text className="pill-ink" x="62" y="258" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
              ₹ 0.3L
            </text>
          </g>
        </g>

        <g className="slab" data-slab="1">
          <rect className="chip" x="252" y="24" width="216" height="272" rx="8" />
          <text className="lbl" x="272" y="52">Shoulder</text>
          <text className="val" x="272" y="88" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="22">
            06-18
          </text>
          <text className="mute-txt" x="272" y="118" fontFamily="Inter, sans-serif" fontSize="13">
            Shift dryer start
          </text>
          <g>
            <rect className="pill-fill" x="272" y="236" width="132" height="30" />
            <text className="pill-ink" x="286" y="258" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
              ₹ 0.5L
            </text>
          </g>
        </g>

        <g className="slab" data-slab="2">
          <rect className="chip" x="476" y="24" width="216" height="272" rx="8" />
          <circle className="live-dot" data-le-livedot cx="496" cy="48" r="3.2" />
          <text className="lbl lbl-hi" x="508" y="52">Peak · open</text>
          <text className="val" x="496" y="88" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="22">
            18-22
          </text>
          <text className="mute-txt" x="496" y="118" fontFamily="Inter, sans-serif" fontSize="13">
            Before the window closes
          </text>
          <g>
            <rect className="pill-fill" x="496" y="236" width="132" height="30" />
            <text className="pill-ink" x="510" y="258" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
              ₹ 1.1L
            </text>
          </g>
        </g>

        <g>
          <rect className="rx" x="28" y="308" width="664" height="118" rx="8" />
          <text className="lbl" x="48" y="332">Live demand vs MD ceiling</text>
          <text
            data-le-kva
            className="val"
            x="672"
            y="334"
            textAnchor="end"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="700"
            fontSize="18"
          >
            2,180 kVA
          </text>
          <text className="lbl" x="48" y="346">MD</text>
          <line className="md-line" x1="72" y1="348" x2="672" y2="348" />
          <defs>
            <clipPath id={clip}>
              <rect x="48" y="350" width="624" height="64" />
            </clipPath>
          </defs>
          <g clipPath={`url(#${clip})`}>
            <path className="spark" data-le-spark d="" />
            <line className="now-rule" data-le-now x1="672" y1="350" x2="672" y2="414" />
            <circle data-le-dot className="live-dot" cx="672" cy="380" r="4.2" />
          </g>
        </g>
      </svg>
    </StageShell>
  );
}

export function PlantControlVisual() {
  return (
    <StageShell className="le-wine" label="Plant teams remain in control" start={startControl}>
      <svg viewBox="0 0 720 450" xmlns="http://www.w3.org/2000/svg">
        <rect width="720" height="450" fill="#761438" />

        <g>
          <rect className="rx" x="28" y="24" width="664" height="128" rx="8" />
          <circle className="live-dot" cx="52" cy="52" r="3.2" />
          <text className="lbl lbl-hi" x="64" y="56">Live · Prescription</text>
          <text className="val" data-le-title x="48" y="92" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="22">
            Hold feeder 2 · 10 min
          </text>
          <text className="mute-txt" data-le-ev x="48" y="122" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="0.5">
            Evidence · two feeders overlapped
          </text>
          <g>
            <rect className="pill-fill" x="500" y="70" width="160" height="30" />
            <text className="pill-ink" data-le-rupee x="514" y="92" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
              ₹ 0.6L / mo
            </text>
          </g>
        </g>

        <g className="btn-group is-hot" data-btn="ok">
          <rect className="btn" x="28" y="168" width="216" height="168" rx="8" />
          <text className="val" x="48" y="248" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="22">
            Accept
          </text>
          <text className="mute-txt" x="48" y="278" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="0.5">
            Run as written
          </text>
        </g>
        <g className="btn-group" data-btn="adj">
          <rect className="btn" x="252" y="168" width="216" height="168" rx="8" />
          <text className="val" x="272" y="248" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="22">
            Adjust
          </text>
          <text className="mute-txt" x="272" y="278" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="0.5">
            Change window or load
          </text>
        </g>
        <g className="btn-group" data-btn="x">
          <rect className="btn" x="476" y="168" width="216" height="168" rx="8" />
          <text className="val" x="496" y="248" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="22">
            Reject
          </text>
          <text className="mute-txt" x="496" y="278" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="0.5">
            Keep plant priority
          </text>
        </g>

        <g>
          <rect className="chip" x="28" y="352" width="664" height="74" rx="8" />
          <rect className="chip" x="48" y="372" width="22" height="22" rx="4" />
          <path className="tick-draw" data-le-tick d="M54 383 L58.5 388 L66 375" />
          <text className="verify-kicker" x="82" y="378">Verify</text>
          <text className="val" data-le-vtitle x="82" y="400" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="18">
            Awaiting decision
          </text>
        </g>

        <g data-le-cursor className="cursor-arrow" style={{ transform: "translate(200px, 248px)" }}>
          <path d="M0 0 L0 18 L5 13.5 L9 22 L12.5 20.5 L8.5 12 L15 12 Z" />
        </g>
      </svg>
    </StageShell>
  );
}

export function RankedMovesVisual() {
  return (
    <StageShell className="le-acid" label="Rupee-ranked energy recommendations" start={startRanked}>
      <svg viewBox="0 0 720 450" xmlns="http://www.w3.org/2000/svg">
        <rect width="720" height="450" fill="#EEF981" />

        <g className="rank-row is-on" data-rank="0">
          <rect className="chip" x="28" y="24" width="664" height="94" rx="8" />
          <text className="lbl lbl-hi" x="48" y="48">01 · Idle hold</text>
          <text className="val" x="48" y="78" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="20">
            Shed idle chiller
          </text>
          <text className="mute-txt" x="48" y="100" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="0.5">
            Evidence · 94 vs 38 kW modeled idle
          </text>
          <g>
            <rect className="pill-fill" x="520" y="52" width="148" height="30" />
            <text className="pill-ink" x="534" y="74" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
              ₹ 0.8L / mo
            </text>
          </g>
        </g>

        <g className="rank-row" data-rank="1">
          <rect className="chip" x="28" y="130" width="664" height="94" rx="8" />
          <text className="lbl" x="48" y="154">02 · Stagger</text>
          <text className="val" x="48" y="184" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="20">
            Hold feeder 2 · 10 min
          </text>
          <text className="mute-txt" x="48" y="206" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="0.5">
            Evidence · MD window · two feeders overlapped
          </text>
          <g>
            <rect className="pill-fill" x="520" y="158" width="148" height="30" />
            <text className="pill-ink" x="534" y="180" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
              ₹ 0.6L / mo
            </text>
          </g>
        </g>

        <g className="rank-row" data-rank="2">
          <rect className="chip" x="28" y="236" width="664" height="94" rx="8" />
          <text className="lbl" x="48" y="260">03 · ToD</text>
          <text className="val" x="48" y="290" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="20">
            Shift dryer warm-up
          </text>
          <text className="mute-txt" x="48" y="312" fontFamily="IBM Plex Mono, monospace" fontSize="11" letterSpacing="0.5">
            Evidence · cheaper slab is open
          </text>
          <g>
            <rect className="pill-fill" x="520" y="264" width="148" height="30" />
            <text className="pill-ink" x="534" y="286" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
              ₹ 0.4L / mo
            </text>
          </g>
        </g>

        <g className="rank-row" data-rank="3">
          <rect className="chip" x="28" y="342" width="664" height="84" rx="8" />
          <text className="lbl" x="48" y="366">04 · Ramp</text>
          <text className="val" x="48" y="396" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="20">
            Trim furnace + press co-start
          </text>
          <g>
            <rect className="pill-fill" x="520" y="364" width="148" height="30" />
            <text className="pill-ink" x="534" y="386" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
              ₹ 0.3L / mo
            </text>
          </g>
        </g>
      </svg>
    </StageShell>
  );
}

export const LOAD_ENERGY_HIW_VISUALS: Record<string, ComponentType> = {
  "equipment-model": EquipmentModelVisual,
  "discom-analysis": TariffMdVisual,
  "plant-control": PlantControlVisual,
  "rupee-ranked": RankedMovesVisual,
};

export function LoadEnergyHiwSlot({ stepId }: { stepId: string }) {
  switch (stepId) {
    case "equipment-model":
      return <EquipmentModelVisual />;
    case "discom-analysis":
      return <TariffMdVisual />;
    case "plant-control":
      return <PlantControlVisual />;
    case "rupee-ranked":
      return <RankedMovesVisual />;
    default:
      return null;
  }
}

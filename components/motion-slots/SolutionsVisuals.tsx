"use client";

import { useId } from "react";

import { useSlotLoop, type SlotLoopOptions } from "./useSlotLoop";

import "./solutions-chromes.css";

function showAll(root: HTMLElement) {
  root.querySelectorAll<SVGElement>(".enter").forEach((el) => {
    el.style.opacity = "1";
    el.style.transform = "none";
  });
}

function poly(xs: number[], ys: number[]) {
  return xs
    .map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${ys[i].toFixed(1)}`)
    .join(" ");
}

function hash01(i: number) {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

const noop = () => {};

function liveMd(root: HTMLElement, staticWindow: boolean, live: () => boolean): () => void {
  const path = root.querySelector<SVGPathElement>("[data-a09-spark]");
  const dot = root.querySelector<SVGCircleElement>("[data-a09-dot]");
  const now = root.querySelector<SVGLineElement>("[data-a09-now]");
  const chip = root.querySelector<SVGTextElement>("[data-a09-mdval]");
  if (!path || !dot || !now || !chip) return noop;

  path.style.strokeLinejoin = "round";
  path.style.strokeLinecap = "round";
  const X0 = 52;
  const X1 = 284;
  const Y_FLOOR = 398;
  const Y_MD = 168;
  const N = 128;
  const DT = 0.038;
  const t0 = performance.now();
  let shown = 2100;
  let raf = 0;

  const kvaAt = (t: number) => {
    const cycle = 0.5 + 0.5 * Math.sin(t * 0.19);
    const base = 1920 + cycle * 320;
    const ramp = 110 * Math.sin(t * 0.48 + 0.6);
    const motors = 70 * Math.sin(t * 1.15) * (0.35 + cycle);
    const chatter = 22 * Math.sin(t * 2.7) + 12 * Math.sin(t * 4.9 + 1.1);
    const pocket = 0.5 + 0.5 * Math.sin(t * 0.14 + 1.7);
    const hvac = pocket > 0.72 ? -220 * ((pocket - 0.72) / 0.28) : 0;
    const peakKiss = Math.max(0, Math.sin(t * 0.11) - 0.42) * 260;
    return Math.max(1780, Math.min(2438, base + ramp + motors + chatter + hvac + peakKiss));
  };

  const yOf = (kva: number) => {
    const u = (kva - 1760) / (2450 - 1760);
    return Y_FLOOR - u * (Y_FLOOR - (Y_MD + 10));
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
    dot.setAttribute("cy", String(ys[N - 1]));
    now.setAttribute("x1", String(X1));
    now.setAttribute("x2", String(X1));
    shown += (kvaAt(elapsed) - shown) * 0.18;
    chip.textContent = Math.round(shown).toLocaleString("en-IN");
  };

  paint(8);
  if (staticWindow) return noop;

  const tick = (nowTs: number) => {
    if (!live()) return;
    paint((nowTs - t0) / 1000 + 8);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => {
    cancelAnimationFrame(raf);
  };
}

function startEnergy(root: HTMLElement, { reduce }: SlotLoopOptions) {
  let live = true;
  const isLive = () => live;
  showAll(root);
  const stopMd = liveMd(root, reduce, isLive);
  return () => {
    live = false;
    stopMd();
  };
}

function liveSignature(root: HTMLElement, staticWindow: boolean, live: () => boolean): () => void {
  const vib = root.querySelector<SVGPathElement>("[data-a10-wave]");
  const kw = root.querySelector<SVGPathElement>("[data-a10-kw]");
  const pulse = root.querySelector<SVGGElement>("[data-a10-pulse]");
  if (!vib || !kw || !pulse) return noop;

  const X0 = 52;
  const X1 = 276;
  const N = 120;
  const Y_TOP = 140;
  const Y_BOT = 376;
  const Y_MID = (Y_TOP + Y_BOT) / 2;
  const SAMPLE_MS = 48;
  const bufV: number[] = [];
  const bufK: number[] = [];
  const bufHit: boolean[] = [];
  let n = 0;
  let raf = 0;

  const clampY = (y: number) => Math.max(Y_TOP, Math.min(Y_BOT, y));

  const pushSample = () => {
    const t = n * 0.05;
    const beat = Math.sin(t * 4.8) * 36 + Math.sin(t * 5.25) * 26;
    const harm = Math.sin(t * 14.2) * 16 + Math.sin(t * 22.6) * 9;
    const wander = Math.sin(t * 0.18) * 52 + Math.sin(t * 0.41 + 1.3) * 24;
    const burst = 0.6 + 0.55 * Math.max(0, Math.sin(t * 0.07));
    const noise = (hash01(n) - 0.5) * 18 + (hash01(n * 3 + 9) - 0.5) * 8;
    const k = n % 34;
    const impl = k === 0 ? 58 : k === 1 ? 24 : k === 2 ? 8 : 0;
    bufV.push(clampY(Y_MID - burst * (beat + harm) - wander - noise - impl));
    const load = 58 * (0.5 + 0.5 * Math.sin(t * 0.12 + 0.4));
    const lag = 42 * (0.5 + 0.5 * Math.sin(t * 0.12 - 0.9));
    const heat = k < 6 ? 28 : 0;
    const floor = 26 * (0.5 + 0.5 * Math.sin(t * 0.06));
    bufK.push(clampY(Y_BOT - 22 - load - lag - heat - floor));
    bufHit.push(k < 3);
    if (bufV.length > N) {
      bufV.shift();
      bufK.shift();
      bufHit.shift();
    }
    n += 1;
  };

  const paint = (shift: number) => {
    const dx = (X1 - X0) / (N - 1);
    const xs = bufV.map((_, i) => X0 + i * dx - shift);
    vib.setAttribute("d", poly(xs, bufV));
    kw.setAttribute("d", poly(xs, bufK));
    let peakI = -1;
    let peakY = Y_BOT;
    for (let i = Math.max(0, bufV.length - 18); i < bufV.length; i++) {
      if (bufHit[i] && bufV[i] < peakY) {
        peakY = bufV[i];
        peakI = i;
      }
    }
    if (peakI < 0) {
      pulse.style.opacity = "0";
      return;
    }
    pulse.style.opacity = "0.9";
    pulse.setAttribute("transform", `translate(${xs[peakI] - 210}, ${peakY - 250})`);
  };

  for (let i = 0; i < N; i++) pushSample();
  paint(0);
  if (staticWindow) return noop;

  const started = performance.now();
  const origin = n;
  const tick = (nowTs: number) => {
    if (!live()) return;
    const exact = (nowTs - started) / SAMPLE_MS;
    const target = origin + Math.floor(exact);
    while (n < target) pushSample();
    paint((exact % 1) * ((X1 - X0) / (N - 1)));
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => {
    cancelAnimationFrame(raf);
  };
}

function startAsset(root: HTMLElement, { reduce }: SlotLoopOptions) {
  let live = true;
  const isLive = () => live;
  showAll(root);
  const stopSig = liveSignature(root, reduce, isLive);
  return () => {
    live = false;
    stopSig();
  };
}

export function EnergyManagementVisual() {
  const uid = useId().replace(/:/g, "");
  const ref = useSlotLoop(startEnergy);

  return (
    <div
      ref={ref}
      className="sol-slot sol-lime"
      role="img"
      aria-label="Live MD load against the demand ceiling, then a rupee-scored idle HVAC prescription."
    >
      <svg viewBox="0 0 720 450" xmlns="http://www.w3.org/2000/svg">
        <rect width="720" height="450" fill="#e8f07a" />
        <g className="enter" data-a09="c1">
          <rect className="chip" x="28" y="24" width="132" height="44" rx="6" />
          <text className="lbl" x="42" y="42">
            MD kVA
          </text>
          <text className="val" data-a09-mdval x="42" y="58" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            2,450
          </text>
        </g>
        <g className="enter" data-a09="c2">
          <rect className="chip" x="172" y="24" width="148" height="44" rx="6" />
          <circle className="live-dot" cx="188" cy="38" r="3.2" />
          <text className="lbl lbl-hi" x="198" y="42">
            ToD window
          </text>
          <text className="val" x="188" y="58" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            Peak · open
          </text>
        </g>
        <g className="enter" data-a09="c3">
          <rect className="chip" x="332" y="24" width="148" height="44" rx="6" />
          <text className="lbl" x="346" y="42">
            Idle HVAC
          </text>
          <text className="val" x="346" y="58" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            180 kW
          </text>
        </g>
        <g className="enter" data-a09="c4">
          <rect className="chip" x="492" y="24" width="128" height="44" rx="6" />
          <text className="lbl" x="506" y="42">
            Feeder
          </text>
          <text className="val" x="506" y="58" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            F-02
          </text>
        </g>
        <g className="enter" data-a09="plot">
          <rect className="chip" x="28" y="86" width="280" height="340" rx="8" />
          <text className="lbl" x="44" y="112">
            Load vs MD ceiling
          </text>
          <defs>
            <clipPath id={`${uid}-md`}>
              <rect x="44" y="126" width="248" height="272" />
            </clipPath>
          </defs>
          <line className="axis" x1="52" y1="398" x2="284" y2="398" />
          <line className="spark-md" x1="52" y1="168" x2="284" y2="168" />
          <text className="lbl lbl-hi" x="52" y="160">
            MD
          </text>
          <g clipPath={`url(#${uid}-md)`}>
            <path className="spark" data-a09-spark d="" />
            <line className="now-rule" data-a09-now x1="284" y1="128" x2="284" y2="398" />
            <circle data-a09-dot className="live-dot" cx="284" cy="248" r="4.2" />
          </g>
        </g>
        <g className="enter" data-a09="rx">
          <rect className="rx" x="328" y="86" width="364" height="340" rx="8" />
          <circle className="live-dot" cx="352" cy="118" r="4" />
          <text className="lbl lbl-hi" x="364" y="122">
            Live · Prescription
          </text>
          <text
            data-a09-title
            className="val"
            x="352"
            y="176"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="700"
            fontSize="26"
          >
            Shed idle HVAC
          </text>
          <text data-a09-bit="owner" className="mute-txt" x="352" y="220" fontFamily="Inter, sans-serif" fontSize="16">
            Owner · Utilities
          </text>
          <text
            data-a09-bit="rupee"
            className="val"
            x="352"
            y="268"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="700"
            fontSize="26"
          >
            ₹ 0.8L / mo
          </text>
          <text
            data-a09-bit="tod"
            className="mute-txt"
            x="352"
            y="318"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="13"
            letterSpacing="0.5"
          >
            ToD window · DISCOM peak
          </text>
          <text
            data-a09-bit="ev"
            className="mute-txt"
            x="352"
            y="352"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="13"
            letterSpacing="0.5"
          >
            Evidence · feeder F-02 idle 180 kW
          </text>
        </g>
      </svg>
    </div>
  );
}

export function AssetHealthVisual() {
  const uid = useId().replace(/:/g, "");
  const ref = useSlotLoop(startAsset);

  return (
    <div
      ref={ref}
      className="sol-slot sol-coral"
      role="img"
      aria-label="Energy-linked vibration on AHU-04, then an assigned maintenance prescription with rupee risk."
    >
      <svg viewBox="0 0 720 450" xmlns="http://www.w3.org/2000/svg">
        <rect width="720" height="450" fill="#F75440" />
        <g className="enter" data-a10="c1">
          <rect className="chip" x="28" y="24" width="156" height="44" rx="6" />
          <text className="lbl" x="42" y="42">
            Asset
          </text>
          <text className="val" x="42" y="58" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            AHU-04
          </text>
        </g>
        <g className="enter" data-a10="c2">
          <rect className="chip" x="196" y="24" width="168" height="44" rx="6" />
          <circle className="live-dot" cx="212" cy="38" r="3.2" />
          <text className="lbl lbl-hi" x="222" y="42">
            Anomaly
          </text>
          <text className="val" x="212" y="58" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            Energy-linked
          </text>
        </g>
        <g className="enter" data-a10="c3">
          <rect className="chip" x="376" y="24" width="148" height="44" rx="6" />
          <text className="lbl" x="390" y="42">
            Shift
          </text>
          <text className="val" x="390" y="58" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            Night
          </text>
        </g>
        <g className="enter" data-a10="plot">
          <rect className="chip" x="28" y="86" width="280" height="340" rx="8" />
          <text className="lbl" x="44" y="112">
            Vibration · energy signature
          </text>
          <defs>
            <clipPath id={`${uid}-sig`}>
              <rect x="44" y="126" width="248" height="262" />
            </clipPath>
          </defs>
          <line className="axis" x1="52" y1="260" x2="284" y2="260" />
          <g clipPath={`url(#${uid}-sig)`}>
            <path className="wave-kw" data-a10-kw d="" />
            <path className="wave" data-a10-wave d="" />
            <g data-a10-pulse opacity="0">
              <circle className="pulse-ring" cx="210" cy="250" r="7" />
            </g>
          </g>
        </g>
        <g className="enter" data-a10="rx">
          <rect className="rx" x="328" y="86" width="364" height="340" rx="8" />
          <circle className="live-dot" cx="352" cy="118" r="4" />
          <text className="lbl lbl-hi" x="364" y="122">
            Live · Prescription
          </text>
          <text
            data-a10-title
            className="val"
            x="352"
            y="176"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="700"
            fontSize="26"
          >
            Inspect AHU-04 bearing
          </text>
          <text data-a10-bit="owner" className="mute-txt" x="352" y="220" fontFamily="Inter, sans-serif" fontSize="16">
            Owner · Maintenance
          </text>
          <g data-a10-bit="rupee">
            <rect className="pill-fill" x="352" y="244" width="148" height="34" />
            <text className="pill-ink" x="366" y="268" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="20">
              ₹ 1.2L risk
            </text>
          </g>
          <text
            data-a10-bit="link"
            className="mute-txt"
            x="352"
            y="318"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="13"
            letterSpacing="0.5"
          >
            Linked idle kW · night shift
          </text>
          <text
            data-a10-bit="ev"
            className="mute-txt"
            x="352"
            y="352"
            fontFamily="IBM Plex Mono, monospace"
            fontSize="13"
            letterSpacing="0.5"
          >
            Evidence · signature vs baseline
          </text>
        </g>
      </svg>
    </div>
  );
}
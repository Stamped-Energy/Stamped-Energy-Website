"use client";

import { useId, type ReactNode } from "react";

import { useSlotLoop, type SlotLoopOptions } from "./useSlotLoop";

import "./asset-health-hiw.css";

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

function pulse(el: Element | null, live: () => boolean) {
  if (!el) return noop;
  let raf = 0;
  const tick = (now: number) => {
    if (!live()) return;
    el.setAttribute("opacity", String(0.55 + 0.45 * Math.sin(now / 420)));
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

function setText(root: HTMLElement, id: string, value: string) {
  const el = root.querySelector(id);
  if (el) el.textContent = value;
}

const CASES = [
  {
    l0: "+18% kW",
    s0: "Same air pressure",
    l1: "9 days held",
    s1: "Not a one-shift spike",
    l2: "Unload valve",
    cause: "Filter + valve",
    own: "Owner · Maintenance",
    rupee: "₹ 1.2L risk",
    ev: "Evidence · kW vs pressure",
  },
  {
    l0: "Holding kWh",
    s0: "Throughput is zero",
    l1: "45 min delay",
    s1: "Downstream still late",
    l2: "Furnace hold",
    cause: "Cut holding heat",
    own: "Owner · Heat treat",
    rupee: "₹ 0.7L / mo",
    ev: "Evidence · hold vs delay",
  },
  {
    l0: "High pump kW",
    s0: "Flow is low",
    l1: "Recirc path",
    s1: "Valve likely stuck",
    l2: "Cooling loop",
    cause: "Check recirc valve",
    own: "Owner · Utilities",
    rupee: "₹ 0.5L / mo",
    ev: "Evidence · kW vs flow",
  },
] as const;

function startConstraints(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const gates = [...root.querySelectorAll("[data-gate]")];
  const probe = root.querySelector("#s01probe");
  const tick = root.querySelector<SVGPathElement>("#s01tick");
  const verdict = root.querySelector("#s01verdict");
  const sts = [0, 1, 2, 3].map((i) => root.querySelector(`#s01st${i}`));
  if (!probe || !tick || !verdict) return noop;

  let live = true;
  const ys = [98, 164, 230, 296];
  let len = 24;
  try {
    len = tick.getTotalLength();
  } catch {
    /* skip */
  }
  tick.style.strokeDasharray = String(len);

  const reset = () => {
    gates.forEach((g, i) => g.classList.toggle("is-on", i === 0));
    sts.forEach((el) => {
      if (el) el.textContent = "HOLD";
    });
    tick.style.strokeDashoffset = String(len);
    verdict.textContent = "Reading constraints";
    probe.setAttribute("transform", "translate(48, 98)");
  };

  reset();
  const stopPulse = pulse(root.querySelector("#s01dot"), () => live);
  if (reduce) {
    sts.forEach((el) => {
      if (el) el.textContent = "CLEAR";
    });
    gates.forEach((g) => g.classList.add("is-on"));
    tick.style.strokeDashoffset = "0";
    verdict.textContent = "Clear to prescribe";
    return () => {
      live = false;
      stopPulse();
    };
  }

  void (async () => {
    try {
      while (live) {
        reset();
        await wait(480, () => live);
        for (let i = 0; i < 4; i++) {
          await tweenVal(
            i === 0 ? ys[0] : (ys[i - 1] ?? ys[0]),
            ys[i] ?? ys[0],
            520,
            (y) => {
              probe.setAttribute("transform", `translate(48, ${y})`);
            },
            () => live,
          );
          gates.forEach((g, n) => g.classList.toggle("is-on", n === i));
          const status = sts[i];
          if (status) status.textContent = "CLEAR";
          await wait(420, () => live);
        }
        verdict.textContent = "Clear to prescribe";
        await tweenVal(len, 0, 380, (v) => {
          tick.style.strokeDashoffset = String(v);
        }, () => live);
        await wait(1600, () => live);
      }
    } catch {
      /* stop */
    }
  })();

  return () => {
    live = false;
    stopPulse();
  };
}

function startCause(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const layers = [...root.querySelectorAll("[data-layer]")];
  const wires = ["#s02w1", "#s02w2", "#s02w3"].map((id) =>
    root.querySelector<SVGPathElement>(id),
  );
  let live = true;

  wires.forEach((w) => {
    if (!w) return;
    try {
      const n = w.getTotalLength();
      w.style.strokeDasharray = String(n);
      w.style.strokeDashoffset = String(n);
    } catch {
      /* skip */
    }
  });

  const paint = (n: number) => {
    const c = CASES[n % CASES.length];
    if (!c) return;
    setText(root, "#s02l0", c.l0);
    setText(root, "#s02s0", c.s0);
    setText(root, "#s02l1", c.l1);
    setText(root, "#s02s1", c.s1);
    setText(root, "#s02l2", c.l2);
    setText(root, "#s02cause", c.cause);
    setText(root, "#s02own", c.own);
    setText(root, "#s02rupee", c.rupee);
    setText(root, "#s02ev", c.ev);
  };

  paint(0);
  const stopPulse = pulse(root.querySelector("#s02dot"), () => live);
  if (reduce) {
    layers.forEach((el) => el.classList.add("is-on"));
    wires.forEach((w) => {
      if (w) w.style.strokeDashoffset = "0";
    });
    return () => {
      live = false;
      stopPulse();
    };
  }

  void (async () => {
    let n = 0;
    try {
      while (live) {
        paint(n);
        layers.forEach((el) => el.classList.remove("is-on"));
        wires.forEach((w) => {
          if (!w) return;
          try {
            w.style.strokeDashoffset = String(w.getTotalLength());
          } catch {
            /* skip */
          }
        });
        for (let i = 0; i < 3; i++) {
          layers[i]?.classList.add("is-on");
          const w = wires[i];
          if (w) {
            let wireLen = 80;
            try {
              wireLen = w.getTotalLength();
            } catch {
              /* skip */
            }
            await tweenVal(wireLen, 0, 420, (v) => {
              w.style.strokeDashoffset = String(v);
            }, () => live);
          }
          await wait(280, () => live);
        }
        await wait(2200, () => live);
        n = (n + 1) % CASES.length;
      }
    } catch {
      /* stop */
    }
  })();

  return () => {
    live = false;
    stopPulse();
  };
}

function startEnvelope(root: HTMLElement) {
  const hi = root.querySelector("#s03hi");
  const lo = root.querySelector("#s03lo");
  const obsPath = root.querySelector("#s03obs");
  const hatch = root.querySelector("#s03hatch");
  const now = root.querySelector("#s03now");
  const liveDot = root.querySelector("#s03live");
  const kwEl = root.querySelector("#s03kw");
  const expEl = root.querySelector("#s03exp");
  const secEl = root.querySelector("#s03sec");
  const deltaEl = root.querySelector("#s03delta");
  if (!hi || !lo || !obsPath || !hatch || !now || !liveDot) return noop;

  const X0 = 78;
  const X1 = 652;
  const N = 96;
  const DX = (X1 - X0) / (N - 1);
  const Y_TOP = 136;
  const Y_FLOOR = 300;
  const KW_MIN = 36;
  const KW_MAX = 168;
  const BAND = 14;
  const SAMPLE = 0.04;
  const yOf = (kw: number) =>
    Y_FLOOR - ((kw - KW_MIN) / (KW_MAX - KW_MIN)) * (Y_FLOOR - Y_TOP);
  const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

  let seed = 1729;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  let expKw = 86;
  let obsKw = 88;
  let expAim = 86;
  let obsAim = 88;
  let nextEvent = 0.3;
  let clock = 0;

  const step = () => {
    const t = clock;
    if (t >= nextEvent) {
      nextEvent = t + 0.45 + rnd() * 2.6;
      expAim = 70 + rnd() * 28;
      const roll = rnd();
      if (roll < 0.22) obsAim = expAim + 16 + rnd() * 14;
      else if (roll < 0.4) obsAim = expAim - 12 - rnd() * 10;
      else obsAim = expAim + (rnd() - 0.5) * 14;
    }
    const wander =
      8.2 * Math.sin(t * 0.29 + 0.4) +
      6.1 * Math.sin(t * 0.71 + 1.7) +
      4.4 * Math.sin(t * 1.13 + 0.2);
    const drift = t > 14 ? Math.min(14, (t - 14) * 0.85) : 0;
    expKw += (expAim - expKw) * 0.03;
    expKw += 0.45 * Math.sin(t * 0.18);
    obsKw += (obsAim + wander + drift - obsKw) * 0.085;
    obsKw += 1.6 * Math.sin(t * 2.4);
    expKw = clamp(expKw, 62, 124);
    obsKw = clamp(obsKw, KW_MIN + 6, KW_MAX - 4);
    clock += SAMPLE;
    return { exp: expKw, obs: obsKw };
  };

  const samples: Array<{ exp: number; obs: number }> = [];
  const push = () => {
    samples.push(step());
    if (samples.length > N) samples.shift();
  };

  for (let i = 0; i < N; i++) push();

  let shown = samples.at(-1)?.obs ?? 88;
  let live = true;
  let raf = 0;

  const paint = () => {
    const n = samples.length;
    const xs: number[] = [];
    const yH: number[] = [];
    const yL: number[] = [];
    const yO: number[] = [];
    for (let i = 0; i < n; i++) {
      const s = samples[i] ?? { exp: 86, obs: 88 };
      xs.push(X0 + i * DX);
      yH.push(yOf(s.exp + BAND));
      yL.push(yOf(Math.max(KW_MIN + 4, s.exp - BAND)));
      yO.push(yOf(s.obs));
    }
    hi.setAttribute("d", poly(xs, yH));
    lo.setAttribute("d", poly(xs, yL));
    obsPath.setAttribute("d", poly(xs, yO));
    const last = samples.at(-1);
    if (!last || yO.length === 0) return;
    liveDot.setAttribute("cx", String(X1));
    liveDot.setAttribute("cy", String(yO[yO.length - 1]));
    now.setAttribute("x1", String(X1));
    now.setAttribute("x2", String(X1));
    shown += (last.obs - shown) * 0.22;
    if (kwEl) kwEl.textContent = `${Math.round(shown)} kW`;
    if (expEl) expEl.textContent = `${Math.round(last.exp)} kW`;
    let a = -1;
    for (let i = 0; i < n; i++) {
      const s = samples[i];
      if (s && s.obs > s.exp + BAND) {
        a = i;
        break;
      }
    }
    const over = last.obs > last.exp + BAND;
    if (a >= 0 && n - a > 2) {
      const x0h = xs[a];
      const y0h = yH[a];
      if (x0h == null || y0h == null) {
        hatch.setAttribute("d", "");
      } else {
        let d = `M${x0h.toFixed(1)} ${y0h.toFixed(1)}`;
        for (let i = a; i < n; i++) {
          const x = xs[i];
          const y = yO[i];
          if (x == null || y == null) continue;
          d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
        }
        for (let i = n - 1; i >= a; i--) {
          const x = xs[i];
          const y = yH[i];
          if (x == null || y == null) continue;
          d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
        }
        hatch.setAttribute("d", `${d} Z`);
      }
    } else {
      hatch.setAttribute("d", "");
    }
    if (over) {
      const pct = Math.round(((last.obs - last.exp) / Math.max(1, last.exp)) * 100);
      if (secEl) secEl.textContent = `+${Math.max(0, pct)}%`;
      if (deltaEl) deltaEl.textContent = "Live left the band";
    } else {
      if (secEl) secEl.textContent = "+0%";
      if (deltaEl) deltaEl.textContent = "In band";
    }
  };

  const stopPulse = pulse(root.querySelector("#s03dot"), () => live);
  paint();

  let acc = 0;
  let lastTs = performance.now();
  const tick = (ts: number) => {
    if (!live) return;
    acc += (ts - lastTs) / 1000;
    lastTs = ts;
    while (acc >= SAMPLE) {
      acc -= SAMPLE;
      push();
    }
    paint();
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  return () => {
    live = false;
    cancelAnimationFrame(raf);
    stopPulse();
  };
}

function startDecisions(root: HTMLElement, { reduce }: SlotLoopOptions) {
  const groups = [...root.querySelectorAll(".btn-group")];
  const logs = [...root.querySelectorAll("[data-log]")];
  const tick = root.querySelector<SVGPathElement>("#s04tick");
  const note = root.querySelector("#s04note");
  const cursor = root.querySelector<SVGGElement>("#s04cursor");
  const logTxt = root.querySelector("#s04log");
  const count = root.querySelector("#s04count");
  const title = root.querySelector("#s04title");
  if (!tick || !note || !cursor) return noop;

  let live = true;
  let nLogged = 14;
  const pos = { ok: { x: 76, y: 312 }, adj: { x: 200, y: 312 }, x: { x: 324, y: 312 } };
  const labels = { ok: "Accept logged", adj: "Adjust logged", x: "Reject logged" };
  const logLine = { ok: "Accept · AHU-04", adj: "Adjust · window", x: "Reject · keep run" };
  const titles = ["Inspect AHU-04 bearing", "Inspect Comp-2 filter", "Cut furnace holding"];
  let len = 24;
  try {
    len = tick.getTotalLength();
  } catch {
    /* skip */
  }
  tick.style.strokeDasharray = String(len);
  tick.style.strokeDashoffset = String(len);

  const setHot = (name: string) => {
    groups.forEach((g) => g.classList.toggle("is-hot", g.getAttribute("data-btn") === name));
  };
  const place = (p: { x: number; y: number }) => {
    cursor.style.transform = `translate(${p.x}px, ${p.y}px)`;
  };

  const move = (from: { x: number; y: number }, to: { x: number; y: number }, ms: number) =>
    new Promise<void>((resolve) => {
      const t0 = performance.now();
      const frame = (now: number) => {
        if (!live) return resolve();
        const t = Math.min(1, (now - t0) / ms);
        const e = easeOut(t);
        place({
          x: from.x + (to.x - from.x) * e,
          y: from.y + (to.y - from.y) * e - Math.sin(Math.PI * t) * 10,
        });
        if (t < 1) requestAnimationFrame(frame);
        else resolve();
      };
      requestAnimationFrame(frame);
    });

  place(pos.ok);
  const stopPulse = pulse(root.querySelector("#s04dot"), () => live);
  if (reduce) {
    note.textContent = "Accept logged";
    tick.style.strokeDashoffset = "0";
    if (logTxt) logTxt.textContent = "Accept · AHU-04";
    logs.forEach((el) => el.classList.add("is-on"));
    return () => {
      live = false;
      stopPulse();
    };
  }

  void (async () => {
    const order = ["ok", "adj", "x"] as const;
    let i = 0;
    try {
      while (live) {
        const pick = order[i % 3];
        if (title) title.textContent = titles[i % titles.length];
        note.textContent = "Awaiting decision";
        tick.style.strokeDashoffset = String(len);
        if (logTxt) logTxt.textContent = "Waiting";
        logs.forEach((el, n) => el.classList.toggle("is-on", n === 2));
        const from = i === 0 ? pos.ok : pos[order[(i - 1) % 3]];
        await move(from, pos[pick], 640);
        setHot(pick);
        note.textContent = labels[pick];
        if (logTxt) logTxt.textContent = logLine[pick];
        nLogged += 1;
        if (count) count.textContent = `${nLogged} on file`;
        await tweenVal(len, 0, 360, (v) => {
          tick.style.strokeDashoffset = String(v);
        }, () => live);
        await wait(1500, () => live);
        i += 1;
      }
    } catch {
      /* stop */
    }
  })();

  return () => {
    live = false;
    stopPulse();
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
    <div ref={ref} className={`ah-slot ${className}`} role="img" aria-label={label}>
      {children}
    </div>
  );
}

function ConstraintsVisual() {
  return (
    <StageShell className="ah-cream" label="Constraint checks" start={startConstraints}>
      <svg viewBox="0 0 720 450" xmlns="http://www.w3.org/2000/svg">
        <rect width="720" height="450" fill="#F1EDE3" />

        <g>
          <rect className="chip" x="28" y="20" width="156" height="48" rx="6" />
          <text className="lbl" x="42" y="38">Asset</text>
          <text className="val" x="42" y="56" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            AHU-04
          </text>
        </g>
        <g>
          <rect className="chip" x="196" y="20" width="164" height="48" rx="6" />
          <circle className="live-dot" id="s01dot" cx="212" cy="34" r="3.2" />
          <text className="lbl lbl-hi" x="222" y="38">Proposal</text>
          <text className="val" x="212" y="56" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            Inspect now
          </text>
        </g>
        <g>
          <rect className="chip" x="372" y="20" width="148" height="48" rx="6" />
          <text className="lbl" x="386" y="38">Plant</text>
          <text className="val" x="386" y="56" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            This site
          </text>
        </g>
        <g>
          <rect className="chip" x="532" y="20" width="160" height="48" rx="6" />
          <text className="lbl" x="546" y="38">Not generic</text>
          <text className="val" x="546" y="56" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            4 checks
          </text>
        </g>

        <line className="spine" x1="56" y1="86" x2="56" y2="348" />
        <g className="probe" id="s01probe" transform="translate(48, 98)">
          <circle className="live-dot" cx="8" cy="8" r="6" />
        </g>

        <g className="gate is-on" data-gate="0">
          <rect className="chip" x="84" y="86" width="608" height="58" rx="7" />
          <text className="lbl lbl-hi" x="104" y="108">01 · Production window</text>
          <text className="val" x="104" y="130" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="18">
            Night low-load
          </text>
          <text className="mute-txt" id="s01st0" x="560" y="122" fontFamily="IBM Plex Mono, monospace" fontSize="13" letterSpacing="0.4">
            HOLD
          </text>
        </g>
        <g className="gate" data-gate="1">
          <rect className="chip" x="84" y="152" width="608" height="58" rx="7" />
          <text className="lbl" x="104" y="174">02 · Isolation / permit</text>
          <text className="val" x="104" y="196" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="18">
            Window open tonight
          </text>
          <text className="mute-txt" id="s01st1" x="560" y="188" fontFamily="IBM Plex Mono, monospace" fontSize="13" letterSpacing="0.4">
            HOLD
          </text>
        </g>
        <g className="gate" data-gate="2">
          <rect className="chip" x="84" y="218" width="608" height="58" rx="7" />
          <text className="lbl" x="104" y="240">03 · Standby capacity</text>
          <text className="val" x="104" y="262" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="18">
            AHU-03 can cover
          </text>
          <text className="mute-txt" id="s01st2" x="560" y="254" fontFamily="IBM Plex Mono, monospace" fontSize="13" letterSpacing="0.4">
            HOLD
          </text>
        </g>
        <g className="gate" data-gate="3">
          <rect className="chip" x="84" y="284" width="608" height="58" rx="7" />
          <text className="lbl" x="104" y="306">04 · ₹ exposure</text>
          <text className="val" x="104" y="328" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="18">
            ₹ 1.2L if delayed
          </text>
          <text className="mute-txt" id="s01st3" x="560" y="320" fontFamily="IBM Plex Mono, monospace" fontSize="13" letterSpacing="0.4">
            HOLD
          </text>
        </g>

        <g>
          <rect className="rx" x="28" y="356" width="664" height="74" rx="8" />
          <path className="tick-draw" id="s01tick" d="M52 393 L58 399 L70 383" />
          <text className="lbl lbl-hi" x="88" y="386">This plant</text>
          <text className="val" id="s01verdict" x="88" y="412" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="18">
            Reading constraints
          </text>
        </g>
      </svg>
    </StageShell>
  );
}

function CauseVisual() {
  return (
    <StageShell className="ah-dark" label="Root cause to rupee" start={startCause}>
      <svg viewBox="0 0 720 450" xmlns="http://www.w3.org/2000/svg">
        <rect width="720" height="450" fill="#182A27" />

        <g>
          <rect className="chip" x="28" y="20" width="176" height="48" rx="6" />
          <circle className="live-dot" id="s02dot" cx="44" cy="34" r="3.2" />
          <text className="lbl lbl-hi" x="54" y="38">Live trail</text>
          <text className="val" x="44" y="56" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            Energy first
          </text>
        </g>
        <g>
          <rect className="chip" x="216" y="20" width="220" height="48" rx="6" />
          <text className="lbl" x="230" y="38">Then process</text>
          <text className="val" x="230" y="56" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            Same hours · same load
          </text>
        </g>
        <g>
          <rect className="chip" x="448" y="20" width="244" height="48" rx="6" />
          <text className="lbl" x="462" y="38">Then rupee</text>
          <text className="val" x="462" y="56" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            Cost before the Rx
          </text>
        </g>

        <g className="layer is-on" data-layer="0">
          <rect className="chip" x="28" y="86" width="280" height="118" rx="8" />
          <text className="lbl lbl-hi" x="48" y="112">01 · Energy signature</text>
          <text className="val" id="s02l0" x="48" y="144" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="20">
            +18% kW
          </text>
          <text className="mute-txt" id="s02s0" x="48" y="176" fontFamily="IBM Plex Mono, monospace" fontSize="12" letterSpacing="0.4">
            Same air pressure
          </text>
        </g>
        <g className="layer" data-layer="1">
          <rect className="chip" x="28" y="216" width="280" height="118" rx="8" />
          <text className="lbl" x="48" y="242">02 · Process context</text>
          <text className="val" id="s02l1" x="48" y="274" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="20">
            9 days held
          </text>
          <text className="mute-txt" id="s02s1" x="48" y="306" fontFamily="IBM Plex Mono, monospace" fontSize="12" letterSpacing="0.4">
            Not a one-shift spike
          </text>
        </g>
        <g className="layer" data-layer="2">
          <rect className="chip" x="28" y="346" width="280" height="84" rx="8" />
          <text className="lbl" x="48" y="372">03 · Cause named</text>
          <text className="val" id="s02l2" x="48" y="406" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="18">
            Unload valve
          </text>
        </g>

        <path className="wire" id="s02w1" d="M308 145 H 360 V 176 H 412" />
        <path className="wire" id="s02w2" d="M308 275 H 360 V 176 H 412" />
        <path className="wire" id="s02w3" d="M308 388 H 360 V 176 H 412" />

        <g>
          <rect className="rx" x="412" y="86" width="280" height="338" rx="8" />
          <text className="lbl lbl-hi" x="436" y="118">Root cause</text>
          <text className="val" id="s02cause" x="436" y="168" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="24">
            Filter + valve
          </text>
          <text className="mute-txt" id="s02own" x="436" y="208" fontFamily="Inter, sans-serif" fontSize="16">
            Owner · Maintenance
          </text>
          <g>
            <rect className="pill-fill" x="436" y="232" width="168" height="38" />
            <text className="pill-ink" id="s02rupee" x="452" y="258" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="20">
              ₹ 1.2L risk
            </text>
          </g>
          <text className="mute-txt" id="s02ev" x="436" y="304" fontFamily="IBM Plex Mono, monospace" fontSize="13" letterSpacing="0.4">
            Evidence · kW vs pressure
          </text>
          <text className="mute-txt" x="436" y="338" fontFamily="IBM Plex Mono, monospace" fontSize="13" letterSpacing="0.4">
            Routed before a trip
          </text>
          <text className="lbl" x="436" y="388">Ranked prescription</text>
        </g>
      </svg>
    </StageShell>
  );
}

function EnvelopeVisual() {
  const clipId = `ah-env-${useId().replace(/:/g, "")}`;
  return (
    <StageShell
      className="ah-sage"
      label="Modeled vs observed"
      start={(root) => startEnvelope(root)}
    >
      <svg viewBox="0 0 720 450" xmlns="http://www.w3.org/2000/svg">
        <rect width="720" height="450" fill="#EEF981" />

        <g>
          <rect className="chip" x="28" y="20" width="168" height="48" rx="6" />
          <text className="lbl" x="42" y="38">Expected</text>
          <text className="val" id="s03exp" x="42" y="56" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            118 kW
          </text>
        </g>
        <g>
          <rect className="chip" x="208" y="20" width="176" height="48" rx="6" />
          <circle className="live-dot" id="s03dot" cx="224" cy="34" r="3.2" />
          <text className="lbl lbl-hi" x="234" y="38">Observed</text>
          <text className="val" id="s03kw" x="224" y="56" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            Live kW
          </text>
        </g>
        <g>
          <rect className="chip" x="396" y="20" width="148" height="48" rx="6" />
          <text className="lbl" x="410" y="38">Held</text>
          <text className="val" id="s03days" x="410" y="56" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            9 days
          </text>
        </g>
        <g>
          <rect className="chip" x="556" y="20" width="136" height="48" rx="6" />
          <text className="lbl" x="570" y="38">SEC</text>
          <text className="val" id="s03sec" x="570" y="56" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            +0%
          </text>
        </g>

        <g>
          <rect className="chip" x="28" y="84" width="664" height="246" rx="8" />
          <text className="lbl" x="48" y="112">Live kW · modeled envelope</text>
          <defs>
            <clipPath id={clipId}>
              <rect x="44" y="122" width="632" height="178" />
            </clipPath>
          </defs>
          <text className="lbl" x="48" y="138">160</text>
          <text className="lbl" x="48" y="210">90</text>
          <text className="lbl" x="48" y="278">40</text>
          <line className="plot-grid" x1="78" y1="160" x2="652" y2="160" />
          <line className="plot-grid" x1="78" y1="220" x2="652" y2="220" />
          <line className="plot-grid" x1="78" y1="260" x2="652" y2="260" />
          <line className="axis" x1="78" y1="300" x2="652" y2="300" />
          <line className="axis" x1="78" y1="122" x2="78" y2="300" />
          <g clipPath={`url(#${clipId})`}>
            <path className="hatch" id="s03hatch" d="" />
            <path className="band" id="s03hi" d="" />
            <path className="band" id="s03lo" d="" />
            <path className="obs" id="s03obs" d="" />
          </g>
          <line className="now-rule" id="s03now" x1="78" y1="122" x2="78" y2="300" />
          <circle className="live-dot" id="s03live" cx="78" cy="220" r="4.2" />
          <text className="lbl" x="78" y="318">-60s</text>
          <text className="lbl" x="628" y="318">Now</text>
        </g>

        <g>
          <rect className="rx" x="28" y="344" width="664" height="86" rx="8" />
          <text className="lbl lbl-hi" x="48" y="372">Drift before a trip</text>
          <text className="val" id="s03rx" x="48" y="406" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="22">
            Inspect AHU-04 bearing
          </text>
          <text className="mute-txt" id="s03delta" x="430" y="406" fontFamily="IBM Plex Mono, monospace" fontSize="13" letterSpacing="0.4">
            In band
          </text>
        </g>
      </svg>
    </StageShell>
  );
}

function DecisionsVisual() {
  return (
    <StageShell className="ah-wine" label="Decision feedback" start={startDecisions}>
      <svg viewBox="0 0 720 450" xmlns="http://www.w3.org/2000/svg">
        <rect width="720" height="450" fill="#4B1728" />

        <g>
          <rect className="chip" x="28" y="20" width="164" height="48" rx="6" />
          <circle className="live-dot" id="s04dot" cx="44" cy="34" r="3.2" />
          <text className="lbl lbl-hi" x="54" y="38">Operator</text>
          <text className="val" x="44" y="56" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            Floor lead
          </text>
        </g>
        <g>
          <rect className="chip" x="204" y="20" width="176" height="48" rx="6" />
          <text className="lbl" x="218" y="38">Logged</text>
          <text className="val" id="s04count" x="218" y="56" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            14 on file
          </text>
        </g>
        <g>
          <rect className="chip" x="392" y="20" width="300" height="48" rx="6" />
          <text className="lbl" x="406" y="38">Expertise</text>
          <text className="val" x="406" y="56" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            Compounds each shift
          </text>
        </g>

        <g>
          <rect className="rx" x="28" y="84" width="360" height="188" rx="8" />
          <text className="lbl lbl-hi" x="48" y="112">Live · Prescription</text>
          <text className="val" id="s04title" x="48" y="148" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="22">
            Inspect AHU-04 bearing
          </text>
          <text className="mute-txt" x="48" y="180" fontFamily="Inter, sans-serif" fontSize="15">
            Owner · Maintenance
          </text>
          <g>
            <rect className="pill-fill" x="48" y="198" width="148" height="34" />
            <text className="pill-ink" x="62" y="222" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="18">
              ₹ 1.2L risk
            </text>
          </g>
        </g>

        <g className="btn-group is-hot" data-btn="ok">
          <rect className="btn" x="28" y="286" width="112" height="52" rx="6" />
          <text className="val" x="44" y="320" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            Accept
          </text>
        </g>
        <g className="btn-group" data-btn="adj">
          <rect className="btn" x="152" y="286" width="112" height="52" rx="6" />
          <text className="val" x="168" y="320" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            Adjust
          </text>
        </g>
        <g className="btn-group" data-btn="x">
          <rect className="btn" x="276" y="286" width="112" height="52" rx="6" />
          <text className="val" x="292" y="320" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            Reject
          </text>
        </g>

        <g>
          <rect className="chip" x="28" y="352" width="360" height="78" rx="8" />
          <path className="tick-draw" id="s04tick" d="M48 392 L54 398 L66 382" />
          <text className="lbl" x="84" y="380">Verify</text>
          <text className="val" id="s04note" x="84" y="408" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
            Awaiting decision
          </text>
        </g>

        <g>
          <rect className="chip" x="404" y="84" width="288" height="346" rx="8" />
          <text className="lbl lbl-hi" x="424" y="112">Decision ledger</text>
          <g className="log-row" data-log="0" transform="translate(424, 132)">
            <rect className="chip" x="0" y="0" width="248" height="64" rx="6" />
            <text className="lbl" x="14" y="22">Shift · last night</text>
            <text className="val" x="14" y="46" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
              Accept · Comp-2
            </text>
          </g>
          <g className="log-row" data-log="1" transform="translate(424, 204)">
            <rect className="chip" x="0" y="0" width="248" height="64" rx="6" />
            <text className="lbl" x="14" y="22">Shift · yesterday</text>
            <text className="val" x="14" y="46" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
              Adjust · furnace
            </text>
          </g>
          <g className="log-row is-on" data-log="2" transform="translate(424, 276)">
            <rect className="chip" x="0" y="0" width="248" height="64" rx="6" />
            <text className="lbl lbl-hi" x="14" y="22">This shift</text>
            <text className="val" id="s04log" x="14" y="46" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="16">
              Waiting
            </text>
          </g>
          <text className="mute-txt" x="424" y="404" fontFamily="IBM Plex Mono, monospace" fontSize="12" letterSpacing="0.4">
            Plant priorities stay on file
          </text>
        </g>

        <g id="s04cursor" className="cursor-arrow" style={{ transform: "translate(76px, 312px)" }}>
          <path d="M0 0 L0 18 L5 13.5 L9 22 L12.5 20.5 L8.5 12 L15 12 Z" />
        </g>
      </svg>
    </StageShell>
  );
}

export function AssetHealthHiwSlot({ stepId }: { stepId: string }) {
  switch (stepId) {
    case "constraints":
      return <ConstraintsVisual />;
    case "root-cause":
      return <CauseVisual />;
    case "expected-behavior":
      return <EnvelopeVisual />;
    case "operators-control":
      return <DecisionsVisual />;
    default:
      return null;
  }
}

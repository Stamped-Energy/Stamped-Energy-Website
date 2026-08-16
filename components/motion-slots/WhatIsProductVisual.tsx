"use client";

import { useId } from "react";

import { useSlotLoop, type SlotLoopOptions } from "./useSlotLoop";

import "./what-is-product.css";

const MARK = "/images/product/logo-mark-3d.png";
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

function wait(ms: number, live: () => boolean) {
  return new Promise<void>((resolve) => {
    window.setTimeout(() => resolve(), ms);
    if (!live()) resolve();
  });
}

function fadeUp(el: HTMLElement | SVGElement, duration: number, delay: number, fromY: number, live: () => boolean) {
  return new Promise<void>((resolve) => {
    const start = performance.now() + delay;
    const frame = (now: number) => {
      if (!live()) return resolve();
      if (now < start) {
        requestAnimationFrame(frame);
        return;
      }
      const t = Math.min(1, (now - start) / duration);
      const e = easeOut(t);
      el.style.opacity = String(e);
      el.style.transform = `translateY(${(1 - e) * fromY}px)`;
      if (t < 1) requestAnimationFrame(frame);
      else resolve();
    };
    requestAnimationFrame(frame);
  });
}

function drawPath(path: SVGPathElement, duration: number, delay: number, live: () => boolean) {
  const len = path.getTotalLength();
  path.style.strokeDasharray = String(len);
  path.style.strokeDashoffset = String(len);
  path.style.opacity = "1";
  return new Promise<void>((resolve) => {
    const start = performance.now() + delay;
    const frame = (now: number) => {
      if (!live()) return resolve();
      if (now < start) {
        requestAnimationFrame(frame);
        return;
      }
      const t = Math.min(1, (now - start) / duration);
      path.style.strokeDashoffset = String(len * (1 - easeOut(t)));
      if (t < 1) requestAnimationFrame(frame);
      else resolve();
    };
    requestAnimationFrame(frame);
  });
}

function tweenVal(from: number, to: number, duration: number, apply: (v: number) => void, live: () => boolean) {
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

function startWhatIs(root: HTMLElement, { reduce }: SlotLoopOptions) {
  let live = true;
  const isLive = () => live;
  const q = <T extends Element>(sel: string) => root.querySelector<T>(sel);
  const qa = <T extends Element>(sel: string) => [...root.querySelectorAll<T>(sel)];

  const showDocked = () => {
    qa<HTMLElement | SVGElement>(".enter, .wire").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    qa<SVGPathElement>(".wire").forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = String(len);
      p.style.strokeDashoffset = "0";
    });
    qa<SVGElement>(".rx-bit").forEach((el) => {
      el.style.opacity = "1";
    });
  };

  if (reduce) {
    showDocked();
    return () => {
      live = false;
    };
  }

  const place = (el: SVGCircleElement, path: SVGPathElement, u: number) => {
    const len = path.getTotalLength();
    const pt = path.getPointAtLength(Math.max(0, Math.min(1, u)) * len);
    el.setAttribute("cx", String(pt.x));
    el.setAttribute("cy", String(pt.y));
  };

  const runAlong = (dot: SVGCircleElement, path: SVGPathElement, pxPerMs: number) =>
    new Promise<void>((resolve) => {
      const len = path.getTotalLength();
      const dur = Math.max(900, len / pxPerMs);
      place(dot, path, 0);
      dot.style.opacity = "1";
      const t0 = performance.now();
      const frame = (now: number) => {
        if (!live) return resolve();
        const u = Math.min(1, (now - t0) / dur);
        place(dot, path, u);
        if (u < 1) requestAnimationFrame(frame);
        else {
          dot.style.opacity = "0";
          resolve();
        }
      };
      requestAnimationFrame(frame);
    });

  const loopDot = async (dot: SVGCircleElement, path: SVGPathElement, stagger: number) => {
    await wait(stagger, isLive);
    while (live) {
      await runAlong(dot, path, 0.13);
      await wait(720, isLive);
    }
  };

  const startPackets = () => {
    const STAGGER = [0, 220, 440, 660, 160, 380];
    qa<SVGCircleElement>(".packet").forEach((dot, i) => {
      const id = dot.getAttribute("data-route");
      const path = id ? q<SVGPathElement>(`#${CSS.escape(id)}`) : null;
      if (!path) return;
      place(dot, path, 0);
      void loopDot(dot, path, STAGGER[i] || 0);
    });
  };

  let clockRaf = 0;

  const startLiveIcons = () => {
    const LEVELS = [0.38, 0.92, 0.55, 0.78, 0.42, 1, 0.6];
    qa<SVGGElement>(".meter-bar").forEach((bar, i) => {
      const base = bar.getAttribute("data-base") ?? "";
      let step = i * 2;
      void (async () => {
        while (live) {
          const from = parseFloat(bar.dataset.k || "0.5");
          const to = LEVELS[step % LEVELS.length];
          step += 1;
          await tweenVal(
            from,
            to,
            780,
            (k) => {
              bar.dataset.k = String(k);
              bar.setAttribute("transform", `${base} scale(1, ${k})`);
            },
            isLive,
          );
          await wait(220, isLive);
        }
      })();
    });

    const scada = q<SVGGElement>("#a04-scadaRotor");
    if (scada) {
      let scadaDeg = 0;
      void (async () => {
        while (live) {
          const from = scadaDeg;
          const to = scadaDeg + 120;
          await tweenVal(
            from,
            to,
            720,
            (d) => {
              scada.setAttribute("transform", `translate(12, 12) rotate(${d})`);
            },
            isLive,
          );
          scadaDeg = to % 360;
          await wait(900, isLive);
        }
      })();
    }

    const billLines = ["a04-billL1", "a04-billL2", "a04-billL3"]
      .map((id) => q<SVGLineElement>(`#${id}`))
      .filter((el): el is SVGLineElement => Boolean(el));
    billLines.forEach((line) => {
      const len = line.getTotalLength();
      line.style.strokeDasharray = String(len);
      line.style.strokeDashoffset = String(len);
    });
    void (async () => {
      while (live) {
        billLines.forEach((line) => {
          line.style.strokeDashoffset = String(line.getTotalLength());
        });
        for (const line of billLines) {
          const len = line.getTotalLength();
          await tweenVal(len, 0, 420, (v) => {
            line.style.strokeDashoffset = String(v);
          }, isLive);
          await wait(90, isLive);
        }
        await wait(1100, isLive);
      }
    })();

    const hour = q<SVGLineElement>("#a04-todHour");
    const minute = q<SVGLineElement>("#a04-todMin");
    if (hour && minute) {
      let hDeg = -40;
      let mDeg = 20;
      let last = performance.now();
      const tick = (now: number) => {
        if (!live) return;
        const dt = now - last;
        last = now;
        hDeg = (hDeg + dt * 0.008) % 360;
        mDeg = (mDeg + dt * 0.055) % 360;
        hour.setAttribute("transform", `rotate(${hDeg} 12 13)`);
        minute.setAttribute("transform", `rotate(${mDeg} 12 13)`);
        clockRaf = requestAnimationFrame(tick);
      };
      clockRaf = requestAnimationFrame(tick);
    }
  };

  void (async () => {
    try {
      const mark = new Image();
      mark.src = MARK;
      if (mark.decode) await mark.decode();
    } catch {
      /* continue */
    }
    if (!live) return;

    const hub = q<SVGGElement>("#a04-hub");
    const nodes = ["a04-nMeters", "a04-nScada", "a04-nBills", "a04-nTariff"]
      .map((id) => q<SVGGElement>(`#${id}`))
      .filter((el): el is SVGGElement => Boolean(el));

    if (hub) void fadeUp(hub, 480, 0, 0, isLive);
    startLiveIcons();

    await Promise.all(nodes.map((el, i) => fadeUp(el, 480, 80 + i * 70, 10, isLive)));
    if (!live) return;

    const wire = (id: string) => q<SVGPathElement>(`#${id}`);
    await Promise.all([
      wire("a04-wTop1") && drawPath(wire("a04-wTop1")!, 320, 0, isLive),
      wire("a04-wTop2") && drawPath(wire("a04-wTop2")!, 320, 50, isLive),
      wire("a04-wTop3") && drawPath(wire("a04-wTop3")!, 320, 100, isLive),
      wire("a04-wTop4") && drawPath(wire("a04-wTop4")!, 320, 150, isLive),
    ]);
    if (!live) return;
    if (wire("a04-wTopBus")) await drawPath(wire("a04-wTopBus")!, 640, 0, isLive);
    if (wire("a04-wSpineIn")) await drawPath(wire("a04-wSpineIn")!, 380, 0, isLive);
    if (wire("a04-wSpineOut")) await drawPath(wire("a04-wSpineOut")!, 320, 40, isLive);
    if (wire("a04-wBotBus")) await drawPath(wire("a04-wBotBus")!, 480, 0, isLive);
    await Promise.all([
      wire("a04-wBotL") && drawPath(wire("a04-wBotL")!, 240, 0, isLive),
      wire("a04-wBotR") && drawPath(wire("a04-wBotR")!, 240, 50, isLive),
    ]);
    if (!live) return;

    const rx = q<SVGGElement>("#a04-rx");
    const verify = q<SVGGElement>("#a04-verify");
    await Promise.all([
      rx && fadeUp(rx, 500, 0, 10, isLive),
      verify && fadeUp(verify, 500, 80, 10, isLive),
    ]);
    startPackets();
  })();

  return () => {
    live = false;
    cancelAnimationFrame(clockRaf);
  };
}

export function WhatIsProductVisual() {
  const uid = useId().replace(/:/g, "");
  const ref = useSlotLoop(startWhatIs);

  return (
    <div
      ref={ref}
      className="a04-root"
      role="img"
      aria-label="Meters, SCADA, bills, and ToD tariff run into Stamped. Prescriptions and Verify run out."
    >
      <svg viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg">
        <rect width="420" height="420" fill="#f1f4f0" />
        <path className="wire" id="a04-wTop1" d="M48 82 V108" />
        <path className="wire" id="a04-wTop2" d="M156 82 V108" />
        <path className="wire" id="a04-wTop3" d="M264 82 V108" />
        <path className="wire" id="a04-wTop4" d="M372 82 V108" />
        <path className="wire" id="a04-wTopBus" d="M48 108 H372" />
        <path className="wire" id="a04-wSpineIn" d="M210 108 V148" />
        <path className="wire" id="a04-wSpineOut" d="M210 244 V268" />
        <path className="wire" id="a04-wBotBus" d="M155 268 H345" />
        <path className="wire" id="a04-wBotL" d="M155 268 V284" />
        <path className="wire" id="a04-wBotR" d="M345 268 V294" />

        <path className="route" id={`${uid}-rMeters`} d="M48 82 V108 H210 V148" />
        <path className="route" id={`${uid}-rScada`} d="M156 82 V108 H210 V148" />
        <path className="route" id={`${uid}-rBills`} d="M264 82 V108 H210 V148" />
        <path className="route" id={`${uid}-rTariff`} d="M372 82 V108 H210 V148" />
        <path className="route" id={`${uid}-rRx`} d="M210 244 V268 H155 V284" />
        <path className="route" id={`${uid}-rVerify`} d="M210 244 V268 H345 V294" />

        <circle className="packet" r="3.4" data-route={`${uid}-rMeters`} />
        <circle className="packet" r="3.4" data-route={`${uid}-rScada`} />
        <circle className="packet" r="3.4" data-route={`${uid}-rBills`} />
        <circle className="packet" r="3.4" data-route={`${uid}-rTariff`} />
        <circle className="packet" r="3.4" data-route={`${uid}-rRx`} />
        <circle className="packet" r="3.4" data-route={`${uid}-rVerify`} />

        <defs>
          <clipPath id={`${uid}-meter`}>
            <rect x="0" y="0" width="24" height="24" />
          </clipPath>
        </defs>

        <g className="enter node" id="a04-nMeters">
          <rect className="icon-box" x="28" y="16" width="40" height="40" />
          <g className="icon" transform="translate(36, 24)" clipPath={`url(#${uid}-meter)`}>
            <g className="meter-bar" data-base="translate(1, 24)" transform="translate(1, 24) scale(1, 0.55)">
              <rect x="0" y="-24" width="6" height="24" />
            </g>
            <g className="meter-bar" data-base="translate(9, 24)" transform="translate(9, 24) scale(1, 0.8)">
              <rect x="0" y="-24" width="6" height="24" />
            </g>
            <g className="meter-bar" data-base="translate(17, 24)" transform="translate(17, 24) scale(1, 0.4)">
              <rect x="0" y="-24" width="6" height="24" />
            </g>
          </g>
          <rect className="lbl-plate" x="16" y="60" width="64" height="18" />
          <rect className="tick" x="20" y="66" width="2" height="7" />
          <rect className="tick" x="24" y="66" width="2" height="7" />
          <rect className="tick" x="28" y="66" width="2" height="7" />
          <text className="lbl" x="34" y="73">
            Meters
          </text>
        </g>

        <g className="enter node" id="a04-nScada">
          <rect className="icon-box" x="136" y="16" width="40" height="40" />
          <g className="icon" transform="translate(144, 24)">
            <g id="a04-scadaRotor" transform="translate(12, 12)">
              <circle cx="-6" cy="-6" r="3.4" />
              <circle cx="6" cy="-6" r="3.4" />
              <circle cx="0" cy="7" r="3.4" />
              <path d="M-3 -6 H3 M-5.4 -3.2 L-1.6 4.4 M5.4 -3.2 L1.6 4.4" />
            </g>
          </g>
          <rect className="lbl-plate" x="126" y="60" width="60" height="18" />
          <rect className="tick" x="130" y="66" width="2" height="7" />
          <rect className="tick" x="134" y="66" width="2" height="7" />
          <rect className="tick" x="138" y="66" width="2" height="7" />
          <text className="lbl" x="144" y="73">
            SCADA
          </text>
        </g>

        <g className="enter node" id="a04-nBills">
          <rect className="icon-box" x="244" y="16" width="40" height="40" />
          <g className="icon" transform="translate(254, 24)">
            <rect x="0" y="0" width="20" height="26" rx="1" />
            <line className="bill-line" id="a04-billL1" x1="4" y1="8" x2="16" y2="8" />
            <line className="bill-line" id="a04-billL2" x1="4" y1="13" x2="16" y2="13" />
            <line className="bill-line" id="a04-billL3" x1="4" y1="18" x2="12" y2="18" />
          </g>
          <rect className="lbl-plate" x="240" y="60" width="48" height="18" />
          <rect className="tick" x="244" y="66" width="2" height="7" />
          <rect className="tick" x="248" y="66" width="2" height="7" />
          <rect className="tick" x="252" y="66" width="2" height="7" />
          <text className="lbl" x="258" y="73">
            Bills
          </text>
        </g>

        <g className="enter node" id="a04-nTariff">
          <rect className="icon-box" x="352" y="16" width="40" height="40" />
          <g className="icon" transform="translate(360, 24)">
            <circle cx="12" cy="13" r="11" />
            <line id="a04-todHour" x1="12" y1="13" x2="12" y2="8.2" strokeWidth="1.7" />
            <line id="a04-todMin" x1="12" y1="13" x2="17.2" y2="10.4" strokeWidth="1.35" />
            <circle cx="12" cy="13" r="1.4" fill="#191c1a" stroke="none" />
          </g>
          <rect className="lbl-plate" x="328" y="60" width="84" height="18" />
          <rect className="tick" x="332" y="66" width="2" height="7" />
          <rect className="tick" x="336" y="66" width="2" height="7" />
          <rect className="tick" x="340" y="66" width="2" height="7" />
          <text className="lbl" x="346" y="73">
            ToD tariff
          </text>
        </g>

        <g className="enter" id="a04-hub">
          <image href={MARK} x="148" y="132" width="124" height="124" preserveAspectRatio="xMidYMid meet" />
        </g>

        <g className="enter" id="a04-rx">
          <rect className="rx-card" x="28" y="284" width="254" height="112" rx="6" />
          <circle cx="46" cy="304" r="3.2" fill="#F75440" />
          <text className="lbl" x="56" y="308" fill="#F75440">
            Live · Prescription
          </text>
          <text x="44" y="336" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="22" fill="#191c1a">
            Shed idle HVAC
          </text>
          <text className="rx-bit" data-bit="owner" x="44" y="368" fontFamily="Inter, sans-serif" fontSize="15" fill="#5a403c">
            Owner · Utilities
          </text>
          <text
            className="rx-bit"
            data-bit="rupee"
            x="262"
            y="368"
            textAnchor="end"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="700"
            fontSize="20"
            fill="#F75440"
          >
            ₹ 0.8L / mo
          </text>
        </g>

        <g className="enter" id="a04-verify">
          <rect className="verify-card" x="298" y="294" width="94" height="92" rx="6" />
          <rect className="icon-box" x="325" y="308" width="40" height="40" />
          <path className="icon" d="M335 328 L341 334 L353 318" />
          <rect className="tick" x="312" y="362" width="2" height="7" />
          <rect className="tick" x="316" y="362" width="2" height="7" />
          <rect className="tick" x="320" y="362" width="2" height="7" />
          <text className="lbl" x="326" y="369">
            Verify
          </text>
        </g>
      </svg>
    </div>
  );
}
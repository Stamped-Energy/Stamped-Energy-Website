/**
 * Motion engine ported from handoff/hero-plant-flow/hero-plant-flow.html.
 * Geometry, chip timing, and prescription copy stay aligned with that SoT.
 */

export const FRAME10_PATHS = {
  wExt: "M 630 335 V 272 L 1450 620",
  wTel: "M 892.5 690 L 935.5 669 H 1450",
  wApp: "M 466.5 1000 L 782.5 1198 L 1450 718",
  wOut: "M 1709 669 L 1820 669",
} as const;

const CHIP_SPEED = 0.000038;
const OUT_GAP_PX = 6;
const LOGO_MARK_INSET_PX = 16;
const OUT_GAP_FROM_LOGO_PX = 10;
const OUT_RELAY_SPEED = 0.48;

type ChipFace = {
  name: string;
  tag: string;
  dir: "up" | "down";
};

type ChipDef = {
  path: keyof typeof FRAME10_PATHS;
  name?: string;
  tag?: string;
  dir?: "up" | "down";
  phase: number;
  speed: number;
  bare?: boolean;
  sequential?: boolean;
  poolIndex?: number;
};

const CHIP_POOLS: Record<"wExt" | "wTel" | "wApp", ChipFace[]> = {
  wExt: [
    { name: "Energy price", tag: "↑ 8%", dir: "up" },
    { name: "ToD tariff", tag: "↑ 6%", dir: "up" },
    { name: "Day-ahead", tag: "↑ 4%", dir: "up" },
    { name: "Grid freq", tag: "↓ 1%", dir: "down" },
    { name: "Weather", tag: "↑ 3%", dir: "up" },
  ],
  wTel: [
    { name: "Power draw", tag: "↑ 8%", dir: "up" },
    { name: "Furnace kW", tag: "↑ 5%", dir: "up" },
    { name: "Line load", tag: "↑ 3%", dir: "up" },
    { name: "Air kW", tag: "↓ 2%", dir: "down" },
  ],
  wApp: [
    { name: "Demand forecast", tag: "↑ 5%", dir: "up" },
    { name: "Shift plan", tag: "↑ 2%", dir: "up" },
    { name: "Batch queue", tag: "↑ 4%", dir: "up" },
    { name: "Work order", tag: "↑ 1%", dir: "up" },
    { name: "Recipe", tag: "↑ 3%", dir: "up" },
  ],
};

const CHIP_DEFS: ChipDef[] = [
  { path: "wExt", phase: 0.14, speed: CHIP_SPEED, poolIndex: 0 },
  { path: "wTel", phase: 0.42, speed: CHIP_SPEED, poolIndex: 0 },
  { path: "wApp", phase: 0.18, speed: CHIP_SPEED, poolIndex: 0 },
  { path: "wExt", phase: 0.64, speed: CHIP_SPEED, poolIndex: 1 },
  { path: "wApp", phase: 0.68, speed: CHIP_SPEED, poolIndex: 1 },
  { path: "wOut", bare: true, sequential: true, phase: 0, speed: CHIP_SPEED },
];

export const RX_ITEMS = [
  { money: "+ ₹2.4L", label: "Annual", copy: "Reschedule Shift 2 heavy loads before the evening demand peak" },
  { money: "+ ₹48,000", label: "Avoid scrap", copy: "Lower furnace hold temperature after this batch ran hot" },
  { money: "+ ₹95,000", label: "Demand", copy: "Stagger high-load startups to cut maximum demand charges" },
  { money: "+ ₹42,000", label: "Idle waste", copy: "Turn down idle HVAC during the line changeover window" },
  { money: "+ ₹38,000", label: "Off-peak", copy: "Pull this batch forward into the cheaper off-peak tariff window" },
  { money: "+ ₹12,000", label: "Power factor", copy: "Switch on power-factor correction on feeder 3" },
  { money: "+ ₹1.8L", label: "Baseline", copy: "Retune dryer energy settings after the latest recipe change" },
  { money: "+ ₹11,000", label: "Leak", copy: "Inspect the compressed-air branch on Line B for leaks" },
  { money: "+ ₹75,000", label: "Schedule", copy: "Avoid a demand spike when both shifts start together" },
] as const;

export const RX_VISIBLE = 2;

const LAYOUT = {
  docks: [
    { id: "hpf-wExt", label: "hpf-srcExt", dock: "hpf-dockExt", labelAt: 48, labelLift: 56 },
    { id: "hpf-wTel", label: "hpf-srcTel", dock: "hpf-dockTel", labelLift: 52 },
    { id: "hpf-wApp", label: "hpf-srcApp", dock: "hpf-dockApp", labelLift: 28 },
  ],
} as const;

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

type TweenProps = {
  opacity?: number;
  startY?: number;
  y?: number;
  mode?: "y" | "logo" | "plant" | "rx" | "label";
};

type EngineOptions = {
  reduce: boolean;
};

function qs<T extends Element>(root: HTMLElement, id: string) {
  return root.querySelector<T>(`#${id}`);
}

export function startHeroPlantFlow(root: HTMLElement, options: EngineOptions): () => void {
  const reduce = options.reduce;
  let cancelled = false;
  let chipRaf = 0;
  let chipsStarted = false;
  let carouselTimer = 0;
  let rxIndex = 0;
  let rxWrapping = false;
  let rxWrapListener: ((event: TransitionEvent) => void) | null = null;
  let resizeTimer = 0;
  const pendingRafs = new Set<number>();
  const pendingTimeouts = new Set<number>();
  const chipDefs: ChipDef[] = CHIP_DEFS.map((def) => ({ ...def }));

  const scheduleRaf = (cb: FrameRequestCallback) => {
    const id = requestAnimationFrame((now) => {
      pendingRafs.delete(id);
      cb(now);
    });
    pendingRafs.add(id);
    return id;
  };

  function tween(el: HTMLElement, props: TweenProps, duration: number, delay = 0) {
    return new Promise<void>((resolve) => {
      const start = performance.now() + delay;
      const fromOp = parseFloat(getComputedStyle(el).opacity) || 0;
      const startY = props.startY != null ? props.startY : 8;
      const mode = props.mode || "y";

      const frame = (now: number) => {
        if (cancelled) {
          resolve();
          return;
        }
        if (now < start) {
          scheduleRaf(frame);
          return;
        }
        const t = Math.min(1, (now - start) / duration);
        const e = easeOutExpo(t);
        if ("opacity" in props && props.opacity != null) {
          el.style.opacity = String(fromOp + (props.opacity - fromOp) * e);
        }
        if (mode === "logo") {
          const y = startY * (1 - e);
          el.style.transform = `translateX(-50%) translateY(${y}px)`;
        } else if (mode === "plant") {
          el.style.opacity = String(fromOp + (props.opacity ?? 1 - fromOp) * e);
        } else if (mode === "rx") {
          const y = startY * (1 - e);
          el.style.transform = `translateY(calc(-50% + ${y}px))`;
        } else if (mode === "label") {
          el.style.transform = `translate(-50%, calc(-100% - ${12 - 6 * e}px))`;
        } else if (props.y != null || props.startY != null) {
          const y = startY + ((props.y != null ? props.y : 0) - startY) * e;
          el.style.transform = `translateY(${y}px)`;
        }
        if (t < 1) scheduleRaf(frame);
        else resolve();
      };

      scheduleRaf(frame);
    });
  }

  function svgToScreen(x: number, y: number) {
    const svg = qs<SVGSVGElement>(root, "hpf-svg");
    const scene = qs<HTMLElement>(root, "hpf-scene");
    if (!svg || !scene) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = x;
    pt.y = y;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const sp = pt.matrixTransform(ctm);
    const rect = scene.getBoundingClientRect();
    const scaleX = scene.offsetWidth ? rect.width / scene.offsetWidth : 1;
    const scaleY = scene.offsetHeight ? rect.height / scene.offsetHeight : 1;
    if (!scaleX || !scaleY) return { x: 0, y: 0 };
    return { x: (sp.x - rect.left) / scaleX, y: (sp.y - rect.top) / scaleY };
  }

  function layoutPaths() {
    const logo = qs<HTMLElement>(root, "hpf-logoWrap");
    const panel = qs<HTMLElement>(root, "hpf-rxPanel");
    const svg = qs<SVGSVGElement>(root, "hpf-svg");
    if (!logo || !panel || !svg) return;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const inv = ctm.inverse();

    const toSvg = (screenX: number, screenY: number) => {
      const pt = svg.createSVGPoint();
      pt.x = screenX;
      pt.y = screenY;
      return pt.matrixTransform(inv);
    };

    const wExt = qs<SVGPathElement>(root, "hpf-wExt");
    const wTel = qs<SVGPathElement>(root, "hpf-wTel");
    const wApp = qs<SVGPathElement>(root, "hpf-wApp");
    if (wExt) wExt.setAttribute("d", FRAME10_PATHS.wExt);
    if (wTel) wTel.setAttribute("d", FRAME10_PATHS.wTel);
    if (wApp) wApp.setAttribute("d", FRAME10_PATHS.wApp);

    const logoImg = logo.querySelector("img") || logo;
    const lr = logoImg.getBoundingClientRect();
    const pr = panel.getBoundingClientRect();
    const midY = lr.top + lr.height * 0.5;
    const outStart = toSvg(lr.right - LOGO_MARK_INSET_PX + OUT_GAP_PX + OUT_GAP_FROM_LOGO_PX, midY);
    const outEnd = toSvg(pr.left - OUT_GAP_PX, midY);
    const wOut = qs<SVGPathElement>(root, "hpf-wOut");
    if (wOut) wOut.setAttribute("d", `M ${outStart.x} ${outStart.y} L ${outEnd.x} ${outEnd.y}`);

    LAYOUT.docks.forEach((dock) => {
      const path = qs<SVGPathElement>(root, dock.id);
      const label = qs<HTMLElement>(root, dock.label);
      const dot = qs<HTMLElement>(root, dock.dock);
      if (!path || !label || !dot || !path.getAttribute("d")) return;
      const len = path.getTotalLength();
      if (!len) return;
      const dockPt = path.getPointAtLength(0);
      const dockScreen = svgToScreen(dockPt.x, dockPt.y);
      const labelAt = "labelAt" in dock ? dock.labelAt : 0;
      const labelLen = Math.min(len, labelAt);
      const labelPt = path.getPointAtLength(labelLen);
      const labelScreen = svgToScreen(labelPt.x, labelPt.y);
      const lift = dock.labelLift || 0;
      label.style.left = `${labelScreen.x}px`;
      label.style.top = `${labelScreen.y - lift}px`;
      dot.style.left = `${dockScreen.x}px`;
      dot.style.top = `${dockScreen.y}px`;
    });
  }

  function drawWire(path: SVGPathElement, duration: number, delay = 0) {
    return new Promise<void>((resolve) => {
      const len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
      path.style.opacity = "1";
      const start = performance.now() + delay;
      const frame = (now: number) => {
        if (cancelled) {
          resolve();
          return;
        }
        if (now < start) {
          scheduleRaf(frame);
          return;
        }
        const t = Math.min(1, (now - start) / duration);
        path.style.strokeDashoffset = String(len * (1 - easeOutExpo(t)));
        if (t < 1) scheduleRaf(frame);
        else resolve();
      };
      scheduleRaf(frame);
    });
  }

  function assignSpacedPhases(defs: ChipDef[]) {
    const byPath: Record<string, number[]> = {};
    defs.forEach((d, i) => {
      if (d.bare) return;
      (byPath[d.path] || (byPath[d.path] = [])).push(i);
    });
    Object.keys(byPath).forEach((path) => {
      const idxs = byPath[path];
      if (idxs.length === 1) {
        const d = defs[idxs[0]];
        d.phase = (d.phase + (Math.random() * 0.08 - 0.04) + 1) % 1;
        return;
      }
      const base = 0.08 + Math.random() * 0.14;
      const gap = 0.46 + Math.random() * 0.08;
      idxs.forEach((idx, n) => {
        defs[idx].phase = (base + n * gap) % 1;
      });
    });
  }

  function chipPool(path: ChipDef["path"]) {
    if (path === "wOut") return [];
    return CHIP_POOLS[path];
  }

  function applyChipFace(el: HTMLElement, face: ChipFace) {
    const name = el.querySelector(".hpf-chip-name");
    const tag = el.querySelector(".hpf-chip-tag");
    if (name) name.textContent = face.name;
    if (tag) {
      tag.textContent = face.tag;
      tag.classList.toggle("is-down", face.dir === "down");
    }
  }

  function buildChips() {
    const signals = qs<HTMLElement>(root, "hpf-signals");
    if (!signals) return;
    signals.innerHTML = "";
    assignSpacedPhases(chipDefs);
    chipDefs.forEach((def) => {
      const el = document.createElement("div");
      el.className = "hpf-chip" + (def.bare ? " is-bare" : "");
      el.dataset.path = def.path;
      el.dataset.phase = String(def.phase);
      el.dataset.speed = String(def.speed);
      if (def.sequential) el.dataset.sequential = "1";
      const pool = chipPool(def.path);
      const poolIndex = def.poolIndex ?? 0;
      el.dataset.poolIndex = String(poolIndex);
      if (def.bare) {
        el.innerHTML = `<span class="hpf-chip-node" aria-hidden="true"></span>`;
      } else {
        const face = pool[poolIndex % pool.length];
        el.innerHTML =
          `<span class="hpf-chip-node" aria-hidden="true"></span>` +
          `<span class="hpf-chip-label">` +
          `<span class="hpf-chip-stem" aria-hidden="true"></span>` +
          `<span class="hpf-chip-name">${face?.name ?? def.name ?? ""}</span>` +
          `<span class="hpf-chip-tag ${face?.dir === "down" ? "is-down" : ""}">${face?.tag ?? def.tag ?? ""}</span>` +
          `</span>`;
      }
      signals.appendChild(el);
    });
  }

  function pathId(key: ChipDef["path"]) {
    return `hpf-${key}`;
  }

  function startChipLoop() {
    if (chipsStarted || reduce || cancelled) return;
    chipsStarted = true;
    const chips = [...root.querySelectorAll<HTMLElement>(".hpf-chip")];
    const pathCache: Record<string, SVGPathElement | null> = {};
    chips.forEach((c) => {
      const id = pathId(c.dataset.path as ChipDef["path"]);
      if (!pathCache[id]) pathCache[id] = qs<SVGPathElement>(root, id);
      c.style.opacity = "1";
      const node = c.querySelector<HTMLElement>(".hpf-chip-node");
      if (node) node.style.opacity = "0";
      const label = c.querySelector<HTMLElement>(".hpf-chip-label");
      if (label) label.style.opacity = "0";
    });

    const matchChipPixelSpeed = () => {
      const inboundLens = ["hpf-wExt", "hpf-wApp"]
        .map((id) => pathCache[id] || qs<SVGPathElement>(root, id))
        .map((p) => (p && p.getAttribute("d") ? p.getTotalLength() : 0))
        .filter((n) => n > 0);
      if (!inboundLens.length) return;
      const refLen = Math.max(...inboundLens);
      const pxPerMs = CHIP_SPEED * refLen;
      chips.forEach((c) => {
        const path = pathCache[pathId(c.dataset.path as ChipDef["path"])];
        if (!path || !path.getAttribute("d")) return;
        const len = path.getTotalLength() || 1;
        const scale = c.dataset.sequential === "1" ? OUT_RELAY_SPEED : 1;
        c.dataset.speed = String((pxPerMs * scale) / len);
      });
    };

    matchChipPixelSpeed();

    let last = performance.now();
    let syncEvery = 0;
    const tick = (now: number) => {
      if (cancelled) return;
      const dt = Math.min(40, now - last);
      last = now;
      if ((syncEvery++ & 31) === 0) matchChipPixelSpeed();
      chips.forEach((chip) => {
        const path = pathCache[pathId(chip.dataset.path as ChipDef["path"])];
        if (!path || !path.getAttribute("d")) return;
        const speed = parseFloat(chip.dataset.speed || "") || 0.0001;
        let phase = parseFloat(chip.dataset.phase || "") || 0;
        phase = phase + dt * speed;
        if (chip.dataset.sequential === "1") {
          if (phase >= 1) phase = 0;
        } else if (phase >= 1) {
          const pool = chipPool(chip.dataset.path as ChipDef["path"]);
          if (pool.length) {
            const next = (parseInt(chip.dataset.poolIndex || "0", 10) + 1) % pool.length;
            chip.dataset.poolIndex = String(next);
            applyChipFace(chip, pool[next]);
          }
          phase = phase % 1;
        }
        chip.dataset.phase = String(phase);
        const len = path.getTotalLength();
        const pt = path.getPointAtLength(phase * len);
        const screen = svgToScreen(pt.x, pt.y);
        const node = chip.querySelector<HTMLElement>(".hpf-chip-node");
        const label = chip.querySelector<HTMLElement>(".hpf-chip-label");
        const isTel = chip.dataset.path === "wTel";
        const isApp = chip.dataset.path === "wApp";
        const oneSecond = 1000 * speed;
        const nodeFade = isTel ? 0.78 : isApp ? 0.94 - oneSecond : 0.94;
        const labelFade = isTel ? 0.72 : isApp ? 0.9 - oneSecond : 0.9;
        const nodeTail = isTel ? 0.1 : 0.06;
        const labelTail = isTel ? 0.08 : 0.023;
        const nodeEdge =
          phase < 0.04 ? phase / 0.04 : phase > nodeFade ? Math.max(0, (1 - phase) / nodeTail) : 1;
        const baseOp = 0.15 + 0.85 * Math.min(1, nodeEdge);
        chip.style.left = `${screen.x}px`;
        chip.style.top = `${screen.y}px`;
        chip.style.transform = "none";
        chip.style.visibility = "visible";
        if (node) node.style.opacity = String(baseOp);
        if (label) {
          const labelEdge =
            phase < 0.04
              ? phase / 0.04
              : phase > labelFade
                ? Math.max(0, (labelFade + labelTail - phase) / labelTail)
                : 1;
          label.style.opacity = String(baseOp * labelEdge);
        }
      });
      chipRaf = requestAnimationFrame(tick);
    };
    chipRaf = requestAnimationFrame(tick);
  }

  function rxItemHeight(track: HTMLElement) {
    const items = track.querySelectorAll<HTMLElement>(".hpf-rx-item");
    const first = items[0];
    const second = items[1];
    // offsetTop / offsetHeight are layout px. getBoundingClientRect includes the
    // mobile stage scale, so a visual height would undershoot translateY.
    if (first && second) {
      const stride = second.offsetTop - first.offsetTop;
      if (stride > 0) return stride;
    }
    const layoutH = first?.offsetHeight ?? 0;
    if (layoutH > 0) return layoutH;
    return parseFloat(getComputedStyle(root).getPropertyValue("--hpf-rx-h")) || 124;
  }

  function unwrapRxTrack(track: HTMLElement) {
    if (rxWrapListener) {
      track.removeEventListener("transitionend", rxWrapListener);
      rxWrapListener = null;
    }
  }

  function snapRxToStart(track: HTMLElement) {
    rxWrapping = true;
    unwrapRxTrack(track);
    track.style.transition = "none";
    rxIndex = 0;
    track.style.transform = "translateY(0)";
    void track.offsetHeight;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return;
        track.style.transition = "";
        rxWrapping = false;
      });
    });
  }

  function stepCarousel() {
    if (rxWrapping || cancelled) return;
    const track = qs<HTMLElement>(root, "hpf-rxTrack");
    if (!track) return;
    const itemH = rxItemHeight(track);
    rxIndex += 1;
    track.style.transform = `translateY(${-rxIndex * itemH}px)`;

    if (rxIndex < RX_ITEMS.length) return;

    unwrapRxTrack(track);
    rxWrapListener = (event: TransitionEvent) => {
      if (event.target !== track || event.propertyName !== "transform") return;
      snapRxToStart(track);
    };
    track.addEventListener("transitionend", rxWrapListener);

    const fallbackId = window.setTimeout(() => {
      pendingTimeouts.delete(fallbackId);
      if (cancelled || rxIndex === 0) return;
      snapRxToStart(track);
    }, 700);
    pendingTimeouts.add(fallbackId);
  }

  function startCarousel() {
    if (reduce || cancelled) return;
    window.clearInterval(carouselTimer);
    carouselTimer = window.setInterval(stepCarousel, 2200);
  }

  function placeStaticChips() {
    root.querySelectorAll<HTMLElement>(".hpf-chip").forEach((c, i) => {
      const def = chipDefs[i];
      if (!def) return;
      const path = qs<SVGPathElement>(root, pathId(def.path));
      if (!path || !path.getAttribute("d")) return;
      const pt = path.getPointAtLength(path.getTotalLength() * def.phase);
      const screen = svgToScreen(pt.x, pt.y);
      if (screen.x === 0 && screen.y === 0 && pt.x !== 0) return;
      c.style.left = `${screen.x}px`;
      c.style.top = `${screen.y}px`;
      c.style.transform = "none";
      c.style.opacity = "1";
      c.style.visibility = "visible";
      const node = c.querySelector<HTMLElement>(".hpf-chip-node");
      if (node) node.style.opacity = "1";
      const label = c.querySelector<HTMLElement>(".hpf-chip-label");
      if (label) label.style.opacity = "1";
    });
  }

  async function waitForImages() {
    const images = [...root.querySelectorAll("img")];
    await Promise.all(
      images.map((img) => {
        if (img.complete) return Promise.resolve();
        return img.decode().catch(() => undefined);
      }),
    );
  }

  async function openSequence() {
    await waitForImages();
    if (cancelled) return;
    layoutPaths();
    buildChips();

    const plant = qs<HTMLElement>(root, "hpf-plant");
    const srcs = [
      qs<HTMLElement>(root, "hpf-srcExt"),
      qs<HTMLElement>(root, "hpf-srcTel"),
      qs<HTMLElement>(root, "hpf-srcApp"),
    ];
    const docks = [
      qs<HTMLElement>(root, "hpf-dockExt"),
      qs<HTMLElement>(root, "hpf-dockTel"),
      qs<HTMLElement>(root, "hpf-dockApp"),
    ];
    const logo = qs<HTMLElement>(root, "hpf-logoWrap");
    const panel = qs<HTMLElement>(root, "hpf-rxPanel");
    const live = qs<HTMLElement>(root, "hpf-rxLive");
    const wExt = qs<SVGPathElement>(root, "hpf-wExt");
    const wTel = qs<SVGPathElement>(root, "hpf-wTel");
    const wApp = qs<SVGPathElement>(root, "hpf-wApp");
    const wOut = qs<SVGPathElement>(root, "hpf-wOut");

    if (!plant || !logo || !panel || !live || !wExt || !wTel || !wApp || !wOut) return;
    if (srcs.some((el) => !el) || docks.some((el) => !el)) return;

    if (reduce) {
      [plant, logo, panel, live, ...srcs, ...docks].forEach((el) => {
        if (el) el.style.opacity = "1";
      });
      logo.style.transform = "translateX(-50%)";
      panel.style.transform = "translateY(-50%)";
      srcs.forEach((el) => {
        if (el) el.style.transform = "translate(-50%, calc(-100% - 12px))";
      });
      [wExt, wTel, wApp, wOut].forEach((w) => {
        w.style.opacity = "1";
        w.style.strokeDasharray = "none";
        w.style.strokeDashoffset = "0";
      });
      placeStaticChips();
      return;
    }

    await tween(plant, { opacity: 1, mode: "plant" }, 650, 0);
    if (cancelled) return;
    await tween(logo, { opacity: 1, mode: "logo", startY: 10 }, 620, 40);
    if (cancelled) return;
    layoutPaths();

    await Promise.all([
      ...srcs.map((el, i) => tween(el!, { opacity: 1, mode: "label" }, 420, i * 70)),
      ...docks.map((el, i) => tween(el!, { opacity: 1 }, 320, 40 + i * 70)),
    ]);
    if (cancelled) return;

    await Promise.all([drawWire(wExt, 880, 0), drawWire(wTel, 880, 100), drawWire(wApp, 880, 200)]);
    if (cancelled) return;

    startChipLoop();

    await tween(panel, { opacity: 1, mode: "rx", startY: 10 }, 520, 80);
    if (cancelled) return;
    layoutPaths();
    await drawWire(wOut, 420, 0);
    if (cancelled) return;
    await tween(live, { opacity: 1 }, 280, 40);
    if (cancelled) return;

    startCarousel();
  }

  const onResize = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (cancelled) return;
      layoutPaths();
    }, 100);
  };

  window.addEventListener("resize", onResize);
  const resizeObserver = new ResizeObserver(onResize);
  resizeObserver.observe(root);
  const stageEl = root.querySelector(".hpf-stage");
  if (stageEl) resizeObserver.observe(stageEl);

  const boot = () => {
    if (cancelled) return;
    layoutPaths();
    void openSequence();
  };

  if (document.fonts?.ready) {
    void document.fonts.ready.then(() => {
      if (!cancelled) boot();
    });
  } else {
    boot();
  }

  return () => {
    cancelled = true;
    window.removeEventListener("resize", onResize);
    resizeObserver.disconnect();
    window.clearTimeout(resizeTimer);
    window.clearInterval(carouselTimer);
    const rxTrack = qs<HTMLElement>(root, "hpf-rxTrack");
    if (rxTrack) unwrapRxTrack(rxTrack);
    if (chipRaf) cancelAnimationFrame(chipRaf);
    pendingRafs.forEach((id) => cancelAnimationFrame(id));
    pendingRafs.clear();
    pendingTimeouts.forEach((id) => window.clearTimeout(id));
    pendingTimeouts.clear();
    const signals = qs<HTMLElement>(root, "hpf-signals");
    if (signals) signals.innerHTML = "";
  };
}

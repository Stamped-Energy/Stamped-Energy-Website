import { gsap } from "@/lib/motion/gsap";

const TIMING = {
  label: { duration: 0.38, y: -6 },
  item: { duration: 0.44, stagger: 0.09, x: 14 },
  accent: { duration: 0.42, delay: 0.42 },
  footer: { duration: 0.48, delay: 0.62, y: 10 },
  line: { duration: 0.52, stagger: 0.08, delay: 0.12 },
} as const;

function animateLabel(diagram: HTMLElement) {
  const label = diagram.querySelector<HTMLElement>("[data-animate='label']");
  if (!label) {
    return;
  }

  gsap.fromTo(
    label,
    { autoAlpha: 0, y: TIMING.label.y },
    { autoAlpha: 1, y: 0, duration: TIMING.label.duration, ease: "power2.out" },
  );
}

function animateItems(
  diagram: HTMLElement,
  selector = "[data-animate='item']",
  options?: { x?: number; y?: number; fromScale?: number },
) {
  const items = diagram.querySelectorAll<HTMLElement>(selector);
  if (!items.length) {
    return;
  }

  const from: gsap.TweenVars = { autoAlpha: 0 };
  const to: gsap.TweenVars = {
    autoAlpha: 1,
    duration: TIMING.item.duration,
    stagger: TIMING.item.stagger,
    ease: "power2.out",
    delay: 0.08,
  };

  if (options?.x !== undefined) {
    from.x = options.x;
    to.x = 0;
  }

  if (options?.y !== undefined) {
    from.y = options.y;
    to.y = 0;
  }

  if (options?.fromScale !== undefined) {
    from.scale = options.fromScale;
    to.scale = 1;
  }

  gsap.fromTo(items, from, to);
}

function animateAccent(diagram: HTMLElement, options?: { scale?: number; y?: number }) {
  const accent = diagram.querySelector<HTMLElement>("[data-animate='accent']");
  if (!accent) {
    return;
  }

  gsap.fromTo(
    accent,
    {
      autoAlpha: 0,
      scale: options?.scale ?? 0.9,
      y: options?.y ?? 0,
    },
    {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      duration: TIMING.accent.duration,
      ease: "back.out(1.5)",
      delay: TIMING.accent.delay,
    },
  );
}

function animateFooter(diagram: HTMLElement) {
  const footer = diagram.querySelector<HTMLElement>("[data-animate='footer']");
  if (!footer) {
    return;
  }

  gsap.fromTo(
    footer,
    { autoAlpha: 0, y: TIMING.footer.y },
    {
      autoAlpha: 1,
      y: 0,
      duration: TIMING.footer.duration,
      ease: "power2.out",
      delay: TIMING.footer.delay,
    },
  );
}

function layoutConnectLines(diagram: HTMLElement): void {
  const stage = diagram.querySelector<HTMLElement>("[data-connect-stage]");
  const svg = diagram.querySelector<SVGSVGElement>("[data-connect-svg]");
  const hubCircle = diagram.querySelector<HTMLElement>("[data-hub-circle]");
  const sourceEls = diagram.querySelectorAll<HTMLElement>("[data-connect-source]");
  const lines = diagram.querySelectorAll<SVGLineElement>("[data-connect-line='converge']");

  if (!stage || !svg || !hubCircle || !sourceEls.length || lines.length !== sourceEls.length) {
    return;
  }

  const stageRect = stage.getBoundingClientRect();
  const width = stageRect.width;
  const height = stageRect.height;

  if (width <= 0 || height <= 0) {
    return;
  }

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("preserveAspectRatio", "none");

  const circleRect = hubCircle.getBoundingClientRect();
  const targetX = circleRect.left - stageRect.left + 2;
  const targetY = circleRect.top + circleRect.height / 2 - stageRect.top;

  sourceEls.forEach((sourceEl, index) => {
    const line = lines[index];
    if (!line) {
      return;
    }

    const sourceRect = sourceEl.getBoundingClientRect();
    const startX = sourceRect.right - stageRect.left - 1;
    const startY = sourceRect.top + sourceRect.height / 2 - stageRect.top;

    line.setAttribute("x1", String(startX));
    line.setAttribute("y1", String(startY));
    line.setAttribute("x2", String(targetX));
    line.setAttribute("y2", String(targetY));

    const length = line.getTotalLength();
    line.setAttribute("stroke-dasharray", String(length));
    gsap.set(line, { strokeDashoffset: length, autoAlpha: 0 });
  });
}

function animateConnectLines(diagram: HTMLElement): void {
  layoutConnectLines(diagram);

  const lines = diagram.querySelectorAll<SVGLineElement>("[data-connect-line='converge']");
  if (!lines.length) {
    return;
  }

  gsap.to(lines, {
    strokeDashoffset: 0,
    autoAlpha: 1,
    stagger: TIMING.line.stagger,
    duration: TIMING.line.duration,
    ease: "power2.out",
    delay: TIMING.line.delay,
  });
}

export function animateDiagramPanel(panel: HTMLElement): void {
  const diagram = panel.querySelector<HTMLElement>("[data-diagram]");
  if (!diagram) {
    return;
  }

  const type = diagram.dataset.diagram;
  const animatedTargets = diagram.querySelectorAll("[data-animate]");
  gsap.killTweensOf(animatedTargets);

  if (type === "verify") {
    const bars = diagram.querySelectorAll<HTMLElement>("[data-animate='item'], [data-animate='accent']");
    gsap.set(bars, { scaleY: 1, transformOrigin: "bottom center", autoAlpha: 1 });
  } else {
    gsap.set(animatedTargets, { clearProps: "all" });
  }

  animateLabel(diagram);

  if (type === "connect") {
    animateItems(diagram, "[data-animate='item']", { x: -TIMING.item.x });
    const svg = diagram.querySelector<SVGSVGElement>("[data-connect-svg]");
    const isDesktopLayout = svg && !svg.classList.contains("hidden");
    if (isDesktopLayout) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          animateConnectLines(diagram);
        });
      });
    }
    animateAccent(diagram, { scale: 0.92 });
    return;
  }

  if (type === "observe") {
    const baseline = diagram.querySelector<SVGElement>("[data-animate='baseline']");
    const actual = diagram.querySelector<SVGPathElement>("[data-animate='actual']");

    if (baseline) {
      gsap.fromTo(
        baseline,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.4, ease: "power2.out", delay: 0.08 },
      );
    }

    if (actual) {
      gsap.fromTo(
        actual,
        { strokeDasharray: 400, strokeDashoffset: 400 },
        { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut", delay: 0.18 },
      );
    }

    animateAccent(diagram, { scale: 0, y: 0 });
    animateFooter(diagram);
    return;
  }

  if (type === "decide") {
    animateItems(diagram, "[data-animate='item']", { x: TIMING.item.x });
    animateAccent(diagram);
    return;
  }

  if (type === "execute") {
    animateItems(diagram, "[data-animate='item']", { x: TIMING.item.x });
    animateAccent(diagram, { y: -4 });
    return;
  }

  if (type === "verify") {
    const potential = diagram.querySelector<HTMLElement>("[data-animate='item']");
    const realized = diagram.querySelector<HTMLElement>("[data-animate='accent']");

    if (potential) {
      gsap.fromTo(
        potential,
        { scaleY: 0, transformOrigin: "bottom center" },
        { scaleY: 1, duration: 0.62, ease: "power2.out", delay: 0.1 },
      );
    }

    if (realized) {
      gsap.fromTo(
        realized,
        { scaleY: 0, transformOrigin: "bottom center" },
        { scaleY: 1, duration: 0.62, ease: "power2.out", delay: 0.28 },
      );
    }

    animateFooter(diagram);
    return;
  }

  if (type === "improve") {
    animateItems(diagram, "[data-animate='item']", { y: 12 });
    animateAccent(diagram, { scale: 0.96 });
    animateFooter(diagram);
  }
}

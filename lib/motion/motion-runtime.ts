import Lenis from "lenis";

import { gsap, registerGsap, ScrollTrigger } from "@/lib/motion/gsap";
import { resetRouteMotion as applyRouteMotionReset, shouldUseLenis } from "@/lib/motion/routeMotion";

import "lenis/dist/lenis.css";

export type MotionRuntimeHandle = {
  lenis: Lenis | null;
  teardown: () => void;
};

export function bootScrollMotion(onReady: () => void): () => void {
  registerGsap();
  ScrollTrigger.config({ ignoreMobileResize: true });
  ScrollTrigger.defaults({ scroller: window });

  const readyFrame = requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    onReady();
  });

  return () => {
    cancelAnimationFrame(readyFrame);
  };
}

export function bootLenisSmoothScroll(): MotionRuntimeHandle {
  const lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    syncTouch: false,
  });

  document.documentElement.classList.add("lenis");

  lenis.on("scroll", ScrollTrigger.update);

  const onTicker = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(onTicker);
  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (typeof value === "number") {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  ScrollTrigger.defaults({ scroller: document.documentElement });

  const onRefresh = () => {
    lenis.resize();
  };

  ScrollTrigger.addEventListener("refresh", onRefresh);

  const onResize = () => {
    ScrollTrigger.refresh();
  };

  window.addEventListener("resize", onResize);
  ScrollTrigger.refresh();

  const teardown = () => {
    window.removeEventListener("resize", onResize);
    ScrollTrigger.removeEventListener("refresh", onRefresh);
    gsap.ticker.remove(onTicker);
    lenis.destroy();
    document.documentElement.classList.remove("lenis");
    ScrollTrigger.defaults({ scroller: window });
    ScrollTrigger.clearScrollMemory();
  };

  return { lenis, teardown };
}

export function scheduleLenisBoot(setLenis: (lenis: Lenis | null) => void): () => void {
  let cancelled = false;
  let lenisBooted = false;
  let runtimeHandle: MotionRuntimeHandle | null = null;
  let idleHandle: number | undefined;

  const bootLenis = () => {
    if (cancelled || lenisBooted || !shouldUseLenis()) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    lenisBooted = true;
    runtimeHandle = bootLenisSmoothScroll();
    setLenis(runtimeHandle.lenis);
  };

  const cancelIdle = () => {
    if (idleHandle === undefined) {
      return;
    }
    if (typeof window.cancelIdleCallback === "function") {
      window.cancelIdleCallback(idleHandle);
    } else {
      window.clearTimeout(idleHandle);
    }
    idleHandle = undefined;
  };

  const bootLenisFromInteraction = () => {
    cancelIdle();
    bootLenis();
  };

  idleHandle =
    typeof window.requestIdleCallback === "function"
      ? window.requestIdleCallback(bootLenis, { timeout: 2200 })
      : window.setTimeout(bootLenis, 1);

  window.addEventListener("pointerdown", bootLenisFromInteraction, { once: true, passive: true });
  window.addEventListener("keydown", bootLenisFromInteraction, { once: true });
  window.addEventListener("scroll", bootLenisFromInteraction, { once: true, passive: true });

  return () => {
    cancelled = true;
    cancelIdle();
    window.removeEventListener("pointerdown", bootLenisFromInteraction);
    window.removeEventListener("keydown", bootLenisFromInteraction);
    window.removeEventListener("scroll", bootLenisFromInteraction);
    runtimeHandle?.teardown();
    setLenis(null);
  };
}

export function resetRouteMotion(lenis: Lenis | null): void {
  applyRouteMotionReset(lenis);
}

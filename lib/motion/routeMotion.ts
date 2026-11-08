import type Lenis from "lenis";

/** True when smooth Lenis scrolling should run (desktop pointer devices). */
export function shouldUseLenis(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }

  // Lenis + ScrollTrigger scrollerProxy breaks SPA navigation on touch browsers.
  return window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)").matches;
}

export function resetRouteMotion(lenis: Lenis | null): void {
  document.body.style.overflow = "";
  document.body.style.removeProperty("overflow");

  window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
  }

  void import("@/lib/motion/gsap").then(({ ScrollTrigger }) => {
    ScrollTrigger.clearScrollMemory();

    requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
      lenis?.resize();
    });
  });
}

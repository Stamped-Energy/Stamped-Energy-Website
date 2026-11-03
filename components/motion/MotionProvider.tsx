"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { gsap, registerGsap, ScrollTrigger } from "@/lib/motion/gsap";
import { resetRouteMotion as applyRouteMotionReset, shouldUseLenis } from "@/lib/motion/routeMotion";

import "lenis/dist/lenis.css";

type MotionContextValue = {
  isReady: boolean;
  prefersReducedMotion: boolean;
  resetRouteMotion: () => void;
  lockPageScroll: () => void;
  unlockPageScroll: () => void;
};

const MotionContext = createContext<MotionContextValue>({
  isReady: false,
  prefersReducedMotion: false,
  resetRouteMotion: () => undefined,
  lockPageScroll: () => undefined,
  unlockPageScroll: () => undefined,
});

export function useMotion(): MotionContextValue {
  return useContext(MotionContext);
}

type MotionProviderProps = {
  children: ReactNode;
};

export function MotionProvider({ children }: MotionProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);
  const pageScrollLockDepth = useRef(0);

  const resetRouteMotion = useCallback(() => {
    applyRouteMotionReset(lenisRef.current);
  }, []);

  const lockPageScroll = useCallback(() => {
    pageScrollLockDepth.current += 1;
    if (pageScrollLockDepth.current !== 1) {
      return;
    }

    document.documentElement.dataset.pageScrollLocked = "true";
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    lenisRef.current?.stop();
  }, []);

  const unlockPageScroll = useCallback(() => {
    if (pageScrollLockDepth.current === 0) {
      return;
    }

    pageScrollLockDepth.current -= 1;
    if (pageScrollLockDepth.current !== 0) {
      return;
    }

    delete document.documentElement.dataset.pageScrollLocked;
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    lenisRef.current?.start();
  }, []);

  useEffect(() => {
    let cancelled = false;
    let lenisBooted = false;
    let readyFrame = 0;
    let teardownLenis: (() => void) | undefined;
    let idleHandle: number | undefined;

    registerGsap();
    ScrollTrigger.config({ ignoreMobileResize: true });

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isReducedMotion = reducedMotionQuery.matches;
    setPrefersReducedMotion(isReducedMotion);

    if (isReducedMotion) {
      document.documentElement.removeAttribute("data-motion-pending");
    }

    ScrollTrigger.defaults({ scroller: window });
    readyFrame = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      setIsReady(true);
    });

    const bootLenis = () => {
      if (cancelled || lenisBooted || isReducedMotion || !shouldUseLenis()) {
        return;
      }
      lenisBooted = true;

      const lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        syncTouch: false,
      });

      lenisRef.current = lenis;
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

      teardownLenis = () => {
        window.removeEventListener("resize", onResize);
        ScrollTrigger.removeEventListener("refresh", onRefresh);
        gsap.ticker.remove(onTicker);
        lenis.destroy();
        lenisRef.current = null;
        document.documentElement.classList.remove("lenis");
        ScrollTrigger.defaults({ scroller: window });
        ScrollTrigger.clearScrollMemory();
      };
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
      cancelAnimationFrame(readyFrame);
      cancelIdle();
      window.removeEventListener("pointerdown", bootLenisFromInteraction);
      window.removeEventListener("keydown", bootLenisFromInteraction);
      window.removeEventListener("scroll", bootLenisFromInteraction);
      teardownLenis?.();
    };
  }, []);

  useLayoutEffect(() => {
    if (!isReady || prefersReducedMotion) {
      return;
    }

    document.documentElement.removeAttribute("data-motion-pending");
  }, [isReady, prefersReducedMotion]);

  const value = useMemo(
    () => ({
      isReady,
      prefersReducedMotion,
      resetRouteMotion,
      lockPageScroll,
      unlockPageScroll,
    }),
    [isReady, prefersReducedMotion, resetRouteMotion, lockPageScroll, unlockPageScroll],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}

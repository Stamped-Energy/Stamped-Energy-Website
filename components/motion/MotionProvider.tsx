"use client";

import type Lenis from "lenis";
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

import { isMobileMotionLite } from "@/lib/motion/wait-for-lcp";

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
  const runtimeRef = useRef<{
    resetRouteMotion: (lenis: Lenis | null) => void;
  } | null>(null);

  const resetRouteMotion = useCallback(() => {
    runtimeRef.current?.resetRouteMotion(lenisRef.current);
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

  useLayoutEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const isReducedMotion = reducedMotionQuery.matches;
    setPrefersReducedMotion(isReducedMotion);

    if (isReducedMotion) {
      document.documentElement.removeAttribute("data-motion-pending");
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotionQuery.matches) {
      return;
    }

    let cancelled = false;
    let cancelScrollBoot: (() => void) | undefined;
    let cancelScrollMotion: (() => void) | undefined;

    const startRuntime = async () => {
      const runtime = await import("@/lib/motion/motion-runtime");
      if (cancelled) {
        return;
      }

      runtimeRef.current = runtime;

      cancelScrollMotion = runtime.bootScrollMotion(() => {
        if (!cancelled) {
          setIsReady(true);
        }
      });

      cancelScrollBoot = runtime.scheduleLenisBoot((lenis) => {
        lenisRef.current = lenis;
      });
    };

    const scheduleMobileRuntime = () => {
      const run = () => {
        if (!cancelled) {
          void startRuntime();
        }
      };

      let started = false;
      const kick = () => {
        if (started || cancelled) {
          return;
        }
        started = true;
        window.removeEventListener("scroll", kick);
        window.removeEventListener("pointerdown", kick);
        window.removeEventListener("keydown", kick);
        if (typeof window.requestIdleCallback === "function") {
          window.requestIdleCallback(run, { timeout: 3000 });
        } else {
          window.setTimeout(run, 500);
        }
      };

      window.addEventListener("scroll", kick, { once: true, passive: true });
      window.addEventListener("pointerdown", kick, { once: true, passive: true });
      window.addEventListener("keydown", kick, { once: true });
      window.setTimeout(kick, 9000);
    };

    if (isMobileMotionLite()) {
      if (document.readyState === "complete") {
        scheduleMobileRuntime();
      } else {
        window.addEventListener("load", scheduleMobileRuntime, { once: true });
      }
    } else {
      void startRuntime();
    }

    return () => {
      cancelled = true;
      cancelScrollMotion?.();
      cancelScrollBoot?.();
      runtimeRef.current = null;
      lenisRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    if (!isReady || prefersReducedMotion) {
      return;
    }

    if (isMobileMotionLite()) {
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

"use client";

import { useEffect, useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";

export type SlotLoopOptions = {
  reduce: boolean;
};

/**
 * Starts a DOM animation engine the first time the slot is on screen.
 * It keeps running after that (no restart on scroll away / back).
 * Stops only on unmount or when motion prefs change.
 */
export function useSlotLoop(start: (root: HTMLElement, opts: SlotLoopOptions) => () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const startRef = useRef(start);
  startRef.current = start;
  const { isReady, prefersReducedMotion } = useMotion();

  useEffect(() => {
    const root = ref.current;
    if (!isReady || !root) return;

    let stop: (() => void) | undefined;
    let started = false;

    const connect = () => {
      if (started) return;
      started = true;
      const reduce =
        prefersReducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      stop = startRef.current(root, { reduce });
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          connect();
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(root);

    return () => {
      io.disconnect();
      stop?.();
    };
  }, [isReady, prefersReducedMotion]);

  return ref;
}

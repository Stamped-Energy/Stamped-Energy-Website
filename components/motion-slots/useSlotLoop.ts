"use client";

import { useEffect, useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";

export type SlotLoopOptions = {
  reduce: boolean;
  /** True on every start after the first, so an engine can skip its intro and continue. */
  resume: boolean;
};

/**
 * Runs a DOM animation engine only while the slot is on screen.
 * Leaving the viewport calls the engine's stop; coming back starts it again
 * with `resume: true`, so engines must set their own initial state on start.
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
    const reduce =
      prefersReducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.some((entry) => entry.isIntersecting);
        if (visible && !stop) {
          stop = startRef.current(root, { reduce, resume: started });
          started = true;
        } else if (!visible && stop) {
          stop();
          stop = undefined;
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

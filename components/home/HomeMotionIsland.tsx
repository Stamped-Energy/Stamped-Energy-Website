"use client";

import type { ReactNode } from "react";

import { RouteMotionSync } from "@/components/motion/RouteMotionSync";
import { MotionProvider } from "@/components/motion/MotionProvider";

/** GSAP/Lenis for home sections that call useMotion — kept off hero LCP path. */
export function HomeMotionIsland({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <RouteMotionSync />
      {children}
    </MotionProvider>
  );
}

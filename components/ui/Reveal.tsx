"use client";

import { useRef, type ReactNode } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import {
  easeOut,
  getRevealFromVars,
  getRevealToVars,
  revealDuration,
  scrollTriggerDefaults,
  type RevealDirection,
} from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  from?: RevealDirection;
  delay?: number;
};

export function Reveal({ children, className, from = "up", delay = 0 }: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) {
        return;
      }

      const element = containerRef.current;
      if (!element) {
        return;
      }

      gsap.set(element, getRevealFromVars(from));
      const tween = gsap.to(element, {
        ...getRevealToVars(from),
        duration: revealDuration,
        ease: easeOut,
        delay,
        scrollTrigger: {
          trigger: element,
          ...scrollTriggerDefaults,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    {
      scope: containerRef,
      dependencies: [isReady, prefersReducedMotion, from, delay],
    },
  );

  return (
    <div ref={containerRef} data-reveal className={cn(className)}>
      {children}
    </div>
  );
}

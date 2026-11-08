"use client";

import { useRef, type ReactNode } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { isMobileMotionLite } from "@/lib/motion/wait-for-lcp";
import {
  easeOut,
  revealDuration,
  scrollTriggerDefaults,
  staggerDelay,
  staggerGap,
} from "@/lib/motion/config";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

type StaggerRevealProps = {
  children: ReactNode;
  className?: string;
};

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
};

export function StaggerReveal({ children, className }: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || isMobileMotionLite()) {
        return;
      }

      const container = containerRef.current;
      if (!container) {
        return;
      }

      const items = container.querySelectorAll<HTMLElement>("[data-stagger-item]");
      if (!items.length) {
        return;
      }

      gsap.set(items, { autoAlpha: 0, y: 24 });
      gsap.to(items, {
        autoAlpha: 1,
        y: 0,
        duration: revealDuration,
        ease: easeOut,
        stagger: staggerGap,
        delay: staggerDelay,
        scrollTrigger: {
          trigger: container,
          ...scrollTriggerDefaults,
        },
      });
    },
    {
      scope: containerRef,
      dependencies: [isReady, prefersReducedMotion],
    },
  );

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  );
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <div data-stagger-item className={cn(className)}>
      {children}
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore, type ReactNode } from "react";

import { type RevealDirection } from "@/lib/motion/config";
import { isMobileMotionLite } from "@/lib/motion/wait-for-lcp";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  from?: RevealDirection;
  delay?: number;
};

function subscribeMobileLite(onStoreChange: () => void) {
  const query = window.matchMedia("(max-width: 1023px)");
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function getMobileLiteSnapshot() {
  return isMobileMotionLite();
}

/** SSR assumes mobile-lite (no GSAP) so simulated mobile LCP is not blocked by reveal bundles. */
function getMobileLiteServerSnapshot() {
  return true;
}

const RevealAnimated = dynamic(
  () => import("@/components/ui/RevealAnimated").then((mod) => mod.RevealAnimated),
  { ssr: false },
);

export function Reveal({ children, className, from = "up", delay = 0 }: RevealProps) {
  const mobileLite = useSyncExternalStore(
    subscribeMobileLite,
    getMobileLiteSnapshot,
    getMobileLiteServerSnapshot,
  );

  if (mobileLite) {
    return (
      <div data-reveal className={cn(className)}>
        {children}
      </div>
    );
  }

  return (
    <RevealAnimated className={className} from={from} delay={delay}>
      {children}
    </RevealAnimated>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Analytics = dynamic(
  () => import("@vercel/analytics/next").then((mod) => ({ default: mod.Analytics })),
  { ssr: false },
);

export function DeferredAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const enable = () => setEnabled(true);

    const schedule =
      typeof window.requestIdleCallback === "function"
        ? () => window.requestIdleCallback(enable, { timeout: 5000 })
        : () => window.setTimeout(enable, 2500);

    if (document.readyState === "complete") {
      schedule();
      return;
    }

    window.addEventListener(
      "load",
      () => {
        schedule();
      },
      { once: true },
    );
  }, []);

  if (!enabled) {
    return null;
  }

  return <Analytics />;
}

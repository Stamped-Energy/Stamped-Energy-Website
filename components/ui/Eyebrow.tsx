import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  tone?: "light" | "dark";
  withDot?: boolean;
};

export function Eyebrow({ children, className, tone = "light", withDot = true }: EyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[12px] font-medium uppercase tracking-[0.08em]",
        tone === "dark" ? "text-white/70" : "text-on-surface-variant",
        className,
      )}
    >
      {withDot ? <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden /> : null}
      {children}
    </p>
  );
}

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SolutionMediaSlotProps = {
  label: string;
  className?: string;
  dark?: boolean;
  children?: ReactNode;
};

/** Solution How-it-works visual plane. Empty → reserved placeholder. */
export function SolutionMediaSlot({
  label,
  className,
  dark = false,
  children,
}: SolutionMediaSlotProps) {
  return (
    <div
      className={cn(
        "relative flex w-full min-h-[14rem] items-center justify-center overflow-hidden rounded-md border md:min-h-[18rem]",
        "aspect-[16/10]",
        dark
          ? children
            ? "border-on-secondary/20 bg-transparent"
            : "border-on-secondary/20 bg-on-secondary/[0.06]"
          : children
            ? "border-outline-variant/50 bg-transparent"
            : "border-outline-variant/55 bg-surface-low",
        className,
      )}
      aria-label={children ? label : `${label} visual placeholder`}
      data-solution-slot={label}
    >
      {children ? (
        <div className="absolute inset-0">{children}</div>
      ) : (
        <div className="px-5 text-center">
          <p
            className={cn(
              "font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em]",
              dark ? "text-on-secondary/40" : "text-on-surface-variant/55",
            )}
          >
            Visual reserved
          </p>
          <p
            className={cn(
              "mt-2 max-w-[16rem] font-display text-sm font-semibold tracking-tight",
              dark ? "text-on-secondary/65" : "text-on-surface/55",
            )}
          >
            {label}
          </p>
        </div>
      )}
    </div>
  );
}

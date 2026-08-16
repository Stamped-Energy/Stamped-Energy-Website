import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type MotionSlotProps = {
  label: string;
  className?: string;
  /** Aspect ratio utility, default wide hero */
  aspectClassName?: string;
  dark?: boolean;
  children?: ReactNode;
};

/**
 * Homepage motion frame. Empty → “Animation soon” placeholder.
 * Pass children to fill the slot with a live visual.
 */
export function MotionSlot({
  label,
  className,
  aspectClassName = "aspect-[16/9]",
  dark = false,
  children,
}: MotionSlotProps) {
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden rounded-md border",
        aspectClassName,
        dark
          ? children
            ? "border-on-secondary/20 bg-transparent"
            : "border-on-secondary/20 bg-on-secondary/5"
          : children
            ? "border-outline-variant/50 bg-transparent"
            : "border-outline-variant/50 bg-surface-low",
        className,
      )}
      data-motion-slot={label}
    >
      {children ? (
        <div className="absolute inset-0">{children}</div>
      ) : (
        <div className="px-4 text-center">
          <p
            className={cn(
              "font-mono text-[0.68rem] font-medium uppercase tracking-[0.14em]",
              dark ? "text-on-secondary/45" : "text-on-surface-variant/70",
            )}
          >
            Animation soon
          </p>
          <p
            className={cn(
              "mt-2 font-mono text-sm font-medium tracking-tight",
              dark ? "text-on-secondary/70" : "text-on-surface/70",
            )}
          >
            {label}
          </p>
        </div>
      )}
    </div>
  );
}

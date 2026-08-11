import { cn } from "@/lib/utils";

type MotionSlotProps = {
  label: string;
  className?: string;
  /** Aspect ratio utility, default wide hero */
  aspectClassName?: string;
  dark?: boolean;
};

/**
 * Placeholder for deferred Rive/GSAP animations.
 * Keeps layout rhythm without shipping unfinished motion.
 */
export function MotionSlot({
  label,
  className,
  aspectClassName = "aspect-[16/9]",
  dark = false,
}: MotionSlotProps) {
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden rounded-md border",
        aspectClassName,
        dark
          ? "border-on-secondary/20 bg-on-secondary/5"
          : "border-outline-variant/50 bg-surface-low",
        className,
      )}
      data-motion-slot={label}
    >
      <div className="px-4 text-center">
        <p
          className={cn(
            "text-[0.7rem] font-semibold uppercase tracking-[0.16em]",
            dark ? "text-on-secondary/45" : "text-on-surface-variant/70",
          )}
        >
          Animation soon
        </p>
        <p
          className={cn(
            "mt-2 text-sm font-medium",
            dark ? "text-on-secondary/70" : "text-on-surface/70",
          )}
        >
          {label}
        </p>
      </div>
    </div>
  );
}

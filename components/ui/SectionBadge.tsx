import { cn } from "@/lib/utils";

type SectionBadgeProps = {
  label: string;
  /** Invert for dark bands */
  alternate?: boolean;
  className?: string;
};

/** CVector-style eyebrow badge with short rule marks. */
export function SectionBadge({ label, alternate = false, className }: SectionBadgeProps) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "flex flex-col gap-[3px]",
          alternate ? "text-on-secondary/50" : "text-primary",
        )}
        aria-hidden
      >
        <span className="block h-3 w-px bg-current" />
        <span className="block h-3 w-px bg-current opacity-70" />
        <span className="block h-3 w-px bg-current opacity-40" />
      </span>
      <span
        className={cn(
          "rounded-sm border px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em]",
          alternate
            ? "border-on-secondary/35 text-on-secondary/90"
            : "border-primary/70 text-on-surface",
        )}
      >
        {label}
      </span>
    </div>
  );
}

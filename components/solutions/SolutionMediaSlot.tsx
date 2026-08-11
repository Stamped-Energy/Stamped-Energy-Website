import { cn } from "@/lib/utils";

type SolutionMediaSlotProps = {
  label: string;
  className?: string;
  dark?: boolean;
};

/** Reserved visual plane for solution How-it-works rows (assets later). */
export function SolutionMediaSlot({ label, className, dark = false }: SolutionMediaSlotProps) {
  return (
    <div
      className={cn(
        "relative flex w-full min-h-[14rem] items-center justify-center overflow-hidden rounded-md border md:min-h-[18rem]",
        "aspect-[16/10]",
        dark
          ? "border-on-secondary/20 bg-on-secondary/[0.06]"
          : "border-outline-variant/55 bg-surface-low",
        className,
      )}
      aria-label={`${label} visual placeholder`}
    >
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
    </div>
  );
}

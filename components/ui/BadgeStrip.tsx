import { cn } from "@/lib/utils";

type BadgeStripProps = {
  label: string;
  partners: readonly string[];
  tone?: "light" | "dark";
  className?: string;
};

/** Trust strip. Official badge assets replace text chips when supplied. */
export function BadgeStrip({ label, partners, tone = "dark", className }: BadgeStripProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      <p
        className={cn(
          "font-mono text-[11px] font-medium uppercase tracking-[0.08em]",
          tone === "dark" ? "text-white/50" : "text-on-surface-variant",
        )}
      >
        {label}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {partners.map((partner) => (
          <span
            key={partner}
            className={cn(
              "inline-flex h-9 items-center rounded-full border px-4 font-mono text-[12px] font-medium",
              tone === "dark"
                ? "border-white/15 bg-white/5 text-white/80"
                : "border-outline-variant bg-surface-lowest text-on-surface",
            )}
          >
            {partner}
          </span>
        ))}
      </div>
    </div>
  );
}

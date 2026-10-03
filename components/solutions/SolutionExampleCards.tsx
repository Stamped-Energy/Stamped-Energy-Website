import type { SolutionExampleCard } from "@/lib/content/solutions";
import { cn } from "@/lib/utils";

export function SolutionExampleCards({
  label,
  items,
  className,
}: {
  label: string;
  items: readonly SolutionExampleCard[];
  className?: string;
}) {
  return (
    <ul className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-5", className)}>
      {items.map((item) => (
        <li
          key={item.id}
          className="flex flex-col rounded-xl border border-outline-variant/50 bg-surface-lowest p-5 md:p-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
              {label}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-on-surface-variant">
              {item.role}
            </span>
          </div>
          <p className="mt-4 text-sm leading-7 text-on-surface md:text-base">{item.copy}</p>
        </li>
      ))}
    </ul>
  );
}

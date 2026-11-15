import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

type Stat = {
  prefix?: string;
  value: string;
  label: string;
};

type StatBandProps = {
  stats: readonly Stat[];
  caption?: string;
  note?: string;
  className?: string;
};

export function StatBand({ stats, caption, note, className }: StatBandProps) {
  return (
    <div className={cn("mx-auto max-w-4xl text-center", className)}>
      <div className="grid gap-10 sm:grid-cols-2 sm:gap-0">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              "px-6",
              index > 0 && "sm:border-l sm:border-outline-variant",
            )}
          >
            {stat.prefix ? (
              <Eyebrow withDot={false} className="mb-3 justify-center">
                {stat.prefix}
              </Eyebrow>
            ) : null}
            <p
              className="font-display text-[length:var(--type-stat)] font-semibold tabular-nums leading-none tracking-[-0.04em] text-on-surface"
            >
              {stat.value}
            </p>
            <p className="mt-4 text-lg text-on-surface-variant">{stat.label}</p>
          </div>
        ))}
      </div>
      {caption ? <p className="mt-10 text-sm font-medium text-on-surface">{caption}</p> : null}
      {note ? <p className="mt-2 text-sm text-on-surface-variant">{note}</p> : null}
    </div>
  );
}

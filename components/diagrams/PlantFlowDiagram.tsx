import { cn } from "@/lib/utils";

/**
 * Plant data → Models → Actions → Results, with a "Team feedback" return arrow (copy v3 section 4).
 * Short labels are allowed inside the diagram only; written copy stays in prose.
 */
const NODES = [
  { id: "plant-data", label: "Plant data" },
  { id: "models", label: "Models" },
  { id: "actions", label: "Actions" },
  { id: "results", label: "Results" },
] as const;

export function PlantFlowDiagram({ dark = false, className }: { dark?: boolean; className?: string }) {
  const nodeClass = dark
    ? "border-on-secondary/25 bg-on-secondary/5 text-on-secondary"
    : "border-outline-variant/60 bg-surface-lowest text-on-surface";
  const arrowClass = dark ? "text-on-secondary/50" : "text-on-surface/40";

  return (
    <figure
      className={cn("w-full", className)}
      aria-label="Diagram: plant data feeds models, models produce actions, actions lead to results, and team feedback on results goes back into the models."
    >
      <ol className="grid grid-cols-1 items-stretch gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:gap-3">
        {NODES.map((node, index) => (
          <li key={node.id} className="contents">
            {index > 0 ? (
              <span aria-hidden className={cn("flex items-center justify-center text-xl", arrowClass)}>
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </span>
            ) : null}
            <div
              className={cn(
                "flex min-h-16 items-center justify-center rounded-lg border px-4 py-4 text-center font-display text-base font-semibold tracking-tight md:min-h-20 md:text-lg",
                nodeClass,
                node.id === "actions" && "border-primary/60 bg-primary/10",
              )}
            >
              {node.label}
            </div>
          </li>
        ))}
      </ol>
      <div
        aria-hidden
        className={cn(
          "mt-3 flex items-center gap-3 md:pl-[27%]",
          dark ? "text-on-secondary/70" : "text-on-surface-variant",
        )}
      >
        <span className="text-lg text-primary">↩</span>
        <span className="h-px flex-1 border-t border-dashed border-primary/60" />
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.12em]">Team feedback</span>
        <span className="h-px flex-1 border-t border-dashed border-primary/60" />
      </div>
    </figure>
  );
}

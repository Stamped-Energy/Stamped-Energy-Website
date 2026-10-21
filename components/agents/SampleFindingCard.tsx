import { agentsSection, type SampleFinding } from "@/lib/content/agents";
import type { SolutionAreaSlug } from "@/lib/content/solutions";
import { cn } from "@/lib/utils";

import "./agents.css";

/** A light sample finding card: headline, tag, three blocks and inert actions. Always captioned illustrative. */
export function SampleFindingCard({
  sample,
  palette,
  className,
}: {
  sample: SampleFinding;
  palette: SolutionAreaSlug;
  className?: string;
}) {
  const { findLabels, sampleLabel, sampleCaption } = agentsSection;
  const rows = [
    { label: findLabels.found, text: sample.found },
    { label: findLabels.opportunity, text: sample.opportunity },
    { label: findLabels.capture, text: sample.capture },
  ];

  return (
    <figure className={cn(`agent-card-${palette} min-w-0 rounded-lg p-3 sm:p-5`, className)}>
      <div className="agent-card-inner rounded-md p-4 sm:p-5" data-agent-card>
        <p data-agent-card-row className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] agent-card-muted sm:text-[0.62rem] sm:tracking-[0.14em]">
          {sampleLabel} · {sample.tag}
        </p>
        <p data-agent-card-row className="mt-3 font-display text-lg font-bold leading-snug tracking-tight sm:text-xl">
          {sample.headline}
        </p>
        <dl className="mt-4">
          {rows.map((row) => (
            <div key={row.label} data-agent-card-row className="agent-card-rule border-t py-2.5">
              <dt className="font-mono text-[0.66rem] font-medium uppercase tracking-[0.12em] agent-card-muted sm:text-[0.6rem] sm:tracking-[0.14em]">{row.label}</dt>
              <dd className="mt-1 text-sm leading-6">{row.text}</dd>
            </div>
          ))}
        </dl>
        <div data-agent-card-row className="mt-3 flex flex-wrap gap-2" aria-hidden>
          {sample.actions.map((action, i) => (
            <span
              key={action}
              className={cn(
                "agent-card-btn rounded-full px-3 py-1 font-mono text-[0.62rem] font-medium uppercase tracking-[0.12em]",
                i === 1 && sample.actions.length > 2 ? "agent-card-btn-primary" : "",
              )}
            >
              <span>{action}</span>
            </span>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 text-xs leading-5 agent-card-muted">{sampleCaption}</figcaption>
    </figure>
  );
}

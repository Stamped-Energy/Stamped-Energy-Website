import { agentStepLabels, type AgentArea } from "@/lib/content/agents";
import { cn } from "@/lib/utils";

/** Agent jobs grouped by the three steps. Shared by the homepage picker and the solution pages. */
export function AgentJobGroups({ area, className }: { area: AgentArea; className?: string }) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="space-y-7">
        {area.groups.map((group) => (
          <div key={group.step} data-agent-group>
            <p className="flex items-center gap-3 font-mono text-[0.66rem] font-medium uppercase tracking-[0.14em] text-on-surface">
              <span className="h-px w-6 bg-primary" aria-hidden />
              {agentStepLabels[group.step]}
            </p>
            <ul className="mt-3 divide-y divide-outline-variant/40 border-y border-outline-variant/40">
              {group.jobs.map((job) => (
                <li key={job.id} data-agent-job className="grid gap-1 py-3 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-6">
                  <span className="font-display text-[0.98rem] font-bold leading-snug tracking-tight text-on-surface">
                    {job.name}
                  </span>
                  <span className="text-sm leading-6 text-on-surface-variant">{job.line}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p data-agent-group className="mt-6 border-l-2 border-primary pl-4 text-sm leading-6 text-on-surface">
        {area.ownership}
      </p>
    </div>
  );
}

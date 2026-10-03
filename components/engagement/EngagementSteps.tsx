import { ENGAGEMENT_STEPS } from "@/lib/content/engagement";
import { cn } from "@/lib/utils";

type EngagementStepsProps = {
  className?: string;
};

/** Numbered survey → pilot → annual steps, used on /contact. */
export function EngagementSteps({ className }: EngagementStepsProps) {
  return (
    <ol className={cn("grid gap-4 md:grid-cols-3 md:gap-5", className)}>
      {ENGAGEMENT_STEPS.map((step) => (
        <li
          key={step.id}
          className="relative flex flex-col rounded-lg border border-outline-variant/50 bg-surface-lowest p-5 md:p-6"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary">
              {step.step}
            </span>
            <span className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] text-primary">
              {step.label}
            </span>
          </div>
          <h3 className="mt-4 font-display text-lg font-bold text-on-surface">{step.title}</h3>
          <p className="mt-2 text-sm leading-6 text-on-surface-variant">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}

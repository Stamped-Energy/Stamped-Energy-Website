import { DiagramCallout, DiagramShell } from "./DiagramShell";

export function ImproveDiagram() {
  return (
    <DiagramShell
      diagram="improve"
      eyebrow="Followed vs ignored"
      footer={
        <DiagramCallout>
          Next month&apos;s ranks refresh from{" "}
          <span className="font-bold text-on-surface">cleared outcomes</span>, human-gated
        </DiagramCallout>
      }
    >
      <div className="flex flex-1 flex-col justify-center gap-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div
            data-animate="item"
            className="rounded-lg border border-outline-variant/40 bg-surface-lowest px-3 py-3 sm:px-4"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
              Followed
            </p>
            <p className="mt-2 text-sm font-bold text-on-surface sm:text-base">Rx cleared</p>
            <p className="mt-1 text-xs text-on-surface-variant">Strengthen pattern</p>
          </div>
          <div
            data-animate="item"
            className="rounded-lg border border-outline-variant/40 bg-surface-lowest px-3 py-3 sm:px-4"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
              Ignored
            </p>
            <p className="mt-2 text-sm font-bold text-on-surface sm:text-base">Reason coded</p>
            <p className="mt-1 text-xs text-on-surface-variant">Retune or deprioritise</p>
          </div>
        </div>
        <div
          data-animate="accent"
          className="rounded-lg border border-primary/35 bg-primary/8 px-3 py-3 text-center sm:px-4"
        >
          <p className="text-sm font-bold text-primary">Improve</p>
          <p className="mt-1 text-xs text-on-surface-variant">
            Calibrate thresholds and preferences, not &ldquo;AI learning about you&rdquo;
          </p>
        </div>
      </div>
    </DiagramShell>
  );
}

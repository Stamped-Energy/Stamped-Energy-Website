import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { productsContent } from "@/lib/content/products";
import { cn } from "@/lib/utils";

const TAG_STYLES: Record<string, string> = {
  Now: "border-white/20 bg-white/10 text-white/80",
  "Now and next": "border-primary/40 bg-primary/15 text-primary",
  Later: "border-white/10 bg-transparent text-white/45",
};

export function HomeVisionV4() {
  const { vision } = productsContent;

  return (
    <Section tone="dark" id="vision">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow tone="dark">{vision.eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em] text-balance">
          {vision.title}
        </h2>
        <p className="mt-4 text-lg text-white/65">{vision.mission}</p>
      </div>

      <ol className="mx-auto mt-14 max-w-3xl space-y-0">
        {vision.rungs.map((rung, index) => (
          <li
            key={rung.id}
            className={cn(
              "flex items-start justify-between gap-6 border-t border-white/10 py-5",
              index === vision.rungs.length - 1 && "border-b border-white/10",
            )}
          >
            <div className="min-w-0">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] text-white/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="font-semibold tracking-tight text-inverse-on-surface">{rung.title}</p>
              </div>
              {"description" in rung && rung.description ? (
                <p className="mt-1 pl-8 text-sm text-white/50">{rung.description}</p>
              ) : null}
            </div>
            <span
              className={cn(
                "shrink-0 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider",
                TAG_STYLES[rung.tag] ?? TAG_STYLES.Now,
              )}
            >
              {rung.tag}
            </span>
          </li>
        ))}
      </ol>

      <p className="mx-auto mt-12 max-w-2xl border-t border-primary/40 pt-6 text-center text-sm font-medium text-primary">
        {vision.coralLine}
      </p>
    </Section>
  );
}

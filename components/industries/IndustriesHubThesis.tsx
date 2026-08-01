import { Container } from "@/components/ui/Container";
import { industriesContent } from "@/lib/content";

export function IndustriesHubThesis() {
  const { thesis } = industriesContent.hub;

  return (
    <section className="border-b border-outline-variant/30 bg-surface section-y">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {thesis.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold text-on-surface md:text-3xl">
            {thesis.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-on-surface-variant md:text-base">{thesis.body}</p>
        </div>
      </Container>
    </section>
  );
}

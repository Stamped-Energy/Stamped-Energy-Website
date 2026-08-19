import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { industriesContent } from "@/lib/content";

export function IndustriesHubThesis() {
  const { thesis } = industriesContent.hub;

  return (
    <section className="bg-surface section-y">
      <Container>
        <div className="max-w-2xl">
          <SectionBadge label={thesis.eyebrow} />
          <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
            {thesis.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-on-surface-variant md:text-base">{thesis.body}</p>
        </div>
      </Container>
    </section>
  );
}

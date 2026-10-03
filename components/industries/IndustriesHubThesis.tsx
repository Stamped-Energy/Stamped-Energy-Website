import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { industriesContent } from "@/lib/content";

export function IndustriesHubThesis() {
  const { thesis } = industriesContent.hub;

  return (
    <section className="bg-surface section-y">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionBadge label={thesis.eyebrow} />
            <h2 className="mt-5 max-w-xl font-display text-2xl font-bold tracking-tight text-balance text-on-surface md:text-3xl lg:text-[2.25rem] lg:leading-[1.15]">
              {thesis.title}
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-on-surface-variant md:text-base md:leading-8 lg:col-span-7 lg:pt-12">
            {thesis.body}
          </p>
        </div>
      </Container>
    </section>
  );
}

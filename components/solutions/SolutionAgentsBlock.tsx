import { AgentJobGroups } from "@/components/agents/AgentJobGroups";
import { SampleFindingCard } from "@/components/agents/SampleFindingCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { agentsSection, type AgentArea } from "@/lib/content/agents";

/** "What Stamped's agents do here": the area's jobs by step, beside a sample finding card. */
export function SolutionAgentsBlock({ area }: { area: AgentArea }) {
  const sample = area.pageSample ?? area.homeSample;

  return (
    <section id="agents" className="border-b border-outline-variant/30 bg-surface-low section-y">
      <Container>
        <Reveal>
          <SectionBadge label={agentsSection.badge} />
          <h2 className="mt-5 max-w-2xl font-display text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
            {agentsSection.pageHeading}
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-8 md:mt-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:order-2 lg:col-span-5">
            <SampleFindingCard sample={sample} palette={area.slug} className="lg:sticky lg:top-28" />
          </Reveal>
          <Reveal className="lg:order-1 lg:col-span-7">
            <AgentJobGroups area={area} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

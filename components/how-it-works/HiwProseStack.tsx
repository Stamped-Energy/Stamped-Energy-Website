import { PlatformZigZagVisual } from "@/components/how-it-works/PlatformZigZagVisual";
import { SolutionMediaSlot } from "@/components/solutions/SolutionMediaSlot";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { PlatformProseSection } from "@/lib/content/types";
import { cn } from "@/lib/utils";

type HiwProseStackProps = {
  content: PlatformProseSection;
  sectionId?: string;
  className?: string;
};

export function HiwProseStack({ content, sectionId, className }: HiwProseStackProps) {
  return (
    <section
      id={sectionId}
      className={cn("border-b border-outline-variant/40 bg-surface section-y", className)}
    >
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
            align="left"
          />
        </Reveal>

        <ul className="mt-10 divide-y divide-outline-variant/40 border-y border-outline-variant/40 md:mt-12">
          {content.items.map((item, index) => {
            const mediaFirst = index % 2 === 1;
            return (
              <li key={item.id} id={item.id} className="py-8 md:py-10">
                <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
                  <div className={cn(!mediaFirst && "lg:order-2")}>
                    <SolutionMediaSlot
                      label={item.title}
                      className="min-h-[16rem] md:min-h-[20rem]"
                    >
                      <PlatformZigZagVisual itemId={item.id} />
                    </SolutionMediaSlot>
                  </div>
                  <div className={cn(!mediaFirst && "lg:order-1")}>
                    <h3 className="font-display text-xl font-bold tracking-tight text-on-surface md:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-on-surface-variant md:text-base md:leading-8">
                      {item.description}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getVerticalPage, type VerticalSlug } from "@/lib/content";
import { getSegmentImageFocus } from "@/lib/industries/imageFocus";
import { cn } from "@/lib/utils";

type IndustryPlantZigZagProps = {
  slug: VerticalSlug;
};

export function IndustryPlantZigZag({ slug }: IndustryPlantZigZagProps) {
  const page = getVerticalPage(slug);

  if (!page || page.plantBand.items.length === 0) {
    return null;
  }

  const { plantBand } = page;

  return (
    <section id="in-this-plant" className="border-b border-outline-variant/40 bg-surface section-y">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={plantBand.eyebrow}
            title={plantBand.title}
            description={plantBand.description}
            align="left"
          />
        </Reveal>

        <ul className="mt-10 divide-y divide-outline-variant/40 border-y border-outline-variant/40 md:mt-12">
          {plantBand.items.map((item, index) => {
            const mediaFirst = index % 2 === 1;
            return (
              <li key={item.id} id={item.id} className="py-8 md:py-10">
                <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
                  <div className={cn(!mediaFirst && "lg:order-2")}>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-md border border-outline-variant/50 bg-surface-low">
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        fill
                        className={getSegmentImageFocus(item.id)}
                        sizes="(min-width: 1024px) 42vw, 100vw"
                      />
                    </div>
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

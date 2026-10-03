import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industriesContent } from "@/lib/content";
import { getSegmentImageFocus } from "@/lib/industries/imageFocus";

/** Auto-component processes, each linking to its section on the auto components page. */
export function IndustriesHubProcesses() {
  const { processes } = industriesContent.hub;

  return (
    <section className="bg-surface section-y">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={processes.eyebrow} title={processes.title} description={processes.description} />
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 md:mt-12 lg:grid-cols-5">
          {processes.tiles.map((tile, index) => (
            <li key={tile.id}>
              <Reveal delay={index * 0.04}>
                <Link
                  href={tile.href}
                  className="group block outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-on-surface/8">
                    <Image
                      src={tile.imageSrc}
                      alt={tile.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 45vw, 18vw"
                      className={`${getSegmentImageFocus(tile.id)} transition-transform duration-500 ease-out group-hover:scale-[1.04]`}
                    />
                  </div>
                  <p className="mt-3 font-display text-base font-semibold tracking-tight text-on-surface transition-colors group-hover:text-primary">
                    {tile.name}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-on-surface/65 sm:text-sm sm:leading-6">{tile.focus}</p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

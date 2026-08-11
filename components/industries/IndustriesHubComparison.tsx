import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { industriesContent } from "@/lib/content";
import { cn } from "@/lib/utils";

export function IndustriesHubComparison() {
  const { byIndustry } = industriesContent.hub;

  return (
    <section id="comparison" className="scroll-mt-28 bg-secondary section-y text-on-secondary">
      <Container>
        <SectionBadge label={byIndustry.eyebrow} alternate />
        <h2 className="mt-5 max-w-3xl font-display text-2xl font-bold tracking-tight text-on-secondary md:text-3xl">
          {byIndustry.title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-on-secondary/70">
          {byIndustry.disclaimer}
        </p>

        <ul className="mt-12 space-y-10 md:space-y-14">
          {byIndustry.rows.map((row, index) => {
            const imageFirst = index % 2 === 0;

            return (
              <li key={row.id}>
                <Link
                  href={row.href}
                  className={cn(
                    "group grid overflow-hidden rounded-xl border border-on-secondary/25 outline-none transition-colors md:grid-cols-2 md:items-stretch",
                    "hover:border-on-secondary/45 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary",
                  )}
                >
                  <div
                    className={cn(
                      "relative aspect-[16/10] min-h-[12rem] overflow-hidden md:aspect-auto md:min-h-[16rem]",
                      !imageFirst && "md:order-2",
                    )}
                  >
                    <Image
                      src={row.imageSrc}
                      alt={row.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div
                    className={cn(
                      "flex flex-col justify-center p-5 sm:p-7 md:p-8 lg:p-10",
                      !imageFirst && "md:order-1",
                    )}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <h3 className="min-w-0 font-display text-xl font-bold text-on-secondary md:text-2xl">
                        {row.name}
                      </h3>
                      <div className="sm:shrink-0 sm:text-right">
                        <p className="font-display text-2xl font-extrabold tracking-tight text-primary md:text-3xl">
                          {row.metricPrimary.value}
                        </p>
                        <p className="mt-0.5 max-w-xs text-[10px] font-medium uppercase tracking-[0.1em] text-on-secondary/55 sm:max-w-[12rem]">
                          {row.metricPrimary.label}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 font-display text-base font-bold text-on-secondary sm:text-lg md:text-xl">
                      <span className="text-primary">{row.metricSecondary.value}</span>{" "}
                      <span className="text-sm font-semibold text-on-secondary/85 sm:text-base md:text-lg">
                        {row.metricSecondary.label}
                      </span>
                    </p>

                    <p className="mt-4 flex flex-wrap gap-x-2 gap-y-1 text-sm font-semibold text-on-secondary">
                      {row.equipment.map((tag, tagIndex) => (
                        <span key={tag} className="inline-flex items-center">
                          {tagIndex > 0 ? (
                            <span className="mr-2 text-primary" aria-hidden="true">
                              ·
                            </span>
                          ) : null}
                          {tag}
                        </span>
                      ))}
                    </p>

                    <p className="mt-4 max-w-xl text-sm leading-6 text-on-secondary/75 sm:leading-7">
                      {row.body}
                    </p>

                    <div className="mt-6 flex flex-col gap-2 border-t border-on-secondary/15 pt-4 text-xs font-semibold uppercase tracking-[0.12em] sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                      <span className="text-on-secondary/55">{row.footerNote}</span>
                      <span className="text-primary transition-colors group-hover:text-inverse-primary">
                        View industry
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industriesContent } from "@/lib/content";
import { IMPROVEMENT_AREA_LABELS } from "@/lib/content/industries";
import type { ImprovementAreaKey } from "@/lib/content/types";

const AREA_ORDER: ImprovementAreaKey[] = ["process", "quality", "planning", "maintenance"];

/** Industry x improvement-area grid: a table on desktop, stacked cards on mobile. */
export function IndustriesHubMatrix() {
  const { matrix } = industriesContent.hub;

  return (
    <section id="by-area" className="scroll-mt-28 border-t border-outline-variant/40 bg-surface-low section-y">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={matrix.eyebrow} title={matrix.title} description={matrix.description} />
        </Reveal>

        <div className="mt-10 hidden overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-lowest lg:block">
          <table className="w-full table-fixed border-collapse text-left">
            <caption className="sr-only">{matrix.title}</caption>
            <thead>
              <tr className="border-b border-outline-variant/50 bg-surface">
                <th scope="col" className="w-[16%] px-5 py-4 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
                  Industry
                </th>
                {AREA_ORDER.map((area) => (
                  <th key={area} scope="col" className="px-5 py-4">
                    <Link
                      href={IMPROVEMENT_AREA_LABELS[area].href}
                      className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-primary hover:underline"
                    >
                      {IMPROVEMENT_AREA_LABELS[area].label}
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.rows.map((row) => (
                <tr key={row.id} className="border-b border-outline-variant/35 last:border-b-0">
                  <th scope="row" className="px-5 py-5 align-top">
                    <Link
                      href={row.href}
                      className="font-display text-base font-bold text-on-surface transition-colors hover:text-primary"
                    >
                      {row.name}
                    </Link>
                  </th>
                  {AREA_ORDER.map((area) => (
                    <td key={area} className="px-5 py-5 align-top text-sm leading-6 text-on-surface-variant">
                      {row.cells[area]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:hidden">
          {matrix.rows.map((row) => (
            <li key={row.id} className="rounded-xl border border-outline-variant/50 bg-surface-lowest p-5">
              <Link href={row.href} className="font-display text-lg font-bold text-on-surface hover:text-primary">
                {row.name} »
              </Link>
              <dl className="mt-3 space-y-2.5">
                {AREA_ORDER.map((area) => (
                  <div key={area}>
                    <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                      {IMPROVEMENT_AREA_LABELS[area].label}
                    </dt>
                    <dd className="mt-0.5 text-sm leading-6 text-on-surface-variant">{row.cells[area]}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

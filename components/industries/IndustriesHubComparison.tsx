import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { industriesContent } from "@/lib/content";

export function IndustriesHubComparison() {
  const { comparison } = industriesContent.hub;

  return (
    <section id="comparison" className="scroll-mt-28 bg-surface-low section-y">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          {comparison.eyebrow}
        </p>
        <h2 className="mt-2 max-w-3xl font-display text-2xl font-bold text-on-surface md:text-3xl">
          {comparison.title}
        </h2>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-outline-variant/50">
                <th className="py-3 pr-4 font-semibold text-on-surface md:pr-6">
                  {comparison.columns.industry}
                </th>
                <th className="py-3 pr-4 font-semibold text-on-surface md:pr-6">
                  {comparison.columns.generic}
                </th>
                <th className="py-3 font-semibold text-on-surface">{comparison.columns.stamped}</th>
              </tr>
            </thead>
            <tbody>
              {comparison.rows.map((row) => (
                <tr key={row.id} className="border-b border-outline-variant/30 align-top">
                  <td className="py-5 pr-4 md:pr-6">
                    <Link
                      href={row.href}
                      className="font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      {row.name}
                    </Link>
                  </td>
                  <td className="py-5 pr-4 text-on-surface-variant md:pr-6">{row.generic}</td>
                  <td className="py-5 text-on-surface-variant">{row.stamped}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}

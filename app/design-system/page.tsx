import type { Metadata } from "next";

import { BadgeStrip } from "@/components/ui/BadgeStrip";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProductFrame } from "@/components/ui/ProductFrame";
import { Section } from "@/components/ui/Section";
import { StatBand } from "@/components/ui/StatBand";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false },
};

const NEUTRALS = [
  { name: "neutral-25", hex: "#FCFCFB", varName: "--brand-neutral-25" },
  { name: "neutral-50", hex: "#F7F7F5", varName: "--brand-neutral-50" },
  { name: "neutral-100", hex: "#EFEEEB", varName: "--brand-neutral-100" },
  { name: "neutral-200", hex: "#E4E3DF", varName: "--brand-neutral-200" },
  { name: "neutral-400", hex: "#A8A6A0", varName: "--brand-neutral-400" },
  { name: "neutral-600", hex: "#5E5C57", varName: "--brand-neutral-600" },
  { name: "neutral-950", hex: "#0D0C0B", varName: "--brand-neutral-950" },
] as const;

const CORALS = [
  { name: "coral-100", hex: "#FFE3DC", varName: "--brand-coral-100" },
  { name: "coral-400", hex: "#FB7A61", varName: "--brand-coral-400" },
  { name: "coral-500", hex: "#F75440", varName: "--brand-coral-500" },
  { name: "coral-600", hex: "#D33C28", varName: "--brand-coral-600" },
  { name: "coral-800", hex: "#8A2719", varName: "--brand-coral-800" },
] as const;

const SEMANTIC = [
  { name: "verified", hex: "#1F8A70", varName: "--brand-verified" },
  { name: "watch", hex: "#B7791F", varName: "--brand-watch" },
  { name: "alarm", hex: "#C2362B", varName: "--brand-alarm" },
  { name: "info", hex: "#3B6FB6", varName: "--brand-info" },
  { name: "ink", hex: "#0B0B0A", varName: "--brand-inverse-surface" },
] as const;

function SwatchGrid({
  title,
  items,
}: {
  title: string;
  items: readonly { name: string; hex: string; varName: string }[];
}) {
  return (
    <div>
      <h3 className="font-display text-lg font-semibold tracking-tight">{title}</h3>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <li
            key={item.name}
            className="overflow-hidden rounded-[var(--radius-card)] border border-outline-variant bg-surface-lowest"
          >
            <div className="h-16" style={{ backgroundColor: `var(${item.varName})` }} />
            <div className="p-3">
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="mt-0.5 font-mono text-[11px] text-on-surface-variant">{item.hex}</p>
              <p className="mt-0.5 truncate font-mono text-[10px] text-on-surface-variant/70">
                {item.varName}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <main>
      <Section tone="light">
        <Eyebrow>Internal</Eyebrow>
        <h1 className="mt-4 font-display text-[length:var(--type-display-l)] font-semibold tracking-[-0.03em]">
          Design system
        </h1>
        <p className="mt-4 max-w-2xl text-on-surface-variant">
          Token and component reference for Stamped website v4. This page is noindex.
        </p>
      </Section>

      <Section tone="muted">
        <h2 className="font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em]">
          Colour
        </h2>
        <div className="mt-10 space-y-12">
          <SwatchGrid title="Neutrals" items={NEUTRALS} />
          <SwatchGrid title="Coral" items={CORALS} />
          <SwatchGrid title="Semantic" items={SEMANTIC} />
        </div>
      </Section>

      <Section tone="light">
        <h2 className="font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em]">
          Eyebrow
        </h2>
        <div className="mt-8 flex flex-wrap gap-8">
          <Eyebrow>Industrial AI</Eyebrow>
          <div className="rounded-[var(--radius-card)] bg-[var(--brand-inverse-surface)] px-4 py-3">
            <Eyebrow tone="dark">Where we&apos;re going</Eyebrow>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <h2 className="font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em]">
          Buttons
        </h2>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost →</Button>
          <div className="rounded-[var(--radius-card)] bg-[var(--brand-inverse-surface)] p-3">
            <Button variant="on-dark">On dark</Button>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button size="lg" href="/contact">
            Large link
          </Button>
          <Button size="md" href="/products">
            Medium link
          </Button>
        </div>
      </Section>

      <Section tone="light">
        <h2 className="font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em]">
          Badge strip
        </h2>
        <div className="mt-8 space-y-8">
          <BadgeStrip
            label="Backed by"
            partners={["NVIDIA Inception", "AWS for Startups"]}
            tone="light"
          />
          <div className="rounded-[var(--radius-card)] bg-[var(--brand-inverse-surface)] py-8">
            <BadgeStrip
              label="Backed by"
              partners={["NVIDIA Inception", "AWS for Startups"]}
              tone="dark"
            />
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <h2 className="font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em]">
          Stat band
        </h2>
        <div className="mt-10">
          <StatBand
            stats={[
              { prefix: "Upwards of", value: "30%", label: "fewer rejections" },
              { prefix: "Upwards of", value: "10%", label: "lower energy costs" },
            ]}
            caption="Seen across plants using Stamped."
            note="Measured against matched batches, in the plant's own numbers."
          />
        </div>
      </Section>

      <Section tone="dark">
        <h2 className="font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em]">
          Product frame
        </h2>
        <div className="mx-auto mt-10 max-w-3xl">
          <ProductFrame
            src="/images/product/v4/hero-owner.png"
            alt="Owner value view used as design-system sample"
            title="Demonstration plant · Value"
            glow
          />
        </div>
      </Section>
    </main>
  );
}

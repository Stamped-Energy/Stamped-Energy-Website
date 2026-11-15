import type { Metadata } from "next";

import { StampedMascot } from "@/components/mascot/StampedMascot";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <Section
      tone="dark"
      className="flex min-h-[70vh] items-center !pt-28 md:!pt-32"
      containerClassName="mx-auto max-w-lg text-center"
    >
      <div className="flex justify-center" aria-hidden>
        <StampedMascot mode="asleep" size={88} label="Sleeping Stamped mark" live />
      </div>
      <p className="mt-8 font-mono text-[12px] font-medium uppercase tracking-[0.08em] text-primary">
        404
      </p>
      <h1 className="mt-3 font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em]">
        This page isn&apos;t on the line.
      </h1>
      <p className="mt-3 text-sm leading-7 text-white/65">
        It may have moved, or it was never part of this plant.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button href="/" variant="on-dark">
          Home
        </Button>
        <Button href="/products" variant="ghost" className="text-white hover:bg-white/10">
          Products
        </Button>
        <Button href="/contact" variant="ghost" className="text-white hover:bg-white/10">
          Contact
        </Button>
      </div>
    </Section>
  );
}

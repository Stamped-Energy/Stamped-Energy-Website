import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type SectionTone = "light" | "muted" | "dark";

type SectionProps = {
  children: ReactNode;
  className?: string;
  tone?: SectionTone;
  id?: string;
  containerClassName?: string;
};

const toneClasses: Record<SectionTone, string> = {
  light: "bg-surface text-on-surface",
  muted: "bg-surface-low text-on-surface",
  dark: "bg-[var(--brand-inverse-surface)] text-inverse-on-surface",
};

export function Section({ children, className, tone = "light", id, containerClassName }: SectionProps) {
  return (
    <section id={id} className={cn("section-y", toneClasses[tone], className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

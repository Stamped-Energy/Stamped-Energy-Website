"use client";

import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { landingContent } from "@/lib/content";

export function WorkflowLoop() {
  const { workflow } = landingContent;

  return (
    <section className="bg-surface-low section-y">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={workflow.eyebrow}
            title={workflow.title}
            description={workflow.description}
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <Reveal className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workflow.steps.map((step, index) => (
            <article
              key={step.id}
              className="rounded-xl border border-outline-variant/50 bg-surface-lowest p-5 shadow-sm lg:last:col-span-1"
            >
              <p className="font-display text-sm font-extrabold text-primary">
                {String(index + 1).padStart(2, "0")} · {step.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-on-surface-variant">{step.description}</p>
            </article>
          ))}
        </Reveal>

        <Reveal className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-sm text-on-surface-variant">
            Full walkthrough with plant diagram on{" "}
            <Link href="/platform" className="font-semibold text-primary underline-offset-2 hover:underline">
              How it works
            </Link>
            .
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

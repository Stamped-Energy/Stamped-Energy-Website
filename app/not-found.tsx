import type { Metadata } from "next";
import Link from "next/link";

import { ChromeShell } from "@/components/layout/ChromeShell";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <ChromeShell>
      <section className="flex min-h-[60vh] items-center bg-surface section-y">
        <Container className="mx-auto max-w-lg text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">404</p>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-on-surface">
            Page not found
          </h1>
          <p className="mt-3 text-sm leading-7 text-on-surface-variant">
            The page you requested does not exist or may have moved.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/" variant="primary">
              Back to home
            </Button>
            <Link href="/contact" className="text-sm font-semibold text-primary hover:underline">
              Contact us
            </Link>
          </div>
        </Container>
      </section>
    </ChromeShell>
  );
}

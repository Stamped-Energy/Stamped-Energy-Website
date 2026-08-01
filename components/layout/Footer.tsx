import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { footerLinks, siteConfig } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-outline-variant/30 bg-secondary text-on-secondary">
      <Container className="py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr] md:gap-10">
          <div>
            <p className="font-display text-2xl font-extrabold tracking-tight md:text-3xl">
              {siteConfig.name}
            </p>
            <p className="mt-4 max-w-md text-sm leading-7 text-on-secondary/80 md:text-base">
              {siteConfig.tagline}
            </p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="mt-5 inline-block text-sm font-semibold text-inverse-primary transition-colors hover:text-on-secondary"
            >
              {siteConfig.contactEmail}
            </a>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-inverse-primary">
              Product
            </p>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      className="text-sm text-on-secondary/80 transition-colors hover:text-on-secondary"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-on-secondary/80 transition-colors hover:text-on-secondary"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-inverse-primary">
              Company
            </p>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-on-secondary/80 transition-colors hover:text-on-secondary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-on-secondary/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm text-on-secondary/70">
            Ready to see real-time prescriptions on your meters?
          </p>
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-md border border-primary bg-primary px-5 text-sm font-semibold text-on-primary transition-opacity hover:opacity-90"
          >
            Book a discovery call
          </Link>
        </div>

        <div className="mt-8 text-sm text-on-secondary/55">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}

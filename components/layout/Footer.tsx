import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { footerLinks, siteConfig } from "@/lib/content";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-inverse-primary">
        {title}
      </p>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
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
  );
}

export function Footer() {
  return (
    <footer className="bg-secondary text-on-secondary">
      <Container className="py-16 md:py-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.4fr)] lg:gap-16">
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/LogoOrange.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <span className="font-display text-xl font-bold tracking-tight">
                {siteConfig.name}
              </span>
            </Link>
            <h2 className="mt-8 font-display text-2xl font-bold tracking-tight text-balance md:text-3xl">
              See how quickly Stamped can deliver prescriptions for your plant
            </h2>
            <p className="mt-4 text-sm leading-7 text-on-secondary/75 md:text-base">
              No rip-and-replace. Full audit trail from day one.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-md border border-primary bg-primary px-6 text-sm font-semibold uppercase tracking-[0.06em] text-on-primary transition-opacity hover:opacity-90"
            >
              Book a Discovery Call
              <span aria-hidden>»</span>
            </Link>
          </div>

          <div className="hidden grid-cols-2 gap-10 sm:grid-cols-4 sm:gap-8 md:grid">
            <FooterColumn title="Solutions" links={footerLinks.solutions} />
            <FooterColumn title="Industries" links={footerLinks.industries} />
            <FooterColumn title="Resources" links={footerLinks.resources} />
            <FooterColumn title="Company" links={footerLinks.company} />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-on-secondary/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-on-secondary/55">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="text-sm text-on-secondary/70 transition-colors hover:text-inverse-primary"
          >
            {siteConfig.contactEmail}
          </a>
        </div>
      </Container>
    </footer>
  );
}

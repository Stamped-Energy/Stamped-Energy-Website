import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { navLinks, siteConfig } from "@/lib/content";
import { usesLightNavText } from "@/lib/layout/nav-theme";
import { cn } from "@/lib/utils";

type NavbarShellProps = {
  pathname: string;
};

/**
 * Server nav for home: top-level links only (mega-menu children hydrate post-LCP).
 */
export function NavbarShell({ pathname }: NavbarShellProps) {
  const lightNav = usesLightNavText(pathname);

  return (
    <header
      id="primary-header"
      className="fixed inset-x-0 top-0 z-50 bg-transparent transition-colors duration-300"
    >
      <Container className="flex h-16 items-center justify-between gap-3 sm:gap-4 md:h-[4.5rem]">
        <Link
          href="/"
          aria-label="Stamped home"
          className={cn(
            "flex shrink-0 items-center gap-2.5 rounded-md font-display text-[1.05rem] font-bold tracking-tight transition-colors",
            "min-h-11 min-w-11 justify-center p-2 -m-2 sm:min-h-0 sm:min-w-0 sm:justify-start sm:p-0 sm:m-0",
            lightNav ? "text-on-secondary hover:text-on-secondary/90" : "text-on-surface hover:text-on-surface/90",
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/LogoOrange.png" alt="" width={32} height={32} className="h-8 w-8 shrink-0" />
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <nav
          id="home-primary-nav"
          className="hidden flex-1 items-center justify-center gap-7 lg:flex xl:gap-9"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              data-nav-mega={link.megaMenu ?? undefined}
              className={cn(
                "rounded-md px-2.5 py-1.5 font-display text-[0.8rem] font-semibold uppercase tracking-[0.03em] transition-colors duration-200",
                lightNav
                  ? "text-on-secondary/80 hover:bg-on-secondary/10 hover:text-on-secondary"
                  : "text-on-surface/75 hover:bg-surface-low hover:text-on-surface",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className={cn(
              "inline-flex h-11 items-center justify-center rounded-md border px-5 text-sm font-semibold uppercase tracking-[0.06em] transition-colors",
              lightNav
                ? "border-on-secondary/50 text-on-secondary hover:border-on-secondary hover:bg-on-secondary/10"
                : "border-outline-variant text-on-surface hover:border-on-surface/45 hover:bg-on-surface/5",
            )}
          >
            {siteConfig.primaryCta.label}
          </Link>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border transition-colors lg:hidden",
            lightNav
              ? "border-on-secondary/40 text-on-secondary hover:border-on-secondary/60"
              : "border-outline-variant text-on-surface",
          )}
          aria-expanded="false"
          aria-label="Toggle navigation menu"
          data-nav-menu-toggle="true"
        >
          <span className="text-lg leading-none" aria-hidden>
            ≡
          </span>
        </button>
      </Container>

      <div
        id="home-mobile-nav-panel"
        className="hidden max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-outline-variant/30 bg-surface lg:hidden"
        aria-hidden
      />
    </header>
  );
}

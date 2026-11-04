"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { NavLinkItem } from "@/components/layout/NavLinkItem";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { navLinks, siteConfig } from "@/lib/content";
import { useLightNavText } from "@/lib/layout/use-light-nav";
import { cn } from "@/lib/utils";

const SolutionsMegaMenu = dynamic(
  () =>
    import("@/components/layout/SolutionsMegaMenu").then((mod) => ({
      default: mod.SolutionsMegaMenu,
    })),
  { ssr: false, loading: () => null },
);

const IndustriesMegaMenu = dynamic(
  () =>
    import("@/components/layout/IndustriesMegaMenu").then((mod) => ({
      default: mod.IndustriesMegaMenu,
    })),
  { ssr: false, loading: () => null },
);

const SolutionsMobileNav = dynamic(
  () =>
    import("@/components/layout/SolutionsMegaMenu").then((mod) => ({
      default: mod.SolutionsMobileNav,
    })),
  { ssr: false, loading: () => null },
);

const IndustriesMobileNav = dynamic(
  () =>
    import("@/components/layout/IndustriesMegaMenu").then((mod) => ({
      default: mod.IndustriesMobileNav,
    })),
  { ssr: false, loading: () => null },
);

function DesktopNavLink({
  link,
  lightNav,
  megaMenusReady,
}: {
  link: (typeof navLinks)[number];
  lightNav: boolean;
  megaMenusReady: boolean;
}) {
  if (link.megaMenu === "solutions") {
    return megaMenusReady ? <SolutionsMegaMenu lightNav={lightNav} /> : <NavLinkItem link={link} lightNav={lightNav} />;
  }
  if (link.megaMenu === "industries") {
    return megaMenusReady ? <IndustriesMegaMenu lightNav={lightNav} /> : <NavLinkItem link={link} lightNav={lightNav} />;
  }
  return <NavLinkItem link={link} lightNav={lightNav} />;
}

function MobileNavLink({
  link,
  onNavigate,
  megaMenusReady,
}: {
  link: (typeof navLinks)[number];
  onNavigate: () => void;
  megaMenusReady: boolean;
}) {
  if (link.megaMenu === "solutions") {
    return megaMenusReady ? (
      <SolutionsMobileNav onNavigate={onNavigate} />
    ) : (
      <NavLinkItem link={link} mobile onNavigate={onNavigate} />
    );
  }
  if (link.megaMenu === "industries") {
    return megaMenusReady ? (
      <IndustriesMobileNav onNavigate={onNavigate} />
    ) : (
      <NavLinkItem link={link} mobile onNavigate={onNavigate} />
    );
  }
  return <NavLinkItem link={link} mobile onNavigate={onNavigate} />;
}

export function Navbar() {
  const pathname = usePathname();
  const isBlogAdmin = pathname.startsWith("/blog/admin");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [megaMenusReady, setMegaMenusReady] = useState(false);
  const lightNavText = useLightNavText();
  const isLightNav = !isScrolled && !isMenuOpen && lightNavText;
  const showSolidHeader = isScrolled || isMenuOpen;

  useEffect(() => {
    if (isBlogAdmin) {
      return;
    }
    const enable = () => setMegaMenusReady(true);
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(enable, { timeout: 4000 });
    } else {
      window.setTimeout(enable, 1500);
    }
  }, [isBlogAdmin]);

  useEffect(() => {
    if (isMenuOpen) {
      setMegaMenusReady(true);
    }
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  if (isBlogAdmin) {
    return null;
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        showSolidHeader
          ? "border-b border-outline-variant/40 bg-surface"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-3 sm:gap-4 md:h-[4.5rem]">
        <Link
          href="/"
          aria-label="Stamped home"
          className={cn(
            "flex shrink-0 items-center gap-2.5 rounded-md font-display text-[1.05rem] font-bold tracking-tight transition-colors",
            "min-h-11 min-w-11 justify-center p-2 -m-2 sm:min-h-0 sm:min-w-0 sm:justify-start sm:p-0 sm:m-0",
            isLightNav ? "text-on-secondary hover:text-on-secondary/90" : "text-on-surface hover:text-on-surface/90",
          )}
        >
          <Image
            src="/LogoOrange.png"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 shrink-0"
            priority={pathname !== "/"}
            fetchPriority={pathname === "/" ? "low" : undefined}
          />
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-7 lg:flex xl:gap-9"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <DesktopNavLink key={link.label} link={link} lightNav={isLightNav} megaMenusReady={megaMenusReady} />
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <Button
            href="/contact"
            variant={isScrolled ? "primary" : "outline"}
            className={cn(
              "uppercase tracking-[0.06em]",
              !isScrolled &&
                isLightNav &&
                "border-on-secondary/50 text-on-secondary hover:border-on-secondary hover:bg-on-secondary/10",
            )}
          >
            {siteConfig.primaryCta.label}
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border transition-colors lg:hidden",
            isLightNav
              ? "border-on-secondary/40 text-on-secondary hover:border-on-secondary/60"
              : "border-outline-variant text-on-surface",
          )}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="text-lg leading-none" aria-hidden>
            {isMenuOpen ? "×" : "≡"}
          </span>
        </button>
      </Container>

      {isMenuOpen ? (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-outline-variant/30 bg-surface lg:hidden">
          <Container className="flex flex-col py-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {navLinks.map((link) => (
              <MobileNavLink
                key={link.label}
                link={link}
                onNavigate={() => setIsMenuOpen(false)}
                megaMenusReady={megaMenusReady || isMenuOpen}
              />
            ))}
            <Button href={siteConfig.primaryCta.href} variant="primary" className="mt-4 w-full uppercase tracking-[0.06em]">
              {siteConfig.primaryCta.label}
            </Button>
            {siteConfig.whatsappUrl ? (
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-md border border-outline-variant text-sm font-semibold text-on-surface"
              >
                WhatsApp us
              </a>
            ) : null}
          </Container>
        </div>
      ) : null}
    </header>
  );
}

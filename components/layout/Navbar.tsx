"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { IndustriesMegaMenu, IndustriesMobileNav } from "@/components/layout/IndustriesMegaMenu";
import { NavLinkItem } from "@/components/layout/NavLinkItem";
import { SolutionsMegaMenu, SolutionsMobileNav } from "@/components/layout/SolutionsMegaMenu";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { navLinks, siteConfig } from "@/lib/content";
import { useLightNavText } from "@/lib/layout/use-light-nav";
import { cn } from "@/lib/utils";

function DesktopNavLink({
  link,
  lightNav,
}: {
  link: (typeof navLinks)[number];
  lightNav: boolean;
}) {
  if (link.megaMenu === "solutions") {
    return <SolutionsMegaMenu lightNav={lightNav} />;
  }
  if (link.megaMenu === "industries") {
    return <IndustriesMegaMenu lightNav={lightNav} />;
  }
  return <NavLinkItem link={link} lightNav={lightNav} />;
}

function MobileNavLink({
  link,
  onNavigate,
}: {
  link: (typeof navLinks)[number];
  onNavigate: () => void;
}) {
  if (link.megaMenu === "solutions") {
    return <SolutionsMobileNav onNavigate={onNavigate} />;
  }
  if (link.megaMenu === "industries") {
    return <IndustriesMobileNav onNavigate={onNavigate} />;
  }
  return <NavLinkItem link={link} mobile onNavigate={onNavigate} />;
}

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lightNavText = useLightNavText();
  const isLightNav = !isScrolled && !isMenuOpen && lightNavText;
  const showSolidHeader = isScrolled || isMenuOpen;

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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        showSolidHeader
          ? "border-b border-outline-variant/30 bg-surface-lowest/95 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-3 sm:gap-4 md:h-20">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 font-display text-lg font-bold tracking-tight text-primary transition-colors hover:text-primary/90"
        >
          <Image
            src="/LogoOrange.png"
            alt={siteConfig.name}
            width={32}
            height={32}
            className="h-8 w-8 shrink-0"
            priority
          />
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-8"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <DesktopNavLink key={link.label} link={link} lightNav={isLightNav} />
          ))}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <Button href="/contact" variant="primary">
            Book a Discovery Call
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
          <span className="text-lg leading-none">{isMenuOpen ? "×" : "≡"}</span>
        </button>
      </Container>

      {isMenuOpen ? (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-outline-variant/30 bg-surface-lowest/98 backdrop-blur-md lg:hidden">
          <Container className="flex flex-col py-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
            {navLinks.map((link) => (
              <MobileNavLink
                key={link.label}
                link={link}
                onNavigate={() => setIsMenuOpen(false)}
              />
            ))}
            <Button href="/contact" variant="primary" className="mt-4 w-full">
              Book a Discovery Call
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

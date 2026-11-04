"use client";

import Link from "next/link";
import { useEffect } from "react";
import { createRoot, type Root } from "react-dom/client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getIndustryNavItems, navLinks, siteConfig } from "@/lib/content";
import { usesLightNavText } from "@/lib/layout/nav-theme";
import { solutionsContent } from "@/lib/content/solutions";

const solutionItems = solutionsContent.areas.map((area) => ({
  label: area.title,
  href: area.href,
}));

const industryItems = getIndustryNavItems();

function MobileNavPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <Container className="flex flex-col py-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
      {navLinks.map((link) => {
        if (link.megaMenu === "solutions") {
          return (
            <div key={link.label} className="border-b border-outline-variant/20">
              <p className="py-3.5 font-display text-[0.85rem] font-semibold uppercase tracking-[0.03em] text-on-surface">
                {link.label}
              </p>
              <ul className="pb-3 pl-1">
                {solutionItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-2.5 font-display text-[0.78rem] font-semibold uppercase tracking-[0.03em] text-on-surface/75 transition-colors hover:text-primary"
                      onClick={onNavigate}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        if (link.megaMenu === "industries") {
          return (
            <div key={link.label} className="border-b border-outline-variant/20">
              <p className="py-3.5 font-display text-[0.85rem] font-semibold uppercase tracking-[0.03em] text-on-surface">
                Industries
              </p>
              <ul className="pb-3 pl-1">
                {industryItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-2.5 font-display text-[0.78rem] font-semibold uppercase tracking-[0.03em] text-on-surface/75 transition-colors hover:text-primary"
                      onClick={onNavigate}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        return (
          <Link
            key={link.label}
            href={link.href}
            className="min-h-12 border-b border-outline-variant/20 py-3.5 font-display text-[0.85rem] font-semibold uppercase tracking-[0.03em] text-on-surface"
            onClick={onNavigate}
          >
            {link.label}
          </Link>
        );
      })}
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
  );
}

let panelRoot: Root | null = null;

/** Scroll styling + mobile drawer + post-LCP mega menus for the home server nav shell. */
export function HomeNavEnhancer() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    let panelMounted = false;

    const mountPanel = () => {
      if (panelMounted) {
        return;
      }
      const panel = document.getElementById("home-mobile-nav-panel");
      if (!panel) {
        return;
      }
      panelMounted = true;
      panel.removeAttribute("aria-hidden");
      panelRoot?.unmount();
      panelRoot = createRoot(panel);
      panelRoot.render(
        <MobileNavPanel
          onNavigate={() => {
            panel.classList.add("hidden");
            document.body.style.overflow = "";
          }}
        />,
      );
    };

    import("@/lib/motion/wait-for-lcp").then(({ waitForLcp }) => {
      void waitForLcp().then(() => {
        if (cancelled) {
          return;
        }

        const header = document.getElementById("primary-header");
        const toggle = header?.querySelector<HTMLButtonElement>("[data-nav-menu-toggle]");
        const panel = document.getElementById("home-mobile-nav-panel");
        if (!header || !toggle || !panel) {
          return;
        }

        let isMenuOpen = false;

        const syncScroll = () => {
          const scrolled = window.scrollY > 24;
          header.classList.toggle("border-b", scrolled || isMenuOpen);
          header.classList.toggle("border-outline-variant/40", scrolled || isMenuOpen);
          header.classList.toggle("bg-surface", scrolled || isMenuOpen);
          header.classList.toggle("bg-transparent", !scrolled && !isMenuOpen);
        };

        const setMenuOpen = (open: boolean) => {
          isMenuOpen = open;
          toggle.setAttribute("aria-expanded", open ? "true" : "false");
          if (open) {
            mountPanel();
          }
          panel.classList.toggle("hidden", !open);
          document.body.style.overflow = open ? "hidden" : "";
          syncScroll();
        };

        const onScroll = () => syncScroll();
        const onToggle = () => setMenuOpen(!isMenuOpen);

        syncScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        toggle.addEventListener("click", onToggle);

        void import("@/components/layout/SolutionsMegaMenu").then(({ SolutionsMegaMenu }) => {
          void import("@/components/layout/IndustriesMegaMenu").then(({ IndustriesMegaMenu }) => {
            const nav = document.getElementById("home-primary-nav");
            if (!nav || cancelled) {
              return;
            }
            const lightNav = usesLightNavText("/");
            nav.querySelectorAll<HTMLAnchorElement>("a[data-nav-mega]").forEach((anchor) => {
              const slot = document.createElement("span");
              slot.className = "inline-flex";
              anchor.replaceWith(slot);
              const root = createRoot(slot);
              if (anchor.dataset.navMega === "solutions") {
                root.render(<SolutionsMegaMenu lightNav={lightNav} />);
              } else if (anchor.dataset.navMega === "industries") {
                root.render(<IndustriesMegaMenu lightNav={lightNav} />);
              }
            });
          });
        });

        cleanup = () => {
          window.removeEventListener("scroll", onScroll);
          toggle.removeEventListener("click", onToggle);
          document.body.style.overflow = "";
          panelRoot?.unmount();
          panelRoot = null;
        };
      });
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { marketingPath } from "@/lib/config/admin-host";

type AdminShellProps = {
  children: React.ReactNode;
  userName?: string;
  userEmail?: string;
};

const NAV = [
  { href: "/blog/admin", label: "Dashboard", exact: true },
  { href: "/blog/admin/posts", label: "Blog posts" },
  { href: "/blog/admin/case-studies", label: "Case studies" },
  { href: "/blog/admin/inquiries", label: "Contact inquiries" },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({ children, userName, userEmail }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/blog/auth/logout", { method: "POST" });
    router.push("/blog/admin/login");
    router.refresh();
  };

  const sidebar = (
    <>
      <div className="border-b border-[var(--admin-sidebar-border)] px-4 py-4">
        <Link href="/blog/admin" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <Image src="/LogoOrange.png" alt="Stamped" width={28} height={28} className="h-7 w-7" />
          <div>
            <p className="text-sm font-semibold text-[var(--admin-sidebar-text)]">Stamped</p>
            <p className="text-xs text-[var(--admin-sidebar-muted)]">Admin</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-[var(--admin-sidebar-active)] text-[var(--admin-sidebar-text)]"
                  : "text-[var(--admin-sidebar-muted)] hover:bg-[var(--admin-sidebar-hover)] hover:text-[var(--admin-sidebar-text)]",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[var(--admin-sidebar-border)] p-3">
        {userName ? (
          <div className="mb-3 rounded-lg bg-[var(--admin-sidebar-hover)] px-3 py-2.5">
            <p className="truncate text-sm font-medium text-[var(--admin-sidebar-text)]">{userName}</p>
            {userEmail ? (
              <p className="truncate text-xs text-[var(--admin-sidebar-muted)]">{userEmail}</p>
            ) : null}
          </div>
        ) : null}
        <div className="space-y-1">
          <Link
            href={marketingPath("/blog")}
            target="_blank"
            className="flex w-full items-center justify-center rounded-lg border border-[var(--admin-sidebar-border)] px-3 py-2 text-xs font-medium text-[var(--admin-sidebar-muted)] transition-colors hover:bg-[var(--admin-sidebar-hover)] hover:text-[var(--admin-sidebar-text)]"
          >
            View public blog
          </Link>
          <Link
            href={marketingPath("/case-studies")}
            target="_blank"
            className="flex w-full items-center justify-center rounded-lg border border-[var(--admin-sidebar-border)] px-3 py-2 text-xs font-medium text-[var(--admin-sidebar-muted)] transition-colors hover:bg-[var(--admin-sidebar-hover)] hover:text-[var(--admin-sidebar-text)]"
          >
            View case studies
          </Link>
          <Link
            href={marketingPath("/contact")}
            target="_blank"
            className="flex w-full items-center justify-center rounded-lg border border-[var(--admin-sidebar-border)] px-3 py-2 text-xs font-medium text-[var(--admin-sidebar-muted)] transition-colors hover:bg-[var(--admin-sidebar-hover)] hover:text-[var(--admin-sidebar-text)]"
          >
            View contact page
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-[var(--admin-sidebar-muted)] transition-colors hover:bg-[var(--admin-sidebar-hover)] hover:text-[var(--admin-sidebar-text)]"
          >
            Sign out
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="admin-cms min-h-screen">
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-[#0f1713]/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[15.5rem] flex-col bg-[var(--admin-sidebar)] transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {sidebar}
      </aside>

      <div className="flex min-h-screen flex-col lg:pl-[15.5rem]">
        <header className="sticky top-0 z-30 border-b border-[var(--admin-border)] bg-[var(--admin-surface)]/95 backdrop-blur-sm lg:hidden">
          <div className="flex h-14 items-center px-4">
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--admin-border)] text-[var(--admin-text-secondary)]"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 md:px-6 md:py-8">{children}</main>
      </div>
    </div>
  );
}

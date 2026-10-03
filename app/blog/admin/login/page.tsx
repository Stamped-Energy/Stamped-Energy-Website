import type { Metadata } from "next";
import { Suspense } from "react";

import { AdminLoginForm } from "@/components/blog/admin/AdminLoginForm";

import "@/styles/admin.css";

export const metadata: Metadata = {
  title: "Blog Admin Login",
  robots: { index: false, follow: false },
};

export default function BlogAdminLoginPage() {
  return (
    <div className="admin-cms flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="admin-panel p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--admin-sidebar)]">
              <span className="text-sm font-bold text-[var(--admin-sidebar-text)]">SE</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--admin-text)]">Stamped</p>
              <p className="text-xs text-[var(--admin-text-muted)]">Blog CMS</p>
            </div>
          </div>
          <h1 className="text-xl font-semibold text-[var(--admin-text)]">Sign in</h1>
          <p className="mt-1 text-sm text-[var(--admin-text-secondary)]">
            Manage blog posts and publishing.
          </p>
          <div className="mt-6">
            <Suspense fallback={<p className="text-sm text-[var(--admin-text-muted)]">Loading...</p>}>
              <AdminLoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

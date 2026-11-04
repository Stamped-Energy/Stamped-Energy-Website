import type { Metadata } from "next";
import { Suspense } from "react";

import { ContactInquiryWorkspace } from "@/components/blog/admin/ContactInquiryWorkspace";
import { AdminPageHeader } from "@/components/blog/admin/ui/AdminPageHeader";
import { listContactSubmissions } from "@/lib/contact/submissions";

export const metadata: Metadata = {
  title: "Contact Inquiries",
  robots: { index: false, follow: false },
};

type InquiriesPageProps = {
  searchParams: Promise<{ id?: string }>;
};

export default async function BlogAdminInquiriesPage({ searchParams }: InquiriesPageProps) {
  const { id } = await searchParams;
  const inquiries = await listContactSubmissions();

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <AdminPageHeader
        title="Contact inquiries"
        description="Select a submission to read full details. Click WhatsApp or email to copy."
        secondaryAction={{ label: "Public contact page", href: "/contact" }}
      />
      <Suspense fallback={<p className="text-sm text-[var(--admin-text-muted)]">Loading...</p>}>
        <ContactInquiryWorkspace initialInquiries={inquiries} initialSelectedId={id ?? null} />
      </Suspense>
    </div>
  );
}

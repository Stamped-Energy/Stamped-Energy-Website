"use client";

import type { ContactSubmissionRecord } from "@/lib/contact/submissions";
import { formatInquiryDate, whatsappHref } from "@/lib/contact/format";
import { CopyableField } from "@/components/blog/admin/ui/CopyableField";
import { cn } from "@/lib/utils";

type ContactInquiryDetailProps = {
  inquiry: ContactSubmissionRecord | null;
  onBack?: () => void;
  showBack?: boolean;
};

function DetailRow({
  label,
  value,
  empty = "Not provided",
}: {
  label: string;
  value: string | null | undefined;
  empty?: string;
}) {
  const display = value?.trim() ? value : empty;
  const isEmpty = !value?.trim();

  return (
    <div className="rounded-lg border border-[var(--admin-border-subtle)] bg-[var(--admin-panel)] px-4 py-3.5">
      <p className="text-[11px] font-medium uppercase tracking-wide text-[var(--admin-text-muted)]">
        {label}
      </p>
      <p
        className={cn(
          "mt-1.5 text-sm leading-6",
          isEmpty ? "text-[var(--admin-text-muted)]" : "font-medium text-[var(--admin-text)]",
        )}
      >
        {display}
      </p>
    </div>
  );
}

export function ContactInquiryDetail({
  inquiry,
  onBack,
  showBack = false,
}: ContactInquiryDetailProps) {
  if (!inquiry) {
    return (
      <div className="admin-panel flex min-h-[20rem] flex-col items-center justify-center px-6 py-16 text-center">
        <p className="text-base font-semibold text-[var(--admin-text)]">Select an inquiry</p>
        <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--admin-text-secondary)]">
          Choose a submission from the list to read full contact details, copy WhatsApp or email,
          and follow up.
        </p>
      </div>
    );
  }

  const waLink = whatsappHref(inquiry.whatsapp);

  return (
    <article className="admin-panel overflow-hidden">
      <div className="border-b border-[var(--admin-border-subtle)] px-5 py-5 md:px-6 md:py-6">
        {showBack && onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--admin-accent)] hover:underline lg:hidden"
          >
            <span aria-hidden="true">←</span>
            Back to list
          </button>
        ) : null}

        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-muted)]">
          Inquiry details
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-[var(--admin-text)] md:text-2xl">
          {inquiry.name}
        </h2>
        <p className="mt-1 text-sm text-[var(--admin-text-secondary)]">{inquiry.company}</p>
        <time
          dateTime={new Date(inquiry.createdAt).toISOString()}
          className="mt-3 block text-xs text-[var(--admin-text-muted)]"
        >
          Received {formatInquiryDate(inquiry.createdAt)}
        </time>
      </div>

      <div className="space-y-6 px-5 py-5 md:px-6 md:py-6">
        <section>
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--admin-text-muted)]">
            How to reach them
          </h3>
          <p className="mt-1 text-xs text-[var(--admin-text-secondary)]">
            Click a number or email to copy it to your clipboard.
          </p>
          <div className="mt-3 space-y-2.5">
            {inquiry.whatsapp ? (
              <div className="space-y-2">
                <CopyableField label="WhatsApp" value={inquiry.whatsapp} />
                {waLink ? (
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-btn admin-btn-secondary inline-flex w-full justify-center sm:w-auto"
                  >
                    Open in WhatsApp
                  </a>
                ) : null}
              </div>
            ) : null}
            {inquiry.email ? (
              <div className="space-y-2">
                <CopyableField label="Email" value={inquiry.email} />
                <a
                  href={`mailto:${inquiry.email}`}
                  className="admin-btn admin-btn-secondary inline-flex w-full justify-center sm:w-auto"
                >
                  Open in email client
                </a>
              </div>
            ) : null}
            {!inquiry.whatsapp && !inquiry.email ? (
              <p className="text-sm text-[var(--admin-text-muted)]">No contact method on file.</p>
            ) : null}
          </div>
        </section>

        <section>
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--admin-text-muted)]">
            Plant details
          </h3>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            <DetailRow label="Plant location" value={inquiry.location} />
            <DetailRow label="Plant details" value={inquiry.billSize} />
          </div>
        </section>
      </div>
    </article>
  );
}

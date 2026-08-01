import { Resend } from "resend";

import type { ContactSubmissionInput } from "@/lib/contact/submissions";

const DEFAULT_NOTIFY_EMAILS = [
  "vinayakraizada@gmail.com",
  "stamped.energy@gmail.com",
  "utsosarkar1@gmail.com",
];

function getNotifyRecipients(): string[] {
  const fromEnv = process.env.CONTACT_NOTIFY_EMAILS?.trim();
  if (!fromEnv) {
    return DEFAULT_NOTIFY_EMAILS;
  }

  return fromEnv
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

function getFromAddress(): string {
  return process.env.CONTACT_FROM_EMAIL?.trim() || "Stamped Energy <stamped.energy@gmail.com>";
}

function displayValue(value: string | null | undefined): string {
  return value?.trim() ? value : "-";
}

function buildEmailHtml(submission: ContactSubmissionInput, receivedAt: string): string {
  const rows = [
    ["Name", submission.name],
    ["Company", submission.company],
    ["Plant location", displayValue(submission.location)],
    ["Monthly bill (approx.)", displayValue(submission.billSize)],
    ["WhatsApp", displayValue(submission.whatsapp)],
    ["Email", displayValue(submission.email)],
    ["Received at", receivedAt],
  ];

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #e3e7e1;color:#5a403c;font-size:13px;">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #e3e7e1;color:#191c1a;font-size:13px;font-weight:600;">${value}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;color:#191c1a;">
      <p style="font-size:14px;color:#5a403c;margin:0 0 16px;">New discovery call request from stamped.work</p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e3e7e1;border-radius:8px;overflow:hidden;">
        ${tableRows}
      </table>
    </div>
  `;
}

export async function sendContactNotification(
  submission: ContactSubmissionInput,
): Promise<{ sent: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set - submission saved but email not sent.");
    return { sent: false, error: "RESEND_API_KEY not configured" };
  }

  const resend = new Resend(apiKey);
  const receivedAt = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const recipients = getNotifyRecipients();

  const { error } = await resend.emails.send({
    from: getFromAddress(),
    to: recipients,
    subject: `Discovery call request - ${submission.company}`,
    html: buildEmailHtml(submission, receivedAt),
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return { sent: false, error: error.message };
  }

  return { sent: true };
}

"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/Button";
import { contactContent } from "@/lib/content/contact";
import { validateContactSubmission } from "@/lib/contact/validate";
import { cn } from "@/lib/utils";

type ContactFormState = {
  name: string;
  company: string;
  location: string;
  /** "Main processes" field; sent as `billSize` together with focus and reachVia. */
  billSize: string;
  focus: string;
  reachVia: string;
  whatsapp: string;
  email: string;
};

type ContactFieldKey = keyof ContactFormState;

const initialState: ContactFormState = {
  name: "",
  company: "",
  location: "",
  billSize: "",
  focus: "",
  reachVia: "",
  whatsapp: "",
  email: "",
};

const { contactForm } = contactContent;

/** Folds the plant-detail fields into the existing `billSize` column so no schema change is needed. */
function buildPayload(state: ContactFormState) {
  const { focus, reachVia, billSize, ...rest } = state;
  const details = [
    billSize.trim() ? `Processes: ${billSize.trim()}` : "",
    focus ? `On their mind: ${focus}` : "",
    reachVia ? `Reach via: ${reachVia}` : "",
  ].filter(Boolean);
  return { ...rest, billSize: details.join(" | ") };
}

function FieldLabel({
  htmlFor,
  label,
  optional,
}: {
  htmlFor: string;
  label: string;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant"
    >
      <span>{label}</span>
      {optional ? (
        <span className="rounded-md bg-surface-container px-1.5 py-0.5 text-[10px] font-medium normal-case tracking-normal text-on-surface-variant">
          {contactForm.optionalLabel}
        </span>
      ) : null}
    </label>
  );
}

const inputClassName = cn(
  "h-12 w-full rounded-md border border-outline-variant bg-surface-lowest px-4 text-sm text-on-surface",
  "outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/25",
);

export function ContactForm() {
  const [formState, setFormState] = useState<ContactFormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<ContactFieldKey, string>>>({});

  const updateField = (field: ContactFieldKey, value: string) => {
    setFormState((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const payload = buildPayload(formState);
    const validation = validateContactSubmission(payload);
    if (!validation.ok) {
      setStatus("error");
      setErrorMessage(validation.error);
      if (validation.field) {
        setFieldErrors({ [validation.field]: validation.error });
      }
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? contactForm.errorMessage);
      }

      setStatus("success");
      setFormState(initialState);
      setFieldErrors({});
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : contactForm.errorMessage,
      );
    }
  };

  const renderError = (field: ContactFieldKey) =>
    fieldErrors[field] ? (
      <p className="mt-1.5 text-xs font-medium text-error">{fieldErrors[field]}</p>
    ) : null;

  return (
    <form onSubmit={onSubmit} className="space-y-5" suppressHydrationWarning>
      <div>
        <FieldLabel htmlFor="name" label={contactForm.fields.name} />
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={formState.name}
          onChange={(event) => updateField("name", event.target.value)}
          className={cn(inputClassName, fieldErrors.name && "border-error focus:border-error focus:ring-error/25")}
        />
        {renderError("name")}
      </div>

      <div>
        <FieldLabel htmlFor="company" label={contactForm.fields.company} />
        <input
          id="company"
          name="company"
          type="text"
          required
          autoComplete="organization"
          value={formState.company}
          onChange={(event) => updateField("company", event.target.value)}
          className={cn(
            inputClassName,
            fieldErrors.company && "border-error focus:border-error focus:ring-error/25",
          )}
        />
        {renderError("company")}
      </div>

      <div>
        <FieldLabel htmlFor="location" label={contactForm.fields.location} optional />
        <input
          id="location"
          name="location"
          type="text"
          autoComplete="address-level2"
          value={formState.location}
          onChange={(event) => updateField("location", event.target.value)}
          className={inputClassName}
        />
      </div>

      <div>
        <FieldLabel htmlFor="billSize" label={contactForm.fields.processes} optional />
        <input
          id="billSize"
          name="processes"
          type="text"
          value={formState.billSize}
          onChange={(event) => updateField("billSize", event.target.value)}
          className={inputClassName}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="focus" label={contactForm.fields.focus} optional />
          <select
            id="focus"
            name="focus"
            value={formState.focus}
            onChange={(event) => updateField("focus", event.target.value)}
            className={inputClassName}
          >
            <option value="">{contactForm.selectPlaceholder}</option>
            {contactForm.focusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel htmlFor="reachVia" label={contactForm.fields.reachVia} optional />
          <select
            id="reachVia"
            name="reachVia"
            value={formState.reachVia}
            onChange={(event) => updateField("reachVia", event.target.value)}
            className={inputClassName}
          >
            <option value="">{contactForm.selectPlaceholder}</option>
            {contactForm.reachViaOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-lg border border-outline-variant/60 bg-surface-container-low/40 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-on-surface-variant">
          How should we reach you?
        </p>
        <p className="mt-1 text-sm text-on-surface-variant">{contactForm.contactMethodHint}</p>

        <div className="mt-4 space-y-4">
          <div>
            <FieldLabel htmlFor="whatsapp" label={contactForm.fields.whatsapp} />
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="e.g. 9876543210"
              value={formState.whatsapp}
              onChange={(event) => updateField("whatsapp", event.target.value)}
              className={cn(
                inputClassName,
                fieldErrors.whatsapp && "border-error focus:border-error focus:ring-error/25",
              )}
            />
            {renderError("whatsapp")}
          </div>

          <div>
            <FieldLabel htmlFor="email" label={contactForm.fields.email} />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={formState.email}
              onChange={(event) => updateField("email", event.target.value)}
              className={cn(
                inputClassName,
                fieldErrors.email && "border-error focus:border-error focus:ring-error/25",
              )}
            />
            {renderError("email")}
          </div>
        </div>
      </div>

      <Button type="submit" variant="primary" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Submitting..." : contactForm.submitLabel}
      </Button>

      {status === "success" ? (
        <p className="text-sm font-medium text-primary">{contactForm.successMessage}</p>
      ) : null}

      {status === "error" && !Object.keys(fieldErrors).length ? (
        <p className="text-sm font-medium text-error">{errorMessage}</p>
      ) : null}
    </form>
  );
}

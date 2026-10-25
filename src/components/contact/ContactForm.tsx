"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

// ── Schema (mirrors server-side) ──────────────────────────────────────────
const schema = z.object({
  name: z.string().min(2, "At least 2 characters").max(100),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(4, "At least 4 characters").max(200),
  message: z.string().min(20, "At least 20 characters").max(5000),
  company_fax_trap: z.string().optional(), // honeypot
});

type FormValues = z.infer<typeof schema>;

// ── Field component ───────────────────────────────────────────────────────
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-mono uppercase tracking-widest text-muted">
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs text-signal flex items-center gap-1.5" role="alert">
          <AlertCircle className="w-3 h-3" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase =
  "w-full bg-surface border border-border rounded px-4 py-3 text-sm text-text placeholder:text-muted/50 " +
  "focus:outline-none focus:ring-2 focus:ring-signal/40 focus:border-signal/60 transition-colors";

// ── Main form ─────────────────────────────────────────────────────────────
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormValues) {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean };
      if (json.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <CheckCircle2 className="w-10 h-10 text-signal" aria-hidden="true" />
        <p className="font-display font-bold text-xl uppercase tracking-tight text-text">
          Transmission Received
        </p>
        <p className="text-sm text-muted max-w-xs">
          Your message is on its way. I&apos;ll respond within 48 hours — usually faster.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn-secondary text-xs mt-2"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
      aria-label="Contact form"
    >
      {/* Honeypot — hidden from real users, catches bots */}
      <div className="hidden" aria-hidden="true">
        <input
          {...register("company_fax_trap")}
          tabIndex={-1}
          autoComplete="off"
          type="text"
          name="company_fax_trap"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Field label="Name" error={errors.name?.message}>
          <input
            {...register("name")}
            type="text"
            autoComplete="name"
            placeholder="Your full name"
            className={inputBase}
          />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={inputBase}
          />
        </Field>
      </div>

      <Field label="Subject" error={errors.subject?.message}>
        <input
          {...register("subject")}
          type="text"
          placeholder="What brings you here?"
          className={inputBase}
        />
      </Field>

      <Field label="Message" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={6}
          placeholder="Describe the project, collaboration, or question in as much detail as you like…"
          className={`${inputBase} resize-y min-h-[140px]`}
        />
      </Field>

      {status === "error" && (
        <p className="text-xs text-signal flex items-center gap-1.5" role="alert">
          <AlertCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
          Something went wrong. Please try again or email me directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="w-4 h-4" aria-hidden="true" />
            Send Message
          </>
        )}
      </button>
    </form>
  );
}

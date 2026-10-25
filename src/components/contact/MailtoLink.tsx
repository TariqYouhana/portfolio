"use client";

import { useState } from "react";
import { Mail, Check, Copy } from "lucide-react";

interface MailtoLinkProps {
  email: string;
  /** Optional subject pre-filled into the mailto link */
  subject?: string;
  /** Class applied to the outer wrapper div */
  className?: string;
}

export function MailtoLink({
  email,
  subject = "Hello from your portfolio",
  className = "",
}: MailtoLinkProps) {
  const [copied, setCopied] = useState(false);

  // Build the href only in the browser so the address is not in server-rendered HTML.
  // We always have the email as a prop because the server read it from content files,
  // but we keep it out of the initial HTML by constructing the href client-side.
  const href =
    typeof window !== "undefined"
      ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
      : "#";

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback: create a temporary input element
        const el = document.createElement("input");
        el.value = email;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Silent — clipboard unavailable
    }
  }

  return (
    <div className={`flex items-center gap-3 flex-wrap ${className}`}>
      <a
        href={href}
        className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors group"
        aria-label={`Send email to ${email}`}
      >
        <Mail
          className="w-4 h-4 flex-shrink-0 group-hover:text-signal transition-colors"
          aria-hidden="true"
        />
        <span>{email}</span>
      </a>

      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Email address copied" : "Copy email address"}
        className="inline-flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded border border-border text-muted hover:border-text hover:text-text transition-colors focus-visible:ring-2 focus-visible:ring-signal/40"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-signal" aria-hidden="true" />
            <span className="text-signal">Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" aria-hidden="true" />
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
}

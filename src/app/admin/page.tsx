import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Portal · Tariq Youhana Leon",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPlaceholderPage() {
  return (
    <div className="w-full max-w-xl mx-auto px-6 py-16 space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-text transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK TO PUBLIC SITE</span>
      </Link>

      <div className="p-8 rounded-glass glass-panel border border-border space-y-6 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center">
          <Lock className="w-5 h-5 text-signal" />
        </div>
        <div className="space-y-2">
          <span className="font-mono text-xs text-signal font-semibold">
            KEYSTATIC CMS // PHASE_01_PENDING
          </span>
          <h1 className="font-display text-2xl font-bold uppercase">
            Private Admin Area
          </h1>
          <p className="text-sm text-muted leading-relaxed">
            This route is reserved for the Git-backed Keystatic CMS administration panel. GitHub authentication and content schemas will be configured in Phase 1.
          </p>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-center gap-2 text-xs font-mono text-muted">
          <ShieldCheck className="w-4 h-4 text-signal" />
          <span>ROUTE CONFIGURED WITH NOINDEX DIRECTIVE</span>
        </div>
      </div>
    </div>
  );
}

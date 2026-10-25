import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "404 — Lost in the Archives",
  description: "The requested coordinate does not exist in this catalog.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
      {/* Signal dot */}
      <div className="flex items-center gap-2 mb-8" aria-hidden="true">
        <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
        <span className="font-mono text-xs text-signal uppercase tracking-widest font-semibold">
          ERROR 404 // CHAMBER_NOT_FOUND
        </span>
      </div>

      {/* Glitch number */}
      <div
        className="font-display font-black text-[clamp(5rem,20vw,14rem)] leading-none tracking-tight text-text/10 select-none mb-6"
        aria-hidden="true"
      >
        404
      </div>

      {/* Copy */}
      <div className="space-y-3 max-w-md mb-10">
        <h1 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-text">
          Lost in the Archives
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          The requested coordinate or room does not exist in this catalog. It may have been
          moved, renamed, or never existed. Return to the main foyer and navigate from there.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/" className="btn-primary inline-flex items-center gap-2">
          <Home className="w-4 h-4" aria-hidden="true" />
          Return to Homepage
        </Link>
        <Link href="/projects" className="btn-secondary inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Browse Projects
        </Link>
      </div>

      {/* Decorative monochrome line */}
      <div
        className="mt-16 w-px h-16 bg-gradient-to-b from-border to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

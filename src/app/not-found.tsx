import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center px-6 py-20 text-center space-y-6">
      <Logo size={80} />
      <div className="space-y-2">
        <span className="font-mono text-xs text-signal font-semibold tracking-widest block">
          ERROR 404 // CHAMBER_NOT_FOUND
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight">
          Lost in the Archives
        </h1>
        <p className="text-sm text-muted max-w-md mx-auto leading-relaxed">
          The requested coordinate or room does not exist in this catalog. Return to the main foyer.
        </p>
      </div>

      <div className="pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-text text-bg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}

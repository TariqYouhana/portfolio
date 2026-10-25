import Link from "next/link";
import { ArrowLeft, Camera } from "lucide-react";

export default function GalleryPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-12 space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-text transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK TO HOME</span>
      </Link>

      <div className="space-y-3">
        <span className="font-mono text-xs uppercase text-signal tracking-widest block">
          JOURNAL // 3D_COVERFLOW
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight">
          Visual Journal & Photography
        </h1>
        <p className="text-base text-muted max-w-2xl leading-relaxed">
          Based on Reference 04: A 3D fanned journal coverflow featuring double-page spreads, travel narratives, and high-fidelity photo documentation. Scheduled for Phase 5.
        </p>
      </div>

      <div className="p-12 rounded-glass glass-panel border border-border flex flex-col items-center justify-center text-center space-y-4">
        <Camera className="w-12 h-12 text-signal opacity-80" />
        <h2 className="font-display text-2xl font-bold uppercase">Journal Coverflow Ready For Build</h2>
        <p className="text-sm text-muted max-w-md">
          Phase 5 will assemble the 3D coverflow carousel with open spreads, perspective tilt, album filters, and deep links.
        </p>
      </div>
    </div>
  );
}

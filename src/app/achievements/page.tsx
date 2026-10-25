import Link from "next/link";
import { ArrowLeft, Award, Trophy } from "lucide-react";

export default function AchievementsPage() {
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
          HONOURS // REPUTATION_LOG
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight">
          Trophy Cabinet & Records
        </h1>
        <p className="text-base text-muted max-w-2xl leading-relaxed">
          Dark glass cabinet with spotlit shelves: Victories, Podium finishes, and verified Participations. Never invented, labelled with total honesty. Scheduled for Phase 6.
        </p>
      </div>

      <div className="p-12 rounded-glass glass-panel border border-border flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-4 rounded-full bg-surface border border-gold/40">
          <Trophy className="w-10 h-10 text-gold" />
        </div>
        <h2 className="font-display text-2xl font-bold uppercase">Spotlit Shelves Under Construction</h2>
        <p className="text-sm text-muted max-w-md">
          Phase 6 will render the interactive trophy cabinet, metric counters, and certificate verification drawer.
        </p>
      </div>
    </div>
  );
}

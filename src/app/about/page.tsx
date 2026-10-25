import Link from "next/link";
import { ArrowLeft, User, FileText } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 md:px-10 py-12 space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-text transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK TO HOME</span>
      </Link>

      <div className="space-y-3">
        <span className="font-mono text-xs uppercase text-signal tracking-widest block">
          DOSSIER // BIOGRAPHY
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight">
          About Tariq Youhana Leon
        </h1>
        <p className="text-base text-muted max-w-2xl leading-relaxed">
          Full biography, education milestones, research trajectory, interests, and active focus. Scheduled for Phase 7.
        </p>
      </div>

      <div className="p-8 rounded-glass glass-panel border border-border space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-surface border border-border">
            <User className="w-6 h-6 text-signal" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg uppercase">Tariq Youhana Leon</h3>
            <p className="text-xs font-mono text-muted">Founder @ Tenstral Technologies</p>
          </div>
        </div>
        <p className="text-sm text-muted leading-relaxed">
          A personal portfolio that holds all of me: data and software work first, then everything else (photography, writing, film, history, poetry, achievements). The principle is one clear front door, many rooms.
        </p>
        <div className="pt-2">
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-text text-bg text-xs font-mono font-medium hover:opacity-90 transition-opacity"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Download CV (PDF)</span>
          </a>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";

export default function ProjectsPage() {
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
          FILE_STACK // 01-05
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight">
          Projects & Case Studies
        </h1>
        <p className="text-base text-muted max-w-2xl leading-relaxed">
          Physical folder switcher architecture scheduled for build in Phase 3. Real project records, honest status tags, and technical post-mortems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {[
          { name: "Tenstral Technologies", slug: "tenstral", status: "Live", color: "var(--earth-olive)" },
          { name: "HIMA AI Platform", slug: "hima", status: "In development", color: "var(--earth-slate)" },
          { name: "Historical Atlas", slug: "historical-atlas", status: "Concept", color: "var(--earth-tan)" },
          { name: "COLORPLAN Web", slug: "colorplan", status: "Live", color: "var(--earth-olive)" },
        ].map((item) => (
          <div
            key={item.slug}
            className="p-6 rounded-glass glass-panel border border-border space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-surface border border-border text-text">
                {item.status}
              </span>
              <Layers className="w-4 h-4 text-muted" />
            </div>
            <h3 className="font-display text-xl font-bold uppercase">{item.name}</h3>
            <p className="text-xs text-muted">Placeholder case study entry. Real data will be populated from Keystatic CMS in Phase 1 & 3.</p>
            <Link
              href={`/projects/${item.slug}`}
              className="inline-block text-xs font-mono text-signal hover:underline pt-2"
            >
              VIEW CASE STUDY →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

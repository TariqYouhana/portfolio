import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function BlogPage() {
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
          DISPATCHES // ARCHIVE
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight">
          Essays & Notes
        </h1>
        <p className="text-base text-muted max-w-2xl leading-relaxed">
          Writings across data engineering, software systems, historical investigations, film analysis, and poetry. Scheduled for Phase 4.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {[
          { title: "Distributed Consensus in Sparse Networks", cat: "Software", slug: "distributed-consensus" },
          { title: "Territorial Fluidity: Cartography of Bengal 1757-1947", cat: "History", slug: "cartography-bengal" },
          { title: "Chiaroscuro & Grain: 35mm Cinematography in Modern Digital Work", cat: "Film", slug: "chiaroscuro-grain" },
        ].map((post) => (
          <div
            key={post.slug}
            className="p-6 rounded-glass glass-panel border border-border space-y-3"
          >
            <span className="text-xs font-mono text-signal">{post.cat}</span>
            <h3 className="font-display text-xl font-bold uppercase">{post.title}</h3>
            <p className="text-xs text-muted">Placeholder dispatch. Markdown parser, syntax highlighting, and RSS feed are scheduled for Phase 4.</p>
            <Link
              href={`/blog/${post.slug}`}
              className="inline-block text-xs font-mono text-text hover:text-signal transition-colors pt-2"
            >
              READ ENTRY →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

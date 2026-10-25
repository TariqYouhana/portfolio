import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;

  return (
    <div className="w-full max-w-4xl mx-auto px-6 md:px-10 py-12 space-y-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-text transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK TO ALL DISPATCHES</span>
      </Link>

      <div className="space-y-4">
        <span className="font-mono text-xs uppercase text-signal tracking-widest block">
          DISPATCH_RECORD // {slug.toUpperCase()}
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight">
          {slug.replace(/-/g, " ")}
        </h1>
        <p className="text-sm font-mono text-muted">
          PUBLISHED: OCTOBER 2026 · ESTIMATED READING TIME: 5 MIN
        </p>
      </div>

      <div className="p-8 rounded-glass glass-panel border border-border space-y-6">
        <p className="text-sm text-muted leading-relaxed">
          Placeholder article view. Keystatic Markdown rendering with code highlighting, image captions, and auto-generated OpenGraph cards will be wired in Phase 4.
        </p>
      </div>
    </div>
  );
}

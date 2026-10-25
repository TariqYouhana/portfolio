import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ProjectCaseStudyProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectCaseStudyPage({ params }: ProjectCaseStudyProps) {
  const { slug } = await params;

  return (
    <div className="w-full max-w-4xl mx-auto px-6 md:px-10 py-12 space-y-8">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-text transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK TO ALL PROJECTS</span>
      </Link>

      <div className="space-y-4">
        <span className="font-mono text-xs uppercase text-signal tracking-widest block">
          CASE_RECORD // {slug.toUpperCase()}
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight">
          Case Study: {slug}
        </h1>
        <p className="text-sm font-mono text-muted">
          STATUS: IN DEVELOPMENT · AUTHOR: TARIQ LEON
        </p>
      </div>

      <div className="p-8 rounded-glass glass-panel border border-border space-y-6">
        <h2 className="font-display text-xl font-bold uppercase">System Specification</h2>
        <p className="text-sm text-muted leading-relaxed">
          This is a placeholder page for the project case study <code>{slug}</code>. The complete case study engine with markdown rendering, architectural diagrams, outcomes, and code repositories will be connected in Phase 3.
        </p>
      </div>
    </div>
  );
}

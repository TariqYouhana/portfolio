import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, FolderGit2, Tag, User } from "lucide-react";
import { getProject, getProjects } from "@/lib/content";

interface ProjectCaseStudyProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectCaseStudyProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} · Case Study · Tariq Youhana Leon`,
    description: project.tagline,
  };
}

const STATUS_LABELS: Record<string, string> = {
  live: "Live",
  "in-development": "In Development",
  concept: "Concept",
  archived: "Archived",
};

const STATUS_COLORS: Record<string, string> = {
  live: "bg-emerald-950/60 border-emerald-600/40 text-emerald-300",
  "in-development": "bg-amber-950/60 border-amber-600/40 text-amber-300",
  concept: "bg-surface border-border text-muted",
  archived: "bg-surface border-border text-muted/60",
};

const FOLDER_COLORS = [
  "var(--earth-olive)",
  "var(--earth-slate)",
  "var(--earth-tan)",
  "#2C2B28",
  "#3A3830",
];

export default async function ProjectCaseStudyPage({ params }: ProjectCaseStudyProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  // Read the markdown content
  let contentNode: React.ReactNode = null;
  try {
    if (project.content) {
      const contentArray = await project.content();
      // Render a simple text version of the markdoc content
      contentNode = (
        <div className="space-y-4">
          {contentArray && (
            <div className="p-6 rounded-glass glass-panel border border-border/60 text-sm text-muted leading-relaxed">
              <p className="font-mono text-xs text-signal mb-3">
                CASE_STUDY_RECORD // PLACEHOLDER_CONTENT
              </p>
              <p>
                Real case study content for <strong className="text-text">{project.title}</strong> will be authored through the Keystatic CMS admin at <code>/admin</code>. This page layout and architecture is final; only the written content is pending.
              </p>
            </div>
          )}
        </div>
      );
    }
  } catch {
    contentNode = null;
  }

  // Get all projects for prev/next navigation
  const allProjects = await getProjects();
  const currentIdx = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIdx > 0 ? allProjects[currentIdx - 1] : null;
  const nextProject = currentIdx < allProjects.length - 1 ? allProjects[currentIdx + 1] : null;

  const accentColor = FOLDER_COLORS[currentIdx % FOLDER_COLORS.length];

  return (
    <div className="w-full max-w-5xl mx-auto px-6 md:px-10 py-12 space-y-12">
      {/* Back Navigation */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-text transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK TO FOLDER STACK</span>
      </Link>

      {/* Case Study Header */}
      <header className="space-y-6">
        {/* Top metadata strip */}
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className={`text-[11px] font-mono px-2.5 py-1 rounded uppercase tracking-wider border ${STATUS_COLORS[project.status] || "bg-surface border-border text-muted"}`}
          >
            {STATUS_LABELS[project.status] || project.status}
          </span>
          {project.is_primary && (
            <span className="text-[11px] font-mono px-2.5 py-1 rounded border border-signal/30 text-signal bg-signal/10 uppercase tracking-wider">
              Primary Project
            </span>
          )}
          <span className="font-mono text-xs text-muted">
            FILE_{String(currentIdx + 1).padStart(2, "0")} {"//"}
          </span>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-text leading-[0.9]">
            {project.title}
          </h1>
          {project.tagline && (
            <p className="text-lg text-muted leading-relaxed max-w-2xl">
              {project.tagline}
            </p>
          )}
        </div>

        {/* Project metadata row */}
        <div
          className="p-6 rounded-glass border border-border grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          style={{
            background: `linear-gradient(135deg, ${accentColor}18, transparent 60%)`,
          }}
        >
          {project.role && (
            <div className="flex items-start gap-3">
              <User className="w-4 h-4 text-signal mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-mono text-xs text-signal font-semibold uppercase block">
                  ROLE //
                </span>
                <span className="text-xs text-text font-medium">{project.role}</span>
              </div>
            </div>
          )}

          {project.tags && project.tags.length > 0 && (
            <div className="flex items-start gap-3">
              <Tag className="w-4 h-4 text-signal mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-mono text-xs text-signal font-semibold uppercase block">
                  TECH STACK //
                </span>
                <span className="text-xs text-text font-medium">
                  {project.tags.join(", ")}
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {project.link_live && (
              <a
                href={project.link_live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-text text-bg text-[11px] font-mono font-semibold uppercase hover:opacity-90 transition-opacity"
              >
                <span>Live Deployment</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}
            {project.link_repo && (
              <a
                href={project.link_repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-muted text-[11px] font-mono uppercase hover:border-text/60 hover:text-text transition-colors"
              >
                <FolderGit2 className="w-3 h-3" />
                <span>Repository</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Case Study Content Body */}
      <main className="space-y-8">
        {contentNode || (
          <div className="p-8 rounded-glass glass-panel border border-border space-y-4">
            <span className="font-mono text-xs text-signal">
              CASE_STUDY_RECORD // AWAITING_CONTENT
            </span>
            <p className="text-sm text-muted leading-relaxed">
              The full case study for <strong className="text-text">{project.title}</strong> will be authored in the Keystatic CMS admin panel. This structure handles: project overview, problem statement, architecture diagram, tools and stack, outcome and deployment status, image gallery, and external links.
            </p>
          </div>
        )}
      </main>

      {/* Prev / Next Navigation */}
      <nav
        aria-label="Navigate between case studies"
        className="pt-8 border-t border-border grid grid-cols-2 gap-4"
      >
        <div>
          {prevProject && (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex flex-col gap-1 p-4 rounded-lg border border-border hover:border-text/40 transition-colors"
            >
              <span className="font-mono text-[10px] text-muted uppercase flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" />
                <span>Previous</span>
              </span>
              <span className="font-display font-bold text-sm uppercase text-text group-hover:text-signal transition-colors">
                {prevProject.title}
              </span>
            </Link>
          )}
        </div>
        <div className="flex justify-end">
          {nextProject && (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex flex-col gap-1 p-4 rounded-lg border border-border hover:border-text/40 transition-colors text-right"
            >
              <span className="font-mono text-[10px] text-muted uppercase flex items-center justify-end gap-1">
                <span>Next</span>
                <ArrowUpRight className="w-3 h-3" />
              </span>
              <span className="font-display font-bold text-sm uppercase text-text group-hover:text-signal transition-colors">
                {nextProject.title}
              </span>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

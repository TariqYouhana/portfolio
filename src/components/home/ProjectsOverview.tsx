import Link from "next/link";
import { ArrowRight, ArrowUpRight, FolderGit2 } from "lucide-react";
import { Project } from "@/lib/content";

interface ProjectsOverviewProps {
  projects: Project[];
}

export function ProjectsOverview({ projects }: ProjectsOverviewProps) {
  // Show up to 5 featured projects
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 5);

  return (
    <section
      aria-label="Featured Projects Overview"
      className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-12 border-b border-border">
        <div className="space-y-3">
          <span className="font-mono text-xs uppercase text-signal tracking-widest block">
            FILE_INDEX // OVERVIEW
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-text">
            Featured Systems & Projects
          </h2>
        </div>

        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text hover:text-signal transition-colors group whitespace-nowrap"
        >
          <span>Open Folder Switcher ({projects.length})</span>
          <ArrowRight className="w-4 h-4 text-signal transform group-hover:translate-x-1.5 transition-transform" />
        </Link>
      </div>

      {/* Grid of Tactile File Cards (Visual preview of the paper folder stack) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
        {featuredProjects.map((project, idx) => {
          const isPrimary = project.is_primary;
          const codeNumber = String(idx + 1).padStart(3, "0");

          return (
            <div
              key={project.slug}
              className="group relative flex flex-col justify-between p-6 rounded-glass glass-panel border border-border hover:border-text/50 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              {/* Card top tab header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {/* Monospace tab label: Red for primary folder, muted for others (Rule 4) */}
                  <span
                    className={`font-mono text-xs font-semibold tracking-wider ${
                      isPrimary ? "text-signal" : "text-muted"
                    }`}
                  >
                    CODE_{codeNumber} {"//"}
                  </span>

                  {/* Status badge: Honest label */}
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded uppercase tracking-wider ${
                      project.status === "live"
                        ? "bg-emerald-950/60 border border-emerald-600/40 text-emerald-300"
                        : project.status === "in-development"
                        ? "bg-amber-950/60 border border-amber-600/40 text-amber-300"
                        : "bg-surface border border-border text-muted"
                    }`}
                  >
                    {project.status.replace("-", " ")}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-bold text-xl uppercase tracking-tight text-text group-hover:text-signal transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed line-clamp-2">
                    {project.tagline}
                  </p>
                </div>

                {/* Tech tags */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-surface border border-border/70 text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Card bottom actions */}
              <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-mono">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-text group-hover:text-signal transition-colors"
                >
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>Case Study</span>
                  <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                </Link>

                {project.link_live && (
                  <a
                    href={project.link_live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-muted hover:text-text transition-colors"
                  >
                    <span>Live</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

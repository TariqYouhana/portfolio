"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FolderGit2, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/content";

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

interface ProjectCatalogProps {
  projects: Project[];
}

export function ProjectCatalog({ projects }: ProjectCatalogProps) {
  const [activeStatus, setActiveStatus] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Collect all unique statuses and tags
  const allStatuses = [...new Set(projects.map((p) => p.status))];
  const allTags = [...new Set(projects.flatMap((p) => p.tags || []))].sort();

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchStatus = !activeStatus || p.status === activeStatus;
      const matchTag = !activeTag || (p.tags && p.tags.includes(activeTag));
      return matchStatus && matchTag;
    });
  }, [projects, activeStatus, activeTag]);

  const hasActiveFilter = !!activeStatus || !!activeTag;

  return (
    <div className="pt-8 space-y-6">
      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 text-muted">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="font-mono text-xs uppercase">Filter</span>
        </div>

        {/* Status filters */}
        {allStatuses.map((status) => (
          <button
            key={status}
            onClick={() =>
              setActiveStatus(activeStatus === status ? null : status)
            }
            className={cn(
              "text-[11px] font-mono px-2.5 py-1 rounded uppercase tracking-wider border transition-all",
              activeStatus === status
                ? STATUS_COLORS[status] + " opacity-100 scale-105"
                : "bg-surface border-border text-muted hover:border-text/40"
            )}
          >
            {STATUS_LABELS[status] || status}
          </button>
        ))}

        <div className="w-px h-4 bg-border mx-1" aria-hidden="true" />

        {/* Tag filters */}
        {allTags.slice(0, 8).map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
            className={cn(
              "text-[11px] font-mono px-2.5 py-1 rounded border transition-all",
              activeTag === tag
                ? "bg-signal/10 border-signal/30 text-signal"
                : "bg-surface border-border text-muted hover:border-text/40"
            )}
          >
            {tag}
          </button>
        ))}

        {hasActiveFilter && (
          <button
            onClick={() => { setActiveStatus(null); setActiveTag(null); }}
            className="flex items-center gap-1 text-[11px] font-mono text-muted hover:text-text transition-colors ml-2"
          >
            <X className="w-3 h-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="font-mono text-xs text-muted">
        {filtered.length} OF {projects.length} RECORDS VISIBLE
      </p>

      {/* Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((project, idx) => {
          const codeNum = String(idx + 1).padStart(3, "0");
          return (
            <div
              key={project.slug}
              className="group p-6 rounded-glass glass-panel border border-border hover:border-text/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "font-mono text-xs font-semibold tracking-wider",
                      project.is_primary ? "text-signal" : "text-muted"
                    )}
                  >
                    CODE_{codeNum} {"//"}
                  </span>
                  <span
                    className={cn(
                      "text-[11px] font-mono px-2 py-0.5 rounded uppercase tracking-wider border",
                      STATUS_COLORS[project.status] || "bg-surface border-border text-muted"
                    )}
                  >
                    {STATUS_LABELS[project.status] || project.status}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl uppercase tracking-tight text-text group-hover:text-signal transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">
                  {project.tagline}
                </p>

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                        className={cn(
                          "text-[11px] font-mono px-2 py-0.5 rounded border transition-colors hover:border-signal/40",
                          tag === activeTag
                            ? "bg-signal/10 border-signal/30 text-signal"
                            : "bg-surface border-border text-muted"
                        )}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>

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

        {filtered.length === 0 && (
          <div className="col-span-full p-12 glass-panel border border-border rounded-glass text-center space-y-3">
            <p className="font-mono text-xs text-muted uppercase">
              NO_RECORDS_MATCH // Try clearing filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

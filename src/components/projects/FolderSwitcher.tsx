"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, ArrowLeft, ArrowUpRight, FolderGit2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/lib/content";

interface FolderSwitcherProps {
  projects: Project[];
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

// Folder paper colours from the design system earth tokens
const FOLDER_COLORS = [
  "var(--earth-olive)",
  "var(--earth-slate)",
  "var(--earth-tan)",
  "#2C2B28",
  "#3A3830",
];

export function FolderSwitcher({ projects }: FolderSwitcherProps) {
  const shouldReduceMotion = useReducedMotion();

  // Primary project is the initial front folder
  const primaryIdx = projects.findIndex((p) => p.is_primary);
  const [activeIdx, setActiveIdx] = useState(primaryIdx >= 0 ? primaryIdx : 0);

  const activeProject = projects[activeIdx];

  function bringToFront(idx: number) {
    if (idx === activeIdx) return;
    setActiveIdx(idx);
  }

  function cyclePrev() {
    setActiveIdx((prev) => (prev - 1 + projects.length) % projects.length);
  }

  function cycleNext() {
    setActiveIdx((prev) => (prev + 1) % projects.length);
  }

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent, idx: number) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      bringToFront(idx);
    }
    if (e.key === "ArrowLeft") { e.preventDefault(); cyclePrev(); }
    if (e.key === "ArrowRight") { e.preventDefault(); cycleNext(); }
  }

  const springTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 320, damping: 28 };

  return (
    <>
      {/* ==============================
          DESKTOP FOLDER SWITCHER
          Reference 01: Tabbed paper stack
      ============================== */}
      <div
        className="hidden md:block relative"
        aria-label="Project folder switcher"
      >
        {/* Tab Labels Row */}
        <div
          className="flex items-end gap-0 relative z-10 pl-[320px]"
          role="tablist"
          aria-label="Project tabs"
        >
          {projects.map((project, idx) => {
            const isActive = idx === activeIdx;
            const codeNum = String(idx + 1).padStart(3, "0");
            const folderBg = FOLDER_COLORS[idx % FOLDER_COLORS.length];

            return (
              <motion.button
                key={project.slug}
                role="tab"
                aria-selected={isActive}
                aria-controls={`folder-panel-${project.slug}`}
                tabIndex={isActive ? 0 : -1}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onClick={() => bringToFront(idx)}
                whileHover={shouldReduceMotion ? {} : { y: isActive ? 0 : -6 }}
                transition={springTransition}
                className={cn(
                  "relative flex flex-col justify-end px-3 py-2 text-left rounded-t-lg cursor-pointer border border-b-0 transition-colors duration-200",
                  "focus-visible:outline-2 focus-visible:outline-text",
                  isActive ? "z-20 shadow-xl -mb-0.5" : "z-10 opacity-80 hover:opacity-100"
                )}
                style={{
                  background: folderBg,
                  borderColor: "rgba(237, 230, 211, 0.14)",
                  minWidth: "80px",
                  maxWidth: "140px",
                }}
              >
                {/* Vertical monospace code label */}
                <span
                  className={cn(
                    "font-mono text-[10px] font-semibold leading-tight uppercase whitespace-nowrap",
                    isActive ? "text-signal" : "text-[#EDE6D3]/60"
                  )}
                  style={{ writingMode: "horizontal-tb" }}
                >
                  CODE_{codeNum} {"//"}
                </span>
                <span className="font-mono text-[10px] text-[#EDE6D3]/70 truncate max-w-[100px]">
                  {project.title.split(" ")[0].toUpperCase()}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Main Folder Stack Area */}
        <div className="relative flex items-stretch" style={{ minHeight: "420px" }}>

          {/* ——— BACK FOLDERS (slivers stacked behind) ——— */}
          <div className="relative flex-1">
            {projects.map((project, idx) => {
              if (idx === activeIdx) return null;
              const codeNum = String(idx + 1).padStart(3, "0");
              const folderBg = FOLDER_COLORS[idx % FOLDER_COLORS.length];
              const stackOffset = idx < activeIdx ? idx : idx - 1;

              return (
                <motion.div
                  key={project.slug}
                  layout
                  layoutId={`folder-${project.slug}`}
                  initial={false}
                  transition={springTransition}
                  onClick={() => bringToFront(idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  tabIndex={0}
                  role="tab"
                  aria-selected={false}
                  aria-label={`Switch to ${project.title}`}
                  className="absolute inset-y-0 right-0 w-16 lg:w-20 border border-r-0 cursor-pointer rounded-l-lg hover:brightness-110 transition-all focus-visible:outline-2 focus-visible:outline-text"
                  style={{
                    background: folderBg,
                    borderColor: "rgba(237, 230, 211, 0.12)",
                    right: `${stackOffset * 68}px`,
                    zIndex: 5 - Math.abs(stackOffset),
                  }}
                >
                  {/* Vertical text sliver */}
                  <div className="flex flex-col items-center justify-center h-full py-8 gap-2">
                    <span
                      className="font-mono text-[10px] text-[#EDE6D3]/50 tracking-wider uppercase"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      CODE_{codeNum} {"// "}{project.title.slice(0, 12).toUpperCase()}
                    </span>
                  </div>
                </motion.div>
              );
            })}

            {/* ——— ACTIVE / FRONT FOLDER ——— */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.slug}
                id={`folder-panel-${activeProject.slug}`}
                role="tabpanel"
                layoutId={`folder-${activeProject.slug}`}
                initial={shouldReduceMotion ? {} : { opacity: 0.8, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? {} : { opacity: 0.8, scale: 0.98 }}
                transition={springTransition}
                className="relative z-20 glass-panel border border-border rounded-glass shadow-2xl overflow-hidden"
                style={{
                  marginRight: `${Math.max(0, (projects.length - 1) * 68 - 68)}px`,
                }}
              >
                {/* Paper-textured background */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.035] pointer-events-none"
                  style={{
                    backgroundImage: `repeating-linear-gradient(
                      0deg,
                      rgba(237, 230, 211, 0.4) 0px,
                      transparent 1px,
                      transparent 28px
                    )`,
                  }}
                />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* LEFT: Project details */}
                  <div className="p-8 lg:p-10 flex flex-col justify-between border-r border-border/40">
                    <div className="space-y-5">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span
                          className={cn(
                            "text-[11px] font-mono px-2.5 py-1 rounded uppercase tracking-wider border",
                            STATUS_COLORS[activeProject.status] || "bg-surface border-border text-muted"
                          )}
                        >
                          {STATUS_LABELS[activeProject.status] || activeProject.status}
                        </span>
                        {activeProject.is_primary && (
                          <span className="text-[11px] font-mono px-2.5 py-1 rounded border border-signal/30 text-signal bg-signal/10 uppercase tracking-wider">
                            Primary
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h2 className="font-display font-extrabold text-3xl lg:text-4xl uppercase tracking-tight text-text">
                          {activeProject.title}
                        </h2>
                        <p className="text-sm text-muted leading-relaxed">
                          {activeProject.tagline}
                        </p>
                      </div>

                      {activeProject.role && (
                        <div>
                          <span className="font-mono text-xs text-signal font-semibold uppercase">
                            ROLE //
                          </span>
                          <span className="font-mono text-xs text-muted ml-2">
                            {activeProject.role}
                          </span>
                        </div>
                      )}

                      {activeProject.tags && activeProject.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {activeProject.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface border border-border text-muted"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-8 pt-6 border-t border-border/60 flex items-center flex-wrap gap-3">
                      <Link
                        href={`/projects/${activeProject.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-text text-bg text-xs font-mono font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
                      >
                        <FolderGit2 className="w-3.5 h-3.5" />
                        <span>Full Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      {activeProject.link_live && (
                        <a
                          href={activeProject.link_live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-border text-text text-xs font-mono uppercase tracking-wider hover:border-text/60 transition-colors"
                        >
                          <span>Live</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* RIGHT: Large barcode/stamp display with project number aesthetic */}
                  <div
                    className="hidden lg:flex flex-col justify-between p-10 min-h-[380px]"
                    style={{
                      background: `linear-gradient(145deg, ${FOLDER_COLORS[activeIdx % FOLDER_COLORS.length]}22, transparent 70%)`,
                    }}
                  >
                    <div className="space-y-2">
                      <span className="font-mono text-xs text-muted/70">
                        FILE_{String(activeIdx + 1).padStart(2, "0")} {"//"}
                      </span>
                      <p className="font-mono text-[10px] text-muted/50 leading-relaxed">
                        ARCHIVE // PROJECTS // {new Date().getFullYear()}
                      </p>
                    </div>

                    {/* Giant vertical title */}
                    <div className="flex-1 flex items-center justify-start py-6 overflow-hidden">
                      <span
                        className="font-display font-black text-[min(10vw,80px)] uppercase tracking-tighter text-text/10 select-none pointer-events-none leading-none"
                        style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                      >
                        {activeProject.title.split(" ")[0]}
                      </span>
                    </div>

                    {/* Navigation arrows */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                      <button
                        onClick={cyclePrev}
                        aria-label="Previous project"
                        className="p-2 rounded-lg border border-border text-muted hover:text-text hover:border-text/60 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <span className="font-mono text-xs text-muted flex-1 text-center">
                        {activeIdx + 1} / {projects.length}
                      </span>
                      <button
                        onClick={cycleNext}
                        aria-label="Next project"
                        className="p-2 rounded-lg border border-border text-muted hover:text-text hover:border-text/60 transition-colors"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ==============================
          MOBILE: Horizontal tab scroll + full-width card
      ============================== */}
      <div className="block md:hidden space-y-4" aria-label="Project switcher (mobile)">
        {/* Horizontal scrollable tab row */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
          {projects.map((project, idx) => {
            const isActive = idx === activeIdx;
            const codeNum = String(idx + 1).padStart(3, "0");
            const folderBg = FOLDER_COLORS[idx % FOLDER_COLORS.length];

            return (
              <button
                key={project.slug}
                onClick={() => bringToFront(idx)}
                aria-pressed={isActive}
                className={cn(
                  "flex-shrink-0 snap-start px-3 py-2 rounded-lg border font-mono text-xs font-semibold uppercase tracking-wide whitespace-nowrap transition-all",
                  isActive
                    ? "border-text/40 shadow-lg scale-[1.02]"
                    : "border-border/60 opacity-70"
                )}
                style={{ background: folderBg, borderColor: isActive ? undefined : "rgba(237,230,211,0.12)" }}
              >
                <span className={isActive ? "text-signal" : "text-[#EDE6D3]/60"}>
                  CODE_{codeNum}
                </span>
              </button>
            );
          })}
        </div>

        {/* Full-width active card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.slug}
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-glass glass-panel border border-border space-y-5"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={cn(
                  "text-[11px] font-mono px-2 py-0.5 rounded uppercase tracking-wider border",
                  STATUS_COLORS[activeProject.status] || "bg-surface border-border text-muted"
                )}
              >
                {STATUS_LABELS[activeProject.status] || activeProject.status}
              </span>
              {activeProject.is_primary && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-signal/30 text-signal bg-signal/10 uppercase">
                  Primary
                </span>
              )}
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-2xl uppercase tracking-tight text-text">
                {activeProject.title}
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                {activeProject.tagline}
              </p>
            </div>

            {activeProject.tags && activeProject.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {activeProject.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 rounded bg-surface border border-border text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3 pt-2 border-t border-border/60 flex-wrap">
              <Link
                href={`/projects/${activeProject.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-text text-bg text-xs font-mono font-semibold uppercase tracking-wider"
              >
                <span>Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              {activeProject.link_live && (
                <a
                  href={activeProject.link_live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-border text-text text-xs font-mono uppercase hover:border-text/60 transition-colors"
                >
                  <span>Live</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            <div className="flex items-center justify-between pt-1 text-xs font-mono text-muted">
              <button
                onClick={cyclePrev}
                className="flex items-center gap-1 hover:text-text transition-colors"
                aria-label="Previous project"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
              <span>{activeIdx + 1} / {projects.length}</span>
              <button
                onClick={cycleNext}
                className="flex items-center gap-1 hover:text-text transition-colors"
                aria-label="Next project"
              >
                <span>Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

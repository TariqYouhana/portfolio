"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trophy,
  Award,
  ShieldCheck,
  Calendar,
  Users,
  Briefcase,
  ExternalLink,
  FolderGit2,
} from "lucide-react";
import { AchievementItem } from "@/lib/content";

interface AchievementDetailModalProps {
  achievement: AchievementItem | null;
  onClose: () => void;
}

export function AchievementDetailModal({
  achievement,
  onClose,
}: AchievementDetailModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (achievement) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [achievement, onClose]);

  if (!achievement) return null;

  const isWinner = achievement.entry.result === "winner";
  const formattedDate = achievement.entry.date
    ? new Date(achievement.entry.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Verified Event";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Modal Drawer Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="achievement-modal-title"
          className="relative w-full max-w-2xl rounded-glass glass-panel border border-border bg-[#181715] shadow-2xl p-6 sm:p-8 space-y-6 z-10 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span
                  className={`text-[11px] font-mono px-2.5 py-0.5 rounded uppercase tracking-wider border ${
                    isWinner
                      ? "bg-gold/10 border-gold/40 text-gold font-semibold"
                      : "bg-surface border-border text-muted"
                  }`}
                >
                  {achievement.entry.result_text || achievement.entry.result}
                </span>

                <span className="text-xs font-mono text-muted uppercase">
                  TYPE: {achievement.entry.kind}
                </span>
              </div>

              <h2
                id="achievement-modal-title"
                className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-text"
              >
                {achievement.entry.title}
              </h2>

              {achievement.entry.organizer && (
                <p className="text-xs font-mono text-muted">
                  ORGANIZED BY // {achievement.entry.organizer}
                </p>
              )}
            </div>

            <button
              onClick={onClose}
              aria-label="Close detail panel"
              className="p-2 rounded-lg border border-border text-muted hover:text-text hover:border-text transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Metadata Grid */}
          <div className="p-4 rounded-xl bg-surface/50 border border-border/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            {achievement.entry.date && (
              <div className="flex items-center gap-2 text-muted">
                <Calendar className="w-3.5 h-3.5 text-signal flex-shrink-0" />
                <span>{formattedDate}</span>
              </div>
            )}

            {achievement.entry.team && (
              <div className="flex items-center gap-2 text-muted">
                <Users className="w-3.5 h-3.5 text-signal flex-shrink-0" />
                <span>{achievement.entry.team}</span>
              </div>
            )}

            {achievement.entry.role && (
              <div className="flex items-center gap-2 text-muted sm:col-span-2">
                <Briefcase className="w-3.5 h-3.5 text-signal flex-shrink-0" />
                <span>ROLE: {achievement.entry.role}</span>
              </div>
            )}
          </div>

          {/* Narrative Summary: What We Built or Solved */}
          {achievement.entry.summary && (
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase text-signal font-semibold tracking-wider block">
                NARRATIVE // WHAT WE BUILT OR SOLVED
              </span>
              <p className="text-sm text-text/90 leading-relaxed font-normal bg-surface/30 p-4 rounded-lg border border-border/40">
                {achievement.entry.summary}
              </p>
            </div>
          )}

          {/* External Links */}
          <div className="pt-4 border-t border-border flex items-center justify-between flex-wrap gap-3">
            {achievement.entry.project_link ? (
              <Link
                href={achievement.entry.project_link}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-text text-bg text-xs font-mono font-semibold uppercase hover:opacity-90 transition-opacity"
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Open Associated Project</span>
              </Link>
            ) : (
              <span className="text-[11px] font-mono text-muted">
                VERIFIED ARCHIVE RECORD
              </span>
            )}

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-border text-xs font-mono text-muted hover:text-text transition-colors"
            >
              Close Drawer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

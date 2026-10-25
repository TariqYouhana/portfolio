"use client";

import { Trophy, Award, ShieldCheck, Flag, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AchievementItem } from "@/lib/content";

interface AchievementsToolbarProps {
  achievements: AchievementItem[];
  selectedKind: string;
  onKindChange: (kind: string) => void;
  selectedYear: string;
  onYearChange: (year: string) => void;
}

export function AchievementsToolbar({
  achievements,
  selectedKind,
  onKindChange,
  selectedYear,
  onYearChange,
}: AchievementsToolbarProps) {
  // Compute honest unexaggerated metrics
  const totalEvents = achievements.length;
  const victoriesCount = achievements.filter((a) => a.entry.result === "winner").length;
  const podiumCount = achievements.filter(
    (a) => a.entry.result === "podium" || a.entry.result === "finalist"
  ).length;
  const ctfAndHacksCount = achievements.filter(
    (a) => a.entry.kind === "ctf" || a.entry.kind === "hackathon"
  ).length;

  const years = [
    "all",
    ...Array.from(
      new Set(
        achievements
          .map((a) => (a.entry.date ? new Date(a.entry.date).getFullYear().toString() : null))
          .filter(Boolean)
      )
    ).sort((a, b) => Number(b) - Number(a)),
  ];

  const hasFilter = selectedKind !== "all" || selectedYear !== "all";

  return (
    <div className="space-y-8">
      {/* METRIC COUNTER RIBBON (Section 7.4 spec) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-glass glass-panel border border-border flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted">
            <span className="font-mono text-[11px] uppercase tracking-wider">EVENTS ENTERED</span>
            <Flag className="w-4 h-4 text-muted" />
          </div>
          <div className="mt-3">
            <span className="font-display font-black text-3xl sm:text-4xl text-text">
              {totalEvents}
            </span>
          </div>
        </div>

        <div className="p-5 rounded-glass glass-panel border border-border/80 flex flex-col justify-between bg-gradient-to-br from-surface to-[#222018]">
          <div className="flex items-center justify-between text-gold">
            <span className="font-mono text-[11px] uppercase tracking-wider">VICTORIES // 1ST</span>
            <Trophy className="w-4 h-4 text-gold" />
          </div>
          <div className="mt-3">
            <span className="font-display font-black text-3xl sm:text-4xl text-gold">
              {victoriesCount}
            </span>
          </div>
        </div>

        <div className="p-5 rounded-glass glass-panel border border-border flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted">
            <span className="font-mono text-[11px] uppercase tracking-wider">PODIUM & FINALISTS</span>
            <Award className="w-4 h-4 text-text/80" />
          </div>
          <div className="mt-3">
            <span className="font-display font-black text-3xl sm:text-4xl text-text">
              {podiumCount}
            </span>
          </div>
        </div>

        <div className="p-5 rounded-glass glass-panel border border-border flex flex-col justify-between">
          <div className="flex items-center justify-between text-muted">
            <span className="font-mono text-[11px] uppercase tracking-wider">CTFS & HACKATHONS</span>
            <ShieldCheck className="w-4 h-4 text-signal" />
          </div>
          <div className="mt-3">
            <span className="font-display font-black text-3xl sm:text-4xl text-text">
              {ctfAndHacksCount}
            </span>
          </div>
        </div>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-border">
        {/* Kind filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <SlidersHorizontal className="w-3.5 h-3.5 text-muted mr-1 flex-shrink-0" />
          {[
            { label: "All Tiers", value: "all" },
            { label: "Hackathons", value: "hackathon" },
            { label: "CTF Competitions", value: "ctf" },
            { label: "Competitions", value: "competition" },
          ].map((item) => {
            const isActive = selectedKind === item.value;
            return (
              <button
                key={item.value}
                onClick={() => onKindChange(item.value)}
                className={cn(
                  "px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-wider transition-all border whitespace-nowrap",
                  isActive
                    ? "bg-text text-bg border-text font-semibold shadow-sm"
                    : "bg-surface border-border text-muted hover:border-text/40 hover:text-text"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Year filters */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-muted uppercase">Year:</span>
          {years.map((year) => {
            if (!year) return null;
            const isActive = selectedYear === year;
            return (
              <button
                key={year}
                onClick={() => onYearChange(year)}
                className={cn(
                  "px-2.5 py-1 rounded text-xs font-mono transition-all border",
                  isActive
                    ? "bg-text text-bg border-text font-semibold"
                    : "bg-surface border-border text-muted hover:border-text/40 hover:text-text"
                )}
              >
                {year === "all" ? "ALL" : year}
              </button>
            );
          })}

          {hasFilter && (
            <button
              onClick={() => {
                onKindChange("all");
                onYearChange("all");
              }}
              className="flex items-center gap-1 text-xs font-mono text-signal hover:underline ml-2"
            >
              <X className="w-3 h-3" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

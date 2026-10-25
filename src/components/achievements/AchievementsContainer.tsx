"use client";

import { useState, useMemo } from "react";
import { AchievementItem } from "@/lib/content";
import { AchievementsToolbar } from "@/components/achievements/AchievementsToolbar";
import { TrophyCabinet } from "@/components/achievements/TrophyCabinet";
import { AchievementDetailModal } from "@/components/achievements/AchievementDetailModal";

interface AchievementsContainerProps {
  achievements: AchievementItem[];
}

export function AchievementsContainer({ achievements }: AchievementsContainerProps) {
  const [selectedKind, setSelectedKind] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem | null>(null);

  // Filter achievements by selected kind and year
  const filteredAchievements = useMemo(() => {
    return achievements.filter((item) => {
      const matchKind = selectedKind === "all" || item.entry.kind === selectedKind;
      const matchYear =
        selectedYear === "all" ||
        (item.entry.date &&
          new Date(item.entry.date).getFullYear().toString() === selectedYear);
      return matchKind && matchYear;
    });
  }, [achievements, selectedKind, selectedYear]);

  return (
    <div className="space-y-12">
      {/* Metric Counters & Filter Ribbon */}
      <AchievementsToolbar
        achievements={achievements}
        selectedKind={selectedKind}
        onKindChange={setSelectedKind}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
      />

      {/* Main Glass Trophy Cabinet */}
      <TrophyCabinet
        achievements={filteredAchievements}
        onSelectAchievement={setSelectedAchievement}
      />

      {/* Inspection Drawer / Detail Modal */}
      <AchievementDetailModal
        achievement={selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
      />
    </div>
  );
}

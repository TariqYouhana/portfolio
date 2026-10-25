"use client";

import { useState } from "react";
import { Trophy, Award, ShieldCheck, Plus, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { AchievementItem } from "@/lib/content";

interface TrophyCabinetProps {
  achievements: AchievementItem[];
  onSelectAchievement: (achievement: AchievementItem) => void;
}

export function TrophyCabinet({
  achievements,
  onSelectAchievement,
}: TrophyCabinetProps) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  // Group achievements into 3 distinct shelves
  const victories = achievements.filter((a) => a.entry.result === "winner");
  const podiumAndFinalists = achievements.filter(
    (a) => a.entry.result === "podium" || a.entry.result === "finalist"
  );
  const participations = achievements.filter((a) => a.entry.result === "participant");

  return (
    <div
      aria-label="Trophy Cabinet"
      className="relative w-full rounded-2xl md:rounded-3xl border border-border bg-[#141412] p-6 sm:p-10 md:p-12 shadow-2xl overflow-hidden space-y-16"
    >
      {/* Background ambient lighting inside the glass cabinet */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background:
            "radial-gradient(ellipse at 50% 10%, rgba(217, 168, 50, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* =========================================================
          SHELF I: VICTORIES & CHAMPIONSHIPS (Gold Spotlight)
      ========================================================= */}
      <section aria-label="Shelf 1: Victories and Championships" className="relative space-y-6">
        {/* Conical Spotlight Effect (Warm Gold Beam) */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-36 pointer-events-none opacity-20 blur-2xl"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 0%, #D9A832 0deg, transparent 60deg, transparent 300deg, #D9A832 360deg)",
          }}
        />

        {/* Shelf Header */}
        <div className="flex items-center justify-between border-b border-border/40 pb-3 text-xs font-mono">
          <span className="text-gold font-semibold tracking-wider flex items-center gap-2">
            <Trophy className="w-3.5 h-3.5 text-gold" />
            <span>SHELF I // VICTORIES & CHAMPIONSHIPS</span>
          </span>
          <span className="text-muted/60">{victories.length} VERIFIED</span>
        </div>

        {/* Shelf Pedestals Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pt-4">
          {victories.map((item) => (
            <TrophyPedestal
              key={item.slug}
              item={item}
              tier="gold"
              isHovered={hoveredSlug === item.slug}
              onHover={() => setHoveredSlug(item.slug)}
              onLeave={() => setHoveredSlug(null)}
              onClick={() => onSelectAchievement(item)}
            />
          ))}

          {/* Empty slot placeholder markers (Section 7.4 spec) */}
          {Array.from({ length: Math.max(1, 4 - victories.length) }).map((_, i) => (
            <EmptyPedestal key={`empty-gold-${i}`} label="RESERVED FOR NEXT VICTORY" />
          ))}
        </div>

        {/* Beveled Glass Shelf Base */}
        <div
          aria-hidden="true"
          className="w-full h-3 rounded-full mt-6 border-t border-gold/30 shadow-lg"
          style={{
            background:
              "linear-gradient(180deg, rgba(217, 168, 50, 0.15) 0%, rgba(20, 20, 18, 0.8) 100%)",
          }}
        />
      </section>

      {/* =========================================================
          SHELF II: PODIUM & FINALISTS (Silver / Bronze Spotlight)
      ========================================================= */}
      <section aria-label="Shelf 2: Podium and Finalists" className="relative space-y-6">
        <div className="flex items-center justify-between border-b border-border/40 pb-3 text-xs font-mono">
          <span className="text-text/80 font-semibold tracking-wider flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-text/80" />
            <span>SHELF II // PODIUM & FINALISTS</span>
          </span>
          <span className="text-muted/60">{podiumAndFinalists.length} VERIFIED</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pt-4">
          {podiumAndFinalists.map((item) => (
            <TrophyPedestal
              key={item.slug}
              item={item}
              tier="silver"
              isHovered={hoveredSlug === item.slug}
              onHover={() => setHoveredSlug(item.slug)}
              onLeave={() => setHoveredSlug(null)}
              onClick={() => onSelectAchievement(item)}
            />
          ))}

          {/* Empty slot placeholder markers */}
          {Array.from({ length: Math.max(1, 4 - podiumAndFinalists.length) }).map((_, i) => (
            <EmptyPedestal key={`empty-silver-${i}`} label="ACTIVE CAMPAIGN SLOT" />
          ))}
        </div>

        {/* Beveled Glass Shelf Base */}
        <div
          aria-hidden="true"
          className="w-full h-3 rounded-full mt-6 border-t border-border/50 shadow-lg"
          style={{
            background:
              "linear-gradient(180deg, rgba(237, 230, 211, 0.1) 0%, rgba(20, 20, 18, 0.8) 100%)",
          }}
        />
      </section>

      {/* =========================================================
          SHELF III: VERIFIED PARTICIPATIONS & CTFS (Certificate Spotlight)
      ========================================================= */}
      <section aria-label="Shelf 3: Participations and CTFs" className="relative space-y-6">
        <div className="flex items-center justify-between border-b border-border/40 pb-3 text-xs font-mono">
          <span className="text-muted font-semibold tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-muted" />
            <span>SHELF III // VERIFIED PARTICIPATIONS & CHALLENGES</span>
          </span>
          <span className="text-muted/60">{participations.length} VERIFIED</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pt-4">
          {participations.map((item) => (
            <TrophyPedestal
              key={item.slug}
              item={item}
              tier="bronze"
              isHovered={hoveredSlug === item.slug}
              onHover={() => setHoveredSlug(item.slug)}
              onLeave={() => setHoveredSlug(null)}
              onClick={() => onSelectAchievement(item)}
            />
          ))}

          {/* Empty slot placeholder markers */}
          {Array.from({ length: Math.max(1, 4 - participations.length) }).map((_, i) => (
            <EmptyPedestal key={`empty-bronze-${i}`} label="OPEN CHALLENGE SLOT" />
          ))}
        </div>

        {/* Beveled Glass Shelf Base */}
        <div
          aria-hidden="true"
          className="w-full h-3 rounded-full mt-6 border-t border-border/40 shadow-lg"
          style={{
            background:
              "linear-gradient(180deg, rgba(237, 230, 211, 0.08) 0%, rgba(20, 20, 18, 0.8) 100%)",
          }}
        />
      </section>
    </div>
  );
}

// -------------------------------------------------------------
// Interactive Trophy Pedestal with Tooltip
// -------------------------------------------------------------
interface TrophyPedestalProps {
  item: AchievementItem;
  tier: "gold" | "silver" | "bronze";
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}

function TrophyPedestal({
  item,
  tier,
  isHovered,
  onHover,
  onLeave,
  onClick,
}: TrophyPedestalProps) {
  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="group relative flex flex-col items-center justify-end p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-[1.04]"
    >
      {/* TOOLTIP ON HOVER (Section 7.4 spec) */}
      {isHovered && (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-30 px-3 py-1.5 rounded-lg bg-[#1F1E1B] border border-border text-center shadow-xl pointer-events-none whitespace-nowrap animate-fade-in">
          <span className="font-mono text-[11px] text-text font-semibold block">
            {item.entry.result_text || item.entry.title}
          </span>
          <span className="font-mono text-[9px] text-muted block uppercase">
            Click to inspect dossier
          </span>
        </div>
      )}

      {/* Emblem Graphic */}
      <div
        className={cn(
          "w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-md",
          tier === "gold"
            ? "border-gold/50 bg-gradient-to-b from-[#2E2816] to-[#1C180E] text-gold group-hover:border-gold group-hover:shadow-[0_0_24px_rgba(217,168,50,0.35)]"
            : tier === "silver"
            ? "border-text/40 bg-gradient-to-b from-[#282724] to-[#181715] text-text/90 group-hover:border-text group-hover:shadow-[0_0_20px_rgba(237,230,211,0.2)]"
            : "border-border bg-gradient-to-b from-[#22211F] to-[#141412] text-muted group-hover:border-text/60"
        )}
      >
        {tier === "gold" ? (
          <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-gold" />
        ) : tier === "silver" ? (
          <Award className="w-8 h-8 sm:w-10 sm:h-10 text-text/90" />
        ) : (
          <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-muted" />
        )}
      </div>

      {/* Pedestal Base Block */}
      <div className="w-full mt-3 p-2 rounded-lg bg-surface/70 border border-border/80 text-center space-y-0.5">
        <span
          className={cn(
            "font-mono text-[10px] font-semibold uppercase block truncate",
            tier === "gold" ? "text-gold" : "text-text"
          )}
        >
          {item.entry.result_text || item.entry.result}
        </span>
        <span className="font-display font-bold text-xs uppercase text-text block truncate">
          {item.entry.event_name || item.entry.title}
        </span>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Intentional Empty Shelf Pedestal Marker (Section 7.4 spec)
// -------------------------------------------------------------
function EmptyPedestal({ label }: { label: string }) {
  return (
    <div
      aria-label="Empty shelf pedestal"
      className="flex flex-col items-center justify-end p-4 rounded-xl opacity-40 hover:opacity-70 transition-opacity"
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border border-dashed border-border flex items-center justify-center bg-surface/20">
        <Plus className="w-5 h-5 text-muted/60" />
      </div>
      <div className="w-full mt-3 p-2 rounded-lg border border-dashed border-border/60 text-center">
        <span className="font-mono text-[9px] text-muted uppercase block tracking-wider">
          MORE COMING //
        </span>
        <span className="font-mono text-[9px] text-muted/70 block truncate">
          {label}
        </span>
      </div>
    </div>
  );
}

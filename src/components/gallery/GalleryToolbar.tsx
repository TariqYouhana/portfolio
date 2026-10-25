"use client";

import { BookOpen, LayoutGrid, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { AlbumItem } from "@/lib/content";

interface GalleryToolbarProps {
  viewMode: "journal" | "grid";
  onViewModeChange: (mode: "journal" | "grid") => void;
  albums: AlbumItem[];
  selectedAlbum: string;
  onAlbumChange: (album: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalSpreads: number;
}

export function GalleryToolbar({
  viewMode,
  onViewModeChange,
  albums,
  selectedAlbum,
  onAlbumChange,
  searchQuery,
  onSearchChange,
  totalSpreads,
}: GalleryToolbarProps) {
  return (
    <div className="space-y-6">
      {/* TOP HEADER CONTROLS (Recreating Reference 04 header layout) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-4">
        {/* Left: Round View Mode Toggle Buttons (Reference 04) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewModeChange("journal")}
            aria-label="3D Journal Coverflow Mode"
            title="3D Journal Book Mode"
            className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center border transition-all shadow-md active:scale-95",
              viewMode === "journal"
                ? "bg-text text-bg border-text shadow-lg"
                : "bg-surface border-border text-muted hover:text-text hover:border-text/60"
            )}
          >
            <BookOpen className="w-4 h-4" />
          </button>

          <button
            onClick={() => onViewModeChange("grid")}
            aria-label="Grid View Mode"
            title="Photographic Grid Mode"
            className={cn(
              "w-11 h-11 rounded-full flex items-center justify-center border transition-all shadow-md active:scale-95",
              viewMode === "grid"
                ? "bg-text text-bg border-text shadow-lg"
                : "bg-surface border-border text-muted hover:text-text hover:border-text/60"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Title & Spread Counter (Reference 04 exact format) */}
        <div className="text-center space-y-1">
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl uppercase tracking-tight text-text">
            Journal
          </h1>
          <div className="inline-flex items-center gap-1.5 font-mono text-xs text-signal font-semibold">
            <span>⊘</span>
            <span>{totalSpreads} SPREADS</span>
          </div>
        </div>

        {/* Right: Instant Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search locations or notes..."
            className="w-full pl-9 pr-8 py-2 rounded-full bg-surface border border-border text-xs font-mono text-text placeholder:text-muted/60 focus:outline-none focus:border-text transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* BOTTOM ALBUM FILTER TABS */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide border-t border-border/50 pt-4">
        <button
          onClick={() => onAlbumChange("all")}
          className={cn(
            "px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all border whitespace-nowrap",
            selectedAlbum === "all"
              ? "bg-text text-bg border-text font-semibold shadow-sm"
              : "bg-surface border-border text-muted hover:border-text/40 hover:text-text"
          )}
        >
          All Albums
        </button>

        {albums.map((album) => {
          const isActive = selectedAlbum === album.slug;
          return (
            <button
              key={album.slug}
              onClick={() => onAlbumChange(album.slug)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all border whitespace-nowrap",
                isActive
                  ? "bg-text text-bg border-text font-semibold shadow-sm"
                  : "bg-surface border-border text-muted hover:border-text/40 hover:text-text"
              )}
            >
              {album.entry.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}

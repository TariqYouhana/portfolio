"use client";

import { MapPin, Calendar, Compass, ArrowRight } from "lucide-react";
import { PhotoItem } from "@/lib/content";

interface GridViewProps {
  photos: PhotoItem[];
  onSelectPhoto: (slug: string) => void;
}

export function GridView({ photos, onSelectPhoto }: GridViewProps) {
  if (!photos.length) {
    return (
      <div className="p-16 glass-panel border border-border rounded-glass text-center text-muted">
        No photographic records match the selected filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
      {photos.map((photo, idx) => (
        <article
          key={photo.slug}
          onClick={() => onSelectPhoto(photo.slug)}
          className="group relative p-5 rounded-glass glass-panel border border-border hover:border-text/50 transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-md hover:shadow-xl"
        >
          <div className="space-y-4">
            {/* Visual Frame */}
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-gradient-to-br from-[#242320] to-[#141412] border border-border/50 flex flex-col items-center justify-center p-6 text-center group-hover:scale-[1.01] transition-transform">
              <div className="w-12 h-12 rounded-full border border-signal/40 bg-surface flex items-center justify-center mb-2">
                <Compass className="w-6 h-6 text-signal" />
              </div>
              <span className="font-mono text-xs text-text font-semibold uppercase tracking-wider block">
                {photo.entry.title}
              </span>
              <span className="font-mono text-[10px] text-muted mt-1 block">
                EXP_{String(idx + 1).padStart(2, "0")} · 35MM
              </span>
            </div>

            {/* Meta */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                {photo.entry.location_name && (
                  <span className="text-signal flex items-center gap-1 line-clamp-1">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span>{photo.entry.location_name}</span>
                  </span>
                )}
                {photo.entry.taken_at && (
                  <span className="text-muted flex items-center gap-1 flex-shrink-0">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(photo.entry.taken_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}
                    </span>
                  </span>
                )}
              </div>

              <h3 className="font-display font-bold text-lg uppercase tracking-tight text-text group-hover:text-signal transition-colors">
                {photo.entry.title}
              </h3>

              {photo.entry.caption && (
                <p className="text-xs text-muted leading-relaxed line-clamp-2">
                  {photo.entry.caption}
                </p>
              )}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted group-hover:text-text">
            <span>ALBUM: {photo.entry.album?.toUpperCase() || "MONOCHROME"}</span>
            <span className="inline-flex items-center gap-1 text-signal">
              <span>Open Spread</span>
              <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}

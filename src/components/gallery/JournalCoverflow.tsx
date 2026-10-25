"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Calendar,
  Share2,
  ExternalLink,
  Check,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PhotoItem, getImageUrl } from "@/lib/content";

interface JournalCoverflowProps {
  photos: PhotoItem[];
  initialSlug?: string | null;
  onSelectPhoto?: (slug: string) => void;
}

export function JournalCoverflow({
  photos,
  initialSlug,
  onSelectPhoto,
}: JournalCoverflowProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize active index matching initialSlug or default to 0
  const initialIdx = initialSlug
    ? Math.max(0, photos.findIndex((p) => p.slug === initialSlug))
    : 0;
  const [activeIdx, setActiveIdx] = useState(initialIdx);
  const [copied, setCopied] = useState(false);

  // Sync index if initialSlug changes
  useEffect(() => {
    if (initialSlug) {
      const idx = photos.findIndex((p) => p.slug === initialSlug);
      if (idx >= 0) {
        setActiveIdx(idx);
      }
    }
  }, [initialSlug, photos]);

  const activePhoto = photos[activeIdx];

  const goToNext = () => {
    if (activeIdx < photos.length - 1) {
      const nextIdx = activeIdx + 1;
      setActiveIdx(nextIdx);
      onSelectPhoto?.(photos[nextIdx].slug);
    }
  };

  const goToPrev = () => {
    if (activeIdx > 0) {
      const prevIdx = activeIdx - 1;
      setActiveIdx(prevIdx);
      onSelectPhoto?.(photos[prevIdx].slug);
    }
  };

  const selectIndex = (idx: number) => {
    setActiveIdx(idx);
    onSelectPhoto?.(photos[idx].slug);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveIdx((prev) => {
          if (prev > 0) {
            const next = prev - 1;
            onSelectPhoto?.(photos[next].slug);
            return next;
          }
          return prev;
        });
      } else if (e.key === "ArrowRight") {
        setActiveIdx((prev) => {
          if (prev < photos.length - 1) {
            const next = prev + 1;
            onSelectPhoto?.(photos[next].slug);
            return next;
          }
          return prev;
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photos, onSelectPhoto]);

  const copyDeepLink = () => {
    if (typeof window !== "undefined" && activePhoto) {
      const url = `${window.location.origin}/gallery?photo=${activePhoto.slug}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!photos.length) {
    return (
      <div className="p-16 glass-panel border border-border rounded-glass text-center text-muted">
        No photographic spreads found in this selection.
      </div>
    );
  }

  // OpenStreetMap link if coordinates are specified
  const osmUrl =
    activePhoto.entry.latitude && activePhoto.entry.longitude
      ? `https://www.openstreetmap.org/?mlat=${activePhoto.entry.latitude}&mlon=${activePhoto.entry.longitude}#map=14/${activePhoto.entry.latitude}/${activePhoto.entry.longitude}`
      : null;

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center select-none py-6 overflow-hidden"
      aria-label="3D Journal Coverflow"
    >
      {/* 3D SCENE STAGE (CSS 3D perspective 1200px) */}
      <div
        className="relative w-full max-w-6xl h-[480px] sm:h-[540px] md:h-[600px] flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        {photos.map((photo, idx) => {
          const offset = idx - activeIdx;
          const isCenter = offset === 0;

          // Limit render range to active +/- 3 for performance
          if (Math.abs(offset) > 3) return null;

          // 3D transformation values
          const rotateY = isCenter
            ? 0
            : offset < 0
            ? shouldReduceMotion
              ? 0
              : 32
            : shouldReduceMotion
            ? 0
            : -32;

          const translateX = offset * (typeof window !== "undefined" && window.innerWidth < 768 ? 140 : 280);
          const translateZ = isCenter ? 0 : -160 * Math.abs(offset);
          const scale = isCenter ? 1 : Math.max(0.7, 1 - Math.abs(offset) * 0.12);
          const opacity = isCenter ? 1 : Math.max(0.3, 0.7 - Math.abs(offset) * 0.15);
          const zIndex = 20 - Math.abs(offset);

          return (
            <motion.div
              key={photo.slug}
              onClick={() => !isCenter && selectIndex(idx)}
              animate={{
                x: translateX,
                z: translateZ,
                rotateY,
                scale,
                opacity,
              }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 280, damping: 28 }
              }
              style={{
                zIndex,
                transformStyle: "preserve-3d",
              }}
              className={cn(
                "absolute w-[92vw] sm:w-[84vw] md:w-[760px] lg:w-[840px] cursor-pointer",
                !isCenter && "cursor-pointer hover:opacity-90"
              )}
            >
              {/* OPEN BOOK SPREAD (Reference 04: Two-page open journal) */}
              <div
                className={cn(
                  "relative rounded-2xl md:rounded-3xl border border-border/80 overflow-hidden shadow-2xl transition-shadow",
                  "bg-[#1B1A18]",
                  isCenter ? "shadow-[0_24px_64px_rgba(0,0,0,0.7)]" : "shadow-xl"
                )}
              >
                {/* Book Center Gutter Crease Divider (Paper book fold) */}
                <div
                  aria-hidden="true"
                  className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 pointer-events-none z-20"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(237,230,211,0.06) 50%, rgba(0,0,0,0.3) 100%)",
                  }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 min-h-[380px] sm:min-h-[440px] md:min-h-[480px]">
                  {/* LEFT PAGE: Photo Frame */}
                  <div className="relative bg-[#141412] p-4 sm:p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border/40">
                    <div className="relative w-full flex-1 aspect-[4/3] md:aspect-auto min-h-[220px] sm:min-h-[280px] rounded-xl overflow-hidden bg-black/40 border border-border/40 flex items-center justify-center">
                      {photo.entry.image_path ? (
                        <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#242320] to-[#121211] p-6 text-center">
                          {/* Stylized analog film frame graphic */}
                          <div className="w-16 h-16 rounded-full border border-signal/40 bg-surface flex items-center justify-center mb-3">
                            <Compass className="w-8 h-8 text-signal" />
                          </div>
                          <span className="font-mono text-xs text-text font-semibold uppercase tracking-wider block">
                            {photo.entry.title}
                          </span>
                          <span className="font-mono text-[11px] text-muted mt-1 block">
                            35MM OPTICAL EXPOSURE
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-center">
                          <Compass className="w-10 h-10 text-signal/60 mb-2" />
                          <span className="font-mono text-xs text-muted">
                            SPECIMEN // {photo.slug}
                          </span>
                        </div>
                      )}

                      {/* Film edge perforations watermark */}
                      <div className="absolute bottom-2 left-3 right-3 flex justify-between text-[9px] font-mono text-[#EDE6D3]/30 tracking-widest pointer-events-none">
                        <span>ISO 400</span>
                        <span>EXP {String(idx + 1).padStart(2, "0")}</span>
                      </div>
                    </div>

                    {/* Left page sub-caption */}
                    <div className="pt-3 flex items-center justify-between text-[11px] font-mono text-muted">
                      <span>SPREAD_{String(idx + 1).padStart(2, "0")} {"// LEFT"}</span>
                      <span>35MM FILM</span>
                    </div>
                  </div>

                  {/* RIGHT PAGE: Editorial Journal Page */}
                  <div className="relative p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#1C1B19] to-[#161513]">
                    <div className="space-y-5">
                      {/* Top metadata pill */}
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-signal uppercase font-semibold flex items-center gap-1.5">
                          {photo.entry.location_name && (
                            <>
                              <MapPin className="w-3.5 h-3.5" />
                              <span>{photo.entry.location_name}</span>
                            </>
                          )}
                        </span>
                        {photo.entry.taken_at && (
                          <span className="text-muted flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-signal" />
                            <span>
                              {new Date(photo.entry.taken_at).toLocaleDateString("en-US", {
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <div className="space-y-2">
                        <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-text leading-tight">
                          {photo.entry.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted leading-relaxed font-normal">
                          {photo.entry.caption}
                        </p>
                      </div>

                      {/* Alt text accessibility indicator */}
                      <div className="p-3 rounded-lg bg-surface/60 border border-border/60">
                        <span className="font-mono text-[10px] uppercase text-signal tracking-wider block font-semibold mb-1">
                          VISUAL DESCRIPTION // ALT
                        </span>
                        <p className="text-xs text-text/80 leading-relaxed italic">
                          &ldquo;{photo.entry.alt_text}&rdquo;
                        </p>
                      </div>
                    </div>

                    {/* Right page bottom metadata & coordinates */}
                    <div className="pt-4 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted">
                      <span>ALBUM: {photo.entry.album?.toUpperCase() || "MONOCHROME"}</span>
                      {photo.entry.latitude && photo.entry.longitude && (
                        <span>
                          {photo.entry.latitude}° N, {photo.entry.longitude}° E
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* GROUNDING CAST SHADOW ON CANVAS FLOOR (Reference 04) */}
              {isCenter && (
                <div
                  aria-hidden="true"
                  className="w-full h-8 mx-auto -mt-2 rounded-full opacity-60 blur-xl pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.85) 0%, transparent 70%)",
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* DOCKED CIRCULAR ACTION BUTTONS UNDER CENTER SPREAD (Reference 04) */}
      <div className="relative z-30 mt-6 flex items-center gap-3">
        {/* Previous arrow */}
        <button
          onClick={goToPrev}
          disabled={activeIdx === 0}
          aria-label="Previous spread"
          className={cn(
            "w-11 h-11 rounded-full flex items-center justify-center border transition-all",
            "bg-surface/90 border-border text-text shadow-lg hover:border-text active:scale-95",
            activeIdx === 0 && "opacity-40 cursor-not-allowed"
          )}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* OpenStreetMap link button (privacy-respecting) */}
        {osmUrl ? (
          <a
            href={osmUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open coordinates in OpenStreetMap"
            title="View location on OpenStreetMap"
            className="w-11 h-11 rounded-full flex items-center justify-center border bg-surface/90 border-border text-muted hover:text-text hover:border-text transition-all active:scale-95"
          >
            <MapPin className="w-4 h-4 text-signal" />
          </a>
        ) : (
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center border bg-surface/40 border-border/40 text-muted/40 cursor-not-allowed"
            title="No GPS coordinates on file"
          >
            <MapPin className="w-4 h-4" />
          </div>
        )}

        {/* Copy deep link button */}
        <button
          onClick={copyDeepLink}
          aria-label="Copy spread link"
          title="Copy deep link to this spread"
          className="w-11 h-11 rounded-full flex items-center justify-center border bg-surface/90 border-border text-muted hover:text-text hover:border-text transition-all active:scale-95"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Share2 className="w-4 h-4 text-signal" />
          )}
        </button>

        {/* Next arrow */}
        <button
          onClick={goToNext}
          disabled={activeIdx === photos.length - 1}
          aria-label="Next spread"
          className={cn(
            "w-11 h-11 rounded-full flex items-center justify-center border transition-all",
            "bg-surface/90 border-border text-text shadow-lg hover:border-text active:scale-95",
            activeIdx === photos.length - 1 && "opacity-40 cursor-not-allowed"
          )}
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Progress index counter */}
      <div className="mt-4 text-center">
        <span className="font-mono text-xs text-muted tracking-widest">
          SPREAD {activeIdx + 1} OF {photos.length}
        </span>
      </div>
    </div>
  );
}

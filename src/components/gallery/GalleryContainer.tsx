"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PhotoItem, AlbumItem } from "@/lib/content";
import { GalleryToolbar } from "@/components/gallery/GalleryToolbar";
import { JournalCoverflow } from "@/components/gallery/JournalCoverflow";
import { GridView } from "@/components/gallery/GridView";

interface GalleryContainerProps {
  photos: PhotoItem[];
  albums: AlbumItem[];
}

export function GalleryContainer({ photos, albums }: GalleryContainerProps) {
  const searchParams = useSearchParams();
  const photoParam = searchParams.get("photo");

  const [viewMode, setViewMode] = useState<"journal" | "grid">("journal");
  const [selectedAlbum, setSelectedAlbum] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activePhotoSlug, setActivePhotoSlug] = useState<string | null>(photoParam);

  // Sync with URL param if user lands via deep link
  useEffect(() => {
    if (photoParam) {
      setActivePhotoSlug(photoParam);
      setViewMode("journal");
    }
  }, [photoParam]);

  // Handle photo selection and update browser URL without hard reload
  const handleSelectPhoto = (slug: string) => {
    setActivePhotoSlug(slug);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("photo", slug);
      window.history.replaceState({}, "", url.toString());
    }
  };

  // Filter photos by selected album and search text
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      const matchAlbum =
        selectedAlbum === "all" ||
        (photo.entry.album &&
          photo.entry.album.toLowerCase() === selectedAlbum.toLowerCase());

      const query = searchQuery.trim().toLowerCase();
      const matchQuery =
        !query ||
        photo.entry.title.toLowerCase().includes(query) ||
        (photo.entry.caption &&
          photo.entry.caption.toLowerCase().includes(query)) ||
        (photo.entry.location_name &&
          photo.entry.location_name.toLowerCase().includes(query));

      return matchAlbum && matchQuery;
    });
  }, [photos, selectedAlbum, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Reference 04 Header Controls & Toolbar */}
      <GalleryToolbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        albums={albums}
        selectedAlbum={selectedAlbum}
        onAlbumChange={setSelectedAlbum}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalSpreads={filteredPhotos.length}
      />

      {/* Main View Mode Display */}
      {viewMode === "journal" ? (
        <JournalCoverflow
          photos={filteredPhotos}
          initialSlug={activePhotoSlug}
          onSelectPhoto={handleSelectPhoto}
        />
      ) : (
        <GridView
          photos={filteredPhotos}
          onSelectPhoto={(slug) => {
            handleSelectPhoto(slug);
            setViewMode("journal");
          }}
        />
      )}
    </div>
  );
}

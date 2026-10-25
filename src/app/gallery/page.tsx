import { Suspense } from "react";
import type { Metadata } from "next";
import { getPhotos, getAlbums } from "@/lib/content";
import { GalleryContainer } from "@/components/gallery/GalleryContainer";

export const metadata: Metadata = {
  title: "Visual Journal & Photography · Tariq Youhana Leon",
  description:
    "3D journal coverflow of 35mm optical street photography, architectural chiaroscuro, and travel essays.",
};

export default async function GalleryPage() {
  const [photos, albums] = await Promise.all([getPhotos(), getAlbums()]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-10 space-y-8">
      <Suspense
        fallback={
          <div className="p-20 text-center font-mono text-xs text-muted">
            LOADING_JOURNAL // 3D_SCENE_INITIALIZING...
          </div>
        }
      >
        <GalleryContainer photos={photos} albums={albums} />
      </Suspense>
    </div>
  );
}

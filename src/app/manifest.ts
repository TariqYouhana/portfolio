import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Tariq Youhana Leon · Portfolio",
    short_name: "TYL Portfolio",
    description:
      "Data systems, distributed architectures, and visual storytelling. Personal portfolio of Tariq Youhana Leon.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F0E0C",
    theme_color: "#0F0E0C",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    categories: ["portfolio", "technology"],
  };
}

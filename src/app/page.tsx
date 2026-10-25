import {
  getSiteSettings,
  getProjects,
  getSkills,
  getPosts,
  getPhotos,
  getAchievements,
} from "@/lib/content";
import { Hero } from "@/components/home/Hero";
import { StatsStrip } from "@/components/home/StatsStrip";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ProjectsOverview } from "@/components/home/ProjectsOverview";
import { SkillsModule } from "@/components/home/SkillsModule";
import { LatestBlog } from "@/components/home/LatestBlog";

export default async function HomePage() {
  const [settings, projects, skills, posts, photos, achievements] =
    await Promise.all([
      getSiteSettings(),
      getProjects(),
      getSkills(),
      getPosts(),
      getPhotos(),
      getAchievements(),
    ]);

  // ── JSON-LD Person schema (plan §12) ──────────────────────────────────────
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: settings.display_name,
    url: "https://tariqleon.com",
    jobTitle: "Data & Software Engineer",
    description: settings.about_short,
    sameAs: [
      settings.social_github,
      settings.social_linkedin,
      settings.social_instagram,
      settings.social_youtube,
      settings.social_facebook,
    ].filter(Boolean),
    worksFor: {
      "@type": "Organization",
      name: "Tenstral Technologies",
    },
    knowsAbout: [
      "Distributed Systems",
      "Data Engineering",
      "Historical Cartography",
      "Analog Cinematography",
    ],
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* JSON-LD structured data — invisible to users, read by search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero (Reference 03 Chiaroscuro & Cinematic Typography) */}
      <Hero settings={settings} projectsCount={projects.length} />

      {/* 2. Stats Strip (Animated Live Counters) */}
      <StatsStrip
        projectsCount={projects.length}
        postsCount={posts.length}
        photosCount={photos.length}
        achievementsCount={achievements.length}
      />

      {/* 3. About Preview (Editorial Bio, Plate & Facts) */}
      <AboutPreview settings={settings} />

      {/* 4. Projects Overview (Top Featured Files) */}
      <ProjectsOverview projects={projects} />

      {/* 5. Skills Matrix (Categorized Tiers, Zero Vanity Gauges) */}
      <SkillsModule skills={skills} />

      {/* 6. Latest from the Blog (Editorial Dispatches) */}
      <LatestBlog posts={posts} />
    </div>
  );
}

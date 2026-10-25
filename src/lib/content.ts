import { createReader } from "@keystatic/core/reader";
import { z } from "zod";
import keystaticConfig from "../../keystatic.config";

// Singleton Reader instance for server-side build and page rendering
export const reader = createReader(process.cwd(), keystaticConfig);

/**
 * Image URL Helper (Plan Section 9 & 10)
 * Turns an image path into a resolved URL, enabling future migration to Cloudflare R2
 * or Cloudinary without touching any page component.
 */
export function getImageUrl(imagePath?: string | null): string {
  if (!imagePath) return "/brand/logo-full.svg";
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }
  const cdnBase = process.env.NEXT_PUBLIC_CDN_URL?.replace(/\/$/, "");
  if (cdnBase) {
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    return `${cdnBase}${cleanPath}`;
  }
  return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
}

// ==========================================
// Zod Schemas for Strict Build Validation
// ==========================================

export const SiteSettingsSchema = z.object({
  display_name: z.string().min(1, "Display name is required"),
  tagline: z.string().default(""),
  hero_credit_lines: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .default([]),
  about_short: z.string().default(""),
  contact_email: z.string().email().or(z.string()),
  show_email: z.boolean().default(true),
  contact_location: z.string().default(""),
  show_location: z.boolean().default(true),
  social_github: z.string().default(""),
  social_linkedin: z.string().default(""),
  social_instagram: z.string().default(""),
  social_youtube: z.string().default(""),
  social_facebook: z.string().default(""),
});

export type SiteSettings = z.infer<typeof SiteSettingsSchema>;

export const SkillItemSchema = z.object({
  name: z.string(),
  category: z.enum(["data", "software", "tools", "other"]),
  level: z.enum(["strong", "comfortable", "learning"]),
  order: z.number().default(0),
  visible: z.boolean().default(true),
});

export type SkillItem = z.infer<typeof SkillItemSchema>;

export const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  tagline: z.string().default(""),
  status: z.enum(["live", "in-development", "concept", "archived"]),
  role: z.string().default(""),
  tags: z.array(z.string()).default([]),
  accent_color: z.string().default("var(--earth-olive)"),
  is_primary: z.boolean().default(false),
  featured: z.boolean().default(false),
  order: z.number().default(10),
  draft: z.boolean().default(false),
  link_live: z.string().optional().default(""),
  link_repo: z.string().optional().default(""),
});

export type Project = z.infer<typeof ProjectSchema>;

// ==========================================
// Data Fetching Functions
// ==========================================

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await reader.singletons.settings.read();
  const parsed = SiteSettingsSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Invalid site settings schema:", parsed.error.format());
    throw new Error(`Build Error: content/settings schema validation failed`);
  }
  return parsed.data;
}

export async function getSkills(): Promise<SkillItem[]> {
  const data = await reader.singletons.skills.read();
  const items = data?.items || [];
  const validated = items.map((item) => SkillItemSchema.parse(item));
  return validated.filter((s) => s.visible).sort((a, b) => a.order - b.order);
}

export async function getProjects(): Promise<Project[]> {
  const rawProjects = await reader.collections.projects.all();
  const projects: Project[] = [];

  for (const p of rawProjects) {
    const entry = ProjectSchema.parse({
      slug: p.slug,
      ...p.entry,
    });
    // Filter out drafts during public builds unless in development mode
    if (process.env.NODE_ENV === "production" && entry.draft) {
      continue;
    }
    projects.push(entry);
  }

  // Non-negotiable Rule: The build fails if more than one project is marked as primary
  const primaryProjects = projects.filter((p) => p.is_primary);
  if (primaryProjects.length > 1) {
    const names = primaryProjects.map((p) => p.title).join(", ");
    throw new Error(
      `Build Error: Only one project can be marked as primary (found ${primaryProjects.length}: ${names})`
    );
  }

  // Sort by order ascending
  return projects.sort((a, b) => a.order - b.order);
}

export async function getProject(slug: string) {
  const project = await reader.collections.projects.read(slug);
  if (!project) return null;
  return {
    slug,
    ...project,
  };
}

export async function getPosts() {
  const rawPosts = await reader.collections.posts.all();
  return rawPosts
    .filter((p) => (process.env.NODE_ENV === "production" ? !p.entry.draft : true))
    .map((p) => ({
      slug: p.slug,
      entry: {
        title: p.entry.title,
        excerpt: p.entry.excerpt,
        category: p.entry.category,
        tags: p.entry.tags,
        publish_date: p.entry.publish_date,
        draft: p.entry.draft,
      },
    }))
    .sort(
      (a, b) =>
        new Date(b.entry.publish_date || 0).getTime() -
        new Date(a.entry.publish_date || 0).getTime()
    );
}

export async function getAchievements() {
  const raw = await reader.collections.achievements.all();
  return raw
    .filter((a) => (process.env.NODE_ENV === "production" ? !a.entry.draft : true))
    .sort(
      (a, b) =>
        new Date(b.entry.date || 0).getTime() - new Date(a.entry.date || 0).getTime()
    );
}

export async function getPhotos() {
  const raw = await reader.collections.photos.all();
  return raw
    .filter((p) => (process.env.NODE_ENV === "production" ? !p.entry.draft : true))
    .sort((a, b) => (a.entry.order ?? 10) - (b.entry.order ?? 10));
}

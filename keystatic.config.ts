import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage:
    process.env.NODE_ENV === "production" && process.env.KEYSTATIC_STORAGE === "github"
      ? {
          kind: "github",
          repo: {
            owner: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER || "tariqleon",
            name: process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG || "portfolio",
          },
        }
      : {
          kind: "local",
        },
  singletons: {
    settings: singleton({
      label: "Site Settings",
      path: "content/settings/index",
      format: { data: "json" },
      schema: {
        display_name: fields.text({
          label: "Display Name",
          defaultValue: "Tariq Youhana Leon",
          validation: { isRequired: true },
        }),
        tagline: fields.text({
          label: "Tagline",
          defaultValue:
            "Data systems, distributed architectures, and visual storytelling. One clear front door, many rooms.",
        }),
        hero_credit_lines: fields.array(
          fields.object({
            label: fields.text({ label: "Label (e.g. FOCUS, VENTURE)" }),
            value: fields.text({ label: "Value" }),
          }),
          {
            label: "Hero Credit Lines",
            itemLabel: (props) => `${props.fields.label.value}: ${props.fields.value.value}`,
          }
        ),
        about_short: fields.text({
          label: "Short Bio (Landing)",
          multiline: true,
          defaultValue:
            "Building high-throughput data pipelines and robust distributed backends by day; exploring cartography, historical archives, 35mm cinematography, and poetry by night.",
        }),
        contact_email: fields.text({
          label: "Contact Email",
          defaultValue: "contact@tariqleon.com",
        }),
        show_email: fields.checkbox({
          label: "Display Email Publicly",
          defaultValue: true,
        }),
        contact_location: fields.text({
          label: "Location / Region",
          defaultValue: "Available worldwide / remotely",
        }),
        show_location: fields.checkbox({
          label: "Display Location Publicly",
          defaultValue: true,
        }),
        social_github: fields.text({
          label: "GitHub URL",
          defaultValue: "https://github.com",
        }),
        social_linkedin: fields.text({
          label: "LinkedIn URL",
          defaultValue: "https://linkedin.com",
        }),
        social_instagram: fields.text({
          label: "Instagram URL",
          defaultValue: "https://instagram.com",
        }),
        social_youtube: fields.text({
          label: "YouTube URL",
          defaultValue: "https://youtube.com",
        }),
        social_facebook: fields.text({
          label: "Facebook URL",
          defaultValue: "https://facebook.com",
        }),
      },
    }),
    skills: singleton({
      label: "Skills & Proficiencies",
      path: "content/skills/index",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            name: fields.text({ label: "Skill / Technology Name" }),
            category: fields.select({
              label: "Category",
              options: [
                { label: "Data Engineering", value: "data" },
                { label: "Software & Architecture", value: "software" },
                { label: "Tools & Infrastructure", value: "tools" },
                { label: "Other Disciplines", value: "other" },
              ],
              defaultValue: "software",
            }),
            level: fields.select({
              label: "Proficiency Level",
              options: [
                { label: "Strong", value: "strong" },
                { label: "Comfortable", value: "comfortable" },
                { label: "Learning", value: "learning" },
              ],
              defaultValue: "comfortable",
            }),
            order: fields.integer({ label: "Sort Order", defaultValue: 0 }),
            visible: fields.checkbox({ label: "Visible", defaultValue: true }),
          }),
          {
            label: "Skill List",
            itemLabel: (props) => `${props.fields.name.value} (${props.fields.category.value} - ${props.fields.level.value})`,
          }
        ),
      },
    }),
  },
  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "content/projects/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Project Title" } }),
        tagline: fields.text({ label: "One-line Summary" }),
        status: fields.select({
          label: "Status (Mandatory & Honest)",
          options: [
            { label: "Live", value: "live" },
            { label: "In development", value: "in-development" },
            { label: "Concept", value: "concept" },
            { label: "Archived", value: "archived" },
          ],
          defaultValue: "in-development",
        }),
        role: fields.text({ label: "My Role" }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Technology Tags",
          itemLabel: (props) => props.value,
        }),
        accent_color: fields.text({
          label: "Folder Accent Color Token (e.g. var(--earth-olive))",
          defaultValue: "var(--earth-olive)",
        }),
        is_primary: fields.checkbox({
          label: "Primary Project (Default Front Folder - Only one allowed)",
          defaultValue: false,
        }),
        featured: fields.checkbox({
          label: "Feature on Landing Page",
          defaultValue: true,
        }),
        order: fields.integer({ label: "Order (Lower comes first)", defaultValue: 10 }),
        draft: fields.checkbox({ label: "Draft", defaultValue: false }),
        link_live: fields.text({ label: "Live Deployment URL" }),
        link_repo: fields.text({ label: "Code Repository URL" }),
        content: fields.markdoc({
          label: "Case Study Content (Problem, Build, Architecture, Outcome)",
        }),
      },
    }),
    posts: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Post Title" } }),
        excerpt: fields.text({ label: "Excerpt / Summary", multiline: true }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "Data", value: "data" },
            { label: "Software", value: "software" },
            { label: "History", value: "history" },
            { label: "Film", value: "film" },
            { label: "Poetry", value: "poetry" },
            { label: "Life", value: "life" },
          ],
          defaultValue: "software",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        publish_date: fields.date({
          label: "Publish Date",
          defaultValue: { kind: "today" },
        }),
        draft: fields.checkbox({ label: "Draft", defaultValue: false }),
        content: fields.markdoc({ label: "Article Body" }),
      },
    }),
    albums: collection({
      label: "Photo Albums",
      slugField: "title",
      path: "content/albums/*",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Album Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        order: fields.integer({ label: "Display Order", defaultValue: 10 }),
      },
    }),
    photos: collection({
      label: "Photos & Journal Entries",
      slugField: "title",
      path: "content/photos/*",
      format: { contentField: "story" },
      schema: {
        title: fields.slug({ name: { label: "Photo / Spread Title" } }),
        album: fields.text({ label: "Album Slug (e.g. europe-2026, street-35mm)" }),
        caption: fields.text({ label: "Short Caption" }),
        alt_text: fields.text({
          label: "Alt Text (Mandatory for accessibility)",
          validation: { isRequired: true },
        }),
        location_name: fields.text({ label: "Location Name (e.g. Granada, Spain)" }),
        latitude: fields.text({ label: "Latitude (Optional)" }),
        longitude: fields.text({ label: "Longitude (Optional)" }),
        taken_at: fields.date({ label: "Date Taken" }),
        order: fields.integer({ label: "Sort Order", defaultValue: 10 }),
        draft: fields.checkbox({ label: "Draft", defaultValue: false }),
        image_path: fields.text({
          label: "Image Path (e.g. /images/gallery/photo-01.jpg)",
        }),
        story: fields.markdoc({ label: "Journal Spread Story / Essay" }),
      },
    }),
    achievements: collection({
      label: "Achievements & Trophies",
      slugField: "title",
      path: "content/achievements/*",
      format: { data: "json" },
      schema: {
        title: fields.slug({ name: { label: "Entry Title" } }),
        event_name: fields.text({ label: "Event Name (e.g. HackTheState 2026)" }),
        kind: fields.select({
          label: "Kind",
          options: [
            { label: "Hackathon", value: "hackathon" },
            { label: "CTF Competition", value: "ctf" },
            { label: "Technical Competition", value: "competition" },
            { label: "Other", value: "other" },
          ],
          defaultValue: "hackathon",
        }),
        result: fields.select({
          label: "Exact Tier (No exaggeration)",
          options: [
            { label: "Winner (1st Place)", value: "winner" },
            { label: "Podium & Finalist (Top 3 / Runner Up)", value: "podium" },
            { label: "Participant", value: "participant" },
          ],
          defaultValue: "participant",
        }),
        result_text: fields.text({
          label: "Exact Result Label (e.g. 'Champion / 1st Place', '3rd of 80 Teams')",
        }),
        organizer: fields.text({ label: "Organiser / Host" }),
        date: fields.date({ label: "Date" }),
        team: fields.text({ label: "Team Name & Size" }),
        role: fields.text({ label: "My Role" }),
        summary: fields.text({ label: "What we built or solved", multiline: true }),
        project_link: fields.text({ label: "Associated Project URL" }),
        certificate_image: fields.text({ label: "Certificate Image URL" }),
        featured: fields.checkbox({ label: "Featured on Landing Page", defaultValue: false }),
        draft: fields.checkbox({ label: "Draft", defaultValue: false }),
      },
    }),
  },
});

import type { Metadata } from "next";
import { getProjects } from "@/lib/content";
import { FolderSwitcher } from "@/components/projects/FolderSwitcher";
import { ProjectCatalog } from "@/components/projects/ProjectCatalog";

export const metadata: Metadata = {
  title: "Projects & Systems",
  description:
    "Engineering work spanning data pipelines, distributed systems, AI platforms, and historical research tools.",
  openGraph: {
    title: "Projects & Systems — Tariq Youhana Leon",
    description:
      "Data pipelines, distributed architectures, AI platforms, and historical research tools.",
    url: "https://tariqleon.com/projects",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Systems — Tariq Youhana Leon",
    description: "Data pipelines, distributed systems, and more.",
  },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-12 space-y-20">
      {/* Page Header */}
      <div className="space-y-3">
        <span className="font-mono text-xs uppercase text-signal tracking-widest block">
          FILE_STACK // {String(projects.length).padStart(2, "0")} PROJECTS
        </span>
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-text leading-[0.9]">
          Projects &{" "}
          <span className="font-accent italic font-normal text-signal">
            systems
          </span>
        </h1>
        <p className="text-sm md:text-base text-muted max-w-2xl leading-relaxed">
          Engineered files arranged as physical folders. Select any tab to bring a project forward and examine its architecture.
        </p>
      </div>

      {/* Signature Folder Switcher (Reference 01 recreation) */}
      <section aria-label="Project folder switcher">
        <FolderSwitcher projects={projects} />
      </section>

      {/* Filterable List Catalog */}
      <section aria-label="All projects catalog">
        <div className="pb-8 border-b border-border">
          <span className="font-mono text-xs uppercase text-signal tracking-widest block mb-2">
            CATALOG // ALL_RECORDS
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-text">
            Complete Index
          </h2>
        </div>
        <ProjectCatalog projects={projects} />
      </section>
    </div>
  );
}

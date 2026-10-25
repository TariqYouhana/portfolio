import Link from "next/link";
import { ArrowRight, Layers, Award, Camera, BookOpen, User, Mail, ShieldCheck } from "lucide-react";
import { getSiteSettings, getProjects } from "@/lib/content";

export default async function HomePage() {
  const settings = await getSiteSettings();
  const projects = await getProjects();
  const primaryProject = projects.find((p) => p.is_primary) || projects[0];

  return (
    <div className="w-full flex flex-col items-center">
      {/* HERO SECTION (Dynamic from content/settings/index.json) */}
      <section className="w-full min-h-[75vh] flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto py-12 md:py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-xs font-mono text-signal mb-6 w-fit">
          <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
          <span>PHASE_01 // CONTENT_SYSTEM_CONNECTED</span>
        </div>

        <div className="max-w-4xl space-y-4">
          <h1 className="font-display font-extrabold uppercase tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95]">
            {settings.display_name.split(" ")[0]}{" "}
            <span className="font-accent italic font-normal text-signal">
              {settings.display_name.split(" ")[1] || ""}
            </span>{" "}
            {settings.display_name.split(" ").slice(2).join(" ")}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted font-normal max-w-2xl leading-relaxed">
            {settings.tagline}
          </p>
        </div>

        {/* Film-credit style meta block (Dynamic from content/settings) */}
        {settings.hero_credit_lines && settings.hero_credit_lines.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-3xl">
            {settings.hero_credit_lines.map((line) => (
              <div key={line.label}>
                <span className="block font-mono text-xs uppercase tracking-wider text-signal font-semibold">
                  {line.label} {"//"}
                </span>
                <span className="text-sm font-medium text-text">{line.value}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-text text-bg font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <span>Explore Projects ({projects.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-surface border border-border text-text font-medium text-sm hover:border-text transition-colors"
          >
            <span>Get in Touch</span>
          </Link>
        </div>
      </section>

      {/* PRIMARY PROJECT HIGHLIGHT */}
      {primaryProject && (
        <section className="w-full max-w-7xl mx-auto px-6 md:px-12 pb-12">
          <div className="p-6 md:p-8 rounded-glass glass-panel border border-border/70 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-signal/10 border border-signal/30 text-signal font-semibold">
                  PRIMARY PROJECT
                </span>
                <span className="text-xs font-mono text-muted uppercase">
                  STATUS: {primaryProject.status}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold uppercase">
                {primaryProject.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {primaryProject.tagline}
              </p>
            </div>
            <Link
              href={`/projects/${primaryProject.slug}`}
              className="inline-flex items-center gap-2 text-xs font-mono px-4 py-2 rounded border border-text/30 hover:bg-surface text-text hover:border-text transition-colors whitespace-nowrap"
            >
              <span>OPEN FILE // DETAILS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      )}

      {/* ROOMS DIRECTORY STRIP */}
      <section className="w-full bg-surface/40 border-y border-border py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="font-mono text-xs uppercase text-signal tracking-widest block mb-2">
                INDEX // ROOMS
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight">
                Architectural Navigation
              </h2>
            </div>
            <p className="text-sm text-muted max-w-md">
              Each facet of work and study resides in its dedicated chamber. Designed with tactile depth and analog precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Projects",
                href: "/projects",
                code: "ROOM_01 //",
                icon: Layers,
                desc: `${projects.length} structured files in stack, including primary folder ${primaryProject?.title || ""}.`,
              },
              {
                title: "Gallery",
                href: "/gallery",
                code: "ROOM_02 //",
                icon: Camera,
                desc: "3D journal coverflow of photographic essays, archival scans, and travel spreads.",
              },
              {
                title: "Achievements",
                href: "/achievements",
                code: "ROOM_03 //",
                icon: Award,
                desc: "Dark glass trophy cabinet categorizing hackathons, CTFs, and verified podium finishes.",
              },
              {
                title: "Blog & Essays",
                href: "/blog",
                code: "ROOM_04 //",
                icon: BookOpen,
                desc: "Dispatches on distributed data systems, history of Bengal, filmmaking, and poetry.",
              },
              {
                title: "About Tariq",
                href: "/about",
                code: "ROOM_05 //",
                icon: User,
                desc: settings.about_short,
              },
              {
                title: "Contact & Terminal",
                href: "/contact",
                code: "ROOM_06 //",
                icon: Mail,
                desc: `Direct communications channel (${settings.contact_email}). Encrypted email delivery.`,
              },
            ].map((room) => {
              const Icon = room.icon;
              return (
                <Link
                  key={room.href}
                  href={room.href}
                  className="group relative p-6 rounded-glass glass-panel hover:border-text transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-signal font-semibold">
                        {room.code}
                      </span>
                      <Icon className="w-5 h-5 text-muted group-hover:text-signal transition-colors" />
                    </div>
                    <h3 className="font-display font-bold text-xl uppercase group-hover:text-signal transition-colors">
                      {room.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {room.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-mono text-muted group-hover:text-text">
                    <span>ENTER ROOM</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ADMIN STATUS BANNER */}
      <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="p-6 rounded-glass border border-border bg-surface/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-signal flex-shrink-0" />
            <div>
              <h4 className="font-mono text-xs uppercase text-text font-semibold">
                ADMIN ACCESS // KEYSTATIC CMS ACTIVE
              </h4>
              <p className="text-xs text-muted">
                Private Git-backed content management active at <code>/admin</code>.
              </p>
            </div>
          </div>
          <Link
            href="/admin"
            className="text-xs font-mono px-3.5 py-1.5 rounded border border-border hover:bg-surface text-muted hover:text-text transition-colors"
          >
            Launch CMS Admin →
          </Link>
        </div>
      </section>
    </div>
  );
}

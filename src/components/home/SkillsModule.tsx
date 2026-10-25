import { Database, Cpu, Wrench } from "lucide-react";
import { SkillItem } from "@/lib/content";

interface SkillsModuleProps {
  skills: SkillItem[];
}

export function SkillsModule({ skills }: SkillsModuleProps) {
  const dataSkills = skills.filter((s) => s.category === "data");
  const softwareSkills = skills.filter((s) => s.category === "software");
  const toolsSkills = skills.filter(
    (s) => s.category === "tools" || s.category === "other"
  );

  const categories = [
    {
      title: "Data Systems",
      code: "GROUP_01 // DATA",
      icon: Database,
      items: dataSkills,
      description: "Pipelines, high-volume ingestion, consensus, and relational modeling.",
    },
    {
      title: "Software & Core",
      code: "GROUP_02 // SOFTWARE",
      icon: Cpu,
      items: softwareSkills,
      description: "Full-stack architectures, TypeScript/Next.js, and backend services.",
    },
    {
      title: "Infrastructure & Tools",
      code: "GROUP_03 // TOOLS",
      icon: Wrench,
      items: toolsSkills,
      description: "Linux environments, containerization, automation, and analog optics.",
    },
  ];

  return (
    <section
      aria-label="Technical Skills"
      className="w-full max-w-7xl mx-auto px-6 md:px-10 py-16 md:py-24 border-t border-border"
    >
      <div className="space-y-3 pb-12">
        <span className="font-mono text-xs uppercase text-signal tracking-widest block">
          CAPABILITIES // STACK
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-text">
          Technical Skills & Disciplines
        </h2>
        <p className="text-sm text-muted max-w-xl">
          Classified by discrete proficiency tiers. No arbitrary percentage bars or vanity meters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.title}
              className="p-6 rounded-glass glass-panel border border-border flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-signal font-semibold">
                    {cat.code}
                  </span>
                  <Icon className="w-4 h-4 text-muted" />
                </div>

                <div>
                  <h3 className="font-display font-bold text-xl uppercase tracking-tight text-text">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed mt-1">
                    {cat.description}
                  </p>
                </div>

                {/* Skill Tags */}
                <div className="flex flex-col gap-2 pt-2">
                  {cat.items.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-surface/60 border border-border/80"
                    >
                      <span className="text-xs font-medium text-text">
                        {skill.name}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase tracking-wider ${
                          skill.level === "strong"
                            ? "bg-text/10 text-text border border-text/20 font-semibold"
                            : skill.level === "comfortable"
                            ? "bg-surface text-muted border border-border"
                            : "bg-surface/40 text-muted/80 border border-border/40 italic"
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-[11px] font-mono text-muted/70">
                {cat.items.length} TRACKED CAPABILITIES
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

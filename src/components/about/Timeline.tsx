import { Calendar, Briefcase, GraduationCap, Award, Rocket } from "lucide-react";

interface Milestone {
  period: string;
  title: string;
  organization: string;
  role: string;
  description: string;
  type: "venture" | "education" | "achievement" | "research";
}

const MILESTONES: Milestone[] = [
  {
    period: "2025 — PRESENT",
    title: "Tenstral Technologies",
    organization: "Founder & Principal Architect",
    role: "Engineering Leadership",
    description:
      "Founded enterprise data and software engineering venture. Designing distributed data pipelines, secure cloud integrations, and performant user architectures.",
    type: "venture",
  },
  {
    period: "2025",
    title: "CyberSentinel CTF National Championship",
    organization: "Academic Security Alliance",
    role: "Cryptography & Binary Exploitation Lead",
    description:
      "Led university team to 1st Place / National Champion finish, solving complex reverse engineering and cryptographic challenges.",
    type: "achievement",
  },
  {
    period: "2023 — PRESENT",
    title: "Computer Science & Engineering Studies",
    organization: "University Academic Program",
    role: "Undergraduate Scholar",
    description:
      "Core focus on distributed systems, operating system primitives, database internals, and computational graph algorithms.",
    type: "education",
  },
  {
    period: "2024",
    title: "Regional Cartographic Research Initiative",
    organization: "Historical Preservation Project",
    role: "Lead Cartographer & GIS Analyst",
    description:
      "Triangulated historical survey records from 1757 to 1947 to map shifting riparian delta frontiers across Bengal.",
    type: "research",
  },
];

export function Timeline() {
  return (
    <section aria-label="Chronological milestones" className="space-y-8">
      <div className="space-y-2">
        <span className="font-mono text-xs uppercase text-signal tracking-widest block font-semibold">
          CHRONOLOGY // MILESTONES & PURSUITS
        </span>
        <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-text">
          Trajectory & Milestones
        </h2>
      </div>

      <div className="relative pl-6 sm:pl-8 border-l border-border/70 space-y-10 ml-2">
        {MILESTONES.map((item, idx) => {
          return (
            <div key={idx} className="relative group">
              {/* Timeline Node Dot */}
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-surface border-2 border-border group-hover:border-signal transition-colors flex items-center justify-center shadow-md"
                aria-hidden="true"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-signal" />
              </div>

              {/* Card Container */}
              <div className="p-6 rounded-glass glass-panel border border-border group-hover:border-text/40 transition-all space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                  <span className="text-signal font-semibold tracking-wider">
                    {item.period}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface border border-border text-muted uppercase text-[10px]">
                    {item.type}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-display font-bold text-xl uppercase tracking-tight text-text group-hover:text-signal transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-muted">
                    {item.organization} · {item.role}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

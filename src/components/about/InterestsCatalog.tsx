import { Compass, Camera, BookOpen, Plane, Feather } from "lucide-react";

interface InterestItem {
  title: string;
  code: string;
  icon: typeof Compass;
  description: string;
}

const INTERESTS: InterestItem[] = [
  {
    title: "Historical Cartography",
    code: "STUDY_01 //",
    icon: Compass,
    description:
      "Tracking colonial revenue maps, riparian border shifts across lower Bengal, and the political geography of partitions.",
  },
  {
    title: "35mm Analog Cinematography",
    code: "STUDY_02 //",
    icon: Camera,
    description:
      "Manual exposure on vintage optics, silver halide grain structure, chiaroscuro lighting, and documentary street framing.",
  },
  {
    title: "Detective Fiction & Forensic Logic",
    code: "STUDY_03 //",
    icon: BookOpen,
    description:
      "Classic locked-room mysteries, inductive reasoning chains, and analytical deduction paradigms from Golden Age crime fiction.",
  },
  {
    title: "Aerospace Dynamics",
    code: "STUDY_04 //",
    icon: Plane,
    description:
      "Orbital mechanics, fault-tolerant avionics telemetry, and structural telemetry architectures for harsh operational environments.",
  },
  {
    title: "Urdu Poetry & Classical Ghazals",
    code: "STUDY_05 //",
    icon: Feather,
    description:
      "Rhythmic meters, Roman Urdu transliterations, and the philosophical melancholia of Ghalib, Faiz, and modern blank verse.",
  },
];

export function InterestsCatalog() {
  return (
    <section aria-label="Intellectual interests and disciplines" className="space-y-8">
      <div className="space-y-2">
        <span className="font-mono text-xs uppercase text-signal tracking-widest block font-semibold">
          OBSESSIONS // INTELLECTUAL PURSUITS
        </span>
        <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-text">
          Interests & Disciplines
        </h2>
        <p className="text-sm text-muted max-w-xl">
          Areas of study outside daily engineering that shape structural thinking, narrative clarity, and aesthetic taste.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INTERESTS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-6 rounded-glass glass-panel border border-border flex flex-col justify-between space-y-4 hover:border-text/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-signal font-semibold">
                    {item.code}
                  </span>
                  <Icon className="w-4 h-4 text-muted" />
                </div>

                <h3 className="font-display font-bold text-lg uppercase tracking-tight text-text">
                  {item.title}
                </h3>

                <p className="text-xs text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 text-[10px] font-mono text-muted/60 tracking-wider uppercase">
                ACTIVE INQUIRY
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

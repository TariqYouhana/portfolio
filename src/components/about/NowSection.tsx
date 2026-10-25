import { Clock, Radio, ArrowUpRight } from "lucide-react";

export function NowSection() {
  return (
    <section aria-label="Current active pursuits" className="space-y-6">
      <div className="p-6 sm:p-8 rounded-glass glass-panel border border-border/80 bg-gradient-to-br from-surface to-[#1A1916] space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-signal animate-pulse" />
            <span className="font-mono text-xs uppercase text-signal font-semibold tracking-wider">
              TRANSMISSION // WHAT I AM WORKING ON NOW
            </span>
          </div>
          <span className="font-mono text-[10px] text-muted uppercase">
            UPDATED OCTOBER 2026
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="font-display font-bold text-xl uppercase tracking-tight text-text">
            Active Research & Deployments
          </h3>
          <p className="text-sm text-muted leading-relaxed max-w-3xl">
            Currently scaling enterprise client data infrastructure at <strong className="text-text">Tenstral Technologies</strong>, testing low-latency consensus protocols across heterogeneous compute nodes, and archiving Bengal partition boundary maps for the Historical Atlas.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-muted">
          <span className="px-3 py-1 rounded bg-surface border border-border">
            LOCATION: DHAKA · WORLDWIDE REMOTE
          </span>
          <span className="px-3 py-1 rounded bg-surface border border-border">
            STATUS: OPEN FOR SELECT CONSULTING & RESEARCH
          </span>
        </div>
      </div>
    </section>
  );
}

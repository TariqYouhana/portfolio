import type { Metadata } from "next";
import { getAchievements } from "@/lib/content";
import { AchievementsContainer } from "@/components/achievements/AchievementsContainer";

export const metadata: Metadata = {
  title: "Trophy Cabinet",
  description:
    "Dark glass trophy cabinet cataloging verified hackathons, CTF victories, and podium finishes. Labelled with absolute honesty.",
  openGraph: {
    title: "Trophy Cabinet — Tariq Youhana Leon",
    description:
      "Verified competitive victories, hackathon podiums, and CTF championships. Every result documented with unvarnished accuracy.",
    url: "https://tariqleon.com/achievements",
  },
  twitter: {
    card: "summary_large_image",
    title: "Trophy Cabinet — Tariq Youhana Leon",
    description: "Spotlit shelves of verified competitive wins and podiums.",
  },
};

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-10 py-12 space-y-12">
      {/* Page Header */}
      <div className="space-y-3">
        <span className="font-mono text-xs uppercase text-gold tracking-widest block font-semibold">
          REPUTATION_LOG // {String(achievements.length).padStart(2, "0")} VERIFIED RECORDS
        </span>
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-text leading-[0.9]">
          Trophy Cabinet &{" "}
          <span className="font-accent italic font-normal text-gold">
            honours
          </span>
        </h1>
        <p className="text-sm md:text-base text-muted max-w-2xl leading-relaxed">
          Spotlit shelves displaying competitive victories, runner-up podiums, and CTF challenges. Every result is documented with unvarnished accuracy.
        </p>
      </div>

      {/* Main Interactive Cabinet */}
      <AchievementsContainer achievements={achievements} />
    </div>
  );
}

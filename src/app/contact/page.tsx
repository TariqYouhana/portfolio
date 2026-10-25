import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/content";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactCoordinates } from "@/components/contact/ContactCoordinates";

export const metadata: Metadata = {
  title: "Contact — Tariq Youhana Leon",
  description:
    "Get in touch with Tariq Youhana Leon for engineering collaborations, consulting, research partnerships, or general inquiries.",
};

export default async function ContactPage() {
  const s = await getSiteSettings();

  return (
    <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
      {/* ── Page header ── */}
      <div className="space-y-4 mb-16">
        <span className="font-mono text-xs uppercase text-signal tracking-widest font-semibold">
          CONTACT // OPEN CHANNEL
        </span>
        <h1 className="font-display font-black text-5xl sm:text-6xl uppercase tracking-tight text-text leading-none">
          Get in Touch
        </h1>
        <p className="text-muted text-base max-w-xl leading-relaxed">
          For engineering engagements, research collaborations, consulting briefs, or anything
          you&#39;d rather discuss directly — the form is open.
        </p>
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 items-start">
        {/* Form */}
        <div className="p-8 rounded-glass glass-panel border border-border">
          <ContactForm />
        </div>

        {/* Coordinates sidebar */}
        <ContactCoordinates
          contactEmail={s.contact_email}
          showEmail={s.show_email}
          contactLocation={s.contact_location}
          showLocation={s.show_location}
          socialGithub={s.social_github}
          socialLinkedin={s.social_linkedin}
          socialInstagram={s.social_instagram}
          socialYoutube={s.social_youtube}
          socialFacebook={s.social_facebook}
        />
      </div>
    </main>
  );
}

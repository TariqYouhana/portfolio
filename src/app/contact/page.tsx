import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/content";
import { ContactCoordinates } from "@/components/contact/ContactCoordinates";
import { MailtoLink } from "@/components/contact/MailtoLink";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Tariq Youhana Leon for engineering collaborations, consulting, research partnerships, or general inquiries.",
  openGraph: {
    title: "Contact — Tariq Youhana Leon",
    description:
      "Open channel for engineering engagements, research collaborations, consulting briefs, and direct inquiries.",
    url: "https://tariqleon.com/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Tariq Youhana Leon",
    description: "Engineering, consulting, research — reach out directly.",
  },
};

export default async function ContactPage() {
  const s = await getSiteSettings();

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
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
          you&#39;d rather discuss directly — reach out by email.
        </p>
      </div>

      {/* ── Two-column layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-16 items-start">
        {/* Primary email CTA */}
        {s.show_email && s.contact_email && (
          <div className="p-8 rounded-glass glass-panel border border-border space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs uppercase text-signal tracking-widest font-semibold">
                EMAIL //
              </span>
              <p className="text-sm text-muted leading-relaxed max-w-md">
                Write me directly. Include a short description of what you&#39;d like to work on
                and I&#39;ll respond within 48 hours.
              </p>
            </div>
            <MailtoLink email={s.contact_email} className="mt-2" />
          </div>
        )}

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
    </div>
  );
}

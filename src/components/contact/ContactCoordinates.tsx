import {
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
} from "lucide-react";
import { MailtoLink } from "./MailtoLink";

interface Props {
  contactEmail: string;
  showEmail: boolean;
  contactLocation: string;
  showLocation: boolean;
  socialGithub: string;
  socialLinkedin: string;
  socialInstagram: string;
  socialYoutube: string;
  socialFacebook: string;
}

const SOCIAL_ICONS = [
  { key: "github", Icon: Github, label: "GitHub" },
  { key: "linkedin", Icon: Linkedin, label: "LinkedIn" },
  { key: "instagram", Icon: Instagram, label: "Instagram" },
  { key: "youtube", Icon: Youtube, label: "YouTube" },
  { key: "facebook", Icon: Facebook, label: "Facebook" },
] as const;

export function ContactCoordinates({
  contactEmail,
  showEmail,
  contactLocation,
  showLocation,
  socialGithub,
  socialLinkedin,
  socialInstagram,
  socialYoutube,
  socialFacebook,
}: Props) {
  const socialMap: Record<string, string> = {
    github: socialGithub,
    linkedin: socialLinkedin,
    instagram: socialInstagram,
    youtube: socialYoutube,
    facebook: socialFacebook,
  };

  return (
    <aside className="space-y-8 lg:sticky lg:top-32" aria-label="Contact information">
      {/* Label */}
      <span className="font-mono text-xs uppercase text-signal tracking-widest font-semibold block">
        COORDINATES // WHERE TO FIND ME
      </span>

      {/* Location */}
      {showLocation && (
        <div className="space-y-2">
          <h3 className="font-display font-bold text-sm uppercase tracking-wide text-text">
            Location
          </h3>
          <div className="flex items-start gap-3 text-sm text-muted">
            <MapPin className="w-4 h-4 mt-0.5 text-signal flex-shrink-0" aria-hidden="true" />
            <span>{contactLocation}</span>
          </div>
        </div>
      )}

      {/* Email — mailto link + copy button, rendered client-side only */}
      {showEmail && contactEmail && (
        <div className="space-y-2">
          <h3 className="font-display font-bold text-sm uppercase tracking-wide text-text">
            Direct Email
          </h3>
          <MailtoLink email={contactEmail} />
        </div>
      )}

      {/* Social links */}
      <div className="space-y-3">
        <h3 className="font-display font-bold text-sm uppercase tracking-wide text-text">
          Networks
        </h3>
        <ul className="space-y-2" role="list">
          {SOCIAL_ICONS.map(({ key, Icon, label }) => {
            const href = socialMap[key];
            if (!href) return null;
            return (
              <li key={key}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${label} profile`}
                  className="flex items-center gap-3 text-sm text-muted hover:text-text transition-colors group"
                >
                  <Icon
                    className="w-4 h-4 flex-shrink-0 group-hover:text-signal transition-colors"
                    aria-hidden="true"
                  />
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Divider + note */}
      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted leading-relaxed font-mono">
          RESPONSE TIME — typically within 48 hrs, often sooner for well-scoped briefs.
        </p>
      </div>
    </aside>
  );
}

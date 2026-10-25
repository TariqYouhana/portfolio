import Link from "next/link";
import { ArrowLeft, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 md:px-10 py-12 space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-mono text-muted hover:text-text transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>BACK TO HOME</span>
      </Link>

      <div className="space-y-3">
        <span className="font-mono text-xs uppercase text-signal tracking-widest block">
          COMMUNICATION // ENCRYPTED_CHANNEL
        </span>
        <h1 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight">
          Get in Touch
        </h1>
        <p className="text-base text-muted max-w-2xl leading-relaxed">
          Direct contact form with Cloudflare Turnstile spam protection and server-side email dispatch. Scheduled for Phase 7.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-glass glass-panel border border-border space-y-6">
          <h2 className="font-display text-xl font-bold uppercase">Direct Coordinates</h2>
          <ul className="space-y-4 text-sm text-muted">
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-signal flex-shrink-0" />
              <a href="mailto:contact@tariqleon.com" className="hover:text-text transition-colors">
                contact@tariqleon.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-signal flex-shrink-0" />
              <span>Available for projects and consultancies worldwide</span>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-glass glass-panel border border-border space-y-4 flex flex-col justify-center">
          <span className="text-xs font-mono text-signal">FORM_SERVICE // OFFLINE_IN_PHASE_0</span>
          <h3 className="font-display text-lg font-bold uppercase">Form Engine Under Construction</h3>
          <p className="text-xs text-muted leading-relaxed">
            Phase 7 will connect React Hook Form, Zod validation, and Resend/Formspree email delivery. For now, reach out via direct email.
          </p>
        </div>
      </div>
    </div>
  );
}

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// ── Validation schema ──────────────────────────────────────────────────────
const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(4, "Subject must be at least 4 characters").max(200),
  message: z.string().min(20, "Message must be at least 20 characters").max(5000),
  // Honeypot — must be empty for real humans
  company_fax_trap: z.string().optional(),
});

// ── POST /api/contact ──────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);

  // Silently accept honeypot submissions — bots should believe they succeeded
  if (parsed.success && parsed.data.company_fax_trap) {
    return NextResponse.json({ ok: true });
  }

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, email, subject, message } = parsed.data;

  // ── Dev / No-API-key mode ─────────────────────────────────────────────
  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    // Safe dev log — no secrets emitted
    console.info("[contact] simulated send", { name, email, subject, charCount: message.length });
    return NextResponse.json({ ok: true, simulated: true });
  }

  // ── Production: send via Resend ───────────────────────────────────────
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <no-reply@tariqleon.com>",
        to: process.env.CONTACT_EMAIL ?? "contact@tariqleon.com",
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${message.replace(/\n/g, "<br/>")}</p>`,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("[contact] Resend error:", errBody);
      return NextResponse.json({ ok: false, error: "Mail delivery failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] fetch error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

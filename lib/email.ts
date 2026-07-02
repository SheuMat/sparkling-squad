// Tiny Resend email helper. Uses the Resend REST API directly via fetch so we
// don't add a dependency. Configure with environment variables:
//
//   RESEND_API_KEY   your Resend API key (required to actually send)
//   MAIL_TO          where enquiries go   (default: contact@sparklingsquad.co.uk)
//   MAIL_FROM        the verified sender  (default: Resend's test sender)
//
// If RESEND_API_KEY is missing (e.g. local dev), we skip sending and log
// instead, so the site keeps working without email configured.

export const MAIL_TO = process.env.MAIL_TO || "contact@sparklingsquad.co.uk";
const MAIL_FROM = process.env.MAIL_FROM || "Sparkling Squad <onboarding@resend.dev>";

type SendArgs = {
  subject: string;
  html: string;
  replyTo?: string;
};

type SendResult = { ok: boolean; skipped?: boolean; error?: string };

export async function sendEmail({ subject, html, replyTo }: SendArgs): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // No key configured — log so nothing is lost, but don't fail the request.
    console.warn("[email] RESEND_API_KEY not set — skipping send. Subject:", subject);
    return { ok: true, skipped: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: MAIL_FROM,
        to: [MAIL_TO],
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[email] Resend error", res.status, detail);
      return { ok: false, error: `Resend responded ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] send failed", err);
    return { ok: false, error: "send failed" };
  }
}

// Small helper to escape user-supplied text before dropping it into HTML.
export function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

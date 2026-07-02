import { NextResponse } from "next/server";
import { sendEmail, esc } from "@/lib/email";

// Contact-form submissions land here: validate, email the enquiry to the
// business, and log it as a backup.
export async function POST(request: Request) {
  try {
    const data = await request.json();

    const required = ["name", "email", "message"];
    const missing = required.filter((k) => !data?.[k]);
    if (missing.length) {
      return NextResponse.json(
        { ok: false, error: `Missing fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const { name, email, phone, service, message } = data;

    const html = `
      <h2>New website enquiry</h2>
      <p><strong>Name:</strong> ${esc(name)}</p>
      <p><strong>Email:</strong> ${esc(email)}</p>
      <p><strong>Phone:</strong> ${esc(phone) || "—"}</p>
      <p><strong>Service:</strong> ${esc(service) || "Not specified"}</p>
      <p><strong>Message:</strong></p>
      <p>${esc(message).replace(/\n/g, "<br>")}</p>
    `;

    const result = await sendEmail({
      subject: `New enquiry from ${esc(name)}`,
      html,
      replyTo: typeof email === "string" ? email : undefined,
    });

    // Keep a server-side copy regardless of email outcome.
    console.log("New contact enquiry:", JSON.stringify(data));

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: "Could not send your message. Please call us." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}

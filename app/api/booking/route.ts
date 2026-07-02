import { NextResponse } from "next/server";
import { sendEmail, esc } from "@/lib/email";
import { getService } from "@/lib/services";

// Booking submissions land here: validate, email the request to the business,
// and log it as a backup.
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Minimal server-side validation.
    const required = ["serviceSlug", "name", "email", "phone", "postcode"];
    const missing = required.filter((k) => !data?.[k]);
    if (missing.length) {
      return NextResponse.json(
        { ok: false, error: `Missing fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const serviceName = getService(data.serviceSlug)?.name ?? data.serviceSlug;
    const quote = data.quote ? `£${data.quote.low}–£${data.quote.high}` : "—";
    const extras = Array.isArray(data.extras) && data.extras.length ? data.extras.join(", ") : "None";

    const html = `
      <h2>New booking request</h2>
      <p><strong>Service:</strong> ${esc(serviceName)}</p>
      <p><strong>Estimated quote:</strong> ${esc(quote)}</p>
      <hr>
      <p><strong>Property:</strong> ${esc(data.propertyType) || "—"}${
        data.bedrooms != null ? ` · ${esc(data.bedrooms)} bed, ${esc(data.bathrooms)} bath` : ""
      }</p>
      <p><strong>Frequency:</strong> ${esc(data.frequency) || "—"}</p>
      <p><strong>Preferred date/time:</strong> ${esc(data.date) || "—"} · ${esc(data.time) || "—"}</p>
      <p><strong>Extras:</strong> ${esc(extras)}</p>
      <p><strong>Notes:</strong> ${esc(data.notes) || "—"}</p>
      <hr>
      <p><strong>Name:</strong> ${esc(data.name)}</p>
      <p><strong>Phone:</strong> ${esc(data.phone)}</p>
      <p><strong>Email:</strong> ${esc(data.email)}</p>
      <p><strong>Address:</strong> ${esc(data.address) || "—"}, ${esc(data.postcode)}</p>
    `;

    const result = await sendEmail({
      subject: `New booking: ${esc(serviceName)} — ${esc(data.name)}`,
      html,
      replyTo: typeof data.email === "string" ? data.email : undefined,
    });

    // Keep a server-side copy regardless of email outcome.
    console.log("New booking request:", JSON.stringify(data));

    if (!result.ok) {
      return NextResponse.json(
        { ok: false, error: "Could not send your request. Please call us." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}

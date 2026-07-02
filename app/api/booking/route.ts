import { NextResponse } from "next/server";

// Booking submissions land here. For now we validate and log the request so the
// site works end-to-end. To go live, wire one of the TODOs below to actually
// deliver the booking (email, CRM, spreadsheet, etc.).
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

    // TODO (go-live): deliver the booking. Options:
    //   • Email via Resend / Nodemailer to hello@sparklingsquad.com
    //   • Push into a Google Sheet / Airtable / CRM
    //   • Send a confirmation email to the customer
    // For now we just log it server-side.
    console.log("New booking request:", JSON.stringify(data, null, 2));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}

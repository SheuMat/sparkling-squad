import { NextResponse } from "next/server";

// Contact-form submissions land here. Like /api/booking, this validates and
// logs the enquiry so the site works end-to-end. Wire it to email/CRM to go live.
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

    // TODO (go-live): deliver the enquiry (email to contact@sparklingsquad.co.uk / CRM).
    console.log("New contact enquiry:", JSON.stringify(data, null, 2));

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }
}

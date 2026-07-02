"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { services, getService, estimate, EXTRAS, type EstimateInput } from "@/lib/services";
import { site } from "@/lib/site";

type Frequency = EstimateInput["frequency"];

const PROPERTY_TYPES = ["Flat / Apartment", "House", "Bungalow", "Office / Commercial", "Other"];
const TIME_SLOTS = ["Morning (8am–12pm)", "Afternoon (12pm–4pm)", "Late afternoon (4pm–6pm)", "Flexible"];

const FREQUENCIES: { id: Frequency; label: string; note: string }[] = [
  { id: "one-off", label: "One-off", note: "Single visit" },
  { id: "weekly", label: "Weekly", note: "Save 15%" },
  { id: "fortnightly", label: "Fortnightly", note: "Save 10%" },
  { id: "monthly", label: "Monthly", note: "Save 5%" },
];

const STEPS = ["Service", "Details", "Schedule", "Your info", "Review"];

export default function BookingForm({ initialService }: { initialService?: string }) {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    serviceSlug: initialService && getService(initialService) ? initialService : "",
    propertyType: "",
    bedrooms: 2,
    bathrooms: 1,
    area: "",
    frequency: "one-off" as Frequency,
    extras: [] as string[],
    date: "",
    time: "",
    notes: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    postcode: "",
  });

  const service = getService(form.serviceSlug);
  const isRoom = service?.pricing === "room";
  const isArea = service?.pricing === "area";

  const quote = useMemo(() => {
    if (!form.serviceSlug) return null;
    return estimate({
      serviceSlug: form.serviceSlug,
      bedrooms: form.bedrooms,
      bathrooms: form.bathrooms,
      frequency: form.frequency,
      extras: form.extras,
    });
  }, [form.serviceSlug, form.bedrooms, form.bathrooms, form.frequency, form.extras]);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleExtra = (id: string) =>
    setForm((f) => ({
      ...f,
      extras: f.extras.includes(id) ? f.extras.filter((e) => e !== id) : [...f.extras, id],
    }));

  // Per-step validation gate.
  const canAdvance = useMemo(() => {
    switch (step) {
      case 0:
        return !!form.serviceSlug;
      case 1:
        return !!form.propertyType;
      case 2:
        return !!form.date && !!form.time;
      case 3:
        return (
          form.name.trim().length > 1 &&
          /^\S+@\S+\.\S+$/.test(form.email) &&
          form.phone.trim().length >= 7 &&
          form.postcode.trim().length >= 3
        );
      default:
        return true;
    }
  }, [step, form]);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  async function submit() {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, quote }),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setError("Sorry, something went wrong. Please call us on " + site.phone + ".");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-sky-100 bg-white p-10 text-center shadow-soft">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-brand text-3xl text-white">
          ✓
        </div>
        <h2 className="mt-6 text-2xl font-extrabold text-navy">Request received — thank you!</h2>
        <p className="mt-3 text-navy/70">
          Thanks {form.name.split(" ")[0]}, your {service?.name.toLowerCase()} request is in. We'll
          confirm your slot and final price by phone or email very soon.
        </p>
        {quote && (
          <p className="mt-4 inline-block rounded-full bg-sky-50 px-5 py-2 font-bold text-navy">
            Estimated: £{quote.low}–£{quote.high}
          </p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-navy px-6 py-3 font-bold text-white hover:bg-navy-deep">
            Back to home
          </Link>
          <a href={site.phoneHref} className="rounded-full border-2 border-navy px-6 py-3 font-bold text-navy">
            📞 {site.phone}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      {/* Main panel */}
      <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-card sm:p-8">
        {/* Progress */}
        <ol className="mb-8 flex items-center">
          {STEPS.map((label, i) => (
            <li key={label} className="flex flex-1 items-center last:flex-none">
              <button
                onClick={() => i < step && setStep(i)}
                disabled={i > step}
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold transition ${
                  i < step
                    ? "bg-brand text-white"
                    : i === step
                      ? "bg-navy text-white"
                      : "bg-sky-50 text-navy/40"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </button>
              {i < STEPS.length - 1 && (
                <div className={`mx-2 h-1 flex-1 rounded ${i < step ? "bg-brand" : "bg-sky-100"}`} />
              )}
            </li>
          ))}
        </ol>

        <p className="text-sm font-bold uppercase tracking-widest text-brand">
          Step {step + 1} of {STEPS.length}
        </p>

        {/* STEP 0 — Service */}
        {step === 0 && (
          <div>
            <h2 className="mt-1 text-2xl font-extrabold text-navy">What can we clean for you?</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {services.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => set("serviceSlug", s.slug)}
                  className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
                    form.serviceSlug === s.slug
                      ? "border-brand bg-sky-50 ring-2 ring-brand"
                      : "border-sky-100 hover:border-brand/40"
                  }`}
                >
                  <span className="text-2xl">{s.icon}</span>
                  <span>
                    <span className="block font-bold text-navy">{s.name}</span>
                    <span className="block text-xs text-navy/60">from £{s.from}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 1 — Details */}
        {step === 1 && (
          <div>
            <h2 className="mt-1 text-2xl font-extrabold text-navy">Tell us about the space</h2>

            <label className="mt-6 block text-sm font-bold text-navy">Property type</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {PROPERTY_TYPES.map((t) => (
                <button
                  key={t}
                  onClick={() => set("propertyType", t)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    form.propertyType === t
                      ? "border-brand bg-brand text-white"
                      : "border-sky-100 text-navy/70 hover:border-brand/40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {isRoom && (
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <Counter label="Bedrooms" value={form.bedrooms} onChange={(v) => set("bedrooms", v)} min={0} />
                <Counter label="Bathrooms" value={form.bathrooms} onChange={(v) => set("bathrooms", v)} min={1} />
              </div>
            )}

            {isArea && (
              <div className="mt-6">
                <label className="block text-sm font-bold text-navy">Approx. area to clean</label>
                <input
                  value={form.area}
                  onChange={(e) => set("area", e.target.value)}
                  placeholder="e.g. driveway + patio, ~60 m²"
                  className="mt-2 w-full rounded-xl border border-sky-100 px-4 py-3 outline-none focus:border-brand"
                />
                <p className="mt-2 text-xs text-navy/55">
                  We'll confirm the exact price after a quick look at photos or a visit.
                </p>
              </div>
            )}

            <label className="mt-7 block text-sm font-bold text-navy">How often?</label>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {FREQUENCIES.map((fq) => (
                <button
                  key={fq.id}
                  onClick={() => set("frequency", fq.id)}
                  className={`rounded-2xl border p-3 text-center transition ${
                    form.frequency === fq.id
                      ? "border-brand bg-sky-50 ring-2 ring-brand"
                      : "border-sky-100 hover:border-brand/40"
                  }`}
                >
                  <span className="block text-sm font-bold text-navy">{fq.label}</span>
                  <span className="block text-xs text-brand">{fq.note}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 — Schedule */}
        {step === 2 && (
          <div>
            <h2 className="mt-1 text-2xl font-extrabold text-navy">When suits you?</h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-navy">Preferred date</label>
                <input
                  type="date"
                  value={form.date}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => set("date", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-sky-100 px-4 py-3 outline-none focus:border-brand"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-navy">Preferred time</label>
                <select
                  value={form.time}
                  onChange={(e) => set("time", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-sky-100 bg-white px-4 py-3 outline-none focus:border-brand"
                >
                  <option value="">Choose a slot…</option>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label className="mt-7 block text-sm font-bold text-navy">
              Add-on extras <span className="font-normal text-navy/50">(optional)</span>
            </label>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {EXTRAS.map((ex) => (
                <label
                  key={ex.id}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3 transition ${
                    form.extras.includes(ex.id)
                      ? "border-brand bg-sky-50"
                      : "border-sky-100 hover:border-brand/40"
                  }`}
                >
                  <span className="flex items-center gap-3 text-sm font-semibold text-navy">
                    <input
                      type="checkbox"
                      checked={form.extras.includes(ex.id)}
                      onChange={() => toggleExtra(ex.id)}
                      className="h-4 w-4 accent-[var(--color-brand)]"
                    />
                    {ex.label}
                  </span>
                  <span className="text-sm font-bold text-brand">+£{ex.price}</span>
                </label>
              ))}
            </div>

            <label className="mt-7 block text-sm font-bold text-navy">
              Anything else we should know?
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={3}
              placeholder="Access, parking, pets, key collection, problem areas…"
              className="mt-2 w-full rounded-xl border border-sky-100 px-4 py-3 outline-none focus:border-brand"
            />
          </div>
        )}

        {/* STEP 3 — Your info */}
        {step === 3 && (
          <div>
            <h2 className="mt-1 text-2xl font-extrabold text-navy">Where & who?</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" value={form.name} onChange={(v) => set("name", v)} placeholder="Jane Smith" />
              <Field label="Phone" value={form.phone} onChange={(v) => set("phone", v)} placeholder="07…" type="tel" />
              <Field label="Email" value={form.email} onChange={(v) => set("email", v)} placeholder="you@email.com" type="email" />
              <Field label="Postcode" value={form.postcode} onChange={(v) => set("postcode", v.toUpperCase())} placeholder="S10 …" />
              <div className="sm:col-span-2">
                <Field label="Address" value={form.address} onChange={(v) => set("address", v)} placeholder="House number & street, area" />
              </div>
            </div>
            <p className="mt-4 text-xs text-navy/55">
              We only use these details to arrange and confirm your clean. No spam, ever.
            </p>
          </div>
        )}

        {/* STEP 4 — Review */}
        {step === 4 && (
          <div>
            <h2 className="mt-1 text-2xl font-extrabold text-navy">Check & confirm</h2>
            <dl className="mt-6 divide-y divide-sky-100 rounded-2xl border border-sky-100">
              <Row k="Service" v={service?.name ?? "—"} />
              <Row k="Property" v={form.propertyType + (isRoom ? ` · ${form.bedrooms} bed, ${form.bathrooms} bath` : "")} />
              {isArea && form.area && <Row k="Area" v={form.area} />}
              <Row k="Frequency" v={FREQUENCIES.find((f) => f.id === form.frequency)?.label ?? "—"} />
              <Row k="When" v={`${form.date || "—"} · ${form.time || "—"}`} />
              {form.extras.length > 0 && (
                <Row k="Extras" v={form.extras.map((id) => EXTRAS.find((e) => e.id === id)?.label).join(", ")} />
              )}
              <Row k="Name" v={form.name} />
              <Row k="Contact" v={`${form.phone} · ${form.email}`} />
              <Row k="Address" v={`${form.address}, ${form.postcode}`} />
              {form.notes && <Row k="Notes" v={form.notes} />}
            </dl>
            {error && (
              <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
                {error}
              </p>
            )}
            <p className="mt-4 text-xs text-navy/55">
              Submitting sends us a request — it isn't a charge. We'll confirm the final price before
              any work begins.
            </p>
          </div>
        )}

        {/* Nav buttons */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={back}
            disabled={step === 0}
            className="rounded-full px-5 py-3 text-sm font-bold text-navy/60 transition enabled:hover:text-navy disabled:opacity-0"
          >
            ← Back
          </button>
          {step < STEPS.length - 1 ? (
            <button
              onClick={next}
              disabled={!canAdvance}
              className="rounded-full bg-brand px-8 py-3 text-sm font-bold text-white shadow-soft transition enabled:hover:bg-brand-bright disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue →
            </button>
          ) : (
            <button
              onClick={submit}
              disabled={submitting}
              className="rounded-full bg-brand px-8 py-3 text-sm font-bold text-white shadow-soft transition enabled:hover:bg-brand-bright disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Confirm booking ✓"}
            </button>
          )}
        </div>
      </div>

      {/* Sticky quote summary */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-3xl bg-navy p-6 text-white shadow-soft">
          <p className="text-sm font-bold uppercase tracking-widest text-sky-300">Your quote</p>
          {service ? (
            <>
              <p className="mt-3 flex items-center gap-2 text-lg font-bold">
                <span>{service.icon}</span> {service.name}
              </p>
              {quote ? (
                <div className="mt-4">
                  <p className="text-4xl font-extrabold">
                    £{quote.low}
                    <span className="text-2xl text-sky-200">–£{quote.high}</span>
                  </p>
                  <p className="mt-1 text-xs text-sky-100/70">
                    {service.pricing === "room"
                      ? "Estimate based on your rooms & options"
                      : "Guide price — confirmed after a quick look"}
                  </p>
                </div>
              ) : null}

              <ul className="mt-5 space-y-2 border-t border-white/10 pt-4 text-sm text-sky-100/85">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-brand">✓</span> {f}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="mt-3 text-sm text-sky-100/70">
              Pick a service to see your instant estimate.
            </p>
          )}

          <div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm">
            <p className="font-bold">Prefer to talk?</p>
            <a href={site.phoneHref} className="mt-1 block text-lg font-extrabold text-sky-300">
              {site.phone}
            </a>
            <p className="text-xs text-sky-100/60">{site.hours}</p>
          </div>
        </div>
      </aside>
    </div>
  );
}

/* ---- Small UI helpers --------------------------------------------------- */

function Counter({
  label,
  value,
  onChange,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-navy">{label}</label>
      <div className="mt-2 flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          className="grid h-11 w-11 place-items-center rounded-xl border border-sky-100 text-xl font-bold text-navy hover:border-brand"
          aria-label={`Fewer ${label}`}
        >
          −
        </button>
        <span className="w-10 text-center text-xl font-extrabold text-navy">{value}</span>
        <button
          onClick={() => onChange(value + 1)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-sky-100 text-xl font-bold text-navy hover:border-brand"
          aria-label={`More ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-bold text-navy">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-sky-100 px-4 py-3 outline-none focus:border-brand"
      />
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 px-4 py-3 text-sm">
      <dt className="font-semibold text-navy/60">{k}</dt>
      <dd className="text-right font-semibold text-navy">{v}</dd>
    </div>
  );
}

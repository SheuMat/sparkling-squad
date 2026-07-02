"use client";

import { useState } from "react";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const valid =
    form.name.trim().length > 1 &&
    /^\S+@\S+\.\S+$/.test(form.email) &&
    form.message.trim().length > 4;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError(`Something went wrong. Please call us on ${site.phone}.`);
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-3xl border border-sky-100 bg-white p-8 text-center shadow-card">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand text-2xl text-white">
          ✓
        </div>
        <h3 className="mt-5 text-xl font-extrabold text-navy">Message sent — thank you!</h3>
        <p className="mt-2 text-navy/70">
          Thanks {form.name.split(" ")[0]}, we’ve got your message and will be in touch very soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-sky-100 bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" value={form.name} onChange={(v) => set("name", v)} placeholder="Jane Smith" />
        <Field label="Phone" type="tel" value={form.phone} onChange={(v) => set("phone", v)} placeholder="07…" />
        <Field label="Email" type="email" value={form.email} onChange={(v) => set("email", v)} placeholder="you@email.com" />
        <div>
          <label className="block text-sm font-bold text-navy">Service (optional)</label>
          <select
            value={form.service}
            onChange={(e) => set("service", e.target.value)}
            className="mt-2 w-full rounded-xl border border-sky-100 bg-white px-4 py-3 outline-none focus:border-brand"
          >
            <option value="">Not sure yet</option>
            {services.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-bold text-navy">How can we help?</label>
        <textarea
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          rows={5}
          placeholder="Tell us a little about what you need, your address/postcode and any preferred dates…"
          className="mt-2 w-full rounded-xl border border-sky-100 px-4 py-3 outline-none focus:border-brand"
        />
      </div>

      {error && (
        <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={!valid || submitting}
        className="mt-6 w-full rounded-full bg-brand px-8 py-3.5 font-bold text-white shadow-soft transition enabled:hover:bg-brand-bright disabled:cursor-not-allowed disabled:opacity-40"
      >
        {submitting ? "Sending…" : "Send message"}
      </button>
      <p className="mt-3 text-center text-xs text-navy/55">
        We’ll only use your details to reply to your enquiry.
      </p>
    </form>
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

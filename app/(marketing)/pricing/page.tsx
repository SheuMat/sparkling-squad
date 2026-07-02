import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import { services, EXTRAS } from "@/lib/services";
import { faqs } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Clear, fair cleaning prices in Sheffield. See starting prices for every Sparkling Squad service, optional extras and regular-clean discounts — then get an instant online quote.",
};

// Pricing-focused FAQs pulled from the shared list.
const pricingFaqs = faqs.filter((f) =>
  ["How do I pay?", "Can I book a regular clean?", "Do I need to provide any cleaning products or equipment?", "What if I'm not happy with the clean?"].includes(f.q)
);

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Fair, upfront prices — no surprises"
        intro="Every quote is confirmed before we start, with no hidden fees. Below are our starting prices; use the booking tool for an instant estimate tailored to your space."
        crumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
      />

      {/* Tier cards (reused) */}
      <Pricing />

      {/* Full price table */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x max-w-4xl">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-brand">
              Every service
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">Starting prices</h2>
          </div>

          <div className="mt-10 overflow-hidden rounded-3xl border border-sky-100 shadow-card">
            <table className="w-full text-left">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="px-6 py-4 text-sm font-bold">Service</th>
                  <th className="hidden px-6 py-4 text-sm font-bold sm:table-cell">What it covers</th>
                  <th className="px-6 py-4 text-right text-sm font-bold">From</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-100">
                {services.map((s) => (
                  <tr key={s.slug} className="transition hover:bg-sky-50/60">
                    <td className="px-6 py-4">
                      <Link href={`/services/${s.slug}`} className="font-bold text-navy hover:text-brand">
                        {s.icon} {s.name}
                      </Link>
                    </td>
                    <td className="hidden px-6 py-4 text-sm text-navy/65 sm:table-cell">{s.short}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-right font-extrabold text-brand">
                      £{s.from}
                      <span className="block text-xs font-medium text-navy/50">{s.unit}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-sm text-navy/55">
            Prices are starting points and vary with the size and condition of your space. You’ll
            always get a confirmed quote before any work begins.
          </p>
        </div>
      </section>

      {/* Extras + discounts */}
      <section className="bg-sky-50/60 py-16 sm:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-card">
            <h3 className="text-xl font-extrabold text-navy">Optional extras</h3>
            <p className="mt-2 text-sm text-navy/65">Add any of these to your clean when you book.</p>
            <ul className="mt-6 divide-y divide-sky-100">
              {EXTRAS.map((e) => (
                <li key={e.id} className="flex items-center justify-between py-3">
                  <span className="text-navy/80">{e.label}</span>
                  <span className="font-bold text-brand">+£{e.price}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center rounded-3xl bg-gradient-to-br from-brand to-royal p-8 text-white shadow-soft">
            <h3 className="text-xl font-extrabold">Save with a regular clean</h3>
            <p className="mt-2 text-sky-50/90">
              Book a recurring slot and pay less every visit. The more often we come, the more you
              save.
            </p>
            <ul className="mt-6 space-y-3 font-semibold">
              <li className="flex items-center justify-between border-b border-white/20 pb-3">
                <span>Weekly</span> <span className="text-lg">Save 15%</span>
              </li>
              <li className="flex items-center justify-between border-b border-white/20 pb-3">
                <span>Fortnightly</span> <span className="text-lg">Save 10%</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Monthly</span> <span className="text-lg">Save 5%</span>
              </li>
            </ul>
            <Link
              href="/book"
              className="mt-8 inline-block rounded-full bg-white px-6 py-3 text-center font-bold text-navy transition hover:bg-sky-50"
            >
              Get your quote →
            </Link>
          </div>
        </div>
      </section>

      <FAQ items={pricingFaqs} eyebrow="Pricing questions" heading="Pricing, answered" />
      <CTASection />
    </>
  );
}

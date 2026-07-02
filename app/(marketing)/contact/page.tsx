import Link from "next/link";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Sparkling Squad — call, email or send an enquiry for cleaning across Sheffield and South Yorkshire. Fast, friendly replies.",
};

const contactCards = [
  { icon: "📞", label: "Call us", value: site.phone, href: site.phoneHref, note: site.hours },
  { icon: "✉️", label: "Email us", value: site.email, href: site.emailHref, note: "We reply within a few hours" },
  { icon: "📍", label: "Area", value: site.address, note: "Covering all S-postcodes" },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Let's get your place sparkling"
        intro="Have a question or ready to book? Send us a message, give us a call, or get an instant quote online — whatever's easiest for you."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* Details */}
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-brand">
              Contact details
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy">Talk to the squad</h2>
            <p className="mt-3 text-navy/70">
              Prefer to chat? We’re happy to talk through what you need and give you honest advice — no
              hard sell.
            </p>

            <div className="mt-8 space-y-4">
              {contactCards.map((c) => (
                <div
                  key={c.label}
                  className="flex items-start gap-4 rounded-2xl border border-sky-100 bg-sky-50/40 p-5"
                >
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white text-2xl shadow-card">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wide text-brand">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-lg font-bold text-navy hover:text-brand">
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-lg font-bold text-navy">{c.value}</p>
                    )}
                    <p className="text-sm text-navy/60">{c.note}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-navy p-6 text-white">
              <p className="font-bold">Want a price first?</p>
              <p className="mt-1 text-sm text-sky-100/80">
                Skip the back-and-forth and get an instant estimate online.
              </p>
              <Link
                href="/book"
                className="mt-4 inline-block rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-bright"
              >
                Get an instant quote →
              </Link>
            </div>
          </div>

          {/* Form */}
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-brand">
              Send a message
            </span>
            <h2 className="mt-3 mb-6 text-3xl font-extrabold text-navy">Drop us a line</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

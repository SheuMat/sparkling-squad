import Image from "next/image";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Sparkling Squad — a friendly, fully-insured, Sheffield-based cleaning team offering domestic, commercial and specialist cleaning across South Yorkshire.",
};

const values = [
  { icon: "🤝", title: "Trust", text: "Vetted, insured cleaners you'll recognise — the same faces, treating your home with respect." },
  { icon: "🎯", title: "Consistency", text: "We work to a checklist every visit, so you get the same high standard every single time." },
  { icon: "💬", title: "Communication", text: "Easy to reach, quick to reply, and clear on pricing before any work begins." },
  { icon: "🌱", title: "Care", text: "Eco-friendly products where we can, and genuine pride in leaving a place better than we found it." },
];

const stats = [
  { n: "500+", label: "cleans completed" },
  { n: "4.9★", label: "average rating" },
  { n: "8", label: "services offered" },
  { n: "100%", label: "satisfaction guarantee" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Sheffield's friendly, reliable cleaning squad"
        intro="We're a local team on a simple mission: turn up, work hard, and leave every home and business sparkling."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* Story */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-brand">Our story</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
              Built on hard work and word of mouth
            </h2>
            <p className="mt-4 text-navy/70">
              Sparkling Squad started with one mop, one van and a promise to do cleaning properly. What
              began with a handful of homes in {site.city} has grown — clean by clean, referral by
              referral — into a full-service team trusted across South Yorkshire.
            </p>
            <p className="mt-4 text-navy/70">
              We’ve never forgotten what got us here: showing up on time, paying attention to the
              details, and treating every property like it’s our own. Whether it’s a weekly tidy, a
              deposit-critical end-of-tenancy clean or a driveway that hasn’t seen daylight in years,
              the same care goes into every job.
            </p>
            <p className="mt-4 text-navy/70">
              Today we cover domestic, commercial and specialist cleaning — all fully insured, all
              backed by our satisfaction guarantee.
            </p>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-soft">
            <Image
              src="/images/window-clean.jpg"
              alt="A Sparkling Squad cleaner at work"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-navy py-14 text-white">
        <div className="container-x grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-4xl font-extrabold text-sky-300">{s.n}</p>
              <p className="mt-1 text-sm text-sky-100/80">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-sky-50/60 py-16 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-brand">
              What we stand for
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">Our values</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-3xl bg-white p-7 shadow-card">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-sky-50 text-3xl">
                  {v.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy">{v.title}</h3>
                <p className="mt-2 text-sm text-navy/65">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}

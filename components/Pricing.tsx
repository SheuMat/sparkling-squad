import Link from "next/link";

const tiers = [
  {
    name: "Regular Clean",
    price: "£60",
    unit: "/ visit",
    blurb: "Keep on top of it with a weekly or fortnightly home clean.",
    features: ["Kitchen & bathrooms", "Dusting & vacuuming", "Floors mopped", "Up to 15% regular discount"],
    cta: "Book a regular clean",
    href: "/book?service=domestic",
    featured: false,
  },
  {
    name: "Deep / End of Tenancy",
    price: "£120",
    unit: "/ clean",
    blurb: "A full top-to-bottom reset — perfect for moving or a fresh start.",
    features: ["Everything in Regular", "Inside oven & appliances", "Limescale & grout", "Re-clean guarantee"],
    cta: "Book a deep clean",
    href: "/book?service=deep-clean",
    featured: true,
  },
  {
    name: "Exterior & Specialist",
    price: "£70",
    unit: "/ job",
    blurb: "Pressure washing, fogging, carpets and gardening on demand.",
    features: ["Driveway & patio jet wash", "Disinfectant fogging", "Carpet & upholstery", "Garden tidy-ups"],
    cta: "Get a specialist quote",
    href: "/book?service=pressure-washing",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-sky-50/60 py-20 sm:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand">
            Simple pricing
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
            Fair prices, no surprises
          </h2>
          <p className="mt-4 text-navy/70">
            Starting prices below — use the booking tool for an instant quote tailored to your space.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-3xl p-8 shadow-card ${
                t.featured
                  ? "bg-navy text-white ring-2 ring-brand"
                  : "border border-sky-100 bg-white text-navy"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-bold">{t.name}</h3>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-4xl font-extrabold">{t.price}</span>
                <span className={`pb-1 text-sm ${t.featured ? "text-sky-200" : "text-navy/50"}`}>
                  from {t.unit}
                </span>
              </div>
              <p className={`mt-3 text-sm ${t.featured ? "text-sky-100/80" : "text-navy/65"}`}>
                {t.blurb}
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-brand">✓</span>
                    <span className={t.featured ? "text-sky-100/90" : "text-navy/75"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={t.href}
                className={`mt-8 rounded-full px-6 py-3 text-center text-sm font-bold transition ${
                  t.featured
                    ? "bg-brand text-white hover:bg-brand-bright"
                    : "bg-navy text-white hover:bg-navy-deep"
                }`}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

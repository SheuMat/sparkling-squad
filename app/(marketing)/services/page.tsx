import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import Process from "@/components/Process";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Our Cleaning Services",
  description:
    "Explore Sparkling Squad's full range of cleaning services in Sheffield — domestic, deep, end-of-tenancy, pressure washing, disinfectant fogging, carpets & upholstery, commercial and gardening.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our services"
        title="Professional cleaning for every job in Sheffield"
        intro="Whatever needs cleaning — inside or out, home or business — the squad has a service for it. Explore each one below for exactly what's included and starting prices."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="container-x space-y-6">
          {services.map((s, i) => (
            <div
              key={s.slug}
              className="grid items-stretch gap-0 overflow-hidden rounded-3xl border border-sky-100 shadow-card md:grid-cols-2"
            >
              <div className={`relative min-h-[220px] ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <span className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/90 text-2xl shadow-card">
                  {s.icon}
                </span>
              </div>

              <div className="flex flex-col justify-center p-7 sm:p-9">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-extrabold text-navy">{s.name}</h2>
                  {s.popular && (
                    <span className="rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                      Popular
                    </span>
                  )}
                </div>
                <p className="mt-3 text-navy/70">{s.description}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-navy/75">
                      <span className="text-brand">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="text-lg font-extrabold text-brand">
                    from £{s.from}
                    {s.unit ? <span className="text-sm font-medium text-navy/50"> {s.unit}</span> : null}
                  </span>
                  <Link
                    href={`/services/${s.slug}`}
                    className="rounded-full bg-navy px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy-deep"
                  >
                    Full details
                  </Link>
                  <Link
                    href={`/book?service=${s.slug}`}
                    className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-bright"
                  >
                    Get a quote
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Process />
      <CTASection />
    </>
  );
}

import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { services, getService } from "@/lib/services";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: `${service.name} in Sheffield`,
    description: service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHeader
        eyebrow={`from £${service.from}${service.unit ? ` ${service.unit}` : ""}`}
        title={`${service.name} in ${site.city}`}
        intro={service.short}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
      />

      {/* Overview + image */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-brand">Overview</span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy">{service.icon} {service.name}</h2>
            {service.overview.map((p) => (
              <p key={p} className="mt-4 text-navy/70">
                {p}
              </p>
            ))}

            <div className="mt-6 rounded-2xl bg-sky-50 p-5">
              <p className="text-sm font-bold uppercase tracking-wide text-brand">Ideal for</p>
              <p className="mt-1 text-navy/80">{service.idealFor}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/book?service=${service.slug}`}
                className="rounded-full bg-brand px-7 py-3.5 font-bold text-white shadow-soft transition hover:bg-brand-bright"
              >
                Get an instant quote →
              </Link>
              <a
                href={site.phoneHref}
                className="rounded-full border-2 border-navy px-7 py-3.5 font-bold text-navy transition hover:bg-navy hover:text-white"
              >
                📞 {site.phone}
              </a>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-soft lg:sticky lg:top-28">
            <Image
              src={service.image}
              alt={service.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-sky-50/60 py-16 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-brand">
              What’s included
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
              Exactly what you get
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
            {service.included.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-sky-100 bg-white p-4 shadow-card"
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-white">
                  ✓
                </span>
                <span className="text-sm text-navy/80">{item}</span>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-navy/55">
            Every job is tailored to your space — tell us anything specific when you book and we’ll
            build it in.
          </p>
        </div>
      </section>

      {/* Other services */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <h2 className="text-2xl font-extrabold text-navy">Other services you might need</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col rounded-3xl border border-sky-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-soft"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-50 text-2xl">
                  {s.icon}
                </div>
                <h3 className="mt-4 font-bold text-navy">{s.name}</h3>
                <p className="mt-1 flex-1 text-sm text-navy/65">{s.short}</p>
                <span className="mt-4 text-sm font-bold text-brand">
                  from £{s.from} <span className="transition group-hover:ml-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection title={`Book your ${service.name.toLowerCase()} today`} />
    </>
  );
}

import Link from "next/link";
import { services } from "@/lib/services";

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand">
            What we clean
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
            Every type of clean, one local squad
          </h2>
          <p className="mt-4 text-navy/70">
            From a weekly tidy to a full move-out scrub or a driveway jet-wash — explore a service for
            full details, or get an instant online quote.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-sky-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-soft"
            >
              {s.popular && (
                <span className="absolute right-4 top-4 rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  Popular
                </span>
              )}
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-sky-50 text-3xl">
                {s.icon}
              </div>
              <h3 className="mt-5 text-lg font-bold text-navy">{s.name}</h3>
              <p className="mt-2 flex-1 text-sm text-navy/65">{s.short}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-sm font-bold text-brand">
                  from £{s.from}
                  {s.unit ? <span className="font-medium text-navy/50"> {s.unit}</span> : null}
                </span>
                <span className="text-brand transition group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-block rounded-full border-2 border-navy px-7 py-3 font-bold text-navy transition hover:bg-navy hover:text-white"
          >
            View all services in detail
          </Link>
        </div>
      </div>
    </section>
  );
}

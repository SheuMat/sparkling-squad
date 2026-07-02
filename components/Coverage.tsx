import { coverage } from "@/lib/site";

export default function Coverage() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="text-sm font-bold uppercase tracking-widest text-brand">
            Proudly local
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
            Covering Sheffield & South Yorkshire
          </h2>
          <p className="mt-4 max-w-lg text-navy/70">
            From the city centre to the suburbs and surrounding towns — if you’re in or around
            Sheffield, the squad can reach you. Not sure if we cover your postcode? Just ask.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {coverage.map((c) => (
              <span
                key={c}
                className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-sm font-semibold text-navy/75"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-brand to-royal p-10 text-white shadow-soft">
          <p className="text-2xl font-extrabold">Not sure where to start?</p>
          <p className="mt-3 text-sky-100/90">
            Tell us what you need and we’ll recommend the right clean and a fair price — no pressure,
            no obligation.
          </p>
          <a
            href="/book"
            className="mt-6 inline-block rounded-full bg-white px-7 py-3 font-bold text-navy transition hover:bg-sky-50"
          >
            Start your free quote →
          </a>
        </div>
      </div>
    </section>
  );
}

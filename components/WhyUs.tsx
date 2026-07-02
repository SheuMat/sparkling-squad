import Image from "next/image";

const reasons = [
  { icon: "🛡️", title: "Fully insured", text: "Public liability cover on every job, for total peace of mind." },
  { icon: "👋", title: "Local & friendly", text: "A Sheffield-based squad you'll recognise — same faces, every visit." },
  { icon: "✅", title: "Satisfaction guarantee", text: "Not happy with a spot? We'll come back and re-clean it free." },
  { icon: "🧴", title: "Pro-grade products", text: "We bring our own eco-friendly products and commercial kit." },
  { icon: "📅", title: "Easy online booking", text: "Quote, book and manage your clean in minutes, any time." },
  { icon: "💷", title: "Clear, fair pricing", text: "Upfront quotes with no hidden fees and regular-clean discounts." },
];

export default function WhyUs() {
  return (
    <section id="why" className="bg-navy py-20 text-white sm:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="text-sm font-bold uppercase tracking-widest text-sky-300">
            Why Sparkling Squad
          </span>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Cleaning you can actually rely on
          </h2>
          <p className="mt-4 max-w-lg text-sky-100/80">
            We started with one mop and a promise: turn up, work hard, and leave every place
            sparkling. Hundreds of Sheffield homes and businesses later, that hasn't changed.
          </p>

          <div className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {reasons.map((r) => (
              <div key={r.title} className="flex gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-2xl">
                  {r.icon}
                </div>
                <div>
                  <h3 className="font-bold">{r.title}</h3>
                  <p className="mt-1 text-sm text-sky-100/75">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-soft">
            <Image
              src="/images/window-clean.jpg"
              alt="Sparkling Squad cleaner at work in Sheffield"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-3xl bg-brand p-6 shadow-soft sm:block">
            <p className="text-4xl font-extrabold">500+</p>
            <p className="text-sm font-semibold text-white/90">cleans completed</p>
          </div>
          <div className="absolute -right-4 top-8 hidden rounded-2xl bg-white p-4 text-navy shadow-soft md:block">
            <p className="text-2xl font-extrabold text-brand">4.9★</p>
            <p className="text-xs font-semibold">average rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}

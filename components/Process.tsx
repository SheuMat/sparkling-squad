const steps = [
  { n: "01", title: "Get your quote", text: "Pick a service and tell us about your space — see an instant price range." },
  { n: "02", title: "Choose a slot", text: "Select a date and time that suits you. One-off or regular, you decide." },
  { n: "03", title: "We make it sparkle", text: "Our insured squad arrives on time with everything needed to get to work." },
  { n: "04", title: "Relax & enjoy", text: "Walk into a spotless space — backed by our satisfaction guarantee." },
];

export default function Process() {
  return (
    <section className="bg-sky-50/60 py-20 sm:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand">
            How it works
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
            Booked in minutes, cleaned in hours
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="relative rounded-3xl bg-white p-7 shadow-card">
              <span className="text-4xl font-extrabold text-sky-200">{s.n}</span>
              <h3 className="mt-3 text-lg font-bold text-navy">{s.title}</h3>
              <p className="mt-2 text-sm text-navy/65">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

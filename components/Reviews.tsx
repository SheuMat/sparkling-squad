const reviews = [
  {
    name: "Emily B.",
    area: "Crookes, S10",
    text: "Booked an end-of-tenancy clean and got my full deposit back. The flat looked better than when I moved in. Genuinely brilliant.",
    service: "End of Tenancy",
  },
  {
    name: "James & Sarah",
    area: "Hillsborough, S6",
    text: "We have a fortnightly clean now and it's the best money we spend. Same lovely cleaner every time and the house always smells amazing.",
    service: "Domestic Cleaning",
  },
  {
    name: "Mark T.",
    area: "Dronfield, S18",
    text: "The driveway pressure wash was unreal — looked brand new. Turned up on time, tidied up after and a fair price too.",
    service: "Pressure Washing",
  },
  {
    name: "Platinum MC",
    area: "Sheffield City Centre",
    text: "We use Sparkling Squad for our office. Reliable, thorough and flexible around our hours. Couldn't recommend them more.",
    service: "Office Cleaning",
  },
];

function Stars() {
  return <div className="text-brand">★★★★★</div>;
}

export default function Reviews() {
  return (
    <section id="reviews" className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand">
            Loved across Sheffield
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
            Don't just take our word for it
          </h2>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="flex flex-col rounded-3xl border border-sky-100 bg-sky-50/40 p-6 shadow-card"
            >
              <Stars />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-navy/80">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-5 border-t border-sky-100 pt-4">
                <p className="font-bold text-navy">{r.name}</p>
                <p className="text-xs text-navy/55">
                  {r.area} · {r.service}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

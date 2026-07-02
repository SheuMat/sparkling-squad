const items = [
  "End of Tenancy",
  "Pressure Washing",
  "Deep Cleans",
  "Disinfectant Fogging",
  "Carpets & Upholstery",
  "Office Cleaning",
  "Gardening",
  "Domestic Cleaning",
];

export default function TrustStrip() {
  return (
    <div className="border-y border-sky-100 bg-sky-50/60 py-4">
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marquee gap-10 pr-10">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-2 text-sm font-bold uppercase tracking-wide text-navy/70"
            >
              <span className="text-brand">✦</span> {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

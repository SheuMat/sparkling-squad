import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import CTASection from "@/components/CTASection";
import { coverage, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Areas We Cover",
  description:
    "Sparkling Squad covers Sheffield and the surrounding areas — including Crookes, Hillsborough, Ecclesall, Mosborough, Rotherham, Chesterfield, Barnsley and Worksop.",
};

const neighbourhoods = [
  { name: "Sheffield City Centre", note: "Offices, apartments & city-centre lets (S1–S3)." },
  { name: "Crookes & Walkley", note: "Student and family homes around S6 & S10." },
  { name: "Ecclesall & Sharrow", note: "Domestic and deep cleans across S7 & S11." },
  { name: "Hillsborough & Wadsley", note: "Regular home cleans and end-of-tenancy (S6)." },
  { name: "Fulwood & Ranmoor", note: "Larger homes, gardens and pressure washing (S10)." },
  { name: "Mosborough & Halfway", note: "Domestic and commercial across S20." },
  { name: "Handsworth & Darnall", note: "Homes and businesses around S9 & S13." },
  { name: "Dronfield & Chesterfield", note: "Just outside the city, fully covered." },
  { name: "Rotherham & Barnsley", note: "Domestic, commercial and specialist cleans." },
];

export default function AreasPage() {
  return (
    <>
      <PageHeader
        eyebrow="Where we work"
        title="Covering Sheffield & South Yorkshire"
        intro="From the city centre to the suburbs and surrounding towns, the squad comes to you. Not sure if we reach your postcode? Just ask — we probably do."
        crumbs={[{ label: "Home", href: "/" }, { label: "Areas" }]}
      />

      {/* Postcode chips */}
      <section className="bg-white py-16 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-brand">
              Postcodes we cover
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
              All S-postcodes &amp; beyond
            </h2>
            <p className="mt-4 text-navy/70">
              We regularly clean across every Sheffield postcode district and the surrounding towns.
            </p>
          </div>
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5">
            {coverage.map((c) => (
              <span
                key={c}
                className="rounded-full border border-sky-100 bg-sky-50 px-4 py-2 text-sm font-semibold text-navy/75"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Neighbourhood cards */}
      <section className="bg-sky-50/60 py-16 sm:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-brand">
              Popular areas
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
              A local squad in your neighbourhood
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {neighbourhoods.map((n) => (
              <div key={n.name} className="rounded-3xl bg-white p-6 shadow-card">
                <div className="flex items-center gap-2 text-brand">📍</div>
                <h3 className="mt-2 text-lg font-bold text-navy">{n.name}</h3>
                <p className="mt-1 text-sm text-navy/65">{n.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-navy/70">
            Don’t see your area? Call{" "}
            <a href={site.phoneHref} className="font-bold text-brand">
              {site.phone}
            </a>{" "}
            — we cover more than we can list.
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}

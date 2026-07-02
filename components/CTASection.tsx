import Link from "next/link";
import { site } from "@/lib/site";

export default function CTASection({
  title = "Ready for a sparkling clean?",
  text = "Get an instant online quote and pick a slot in under two minutes — no payment needed to request.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-white py-16">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-royal px-8 py-12 text-center text-white shadow-soft sm:px-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
          <h2 className="relative text-3xl font-extrabold sm:text-4xl">{title}</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-sky-50/90">{text}</p>
          <div className="relative mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/book"
              className="rounded-full bg-white px-7 py-3.5 font-bold text-navy transition hover:bg-sky-50"
            >
              Get an instant quote →
            </Link>
            <a
              href={site.phoneHref}
              className="rounded-full border-2 border-white/70 px-7 py-3.5 font-bold text-white transition hover:bg-white hover:text-navy"
            >
              📞 {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

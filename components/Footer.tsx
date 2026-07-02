import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

export default function Footer() {
  return (
    <footer id="contact" className="bg-navy-deep text-white">
      {/* Contact CTA band */}
      <div className="border-b border-white/10">
        <div className="container-x grid gap-8 py-14 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-sky-300">Call us</h3>
            <a href={site.phoneHref} className="mt-2 block text-xl font-bold hover:text-brand">
              {site.phone}
            </a>
            <p className="mt-1 text-sm text-sky-100/70">{site.hours}</p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-sky-300">Email us</h3>
            <a href={site.emailHref} className="mt-2 block text-xl font-bold hover:text-brand">
              {site.email}
            </a>
            <p className="mt-1 text-sm text-sky-100/70">We reply within a few hours</p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-sky-300">Area</h3>
            <p className="mt-2 text-xl font-bold">{site.address}</p>
            <p className="mt-1 text-sm text-sky-100/70">Covering all S-postcodes</p>
          </div>
        </div>
      </div>

      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Image src="/brand/logo-white.png" alt={site.name} width={180} height={67} className="h-12 w-auto" />
          <p className="mt-4 max-w-xs text-sm text-sky-100/70">
            {site.tagline}. Domestic, commercial and specialist cleaning done properly.
          </p>
        </div>

        <div>
          <h4 className="font-bold">Services</h4>
          <ul className="mt-4 space-y-2 text-sm text-sky-100/70">
            {services.slice(0, 5).map((s) => (
              <li key={s.slug}>
                <Link href={`/book?service=${s.slug}`} className="hover:text-brand">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-sky-100/70">
            <li><Link href="/#why" className="hover:text-brand">Why choose us</Link></li>
            <li><Link href="/#reviews" className="hover:text-brand">Reviews</Link></li>
            <li><Link href="/#pricing" className="hover:text-brand">Pricing</Link></li>
            <li><Link href="/book" className="hover:text-brand">Book online</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold">Ready to book?</h4>
          <p className="mt-4 text-sm text-sky-100/70">
            Get an instant quote and pick a slot in under two minutes.
          </p>
          <Link
            href="/book"
            className="mt-4 inline-block rounded-full bg-brand px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-bright"
          >
            Book a clean →
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-sky-100/50 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Fully insured · Sheffield, South Yorkshire</p>
        </div>
      </div>
    </footer>
  );
}

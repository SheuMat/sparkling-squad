import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a clean — instant online quote",
  description:
    "Get an instant quote and book your clean online — domestic, deep, end-of-tenancy, pressure washing, fogging and more across Sheffield.",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;

  return (
    <div className="min-h-screen bg-sky-50/40">
      {/* Slim header */}
      <header className="border-b border-sky-100 bg-white">
        <div className="container-x flex h-20 items-center justify-between">
          <Link href="/" aria-label={site.name}>
            <Image src="/brand/wordmark.png" alt={site.name} width={170} height={56} className="h-9 w-auto" priority />
          </Link>
          <a href={site.phoneHref} className="text-sm font-bold text-navy hover:text-brand">
            📞 {site.phone}
          </a>
        </div>
      </header>

      <main className="container-x py-12">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand">
            Free instant quote
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
            Book your clean in a few clicks
          </h1>
          <p className="mt-3 text-navy/70">
            Answer a few quick questions, see your price and pick a slot. No payment needed to
            request — we confirm everything first.
          </p>
        </div>

        <BookingForm initialService={service} />

        <p className="mt-8 text-center text-sm">
          <Link href="/" className="font-semibold text-navy/60 hover:text-brand">
            ← Back to home
          </Link>
        </p>
      </main>
    </div>
  );
}

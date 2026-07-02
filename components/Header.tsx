"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

const nav = [
  { label: "Services", href: "/#services" },
  { label: "Why Us", href: "/#why" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // At the top of the page the header sits over the dark slider, so we use the
  // white footer logo + white text. Once scrolled it becomes a solid white bar
  // with the full-colour logo and navy text.
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "bg-white/95 shadow-card backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label={site.name}>
          <Image
            src={solid ? "/brand/wordmark.png" : "/brand/logo-white.png"}
            alt={site.name}
            width={180}
            height={60}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-semibold transition hover:text-brand ${
                solid ? "text-navy/80" : "text-white/90 drop-shadow"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={site.phoneHref}
            className={`text-sm font-bold transition hover:text-brand ${
              solid ? "text-navy" : "text-white drop-shadow"
            }`}
          >
            {site.phone}
          </a>
          <Link
            href="/book"
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-soft transition hover:bg-brand-bright"
          >
            Book a clean
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="grid h-11 w-11 place-items-center rounded-xl bg-white/90 text-navy shadow-card lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="text-xl">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden">
          <div className="container-x pb-5">
            <div className="rounded-2xl bg-white p-4 shadow-soft">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 font-semibold text-navy hover:bg-sky-50"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/book"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-xl bg-brand px-3 py-3 text-center font-bold text-white"
              >
                Book a clean
              </Link>
              <a
                href={site.phoneHref}
                className="mt-2 block rounded-xl px-3 py-3 text-center font-bold text-navy"
              >
                📞 {site.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

type Slide = {
  image: string;
  eyebrow: string;
  title: string;
  highlight: string;
  text: string;
};

const slides: Slide[] = [
  {
    image: "/images/window-clean.jpg",
    eyebrow: "Sheffield's trusted cleaning squad",
    title: "A spotless home,",
    highlight: "without the hassle",
    text: "Domestic, deep & end-of-tenancy cleans by friendly, fully-insured local cleaners. Book online in under two minutes.",
  },
  {
    image: "/images/floor-polish.jpg",
    eyebrow: "Driveways · Patios · Decking",
    title: "Pressure washing that",
    highlight: "brings surfaces back to life",
    text: "Blast away moss, algae and years of grime. We restore driveways, patios and paths across Sheffield.",
  },
  {
    image: "/images/fogging.jpg",
    eyebrow: "Hospital-grade sanitisation",
    title: "Disinfectant fogging for",
    highlight: "total peace of mind",
    text: "Touch-free fogging kills 99.9% of germs across offices, lets and care settings — certificate on request.",
  },
];

const AUTOPLAY_MS = 6000;

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((next: number) => {
    setIndex((next + slides.length) % slides.length);
  }, []);

  const restart = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS);
  }, []);

  useEffect(() => {
    restart();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [restart]);

  // Touch / swipe support
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) {
      go(index + (dx < 0 ? 1 : -1));
      restart();
    }
    touchX.current = null;
  };

  return (
    <section
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.image + i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        >
          <div className="relative h-full w-full">
            <Image
              src={slide.image}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover ${i === index ? "animate-kenburns" : ""}`}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/85 via-navy/65 to-navy/20" />
        </div>
      ))}

      {/* Content */}
      <div className="container-x relative z-10 flex h-full flex-col justify-center pt-20">
        <div className="max-w-2xl text-white" key={index}>
          <span className="fade-up inline-flex items-center gap-2 rounded-full bg-brand/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wide">
            ✦ {slides[index].eyebrow}
          </span>
          <h1 className="fade-up mt-5 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            {slides[index].title}
            <br />
            <span className="text-sky-300">{slides[index].highlight}</span>
          </h1>
          <p className="fade-up mt-5 max-w-xl text-base text-sky-100/90 sm:text-lg">
            {slides[index].text}
          </p>
          <div className="fade-up mt-8 flex flex-wrap gap-3">
            <Link
              href="/book"
              className="rounded-full bg-brand px-7 py-3.5 text-base font-bold text-white shadow-soft transition hover:bg-brand-bright"
            >
              Get an instant quote →
            </Link>
            <a
              href={site.phoneHref}
              className="rounded-full border-2 border-white/70 px-7 py-3.5 text-base font-bold text-white backdrop-blur transition hover:bg-white hover:text-navy"
            >
              📞 {site.phone}
            </a>
          </div>

          <div className="fade-up mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-sky-100">
            <span>⭐ 5-star rated locally</span>
            <span>🛡️ Fully insured</span>
            <span>✅ Satisfaction guarantee</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={() => {
          go(index - 1);
          restart();
        }}
        className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-2xl text-white backdrop-blur transition hover:bg-white/40 md:grid"
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        onClick={() => {
          go(index + 1);
          restart();
        }}
        className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-2xl text-white backdrop-blur transition hover:bg-white/40 md:grid"
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              go(i);
              restart();
            }}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-8 bg-brand" : "w-2.5 bg-white/60 hover:bg-white"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

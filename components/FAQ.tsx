"use client";

import { useState } from "react";
import type { Faq } from "@/lib/faqs";

export default function FAQ({
  items,
  heading = "Frequently asked questions",
  eyebrow = "Good to know",
}: {
  items: Faq[];
  heading?: string;
  eyebrow?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container-x max-w-3xl">
        <div className="text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand">{eyebrow}</span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">{heading}</h2>
        </div>

        <div className="mt-10 divide-y divide-sky-100 rounded-3xl border border-sky-100">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-navy">{item.q}</span>
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sky-50 text-brand transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && <p className="px-6 pb-5 text-navy/70">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

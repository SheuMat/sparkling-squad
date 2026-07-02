# Sparkling Squad — Website

Sheffield's professional cleaning service. Built with **Next.js 15 (App Router)**, **React 19**,
**TypeScript** and **Tailwind CSS v4**.

## Features

- **Auto-playing hero slider** — 3 slides, Ken Burns zoom, swipe + arrows + dots, autoplay.
- **All cleaning services** — domestic, deep, end-of-tenancy, pressure washing, disinfectant
  fogging, carpets & upholstery, commercial/office, gardening.
- **Comprehensive booking wizard** (`/book`) — 5 steps (Service → Details → Schedule → Your info →
  Review) with a **live instant price estimate**, room counters, frequency discounts, add-on extras,
  date/time picker and validation. Deep-links per service via `/book?service=<slug>`.
- Sticky responsive header, trust marquee, why-us, process, pricing tiers, reviews, coverage map and
  full footer with contact details.
- SEO metadata, Open Graph, Poppins web font.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Where to edit things

| What | File |
| --- | --- |
| Business name, phone, email, hours, coverage | `lib/site.ts` |
| Services, prices & the estimator logic | `lib/services.ts` |
| Hero slides | `components/HeroSlider.tsx` |
| Booking flow | `components/BookingForm.tsx` |
| Brand images / logos / photos | `public/brand`, `public/images` |

## Going live — TODO

1. **Booking delivery.** `app/api/booking/route.ts` currently validates and logs submissions.
   Wire it to email (Resend / Nodemailer to `hello@sparklingsquad.com`), a Google Sheet, or a CRM.
2. **Real content.** Swap the placeholder stats (500+ cleans, 4.9★) and reviews for real ones; add
   genuine photos to `public/images`.
3. **Confirm prices.** The estimator figures in `lib/services.ts` are sensible starters — tune to
   your actual pricing.
4. **Deploy.** Push to GitHub and deploy on Vercel (zero-config for Next.js).

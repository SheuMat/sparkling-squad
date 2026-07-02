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

## Email delivery (booking & contact forms)

Both the booking form (`/api/booking`) and the contact form (`/api/contact`) email submissions to
the business via [Resend](https://resend.com), using the helper in `lib/email.ts`. If no API key is
set, they safely fall back to logging so the site still works.

**To turn email on:**

1. Create a free account at [resend.com](https://resend.com) and generate an **API key**.
2. **Verify the domain** `sparklingsquad.co.uk` in Resend (Domains → Add) so email can be sent to
   `contact@sparklingsquad.co.uk` from your own address. (Before verifying, Resend only allows the
   test sender `onboarding@resend.dev` and delivery to your own Resend account email.)
3. Add these environment variables — locally in `.env.local`, and in
   **Vercel → Settings → Environment Variables** for production (see `.env.example`):

   ```
   RESEND_API_KEY=re_...
   MAIL_TO=contact@sparklingsquad.co.uk
   MAIL_FROM=Sparkling Squad <noreply@sparklingsquad.co.uk>
   ```
4. Redeploy. Submissions now arrive at `contact@sparklingsquad.co.uk`, with the customer's email set
   as **reply-to** so you can respond directly.

## Going live — remaining TODO

1. **Real content.** Swap the placeholder stats (500+ cleans, 4.9★) and reviews for real ones; add
   genuine photos to `public/images`.
2. **Confirm prices.** The estimator figures in `lib/services.ts` are sensible starters — tune to
   your actual pricing.
3. **Deploy.** Push to GitHub and deploy on Vercel (zero-config for Next.js).

// All cleaning services offered, plus the data the booking estimator needs.

export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  icon: string; // emoji used as a lightweight icon
  image: string;
  from: number; // starting price, GBP
  unit?: string; // e.g. "per visit", "per room"
  features: string[];
  // Pricing model used by the estimator:
  //  - "room"   : base + per-bedroom + per-bathroom
  //  - "flat"   : single starting price (quoted on site)
  //  - "area"   : base + per square-metre band (jet wash etc.)
  pricing: "room" | "flat" | "area";
  popular?: boolean;
};

export const services: Service[] = [
  {
    slug: "domestic",
    name: "Domestic Cleaning",
    short: "Regular home cleans, weekly or fortnightly.",
    description:
      "Reliable, friendly cleaners for your home. Kitchens, bathrooms, dusting, vacuuming and mopping — done to a checklist every visit so nothing gets missed.",
    icon: "🏠",
    image: "/images/window-clean.jpg",
    from: 60,
    unit: "per visit",
    features: ["Same cleaner each visit", "Bring our own products", "Weekly / fortnightly", "Fully insured"],
    pricing: "room",
    popular: true,
  },
  {
    slug: "deep-clean",
    name: "Deep Cleaning",
    short: "Top-to-bottom reset for your whole home.",
    description:
      "A thorough, intensive clean that reaches the places a regular clean doesn't — skirting boards, behind appliances, inside cupboards, limescale and grout.",
    icon: "✨",
    image: "/images/floor-polish.jpg",
    from: 120,
    unit: "per clean",
    features: ["Inside ovens & cupboards", "Limescale removal", "Skirtings & doors", "Detailed bathrooms"],
    pricing: "room",
    popular: true,
  },
  {
    slug: "end-of-tenancy",
    name: "End of Tenancy",
    short: "Deposit-back cleans for tenants & landlords.",
    description:
      "Move-out cleaning to letting-agent standard. We clean everything to help you get your full deposit back, with a re-clean guarantee if the inventory flags anything.",
    icon: "🔑",
    image: "/images/window-clean.jpg",
    from: 150,
    unit: "per property",
    features: ["Agent-standard finish", "Re-clean guarantee", "Oven & appliances", "Carpets available"],
    pricing: "room",
    popular: true,
  },
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    short: "Driveways, patios, decking & paths jet-washed.",
    description:
      "High-pressure jet washing that strips away moss, algae, dirt and weeds from driveways, patios, paths and decking — bringing tired surfaces back to life.",
    icon: "💦",
    image: "/images/floor-polish.jpg",
    from: 80,
    unit: "per job",
    features: ["Driveways & patios", "Decking & paths", "Moss & weed removal", "Optional re-sanding"],
    pricing: "area",
    popular: true,
  },
  {
    slug: "fogging",
    name: "Disinfectant Fogging",
    short: "Hospital-grade sanitisation of any space.",
    description:
      "Ultra-low-volume fogging that disinfects every surface and the air, killing bacteria and viruses. Ideal for offices, care settings, AirBnBs and after illness.",
    icon: "🧴",
    image: "/images/fogging.jpg",
    from: 70,
    unit: "per visit",
    features: ["Kills 99.9% of germs", "Touch-free coverage", "Safe, fast-drying", "Certificate on request"],
    pricing: "flat",
  },
  {
    slug: "upholstery",
    name: "Carpet & Upholstery",
    short: "Deep-extraction cleaning for carpets & sofas.",
    description:
      "Hot-water extraction lifts dirt, stains and odours from carpets, rugs, sofas and mattresses, leaving them fresh and dry within hours.",
    icon: "🛋️",
    image: "/images/floor-polish.jpg",
    from: 45,
    unit: "per room/item",
    features: ["Stain & odour removal", "Pet-friendly products", "Fast drying", "Sofas & mattresses"],
    pricing: "flat",
  },
  {
    slug: "commercial",
    name: "Commercial & Office",
    short: "Offices, shops & communal spaces.",
    description:
      "Scheduled contract cleaning for offices, retail, surgeries and communal areas. Flexible hours around your business, with key-holding and supplies included.",
    icon: "🏢",
    image: "/images/window-clean.jpg",
    from: 90,
    unit: "per visit",
    features: ["Out-of-hours available", "Key-holding service", "Consumables supplied", "Contract or one-off"],
    pricing: "flat",
  },
  {
    slug: "gardening",
    name: "Gardening & Exterior",
    short: "Tidy-ups, lawns, hedges & clearance.",
    description:
      "Keep your outdoor space sharp — lawn mowing, hedge trimming, weeding, jet-washing and garden clearance. The perfect finish alongside a pressure wash.",
    icon: "🌿",
    image: "/images/floor-polish.jpg",
    from: 50,
    unit: "per visit",
    features: ["Lawn & hedge care", "Weeding & borders", "Garden clearance", "Green waste removal"],
    pricing: "flat",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

// --- Booking estimator ---------------------------------------------------

export type EstimateInput = {
  serviceSlug: string;
  bedrooms: number;
  bathrooms: number;
  frequency: "one-off" | "weekly" | "fortnightly" | "monthly";
  extras: string[];
};

export const EXTRAS: { id: string; label: string; price: number }[] = [
  { id: "oven", label: "Inside oven clean", price: 35 },
  { id: "fridge", label: "Inside fridge/freezer", price: 20 },
  { id: "windows", label: "Internal windows", price: 25 },
  { id: "carpets", label: "Carpet shampoo (per room)", price: 30 },
  { id: "ironing", label: "Ironing (1 hour)", price: 18 },
  { id: "balcony", label: "Balcony / outdoor area", price: 25 },
];

// Frequency discounts reward regular bookings.
const FREQUENCY_MULTIPLIER: Record<EstimateInput["frequency"], number> = {
  "one-off": 1,
  weekly: 0.85,
  fortnightly: 0.9,
  monthly: 0.95,
};

export function estimate(input: EstimateInput): { low: number; high: number } | null {
  const service = getService(input.serviceSlug);
  if (!service) return null;

  let base = service.from;

  if (service.pricing === "room") {
    // Base covers a 1-bed; add for extra bedrooms and bathrooms.
    base = service.from + Math.max(0, input.bedrooms - 1) * 22 + Math.max(0, input.bathrooms - 1) * 18;
  }

  const extrasTotal = input.extras.reduce((sum, id) => {
    const extra = EXTRAS.find((e) => e.id === id);
    return sum + (extra ? extra.price : 0);
  }, 0);

  const multiplier = FREQUENCY_MULTIPLIER[input.frequency];
  const subtotal = (base + extrasTotal) * multiplier;

  // Give a sensible range rather than a false-precision single figure.
  const low = Math.round(subtotal / 5) * 5;
  const high = Math.round((subtotal * 1.25) / 5) * 5;
  return { low, high };
}

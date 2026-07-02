// All cleaning services offered, plus the data the booking estimator needs.

export type Service = {
  slug: string;
  name: string;
  short: string;
  description: string;
  overview: string[]; // longer copy for the service detail page (paragraphs)
  icon: string; // emoji used as a lightweight icon
  image: string;
  from: number; // starting price, GBP
  unit?: string; // e.g. "per visit", "per room"
  features: string[]; // short highlight chips
  included: string[]; // detailed "what's included" checklist
  idealFor: string;
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
    overview: [
      "Life's busy — the last thing you want to spend your evenings and weekends on is scrubbing the bathroom. Our domestic cleaning keeps your Sheffield home consistently fresh with a friendly, vetted cleaner who works to a set checklist every single visit.",
      "You'll usually get the same cleaner each time, so they learn your home and your preferences. We bring our own products and equipment, and you can book weekly, fortnightly or monthly with a discount for regular slots.",
    ],
    icon: "🏠",
    image: "/images/window-clean.jpg",
    from: 60,
    unit: "per visit",
    features: ["Same cleaner each visit", "We bring products", "Weekly / fortnightly", "Fully insured"],
    included: [
      "Kitchen — worktops, sinks, hob and appliance exteriors",
      "Bathrooms — toilets, showers, baths, sinks and mirrors",
      "Dusting of all reachable surfaces, sills and fittings",
      "Vacuuming carpets and mopping hard floors",
      "Emptying bins and general tidying",
      "Beds made or linen changed on request",
    ],
    idealFor:
      "Busy households and working professionals who want a consistently clean home without lifting a finger.",
    pricing: "room",
    popular: true,
  },
  {
    slug: "deep-clean",
    name: "Deep Cleaning",
    short: "Top-to-bottom reset for your whole home.",
    description:
      "A thorough, intensive clean that reaches the places a regular clean doesn't — skirting boards, behind appliances, inside cupboards, limescale and grout.",
    overview: [
      "A deep clean is a complete reset for your home. We go well beyond the surface — tackling built-up grime, limescale, grease and the spots that get missed week to week, from skirting boards and door frames to the inside of your oven and cupboards.",
      "It's the perfect one-off before guests arrive, after building work, at the change of a season, or to get a neglected home back to a standard you can maintain with regular visits.",
    ],
    icon: "✨",
    image: "/images/floor-polish.jpg",
    from: 120,
    unit: "per clean",
    features: ["Inside ovens & cupboards", "Limescale removal", "Skirtings & doors", "Detailed bathrooms"],
    included: [
      "Everything in a standard clean, done more intensively",
      "Inside oven, hob, extractor and microwave",
      "Limescale removed from taps, tiles and glass",
      "Skirting boards, door frames, switches and sockets",
      "Inside cupboards, drawers and wardrobes",
      "Cobweb removal and detailed edge-work throughout",
    ],
    idealFor:
      "Homes that need a proper reset — before guests, after renovation, or when a regular clean simply isn't enough.",
    pricing: "room",
    popular: true,
  },
  {
    slug: "end-of-tenancy",
    name: "End of Tenancy",
    short: "Deposit-back cleans for tenants & landlords.",
    description:
      "Move-out cleaning to letting-agent standard. We clean everything to help you get your full deposit back, with a re-clean guarantee if the inventory flags anything.",
    overview: [
      "Moving is stressful enough without worrying about your deposit. Our end-of-tenancy clean is carried out to letting-agent inventory standard, covering every room top to bottom so the property is handed back spotless.",
      "We work for tenants, landlords and letting agents across Sheffield. If the check-out inventory flags anything we've cleaned, we'll come back and put it right free of charge — that's our re-clean guarantee.",
    ],
    icon: "🔑",
    image: "/images/window-clean.jpg",
    from: 150,
    unit: "per property",
    features: ["Agent-standard finish", "Re-clean guarantee", "Oven & appliances", "Carpets available"],
    included: [
      "Full property clean to letting-agent inventory standard",
      "Oven, appliances and full kitchen deep clean",
      "Bathrooms descaled and sanitised throughout",
      "Interior windows, sills and frames",
      "Inside all cupboards, drawers and wardrobes",
      "Floors vacuumed and mopped throughout",
    ],
    idealFor:
      "Tenants who want their deposit back, and landlords or agents preparing a property for the next occupant.",
    pricing: "room",
    popular: true,
  },
  {
    slug: "pressure-washing",
    name: "Pressure Washing",
    short: "Driveways, patios, decking & paths jet-washed.",
    description:
      "High-pressure jet washing that strips away moss, algae, dirt and weeds from driveways, patios, paths and decking — bringing tired surfaces back to life.",
    overview: [
      "Over time, driveways and patios get taken over by moss, algae, weeds and ground-in dirt. Our professional pressure washing blasts it all away, revealing the clean surface underneath and dramatically boosting your home's kerb appeal.",
      "We treat driveways, patios, paths, steps, decking and fencing, and can re-sand and seal block paving afterwards to keep it looking its best for longer. All debris is cleared away when we're done.",
    ],
    icon: "💦",
    image: "/images/floor-polish.jpg",
    from: 80,
    unit: "per job",
    features: ["Driveways & patios", "Decking & paths", "Moss & weed removal", "Optional re-sanding"],
    included: [
      "Driveways, patios, paths and steps",
      "Decking and fencing",
      "Moss, algae, weed and dirt removal",
      "Pre-treatment of stubborn oil and stains",
      "Optional patio re-sanding and sealing",
      "Full tidy-up and removal of debris afterwards",
    ],
    idealFor:
      "Restoring tired outdoor surfaces and boosting kerb appeal — without the cost of replacing paving.",
    pricing: "area",
    popular: true,
  },
  {
    slug: "fogging",
    name: "Disinfectant Fogging",
    short: "Hospital-grade sanitisation of any space.",
    description:
      "Ultra-low-volume fogging that disinfects every surface and the air, killing bacteria and viruses. Ideal for offices, care settings, AirBnBs and after illness.",
    overview: [
      "Disinfectant fogging uses ultra-low-volume (ULV) equipment to spread a fine mist of hospital-grade disinfectant across every surface and into the air — reaching areas that wiping alone can't. It kills 99.9% of bacteria and viruses in minutes.",
      "It's touch-free, fast-drying and leaves no residue, making it ideal for offices, holiday lets, vehicles, care settings and homes — especially after illness or high footfall. A certificate of sanitisation is available on request.",
    ],
    icon: "🧴",
    image: "/images/fogging.jpg",
    from: 70,
    unit: "per visit",
    features: ["Kills 99.9% of germs", "Touch-free coverage", "Safe, fast-drying", "Certificate on request"],
    included: [
      "ULV fogging of all surfaces and the air",
      "Hospital-grade, non-toxic disinfectant",
      "Focus on kitchens, bathrooms and high-touch points",
      "Fast-drying with no sticky residue",
      "Suitable for homes, offices and vehicles",
      "Certificate of sanitisation on request",
    ],
    idealFor:
      "Offices, lets, care settings and homes needing reassurance after illness or heavy use.",
    pricing: "flat",
  },
  {
    slug: "upholstery",
    name: "Carpet & Upholstery",
    short: "Deep-extraction cleaning for carpets & sofas.",
    description:
      "Hot-water extraction lifts dirt, stains and odours from carpets, rugs, sofas and mattresses, leaving them fresh and dry within hours.",
    overview: [
      "Carpets and soft furnishings hold onto dust, allergens, stains and smells that vacuuming can't shift. Our hot-water extraction cleaning injects a cleaning solution deep into the fibres and draws it back out with the dirt, lifting years of grime.",
      "We clean carpets, rugs, stair runners, sofas, armchairs, dining chairs and mattresses. We use pet- and family-safe products, and everything is left just damp so it dries within a few hours.",
    ],
    icon: "🛋️",
    image: "/images/floor-polish.jpg",
    from: 45,
    unit: "per room/item",
    features: ["Stain & odour removal", "Pet-friendly products", "Fast drying", "Sofas & mattresses"],
    included: [
      "Hot-water extraction deep clean",
      "Sofas, armchairs and dining chairs",
      "Carpets, rugs and stair runners",
      "Mattresses and headboards",
      "Targeted stain and odour treatment",
      "Pet-safe, quick-drying products",
    ],
    idealFor:
      "Refreshing carpets and soft furnishings that look dull, smell stale or have stubborn stains.",
    pricing: "flat",
  },
  {
    slug: "commercial",
    name: "Commercial & Office",
    short: "Offices, shops & communal spaces.",
    description:
      "Scheduled contract cleaning for offices, retail, surgeries and communal areas. Flexible hours around your business, with key-holding and supplies included.",
    overview: [
      "A clean, well-presented workplace matters — for your team, your customers and your reputation. We provide scheduled contract cleaning for offices, shops, surgeries, gyms and communal areas across Sheffield, tailored to your space and budget.",
      "We work around your hours, including early mornings and evenings, and offer key-holding, alarm setting and fully-managed supplies so you never have to think about it. Daily, weekly or one-off — we're flexible.",
    ],
    icon: "🏢",
    image: "/images/window-clean.jpg",
    from: 90,
    unit: "per visit",
    features: ["Out-of-hours available", "Key-holding service", "Consumables supplied", "Contract or one-off"],
    included: [
      "Offices, retail units and surgeries",
      "Communal areas, stairwells and receptions",
      "Washrooms cleaned, sanitised and restocked",
      "Desks, touch-points and staff kitchens",
      "Waste removal and recycling",
      "Flexible daily, weekly or contract schedules",
    ],
    idealFor:
      "Businesses that need a reliable, professional presentation without managing cleaners in-house.",
    pricing: "flat",
  },
  {
    slug: "gardening",
    name: "Gardening & Exterior",
    short: "Tidy-ups, lawns, hedges & clearance.",
    description:
      "Keep your outdoor space sharp — lawn mowing, hedge trimming, weeding, jet-washing and garden clearance. The perfect finish alongside a pressure wash.",
    overview: [
      "A tidy garden lifts the whole look of your property. Our exterior team handles the regular upkeep — mowing, edging, hedge trimming and weeding — as well as bigger one-off jobs like clearance and green-waste removal.",
      "It pairs perfectly with our pressure washing: mow, trim and jet-wash in one visit and the transformation is night and day. Great for homeowners, landlords and rental turnarounds.",
    ],
    icon: "🌿",
    image: "/images/floor-polish.jpg",
    from: 50,
    unit: "per visit",
    features: ["Lawn & hedge care", "Weeding & borders", "Garden clearance", "Green waste removal"],
    included: [
      "Lawn mowing and edging",
      "Hedge and shrub trimming",
      "Weeding of borders and paths",
      "Leaf and general garden clearance",
      "Jet-washing of hard surfaces",
      "Removal of all green waste",
    ],
    idealFor:
      "Keeping outdoor space neat year-round, or a one-off blitz to reclaim an overgrown garden.",
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

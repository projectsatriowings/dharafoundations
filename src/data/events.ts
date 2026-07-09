export interface Event {
  id: string;            // slug identifier, e.g. "dhara-divine-awards"
  numericId?: string;    // numeric identifier matching old site URL e.g. "41"
  title: string;
  category: string;      // e.g. "Awards & Recognition"
  date: string;          // e.g. "24 Jan, 2026"
  time: string;          // e.g. "09:00 AM"
  location: string;      // short label, e.g. "Chetpet, Chennai"
  coordinates: { lat: number; lng: number }; // validated coordinates
  coverImage: string;
  galleryImages: string[];
  description: string[];
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    pinterest?: string;
    instagram?: string;
  };
  videoLinks?: {
    title: string;
    url: string;
  }[];
  isContentUnconfirmed?: boolean;
}

/**
 * Validates GPS coordinates to prevent invalid data-entry issues (e.g. out-of-bounds longitudes).
 */
export function isValidCoordinate(coord: { lat: number; lng: number }): boolean {
  if (!coord || typeof coord.lat !== "number" || typeof coord.lng !== "number") return false;
  return coord.lat >= -90 && coord.lat <= 90 && coord.lng >= -180 && coord.lng <= 180;
}

export const EVENTS_DATA: Event[] = [
  {
    id: "digitisation-activities-wshg",
    numericId: "40",
    title: "In Digitisation activities for Women Self Help Group society",
    category: "Women's Empowerment",
    date: "01 Jan, 2026",
    time: "01:00 PM",
    location: "Cuddalore",
    coordinates: { lat: 11.7480, lng: 79.7714 },
    coverImage: "/images/events/event-digitisation-women-shg.jpg",
    galleryImages: [],
    description: [
      "[CONTENT TO BE GATHERED FROM SOURCE SITE / CLIENT] The Dhara Foundations initiated comprehensive digitisation training and financial literacy workshops for Women Self Help Group (SHG) societies in Cuddalore district.",
      "Empowering rural women with modern digital tools enables seamless record keeping, transparent micro-finance management, and greater economic independence for thousands of families across the region.",
    ],
    isContentUnconfirmed: true,
  },
  {
    id: "tribal-welfare-javadhu-hills",
    numericId: "39",
    title: "In Tribal welfare activities at Javadhu hills",
    category: "Welfare Drives",
    date: "06 Nov, 2025",
    time: "02:00 PM",
    location: "Vellore",
    coordinates: { lat: 12.5855, lng: 78.8687 },
    coverImage: "/images/events/event-tribal-welfare-javadhu.jpg",
    galleryImages: [],
    description: [
      "[CONTENT TO BE GATHERED FROM SOURCE SITE / CLIENT] A comprehensive tribal welfare outreach conducted across remote hamlets in the Javadhu Hills near Vellore, focusing on basic healthcare, nutrition, and warm clothing distribution.",
      "Volunteers hiked into interior tribal villages to deliver essential supplies, study kits for children, and conduct general medical screening camps.",
    ],
    isContentUnconfirmed: true,
  },
  {
    id: "diwali-dresses-home-children",
    numericId: "38",
    title: "Providing Diwali Dresses To Home Children",
    category: "Children & Education",
    date: "18 Oct, 2025",
    time: "01:00 PM",
    location: "Cuddalore",
    coordinates: { lat: 11.7480, lng: 79.7714 },
    coverImage: "/images/events/event-diwali-dresses.jpg",
    galleryImages: [],
    description: [
      "[CONTENT TO BE GATHERED FROM SOURCE SITE / CLIENT] Celebrating the Festival of Lights by distributing brand new traditional Diwali dresses, festive sweets, and firecrackers to children residing in government care homes across Cuddalore.",
      "Bringing joy, warmth, and a festive family spirit to orphan and destitute children during the auspicious occasion of Deepavali.",
    ],
    isContentUnconfirmed: true,
  },
  {
    id: "footwear-girl-children-annai-sathiya",
    numericId: "37",
    title: "Providing footwear to all the girl children at Annai Sathiya District Govt Home",
    category: "Children & Education",
    date: "14 Apr, 2025",
    time: "01:00 PM",
    location: "Cuddalore",
    coordinates: { lat: 11.7480, lng: 79.7714 },
    coverImage: "/images/events/event-footwear-girl-children.jpg",
    galleryImages: [],
    description: [
      "[CONTENT TO BE GATHERED FROM SOURCE SITE / CLIENT] Dhara Foundations distributed high-quality, durable footwear to all girl children residing at the Annai Sathiya District Government Home in Cuddalore on Tamil New Year's Day.",
      "Ensuring health, hygiene, and dignity for young girls through daily essential supplies and continued mentorship.",
    ],
    isContentUnconfirmed: true,
  },
  {
    id: "felicitation-sports-children-pongal",
    numericId: "36",
    title: "Felicitation of Sports children at Cuddalore during Pongal festival",
    category: "Children & Education",
    date: "14 Jan, 2025",
    time: "06:00 PM",
    location: "Cuddalore",
    coordinates: { lat: 11.7480, lng: 79.7714 },
    coverImage: "/images/events/event-sports-pongal.jpg",
    galleryImages: [],
    description: [
      "[CONTENT TO BE GATHERED FROM SOURCE SITE / CLIENT] During the grand Pongal harvest festival celebrations, Dhara Foundations organized a special ceremony to felicitate outstanding young sports achievers from government schools and orphanages in Cuddalore.",
      "Recognizing athletic excellence and providing sports kits, trophies, and scholarships to inspire the youth to pursue healthy physical development.",
    ],
    isContentUnconfirmed: true,
  },
  {
    id: "meal-food-carriers-govt-home",
    numericId: "35",
    title: "Providing meal and food carriers to Govt Home Children",
    category: "Welfare Drives",
    date: "17 Sep, 2024",
    time: "01:00 PM",
    location: "Cuddalore",
    coordinates: { lat: 11.7480, lng: 79.7714 },
    coverImage: "/images/events/event-meal-food-carriers.jpg",
    galleryImages: [],
    description: [
      "[CONTENT TO BE GATHERED FROM SOURCE SITE / CLIENT] An Anna Daanam service providing wholesome festive meals along with stainless steel food carriers and water bottles to children at government welfare homes in Cuddalore.",
      "Nourishing the body and soul through traditional hospitality and selfless service.",
    ],
    isContentUnconfirmed: true,
  },
  {
    id: "covid-19-relief",
    numericId: "34",
    title: "COVID 19 Relief",
    category: "Welfare Drives",
    date: "03 Feb, 2020",
    time: "09:00 AM",
    location: "Chennai",
    coordinates: { lat: 13.0827, lng: 80.2707 },
    coverImage: "/images/events/event-covid-relief.jpg",
    galleryImages: [],
    description: [
      "[CONTENT TO BE GATHERED FROM SOURCE SITE / CLIENT] Extensive COVID-19 pandemic emergency relief operations conducted across Chennai, distributing grocery kits, medical supplies, masks, and daily cooked meals to stranded daily-wage laborers and vulnerable families.",
      "Working on the frontlines during national lockdowns to ensure no family went hungry during the crisis.",
    ],
    isContentUnconfirmed: true,
  },
];

export function getEventBySlugOrId(idOrSlug: string): Event | undefined {
  return EVENTS_DATA.find((e) => e.id === idOrSlug || e.numericId === idOrSlug);
}

export function getCleanEventImage(text?: string, fallbackImg?: string): string {
  if (!text) return fallbackImg || "/images/event-1.png";
  const lower = text.toLowerCase();
  if (lower.includes("digitisation") || lower.includes("shg")) return "/images/events/event-digitisation-women-shg.jpg";
  if (lower.includes("javadhu") || lower.includes("tribal")) return "/images/events/event-tribal-welfare-javadhu.jpg";
  if (lower.includes("diwali") || lower.includes("dresses")) return "/images/events/event-diwali-dresses.jpg";
  if (lower.includes("footwear") || lower.includes("annai sathiya") || lower.includes("girl children")) return "/images/events/event-footwear-girl-children.jpg";
  if (lower.includes("pongal") || lower.includes("sports")) return "/images/events/event-sports-pongal.jpg";
  if (lower.includes("meal") || lower.includes("carriers") || lower.includes("food")) return "/images/events/event-meal-food-carriers.jpg";
  if (lower.includes("covid") || lower.includes("relief")) return "/images/events/event-covid-relief.jpg";
  if (lower.includes("2025")) return "/Event images/18.jpg";
  if (lower.includes("divine") || lower.includes("award") || lower.includes("2026")) return "/Event images/05.jpg";
  return fallbackImg || "/images/event-1.png";
}

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
    id: "raghavendra-bhoomi-pooja",
    numericId: "45",
    title: "Bhoomi Pooja Performed for Raghavendra Temple",
    category: "Sanatana Dharma",
    date: "15 Jan, 2025",
    time: "09:00 AM",
    location: "Cuddalore",
    coordinates: { lat: 11.7480, lng: 79.7714 },
    coverImage: "/images/events/raghavendra-bhoomi-pooja.jpg",
    galleryImages: [],
    description: [
      "A Bhoomi Pooja ceremony was conducted for the construction of a new Sri Raghavendra Swamigal Temple at Cuddalore. Devotees, organizers, and priests participated in the sacred ritual and offered special prayers seeking divine blessings for the successful completion of the temple project. The event was held with traditional Vedic rituals and spiritual devotion.",
    ],
  },
  {
    id: "masi-pournami-girivalam",
    numericId: "44",
    title: "Masi Pournami Maha Girivalam",
    category: "Sanatana Dharma",
    date: "02 Mar, 2026",
    time: "06:00 PM",
    location: "Thirupparankundram, Madurai",
    coordinates: { lat: 9.8821, lng: 78.0734 },
    coverImage: "/images/events/masi-pournami-girivalam.jpg",
    galleryImages: [],
    description: [
      "A religious awareness procession was organized to promote the “Masi Pournami Maha Girivalam” to be held on 2nd March 2026 at Thirupparankundram. Devotees and organizers carried a banner featuring Lord Murugan and details of the sacred event, inviting the public to participate in the spiritual Girivalam procession. The event reflects devotion, community involvement, and the promotion of Hindu spiritual and temple traditions.",
    ],
  },
  {
    id: "devotional-offering-kodai",
    numericId: "43",
    title: "Devotional offering presented to the temple",
    category: "Sanatana Dharma",
    date: "10 Feb, 2025",
    time: "10:30 AM",
    location: "Tamil Nadu",
    coordinates: { lat: 13.0827, lng: 80.2707 },
    coverImage: "/images/events/devotional-offering-kodai.jpg",
    galleryImages: [],
    description: [
      "As a mark of faith and devotion, the Kodai was respectfully presented to the temple as a devotional contribution. This sacred offering symbolizes spiritual dedication, gratitude, and support towards preserving temple traditions and religious activities.",
    ],
  },
  {
    id: "brindavana-kumbabhishekam",
    numericId: "42",
    title: "Brindavana Kumbabhishekam ceremony",
    category: "Sanatana Dharma",
    date: "28 Jan, 2025",
    time: "08:00 AM",
    location: "Cuddalore",
    coordinates: { lat: 11.7480, lng: 79.7714 },
    coverImage: "/images/events/brindavana-kumbabhishekam.jpg",
    galleryImages: [],
    description: [
      "The Maha Kumbabhishekam Vaibhavam of Shri Raghavendra Swamigal Dakshina Bikshalaya Brindavanam, located at Maruthi Nagar, Anaikuppam, Cuddalore, was celebrated in a grand spiritual manner under the divine blessings and holy presence of Poojya Shri Vidya Vallabha Madhava Theertha Swamigal. On this auspicious occasion, I had the privilege of receiving the sacred blessings (Arulasi) of Poojya Shri Swamigal during the Shri Raghavendra Swamigal Brindavanam Kumbabhishekam celebrations.",
    ],
  },
  {
    id: "madurai-adheenam",
    numericId: "41",
    title: "Madurai Adheenam",
    category: "Sanatana Dharma",
    date: "20 Dec, 2024",
    time: "11:00 AM",
    location: "Madurai",
    coordinates: { lat: 9.9252, lng: 78.1198 },
    coverImage: "/images/events/madurai-adheenam.jpg",
    galleryImages: [],
    description: [
      "Madurai Adheenam is one of the oldest and most respected Saivite religious institutions in Tamil Nadu. It is headquartered in Madurai and is dedicated to the propagation of Saiva Siddhanta, Tamil culture, and Hindu spiritual traditions.",
      "The Madurai Adheenakarthar (Madurai Adhinam) is the spiritual head of the institution and plays a significant role in promoting religious teachings, temple traditions, Tamil literature, and social service activities. The Adheenam has historically contributed to the preservation and development of Tamil language, Saivite philosophy, and religious heritage.",
    ],
  },
  {
    id: "digitisation-activities-wshg",
    numericId: "40",
    title: "In Digitisation activities for Women Self Help Group society",
    category: "Women's Empowerment",
    date: "01 Jan, 2026",
    time: "01:00 PM",
    location: "Cuddalore",
    coordinates: { lat: 11.7480, lng: 79.7714 },
    coverImage: "https://res.cloudinary.com/woo94xq2/image/upload/v1783997177/dhara_foundations/activities/digitisation-activities-wshg/img_1.jpg",
    galleryImages: [
      "https://res.cloudinary.com/woo94xq2/image/upload/v1783997177/dhara_foundations/activities/digitisation-activities-wshg/img_1.jpg",
      "https://res.cloudinary.com/woo94xq2/image/upload/v1783997178/dhara_foundations/activities/digitisation-activities-wshg/img_2.jpg",
      "https://res.cloudinary.com/woo94xq2/image/upload/v1783997180/dhara_foundations/activities/digitisation-activities-wshg/img_3.jpg",
      "https://res.cloudinary.com/woo94xq2/image/upload/v1783997182/dhara_foundations/activities/digitisation-activities-wshg/img_4.jpg",
    ],
    description: [
      "Conducting digitisation activities for Women Self Help Group societies as part of a community empowerment and rural development initiative aimed at improving digital literacy, financial inclusion, and administrative efficiency among women members.",
      "The initiative focused on introducing digital systems and technology-based practices to Self Help Groups (SHGs), enabling women to maintain records, manage accounts, conduct banking transactions, and access government welfare schemes more effectively. Training and guidance were provided to help members understand the use of digital tools, online services, and cashless transaction methods.",
      "These activities were carried out to strengthen the functioning of Women Self Help Groups by promoting transparency, accuracy, and better communication through digitisation. The program also encouraged women to become more confident and independent in using technology for economic and social development.",
    ],
  },
  {
    id: "tribal-welfare-javadhu-hills",
    numericId: "39",
    title: "In Tribal welfare activities at Javadhu hills",
    category: "Welfare Drives",
    date: "06 Nov, 2025",
    time: "02:00 PM",
    location: "Javadhu Hills, Vellore",
    coordinates: { lat: 12.5855, lng: 78.8687 },
    coverImage: "https://res.cloudinary.com/woo94xq2/image/upload/v1783997186/dhara_foundations/activities/tribal-welfare-javadhu-hills/img_1.jpg",
    galleryImages: [
      "https://res.cloudinary.com/woo94xq2/image/upload/v1783997186/dhara_foundations/activities/tribal-welfare-javadhu-hills/img_1.jpg",
      "https://res.cloudinary.com/woo94xq2/image/upload/v1783997187/dhara_foundations/activities/tribal-welfare-javadhu-hills/img_2.jpg",
      "https://res.cloudinary.com/woo94xq2/image/upload/v1783997189/dhara_foundations/activities/tribal-welfare-javadhu-hills/img_3.jpg",
      "https://res.cloudinary.com/woo94xq2/image/upload/v1783997190/dhara_foundations/activities/tribal-welfare-javadhu-hills/img_4.jpg",
    ],
    description: [
      "Conducting tribal welfare activities in Javadhu Hills as part of a social development and community upliftment initiative aimed at improving the living conditions and well-being of tribal communities residing in remote hill areas.",
      "The welfare activities focused on supporting tribal families and children through the distribution of essential items, educational assistance, health awareness programs, and community support services. Special attention was given to improving access to basic necessities, promoting education among tribal children, and encouraging awareness about hygiene, health, and social welfare.",
    ],
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
    coverImage: "https://res.cloudinary.com/woo94xq2/image/upload/v1783997194/dhara_foundations/activities/diwali-dresses-home-children/img_1.jpg",
    galleryImages: [
      "https://res.cloudinary.com/woo94xq2/image/upload/v1783997194/dhara_foundations/activities/diwali-dresses-home-children/img_1.jpg",
      "https://res.cloudinary.com/woo94xq2/image/upload/v1783997195/dhara_foundations/activities/diwali-dresses-home-children/img_2.jpg",
    ],
    description: [
      "Providing Diwali dresses to home children in Cuddalore as part of a festive welfare and child support initiative aimed at spreading happiness, care, and celebration among underprivileged children during the occasion of Diwali.",
      "The initiative focused on distributing new dresses and festive clothing to children residing in government and charitable homes, enabling them to celebrate the festival with joy, dignity, and confidence. The program sought to create memorable moments for the children by ensuring they could participate in the festive celebrations with enthusiasm and a sense of belonging.",
      "Through this compassionate effort, special attention was given to promoting the emotional well-being and happiness of the children while encouraging community support and social responsibility. The distribution of Diwali dresses symbolized love, care, and inclusion, helping bring smiles and festive cheer to the young beneficiaries.",
      "The initiative reflects a commitment towards child welfare, humanitarian service, and community development by supporting the needs of children and making festival celebrations more meaningful and joyful for those living in care homes.",
    ],
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
    coverImage: "https://res.cloudinary.com/woo94xq2/image/upload/v1783997199/dhara_foundations/activities/footwear-girl-children-annai-sathiya/img_1.jpg",
    galleryImages: [
      "https://res.cloudinary.com/woo94xq2/image/upload/v1783997199/dhara_foundations/activities/footwear-girl-children-annai-sathiya/img_1.jpg",
      "https://res.cloudinary.com/woo94xq2/image/upload/v1783997200/dhara_foundations/activities/footwear-girl-children-annai-sathiya/img_2.jpg",
      "https://res.cloudinary.com/woo94xq2/image/upload/v1783997202/dhara_foundations/activities/footwear-girl-children-annai-sathiya/img_3.jpg",
      "https://res.cloudinary.com/woo94xq2/image/upload/v1783997203/dhara_foundations/activities/footwear-girl-children-annai-sathiya/img_4.jpg",
    ],
    description: [
      "Providing footwear to all the girl children at Annai Sathiya District Government Home as part of a social welfare and child support initiative aimed at ensuring comfort, hygiene, and well-being for the children residing in the government home.",
      "The initiative focused on distributing quality footwear to every girl child in the home, helping them meet their daily needs with dignity and care. Proper footwear plays an important role in protecting children’s health, improving mobility, and supporting their participation in education and daily activities.",
    ],
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
    coverImage: "https://res.cloudinary.com/woo94xq2/image/upload/v1783997207/dhara_foundations/activities/felicitation-sports-children-pongal/img_1.jpg",
    galleryImages: [
      "https://res.cloudinary.com/woo94xq2/image/upload/v1783997207/dhara_foundations/activities/felicitation-sports-children-pongal/img_1.jpg",
      "https://res.cloudinary.com/woo94xq2/image/upload/v1783997208/dhara_foundations/activities/felicitation-sports-children-pongal/img_2.jpg",
    ],
    description: [
      "Felicitation of young sports achievers in Cuddalore during the festive occasion of Pongal as part of a community encouragement and youth development initiative. The event was organized to recognize and honor talented children who have excelled in various sports and athletic activities through their hard work, dedication, and achievements.",
      "As part of the celebration, the children were appreciated and encouraged with honors, gifts, and motivational support to inspire them to continue pursuing excellence in sports. The Pongal festival provided a meaningful platform to celebrate not only cultural traditions but also the spirit of discipline, teamwork, and perseverance demonstrated by the young athletes.",
    ],
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
    coverImage: "https://res.cloudinary.com/woo94xq2/image/upload/v1783997211/dhara_foundations/activities/meal-food-carriers-govt-home/img_1.jpg",
    galleryImages: [
      "https://res.cloudinary.com/woo94xq2/image/upload/v1783997211/dhara_foundations/activities/meal-food-carriers-govt-home/img_1.jpg",
      "https://res.cloudinary.com/woo94xq2/image/upload/v1783997213/dhara_foundations/activities/meal-food-carriers-govt-home/img_2.jpg",
      "https://res.cloudinary.com/woo94xq2/image/upload/v1783997214/dhara_foundations/activities/meal-food-carriers-govt-home/img_3.jpg",
    ],
    description: [
      "Providing nutritious meals and food carriers to the children of Annai Sathiya District Government Home as part of a social welfare and community support initiative. This activity aims to support the health, well-being, and daily nutritional needs of the children residing in the government home by ensuring the availability of safe, hygienic, and wholesome food.",
      "As part of the initiative, quality food carriers and serving containers were distributed to facilitate proper storage, transportation, and serving of meals in a clean and organized manner. The program reflects a commitment to child welfare, social responsibility, and compassionate community service, while also promoting dignity, care, and better living conditions for the children under government care.",
      "The initiative was carried out with the objective of creating a positive impact on the lives of the children by extending support towards their basic needs and encouraging a healthier and more secure living environment.",
    ],
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
    coverImage: "https://res.cloudinary.com/woo94xq2/image/upload/v1783997218/dhara_foundations/activities/covid-19-relief/img_1.jpg",
    galleryImages: [
      "https://res.cloudinary.com/woo94xq2/image/upload/v1783997218/dhara_foundations/activities/covid-19-relief/img_1.jpg",
      "https://res.cloudinary.com/woo94xq2/image/upload/v1783997219/dhara_foundations/activities/covid-19-relief/img_2.jpg",
    ],
    description: [
      "COVID-19 Relief activities were carried out as part of a humanitarian and community welfare initiative to support poor and economically affected families during the coronavirus pandemic and lockdown period. The initiative focused on providing essential food items such as rice, vegetables, groceries, and other daily necessities to needy people who faced financial difficulties and food shortages during the crisis.",
      "Special efforts were taken to identify vulnerable families, elderly people, daily wage workers, and underprivileged communities who were severely impacted by the pandemic. Through the distribution of relief materials and essential supplies, the program aimed to reduce hardship and ensure that basic needs were met during challenging times.",
      "The COVID-19 relief initiative reflected compassion, social responsibility, and commitment towards public welfare by extending timely support to affected communities. It also promoted unity, care, and humanitarian service during a period of global health emergency and uncertainty.",
    ],
  },
];

export function getEventBySlugOrId(idOrSlug: string): Event | undefined {
  return EVENTS_DATA.find((e) => e.id === idOrSlug || e.numericId === idOrSlug);
}

export function getCleanEventImage(text?: string, fallbackImg?: string): string {
  if (fallbackImg && fallbackImg !== "/images/banner.png" && fallbackImg !== "/images/event-1.png") {
    return fallbackImg;
  }
  if (!text) return fallbackImg || "/images/event-1.png";
  const lower = text.toLowerCase();
  if (lower.includes("digitisation") || lower.includes("shg")) return "https://res.cloudinary.com/woo94xq2/image/upload/v1783997177/dhara_foundations/activities/digitisation-activities-wshg/img_1.jpg";
  if (lower.includes("raghavendra") || lower.includes("bhoomi pooja")) return "/images/events/raghavendra-bhoomi-pooja.jpg";
  if (lower.includes("girivalam") || lower.includes("masi pournami")) return "/images/events/masi-pournami-girivalam.jpg";
  if (lower.includes("kodai") || lower.includes("devotional offering")) return "/images/events/devotional-offering-kodai.jpg";
  if (lower.includes("kumbabhishekam") || lower.includes("brindavana")) return "/images/events/brindavana-kumbabhishekam.jpg";
  if (lower.includes("adheenam") || lower.includes("madurai adheenam")) return "/images/events/madurai-adheenam.jpg";
  if (lower.includes("javadhu") || lower.includes("tribal")) return "https://res.cloudinary.com/woo94xq2/image/upload/v1783997186/dhara_foundations/activities/tribal-welfare-javadhu-hills/img_1.jpg";
  if (lower.includes("diwali") || lower.includes("dresses")) return "https://res.cloudinary.com/woo94xq2/image/upload/v1783997194/dhara_foundations/activities/diwali-dresses-home-children/img_1.jpg";
  if (lower.includes("footwear") || lower.includes("annai sathiya") || lower.includes("girl children")) return "https://res.cloudinary.com/woo94xq2/image/upload/v1783997199/dhara_foundations/activities/footwear-girl-children-annai-sathiya/img_1.jpg";
  if (lower.includes("pongal") || lower.includes("sports")) return "https://res.cloudinary.com/woo94xq2/image/upload/v1783997207/dhara_foundations/activities/felicitation-sports-children-pongal/img_1.jpg";
  if (lower.includes("meal") || lower.includes("carriers") || lower.includes("food")) return "https://res.cloudinary.com/woo94xq2/image/upload/v1783997211/dhara_foundations/activities/meal-food-carriers-govt-home/img_1.jpg";
  if (lower.includes("covid") || lower.includes("relief")) return "https://res.cloudinary.com/woo94xq2/image/upload/v1783997218/dhara_foundations/activities/covid-19-relief/img_1.jpg";
  if (lower.includes("2025")) return "/Event images/18.jpg";
  if (lower.includes("divine") || lower.includes("award") || lower.includes("2026")) return "/Event images/05.jpg";
  return fallbackImg || "/images/event-1.png";
}

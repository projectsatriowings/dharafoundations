import sql from "@/lib/db";

export interface Founder {
  id: number | string;
  full_name: string;
  designation: string;
  short_bio: string;
  full_bio: string;
  photo_url: string;
  display_order?: number;
}

const DEFAULT_FOUNDERS: Founder[] = [
  {
    id: "1",
    full_name: "S. Vinoth Ragavendran",
    designation: "Engineering Entrepreneur & Social Contributor",
    short_bio: "Preserving our spiritual heritage is not just about the past; it's about building a foundation of values for the future generations.",
    full_bio: "Hailing from Cuddalore, he holds a Master's degree in Engineering from Anna University. With over two decades of experience in the construction industry. He has been actively involved in temple protection initiatives, legal advocacy, and efforts towards preserving spiritual and cultural heritage.",
    photo_url: "/images/about.png",
  },
  {
    id: "2",
    full_name: "P. Ezhumalai",
    designation: "Agriculturist & Social Worker",
    short_bio: "True service begins when we connect deeply with our roots and uplift those around us with renewed purpose.",
    full_bio: "A dedicated agriculturist and dairy farmer, he has been active in public life since childhood. His deep devotion to Hindu values and continue his service with renewed purpose.",
    photo_url: "/images/event-1.png",
  },
  {
    id: "3",
    full_name: "S. Srividhya",
    designation: "Chartered Accountant & Company Secretary",
    short_bio: "Commitment to ethics and precision is the bedrock of responsible service and lasting community impact.",
    full_bio: "A dual-qualified professional, she brings expertise as both a Chartered Accountant and Company Secretary. Her commitment to ethics and precision reflects a deep dedication to professional excellence and responsible service.",
    photo_url: "/images/news.png",
  },
];

export async function getPublicFounders(): Promise<Founder[]> {
  try {
    const rows = await sql`
      SELECT id, full_name, designation, short_bio, full_bio, photo_url, display_order
      FROM founders
      ORDER BY display_order ASC, created_at ASC
    `;
    if (rows && rows.length > 0) {
      return rows as Founder[];
    }
  } catch (err) {
    console.warn("DB offline or founders error, using fallback:", err);
  }
  return DEFAULT_FOUNDERS;
}

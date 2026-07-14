import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export const DEFAULT_FLAGSHIP_CONFIG = {
  hero: {
    badge: "Annual Flagship Ceremony",
    title: "Dhara Divine Awards",
    description: "Our flagship national celebration honoring grassroots Sanatana Dharma champions, unheralded traditional artists, temple caretakers, and selflessly dedicated volunteers.",
    button_text: "Explore Awards Spotlight",
    image_url: "/images/hero-devi.png",
    stats_badge_title: "25+ Events",
    stats_badge_sub: "Conducted across Tamil Nadu communities"
  },
  spotlight: {
    badge: "Annual Flagship Ceremony",
    location: "Chetpet, Chennai",
    title: "Dhara Divine Awards",
    description: "Over 500 distinguished guests, CSR leaders, retired high court judges, spiritual leaders, and grassroots service champions assemble for an extraordinary celebration of honor, cultural tribute, and community upliftment.",
    button_text: "Explore Divine Awards Portal",
    portal_url: "https://dhara-divine-awards-2025.vercel.app/"
  },
  ceremony: {
    badge: "COMPLETE CEREMONY • EXCLUSIVE COVERAGE",
    title: "Experience the Dhara Divine Awards Ceremony",
    description: "Relive the full 4-hour live national ceremony from Chetpet, Chennai — featuring keynote addresses, soul-stirring cultural tributes, and the historic honoring of grassroots Sanatana Dharma champions.",
    duration: "4 Hours",
    location: "Chetpet, Chennai",
    card_title: "Visit the Divine Awards Portal",
    card_desc: "Explore awardees, ceremony highlights, photo galleries, and the complete 4-hour broadcast",
    portal_url: "https://dhara-divine-awards-2025.vercel.app/",
    image_url: "/images/hero-devi.png",
    milestones: [
      {
        title: "Vedic Invocation & Deepa Pragatya",
        description: "Sacred Vedic mantras, traditional lamp lighting ceremony, and divine blessings from spiritual dignitaries."
      },
      {
        title: "Founder's Keynote & Vision",
        description: "Inspiring address highlighting our mission to protect temple heritage and uplift rural welfare across Tamil Nadu."
      },
      {
        title: "Traditional Cultural Tributes",
        description: "Classical dance, devotional music, and authentic folk art performances by renowned traditional artists."
      },
      {
        title: "Seva Ratna Awards Conferral",
        description: "The defining moment honoring 25+ unheralded grassroots champions before 500+ distinguished guests."
      }
    ]
  },
  why_matter: {
    heading: "Why Dhara Divine Awards Matter",
    subheading: "We approach the prestigious Dhara Divine Awards not as a momentary ceremony, but as a national movement recognizing our unsung grassroots custodians and spiritual protectors.",
    features: [
      {
        title: "1. Honoring Unsung Custodians",
        description: "Recognizing grassroots protectors, traditional temple priests, and Vedic scholars whose lifelong devotion preserves our sacred heritage in remote corners of Bharat."
      },
      {
        title: "2. Empowering Artisan Communities",
        description: "Celebrating traditional craftsmen, sculptors, and heritage revivalists by bringing national visibility and tangible support to their sacred livelihoods."
      },
      {
        title: "3. Rigorous & Transparent Selection",
        description: "An uncompromised, merit-based selection process honoring genuine cultural elevation across rural hamlets and historic temple ecosystems."
      },
      {
        title: "4. National Inspiration & Legacy",
        description: "Inspiring future generations to take pride in Sanatana Dharma by celebrating extraordinary lives of selflessness, Dharma preservation, and community leadership."
      }
    ]
  },
  stats_bar: {
    heading: "Creating Real Impact Across Communities",
    subheading: "Verifiable milestones in service & cultural revival",
    items: [
      { target: 2024, staticText: "", label: "Year Founded & Trust Registered" },
      { target: 4, staticText: "", label: "Core Sectors Served" },
      { target: null, staticText: "25+", label: "Events & Welfare Drives" },
      { target: null, staticText: "10,000+", label: "Beneficiaries Reached" }
    ]
  },
  testimonials_section: {
    heading: "Voices From the Community",
    subheading: "Listen to the heartfelt experiences of village elders, volunteer coordinators, and temple trustees whose lives have been impacted by Dhara initiatives.",
    items: [
      {
        quote: "The footwear and school supplies distributed to our Javadhu Hills students brought immense joy. Dhara Foundations serves with genuine devotion.",
        name: "K. Ramachandran",
        role: "Headmaster, Tribal School",
        initials: "KR"
      },
      {
        quote: "During our ancient temple Kumbabhishekam, Dhara volunteers stood by us with flawless organization and Anna Daanam support. Truly blessed work!",
        name: "Sivakumar Sastry",
        role: "Temple Trustee, Kanchipuram",
        initials: "SS"
      },
      {
        quote: "Volunteering at the Dhara Divine Awards showed me how deeply they care for unheralded traditional artists. It is an honor to be part of this mission.",
        name: "Anitha Lakshmi",
        role: "Youth Volunteer Coordinator",
        initials: "AL"
      }
    ]
  }
};

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await sql`
      CREATE TABLE IF NOT EXISTS flagship_page_config (
        id INT PRIMARY KEY,
        config JSONB NOT NULL,
        updated_at TIMESTAMP
      )
    `;

    const rows = await sql`SELECT config FROM flagship_page_config WHERE id = 1`;
    if (rows && rows.length > 0) {
      // Merge with default to ensure no missing keys if schema evolved
      const stored = rows[0].config;
      return NextResponse.json({ config: { ...DEFAULT_FLAGSHIP_CONFIG, ...stored } });
    }

    // Insert default if not present
    await sql`
      INSERT INTO flagship_page_config (id, config, updated_at)
      VALUES (1, ${JSON.stringify(DEFAULT_FLAGSHIP_CONFIG)}::jsonb, NOW())
      ON CONFLICT (id) DO NOTHING
    `;

    return NextResponse.json({ config: DEFAULT_FLAGSHIP_CONFIG });
  } catch (err) {
    console.error("GET /api/admin/flagship-page error:", err);
    return NextResponse.json({ config: DEFAULT_FLAGSHIP_CONFIG });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { config } = await req.json();
    if (!config) {
      return NextResponse.json({ error: "Invalid configuration" }, { status: 400 });
    }

    await sql`
      CREATE TABLE IF NOT EXISTS flagship_page_config (
        id INT PRIMARY KEY,
        config JSONB NOT NULL,
        updated_at TIMESTAMP
      )
    `;

    await sql`
      INSERT INTO flagship_page_config (id, config, updated_at)
      VALUES (1, ${JSON.stringify(config)}::jsonb, NOW())
      ON CONFLICT (id) DO UPDATE SET config = ${JSON.stringify(config)}::jsonb, updated_at = NOW()
    `;

    return NextResponse.json({ success: true, config });
  } catch (err: any) {
    console.error("PUT /api/admin/flagship-page error:", err);
    return NextResponse.json({ error: err.message || "Failed to update flagship configuration" }, { status: 500 });
  }
}

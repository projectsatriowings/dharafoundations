import { NextResponse } from "next/server";
import sql from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    let founders = await sql`SELECT * FROM founders ORDER BY display_order ASC, created_at ASC`;
    if (founders.length === 0) {
      await sql`
        INSERT INTO founders (full_name, designation, short_bio, full_bio, photo_url, display_order)
        VALUES 
        (
          'S. Vinoth Ragavendran',
          'Engineering Entrepreneur & Social Contributor',
          'Preserving our spiritual heritage is not just about the past; it''s about building a foundation of values for the future generations.',
          'Hailing from Cuddalore, he holds a Master''s degree in Engineering from Anna University. With over two decades of experience in the construction industry. He has been actively involved in temple protection initiatives, legal advocacy, and efforts towards preserving spiritual and cultural heritage.',
          '/images/about.png',
          1
        ),
        (
          'P. Ezhumalai',
          'Agriculturist & Social Worker',
          'True service begins when we connect deeply with our roots and uplift those around us with renewed purpose.',
          'A dedicated agriculturist and dairy farmer, he has been active in public life since childhood. His deep devotion to Hindu values and continue his service with renewed purpose.',
          '/images/event-1.png',
          2
        ),
        (
          'S. Srividhya',
          'Chartered Accountant & Company Secretary',
          'Commitment to ethics and precision is the bedrock of responsible service and lasting community impact.',
          'A dual-qualified professional, she brings expertise as both a Chartered Accountant and Company Secretary. Her commitment to ethics and precision reflects a deep dedication to professional excellence and responsible service.',
          '/images/news.png',
          3
        )
      `;
      founders = await sql`SELECT * FROM founders ORDER BY display_order ASC, created_at ASC`;
    }

    return NextResponse.json({ founders });
  } catch (err) {
    console.error("GET /api/public/founders error:", err);
    return NextResponse.json({ error: "Failed to fetch founders" }, { status: 500 });
  }
}

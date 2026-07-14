import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pillar = searchParams.get("pillar");

    let highlights: any[] = [];
    try {
      highlights = await sql`
        SELECT id, pillar, badge, title, description, image_url, link_url, sort_order
        FROM seva_highlights
        WHERE (${!pillar || pillar === "all"}::boolean OR pillar = ${pillar})
        ORDER BY sort_order ASC, id ASC
      `;
    } catch (dbErr) {
      try {
        highlights = await sql`
          SELECT id, pillar, badge, title, description, image_url, link_url
          FROM seva_highlights
          WHERE (${!pillar || pillar === "all"}::boolean OR pillar = ${pillar})
          ORDER BY id ASC
        `;
      } catch (fallbackErr) {
        highlights = [];
      }
    }

    return NextResponse.json({ highlights });
  } catch (err) {
    console.error("GET /api/public/highlights outer error:", err);
    return NextResponse.json({ highlights: [] });
  }
}

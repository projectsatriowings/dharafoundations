import { NextResponse } from "next/server";
import sql from "@/lib/db";

export async function GET() {
  try {
    const programs = await sql`
      SELECT * FROM programs WHERE status = 'published' OR status IS NULL ORDER BY display_order ASC, created_at DESC
    `;
    return NextResponse.json({ programs });
  } catch (err) {
    console.error("GET /api/public/programs error:", err);
    return NextResponse.json({ error: "Failed to fetch public programs" }, { status: 500 });
  }
}

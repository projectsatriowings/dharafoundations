import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { DEFAULT_FLAGSHIP_CONFIG } from "@/app/api/admin/flagship-page/route";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS flagship_page_config (
        id INT PRIMARY KEY,
        config JSONB NOT NULL,
        updated_at TIMESTAMP
      )
    `;

    const rows = await sql`SELECT config FROM flagship_page_config WHERE id = 1`;
    if (rows && rows.length > 0 && rows[0].config) {
      return NextResponse.json({ config: { ...DEFAULT_FLAGSHIP_CONFIG, ...rows[0].config } });
    }

    return NextResponse.json({ config: DEFAULT_FLAGSHIP_CONFIG });
  } catch (err) {
    console.warn("GET /api/public/flagship-page DB error, returning default config:", err);
    return NextResponse.json({ config: DEFAULT_FLAGSHIP_CONFIG });
  }
}

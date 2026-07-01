import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const [settings] = await sql`SELECT * FROM site_settings WHERE id = 1`;
    return NextResponse.json({ settings });
  } catch (err) {
    console.error("GET /api/admin/settings error:", err);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const {
      phone,
      email_info,
      email_president,
      email_trustee,
      email_general,
      address,
      twitter_url,
      facebook_url,
      instagram_url,
      youtube_url,
      meta_title_suffix,
      default_meta_desc,
      maintenance_mode = false,
    } = body;

    const [updated] = await sql`
      UPDATE site_settings SET
        phone = COALESCE(${phone}, phone),
        email_info = COALESCE(${email_info}, email_info),
        email_president = COALESCE(${email_president}, email_president),
        email_trustee = COALESCE(${email_trustee}, email_trustee),
        email_general = COALESCE(${email_general}, email_general),
        address = COALESCE(${address}, address),
        twitter_url = ${twitter_url || null},
        facebook_url = ${facebook_url || null},
        instagram_url = ${instagram_url || null},
        youtube_url = ${youtube_url || null},
        meta_title_suffix = COALESCE(${meta_title_suffix}, meta_title_suffix),
        default_meta_desc = COALESCE(${default_meta_desc}, default_meta_desc),
        maintenance_mode = ${maintenance_mode}
      WHERE id = 1
      RETURNING *
    `;

    await sql`
      INSERT INTO activity_log (action, entity_type, entity_title)
      VALUES ('Updated global', 'Site Settings', 'Contact & Social Links')
    `;

    return NextResponse.json({ settings: updated });
  } catch (err) {
    console.error("PUT /api/admin/settings error:", err);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}

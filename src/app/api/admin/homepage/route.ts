import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const stats = await sql`SELECT * FROM homepage_stats ORDER BY sort_order ASC`;
    return NextResponse.json({ stats });
  } catch (err) {
    console.error("GET /api/admin/homepage error:", err);
    return NextResponse.json({ error: "Failed to fetch homepage stats" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { stats } = await req.json();
    if (Array.isArray(stats)) {
      for (const st of stats) {
        if (st.id) {
          await sql`
            UPDATE homepage_stats SET
              stat_value = ${st.stat_value},
              stat_label = ${st.stat_label},
              sort_order = ${st.sort_order}
            WHERE id = ${st.id}
          `;
        } else {
          await sql`
            INSERT INTO homepage_stats (stat_value, stat_label, sort_order)
            VALUES (${st.stat_value}, ${st.stat_label}, ${st.sort_order})
          `;
        }
      }
    }

    await sql`
      INSERT INTO activity_log (action, entity_type, entity_title)
      VALUES ('Updated', 'Homepage Content', 'Impact Statistics & Counters')
    `;

    const updated = await sql`SELECT * FROM homepage_stats ORDER BY sort_order ASC`;
    return NextResponse.json({ stats: updated });
  } catch (err) {
    console.error("PUT /api/admin/homepage error:", err);
    return NextResponse.json({ error: "Failed to update homepage stats" }, { status: 500 });
  }
}

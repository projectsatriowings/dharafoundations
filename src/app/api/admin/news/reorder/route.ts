import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { orderedIds } = body;

    if (!Array.isArray(orderedIds)) {
      return NextResponse.json({ error: "Invalid orderedIds array" }, { status: 400 });
    }

    // Assign priorities in descending order based on the array position
    // The first item gets the highest priority (orderedIds.length), the last gets 1.
    const updates = orderedIds.map((id, index) => {
      const priority = orderedIds.length - index;
      return sql`UPDATE news_articles SET priority = ${priority} WHERE id = ${id}`;
    });

    await Promise.all(updates);

    return NextResponse.json({ success: true, message: "Priorities updated successfully" });
  } catch (err) {
    console.error("POST /api/admin/news/reorder error:", err);
    return NextResponse.json({ error: "Failed to reorder news articles" }, { status: 500 });
  }
}

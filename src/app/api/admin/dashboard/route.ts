import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Single efficient query to get all summary counts
    const [counts] = await sql`
      SELECT
        (SELECT COUNT(*) FROM events WHERE status = 'published') AS total_events,
        (SELECT COUNT(*) FROM news_articles WHERE status = 'published') AS total_news,
        (SELECT COUNT(*) FROM gallery_photos) AS total_gallery,
        (SELECT COUNT(*) FROM contact_submissions WHERE status = 'new') AS unread_contact,
        (SELECT COUNT(*) FROM event_registrations WHERE status = 'new') AS unread_registrations,
        (SELECT COUNT(*) FROM sponsor_enquiries WHERE status = 'new') AS unread_sponsors
    `;

    // Fetch recent activity feed (last 5 created/updated items across events, news, etc.)
    const recentEvents = await sql`
      SELECT id, title AS name, 'Event' AS type, updated_at AS timestamp
      FROM events
      ORDER BY updated_at DESC
      LIMIT 5
    `;

    return NextResponse.json({
      counts: {
        totalEvents: Number(counts.total_events || 0),
        totalNews: Number(counts.total_news || 0),
        totalGallery: Number(counts.total_gallery || 0),
        unreadContact: Number(counts.unread_contact || 0),
        unreadRegistrations: Number(counts.unread_registrations || 0),
        unreadSponsors: Number(counts.unread_sponsors || 0),
      },
      recentActivity: recentEvents,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

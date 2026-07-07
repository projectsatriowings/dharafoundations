import { NextResponse } from "next/server";
import sql from "@/lib/db";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Single efficient query to get all summary counts
    const [counts] = await sql`
      SELECT
        (SELECT COUNT(*) FROM events) AS total_events,
        (SELECT COUNT(*) FROM news_articles) AS total_news,
        (SELECT COUNT(*) FROM gallery_photos) AS total_gallery,
        (SELECT COUNT(*) FROM contact_submissions WHERE status = 'new') AS unread_contact,
        (SELECT COUNT(*) FROM event_registrations WHERE status = 'new') AS unread_registrations,
        (SELECT COUNT(*) FROM sponsor_enquiries WHERE status = 'new') AS unread_sponsors
    `;

    const [evs, news, gals, conts, regs, spons, logs] = await Promise.all([
      sql`SELECT id, title, status, updated_at AS time, 'event' AS type, 'Event updated / created' AS action, '/admin/events/' || id || '/edit' AS href FROM events ORDER BY updated_at DESC LIMIT 5`,
      sql`SELECT id, headline AS title, status, updated_at AS time, 'news' AS type, 'News article published / updated' AS action, '/admin/news/' || id || '/edit' AS href FROM news_articles ORDER BY updated_at DESC LIMIT 5`,
      sql`SELECT id, caption AS title, category AS status, created_at AS time, 'gallery' AS type, 'Gallery photo uploaded' AS action, '/admin/gallery' AS href FROM gallery_photos ORDER BY created_at DESC LIMIT 5`,
      sql`SELECT id, full_name || ' — ' || subject AS title, status, submitted_at AS time, 'contact' AS type, 'Contact message received' AS action, '/admin/submissions' AS href FROM contact_submissions ORDER BY submitted_at DESC LIMIT 5`,
      sql`SELECT id, full_name || ' (' || event_name || ')' AS title, status, submitted_at AS time, 'registration' AS type, 'Event registration submitted' AS action, '/admin/submissions' AS href FROM event_registrations ORDER BY submitted_at DESC LIMIT 5`,
      sql`SELECT id, org_name || ' (' || email || ')' AS title, status, submitted_at AS time, 'sponsor' AS type, 'Sponsor enquiry submitted' AS action, '/admin/sponsorship' AS href FROM sponsor_enquiries ORDER BY submitted_at DESC LIMIT 5`,
      sql`SELECT id, entity_title AS title, '' AS status, created_at AS time, entity_type AS type, action, '/admin' AS href FROM activity_log ORDER BY created_at DESC LIMIT 5`,
    ]);

    const combined = [
      ...evs,
      ...news,
      ...gals,
      ...conts,
      ...regs,
      ...spons,
      ...logs,
    ].sort((a: any, b: any) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 10);

    return NextResponse.json({
      counts: {
        totalEvents: Number(counts?.total_events || 0),
        totalNews: Number(counts?.total_news || 0),
        totalGallery: Number(counts?.total_gallery || 0),
        unreadContact: Number(counts?.unread_contact || 0),
        unreadRegistrations: Number(counts?.unread_registrations || 0),
        unreadSponsors: Number(counts?.unread_sponsors || 0),
      },
      recentActivity: combined,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

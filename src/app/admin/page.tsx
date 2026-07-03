import React from "react";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import sql from "@/lib/db";
import {
  Calendar,
  Newspaper,
  ImageIcon,
  MessageSquare,
  UserCheck,
  Handshake,
  PlusCircle,
  Upload,
  ArrowRight,
  Clock,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getSession();

  // Fetch summary counts (with offline fallback)
  let counts: Record<string, string | number> = {
    total_events: "0",
    total_news: "0",
    total_gallery: "0",
    unread_contact: "0",
    unread_registrations: "0",
    unread_sponsors: "0",
  };
  let recentEvents: Array<{ id: number; title: string; status: string; updated_at: string }> = [];

  try {
    const [dbCounts] = await sql`
      SELECT
        (SELECT COUNT(*) FROM events WHERE status = 'published') AS total_events,
        (SELECT COUNT(*) FROM news_articles WHERE status = 'published') AS total_news,
        (SELECT COUNT(*) FROM gallery_photos) AS total_gallery,
        (SELECT COUNT(*) FROM contact_submissions WHERE status = 'new') AS unread_contact,
        (SELECT COUNT(*) FROM event_registrations WHERE status = 'new') AS unread_registrations,
        (SELECT COUNT(*) FROM sponsor_enquiries WHERE status = 'new') AS unread_sponsors
    `;
    if (dbCounts) counts = dbCounts;

    const dbRecent = await sql`
      SELECT id, title, status, updated_at
      FROM events
      ORDER BY updated_at DESC
      LIMIT 5
    `;
    recentEvents = dbRecent as typeof recentEvents;
  } catch (err) {
    console.warn("Admin dashboard DB offline, showing placeholder stats:", err);
  }

  const stats = [
    {
      title: "Total Published Events",
      value: counts?.total_events || "0",
      icon: Calendar,
      color: "bg-amber-500/10 text-amber-600",
      href: "/admin/events",
    },
    {
      title: "Total News Articles",
      value: counts?.total_news || "0",
      icon: Newspaper,
      color: "bg-blue-500/10 text-blue-600",
      href: "/admin/news",
    },
    {
      title: "Gallery Photos",
      value: counts?.total_gallery || "0",
      icon: ImageIcon,
      color: "bg-purple-500/10 text-purple-600",
      href: "/admin/gallery",
    },
    {
      title: "Unread Contact Messages",
      value: counts?.unread_contact || "0",
      badge: Number(counts?.unread_contact) > 0,
      icon: MessageSquare,
      color: "bg-emerald-500/10 text-emerald-600",
      href: "/admin/submissions",
    },
    {
      title: "Unread Event Registrations",
      value: counts?.unread_registrations || "0",
      badge: Number(counts?.unread_registrations) > 0,
      icon: UserCheck,
      color: "bg-indigo-500/10 text-indigo-600",
      href: "/admin/submissions",
    },
    {
      title: "Unread Sponsor Enquiries",
      value: counts?.unread_sponsors || "0",
      badge: Number(counts?.unread_sponsors) > 0,
      icon: Handshake,
      color: "bg-rose-500/10 text-rose-600",
      href: "/admin/submissions",
    },
  ];

  return (
    <div className="min-h-screen flex bg-[#fbf9f4]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar email={session?.email || "Admin"} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage website content, monitor submissions, and review recent activity.
            </p>
          </div>

          {/* Summary Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Link
                  key={stat.title}
                  href={stat.href}
                  className="bg-white rounded-xl border border-gray-200 p-5 hover:border-[#8a5000] hover:shadow-md transition-all group relative overflow-hidden"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                        {stat.title}
                      </div>
                      <div className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        {stat.value}
                        {stat.badge && (
                          <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full animate-pulse">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl ${stat.color}`}>
                      <Icon size={22} />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-[#8a5000] group-hover:translate-x-1 transition-transform">
                    <span>Manage</span>
                    <ArrowRight size={14} />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-base font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  href="/admin/events/new"
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-[#8a5000] hover:bg-[#6e4000] text-white font-medium text-sm shadow-sm transition-colors"
                >
                  <PlusCircle size={18} />
                  <span>Add New Event</span>
                </Link>
                <Link
                  href="/admin/news/new"
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium text-sm transition-colors"
                >
                  <PlusCircle size={18} className="text-gray-600" />
                  <span>Add News Article</span>
                </Link>
                <Link
                  href="/admin/gallery"
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium text-sm transition-colors"
                >
                  <Upload size={18} className="text-gray-600" />
                  <span>Upload Gallery Photos</span>
                </Link>
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-gray-900">Recent Activity</h2>
                <span className="text-xs text-gray-400">Live Database</span>
              </div>

              {recentEvents.length === 0 ? (
                <div className="text-center py-8 text-sm text-gray-400">
                  No recent activity logged.
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {recentEvents.map((item) => (
                    <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 truncate">
                            {item.title}
                          </span>
                          <span
                            className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded ${
                              item.status === "published"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                          <Clock size={12} />
                          <span>Event updated</span>
                        </div>
                      </div>
                      <Link
                        href={`/admin/events/${item.id}/edit`}
                        className="text-xs font-medium text-[#8a5000] hover:underline shrink-0"
                      >
                        Edit
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { ViewItemModal } from "@/components/admin/ViewItemModal";
import {
  PlusCircle,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

interface EventItem {
  id: string;
  slug: string;
  title: string;
  event_date: string;
  event_time: string;
  location_name: string;
  cover_image_url: string;
  status: "draft" | "published";
  category?: string;
  updated_at: string;
}

export default function AdminEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Delete & View modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [viewModalEvent, setViewModalEvent] = useState<any | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (yearFilter !== "all") params.set("year", yearFilter);
      if (search.trim()) params.set("search", search.trim());
      params.set("page", page.toString());
      params.set("limit", "10");

      const res = await fetch(`/api/admin/events?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(data.events || []);
      setTotalPages(data.pagination?.totalPages || 1);
      setTotalItems(data.pagination?.total || 0);
    } catch (err) {
      console.error("Fetch events error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [statusFilter, yearFilter, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchEvents();
  };

  const handleDeleteConfirm = async () => {
    if (!selectedEvent) return;
    const res = await fetch(`/api/admin/events/${selectedEvent.id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      fetchEvents();
    } else {
      alert("Failed to delete event.");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#fbf9f4]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar email="Admin" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Events Management</h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Manage, edit, and publish events for the public website. ({totalItems} total)
              </p>
            </div>
            <Link
              href="/admin/events/new"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#8a5000] hover:bg-[#6e4000] text-white font-semibold text-sm shadow-sm transition-colors shrink-0"
            >
              <PlusCircle size={18} />
              <span>Add New Event</span>
            </Link>
          </div>

          {/* Filter & Search Bar */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
            <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events by title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 bg-[#fbf9f4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8a5000]/20 focus:border-[#8a5000] transition-colors"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="px-3.5 py-2 text-sm rounded-lg border border-gray-200 bg-[#fbf9f4] focus:bg-white focus:outline-none focus:border-[#8a5000]"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>

              {/* Year Filter */}
              <select
                value={yearFilter}
                onChange={(e) => {
                  setYearFilter(e.target.value);
                  setPage(1);
                }}
                className="px-3.5 py-2 text-sm rounded-lg border border-gray-200 bg-[#fbf9f4] focus:bg-white focus:outline-none focus:border-[#8a5000]"
              >
                <option value="all">All Years</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
              </select>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors shrink-0"
              >
                Filter
              </button>
            </form>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 text-[#8a5000]">
                <Loader2 size={32} className="animate-spin mb-3" />
                <span className="text-sm font-medium">Loading events...</span>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-16 px-4">
                <p className="text-base font-semibold text-gray-800">No events found</p>
                <p className="text-sm text-gray-500 mt-1 mb-4">
                  Try adjusting your search or filters, or create a new event.
                </p>
                <Link
                  href="/admin/events/new"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8a5000] text-white text-xs font-semibold"
                >
                  <PlusCircle size={15} />
                  Add New Event
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#fbf9f4] border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Cover</th>
                      <th className="py-3 px-4">Title & Category</th>
                      <th className="py-3 px-4">Date & Time</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {events.map((ev) => (
                      <tr key={ev.id} className="hover:bg-[#fbf9f4]/70 transition-colors">
                        {/* Cover image */}
                        <td className="py-3 px-4 w-16">
                          <div className="w-12 h-10 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                            <img
                              src={ev.cover_image_url}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </td>

                        {/* Title */}
                        <td className="py-3 px-4 max-w-xs">
                          <div className="font-semibold text-gray-900 truncate">
                            {ev.title}
                          </div>
                          {ev.category && (
                            <div className="text-xs text-gray-400 mt-0.5">
                              {ev.category}
                            </div>
                          )}
                        </td>

                        {/* Date */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1.5 text-gray-700">
                            <Calendar size={14} className="text-gray-400" />
                            <span>{ev.event_date}</span>
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">{ev.event_time}</div>
                        </td>

                        {/* Location */}
                        <td className="py-3 px-4 max-w-[180px]">
                          <div className="flex items-center gap-1.5 text-gray-600 truncate">
                            <MapPin size={14} className="text-gray-400 shrink-0" />
                            <span className="truncate">{ev.location_name}</span>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                              ev.status === "published"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {ev.status === "published" ? "Published" : "Draft"}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            {/* Preview inside Admin Portal */}
                            <button
                              onClick={() => setViewModalEvent(ev)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                              title="Preview Details"
                            >
                              <Eye size={16} />
                            </button>

                            {/* Edit */}
                            <Link
                              href={`/admin/events/${ev.id}/edit`}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-[#8a5000] hover:bg-gray-100 transition-colors"
                              title="Edit Event"
                            >
                              <Edit size={16} />
                            </Link>

                            {/* Delete */}
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedEvent(ev);
                                setDeleteModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Delete Event"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination Bar */}
            {totalPages > 1 && (
              <div className="bg-[#fbf9f4] border-t border-gray-200 px-4 py-3 flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  Page <span className="font-semibold text-gray-800">{page}</span> of{" "}
                  <span className="font-semibold text-gray-800">{totalPages}</span>
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-1.5 rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-1.5 rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={selectedEvent?.title || ""}
        entityName="event"
      />

      {/* View Item Modal inside Admin Portal */}
      <ViewItemModal
        isOpen={!!viewModalEvent}
        onClose={() => setViewModalEvent(null)}
        title={viewModalEvent?.title || ""}
        subtitle={viewModalEvent?.category || "Event"}
        status={viewModalEvent?.status}
        imageUrl={viewModalEvent?.cover_image_url}
        fields={[
          { label: "Event Date", value: viewModalEvent?.event_date },
          { label: "Time", value: viewModalEvent?.event_time },
          { label: "Location", value: viewModalEvent?.location_name },
        ]}
        bodyText={(viewModalEvent as any)?.description || "Click Edit Item below to view or modify complete event description and gallery."}
        editHref={viewModalEvent ? `/admin/events/${viewModalEvent.id}/edit` : undefined}
      />
    </div>
  );
}

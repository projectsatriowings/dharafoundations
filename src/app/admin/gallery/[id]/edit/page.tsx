"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { EventForm, type EventFormData } from "@/components/admin/EventForm";
import { Loader2, ArrowLeft } from "lucide-react";

export default function EditSevaActivityPage() {
  const params = useParams();
  const id = params?.id as string;
  const [eventData, setEventData] = useState<EventFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/admin/events/${id}`);
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Error ${res.status}: Failed to load seva activity`);
        }
        const data = await res.json();
        setEventData(data.event);
      } catch (err: any) {
        setError(err.message || "Failed to load seva activity");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  return (
    <div className="min-h-screen flex bg-[#fbf9f4]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar email="Admin" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <div className="mb-6">
            <Link
              href="/admin/gallery"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#8a5000] hover:text-[#5c3500] transition-colors mb-3"
            >
              <ArrowLeft size={16} />
              <span>Back to Sevas</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Edit Seva Activity Detail Page & Photo Chronicles</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Update the complete public Seva detail page, description paragraphs, pillar category, and attached photo gallery for this activity.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8a5000]">
              <Loader2 size={32} className="animate-spin mb-3" />
              <span className="text-sm font-medium">Loading seva activity data...</span>
            </div>
          ) : error || !eventData ? (
            <div className="text-center py-20 text-red-600 font-semibold">
              {error || "Seva activity not found."}
            </div>
          ) : (
            <EventForm initialData={eventData} isEdit={true} isSeva={true} />
          )}
        </main>
      </div>
    </div>
  );
}

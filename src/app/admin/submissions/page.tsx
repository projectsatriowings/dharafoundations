"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { Download, CheckCircle, Clock, Trash2, Mail, Calendar, User, Phone, Loader2 } from "lucide-react";

export default function AdminSubmissionsPage() {
  const [tab, setTab] = useState<"contact" | "registrations" | "sponsorship">("contact");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any | null>(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/submissions?tab=${tab}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [tab]);

  const updateStatus = async (id: string, newStatus: string) => {
    await fetch("/api/admin/submissions", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, type: tab, status: newStatus }),
    });
    fetchItems();
  };

  const requestDelete = (item: any) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    await fetch("/api/admin/submissions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: itemToDelete.id, type: tab }),
    });
    setDeleteModalOpen(false);
    setItemToDelete(null);
    fetchItems();
  };

  const exportCSV = () => {
    if (items.length === 0) return alert("No data to export.");
    const headers = Object.keys(items[0]).join(",") + "\n";
    const rows = items.map((obj) =>
      Object.values(obj).map((val) => `"${String(val ?? "").replace(/"/g, '""')}"`).join(",")
    ).join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `dhara_${tab}_submissions.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex bg-[#fbf9f4]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar email="Admin" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Form Submissions & Enquiries</h1>
              <p className="text-sm text-gray-500 mt-0.5">Review contact messages, event registrations, and corporate sponsor requests.</p>
            </div>
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-300 hover:bg-[#fbf9f4] text-gray-800 font-semibold text-sm shadow-sm transition-colors"
            >
              <Download size={16} />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="flex border-b border-gray-200 mb-6 gap-6">
            {[
              { id: "contact", label: "Contact Messages" },
              { id: "registrations", label: "Event Registrations" },
              { id: "sponsorship", label: "Sponsor Enquiries" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as any)}
                className={`pb-3 text-sm font-bold border-b-2 transition-colors ${
                  tab === t.id ? "border-[#8a5000] text-[#8a5000]" : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {loading ? (
              <div className="flex items-center justify-center py-16 text-[#8a5000]">
                <Loader2 size={32} className="animate-spin" />
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <p className="text-base font-semibold text-gray-800">No submissions found in this tab</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#fbf9f4] border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase">
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Sender Info</th>
                      <th className="py-3 px-4">Details</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-[#fbf9f4]/70">
                        <td className="py-4 px-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                          {new Date(item.submitted_at).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4 max-w-xs">
                          <div className="font-bold text-gray-900">{item.full_name || item.org_name}</div>
                          <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"><Mail size={12} /> {item.email}</div>
                          {item.phone && <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5"><Phone size={12} /> {item.phone}</div>}
                        </td>
                        <td className="py-4 px-4 max-w-md">
                          {tab === "contact" && (
                            <div>
                              <p className="font-semibold text-gray-800 text-xs">{item.subject}</p>
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.message}</p>
                            </div>
                          )}
                          {tab === "registrations" && (
                            <div>
                              <p className="font-semibold text-[#8a5000] text-xs">Event: {item.event_name}</p>
                              <p className="text-xs text-gray-600 mt-0.5">Attendees: <span className="font-bold">{item.attendee_count}</span></p>
                              {item.message && <p className="text-xs text-gray-500 mt-1 italic">"{item.message}"</p>}
                            </div>
                          )}
                          {tab === "sponsorship" && (
                            <div>
                              <p className="font-semibold text-[#8a5000] text-xs">Interested Tier: {item.tier_interest || "General Inquiry"}</p>
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.message}</p>
                            </div>
                          )}
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <select
                            value={item.status}
                            onChange={(e) => updateStatus(item.id, e.target.value)}
                            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-gray-100 border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                          >
                            <option value="new">New</option>
                            <option value="read">Reviewed / Read</option>
                            <option value="replied">Replied / Resolved</option>
                            {tab !== "contact" && <option value="confirmed">Confirmed</option>}
                            {tab !== "contact" && <option value="cancelled">Cancelled / Declined</option>}
                          </select>
                        </td>
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <button onClick={() => requestDelete(item)} className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
      <DeleteConfirmDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title={itemToDelete?.full_name || itemToDelete?.org_name || "this submission"}
        entityName={tab === "contact" ? "contact message" : tab === "registrations" ? "event registration" : "sponsor enquiry"}
      />
    </div>
  );
}

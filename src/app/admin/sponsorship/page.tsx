"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { PlusCircle, Edit, Trash2, Check, Star, Loader2, X } from "lucide-react";

export default function AdminSponsorshipPage() {
  const [tiers, setTiers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const [form, setForm] = useState({
    tier_name: "",
    price_label: "₹50,000 / Year",
    benefitsText: "Logo on banner\nSocial media feature\nCertificate of Seva",
    is_highlighted: false,
    sort_order: 0,
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedT, setSelectedT] = useState<any | null>(null);

  const fetchTiers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/sponsorship");
      if (res.ok) {
        const data = await res.json();
        setTiers(data.tiers || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTiers();
  }, []);

  const openAdd = () => {
    setIsEdit(false);
    setCurrentId(null);
    setForm({
      tier_name: "",
      price_label: "₹50,000 / Year",
      benefitsText: "Logo on event banners\nVIP seating at annual awards\nSpecial mention on website",
      is_highlighted: false,
      sort_order: tiers.length,
    });
    setModalOpen(true);
  };

  const openEdit = (t: any) => {
    setIsEdit(true);
    setCurrentId(t.id);
    setForm({
      tier_name: t.tier_name,
      price_label: t.price_label,
      benefitsText: (t.benefits || []).join("\n"),
      is_highlighted: t.is_highlighted || false,
      sort_order: t.sort_order || 0,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEdit ? `/api/admin/sponsorship/${currentId}` : `/api/admin/sponsorship`;
    const method = isEdit ? "PUT" : "POST";

    const benefits = form.benefitsText.split("\n").map((s) => s.trim()).filter(Boolean);

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tier_name: form.tier_name,
        price_label: form.price_label,
        benefits,
        is_highlighted: form.is_highlighted,
        sort_order: form.sort_order,
      }),
    });

    if (res.ok) {
      setModalOpen(false);
      fetchTiers();
    } else {
      alert("Failed to save sponsorship tier.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedT) return;
    await fetch(`/api/admin/sponsorship/${selectedT.id}`, { method: "DELETE" });
    fetchTiers();
  };

  return (
    <div className="min-h-screen flex bg-[#fbf9f4]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar email="Admin" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sponsorship Tiers</h1>
              <p className="text-sm text-gray-500 mt-0.5">Manage festival and corporate sponsorship levels.</p>
            </div>
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8a5000] hover:bg-[#6e4000] text-white font-semibold text-sm shadow-sm transition-colors"
            >
              <PlusCircle size={18} />
              <span>Add Tier</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm p-6">
            {loading ? (
              <div className="flex items-center justify-center py-16 text-[#8a5000]">
                <Loader2 size={32} className="animate-spin" />
              </div>
            ) : tiers.length === 0 ? (
              <div className="text-center py-16 px-4">
                <p className="text-base font-semibold text-gray-800">No sponsorship tiers configured</p>
                <button onClick={openAdd} className="mt-3 px-4 py-2 rounded-lg bg-[#8a5000] text-white text-xs font-semibold">Add Sponsorship Tier</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tiers.map((t) => (
                  <div key={t.id} className={`rounded-2xl border p-6 flex flex-col justify-between relative ${t.is_highlighted ? "border-[#8a5000] bg-[#8a5000]/5 shadow-md" : "border-gray-200 bg-white"}`}>
                    {t.is_highlighted && (
                      <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-[#8a5000] text-white text-[10px] font-bold uppercase tracking-wider">
                        Most Popular
                      </span>
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{t.tier_name}</h3>
                      <p className="text-2xl font-extrabold text-[#8a5000] mt-2">{t.price_label}</p>
                      <ul className="mt-6 space-y-2 text-xs text-gray-700">
                        {(t.benefits || []).map((b: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-end gap-2 pt-6 mt-6 border-t border-gray-100">
                      <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg bg-gray-100 text-gray-600 hover:text-[#8a5000]"><Edit size={16} /></button>
                      <button onClick={() => { setSelectedT(t); setDeleteModalOpen(true); }} className="p-1.5 rounded-lg bg-gray-100 text-gray-600 hover:text-red-600"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4 relative">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={18} /></button>
            <h3 className="text-lg font-bold text-gray-900">{isEdit ? "Edit Tier" : "Add Tier"}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Tier Name *</label>
                <input required type="text" placeholder="e.g. Dharma Patron" value={form.tier_name} onChange={(e) => setForm({ ...form, tier_name: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Price Label *</label>
                <input required type="text" placeholder="e.g. ₹1,00,000 / Year" value={form.price_label} onChange={(e) => setForm({ ...form, price_label: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Benefits (One per line) *</label>
                <textarea required rows={5} value={form.benefitsText} onChange={(e) => setForm({ ...form, benefitsText: e.target.value })} className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-gray-200" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.is_highlighted} onChange={(e) => setForm({ ...form, is_highlighted: e.target.checked })} className="w-4 h-4 text-[#8a5000] rounded" />
                <span className="text-xs font-medium text-gray-700">Highlight as Most Popular package</span>
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#8a5000] text-white">Save Package</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={selectedT?.tier_name || ""}
        entityName="sponsorship tier"
      />
    </div>
  );
}

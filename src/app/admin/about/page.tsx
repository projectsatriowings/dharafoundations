"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { PlusCircle, Edit, Trash2, Loader2, X } from "lucide-react";

export default function AdminAboutPage() {
  const [founders, setFounders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const [form, setForm] = useState({
    full_name: "",
    designation: "Founder & Managing Trustee",
    short_bio: "",
    full_bio: "",
    photo_url: "",
    display_order: 0,
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedF, setSelectedF] = useState<any | null>(null);

  const fetchFounders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/founders");
      if (res.ok) {
        const data = await res.json();
        setFounders(data.founders || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFounders();
  }, []);

  const openAdd = () => {
    setIsEdit(false);
    setCurrentId(null);
    setForm({
      full_name: "",
      designation: "Founder & Managing Trustee",
      short_bio: "",
      full_bio: "",
      photo_url: "",
      display_order: founders.length,
    });
    setModalOpen(true);
  };

  const openEdit = (f: any) => {
    setIsEdit(true);
    setCurrentId(f.id);
    setForm({
      full_name: f.full_name,
      designation: f.designation,
      short_bio: f.short_bio || "",
      full_bio: f.full_bio || "",
      photo_url: f.photo_url || "",
      display_order: f.display_order || 0,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEdit ? `/api/admin/founders/${currentId}` : `/api/admin/founders`;
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setModalOpen(false);
      fetchFounders();
    } else {
      alert("Failed to save founder profile.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedF) return;
    await fetch(`/api/admin/founders/${selectedF.id}`, { method: "DELETE" });
    fetchFounders();
  };

  return (
    <div className="min-h-screen flex bg-[#fbf9f4]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar email="Admin" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">About / Founders Management</h1>
              <p className="text-sm text-gray-500 mt-0.5">Manage leadership profiles, founder quotes, and board member bios.</p>
            </div>
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8a5000] hover:bg-[#6e4000] text-white font-semibold text-sm shadow-sm transition-colors"
            >
              <PlusCircle size={18} />
              <span>Add Profile</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {loading ? (
              <div className="flex items-center justify-center py-16 text-[#8a5000]">
                <Loader2 size={32} className="animate-spin" />
              </div>
            ) : founders.length === 0 ? (
              <div className="text-center py-16 px-4">
                <p className="text-base font-semibold text-gray-800">No founder profiles found</p>
                <button onClick={openAdd} className="mt-3 px-4 py-2 rounded-lg bg-[#8a5000] text-white text-xs font-semibold">Add Founder Profile</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {founders.map((f) => (
                  <div key={f.id} className="bg-[#fbf9f4] rounded-xl border border-gray-200 p-5 flex flex-col justify-between space-y-4">
                    <div className="flex items-start gap-4">
                      {f.photo_url ? (
                        <img src={f.photo_url} alt={f.full_name} className="w-16 h-16 rounded-full object-cover border-2 border-[#8a5000]" />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-[#8a5000]/10 text-[#8a5000] flex items-center justify-center font-bold text-xl">
                          {f.full_name[0]}
                        </div>
                      )}
                      <div>
                        <h3 className="text-base font-bold text-gray-900">{f.full_name}</h3>
                        <p className="text-xs font-medium text-[#8a5000]">{f.designation}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-3 italic">"{f.short_bio}"</p>
                    <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
                      <button onClick={() => openEdit(f)} className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-[#8a5000]"><Edit size={14} /></button>
                      <button onClick={() => { setSelectedF(f); setDeleteModalOpen(true); }} className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-red-600"><Trash2 size={14} /></button>
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
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-4 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={18} /></button>
            <h3 className="text-lg font-bold text-gray-900">{isEdit ? "Edit Profile" : "Add Profile"}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <ImageUploader label="Profile Photo" value={form.photo_url} onChange={(url) => setForm({ ...form, photo_url: url })} />
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Full Name *</label>
                <input required type="text" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Designation *</label>
                <input required type="text" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Quote / Short Bio *</label>
                <textarea required rows={3} value={form.short_bio} onChange={(e) => setForm({ ...form, short_bio: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#8a5000] text-white">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmDialog isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={handleDeleteConfirm} title={selectedF?.full_name || ""} entityName="founder profile" />
    </div>
  );
}

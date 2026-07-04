"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { PlusCircle, Edit, Trash2, Loader2, X, Sparkles, UserCheck, Quote, Layers } from "lucide-react";

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
      display_order: founders.length + 1,
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
              <h1 className="text-2xl font-bold text-gray-900">About & Founder Profiles Management</h1>
              <p className="text-sm text-gray-500 mt-0.5">Manage founder messages, biographies, and leadership profiles.</p>
            </div>
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8a5000] hover:bg-[#6e4000] text-white font-semibold text-sm shadow-sm transition-colors"
            >
              <PlusCircle size={18} />
              <span>Add Founder Profile</span>
            </button>
          </div>

          {/* Profiles Grid */}
          <div className="space-y-6">
            {loading ? (
              <div className="bg-white rounded-3xl border border-gray-200 p-16 flex flex-col items-center justify-center text-[#8a5000] shadow-sm">
                <Loader2 size={40} className="animate-spin mb-4" />
                <p className="text-base font-bold text-gray-700">Loading leadership profiles...</p>
              </div>
            ) : founders.length === 0 ? (
              <div className="bg-white rounded-3xl border border-gray-200 p-16 text-center shadow-sm max-w-2xl mx-auto space-y-4">
                <div className="w-16 h-16 bg-[#8a5000]/10 text-[#8a5000] rounded-full flex items-center justify-center mx-auto">
                  <UserCheck size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No founder profiles found</h3>
                <p className="text-sm text-gray-500">Get started by adding your first founder or board trustee profile.</p>
                <button
                  onClick={openAdd}
                  className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8a5000] hover:bg-[#6e4000] text-white font-bold text-sm shadow-md transition-all"
                >
                  <PlusCircle size={18} />
                  <span>Add First Profile</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {founders.map((f, idx) => (
                  <div
                    key={f.id}
                    className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col justify-between relative shadow-sm hover:shadow transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                          {f.photo_url ? (
                            <img src={f.photo_url} alt={f.full_name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-[#8a5000]/10 text-[#8a5000] flex items-center justify-center font-bold text-xl">
                              {f.full_name[0]}
                            </div>
                          )}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Order #{f.display_order || idx + 1}</span>
                          <h3 className="text-lg font-bold text-gray-900 leading-snug">{f.full_name}</h3>
                          <p className="text-xs font-semibold text-[#8a5000] mt-0.5">{f.designation}</p>
                        </div>
                      </div>

                      <div className="bg-[#fbf9f4] p-3.5 rounded-xl border border-gray-100 text-xs text-gray-700 italic font-serif leading-relaxed">
                        &ldquo;{f.short_bio}&rdquo;
                      </div>

                      {f.full_bio && (
                        <p className="text-xs text-gray-600 line-clamp-3 mt-3 leading-relaxed">
                          {f.full_bio}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end gap-2 pt-6 mt-6 border-t border-gray-100">
                      <button
                        onClick={() => openEdit(f)}
                        className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 hover:text-[#8a5000] font-semibold text-xs flex items-center gap-1.5"
                      >
                        <Edit size={14} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => { setSelectedF(f); setDeleteModalOpen(true); }}
                        className="p-1.5 rounded-lg bg-gray-100 text-gray-600 hover:text-red-600"
                        title="Delete Profile"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-100 space-y-4 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
            <h3 className="text-lg font-bold text-gray-900">
              {isEdit ? "Edit Founder Profile" : "Add Founder Profile"}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-5">
                  <ImageUploader
                    label="Portrait Photo"
                    value={form.photo_url}
                    onChange={(url) => setForm({ ...form, photo_url: url })}
                  />
                </div>
                <div className="md:col-span-7 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={form.full_name}
                      onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200"
                      placeholder="e.g. S. Vinoth Ragavendran"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Designation / Role *</label>
                    <input
                      required
                      type="text"
                      value={form.designation}
                      onChange={(e) => setForm({ ...form, designation: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200"
                      placeholder="e.g. Founder & Managing Trustee"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Display Order</label>
                    <input
                      type="number"
                      value={form.display_order}
                      onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200"
                      placeholder="1, 2, 3..."
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Quote / Motto *</label>
                <textarea
                  required
                  rows={2}
                  value={form.short_bio}
                  onChange={(e) => setForm({ ...form, short_bio: e.target.value })}
                  className="w-full px-3 py-2 text-xs font-serif italic rounded-lg border border-gray-200"
                  placeholder="An inspiring quote representing their vision..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Full Biography *</label>
                <textarea
                  required
                  rows={5}
                  value={form.full_bio}
                  onChange={(e) => setForm({ ...form, full_bio: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200"
                  placeholder="Detailed story of their background and achievements..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#8a5000] text-white"
                >
                  {isEdit ? "Save Profile" : "Create Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={selectedF?.full_name || ""}
        entityName="founder profile"
      />
    </div>
  );
}

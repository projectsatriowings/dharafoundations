"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { ViewItemModal } from "@/components/admin/ViewItemModal";
import { PlusCircle, Edit, Trash2, Eye, Loader2, X } from "lucide-react";

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [viewModalProg, setViewModalProg] = useState<any | null>(null);
  const DEFAULT_PROG_CATS = [
    { value: "temple_restoration", label: "Temple Restoration" },
    { value: "annadanam", label: "Annadanam Seva" },
    { value: "vedic_education", label: "Vedic & Cultural Education" },
    { value: "community_welfare", label: "Community Welfare" },
    { value: "goshala", label: "Goshala & Animal Welfare" },
    { value: "heritage_preservation", label: "Heritage Preservation" },
  ];
  const [customProgCategories, setCustomProgCategories] = useState<{ value: string; label: string }[]>([]);
  const [isCreatingProgCat, setIsCreatingProgCat] = useState(false);
  const [newProgCatInput, setNewProgCatInput] = useState("");

  const [form, setForm] = useState({
    title: "",
    category: "community_welfare",
    icon_name: "Heart",
    short_description: "",
    full_description: "",
    display_order: 0,
    status: "published",
  });

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProg, setSelectedProg] = useState<any | null>(null);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/programs");
      if (res.ok) {
        const data = await res.json();
        setPrograms(data.programs || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const openAdd = () => {
    setIsEdit(false);
    setCurrentId(null);
    setForm({
      title: "",
      category: "community_welfare",
      icon_name: "Heart",
      short_description: "",
      full_description: "",
      display_order: programs.length,
      status: "published",
    });
    setModalOpen(true);
  };

  const openEdit = (p: any) => {
    setIsEdit(true);
    setCurrentId(p.id);
    setForm({
      title: p.title,
      category: p.category,
      icon_name: p.icon_name || "Heart",
      short_description: p.short_description || "",
      full_description: p.full_description || "",
      display_order: p.display_order || 0,
      status: p.status || "published",
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEdit ? `/api/admin/programs/${currentId}` : `/api/admin/programs`;
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setModalOpen(false);
      fetchPrograms();
    } else {
      alert("Failed to save program.");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProg) return;
    await fetch(`/api/admin/programs/${selectedProg.id}`, { method: "DELETE" });
    fetchPrograms();
  };

  return (
    <div className="min-h-screen flex bg-[#fbf9f4]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar email="Admin" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Programs & Initiatives Management</h1>
              <p className="text-sm text-gray-500 mt-0.5">Manage Dhara Foundations core welfare and cultural dharma initiatives.</p>
            </div>
            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8a5000] hover:bg-[#6e4000] text-white font-semibold text-sm shadow-sm transition-colors"
            >
              <PlusCircle size={18} />
              <span>Add Initiative</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 text-[#8a5000]">
                <Loader2 size={32} className="animate-spin mb-3" />
                <span className="text-sm font-medium">Loading initiatives...</span>
              </div>
            ) : programs.length === 0 ? (
              <div className="text-center py-16 px-4">
                <p className="text-base font-semibold text-gray-800">No programs found</p>
                <button onClick={openAdd} className="mt-3 px-4 py-2 rounded-lg bg-[#8a5000] text-white text-xs font-semibold">Add First Program</button>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#fbf9f4] border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase">
                    <th className="py-3 px-4">Order</th>
                    <th className="py-3 px-4">Initiative Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Short Summary</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {programs.map((p) => (
                    <tr key={p.id} className="hover:bg-[#fbf9f4]/70">
                      <td className="py-3 px-4 font-mono font-bold text-gray-400">#{p.display_order}</td>
                      <td className="py-3 px-4 font-semibold text-gray-900">{p.title}</td>
                      <td className="py-3 px-4 text-xs font-medium uppercase text-gray-500">{p.category.replace("_", " ")}</td>
                      <td className="py-3 px-4 max-w-sm text-gray-600 truncate">{p.short_description}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${p.status === "published" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => setViewModalProg(p)} className="p-1.5 text-gray-400 hover:text-gray-700 cursor-pointer" title="Preview Details"><Eye size={16} /></button>
                          <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-[#8a5000]"><Edit size={16} /></button>
                          <button onClick={() => { setSelectedProg(p); setDeleteModalOpen(true); }} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-4 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X size={18} /></button>
            <h3 className="text-lg font-bold text-gray-900">{isEdit ? "Edit Program" : "Add New Program"}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Initiative Title *</label>
                <input required type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Category *</label>
                  {isCreatingProgCat ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        autoFocus
                        placeholder="New category..."
                        value={newProgCatInput}
                        onChange={(e) => setNewProgCatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            if (newProgCatInput.trim()) {
                              const val = newProgCatInput.trim().toLowerCase().replace(/\s+/g, "_");
                              if (!customProgCategories.some((c) => c.value === val)) {
                                setCustomProgCategories((prev) => [...prev, { value: val, label: newProgCatInput.trim() }]);
                              }
                              setForm({ ...form, category: val });
                              setIsCreatingProgCat(false);
                              setNewProgCatInput("");
                            }
                          }
                        }}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border-2 border-[#8a5000]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newProgCatInput.trim()) {
                            const val = newProgCatInput.trim().toLowerCase().replace(/\s+/g, "_");
                            if (!customProgCategories.some((c) => c.value === val)) {
                              setCustomProgCategories((prev) => [...prev, { value: val, label: newProgCatInput.trim() }]);
                            }
                            setForm({ ...form, category: val });
                            setIsCreatingProgCat(false);
                            setNewProgCatInput("");
                          }
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-[#8a5000] text-white text-xs font-semibold"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => { setIsCreatingProgCat(false); setNewProgCatInput(""); }}
                        className="px-2 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <select
                      value={form.category}
                      onChange={(e) => {
                        if (e.target.value === "__CREATE_NEW__") {
                          setIsCreatingProgCat(true);
                        } else {
                          setForm({ ...form, category: e.target.value });
                        }
                      }}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200"
                    >
                      {DEFAULT_PROG_CATS.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                      {customProgCategories.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                      <option value="__CREATE_NEW__" className="font-bold text-[#8a5000]">+ Create New Category...</option>
                    </select>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200">
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Icon Name</label>
                <input type="text" value={form.icon_name} onChange={(e) => setForm({ ...form, icon_name: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200" placeholder="e.g. Heart, Book, Sparkles" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Short Summary *</label>
                <textarea required rows={2} value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Full Description</label>
                <textarea rows={4} value={form.full_description} onChange={(e) => setForm({ ...form, full_description: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#8a5000] text-white">Save Program</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmDialog isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onConfirm={handleDeleteConfirm} title={selectedProg?.title || ""} entityName="program" />

      <ViewItemModal
        isOpen={!!viewModalProg}
        onClose={() => setViewModalProg(null)}
        title={viewModalProg?.title || ""}
        subtitle={viewModalProg?.category ? viewModalProg.category.replace("_", " ") : "Initiative"}
        status={viewModalProg?.status}
        fields={[
          { label: "Category", value: viewModalProg?.category },
          { label: "Order", value: `#${viewModalProg?.display_order}` },
        ]}
        bodyText={viewModalProg?.full_description || viewModalProg?.short_description}
      />
    </div>
  );
}

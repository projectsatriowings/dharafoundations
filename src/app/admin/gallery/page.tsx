"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { PlusCircle, Trash2, Star, Loader2, Filter, X, Edit2 } from "lucide-react";

export default function AdminGalleryPage() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Modal states
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [newCategory, setNewCategory] = useState("events");
  const [newFeatured, setNewFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Edit Modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<any | null>(null);
  const [editUrl, setEditUrl] = useState("");
  const [editCaption, setEditCaption] = useState("");
  const [editCategory, setEditCategory] = useState("events");
  const [editFeatured, setEditFeatured] = useState(false);
  const [editing, setEditing] = useState(false);

  const DEFAULT_GAL_CATS = [
    { value: "temple_heritage", label: "Temple Heritage" },
    { value: "community_welfare", label: "Community Welfare" },
    { value: "events", label: "Events" },
    { value: "women_empowerment", label: "Women Empowerment" },
    { value: "children_programs", label: "Children & Education" },
  ];
  const [customGalCategories, setCustomGalCategories] = useState<{ value: string; label: string }[]>([]);
  const [isCreatingGalCat, setIsCreatingGalCat] = useState(false);
  const [newGalCatInput, setNewGalCatInput] = useState("");

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/gallery?category=${categoryFilter}`);
      if (res.ok) {
        const data = await res.json();
        setPhotos(data.photos || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [categoryFilter]);

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return alert("Please upload an image first.");
    setUploading(true);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: newUrl,
          caption: newCaption || "Dhara Foundation Seva",
          category: newCategory,
          is_featured: newFeatured,
        }),
      });
      if (res.ok) {
        setUploadModalOpen(false);
        setNewUrl("");
        setNewCaption("");
        fetchPhotos();
      }
    } finally {
      setUploading(false);
    }
  };

  const toggleFeatured = async (photo: any) => {
    await fetch(`/api/admin/gallery/${photo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_featured: !photo.is_featured }),
    });
    fetchPhotos();
  };

  const handleOpenEditModal = (photo: any) => {
    setEditingPhoto(photo);
    setEditUrl(photo.image_url || "");
    setEditCaption(photo.caption || "");
    setEditCategory(photo.category || "events");
    setEditFeatured(!!photo.is_featured);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPhoto) return;
    setEditing(true);
    try {
      const res = await fetch(`/api/admin/gallery/${editingPhoto.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image_url: editUrl || editingPhoto.image_url,
          caption: editCaption || "Dhara Foundation Seva",
          category: editCategory,
          is_featured: editFeatured,
        }),
      });
      if (res.ok) {
        setEditModalOpen(false);
        setEditingPhoto(null);
        fetchPhotos();
      } else {
        alert("Failed to update photo.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating photo.");
    } finally {
      setEditing(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedPhoto) return;
    const res = await fetch(`/api/admin/gallery/${selectedPhoto.id}`, { method: "DELETE" });
    if (res.ok) fetchPhotos();
  };

  return (
    <div className="min-h-screen flex bg-[#fbf9f4]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar email="Admin" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Photo Gallery Management</h1>
              <p className="text-sm text-gray-500 mt-0.5">Organize photos across categories for the public Gallery page.</p>
            </div>
            <button
              onClick={() => setUploadModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8a5000] hover:bg-[#6e4000] text-white font-semibold text-sm shadow-sm transition-colors"
            >
              <PlusCircle size={18} />
              <span>Upload New Photo</span>
            </button>
          </div>

          {/* Categories bar */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {[
              { id: "all", label: "All Photos" },
              { id: "temple_heritage", label: "Temple Heritage" },
              { id: "community_welfare", label: "Community Welfare" },
              { id: "events", label: "Events" },
              { id: "women_empowerment", label: "Women Empowerment" },
              { id: "children_programs", label: "Children & Education" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  categoryFilter === cat.id
                    ? "bg-[#8a5000] text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-[#fbf9f4]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-[#8a5000]">
              <Loader2 size={32} className="animate-spin mb-3" />
              <span className="text-sm font-medium">Loading gallery...</span>
            </div>
          ) : photos.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <p className="text-base font-semibold text-gray-800">No photos in this category</p>
              <button
                onClick={() => setUploadModalOpen(true)}
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8a5000] text-white text-xs font-semibold"
              >
                <PlusCircle size={15} /> Upload Photo
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm group flex flex-col">
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img src={photo.image_url} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <button
                      onClick={() => toggleFeatured(photo)}
                      title={photo.is_featured ? "Featured on Home page" : "Click to feature"}
                      className={`absolute top-2 left-2 p-1.5 rounded-lg shadow transition-colors ${
                        photo.is_featured ? "bg-amber-400 text-white" : "bg-black/40 text-white/70 hover:text-white"
                      }`}
                    >
                      <Star size={14} fill={photo.is_featured ? "currentColor" : "none"} />
                    </button>
                    <div className="absolute top-2 right-2 flex items-center gap-1.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity z-10">
                      <button
                        onClick={() => handleOpenEditModal(photo)}
                        title="Edit Photo Details"
                        className="p-1.5 rounded-lg bg-[#8a5000] text-white hover:bg-[#6e4000] shadow transition-colors cursor-pointer"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => { setSelectedPhoto(photo); setDeleteModalOpen(true); }}
                        title="Delete Photo"
                        className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <p className="text-xs font-semibold text-gray-800 line-clamp-1">{photo.caption}</p>
                    <span className="text-[10px] uppercase font-bold text-gray-400 mt-1">{photo.category.replace("_", " ")}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4 relative">
            <button onClick={() => setUploadModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
            <h3 className="text-lg font-bold text-gray-900">Upload Gallery Photo</h3>
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <ImageUploader label="Select Image *" value={newUrl} onChange={setNewUrl} />
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Caption</label>
                <input
                  type="text"
                  placeholder="e.g. Annadhanam Seva at Cuddalore"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Category</label>
                {isCreatingGalCat ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      autoFocus
                      placeholder="New category..."
                      value={newGalCatInput}
                      onChange={(e) => setNewGalCatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (newGalCatInput.trim()) {
                            const val = newGalCatInput.trim().toLowerCase().replace(/\s+/g, "_");
                            if (!customGalCategories.some((c) => c.value === val)) {
                              setCustomGalCategories((prev) => [...prev, { value: val, label: newGalCatInput.trim() }]);
                            }
                            setNewCategory(val);
                            setIsCreatingGalCat(false);
                            setNewGalCatInput("");
                          }
                        }
                      }}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border-2 border-[#8a5000]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newGalCatInput.trim()) {
                          const val = newGalCatInput.trim().toLowerCase().replace(/\s+/g, "_");
                          if (!customGalCategories.some((c) => c.value === val)) {
                            setCustomGalCategories((prev) => [...prev, { value: val, label: newGalCatInput.trim() }]);
                          }
                          setNewCategory(val);
                          setIsCreatingGalCat(false);
                          setNewGalCatInput("");
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-[#8a5000] text-white text-xs font-semibold"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => { setIsCreatingGalCat(false); setNewGalCatInput(""); }}
                      className="px-2 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <select
                    value={newCategory}
                    onChange={(e) => {
                      if (e.target.value === "__CREATE_NEW__") {
                        setIsCreatingGalCat(true);
                      } else {
                        setNewCategory(e.target.value);
                      }
                    }}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-[#8a5000]"
                  >
                    {DEFAULT_GAL_CATS.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                    {customGalCategories.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                    <option value="__CREATE_NEW__" className="font-bold text-[#8a5000]">+ Create New Category...</option>
                  </select>
                )}
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newFeatured}
                  onChange={(e) => setNewFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#8a5000] rounded"
                />
                <span className="text-xs font-medium text-gray-700">Feature on Homepage showcase</span>
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setUploadModalOpen(false)} className="px-4 py-2 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700">Cancel</button>
                <button type="submit" disabled={uploading || !newUrl} className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#8a5000] text-white disabled:opacity-50">Upload</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4 relative">
            <button onClick={() => setEditModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
            <h3 className="text-lg font-bold text-gray-900">Edit Photo Details</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <ImageUploader label="Change Image (Optional)" value={editUrl} onChange={setEditUrl} />
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Caption</label>
                <input
                  type="text"
                  placeholder="e.g. Annadhanam Seva at Cuddalore"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Category</label>
                {isCreatingGalCat ? (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      autoFocus
                      placeholder="New category..."
                      value={newGalCatInput}
                      onChange={(e) => setNewGalCatInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          if (newGalCatInput.trim()) {
                            const val = newGalCatInput.trim().toLowerCase().replace(/\s+/g, "_");
                            if (!customGalCategories.some((c) => c.value === val)) {
                              setCustomGalCategories((prev) => [...prev, { value: val, label: newGalCatInput.trim() }]);
                            }
                            setEditCategory(val);
                            setIsCreatingGalCat(false);
                            setNewGalCatInput("");
                          }
                        }
                      }}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border-2 border-[#8a5000]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newGalCatInput.trim()) {
                          const val = newGalCatInput.trim().toLowerCase().replace(/\s+/g, "_");
                          if (!customGalCategories.some((c) => c.value === val)) {
                            setCustomGalCategories((prev) => [...prev, { value: val, label: newGalCatInput.trim() }]);
                          }
                          setEditCategory(val);
                          setIsCreatingGalCat(false);
                          setNewGalCatInput("");
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-[#8a5000] text-white text-xs font-semibold"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => { setIsCreatingGalCat(false); setNewGalCatInput(""); }}
                      className="px-2 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <select
                    value={editCategory}
                    onChange={(e) => {
                      if (e.target.value === "__CREATE_NEW__") {
                        setIsCreatingGalCat(true);
                      } else {
                        setEditCategory(e.target.value);
                      }
                    }}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-[#8a5000]"
                  >
                    {DEFAULT_GAL_CATS.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                    {customGalCategories.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                    <option value="__CREATE_NEW__" className="font-bold text-[#8a5000]">+ Create New Category...</option>
                  </select>
                )}
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editFeatured}
                  onChange={(e) => setEditFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#8a5000] rounded"
                />
                <span className="text-xs font-medium text-gray-700">Feature on Homepage showcase</span>
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditModalOpen(false)} className="px-4 py-2 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700">Cancel</button>
                <button type="submit" disabled={editing || !editUrl} className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#8a5000] text-white disabled:opacity-50">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirmDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={selectedPhoto?.caption || "photo"}
        entityName="gallery photo"
      />
    </div>
  );
}

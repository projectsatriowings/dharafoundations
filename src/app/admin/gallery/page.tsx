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
  const [newCategory, setNewCategory] = useState("charity");
  const [newFeatured, setNewFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Edit Modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState<any | null>(null);
  const [editUrl, setEditUrl] = useState("");
  const [editCaption, setEditCaption] = useState("");
  const [editCategory, setEditCategory] = useState("charity");
  const [editFeatured, setEditFeatured] = useState(false);
  const [editing, setEditing] = useState(false);

  const DEFAULT_GAL_CATS = [
    { value: "charity", label: "Charity" },
    { value: "sanatana_dharma", label: "Sanatana Dharma" },
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
              <h1 className="text-2xl font-bold text-gray-900">Seva (Visual Chronicles) Management</h1>
              <p className="text-sm text-gray-500 mt-0.5">Organize photos across Charity and Sanatana Dharma categories for the public Seva page.</p>
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
              { id: "charity", label: "Charity" },
              { id: "sanatana_dharma", label: "Sanatana Dharma" },
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setUploadModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-[#8a5000]/10 text-[#8a5000] flex items-center justify-center font-bold">
                <PlusCircle size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight">Upload Gallery Photo</h3>
                <p className="text-xs text-gray-500">Add a new photo to your Seva chronicles</p>
              </div>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-6">
              <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200/60">
                <ImageUploader label="Full Coverage Photo Preview *" value={newUrl} onChange={setNewUrl} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Caption / Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Annadhanam Seva at Cuddalore"
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#8a5000] focus:ring-4 focus:ring-[#8a5000]/10 transition-all font-medium text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Category Section
                  </label>
                  {isCreatingGalCat ? (
                    <div className="flex items-center gap-1.5 pt-1">
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
                        className="w-full px-3 py-2 text-xs rounded-xl border-2 border-[#8a5000] font-medium"
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
                        className="px-3 py-2 rounded-xl bg-[#8a5000] text-white text-xs font-bold shadow-sm"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => { setIsCreatingGalCat(false); setNewGalCatInput(""); }}
                        className="px-3 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold"
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
                      className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#8a5000] focus:ring-4 focus:ring-[#8a5000]/10 transition-all font-medium text-gray-800"
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
              </div>

              <div className="pt-2">
                <label className="inline-flex items-center gap-3 cursor-pointer p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/50 w-full transition-colors hover:bg-amber-50">
                  <input
                    type="checkbox"
                    checked={newFeatured}
                    onChange={(e) => setNewFeatured(e.target.checked)}
                    className="w-4 h-4 text-[#8a5000] rounded focus:ring-[#8a5000]"
                  />
                  <span className="text-sm font-semibold text-gray-800">
                    Feature on Homepage showcase (Highlighted Item)
                  </span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-6 py-3 rounded-xl text-sm font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading || !newUrl}
                  className="px-6 py-3 rounded-xl text-sm font-bold bg-[#8a5000] text-white shadow-lg hover:bg-[#6e4000] disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  {uploading && <Loader2 size={16} className="animate-spin" />}
                  <span>Upload Photo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-[#8a5000]/10 text-[#8a5000] flex items-center justify-center font-bold">
                <Edit2 size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 leading-tight">Edit Photo Details</h3>
                <p className="text-xs text-gray-500">Update image coverage, caption, or category categorization</p>
              </div>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-6">
              <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200/60">
                <ImageUploader label="Full Coverage Photo Preview / Change Image" value={editUrl} onChange={setEditUrl} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Caption / Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Annadhanam Seva at Cuddalore"
                    value={editCaption}
                    onChange={(e) => setEditCaption(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#8a5000] focus:ring-4 focus:ring-[#8a5000]/10 transition-all font-medium text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Category Section
                  </label>
                  {isCreatingGalCat ? (
                    <div className="flex items-center gap-1.5 pt-1">
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
                        className="w-full px-3 py-2 text-xs rounded-xl border-2 border-[#8a5000] font-medium"
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
                        className="px-3 py-2 rounded-xl bg-[#8a5000] text-white text-xs font-bold shadow-sm"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => { setIsCreatingGalCat(false); setNewGalCatInput(""); }}
                        className="px-3 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold"
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
                      className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#8a5000] focus:ring-4 focus:ring-[#8a5000]/10 transition-all font-medium text-gray-800"
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
              </div>

              <div className="pt-2">
                <label className="inline-flex items-center gap-3 cursor-pointer p-3.5 rounded-xl bg-amber-50/50 border border-amber-200/50 w-full transition-colors hover:bg-amber-50">
                  <input
                    type="checkbox"
                    checked={editFeatured}
                    onChange={(e) => setEditFeatured(e.target.checked)}
                    className="w-4 h-4 text-[#8a5000] rounded focus:ring-[#8a5000]"
                  />
                  <span className="text-sm font-semibold text-gray-800">
                    Feature on Homepage showcase (Highlighted Item)
                  </span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-6 py-3 rounded-xl text-sm font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editing || !editUrl}
                  className="px-6 py-3 rounded-xl text-sm font-bold bg-[#8a5000] text-white shadow-lg hover:bg-[#6e4000] disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  {editing && <Loader2 size={16} className="animate-spin" />}
                  <span>Save Changes</span>
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
        title={selectedPhoto?.caption || "photo"}
        entityName="gallery photo"
      />
    </div>
  );
}

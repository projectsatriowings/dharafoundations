"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import {
  PlusCircle,
  Trash2,
  Star,
  Loader2,
  Filter,
  X,
  Edit2,
  Calendar,
  MapPin,
  ExternalLink,
  Layers,
  Sparkles,
  Heart,
  Globe,
  ImageIcon,
  Search,
} from "lucide-react";

export default function AdminGalleryPage() {
  const router = useRouter();
  // Master Tab State
  const [activeTab, setActiveTab] = useState<"activities" | "chronicles">("activities");

  // --- TAB 1: SEVA ACTIVITIES & DETAIL PAGES STATE ---
  const [activities, setActivities] = useState<any[]>([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [activitySearch, setActivitySearch] = useState("");
  const [pillarFilter, setPillarFilter] = useState<"all" | "charity" | "sanatana">("all");

  // --- TAB 2: SEVA PHOTO CHRONICLES STATE ---
  const [photos, setPhotos] = useState<any[]>([]);
  const [photosLoading, setPhotosLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Upload Modal for Standalone Chronicles
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [newCategory, setNewCategory] = useState("charity");
  const [newFeatured, setNewFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Edit Modal for Standalone Chronicles
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

  // Delete Modal for Standalone Chronicles
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  // --- FETCH SEVA ACTIVITIES (TAB 1) ---
  const fetchActivities = async () => {
    setActivitiesLoading(true);
    try {
      const res = await fetch("/api/admin/events?limit=100");
      if (res.ok) {
        const data = await res.json();
        setActivities(data.events || []);
      }
    } catch (err) {
      console.error("Failed to load Seva activities:", err);
    } finally {
      setActivitiesLoading(false);
    }
  };

  // --- FETCH STANDALONE PHOTO CHRONICLES (TAB 2) ---
  const fetchPhotos = async () => {
    setPhotosLoading(true);
    try {
      const res = await fetch(`/api/admin/gallery?category=${categoryFilter}`);
      if (res.ok) {
        const data = await res.json();
        setPhotos(data.photos || []);
      }
    } catch (err) {
      console.error("Failed to load photo chronicles:", err);
    } finally {
      setPhotosLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "activities") {
      fetchActivities();
    } else {
      fetchPhotos();
    }
  }, [activeTab, categoryFilter]);

  // --- TAB 1 HELPERS ---
  const filteredActivities = activities.filter((act) => {
    const matchesSearch =
      !activitySearch.trim() ||
      (act.title && act.title.toLowerCase().includes(activitySearch.toLowerCase())) ||
      (act.category && act.category.toLowerCase().includes(activitySearch.toLowerCase())) ||
      (act.location_name && act.location_name.toLowerCase().includes(activitySearch.toLowerCase()));

    if (!matchesSearch) return false;

    const isSanatana =
      act.category === "Sanatana Dharma" ||
      act.category === "Temple Heritage" ||
      act.category === "Vedic Heritage" ||
      (act.title && act.title.toLowerCase().includes("temple")) ||
      (act.title && act.title.toLowerCase().includes("girivalam")) ||
      (act.title && act.title.toLowerCase().includes("pooja"));

    if (pillarFilter === "sanatana") return isSanatana;
    if (pillarFilter === "charity") return !isSanatana;
    return true;
  });

  const formatDateClean = (dateVal?: string | Date): string => {
    if (!dateVal) return "-";
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return String(dateVal);
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return String(dateVal);
    }
  };

  // --- TAB 2 ACTIONS ---
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
    setEditCategory(photo.category || "charity");
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
          image_url: editUrl,
          caption: editCaption,
          category: editCategory,
          is_featured: editFeatured,
        }),
      });
      if (res.ok) {
        setEditModalOpen(false);
        setEditingPhoto(null);
        fetchPhotos();
      }
    } finally {
      setEditing(false);
    }
  };

  const handleDeletePhoto = async () => {
    if (!selectedPhoto) return;
    await fetch(`/api/admin/gallery/${selectedPhoto.id}`, { method: "DELETE" });
    setDeleteModalOpen(false);
    setSelectedPhoto(null);
    fetchPhotos();
  };

  return (
    <div className="min-h-screen flex bg-[#fbf9f4]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar email="Admin" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#8a5000]/10 text-[#8a5000] text-xs font-bold mb-2 uppercase tracking-wider">
                <Sparkles size={13} /> Complete Seva Management
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-heading">
                Seva Page & Visual Chronicles
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Full administration for the public <span className="font-semibold text-gray-800">/sevas</span> website — manage detail pages, 3-paragraph writeups, Charity & Sanatana Dharma categories, and high-res photo archives.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/sevas"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-sm shadow-sm transition-colors"
              >
                <ExternalLink size={16} className="text-gray-500" />
                <span>View Public Sevas Page</span>
              </a>
              {activeTab === "activities" ? (
                <Link
                  href="/admin/events/new"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#00322B] hover:bg-[#00241f] text-white font-semibold text-sm shadow-sm transition-colors"
                >
                  <PlusCircle size={18} className="text-[#FFD27F]" />
                  <span>+ Add New Seva Activity</span>
                </Link>
              ) : (
                <button
                  onClick={() => setUploadModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8a5000] hover:bg-[#6e4000] text-white font-semibold text-sm shadow-sm transition-colors cursor-pointer"
                >
                  <PlusCircle size={18} />
                  <span>+ Upload Photo Chronicle</span>
                </button>
              )}
            </div>
          </div>

          {/* Master Tabs Switcher */}
          <div className="flex items-center gap-2 border-b border-gray-200 mb-8 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab("activities")}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-t-xl font-bold text-sm transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === "activities"
                  ? "bg-white border-[#8a5000] text-[#8a5000] shadow-sm"
                  : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100/60"
              }`}
            >
              <Heart size={17} className={activeTab === "activities" ? "text-[#8a5000]" : "text-gray-400"} />
              <span>1. Seva Activities & Detail Pages</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${activeTab === "activities" ? "bg-[#8a5000]/15 text-[#8a5000]" : "bg-gray-200 text-gray-600"}`}>
                {activities.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab("chronicles")}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-t-xl font-bold text-sm transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === "chronicles"
                  ? "bg-white border-[#8a5000] text-[#8a5000] shadow-sm"
                  : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100/60"
              }`}
            >
              <ImageIcon size={17} className={activeTab === "chronicles" ? "text-[#8a5000]" : "text-gray-400"} />
              <span>2. Standalone Photo Chronicles Grid</span>
            </button>
          </div>

          {/* =========================================================================
              TAB 1: SEVA ACTIVITIES & DETAIL PAGES ("MOMENTS OF SEVA & CELEBRATION")
             ========================================================================= */}
          {activeTab === "activities" && (
            <div>
              {/* Category & Pillar Filters */}
              <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                  <button
                    onClick={() => setPillarFilter("all")}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      pillarFilter === "all"
                        ? "bg-[#00322B] text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    All Pillars ({activities.length})
                  </button>
                  <button
                    onClick={() => setPillarFilter("charity")}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      pillarFilter === "charity"
                        ? "bg-[#8a5000] text-white shadow-sm"
                        : "bg-amber-50 text-amber-900 border border-amber-200/60 hover:bg-amber-100"
                    }`}
                  >
                    Charity & Welfare ({activities.filter(a => a.category !== "Sanatana Dharma" && a.category !== "Temple Heritage" && a.category !== "Vedic Heritage").length})
                  </button>
                  <button
                    onClick={() => setPillarFilter("sanatana")}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      pillarFilter === "sanatana"
                        ? "bg-[#8a5000] text-white shadow-sm"
                        : "bg-amber-50 text-amber-900 border border-amber-200/60 hover:bg-amber-100"
                    }`}
                  >
                    Sanatana Dharma & Temples ({activities.filter(a => a.category === "Sanatana Dharma" || a.category === "Temple Heritage" || a.category === "Vedic Heritage").length})
                  </button>
                </div>

                <div className="relative w-full md:w-72">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by title, location, category..."
                    value={activitySearch}
                    onChange={(e) => setActivitySearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 bg-[#fbf9f4] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8a5000]/20 focus:border-[#8a5000]"
                  />
                </div>
              </div>

              {/* Activities Grid */}
              {activitiesLoading ? (
                <div className="flex flex-col items-center justify-center py-24 text-[#8a5000]">
                  <Loader2 size={32} className="animate-spin mb-3" />
                  <span className="text-sm font-medium">Loading Seva activities & detail pages...</span>
                </div>
              ) : filteredActivities.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center shadow-sm">
                  <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-4">
                    <Heart size={26} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">No Seva Activities Found</h3>
                  <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
                    {activitySearch || pillarFilter !== "all"
                      ? "No activities matched your search or category filter. Try clearing filters."
                      : "Start documenting your foundation's impact by adding your first Seva activity detail page."}
                  </p>
                  <Link
                    href="/admin/events/new"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00322B] text-white font-semibold text-sm shadow"
                  >
                    <PlusCircle size={17} className="text-[#FFD27F]" />
                    <span>Create First Seva Activity</span>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredActivities.map((act) => {
                    const isSanatana =
                      act.category === "Sanatana Dharma" ||
                      act.category === "Temple Heritage" ||
                      act.category === "Vedic Heritage";

                    return (
                      <div
                        key={act.id}
                        className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
                      >
                        {/* Cover Image & Category Badge */}
                        <div className="relative h-52 bg-gray-100 overflow-hidden shrink-0">
                          {act.cover_image_url ? (
                            <img
                              src={act.cover_image_url}
                              alt={act.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium text-xs">
                              No Cover Photo
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                          {/* Category Badge */}
                          <div className="absolute top-3 left-3">
                            <span
                              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow ${
                                isSanatana
                                  ? "bg-amber-500 text-black border border-amber-400"
                                  : "bg-[#00322B] text-[#FFD27F] border border-white/20"
                              }`}
                            >
                              {act.category || "General Seva"}
                            </span>
                          </div>

                          {/* Status Badge */}
                          <div className="absolute top-3 right-3">
                            <span
                              className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold shadow ${
                                act.status === "published"
                                  ? "bg-emerald-500 text-white"
                                  : "bg-amber-500 text-white"
                              }`}
                            >
                              {act.status || "draft"}
                            </span>
                          </div>

                          {/* Title Overlay */}
                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <h3 className="font-bold text-base line-clamp-2 drop-shadow-sm font-heading">
                              {act.title}
                            </h3>
                          </div>
                        </div>

                        {/* Details Area */}
                        <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                          <div className="space-y-2 text-xs text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-[#8a5000] shrink-0" />
                              <span>{formatDateClean(act.event_date)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-[#8a5000] shrink-0" />
                              <span className="truncate">{act.location_name || "Cuddalore / Tamil Nadu"}</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                            <Link
                              href={`/admin/events/${act.id}/edit`}
                              className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#8a5000] hover:bg-[#6e4000] text-white font-bold text-xs shadow transition-colors"
                            >
                              <Edit2 size={13} />
                              <span>Edit Detail Page & Gallery</span>
                            </Link>
                            <a
                              href={`/sevas/${act.slug || act.id}`}
                              target="_blank"
                              rel="noreferrer"
                              title="View live public Seva detail page"
                              className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                            >
                              <ExternalLink size={15} />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              TAB 2: SEVA PHOTO CHRONICLES (STANDALONE PHOTO ARCHIVE GRID)
             ========================================================================= */}
          {activeTab === "chronicles" && (
            <div>
              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex flex-wrap items-center gap-2 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
                  <button
                    onClick={() => setCategoryFilter("all")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      categoryFilter === "all"
                        ? "bg-[#8a5000] text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    All Standalone Photos
                  </button>
                  {DEFAULT_GAL_CATS.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setCategoryFilter(cat.value)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        categoryFilter === cat.value
                          ? "bg-[#8a5000] text-white shadow-sm"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                  {customGalCategories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setCategoryFilter(cat.value)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        categoryFilter === cat.value
                          ? "bg-[#8a5000] text-white shadow-sm"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}

                  {isCreatingGalCat ? (
                    <div className="flex items-center gap-1.5 pl-1 pr-1.5 py-0.5 bg-amber-50 rounded-lg border border-amber-200">
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
                              if (!DEFAULT_GAL_CATS.some((c) => c.value === val) && !customGalCategories.some((c) => c.value === val)) {
                                setCustomGalCategories((prev) => [...prev, { value: val, label: newGalCatInput.trim() }]);
                              }
                              setCategoryFilter(val);
                              setIsCreatingGalCat(false);
                              setNewGalCatInput("");
                            }
                          }
                        }}
                        className="w-24 px-2 py-1 text-xs rounded bg-white border border-amber-300 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newGalCatInput.trim()) {
                            const val = newGalCatInput.trim().toLowerCase().replace(/\s+/g, "_");
                            if (!DEFAULT_GAL_CATS.some((c) => c.value === val) && !customGalCategories.some((c) => c.value === val)) {
                              setCustomGalCategories((prev) => [...prev, { value: val, label: newGalCatInput.trim() }]);
                            }
                            setCategoryFilter(val);
                            setIsCreatingGalCat(false);
                            setNewGalCatInput("");
                          }
                        }}
                        className="px-2 py-1 rounded bg-[#8a5000] text-white font-bold text-[10px]"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => { setIsCreatingGalCat(false); setNewGalCatInput(""); }}
                        className="text-gray-400 hover:text-gray-600 px-1"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsCreatingGalCat(true)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#8a5000] hover:bg-amber-50 border border-dashed border-[#8a5000]/40 transition-colors flex items-center gap-1"
                    >
                      <PlusCircle size={12} />
                      <span>New Category</span>
                    </button>
                  )}
                </div>
              </div>

              {photosLoading ? (
                <div className="flex flex-col items-center justify-center py-24 text-[#8a5000]">
                  <Loader2 size={32} className="animate-spin mb-3" />
                  <span className="text-sm font-medium">Loading photo chronicles...</span>
                </div>
              ) : photos.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center shadow-sm">
                  <p className="text-base font-semibold text-gray-800">No standalone photos in this category</p>
                  <button
                    onClick={() => setUploadModalOpen(true)}
                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8a5000] text-white text-xs font-bold shadow cursor-pointer"
                  >
                    <PlusCircle size={15} /> Upload Photo Chronicle
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {photos.map((photo) => (
                    <div key={photo.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm group flex flex-col">
                      <div className="relative h-48 bg-gray-100 overflow-hidden">
                        <img
                          src={photo.image_url}
                          alt={photo.caption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <button
                          onClick={() => toggleFeatured(photo)}
                          title={photo.is_featured ? "Featured on Home page" : "Click to feature"}
                          className={`absolute top-2 left-2 p-1.5 rounded-lg shadow transition-colors cursor-pointer ${
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
            </div>
          )}

          {/* =========================================================================
              MODALS FOR TAB 2 (STANDALONE PHOTO CHRONICLES)
             ========================================================================= */}
          {uploadModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
              <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-100 flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                  <h3 className="font-bold text-lg text-gray-900">Upload Photo Chronicle</h3>
                  <button onClick={() => setUploadModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleUploadSubmit} className="space-y-4 flex-1 overflow-y-auto pr-1">
                  <div>
                    <ImageUploader
                      label="Select Photo *"
                      value={newUrl}
                      onChange={(url) => setNewUrl(url)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">Caption / Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Annadan Seva at Cuddalore Temple"
                      value={newCaption}
                      onChange={(e) => setNewCaption(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">Category Pillar</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-[#8a5000]"
                    >
                      <option value="charity">Charity & Welfare Drives</option>
                      <option value="sanatana_dharma">Sanatana Dharma & Temples</option>
                      {customGalCategories.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={newFeatured}
                      onChange={(e) => setNewFeatured(e.target.checked)}
                      className="rounded border-gray-300 text-[#8a5000] focus:ring-[#8a5000]"
                    />
                    <label htmlFor="featured" className="text-xs font-medium text-gray-700 cursor-pointer">
                      Feature on Home Page Carousel
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setUploadModalOpen(false)}
                      className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={uploading || !newUrl}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#8a5000] hover:bg-[#6e4000] text-white text-xs font-bold disabled:opacity-50"
                    >
                      {uploading ? <Loader2 size={14} className="animate-spin" /> : <PlusCircle size={14} />}
                      <span>Upload Photo</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit Modal */}
          {editModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
              <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-gray-100 flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                  <h3 className="font-bold text-lg text-gray-900">Edit Photo Details</h3>
                  <button onClick={() => setEditModalOpen(false)} className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleEditSubmit} className="space-y-4 flex-1 overflow-y-auto pr-1">
                  <div>
                    <ImageUploader
                      label="Photo"
                      value={editUrl}
                      onChange={(url) => setEditUrl(url)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">Caption / Title</label>
                    <input
                      type="text"
                      value={editCaption}
                      onChange={(e) => setEditCaption(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">Category Pillar</label>
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-[#8a5000]"
                    >
                      <option value="charity">Charity & Welfare Drives</option>
                      <option value="sanatana_dharma">Sanatana Dharma & Temples</option>
                      {customGalCategories.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="edit_featured"
                      checked={editFeatured}
                      onChange={(e) => setEditFeatured(e.target.checked)}
                      className="rounded border-gray-300 text-[#8a5000] focus:ring-[#8a5000]"
                    />
                    <label htmlFor="edit_featured" className="text-xs font-medium text-gray-700 cursor-pointer">
                      Feature on Home Page Carousel
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setEditModalOpen(false)}
                      className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={editing || !editUrl}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#8a5000] hover:bg-[#6e4000] text-white text-xs font-bold disabled:opacity-50"
                    >
                      {editing ? <Loader2 size={14} className="animate-spin" /> : <Edit2 size={14} />}
                      <span>Save Changes</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Delete Modal */}
          <DeleteConfirmDialog
            isOpen={deleteModalOpen}
            onClose={() => { setDeleteModalOpen(false); setSelectedPhoto(null); }}
            onConfirm={handleDeletePhoto}
            title="Delete Photo Chronicle"
            entityName={selectedPhoto?.caption || "this photo"}
          />
        </main>
      </div>
    </div>
  );
}

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
  const [activeTab, setActiveTab] = useState<"activities" | "highlights" | "chronicles">("activities");

  // --- TAB 1: SEVA ACTIVITIES & DETAIL PAGES STATE ---
  const [activities, setActivities] = useState<any[]>([]);
  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [activitySearch, setActivitySearch] = useState("");
  const [pillarFilter, setPillarFilter] = useState<"all" | "charity" | "sanatana">("all");
  const [deleteActivityModalOpen, setDeleteActivityModalOpen] = useState(false);
  const [selectedActivityForDelete, setSelectedActivityForDelete] = useState<any | null>(null);

  // --- TAB 2: SEVA PHOTO CHRONICLES STATE ---
  const [photos, setPhotos] = useState<any[]>([]);
  const [photosLoading, setPhotosLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("all");

  // --- TAB 3: TOP MOMENTS HIGHLIGHTS STATE ---
  const [highlights, setHighlights] = useState<any[]>([]);
  const [highlightsLoading, setHighlightsLoading] = useState(true);
  const [highlightModalOpen, setHighlightModalOpen] = useState(false);
  const [editingHighlight, setEditingHighlight] = useState<any | null>(null);
  const [hPillar, setHPillar] = useState("charity");
  const [hBadge, setHBadge] = useState("Highlight");
  const [hTitle, setHTitle] = useState("");
  const [hDesc, setHDesc] = useState("");
  const [hUrl, setHUrl] = useState("/images/event-1.png");
  const [hLink, setHLink] = useState("");
  const [hOrder, setHOrder] = useState(1);
  const [hSaving, setHSaving] = useState(false);

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

  // --- FETCH TOP MOMENTS HIGHLIGHTS (TAB 3) ---
  const fetchHighlights = async () => {
    setHighlightsLoading(true);
    try {
      const res = await fetch("/api/admin/highlights");
      if (res.ok) {
        const data = await res.json();
        setHighlights(data.highlights || []);
      }
    } catch (err) {
      console.error("Failed to load highlights:", err);
    } finally {
      setHighlightsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "activities") {
      fetchActivities();
    } else if (activeTab === "highlights") {
      fetchHighlights();
    } else if (activeTab === "chronicles") {
      fetchPhotos();
    }
    // Also fetch highlights right away so count badge and initial data are ready
    if (highlights.length === 0) {
      fetchHighlights();
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
    fetchHighlights();
  };

  const handleMoveActivity = async (ev: any, direction: 'up' | 'down') => {
    const currentIdx = activities.findIndex((a) => (a.id || a.slug) === (ev.id || ev.slug));
    if (currentIdx === -1) return;
    const targetIdx = direction === 'up' ? currentIdx - 1 : currentIdx + 1;
    if (targetIdx < 0 || targetIdx >= activities.length) return;

    const targetEv = activities[targetIdx];
    const orderA = Number(ev.sort_order || currentIdx + 1);
    const orderB = Number(targetEv.sort_order || targetIdx + 1);

    const newOrderA = orderB === orderA ? (direction === 'up' ? orderA - 1 : orderA + 1) : orderB;
    const newOrderB = orderB === orderA ? (direction === 'up' ? orderB + 1 : orderB - 1) : orderA;

    const newActivities = [...activities];
    newActivities[currentIdx] = { ...ev, sort_order: newOrderA };
    newActivities[targetIdx] = { ...targetEv, sort_order: newOrderB };
    newActivities[currentIdx] = newActivities[targetIdx];
    newActivities[targetIdx] = { ...ev, sort_order: newOrderA };
    setActivities(newActivities);

    await fetch("/api/admin/events/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [
          { id: ev.id || ev.slug, sort_order: newOrderA },
          { id: targetEv.id || targetEv.slug, sort_order: newOrderB }
        ]
      })
    });
    fetchActivities();
  };

  const handleOpenHighlightModal = (item?: any) => {
    if (item) {
      setEditingHighlight(item);
      setHPillar(item.pillar || "charity");
      setHBadge(item.badge || "Highlight");
      setHTitle(item.title || "");
      setHDesc(item.description || "");
      setHUrl(item.image_url || "/images/event-1.png");
      setHLink(item.link_url || "");
      setHOrder(item.sort_order || 1);
    } else {
      setEditingHighlight(null);
      setHPillar("charity");
      setHBadge("Anna Daanam");
      setHTitle("New Top Moment Highlight");
      setHDesc("Write a short engaging 2-line summary of this highlight for the public Seva page.");
      setHUrl("/images/event-1.png");
      setHLink("/sevas");
      setHOrder(highlights.length + 1);
    }
    setHighlightModalOpen(true);
  };

  const handleSaveHighlight = async (e: React.FormEvent) => {
    e.preventDefault();
    setHSaving(true);
    try {
      const method = editingHighlight ? "PUT" : "POST";
      const res = await fetch("/api/admin/highlights", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingHighlight?.id,
          pillar: hPillar,
          badge: hBadge,
          title: hTitle,
          description: hDesc,
          image_url: hUrl,
          link_url: hLink,
          sort_order: hOrder,
        }),
      });
      if (res.ok) {
        setHighlightModalOpen(false);
        fetchHighlights();
      }
    } finally {
      setHSaving(false);
    }
  };

  const handleDeleteHighlight = async (id: number) => {
    if (!confirm("Are you sure you want to delete this highlight card?")) return;
    await fetch(`/api/admin/highlights?id=${id}`, { method: "DELETE" });
    fetchHighlights();
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

  const handleDeleteActivity = async () => {
    if (!selectedActivityForDelete) return;
    try {
      const res = await fetch(`/api/admin/events/${selectedActivityForDelete.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDeleteActivityModalOpen(false);
        setSelectedActivityForDelete(null);
        fetchActivities();
      } else {
        const err = await res.json().catch(() => ({}));
        alert(err.error || "Failed to delete activity");
      }
    } catch (err) {
      console.error("Failed to delete activity:", err);
      alert("Failed to delete activity");
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
                <Sparkles size={13} /> Complete Sevas Management
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-heading">
                Sevas Page & Visual Chronicles
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
              ) : activeTab === "highlights" ? (
                <button
                  onClick={() => handleOpenHighlightModal()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8a5000] hover:bg-[#6e4000] text-white font-semibold text-sm shadow-sm transition-colors cursor-pointer"
                >
                  <PlusCircle size={18} />
                  <span>+ Add Highlight Card</span>
                </button>
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
              onClick={() => setActiveTab("highlights")}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-t-xl font-bold text-sm transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                activeTab === "highlights"
                  ? "bg-white border-[#8a5000] text-[#8a5000] shadow-sm"
                  : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100/60"
              }`}
            >
              <Sparkles size={17} className={activeTab === "highlights" ? "text-[#8a5000]" : "text-gray-400"} />
              <span>2. Top Moments Highlights Grid</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${activeTab === "highlights" ? "bg-[#8a5000]/15 text-[#8a5000]" : "bg-gray-200 text-gray-600"}`}>
                {highlights.length || 6}
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
              <span>3. Standalone Photo Chronicles Grid</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${activeTab === "chronicles" ? "bg-[#8a5000]/15 text-[#8a5000]" : "bg-gray-200 text-gray-600"}`}>
                {photos.length}
              </span>
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
                  {filteredActivities.map((act, idx) => {
                    const isSanatana =
                      act.category === "Sanatana Dharma" ||
                      act.category === "Temple Heritage" ||
                      act.category === "Vedic Heritage";

                    return (
                      <div
                        key={`${act.id || act.slug}-${idx}`}
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

                          {/* Reordering Controls */}
                          <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-xl border border-gray-200/80 text-xs">
                            <span className="font-semibold text-gray-700 flex items-center gap-1.5">
                              <Layers size={13} className="text-[#8a5000]" />
                              Order #{act.sort_order || idx + 1}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleMoveActivity(act, 'up')}
                                disabled={idx === 0}
                                title="Move Up on Seva Page"
                                className="px-2.5 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-gray-700 shadow-sm transition-all active:scale-95"
                              >
                                ▲ Move Up
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMoveActivity(act, 'down')}
                                disabled={idx === filteredActivities.length - 1}
                                title="Move Down on Seva Page"
                                className="px-2.5 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-gray-700 shadow-sm transition-all active:scale-95"
                              >
                                ▼ Move Down
                              </button>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                            <Link
                              href={`/admin/gallery/${act.id}/edit`}
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
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedActivityForDelete(act);
                                setDeleteActivityModalOpen(true);
                              }}
                              title="Delete Seva Activity & Detail Page"
                              className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer shadow-sm"
                            >
                              <Trash2 size={15} />
                            </button>
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
              TAB 2: TOP MOMENTS HIGHLIGHTS GRID (CHARITY & SANATANA DHARMA)
             ========================================================================= */}
          {activeTab === "highlights" && (
            <div className="space-y-8">
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 text-sm text-gray-800">
                <h3 className="font-bold text-base text-[#8a5000] mb-1 flex items-center gap-2">
                  <Sparkles size={18} /> Manage Top Highlights Section (Moments of Seva & Celebration)
                </h3>
                <p className="text-gray-600">
                  These cards appear at the very top of each category section on the public Sevas page (<strong className="text-gray-900">Charity & Welfare</strong> and <strong className="text-gray-900">Sanatana Dharma</strong>). Click any card below to upload high-resolution Cloudinary photos or change badges and writeups.
                </p>
              </div>

              {highlightsLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-[#8a5000]">
                  <Loader2 size={32} className="animate-spin mb-3" />
                  <span>Loading highlights...</span>
                </div>
              ) : (
                <div className="space-y-10">
                  {/* Pillar 1 Highlights */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[#00322B] flex items-center gap-2 border-b border-gray-200 pb-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#00322B] text-[#FFD27F] text-xs uppercase font-extrabold">Pillar 1</span>
                      <span>Charity & Community Welfare Highlights</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {(highlights.filter(h => h.pillar === "charity" || !h.pillar).length > 0 ? highlights.filter(h => h.pillar === "charity" || !h.pillar) : [
                        { id: 1, pillar: "charity", badge: "Welfare Drives", title: "Providing meal and food carriers to Govt Home Children", description: "Providing nutritious meals and food carriers to the children of Annai Sathiya District Government Home as part of a social welfare and community support initiative.", image_url: "https://res.cloudinary.com/woo94xq2/image/upload/v1783997211/dhara_foundations/activities/meal-food-carriers-govt-home/img_1.jpg", link_url: "/sevas/meal-food-carriers-govt-home" },
                        { id: 2, pillar: "charity", badge: "Welfare Drives", title: "In Tribal welfare activities at Javadhu hills", description: "Conducting tribal welfare activities in Javadhu Hills as part of a social development and community upliftment initiative aimed at improving the living conditions of tribal communities.", image_url: "https://res.cloudinary.com/woo94xq2/image/upload/v1783997186/dhara_foundations/activities/tribal-welfare-javadhu-hills/img_1.jpg", link_url: "/sevas/tribal-welfare-javadhu-hills" },
                        { id: 3, pillar: "charity", badge: "Women's Empowerment", title: "In Digitisation activities for Women Self Help Group society", description: "Conducting digitisation activities for Women Self Help Group societies as part of a community empowerment initiative aimed at improving digital literacy and financial inclusion.", image_url: "https://res.cloudinary.com/woo94xq2/image/upload/v1783997177/dhara_foundations/activities/digitisation-activities-wshg/img_1.jpg", link_url: "/sevas/digitisation-activities-wshg" }
                      ]).map((h) => (
                        <div key={h.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                          <div className="relative h-48 bg-gray-100 overflow-hidden">
                            <img src={h.image_url} alt={h.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end text-white">
                              <span className="text-[11px] font-mono font-bold text-[#FFD27F] uppercase">{h.badge}</span>
                              <h4 className="font-bold text-base line-clamp-1">{h.title}</h4>
                            </div>
                          </div>
                          <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                            <p className="text-xs text-gray-600 line-clamp-2">{h.description}</p>
                            <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
                              <button
                                onClick={() => handleOpenHighlightModal(h)}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#8a5000] hover:bg-[#6e4000] text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
                              >
                                <Edit2 size={13} />
                                <span>Edit Card</span>
                              </button>
                              <button
                                onClick={() => handleDeleteHighlight(h.id)}
                                className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pillar 2 Highlights */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[#8a5000] flex items-center gap-2 border-b border-gray-200 pb-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#8a5000] text-white text-xs uppercase font-extrabold">Pillar 2</span>
                      <span>Sanatana Dharma & Temples Highlights</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {(highlights.filter(h => h.pillar === "sanatana_dharma").length > 0 ? highlights.filter(h => h.pillar === "sanatana_dharma") : [
                        { id: 4, pillar: "sanatana_dharma", badge: "Sanatana Dharma", title: "Masi Pournami Maha Girivalam", description: "A religious awareness procession organized to promote the Masi Pournami Maha Girivalam at Thirupparankundram with devotees and spiritual devotion.", image_url: "/images/events/masi-pournami-girivalam.jpg", link_url: "/sevas/masi-pournami-girivalam" },
                        { id: 5, pillar: "sanatana_dharma", badge: "Sanatana Dharma", title: "Brindavana Kumbabhishekam ceremony", description: "The Maha Kumbabhishekam Vaibhavam of Shri Raghavendra Swamigal Dakshina Bikshalaya Brindavanam celebrated in a grand spiritual manner at Anaikuppam, Cuddalore.", image_url: "/images/events/brindavana-kumbabhishekam.jpg", link_url: "/sevas/brindavana-kumbabhishekam" },
                        { id: 6, pillar: "sanatana_dharma", badge: "Sanatana Dharma", title: "Devotional offering presented to the temple", description: "As a mark of faith and devotion, the Kodai was respectfully presented to the temple as a devotional contribution symbolizing spiritual dedication and support.", image_url: "/images/events/devotional-offering-kodai.jpg", link_url: "/sevas/devotional-offering-kodai" }
                      ]).map((h) => (
                        <div key={h.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                          <div className="relative h-48 bg-gray-100 overflow-hidden">
                            <img src={h.image_url} alt={h.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end text-white">
                              <span className="text-[11px] font-mono font-bold text-amber-300 uppercase">{h.badge}</span>
                              <h4 className="font-bold text-base line-clamp-1">{h.title}</h4>
                            </div>
                          </div>
                          <div className="p-4 flex-1 flex flex-col justify-between gap-4">
                            <p className="text-xs text-gray-600 line-clamp-2">{h.description}</p>
                            <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-100">
                              <button
                                onClick={() => handleOpenHighlightModal(h)}
                                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#8a5000] hover:bg-[#6e4000] text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
                              >
                                <Edit2 size={13} />
                                <span>Edit Card</span>
                              </button>
                              <button
                                onClick={() => handleDeleteHighlight(h.id)}
                                className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =========================================================================
              TAB 3: SEVA PHOTO CHRONICLES (STANDALONE PHOTO ARCHIVE GRID)
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

          {/* Highlight Modal */}
          {highlightModalOpen && (
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
              <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto border border-gray-100">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
                  <h3 className="font-bold text-base text-gray-900 flex items-center gap-2 font-heading">
                    <Sparkles className="text-[#8a5000]" size={18} />
                    {editingHighlight ? "Edit Highlight Card" : "New Highlight Card"}
                  </h3>
                  <button onClick={() => setHighlightModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <X size={18} />
                  </button>
                </div>

                <form onSubmit={handleSaveHighlight} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Target Pillar Section
                    </label>
                    <select
                      value={hPillar}
                      onChange={(e) => setHPillar(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-200 bg-white font-medium text-gray-800 focus:outline-none focus:border-[#8a5000]"
                    >
                      <option value="charity">Pillar 1: Charity & Community Welfare</option>
                      <option value="sanatana_dharma">Pillar 2: Sanatana Dharma & Temples</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Badge Text (e.g., Anna Daanam, Spiritual Service)
                    </label>
                    <input
                      type="text"
                      required
                      value={hBadge}
                      onChange={(e) => setHBadge(e.target.value)}
                      placeholder="e.g. Anna Daanam"
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Main Title
                    </label>
                    <input
                      type="text"
                      required
                      value={hTitle}
                      onChange={(e) => setHTitle(e.target.value)}
                      placeholder="e.g. Anna Daanam Mega Food Drive"
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      2-Line Summary Description
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={hDesc}
                      onChange={(e) => setHDesc(e.target.value)}
                      placeholder="Short description..."
                      className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Card Photo (Cloudinary Image)
                    </label>
                    <ImageUploader
                      value={hUrl}
                      onChange={(url) => setHUrl(url)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Link URL (Optional)
                      </label>
                      <input
                        type="text"
                        value={hLink}
                        onChange={(e) => setHLink(e.target.value)}
                        placeholder="e.g. /sevas/slug"
                        className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Sort Order Position
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={hOrder}
                        onChange={(e) => setHOrder(Number(e.target.value))}
                        className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setHighlightModalOpen(false)}
                      className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={hSaving}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#8a5000] hover:bg-[#6e4000] text-white text-xs font-bold shadow-sm"
                    >
                      {hSaving ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                      <span>{editingHighlight ? "Save Changes" : "Create Highlight"}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Delete Seva Activity Modal */}
          <DeleteConfirmDialog
            isOpen={deleteActivityModalOpen}
            onClose={() => { setDeleteActivityModalOpen(false); setSelectedActivityForDelete(null); }}
            onConfirm={handleDeleteActivity}
            title="Delete Seva Activity & Detail Page"
            entityName={selectedActivityForDelete?.title || "this Seva activity"}
          />

          {/* Delete Photo Chronicle Modal */}
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

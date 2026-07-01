"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ImageUploader } from "./ImageUploader";
import { GalleryUploader } from "./GalleryUploader";
import type { GalleryItem } from "./ImageUploader";
import { validateCoordinates } from "@/utils/validateCoords";
import {
  Save,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Loader2,
  MapPin,
  Share2,
  Globe,
  Settings2,
} from "lucide-react";

export interface EventFormData {
  id?: string;
  title: string;
  event_date: string;
  event_time: string;
  location_name: string;
  latitude?: string | number | null;
  longitude?: string | number | null;
  cover_image_url: string;
  short_description?: string;
  full_description?: string;
  category?: string;
  show_register_btn?: boolean;
  cta_label?: string;
  enable_social_share?: boolean;
  twitter_share_url?: string;
  facebook_share_url?: string;
  pinterest_share_url?: string;
  instagram_share_url?: string;
  status: "draft" | "published";
  meta_title?: string;
  meta_description?: string;
  gallery_images?: GalleryItem[];
}

interface EventFormProps {
  initialData?: EventFormData;
  isEdit?: boolean;
}

export function EventForm({ initialData, isEdit = false }: EventFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<EventFormData>({
    title: initialData?.title || "",
    event_date: initialData?.event_date || new Date().toISOString().split("T")[0],
    event_time: initialData?.event_time || "09:00",
    location_name: initialData?.location_name || "",
    latitude: initialData?.latitude || "",
    longitude: initialData?.longitude || "",
    cover_image_url: initialData?.cover_image_url || "",
    short_description: initialData?.short_description || "",
    full_description: initialData?.full_description || "",
    category: initialData?.category || "Welfare Drives",
    show_register_btn: initialData?.show_register_btn ?? true,
    cta_label: initialData?.cta_label || "Register Yourself",
    enable_social_share: initialData?.enable_social_share ?? false,
    twitter_share_url: initialData?.twitter_share_url || "",
    facebook_share_url: initialData?.facebook_share_url || "",
    pinterest_share_url: initialData?.pinterest_share_url || "",
    instagram_share_url: initialData?.instagram_share_url || "",
    status: initialData?.status || "draft",
    meta_title: initialData?.meta_title || "",
    meta_description: initialData?.meta_description || "",
    gallery_images: initialData?.gallery_images || [],
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState<string>("All changes saved");
  const [seoOpen, setSeoOpen] = useState(false);

  const DEFAULT_CATEGORIES = ["Welfare Drives", "Awards & Recognition", "Women's Empowerment", "Children & Education", "Healthcare & Nutrition", "General"];
  const [customCategories, setCustomCategories] = useState<string[]>(() => {
    if (initialData?.category && !DEFAULT_CATEGORIES.includes(initialData.category)) {
      return [initialData.category];
    }
    return [];
  });
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState("");

  // Auto-save draft every 60 seconds
  const handleSave = useCallback(async (targetStatus?: "draft" | "published", isAutoSave = false) => {
    if (!formData.title || !formData.event_date || !formData.event_time || !formData.location_name || !formData.cover_image_url) {
      if (!isAutoSave) {
        setError("Please fill in required fields: Title, Date, Time, Location, Cover Image.");
      }
      return;
    }

    const latNum = formData.latitude !== "" && formData.latitude !== null && formData.latitude !== undefined ? Number(formData.latitude) : null;
    const lngNum = formData.longitude !== "" && formData.longitude !== null && formData.longitude !== undefined ? Number(formData.longitude) : null;
    const coordCheck = validateCoordinates(latNum, lngNum);
    if (!coordCheck.valid) {
      if (!isAutoSave) setError(coordCheck.error || "Invalid coordinates");
      return;
    }

    if (!isAutoSave) setSaving(true);
    if (isAutoSave) setAutoSaveStatus("Auto-saving...");
    setError(null);

    const payload = {
      ...formData,
      status: targetStatus || formData.status,
      latitude: latNum,
      longitude: lngNum,
    };

    try {
      const url = isEdit && initialData?.id ? `/api/admin/events/${initialData.id}` : `/api/admin/events`;
      const method = isEdit && initialData?.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save event");

      if (isAutoSave) {
        setAutoSaveStatus(`Draft auto-saved at ${new Date().toLocaleTimeString()}`);
      } else {
        router.push("/admin/events");
        router.refresh();
      }
    } catch (err: any) {
      if (!isAutoSave) setError(err.message || "Failed to save event");
      if (isAutoSave) setAutoSaveStatus("Auto-save failed");
    } finally {
      if (!isAutoSave) setSaving(false);
    }
  }, [formData, isEdit, initialData, router]);

  useEffect(() => {
    const timer = setInterval(() => {
      // Auto save as draft if title and cover exist
      if (formData.title && formData.cover_image_url) {
        handleSave("draft", true);
      }
    }, 60000); // 60s
    return () => clearInterval(timer);
  }, [formData.title, formData.cover_image_url, handleSave]);

  return (
    <div className="space-y-8 max-w-5xl pb-24">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Events</span>
        </button>
        <span className="text-xs font-medium text-gray-400">{autoSaveStatus}</span>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-center gap-2">
          <AlertCircle size={18} className="shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Form Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols — Core details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Basic Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
              Event Details
            </h2>

            {/* Title */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Event Title <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-gray-400">
                  {formData.title.length} / 200
                </span>
              </div>
              <input
                type="text"
                required
                maxLength={200}
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Dhara Divine Awards 2026"
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8a5000]/20 focus:border-[#8a5000]"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Category
              </label>
              {isCreatingCategory ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    autoFocus
                    placeholder="Enter new category name..."
                    value={newCategoryInput}
                    onChange={(e) => setNewCategoryInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (newCategoryInput.trim()) {
                          if (!customCategories.includes(newCategoryInput.trim())) {
                            setCustomCategories((prev) => [...prev, newCategoryInput.trim()]);
                          }
                          setFormData({ ...formData, category: newCategoryInput.trim() });
                          setIsCreatingCategory(false);
                          setNewCategoryInput("");
                        }
                      }
                    }}
                    className="flex-1 px-3.5 py-2 text-sm rounded-lg border-2 border-[#8a5000] bg-white focus:outline-none shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newCategoryInput.trim()) {
                        if (!customCategories.includes(newCategoryInput.trim())) {
                          setCustomCategories((prev) => [...prev, newCategoryInput.trim()]);
                        }
                        setFormData({ ...formData, category: newCategoryInput.trim() });
                        setIsCreatingCategory(false);
                        setNewCategoryInput("");
                      }
                    }}
                    className="px-3.5 py-2 rounded-lg bg-[#8a5000] hover:bg-[#6e4000] text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingCategory(false);
                      setNewCategoryInput("");
                    }}
                    className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-colors shrink-0 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <select
                  value={formData.category}
                  onChange={(e) => {
                    if (e.target.value === "__CREATE_NEW__") {
                      setIsCreatingCategory(true);
                    } else {
                      setFormData({ ...formData, category: e.target.value });
                    }
                  }}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-[#8a5000]"
                >
                  {DEFAULT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  {customCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="__CREATE_NEW__" className="font-bold text-[#8a5000]">
                    + Create New Category...
                  </option>
                </select>
              )}
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                  Event Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.event_date}
                  onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                  Event Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  required
                  value={formData.event_time}
                  onChange={(e) => setFormData({ ...formData, event_time: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                />
              </div>
            </div>

            {/* Location Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Location Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={formData.location_name}
                  onChange={(e) => setFormData({ ...formData, location_name: e.target.value })}
                  placeholder="e.g. Chetpet, Chennai or Cuddalore District"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                />
              </div>
            </div>

            {/* Lat / Lng */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                  Latitude (-90 to 90)
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.latitude || ""}
                  onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                  placeholder="e.g. 13.0714"
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                  Longitude (-180 to 180)
                </label>
                <input
                  type="number"
                  step="any"
                  value={formData.longitude || ""}
                  onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                  placeholder="e.g. 80.2417"
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Descriptions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
              Description & Content
            </h2>

            {/* Short Description */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">
                  Short Excerpt / Summary
                </label>
                <span className="text-[11px] text-gray-400">
                  {(formData.short_description || "").length} / 300
                </span>
              </div>
              <textarea
                rows={3}
                maxLength={300}
                value={formData.short_description || ""}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                placeholder="Brief 1-2 sentence summary displayed on event cards..."
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
              />
            </div>

            {/* Full Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Full Description (HTML / Rich Text)
              </label>
              <textarea
                rows={8}
                value={formData.full_description || ""}
                onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
                placeholder="<p>Detailed explanation of the event, itinerary, impact, and beneficiaries...</p>"
                className="w-full px-3.5 py-2.5 text-sm font-mono rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
              />
            </div>
          </div>

          {/* Card 3: Gallery */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">
              Event Photo Gallery
            </h2>
            <GalleryUploader
              items={formData.gallery_images || []}
              onChange={(items) => setFormData({ ...formData, gallery_images: items })}
            />
          </div>
        </div>

        {/* Right Col — Settings & Media */}
        <div className="space-y-6">
          {/* Cover Image */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <ImageUploader
              label="Cover Image *"
              value={formData.cover_image_url}
              onChange={(url) => setFormData({ ...formData, cover_image_url: url })}
              helperText="Displayed as hero cover and listing thumbnail"
            />
          </div>

          {/* CTA & Registration */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Settings2 size={16} className="text-[#8a5000]" />
              <span>Registration CTA</span>
            </h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.show_register_btn}
                onChange={(e) => setFormData({ ...formData, show_register_btn: e.target.checked })}
                className="w-4 h-4 text-[#8a5000] rounded border-gray-300 focus:ring-[#8a5000]"
              />
              <span className="text-xs font-medium text-gray-700">Enable Register Button</span>
            </label>
            {formData.show_register_btn && (
              <div>
                <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">
                  Button Label
                </label>
                <input
                  type="text"
                  value={formData.cta_label || "Register Yourself"}
                  onChange={(e) => setFormData({ ...formData, cta_label: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                />
              </div>
            )}
          </div>

          {/* Social Share */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              <Share2 size={16} className="text-[#8a5000]" />
              <span>Social Media Share Links</span>
            </h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.enable_social_share}
                onChange={(e) => setFormData({ ...formData, enable_social_share: e.target.checked })}
                className="w-4 h-4 text-[#8a5000] rounded border-gray-300 focus:ring-[#8a5000]"
              />
              <span className="text-xs font-medium text-gray-700">Show Social Share Icons</span>
            </label>
            {formData.enable_social_share && (
              <div className="space-y-2 pt-2">
                <input
                  type="url"
                  placeholder="Twitter URL"
                  value={formData.twitter_share_url || ""}
                  onChange={(e) => setFormData({ ...formData, twitter_share_url: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                />
                <input
                  type="url"
                  placeholder="Facebook URL"
                  value={formData.facebook_share_url || ""}
                  onChange={(e) => setFormData({ ...formData, facebook_share_url: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                />
                <input
                  type="url"
                  placeholder="Instagram URL"
                  value={formData.instagram_share_url || ""}
                  onChange={(e) => setFormData({ ...formData, instagram_share_url: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs rounded border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                />
              </div>
            )}
          </div>

          {/* SEO Collapsible */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <button
              type="button"
              onClick={() => setSeoOpen(!seoOpen)}
              className="w-full flex items-center justify-between text-sm font-bold text-gray-900"
            >
              <span className="flex items-center gap-2">
                <Globe size={16} className="text-[#8a5000]" />
                <span>SEO Metadata</span>
              </span>
              <span className="text-xs font-normal text-gray-400">
                {seoOpen ? "Hide" : "Expand"}
              </span>
            </button>
            {seoOpen && (
              <div className="space-y-3 pt-4 border-t border-gray-100 mt-3">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={formData.meta_title || ""}
                    onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                    placeholder={formData.title}
                    className="w-full px-3 py-2 text-xs rounded border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">
                    Meta Description
                  </label>
                  <textarea
                    rows={2}
                    value={formData.meta_description || ""}
                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                    placeholder={formData.short_description}
                    className="w-full px-3 py-2 text-xs rounded border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 lg:left-60 right-0 z-40 bg-white border-t border-gray-200 px-6 py-4 shadow-lg flex items-center justify-between">
        <div className="text-xs text-gray-500 hidden sm:block">
          Ensure all required fields marked with <span className="text-red-500">*</span> are filled.
        </div>
        <div className="flex items-center gap-3 ml-auto">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave("draft")}
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-[#fbf9f4] transition-colors disabled:opacity-50"
          >
            Save as Draft
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSave("published")}
            className="px-6 py-2 rounded-xl bg-[#8a5000] hover:bg-[#6e4000] text-white font-semibold text-sm shadow-md shadow-[#8a5000]/20 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Publish Event
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

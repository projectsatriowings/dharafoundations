"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUploader } from "./ImageUploader";
import { Save, AlertCircle, ArrowLeft, Loader2, Globe } from "lucide-react";

export function NewsForm({ initialData, isEdit = false }: { initialData?: any; isEdit?: boolean }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    headline: initialData?.headline || "",
    publish_date: initialData?.publish_date || new Date().toISOString().split("T")[0],
    read_time_minutes: initialData?.read_time_minutes || 3,
    excerpt: initialData?.excerpt || "",
    body_content: initialData?.body_content || "",
    featured_image_url: initialData?.featured_image_url || "",
    is_external: initialData?.is_external ?? false,
    external_url: initialData?.external_url || "",
    status: initialData?.status || "draft",
    meta_title: initialData?.meta_title || "",
    meta_description: initialData?.meta_description || "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (targetStatus: "draft" | "published") => {
    if (!formData.headline || !formData.publish_date || !formData.featured_image_url) {
      setError("Please provide headline, publish date, and featured image.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const url = isEdit ? `/api/admin/news/${initialData.id}` : `/api/admin/news`;
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, status: targetStatus }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save news article");

      router.push("/admin/news");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl pb-24">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft size={16} />
        <span>Back to News & Media</span>
      </button>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-center gap-2">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
            <h2 className="text-base font-bold text-gray-900 border-b pb-2">Article Details</h2>
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Headline *</label>
              <input
                type="text"
                required
                value={formData.headline}
                onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Publish Date *</label>
                <input
                  type="date"
                  required
                  value={formData.publish_date}
                  onChange={(e) => setFormData({ ...formData, publish_date: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Read Time (Mins)</label>
                <input
                  type="number"
                  value={formData.read_time_minutes}
                  onChange={(e) => setFormData({ ...formData, read_time_minutes: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                />
              </div>
            </div>
            <label className="flex items-center gap-3 pt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_external}
                onChange={(e) => setFormData({ ...formData, is_external: e.target.checked })}
                className="w-4 h-4 text-[#8a5000] rounded border-gray-300"
              />
              <span className="text-xs font-medium text-gray-700">External News Feature (Links away to external publisher)</span>
            </label>
            {formData.is_external && (
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">External Article URL *</label>
                <input
                  type="url"
                  placeholder="https://timesofindia.indiatimes.com/..."
                  value={formData.external_url}
                  onChange={(e) => setFormData({ ...formData, external_url: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Excerpt / Summary</label>
              <textarea
                rows={3}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
              />
            </div>
            {!formData.is_external && (
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Full Article Body (HTML)</label>
                <textarea
                  rows={8}
                  value={formData.body_content}
                  onChange={(e) => setFormData({ ...formData, body_content: e.target.value })}
                  className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-gray-200 focus:outline-none focus:border-[#8a5000]"
                />
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <ImageUploader
              label="Featured Image *"
              value={formData.featured_image_url}
              onChange={(url) => setFormData({ ...formData, featured_image_url: url })}
            />
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 -mx-4 sm:-mx-6 lg:-mx-8 -mb-4 sm:-mb-6 lg:-mb-8 mt-10 bg-white border-t border-gray-200 px-6 py-4 shadow-[0_-4px_15px_rgba(0,0,0,0.08)] flex justify-end gap-3 z-30">
        <button
          type="button"
          disabled={saving}
          onClick={() => handleSave("draft")}
          className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-[#fbf9f4]"
        >
          Save Draft
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={() => handleSave("published")}
          className="px-6 py-2 rounded-xl bg-[#8a5000] text-white text-sm font-semibold hover:bg-[#6e4000] flex items-center gap-2"
        >
          {saving && <Loader2 size={16} className="animate-spin" />}
          Publish Article
        </button>
      </div>
    </div>
  );
}

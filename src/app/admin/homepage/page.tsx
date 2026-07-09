"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { Save, PlusCircle, Trash2, Loader2, Sparkles, Upload, Image as ImageIcon, Video } from "lucide-react";

export default function AdminHomepagePage() {
  const [stats, setStats] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [config, setConfig] = useState({
    hero_image_url: "",
    intro_video_1_url: "",
    intro_video_2_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingGalleryIdx, setUploadingGalleryIdx] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/admin/homepage")
      .then((res) => res.json())
      .then((d) => {
        setStats(d.stats || []);
        if (d.gallery) setGallery(d.gallery);
        if (d.config) {
          setConfig(d.config);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddStat = () => {
    setStats([...stats, { stat_value: "", stat_label: "", sort_order: stats.length }]);
  };

  const handleRemoveStat = (idx: number) => {
    const next = [...stats];
    next.splice(idx, 1);
    setStats(next);
  };

  const handleUpdateStat = (idx: number, field: string, val: any) => {
    const next = [...stats];
    next[idx][field] = val;
    setStats(next);
  };

  const handleAddGalleryItem = () => {
    setGallery([...gallery, { title: "", description: "", image: "", sort_order: gallery.length }]);
  };

  const handleRemoveGalleryItem = (idx: number) => {
    const next = [...gallery];
    next.splice(idx, 1);
    setGallery(next);
  };

  const handleUpdateGalleryItem = (idx: number, field: string, val: any) => {
    const next = [...gallery];
    next[idx][field] = val;
    setGallery(next);
  };

  const handleMoveGalleryItem = (idx: number, direction: "up" | "down") => {
    if (direction === "up" && idx === 0) return;
    if (direction === "down" && idx === gallery.length - 1) return;
    const targetIdx = direction === "up" ? idx - 1 : idx + 1;
    const next = [...gallery];
    const temp = next[idx];
    next[idx] = next[targetIdx];
    next[targetIdx] = temp;
    setGallery(next);
  };

  const handleUploadGalleryImage = async (file: File, idx: number) => {
    setUploadingGalleryIdx(idx);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.url) {
        handleUpdateGalleryItem(idx, "image", data.url);
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (e) {
      alert("Error uploading file");
    } finally {
      setUploadingGalleryIdx(null);
    }
  };

  const handleUploadFile = async (
    file: File,
    field: string,
    setUploading: (val: boolean) => void
  ) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok && data.url) {
        setConfig((prev) => ({ ...prev, [field]: data.url }));
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (e) {
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stats, config, gallery }),
      });
      if (res.ok) {
        setMsg("Home page content (Banner, Impact Counters & Interactive Photo Gallery) saved successfully!");
        setTimeout(() => setMsg(null), 5000);
      } else {
        alert("Failed to save home page settings.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#fbf9f4]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar email="Admin" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Home Page Content Management</h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Customize the live hero banner photograph, impact statistics, and interactive photo gallery showcased on the public Home page.
            </p>
          </div>

          {msg && (
            <div className="p-4 mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-800 font-semibold flex items-center gap-2 shadow-sm animate-fade-in">
              <Sparkles size={18} className="text-emerald-600 shrink-0" />
              <span>{msg}</span>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-20 text-[#8a5000]">
              <Loader2 size={32} className="animate-spin" />
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-8">
              {/* 1. HERO BANNER IMAGE SETTINGS */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-4 mb-6">
                  <ImageIcon size={20} className="text-[#8a5000]" />
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Hero Banner Video / Media</h2>
                    <p className="text-xs text-gray-400">The primary video or image showcased on the right side of the home page hero section.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-5 flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-xl p-3 overflow-hidden">
                    {config.hero_image_url ? (
                      (config.hero_image_url || "").match(/\.(mp4|webm|mov)$/i) || (config.hero_image_url || "").includes("/video/") ? (
                        <video
                          ref={(el) => {
                            if (el) {
                              el.defaultMuted = true;
                              el.muted = true;
                              el.play().catch(() => {});
                            }
                          }}
                          src={config.hero_image_url}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          className="w-full h-48 object-cover rounded-lg shadow-sm bg-black/5"
                        />
                      ) : (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={config.hero_image_url}
                          alt="Hero Banner Preview"
                          className="w-full h-48 object-cover rounded-lg shadow-sm"
                        />
                      )
                    ) : (
                      <div className="h-48 flex items-center justify-center text-xs text-gray-400">No media selected</div>
                    )}
                  </div>

                  <div className="md:col-span-7 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Hero Video / Media URL
                      </label>
                      <input
                        type="text"
                        value={config.hero_image_url}
                        onChange={(e) => setConfig({ ...config, hero_image_url: e.target.value })}
                        placeholder="/videos/banner.mp4 or Cloudinary URL"
                        className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#8a5000] outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Or Upload New Video / Media
                      </label>
                      <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 cursor-pointer transition-all border border-gray-200">
                        {uploadingHero ? <Loader2 size={15} className="animate-spin text-[#8a5000]" /> : <Upload size={15} />}
                        <span>{uploadingHero ? "Uploading..." : "Upload Media (MP4, WEBP, JPG, PNG)"}</span>
                        <input
                          type="file"
                          accept="image/*,video/*"
                          className="hidden"
                          disabled={uploadingHero}
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleUploadFile(e.target.files[0], "hero_image_url", setUploadingHero);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. IMPACT STATISTICS COUNTERS */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Hero Section Numbers & Impact Counters</h2>
                    <p className="text-xs text-gray-400">These numbers display prominently right beneath the main hero headline on the Home page.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddStat}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700"
                  >
                    <PlusCircle size={15} /> Add Number
                  </button>
                </div>

                <div className="space-y-3">
                  {stats.map((st, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 bg-[#fbf9f4] rounded-xl border border-gray-200 items-center">
                      <div className="sm:col-span-4">
                        <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">Number / Value</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 3 or 8+"
                          value={st.stat_value || ""}
                          onChange={(e) => handleUpdateStat(idx, "stat_value", e.target.value)}
                          className="w-full px-3 py-2 text-sm font-bold bg-white border border-gray-200 rounded-lg"
                        />
                      </div>
                      <div className="sm:col-span-6">
                        <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">Label / Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. FOUNDING TRUSTEES"
                          value={st.stat_label || ""}
                          onChange={(e) => handleUpdateStat(idx, "stat_label", e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg"
                        />
                      </div>
                      <div className="sm:col-span-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleRemoveStat(idx)}
                          className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. INTERACTIVE PHOTO GALLERY */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Interactive Photo Gallery</h2>
                    <p className="text-xs text-gray-400">Manage the expandable photo gallery cards displayed on the Home page.</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddGalleryItem}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700"
                  >
                    <PlusCircle size={15} /> Add Gallery Card
                  </button>
                </div>

                <div className="space-y-4">
                  {gallery.map((gItem, idx) => (
                    <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-[#fbf9f4] rounded-xl border border-gray-200 items-center">
                      <div className="md:col-span-3 flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg p-2 h-28 overflow-hidden relative group">
                        {gItem.image || gItem.image_url ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={gItem.image || gItem.image_url}
                            alt={gItem.title || "Gallery Preview"}
                            className="w-full h-full object-cover rounded"
                          />
                        ) : (
                          <div className="text-xs text-gray-400">No Image</div>
                        )}
                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold cursor-pointer transition-opacity">
                          {uploadingGalleryIdx === idx ? <Loader2 size={16} className="animate-spin" /> : "Upload Image"}
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={uploadingGalleryIdx === idx}
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleUploadGalleryImage(e.target.files[0], idx);
                              }
                            }}
                          />
                        </label>
                      </div>

                      <div className="md:col-span-7 space-y-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">Card Title</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Spiritualism"
                              value={gItem.title || ""}
                              onChange={(e) => handleUpdateGalleryItem(idx, "title", e.target.value)}
                              className="w-full px-3 py-1.5 text-sm font-bold bg-white border border-gray-200 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">Image URL</label>
                            <input
                              type="text"
                              required
                              placeholder="/images/gallery-1.png or URL"
                              value={gItem.image || gItem.image_url || ""}
                              onChange={(e) => handleUpdateGalleryItem(idx, "image", e.target.value)}
                              className="w-full px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">Caption / Subtitle</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Ceremony with spiritual leaders in saffron robes"
                            value={gItem.description || ""}
                            onChange={(e) => handleUpdateGalleryItem(idx, "description", e.target.value)}
                            className="w-full px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2 flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleMoveGalleryItem(idx, "up")}
                          disabled={idx === 0}
                          className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-30"
                          title="Move Up"
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveGalleryItem(idx, "down")}
                          disabled={idx === gallery.length - 1}
                          className="p-2 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-30"
                          title="Move Down"
                        >
                          ↓
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryItem(idx)}
                          className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors ml-1"
                          title="Delete Card"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {gallery.length === 0 && (
                    <div className="text-center py-6 text-sm text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                      No gallery cards yet. Click &quot;Add Gallery Card&quot; above to create one.
                    </div>
                  )}
                </div>
              </div>

              {/* MASTER SAVE BUTTON */}
              <div className="pt-2 sticky bottom-4 flex justify-end z-20">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-8 py-3 rounded-xl bg-[#8a5000] hover:bg-[#6e4000] text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center gap-2"
                >
                  {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  <span>Save All Home Page Content</span>
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}

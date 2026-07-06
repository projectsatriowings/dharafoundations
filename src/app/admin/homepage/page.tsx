"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { Save, PlusCircle, Trash2, Loader2, Sparkles, Upload, Image as ImageIcon, Video } from "lucide-react";

export default function AdminHomepagePage() {
  const [stats, setStats] = useState<any[]>([]);
  const [config, setConfig] = useState({
    hero_image_url: "",
    intro_video_1_url: "",
    intro_video_2_url: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingV1, setUploadingV1] = useState(false);
  const [uploadingV2, setUploadingV2] = useState(false);

  useEffect(() => {
    fetch("/api/admin/homepage")
      .then((res) => res.json())
      .then((d) => {
        setStats(d.stats || []);
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
        body: JSON.stringify({ stats, config }),
      });
      if (res.ok) {
        setMsg("Home page content (Banner, Videos & Numbers) saved successfully!");
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
              Customize the live hero banner photograph, floating introduction videos, and impact statistics displayed on the public Home page.
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
                    <h2 className="text-base font-bold text-gray-900">Hero Banner Photograph</h2>
                    <p className="text-xs text-gray-400">The primary image showcased on the right side of the home page hero section.</p>
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
                        Hero Image URL
                      </label>
                      <input
                        type="text"
                        value={config.hero_image_url}
                        onChange={(e) => setConfig({ ...config, hero_image_url: e.target.value })}
                        placeholder="/images/about.png or Cloudinary URL"
                        className="w-full px-3.5 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:bg-white focus:ring-2 focus:ring-[#8a5000] outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Or Upload New Image
                      </label>
                      <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 cursor-pointer transition-all border border-gray-200">
                        {uploadingHero ? <Loader2 size={15} className="animate-spin text-[#8a5000]" /> : <Upload size={15} />}
                        <span>{uploadingHero ? "Uploading..." : "Upload Media (JPG, PNG, WEBP, MP4)"}</span>
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

              {/* 2. FLOATING INTRO VIDEOS SETTINGS */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-4 mb-6">
                  <Video size={20} className="text-[#8a5000]" />
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Floating Video Popup Clips</h2>
                    <p className="text-xs text-gray-400">Configure the sequential video clips playing inside the home page picture-in-picture window.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Video 1 */}
                  <div className="p-4 bg-[#fbf9f4] rounded-xl border border-gray-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                        Clip 1 — First Video URL
                      </label>
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-xs font-semibold text-gray-700 cursor-pointer shadow-2xs">
                        {uploadingV1 ? <Loader2 size={13} className="animate-spin text-[#8a5000]" /> : <Upload size={13} />}
                        <span>{uploadingV1 ? "Uploading..." : "Upload Video File"}</span>
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          disabled={uploadingV1}
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleUploadFile(e.target.files[0], "intro_video_1_url", setUploadingV1);
                            }
                          }}
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={config.intro_video_1_url}
                      onChange={(e) => setConfig({ ...config, intro_video_1_url: e.target.value })}
                      placeholder="https://res.cloudinary.com/..."
                      className="w-full px-3.5 py-2 text-sm bg-white border border-gray-300 rounded-lg font-mono text-xs focus:ring-2 focus:ring-[#8a5000] outline-none"
                    />
                  </div>

                  {/* Video 2 */}
                  <div className="p-4 bg-[#fbf9f4] rounded-xl border border-gray-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                        Clip 2 — Second Video URL
                      </label>
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-300 hover:bg-gray-50 text-xs font-semibold text-gray-700 cursor-pointer shadow-2xs">
                        {uploadingV2 ? <Loader2 size={13} className="animate-spin text-[#8a5000]" /> : <Upload size={13} />}
                        <span>{uploadingV2 ? "Uploading..." : "Upload Video File"}</span>
                        <input
                          type="file"
                          accept="video/*"
                          className="hidden"
                          disabled={uploadingV2}
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleUploadFile(e.target.files[0], "intro_video_2_url", setUploadingV2);
                            }
                          }}
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      value={config.intro_video_2_url}
                      onChange={(e) => setConfig({ ...config, intro_video_2_url: e.target.value })}
                      placeholder="https://res.cloudinary.com/..."
                      className="w-full px-3.5 py-2 text-sm bg-white border border-gray-300 rounded-lg font-mono text-xs focus:ring-2 focus:ring-[#8a5000] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 3. IMPACT STATISTICS COUNTERS */}
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

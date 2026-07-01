"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { Save, Loader2, Sparkles, Phone, Mail, MapPin, Globe } from "lucide-react";

export default function AdminSettingsPage() {
  const [form, setForm] = useState({
    phone: "",
    email_info: "",
    email_president: "",
    email_trustee: "",
    email_general: "",
    address: "",
    twitter_url: "",
    facebook_url: "",
    instagram_url: "",
    youtube_url: "",
    meta_title_suffix: "",
    default_meta_desc: "",
    maintenance_mode: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((d) => {
        if (d.settings) setForm(d.settings);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMsg("Site settings updated successfully!");
        setTimeout(() => setMsg(null), 4000);
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
            <h1 className="text-2xl font-bold text-gray-900">Site Settings & Configurations</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage global contact numbers, trust emails, address, and social media handles.</p>
          </div>

          {msg && (
            <div className="p-4 mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-800 font-semibold flex items-center gap-2">
              <Sparkles size={18} className="text-emerald-600" />
              <span>{msg}</span>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-20 text-[#8a5000]">
              <Loader2 size={32} className="animate-spin" />
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-6 pb-12">
              <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4 shadow-sm">
                <h2 className="text-base font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                  <Phone size={18} className="text-[#8a5000]" />
                  <span>Official Contact Details</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Phone Number</label>
                    <input type="text" value={form.phone || ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">General Info Email</label>
                    <input type="email" value={form.email_info || ""} onChange={(e) => setForm({ ...form, email_info: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Registered Trust Address</label>
                  <textarea rows={2} value={form.address || ""} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4 shadow-sm">
                <h2 className="text-base font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                  <Mail size={18} className="text-[#8a5000]" />
                  <span>Leadership Email Addresses</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">President Email</label>
                    <input type="email" value={form.email_president || ""} onChange={(e) => setForm({ ...form, email_president: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Trustee Email</label>
                    <input type="email" value={form.email_trustee || ""} onChange={(e) => setForm({ ...form, email_trustee: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">General Enquiries Email</label>
                    <input type="email" value={form.email_general || ""} onChange={(e) => setForm({ ...form, email_general: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4 shadow-sm">
                <h2 className="text-base font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                  <Globe size={18} className="text-[#8a5000]" />
                  <span>Social Media URLs</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Facebook Handle URL</label>
                    <input type="url" placeholder="https://facebook.com/..." value={form.facebook_url || ""} onChange={(e) => setForm({ ...form, facebook_url: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Instagram Handle URL</label>
                    <input type="url" placeholder="https://instagram.com/..." value={form.instagram_url || ""} onChange={(e) => setForm({ ...form, instagram_url: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">Twitter / X URL</label>
                    <input type="url" placeholder="https://twitter.com/..." value={form.twitter_url || ""} onChange={(e) => setForm({ ...form, twitter_url: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-700 mb-1">YouTube Channel URL</label>
                    <input type="url" placeholder="https://youtube.com/..." value={form.youtube_url || ""} onChange={(e) => setForm({ ...form, youtube_url: e.target.value })} className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#8a5000] hover:bg-[#6e4000] text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  <span>Save All Settings</span>
                </button>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
}

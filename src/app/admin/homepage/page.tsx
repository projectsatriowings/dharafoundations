"use client";

import React, { useState, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { Save, PlusCircle, Trash2, Loader2, Sparkles, AlertCircle } from "lucide-react";

export default function AdminHomepagePage() {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/homepage")
      .then((res) => res.json())
      .then((d) => setStats(d.stats || []))
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

  const handleUpdate = (idx: number, field: string, val: any) => {
    const next = [...stats];
    next[idx][field] = val;
    setStats(next);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stats }),
      });
      if (res.ok) {
        setMsg("Homepage impact counters saved successfully!");
        setTimeout(() => setMsg(null), 4000);
      } else {
        alert("Failed to save homepage stats.");
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
            <p className="text-sm text-gray-500 mt-0.5">Customize the live impact statistics and showcase counters displayed on the public Home page.</p>
          </div>

          {msg && (
            <div className="p-4 mb-6 rounded-xl bg-emerald-50 border border-emerald-200 text-sm text-emerald-800 font-semibold flex items-center gap-2">
              <Sparkles size={18} className="text-emerald-600" />
              <span>{msg}</span>
            </div>
          )}

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <div>
                <h2 className="text-base font-bold text-gray-900">Impact Statistics Counters</h2>
                <p className="text-xs text-gray-400">These animate and count up dynamically on the public home page.</p>
              </div>
              <button
                type="button"
                onClick={handleAddStat}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700"
              >
                <PlusCircle size={15} /> Add Counter
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-16 text-[#8a5000]">
                <Loader2 size={28} className="animate-spin" />
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-3">
                  {stats.map((st, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 bg-[#fbf9f4] rounded-xl border border-gray-200 items-center">
                      <div className="sm:col-span-4">
                        <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">Number / Value</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 25+ or 10k+"
                          value={st.stat_value || ""}
                          onChange={(e) => handleUpdate(idx, "stat_value", e.target.value)}
                          className="w-full px-3 py-2 text-sm font-bold bg-white border border-gray-200 rounded-lg"
                        />
                      </div>
                      <div className="sm:col-span-6">
                        <label className="block text-[11px] font-semibold text-gray-500 uppercase mb-1">Label</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Years of Seva"
                          value={st.stat_label || ""}
                          onChange={(e) => handleUpdate(idx, "stat_label", e.target.value)}
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

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl bg-[#8a5000] hover:bg-[#6e4000] text-white font-semibold text-sm shadow-md transition-all flex items-center gap-2"
                  >
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    <span>Save Impact Counters</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

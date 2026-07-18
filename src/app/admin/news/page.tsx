"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import { DeleteConfirmDialog } from "@/components/admin/DeleteConfirmDialog";
import { ViewItemModal } from "@/components/admin/ViewItemModal";
import { PlusCircle, Search, Eye, Edit, Trash2, Calendar, Loader2, ExternalLink, ArrowUp, ArrowDown } from "lucide-react";

export default function AdminNewsPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [viewModalArticle, setViewModalArticle] = useState<any | null>(null);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "all") params.set("status", statusFilter);
      if (search.trim()) params.set("search", search.trim());

      const res = await fetch(`/api/admin/news?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setArticles(data.articles || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [statusFilter]);

  const handleDeleteConfirm = async () => {
    if (!selectedArticle) return;
    const res = await fetch(`/api/admin/news/${selectedArticle.id}`, { method: "DELETE" });
    if (res.ok) fetchArticles();
  };

  const isFiltering = search.trim() !== "" || statusFilter !== "all";

  const moveRow = async (index: number, direction: 'up' | 'down') => {
    if (isFiltering) return; // Cannot reorder while filtering
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === articles.length - 1)
    ) {
      return;
    }

    const newArticles = [...articles];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap items in the local state
    const temp = newArticles[index];
    newArticles[index] = newArticles[swapIndex];
    newArticles[swapIndex] = temp;
    
    setArticles(newArticles);

    // Send the new ordered IDs to the backend
    const orderedIds = newArticles.map(a => a.id);
    try {
      await fetch('/api/admin/news/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds })
      });
    } catch (err) {
      console.error("Failed to update priority", err);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#fbf9f4]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar email="Admin" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">News & Media Management</h1>
              <p className="text-sm text-gray-500 mt-0.5">Publish articles, press releases, and external media features.</p>
            </div>
            <Link
              href="/admin/news/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#8a5000] hover:bg-[#6e4000] text-white font-semibold text-sm shadow-sm transition-colors"
            >
              <PlusCircle size={18} />
              <span>Add News Article</span>
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles by headline..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchArticles()}
                className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-200 bg-[#fbf9f4] focus:bg-white focus:outline-none focus:border-[#8a5000]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2 text-sm rounded-lg border border-gray-200 bg-[#fbf9f4] focus:bg-white focus:outline-none focus:border-[#8a5000]"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            <button
              onClick={fetchArticles}
              className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
            >
              Search
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 text-[#8a5000]">
                <Loader2 size={32} className="animate-spin mb-3" />
                <span className="text-sm font-medium">Loading articles...</span>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-16 px-4">
                <p className="text-base font-semibold text-gray-800">No news articles found</p>
                <p className="text-sm text-gray-500 mt-1 mb-4">Click below to publish your first press release or news feature.</p>
                <Link
                  href="/admin/news/new"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8a5000] text-white text-xs font-semibold"
                >
                  <PlusCircle size={15} />
                  Add News Article
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#fbf9f4] border-b border-gray-200 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Image</th>
                      <th className="py-3 px-4">Headline</th>
                      <th className="py-3 px-4">Publish Date</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {articles.map((art, index) => (
                      <tr key={art.id} className="hover:bg-[#fbf9f4]/70">
                        <td className="py-3 px-4 w-16">
                          <div className="w-12 h-10 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                            <img src={art.featured_image_url} alt="" className="w-full h-full object-cover" />
                          </div>
                        </td>
                        <td className="py-3 px-4 max-w-xs font-semibold text-gray-900 truncate">
                          {art.headline}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-gray-400" />
                            <span>{art.publish_date}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          {art.is_external ? (
                            <span className="inline-flex items-center gap-1 text-xs text-blue-600 font-medium">
                              <ExternalLink size={12} /> External Link
                            </span>
                          ) : (
                            <span className="text-xs text-gray-500">Internal Article</span>
                          )}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            art.status === "published" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                          }`}>
                            {art.status === "published" ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <div className="flex flex-col mr-2" title={isFiltering ? "Clear search/filters to reorder" : "Reorder article priority"}>
                              <button 
                                onClick={() => moveRow(index, 'up')}
                                disabled={isFiltering || index === 0}
                                className={`p-0.5 rounded text-gray-400 hover:text-[#8a5000] hover:bg-gray-100 ${(isFiltering || index === 0) ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                              >
                                <ArrowUp size={14} />
                              </button>
                              <button 
                                onClick={() => moveRow(index, 'down')}
                                disabled={isFiltering || index === articles.length - 1}
                                className={`p-0.5 rounded text-gray-400 hover:text-[#8a5000] hover:bg-gray-100 ${(isFiltering || index === articles.length - 1) ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                              >
                                <ArrowDown size={14} />
                              </button>
                            </div>
                            <button onClick={() => setViewModalArticle(art)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer" title="Preview Article">
                              <Eye size={16} />
                            </button>
                            <Link href={`/admin/news/${art.id}/edit`} className="p-1.5 rounded-lg text-gray-400 hover:text-[#8a5000] hover:bg-gray-100">
                              <Edit size={16} />
                            </Link>
                            <button
                              onClick={() => { setSelectedArticle(art); setDeleteModalOpen(true); }}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>
      <DeleteConfirmDialog
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title={selectedArticle?.headline || ""}
        entityName="news article"
      />

      <ViewItemModal
        isOpen={!!viewModalArticle}
        onClose={() => setViewModalArticle(null)}
        title={viewModalArticle?.headline || ""}
        subtitle={viewModalArticle?.is_external ? `External Link: ${viewModalArticle?.external_url}` : "Internal Article"}
        status={viewModalArticle?.status}
        fields={[
          { label: "Publish Date", value: viewModalArticle?.publish_date },
          { label: "Source/Type", value: viewModalArticle?.is_external ? "External Media Feature" : "Internal News Post" },
        ]}
        bodyText={viewModalArticle?.body_content || viewModalArticle?.excerpt || "No body text entered."}
        editHref={viewModalArticle ? `/admin/news/${viewModalArticle.id}/edit` : undefined}
      />
    </div>
  );
}

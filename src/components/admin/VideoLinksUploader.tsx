"use client";

import React, { useState } from "react";
import { Video, X, Plus, Play, Link as LinkIcon, Award } from "lucide-react";

export interface VideoItem {
  id?: string;
  title?: string;
  url: string;
  sort_order?: number;
}

interface VideoLinksUploaderProps {
  label?: string;
  items: VideoItem[];
  onChange: (items: VideoItem[]) => void;
  maxItems?: number;
}

export function VideoLinksUploader({
  label = "YouTube Video Links",
  items = [],
  onChange,
  maxItems = 20,
}: VideoLinksUploaderProps) {
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Helper to format YouTube link to embed format
  const formatYouTubeUrl = (urlStr: string) => {
    let clean = urlStr.trim();
    if (!clean) return "";
    // If it's already an embed link, ensure autoplay=1
    if (clean.includes("youtube.com/embed/")) {
      return clean.includes("autoplay=1") ? clean : `${clean}${clean.includes("?") ? "&" : "?"}autoplay=1`;
    }
    // Extract video ID from youtu.be/ID or youtube.com/watch?v=ID
    let videoId = "";
    if (clean.includes("youtu.be/")) {
      videoId = clean.split("youtu.be/")[1]?.split("?")[0]?.split("&")[0] || "";
    } else if (clean.includes("watch?v=")) {
      videoId = clean.split("watch?v=")[1]?.split("&")[0] || "";
    }
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return clean;
  };

  const getThumbnailUrl = (urlStr: string) => {
    let videoId = "";
    if (urlStr.includes("youtube.com/embed/")) {
      videoId = urlStr.split("youtube.com/embed/")[1]?.split("?")[0] || "";
    } else if (urlStr.includes("youtu.be/")) {
      videoId = urlStr.split("youtu.be/")[1]?.split("?")[0] || "";
    } else if (urlStr.includes("watch?v=")) {
      videoId = urlStr.split("watch?v=")[1]?.split("&")[0] || "";
    }
    if (videoId) {
      return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }
    return "/Event images/05.jpg";
  };

  const handleAddVideo = () => {
    if (!newUrl.trim()) return;
    const formattedUrl = formatYouTubeUrl(newUrl);
    const updated = [
      ...items,
      {
        title: newTitle.trim() || `Video ${items.length + 1}`,
        url: formattedUrl,
      },
    ];
    onChange(updated);
    setNewUrl("");
    setNewTitle("");
    setShowAddForm(false);
  };

  const removeItem = (index: number) => {
    const next = [...items];
    next.splice(index, 1);
    onChange(next);
  };

  const updateTitle = (index: number, title: string) => {
    const next = [...items];
    next[index].title = title;
    onChange(next);
  };

  const updateUrl = (index: number, url: string) => {
    const next = [...items];
    next[index].url = formatYouTubeUrl(url);
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
          <Video size={14} className="text-[#8a5000]" />
          {label} ({items.length} / {maxItems})
        </label>
        {items.length < maxItems && !showAddForm && (
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="text-xs font-semibold text-[#8a5000] hover:text-[#6a3d00] flex items-center gap-1 cursor-pointer bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60 transition-colors"
          >
            <Plus size={14} />
            Add YouTube Link
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="bg-[#fbf9f4] border border-[#8a5000]/30 rounded-xl p-4 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#8a5000] uppercase tracking-wider">New Video Link</span>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 mb-1">Video Title / Awardee Name</label>
              <input
                type="text"
                placeholder="e.g. Thiru T.N. Vallinayagam"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 focus:bg-white focus:outline-none focus:border-[#8a5000]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-600 mb-1">YouTube URL / Share Link</label>
              <input
                type="text"
                placeholder="e.g. https://youtu.be/..."
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 focus:bg-white focus:outline-none focus:border-[#8a5000]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddVideo}
              disabled={!newUrl.trim()}
              className="px-4 py-1.5 rounded-lg bg-[#8a5000] text-white text-xs font-semibold hover:bg-[#6a3d00] disabled:opacity-50 transition-colors flex items-center gap-1.5"
            >
              <Plus size={14} />
              Add to Event
            </button>
          </div>
        </div>
      )}

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item, index) => {
            const thumbUrl = getThumbnailUrl(item.url);
            return (
              <div
                key={index}
                className="bg-[#fbf9f4] border border-gray-200 rounded-xl p-2.5 flex flex-col gap-2 group relative shadow-sm hover:shadow transition-shadow"
              >
                <div className="relative h-36 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={thumbUrl}
                    alt={item.title || `Video ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-10 h-10 bg-[#FF0000] text-white rounded-full flex items-center justify-center shadow-lg">
                      <Play size={18} className="fill-white ml-0.5" />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
                    title="Remove video"
                  >
                    <X size={14} />
                  </button>
                  <div className="absolute top-2 left-2 z-10 bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1">
                    <Award size={11} className="text-amber-400" />
                    <span>Video {index + 1}</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <input
                    type="text"
                    value={item.title || ""}
                    onChange={(e) => updateTitle(index, e.target.value)}
                    placeholder="Video title..."
                    className="w-full px-2 py-1 text-xs font-semibold text-gray-800 bg-white border border-gray-200 rounded focus:outline-none focus:border-[#8a5000]"
                  />
                  <input
                    type="text"
                    value={item.url}
                    onChange={(e) => updateUrl(index, e.target.value)}
                    placeholder="YouTube URL..."
                    className="w-full px-2 py-1 text-[11px] font-mono text-gray-500 bg-white border border-gray-200 rounded focus:outline-none focus:border-[#8a5000]"
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : !showAddForm ? (
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
          <Video size={28} className="mx-auto text-gray-300 mb-2" />
          <p className="text-xs font-medium text-gray-600">No YouTube video links added yet</p>
          <p className="text-[11px] text-gray-400 mt-0.5 mb-3">
            Add YouTube share links to showcase event highlights or award videos.
          </p>
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8a5000] text-white text-xs font-semibold hover:bg-[#6a3d00] transition-colors"
          >
            <Plus size={14} />
            Add First Video Link
          </button>
        </div>
      ) : null}
    </div>
  );
}

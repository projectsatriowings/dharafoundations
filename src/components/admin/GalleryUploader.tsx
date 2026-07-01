"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Loader2, Plus, GripVertical } from "lucide-react";
import type { GalleryItem } from "./ImageUploader";

interface GalleryUploaderProps {
  label?: string;
  items: GalleryItem[];
  onChange: (items: GalleryItem[]) => void;
  maxItems?: number;
}

export function GalleryUploader({
  label = "Gallery Images",
  items = [],
  onChange,
  maxItems = 20,
}: GalleryUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    const newItems = [...items];

    for (let i = 0; i < files.length; i++) {
      if (newItems.length >= maxItems) break;
      const file = files[i];

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (res.ok && data.url) {
          newItems.push({ url: data.url, caption: "" });
        }
      } catch (err) {
        console.error("Gallery item upload failed:", err);
      }
    }

    setUploading(false);
    onChange(newItems);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeItem = (index: number) => {
    const next = [...items];
    next.splice(index, 1);
    onChange(next);
  };

  const updateCaption = (index: number, caption: string) => {
    const next = [...items];
    next[index].caption = caption;
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
          {label} ({items.length} / {maxItems})
        </label>
        {items.length < maxItems && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="text-xs font-medium text-[#8a5000] hover:text-[#7a695e] flex items-center gap-1 cursor-pointer disabled:opacity-50"
          >
            <Plus size={14} />
            Add Images
          </button>
        )}
      </div>

      {items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-[#fbf9f4] border border-gray-200 rounded-xl p-2 flex flex-col gap-2 group relative"
            >
              <div className="relative h-36 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={item.url}
                  alt={`Gallery item ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                  title="Remove image"
                >
                  <X size={14} />
                </button>
              </div>
              <input
                type="text"
                placeholder="Image caption (optional)"
                value={item.caption || ""}
                onChange={(e) => updateCaption(index, e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#8a5000]"
              />
            </div>
          ))}
        </div>
      )}

      {items.length === 0 && !uploading && (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-[#8a5000] hover:bg-[#fbf9f4] transition-all"
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center mx-auto mb-2">
            <Upload size={18} />
          </div>
          <p className="text-xs font-medium text-gray-600">
            Click to select gallery images
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            You can upload multiple files at once
          </p>
        </div>
      )}

      {uploading && (
        <div className="flex items-center justify-center gap-2 py-4 bg-[#fbf9f4] rounded-xl border border-gray-200 text-sm text-[#8a5000]">
          <Loader2 size={18} className="animate-spin" />
          <span>Uploading images...</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

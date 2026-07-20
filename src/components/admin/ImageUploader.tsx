"use client";

import React, { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export interface GalleryItem {
  url: string;
  caption?: string;
}

interface ImageUploaderProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
  accept?: string;
}

export function ImageUploader({
  label = "Cover Image",
  value,
  onChange,
  helperText = "PNG, JPG, WEBP up to 5MB",
  accept = "image/jpeg,image/png,image/webp,image/gif",
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setError(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to upload image");
      }

      onChange(data.url);
    } catch (err: any) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) await uploadFile(file);
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
          {label}
        </label>
      )}

      {value ? (
        <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200/80 bg-gray-900/5 group w-full flex items-center justify-center min-h-[220px] max-h-[440px] p-3 shadow-inner">
          {value.match(/\.(mp4|webm|mov|mkv)$/i) || value.includes('/video/upload/') ? (
            <video
              src={value}
              controls
              className="max-h-[400px] w-auto max-w-full object-contain rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-[1.01]"
            />
          ) : (
            <img
              src={value}
              alt="Uploaded preview"
              className="max-h-[400px] w-auto max-w-full object-contain rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-[1.01]"
            />
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 backdrop-blur-[2px]">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2.5 rounded-xl bg-white text-gray-900 text-xs font-bold shadow-xl hover:bg-gray-100 transition-all scale-95 group-hover:scale-100 flex items-center gap-2"
            >
              <Upload size={15} className="text-[#8a5000]" />
              <span>Change Image</span>
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="px-4 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold shadow-xl hover:bg-red-700 transition-all scale-95 group-hover:scale-100 flex items-center gap-2"
            >
              <X size={15} />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            uploading
              ? "border-[#8a5000] bg-[#8a5000]/5"
              : "border-gray-300 hover:border-[#8a5000] hover:bg-[#fbf9f4]"
          }`}
        >
          {uploading ? (
            <div className="flex flex-col items-center py-4 text-[#8a5000]">
              <Loader2 size={28} className="animate-spin mb-2" />
              <span className="text-sm font-medium">Uploading image...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center py-4">
              <div className="w-12 h-12 rounded-full bg-[#8a5000]/10 text-[#8a5000] flex items-center justify-center mb-3">
                <Upload size={22} />
              </div>
              <p className="text-sm font-medium text-gray-700">
                Click to upload <span className="text-gray-400 font-normal">or drag and drop</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">{helperText}</p>
            </div>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-600">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}

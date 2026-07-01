"use client";

import React from "react";
import { X, Calendar, MapPin, Tag, ExternalLink, Edit } from "lucide-react";
import Link from "next/link";

export interface ViewField {
  label: string;
  value?: React.ReactNode;
}

interface ViewItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  status?: string;
  imageUrl?: string;
  fields?: ViewField[];
  bodyText?: string;
  editHref?: string;
}

export function ViewItemModal({
  isOpen,
  onClose,
  title,
  subtitle,
  status,
  imageUrl,
  fields = [],
  bodyText,
  editHref,
}: ViewItemModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-gray-100 relative">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-[#fbf9f4]">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8a5000]">
              Preview details
            </span>
            {status && (
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  status === "published" || status === "Published"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {status}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-200/50 transition-colors"
            aria-label="Close preview"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Cover Image if available */}
          {imageUrl && (
            <div className="w-full h-56 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Title & Subtitle */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-heading">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm font-semibold text-[#8a5000] mt-1">
                {subtitle}
              </p>
            )}
          </div>

          {/* Grid Fields */}
          {fields.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#fbf9f4] p-4 rounded-xl border border-gray-200 text-sm">
              {fields.map((f, idx) =>
                f.value ? (
                  <div key={idx} className="space-y-0.5">
                    <span className="text-xs font-bold uppercase text-gray-400 block">
                      {f.label}
                    </span>
                    <div className="font-medium text-gray-800">{f.value}</div>
                  </div>
                ) : null
              )}
            </div>
          )}

          {/* Body Text */}
          {bodyText && (
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <span className="text-xs font-bold uppercase text-gray-400 block">
                Full Description / Content
              </span>
              <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100 font-mono">
                {bodyText}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            Close Preview
          </button>
          {editHref && (
            <Link
              href={editHref}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#8a5000] hover:bg-[#6e4000] shadow-sm transition-colors"
            >
              <Edit size={14} />
              <span>Edit Item</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

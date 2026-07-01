"use client";

import React, { useState } from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  entityName: string;
}

export function DeleteConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  entityName = "item",
}: DeleteConfirmDialogProps) {
  const [confirmText, setConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  if (!isOpen) return null;

  const normalizedConfirm = confirmText.trim().toLowerCase();
  const normalizedTitle = (title || "").trim().toLowerCase();
  const isMatch = normalizedConfirm === normalizedTitle || normalizedConfirm === "delete";

  const handleConfirm = async () => {
    if (!isMatch) return;
    setDeleting(true);
    try {
      await onConfirm();
      onClose();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4 relative">
        <button
          onClick={onClose}
          disabled={deleting}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg"
        >
          <X size={18} />
        </button>

        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
          <AlertTriangle size={24} />
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900">Confirm Deletion</h3>
          <p className="text-xs text-gray-500 mt-1">
            You are about to permanently delete the {entityName}: <span className="font-semibold text-gray-800">"{title}"</span>. This action cannot be undone.
          </p>
        </div>

        <div className="space-y-1.5 pt-2">
          <label className="block text-xs font-medium text-gray-700">
            Please type <span className="font-mono font-bold text-red-600">{(title || "").trim()}</span> or <span className="font-mono font-bold text-red-600">DELETE</span> to confirm:
          </label>
          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            disabled={deleting}
            placeholder={(title || "").trim() || "DELETE"}
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            disabled={deleting}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!isMatch || deleting}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {deleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Delete Permanently
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

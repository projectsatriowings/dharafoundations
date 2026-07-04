import React from "react";
import { Sparkles } from "lucide-react";

interface AdminHeaderBannerProps {
  badge?: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function AdminHeaderBanner({
  badge = "Executive Management Suite",
  title,
  description,
  action,
}: AdminHeaderBannerProps) {
  return (
    <div className="bg-gradient-to-r from-[#24695c] via-[#1b4f45] to-[#123830] rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden border border-white/10">
      <div className="absolute right-0 top-0 w-96 h-96 bg-[#ffd27f]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffd27f]/20 text-[#ffd27f] text-xs font-extrabold tracking-wider uppercase border border-[#ffd27f]/30 shadow-sm">
            <Sparkles size={14} />
            <span>{badge}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white drop-shadow-md">
            {title}
          </h1>
          <p className="text-sm md:text-base text-gray-200 leading-relaxed font-medium">
            {description}
          </p>
        </div>
        {action && (
          <div className="shrink-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}

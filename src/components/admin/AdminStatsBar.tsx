import React from "react";

export interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  iconBg?: string;
  iconColor?: string;
  valueColor?: string;
}

interface AdminStatsBarProps {
  stats: StatItem[];
}

export function AdminStatsBar({ stats }: AdminStatsBarProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((s, idx) => (
        <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${s.iconBg || "bg-[#8a5000]/10"} ${s.iconColor || "text-[#8a5000]"}`}>
            {s.icon}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400 truncate">{s.label}</p>
            <p className={`text-xl lg:text-2xl font-black truncate ${s.valueColor || "text-gray-900"}`}>{s.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

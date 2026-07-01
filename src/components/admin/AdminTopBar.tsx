"use client";

import React, { useEffect, useState } from "react";
import { LogOut, Clock } from "lucide-react";
import { logout } from "@/lib/auth-actions";

interface AdminTopBarProps {
  email: string;
}

export function AdminTopBar({ email }: AdminTopBarProps) {
  const [timeLeft, setTimeLeft] = useState("2:00:00");

  // Simple countdown timer — resets on page navigation (middleware refreshes the session)
  useEffect(() => {
    let seconds = 2 * 60 * 60; // 2 hours
    const interval = setInterval(() => {
      seconds -= 1;
      if (seconds <= 0) {
        clearInterval(interval);
        setTimeLeft("Expired");
        return;
      }
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      setTimeLeft(
        `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="sticky top-0 z-30 bg-[#fbf9f4]/90 backdrop-blur-md border-b border-[#eae8e3] px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left — Page context (filled by individual pages if needed) */}
        <div className="lg:hidden w-10" /> {/* Spacer for mobile hamburger */}
        <div className="hidden lg:block" />

        {/* Right — Session info + logout */}
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Session timer */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500">
            <Clock size={13} className="text-gray-400" />
            <span>Session: <span className="font-mono font-medium text-gray-700">{timeLeft}</span></span>
          </div>

          {/* User email */}
          <div className="text-xs sm:text-sm text-gray-600 font-medium truncate max-w-[200px]">
            {email}
          </div>

          {/* Logout */}
          <form action={handleLogout}>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

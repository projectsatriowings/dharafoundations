"use client";

import React, { useEffect, useState } from "react";
import { LogOut, Clock } from "lucide-react";
import { logout, getCurrentSessionInfo } from "@/lib/auth-actions";

interface AdminTopBarProps {
  email: string;
}

export function AdminTopBar({ email }: AdminTopBarProps) {
  const [timeLeft, setTimeLeft] = useState<string>("Loading...");
  const [userEmail, setUserEmail] = useState<string>(email);
  const [expiresAtMs, setExpiresAtMs] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;
    getCurrentSessionInfo().then((info) => {
      if (!isMounted) return;
      if (info) {
        if (info.email) setUserEmail(info.email);
        const expiryTime = new Date(info.expiresAt).getTime();
        setExpiresAtMs(expiryTime);
      } else {
        setTimeLeft("Expired");
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (expiresAtMs === null) return;

    const updateTimer = () => {
      const now = Date.now();
      const remainingMs = expiresAtMs - now;
      if (remainingMs <= 0) {
        setTimeLeft("Expired");
        return;
      }
      const totalSeconds = Math.floor(remainingMs / 1000);
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      setTimeLeft(
        `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [expiresAtMs]);

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
            {userEmail}
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

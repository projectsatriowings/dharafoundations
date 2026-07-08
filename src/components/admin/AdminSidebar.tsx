"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Newspaper,
  ImageIcon,
  Layers,
  Home,
  Users,
  Handshake,
  Inbox,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard",           href: "/admin",             icon: LayoutDashboard },
  { label: "Events",              href: "/admin/events",      icon: Calendar },
  { label: "News & Media",        href: "/admin/news",        icon: Newspaper },
  { label: "Gallery",             href: "/admin/gallery",     icon: ImageIcon },
  { label: "Home Page",           href: "/admin/homepage",    icon: Home },
  { label: "About / Founders",    href: "/admin/about",       icon: Users },
  { label: "Sponsorship",         href: "/admin/sponsorship", icon: Handshake },
  { label: "Form Submissions",    href: "/admin/submissions", icon: Inbox },
  { label: "Site Settings",       href: "/admin/settings",    icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#00322B] text-white">
      {/* Brand */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 p-1.5 flex items-center justify-center shrink-0 border border-white/15 shadow-sm">
            <img src="/logo-icon-only.png?v=4" alt="DF" className="w-full h-full object-contain" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-white font-bold text-sm tracking-wide font-heading truncate">Dhara Foundations</div>
              <div className="text-[#FFD27F] font-semibold text-[10px] uppercase tracking-wider">Admin Portal</div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 overflow-y-auto">
        <ul className="space-y-1 px-2.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group ${
                    active
                      ? "bg-gradient-to-r from-[#8a5000] to-[#b36900] text-white shadow-md shadow-[#8a5000]/30 border border-[#FFD27F]/30"
                      : "text-gray-200 hover:bg-white/10 hover:text-white"
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon
                    size={18}
                    className={`shrink-0 ${active ? "text-[#FFD27F]" : "text-gray-400 group-hover:text-[#FFD27F]"}`}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Toggle (desktop only) */}
      <div className="hidden lg:block p-3 border-t border-white/10">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors text-xs font-semibold"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span>Collapse Sidebar</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2.5 rounded-xl bg-[#00322B] text-white shadow-lg border border-white/10"
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-[#00322B] z-50 transform transition-transform duration-300 shadow-2xl ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-3 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col shrink-0 bg-[#00322B] h-screen sticky top-0 transition-all duration-300 shadow-xl border-r border-[#00241e] ${
          collapsed ? "w-[76px]" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}

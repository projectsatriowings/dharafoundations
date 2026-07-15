"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopBar } from "@/components/admin/AdminTopBar";
import {
  Award,
  Calendar,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  PlusCircle,
  Trash2,
  Sparkles,
  Video,
  Users,
  ShieldCheck,
  Quote,
  Eye,
  MapPin,
  Clock
} from "lucide-react";

export default function AdminEventsPage() {
  const [activeTab, setActiveTab] = useState<"flagship_content" | "editions">("flagship_content");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [config, setConfig] = useState<any>({
    hero: {
      badge: "Annual Flagship Ceremony",
      title: "Dhara Divine Awards",
      description: "Our flagship national celebration honoring grassroots Sanatana Dharma champions, unheralded traditional artists, temple caretakers, and selflessly dedicated volunteers.",
      button_text: "Explore Awards Spotlight",
      image_url: "/images/hero-devi.png",
      stats_badge_title: "25+ Events",
      stats_badge_sub: "Conducted across Tamil Nadu communities"
    },
    spotlight: {
      badge: "Annual Flagship Ceremony",
      location: "Chetpet, Chennai",
      title: "Dhara Divine Awards",
      description: "Over 500 distinguished guests, CSR leaders, retired high court judges, spiritual leaders, and grassroots service champions assemble for an extraordinary celebration of honor, cultural tribute, and community upliftment.",
      button_text: "Explore Divine Awards Portal",
      portal_url: "https://dhara-divine-awards-2025.vercel.app/"
    },
    ceremony: {
      badge: "COMPLETE CEREMONY • EXCLUSIVE COVERAGE",
      title: "Experience the Dhara Divine Awards Ceremony",
      description: "Relive the full 4-hour live national ceremony from Chetpet, Chennai — featuring keynote addresses, soul-stirring cultural tributes, and the historic honoring of grassroots Sanatana Dharma champions.",
      duration: "4 Hours",
      location: "Chetpet, Chennai",
      card_title: "Watch Official Ceremony Broadcast",
      card_desc: "Explore awardees, ceremony highlights, photo galleries, and the complete 4-hour broadcast",
      portal_url: "https://dhara-divine-awards-2025.vercel.app/",
      video_url: "https://www.youtube.com/live/qOAbFfB22uI",
      image_url: "/images/hero-devi.png",
      milestones: [
        { title: "Vedic Invocation & Deepa Pragatya", description: "Sacred Vedic mantras, traditional lamp lighting ceremony, and divine blessings from spiritual dignitaries." },
        { title: "Founder's Keynote & Vision", description: "Inspiring address highlighting our mission to protect temple heritage and uplift rural welfare across Tamil Nadu." },
        { title: "Traditional Cultural Tributes", description: "Classical dance, devotional music, and authentic folk art performances by renowned traditional artists." },
        { title: "Seva Ratna Awards Conferral", description: "The defining moment honoring 25+ unheralded grassroots champions before 500+ distinguished guests." }
      ]
    },
    why_matter: {
      heading: "Why Dhara Divine Awards Matter",
      subheading: "We approach the prestigious Dhara Divine Awards not as a momentary ceremony, but as a national movement recognizing our unsung grassroots custodians and spiritual protectors.",
      features: [
        { title: "1. Honoring Unsung Custodians", description: "Recognizing grassroots protectors, traditional temple priests, and Vedic scholars whose lifelong devotion preserves our sacred heritage in remote corners of Bharat." },
        { title: "2. Empowering Artisan Communities", description: "Celebrating traditional craftsmen, sculptors, and heritage revivalists by bringing national visibility and tangible support to their sacred livelihoods." },
        { title: "3. Rigorous & Transparent Selection", description: "An uncompromised, merit-based selection process honoring genuine cultural elevation across rural hamlets and historic temple ecosystems." },
        { title: "4. National Inspiration & Legacy", description: "Inspiring future generations to take pride in Sanatana Dharma by celebrating extraordinary lives of selflessness, Dharma preservation, and community leadership." }
      ]
    },
    stats_bar: {
      heading: "Creating Real Impact Across Communities",
      subheading: "Verifiable milestones in service & cultural revival",
      items: [
        { target: 2024, staticText: "", label: "Year Founded & Trust Registered" },
        { target: 4, staticText: "", label: "Core Sectors Served" },
        { target: null, staticText: "25+", label: "Events & Welfare Drives" },
        { target: null, staticText: "10,000+", label: "Beneficiaries Reached" }
      ]
    },
    testimonials_section: {
      heading: "Voices From the Community",
      subheading: "Listen to the heartfelt experiences of village elders, volunteer coordinators, and temple trustees whose lives have been impacted by Dhara initiatives.",
      items: [
        { quote: "The footwear and school supplies distributed to our Javadhu Hills students brought immense joy. Dhara Foundations serves with genuine devotion.", name: "K. Ramachandran", role: "Headmaster, Tribal School", initials: "KR" },
        { quote: "During our ancient temple Kumbabhishekam, Dhara volunteers stood by us with flawless organization and Anna Daanam support. Truly blessed work!", name: "Sivakumar Sastry", role: "Temple Trustee, Kanchipuram", initials: "SS" },
        { quote: "Volunteering at the Dhara Divine Awards showed me how deeply they care for unheralded traditional artists. It is an honor to be part of this mission.", name: "Anitha Lakshmi", role: "Youth Volunteer Coordinator", initials: "AL" }
      ]
    },
    editions: [
      {
        id: "edition-2025",
        title: "Dhara Divine Awards 2025 (Inaugural National Edition)",
        date: "March 2025",
        time: "04:00 PM - 08:00 PM",
        location: "Chetpet, Chennai",
        description: "Historic ceremony honoring 25+ unheralded traditional artists and Dharma custodians before 500+ distinguished guests.",
        portal_url: "https://dhara-divine-awards-2025.vercel.app/",
        status: "published"
      }
    ]
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/flagship-page");
      if (res.ok) {
        const data = await res.json();
        if (data.config) {
          setConfig((prev: any) => ({ ...prev, ...data.config }));
        }
      }
    } catch (err) {
      console.error("Failed to fetch flagship config:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSaveStatus(null);
    try {
      const res = await fetch("/api/admin/flagship-page", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config })
      });
      if (!res.ok) throw new Error("Failed to save configuration");
      setSaveStatus("Events page content updated live!");
      setTimeout(() => setSaveStatus(null), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  // Milestones Helpers
  const updateMilestone = (index: number, field: string, value: string) => {
    const updated = [...(config.ceremony.milestones || [])];
    updated[index] = { ...updated[index], [field]: value };
    setConfig({ ...config, ceremony: { ...config.ceremony, milestones: updated } });
  };
  const addMilestone = () => {
    const updated = [...(config.ceremony.milestones || []), { title: "New Milestone", description: "Milestone description details..." }];
    setConfig({ ...config, ceremony: { ...config.ceremony, milestones: updated } });
  };
  const removeMilestone = (index: number) => {
    const updated = [...(config.ceremony.milestones || [])];
    updated.splice(index, 1);
    setConfig({ ...config, ceremony: { ...config.ceremony, milestones: updated } });
  };

  // Pillars Helpers
  const updatePillar = (index: number, field: string, value: string) => {
    const updated = [...(config.why_matter.features || [])];
    updated[index] = { ...updated[index], [field]: value };
    setConfig({ ...config, why_matter: { ...config.why_matter, features: updated } });
  };
  const addPillar = () => {
    const updated = [...(config.why_matter.features || []), { title: `${(config.why_matter.features?.length || 0) + 1}. New Movement Pillar`, description: "Pillar details and impact focus..." }];
    setConfig({ ...config, why_matter: { ...config.why_matter, features: updated } });
  };
  const removePillar = (index: number) => {
    const updated = [...(config.why_matter.features || [])];
    updated.splice(index, 1);
    setConfig({ ...config, why_matter: { ...config.why_matter, features: updated } });
  };

  // Stats Helpers
  const updateStat = (index: number, field: string, value: any) => {
    const updated = [...(config.stats_bar.items || [])];
    updated[index] = { ...updated[index], [field]: value };
    setConfig({ ...config, stats_bar: { ...config.stats_bar, items: updated } });
  };

  // Testimonials Helpers
  const updateTestimonial = (index: number, field: string, value: string) => {
    const updated = [...(config.testimonials_section.items || [])];
    updated[index] = { ...updated[index], [field]: value };
    if (field === "name" && !updated[index].initials) {
      updated[index].initials = value.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2);
    }
    setConfig({ ...config, testimonials_section: { ...config.testimonials_section, items: updated } });
  };
  const addTestimonial = () => {
    const updated = [...(config.testimonials_section.items || []), { quote: "Dhara Foundations has transformed our community and temple heritage.", name: "Community Leader", role: "Village Trustee", initials: "CL" }];
    setConfig({ ...config, testimonials_section: { ...config.testimonials_section, items: updated } });
  };
  const removeTestimonial = (index: number) => {
    const updated = [...(config.testimonials_section.items || [])];
    updated.splice(index, 1);
    setConfig({ ...config, testimonials_section: { ...config.testimonials_section, items: updated } });
  };

  // Editions Helpers
  const addEdition = () => {
    const newEd = {
      id: `edition-${Date.now()}`,
      title: "Dhara Divine Awards 2026 (Upcoming Annual Edition)",
      date: "March 2026",
      time: "04:00 PM - 08:00 PM",
      location: "Chennai / Tamil Nadu",
      description: "Upcoming flagship ceremony recognizing outstanding grassroots champions.",
      portal_url: "https://dhara-divine-awards.vercel.app",
      status: "published"
    };
    const updated = [newEd, ...(config.editions || [])];
    setConfig({ ...config, editions: updated });
  };
  const updateEdition = (index: number, field: string, value: string) => {
    const updated = [...(config.editions || [])];
    updated[index] = { ...updated[index], [field]: value };
    setConfig({ ...config, editions: updated });
  };
  const removeEdition = (index: number) => {
    const updated = [...(config.editions || [])];
    updated.splice(index, 1);
    setConfig({ ...config, editions: updated });
  };

  return (
    <div className="min-h-screen flex bg-[#fbf9f4]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminTopBar email="Admin" />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full space-y-8">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-[#00322B] text-[#FFD27F]">
                  <Award size={22} />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Events &amp; Dhara Divine Awards Page Management
                </h1>
              </div>
              <p className="text-sm text-gray-600 max-w-3xl">
                Directly manage and update the public website&apos;s flagship <strong className="text-gray-900 font-mono">/events</strong> page. All text, hero banners, broadcast highlights, stats, and testimonials updated here reflect live across the public site.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/events"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm transition-all shadow-sm"
              >
                <Eye size={16} />
                <span>Preview /events Page</span>
                <ExternalLink size={14} className="text-gray-500 ml-0.5" />
              </Link>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#00322B] hover:bg-[#004d42] text-white font-bold text-sm transition-all shadow-md active:scale-95 disabled:opacity-60 cursor-pointer"
              >
                {saving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Save All Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Alert Status / Errors */}
          {saveStatus && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium text-sm flex items-center gap-2.5 shadow-sm animate-fade-in">
              <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              <span>{saveStatus}</span>
            </div>
          )}
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 font-medium text-sm flex items-center gap-2.5 shadow-sm animate-fade-in">
              <AlertCircle size={18} className="text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
            <button
              onClick={() => setActiveTab("flagship_content")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === "flagship_content"
                  ? "bg-[#00322B] text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <Award size={16} />
              <span>1. Flagship Page Content (/events)</span>
            </button>

            <button
              onClick={() => setActiveTab("editions")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === "editions"
                  ? "bg-[#00322B] text-white shadow-md"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              <Calendar size={16} />
              <span>2. Annual Editions &amp; Schedule ({config.editions?.length || 1})</span>
            </button>
          </div>

          {loading ? (
            <div className="bg-white p-16 rounded-2xl border border-gray-200 flex flex-col items-center justify-center text-center gap-4">
              <Loader2 size={36} className="animate-spin text-[#00322B]" />
              <div className="text-gray-600 font-medium">Loading Events Page configuration...</div>
            </div>
          ) : activeTab === "flagship_content" ? (
            /* TAB 1: FLAGSHIP PAGE CONFIGURATION (/events) */
            <div className="space-y-8">
              {/* SECTION A: HERO & MAIN SPOTLIGHT */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                  <div className="p-2 rounded-lg bg-amber-100 text-amber-800 font-bold">A</div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">Hero Section &amp; Main Spotlight Banner</h3>
                    <p className="text-xs text-gray-500">First fold of the Events page showcasing Dhara Divine Awards</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Hero Badge Label
                      </label>
                      <input
                        type="text"
                        value={config.hero.badge}
                        onChange={(e) => setConfig({ ...config, hero: { ...config.hero, badge: e.target.value } })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Main Title
                      </label>
                      <input
                        type="text"
                        value={config.hero.title}
                        onChange={(e) => setConfig({ ...config, hero: { ...config.hero, title: e.target.value } })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm font-bold text-[#00322B] focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Hero Description
                      </label>
                      <textarea
                        rows={3}
                        value={config.hero.description}
                        onChange={(e) => setConfig({ ...config, hero: { ...config.hero, description: e.target.value } })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                          Button Text
                        </label>
                        <input
                          type="text"
                          value={config.hero.button_text}
                          onChange={(e) => setConfig({ ...config, hero: { ...config.hero, button_text: e.target.value } })}
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                          Hero Photo URL
                        </label>
                        <input
                          type="text"
                          value={config.hero.image_url}
                          onChange={(e) => setConfig({ ...config, hero: { ...config.hero, image_url: e.target.value } })}
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Spotlight Card Configuration */}
                  <div className="bg-[#fbf9f4] p-5 rounded-2xl border border-gray-200 space-y-4">
                    <div className="font-bold text-sm text-gray-800 flex items-center justify-between border-b border-gray-200 pb-2">
                      <span>Spotlight Box &amp; External Portal URL</span>
                      <span className="text-xs text-amber-700 font-semibold uppercase">Live Portal Link</span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Spotlight Title &amp; Location
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={config.spotlight.title}
                          onChange={(e) => setConfig({ ...config, spotlight: { ...config.spotlight, title: e.target.value } })}
                          placeholder="Title"
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                        />
                        <input
                          type="text"
                          value={config.spotlight.location}
                          onChange={(e) => setConfig({ ...config, spotlight: { ...config.spotlight, location: e.target.value } })}
                          placeholder="Location e.g. Chetpet, Chennai"
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Spotlight Description
                      </label>
                      <textarea
                        rows={3}
                        value={config.spotlight.description}
                        onChange={(e) => setConfig({ ...config, spotlight: { ...config.spotlight, description: e.target.value } })}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Divine Awards Portal Website URL (Opens when users click Explore Portal)
                      </label>
                      <input
                        type="text"
                        value={config.spotlight.portal_url}
                        onChange={(e) => {
                          const val = e.target.value;
                          setConfig({
                            ...config,
                            spotlight: { ...config.spotlight, portal_url: val },
                            ceremony: { ...config.ceremony, portal_url: val }
                          });
                        }}
                        placeholder="https://dhara-divine-awards-2025.vercel.app/"
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm font-mono text-emerald-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION B: CEREMONY BROADCAST & MILESTONES */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 font-bold">B</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Experience the Ceremony &amp; Key Milestones</h3>
                      <p className="text-xs text-gray-500">Video portal CTA card and 4 main ceremony sequence milestones</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addMilestone}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00322B] text-white text-xs font-bold hover:bg-[#004d42] transition-colors"
                  >
                    <PlusCircle size={14} />
                    <span>Add Milestone</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Section Heading</label>
                    <input
                      type="text"
                      value={config.ceremony.title}
                      onChange={(e) => setConfig({ ...config, ceremony: { ...config.ceremony, title: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">YouTube Live / Video URL</label>
                    <input
                      type="text"
                      value={config.ceremony.video_url || ""}
                      onChange={(e) => setConfig({ ...config, ceremony: { ...config.ceremony, video_url: e.target.value } })}
                      placeholder="https://www.youtube.com/live/qOAbFfB22uI"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-mono text-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Duration Text</label>
                    <input
                      type="text"
                      value={config.ceremony.duration}
                      onChange={(e) => setConfig({ ...config, ceremony: { ...config.ceremony, duration: e.target.value } })}
                      placeholder="e.g. 4 Hours"
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Location Label</label>
                    <input
                      type="text"
                      value={config.ceremony.location}
                      onChange={(e) => setConfig({ ...config, ceremony: { ...config.ceremony, location: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                    />
                  </div>
                </div>

                {/* Milestones List */}
                <div className="space-y-3 pt-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Ceremony Highlights Timeline ({config.ceremony.milestones?.length || 0})
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {config.ceremony.milestones?.map((m: any, idx: number) => (
                      <div key={idx} className="bg-[#fbf9f4] p-4 rounded-xl border border-gray-200 relative space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#00322B] px-2 py-0.5 rounded bg-[#00322B]/10">
                            Milestone #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeMilestone(idx)}
                            className="text-gray-400 hover:text-red-600 p-1"
                            title="Remove Milestone"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={m.title}
                          onChange={(e) => updateMilestone(idx, "title", e.target.value)}
                          placeholder="Milestone Title"
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-bold bg-white focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                        />
                        <textarea
                          rows={2}
                          value={m.description}
                          onChange={(e) => updateMilestone(idx, "description", e.target.value)}
                          placeholder="Milestone Description"
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION C: WHY DHARA DIVINE AWARDS MATTER (4 PILLARS) */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 text-blue-800 font-bold">C</div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">Why Dhara Divine Awards Matter (Movement Pillars)</h3>
                      <p className="text-xs text-gray-500">Core 4 values and movement pillars shown in alternating layout</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addPillar}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#00322B] text-white text-xs font-bold hover:bg-[#004d42] transition-colors"
                  >
                    <PlusCircle size={14} />
                    <span>Add Pillar</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Section Heading</label>
                    <input
                      type="text"
                      value={config.why_matter.heading}
                      onChange={(e) => setConfig({ ...config, why_matter: { ...config.why_matter, heading: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Subheading Text</label>
                    <input
                      type="text"
                      value={config.why_matter.subheading}
                      onChange={(e) => setConfig({ ...config, why_matter: { ...config.why_matter, subheading: e.target.value } })}
                      className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                    />
                  </div>
                </div>

                {/* Pillars Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {config.why_matter.features?.map((feat: any, idx: number) => (
                    <div key={idx} className="bg-[#fbf9f4] p-4 rounded-xl border border-gray-200 relative space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-blue-800 px-2 py-0.5 rounded bg-blue-100">
                          Pillar #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removePillar(idx)}
                          className="text-gray-400 hover:text-red-600 p-1"
                          title="Remove Pillar"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <input
                        type="text"
                        value={feat.title}
                        onChange={(e) => updatePillar(idx, "title", e.target.value)}
                        placeholder="Pillar Title"
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-sm font-bold bg-white focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                      />
                      <textarea
                        rows={3}
                        value={feat.description}
                        onChange={(e) => updatePillar(idx, "description", e.target.value)}
                        placeholder="Pillar Description"
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION D: IMPACT STATS & TESTIMONIALS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left 5 cols: Stats Bar */}
                <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">
                  <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
                    <div className="p-2 rounded-lg bg-purple-100 text-purple-800 font-bold">D</div>
                    <div>
                      <h3 className="font-bold text-base text-gray-900">Verifiable Impact Numbers</h3>
                      <p className="text-xs text-gray-500">4 stats shown across stats bar</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {config.stats_bar.items?.map((st: any, idx: number) => (
                      <div key={idx} className="bg-[#fbf9f4] p-3 rounded-xl border border-gray-200 space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-1/3">
                            <label className="block text-[10px] font-bold text-gray-600 uppercase">Count/Number</label>
                            <input
                              type="text"
                              value={st.target !== null && st.target !== undefined ? st.target : st.staticText || ""}
                              onChange={(e) => {
                                const val = e.target.value;
                                const asNum = parseInt(val, 10);
                                if (!isNaN(asNum) && String(asNum) === val.trim()) {
                                  updateStat(idx, "target", asNum);
                                  updateStat(idx, "staticText", "");
                                } else {
                                  updateStat(idx, "target", null);
                                  updateStat(idx, "staticText", val);
                                }
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 text-sm font-bold text-[#00322B] bg-white"
                            />
                          </div>
                          <div className="w-2/3">
                            <label className="block text-[10px] font-bold text-gray-600 uppercase">Stat Label</label>
                            <input
                              type="text"
                              value={st.label}
                              onChange={(e) => updateStat(idx, "label", e.target.value)}
                              className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs font-semibold bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right 7 cols: Community Voices / Testimonials */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-orange-100 text-orange-800 font-bold">E</div>
                      <div>
                        <h3 className="font-bold text-base text-gray-900">Voices From the Community (Testimonials)</h3>
                        <p className="text-xs text-gray-500">Testimonial quotes from elders and leaders</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={addTestimonial}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#00322B] text-white text-xs font-bold hover:bg-[#004d42]"
                    >
                      <PlusCircle size={13} />
                      <span>Add Quote</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {config.testimonials_section.items?.map((t: any, idx: number) => (
                      <div key={idx} className="bg-[#fbf9f4] p-4 rounded-xl border border-gray-200 relative space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-gray-700 bg-gray-200 px-2 py-0.5 rounded">
                            Voice #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeTestimonial(idx)}
                            className="text-gray-400 hover:text-red-600 p-1"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={t.quote}
                          onChange={(e) => updateTestimonial(idx, "quote", e.target.value)}
                          placeholder="Testimonial Quote"
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs italic bg-white focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                        />
                        <div className="grid grid-cols-3 gap-2">
                          <div className="col-span-1">
                            <input
                              type="text"
                              value={t.name}
                              onChange={(e) => updateTestimonial(idx, "name", e.target.value)}
                              placeholder="Author Name"
                              className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs font-bold bg-white"
                            />
                          </div>
                          <div className="col-span-1">
                            <input
                              type="text"
                              value={t.role}
                              onChange={(e) => updateTestimonial(idx, "role", e.target.value)}
                              placeholder="Role / Location"
                              className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs font-medium bg-white"
                            />
                          </div>
                          <div className="col-span-1">
                            <input
                              type="text"
                              value={t.initials}
                              onChange={(e) => updateTestimonial(idx, "initials", e.target.value)}
                              placeholder="Initials e.g. KR"
                              className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 text-xs font-mono uppercase text-center bg-white"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* TAB 2: ANNUAL EDITIONS & STANDALONE SCHEDULE */
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Dhara Divine Awards — Annual Editions &amp; Ceremonies</h3>
                  <p className="text-xs text-gray-500">Manage specific annual editions (2024, 2025, 2026) and standalone flagship events</p>
                </div>
                <button
                  type="button"
                  onClick={addEdition}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00322B] text-white font-bold text-sm hover:bg-[#004d42] transition-colors shadow-sm"
                >
                  <PlusCircle size={16} />
                  <span>Add New Edition / Ceremony</span>
                </button>
              </div>

              <div className="space-y-4">
                {config.editions && config.editions.length > 0 ? (
                  config.editions.map((ed: any, idx: number) => (
                    <div key={idx} className="bg-[#fbf9f4] p-5 rounded-2xl border border-gray-200 space-y-4 shadow-sm">
                      <div className="flex items-center justify-between border-b border-gray-200/80 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          <span className="font-bold text-sm text-gray-900">{ed.title}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs px-2.5 py-1 rounded-full font-semibold bg-emerald-100 text-emerald-800 uppercase">
                            {ed.status || "Published"}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeEdition(idx)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Edition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Edition Title</label>
                          <input
                            type="text"
                            value={ed.title}
                            onChange={(e) => updateEdition(idx, "title", e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-bold bg-white focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Date &amp; Year</label>
                          <input
                            type="text"
                            value={ed.date}
                            onChange={(e) => updateEdition(idx, "date", e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Location Venue</label>
                          <input
                            type="text"
                            value={ed.location}
                            onChange={(e) => updateEdition(idx, "location", e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Summary Description</label>
                          <textarea
                            rows={2}
                            value={ed.description}
                            onChange={(e) => updateEdition(idx, "description", e.target.value)}
                            className="w-full px-3 py-1.5 rounded-xl border border-gray-300 text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Live Awards Portal Website URL</label>
                          <input
                            type="text"
                            value={ed.portal_url}
                            onChange={(e) => updateEdition(idx, "portal_url", e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-mono text-emerald-800 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#00322B]"
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-gray-500 font-medium">
                    No ceremony editions yet. Click &quot;Add New Edition / Ceremony&quot; above to create one.
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

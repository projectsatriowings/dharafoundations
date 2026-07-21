"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Share2,
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Tag,
  Printer,
  ShieldCheck,
  Award,
  Heart,
  Copy,
  Check
} from "lucide-react";
import { type NewsArticle } from "@/data/news";

interface NewsDetailClientProps {
  article: NewsArticle;
}

export function NewsDetailClient({ article }: NewsDetailClientProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch {
        // Ignored
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-surface text-foreground font-body pb-24">
      {/* Decorative Top Banner Strip using Brand Gradient */}
      <div className="w-full h-3 bg-[linear-gradient(90deg,#8a5000_0%,#f49b33_50%,#FFD27F_100%)] shadow-sm" />

      {/* Hero / Header Section */}
      <section className="bg-deep-forest text-ethereal-white pt-28 sm:pt-32 pb-14 sm:pb-16 px-6 md:px-12 relative overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto relative z-10 space-y-5">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-saffron-glow hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            <span>BACK TO NEWS & MEDIA</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            {/* Pill Date Badge */}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#9A8678]/25 text-[#d9c3b0] border border-[#9A8678]/40 text-xs font-label font-bold uppercase tracking-wider">
              <Calendar size={13} />
              <span>{article.date}</span>
            </span>

            {/* Category Badge */}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/30 text-saffron-glow border border-primary/40 text-xs font-label font-bold uppercase tracking-wider">
              <Tag size={13} />
              <span>{article.category || "Press Release"}</span>
            </span>

            {/* Read Time */}
            {article.read_time_minutes && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-ethereal-white/90 border border-white/20 text-xs font-mono">
                <Clock size={13} className="text-saffron-glow" />
                <span>{article.read_time_minutes} min read</span>
              </span>
            )}
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-5xl pt-2">
            {article.title}
          </h1>

          {article.excerpt && (
            <p className="font-serif italic text-lg sm:text-xl text-saffron-glow max-w-3xl leading-relaxed pt-2">
              &ldquo;{article.excerpt}&rdquo;
            </p>
          )}
        </div>

        {/* Subtle background cover overlay */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          {article.img && (article.img.match(/\.(mp4|webm|mov|mkv)$/i) || article.img.includes('/video/upload/')) ? (
            <video src={article.img} muted loop autoPlay playsInline className="w-full h-full object-cover object-center blur-sm" />
          ) : (
            <img src={article.img} alt={article.title} className="w-full h-full object-cover object-center blur-sm" />
          )}
        </div>
      </section>

      {/* Main Two-Column Content Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: Main Image & Detailed Article Content (8 cols) */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Featured Image Box (Uncropped, Full Visibility) */}
          <div className={`rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/30 relative p-3 sm:p-6 flex flex-col items-center justify-center ${article.isDoc ? "bg-white" : "bg-surface-container-low dark:bg-surface-container"}`}>
            {article.img && (article.img.match(/\.(mp4|webm|mov|mkv)$/i) || article.img.includes('/video/upload/')) ? (
              <video
                src={article.img}
                controls
                autoPlay
                className="max-h-[580px] w-auto object-contain rounded-2xl mx-auto shadow-md"
              />
            ) : (
              <img
                src={article.img}
                alt={article.title}
                className="max-h-[580px] w-auto object-contain rounded-2xl mx-auto shadow-md"
              />
            )}
            <div className="w-full pt-3 px-2 flex items-center justify-between text-xs font-mono text-on-surface-variant border-t border-outline-variant/20 mt-3">
              <span className="inline-flex items-center gap-1.5 text-primary font-semibold">
                <ShieldCheck size={14} /> Official Dhara Foundation Archive
              </span>
              <span>Published on {article.date}</span>
            </div>
          </div>

          {/* Article Excerpt Highlight Box */}
          {article.excerpt && (
            <div className="p-6 sm:p-8 rounded-2xl bg-surface-container dark:bg-surface-container-high border-l-4 border-primary shadow-sm space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary block">
                Executive Summary
              </span>
              <p className="font-serif italic text-lg sm:text-xl text-on-surface font-medium leading-relaxed">
                {article.excerpt}
              </p>
            </div>
          )}

          {/* Main Article Body Content */}
          <div className="space-y-6 text-base sm:text-lg text-on-surface leading-relaxed font-body">
            {article.body_content ? (
              <div
                className="prose dark:prose-invert max-w-none text-on-surface leading-relaxed space-y-6 font-body prose-headings:font-heading prose-headings:text-deep-forest dark:prose-headings:text-ethereal-white prose-a:text-primary prose-strong:text-deep-forest dark:prose-strong:text-ethereal-white"
                dangerouslySetInnerHTML={{ __html: article.body_content }}
              />
            ) : (
              <p className="text-on-surface-variant leading-relaxed">
                Dhara Foundation is dedicated to serving grassroots communities through continuous welfare programs, cultural preservation, and social recognition. This report documents our sustained initiatives in tribal rehabilitation, women empowerment, and national heritage preservation.
              </p>
            )}
          </div>

          {/* External Link Action if applicable */}
          {article.is_external && article.external_url && (
            <div className="p-6 rounded-2xl bg-primary/10 border border-primary/30 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-heading font-bold text-lg text-deep-forest dark:text-ethereal-white">
                  Read Full Press Release on External Media
                </h4>
                <p className="text-sm text-on-surface-variant">
                  This news item was published on an external news portal or government gazette.
                </p>
              </div>
              <a
                href={article.external_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold text-sm hover:scale-105 transition-all shadow-md shrink-0"
              >
                <span>Visit Source Site</span>
                <ExternalLink size={16} />
              </a>
            </div>
          )}

          {/* Bottom Article Footer / Share Bar */}
          <div className="pt-8 border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container dark:bg-surface-container-high hover:bg-primary text-on-surface hover:text-white font-label font-bold text-xs sm:text-sm transition-all shadow-sm"
            >
              <ArrowLeft size={16} />
              <span>Back to All News & Media</span>
            </Link>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-outline-variant/40 hover:border-primary text-on-surface text-xs font-bold transition-all"
                title="Copy Link to Clipboard"
              >
                {copied ? <Check size={15} className="text-green-600" /> : <Copy size={15} />}
                <span>{copied ? "Link Copied!" : "Copy Link"}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-xs font-bold transition-all hover:scale-105 shadow-md"
              >
                <Share2 size={15} />
                <span>Share Story</span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sticky Sidebar & Information (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-28 space-y-6">
            
            {/* Quick Takeaways Box */}
            <div className="p-6 rounded-3xl bg-surface-container dark:bg-surface-container-high border border-outline-variant/30 space-y-4 shadow-sm">
              <div className="flex items-center gap-2.5 text-primary font-heading font-bold text-lg border-b border-outline-variant/20 pb-3">
                <Sparkles size={20} className="text-saffron-glow" />
                <span>Key Takeaways</span>
              </div>
              <ul className="space-y-3.5 text-sm text-on-surface font-body">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span><strong>100% Transparency:</strong> Verified documentation and statutory compliance.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span><strong>Grassroots Impact:</strong> Direct assistance reaching tribal hamlets and rural artisans.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <span><strong>Institutional Patronage:</strong> Recognized by governors, policymakers, and civic leaders.</span>
                </li>
              </ul>
            </div>

            {/* About Dhara Foundation Card */}
            <div className="p-6 rounded-3xl bg-deep-forest text-ethereal-white space-y-4 shadow-xl border border-white/10 relative overflow-hidden">
              <div className="flex items-center gap-2.5 text-saffron-glow font-heading font-bold text-lg border-b border-white/10 pb-3">
                <Award size={20} />
                <span>About Dhara Foundation</span>
              </div>
              <p className="text-sm text-surface-variant leading-relaxed">
                Dhara Foundation is a registered national NGO dedicated to tribal rehabilitation, women empowerment, traditional folk art preservation, and child education.
              </p>
              <div className="pt-2 flex flex-col gap-2.5">
                <Link
                  href="/about"
                  className="w-full py-2.5 rounded-full bg-saffron-glow text-deep-forest font-bold text-xs text-center hover:scale-[1.02] transition-all shadow-md"
                >
                  Learn About Our Mission
                </Link>
                <Link
                  href="/contact"
                  className="w-full py-2.5 rounded-full bg-white/10 text-ethereal-white border border-white/20 font-bold text-xs text-center hover:bg-white/20 transition-all"
                >
                  Partner / Collaborate With Us
                </Link>
              </div>
            </div>

            {/* Official Verification & Support */}
            <div className="p-6 rounded-3xl bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 space-y-3 text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                <Heart size={20} />
              </div>
              <h4 className="font-heading font-bold text-base text-deep-forest dark:text-ethereal-white">
                Support Our Initiatives
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                All donations to Dhara Foundation are eligible for tax deductions under Section 80G of the Income Tax Act.
              </p>
              <div className="pt-1">
                <Link
                  href="/partnership"
                  className="inline-block text-xs font-bold text-primary hover:underline"
                >
                  View Sponsorship & CSR Options &rarr;
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

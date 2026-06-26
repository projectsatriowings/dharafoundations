"use client";

import React from "react";
import Link from "next/link";
import { ScrollReveal, RevealItem } from "@/components/motion/ScrollReveal";

const REGISTRATIONS = [
  {
    title: "Indian Trust Act",
    desc: "Registered under Indian Trust Act 1882 and Income Tax Act 1961 on 20.11.2024.",
    icon: "gavel",
    bg: "bg-secondary-container text-on-secondary-container",
  },
  {
    title: "80G Registration",
    desc: "Qualify Deduction U/S 80G of I.T Act 1961 Vide AAETD8857AE20241 (11.12.2024).",
    icon: "account_balance",
    bg: "bg-primary-container text-on-primary-container",
  },
  {
    title: "CSR Activities",
    desc: "Registered with Ministry of Corporate Affairs for CSR (CSR00086947 on 20.02.2025).",
    icon: "corporate_fare",
    bg: "bg-[#9abb4b]/30 text-tertiary",
  },
  {
    title: "NGO–DARPAN",
    desc: "Registered with NGO–DARPAN vide Regn No. TN/2024/0473120 dated 06.12.2024.",
    icon: "verified",
    bg: "bg-surface-variant text-on-surface-variant",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col relative w-full overflow-hidden">
      {/* Header / Breadcrumb Section */}
      <section className="w-full bg-surface-container-low py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8a5000_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <ScrollReveal className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 text-center space-y-4">
          <h1 className="font-display-lg-mobile md:font-display-lg text-primary font-bold drop-shadow-sm">
            About Us
          </h1>
          <div className="flex items-center justify-center space-x-2 text-on-surface-variant font-body-md">
            <Link href="/" className="hover:text-primary transition-colors font-medium">
              Home
            </Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-primary font-bold">About Us</span>
          </div>
        </ScrollReveal>
      </section>

      {/* Main Story & Mission Section */}
      <section className="py-section-gap-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Text Content */}
          <ScrollReveal direction="right" className="space-y-6">
            <div className="inline-block px-5 py-1.5 rounded-full bg-[#9abb4b]/20 text-tertiary font-label-lg uppercase tracking-widest font-bold">
              Our Mission
            </div>
            <h2 className="font-headline-md md:text-4xl text-deep-forest font-bold leading-tight">
              Transforming lives and preserving traditions with compassion
            </h2>
            <div className="text-on-surface-variant font-body-lg space-y-4 leading-relaxed opacity-90">
              <p>
                Dhara Foundations is a non-profit organization dedicated to transforming lives and protecting traditions. We work for the upliftment of tribal and rural communities, physically and mentally challenged individuals, economically underprivileged groups, and abandoned temples and spiritual centers.
              </p>
              <p>
                Our mission combines compassionate service, cultural revival, and spiritual awareness to build a society rooted in values and dignity.
              </p>
            </div>

            {/* Icons Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-outline-variant/30">
              <div className="flex flex-col group hover:translate-x-1 transition-transform">
                <span className="material-symbols-outlined text-primary text-4xl mb-2 group-hover:scale-110 transition-transform origin-left">
                  temple_hindu
                </span>
                <h3 className="font-label-lg text-deep-forest font-bold text-lg">Desiyam</h3>
                <p className="font-caption text-on-surface-variant mt-1 text-sm leading-snug">
                  Promoting and preserving India’s rich cultural identity.
                </p>
              </div>
              <div className="flex flex-col group hover:translate-x-1 transition-transform">
                <span className="material-symbols-outlined text-primary text-4xl mb-2 group-hover:scale-110 transition-transform origin-left">
                  self_improvement
                </span>
                <h3 className="font-label-lg text-deep-forest font-bold text-lg">Spiritualism</h3>
                <p className="font-caption text-on-surface-variant mt-1 text-sm leading-snug">
                  Supporting spiritual education and temple rituals.
                </p>
              </div>
              <div className="flex flex-col group hover:translate-x-1 transition-transform">
                <span className="material-symbols-outlined text-primary text-4xl mb-2 group-hover:scale-110 transition-transform origin-left">
                  diversity_1
                </span>
                <h3 className="font-label-lg text-deep-forest font-bold text-lg">Welfare</h3>
                <p className="font-caption text-on-surface-variant mt-1 text-sm leading-snug">
                  Rehabilitation and social outreach for the vulnerable.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Devotional Image */}
          <ScrollReveal direction="left" delay={0.2} className="relative group">
            <div className="absolute inset-0 bg-saffron-glow/25 rounded-[24px] translate-x-4 translate-y-4 transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6 blur-md" />
            <div className="relative bg-ethereal-white rounded-[24px] overflow-hidden shadow-2xl border border-outline-variant/10 z-10 aspect-[4/5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                alt="Ritual hands of devotion"
                src="/images/about.png"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Official Registrations Bento Grid */}
      <section className="py-section-gap-lg bg-surface-container-low relative w-full overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#24695c_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <ScrollReveal className="text-center mb-16 space-y-4">
            <h2 className="font-headline-md md:text-4xl text-deep-forest font-bold">Official Registrations</h2>
            <p className="text-on-surface-variant font-body-lg max-w-2xl mx-auto leading-relaxed">
              Committed to transparency and administrative excellence, Dhara Foundations is formally recognized by key national institutions.
            </p>
          </ScrollReveal>

          <ScrollReveal staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REGISTRATIONS.map((reg, i) => (
              <RevealItem
                key={i}
                className="modern-card bg-surface-container-lowest p-8 rounded-[24px] shadow-[0_8px_30px_rgba(36,105,92,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(36,105,92,0.1)] transition-all duration-300 border border-outline-variant/15 flex flex-col items-center text-center group"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform ${reg.bg}`}>
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {reg.icon}
                  </span>
                </div>
                <h3 className="font-headline-sm text-deep-forest font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                  {reg.title}
                </h3>
                <p className="font-caption text-on-surface-variant text-sm leading-relaxed opacity-90">
                  {reg.desc}
                </p>
              </RevealItem>
            ))}
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ScrollReveal, RevealItem } from "@/components/motion/ScrollReveal";
import BorderGlow from "@/components/ui/BorderGlow";

const REGISTRATIONS = [
  {
    title: "Section 8 Company",
    desc: "Registered under Indian Trust Act 1882 & Companies Act ensuring non-profit operations.",
    icon: "gavel",
    isHeavy: true,
  },
  {
    title: "12A Registration",
    desc: "Income Tax exemption granted under IT Act 1961 for legitimate charitable activities.",
    icon: "assured_workload",
    isHeavy: false,
  },
  {
    title: "80G Certificate",
    desc: "Qualify deduction U/S 80G of I.T Act 1961 Vide AAETD8857AE20241 (11.12.2024).",
    icon: "receipt_long",
    isHeavy: false,
  },
  {
    title: "CSR Activities",
    desc: "Registered with Ministry of Corporate Affairs for CSR (CSR00086947 on 20.02.2025).",
    icon: "corporate_fare",
    isHeavy: false,
  },
  {
    title: "NGO–DARPAN",
    desc: "Registered with NGO–DARPAN vide Regn No. TN/2024/0473120 dated 06.12.2024.",
    icon: "verified",
    isHeavy: false,
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col relative w-full overflow-hidden bg-background text-on-background">
      {/* Header / Banner Section (Sacred Flow Rebrand) */}
      <header className="mx-4 md:mx-auto max-w-[1440px] w-full pt-8 px-4 md:px-8">
        <div className="relative rounded-[40px] overflow-hidden bg-gradient-to-br from-surface-container-low to-secondary-container/20 h-[380px] sm:h-[420px] flex flex-col justify-center items-center px-6 text-center border border-outline-variant/30 shadow-lg">
          {/* Background Texture Overlay */}
          <div
            className="absolute inset-0 z-0 opacity-25 mix-blend-overlay bg-cover bg-center pointer-events-none"
            style={{ backgroundImage: "url('/images/banner.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/80 via-deep-forest/40 to-transparent mix-blend-multiply" />
          
          <div className="relative z-10 space-y-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-surface/80 dark:bg-deep-forest/80 backdrop-blur-md border border-outline-variant/30 px-5 py-2 rounded-full font-label-lg text-xs font-bold text-on-surface">
              <Link href="/" className="hover:text-primary dark:hover:text-saffron-glow transition-colors">Home</Link>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-primary dark:text-saffron-glow font-bold">About Us</span>
            </div>
            <h1 className="font-display-lg-mobile md:text-5xl lg:text-6xl font-bold text-ethereal-white leading-tight drop-shadow-md">
              Preserving Heritage, <br />
              <span className="text-saffron-glow italic font-light">Empowering Future.</span>
            </h1>
          </div>
        </div>
      </header>

      {/* Mission & Rooted Philosophy Section */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Asymmetric Image Card Left */}
          <ScrollReveal direction="right" className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="rounded-t-[100px] rounded-b-2xl overflow-hidden relative shadow-2xl h-[480px] sm:h-[580px] border border-outline-variant/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/about.png"
                  alt="Devotional wooden artifact carving and ritual offering"
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-surface/90 dark:bg-deep-forest/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-outline-variant/30 shadow-2xl max-w-[240px] sm:max-w-xs z-10">
                <p className="font-headline-md text-primary dark:text-saffron-glow font-bold text-2xl sm:text-3xl mb-1">25+ Years</p>
                <p className="font-body-md text-on-surface-variant dark:text-surface-variant text-xs sm:text-sm leading-relaxed">
                  Dedicated to cultural preservation and rural community welfare.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Philosophy Text Right */}
          <ScrollReveal direction="left" delay={0.15} className="lg:col-span-6 space-y-8 mt-8 lg:mt-0">
            <div className="space-y-4">
              <span className="font-label-lg text-primary dark:text-saffron-glow uppercase tracking-widest font-bold block text-xs">
                Our Rooted Philosophy
              </span>
              <h2 className="font-headline-md text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface leading-tight">
                Where timeless Vedic wisdom meets modern compassionate action
              </h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed text-base sm:text-lg">
                Dhara Foundations exists at the intersection of spiritual heritage and socio-economic necessity. We believe that true, lasting national progress must be firmly anchored in cultural dignity and universal compassion.
              </p>
            </div>

            <ul className="space-y-6 pt-4 border-t border-outline-variant/20">
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 dark:bg-secondary-fixed/20 flex items-center justify-center shrink-0 text-secondary dark:text-saffron-glow shadow-sm mt-1">
                  <span className="material-symbols-outlined text-2xl">temple_hindu</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-1">Desiyam (National Culture)</h3>
                  <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">Fostering a deep sense of national pride, civic unity, and heritage preservation.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary-fixed/20 flex items-center justify-center shrink-0 text-primary dark:text-saffron-glow shadow-sm mt-1">
                  <span className="material-symbols-outlined text-2xl">self_improvement</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-1">Spiritualism &amp; Renovation</h3>
                  <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">Nurturing inner spiritual awareness and physically renovating forgotten ancient temples.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-tertiary/10 dark:bg-tertiary-fixed/20 flex items-center justify-center shrink-0 text-tertiary dark:text-saffron-glow shadow-sm mt-1">
                  <span className="material-symbols-outlined text-2xl">volunteer_activism</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-lg font-bold text-on-surface mb-1">Community Welfare</h3>
                  <p className="font-body-md text-on-surface-variant text-sm leading-relaxed">Tangible, direct support for rural education, healthcare, and tribal livelihood grants.</p>
                </div>
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Official Registrations Bento Grid */}
      <section className="bg-surface-container-low py-24 px-4 sm:px-8 md:px-12 border-y border-outline-variant/15">
        <div className="max-w-[1440px] mx-auto">
          <ScrollReveal className="mb-16 space-y-3 text-center max-w-3xl mx-auto">
            <span className="font-label-lg text-primary dark:text-saffron-glow uppercase tracking-widest font-bold block text-xs">
              Accountability &amp; Trust
            </span>
            <h2 className="font-headline-md text-3xl sm:text-4xl md:text-5xl font-bold text-on-surface">
              Official Registrations
            </h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed text-base">
              Transparency and administrative excellence are the bedrock of our foundation. Formally recognized across key institutional authorities.
            </p>
          </ScrollReveal>

          <ScrollReveal staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {REGISTRATIONS.map((reg, i) => {
              const colSpan = i >= 3 ? "md:col-span-3 lg:col-span-3" : "md:col-span-1 lg:col-span-2";
              return (
                <RevealItem
                  key={i}
                  className={`bg-surface/80 dark:bg-surface-container/50 backdrop-blur-md border border-outline-variant/30 p-8 rounded-[32px] flex flex-col justify-between h-[300px] sm:h-[320px] shadow-sm hover:shadow-2xl hover:bg-deep-forest hover:text-ethereal-white hover:border-ethereal-white/10 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden cursor-pointer ${colSpan}`}
                >
                  <div className="absolute -top-12 -right-12 w-48 h-48 bg-saffron-glow/20 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 dark:bg-primary-fixed/20 flex items-center justify-center mb-6 text-primary dark:text-saffron-glow group-hover:bg-ethereal-white/10 group-hover:text-saffron-glow group-hover:scale-110 transition-all duration-500 shadow-sm">
                      <span className="material-symbols-outlined text-3xl">{reg.icon}</span>
                    </div>
                    <h3 className="font-headline-md text-xl sm:text-2xl font-bold mb-2 text-on-surface group-hover:text-ethereal-white transition-colors duration-500">
                      {reg.title}
                    </h3>
                  </div>
                  <p className="font-body-md text-on-surface-variant group-hover:text-ethereal-white/80 text-sm leading-relaxed transition-colors duration-500 relative z-10">{reg.desc}</p>
                </RevealItem>
              );
            })}
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="max-w-5xl mx-auto px-4 py-20 w-full">
        <ScrollReveal className="bg-deep-forest text-ethereal-white rounded-[40px] py-12 px-8 sm:px-12 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-ethereal-white/10 relative overflow-hidden">
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-saffron-glow/15 rounded-full blur-3xl pointer-events-none" />
          <div className="text-center md:text-left space-y-2 relative z-10">
            <h2 className="font-headline-md text-3xl sm:text-4xl font-bold text-ethereal-white">Ready to make a divine impact?</h2>
            <p className="font-body-md text-surface-container-high text-base sm:text-lg">Join hands with us in preserving our sacred heritage and lifting communities.</p>
          </div>
          <Link
            href="/contact"
            className="bg-saffron-glow text-deep-forest font-label-lg font-bold px-8 py-4 rounded-full hover:bg-ethereal-white hover:scale-105 transition-all shrink-0 shadow-lg uppercase tracking-wider relative z-10 cursor-pointer"
          >
            Get Involved Now
          </Link>
        </ScrollReveal>
      </section>
    </div>
  );
}

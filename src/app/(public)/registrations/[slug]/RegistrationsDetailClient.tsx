"use client";

import React from "react";
import Link from "next/link";
import { ParallaxBg } from "@/components/motion/ParallaxBg";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { REGISTRATION_DOCS, RegistrationDocData } from "@/data/registrations";

interface Props {
  slug: string;
}

export default function RegistrationsDetailClient({ slug }: Props) {
  const decoded = decodeURIComponent(slug || "");
  const normalized = decoded.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const doc = REGISTRATION_DOCS[normalized] || REGISTRATION_DOCS[decoded] || REGISTRATION_DOCS[slug] || REGISTRATION_DOCS["12a-registration"];

  return (
    <div className="flex flex-col relative w-full overflow-hidden bg-background text-on-background min-h-screen">
      {/* Hero Banner */}
      <ParallaxBg
        bgUrl="/images/banner.png"
        className="w-full h-[460px] min-h-[420px] flex items-center justify-center pt-24 sm:pt-28 text-ethereal-white"
        overlayClassName="bg-deep-forest/70 mix-blend-multiply"
      >
        <ScrollReveal className="text-center px-4 sm:px-8 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-surface/20 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full font-label text-xs font-bold text-ethereal-white shadow-sm flex-wrap justify-center">
            <Link href="/" className="hover:text-saffron-glow transition-colors">Home</Link>
            <span className="material-symbols-outlined text-sm text-saffron-glow">chevron_right</span>
            <Link href="/about" className="hover:text-saffron-glow transition-colors">About Us</Link>
            <span className="material-symbols-outlined text-sm text-saffron-glow">chevron_right</span>
            <span className="text-saffron-glow font-extrabold">{doc.shortTitle}</span>
          </div>

          <div className="space-y-3">
            <span className="inline-block px-4 py-1.5 rounded-full bg-saffron-glow/20 border border-saffron-glow/40 text-saffron-glow font-mono font-bold text-xs tracking-wider uppercase">
              {doc.badge}
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg leading-tight">
              {doc.title}
            </h1>
          </div>
        </ScrollReveal>
      </ParallaxBg>

      {/* Main Content Grid */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-12 py-16 w-full -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Embedded Document Viewer (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-surface dark:bg-surface-container rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-2xl space-y-6">
              
              {/* Document Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-outline-variant/20">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-primary-fixed/20 flex items-center justify-center text-primary dark:text-saffron-glow shrink-0">
                    <span className="material-symbols-outlined text-2xl">description</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-lg font-bold text-on-surface">{doc.shortTitle} Official Document</h2>
                    <p className="font-body-md text-xs text-on-surface-variant font-mono">Verified • {doc.issuingAuthority}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={doc.docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs font-bold transition-all border border-outline-variant/30 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-base">open_in_new</span>
                    <span>Open Full Screen</span>
                  </a>
                  <a
                    href={doc.docUrl}
                    download
                    className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary dark:bg-saffron-glow text-on-primary dark:text-deep-forest text-xs font-bold hover:scale-105 transition-all shadow-md"
                  >
                    <span className="material-symbols-outlined text-base">download</span>
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>

              {/* Embedded PDF Viewer */}
              <div className="w-full aspect-[1/1.3] min-h-[680px] rounded-2xl overflow-hidden border border-outline-variant/30 bg-surface-container-lowest shadow-inner relative">
                <iframe
                  src={doc.docUrl + "#toolbar=0"}
                  className="w-full h-full border-0 object-contain"
                  title={`${doc.shortTitle} Official PDF`}
                />
              </div>

            </div>
          </div>

          {/* Right Column: Metadata & Details Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            
            {/* Overview Card */}
            <div className="bg-surface dark:bg-surface-container rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-xl space-y-6">
              <div className="space-y-2">
                <span className="font-label-lg text-primary dark:text-saffron-glow uppercase tracking-widest font-bold text-xs">
                  Overview & Scope
                </span>
                <h3 className="font-headline-sm text-xl font-bold text-on-surface">
                  About this Registration
                </h3>
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                  {doc.description}
                </p>
              </div>

              <div className="pt-4 border-t border-outline-variant/20 space-y-4">
                <h4 className="font-headline-sm text-sm font-bold text-on-surface uppercase tracking-wider">
                  Key Benefits & Compliance
                </h4>
                <ul className="space-y-3">
                  {doc.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      <span className="material-symbols-outlined text-base text-primary dark:text-saffron-glow shrink-0 mt-0.5">verified_user</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Key Metadata Table Card */}
            <div className="bg-surface dark:bg-surface-container rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-xl space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-outline-variant/20">
                <span className="material-symbols-outlined text-xl text-primary dark:text-saffron-glow">fact_check</span>
                <h3 className="font-headline-sm text-base font-bold text-on-surface">
                  Registration Details
                </h3>
              </div>

              <div className="space-y-4">
                {doc.keyDetails.map((detail, idx) => (
                  <div key={idx} className="flex flex-col gap-1 pb-3 border-b border-outline-variant/10 last:border-0 last:pb-0">
                    <span className="text-[11px] font-mono text-on-surface-variant/80 uppercase tracking-wider font-bold">
                      {detail.label}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-on-surface break-words">
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation to Other Registrations */}
            <div className="bg-deep-forest text-ethereal-white rounded-3xl p-6 sm:p-8 border border-ethereal-white/10 shadow-xl space-y-4 relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-saffron-glow/15 rounded-full blur-2xl pointer-events-none" />
              <h4 className="font-headline-sm text-base font-bold text-white relative z-10">
                Explore Other Registrations
              </h4>
              <div className="space-y-2.5 relative z-10">
                {Object.values(REGISTRATION_DOCS).map((item) => {
                  if (item.slug === doc.slug) return null;
                  return (
                    <Link
                      key={item.slug}
                      href={`/registrations/${item.slug}`}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm font-bold transition-all group"
                    >
                      <span className="group-hover:text-saffron-glow transition-colors">{item.shortTitle}</span>
                      <span className="material-symbols-outlined text-base text-saffron-glow group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}

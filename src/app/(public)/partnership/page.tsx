"use client";

import React from "react";
import { ScrollReveal, RevealItem } from "@/components/motion/ScrollReveal";
import { ParallaxBg } from "@/components/motion/ParallaxBg";
import { PillButton } from "@/components/ui/PillButton";

export default function PartnershipPage() {
  return (
    <div className="flex flex-col relative w-full overflow-hidden bg-surface">
      {/* Hero Section */}
      <ParallaxBg
        bgUrl="/images/banner.png"
        className="min-h-[620px] flex items-center justify-center pt-28 sm:pt-32 text-ethereal-white"
        overlayClassName="bg-deep-forest/50 mix-blend-multiply"
      >
        <ScrollReveal className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-saffron-glow/25 text-saffron-glow font-bold text-sm border border-saffron-glow/40 shadow-sm">
            <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
              handshake
            </span>
            <span>Corporate Partnerships</span>
          </span>

          <h1 className="font-heading text-ethereal-white mb-6 max-w-4xl mx-auto leading-tight font-bold text-3xl sm:text-4xl lg:text-5xl drop-shadow-lg">
            Empower Communities. <br className="hidden md:block" />
            <span className="text-saffron-glow italic font-light">Elevate Your Impact.</span>
          </h1>

          <p className="font-body text-surface-container-low/90 max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
            Join hands with Dhara Foundations to weave a tapestry of positive change. Our partnership programs are rooted in the ancient wisdom of Dharma, translated into modern, measurable social impact.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <PillButton href="#partner-tiers" variant="primary" className="!px-8 !py-4 !text-base">
              Explore Tiers
            </PillButton>
            <PillButton href="/contact" variant="hero-secondary" className="!px-8 !py-4 !text-base">
              Contact Us
            </PillButton>
          </div>
        </ScrollReveal>
      </ParallaxBg>

      {/* Why Partner With Us Bento Grid */}
      <section id="partner-tiers" className="py-20 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <ScrollReveal className="text-center mb-16 space-y-4">
          <h2 className="font-headline-md text-3xl md:text-4xl font-bold text-deep-forest">Why Partner With Us?</h2>
          <div className="w-24 h-1.5 bg-saffron-glow mx-auto rounded-full shadow-sm" />
        </ScrollReveal>

        <ScrollReveal staggerChildren={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <RevealItem className="md:col-span-2">
            <div className="modern-card bg-surface-container-lowest rounded-3xl p-8 md:p-10 shadow-soft hover:shadow-soft-hover border border-outline-variant/25 flex flex-col justify-between overflow-hidden relative group h-full">
              <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified_user
                  </span>
                </div>
                <h3 className="font-headline-sm text-deep-forest font-bold text-2xl">Sacred Transparency</h3>
                <p className="font-body-md text-on-surface-variant max-w-md leading-relaxed text-base">
                  We uphold the highest standards of administrative clarity. Every contribution is tracked, and comprehensive impact reports are shared regularly, ensuring complete trust and alignment with your CSR goals.
                </p>
              </div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-saffron-glow/15 rounded-tl-full blur-3xl translate-x-1/4 translate-y-1/4 pointer-events-none" />
            </div>
          </RevealItem>

          {/* Feature 2 */}
          <RevealItem className="h-full">
            <div className="modern-card bg-deep-forest text-ethereal-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-xl flex flex-col justify-between relative overflow-hidden group h-full border border-ethereal-white/10">
              <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-saffron-glow/25 text-saffron-glow flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl">water_drop</span>
                </div>
                <h3 className="font-headline-sm font-bold text-2xl text-ethereal-white">Organic Growth</h3>
                <p className="font-body-md text-surface-variant leading-relaxed text-base">
                  Our programs are designed to nurture long-term, self-sustaining community development, akin to tending a sacred grove.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/40 rounded-bl-full blur-2xl pointer-events-none" />
            </div>
          </RevealItem>

          {/* Feature 3 */}
          <RevealItem className="h-full">
            <div className="modern-card bg-surface-container-lowest rounded-3xl p-8 md:p-10 shadow-soft hover:shadow-soft-hover border border-outline-variant/25 space-y-4 group h-full flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#9abb4b]/20 text-tertiary flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    diversity_1
                  </span>
                </div>
                <h3 className="font-headline-sm text-deep-forest font-bold text-2xl mb-3">Holistic Well-being</h3>
                <p className="font-body-md text-on-surface-variant leading-relaxed text-base">
                  Addressing physical, educational, and spiritual needs simultaneously to uplift the entire human experience.
                </p>
              </div>
            </div>
          </RevealItem>

          {/* Feature 4 with Image */}
          <RevealItem className="md:col-span-2">
            <div className="modern-card rounded-3xl overflow-hidden relative shadow-lg group min-h-[300px] h-full flex flex-col justify-end p-8 md:p-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                alt="Engage Your Team volunteering"
                src="/images/volunteer.png"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/95 via-deep-forest/40 to-transparent" />
              <div className="relative z-10 text-ethereal-white space-y-2">
                <h3 className="font-headline-sm text-2xl font-bold text-saffron-glow">Engage Your Team</h3>
                <p className="font-body-md text-surface-variant max-w-lg leading-relaxed text-base">
                  Meaningful volunteering opportunities that foster team building, spiritual grounding, and a shared sense of purpose among your employees.
                </p>
              </div>
            </div>
          </RevealItem>
        </ScrollReveal>
      </section>
    </div>
  );
}

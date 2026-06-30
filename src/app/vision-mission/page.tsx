"use client";

import React from "react";
import { ScrollReveal, RevealItem } from "@/components/motion/ScrollReveal";
import { ParallaxBg } from "@/components/motion/ParallaxBg";

export default function VisionMissionPage() {
  return (
    <div className="flex flex-col relative w-full overflow-hidden">
      {/* Hero Section */}
      <ParallaxBg
        bgUrl="/images/banner.png"
        className="w-full h-[620px] min-h-[520px] flex items-center justify-center pt-28 sm:pt-32 text-ethereal-white"
        overlayClassName="bg-deep-forest/50 mix-blend-multiply"
      >
        <ScrollReveal className="text-center px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto py-20">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-ethereal-white mb-6 font-bold drop-shadow-lg">
            Guided by Light, Rooted in Dharma
          </h1>
          <p className="font-body text-surface-container-low/90 max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
            Our vision and mission embody the divine vitality of Sanatana Dharma, dedicated to nurturing compassion, wisdom, and sustainable growth in our communities.
          </p>
        </ScrollReveal>
      </ParallaxBg>

      {/* Vision & Mission Bento Grid */}
      <section className="py-section-gap-md md:py-section-gap-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <ScrollReveal staggerChildren={0.15} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Vision Card */}
          <RevealItem className="lg:col-span-7">
            <div className="modern-card bg-surface-container-lowest rounded-[24px] p-8 md:p-12 h-full relative overflow-hidden group hover:-translate-y-2 transition-all duration-300 border border-outline-variant/20 shadow-soft">
              <div className="absolute -right-10 -top-10 text-primary-container/15 group-hover:text-primary-container/25 transition-colors duration-500 pointer-events-none select-none">
                <span className="material-symbols-outlined !text-[220px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  visibility
                </span>
              </div>
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center space-x-2 bg-saffron-glow/20 text-primary px-4 py-1.5 rounded-full font-label-lg font-bold">
                  <span className="material-symbols-outlined text-[18px]">flare</span>
                  <span>Our Vision</span>
                </div>
                <h2 className="font-headline-md md:text-4xl text-deep-forest font-bold leading-tight">
                  A World Illuminated by Sacred Wisdom
                </h2>
                <p className="font-body-lg text-on-surface-variant leading-relaxed">
                  To reawaken the timeless principles of Sanatana Dharma, creating a global community where spiritual vitality, ecological harmony, and profound compassion guide humanity towards an enlightened and sustainable future. We envision spaces where ancient traditions breathe life into modern existence.
                </p>
              </div>
            </div>
          </RevealItem>

          {/* Practical Devotion Image Card */}
          <RevealItem className="lg:col-span-5">
            <div className="modern-card rounded-[24px] overflow-hidden h-full min-h-[280px] relative group shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                alt="Evening arti diya ceremony"
                src="/images/event-3.png"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-forest/90 via-deep-forest/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 space-y-2 z-10">
                <span className="material-symbols-outlined text-saffron-glow text-4xl block" style={{ fontVariationSettings: "'FILL' 1" }}>
                  volunteer_activism
                </span>
                <h3 className="font-headline-sm text-ethereal-white text-2xl font-bold">Practical Devotion</h3>
              </div>
            </div>
          </RevealItem>

          {/* Mission Card Split */}
          <RevealItem className="lg:col-span-12">
            <div className="modern-card bg-surface-container-lowest rounded-[24px] p-8 md:p-12 shadow-soft border border-outline-variant/20 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-tertiary-container/20 text-secondary px-4 py-1.5 rounded-full font-label-lg font-bold">
                    <span className="material-symbols-outlined text-[18px]">track_changes</span>
                    <span>Our Mission</span>
                  </div>
                  <h2 className="font-headline-md md:text-4xl text-deep-forest font-bold leading-tight">
                    Cultivating Roots, Empowering Branches
                  </h2>
                  <p className="font-body-lg text-on-surface-variant leading-relaxed">
                    We actively preserve and propagate sacred knowledge through comprehensive educational programs, community service, and the restoration of spiritual heritage sites.
                  </p>
                  <ul className="space-y-3 pt-2">
                    {[
                      "Establishing learning centers for Vedic studies.",
                      "Implementing eco-conscious initiatives modeled on natural dharma.",
                      "Providing accessible spiritual sanctuaries for all seekers.",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start space-x-3 text-on-surface font-medium">
                        <span className="material-symbols-outlined text-primary mt-0.5 text-xl shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                          check_circle
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="h-full min-h-[330px] rounded-[20px] overflow-hidden relative shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    alt="Open-air sustainable learning sanctuary"
                    src="/images/event-2.png"
                  />
                </div>
              </div>
            </div>
          </RevealItem>
        </ScrollReveal>
      </section>

      {/* Core Values Section */}
      <section className="py-section-gap-md md:py-section-gap-lg bg-surface-container-low px-margin-mobile md:px-margin-desktop relative w-full">
        <div className="max-w-container-max mx-auto">
          <ScrollReveal className="text-center mb-16 space-y-4">
            <h2 className="font-headline-md md:text-4xl text-deep-forest font-bold">Core Values</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full" />
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              The pillars of our foundation, guiding every action and intention with divine vitality.
            </p>
          </ScrollReveal>

          <ScrollReveal staggerChildren={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Spiritual Purity",
                desc: "Maintaining the authenticity and sanctity of ancient teachings while adapting their delivery for the modern soul.",
                icon: "self_improvement",
                bg: "bg-saffron-glow/20 text-primary",
              },
              {
                title: "Harmonious Ecology",
                desc: "Honoring the earth as sacred, promoting sustainability, and living in balance with the natural rhythms of life.",
                icon: "eco",
                bg: "bg-secondary-container/40 text-secondary",
              },
              {
                title: "Compassionate Action",
                desc: "Translating devotion into tangible service, ensuring our communities thrive through support and mutual respect.",
                icon: "diversity_1",
                bg: "bg-[#9abb4b]/20 text-tertiary",
              },
            ].map((val, idx) => (
              <RevealItem
                key={idx}
                className="modern-card bg-surface-container-lowest p-8 rounded-[24px] shadow-soft hover:shadow-soft-hover hover:-translate-y-2 transition-all duration-300 border border-outline-variant/15 flex flex-col items-start group"
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform ${val.bg}`}>
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {val.icon}
                  </span>
                </div>
                <h3 className="font-headline-sm text-deep-forest font-bold text-xl mb-3 group-hover:text-primary transition-colors">
                  {val.title}
                </h3>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  {val.desc}
                </p>
              </RevealItem>
            ))}
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}

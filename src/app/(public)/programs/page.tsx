"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ScrollReveal, RevealItem } from "@/components/motion/ScrollReveal";
import { ParallaxBg } from "@/components/motion/ParallaxBg";
import { PillButton } from "@/components/ui/PillButton";

export default function ProgramsPage() {
  const [dbPrograms, setDbPrograms] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/public/programs")
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.programs)) {
          setDbPrograms(data.programs);
        }
      })
      .catch(err => console.error("Error fetching public programs:", err));
  }, []);

  return (
    <div className="flex flex-col relative w-full overflow-hidden bg-surface">
      {/* Hero Section */}
      <section className="relative pt-28 sm:pt-32 pb-16 px-4 sm:px-8 max-w-[1440px] mx-auto flex flex-col items-center text-center">
        <ScrollReveal className="max-w-4xl space-y-6">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-deep-forest font-bold leading-tight">
            Transforming lives and preserving traditions with compassion
          </h1>
          <p className="font-body text-on-surface-variant max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
            Our mission combines compassionate service, cultural revival, and spiritual awareness to build a society rooted in values and dignity. Explore our core initiatives below.
          </p>
        </ScrollReveal>
      </section>

      {/* Programs Container */}
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col gap-24 pb-24 w-full">
        {/* Dynamic Database Programs */}
        {dbPrograms.map((prog, idx) => (
          <section key={`${prog.id || 'prog'}-${idx}`} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <ScrollReveal direction={idx % 2 === 0 ? "right" : "left"} className={`lg:col-span-6 ${idx % 2 === 0 ? "order-2 lg:order-1" : "order-2 lg:order-2 lg:col-start-7"} rounded-3xl overflow-hidden shadow-xl bg-surface-container-lowest h-[350px] md:h-[440px] relative group`}>
              <img
                className="w-full h-full object-cover rounded-3xl group-hover:scale-108 transition-transform duration-700 ease-out"
                alt={prog.title}
                src={prog.cover_image_url || "/images/gallery-1.png"}
              />
            </ScrollReveal>
            <ScrollReveal direction={idx % 2 === 0 ? "left" : "right"} className={`lg:col-span-5 ${idx % 2 === 0 ? "order-1 lg:order-2 lg:col-start-8" : "order-1 lg:order-1"} space-y-6`}>
              <div className="inline-block bg-[#9abb4b]/20 text-tertiary font-bold px-4 py-1.5 rounded-full text-xs tracking-wider uppercase">
                {prog.category || "Community Welfare"}
              </div>
              <h2 className="font-headline-md md:text-4xl text-deep-forest font-bold">{prog.title}</h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed">
                {prog.short_description || prog.full_description}
              </p>
              <PillButton href="/contact" variant="primary">
                Support this Program
              </PillButton>
            </ScrollReveal>
          </section>
        ))}

        {/* Category 1: Tribal & Rural Welfare */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <ScrollReveal direction="right" className="lg:col-span-6 order-2 lg:order-1 rounded-3xl overflow-hidden shadow-xl bg-surface-container-lowest h-[350px] md:h-[440px] relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover rounded-3xl group-hover:scale-108 transition-transform duration-700 ease-out"
              alt="Tribal and Rural Welfare"
              src="/images/gallery-1.png"
            />
          </ScrollReveal>

          <ScrollReveal direction="left" className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2 space-y-6">
            <div className="inline-block bg-[#9abb4b]/20 text-tertiary font-bold px-4 py-1.5 rounded-full text-xs tracking-wider uppercase">
              Community Welfare
            </div>
            <h2 className="font-headline-md md:text-4xl text-deep-forest font-bold">Tribal & Rural Welfare</h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              We work for the upliftment of tribal and rural communities, physically and mentally challenged individuals, and economically underprivileged groups. Through rehabilitation, medical care, and social outreach, we empower vulnerable people to live with purpose and pride.
            </p>

            <div className="w-full bg-surface-container-low rounded-2xl p-6 transition-all duration-300 border border-outline-variant/30 hover:border-primary/40 shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  volunteer_activism
                </span>
                <h3 className="font-headline-sm text-deep-forest font-bold text-lg">Key Projects</h3>
              </div>
              <ul className="space-y-2.5 text-on-surface-variant font-medium text-sm">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">check_circle</span>
                  <span>Tribal welfare activities at Javadhu hills</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">check_circle</span>
                  <span>Digitisation activities for Women Self Help Groups</span>
                </li>
              </ul>
            </div>

            <PillButton href="/contact" variant="primary">
              Support this Project
            </PillButton>
          </ScrollReveal>
        </section>

        {/* Category 2: Spiritualism & Temple Protection */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <ScrollReveal direction="right" className="lg:col-span-5 order-1 space-y-6">
            <div className="inline-block bg-saffron-glow/30 text-primary font-bold px-4 py-1.5 rounded-full text-xs tracking-wider uppercase">
              Spiritualism
            </div>
            <h2 className="font-headline-md md:text-4xl text-deep-forest font-bold">Spiritualism & Temple Protection</h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              We support spiritual education, temple renovation, and rituals that connect communities with timeless wisdom. Our efforts aim to restore abandoned temples and spiritual centers, promoting and preserving India’s rich cultural identity and heritage arts.
            </p>

            <div className="w-full bg-surface-container-low rounded-2xl p-6 transition-all duration-300 border border-outline-variant/30 hover:border-primary/40 shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  temple_hindu
                </span>
                <h3 className="font-headline-sm text-deep-forest font-bold text-lg">Key Initiatives</h3>
              </div>
              <ul className="space-y-2.5 text-on-surface-variant font-medium text-sm">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">check_circle</span>
                  <span>Cuddalore Rabhavendra Temple Restoration</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">check_circle</span>
                  <span>Sanatana Dharma Educational Programs</span>
                </li>
              </ul>
            </div>

            <PillButton href="/contact" variant="secondary">
              Support this Project
            </PillButton>
          </ScrollReveal>

          <ScrollReveal direction="left" className="lg:col-span-6 lg:col-start-7 order-2 rounded-3xl overflow-hidden shadow-xl bg-surface-container-lowest h-[350px] md:h-[440px] relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover rounded-3xl group-hover:scale-108 transition-transform duration-700 ease-out"
              alt="Temple Restoration"
              src="/images/gallery-2.png"
            />
          </ScrollReveal>
        </section>

        {/* Category 3: Community Outreach & Care */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <ScrollReveal direction="right" className="lg:col-span-6 order-2 lg:order-1 rounded-3xl overflow-hidden shadow-xl bg-surface-container-lowest h-[350px] md:h-[440px] relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover rounded-3xl group-hover:scale-108 transition-transform duration-700 ease-out"
              alt="Community Outreach"
              src="/images/gallery-3.png"
            />
          </ScrollReveal>

          <ScrollReveal direction="left" className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2 space-y-6">
            <div className="inline-block bg-secondary-container/50 text-secondary font-bold px-4 py-1.5 rounded-full text-xs tracking-wider uppercase">
              Desiyam
            </div>
            <h2 className="font-headline-md md:text-4xl text-deep-forest font-bold">Community Outreach & Care</h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed">
              Our outreach programs are designed to provide immediate relief and long-term support to those in need. From providing meals and clothing to organizing health camps, we strive to bring comfort and essential services directly to the vulnerable sections of society.
            </p>

            <div className="w-full bg-surface-container-low rounded-2xl p-6 transition-all duration-300 border border-outline-variant/30 hover:border-primary/40 shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  groups
                </span>
                <h3 className="font-headline-sm text-deep-forest font-bold text-lg">Recent Actions</h3>
              </div>
              <ul className="space-y-2.5 text-on-surface-variant font-medium text-sm">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">check_circle</span>
                  <span>Providing Diwali Dresses To Home Children</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">check_circle</span>
                  <span>Meal and food carriers to Govt Home Children</span>
                </li>
              </ul>
            </div>

            <PillButton href="/contact" variant="primary">
              Support this Project
            </PillButton>
          </ScrollReveal>
        </section>
      </div>

      {/* Call to Action (Parallax Band) */}
      <ParallaxBg
        bgUrl="/images/volunteer.png"
        className="w-full h-[60vh] min-h-[380px] flex items-center justify-center bg-deep-forest text-ethereal-white"
        overlayClassName="bg-deep-forest/75 mix-blend-multiply"
      >
        <ScrollReveal className="text-center px-margin-mobile space-y-8">
          <h2 className="font-display-lg-mobile md:font-display-lg font-bold leading-tight drop-shadow-md">
            Join your hand with us for a <br /> better life and future
          </h2>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-saffron-glow text-deep-forest font-label-lg px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_25px_rgba(255,210,127,0.4)] font-bold text-lg"
            >
              Become a Volunteer
            </Link>
          </div>
        </ScrollReveal>
      </ParallaxBg>
    </div>
  );
}

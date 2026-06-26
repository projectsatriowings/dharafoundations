"use client";

import React from "react";
import { ScrollReveal, RevealItem } from "@/components/motion/ScrollReveal";
import { ParallaxBg } from "@/components/motion/ParallaxBg";
import { PillButton } from "@/components/ui/PillButton";

export default function FounderMessagePage() {
  return (
    <div className="flex flex-col relative w-full overflow-hidden">
      {/* Hero Section */}
      <ParallaxBg
        bgUrl="/images/banner.png"
        className="min-h-[55vh] flex items-center justify-center text-ethereal-white"
        overlayClassName="bg-deep-forest/50 mix-blend-multiply"
      >
        <ScrollReveal className="text-center max-w-4xl px-margin-mobile md:px-margin-desktop mx-auto py-16">
          <h1 className="font-display-lg-mobile md:font-display-lg text-ethereal-white mb-6 font-bold drop-shadow-lg">
            A Message from Our Founders
          </h1>
          <p className="font-body-lg text-surface-container-low/90 max-w-2xl mx-auto leading-relaxed text-lg">
            Rooted in compassion and guided by the timeless wisdom of Sanatana Dharma, our founders envision a world where every life is transformed and every tradition is protected.
          </p>
          <div className="w-24 h-1 bg-saffron-glow mx-auto mt-8 rounded-full shadow-[0_0_12px_rgba(255,210,127,0.5)]" />
        </ScrollReveal>
      </ParallaxBg>

      {/* Profiles Bento Grid Section */}
      <section className="py-section-gap-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <ScrollReveal staggerChildren={0.15} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile 1: S. Vinoth Ragavendran */}
          <RevealItem className="lg:col-span-12">
            <div className="modern-card bg-surface-container-lowest rounded-[24px] p-8 md:p-12 shadow-[0_8px_30px_rgba(36,105,92,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(36,105,92,0.1)] transition-all duration-300 border border-outline-variant/15 group">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 relative">
                  <div className="absolute inset-0 bg-saffron-glow/25 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover rounded-full border-4 border-ethereal-white relative z-10 shadow-md group-hover:scale-105 transition-transform duration-500"
                    alt="S. Vinoth Ragavendran"
                    src="/images/about.png"
                  />
                </div>
                <div className="grow text-center md:text-left space-y-4">
                  <h2 className="font-headline-md md:text-4xl text-deep-forest font-bold">S. Vinoth Ragavendran</h2>
                  <p className="font-label-lg text-primary tracking-widest uppercase font-bold text-sm">
                    Engineering Entrepreneur & Social Contributor
                  </p>
                  <blockquote className="text-xl text-on-surface italic border-l-4 border-saffron-glow pl-6 py-1 font-serif">
                    &ldquo;Preserving our spiritual heritage is not just about the past; it&apos;s about building a foundation of values for the future generations.&rdquo;
                  </blockquote>
                  <p className="font-body-md text-on-surface-variant leading-relaxed">
                    Hailing from Cuddalore, he holds a Master&apos;s degree in Engineering from Anna University. With over two decades of experience in the construction industry. He has been actively involved in temple protection initiatives, legal advocacy, and efforts towards preserving spiritual and cultural heritage.
                  </p>
                </div>
              </div>
            </div>
          </RevealItem>

          {/* Profile 2: P. Ezhumalai */}
          <RevealItem className="lg:col-span-6">
            <div className="modern-card bg-surface-container-lowest rounded-[24px] p-8 md:p-10 shadow-[0_8px_30px_rgba(36,105,92,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(36,105,92,0.1)] transition-all duration-300 border border-outline-variant/15 group h-full flex flex-col justify-between">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-44 h-44 shrink-0 relative mb-4">
                  <div className="absolute inset-0 bg-secondary-fixed/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-500" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover rounded-full border-4 border-ethereal-white relative z-10 shadow-md group-hover:scale-105 transition-transform duration-500"
                    alt="P. Ezhumalai"
                    src="/images/event-1.png"
                  />
                </div>
                <h2 className="font-headline-sm text-deep-forest font-bold text-2xl">P. Ezhumalai</h2>
                <p className="font-caption text-secondary uppercase tracking-wider text-xs font-bold px-4 py-1.5 bg-secondary-fixed/20 rounded-full">
                  Agriculturist & Social Worker
                </p>
                <blockquote className="font-body-lg text-on-surface italic relative pt-2 font-serif">
                  <span className="material-symbols-outlined absolute -top-4 -left-4 text-saffron-glow opacity-30 text-4xl">format_quote</span>
                  &ldquo;True service begins when we connect deeply with our roots and uplift those around us with renewed purpose.&rdquo;
                </blockquote>
                <p className="font-body-md text-on-surface-variant leading-relaxed pt-2">
                  A dedicated agriculturist and dairy farmer, he has been active in public life since childhood. His deep devotion to Hindu values and continue his service with renewed purpose.
                </p>
              </div>
            </div>
          </RevealItem>

          {/* Profile 3: S. Srividhya */}
          <RevealItem className="lg:col-span-6">
            <div className="modern-card bg-surface-container-lowest rounded-[24px] p-8 md:p-10 shadow-[0_8px_30px_rgba(36,105,92,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(36,105,92,0.1)] transition-all duration-300 border border-outline-variant/15 group h-full flex flex-col justify-between">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-44 h-44 shrink-0 relative mb-4">
                  <div className="absolute inset-0 bg-[#9abb4b]/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-500" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover rounded-full border-4 border-ethereal-white relative z-10 shadow-md group-hover:scale-105 transition-transform duration-500"
                    alt="S. Srividhya"
                    src="/images/news.png"
                  />
                </div>
                <h2 className="font-headline-sm text-deep-forest font-bold text-2xl">S. Srividhya</h2>
                <p className="font-caption text-tertiary uppercase tracking-wider text-xs font-bold px-4 py-1.5 bg-[#9abb4b]/20 rounded-full">
                  Chartered Accountant & Company Secretary
                </p>
                <blockquote className="font-body-lg text-on-surface italic relative pt-2 font-serif">
                  <span className="material-symbols-outlined absolute -top-4 -left-4 text-saffron-glow opacity-30 text-4xl">format_quote</span>
                  &ldquo;Commitment to ethics and precision is the bedrock of responsible service and lasting community impact.&rdquo;
                </blockquote>
                <p className="font-body-md text-on-surface-variant leading-relaxed pt-2">
                  A dual-qualified professional, she brings expertise as both a Chartered Accountant and Company Secretary. Her commitment to ethics and precision reflects a deep dedication to professional excellence and responsible service.
                </p>
              </div>
            </div>
          </RevealItem>
        </ScrollReveal>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop bg-surface-container-low text-center">
        <ScrollReveal className="max-w-4xl mx-auto space-y-6">
          <h2 className="font-display-lg-mobile md:font-headline-md text-deep-forest text-3xl md:text-4xl font-bold">
            Join your hand with us for a better life and future
          </h2>
          <p className="font-body-md text-on-surface-variant text-lg">
            Become a volunteer and help us transform lives.
          </p>
          <div className="pt-2">
            <PillButton href="/contact" variant="primary">
              Discover More
            </PillButton>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react'

export function NeoMinimalFooter() {
  return (
    <footer className="w-full bg-deep-forest text-ethereal-white border-t border-ethereal-white/10 rounded-t-3xl flex flex-wrap pt-16 pb-8 relative overflow-hidden mt-12 shadow-2xl font-body-md" id="main-footer">
      
      {/* Background Tech Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(circle_at_center,black,transparent_85%)] pointer-events-none" />

      {/* Subtle Saffron Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-saffron-glow/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 mb-16">
          
          {/* Brand Column (Span 5) */}
          <div className="col-span-1 sm:col-span-2 md:col-span-5 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3.5 hover:opacity-95 transition-transform hover:scale-[1.02] w-fit group/logo">
              <img
                src="/logo-icon-only.png?v=10"
                alt="Dhara Foundations Emblem"
                className="h-14 w-14 sm:h-16 sm:w-16 object-contain block shrink-0"
              />
              <div className="flex flex-col justify-center w-[138px] sm:w-[162px]">
                <div className="flex justify-between items-center w-full font-heading font-black text-[19.5px] sm:text-[23px] text-ethereal-white group-hover/logo:text-saffron-glow transition-colors leading-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)]">
                  {"DHARA".split("").map((char, idx) => (
                    <span key={idx}>{char}</span>
                  ))}
                </div>
                <div className="flex justify-between items-center w-full font-title font-black text-[10.5px] sm:text-[12.5px] text-saffron-glow uppercase leading-tight mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                  {"FOUNDATIONS".split("").map((char, idx) => (
                    <span key={idx}>{char}</span>
                  ))}
                </div>
              </div>
            </Link>
            <p className="text-sm text-secondary-fixed-dim leading-relaxed max-w-md font-body opacity-90">
              A non-profit organization dedicated to transforming lives and protecting traditions through compassionate service and cultural revival.
            </p>
            
            {/* Minimal Signal/Newsletter Input */}
            <div className="flex items-center gap-2 mt-2 group w-full max-w-md">
              <div className="relative flex-1">
                <input 
                  type="email" 
                  placeholder="Enter email to join newsletter..." 
                  className="w-full bg-white/5 border border-ethereal-white/20 rounded-lg px-4 py-2.5 text-sm text-ethereal-white placeholder:text-ethereal-white/40 focus:outline-none focus:border-saffron-glow transition-all font-body"
                />
              </div>
              <button 
                className="p-2.5 px-4 bg-saffron-glow rounded-lg text-deep-forest hover:bg-white transition-colors cursor-pointer font-bold shadow-md active:scale-95 flex items-center justify-center shrink-0"
                aria-label="Subscribe"
              >
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Quick Contact Info */}
            <div className="pt-2 space-y-2.5 text-sm text-secondary-fixed-dim font-body">
              <div className="flex items-center gap-2.5">
                <Mail size={16} className="text-saffron-glow shrink-0" />
                <a href="mailto:info@dharafoundations.in" className="hover:text-ethereal-white transition-colors break-all sm:break-normal">info@dharafoundations.in</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className="text-saffron-glow shrink-0" />
                <a href="tel:04422236641" className="hover:text-ethereal-white transition-colors">044-22236641</a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-saffron-glow shrink-0 mt-0.5" />
                <span>#44A, 3rd St, Judge Colony, Tambaram Sanatorium, Chennai - 600047</span>
              </div>
            </div>
          </div>

          {/* Links Columns (Span 2 to 3 each) */}
          {[
            { 
              title: "Quick Links", 
              links: [
                { name: "About Us", href: "/about" },
                { name: "Sanatana Dharma", href: "/about" },
                { name: "Events & Activities", href: "/events" },
                { name: "Sevas", href: "/gallery" }
              ] 
            },
            { 
              title: "Organisation", 
              links: [
                { name: "Vision & Mission", href: "/vision-mission" },
                { name: "Founder's Message", href: "/founder-message" },
                { name: "News & Media", href: "/news" },
                { name: "Partnerships", href: "/partnership" }
              ] 
            },
            { 
              title: "Legal & Support", 
              links: [
                { name: "Privacy Policy", href: "#" },
                { name: "CSR Policy", href: "#" },
                { name: "Donation FAQ", href: "#" },
                { name: "Contact Us", href: "/contact" }
              ] 
            }
          ].map((section, idx) => (
             <div key={idx} className={`col-span-1 sm:col-span-1 md:col-span-${idx === 2 ? '3' : '2'} flex flex-col gap-3 sm:gap-4`}>
                <h4 className="font-label-lg text-saffron-glow uppercase tracking-wider text-xs sm:text-sm font-bold">
                  {section.title}
                </h4>
                <ul className="flex flex-col gap-2.5 sm:gap-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm font-body text-secondary-fixed-dim hover:text-saffron-glow transition-colors flex items-center gap-2.5 group w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-ethereal-white/40 group-hover:bg-saffron-glow transition-all group-hover:w-3.5 duration-300" />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
             </div>
          ))}

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-ethereal-white/10 font-body-md">
          <p className="text-sm text-secondary-fixed-dim">
            © {new Date().getFullYear()} Dhara Foundations. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {/* Socials - Integrated Horizontal */}
            <div className="flex gap-4 border-r border-ethereal-white/15 pr-6 mr-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-secondary-fixed-dim hover:text-saffron-glow transition-colors" aria-label="Facebook">
                <span className="material-symbols-outlined text-lg">share</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-secondary-fixed-dim hover:text-saffron-glow transition-colors" aria-label="YouTube">
                <span className="material-symbols-outlined text-lg">play_arrow</span>
              </a>
            </div>
               
            {/* Status Indicator */}
            <div className="flex items-center gap-2 px-3.5 py-1 rounded-full bg-saffron-glow/10 border border-saffron-glow/20 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-saffron-glow animate-pulse" />
              <span className="text-xs uppercase font-label-md font-bold text-saffron-glow tracking-wider">Serving Dharma & Society</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

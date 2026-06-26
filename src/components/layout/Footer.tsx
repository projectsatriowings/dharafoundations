import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-deep-forest text-ethereal-white font-body-md text-body-md full-width border-t border-outline-variant/20 relative overflow-hidden" id="main-footer">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-section-gap-md max-w-container-max mx-auto relative z-10">
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1 space-y-4">
          <Link href="/" className="inline-block mb-5 hover:opacity-90 transition-opacity">
            <img
              src="/logo-stacked-dark.png"
              alt="Dhara Foundations"
              className="h-28 sm:h-32 md:h-36 w-auto object-contain drop-shadow-sm"
            />
          </Link>
          <p className="text-secondary-fixed-dim text-sm pr-4 opacity-80 leading-relaxed mt-2">
            A non-profit organization dedicated to transforming lives and protecting traditions through compassionate service and cultural revival.
          </p>
          <div className="flex gap-4 pt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-ethereal-white/10 flex items-center justify-center text-saffron-glow hover:bg-saffron-glow hover:text-deep-forest hover:scale-110 transition-all"
              aria-label="Facebook"
            >
              <span className="material-symbols-outlined text-sm">share</span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-ethereal-white/10 flex items-center justify-center text-saffron-glow hover:bg-saffron-glow hover:text-deep-forest hover:scale-110 transition-all"
              aria-label="YouTube"
            >
              <span className="material-symbols-outlined text-sm">play_arrow</span>
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="col-span-1 space-y-4">
          <h4 className="font-label-lg text-saffron-glow uppercase tracking-wider mb-4">Quick Links</h4>
          <ul className="space-y-3">
            <li>
              <Link href="/about" className="text-secondary-fixed-dim hover:text-ethereal-white transition-colors hover:translate-x-1 inline-block">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/programs" className="text-secondary-fixed-dim hover:text-ethereal-white transition-colors hover:translate-x-1 inline-block">
                Sanatana Dharma & Programs
              </Link>
            </li>
            <li>
              <Link href="/events" className="text-secondary-fixed-dim hover:text-ethereal-white transition-colors hover:translate-x-1 inline-block">
                Events & Activities
              </Link>
            </li>
            <li>
              <Link href="/news" className="text-secondary-fixed-dim hover:text-ethereal-white transition-colors hover:translate-x-1 inline-block">
                News & Media
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="text-secondary-fixed-dim hover:text-ethereal-white transition-colors hover:translate-x-1 inline-block">
                Photo Gallery
              </Link>
            </li>
            <li>
              <Link href="/vision-mission" className="text-secondary-fixed-dim hover:text-ethereal-white transition-colors hover:translate-x-1 inline-block">
                Vision & Mission
              </Link>
            </li>
            <li>
              <Link href="/founder-message" className="text-secondary-fixed-dim hover:text-ethereal-white transition-colors hover:translate-x-1 inline-block">
                Founder&apos;s Message
              </Link>
            </li>
            <li>
              <Link href="/partnership" className="text-secondary-fixed-dim hover:text-ethereal-white transition-colors hover:translate-x-1 inline-block">
                Partnerships & Sponsors
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="col-span-1 space-y-4">
          <h4 className="font-label-lg text-saffron-glow uppercase tracking-wider mb-4">Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-secondary-fixed-dim text-sm">
              <span className="material-symbols-outlined text-saffron-glow mt-1 text-[20px] shrink-0">location_on</span>
              <span>No 44A, 3rd Street, Judge Colony, Tambaram Sanatorium, Chennai, Tamilnadu - 600047</span>
            </li>
            <li className="flex items-center gap-3 text-secondary-fixed-dim text-sm">
              <span className="material-symbols-outlined text-saffron-glow text-[20px] shrink-0">mail</span>
              <a href="mailto:info@dharafoundations.in" className="hover:text-ethereal-white transition-colors break-all">
                info@dharafoundations.in
              </a>
            </li>
            <li className="flex items-center gap-3 text-secondary-fixed-dim text-sm">
              <span className="material-symbols-outlined text-saffron-glow text-[20px] shrink-0">call</span>
              <a href="tel:04422236641" className="hover:text-ethereal-white transition-colors">
                044-22236641
              </a>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="col-span-1 space-y-4">
          <h4 className="font-label-lg text-saffron-glow uppercase tracking-wider mb-4">Legal</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="#" className="text-secondary-fixed-dim hover:text-ethereal-white transition-colors hover:translate-x-1 inline-block">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-secondary-fixed-dim hover:text-ethereal-white transition-colors hover:translate-x-1 inline-block">
                CSR Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-secondary-fixed-dim hover:text-ethereal-white transition-colors hover:translate-x-1 inline-block">
                Donation FAQ
              </Link>
            </li>
            <li>
              <Link href="#" className="text-secondary-fixed-dim hover:text-ethereal-white transition-colors hover:translate-x-1 inline-block">
                Careers
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-ethereal-white/10 px-margin-mobile md:px-margin-desktop py-6 text-center text-sm text-secondary-fixed-dim relative z-10 flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto">
        <p>© {new Date().getFullYear()} Dhara Foundations. All rights reserved.</p>
        <p className="mt-2 md:mt-0 opacity-75">Developed with compassion.</p>
      </div>
    </footer>
  );
}

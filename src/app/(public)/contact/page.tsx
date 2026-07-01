"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

const contactSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const customResolver = async (data: Record<string, unknown>) => {
  const result = contactSchema.safeParse(data);
  if (result.success) {
    return { values: result.data, errors: {} };
  }
  const fieldErrors = result.error.flatten().fieldErrors;
  const errors: Record<string, { type: string; message: string }> = {};
  for (const [key, val] of Object.entries(fieldErrors)) {
    if (val && val.length > 0) {
      errors[key] = { type: "validation", message: val[0] };
    }
  }
  return { values: {}, errors };
};

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: customResolver,
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Form Submitted:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-4 sm:px-8 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* ROW 1: "Contact us" & Form on Left | Tall Editorial Photo Collage on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* LEFT COLUMN: Heading & Clean Form (lg:col-span-6) */}
          <ScrollReveal className="lg:col-span-6 space-y-8 pt-2">
            <div>
              <div className="eyebrow-label text-primary font-bold mb-3">ONLINE INQUIRY</div>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-deep-forest dark:text-ethereal-white">
                Contact us
              </h1>
            </div>

            {isSubmitted ? (
              <div className="py-12 space-y-6 animate-fade-in bg-surface-container-low p-8 rounded-3xl border border-outline-variant/30">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-deep-forest dark:text-ethereal-white">
                  Message Sent Successfully!
                </h3>
                <p className="font-body text-on-surface-variant leading-relaxed">
                  Thank you for reaching out. Our team will review your inquiry and connect with you promptly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-8 py-3.5 bg-deep-forest text-white rounded-full font-title font-medium shadow hover:bg-primary transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-2" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block font-title font-medium text-on-surface text-sm">
                      First Name*
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="Ram"
                      {...register("firstName")}
                      className={`w-full bg-white dark:bg-surface-container border px-4 py-3.5 font-body text-on-surface rounded-xl focus:outline-none transition-all duration-200 ${
                        errors.firstName
                          ? "border-red-500 bg-red-500/5"
                          : "border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm"
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-600 text-xs font-semibold">{errors.firstName.message}</p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block font-title font-medium text-on-surface text-sm">
                      Last Name*
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Kumar"
                      {...register("lastName")}
                      className={`w-full bg-white dark:bg-surface-container border px-4 py-3.5 font-body text-on-surface rounded-xl focus:outline-none transition-all duration-200 ${
                        errors.lastName
                          ? "border-red-500 bg-red-500/5"
                          : "border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm"
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-600 text-xs font-semibold">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block font-title font-medium text-on-surface text-sm">
                      Email Address*
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      {...register("email")}
                      className={`w-full bg-white dark:bg-surface-container border px-4 py-3.5 font-body text-on-surface rounded-xl focus:outline-none transition-all duration-200 ${
                        errors.email
                          ? "border-red-500 bg-red-500/5"
                          : "border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-600 text-xs font-semibold">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block font-title font-medium text-on-surface text-sm">
                      Mobile Number*
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      {...register("phone")}
                      className="w-full bg-white dark:bg-surface-container border border-outline-variant/60 px-4 py-3.5 font-body text-on-surface rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 shadow-sm"
                    />
                  </div>
                </div>

                {/* Subject Dropdown */}
                <div className="space-y-2">
                  <label htmlFor="subject" className="block font-title font-medium text-on-surface text-sm">
                    Inquiry Subject*
                  </label>
                  <select
                    id="subject"
                    {...register("subject")}
                    defaultValue=""
                    className={`w-full bg-white dark:bg-surface-container border px-4 py-3.5 font-body text-on-surface rounded-xl focus:outline-none transition-all duration-200 cursor-pointer ${
                      errors.subject
                        ? "border-red-500 bg-red-500/5"
                        : "border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-sm"
                    }`}
                  >
                    <option value="" disabled>
                      Select an inquiry type...
                    </option>
                    <option value="donation">Donation Inquiry</option>
                    <option value="volunteer">Volunteer Opportunities</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-600 text-xs font-semibold">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message Textarea */}
                <div className="space-y-2">
                  <label htmlFor="message" className="block font-title font-medium text-on-surface text-sm">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Write your message here..."
                    {...register("message")}
                    className={`w-full bg-white dark:bg-surface-container border px-4 py-3.5 font-body text-on-surface rounded-xl focus:outline-none transition-all duration-200 resize-none ${
                      errors.message
                        ? "border-red-500 bg-red-500/5"
                        : "border-outline-variant/60 focus:border-primary focus:shadow-[0_4px_12px_rgba(138,80,0,0.1)]"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-600 text-xs font-semibold">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button aligned clean */}
                <div className="pt-4 flex justify-end sm:justify-start">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-10 py-4 bg-gradient-to-r from-primary to-amber-600 dark:from-saffron-glow dark:to-amber-500 text-ethereal-white dark:text-deep-forest rounded-full font-label-lg font-bold shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:pointer-events-none cursor-pointer text-base select-none min-w-[180px]"
                  >
                    <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
                    <span className={`material-symbols-outlined text-xl ${isSubmitting ? "animate-spin" : ""}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                      {isSubmitting ? "sync" : "arrow_forward"}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </ScrollReveal>

          {/* RIGHT COLUMN: Editorial Photo (lg:col-span-6) */}
          <ScrollReveal direction="left" className="lg:col-span-6 relative flex justify-end">
            {/* Main architectural/heritage photo */}
            <div className="relative w-full h-[400px] sm:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-outline-variant/30 bg-surface-container group">
              {/* [CLIENT TO SUPPLY OFFICE PHOTO] */}
              <img
                src="/images/about.png"
                alt="Dhara Foundations Headquarters & Heritage"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-deep-forest/90 backdrop-blur-md text-ethereal-white p-4 rounded-2xl border border-white/10 shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-xs font-title font-medium text-saffron-glow uppercase tracking-wider">Central Office</p>
                  <p className="text-sm font-body font-medium">Tambaram Sanatorium, Chennai</p>
                </div>
                <span className="material-symbols-outlined text-saffron-glow text-2xl">verified</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* ROW 2: Map on Left | Editorial Address Typography Block on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-16 border-t border-outline-variant/30">
          
          {/* LEFT COLUMN: Map Embed (lg:col-span-6) */}
          <ScrollReveal className="lg:col-span-6">
            <div className="w-full h-[310px] sm:h-[370px] rounded-3xl overflow-hidden shadow-xl border border-outline-variant/30 relative group bg-surface-container-low">
              <iframe
                title="Dhara Foundations Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.756285497424!2d80.1260!3d12.9249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f168019a845%3A0x1b41c0a0c648780!2sTambaram%20Sanatorium%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-4 right-4 bg-white/95 dark:bg-deep-forest/95 backdrop-blur-md px-4 py-2 rounded-xl border border-outline-variant/30 shadow-md flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
                <span className="text-xs font-title font-medium text-deep-forest dark:text-saffron-glow">
                  Tambaram Sanatorium Office
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT COLUMN: Editorial Address Block matching Reference Image 1 (lg:col-span-6) */}
          <ScrollReveal direction="up" className="lg:col-span-6 space-y-6 lg:pl-6">
            <div className="eyebrow-label text-primary font-bold">
              ADDRESS
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-deep-forest dark:text-ethereal-white leading-tight">
              Dhara Foundations Trust Office
            </h2>

            <div className="space-y-1.5 font-body text-on-surface-variant text-base sm:text-lg leading-relaxed">
              <p className="font-title font-medium text-on-surface dark:text-ethereal-white">
                No 44A, 3rd Street, Judge Colony
              </p>
              <p>Tambaram Sanatorium, Chennai</p>
              <p>Tamil Nadu - 600047, India</p>
            </div>

            <hr className="border-outline-variant/30 my-6 max-w-sm" />

            <div className="space-y-3 font-title text-base sm:text-lg">
              <div className="flex items-center gap-3">
                <span className="text-on-surface-variant w-16">Email —</span>
                <a
                  href="mailto:info@dharafoundations.in"
                  className="font-medium text-primary hover:underline"
                >
                  info@dharafoundations.in
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-on-surface-variant w-16">Phone —</span>
                <a
                  href="tel:04422236641"
                  className="font-medium text-on-surface dark:text-ethereal-white hover:text-primary transition-colors"
                >
                  044-22236641
                </a>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <span className="font-title text-sm font-medium text-on-surface-variant">Connect with us:</span>
              <div className="flex gap-2.5">
                {["public", "share", "groups"].map((icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full border border-outline-variant/60 flex items-center justify-center text-deep-forest dark:text-ethereal-white hover:bg-primary hover:text-white transition-all duration-300 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-lg">{icon}</span>
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </div>
  );
}

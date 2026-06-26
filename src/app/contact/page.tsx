"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ScrollReveal, RevealItem } from "@/components/motion/ScrollReveal";

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
    <div className="flex flex-col relative w-full overflow-hidden bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-margin-mobile md:px-margin-desktop overflow-hidden flex items-center justify-center min-h-[380px]">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-surface-container-high/40 via-surface-container-low/20 to-background" />
        <ScrollReveal className="relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <h1 className="font-display-lg-mobile md:font-display-lg text-primary font-bold">
            Get in Touch
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed text-lg">
            We welcome your inquiries, partnerships, and support. Reach out to us to learn more about our initiatives and how you can contribute to a better tomorrow.
          </p>
        </ScrollReveal>
      </section>

      {/* Main Content Area */}
      <section className="py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        {/* Contact Info & Map (Left Column) */}
        <ScrollReveal staggerChildren={0.15} className="lg:col-span-5 flex flex-col gap-8">
          {/* Info Card */}
          <RevealItem>
            <div className="modern-card bg-surface-container-lowest rounded-[24px] p-8 shadow-soft hover:shadow-soft-hover border border-outline-variant/20 transition-all duration-300">
              <h2 className="font-headline-md text-deep-forest font-bold text-2xl mb-6">
                Contact Information
              </h2>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-saffron-glow/25 flex items-center justify-center text-primary shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      location_on
                    </span>
                  </div>
                  <div>
                    <h3 className="font-label-lg font-bold text-on-surface mb-1 text-base">Our Office</h3>
                    <p className="font-body-md text-on-surface-variant leading-relaxed text-sm">
                      No 44A, 3rd Street, Judge Colony, <br />
                      Tambaram Sanatorium, Chennai, <br />
                      Tamil Nadu - 600047 India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-saffron-glow/25 flex items-center justify-center text-primary shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      mail
                    </span>
                  </div>
                  <div>
                    <h3 className="font-label-lg font-bold text-on-surface mb-1 text-base">Email Us</h3>
                    <a href="mailto:info@dharafoundations.in" className="font-body-md text-primary hover:text-deep-forest transition-colors font-medium text-sm">
                      info@dharafoundations.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-saffron-glow/25 flex items-center justify-center text-primary shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      call
                    </span>
                  </div>
                  <div>
                    <h3 className="font-label-lg font-bold text-on-surface mb-1 text-base">Call Us</h3>
                    <a href="tel:04422236641" className="font-body-md text-on-surface-variant hover:text-primary transition-colors font-medium text-sm">
                      044-22236641
                    </a>
                  </div>
                </div>
              </div>

              <hr className="my-8 border-outline-variant/20" />

              <div>
                <h3 className="font-label-lg font-bold text-on-surface mb-4 text-base">Follow Our Journey</h3>
                <div className="flex gap-3">
                  {["public", "share", "groups"].map((icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-deep-forest hover:bg-primary hover:text-ethereal-white hover:border-primary transition-all duration-300 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-xl">{icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </RevealItem>

          {/* Map Container */}
          <RevealItem>
            <div className="modern-card bg-surface-container-low rounded-[24px] overflow-hidden h-[300px] border border-outline-variant/20 relative shadow-soft group">
              <iframe
                title="Dhara Foundations Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.756285497424!2d80.1260!3d12.9249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525f168019a845%3A0x1b41c0a0c648780!2sTambaram%20Sanatorium%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 grayscale-30 contrast-125 group-hover:grayscale-0 transition-all duration-700"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </RevealItem>
        </ScrollReveal>

        {/* Contact Form (Right Column) */}
        <ScrollReveal direction="left" className="lg:col-span-7">
          <div className="modern-card bg-surface-container-lowest rounded-[24px] p-8 md:p-12 shadow-soft hover:shadow-soft-hover border border-outline-variant/20 relative overflow-hidden h-full flex flex-col justify-center">
            {/* Decorative subtle blobs */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-saffron-glow/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary-container/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {isSubmitted ? (
                <div className="text-center py-16 space-y-6 animate-fade-in">
                  <div className="w-20 h-20 bg-saffron-glow/30 text-primary rounded-full flex items-center justify-center mx-auto shadow-md">
                    <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  </div>
                  <h3 className="font-headline-md text-3xl font-bold text-deep-forest">
                    Message Sent Successfully!
                  </h3>
                  <p className="font-body-lg text-on-surface-variant max-w-md mx-auto">
                    Thank you for reaching out. Our team will review your message and connect with you promptly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-3.5 bg-primary text-on-primary rounded-full font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-headline-md text-3xl font-bold text-deep-forest mb-2">Send a Message</h2>
                  <p className="font-body-md text-on-surface-variant mb-8 text-base">
                    Fill out the form below and our team will get back to you promptly.
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* First Name */}
                      <div className="space-y-1.5">
                        <label htmlFor="firstName" className="block font-bold text-on-surface text-sm">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          placeholder="Ram"
                          {...register("firstName")}
                          className={`w-full bg-surface-container-low border-0 border-b-2 px-4 py-3 font-body-md text-on-surface focus:outline-none transition-all duration-300 rounded-t-lg ${
                            errors.firstName ? "border-red-500 bg-red-500/5" : "border-outline-variant focus:border-primary focus:shadow-[0_4px_12px_rgba(138,80,0,0.1)]"
                          }`}
                        />
                        {errors.firstName && (
                          <p className="text-red-600 text-xs font-semibold">{errors.firstName.message}</p>
                        )}
                      </div>

                      {/* Last Name */}
                      <div className="space-y-1.5">
                        <label htmlFor="lastName" className="block font-bold text-on-surface text-sm">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          placeholder="Kumar"
                          {...register("lastName")}
                          className={`w-full bg-surface-container-low border-0 border-b-2 px-4 py-3 font-body-md text-on-surface focus:outline-none transition-all duration-300 rounded-t-lg ${
                            errors.lastName ? "border-red-500 bg-red-500/5" : "border-outline-variant focus:border-primary focus:shadow-[0_4px_12px_rgba(138,80,0,0.1)]"
                          }`}
                        />
                        {errors.lastName && (
                          <p className="text-red-600 text-xs font-semibold">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Email */}
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="block font-bold text-on-surface text-sm">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="ram@example.com"
                          {...register("email")}
                          className={`w-full bg-surface-container-low border-0 border-b-2 px-4 py-3 font-body-md text-on-surface focus:outline-none transition-all duration-300 rounded-t-lg ${
                            errors.email ? "border-red-500 bg-red-500/5" : "border-outline-variant focus:border-primary focus:shadow-[0_4px_12px_rgba(138,80,0,0.1)]"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-red-600 text-xs font-semibold">{errors.email.message}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label htmlFor="phone" className="block font-bold text-on-surface text-sm">
                          Phone Number (Optional)
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          {...register("phone")}
                          className="w-full bg-surface-container-low border-0 border-b-2 border-outline-variant px-4 py-3 font-body-md text-on-surface focus:outline-none focus:border-primary focus:shadow-[0_4px_12px_rgba(138,80,0,0.1)] transition-all duration-300 rounded-t-lg"
                        />
                      </div>
                    </div>

                    {/* Subject Dropdown */}
                    <div className="space-y-1.5">
                      <label htmlFor="subject" className="block font-bold text-on-surface text-sm">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="subject"
                        {...register("subject")}
                        defaultValue=""
                        className={`w-full bg-surface-container-low border-0 border-b-2 px-4 py-3 font-body-md text-on-surface focus:outline-none transition-all duration-300 rounded-t-lg cursor-pointer ${
                          errors.subject ? "border-red-500 bg-red-500/5" : "border-outline-variant focus:border-primary focus:shadow-[0_4px_12px_rgba(138,80,0,0.1)]"
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
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="block font-bold text-on-surface text-sm">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="How can we help you?"
                        {...register("message")}
                        className={`w-full bg-surface-container-low border-0 border-b-2 px-4 py-3 font-body-md text-on-surface focus:outline-none transition-all duration-300 rounded-t-lg resize-none ${
                          errors.message ? "border-red-500 bg-red-500/5" : "border-outline-variant focus:border-primary focus:shadow-[0_4px_12px_rgba(138,80,0,0.1)]"
                        }`}
                      />
                      {errors.message && (
                        <p className="text-red-600 text-xs font-semibold">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-10 py-4 bg-primary text-on-primary rounded-full font-bold shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-70 disabled:pointer-events-none cursor-pointer text-base select-none"
                      >
                        <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                        <span className={`material-symbols-outlined text-xl ${isSubmitting ? "animate-spin" : ""}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                          {isSubmitting ? "sync" : "send"}
                        </span>
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}

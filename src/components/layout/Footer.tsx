"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteContent } from "@/data/content";
import {
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function Footer() {
  const [selectedBranch, setSelectedBranch] = useState<string>("mumbai");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    treatment: "General / Not Sure",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const currentBranch =
    siteContent.contact.branches.find((b) => b.id === selectedBranch) ||
    siteContent.contact.branches[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Build pre-filled WhatsApp message
    const cleanPhone = siteContent.contact.primaryPhone.replace(/\D/g, "");
    const msg = `*Appointment Request - Aarogya Dental Clinic*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Preferred Location:* ${currentBranch.name} (${currentBranch.city})\n*Treatment of Interest:* ${formData.treatment}\n*Notes:* ${formData.message || "None"}`;

    const waLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(waLink, "_blank");
  };

  return (
    <footer
      id="footer-booking"
      data-section-theme="dark"
      className="relative bg-gradient-to-b from-[#06163F] via-[#040e2b] to-[#020717] text-white pt-24 pb-12 overflow-hidden border-t border-cyan-500/20"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-[400px] h-[400px] bg-[#0B2A7A]/30 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Booking Grid: Heading & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-white/10">
          {/* Left Column: Clinic Invitation */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
                CONCIERGE DESK
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl text-white tracking-tight leading-[1.1] mb-6">
                Reserve your <em>bespoke</em> consultation today.
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md">
                Experience comprehensive 3D digital diagnosis, personalized smile design, and gentle care tailored exclusively for your dental wellness.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-sm text-cyan-200">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span>Hospital-Grade Class-B Autoclave Sterilization</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-cyan-200">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span>Private, Dedicated 1-on-1 Appointments Only</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-cyan-200">
                <Phone className="w-5 h-5 text-cyan-400" />
                <span>Urgent Emergency Slots Reserved Daily</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
              <h3 className="font-serif text-2xl text-white mb-2">
                Request an Appointment
              </h3>
              <p className="text-white/60 text-xs sm:text-sm mb-6">
                Select your preferred clinic location and our senior concierge will confirm your slot via WhatsApp or phone call.
              </p>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 text-center space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-2xl text-white">
                    Request Received
                  </h4>
                  <p className="text-sm text-white/70 max-w-md mx-auto">
                    Thank you, {formData.name}. We have prepared your request for{" "}
                    <span className="text-cyan-300 font-semibold">{currentBranch.name}</span>.
                    Our desk is connecting with you on WhatsApp right away.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-pill-white text-xs mt-2"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Branch Selection Radio Buttons */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-cyan-300 mb-2">
                      1. Select Clinic Location:
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {siteContent.contact.branches.map((b) => (
                        <label
                          key={b.id}
                          className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                            selectedBranch === b.id
                              ? "bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(18,164,219,0.25)]"
                              : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                          }`}
                        >
                          <input
                            type="radio"
                            name="branch"
                            value={b.id}
                            checked={selectedBranch === b.id}
                            onChange={(e) => setSelectedBranch(e.target.value)}
                            className="sr-only"
                          />
                          <span
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                              selectedBranch === b.id
                                ? "border-cyan-400 bg-cyan-400"
                                : "border-white/40"
                            }`}
                          >
                            {selectedBranch === b.id && (
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                            )}
                          </span>
                          <span className="text-xs font-medium truncate">
                            {b.city}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rohini Iyer"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                        Phone Number / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Treatment Category */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                      Treatment Interest
                    </label>
                    <select
                      value={formData.treatment}
                      onChange={(e) =>
                        setFormData({ ...formData, treatment: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#06163F] border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    >
                      <option value="Smile Makeover / Porcelain Veneers">
                        Esthetic: Smile Makeover & Porcelain Veneers
                      </option>
                      <option value="Guided Dental Implants">
                        Restorative: Guided Dental Implants
                      </option>
                      <option value="CAD/CAM Same-Day Crowns">
                        Restorative: CAD/CAM Same-Day Crowns
                      </option>
                      <option value="Invisible Clear Aligners">
                        Orthodontics: Invisible Clear Aligners
                      </option>
                      <option value="Microscopic Root Canal Therapy">
                        Endodontics: Microscopic Root Canal
                      </option>
                      <option value="Comprehensive Dental Checkup & Cleaning">
                        Preventive: Comprehensive Dental Checkup & Laser Cleaning
                      </option>
                      <option value="Emergency Urgent Dental Relief">
                        Urgent Relief: Same-Day Emergency Slot
                      </option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-white/70 mb-1.5">
                      Special Requests / Preferred Timing (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Prefer afternoon slot after 3 PM. Concerned about front tooth gap."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 text-sm focus:outline-none focus:border-cyan-400 focus:bg-white/10 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      type="submit"
                      className="btn-pill-cyan w-full sm:w-auto !py-3.5 !px-8 flex items-center justify-center gap-2 group"
                    >
                      <span>Connect via WhatsApp Concierge</span>
                      <MessageCircle className="w-4 h-4 text-slate-950 group-hover:scale-110 transition-transform" />
                    </button>
                    <span className="text-xs text-white/50">
                      No automated bots · Real clinical coordinators
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 3 Location Blocks */}
        <div className="py-16 border-b border-white/10">
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-8">
            Our Flagship Clinic Locations
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteContent.contact.branches.map((b) => (
              <div
                key={b.id}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-400/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-serif text-xl text-white group-hover:text-cyan-300 transition-colors">
                    {b.name}
                  </h4>
                  <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-400/20">
                    {b.city}
                  </span>
                </div>

                <div className="space-y-3 text-xs text-white/70">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{b.address}</p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                    <a
                      href={`tel:${b.phone.replace(/\s+/g, "")}`}
                      className="hover:text-cyan-300 font-mono"
                    >
                      {b.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{b.timings}</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                  <a
                    href={b.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 font-medium"
                  >
                    View on Google Maps <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Link Columns & Brand Directory */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#12A4DB] to-[#0B2A7A] flex items-center justify-center p-2">
                <svg
                  viewBox="0 0 32 32"
                  className="w-5 h-5 text-white fill-current"
                >
                  <path d="M12 4C9 4 6 7 6 12C6 17 9 24 12 28C13.5 29.5 15.5 28 16 23C16.5 28 18.5 29.5 20 28C23 24 26 17 26 12C26 7 23 4 20 4C17.5 4 16.5 6 16 7C15.5 6 14.5 4 12 4Z" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                Aarogya Dental Clinic
              </span>
            </div>
            <p className="text-white/60 text-xs leading-relaxed max-w-sm">
              {siteContent.brand.tagline} Recreating the art of modern dentistry with Swiss biological precision, micro-esthetic layering, and compassionate patient care.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={siteContent.contact.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 border border-white/10 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={siteContent.contact.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 border border-white/10 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.7 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href={siteContent.contact.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 border border-white/10 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </a>
              <a
                href={siteContent.contact.socials.youtube}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 border border-white/10 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Clinical Services */}
          <div>
            <h5 className="font-serif text-white text-base mb-4">
              Services
            </h5>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <Link href="/services#esthetic" className="hover:text-cyan-300">
                  Esthetic Dentistry
                </Link>
              </li>
              <li>
                <Link href="/services#restorative" className="hover:text-cyan-300">
                  Restorative Implants
                </Link>
              </li>
              <li>
                <Link href="/services#beyond" className="hover:text-cyan-300">
                  Invisible Aligners
                </Link>
              </li>
              <li>
                <Link href="/services#esthetic" className="hover:text-cyan-300">
                  Smile Makeover Design
                </Link>
              </li>
              <li>
                <Link href="/services#restorative" className="hover:text-cyan-300">
                  CAD/CAM Same-Day Crowns
                </Link>
              </li>
              <li>
                <Link href="/services#beyond" className="hover:text-cyan-300">
                  Gentle Pediatric Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Clinic */}
          <div>
            <h5 className="font-serif text-white text-base mb-4">
              Our Clinic
            </h5>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <Link href="/about" className="hover:text-cyan-300">
                  About Our Clinic
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-cyan-300">
                  Clinical Specialist Doctors
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-cyan-300">
                  Smile Transformation Gallery
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-cyan-300">
                  Patient Testimonials
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-cyan-300">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/dev/assets" className="text-cyan-400 font-mono hover:underline">
                  Asset Upload Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Concierge Contact */}
          <div>
            <h5 className="font-serif text-white text-base mb-4">
              Direct Contact
            </h5>
            <ul className="space-y-2.5 text-xs text-white/60">
              <li>
                <span className="block text-white/40">Concierge Desk:</span>
                <a
                  href={`tel:${siteContent.contact.primaryPhone.replace(/\s+/g, "")}`}
                  className="hover:text-cyan-300 font-mono text-white/80"
                >
                  {siteContent.contact.primaryPhone}
                </a>
              </li>
              <li>
                <span className="block text-white/40">Email:</span>
                <a
                  href={`mailto:${siteContent.contact.primaryEmail}`}
                  className="hover:text-cyan-300 text-white/80"
                >
                  {siteContent.contact.primaryEmail}
                </a>
              </li>
              <li>
                <span className="block text-white/40">General Timings:</span>
                <span>{siteContent.contact.timings}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>
            &copy; 2026 {siteContent.brand.name}. All rights reserved. Precision dental care.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="hover:text-white transition-colors">
              Patient Safety & Sterilization
            </Link>
            <Link href="/faq" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/faq" className="hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

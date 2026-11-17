"use client";

import React, { useState } from "react";
import { siteContent } from "@/data/content";
import {
  Phone,
  MessageSquare,
  Calendar,
  X,
  MapPin,
  Clock,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

export default function FloatingHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const activeBranch = siteContent.contact.branches[0];

  const cleanPhone = siteContent.contact.primaryPhone.replace(/\D/g, "");

  const getWhatsAppUrl = (topic?: string) => {
    const text = topic
      ? `Hello Aarogya Dental Clinic, I need clinical guidance regarding *${topic}*.`
      : `Hello Aarogya Dental Clinic, I would like clinical guidance regarding consultation and treatments.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  const guidanceTopics = [
    {
      title: "Smile Makeover & Porcelain Veneers",
      subtitle: "Shade correction, gaps & aesthetics",
    },
    {
      title: "Guided Dental Implants",
      subtitle: "Permanent replacement for missing teeth",
    },
    {
      title: "Invisible Aligners",
      subtitle: "Discreet orthodontic teeth alignment",
    },
    {
      title: "Acute Dental Pain or Broken Tooth",
      subtitle: "Urgent same-day emergency slot",
      urgent: true,
    },
  ];

  return (
    <>
      {/* Floating Action Trigger Button */}
      <div className="fixed bottom-5 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-3">
        {/* Helper tooltip pill when closed */}
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#06163F]/95 backdrop-blur-md border border-cyan-400/40 text-white text-xs font-medium shadow-xl pointer-events-none animate-pulse">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
            <span className="text-cyan-300 font-semibold">Need Guidance?</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Aarogya Patient Help & Guidance Desk"
          className="relative group w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-gradient-to-tr from-[#0B2A7A] via-[#12A4DB] to-cyan-300 text-white flex flex-col items-center justify-center shadow-[0_8px_30px_rgba(18,164,219,0.55)] hover:shadow-[0_0_40px_rgba(18,164,219,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          {/* Subtle spinning glow ring */}
          <div className="absolute -inset-1 rounded-full bg-cyan-400/30 blur-sm group-hover:blur-md transition-all animate-pulse" />

          {isOpen ? (
            <X className="w-5 sm:w-6 h-5 sm:h-6 text-white relative z-10" />
          ) : (
            <div className="flex flex-col items-center justify-center relative z-10">
              <svg
                viewBox="0 0 32 32"
                className="w-4 sm:w-5 h-4 sm:h-5 text-white fill-current drop-shadow-md"
              >
                <path d="M12 4C9 4 6 7 6 12C6 17 9 24 12 28C13.5 29.5 15.5 28 16 23C16.5 28 18.5 29.5 20 28C23 24 26 17 26 12C26 7 23 4 20 4C17.5 4 16.5 6 16 7C15.5 6 14.5 4 12 4Z" />
              </svg>
              <span className="text-[8px] sm:text-[9px] font-bold tracking-widest uppercase mt-0.5 font-mono text-cyan-950">
                HELP
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Floating Concierge Popout Card */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40 w-[420px] max-w-[calc(100vw-2rem)] max-h-[85vh] overflow-y-auto bg-gradient-to-b from-[#091D4C]/95 via-[#06163F]/98 to-[#03091B]/98 backdrop-blur-2xl border border-cyan-400/30 rounded-3xl p-5 sm:p-6 text-white shadow-[0_25px_70px_rgba(0,0,0,0.7)] animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-sm shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-lg font-semibold tracking-tight text-white">
                    Patient Guidance Desk
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-xs text-cyan-300/80">
                  Live clinical coordinators · Direct advice
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Guidance Explanation */}
          <div className="mt-4 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-white/75 leading-relaxed">
            <div className="flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <p>
                Not sure which treatment fits your needs? Choose a concern below or chat with our coordinator for immediate guidance and fee estimates.
              </p>
            </div>
          </div>

          {/* Guidance Topics */}
          <div className="mt-4">
            <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase block mb-2 font-medium">
              What do you need help with?
            </span>
            <div className="space-y-2">
              {guidanceTopics.map((topic, i) => (
                <a
                  key={i}
                  href={getWhatsAppUrl(topic.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all text-left group ${
                    topic.urgent
                      ? "bg-rose-500/10 hover:bg-rose-500/20 border-rose-400/30 text-rose-200"
                      : "bg-white/[0.03] hover:bg-white/[0.08] border-white/10 text-white"
                  }`}
                >
                  <div className="space-y-0.5 pr-2">
                    <div className="text-xs font-semibold group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                      {topic.urgent && (
                        <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      )}
                      <span>{topic.title}</span>
                    </div>
                    <div className="text-[11px] text-white/50">
                      {topic.subtitle}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-cyan-400/70 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-all shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* Action Channels */}
          <div className="mt-5 space-y-2">
            {/* WhatsApp */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/40 text-emerald-200 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white group-hover:text-emerald-200">
                    Chat on WhatsApp
                  </div>
                  <div className="text-[10px] text-emerald-300/70">
                    Typically responds within 5 minutes
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-mono font-medium text-emerald-400">
                CHAT →
              </span>
            </a>

            {/* Direct Phone Call */}
            <a
              href={`tel:${activeBranch.phone.replace(/\s+/g, "")}`}
              className="flex items-center justify-between p-3 rounded-2xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-200 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white group-hover:text-cyan-200">
                    Direct Concierge Call
                  </div>
                  <div className="text-[10px] text-cyan-300/70 font-mono">
                    {activeBranch.phone}
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-mono font-medium text-cyan-400">
                CALL →
              </span>
            </a>

            {/* Book Consultation */}
            <a
              href="#footer-booking"
              onClick={() => setIsOpen(false)}
              className="btn-pill-cyan w-full text-center text-xs !py-3 flex items-center justify-center gap-2 mt-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation Form</span>
            </a>
          </div>

          {/* Aarogya Clinical Standards Guarantee */}
          <div className="mt-4 pt-3.5 border-t border-white/10 space-y-1.5 text-[11px] text-white/60">
            <div className="flex items-center gap-2 text-cyan-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Aarogya Patient Standards</span>
            </div>
            <ul className="space-y-1 pl-5 list-disc text-white/50 text-[10px]">
              <li>Zero double-booking · Private dedicated appointment slots</li>
              <li>100% procedures handled by MDS specialist faculty</li>
              <li>Hospital-grade Class-B sterilization protocol</li>
            </ul>
          </div>

          {/* Location & Timings Badge */}
          <div className="mt-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] space-y-1 text-white/60">
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="truncate">{activeBranch.address}</span>
            </div>
            <div className="flex items-center gap-2 text-white/50 text-[10px]">
              <Clock className="w-3 h-3 text-cyan-400 shrink-0" />
              <span>{activeBranch.timings}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

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
} from "lucide-react";

export default function FloatingHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeBranch, setActiveBranch] = useState(siteContent.contact.branches[0]);

  const cleanPhone = siteContent.contact.primaryPhone.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    `Hello Aarogya Dental Clinic, I would like to enquire about consultation at your ${activeBranch.name}.`
  )}`;

  return (
    <>
      {/* Floating Action Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Helper tooltip pill when closed */}
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#06163F]/90 backdrop-blur-md border border-cyan-400/30 text-white text-xs font-medium shadow-lg animate-bounce pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
            <span className="text-cyan-300">Need Guidance?</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Aarogya Patient Help Desk"
          className="relative group w-14 h-14 rounded-full bg-gradient-to-tr from-[#0B2A7A] via-[#12A4DB] to-cyan-300 text-white flex flex-col items-center justify-center shadow-[0_8px_30px_rgba(18,164,219,0.55)] hover:shadow-[0_0_40px_rgba(18,164,219,0.85)] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          {/* Subtle spinning glow ring */}
          <div className="absolute -inset-1 rounded-full bg-cyan-400/30 blur-sm group-hover:blur-md transition-all animate-pulse" />

          {isOpen ? (
            <X className="w-6 h-6 text-white relative z-10" />
          ) : (
            <div className="flex flex-col items-center justify-center relative z-10">
              <svg
                viewBox="0 0 32 32"
                className="w-5 h-5 text-white fill-current drop-shadow-md"
              >
                <path d="M12 4C9 4 6 7 6 12C6 17 9 24 12 28C13.5 29.5 15.5 28 16 23C16.5 28 18.5 29.5 20 28C23 24 26 17 26 12C26 7 23 4 20 4C17.5 4 16.5 6 16 7C15.5 6 14.5 4 12 4Z" />
              </svg>
              <span className="text-[9px] font-bold tracking-widest uppercase mt-0.5 font-mono text-cyan-950">
                HELP
              </span>
            </div>
          )}
        </button>
      </div>

      {/* Floating Concierge Popout Card */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-3rem)] bg-[#06163F]/95 backdrop-blur-2xl border border-cyan-400/30 rounded-3xl p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.6)] animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-semibold tracking-tight text-white">
                  Clinical Concierge
                </h3>
                <p className="text-xs text-cyan-300/80">
                  Instant response from our senior desk
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Branch Picker */}
          <div className="mt-4">
            <label className="text-[10px] font-mono tracking-widest text-white/60 uppercase block mb-1.5">
              Select Nearest Clinic:
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10 text-xs">
              {siteContent.contact.branches.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setActiveBranch(b)}
                  className={`py-1.5 px-2 rounded-lg font-medium transition-all text-center truncate ${
                    activeBranch.id === b.id
                      ? "bg-cyan-500 text-slate-950 font-semibold shadow-sm"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {b.city}
                </button>
              ))}
            </div>
          </div>

          {/* Quick info snippet */}
          <div className="mt-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs space-y-1">
            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{activeBranch.address}</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-[11px]">
              <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{activeBranch.timings}</span>
            </div>
          </div>

          {/* Main Action Links */}
          <div className="mt-5 space-y-2.5">
            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/40 text-emerald-200 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-emerald-200">
                    WhatsApp Concierge
                  </div>
                  <div className="text-[11px] text-emerald-300/70">
                    Typically replies in 5 minutes
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-medium text-emerald-400">
                CHAT →
              </span>
            </a>

            {/* Direct Call */}
            <a
              href={`tel:${activeBranch.phone.replace(/\s+/g, "")}`}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/40 text-cyan-200 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-200">
                    Direct Phone Line
                  </div>
                  <div className="text-[11px] text-cyan-300/70">
                    {activeBranch.phone}
                  </div>
                </div>
              </div>
              <span className="text-xs font-mono font-medium text-cyan-400">
                CALL →
              </span>
            </a>

            {/* Book Consultation */}
            <a
              href="#footer-booking"
              onClick={() => setIsOpen(false)}
              className="btn-pill-cyan w-full text-center text-sm !py-3 flex items-center justify-center gap-2 mt-1"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Priority Consultation</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}

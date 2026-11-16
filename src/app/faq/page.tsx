"use client";

import React, { useState } from "react";
import InnerPageHero from "@/components/layout/InnerPageHero";
import { siteContent } from "@/data/content";
import { ChevronDown, Phone, MessageCircle } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const cleanPhone = siteContent.contact.primaryPhone.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    "Hello Aarogya Dental Clinic, I have a question regarding treatments."
  )}`;

  return (
    <div className="bg-[#F4F8FF] min-h-screen text-[#06163F]">
      <InnerPageHero
        badge="PATIENT ADVISORY"
        title="Frequently Asked Questions"
        subtitle="Transparent answers regarding treatment timelines, pain management, biological materials, and clinic protocols."
        breadcrumb="FAQ"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-20">
        <div className="space-y-4 mb-20">
          {siteContent.faq.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#0B2A7A]/10 shadow-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-lg sm:text-xl font-semibold text-[#0B2A7A] hover:text-[#12A4DB] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-mono text-[#12A4DB] font-bold">
                      0{idx + 1}
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#12A4DB] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#06163F]/75 leading-relaxed font-sans border-t border-[#0B2A7A]/5 animate-in fade-in duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#06163F] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="font-serif text-2xl font-medium">
              Have a specific clinical question?
            </h3>
            <p className="text-xs text-white/70">
              Speak directly with our senior clinical coordinator. No pressure, just clear guidance.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${siteContent.contact.primaryPhone.replace(/\s+/g, "")}`}
              className="btn-pill-white text-xs !py-3 !px-5"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>Call Us</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-cyan text-xs !py-3 !px-5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

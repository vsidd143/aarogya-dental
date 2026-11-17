import React from "react";
import InnerPageHero from "@/components/layout/InnerPageHero";
import Placeholder from "@/components/ui/Placeholder";
import { siteContent } from "@/data/content";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Clinical Services | Aarogya Dental Clinic",
  description:
    "Explore our 3 clinical disciplines: Esthetic Dentistry, Restorative Dentistry, and Beyond the Smile.",
};

export default function ServicesPage() {
  return (
    <div className="bg-[#F4F8FF] min-h-screen text-[#06163F]">
      <InnerPageHero
        badge="CLINICAL DISCIPLINES"
        title="Comprehensive Modern Dentistry"
        subtitle="Three focused disciplines merging biological restoration, digital robotics, and natural aesthetic harmony."
        breadcrumb="Services"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-20 space-y-28">
        {siteContent.services.map((cat, idx) => (
          <div
            key={cat.id}
            id={cat.id}
            className="scroll-mt-32 pt-8 border-t first:border-t-0 border-[#0B2A7A]/15"
          >
            {/* Category Header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2A7A]/10 text-[#0B2A7A] text-xs font-mono tracking-widest uppercase">
                  DISCIPLINE 0{idx + 1}
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl text-[#0B2A7A] font-medium tracking-tight">
                  {cat.title}
                </h2>
                <div className="text-sm font-serif italic text-[#12A4DB]">
                  {cat.subtitle}
                </div>
                <p className="text-[#06163F]/80 text-base leading-relaxed max-w-xl">
                  {cat.description}
                </p>
                <div className="pt-2">
                  <a href="#footer-booking" className="btn-pill-navy text-xs">
                    <span>Consult on {cat.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-300" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-72 sm:h-80 bg-slate-900">
                  <Placeholder name={cat.image} ratio="4/5" className="w-full h-full" />
                </div>
              </div>
            </div>

            {/* 4 Sub-services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {cat.subServices.map((sub, sIdx) => (
                <div
                  key={sIdx}
                  className="p-6 rounded-2xl bg-white border border-[#0B2A7A]/10 shadow-sm hover:shadow-md hover:border-[#12A4DB]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-serif text-xl font-semibold text-[#0B2A7A]">
                        {sub.name}
                      </h3>
                      <CheckCircle2 className="w-4 h-4 text-[#12A4DB]" />
                    </div>
                    <p className="text-xs sm:text-sm text-[#06163F]/70 leading-relaxed">
                      {sub.description}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-[#0B2A7A]/5 flex items-center justify-between text-xs font-medium text-[#12A4DB]">
                    <span>In-Clinic / 3D Guided</span>
                    <a href="#footer-booking" className="hover:underline">Enquire →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from "react";
import InnerPageHero from "@/components/layout/InnerPageHero";
import Placeholder from "@/components/ui/Placeholder";
import { siteContent } from "@/data/content";
export const metadata = {
  title: "Smile Gallery | Aarogya Dental Clinic",
  description: "View real clinical smile transformations and our state-of-the-art dental clinic interior.",
};

export default function GalleryPage() {
  return (
    <div className="bg-[#F4F8FF] min-h-screen text-[#06163F]">
      <InnerPageHero
        badge="CLINICAL PORTFOLIO"
        title="Transformations & Clinic Spaces"
        subtitle="Explore documented patient smile journeys, biomimetic ceramic restorations, and our modern clinic suites."
        breadcrumb="Gallery"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteContent.gallery.map((item, idx) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#0B2A7A]/10 shadow-md hover:shadow-xl hover:border-[#12A4DB]/40 transition-all flex flex-col group"
            >
              <div className="relative h-64 bg-slate-900 overflow-hidden">
                <Placeholder
                  name={item.image}
                  ratio="3/2"
                  className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#06163F]/75 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-cyan-400/30">
                  CASE #{idx + 101}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <h3 className="font-serif text-lg font-semibold text-[#0B2A7A] group-hover:text-[#12A4DB] transition-colors">
                  {item.caption}
                </h3>
                <div className="pt-3 mt-3 border-t border-[#0B2A7A]/5 flex items-center justify-between text-xs text-[#06163F]/50">
                  <span>Aarogya Clinical Archive</span>
                  <a href="#footer-booking" className="text-[#12A4DB] font-medium hover:underline">
                    Inquire About Case →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Consultation Callout */}
        <div className="mt-20 text-center max-w-xl mx-auto space-y-4">
          <h3 className="font-serif text-3xl text-[#0B2A7A]">
            Curious what your smile could look like?
          </h3>
          <p className="text-xs sm:text-sm text-[#06163F]/70">
            During your initial 45-minute consultation, we photograph and 3D scan your teeth to present a photorealistic Digital Smile Simulation on our ultra-wide display.
          </p>
          <div className="pt-2">
            <a href="#footer-booking" className="btn-pill-navy text-xs !py-3.5 !px-8">
              Book Your 3D Smile Simulation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import InnerPageHero from "@/components/layout/InnerPageHero";
import Placeholder from "@/components/ui/Placeholder";
import { siteContent } from "@/data/content";
import { GraduationCap, Calendar } from "lucide-react";

export const metadata = {
  title: "Our Doctors | Aarogya Dental Clinic",
  description: "Meet our senior specialist doctors and clinical directors.",
};

export default function DoctorsPage() {
  return (
    <div className="bg-[#F4F8FF] min-h-screen text-[#06163F]">
      <InnerPageHero
        badge="CLINICAL FACULTY"
        title="Masters of Clinical Precision"
        subtitle="Each specialist brings extensive university postgraduate degrees, international fellowship credentials, and empathetic chairside care."
        breadcrumb="Our Doctors"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteContent.team.doctors.map((doc, idx) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#0B2A7A]/10 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Doctor Portrait */}
                <div className="relative w-full h-80 bg-slate-900 overflow-hidden">
                  <Placeholder
                    name={doc.image}
                    ratio="4/5"
                    className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06163F]/90 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#06163F]/80 backdrop-blur-md border border-cyan-400/30 text-cyan-300 text-[10px] font-mono tracking-wider">
                    {doc.experience}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-300 block mb-1">
                      Faculty 0{idx + 1}
                    </span>
                    <h3 className="font-serif text-2xl font-semibold leading-tight">
                      {doc.name}
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#0B2A7A] font-medium bg-[#0B2A7A]/5 p-2 rounded-lg">
                    <GraduationCap className="w-4 h-4 text-[#12A4DB] shrink-0" />
                    <span>{doc.degree}</span>
                  </div>

                  <div>
                    <h4 className="text-xs uppercase font-mono tracking-wider text-[#06163F]/50 mb-1">
                      Specialization
                    </h4>
                    <p className="text-sm font-semibold text-[#0B2A7A]">
                      {doc.specialization}
                    </p>
                  </div>

                  <p className="text-xs text-[#06163F]/70 leading-relaxed font-sans">
                    {doc.bio}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <a
                  href="#footer-booking"
                  className="btn-pill-navy w-full text-xs text-center !py-3 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Request Consultation with {doc.name.split(" ")[1]}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Clinical Standards Callout */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#06163F] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-xl space-y-2">
            <h3 className="font-serif text-2xl sm:text-3xl font-medium">
              Multidisciplinary Case Conferences
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              For complex full-mouth reconstructions and cosmetic smile makeovers, our prosthodontist, implant surgeon, and endodontist collaborate jointly on your 3D digital treatment simulation before touching a tooth.
            </p>
          </div>
          <a href="#footer-booking" className="btn-pill-cyan shrink-0 text-xs !py-3.5 !px-8">
            Book Team Consultation
          </a>
        </div>
      </div>
    </div>
  );
}
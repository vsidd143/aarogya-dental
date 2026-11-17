import React from "react";
import InnerPageHero from "@/components/layout/InnerPageHero";
import Placeholder from "@/components/ui/Placeholder";
import { siteContent } from "@/data/content";
import { ShieldCheck, Award } from "lucide-react";

export const metadata = {
  title: "About Us | Aarogya Dental Clinic",
  description: siteContent.about.heroStatement,
};

export default function AboutPage() {
  return (
    <div className="bg-[#F4F8FF] min-h-screen text-[#06163F]">
      <InnerPageHero
        badge="OUR CLINICAL EXCELLENCE"
        title="Artistry Meets Biological Medicine"
        subtitle="Founded in 2008 with a mission to deliver Swiss-grade dental precision, digital smile architecture, and bespoke patient hospitality."
        breadcrumb="About Us"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-20">
        {/* Core Manifesto Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B2A7A]/10 text-[#0B2A7A] text-xs font-mono uppercase tracking-widest">
              THE AAROGYA PHILOSOPHY
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#0B2A7A] font-medium leading-tight">
              Dentistry reimagined with <em>exceptional</em> care.
            </h2>
            <p className="text-[#06163F]/80 text-base leading-relaxed">
              {siteContent.about.heroStatement}
            </p>
            <p className="text-[#06163F]/70 text-sm leading-relaxed">
              At Aarogya, we discard the sterile, intimidating atmosphere of traditional dental clinics. Every suite in our South Mumbai clinic is engineered for acoustic serenity, natural daylight, and ergonomic tranquility.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-[#0B2A7A]/10 shadow-sm">
                <ShieldCheck className="w-6 h-6 text-[#12A4DB] mb-2" />
                <h4 className="font-semibold text-sm text-[#0B2A7A]">Zero Compromise Hygiene</h4>
                <p className="text-xs text-[#06163F]/60 mt-0.5">Hospital-grade sterilization with individualized sealed kits.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-[#0B2A7A]/10 shadow-sm">
                <Award className="w-6 h-6 text-[#12A4DB] mb-2" />
                <h4 className="font-semibold text-sm text-[#0B2A7A]">Postgraduate Faculty</h4>
                <p className="text-xs text-[#06163F]/60 mt-0.5">100% of procedures performed by specialists with 10+ years experience.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 h-[500px]">
              <Placeholder name="about-doctor.jpg" ratio="4/5" className="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06163F]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-mono uppercase text-cyan-300 block mb-1">
                  Chief Clinical Director
                </span>
                <div className="font-serif text-2xl font-semibold">Dr. Ananya Sharma</div>
                <div className="text-xs text-white/70">MDS - Prosthodontics & Esthetic Director</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div className="border-t border-[#0B2A7A]/10 pt-20 mb-20">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="font-serif text-3xl sm:text-4xl text-[#0B2A7A] mb-3">
              The Four Pillars of Aarogya Care
            </h3>
            <p className="text-sm text-[#06163F]/70">
              How our practice sets the gold standard for clinical excellence across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Biological Preservation",
                desc: "We practice biomimetic dentistry — conserving as much natural healthy enamel and dentin as possible.",
              },
              {
                title: "Digital Sub-Millimeter Tech",
                desc: "In-house 3D CBCT, CAD/CAM ceramic milling, and optical intra-oral scanners guarantee micron accuracy.",
              },
              {
                title: "Dedicated Time & Dignity",
                desc: "We never double-book appointments. Your consultation is private, unhurried, and deeply attentive.",
              },
              {
                title: "Lifelong Aesthetic Harmony",
                desc: "Smiles crafted to flatter your facial bone structure, skin undertones, and natural lip dynamics.",
              },
            ].map((p, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-[#0B2A7A]/10 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#12A4DB]/15 text-[#0B2A7A] font-mono text-xs font-bold flex items-center justify-center mb-4">
                    0{i + 1}
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-[#0B2A7A] mb-2">{p.title}</h4>
                  <p className="text-xs text-[#06163F]/75 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

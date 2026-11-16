import React from "react";
import InnerPageHero from "@/components/layout/InnerPageHero";
import { siteContent } from "@/data/content";
import { Star, ShieldCheck, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Patient Testimonials | Aarogya Dental Clinic",
  description: "Read verified patient reviews and experiences across our Mumbai, Pune, and Bengaluru clinics.",
};

export default function TestimonialsPage() {
  return (
    <div className="bg-[#F4F8FF] min-h-screen text-[#06163F]">
      <InnerPageHero
        badge="PATIENT REPUTATION"
        title="Stories of Restored Confidence"
        subtitle="Rated 4.9/5 across Google and Practo by over 1,200 verified patients throughout India and abroad."
        breadcrumb="Testimonials"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-20">
        {/* Aggregate Stats Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#0B2A7A]/10 shadow-lg mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1 text-[#F5B800] mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <div className="font-serif text-4xl sm:text-5xl font-bold text-[#0B2A7A]">
              {siteContent.testimonials.aggregateScore} Out of 5.0
            </div>
            <p className="text-xs sm:text-sm text-[#06163F]/70">
              Based on {siteContent.testimonials.totalReviews} on Google Business & Practo Healthcare.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href={siteContent.contact.branches[0].mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-navy text-xs !py-3 !px-6 flex items-center gap-2"
            >
              <span>Review on Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a href="#footer-booking" className="btn-pill-cyan text-xs !py-3 !px-6">
              Reserve Appointment
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteContent.testimonials.reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-8 rounded-3xl border border-[#0B2A7A]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#F5B800]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-[#06163F]/50">
                    {rev.date}
                  </span>
                </div>

                <p className="font-serif text-lg text-[#06163F]/90 leading-relaxed italic">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#0B2A7A]/10 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-[#0B2A7A]">
                    {rev.name}
                  </h4>
                  <div className="text-xs text-[#12A4DB] font-medium">
                    {rev.treatment}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

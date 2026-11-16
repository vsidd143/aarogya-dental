"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { siteContent } from "@/data/content";
import { Star, ArrowRight, Quote, ShieldCheck } from "lucide-react";

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const reviews = siteContent.testimonials.reviews;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Auto-advance every 6.5 seconds
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length);
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reviews.length]);

  const activeReview = reviews[activeIndex];

  return (
    <section
      data-section-theme="dark"
      className="relative bg-[#06163F] text-white py-28 sm:py-36 px-4 sm:px-8 border-t border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Header Tag */}
        <div className="flex items-center justify-between pb-8 mb-12 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-300">
              {siteContent.testimonials.badge}
            </span>
          </div>

          <Link
            href="/testimonials"
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
          >
            Read All Reviews ({siteContent.testimonials.totalReviews}) <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 2-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: List of Patient Names */}
          <div className="lg:col-span-5 space-y-3">
            {reviews.map((rev, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={rev.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? "bg-white/[0.08] border-cyan-400/40 shadow-lg translate-x-2"
                      : "bg-transparent border-transparent opacity-40 hover:opacity-80"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4
                        className={`font-serif text-xl sm:text-2xl font-medium transition-colors ${
                          isActive ? "text-white" : "text-white/60"
                        }`}
                      >
                        {rev.name}
                      </h4>
                      <p
                        className={`text-xs mt-0.5 transition-colors ${
                          isActive ? "text-cyan-300" : "text-white/40"
                        }`}
                      >
                        {rev.treatment}
                      </p>
                    </div>

                    {isActive && (
                      <div className="flex items-center gap-1 text-[#F5B800]">
                        {[...Array(5)].map((_, s) => (
                          <Star key={s} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Large Quote with Word Reveal */}
          <div className="lg:col-span-7 lg:pl-8 flex flex-col justify-between">
            <div className="relative">
              <Quote className="w-16 h-16 text-cyan-500/20 absolute -top-10 -left-6 pointer-events-none" />

              <div key={activeReview.id} className="animate-in fade-in duration-500 space-y-6">
                <blockquote className="font-serif text-2xl sm:text-4xl text-white font-normal leading-[1.3] tracking-tight">
                  &ldquo;{activeReview.quote}&rdquo;
                </blockquote>

                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Verified Patient Treatment</span>
                  </div>
                  <span className="text-white/30 text-xs">·</span>
                  <span className="text-white/50 text-xs font-mono">{activeReview.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pill Below: 4.9/5 on Google & Practo with Gold Stars */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-xs">
            <div className="flex items-center gap-1 text-[#F5B800]">
              {[...Array(5)].map((_, s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-white">
              {siteContent.testimonials.aggregateScore}
            </span>
            <span className="text-white/60">
              on Google & Practo ({siteContent.testimonials.totalReviews})
            </span>
          </div>

          <Link
            href="/testimonials"
            className="btn-pill-white text-xs !py-2.5 !px-5"
          >
            <span>Explore All Patient Stories</span>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}

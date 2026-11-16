"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Placeholder from "@/components/ui/Placeholder";
import { siteContent } from "@/data/content";
import { ArrowRight, Award } from "lucide-react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLParagraphElement>(null);

  const statement = siteContent.about.heroStatement;
  const words = statement.split(" ");
  // Insert inline doctor portrait at word index 6 (around "aesthetic care")
  const splitIndex = 6;
  const firstHalf = words.slice(0, splitIndex);
  const secondHalf = words.slice(splitIndex);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (!wordsRef.current) return;

      const wordSpans = wordsRef.current.querySelectorAll(".scroll-word");

      gsap.fromTo(
        wordSpans,
        {
          opacity: 0.2,
          color: "#94a3b8",
        },
        {
          opacity: 1,
          color: "#0B2A7A",
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: wordsRef.current,
            start: "top 80%",
            end: "bottom 45%",
            scrub: 0.8,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section-theme="light"
      className="relative bg-[#F4F8FF] rounded-t-[50px] sm:rounded-t-[80px] -mt-10 sm:-mt-16 z-20 pt-24 sm:pt-36 pb-28 px-4 sm:px-8 lg:px-14 border-t border-cyan-400/20 shadow-[0_-30px_60px_rgba(6,22,63,0.06)]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded-full bg-[#0B2A7A]/10 border border-[#12A4DB]/30 flex items-center justify-center text-[#0B2A7A]">
            <Award className="w-4 h-4 text-[#12A4DB]" />
          </div>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#0B2A7A] font-semibold">
            The Aarogya Manifesto
          </span>
        </div>

        {/* Huge Serif Paragraph (~56px desktop) with Inline Portrait */}
        <div className="relative mb-20">
          <div
            ref={wordsRef}
            role="paragraph"
            className="font-serif text-3xl sm:text-5xl lg:text-[56px] text-[#0B2A7A] leading-[1.18] sm:leading-[1.15] tracking-tight font-normal"
          >
            {firstHalf.map((w, idx) => (
              <span key={`w1-${idx}`} className="scroll-word inline-block mr-[0.26em]">
                {w}
              </span>
            ))}

            {/* Small Inline Portrait (about-doctor.jpg) wrapped inside text */}
            <span className="inline-block align-middle mx-2 sm:mx-4 w-14 h-16 sm:w-20 sm:h-24 rounded-2xl overflow-hidden shadow-xl border-2 border-white ring-2 ring-[#12A4DB]/40 -translate-y-1 hover:scale-105 transition-transform duration-300">
              <Placeholder
                name="about-doctor.jpg"
                ratio="4/5"
                alt="Lead Specialist Doctor at Aarogya Dental Clinic"
                className="w-full h-full"
              />
            </span>

            {secondHalf.map((w, idx) => (
              <span key={`w2-${idx}`} className="scroll-word inline-block mr-[0.26em]">
                {w}
              </span>
            ))}
          </div>
        </div>

        {/* Sub-Manifesto Detail & Doctor Avatars */}
        <div className="pt-12 border-t border-[#0B2A7A]/15 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: 2-line Description & Excerpt */}
          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-serif text-xl sm:text-2xl text-[#0B2A7A] font-semibold">
              Bespoke Clinical Care · Swiss Biological Standards
            </h3>
            <p className="text-[#06163F]/75 text-sm sm:text-base leading-relaxed max-w-xl">
              {siteContent.about.leadDoctorExcerpt} {siteContent.about.subText}
            </p>
          </div>

          {/* Right: 3 Circular Doctor Avatars with Arrow Button linking to /doctors */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center justify-start lg:justify-end gap-6">
            <div className="flex items-center -space-x-3.5">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md ring-2 ring-[#12A4DB]/40">
                <Placeholder name="avatar-1.jpg" ratio="1/1" className="w-full h-full" />
              </div>
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md ring-2 ring-[#12A4DB]/40">
                <Placeholder name="avatar-2.jpg" ratio="1/1" className="w-full h-full" />
              </div>
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md ring-2 ring-[#12A4DB]/40">
                <Placeholder name="avatar-3.jpg" ratio="1/1" className="w-full h-full" />
              </div>
            </div>

            <Link
              href="/doctors"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#0B2A7A] hover:bg-[#082161] text-white text-xs font-semibold tracking-wide transition-all shadow-md hover:shadow-[0_0_20px_rgba(18,164,219,0.4)] group"
            >
              <span>Meet Our Specialists</span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-3.5 h-3.5 text-cyan-300" />
              </div>
            </Link>
          </div>
        </div>

        {/* 4 Stats Pills */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {siteContent.about.stats.map((stat, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/80 border border-[#0B2A7A]/10 shadow-sm flex flex-col justify-between"
            >
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#0B2A7A] mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-[#06163F] mb-0.5">
                {stat.label}
              </div>
              <div className="text-[11px] text-[#06163F]/60">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

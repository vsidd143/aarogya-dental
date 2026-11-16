"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Placeholder from "@/components/ui/Placeholder";
import { siteContent } from "@/data/content";
import { ArrowRight, Users } from "lucide-react";

export default function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(imageWrapperRef.current, {
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(overlayRef.current, {
        opacity: 0.85,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      data-section-theme="dark"
      className="relative bg-[#0B2A7A] text-white overflow-hidden py-28 sm:py-36"
    >
      {/* Full-Width Parallax Scaling Background Image (team-group.jpg) */}
      <div
        ref={imageWrapperRef}
        className="absolute inset-0 w-full h-full pointer-events-none transform origin-center will-change-transform"
      >
        <Placeholder
          name="team-group.jpg"
          ratio="full"
          className="w-full h-full filter saturate-[0.8] brightness-75"
        />
      </div>

      {/* Deepening Dark Navy Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-[#06163F]/80 via-[#0B2A7A]/75 to-[#06163F] pointer-events-none transition-opacity duration-300"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tag & Main Line */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-200 text-xs font-mono uppercase tracking-[0.25em] mb-6">
            <Users className="w-3.5 h-3.5 text-cyan-300" />
            FACULTY & CLINICAL MASTERY
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl text-white font-medium tracking-tight leading-[1.08] mb-6">
            Our team is <em>dedicated</em> to providing exceptional results.
          </h2>

          <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
            {siteContent.team.leadSubtitle}
          </p>

          <Link href="/doctors" className="btn-pill-white group">
            <span>Meet Our Doctors</span>
            <ArrowRight className="w-4 h-4 text-cyan-300 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Doctors Name & Title Captions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/20">
          {siteContent.team.doctors.map((doc, idx) => (
            <div
              key={doc.id}
              className="p-6 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 hover:border-cyan-400/40 transition-all group"
            >
              <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 mb-2">
                0{idx + 1} · {doc.experience}
              </div>
              <h3 className="font-serif text-2xl text-white group-hover:text-cyan-200 transition-colors mb-1">
                {doc.name}
              </h3>
              <div className="text-xs font-mono text-cyan-300/80 mb-2">
                {doc.degree}
              </div>
              <p className="text-xs text-white/70 line-clamp-2">
                {doc.specialization}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

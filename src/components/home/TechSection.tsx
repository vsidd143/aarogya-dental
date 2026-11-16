"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Placeholder from "@/components/ui/Placeholder";
import { siteContent } from "@/data/content";

export default function TechSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const technologies = siteContent.technology;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinRef.current,
        pin: true,
        start: "top top",
        end: "+=2200",
        scrub: 0.6,
        onUpdate: (self) => {
          const step = 1 / technologies.length;
          const idx = Math.min(
            technologies.length - 1,
            Math.floor(self.progress / step)
          );
          setActiveIndex(idx);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [technologies.length]);

  return (
    <section
      ref={containerRef}
      data-section-theme="light"
      className="relative bg-[#F4F8FF] text-[#06163F] overflow-hidden z-20"
    >
      {/* Pinned Desktop Viewport (100vh) */}
      <div
        ref={pinRef}
        className="w-full min-h-screen lg:h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-16 pt-20 sm:pt-24 pb-8 sm:pb-12 bg-[#F4F8FF] z-20"
      >
        {/* Heading Spread Over 3 Offset Lines */}
        <div className="mb-4 sm:mb-6 shrink-0">
          <div className="space-y-0.5">
            {/* Line 1 */}
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0B2A7A] font-medium tracking-tight leading-[0.95]">
              Technology-Driven
            </h2>
            {/* Line 2 (Offset) */}
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0B2A7A] font-medium tracking-tight leading-[0.95] pl-6 sm:pl-16">
              Dentistry
            </h2>
            {/* Line 3 with italic "for" */}
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#0B2A7A] font-medium tracking-tight leading-[0.95] pl-12 sm:pl-32">
              <em className="font-normal italic text-[#12A4DB] mr-2">for</em>
              Exceptional Results
            </h2>
          </div>
        </div>

        {/* Pinned 3-Column Layout: Number (Far Left) | Center Image Card | Right List of Names */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
          {/* Far Left: Dynamic Big Number */}
          <div className="hidden lg:flex col-span-2 flex-col justify-center">
            <div className="font-serif text-8xl xl:text-9xl font-light text-[#0B2A7A] leading-none transition-all duration-300">
              {technologies[activeIndex].number}
            </div>
          </div>

          {/* Center: Image Card (tech-1 to tech-5) with slight vertical slide & cross-fade */}
          <div className="col-span-1 lg:col-span-5 relative h-64 sm:h-80 lg:h-[340px] rounded-3xl overflow-hidden border border-[#0B2A7A]/15 shadow-xl bg-slate-950">
            {technologies.map((t, idx) => (
              <div
                key={t.id}
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out transform ${
                  idx === activeIndex
                    ? "opacity-100 translate-y-0 scale-100 z-10"
                    : idx < activeIndex
                    ? "opacity-0 -translate-y-6 scale-95 z-0"
                    : "opacity-0 translate-y-6 scale-95 z-0"
                }`}
              >
                <Placeholder
                  name={t.image}
                  ratio="4/5"
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06163F]/90 via-[#06163F]/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300 block mb-1">
                    {t.tagline}
                  </span>
                  <div className="font-serif text-2xl font-medium">
                    {t.name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: List of 01 to 05 names (Active item full navy, others 30% opacity) */}
          <div className="col-span-1 lg:col-span-5 space-y-3">
            {technologies.map((tech, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={tech.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? "bg-white border-[#0B2A7A]/30 shadow-lg translate-x-2"
                      : "bg-transparent border-transparent opacity-30 hover:opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-xs font-mono font-bold ${
                          isActive ? "text-[#12A4DB]" : "text-[#0B2A7A]"
                        }`}
                      >
                        {tech.number}
                      </span>
                      <h4
                        className={`font-serif text-lg sm:text-xl font-semibold transition-colors ${
                          isActive ? "text-[#0B2A7A]" : "text-[#06163F]"
                        }`}
                      >
                        {tech.name}
                      </h4>
                    </div>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#12A4DB] animate-pulse" />
                    )}
                  </div>

                  {isActive && (
                    <p className="mt-2 text-xs sm:text-sm text-[#06163F]/75 leading-relaxed font-sans animate-in fade-in duration-300 pl-7">
                      {tech.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Status bar */}
        <div className="pt-6 border-t border-[#0B2A7A]/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#0B2A7A]/60">
          <span>ALL HARDWARE OPERATED EXCLUSIVELY BY POSTGRADUATE SPECIALISTS</span>
        </div>
      </div>
    </section>
  );
}

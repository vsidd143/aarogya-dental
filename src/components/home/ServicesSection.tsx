"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Placeholder from "@/components/ui/Placeholder";
import { siteContent } from "@/data/content";
import { ArrowRight } from "lucide-react";

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const services = siteContent.services;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: pinRef.current,
        start: "top top",
        end: "+=2200",
        scrub: 0.5,
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.33) {
            setActiveSlideIndex(0);
          } else if (p < 0.67) {
            setActiveSlideIndex(1);
          } else {
            setActiveSlideIndex(2);
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      data-section-theme="midnight"
      className="relative bg-[#06163F] text-white z-20 overflow-hidden"
    >
      {/* Pinned Desktop Viewport (100vh) */}
      <div
        ref={pinRef}
        className="relative w-full min-h-screen lg:h-screen overflow-hidden flex flex-col justify-between p-6 sm:p-12 lg:p-16 bg-[#06163F] z-20"
      >
        {/* Top Bar: Label & Slide Counter + Thin Progress Bar */}
        <div className="relative z-30 flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-300">
              CLINICAL DISCIPLINES
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-xs font-mono tracking-widest text-white/70">
              <span className="text-cyan-400 font-bold text-sm">
                0{activeSlideIndex + 1}
              </span>{" "}
              / 0{services.length}
            </div>
            {/* Thin Progress Bar */}
            <div className="w-24 sm:w-36 h-[2px] bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-400 transition-all duration-300"
                style={{
                  width: `${((activeSlideIndex + 1) / services.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Desktop Slides View */}
        <div className="relative flex-1 my-auto hidden lg:grid grid-cols-12 gap-12 items-center z-20">
          {/* Left / Center: Large Portrait Image (slightly desaturated with navy overlay) */}
          <div className="col-span-6 relative h-[65vh] rounded-3xl overflow-hidden border border-cyan-400/20 shadow-2xl bg-slate-950">
            {services.map((svc, idx) => {
              const isActive = idx === activeSlideIndex;
              const isPast = idx < activeSlideIndex;
              return (
                <div
                  key={svc.id}
                  className={`absolute inset-0 w-full h-full transform transition-all duration-700 ease-out ${
                    isActive
                      ? "opacity-100 scale-100 z-10 translate-y-0"
                      : isPast
                      ? "opacity-0 scale-95 z-0 -translate-y-4 pointer-events-none"
                      : "opacity-0 scale-105 z-0 translate-y-6 pointer-events-none"
                  }`}
                  style={{
                    clipPath: isActive ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                    transition:
                      "clip-path 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <Placeholder
                    name={svc.image}
                    ratio="4/5"
                    className="w-full h-full filter saturate-[0.85]"
                  />
                  {/* Navy & Cyan overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06163F] via-[#0B2A7A]/30 to-transparent pointer-events-none" />

                  {/* Giant White Italic Serif Title Bottom-Left */}
                  <div className="absolute bottom-8 left-8 right-8 z-20">
                    <span className="text-[11px] font-mono tracking-widest uppercase text-cyan-300 block mb-2">
                      0{idx + 1} · {svc.subtitle}
                    </span>
                    <h3 className="font-serif italic text-5xl xl:text-6xl text-white font-normal tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
                      {svc.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side: Solutions info & 4 sub-services with arrows */}
          <div className="col-span-6 pl-4 flex flex-col justify-center">
            {services.map((svc, idx) => {
              if (idx !== activeSlideIndex) return null;
              return (
                <div key={svc.id} className="service-right space-y-6 animate-in fade-in duration-500">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono tracking-widest uppercase">
                    OUR SOLUTIONS
                  </div>

                  <p className="text-white/80 text-lg leading-relaxed max-w-lg font-sans">
                    {svc.description}
                  </p>

                  {/* List of 4 Sub-services with arrows */}
                  <div className="space-y-3 pt-2">
                    {svc.subServices.map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        className="group flex items-start justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.07] transition-all"
                      >
                        <div className="pr-4">
                          <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            {sub.name}
                          </span>
                          <span className="text-xs text-white/50 block mt-0.5">
                            {sub.description}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-cyan-400 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all mt-1 shrink-0" />
                      </div>
                    ))}
                  </div>

                  {/* Small Thumbnail Card & Learn More Pill */}
                  <div className="pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-cyan-400/30 shadow-md">
                        <Placeholder name={svc.thumb} ratio="1/1" className="w-full h-full" />
                      </div>
                      <div className="text-xs">
                        <span className="text-white font-medium block">
                          Biomimetic Formulation
                        </span>
                        <span className="text-white/50 text-[11px]">
                          Precision shade & strength match
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/services#${svc.id}`}
                      className="btn-pill-white text-xs !py-3 !px-6"
                    >
                      <span>Explore {svc.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-cyan-300" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile View: Stacked Editorial Cards */}
        <div className="lg:hidden space-y-12 my-8 z-20">
          {services.map((svc, idx) => (
            <div
              key={svc.id}
              className="rounded-3xl bg-white/[0.04] border border-white/10 p-6 space-y-5"
            >
              <div className="relative h-64 rounded-2xl overflow-hidden border border-cyan-400/20">
                <Placeholder name={svc.image} ratio="16/9" className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06163F] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-mono uppercase text-cyan-400 block">
                    0{idx + 1}
                  </span>
                  <h3 className="font-serif italic text-3xl text-white font-normal">
                    {svc.title}
                  </h3>
                </div>
              </div>

              <p className="text-white/70 text-sm">{svc.description}</p>

              <div className="space-y-2">
                {svc.subServices.map((sub, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs"
                  >
                    <span className="text-white font-medium">{sub.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                ))}
              </div>

              <Link
                href={`/services#${svc.id}`}
                className="btn-pill-cyan w-full text-center text-xs block !py-3"
              >
                Learn More About {svc.title}
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="relative z-20 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-white/50">
          <span>Swiss Ceramic & Guided Surgical Technology</span>
          <Link href="/services" className="text-cyan-400 hover:text-cyan-300 font-mono">
            View Complete Treatment Menu →
          </Link>
        </div>
      </div>
    </section>
  );
}

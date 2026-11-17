"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Placeholder from "@/components/ui/Placeholder";
import { siteContent } from "@/data/content";
import { ArrowRight, MapPin } from "lucide-react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const slide3Ref = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const captionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || prefersReducedMotion) {
      return; // Use mobile layout with standard reveals
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: pinRef.current,
          start: "top top",
          end: "+=3200", // ~400vh scroll scene
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Step 1: Left panel slides out to left, right panel expands to 100% width
      tl.to(
        leftPanelRef.current,
        {
          xPercent: -105,
          opacity: 0,
          ease: "power2.inOut",
          duration: 1.5,
        },
        0
      );

      tl.to(
        rightPanelRef.current,
        {
          width: "100%",
          left: "0%",
          ease: "power2.inOut",
          duration: 1.5,
        },
        0
      );

      tl.to(
        captionsRef.current,
        {
          opacity: 0,
          y: -20,
          duration: 0.8,
        },
        0.5
      );

      // Step 2: Transition hero-1 -> hero-2 (clip-path wipe from bottom & scale)
      tl.fromTo(
        slide2Ref.current,
        {
          clipPath: "inset(100% 0% 0% 0%)",
          scale: 1.15,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1.0,
          ease: "power2.inOut",
          duration: 1.8,
        },
        1.5
      );

      // Step 3: Transition hero-2 -> hero-3 (clip-path wipe from right & zoom out)
      tl.fromTo(
        slide3Ref.current,
        {
          clipPath: "inset(0% 0% 100%)",
          scale: 1.15,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1.0,
          ease: "power2.inOut",
          duration: 1.8,
        },
        3.3
      );

      // Step 4: Huge white serif horizontal line travels right to left over hero-3
      tl.fromTo(
        marqueeRef.current,
        {
          x: "60vw",
          opacity: 0,
        },
        {
          x: "-80vw",
          opacity: 1,
          ease: "none",
          duration: 2.5,
        },
        3.8
      );

      // Step 5: hero container slightly shrinks and lifts up
      tl.to(
        pinRef.current,
        {
          scale: 0.94,
          borderRadius: "40px",
          overflow: "hidden",
          ease: "power2.inOut",
          duration: 1.2,
        },
        5.5
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      data-section-theme="light"
      className="relative bg-[#F4F8FF] overflow-hidden z-10"
    >
      {/* Viewport: Natural Flow on Mobile, Pinned on Desktop (100vh) */}
      <div
        ref={pinRef}
        className="relative w-full h-auto lg:h-screen lg:overflow-hidden flex flex-col lg:flex-row"
      >
        {/* Left 42% Panel: Off-white Clinic Intro */}
        <div
          ref={leftPanelRef}
          className="relative w-full lg:w-[42%] h-auto lg:h-full bg-[#F4F8FF] z-20 flex flex-col justify-between px-6 sm:px-12 lg:px-14 pt-28 sm:pt-32 pb-10 shadow-xl lg:shadow-none"
        >
          {/* Subtle noise texture */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10">
            {/* Clinic Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#12A4DB]/30 shadow-sm text-xs font-mono font-semibold tracking-[0.2em] text-[#0B2A7A] uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#12A4DB] animate-pulse" />
              {siteContent.hero.badge}
            </div>

            {/* Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl text-[#0B2A7A] font-medium tracking-tight leading-[0.98] mb-6">
              {siteContent.hero.headlineLine1}{" "}
              <span className="italic text-[#12A4DB] block">
                {siteContent.hero.headlineOverlayWord}
              </span>
            </h1>

            {/* Editorial Description */}
            <p className="text-[#06163F]/80 text-base sm:text-lg leading-relaxed max-w-md mb-8 font-sans">
              {siteContent.hero.description}
            </p>

            {/* Primary Action Button */}
            <div className="flex flex-wrap items-center gap-4">
              <a href="#footer-booking" className="btn-pill-navy group">
                <span>Book a Consultation</span>
                <ArrowRight className="w-4 h-4 text-cyan-300 group-hover:translate-x-1 transition-transform" />
              </a>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#0B2A7A] hover:text-[#12A4DB] transition-colors py-2 px-3"
              >
                Our Philosophy →
              </Link>
            </div>
          </div>

          {/* Bottom-left: Clinic Location */}
          <div className="relative z-10 pt-8 border-t border-[#0B2A7A]/10 flex items-center gap-2 text-xs font-mono text-[#0B2A7A]/70">
            <MapPin className="w-3.5 h-3.5 text-[#12A4DB]" />
            <span>{siteContent.hero.locationBadge}</span>
          </div>
        </div>

        {/* Right 58% Panel: Image Sequence + Dentistry Overlap */}
        <div
          ref={rightPanelRef}
          className="relative w-full lg:w-[58%] h-[50vh] sm:h-[60vh] lg:h-full lg:absolute lg:right-0 lg:top-0 z-10 overflow-hidden bg-slate-950"
        >

          {/* Slide 1: hero-1.jpg */}
          <div
            ref={slide1Ref}
            className="absolute inset-0 w-full h-full z-10"
          >
            <Placeholder
              name="hero-1.jpg"
              ratio="full"
              priority
              className="w-full h-full"
            />
            {/* Subtle dark vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Slide 2: hero-2.jpg (Transitions in on scroll) */}
          <div
            ref={slide2Ref}
            className="hidden lg:block absolute inset-0 w-full h-full z-15"
            style={{ clipPath: "inset(100% 0% 0% 0%)" }}
          >
            <Placeholder
              name="hero-2.jpg"
              ratio="full"
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />
          </div>

          {/* Slide 3: hero-3.jpg (Transitions in on scroll) */}
          <div
            ref={slide3Ref}
            className="hidden lg:block absolute inset-0 w-full h-full z-20"
            style={{ clipPath: "inset(0% 0% 100%)" }}
          >
            <Placeholder
              name="hero-3.jpg"
              ratio="full"
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30 pointer-events-none" />
          </div>

          {/* Huge White Serif Parallax Marquee over Hero-3 */}
          <div
            ref={marqueeRef}
            className="hidden lg:flex absolute top-1/2 -translate-y-1/2 z-25 whitespace-nowrap pointer-events-none select-none"
          >
            <h2 className="font-serif italic text-6xl xl:text-8xl text-white font-normal tracking-tight drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
              {siteContent.hero.parallaxScrollLine}
            </h2>
          </div>

          {/* Two Small White Captions at Bottom */}
          <div
            ref={captionsRef}
            className="absolute bottom-8 left-8 right-8 z-25 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 text-xs font-sans text-white/90 drop-shadow-md"
          >
            <div className="max-w-xs flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
              <span>{siteContent.hero.captions[0]}</span>
            </div>
            <div className="max-w-xs text-left sm:text-right flex items-center sm:justify-end gap-2 text-white/80">
              <span>{siteContent.hero.captions[1]}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 hidden sm:inline-block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

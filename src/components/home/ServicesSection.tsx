"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Placeholder from "@/components/ui/Placeholder";
import { siteContent } from "@/data/content";
import { ArrowRight } from "lucide-react";

export default function ServicesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Left Side Image Card Refs
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const slide3Ref = useRef<HTMLDivElement>(null);

  const innerImg1Ref = useRef<HTMLDivElement>(null);
  const innerImg2Ref = useRef<HTMLDivElement>(null);
  const innerImg3Ref = useRef<HTMLDivElement>(null);

  // Right Side Content Refs
  const right1Ref = useRef<HTMLDivElement>(null);
  const right2Ref = useRef<HTMLDivElement>(null);
  const right3Ref = useRef<HTMLDivElement>(null);

  const services = siteContent.services;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isMobile || prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Set initial positions via GSAP (avoids React re-render style clashes)
      gsap.set(slide2Ref.current, { yPercent: 100 });
      gsap.set(slide3Ref.current, { yPercent: 100 });

      gsap.set(innerImg2Ref.current, { scale: 1.15 });
      gsap.set(innerImg3Ref.current, { scale: 1.15 });

      gsap.set(right2Ref.current, { opacity: 0, y: 35, pointerEvents: "none" });
      gsap.set(right3Ref.current, { opacity: 0, y: 35, pointerEvents: "none" });

      // Master scrubbed timeline for smooth scrolling & continuous image transitions
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          pin: true,
          start: "top top",
          end: "+=2800",
          scrub: 1, // 1s smooth inertia tracking
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;

            // Update top counter number smoothly
            if (counterRef.current) {
              const num = p < 0.4 ? "01" : p < 0.75 ? "02" : "03";
              if (counterRef.current.innerText !== num) {
                counterRef.current.innerText = num;
              }
            }

            // Fill top progress bar smoothly based on scroll
            if (progressBarRef.current) {
              const pct = (p * 0.67 + 0.33) * 100;
              progressBarRef.current.style.width = `${Math.min(
                100,
                Math.max(33, pct)
              )}%`;
            }
          },
        },
      });

      // =========================================================================
      // SCENE 1: Hold on Slide 1 (Esthetic Dentistry)
      // =========================================================================
      tl.to({}, { duration: 0.7 });

      // =========================================================================
      // TRANSITION 1 -> 2 (Slide 1 -> Slide 2)
      // =========================================================================
      // Left: Slide 2 smoothly slides up like an editorial card
      tl.to(
        slide2Ref.current,
        {
          yPercent: 0,
          ease: "power1.inOut",
          duration: 0.9,
        },
        0.7
      );

      // Inner image parallax zoom settle
      tl.to(
        innerImg2Ref.current,
        {
          scale: 1.0,
          ease: "power1.out",
          duration: 0.9,
        },
        0.7
      );

      // Slide 1 scales back and dims
      tl.to(
        innerImg1Ref.current,
        {
          scale: 0.92,
          filter: "brightness(0.35)",
          ease: "power1.inOut",
          duration: 0.9,
        },
        0.7
      );

      // Right: Content 1 slides up and fades out
      tl.to(
        right1Ref.current,
        {
          opacity: 0,
          y: -35,
          pointerEvents: "none",
          ease: "power1.inOut",
          duration: 0.6,
        },
        0.7
      );

      // Right: Content 2 slides in from bottom and fades in
      tl.to(
        right2Ref.current,
        {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
          ease: "power1.out",
          duration: 0.7,
        },
        0.9
      );

      // =========================================================================
      // SCENE 2: Hold on Slide 2 (Restorative Dentistry)
      // =========================================================================
      tl.to({}, { duration: 0.7 });

      // =========================================================================
      // TRANSITION 2 -> 3 (Slide 2 -> Slide 3)
      // =========================================================================
      // Left: Slide 3 smoothly slides up
      tl.to(
        slide3Ref.current,
        {
          yPercent: 0,
          ease: "power1.inOut",
          duration: 0.9,
        },
        2.3
      );

      // Inner image parallax zoom settle
      tl.to(
        innerImg3Ref.current,
        {
          scale: 1.0,
          ease: "power1.out",
          duration: 0.9,
        },
        2.3
      );

      // Slide 2 scales back and dims
      tl.to(
        innerImg2Ref.current,
        {
          scale: 0.92,
          filter: "brightness(0.35)",
          ease: "power1.inOut",
          duration: 0.9,
        },
        2.3
      );

      // Right: Content 2 slides up and fades out
      tl.to(
        right2Ref.current,
        {
          opacity: 0,
          y: -35,
          pointerEvents: "none",
          ease: "power1.inOut",
          duration: 0.6,
        },
        2.3
      );

      // Right: Content 3 slides in from bottom and fades in
      tl.to(
        right3Ref.current,
        {
          opacity: 1,
          y: 0,
          pointerEvents: "auto",
          ease: "power1.out",
          duration: 0.7,
        },
        2.5
      );

      // =========================================================================
      // SCENE 3: Hold on Slide 3 (Beyond the Smile) before unpinning
      // =========================================================================
      tl.to({}, { duration: 0.6 });
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      data-section-theme="midnight"
      className="relative bg-[#06163F] text-white z-20"
    >
      {/* Viewport: Natural Flow on Mobile, Pinned on Desktop (100vh) */}
      <div
        ref={pinRef}
        className="relative w-full h-auto lg:h-screen lg:overflow-hidden min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-16 bg-[#06163F] z-20"
      >
        {/* Top Bar: Slide Counter + Thin Progress Bar */}
        <div className="relative z-30 flex items-center justify-end pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="text-xs font-mono tracking-widest text-white/70">
              <span
                ref={counterRef}
                className="text-cyan-400 font-bold text-sm"
              >
                01
              </span>{" "}
              / 0{services.length}
            </div>
            {/* Thin Progress Bar */}
            <div className="w-24 sm:w-36 h-[2.5px] bg-white/20 rounded-full overflow-hidden">
              <div
                ref={progressBarRef}
                className="h-full bg-cyan-400 rounded-full"
                style={{ width: "33%" }}
              />
            </div>
          </div>
        </div>

        {/* Desktop Slides View */}
        <div className="relative flex-1 my-auto hidden lg:grid grid-cols-12 gap-12 items-center z-20">
          {/* ========================================================================= */}
          {/* LEFT 6 COLS: Image Card Stack with Parallax Smooth Slide Reveal           */}
          {/* ========================================================================= */}
          <div className="col-span-6 relative h-[65vh] rounded-3xl overflow-hidden border border-cyan-400/20 shadow-2xl bg-slate-950">
            {/* Slide 1: Esthetic Dentistry */}
            <div
              ref={slide1Ref}
              className="absolute inset-0 w-full h-full z-10 overflow-hidden will-change-transform"
            >
              <div
                ref={innerImg1Ref}
                className="w-full h-full will-change-[transform,filter]"
              >
                <Placeholder
                  name={services[0].image}
                  ratio="4/5"
                  priority
                  className="w-full h-full object-cover filter saturate-[0.88]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#06163F]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Slide 2: Restorative Dentistry */}
            <div
              ref={slide2Ref}
              className="absolute inset-0 w-full h-full z-20 overflow-hidden shadow-[-10px_-10px_40px_rgba(0,0,0,0.6)] will-change-transform"
            >
              {/* Cyan Accent Top Border Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee] z-30 pointer-events-none" />

              <div
                ref={innerImg2Ref}
                className="w-full h-full will-change-[transform,filter]"
              >
                <Placeholder
                  name={services[1].image}
                  ratio="4/5"
                  priority
                  className="w-full h-full object-cover filter saturate-[0.88]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#06163F]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Slide 3: Beyond the Smile */}
            <div
              ref={slide3Ref}
              className="absolute inset-0 w-full h-full z-30 overflow-hidden shadow-[-10px_-10px_40px_rgba(0,0,0,0.6)] will-change-transform"
            >
              {/* Cyan Accent Top Border Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee] z-30 pointer-events-none" />

              <div
                ref={innerImg3Ref}
                className="w-full h-full will-change-[transform,filter]"
              >
                <Placeholder
                  name={services[2].image}
                  ratio="4/5"
                  priority
                  className="w-full h-full object-cover filter saturate-[0.88]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#06163F]/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT 6 COLS: Solutions Info & Sub-Services (GPU-Accelerated Smooth Stack)*/}
          {/* ========================================================================= */}
          <div className="col-span-6 pl-4 relative h-[65vh] flex items-center">
            {/* Slide 1 Content */}
            <div
              ref={right1Ref}
              className="absolute inset-0 flex flex-col justify-center space-y-6 will-change-[transform,opacity]"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono tracking-widest uppercase w-fit">
                  01 · {services[0].subtitle}
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl xl:text-5xl text-white font-medium tracking-tight">
                  {services[0].title}
                </h3>
              </div>

              <p className="text-white/80 text-lg leading-relaxed max-w-lg font-sans">
                {services[0].description}
              </p>

              <div className="space-y-3 pt-2">
                {services[0].subServices.map((sub, sIdx) => (
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

              <div className="pt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-cyan-400/30 shadow-md">
                    <Placeholder
                      name={services[0].thumb}
                      ratio="1/1"
                      className="w-full h-full"
                    />
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
                  href={`/services#${services[0].id}`}
                  className="btn-pill-white text-xs !py-3 !px-6"
                >
                  <span>Explore {services[0].title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-300" />
                </Link>
              </div>
            </div>

            {/* Slide 2 Content */}
            <div
              ref={right2Ref}
              className="absolute inset-0 flex flex-col justify-center space-y-6 will-change-[transform,opacity]"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono tracking-widest uppercase w-fit">
                  02 · {services[1].subtitle}
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl xl:text-5xl text-white font-medium tracking-tight">
                  {services[1].title}
                </h3>
              </div>

              <p className="text-white/80 text-lg leading-relaxed max-w-lg font-sans">
                {services[1].description}
              </p>

              <div className="space-y-3 pt-2">
                {services[1].subServices.map((sub, sIdx) => (
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

              <div className="pt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-cyan-400/30 shadow-md">
                    <Placeholder
                      name={services[1].thumb}
                      ratio="1/1"
                      className="w-full h-full"
                    />
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
                  href={`/services#${services[1].id}`}
                  className="btn-pill-white text-xs !py-3 !px-6"
                >
                  <span>Explore {services[1].title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-300" />
                </Link>
              </div>
            </div>

            {/* Slide 3 Content */}
            <div
              ref={right3Ref}
              className="absolute inset-0 flex flex-col justify-center space-y-6 will-change-[transform,opacity]"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono tracking-widest uppercase w-fit">
                  03 · {services[2].subtitle}
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl xl:text-5xl text-white font-medium tracking-tight">
                  {services[2].title}
                </h3>
              </div>

              <p className="text-white/80 text-lg leading-relaxed max-w-lg font-sans">
                {services[2].description}
              </p>

              <div className="space-y-3 pt-2">
                {services[2].subServices.map((sub, sIdx) => (
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

              <div className="pt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-cyan-400/30 shadow-md">
                    <Placeholder
                      name={services[2].thumb}
                      ratio="1/1"
                      className="w-full h-full"
                    />
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
                  href={`/services#${services[2].id}`}
                  className="btn-pill-white text-xs !py-3 !px-6"
                >
                  <span>Explore {services[2].title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-300" />
                </Link>
              </div>
            </div>
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
                <Placeholder
                  name={svc.image}
                  ratio="16/9"
                  className="w-full h-full"
                />
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
          <Link
            href="/services"
            className="text-cyan-400 hover:text-cyan-300 font-mono"
          >
            View Complete Treatment Menu →
          </Link>
        </div>
      </div>
    </section>
  );
}

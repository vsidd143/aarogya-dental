"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Placeholder from "@/components/ui/Placeholder";
import { siteContent } from "@/data/content";
import { ArrowRight, MessageCircle, Calendar } from "lucide-react";

export default function CtaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftHeadingRef = useRef<HTMLHeadingElement>(null);
  const rightHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Left heading slides in from left
      gsap.fromTo(
        leftHeadingRef.current,
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "center center",
            scrub: 0.5,
          },
        }
      );

      // Right heading slides in from right
      gsap.fromTo(
        rightHeadingRef.current,
        {
          x: 100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "center center",
            scrub: 0.5,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const cleanPhone = siteContent.contact.primaryPhone.replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    "Hello Aarogya Dental Clinic, I would like to book a smile consultation."
  )}`;

  return (
    <section
      ref={containerRef}
      data-section-theme="light"
      className="relative bg-[#F4F8FF] text-[#06163F] py-28 sm:py-36 px-4 sm:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Split Sliding Headings: "Your Perfect Smile" & "Brought to Life" */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          <h2
            ref={leftHeadingRef}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#0B2A7A] font-medium tracking-tight"
          >
            {siteContent.cta.leftHeading}
          </h2>

          <span className="hidden md:block w-16 h-[2px] bg-[#12A4DB]/40 rounded-full" />

          <h2
            ref={rightHeadingRef}
            className="font-serif italic text-4xl sm:text-6xl lg:text-7xl text-[#12A4DB] font-normal tracking-tight"
          >
            {siteContent.cta.rightHeading}
          </h2>
        </div>

        {/* Large Smile Image Cropped in an Architectural Dome Shape */}
        <div className="relative w-72 sm:w-96 md:w-[460px] h-96 sm:h-[480px] md:h-[520px] rounded-t-full overflow-hidden shadow-2xl border-4 border-white ring-4 ring-[#12A4DB]/20 bg-slate-950 mb-12 group">
          <Placeholder
            name={siteContent.cta.smileImage}
            ratio="4/5"
            className="w-full h-full group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Action Prompt Line & Buttons */}
        <div className="max-w-xl mx-auto space-y-6">
          <p className="text-xl sm:text-2xl font-serif text-[#0B2A7A] font-medium">
            Ready to transform your smile? Book a call.
          </p>
          <p className="text-xs sm:text-sm text-[#06163F]/70 leading-relaxed font-sans">
            {siteContent.cta.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a href="#footer-booking" className="btn-pill-navy group !py-3.5 !px-8 text-sm">
              <Calendar className="w-4 h-4 text-cyan-300" />
              <span>{siteContent.cta.primaryButton}</span>
              <ArrowRight className="w-4 h-4 text-cyan-300 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-cyan !py-3.5 !px-8 text-sm flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{siteContent.cta.secondaryButton}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteContent } from "@/data/content";

export default function SignatureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const orbitPathRef = useRef<SVGPathElement>(null);
  const orbitPath2Ref = useRef<SVGPathElement>(null);
  const glowingDotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Text words stagger rise
      const words = textRef.current?.querySelectorAll(".sig-word");
      if (words && words.length > 0) {
        gsap.fromTo(
          words,
          {
            y: 50,
            opacity: 0,
            rotateX: 25,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.12,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              end: "center center",
              scrub: 0.6,
            },
          }
        );
      }

      // 2. SVG Elliptical orbit draw on scroll (strokeDashoffset)
      const path = orbitPathRef.current;
      if (path) {
        const length = path.getTotalLength ? path.getTotalLength() : 1800;
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 30%",
            scrub: true,
          },
        });
      }

      // Secondary reverse orbit line
      const path2 = orbitPath2Ref.current;
      if (path2) {
        const length2 = path2.getTotalLength ? path2.getTotalLength() : 1600;
        gsap.set(path2, {
          strokeDasharray: length2,
          strokeDashoffset: -length2,
        });

        gsap.to(path2, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 30%",
            scrub: true,
          },
        });
      }

      // 3. Glowing cyan dot moving along path
      const dot = glowingDotRef.current;
      if (dot && path) {
        const totalLen = path.getTotalLength ? path.getTotalLength() : 1800;
        const obj = { progress: 0 };
        gsap.to(obj, {
          progress: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 30%",
            scrub: true,
            onUpdate: () => {
              const pt = path.getPointAtLength(obj.progress * totalLen);
              dot.setAttribute("cx", String(pt.x));
              dot.setAttribute("cy", String(pt.y));
            },
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      data-section-theme="midnight"
      className="relative bg-gradient-to-b from-[#06163F] via-[#0B2A7A] to-[#06163F] text-white py-36 sm:py-48 px-4 sm:px-8 overflow-hidden flex items-center justify-center min-h-[75vh]"
    >
      {/* Background ambient radial glow */}
      <div className="absolute w-[600px] h-[300px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />

      {/* SVG Elliptical Orbit Lines & Traveling Glowing Dot */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg
          viewBox="0 0 1200 600"
          className="w-[1200px] max-w-full h-[600px] overflow-visible"
          fill="none"
        >
          <defs>
            <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#12A4DB" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#0B2A7A" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#12A4DB" stopOpacity="0.9" />
            </linearGradient>
            <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
            </filter>
          </defs>

          {/* Primary Orbit Ellipse */}
          <path
            ref={orbitPathRef}
            d="M 100 300 C 100 120, 1100 120, 1100 300 C 1100 480, 100 480, 100 300 Z"
            stroke="url(#orbitGrad)"
            strokeWidth="1.75"
            strokeDasharray="1800"
            strokeDashoffset="1800"
            className="opacity-75"
          />

          {/* Secondary Tilted Counter-Ellipse */}
          <path
            ref={orbitPath2Ref}
            d="M 150 240 C 250 80, 1050 200, 1050 360 C 1050 520, 250 400, 150 240 Z"
            stroke="#12A4DB"
            strokeWidth="1"
            strokeOpacity="0.25"
            strokeDasharray="1600"
            strokeDashoffset="1600"
          />

          {/* Traveling Glowing Cyan Dot along path */}
          <circle
            ref={glowingDotRef}
            cx="100"
            cy="300"
            r="8"
            fill="#12A4DB"
            filter="url(#dotGlow)"
            className="animate-pulse"
          />
          <circle
            cx="100"
            cy="300"
            r="3.5"
            fill="#FFFFFF"
            className="drop-shadow-[0_0_8px_#12A4DB]"
          />
        </svg>
      </div>

      {/* Giant Centred Headline */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
        <h2
          ref={textRef}
          className="font-serif text-4xl sm:text-7xl lg:text-8xl text-white font-medium tracking-tight leading-[1.08] drop-shadow-[0_10px_40px_rgba(0,0,0,0.7)]"
        >
          <span className="sig-word inline-block mr-[0.3em]">We</span>
          <span className="sig-word inline-block mr-[0.3em]">are</span>
          <span className="sig-word inline-block mr-[0.3em] font-normal italic text-[#12A4DB]">
            here
          </span>
          <span className="sig-word inline-block mr-[0.3em]">to</span>
          <span className="sig-word inline-block mr-[0.3em] font-normal italic text-cyan-200">
            Enhance
          </span>
          <span className="sig-word inline-block mr-[0.3em]">Your</span>
          <span className="sig-word inline-block">Smile</span>
        </h2>

        <p className="mt-8 text-white/70 text-sm sm:text-base font-sans tracking-wide max-w-xl mx-auto">
          {siteContent.signature.subtext}
        </p>
      </div>
    </section>
  );
}

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface InnerHeroProps {
  badge: string;
  title: string;
  subtitle: string;
  breadcrumb: string;
}

export default function InnerPageHero({
  badge,
  title,
  subtitle,
  breadcrumb,
}: InnerHeroProps) {
  return (
    <div
      data-section-theme="dark"
      className="inner-wave-header relative pt-36 pb-28 text-white px-4 sm:px-8 overflow-hidden bg-[#06163F] bg-gradient-to-b from-[#06163F] via-[#0B2A7A] to-[#040e2b]"
      style={{
        backgroundColor: "#06163F",
        backgroundImage: "linear-gradient(135deg, #06163F 0%, #0B2A7A 50%, #030d28 100%)",
      }}
    >
      {/* Background radial ambient lights */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-600/25 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-300/90 mb-4">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/50" />
          <span className="text-white font-medium">{breadcrumb}</span>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(18,164,219,0.25)]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping" />
          {badge}
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-4xl sm:text-6xl text-white font-medium tracking-tight mb-4 drop-shadow-md">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-white/85 text-base sm:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Blue Wave SVG Divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 text-[#F4F8FF] fill-current"
        >
          <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,40 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </div>
  );
}

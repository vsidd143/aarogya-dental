import React from "react";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import TechSection from "@/components/home/TechSection";
import TeamSection from "@/components/home/TeamSection";
import SignatureSection from "@/components/home/SignatureSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CtaSection from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Section 1: Hero Pinned Scene (~400vh) */}
      <HeroSection />

      {/* Section 2: About Manifesto & Inline Portrait */}
      <AboutSection />

      {/* Section 3: Services 3-Slide Pinned Dark Scene */}
      <ServicesSection />

      {/* Section 4: Technology Arsenal (01 to 05) */}
      <TechSection />

      {/* Section 5: Faculty Team Parallax */}
      <TeamSection />

      {/* Section 6: Signature Orbit Text Scene */}
      <SignatureSection />

      {/* Section 7: Patient Testimonials */}
      <TestimonialsSection />

      {/* Section 8: Call to Action Dome */}
      <CtaSection />
    </div>
  );
}

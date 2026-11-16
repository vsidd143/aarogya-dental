"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteContent } from "@/data/content";
import { ChevronDown, Menu, X, ArrowRight, Phone } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close menus on route change without cascading effect render
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateHeaderState = () => {
      const currentScrollY = window.scrollY;

      // 1. Show on scroll up, hide on scroll down (after 120px)
      if (currentScrollY > 120) {
        setIsScrolled(true);
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 8) {
          setIsVisible(false); // scrolling down
        } else if (lastScrollY - currentScrollY > 8) {
          setIsVisible(true); // scrolling up
        }
      } else {
        setIsScrolled(false);
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;

      // 2. Detect section theme under header
      const headerPoint = 50; // pixels from top
      const elementsUnderHeader = document.elementsFromPoint(
        window.innerWidth / 2,
        headerPoint
      );

      let foundDark = false;
      for (const el of elementsUnderHeader) {
        const themeEl = el.closest("[data-section-theme]");
        if (themeEl) {
          const theme = themeEl.getAttribute("data-section-theme");
          if (theme === "dark" || theme === "midnight") {
            foundDark = true;
          }
          break;
        }
      }

      // If we are on inner pages with blue wave header, top is dark
      if (pathname !== "/" && currentScrollY < 350) {
        foundDark = true;
      }

      setIsDarkSection(foundDark);
    };

    window.addEventListener("scroll", updateHeaderState, { passive: true });
    updateHeaderState();

    return () => window.removeEventListener("scroll", updateHeaderState);
  }, [pathname]);

  const isHeroAtTop = pathname === "/" && !isScrolled;

  // Left side: on unscrolled homepage it's over the white half -> navy text. Otherwise matches theme.
  const leftColor = isHeroAtTop
    ? "text-[#0B2A7A]"
    : isDarkSection
    ? "text-white"
    : "text-[#0B2A7A]";

  // Right side: on unscrolled homepage it's over the dark image -> white text. Otherwise matches theme.
  const rightColor = isHeroAtTop
    ? "text-white"
    : isDarkSection
    ? "text-white"
    : "text-[#0B2A7A]";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isScrolled
            ? isDarkSection
              ? "bg-[#06163F]/90 backdrop-blur-md border-b border-white/10 shadow-lg"
              : "bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="w-full px-6 sm:px-10 lg:px-12 h-20 flex items-center justify-between">
          {/* Left: Brand Logo + Menu + Services */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* Minimalist Arch Crest in rounded square */}
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-colors ${
                  isHeroAtTop || (!isDarkSection && isScrolled)
                    ? "border-[#0B2A7A]/30 bg-white/60 shadow-sm"
                    : "border-white/30 bg-white/10 shadow-sm"
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className={`w-5 h-5 ${
                    isHeroAtTop || (!isDarkSection && isScrolled)
                      ? "text-[#0B2A7A]"
                      : "text-white"
                  }`}
                >
                  <path
                    d="M5 19C5 11 8 6 12 6C16 6 19 11 19 19"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8.5 19C8.5 13.5 10 9.5 12 9.5C14 9.5 15.5 13.5 15.5 19"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span
                className={`font-serif text-lg sm:text-xl font-bold tracking-tight transition-colors duration-300 ${leftColor}`}
              >
                Aarogya Dental
              </span>
            </Link>

            {/* Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wide transition-colors ${leftColor} hover:opacity-75`}
            >
              <span>Menu</span>
              <Menu className="w-4 h-4" />
            </button>

            {/* Services Dropdown */}
            <div
              className="relative hidden sm:block"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <Link
                href="/services"
                className={`flex items-center gap-1 text-xs sm:text-sm font-medium tracking-wide transition-colors ${leftColor} hover:opacity-75`}
              >
                <span>Services</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    servicesDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </Link>

              {servicesDropdownOpen && (
                <div className="absolute top-full -left-4 pt-3 w-80">
                  <div className="bg-[#06163F]/95 backdrop-blur-xl border border-cyan-400/25 rounded-2xl p-3 shadow-2xl text-white">
                    <div className="text-[10px] uppercase font-mono tracking-widest text-cyan-400/80 px-3 py-1.5 border-b border-white/10">
                      Clinical Disciplines
                    </div>
                    {siteContent.services.map((svc) => (
                      <Link
                        key={svc.id}
                        href={`/services#${svc.id}`}
                        className="group flex flex-col px-3 py-2.5 rounded-xl hover:bg-white/10 transition-colors"
                      >
                        <span className="text-sm font-serif font-medium text-white group-hover:text-cyan-300 flex items-center justify-between">
                          {svc.title}
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all text-cyan-400" />
                        </span>
                        <span className="text-xs text-white/50 line-clamp-1 mt-0.5">
                          {svc.subtitle}
                        </span>
                      </Link>
                    ))}
                    <div className="pt-2 mt-1 border-t border-white/10 px-2">
                      <Link
                        href="/services"
                        className="text-xs text-center block py-1.5 text-cyan-300 hover:text-white font-medium"
                      >
                        Explore All Treatments →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Patient form + Phone + Book A Call + */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="#footer-booking"
              className={`hidden md:flex items-center gap-1 text-xs sm:text-sm font-medium tracking-wide transition-colors ${rightColor} hover:opacity-80`}
            >
              <span>Patient form</span>
              <span className="text-xs">↗</span>
            </a>

            <a
              href={`tel:${siteContent.contact.primaryPhone.replace(/\s+/g, "")}`}
              className={`hidden sm:flex items-center gap-1 text-xs sm:text-sm font-medium tracking-wide transition-colors ${rightColor} hover:opacity-80`}
            >
              <span>{siteContent.contact.primaryPhone}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </a>

            <a
              href="#footer-booking"
              className="bg-white text-slate-900 border border-slate-200/60 shadow-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold hover:bg-slate-50 transition-all flex items-center gap-1.5 tracking-wide"
            >
              <span>Book A Call</span>
              <span className="text-sm font-normal text-slate-500">+</span>
            </a>
          </div>
        </div>
      </header>

      {/* Full Navigation Drawer when clicking "Menu" */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="relative ml-auto w-full max-w-md bg-[#06163F] text-white h-full shadow-2xl flex flex-col justify-between p-8 sm:p-10 z-10 animate-in slide-in-from-right duration-300 overflow-y-auto border-l border-white/10">
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg border border-white/30 flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="w-4 h-4 text-white"
                    >
                      <path
                        d="M5 19C5 11 8 6 12 6C16 6 19 11 19 19"
                        strokeLinecap="round"
                      />
                      <path
                        d="M8.5 19C8.5 13.5 10 9.5 12 9.5C14 9.5 15.5 13.5 15.5 19"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <span className="font-serif text-lg font-bold text-white">
                    Aarogya Dental
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex flex-col gap-5 pt-8">
                {[
                  { name: "Home", href: "/" },
                  { name: "About Us", href: "/about" },
                  { name: "Clinical Disciplines", href: "/services" },
                  { name: "Our Doctors", href: "/doctors" },
                  { name: "Gallery & Cases", href: "/gallery" },
                  { name: "Patient Reviews", href: "/testimonials" },
                  { name: "FAQ", href: "/faq" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-serif text-2xl font-light text-white/90 hover:text-cyan-300 transition-colors flex items-center justify-between group"
                  >
                    <span>{item.name}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-cyan-400" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Drawer Footer */}
            <div className="pt-8 border-t border-white/10 mt-8 flex flex-col gap-4 text-xs font-mono text-white/60">
              <div className="flex items-center gap-2 text-white/80">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <a
                  href={`tel:${siteContent.contact.primaryPhone.replace(/\s+/g, "")}`}
                  className="hover:text-white"
                >
                  {siteContent.contact.primaryPhone}
                </a>
              </div>
              <a
                href="#footer-booking"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-pill-cyan text-center justify-center !py-3 !text-sm mt-2"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

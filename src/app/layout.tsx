import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ScrollProgress from "@/components/layout/ScrollProgress";
import CustomCursor from "@/components/layout/CustomCursor";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingHelp from "@/components/layout/FloatingHelp";
import { siteContent } from "@/data/content";

export const metadata: Metadata = {
  title: `${siteContent.brand.name} | ${siteContent.brand.tagline}`,
  description: siteContent.hero.description,
  keywords: [
    "Aarogya Dental Clinic",
    "Esthetic Dentistry",
    "Porcelain Veneers",
    "Dental Implants",
    "Invisible Aligners",
    "South Mumbai Dental Clinic",
    "Pune Dental Clinic",
    "Bengaluru Dental Clinic",
  ],
  authors: [{ name: "Aarogya Dental Clinic" }],
  openGraph: {
    title: `${siteContent.brand.name} | ${siteContent.brand.tagline}`,
    description: siteContent.hero.description,
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#F4F8FF] text-[#06163F] font-sans antialiased selection:bg-cyan-400/30 selection:text-navy">
        <SmoothScroll>
          <ScrollProgress />
          <CustomCursor />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <FloatingHelp />
        </SmoothScroll>
      </body>
    </html>
  );
}

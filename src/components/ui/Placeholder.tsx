"use client";

import React, { useState } from "react";
import Image from "next/image";
import { requiredAssets } from "@/data/content";

interface PlaceholderProps {
  name: string;
  ratio?: "16/9" | "4/5" | "1/1" | "3/2" | "21/9" | "full" | string;
  className?: string;
  alt?: string;
  priority?: boolean;
  fill?: boolean;
  recommendedSize?: string;
  objectFit?: "cover" | "contain";
  children?: React.ReactNode;
}

export const Placeholder: React.FC<PlaceholderProps> = ({
  name,
  ratio = "16/9",
  className = "",
  alt,
  priority = false,
  fill = true,
  recommendedSize,
  objectFit = "cover",
  children,
}) => {
  const isVideo = name.endsWith(".mp4") || name.endsWith(".webm");
  const folder = isVideo ? "/videos" : "/images";
  const src = `${folder}/${name}`;

  // Find asset metadata from our content registry
  const assetMeta = requiredAssets.find((a) => a.filename === name);
  const sizeText = recommendedSize || assetMeta?.recommendedSize || "1920 x 1080 px";

  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [prevName, setPrevName] = useState(name);

  if (prevName !== name) {
    setPrevName(name);
    setHasError(false);
    setIsLoaded(false);
    setVideoError(false);
  }

  const aspectClass =
    ratio === "16/9"
      ? "aspect-video"
      : ratio === "4/5"
      ? "aspect-[4/5]"
      : ratio === "1/1"
      ? "aspect-square"
      : ratio === "3/2"
      ? "aspect-[3/2]"
      : ratio === "21/9"
      ? "aspect-[21/9]"
      : ratio === "full"
      ? "h-full w-full"
      : "";

  return (
    <div
      className={`relative overflow-hidden select-none ${aspectClass} ${className}`}
      data-asset-name={name}
      data-asset-ratio={ratio}
    >
      {/* 1. If it's a video and hasn't errored */}
      {isVideo && !videoError ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className={`w-full h-full ${objectFit === "contain" ? "object-contain" : "object-cover"}`}
          onError={() => setVideoError(true)}
        />
      ) : null}

      {/* 2. If it's an image and hasn't errored */}
      {!isVideo && !hasError ? (
        <Image
          src={src}
          alt={alt || assetMeta?.notes || name}
          fill={fill}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
          className={`transition-opacity duration-700 ${
            objectFit === "contain" ? "object-contain" : "object-cover"
          } ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          unoptimized
        />
      ) : null}

      {/* 3. Placeholder UI (shown if image not loaded, errored, or video missing) */}
      {(!isLoaded || hasError || (isVideo && videoError)) && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-500 z-10 ${
            isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          style={{
            background:
              "radial-gradient(ellipse at 70% 20%, rgba(18, 164, 219, 0.45) 0%, rgba(11, 42, 122, 0.85) 55%, rgba(6, 22, 63, 0.98) 100%)",
          }}
        >
          {/* Subtle noise SVG background overlay */}
          <div
            className="absolute inset-0 opacity-[0.14] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Elegant geometric grid accents */}
          <div className="absolute inset-0 border border-cyan-400/15 pointer-events-none m-3 rounded-xl" />
          <div className="absolute top-4 left-4 text-[9px] tracking-[0.25em] font-mono text-cyan-300/60 uppercase">
            CLINIC // SLOT
          </div>
          <div className="absolute top-4 right-4 text-[9px] tracking-[0.2em] font-mono text-cyan-300/60 uppercase">
            {ratio.toUpperCase()}
          </div>

          {/* Central Tooth Icon with soft glow */}
          <div className="relative mb-3 group">
            <div className="absolute -inset-3 bg-cyan-400/25 rounded-full blur-md opacity-75 animate-pulse" />
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#12A4DB]/30 to-[#0B2A7A]/80 border border-cyan-400/40 flex items-center justify-center shadow-lg backdrop-blur-md">
              <svg
                viewBox="0 0 32 32"
                className="w-6 h-6 text-cyan-200 fill-current drop-shadow-[0_2px_8px_rgba(18,164,219,0.5)]"
              >
                <path d="M12 4C9 4 6 7 6 12C6 17 9 24 12 28C13.5 29.5 15.5 28 16 23C16.5 28 18.5 29.5 20 28C23 24 26 17 26 12C26 7 23 4 20 4C17.5 4 16.5 6 16 7C15.5 6 14.5 4 12 4Z" />
              </svg>
            </div>
          </div>

          {/* Filename & size */}
          <div className="space-y-1 max-w-[85%] z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-200 text-[11px] font-mono font-medium tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
              {name}
            </div>
            <div className="text-[10px] text-cyan-200/70 font-mono tracking-wider">
              {sizeText}
            </div>
          </div>

          {/* Subtext info */}
          <div className="absolute bottom-3 inset-x-0 text-center">
            <span className="text-[9px] tracking-widest text-white/40 font-mono uppercase">
              Aarogya Asset Upload Slot
            </span>
          </div>
        </div>
      )}

      {/* Any overlaid content passed as children */}
      {children}
    </div>
  );
};

export default Placeholder;

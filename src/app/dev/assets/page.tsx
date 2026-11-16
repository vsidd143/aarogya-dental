"use client";

import React, { useState } from "react";
import Link from "next/link";
import { requiredAssets } from "@/data/content";
import Placeholder from "@/components/ui/Placeholder";
import { ArrowLeft, Copy, Check, UploadCloud } from "lucide-react";

export default function DevAssetsPage() {
  const [copied, setCopied] = useState(false);
  const [filterOrientation, setFilterOrientation] = useState<string>("all");

  const filtered = requiredAssets.filter((item) => {
    if (filterOrientation === "all") return true;
    return item.orientation === filterOrientation;
  });

  const copyMarkdownChecklist = () => {
    const md = requiredAssets
      .map(
        (a) =>
          `- [ ] \`${a.folder}/${a.filename}\` (${a.recommendedSize}, ${a.orientation}) — Used in: ${a.usedIn} | Notes: ${a.notes}`
      )
      .join("\n");
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#06163F] text-white pt-24 pb-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation & Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl font-serif tracking-tight">
              Aarogya Asset Upload Checklist & Dev Directory
            </h1>
            <p className="text-white/60 text-sm mt-1">
              Live inspection of all {requiredAssets.length} image and video slots. When real files are placed in{" "}
              <code className="text-cyan-300 bg-white/5 px-2 py-0.5 rounded font-mono text-xs">
                /public/images/
              </code>{" "}
              or{" "}
              <code className="text-cyan-300 bg-white/5 px-2 py-0.5 rounded font-mono text-xs">
                /public/videos/
              </code>
              , the website automatically loads them in place of the placeholder gradients.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={copyMarkdownChecklist}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 text-sm font-medium transition-all shadow-[0_0_20px_rgba(18,164,219,0.2)]"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied Checklist!" : "Copy Markdown Checklist"}
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-gradient-to-r from-blue-950/80 to-[#0B2A7A]/40 border border-cyan-400/20 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 shrink-0">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div className="text-sm">
              <span className="font-semibold text-white">How to replace placeholders:</span>
              <p className="text-white/70 text-xs mt-0.5">
                Drop your photo files directly into <code className="text-cyan-300 font-mono">/public/images/</code>{" "}
                with the exact matching filenames below. Formats supported: .jpg, .png, .webp, .svg.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-white/50 uppercase tracking-wider font-mono">Filter:</span>
            {["all", "landscape", "portrait", "square", "video"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterOrientation(type)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                  filterOrientation === type
                    ? "bg-cyan-400 text-slate-950 font-semibold shadow-md"
                    : "bg-white/5 hover:bg-white/10 text-white/70"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of All Asset Slots */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((asset) => (
            <div
              key={asset.filename}
              className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/40 transition-all flex flex-col group"
            >
              {/* Asset Preview */}
              <div className="relative w-full h-52 bg-slate-950">
                <Placeholder
                  name={asset.filename}
                  ratio={asset.orientation === "portrait" ? "4/5" : asset.orientation === "square" ? "1/1" : "16/9"}
                  className="w-full h-full"
                />
              </div>

              {/* Metadata Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-cyan-300 font-semibold text-sm bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                      {asset.filename}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                      {asset.orientation}
                    </span>
                  </div>

                  <h3 className="text-sm font-medium text-white/90 mb-1">
                    {asset.usedIn}
                  </h3>

                  <p className="text-xs text-white/60 line-clamp-2 mb-3">
                    {asset.notes}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-white/40">
                  <span>Target: {asset.recommendedSize}</span>
                  <span className="text-cyan-400/80">{asset.folder}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

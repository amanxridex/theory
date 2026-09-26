"use client";

import Link from "next/link";
import { useStore } from "@/context/StoreContext";

export default function EditorialBanner() {
  const { storeSettings } = useStore();

  const tagline = storeSettings?.manifesto_tagline || "Living Manifesto // Stay Cozy, Stay You";
  const title = storeSettings?.manifesto_title || "WARMTH.\nTEXTURE.\nOBJECTS.";
  const text =
    storeSettings?.manifesto_text ||
    "Some objects blend into the background. Ours are made to be touched, lived with, and passed down. The Cozy Theory crafts everyday ceramics, tactile vessels, and washed home linen for people who refuse cold, generic spaces.";
  const buttonText = storeSettings?.manifesto_button_text || "Explore All Objects →";
  const buttonUrl = storeSettings?.manifesto_button_url || "/collections/all-products";
  const spotlightImage =
    storeSettings?.manifesto_image ||
    "https://cdn.shopify.com/s/files/1/0888/0121/4761/files/Product9-01.png?v=1784242846";
  const spotlightTitle =
    storeSettings?.manifesto_product_title ||
    "TT-251 Ceramic Chicken Condiment Jar with Spoon";
  const spotlightUrl =
    storeSettings?.manifesto_product_url ||
    "/products/tt-251-ceramic-chicken-condiment-jar-with-spoon";

  return (
    <section className="bg-[#121212] text-[#fffdf8] py-16 md:py-24 border-y border-neutral-800">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
        
        {/* Left Manifesto Typography */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase block">
            {tagline}
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-[0.95] whitespace-pre-line">
            {title}
          </h2>
          <p className="text-sm md:text-base text-neutral-300 font-normal leading-relaxed max-w-xl">
            {text}
          </p>
          <div className="pt-2">
            <Link
              href={buttonUrl}
              className="inline-block px-6 py-3.5 bg-[#001540] text-white text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#002266] transition-colors shadow-md border border-[#001540]"
            >
              {buttonText}
            </Link>
          </div>
        </div>

        {/* Right Feature Showcase Box */}
        <div className="lg:col-span-5 relative">
          <Link href={spotlightUrl} className="block aspect-[4/5] bg-neutral-900 border border-neutral-700 overflow-hidden relative group">
            <img
              src={spotlightImage}
              alt={spotlightTitle}
              className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/80 backdrop-blur-md border border-neutral-700">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                Spotlight Object
              </span>
              <p className="text-xs font-mono font-bold uppercase text-white">
                {spotlightTitle}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

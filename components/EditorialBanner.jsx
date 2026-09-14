import Link from "next/link";

export default function EditorialBanner() {
  return (
    <section className="bg-[#121212] text-[#fffdf8] py-16 md:py-24 border-y border-neutral-800">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
        
        {/* Left Manifesto Typography */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[11px] font-mono tracking-[0.25em] text-blue-400 uppercase block">
            Studio Manifesto // The Cozy Theory
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-[0.95]">
            WARMTH.<br />
            TEXTURE.<br />
            <span className="text-neutral-400">OBJECTS.</span>
          </h2>
          <p className="text-sm md:text-base text-neutral-300 font-normal leading-relaxed max-w-xl">
            Some objects blend into the background. Ours are made to be touched, lived with, and passed down. The Cozy Theory crafts everyday ceramics, tactile vessels, and washed home linen for people who refuse cold, generic spaces.
          </p>
          <div className="pt-2">
            <Link
              href="/collections/all-products"
              className="inline-block px-6 py-3.5 bg-[#004fff] text-white text-xs font-mono font-bold tracking-widest uppercase hover:bg-blue-600 transition-colors shadow-md"
            >
              Explore All Objects →
            </Link>
          </div>
        </div>

        {/* Right Feature Showcase Box */}
        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/5] bg-neutral-900 border border-neutral-700 overflow-hidden relative group">
            <img
              src="https://cdn.shopify.com/s/files/1/0593/5890/4514/files/TT-285_1.jpg?v=1733303728"
              alt="Artisanal Handcrafted Vessel by The Cozy Theory"
              className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/80 backdrop-blur-md border border-neutral-700">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-1">
                Spotlight Object
              </span>
              <p className="text-xs font-mono font-bold uppercase text-white">
                Artisanal Stoneware Vessel: Hand-Glazed Floral
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

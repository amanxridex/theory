"use client";

import { useState } from "react";
import { Plus, X, ShoppingBag } from "lucide-react";

export default function LookbookSection({ hotspots, onAddToCart }) {
  const [activeSpot, setActiveSpot] = useState(null);

  return (
    <section className="py-16 md:py-24 bg-[#f3f3f3] border-y border-[#e5e3dc] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-500 block mb-1">
              Curated Atmosphere
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-[#121212]">
              Shop The Look
            </h2>
          </div>
          <p className="text-xs md:text-sm font-mono text-neutral-600 max-w-md">
            Tap the illuminated hotspots on the art arrangement to inspect and add individual conversation objects directly to your bag.
          </p>
        </div>

        {/* Main Lifestyle Photo Container with interactive Hotspots */}
        <div className="relative w-full aspect-[4/3] md:aspect-[21/9] max-h-[680px] bg-neutral-900 border border-[#e5e3dc] overflow-hidden group">
          <picture className="w-full h-full">
            <source
              media="(min-width: 768px)"
              srcSet="https://cdn.shopify.com/s/files/1/0826/5053/0110/files/Two_Odd_x_Notice_Aditya_Sinha-1.jpg?v=1788185403&width=1600&format=webp"
            />
            <img
              src="https://cdn.shopify.com/s/files/1/0826/5053/0110/files/TwoOddxNotice_AdityaSinha-2.jpg?v=1788185490&width=1080&format=webp"
              alt="The Cozy Theory Curated Objects in living space"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </picture>

          {/* Hotspot Pins */}
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              style={{ top: spot.top, left: spot.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                onClick={() => setActiveSpot(activeSpot?.id === spot.id ? null : spot)}
                className="hotspot-pin w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#121212] text-white border-2 border-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform"
                aria-label={`Inspect ${spot.productTitle}`}
              >
                {activeSpot?.id === spot.id ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </button>

              {/* Popover Product Card */}
              {activeSpot?.id === spot.id && (
                <div className="absolute top-11 left-1/2 -translate-x-1/2 w-60 md:w-64 bg-[#fffdf8] border border-[#121212] shadow-2xl p-3 z-30 animate-in fade-in zoom-in duration-200">
                  <div className="flex gap-3 items-center">
                    <img
                      src={spot.image}
                      alt={spot.productTitle}
                      className="w-16 h-16 object-cover border border-[#e5e3dc]"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold uppercase tracking-tight text-[#121212] truncate">
                        {spot.productTitle}
                      </h4>
                      <p className="text-xs font-mono font-bold text-neutral-800 mt-0.5">
                        Rs. {spot.price}
                      </p>
                      <button
                        onClick={() => {
                          onAddToCart({
                            id: spot.productId,
                            title: spot.productTitle,
                            price: spot.price.replace(/,/g, ""),
                            images: [spot.image],
                          });
                          setActiveSpot(null);
                        }}
                        className="mt-2 flex items-center gap-1.5 px-2.5 py-1 bg-[#121212] text-[#fffdf8] text-[10px] font-mono tracking-wider uppercase hover:bg-neutral-800 transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add To Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

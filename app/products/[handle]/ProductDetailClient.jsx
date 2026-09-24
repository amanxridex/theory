"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import {
  Plus,
  Minus,
  ShoppingBag,
  Check,
  ChevronDown,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Share2,
} from "lucide-react";

import { useStore } from "@/context/StoreContext";

export default function ProductDetailClient({ product: initialProduct, relatedProducts: initialRelated, handle }) {
  const { products } = useStore();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState("details");

  const product = initialProduct || (products && products.find((p) => p.handle === handle)) || null;
  const relatedProducts = initialRelated || (products ? products.slice(0, 4) : []);

  if (!product) {
    return (
      <div className="bg-[#fffdf8] min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-2xl font-mono uppercase tracking-widest text-[#121212] mb-3">
          Object Not Found
        </h2>
        <p className="text-sm font-mono text-neutral-500 max-w-md mb-6">
          This object might have been archived or is newly created in the admin portal.
        </p>
        <Link
          href="/collections/all-products"
          className="bg-black text-white px-6 py-3 font-mono text-xs uppercase tracking-wider hover:bg-neutral-800"
        >
          Explore All Objects →
        </Link>
      </div>
    );
  }

  const formattedPrice = Number(product.price).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedComparePrice = product.compare_at_price
    ? Number(product.compare_at_price).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    window.location.href = "/checkout";
  };

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <div className="bg-[#fffdf8] min-h-screen">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-4 text-xs font-mono text-neutral-500 flex items-center gap-2 border-b border-[#e5e3dc]">
        <Link href="/" className="hover:text-black">Home</Link>
        <span>/</span>
        <Link href="/collections/all-products" className="hover:text-black">Objects</Link>
        <span>/</span>
        <span className="text-black font-semibold truncate">{product.title}</span>
      </div>

      {/* Main Product Layout: Gallery & Details */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-8 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
        
        {/* Left Column: Interactive Product Media Gallery */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Large Image Display */}
          <div className="w-full aspect-square bg-[#f7f5ef] border border-[#e5e3dc] overflow-hidden relative group">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
            {!product.available && (
              <span className="absolute top-4 left-4 z-10 bg-black text-white text-xs font-mono uppercase px-3 py-1 font-bold">
                Sold Out
              </span>
            )}
          </div>

          {/* Thumbnails Gallery */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 pt-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square border bg-[#f7f5ef] overflow-hidden transition-all ${
                    selectedImage === idx
                      ? "border-[#121212] ring-2 ring-black"
                      : "border-[#e5e3dc] opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information, Pricing, Actions, Accordions */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          
          <div className="space-y-6">
            <div>
              <span className="text-[11px] font-mono tracking-[0.2em] text-neutral-500 uppercase block mb-1.5">
                {product.product_type || "The Cozy Theory"} // Curated Living
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#121212] leading-[1.05]">
                {product.title}
              </h1>

              {/* Price Display */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-xl sm:text-2xl font-mono font-bold text-[#121212]">
                  Rs. {formattedPrice}
                </span>
                {formattedComparePrice && (
                  <span className="text-sm font-mono text-neutral-400 line-through">
                    Rs. {formattedComparePrice}
                  </span>
                )}
                <span className="text-[11px] font-mono text-neutral-500">
                  (Tax included. Free Express Shipping)
                </span>
              </div>
            </div>

            {/* Micro Highlights */}
            <div className="p-4 bg-[#f7f5ef] border border-[#e5e3dc] space-y-2 text-xs font-mono text-neutral-700">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Handcrafted & Curated by The Cozy Theory</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-neutral-700" />
                <span>Dispatches within 24-48 Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Authentic The Cozy Theory Collection</span>
              </div>
            </div>

            {/* Quantity Stepper & Buy Actions */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono uppercase text-neutral-600 font-semibold">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#e5e3dc] bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 hover:bg-neutral-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-12 text-center text-xs font-mono font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2 hover:bg-neutral-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Stacked Full-Width Buttons */}
              <div className="space-y-3 pt-2">
                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.available}
                  className={`w-full py-4 text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-md ${
                    added
                      ? "bg-emerald-600 text-white"
                      : product.available
                      ? "bg-[#121212] text-[#fffdf8] hover:bg-neutral-800"
                      : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>{product.available ? "Add to Cart" : "Sold Out"}</span>
                    </>
                  )}
                </button>

                {/* 1-Click Buy It Now (GoKwik style) */}
                {product.available && (
                  <button
                    onClick={handleBuyNow}
                    id="gokwik-buy-now"
                    className="w-full py-4 bg-[#004fff] text-white text-xs font-mono font-bold tracking-widest uppercase hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>⚡ Buy It Now (UPI / COD Express)</span>
                  </button>
                )}
              </div>
            </div>

            {/* Accordions (Details, Material & Dimensions, Care, Shipping) */}
            <div className="border-t border-[#e5e3dc] divide-y divide-[#e5e3dc] pt-2">
              
              {/* Details Accordion */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion("details")}
                  className="w-full flex items-center justify-between text-left text-xs font-mono font-bold uppercase tracking-wider text-[#121212]"
                >
                  <span>Object Details</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === "details" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "details" && (
                  <div className="mt-3 text-xs text-neutral-600 leading-relaxed font-normal space-y-2">
                    <p>
                      The Cozy Theory crafts artisanal objects, everyday ceramics, and pure linens to stay cozy, stay you. Designed with organic balances and tactile finishes to bring character to every room.
                    </p>
                    <p>
                      Each piece undergoes meticulous hand-crafting and quality inspection in our studio, ensuring every surface reflects warmth and elegance.
                    </p>
                  </div>
                )}
              </div>

              {/* Material & Dimensions Accordion */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion("dimensions")}
                  className="w-full flex items-center justify-between text-left text-xs font-mono font-bold uppercase tracking-wider text-[#121212]"
                >
                  <span>Material & Dimensions</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === "dimensions" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "dimensions" && (
                  <div className="mt-3 text-xs font-mono text-neutral-600 space-y-1.5">
                    <div><strong>Material:</strong> Artisanal Stoneware / Handcrafted Ceramic & Cotton</div>
                    <div><strong>Weight:</strong> Approx 450g - 1.5kg</div>
                    <div><strong>Origin:</strong> Handcrafted in India</div>
                  </div>
                )}
              </div>

              {/* Care & Maintenance */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion("care")}
                  className="w-full flex items-center justify-between text-left text-xs font-mono font-bold uppercase tracking-wider text-[#121212]"
                >
                  <span>Care & Maintenance</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === "care" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "care" && (
                  <div className="mt-3 text-xs text-neutral-600 leading-relaxed">
                    Wipe clean with a dry microfiber cloth. Avoid harsh chemical cleaners or abrasive scouring pads. Metal finishes will develop a distinguished natural patina over time.
                  </div>
                )}
              </div>

              {/* Shipping & Returns */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full flex items-center justify-between text-left text-xs font-mono font-bold uppercase tracking-wider text-[#121212]"
                >
                  <span>Shipping & Returns</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openAccordion === "shipping" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "shipping" && (
                  <div className="mt-3 text-xs text-neutral-600 leading-relaxed space-y-1">
                    <p>• Complimentary express domestic delivery across India on orders above Rs. 2,999.</p>
                    <p>• Dispatches within 2 business days via BlueDart / Delhivery.</p>
                    <p>• Hassle-free 7-day replacement policy for damaged in-transit goods.</p>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Social Share Suite: WhatsApp, Telegram, Facebook, Copy Link */}
          <div className="pt-4 border-t border-[#e5e3dc] space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
              Share Object With Friends & Collectors
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              {/* WhatsApp Share Button with Auto Message */}
              <button
                onClick={() => {
                  const url = window.location.href;
                  const text = `✨ *${product.title}* (₹${formattedPrice})\nDiscover handcrafted living objects by The Cozy Theory Studio:\n${url}`;
                  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366] hover:text-white rounded border border-[#25D366]/30 transition-colors font-medium"
                title="Share on WhatsApp with preview"
              >
                <span>WhatsApp</span>
              </button>

              {/* Telegram Share Button */}
              <button
                onClick={() => {
                  const url = window.location.href;
                  const text = `✨ ${product.title} (₹${formattedPrice}) — The Cozy Theory`;
                  window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, "_blank");
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0088cc]/10 text-[#0088cc] hover:bg-[#0088cc] hover:text-white rounded border border-[#0088cc]/30 transition-colors font-medium"
                title="Share on Telegram"
              >
                <span>Telegram</span>
              </button>

              {/* Facebook Share Button */}
              <button
                onClick={() => {
                  const url = window.location.href;
                  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1877f2]/10 text-[#1877f2] hover:bg-[#1877f2] hover:text-white rounded border border-[#1877f2]/30 transition-colors font-medium"
                title="Share on Facebook"
              >
                <span>Facebook</span>
              </button>

              {/* Copy Link */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copied! Paste anywhere on WhatsApp, Telegram, or Facebook for instant preview card.");
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded border border-neutral-300 transition-colors"
                title="Copy Link"
              >
                <Share2 className="w-3 h-3" />
                <span>Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like / Related Objects Grid */}
      <section className="border-t border-[#e5e3dc] py-16 bg-[#f7f5ef]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                More From The Studio
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-[#121212]">
                You May Also Like
              </h3>
            </div>
            <Link
              href="/collections/all-products"
              className="text-xs font-mono uppercase underline hover:text-neutral-500"
            >
              View All Objects →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

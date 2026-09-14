"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#121212] text-[#fffdf8] pt-16 md:pt-24 pb-12 border-t border-neutral-800">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-16">
        
        {/* Top Section: Studio Mission & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Brand Philosophy */}
          <div className="lg:col-span-6 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="font-extrabold tracking-[-0.04em] text-2xl sm:text-3xl uppercase font-sans">
                THE COZY THEORY
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#004fff] inline-block -mt-3"></span>
            </Link>
            <p className="text-xs md:text-sm text-neutral-400 leading-relaxed max-w-xl font-normal">
              The Cozy Theory is an artisanal design and homeware studio crafting objects that transform your living space into a sanctuary of warmth, texture, and individual expression. We believe in everyday rituals elevated by honest materials.
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[11px] font-mono tracking-[0.2em] text-blue-400 uppercase block">
              Join The Cozy Theory Collector List
            </span>
            <p className="text-xs text-neutral-300">
              Be first to gain access to limited seasonal drops, archival ceramics, and private studio discounts.
            </p>

            <form onSubmit={handleSubscribe} className="flex max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-neutral-900 border border-neutral-700 text-white px-4 py-3 text-xs font-mono placeholder:text-neutral-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#004fff] text-white hover:bg-blue-600 transition-colors flex items-center justify-center"
                aria-label="Subscribe to newsletter"
              >
                {subscribed ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] font-mono text-emerald-400">
                ✓ You have been subscribed to The Cozy Theory private list.
              </p>
            )}
          </div>
        </div>

        {/* Middle Section: Navigation & Policies */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-neutral-800 text-xs font-mono">
          <div className="space-y-3">
            <div className="text-neutral-500 uppercase tracking-widest text-[10px]">
              Homeware
            </div>
            <ul className="space-y-2 text-neutral-300">
              <li><Link href="/collections/all-products" className="hover:text-white transition-colors">All Objects</Link></li>
              <li><Link href="/collections/everyday-ceramics" className="hover:text-white transition-colors">Everyday Ceramics</Link></li>
              <li><Link href="/collections/tableware" className="hover:text-white transition-colors">Tableware & Dining</Link></li>
              <li><Link href="/collections/serveware" className="hover:text-white transition-colors">Serveware Platters</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-neutral-500 uppercase tracking-widest text-[10px]">
              Decor & Linen
            </div>
            <ul className="space-y-2 text-neutral-300">
              <li><Link href="/collections/home-linen" className="hover:text-white transition-colors">Pure Cotton Linen</Link></li>
              <li><Link href="/collections/vases-planters" className="hover:text-white transition-colors">Vases & Planters</Link></li>
              <li><Link href="/collections/candles-holders" className="hover:text-white transition-colors">Candles & Holders</Link></li>
              <li><Link href="/collections/merry-bright" className="hover:text-white transition-colors">Merry & Bright Festive</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-neutral-500 uppercase tracking-widest text-[10px]">
              Studio
            </div>
            <ul className="space-y-2 text-neutral-300">
              <li><Link href="/pages/about-us" className="hover:text-white transition-colors">About The Cozy Theory</Link></li>
              <li><Link href="/blogs/news" className="hover:text-white transition-colors">Studio Journal</Link></li>
              <li><Link href="/pages/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/pages/faq" className="hover:text-white transition-colors">FAQs & Care Guides</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-neutral-500 uppercase tracking-widest text-[10px]">
              Policies
            </div>
            <ul className="space-y-2 text-neutral-300">
              <li><Link href="/pages/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="/pages/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/pages/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/pages/pricing-policy" className="hover:text-white transition-colors">Pricing & GST</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] font-mono text-neutral-500 gap-4">
          <div>
            © {new Date().getFullYear()} THE COZY THEORY. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>IN / INR (₹)</span>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              INSTAGRAM
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              PINTEREST
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

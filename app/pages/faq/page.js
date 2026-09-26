"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQPage() {
  const [openSection, setOpenSection] = useState(0);

  const faqs = [
    {
      q: "What is The Cozy Theory design philosophy?",
      a: "The Cozy Theory crafts everyday ceramics, artisanal tabletop objects, and pure cotton home linen. Our pieces celebrate tactile materiality, warm tones, and honest craftsmanship to bring comfort and presence into modern living spaces.",
    },
    {
      q: "How long does shipping take within India?",
      a: "All domestic orders across India are dispatched within 24–48 business hours via express courier partners (BlueDart / Delhivery). Standard transit takes 2–4 business days for metro areas.",
    },
    {
      q: "Are shipping costs included?",
      a: "Orders above Rs. 9,999 qualify for complimentary express delivery across India. For orders below Rs. 9,999, a flat shipping fee of Rs. 99 applies at checkout. Plus, enjoy Rs. 500 off on orders above Rs. 5,999.",
    },
    {
      q: "How should I care for handcrafted ceramics and pottery?",
      a: "Our glazed stoneware and ceramics are food-safe. To preserve fine hand-painted glazes, gentle hand washing with mild dish soap and a soft sponge is recommended.",
    },
    {
      q: "What is the return and replacement policy?",
      a: "We provide a 50% refund if any object arrives damaged in transit. Simply email photo proof of the package to hello@thecozytheory.com to receive your immediate refund.",
    },
    {
      q: "How do I care for pure cotton bedsheets and linen?",
      a: "Machine wash on a gentle cycle in cold water using mild detergent. Tumble dry on low or line dry in the shade to preserve natural fiber softness and color longevity.",
    },
    {
      q: "What payment methods are supported at checkout?",
      a: "We currently support Cash on Delivery (COD) across all serviceable pin codes in India. Pay with complete peace of mind when the package arrives at your doorstep.",
    },
  ];

  return (
    <div className="bg-[#fffdf8] min-h-screen py-12 md:py-20">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 pb-8 border-b border-[#e5e3dc]">
          <span className="text-[10px] md:text-xs font-mono tracking-[0.25em] uppercase text-blue-600 block">
            Help &amp; Knowledge Base
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#121212]">
            Frequently Asked Questions
          </h1>
          <p className="text-xs md:text-sm font-mono text-neutral-600 max-w-lg mx-auto">
            Everything you need to know about The Cozy Theory homeware, ceramic care, shipping, and ordering.
          </p>
        </div>

        {/* Accordions */}
        <div className="divide-y divide-[#e5e3dc] border-t border-b border-[#e5e3dc]">
          {faqs.map((item, idx) => (
            <div key={idx} className="py-5">
              <button
                onClick={() => setOpenSection(openSection === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left text-sm md:text-base font-bold uppercase tracking-tight text-[#121212]"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-500 transition-transform duration-200 flex-shrink-0 ml-4 ${
                    openSection === idx ? "rotate-180 text-black" : ""
                  }`}
                />
              </button>
              {openSection === idx && (
                <div className="mt-3 text-xs md:text-sm text-neutral-600 leading-relaxed font-normal pr-6">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="p-8 bg-[#f7f5ef] border border-[#e5e3dc] text-center space-y-3">
          <h3 className="text-lg font-bold uppercase tracking-tight">
            Have another question about our pieces?
          </h3>
          <p className="text-xs font-mono text-neutral-500">
            Our customer care team is available to assist you with styling and orders.
          </p>
          <a
            href="mailto:hello@thecozytheory.com"
            className="inline-block px-6 py-3 bg-[#001540] text-white text-xs font-mono uppercase tracking-widest hover:bg-[#002266] transition-colors"
          >
            Email The Cozy Theory Team →
          </a>
        </div>

      </div>
    </div>
  );
}

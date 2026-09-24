"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Check } from "lucide-react";
import { submitContactInquiry } from "@/lib/supabase";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    await submitContactInquiry(formData);
  };

  return (
    <div className="bg-[#fffdf8] min-h-screen py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="space-y-3 pb-8 border-b border-[#e5e3dc] mb-12">
          <span className="text-[10px] md:text-xs font-mono tracking-[0.25em] uppercase text-blue-600 block">
            Studio Inquiries // The Cozy Theory
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#121212]">
            HELLO@THECOZYTHEORY.COM
          </h1>
          <p className="text-xs md:text-sm font-mono text-neutral-600 max-w-xl">
            Have questions about an artisanal piece, home styling advice, custom gifting orders, or order status? Reach out directly to our studio team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                The Cozy Theory Studio
              </div>
              <div className="flex items-start gap-3 text-sm text-neutral-800">
                <MapPin className="w-5 h-5 text-neutral-600 mt-0.5 flex-shrink-0" />
                <span>
                  The Cozy Theory Design Studio<br />
                  Lower Parel Industrial Area<br />
                  Mumbai, Maharashtra 400013, India
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                Direct Contact
              </div>
              <div className="space-y-2 text-sm text-neutral-800 font-mono">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-neutral-600" />
                  <a href="mailto:hello@thecozytheory.com" className="hover:underline">
                    hello@thecozytheory.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-neutral-600" />
                  <span>+91 (022) 4920-COZY</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#f7f5ef] border border-[#e5e3dc] space-y-2">
              <span className="text-xs font-mono font-bold uppercase">Response Guarantee:</span>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Our studio team replies to all inquiries within 24 business hours (Monday through Friday, 10:00 AM – 6:00 PM IST).
              </p>
            </div>
          </div>

          {/* Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-[#f7f5ef] border border-[#e5e3dc] p-6 sm:p-10">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold uppercase tracking-tight">
                  Message Transmitted
                </h3>
                <p className="text-xs font-mono text-neutral-600 max-w-sm mx-auto">
                  Thank you for connecting with The Cozy Theory. We have received your inquiry and our crew will respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-mono uppercase text-neutral-600 block mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-[#e5e3dc] p-3 text-xs font-mono focus:outline-none focus:border-black"
                    placeholder="E.g. Shreya Verma"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-neutral-600 block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-[#e5e3dc] p-3 text-xs font-mono focus:outline-none focus:border-black"
                    placeholder="name@example.com"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-neutral-600 block mb-1.5">
                    Subject / Order Reference
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white border border-[#e5e3dc] p-3 text-xs font-mono focus:outline-none focus:border-black"
                    placeholder="Order inquiry, Home styling, Bulk gifting"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-neutral-600 block mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-[#e5e3dc] p-3 text-xs font-mono focus:outline-none focus:border-black"
                    placeholder="Tell us about your home space or questions..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#004fff] text-white text-xs font-mono font-bold tracking-widest uppercase hover:bg-blue-600 transition-colors shadow-md"
                >
                  Send Inquiry →
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

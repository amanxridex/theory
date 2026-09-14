"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroSlider({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[#121212] select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform duration-700 ease-out h-[68vh] min-h-[480px] md:h-[82vh] max-h-[820px]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className="w-full flex-shrink-0 h-full relative flex items-end justify-start"
          >
            {/* Responsive Background Images: Mobile vs Desktop */}
            <picture className="absolute inset-0 w-full h-full">
              <source media="(min-width: 768px)" srcSet={slide.desktopImage} />
              <img
                src={slide.mobileImage}
                alt={slide.title}
                className="w-full h-full object-cover object-center brightness-[0.9]"
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </picture>

            {/* Gradient Overlays for optimal editorial readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Slide Content */}
            <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 pb-14 md:pb-20 text-[#fffdf8]">
              <div className="max-w-2xl space-y-3 md:space-y-4">
                <span className="inline-block text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase px-2.5 py-1 bg-white/15 backdrop-blur-md rounded-full border border-white/20">
                  {slide.subtitle}
                </span>

                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight leading-[1.05]">
                  {slide.title}
                </h1>

                <p className="text-xs md:text-sm text-neutral-300 font-normal tracking-wide max-w-lg hidden sm:block">
                  {slide.description}
                </p>

                {/* Call-to-action buttons */}
                <div className="pt-2 flex items-center gap-3">
                  <a
                    href="#catalog"
                    className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-3.5 bg-[#fffdf8] text-[#121212] text-xs font-mono font-bold tracking-widest uppercase hover:bg-neutral-200 transition-colors shadow-lg"
                  >
                    {slide.ctaText}
                  </a>
                  <a
                    href="#catalog"
                    className="inline-flex items-center justify-center px-5 py-3 md:px-6 md:py-3.5 border border-white/40 text-[#fffdf8] text-xs font-mono tracking-widest uppercase hover:bg-white/10 transition-colors"
                  >
                    {slide.secondaryCta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Navigation Controls */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md transition-all"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 items-center justify-center rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md transition-all"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Pagination Dots / Indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`transition-all duration-300 rounded-full ${
              currentIndex === i ? "w-8 h-1.5 bg-[#fffdf8]" : "w-1.5 h-1.5 bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

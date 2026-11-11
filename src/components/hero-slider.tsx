"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=2000&auto=format&fit=crop",
    subTitle: "FW26 COLLECTION",
    title: "SPORTCATION",
    tagline: "THE CHILLER. THE CHEERIER",
    cta: "KHÁM PHÁ NGAY",
    link: "#bst-moi",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop",
    subTitle: "TECHURBAN JEANS 2026",
    title: "FREEDOM OF MOVEMENT",
    tagline: "SIÊU CO GIÃN • SIÊU MÁT • SIÊU NHẸ",
    cta: "MUA NGAY",
    link: "#jeans",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const slide = SLIDES[currentSlide];

  return (
    <section className="relative w-full aspect-[2500/991] min-h-[360px] sm:min-h-[440px] md:min-h-0 overflow-hidden bg-zinc-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transition-all duration-700"
        />
        {/* Soft gradient overlay matching tennis court vibe */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
      </div>

      {/* Hero Typography & Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <span className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.3em] uppercase drop-shadow-md">
          {slide.subTitle}
        </span>
        <h1 className="mt-1 sm:mt-2 text-2xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight drop-shadow-lg leading-none">
          {slide.title}
        </h1>
        <p className="mt-1.5 sm:mt-3 text-[11px] sm:text-sm md:text-base font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase text-zinc-200 drop-shadow-sm">
          {slide.tagline}
        </p>
        <a
          href={slide.link}
          className="mt-4 sm:mt-6 inline-block rounded-xs bg-white px-5 sm:px-8 py-2 sm:py-3 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-950 transition-all hover:bg-[#0b2b68] hover:text-white shadow-xl"
        >
          {slide.cta}
        </a>
      </div>

      {/* Left / Right Arrow Controls */}
      <button
        onClick={prevSlide}
        aria-label="Slide trước"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/40 p-2 text-white backdrop-blur-xs transition-colors hover:bg-white hover:text-black"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Slide sau"
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/40 p-2 text-white backdrop-blur-xs transition-colors hover:bg-white hover:text-black"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicators Dots */}
      <div className="absolute bottom-5 inset-x-0 z-20 flex justify-center gap-2">
        {SLIDES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 transition-all rounded-full ${
              currentSlide === idx ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}


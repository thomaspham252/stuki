"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ProductCard from "@/components/product-card";
import { FLASH_SALE_PRODUCTS } from "@/data/mock-data";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";

export default function DoubleDealSection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 42,
    seconds: 35,
  });

  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const nextSlide = () => {
    setCarouselIndex((prev) => Math.min(FLASH_SALE_PRODUCTS.length - 5, prev + 1));
  };

  return (
    <section id="double-deal" className="w-full py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Light Blue Container */}
        <div className="overflow-hidden rounded-2xl bg-[#e3effa] p-4 sm:p-6 lg:p-8 border border-sky-100 shadow-sm">
          {/* Top Banner Row */}
          <div className="relative mb-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left: Model Image */}
            <div className="md:col-span-4 flex justify-center md:justify-start">
              <div className="relative h-64 sm:h-72 w-52 sm:w-60 overflow-hidden rounded-xl shadow-md border-2 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop"
                  alt="Model 11.11"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Center: Title & Slogan */}
            <div className="md:col-span-4 text-center md:text-left">
              <span className="text-sm font-black italic tracking-widest text-[#0b2b68] uppercase">
                DOUBLE DEAL
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0b2b68] tracking-tight">
                11.11
              </h2>
              <div className="mt-1 inline-block rounded-xs bg-[#0b2b68] px-3 py-1 text-xs font-black uppercase tracking-wider text-white">
                SALE UP TO
              </div>
              <div className="text-5xl sm:text-6xl font-black text-[#0b2b68] tracking-tighter">
                50<span className="text-3xl">%</span>
              </div>
            </div>

            {/* Right: Promotional Vouchers & Countdown */}
            <div className="md:col-span-4 flex flex-col gap-3">
              {/* 2 Voucher Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-white p-3 text-center shadow-xs border border-sky-200">
                  <span className="block text-[11px] font-medium text-zinc-600">
                    Toàn bộ sản phẩm
                  </span>
                  <span className="text-lg font-black text-[#0b2b68]">-11%</span>
                  <span className="block text-[10px] text-zinc-500">Tối đa 30K</span>
                </div>

                <div className="rounded-lg bg-white p-3 text-center shadow-xs border border-sky-200">
                  <span className="block text-[11px] font-medium text-zinc-600">
                    Voucher giảm đến
                  </span>
                  <span className="text-lg font-black text-[#0b2b68]">211K</span>
                  <span className="block text-[10px] text-zinc-500">Đơn từ 999K</span>
                </div>
              </div>

              {/* Flash Voucher Pill & Timer */}
              <div className="flex items-center justify-between rounded-lg bg-[#0b2b68] p-3 text-white shadow-md">
                <div className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wide">
                    Flash Voucher 111K
                  </span>
                </div>

                {/* Countdown Timer */}
                <div className="flex items-center gap-1 text-xs font-bold font-mono">
                  <span className="rounded-xs bg-white px-1.5 py-0.5 text-[#0b2b68]">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </span>
                  <span>:</span>
                  <span className="rounded-xs bg-white px-1.5 py-0.5 text-[#0b2b68]">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </span>
                  <span>:</span>
                  <span className="rounded-xs bg-white px-1.5 py-0.5 text-[#0b2b68]">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </span>
                </div>
              </div>

              {/* Promo Date */}
              <div className="text-right text-xs font-bold text-[#0b2b68]">
                ⏰ Áp dụng: 10.11 - 12.11
              </div>
            </div>
          </div>

          {/* Carousel Products Row */}
          <div className="relative">
            {/* Arrows */}
            <button
              onClick={prevSlide}
              aria-label="Previous"
              disabled={carouselIndex === 0}
              className="absolute -left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-2 text-zinc-800 shadow-md transition-all hover:bg-[#0b2b68] hover:text-white disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next"
              disabled={carouselIndex >= FLASH_SALE_PRODUCTS.length - 5}
              className="absolute -right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-2 text-zinc-800 shadow-md transition-all hover:bg-[#0b2b68] hover:text-white disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Product Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {FLASH_SALE_PRODUCTS.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Bottom Centered "Xem tất cả" Button */}
          <div className="mt-8 flex justify-center">
            <button className="rounded-xs border border-[#0b2b68] bg-transparent px-8 py-2 text-xs font-bold uppercase tracking-widest text-[#0b2b68] transition-colors hover:bg-[#0b2b68] hover:text-white">
              Xem tất cả
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


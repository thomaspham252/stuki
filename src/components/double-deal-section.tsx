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
    <section id="double-deal" className="w-full py-8 bg-[#e9f2fb]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* PHẦN TRÊN: ẢNH BANNER DOUBLE DEAL 11.11 (Banner đồ họa ngang) */}
        <div className="relative mb-6 w-full overflow-hidden rounded-xl bg-gradient-to-r from-[#d3e8f8] via-[#e2f0fb] to-[#c7e2f7] border border-sky-200/80 shadow-xs">
          <div className="relative aspect-[1200/360] sm:aspect-[1200/300] md:aspect-[1200/260] w-full flex items-center justify-between px-4 sm:px-10 lg:px-14">
            {/* Model & Graphic Left */}
            <div className="relative z-10 flex items-center gap-4 sm:gap-8 h-full py-2">
              <div className="relative h-full w-28 sm:w-44 md:w-56 shrink-0 overflow-hidden rounded-lg shadow-sm border border-white/60">
                <Image
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop"
                  alt="Model Double Deal 11.11"
                  fill
                  className="object-cover object-top"
                />
              </div>

              {/* Title & Slogan */}
              <div className="text-left">
                <span className="block text-xs sm:text-sm font-black italic tracking-widest text-[#0b2b68] uppercase">
                  DOUBLE DEAL
                </span>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0b2b68] tracking-tight leading-none">
                  11.11
                </h2>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="rounded-xs bg-[#0b2b68] px-2 py-0.5 text-[10px] sm:text-xs font-black uppercase text-white">
                    SALE UP TO
                  </span>
                  <span className="text-3xl sm:text-5xl font-black text-[#0b2b68]">
                    50%
                  </span>
                </div>
              </div>
            </div>

            {/* Vouchers & Countdown Right */}
            <div className="relative z-10 flex flex-col gap-2.5 sm:gap-3 max-w-xs sm:max-w-md w-full justify-center">
              {/* 2 Vouchers */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="rounded-md bg-white/90 backdrop-blur-xs p-2 text-center shadow-xs border border-sky-300">
                  <span className="block text-[10px] font-semibold text-zinc-600 truncate">
                    Toàn bộ sản phẩm
                  </span>
                  <span className="text-sm sm:text-lg font-black text-[#0b2b68] leading-tight">
                    -11% <span className="text-[10px] font-medium text-zinc-500">tối đa 30K</span>
                  </span>
                </div>

                <div className="rounded-md bg-white/90 backdrop-blur-xs p-2 text-center shadow-xs border border-sky-300">
                  <span className="block text-[10px] font-semibold text-zinc-600 truncate">
                    Voucher giảm đến
                  </span>
                  <span className="text-sm sm:text-lg font-black text-[#0b2b68] leading-tight">
                    211K
                  </span>
                </div>
              </div>

              {/* Flash Voucher Pill & Timer */}
              <div className="flex items-center justify-between rounded-md bg-[#0b2b68] px-3 py-2 text-white shadow-sm">
                <div className="flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                    Flash voucher 111K
                  </span>
                </div>

                {/* Live Countdown */}
                <div className="flex items-center gap-1 text-[11px] sm:text-xs font-bold font-mono">
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

              <div className="text-right text-[11px] font-bold text-[#0b2b68]">
                ⏰ Áp dụng: 10.11 - 12.11
              </div>
            </div>
          </div>
        </div>

        {/* PHẦN DƯỚI: LƯỚI SẢN PHẨM CAROUSEL 6 SẢN PHẨM */}
        <div className="relative">
          {/* Mũi tên điều hướng Carousel */}
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

          {/* Lưới 6 cột sản phẩm */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {FLASH_SALE_PRODUCTS.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Nút "Xem tất cả" căn giữa bên dưới */}
        <div className="mt-8 flex justify-center">
          <button className="rounded-xs border border-[#0b2b68] bg-transparent px-8 py-2 text-xs font-bold uppercase tracking-widest text-[#0b2b68] transition-colors hover:bg-[#0b2b68] hover:text-white">
            Xem tất cả
          </button>
        </div>
      </div>
    </section>
  );
}

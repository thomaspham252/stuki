"use client";

import React, { useState } from "react";
import Image from "next/image";
import ProductCard from "@/components/product-card";
import { FLASH_SALE_PRODUCTS } from "@/data/mock-data";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DoubleDealSection() {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const prevSlide = () => {
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const nextSlide = () => {
    setCarouselIndex((prev) => Math.min(FLASH_SALE_PRODUCTS.length - 5, prev + 1));
  };

  return (
    <section id="double-deal" className="w-full py-6 sm:py-8 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 1. KHU VỰC KHOANH ĐỎ: 1 ẢNH BANNER DUY NHẤT (DO NGƯỜI DÙNG UP LÊN) */}
        <div className="mb-6 w-full overflow-hidden rounded-2xl shadow-xs transition-transform hover:opacity-98">
          <a href="#double-deal" className="block relative w-full aspect-[1200/260]">
            <Image
              src="/images/double-deal-banner.svg"
              alt="Double Deal 11.11 Banner - Sale Up To 50%"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-contain sm:object-cover object-center w-full h-full"
            />
          </a>
        </div>

        {/* 2. Ở DƯỚI: LƯỚI SẢN PHẨM (CAROUSEL 6 SẢN PHẨM) */}
        <div className="relative">
          {/* Mũi tên điều hướng Carousel Trái */}
          <button
            onClick={prevSlide}
            aria-label="Previous"
            disabled={carouselIndex === 0}
            className="absolute -left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white p-2 text-zinc-800 shadow-md transition-all hover:bg-[#0b2b68] hover:text-white disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Mũi tên điều hướng Carousel Phải */}
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

"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import ProductCard from "@/components/product-card";
import { FLASH_SALE_PRODUCTS } from "@/data/mock-data";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DoubleDealSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Cập nhật trạng thái hiển thị của nút <> theo vị trí trượt thực tế
  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 6);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6);
    }
  };

  useEffect(() => {
    updateScrollButtons();
    window.addEventListener("resize", updateScrollButtons);
    return () => window.removeEventListener("resize", updateScrollButtons);
  }, []);

  // Trượt sang trái mượt mà (smooth slide)
  const handlePrev = () => {
    if (carouselRef.current) {
      const amount = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({ left: -amount, behavior: "smooth" });
    }
  };

  // Trượt sang phải mượt mà (smooth slide)
  const handleNext = () => {
    if (carouselRef.current) {
      const amount = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section id="double-deal" className="w-full py-6 sm:py-8 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner Double Deal 11.11 - Chiều cao to gấp rưỡi dãy thẻ sản phẩm bên dưới (~660px vs ~442px) */}
        <div className="mb-6 sm:mb-8 w-full overflow-hidden rounded-2xl shadow-sm transition-transform hover:opacity-98">
          <a href="#double-deal" className="block relative w-full aspect-[1200/660]">
            <Image
              src="/images/double-deal-banner.svg"
              alt="Double Deal 11.11 Banner - Sale Up To 50%"
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center w-full h-full"
              unoptimized
            />
          </a>
        </div>

        {/* Khu vực Carousel sản phẩm có hiệu ứng trượt ngang mượt mà (Smooth Slide) */}
        <div className="relative">
          {/* Nút điều hướng Carousel Trái */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Sản phẩm trước"
            disabled={!canScrollLeft}
            className="absolute -left-2.5 sm:-left-4 md:-left-5 top-1/2 z-30 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white text-zinc-800 shadow-lg border border-zinc-100 hover:bg-[#0B4DBB] hover:text-white transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
          </button>

          {/* Nút điều hướng Carousel Phải */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Sản phẩm tiếp theo"
            disabled={!canScrollRight}
            className="absolute -right-2.5 sm:-right-4 md:-right-5 top-1/2 z-30 -translate-y-1/2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white text-zinc-800 shadow-lg border border-zinc-100 hover:bg-[#0B4DBB] hover:text-white transition-all disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 stroke-[2.5]" />
          </button>

          {/* Dải sản phẩm trượt ngang (Slide animation):
              - Trên điện thoại (Mobile): Hiện đúng 2 sản phẩm trên 1 khung nhìn (w-[calc(50%-6px)])
              - Trên máy tính bảng (Tablet): Hiện 3 sản phẩm (sm:w-[calc((100%-32px)/3)])
              - Trên máy tính (Desktop): Hiện 5 sản phẩm (lg:w-[calc((100%-64px)/5)])
              - Có hiệu ứng trượt lướt mượt mà, không bị giật/reload, hỗ trợ cả vuốt ngón tay trên điện thoại
          */}
          <div
            ref={carouselRef}
            onScroll={updateScrollButtons}
            className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {FLASH_SALE_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="shrink-0 snap-start w-[calc(50%-6px)] sm:w-[calc((100%-32px)/3)] lg:w-[calc((100%-64px)/5)]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Nút "Xem tất cả" căn giữa bên dưới */}
        <div className="mt-8 flex justify-center">
          <button className="rounded-[3px] border border-[#0b2b68] bg-transparent px-8 py-2 text-xs font-bold uppercase tracking-widest text-[#0b2b68] transition-colors hover:bg-[#0b2b68] hover:text-white cursor-pointer">
            Xem tất cả
          </button>
        </div>
      </div>
    </section>
  );
}

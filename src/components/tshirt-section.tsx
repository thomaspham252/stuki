"use client";

import React, { useState } from "react";
import Image from "next/image";
import ProductCard from "@/components/product-card";
import { TSHIRT_PRODUCTS } from "@/data/mock-data";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const TSHIRT_TABS = ["Áo Thun", "Áo Sơmi", "Áo Polo"];

export default function TshirtSection() {
  const [activeTab, setActiveTab] = useState("Áo Thun");

  return (
    <section id="ao-thun" className="w-full py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Tabs */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-950">
              ÁO THUN NAM
            </h2>
            <p className="text-xs text-zinc-500 font-medium">
              Chất liệu Cotton 100% thoáng mát, form dáng thời thượng
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
            {TSHIRT_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-2 transition-colors ${activeTab === tab
                  ? "text-[#0b2b68] font-black after:absolute after:bottom-0 after:inset-x-0 after:h-0.5 after:bg-[#0b2b68]"
                  : "text-zinc-500 hover:text-black"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Layout: Left Banner + Right Products */}
        <div className="relative">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {/* Left Vertical Banner: Cùng chiều cao và bo góc [20px] chuẩn bằng thẻ sản phẩm */}
            <div className="relative h-full min-h-[400px] w-full overflow-hidden rounded-[20px] bg-zinc-900 group shadow-sm flex flex-col justify-end">
              <Image
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&h=1000&auto=format&fit=crop"
                alt="Áo Thun"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">
                  ESSENTIALS
                </span>
                <h3 className="mt-1 text-xl font-black uppercase tracking-tight leading-tight">
                  ÁO THUN
                </h3>
                <a
                  href="#ao-thun"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-white hover:text-amber-300 transition-colors"
                >
                  XEM NGAY
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* 4 Products next to it */}
            {TSHIRT_PRODUCTS.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Bottom "Xem tất cả" Button */}
        <div className="mt-8 flex justify-center">
          <button className="rounded-[3px] border border-[#0b2b68] bg-transparent px-8 py-2 text-xs font-bold uppercase tracking-widest text-[#0b2b68] transition-colors hover:bg-[#0b2b68] hover:text-white cursor-pointer">
            Xem tất cả
          </button>
        </div>
      </div>
    </section>
  );
}


"use client";

import React, { useState } from "react";
import Image from "next/image";
import ProductCard from "@/components/product-card";
import { JEANS_PRODUCTS } from "@/data/mock-data";

const JEANS_TABS = [
  "Tất cả Jeans",
  "Siêu mát",
  "Siêu nhẹ",
  "Siêu co dãn",
];

export default function JeansSection() {
  const [activeTab, setActiveTab] = useState("Tất cả Jeans");

  return (
    <section id="jeans" className="w-full py-10 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner with 2 models */}
        <div className="relative mb-8 h-48 sm:h-64 lg:h-72 w-full overflow-hidden rounded-xl bg-gradient-to-r from-sky-50 via-white to-sky-100 flex items-center justify-between px-6 sm:px-12 border border-zinc-100 shadow-2xs">
          {/* Typography */}
          <div className="z-10 max-w-md">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#0b2b68]">
              ICONIC COLLECTION
            </span>
            <h2 className="mt-1 text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#0b2b68]">
              TÌM JEANS <br />
              <span className="text-black">ĐẾN ICONDENIM</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-600 font-medium">
              Thiết kế tôn dáng chuẩn người Việt • Công nghệ TechUrban siêu co giãn
            </p>
          </div>

          {/* 2 Models Photo */}
          <div className="relative h-full w-1/2 max-w-md hidden sm:block">
            <Image
              src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop"
              alt="Jeans models"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* Tab Row (Tất cả Jeans | Siêu mát | Siêu nhẹ | Siêu co dãn) */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          {JEANS_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? "bg-[#0b2b68] text-white shadow-sm"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 5-Column Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {JEANS_PRODUCTS.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
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


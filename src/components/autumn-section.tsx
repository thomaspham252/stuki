"use client";

import React, { useState } from "react";
import Image from "next/image";
import ProductCard from "@/components/product-card";
import { AUTUMN_PRODUCTS } from "@/data/mock-data";
import { ArrowRight } from "lucide-react";

const AUTUMN_TABS = ["Đồ Thu", "Hàng bán chạy", "Hàng mới"];

export default function AutumnSection() {
  const [activeTab, setActiveTab] = useState("Đồ Thu");

  return (
    <section id="do-thu" className="w-full py-12 bg-zinc-50 border-t border-zinc-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Tabs */}
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-950 font-serif">
              BỘ SƯU TẬP ĐỒ THU ĐÔNG
            </h2>
            <p className="text-xs text-zinc-500 font-medium">
              Chất liệu giữ ấm nhẹ nhàng, thanh lịch chuẩn phong cách smart casual
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
            {AUTUMN_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative pb-2 transition-colors ${
                  activeTab === tab
                    ? "text-[#0b2b68] font-black after:absolute after:bottom-0 after:inset-x-0 after:h-0.5 after:bg-[#0b2b68]"
                    : "text-zinc-500 hover:text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Layout: Row 1 (Banner + 4 products), Row 2 (5 products) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Row 1, Col 1: Vertical Banner "ĐỒ THU ĐÔNG - XEM NGAY" */}
          <div className="relative aspect-3/4 w-full overflow-hidden rounded-xs bg-zinc-900 group shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=800&auto=format&fit=crop"
              alt="Đồ Thu Đông"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-5 text-white">
              <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">
                COLLECTION 2026
              </span>
              <h3 className="mt-1 text-xl font-black uppercase tracking-tight font-serif leading-tight">
                ĐỒ THU ĐÔNG
              </h3>
              <a
                href="#do-thu"
                className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-white hover:text-amber-300 transition-colors"
              >
                XEM NGAY
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Row 1: 4 Products */}
          {AUTUMN_PRODUCTS.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {/* Row 2: 5 Products */}
          {AUTUMN_PRODUCTS.slice(4, 9).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom "Xem tất cả" Button */}
        <div className="mt-8 flex justify-center">
          <button className="rounded-xs border border-[#0b2b68] bg-transparent px-8 py-2 text-xs font-bold uppercase tracking-widest text-[#0b2b68] transition-colors hover:bg-[#0b2b68] hover:text-white">
            Xem tất cả
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { useCartStore } from "@/stores/use-cart-store";

const LOOKS = [
  {
    id: 1,
    title: "Look 01: Varsity Jacket & Short",
    price: 890000,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    items: "Áo Khoác Varsity + Quần Short ProCOOL",
  },
  {
    id: 2,
    title: "Look 02: Polo Dệt Kim & Quần Kaki",
    price: 760000,
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800&auto=format&fit=crop",
    items: "Áo Polo Knitwear + Quần Kaki Slimfit",
  },
  {
    id: 3,
    title: "Look 03: Hoodie Zip & Quần Jogger",
    price: 920000,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop",
    items: "Hoodie Zip 380 GSM + Quần Jogger Nỉ",
  },
  {
    id: 4,
    title: "Look 04: Sweater Cổ Lọ & Quần Tây",
    price: 990000,
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
    items: "Sweater Len + Quần Tây Ống Rộng Xếp Ly",
  },
];

export default function MixMatchSection() {
  const [activeModal, setActiveModal] = useState<number | null>(null);
  const { addItem, openCart } = useCartStore();

  const handleAddLook = (look: (typeof LOOKS)[0]) => {
    addItem({
      id: `look-${look.id}`,
      name: look.title,
      price: look.price,
      size: "L",
      color: "Màu chuẩn mẫu",
      image: look.image,
      quantity: 1,
    });
    setActiveModal(null);
    openCart();
  };

  return (
    <section id="mix-match" className="w-full py-16 bg-zinc-50 border-t border-zinc-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0b2b68]">
            STYLE INSPIRATION
          </span>
          <h2 className="mt-1 text-3xl font-black uppercase tracking-tight text-zinc-950 font-serif">
            COMBO MIX & MATCH
          </h2>
          <div className="mt-2 mx-auto h-0.5 w-12 bg-[#0b2b68]" />
        </div>

        {/* 4 Vertical Photos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {LOOKS.map((look) => (
            <div
              key={look.id}
              className="group relative aspect-9/16 w-full overflow-hidden rounded-xs bg-zinc-900 shadow-sm"
            >
              <Image
                src={look.image}
                alt={look.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* Bottom text */}
              <div className="absolute bottom-4 left-4 right-14 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300">
                  {look.title}
                </span>
                <p className="text-xs font-bold mt-0.5">
                  {new Intl.NumberFormat("vi-VN").format(look.price)}đ
                </p>
              </div>

              {/* Circular "+" Hotspot Button */}
              <button
                onClick={() => setActiveModal(look.id)}
                aria-label="Xem chi tiết set đồ"
                className="absolute bottom-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white text-zinc-900 shadow-lg transition-transform hover:scale-110 hover:bg-[#0b2b68] hover:text-white"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Bottom "Xem tất cả" Button */}
        <div className="mt-8 flex justify-center">
          <button className="rounded-xs border border-[#0b2b68] bg-transparent px-8 py-2 text-xs font-bold uppercase tracking-widest text-[#0b2b68] transition-colors hover:bg-[#0b2b68] hover:text-white">
            Xem tất cả
          </button>
        </div>
      </div>

      {/* Hotspot Modal */}
      {activeModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-2xl">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-3 right-3 text-zinc-400 hover:text-black"
            >
              <X className="h-5 w-5" />
            </button>
            {(() => {
              const selected = LOOKS.find((l) => l.id === activeModal);
              if (!selected) return null;
              return (
                <div>
                  <h3 className="text-sm font-bold uppercase text-zinc-900">{selected.title}</h3>
                  <p className="mt-1 text-xs text-zinc-500">{selected.items}</p>
                  <p className="mt-3 text-base font-bold text-[#0b2b68]">
                    {new Intl.NumberFormat("vi-VN").format(selected.price)}đ
                  </p>
                  <button
                    onClick={() => handleAddLook(selected)}
                    className="mt-4 w-full rounded-xs bg-[#0b2b68] py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-800 transition-colors"
                  >
                    Thêm set đồ này vào giỏ
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
}

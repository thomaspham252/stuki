"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductItem } from "@/data/mock-data";
import { useCartStore } from "@/stores/use-cart-store";
import { ShoppingBag, Eye, Heart } from "lucide-react";

interface ProductCardProps {
  product: ProductItem;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [isHovered, setIsHovered] = useState(false);
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: product.sizes[0] || "L",
      color: selectedColor,
      image: product.image,
      quantity: 1,
    });
    openCart();
  };

  return (
    <div
      className="group relative flex flex-col overflow-hidden bg-white text-zinc-900 transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with 3:4 Aspect Ratio */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-zinc-100">
        {/* Main Image */}
        <Image
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1 items-end">
          {product.badge === "SALE" && (
            <span className="rounded-xs bg-[#e53935] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
              SALE
            </span>
          )}
          {product.badge === "HÀNG MỚI" && (
            <span className="rounded-xs bg-[#111111] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
              HÀNG MỚI
            </span>
          )}
          {product.badge === "HOT" && (
            <span className="rounded-xs bg-amber-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
              HOT
            </span>
          )}
        </div>

        {/* Wishlist quick action */}
        <button
          aria-label="Yêu thích"
          className="absolute top-2 left-2 z-10 rounded-full bg-white/80 p-1.5 text-zinc-700 opacity-0 backdrop-blur-xs transition-opacity hover:text-red-600 group-hover:opacity-100"
        >
          <Heart className="h-4 w-4" />
        </button>

        {/* Bottom Banner 11.11 - Overlaid across bottom of photo */}
        <div className="absolute bottom-0 inset-x-0 z-10 bg-[#0b2b68] py-1 text-center text-[11px] font-bold tracking-wider text-white uppercase">
          11.11 - SALE UP TO 50%
        </div>

        {/* Quick Add Overlay on Hover */}
        <div
          className={`absolute inset-x-0 bottom-6 z-20 flex justify-center px-3 transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center gap-1.5 rounded-sm bg-black/90 py-2.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-[#0b2b68] shadow-md"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Thêm vào giỏ
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-1 flex-col pt-2.5 pb-2">
        {/* Product Title */}
        <h3
          title={product.name}
          className="truncate text-xs font-semibold uppercase text-zinc-900 group-hover:text-[#0b2b68] transition-colors"
        >
          {product.name}
        </h3>

        {/* Price Row */}
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-bold text-zinc-950">
            {new Intl.NumberFormat("vi-VN").format(product.price)}đ
          </span>
          {product.originalPrice && (
            <>
              <span className="text-xs text-zinc-400 line-through">
                {new Intl.NumberFormat("vi-VN").format(product.originalPrice)}đ
              </span>
              {product.discountPercent && (
                <span className="rounded-xs bg-red-100 px-1 py-0.2 text-[10px] font-bold text-red-600">
                  -{product.discountPercent}%
                </span>
              )}
            </>
          )}
        </div>

        {/* Color Swatches */}
        <div className="mt-2 flex items-center gap-1.5">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={(e) => {
                e.preventDefault();
                setSelectedColor(color.name);
              }}
              title={color.name}
              className={`h-3.5 w-3.5 rounded-full border border-zinc-300 transition-all ${
                selectedColor === color.name ? "ring-1.5 ring-[#0b2b68] ring-offset-1 scale-110" : ""
              }`}
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

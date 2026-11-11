"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProductItem } from "@/data/mock-data";
import { useCartStore } from "@/stores/use-cart-store";
import { ShoppingBag } from "lucide-react";

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
      className="group relative flex flex-col rounded-xl bg-white p-2.5 text-zinc-900 shadow-2xs hover:shadow-md transition-all border border-zinc-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. KHU VỰC ẢNH VỚI TỈ LỆ DỌC CHUẨN */}
      <div className="relative aspect-3/4 w-full overflow-hidden rounded-lg bg-zinc-100">
        {/* Ảnh chính & ảnh hover */}
        <Image
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge "SALE" góc trên bên phải chuẩn như ảnh */}
        {product.badge === "SALE" && (
          <div className="absolute top-0 right-0 z-10 bg-[#e50000] px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-xs">
            SALE
          </div>
        )}

        {product.badge === "HÀNG MỚI" && (
          <div className="absolute top-0 right-0 z-10 bg-[#111111] px-3.5 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-xs">
            HÀNG MỚI
          </div>
        )}

        {/* Quick Add Overlay on Hover */}
        <div
          className={`absolute inset-x-0 bottom-12 z-20 flex justify-center px-3 transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={handleAddToCart}
            className="flex w-full items-center justify-center gap-1.5 rounded-sm bg-black/90 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-xs transition-colors hover:bg-[#0050c8] shadow-md"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Thêm vào giỏ
          </button>
        </div>

        {/* DẢI BANNER XANH CHUẨN DOUBLE DEAL 11.11 ĐÈ Ở ĐÁY ẢNH */}
        <div className="absolute bottom-0 inset-x-0 z-10 flex items-center justify-between bg-[#0050c8] px-2.5 py-1.5 text-white">
          {/* Bên trái: DOUBLE DEAL / 11.11 */}
          <div className="flex flex-col text-left leading-none">
            <span className="text-[8px] sm:text-[9px] font-black italic tracking-wider text-sky-200 uppercase">
              DOUBLE DEAL
            </span>
            <span className="text-base sm:text-xl font-black text-white tracking-tight -mt-0.5">
              11.11
            </span>
          </div>

          {/* Bên phải: SALE UP TO 50% */}
          <div className="flex items-center gap-1 text-right">
            <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-tight text-white leading-none">
              SALE UP TO
            </span>
            <span className="text-lg sm:text-2xl font-black leading-none tracking-tight text-white stroke-blue">
              50<span className="text-xs sm:text-sm font-bold">%</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. THÔNG TIN SẢN PHẨM BÊN DƯỚI ẢNH */}
      <div className="flex flex-1 flex-col pt-2.5 pb-1">
        {/* Tên sản phẩm: Chữ thường (Title case) kết thúc bằng ... nếu dài */}
        <h3
          title={product.name}
          className="text-xs sm:text-[13px] font-normal text-zinc-900 group-hover:text-[#0050c8] transition-colors truncate"
        >
          {product.name}
        </h3>

        {/* Hàng giá: Giá bán đậm màu xanh navy + Giá gốc gạch ngang + Badge % giảm màu đỏ */}
        <div className="mt-1.5 flex flex-wrap items-center gap-2">
          {/* Giá khuyến mãi */}
          <span className="text-sm sm:text-base font-black text-[#0b2b68]">
            {new Intl.NumberFormat("vi-VN").format(product.price)}₫
          </span>

          {/* Giá gốc gạch ngang */}
          {product.originalPrice && (
            <span className="text-xs sm:text-[13px] font-medium text-zinc-400 line-through">
              {new Intl.NumberFormat("vi-VN").format(product.originalPrice)}₫
            </span>
          )}

          {/* Badge giảm % đỏ rực */}
          {product.discountPercent && (
            <span className="rounded-full bg-[#ff0000] px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-white leading-none">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Ô tròn màu sắc (Color Swatch) dạng Thumbnail Fabric chuẩn như ảnh */}
        <div className="mt-2.5 flex items-center gap-1.5">
          {product.colors.map((color) => {
            const isSelected = selectedColor === color.name;
            return (
              <button
                key={color.name}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedColor(color.name);
                }}
                title={color.name}
                className={`relative h-6 w-6 rounded-full border border-zinc-300 p-0.5 transition-all ${
                  isSelected ? "ring-2 ring-zinc-800 scale-105" : "hover:border-zinc-500"
                }`}
              >
                <div
                  className="h-full w-full rounded-full overflow-hidden"
                  style={{ backgroundColor: color.hex }}
                >
                  {/* Nếu là màu đầu tiên, hiển thị thumbnail thu nhỏ của trang phục */}
                  <Image
                    src={product.image}
                    alt={color.name}
                    width={24}
                    height={24}
                    className="h-full w-full object-cover"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

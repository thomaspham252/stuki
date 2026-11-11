"use client";

import React, { useState } from "react";
import { useCartStore } from "@/stores/use-cart-store";
import {
  Sparkles,
  ArrowUpRight,
  SlidersHorizontal,
  Check,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  fit: "Boxy" | "Wide-leg" | "Oversized" | "Regular";
  price: number;
  originalPrice?: number;
  gsm?: number;
  material: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  image: string;
  isTrending?: boolean;
  isNew?: boolean;
}

const PRODUCTS: Product[] = [
  {
    id: "ts-01",
    name: "Heavyweight Boxy Tee 280 GSM",
    category: "Áo thun",
    fit: "Boxy",
    price: 380000,
    originalPrice: 450000,
    gsm: 280,
    material: "100% Cotton 2 chiều dệt dày dặn, vai rớt chuẩn form",
    colors: [
      { name: "Charcoal (Than)", hex: "#2f3542" },
      { name: "Stone Grey (Xám đá)", hex: "#747d8c" },
      { name: "Olive (Rêu đậm)", hex: "#556b2f" },
      { name: "Off-White (Kem)", hex: "#f1f2f6" },
    ],
    sizes: ["S", "M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop",
    isTrending: true,
    isNew: true,
  },
  {
    id: "jk-01",
    name: "Cropped Worker Canvas Jacket",
    category: "Áo khoác",
    fit: "Boxy",
    price: 890000,
    gsm: 360,
    material: "Canvas thô wash mềm, form ngắn ngang cạp quần tạo tỉ lệ chân dài",
    colors: [
      { name: "Khaki Brown", hex: "#8c7b64" },
      { name: "Washed Black", hex: "#1e1e1e" },
    ],
    sizes: ["M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=800&auto=format&fit=crop",
    isTrending: true,
  },
  {
    id: "pn-01",
    name: "Relaxed Wide-Leg Tailored Trousers",
    category: "Quần dài",
    fit: "Wide-leg",
    price: 620000,
    material: "Vải tuyết mưa hàn cao cấp, xếp 2 ly sâu, ống rủ rộng quét đất",
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Stone Grey", hex: "#57606f" },
      { name: "Dark Navy", hex: "#1e272e" },
    ],
    sizes: ["S", "M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800&auto=format&fit=crop",
    isTrending: true,
  },
  {
    id: "hd-01",
    name: "Heavy French Terry Zip Hoodie 380 GSM",
    category: "Hoodie & Nỉ",
    fit: "Oversized",
    price: 690000,
    gsm: 380,
    material: "Nỉ chân cua định lượng cao, mũ trùm 2 lớp đứng form",
    colors: [
      { name: "Washed Charcoal", hex: "#353b48" },
      { name: "Off-White", hex: "#f5f6fa" },
    ],
    sizes: ["M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=800&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "cg-01",
    name: "Tactical Utility Cargo Pants 6 Pockets",
    category: "Quần dài",
    fit: "Wide-leg",
    price: 650000,
    material: "Vải dù chéo chống nhăn, 6 túi hộp công năng, gấu rút dây biến hình",
    colors: [
      { name: "Olive Green", hex: "#4b5320" },
      { name: "Jet Black", hex: "#141414" },
    ],
    sizes: ["S", "M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop",
    isTrending: true,
  },
  {
    id: "sh-01",
    name: "Pleated Relaxed Cargo Shorts",
    category: "Quần short",
    fit: "Wide-leg",
    price: 420000,
    material: "Kaki cotton dày dặn, cạp phối thắt lưng da, ống rộng qua gối",
    colors: [
      { name: "Sand Beige", hex: "#dcdde1" },
      { name: "Charcoal", hex: "#2f3640" },
    ],
    sizes: ["M", "L", "XL"],
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop",
  },
];

export default function Home() {
  const [selectedFit, setSelectedFit] = useState<string>("All");
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({});
  const { addItem, openCart } = useCartStore();

  const filteredProducts =
    selectedFit === "All"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.fit.toLowerCase() === selectedFit.toLowerCase());

  const handleQuickAdd = (product: Product) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    const color = selectedColors[product.id] || product.colors[0].name;

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size,
      color,
      image: product.image,
      quantity: 1,
      fit: product.fit,
      gsm: product.gsm,
    });
  };

  const handleAddLookCombo = () => {
    // Add both the tee and wide-leg trousers together with a combo discount
    const tee = PRODUCTS[0];
    const pants = PRODUCTS[2];

    addItem({
      id: tee.id,
      name: `${tee.name} (Set Combo)`,
      price: Math.round(tee.price * 0.9), // 10% discount
      size: "L",
      color: tee.colors[0].name,
      image: tee.image,
      quantity: 1,
      fit: tee.fit,
    });

    addItem({
      id: pants.id,
      name: `${pants.name} (Set Combo)`,
      price: Math.round(pants.price * 0.9), // 10% discount
      size: "M",
      color: pants.colors[0].name,
      image: pants.image,
      quantity: 1,
      fit: pants.fit,
    });

    openCart();
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO BANNER: Editorial Lookbook */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-zinc-950 text-white flex items-center justify-center">
        {/* Background Image with Dark Vignette */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs uppercase tracking-widest backdrop-blur-md mb-6">
            <Sparkles className="h-3.5 w-3.5 text-zinc-300" />
            <span>Autumn / Winter 2026 Archive</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-tight">
            ELEVATED BASICS & UTILITY
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto font-light">
            Định nghĩa lại phong cách thời trang phi giới tính. Tập trung vào tỉ lệ dáng áo{" "}
            <b>Boxy ngắn rộng</b> phối cùng <b>Quần Wide-leg</b> và chất liệu Heavyweight Cotton 240–300 GSM.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#products"
              className="rounded-full bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-black hover:bg-zinc-200 transition-all shadow-xl"
            >
              Xem Bộ Sưu Tập
            </a>
            <a
              href="#shop-the-look"
              className="rounded-full border border-white/40 bg-black/40 px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm hover:bg-white/20 transition-all"
            >
              Shop The Look (Phối đồ)
            </a>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITIONS */}
      <section className="border-b border-zinc-200 bg-zinc-50 py-6 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <div className="rounded-full bg-zinc-200 p-2.5 dark:bg-zinc-800">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">Freeship từ 500k</h4>
                <p className="text-xs text-zinc-500">Giao hàng hỏa tốc 2h nội thành</p>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <div className="rounded-full bg-zinc-200 p-2.5 dark:bg-zinc-800">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">Heavyweight Fabric</h4>
                <p className="text-xs text-zinc-500">Cotton 240–300 GSM đứng form bền bỉ</p>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-4">
              <div className="rounded-full bg-zinc-200 p-2.5 dark:bg-zinc-800">
                <RotateCcw className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">Đổi trả 7 ngày</h4>
                <p className="text-xs text-zinc-500">Hỗ trợ đổi size tận nhà miễn phí</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT CATALOG WITH FIT FILTER */}
      <section id="products" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-zinc-200 pb-6 dark:border-zinc-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              Essential Unisex Line
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight uppercase mt-1">
              Sản phẩm nổi bật & Xu hướng 2026
            </h2>
          </div>

          {/* Interactive Fit Filter (Từ file Excel) */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-zinc-500 mr-2 flex items-center gap-1">
              <SlidersHorizontal className="h-3.5 w-3.5" /> Lọc theo dáng (Fit):
            </span>
            {["All", "Boxy", "Wide-leg", "Oversized"].map((fit) => (
              <button
                key={fit}
                onClick={() => setSelectedFit(fit)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedFit.toLowerCase() === fit.toLowerCase()
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-black shadow-sm"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400"
                }`}
              >
                {fit === "All" ? "Tất cả" : `${fit} Fit`}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((p) => {
            const currentSize = selectedSizes[p.id] || p.sizes[0];
            const currentColor = selectedColors[p.id] || p.colors[0].name;

            return (
              <div
                key={p.id}
                className="group flex flex-col justify-between rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div className="relative aspect-4/5 w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Fit & GSM Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="rounded-full bg-black/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                        {p.fit} Fit
                      </span>
                      {p.gsm && (
                        <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-black backdrop-blur-md">
                          {p.gsm} GSM
                        </span>
                      )}
                    </div>

                    {p.isTrending && (
                      <span className="absolute top-3 right-3 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                        Hot Trend
                      </span>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="mt-4">
                    <div className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                      {p.category}
                    </div>
                    <h3 className="text-base font-bold text-zinc-900 dark:text-white mt-1 leading-snug">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500 line-clamp-1">{p.material}</p>

                    {/* Price */}
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-base font-bold text-zinc-900 dark:text-white">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(p.price)}
                      </span>
                      {p.originalPrice && (
                        <span className="text-xs text-zinc-400 line-through">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(p.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Color Swatches */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[11px] text-zinc-500">Màu:</span>
                      <div className="flex gap-1.5">
                        {p.colors.map((c) => (
                          <button
                            key={c.name}
                            onClick={() =>
                              setSelectedColors((prev) => ({ ...prev, [p.id]: c.name }))
                            }
                            title={c.name}
                            className={`h-4 w-4 rounded-full border transition-all ${
                              currentColor === c.name
                                ? "ring-2 ring-zinc-900 ring-offset-1 dark:ring-white"
                                : "opacity-80 hover:opacity-100"
                            }`}
                            style={{ backgroundColor: c.hex }}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-zinc-400 truncate max-w-[120px]">
                        ({currentColor})
                      </span>
                    </div>

                    {/* Size Selector */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[11px] text-zinc-500">Size:</span>
                      <div className="flex gap-1">
                        {p.sizes.map((s) => (
                          <button
                            key={s}
                            onClick={() =>
                              setSelectedSizes((prev) => ({ ...prev, [p.id]: s }))
                            }
                            className={`h-6 w-7 rounded text-[11px] font-bold uppercase transition-all ${
                              currentSize === s
                                ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add To Cart Button */}
                <button
                  onClick={() => handleQuickAdd(p)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition-colors"
                >
                  <ShoppingBag className="h-3.5 w-3.5" />
                  Thêm vào giỏ
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SHOP THE LOOK (Combo phối đồ - Xu hướng 2 từ file Excel) */}
      <section
        id="shop-the-look"
        className="bg-zinc-100 py-16 dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visual Look */}
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
                alt="Set đồ Unisex Minimalist"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                <span className="text-xs uppercase tracking-widest text-zinc-300 font-bold">
                  Lookbook Outfit #01
                </span>
                <h3 className="text-2xl font-black uppercase mt-1">
                  The Contemporary Silhouette
                </h3>
                <p className="text-xs text-zinc-300 mt-1">
                  Tỉ lệ "Trên ngắn - Dưới rộng": Áo thun Boxy Cotton 280 GSM + Quần tây xếp ly Wide-Leg.
                </p>
              </div>
            </div>

            {/* Look Details & Combo Buy Action */}
            <div className="space-y-6">
              <div>
                <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-bold uppercase tracking-wider dark:bg-emerald-950 dark:text-emerald-300">
                  Ưu đãi Combo -10%
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold uppercase mt-3 tracking-tight">
                  Phối đồ hoàn chỉnh: Buy The Look
                </h2>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
                  Không còn đau đầu suy nghĩ "Hôm nay mặc gì?". Set đồ được các stylist TSUKI phối
                  chuẩn tỉ lệ vàng cho cả bạn nam và bạn nữ theo xu hướng mới nhất 2026.
                </p>
              </div>

              {/* Items included */}
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-xs dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-emerald-600" />
                    <div>
                      <h4 className="text-xs font-bold uppercase">Áo Thun Boxy Charcoal 280 GSM</h4>
                      <p className="text-[11px] text-zinc-500">Cotton dày dặn, vai rớt</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold">380.000đ</span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-xs dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-emerald-600" />
                    <div>
                      <h4 className="text-xs font-bold uppercase">Quần Wide-Leg Trousers Black</h4>
                      <p className="text-[11px] text-zinc-500">Ống suông rộng xếp ly</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold">620.000đ</span>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="border-t border-zinc-300 pt-4 dark:border-zinc-700 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-500 block">Giá mua cả set (Giảm 10%):</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-zinc-900 dark:text-white">
                      900.000đ
                    </span>
                    <span className="text-sm text-zinc-400 line-through">1.000.000đ</span>
                  </div>
                </div>

                <button
                  onClick={handleAddLookCombo}
                  className="rounded-full bg-zinc-900 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-xl transition-all"
                >
                  Mua cả set (-10%)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="border-t border-zinc-200 bg-white py-12 text-zinc-600 dark:border-zinc-800 dark:bg-black dark:text-zinc-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <span className="text-xl font-black tracking-widest text-zinc-950 uppercase dark:text-white">
                TSUKI
              </span>
              <p className="mt-3 text-xs leading-relaxed max-w-sm">
                Thương hiệu thời trang Unisex cao cấp theo phong cách Contemporary Minimalism.
                Tập trung vào cấu trúc phom dáng, chất lượng vải dệt dày dặn và tính ứng dụng bền vững.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-3">
                Danh mục
              </h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#ao-thun" className="hover:underline">Áo thun Boxy (240-300 GSM)</a></li>
                <li><a href="#ao-khoac" className="hover:underline">Áo khoác Worker Jacket</a></li>
                <li><a href="#quan-dai" className="hover:underline">Quần Wide-Leg & Cargo</a></li>
                <li><a href="#phu-kien" className="hover:underline">Thắt lưng & Phụ kiện</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-3">
                Dự Án Portfolio
              </h4>
              <p className="text-xs">
                Đồ án Fullstack Web Thương mại điện tử xây dựng với Next.js 15, TypeScript, Tailwind CSS, Prisma ORM và Zustand.
              </p>
              <div className="mt-3 text-[11px] text-zinc-400">
                © 2026 TSUKI STUDIO. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

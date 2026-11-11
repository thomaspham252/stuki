"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/stores/use-cart-store";
import { ShoppingBag, Search, Menu, X, SlidersHorizontal } from "lucide-react";

const CATEGORIES = [
  { name: "Áo thun", href: "#ao-thun" },
  { name: "Áo khoác", href: "#ao-khoac" },
  { name: "Hoodie & Nỉ", href: "#hoodie" },
  { name: "Quần dài", href: "#quan-dai" },
  { name: "Quần short", href: "#quan-short" },
  { name: "Phụ kiện", href: "#phu-kien" },
  { name: "Utility Pack", href: "#utility", highlight: true },
];

export default function Navbar() {
  const { openCart, totalCount } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const count = totalCount();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-md dark:border-zinc-800 dark:bg-black/95">
      {/* Top Announcement Bar */}
      <div className="bg-zinc-900 px-4 py-2 text-center text-[11px] font-medium tracking-widest text-zinc-100 uppercase dark:bg-zinc-950 border-b border-zinc-800">
        Miễn phí vận chuyển toàn quốc cho đơn từ 500.000đ • Thiết kế Unisex Form Chuẩn 2026
      </div>

      {/* Main Nav */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Left: Mobile Menu Button */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-700 hover:text-black dark:text-zinc-300 dark:hover:text-white"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Center/Left: Brand Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-1.5">
            <span className="text-2xl font-black tracking-[0.25em] text-zinc-950 uppercase dark:text-white transition-opacity group-hover:opacity-80">
              TSUKI
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-white inline-block"></span>
          </Link>

          {/* Desktop Categories */}
          <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium tracking-wide">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.name}
                href={cat.href}
                className={`transition-colors uppercase text-xs tracking-wider ${
                  cat.highlight
                    ? "font-bold text-emerald-600 dark:text-emerald-400"
                    : "text-zinc-600 hover:text-black dark:text-zinc-300 dark:hover:text-white"
                }`}
              >
                {cat.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            aria-label="Tìm kiếm"
            className="rounded-full p-2 text-zinc-600 hover:bg-zinc-100 hover:text-black dark:text-zinc-300 dark:hover:bg-zinc-900 transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Cart Trigger Button */}
          <button
            onClick={openCart}
            aria-label="Giỏ hàng"
            className="relative flex items-center gap-2 rounded-full bg-zinc-100 px-3.5 py-2 text-xs font-semibold text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Giỏ hàng</span>
            {count > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[10px] font-bold text-white dark:bg-white dark:text-zinc-900">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-black space-y-3">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.name}
              href={cat.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-1.5 text-sm uppercase tracking-wider ${
                cat.highlight
                  ? "font-bold text-emerald-600 dark:text-emerald-400"
                  : "text-zinc-700 dark:text-zinc-300"
              }`}
            >
              {cat.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}


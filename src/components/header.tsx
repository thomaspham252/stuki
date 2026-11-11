"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/stores/use-cart-store";
import {
  Search,
  MapPin,
  User,
  Heart,
  ShoppingBag,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

export default function Header() {
  const { openCart, totalCount } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const count = totalCount();

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Mobile menu trigger */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Left: Brand Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-2xl font-black tracking-tighter text-[#0b2b68] uppercase">
              ICONDENIM
            </span>
          </Link>
        </div>

        {/* Center: Desktop Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-7 text-[13px] font-bold uppercase tracking-wider text-zinc-800">
          {/* SẢN PHẨM (Dropdown) */}
          <div
            className="relative py-5"
            onMouseEnter={() => setActiveDropdown("san-pham")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-[#0b2b68] transition-colors">
              SẢN PHẨM
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {activeDropdown === "san-pham" && (
              <div className="absolute top-full left-0 z-50 w-64 rounded-b-md bg-white p-4 shadow-xl border-t-2 border-[#0b2b68] animate-in fade-in">
                <ul className="space-y-2.5 text-xs font-semibold text-zinc-700">
                  <li><a href="#ao-thun" className="hover:text-[#0b2b68] block">Áo Thun Nam</a></li>
                  <li><a href="#ao-thun" className="hover:text-[#0b2b68] block">Áo Polo Nam</a></li>
                  <li><a href="#ao-thun" className="hover:text-[#0b2b68] block">Áo Sơ Mi Nam</a></li>
                  <li><a href="#do-thu" className="hover:text-[#0b2b68] block">Áo Khoác Nam</a></li>
                  <li><a href="#jeans" className="hover:text-[#0b2b68] block">Quần Jeans Nam</a></li>
                  <li><a href="#quan-tay" className="hover:text-[#0b2b68] block">Quần Tây / Khaki</a></li>
                  <li><a href="#double-deal" className="hover:text-[#0b2b68] block">Quần Short</a></li>
                </ul>
              </div>
            )}
          </div>

          {/* HÀNG MỚI (Badge NEW) */}
          <Link
            href="#do-thu"
            className="flex items-center gap-1 hover:text-[#0b2b68] transition-colors relative"
          >
            HÀNG MỚI
            <span className="rounded-full bg-red-600 px-1.5 py-0.2 text-[9px] font-bold text-white uppercase -mt-3">
              New
            </span>
          </Link>

          {/* HÀNG BÁN CHẠY */}
          <Link href="#double-deal" className="hover:text-[#0b2b68] transition-colors">
            HÀNG BÁN CHẠY
          </Link>

          {/* DENIM (Dropdown) */}
          <div
            className="relative py-5"
            onMouseEnter={() => setActiveDropdown("denim")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-[#0b2b68] transition-colors">
              DENIM
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {activeDropdown === "denim" && (
              <div className="absolute top-full left-0 z-50 w-56 rounded-b-md bg-white p-4 shadow-xl border-t-2 border-[#0b2b68] animate-in fade-in">
                <ul className="space-y-2.5 text-xs font-semibold text-zinc-700">
                  <li><a href="#jeans" className="hover:text-[#0b2b68] block">TechUrban Jeans</a></li>
                  <li><a href="#jeans" className="hover:text-[#0b2b68] block">Smart Jeans Co Giãn</a></li>
                  <li><a href="#jeans" className="hover:text-[#0b2b68] block">ProCOOL Siêu Mát</a></li>
                  <li><a href="#jeans" className="hover:text-[#0b2b68] block">Áo Khoác Denim</a></li>
                </ul>
              </div>
            )}
          </div>

          {/* SALE 11.11 (Chữ đỏ nổi bật) */}
          <Link
            href="#double-deal"
            className="font-extrabold text-[#e53935] hover:text-red-700 transition-colors animate-pulse"
          >
            SALE 11.11
          </Link>

          {/* COLLECTION (Dropdown) */}
          <div
            className="relative py-5"
            onMouseEnter={() => setActiveDropdown("collection")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-[#0b2b68] transition-colors">
              COLLECTION
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {activeDropdown === "collection" && (
              <div className="absolute top-full right-0 z-50 w-64 rounded-b-md bg-white p-4 shadow-xl border-t-2 border-[#0b2b68] animate-in fade-in">
                <ul className="space-y-2.5 text-xs font-semibold text-zinc-700">
                  <li><a href="#bst-moi" className="hover:text-[#0b2b68] block">Sportcation FW26</a></li>
                  <li><a href="#bst-moi" className="hover:text-[#0b2b68] block">Garfield Collection</a></li>
                  <li><a href="#bst-moi" className="hover:text-[#0b2b68] block">Disney Mickey & Friends</a></li>
                </ul>
              </div>
            )}
          </div>
        </nav>

        {/* Right: Actions (Search, Location, Account, Wishlist, Cart) */}
        <div className="flex items-center gap-3 sm:gap-4 text-zinc-700">
          {/* Search Trigger */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 hover:text-[#0b2b68] transition-colors"
              aria-label="Tìm kiếm"
            >
              <Search className="h-5 w-5" />
            </button>
            {searchOpen && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white p-2 shadow-lg border border-zinc-200 rounded-md z-50 flex items-center">
                <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full text-xs px-2 py-1.5 outline-none"
                  autoFocus
                />
                <Search className="h-4 w-4 text-zinc-400 mr-2" />
              </div>
            )}
          </div>

          {/* Store Location */}
          <button
            title="Hệ thống cửa hàng"
            className="p-1.5 hover:text-[#0b2b68] transition-colors"
            aria-label="Hệ thống cửa hàng"
          >
            <MapPin className="h-5 w-5" />
          </button>

          {/* User Account */}
          <button
            title="Tài khoản"
            className="p-1.5 hover:text-[#0b2b68] transition-colors"
            aria-label="Tài khoản"
          >
            <User className="h-5 w-5" />
          </button>

          {/* Wishlist Heart */}
          <button
            title="Yêu thích"
            className="p-1.5 hover:text-[#0b2b68] transition-colors hidden sm:block"
            aria-label="Danh sách yêu thích"
          >
            <Heart className="h-5 w-5" />
          </button>

          {/* Cart Bag with badge */}
          <button
            onClick={openCart}
            title="Giỏ hàng"
            className="relative p-1.5 hover:text-[#0b2b68] transition-colors"
            aria-label="Giỏ hàng"
          >
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0b2b68] text-[9px] font-bold text-white">
              {count}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 bg-white px-4 py-4 space-y-3 font-semibold text-xs uppercase tracking-wider text-zinc-800">
          <a href="#ao-thun" onClick={() => setMobileMenuOpen(false)} className="block py-1">
            Sản phẩm
          </a>
          <a href="#do-thu" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-red-600 font-bold">
            Hàng Mới (New)
          </a>
          <a href="#double-deal" onClick={() => setMobileMenuOpen(false)} className="block py-1">
            Hàng Bán Chạy
          </a>
          <a href="#jeans" onClick={() => setMobileMenuOpen(false)} className="block py-1">
            Denim
          </a>
          <a href="#double-deal" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-red-600 font-bold">
            Sale 11.11
          </a>
          <a href="#bst-moi" onClick={() => setMobileMenuOpen(false)} className="block py-1">
            Collection
          </a>
        </div>
      )}
    </header>
  );
}


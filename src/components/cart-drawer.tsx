"use client";

import React, { useEffect } from "react";
import { useCartStore } from "@/stores/use-cart-store";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";

const FREESHIP_THRESHOLD = 500000;

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice, totalCount } =
    useCartStore();

  const total = totalPrice();
  const count = totalCount();
  const remainingForFreeship = Math.max(0, FREESHIP_THRESHOLD - total);
  const freeshipProgress = Math.min(100, (total / FREESHIP_THRESHOLD) * 100);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={closeCart}
      />

      {/* Drawer Panel */}
      <div className="relative z-50 flex h-full w-full max-w-md flex-col bg-white text-zinc-900 shadow-2xl transition-transform dark:bg-zinc-950 dark:text-zinc-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            <h2 className="text-sm font-semibold tracking-wider uppercase">
              Giỏ Hàng ({count})
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 hover:text-black dark:hover:bg-zinc-900 dark:hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="border-b border-zinc-200 bg-zinc-50 px-6 py-3 dark:border-zinc-800 dark:bg-zinc-900/60">
          <p className="text-xs text-zinc-600 dark:text-zinc-300">
            {remainingForFreeship === 0 ? (
              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                🎉 Bạn đã đủ điều kiện được <b>Freeship</b> toàn quốc!
              </span>
            ) : (
              <span>
                Mua thêm{" "}
                <b className="text-zinc-900 dark:text-white">
                  {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
                    remainingForFreeship
                  )}
                </b>{" "}
                để được <b>Freeship</b>
              </span>
            )}
          </p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
            <div
              className="h-full bg-zinc-900 dark:bg-white transition-all duration-300"
              style={{ width: `${freeshipProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-12 w-12 text-zinc-300 dark:text-zinc-700 mb-3" />
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Giỏ hàng của bạn đang trống
              </p>
              <button
                onClick={closeCart}
                className="mt-4 rounded-full bg-zinc-900 px-6 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 transition-colors"
              >
                Tiếp tục mua sắm
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex gap-4 border-b border-zinc-100 pb-4 dark:border-zinc-900"
                >
                  {/* Product Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-20 rounded-md object-cover bg-zinc-100 dark:bg-zinc-900"
                  />

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium leading-snug">{item.name}</h3>
                        <button
                          onClick={() => removeItem(item.id, item.size, item.color)}
                          className="text-zinc-400 hover:text-red-500 transition-colors ml-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        Phân loại: <span className="font-medium text-zinc-700 dark:text-zinc-300">{item.color} / Size {item.size}</span>
                      </p>
                      {item.fit && (
                        <span className="mt-1 inline-block text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
                          {item.fit}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center rounded border border-zinc-200 dark:border-zinc-800">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.color, item.quantity - 1)
                          }
                          className="px-2 py-1 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.size, item.color, item.quantity + 1)
                          }
                          className="px-2 py-1 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="text-sm font-semibold">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer & Checkout CTA */}
        {items.length > 0 && (
          <div className="border-t border-zinc-200 p-6 dark:border-zinc-800 bg-white dark:bg-zinc-950">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Tạm tính:</span>
              <span className="text-lg font-bold">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(total)}
              </span>
            </div>
            <button
              onClick={() => alert("Chức năng Checkout mô phỏng đang được kết nối!")}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-zinc-900 py-3.5 text-xs font-semibold uppercase tracking-widest text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 transition-colors shadow-lg"
            >
              Tiến hành thanh toán
              <ArrowRight className="h-4 w-4" />
            </button>
            <p className="mt-3 text-center text-[11px] text-zinc-400">
              Đổi trả miễn phí trong 7 ngày • Kiểm tra hàng trước khi thanh toán
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

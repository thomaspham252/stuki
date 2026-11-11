import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import CartDrawer from "@/components/cart-drawer";

const geistSans = Geist({
  variable: "--font-font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TSUKI | Contemporary Unisex Studio - Elevated Basics & Utility",
  description:
    "Thương hiệu thời trang Unisex cao cấp. Thiết kế phom dáng Boxy, Wide-leg, chất liệu Heavyweight Cotton 240-300 GSM.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-white text-zinc-900 dark:bg-black dark:text-zinc-100 font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <CartDrawer />
      </body>
    </html>
  );
}

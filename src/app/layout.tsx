import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CartDrawer from "@/components/cart-drawer";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["vietnamese", "latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ICONDENIM® | Thời Trang Nam Cao Cấp - Double Deal 11.11",
  description:
    "ICONDENIM - Thương hiệu thời trang nam hiện đại. Quần Jeans TechUrban, Đồ Thu Đông, Áo Thun, Quần Tây, Sportcation Collection.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${montserrat.variable} h-full antialiased scroll-smooth`}>
      <body
        className="min-h-full flex flex-col bg-white text-zinc-900 font-sans"
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}

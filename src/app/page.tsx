import React from "react";
import HeroSlider from "@/components/hero-slider";
import PolicyBar from "@/components/policy-bar";
import DoubleDealSection from "@/components/double-deal-section";
import JeansSection from "@/components/jeans-section";
import AutumnSection from "@/components/autumn-section";
import TshirtSection from "@/components/tshirt-section";
import TrousersSection from "@/components/trousers-section";
import MixMatchSection from "@/components/mix-match-section";
import InstagramSection from "@/components/instagram-section";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* 2. HERO BANNER full width dạng slider */}
      <HeroSlider />

      {/* 3. THANH CHÍNH SÁCH gồm 4 ô ngang */}
      <PolicyBar />

      {/* 4. KHỐI DOUBLE DEAL 11.11 (nền xanh nhạt, bo góc) */}
      <DoubleDealSection />

      {/* 5. KHỐI JEANS */}
      <JeansSection />

      {/* 6. KHỐI ĐỒ THU */}
      <AutumnSection />

      {/* 7. KHỐI ÁO THUN */}
      <TshirtSection />

      {/* 8. KHỐI QUẦN TÂY */}
      <TrousersSection />

      {/* 9. "COMBO MIX & MATCH" (4 ảnh dọc, nút hotspot +) */}
      <MixMatchSection />

      {/* 10. "FOLLOW INSTAGRAM @..." (hàng 5 ảnh vuông) */}
      <InstagramSection />
    </div>
  );
}

import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";

const PANELS = [
  {
    id: 1,
    title: "SMART JEANS",
    subtitle: "SIÊU CO GIÃN 360°",
    desc: "Chất vải pha Spandex cao cấp, vận động linh hoạt cả ngày dài",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop",
    hasPlay: false,
  },
  {
    id: 2,
    title: "PROCOOL",
    subtitle: "SIÊU MÁT THOÁNG KHÍ",
    desc: "Sợi dệt công nghệ thoát nhiệt tức thì, luôn khô ráo dưới thời tiết nắng nóng",
    image: "https://images.unsplash.com/photo-1542272604-780c96856592?q=80&w=800&auto=format&fit=crop",
    hasPlay: true,
  },
  {
    id: 3,
    title: "LIGHTWEIGHT",
    subtitle: "SIÊU NHẸ ÊM ÁI",
    desc: "Trọng lượng nhẹ hơn 40% so với denim truyền thống, không gò bó",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=800&auto=format&fit=crop",
    hasPlay: false,
  },
];

export default function TechUrbanJeans() {
  return (
    <section className="w-full py-16 bg-white border-t border-zinc-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0b2b68]">
            INNOVATION IN DENIM
          </span>
          <h2 className="mt-1 text-3xl font-black uppercase tracking-tight text-zinc-950 font-serif">
            TÌM HIỂU TECHURBAN JEANS
          </h2>
          <div className="mt-2 mx-auto h-0.5 w-12 bg-[#0b2b68]" />
        </div>

        {/* 3 Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PANELS.map((panel) => (
            <div
              key={panel.id}
              className="group relative aspect-4/5 w-full overflow-hidden rounded-xs bg-zinc-900 shadow-md"
            >
              <Image
                src={panel.image}
                alt={panel.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />

              {/* Play Button for ProCOOL panel */}
              {panel.hasPlay && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    aria-label="Xem video công nghệ ProCOOL"
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[#0b2b68] shadow-xl backdrop-blur-xs transition-transform hover:scale-110"
                  >
                    <Play className="h-6 w-6 fill-[#0b2b68] ml-1" />
                  </button>
                </div>
              )}

              {/* Bottom Typography */}
              <div className="absolute bottom-6 inset-x-6 text-white text-center">
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-serif drop-shadow-md">
                  {panel.title}
                </h3>
                <span className="mt-1 inline-block text-xs font-bold uppercase tracking-widest text-sky-300">
                  {panel.subtitle}
                </span>
                <p className="mt-2 text-xs text-zinc-300 line-clamp-2">
                  {panel.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

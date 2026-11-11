import React from "react";
import Image from "next/image";

const COLLECTIONS = [
  {
    id: "col-1",
    title: "SPORTCATION COLLECTION",
    subtitle: "FW26 SPORTS ARCHIVE",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop",
    link: "#bst-moi",
  },
  {
    id: "col-2",
    title: "GARFIELD COLLECTION",
    subtitle: "LIMITED EDITION 2026",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop",
    link: "#bst-moi",
  },
  {
    id: "col-3",
    title: "DISNEY MICKEY & FRIENDS",
    subtitle: "NOSTALGIC RETRO STREETWEAR",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop",
    link: "#bst-moi",
  },
];

export default function CollectionsSection() {
  return (
    <section id="bst-moi" className="w-full py-16 bg-white border-t border-zinc-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered Title */}
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0b2b68]">
            EXCLUSIVE CAPSULES
          </span>
          <h2 className="mt-1 text-3xl font-black uppercase tracking-tight text-zinc-950 font-serif">
            BỘ SƯU TẬP MỚI
          </h2>
          <div className="mt-2 mx-auto h-0.5 w-12 bg-[#0b2b68]" />
        </div>

        {/* 3 Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLLECTIONS.map((col) => (
            <a
              key={col.id}
              href={col.link}
              className="group relative block aspect-4/5 w-full overflow-hidden rounded-xs bg-zinc-900 shadow-sm"
            >
              <Image
                src={col.image}
                alt={col.title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white text-center">
                <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">
                  {col.subtitle}
                </span>
                <h3 className="mt-1 text-xl font-black uppercase tracking-wide font-serif">
                  {col.title}
                </h3>
                <span className="mt-3 inline-block text-xs font-bold uppercase tracking-widest text-white underline underline-offset-4 group-hover:text-amber-300 transition-colors">
                  KHÁM PHÁ
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}


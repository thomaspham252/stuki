import React from "react";
import { Truck, RotateCcw, CreditCard, PhoneCall } from "lucide-react";

const POLICIES = [
  {
    icon: Truck,
    title: "MIỄN PHÍ VẬN CHUYỂN",
    desc: "Đơn hàng từ 399.000đ",
  },
  {
    icon: RotateCcw,
    title: "ĐỔI HÀNG TẬN NHÀ",
    desc: "Trong vòng 15 ngày",
  },
  {
    icon: CreditCard,
    title: "THANH TOÁN COD",
    desc: "Kiểm tra hàng trước khi nhận",
  },
  {
    icon: PhoneCall,
    title: "HOTLINE: 0987.999.888",
    desc: "Hỗ trợ 24/7 từ 8h30 - 22h",
  },
];

export default function PolicyBar() {
  return (
    <section className="w-full border-b border-zinc-200 bg-white py-4 shadow-2xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-zinc-100">
          {POLICIES.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3.5 px-3 py-2 justify-start sm:justify-center"
              >
                <div className="rounded-full bg-zinc-50 p-2.5 text-[#0b2b68] border border-zinc-100 shadow-2xs">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-medium">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

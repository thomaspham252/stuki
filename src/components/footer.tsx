"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-[#07193b] text-zinc-300 text-xs">
      {/* 4 Columns Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Logo & Hotline & Newsletter */}
          <div className="space-y-4">
            <span className="text-2xl font-black tracking-tight text-white uppercase tracking-wider">
              STUKI
            </span>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Thương hiệu thời trang nam cao cấp phong cách Modern Urban & TechDenim tại Việt Nam.
            </p>
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Phone className="h-4 w-4 text-sky-400" />
              Hotline: 0987.999.888
            </div>

            {/* Newsletter form */}
            <div className="pt-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-white mb-2">
                Đăng ký nhận ưu đãi 11.11
              </span>
              {subscribed ? (
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                  <CheckCircle2 className="h-4 w-4" />
                  Cảm ơn bạn đã đăng ký nhận tin!
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-1.5">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email của bạn..."
                    className="flex-1 rounded-xs bg-[#0f2757] px-3 py-2 text-xs text-white placeholder-zinc-400 outline-none border border-sky-900/60 focus:border-sky-400"
                  />
                  <button
                    type="submit"
                    className="rounded-xs bg-[#0b2b68] hover:bg-sky-700 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors"
                  >
                    Gửi
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Hỗ trợ khách hàng */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              HỖ TRỢ KHÁCH HÀNG
            </h4>
            <ul className="space-y-2.5 text-zinc-400 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Chính sách đổi trả trong 15 ngày</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo hành trọn đời</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bảng quy chuẩn chọn size chuẩn</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tra cứu tiến độ đơn hàng</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo mật thông tin</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Câu hỏi thường gặp (FAQs)</a></li>
            </ul>
          </div>

          {/* Col 3: Hệ thống cửa hàng */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              HỆ THỐNG CỬA HÀNG
            </h4>
            <ul className="space-y-3 text-zinc-400 text-xs">
              <li>
                <div className="flex items-start gap-1.5">
                  <MapPin className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">Hà Nội</span>
                    <p className="text-[11px] text-zinc-400">12 Tràng Thi, Hoàn Kiếm</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-1.5">
                  <MapPin className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">TP. Hồ Chí Minh</span>
                    <span className="ml-1.5 rounded-full bg-red-600 px-1.5 py-0.2 text-[9px] font-bold text-white">New</span>
                    <p className="text-[11px] text-zinc-400">484 Lê Văn Sỹ, Phường 14, Quận 3</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-1.5">
                  <MapPin className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">Thanh Hóa</span>
                    <span className="ml-1.5 rounded-full bg-red-600 px-1.5 py-0.2 text-[9px] font-bold text-white">New</span>
                    <p className="text-[11px] text-zinc-400">188 Trần Phú, TP. Thanh Hóa</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Phương thức thanh toán & Chứng nhận */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              PHƯƠNG THỨC THANH TOÁN
            </h4>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="rounded-xs bg-white px-2.5 py-1 text-[11px] font-bold text-blue-900 shadow-xs">
                VNPAY
              </span>
              <span className="rounded-xs bg-white px-2.5 py-1 text-[11px] font-bold text-emerald-900 shadow-xs">
                COD
              </span>
              <span className="rounded-xs bg-white px-2.5 py-1 text-[11px] font-bold text-indigo-900 shadow-xs">
                VISA / MASTER
              </span>
              <span className="rounded-xs bg-white px-2.5 py-1 text-[11px] font-bold text-pink-700 shadow-xs">
                MOMO
              </span>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
              CHỨNG NHẬN BẢO VỆ
            </h4>
            <div className="flex items-center gap-3">
              <div className="rounded-xs border border-sky-400/40 bg-sky-950/40 px-3 py-1.5 text-center">
                <span className="block text-[10px] font-bold uppercase text-sky-300">
                  ĐÃ THÔNG BÁO
                </span>
                <span className="block text-[9px] font-bold text-white">
                  BỘ CÔNG THƯƠNG
                </span>
              </div>
              <div className="rounded-xs border border-emerald-400/40 bg-emerald-950/40 px-3 py-1.5 text-center">
                <span className="block text-[10px] font-bold uppercase text-emerald-300">
                  DMCA
                </span>
                <span className="block text-[9px] font-bold text-white">
                  PROTECTED
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-sky-900/40 text-center text-[11px] text-zinc-400">
          © 2026 ICONDENIM VIỆT NAM. Tất cả quyền được bảo lưu. Thiết kế và phát triển với Next.js 16.
        </div>
      </div>
    </footer>
  );
}


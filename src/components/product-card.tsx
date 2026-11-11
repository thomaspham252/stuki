"use client";

import React, { useState, useRef, useMemo } from "react";
import Image from "next/image";
import { ProductItem, DEFAULT_PROMO_BANNER } from "@/data/mock-data";
import { useCartStore } from "@/stores/use-cart-store";
import { ShoppingCart, Eye, ArrowRight, X } from "lucide-react";

interface ProductCardProps {
  product: ProductItem;
  className?: string;
  /**
   * Banner khuyến mãi dạng ảnh ở đáy card (mặc định lấy theo DEFAULT_PROMO_BANNER hoặc product.promoBanner).
   * Khi hết đợt 11/11, chủ shop chỉ cần thay file /images/card-promo-banner.png hoặc truyền link ảnh đợt mới.
   * Truyền null nếu muốn ẩn banner.
   */
  promoBanner?: string | null;
}

export default function ProductCard({ product, className = "", promoBanner }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "L");
  const [activeImage, setActiveImage] = useState(product.image);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const swatchScrollRef = useRef<HTMLDivElement>(null);
  const { addItem, openCart } = useCartStore();

  // Xác định ảnh banner khuyến mãi (hỗ trợ thay ảnh nhanh theo từng đợt sale)
  const promoBannerSrc =
    promoBanner !== undefined
      ? promoBanner
      : product.promoBanner !== undefined
      ? product.promoBanner
      : DEFAULT_PROMO_BANNER;

  // Danh sách ảnh xoay vòng khi bấm nút < và >
  const imageList = useMemo(() => {
    const list: string[] = [];
    if (product.image) list.push(product.image);
    if (product.hoverImage && !list.includes(product.hoverImage)) {
      list.push(product.hoverImage);
    }
    if (product.images) {
      product.images.forEach((img) => {
        if (img && !list.includes(img)) list.push(img);
      });
    }
    product.colors.forEach((c) => {
      if (c.image && !list.includes(c.image)) {
        list.push(c.image);
      }
    });
    return list.length > 0 ? list : [product.image];
  }, [product]);

  // Vị trí ảnh hiện tại
  const currentImageIndex = useMemo(() => {
    const idx = imageList.indexOf(activeImage);
    return idx >= 0 ? idx : 0;
  }, [imageList, activeImage]);

  // Chuyển ảnh trước
  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const prevIdx = (currentImageIndex - 1 + imageList.length) % imageList.length;
    setActiveImage(imageList[prevIdx]);
  };

  // Chuyển ảnh tiếp theo
  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextIdx = (currentImageIndex + 1) % imageList.length;
    setActiveImage(imageList[nextIdx]);
  };

  // Cuộn thanh biến thể swatch sang phải
  const handleScrollSwatches = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (swatchScrollRef.current) {
      swatchScrollRef.current.scrollBy({ left: 90, behavior: "smooth" });
    }
  };

  // Chọn biến thể swatch
  const handleSelectVariant = (colorName: string, variantImg: string) => {
    setSelectedColor(colorName);
    if (variantImg) {
      setActiveImage(variantImg);
    }
  };

  // Thêm vào giỏ hàng
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      image: activeImage,
      quantity: 1,
    });
    openCart();
  };

  // Mở modal Xem nhanh
  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  // Hiển thị giá và khoảng giá
  const hasPriceRange = Boolean(product.maxPrice && product.maxPrice > product.price);
  const formatVnd = (val: number) => new Intl.NumberFormat("vi-VN").format(val) + "₫";

  const priceDisplay = hasPriceRange
    ? `${formatVnd(product.price)} ~ ${formatVnd(product.maxPrice!)}`
    : formatVnd(product.price);

  // Tính % giảm giá
  const discountVal =
    product.discountPercent ||
    (product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null);

  // Nhãn badge góc trên bên phải
  const badgeLabel = product.badge === "HÀNG MỚI" ? "HÀNG MỚI" : product.badge === "HOT" ? "HOT" : "SALE";
  const shouldShowBadge = Boolean(product.badge || discountVal);

  return (
    <>
      {/* KHUNG NGOÀI
          - Nền xanh nhạt #BFDDF5
          - Bo góc lớn (~20px)
          - Padding chuẩn 5px theo DevTools (p-[5px])
          - Margin 0, border 0
      */}
      <div
        className={`group relative flex flex-col rounded-[20px] bg-[#BFDDF5] p-[5px] transition-all duration-300 hover:shadow-lg ${className}`}
        style={{ margin: 0, borderWidth: 0 }}
      >
        {/* BADGE "SALE" / "HÀNG MỚI"
            - Hình chữ nhật nền đỏ (#E60012), chữ trắng, in hoa, đậm
            - Nằm sát góc trên bên phải của card, hơi vượt ra mép trên (-top-1)
            - Cạnh trái vát chéo (skew) nhẹ bằng clip-path polygon
        */}
        {shouldShowBadge && (
          <div
            className="absolute -top-1 right-0 z-30 select-none bg-[#E60012] pl-4 pr-3 py-0.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-white shadow-xs"
            style={{
              clipPath: "polygon(7px 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
          >
            {badgeLabel}
          </div>
        )}

        {/* THẺ TRẮNG BÊN TRONG: Bo góc ~14px, không đổ bóng đậm */}
        <div className="relative flex flex-1 flex-col overflow-hidden rounded-[14px] bg-white">
          {/* KHU VỰC ẢNH
              - Tỉ lệ dọc chuẩn 3:4
              - Ảnh dọc object-cover vừa khít khung thẻ sản phẩm, không bị thừa khoảng xám
          */}
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              priority={false}
            />

            {/* DẢI BANNER KHUYẾN MÃI DẠNG ẢNH:
                Đè trực tiếp lên đáy ảnh sản phẩm (Overlay)
                Dùng định dạng vector SVG hoặc ảnh sắc nét cao, không bị vỡ/bể hình, không bị thừa thiếu
            */}
            {promoBannerSrc && (
              <div className="absolute bottom-0 inset-x-0 z-10 h-9 sm:h-10 w-full overflow-hidden select-none pointer-events-none">
                <Image
                  src={promoBannerSrc}
                  alt="Chương trình khuyến mãi"
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-fill w-full h-full"
                  unoptimized={promoBannerSrc.endsWith('.svg')}
                  priority={false}
                />
              </div>
            )}

            {/* HỘP TRẮNG 2 ICON (Giỏ hàng & Con mắt)
                - Nằm giữa đáy ảnh đè lên dải banner
                - Bo góc nhỏ (~8px, rounded-lg), có đổ bóng nhẹ (shadow-md)
                - Icon màu đen, kích thước ~24px, khoảng cách đều
                - Responsive: Trên mobile hiện luôn, trên desktop hiện khi hover vào card
            */}
            <div className="absolute bottom-1.5 sm:bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center gap-3.5 sm:gap-4 rounded-lg bg-white px-3 sm:px-4 py-1.5 sm:py-2 shadow-md transition-all duration-200 opacity-100 sm:opacity-0 sm:pointer-events-none sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:pointer-events-auto sm:group-hover:translate-y-0">
              <button
                type="button"
                onClick={handleAddToCart}
                title="Thêm vào giỏ"
                aria-label="Thêm vào giỏ"
                className="flex items-center justify-center text-black hover:text-[#0B4DBB] transition-colors cursor-pointer"
              >
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.2]" />
              </button>
              <button
                type="button"
                onClick={handleOpenQuickView}
                title="Xem nhanh"
                aria-label="Xem nhanh"
                className="flex items-center justify-center text-black hover:text-[#0B4DBB] transition-colors cursor-pointer"
              >
                <Eye className="h-5 w-5 sm:h-6 sm:w-6 stroke-[2.2]" />
              </button>
            </div>
          </div>

          {/* THÔNG TIN BÊN DƯỚI ẢNH: Thiết kế cố định thẳng hàng, lùi sang phải cách viền thoáng đãng */}
          <div className="flex flex-1 flex-col justify-between pl-3.5 pr-2.5 pt-2 pb-2.5">
            <div>
              {/* Tên sản phẩm: Chữ đen, weight thường, hiển thị 1 dòng cố định */}
              <h3
                title={product.name}
                className="text-[13px] sm:text-[14px] md:text-[15px] font-normal text-black truncate leading-tight"
              >
                {product.name}
              </h3>

              {/* Dòng giá: CỐ ĐỊNH 1 HÀNG DUY NHẤT (flex-nowrap), thẳng hàng ngang tuyệt đối giữa các card */}
              <div className="mt-1.5 flex items-center gap-1.5 flex-nowrap whitespace-nowrap overflow-hidden h-5 sm:h-6">
                {/* Giá bán / Khoảng giá */}
                <span className="text-[14px] sm:text-[15px] font-black text-[#0B2A6F] tracking-tight shrink-0">
                  {priceDisplay}
                </span>

                {/* Giá gốc gạch ngang */}
                {product.originalPrice && !hasPriceRange && (
                  <span className="text-[11px] sm:text-xs font-medium text-zinc-400 line-through shrink-0">
                    {formatVnd(product.originalPrice)}
                  </span>
                )}

                {/* Badge pill đỏ % giảm: Không bao giờ bị rớt dòng */}
                {discountVal && (
                  <span className="rounded-full bg-[#E60012] px-1.5 py-0.5 text-[10px] font-black text-white leading-none shrink-0">
                    -{discountVal}%
                  </span>
                )}
              </div>
            </div>

            {/* HÀNG BIẾN THỂ (SWATCH): Cố định chiều cao h-10, có khoảng đệm trái để không bị dính viền */}
            <div className="mt-2.5 flex items-center w-full h-10">
              <div
                ref={swatchScrollRef}
                className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 pl-1 pr-1 scroll-smooth flex-1"
              >
                {product.colors.map((color, index) => {
                  const isSelected = selectedColor === color.name;
                  const swatchThumb =
                    color.image ||
                    (index === 1 && product.hoverImage ? product.hoverImage : product.image);

                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSelectVariant(color.name, swatchThumb);
                      }}
                      onMouseEnter={() => handleSelectVariant(color.name, swatchThumb)}
                      title={color.name}
                      className={`relative h-[34px] w-[34px] sm:h-[36px] sm:w-[36px] shrink-0 rounded-full overflow-hidden transition-all cursor-pointer ${
                        isSelected
                          ? "ring-2 ring-zinc-900 ring-offset-1 border border-white scale-105"
                          : "border border-zinc-200 hover:border-zinc-400"
                      }`}
                    >
                      <div className="relative h-full w-full bg-[#F2F2F2]">
                        <Image
                          src={swatchThumb}
                          alt={color.name}
                          fill
                          sizes="36px"
                          className="object-cover object-center"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Nút mũi tên "→" màu đen để cuộn tiếp */}
              <button
                type="button"
                onClick={handleScrollSwatches}
                title="Cuộn xem tiếp màu"
                aria-label="Cuộn xem tiếp màu"
                className="shrink-0 pl-1 pr-0.5 text-black hover:text-[#0B4DBB] transition-colors cursor-pointer"
              >
                <ArrowRight className="h-4 w-4 sm:h-4.5 sm:w-4.5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK VIEW MODAL KHI CLICK ICON CON MẮT */}
      {isQuickViewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
          onClick={() => setIsQuickViewOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white p-5 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsQuickViewOpen(false)}
              className="absolute right-4 top-4 z-10 rounded-full bg-zinc-100 p-2 text-zinc-600 hover:bg-zinc-200 hover:text-black transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Ảnh xem nhanh */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-zinc-100">
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 350px"
                />
              </div>

              {/* Thông tin sản phẩm */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="inline-block rounded-md bg-blue-50 px-2 py-0.5 text-xs font-bold text-[#0B4DBB] mb-2">
                    {product.category}
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-zinc-900 leading-snug">
                    {product.name}
                  </h2>

                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-black text-[#0B2A6F]">
                      {priceDisplay}
                    </span>
                    {product.originalPrice && !hasPriceRange && (
                      <span className="text-sm font-medium text-zinc-400 line-through">
                        {formatVnd(product.originalPrice)}
                      </span>
                    )}
                    {discountVal && (
                      <span className="rounded-full bg-[#E60012] px-2 py-0.5 text-xs font-black text-white">
                        -{discountVal}%
                      </span>
                    )}
                  </div>

                  {/* Biến thể màu sắc */}
                  <div className="mt-4">
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      Màu sắc: <span className="text-zinc-900 font-bold">{selectedColor}</span>
                    </label>
                    <div className="mt-2 flex items-center gap-2">
                      {product.colors.map((color, index) => {
                        const isSelected = selectedColor === color.name;
                        const swatchThumb =
                          color.image ||
                          (index === 1 && product.hoverImage ? product.hoverImage : product.image);
                        return (
                          <button
                            key={color.name}
                            onClick={() => handleSelectVariant(color.name, swatchThumb)}
                            className={`relative h-9 w-9 rounded-full overflow-hidden border-2 transition-all ${
                              isSelected
                                ? "ring-2 ring-zinc-900 ring-offset-1 border-white scale-105"
                                : "border-zinc-200 hover:border-zinc-400"
                            }`}
                          >
                            <Image
                              src={swatchThumb}
                              alt={color.name}
                              fill
                              sizes="36px"
                              className="object-cover"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Kích thước */}
                  <div className="mt-4">
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      Kích thước: <span className="text-zinc-900 font-bold">{selectedSize}</span>
                    </label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`rounded-md px-3 py-1.5 text-xs font-bold transition-all ${
                            selectedSize === size
                              ? "bg-zinc-900 text-white shadow-xs"
                              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Nút thêm vào giỏ */}
                <div className="mt-6 pt-4 border-t border-zinc-100">
                  <button
                    onClick={(e) => {
                      handleAddToCart(e);
                      setIsQuickViewOpen(false);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B4DBB] py-3 text-sm font-bold text-white shadow-md hover:bg-[#093d94] transition-colors cursor-pointer"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

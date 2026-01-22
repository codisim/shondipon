// components/FeaturedCategories.tsx

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { categories } from "@/data/categories";



export function FeaturedCategories() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-950 to-black">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-center text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          বিভাগসমূহ
        </h2>
        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full mb-12" />

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 5 },
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="pb-12"
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <div className="group relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                {/* Image */}
                <div className="relative h-64 w-full">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shadow-lg transform group-hover:rotate-12 transition-transform duration-500`}>
                    <span className="text-3xl font-bold text-white">{category.title[0]}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white text-center mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-300">{category.subtitle}</p>
                </div>

                {/* Link overlay */}
                <Link href={`/categories/${category.title.toLowerCase().replace(/\s+/g, "-")}`} className="absolute inset-0 z-10" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { popularItems } from '@/data/popular-items';

export function PopularPresentations() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            জনপ্রিয় পরিবেশনা
          </h2>
          <div className="w-32 h-1 mx-auto bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full" />
        </div>

        {/* Swiper Grid Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop={true}
          className="pb-16"
        >
          {popularItems.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="group relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 hover:border-amber-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                {/* Thumbnail */}
                <div className="relative aspect-video">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Play Icon Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-20 h-20 rounded-full bg-amber-500/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{item.artist}</p>
                </div>

                {/* YouTube Link */}
                <a
                  href={`https://www.youtube.com/watch?v=${item?.youtubeLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
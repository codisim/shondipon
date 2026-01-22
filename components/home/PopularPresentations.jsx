"use client";

import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { popularItems } from '@/data/popular-items';
import VideoCard from './VideoCard';

export function PopularPresentations() {
  const displayItems = popularItems.slice(0, 6);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            জনপ্রিয় পরিবেশনা
          </h2>
          <div className="w-32 h-1.5 mx-auto bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 rounded-full" />
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            ৬টি জনপ্রিয় পরিবেশনা দেখুন
          </p>
        </div>

        {/* Grid Layout - 3 per row × 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {displayItems.slice(0, 3).map((item, index) => (
            <VideoCard key={index} item={item} row={1} position={index + 1} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayItems.slice(3, 6).map((item, index) => (
            <VideoCard key={index + 3} item={item} row={2} position={index + 4} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 text-white font-semibold rounded-full hover:shadow-xl hover:shadow-amber-200 transition-all duration-300 hover:scale-105">
            <span className="relative z-10">সকল পরিবেশনা দেখুন</span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}

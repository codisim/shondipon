"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import { slides } from "@/data/hero-slider";



export function HeroSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Swiper Carousel */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1500}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              />

              {/* Overlay - Top to Bottom Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
                {/* Main Fancy Slogan */}
                <h1 className="mb-8 max-w-4xl text-4xl font-bold leading-tight tracking-wide md:text-5xl lg:text-6xl xl:text-7xl">
                  <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                    আমাদের সকল কার্যক্রম
                  </span>
                  <br />
                  <span className="mt-4 block bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-lg">
                    সুস্থ সংস্কৃতির বিকাশের জন্য
                  </span>
                </h1>

                {/* Slide Title */}
                <p className="mb-12 max-w-2xl text-xl font-light text-gray-200 md:text-2xl lg:text-3xl">
                  {slide.title}
                </p>

                {/* Call to Action Buttons */}
                <div className="flex flex-col gap-4 sm:flex-row">
                  <button className="rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-10 py-5 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:from-green-700 hover:to-emerald-700">
                    আমাদের গান শুনুন
                  </button>
                  <button className="rounded-full border-2 border-emerald-400 bg-transparent px-10 py-5 text-lg font-semibold text-white transition-all hover:bg-emerald-500/20">
                    আমাদের সাথে যুক্ত হোন
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Optional decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";


// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { slides } from "@/data/hero-slider";

export function HeroSection2() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Swiper Carousel */}
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        speed={1800}
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true,
          bulletClass: "swiper-pagination-bullet !bg-amber-400/50 !w-2.5 !h-2.5",
          bulletActiveClass: "swiper-pagination-bullet-active !bg-gradient-to-r !from-amber-500 !to-pink-500 !w-8"
        }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Background Image with Next.js Image Component */}
              <div className="absolute inset-0">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                  quality={85}
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
              
              {/* Animated Gradient Overlay */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-amber-500/20 to-transparent animate-pulse" />
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-pink-500/20 to-transparent animate-pulse" />
              </div>

              {/* Floating Music Notes Animation */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute text-white/10"
                    style={{
                      left: `${15 + i * 15}%`,
                      top: `${20 + i * 10}%`,
                      animation: `float 15s ease-in-out infinite ${i * 2}s`,
                    }}
                  >
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                  </div>
                ))}
              </div>

              {/* Content Container */}
              <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                {/* Main Tagline */}
                <div className="mb-8">
                  <span className="inline-block px-6 py-2 bg-gradient-to-r from-amber-500/20 to-pink-500/20 backdrop-blur-sm rounded-full border border-amber-500/30 text-amber-200 text-sm font-medium tracking-widest mb-6">
                    সঙ্গীত শিক্ষা প্ল্যাটফর্ম
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="mb-8 max-w-5xl">
                  <span className="block text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight mb-6">
                    <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                      বাংলা গানের
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-pink-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                      সম্পূর্ণ বিশ্ব
                    </span>
                  </span>
                </h1>

                {/* Slide Title with Decorative Lines */}
                <div className="relative mb-12 max-w-3xl">
                  <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent -translate-y-1/2" />
                  <p className="relative inline-block px-8 py-4 text-2xl md:text-3xl font-light text-white bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10">
                    {slide.title}
                  </p>
                  <div className="absolute -left-4 -right-4 bottom-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
                </div>

                {/* Stats Bar */}
                <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12">
                  {[
                    { label: "সক্রিয় শিক্ষার্থী", value: "৫,০০০+", icon: "👨‍🎓" },
                    { label: "গানের সংগ্রহ", value: "১০,০০০+", icon: "🎵" },
                    { label: "ভিডিও টিউটোরিয়াল", value: "২,৫০০+", icon: "🎬" },
                    { label: "বিভাগ", value: "৫০+", icon: "📚" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center group">
                      <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-2 rounded-2xl bg-gradient-to-br from-amber-500/20 to-pink-500/20 border border-amber-500/30 flex items-center justify-center text-2xl md:text-3xl backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-amber-200/80">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Call to Action Buttons */}
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  <button className="group relative px-10 py-5 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/30">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500" />
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center gap-3 text-lg font-semibold text-white">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      গান শুনুন
                    </span>
                  </button>
                  
                  <button className="group relative px-10 py-5 rounded-full overflow-hidden transition-all duration-500 hover:scale-105 border-2 border-amber-400 bg-transparent hover:bg-amber-500/10">
                    <span className="relative z-10 flex items-center gap-3 text-lg font-semibold text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      সম্প্রদায়ে যোগ দিন
                    </span>
                  </button>
                </div>
              </div>

              {/* Scroll Indicator */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 rounded-full border-2 border-amber-400/50 flex items-start justify-center p-1">
                  <div className="w-1.5 h-3 rounded-full bg-gradient-to-b from-amber-400 to-pink-400 animate-scroll" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev !w-14 !h-14 !rounded-full !bg-black/40 !backdrop-blur-sm !border !border-amber-500/30 !text-amber-400 hover:!bg-black/60 after:!text-lg"></div>
      <div className="swiper-button-next !w-14 !h-14 !rounded-full !bg-black/40 !backdrop-blur-sm !border !border-amber-500/30 !text-amber-400 hover:!bg-black/60 after:!text-lg"></div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/50 to-transparent" />

      {/* Style for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
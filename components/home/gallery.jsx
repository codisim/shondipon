"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryPhotos } from '../../data/gallery';


export function PhotoGallerySection() {
  const [currentImage, setCurrentImage] = useState(null);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-amber-50/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
            <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
            <span className="bg-gradient-to-r from-amber-500 to-pink-500 bg-clip-text text-transparent">
              আমাদের গ্যালারি
            </span>
          </h2>
          <p className="text-gray-600">
            শিশু শিল্পীদের বিশেষ মুহূর্তগুলো
          </p>
        </div>

        {/* Simple Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryPhotos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group"
              onClick={() => setCurrentImage(index)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              
              {/* Hover overlay with eye icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                  <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

       {/* Simple Counter */}
        <div className="text-center pt-6">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-amber-200 shadow-sm">
            <span className="text-amber-600 font-semibold">
              {galleryPhotos.length}
            </span>
            <span className="text-gray-600">টি ছবি</span>
          </div>
        </div>

      {/* Simple Lightbox */}
      {currentImage !== null && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setCurrentImage(null)}
        >
          {/* Close button */}
          <button 
            className="absolute top-4 right-4 text-white text-3xl hover:text-amber-400 transition-colors z-50"
            onClick={() => setCurrentImage(null)}
          >
            ✕
          </button>
          
          {/* Image */}
          <div className="relative w-full max-w-4xl h-3/4" onClick={(e) => e.stopPropagation()}>
            <Image
              src={galleryPhotos[currentImage].src}
              alt={galleryPhotos[currentImage].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
            
            {/* Image info */}
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-white text-sm bg-black/50 inline-block px-4 py-2 rounded-full">
                {currentImage + 1} / {galleryPhotos.length}
              </p>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-amber-400 transition-colors z-50"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImage(prev => prev === 0 ? galleryPhotos.length - 1 : prev - 1);
            }}
          >
            ‹
          </button>
          
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-amber-400 transition-colors z-50"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImage(prev => prev === galleryPhotos.length - 1 ? 0 : prev + 1);
            }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
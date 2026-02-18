"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "./Lightbox";
import { galleryData } from "./GalleryData";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryData[0] | null>(null);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">
            School Photo Gallery
          </h2>
          <p className="mt-4 text-text-muted max-w-2xl mx-auto">
            Explore moments from our classrooms, campus life, and events.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryData.map((item) => (
            <div
              key={item.id}
              className="group relative cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => setSelectedImage(item)}
              role="button"
              tabIndex={0}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized={true} // prevents 500 error for external images
                />
              </div>

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-white/80 text-sm font-medium mb-1 uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-white text-xl font-bold">{item.alt}</h3>
              </div>
            </div>
          ))}
        </div>

        {selectedImage && (
          <Lightbox
            item={selectedImage}
            onClose={() => setSelectedImage(null)}
            onNext={() => {
              const currentIndex = galleryData.findIndex((i) => i.id === selectedImage.id);
              const nextIndex = (currentIndex + 1) % galleryData.length;
              setSelectedImage(galleryData[nextIndex]);
            }}
            onPrev={() => {
              const currentIndex = galleryData.findIndex((i) => i.id === selectedImage.id);
              const prevIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
              setSelectedImage(galleryData[prevIndex]);
            }}
          />
        )}
      </div>
    </section>
  );
}

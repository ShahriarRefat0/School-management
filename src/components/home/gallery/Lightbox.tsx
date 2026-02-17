"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
    id: number;
    src: string;
    alt: string;
    category: string;
    caption: string;
}

interface LightboxProps {
    item: GalleryItem;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

export default function Lightbox({ item, onClose, onNext, onPrev }: LightboxProps) {
    const handleKeyDown = useCallback(
        (e: globalThis.KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNext();
            if (e.key === "ArrowLeft") onPrev();
        },
        [onClose, onNext, onPrev]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden"; // Prevent scrolling
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [handleKeyDown]);

    return (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
            <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2 z-60"
                aria-label="Close"
            >
                <X size={32} />
            </button>

            <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 z-60 hidden md:block"
                aria-label="Previous"
            >
                <ChevronLeft size={48} />
            </button>

            <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 z-60 hidden md:block"
                aria-label="Next"
            >
                <ChevronRight size={48} />
            </button>

            <div className="relative w-full max-w-5xl h-[80vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <div className="relative w-full h-full">
                    <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <div className="mt-4 text-center max-w-2xl">
                    <h3 className="text-white text-2xl font-bold mb-2">{item.alt}</h3>
                    <p className="text-white/80">{item.caption}</p>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-8 md:hidden z-60">
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                    className="text-white/70 hover:text-white p-2"
                >
                    <ChevronLeft size={32} />
                </button>
                <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    className="text-white/70 hover:text-white p-2"
                >
                    <ChevronRight size={32} />
                </button>
            </div>
        </div>
    );
}





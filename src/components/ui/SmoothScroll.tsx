"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        
        const lenis = new Lenis({
            duration: 0.6,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });

        lenisRef.current = lenis;

       
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        
        const handleInitialHash = () => {
            if (window.location.hash) {
                const id = window.location.hash.substring(1);
                const element = document.getElementById(id);
                if (element) {
                    lenis.scrollTo(element, { offset: -80 });
                }
            }
        };

        
        const timer = setTimeout(handleInitialHash, 500);

        return () => {
            lenis.destroy();
            clearTimeout(timer);
        };
    }, []);

    return <>{children}</>;
}

"use client"

import React from "react"
import { School } from "lucide-react"

interface LogoProps {
    className?: string
    variant?: "light" | "dark" | "blue"
    size?: "sm" | "md" | "lg" // নতুন সাইজ প্রপ যোগ করা হয়েছে
    title?: string
    subtitle?: string
}

export default function Logo({ 
    className = "", 
    variant = "light", 
    size = "md", // ডিফল্ট সাইজ md
    title = "Schoology", 
    subtitle = "BD" 
}: LogoProps) {
    
    // ১. কালার ভেরিয়েশন
    const textColorClass = variant === "light"
        ? "text-white"
        : variant === "dark"
            ? "text-slate-900 dark:text-white"
            : "text-blue-600"

    // ২. সাইজ অনুযায়ী ডাইনামিক ক্লাস (sm সাইজটি ড্যাশবোর্ডের জন্য পারফেক্ট)
    const sizeClasses = {
        sm: {
            container: "h-7 w-5 rounded-lg",
            icon: "size-4",
            text: "text-base",
            gap: "gap-2"
        },
        md: {
            container: "h-10 w-10 rounded-xl",
            icon: "size-6",
            text: "text-xl",
            gap: "gap-3"
        },
        lg: {
            container: "h-12 w-12 rounded-2xl",
            icon: "size-7",
            text: "text-2xl",
            gap: "gap-4"
        }
    }

    const currentSize = sizeClasses[size];

    return (
        <div className={`flex items-center font-black ${currentSize.gap} ${currentSize.text} ${textColorClass} ${className}`}>
            {/* আইকন বক্স */}
            <div className={`flex ${currentSize.container} items-center justify-center bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition-transform group-hover:rotate-3`}>
                <School className={currentSize.icon} />
            </div>
            
            {/* টেক্সট */}
            <div className="flex flex-col leading-tight">
                <span className="tracking-tighter">
                    {title}<span className="text-blue-500 ml-0.5">{subtitle}</span>
                </span>
            </div>
        </div>
    )
}
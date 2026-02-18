"use client"

import React from "react"
import { School } from "lucide-react"

interface LogoProps {
    className?: string
    variant?: "light" | "dark" | "blue"
    title?: string
    subtitle?: string
}

export default function Logo({ className = "", variant = "light", title = "Schoology", subtitle = "BD" }: LogoProps) {
    const textColorClass = variant === "light"
        ? "text-white"
        : variant === "dark"
            ? "text-slate-900 dark:text-white"
            : "text-blue-600"

    return (
        <div className={`flex items-center gap-3 font-bold text-xl ${textColorClass} ${className}`}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 group-hover:rotate-3 transition-transform">
                <School className="size-6" />
            </div>
            <div className="flex flex-col gap-0 leading-tight">
                <span className="tracking-tight">
                    {title} <span className="text-blue-500">{subtitle}</span>
                </span>
            </div>
        </div>
    )
}

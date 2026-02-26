"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Logo from "@/components/shared/logo/logo"
import { LogOut } from "lucide-react"
import { DashboardMenuItem } from "./types"
import { motion } from "framer-motion"

interface DashboardSidebarProps {
    menuItems: DashboardMenuItem[]
    onLinkClick?: () => void
    activeColor?: string
}

export function DashboardSidebar({
    menuItems,
    onLinkClick,
    activeColor = "bg-blue-600"
}: DashboardSidebarProps) {
    const pathname = usePathname()

    const isActive = (path: string) => {
        const pathSegments = path.split('/').filter(Boolean);
        const isBaseDashboard = pathSegments.length === 2 && pathSegments[0] === 'dashboard';

        if (isBaseDashboard) return pathname === path
        return pathname.startsWith(path) && path !== "/"
    }

    return (
        <aside className="flex flex-col h-full w-full bg-slate-900 border-r border-white/5 transition-all duration-300">

            {/* Header: Logo */}
            <div className="h-20 flex items-center px-6 border-b border-white/10 relative overflow-hidden">
                <Link href="/" className="relative z-10 transition-transform active:scale-95 duration-200">
                    <Logo variant="light" />
                </Link>
                {/* Brand Glow Effect */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Navigation Content */}
            <nav className="flex-1 overflow-y-auto px-4 py-8 space-y-1.5 custom-scrollbar">
                {menuItems.map((item) => {
                    const active = isActive(item.url)

                    return (
                        <Link
                            key={item.title}
                            href={item.url}
                            onClick={onLinkClick}
                            className={`
                                relative flex items-center justify-between px-4 h-11 rounded-xl transition-all duration-200 group
                                ${active
                                    ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                                }
                            `}
                        >
                            {/* Active Side Indicator */}
                            {active && (
                                <div className="absolute left-0 top-2 bottom-2 w-1 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                            )}

                            <div className="flex items-center gap-3 relative z-10 font-bold">
                                <item.icon className={`h-5 w-5 transition-all duration-200 ${active ? "text-blue-400" : "text-slate-400 group-hover:text-slate-200 group-hover:scale-110"}`} />
                                <span className={`text-sm tracking-wide ${active ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}>{item.title}</span>
                            </div>

                            {item.badge && (
                                <span className={`
                                    flex h-5 min-w-[20px] px-1.5 items-center justify-center rounded-full text-[10px] font-black tracking-tighter transition-all duration-200
                                    ${active ? "bg-blue-500 text-white" : "bg-slate-700 text-slate-300"}
                                `}>
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer: Logout */}
            <div className="p-4 border-t border-white/5 space-y-4">
                <button
                    className="flex items-center gap-3 w-full px-4 h-12 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300 group font-bold"
                    onClick={() => console.log("Logging out...")}
                >
                    <LogOut className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
                    <span className="text-sm">Log out</span>
                </button>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
            `}</style>
        </aside>
    )
}

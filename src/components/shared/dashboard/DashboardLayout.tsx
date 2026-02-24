"use client"

import React, { useState } from "react"
import { usePathname } from "next/navigation"
import { DashboardHeader } from "./DashboardHeader"
import { DashboardMenuItem, UserProfile } from "./types"
import { motion, AnimatePresence } from "framer-motion"
import { DashboardSidebar } from "./DashboardSidebar"

interface DashboardLayoutProps {
    children: React.ReactNode
    menuItems: DashboardMenuItem[]
    title: string
    user?: UserProfile
    activeColor?: string
}

export default function DashboardLayout({
    children,
    menuItems,
    title,
    user,
    activeColor
}: DashboardLayoutProps) {
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const pathname = usePathname()

    return (
        <div className="min-h-screen bg-bg-page overflow-x-hidden">

            {/* Desktop Sidebar (Always Visible) */}
            <div className="hidden md:block fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-white/5">
                <DashboardSidebar menuItems={menuItems} activeColor={activeColor} />
            </div>

            {/* Mobile Sidebar & Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden"
                        />

                        {/* Slide-in Sidebar */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 md:hidden shadow-2xl"
                        >
                            <DashboardSidebar
                                menuItems={menuItems}
                                onLinkClick={() => setIsMobileOpen(false)}
                                activeColor={activeColor}
                            />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="md:pl-64 flex flex-col min-h-screen">
                <DashboardHeader
                    title={title}
                    onMenuClick={() => setIsMobileOpen(true)}
                    user={user}
                />

                <main className="p-4 md:p-6 lg:p-8 flex-1">
                    {children}
                </main>
            </div>
        </div>
    )
}

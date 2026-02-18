"use client"

import React, { useState } from "react"
import { StudentSidebar } from "./student-sidebar"
import { StudentHeader } from "./StudentHeader"

export default function StudentDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    return (
        <div className="min-h-screen bg-[#F8FAFC]">

            {/* Desktop Sidebar (Always Visible) */}
            <div className="hidden md:block fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-white/5">
                <StudentSidebar />
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm md:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Mobile Sidebar (Slide-in) */}
            <div className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 transform transition-transform duration-300 ease-in-out md:hidden
                ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <StudentSidebar onLinkClick={() => setIsMobileOpen(false)} />
            </div>

            {/* Main Content Area - pushed by sidebar width on desktop */}
            <div className="md:pl-64 flex flex-col min-h-screen transition-all duration-300">
                <StudentHeader
                    title="Student Dashboard"
                    onMenuClick={() => setIsMobileOpen(true)}
                />

                <main className="p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}

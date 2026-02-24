"use client"

import React, { useState } from "react"
// ইমপোর্ট করার সময় বড় হাতের অক্ষর এবং কার্লি ব্র্যাকেট ব্যবহার করুন
import { SuperAdminSidebar } from "./SuperAdminSidebar"
import { SuperAdminHeader } from "./SuperAdminHeader"

export default function SuperAdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    return (
        <div className="min-h-screen bg-slate transition-colors duration-300">

            {/* Desktop Sidebar */}
            <div className="hidden md:block fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-white/5">
                <SuperAdminSidebar />
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
                <SuperAdminSidebar onLinkClick={() => setIsMobileOpen(false)} />
            </div>

            {/* Main Content Area */}
            <div className="md:pl-64 flex flex-col min-h-screen transition-all duration-300">
                {/* হেডার কম্পোনেন্টটি এভাবে লিখুন */}
                <SuperAdminHeader 
                    title="Super Admin Dashboard"
                    onMenuClick={() => setIsMobileOpen(true)}
                />

                <main className="p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
    Bell,
    Search,
    ChevronDown,
    Menu,
} from "lucide-react"
import Logo from "@/components/shared/logo/logo"
import ThemeToggle from "@/components/theme/ThemeToggle"

interface StudentHeaderProps {
    title: string
    onMenuClick?: () => void
}

export function StudentHeader({ title, onMenuClick }: StudentHeaderProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false)

    return (
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border-light bg-bg-card/80 px-6 backdrop-blur-md transition-colors">
            {/* Mobile Menu & Logo */}
            <div className="flex items-center gap-3 md:hidden">
                <button
                    onClick={onMenuClick}
                    className="text-slate-500 hover:text-slate-700 p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                    <Menu className="h-6 w-6" />
                </button>
                <Link href="/">
                    <Logo variant="dark" className="scale-75 origin-left" />
                </Link>
            </div>

            <div className="flex-1">
                <h1 className="text-xl font-black text-text-primary tracking-tight hidden sm:block md:block">{title}</h1>
            </div>

            <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="h-10 w-64 rounded-xl bg-bg-page border border-border-light pl-10 focus:ring-2 focus:ring-blue-500 font-bold text-text-secondary outline-none transition-all"
                    />
                </div>

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Notification */}
                <button className="relative p-2.5 text-text-secondary hover:bg-bg-page rounded-xl transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-bg-card"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 h-11 rounded-xl hover:bg-bg-page border border-border-light pl-1.5 pr-4 bg-bg-card shadow-sm transition-all"
                    >
                        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-blue-600/20">
                            AS
                        </div>

                        <div className="hidden flex-col items-start gap-0 md:flex">
                            <span className="text-sm font-black text-text-primary leading-none">Alex Smith</span>
                            <span className="text-[10px] uppercase tracking-widest text-text-muted font-black mt-1">Class 10 - A</span>
                        </div>
                        <ChevronDown className="h-4 w-4 text-text-muted" />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-56 rounded-md border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-800 dark:bg-slate-950">
                            <div className="px-2 py-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100">
                                My Account
                            </div>
                            <div className="h-px bg-slate-200 dark:bg-slate-800 my-1" />
                            <a href="#" className="block px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-sm mx-1">
                                Profile
                            </a>
                            <a href="#" className="block px-2 py-1.5 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 rounded-sm mx-1">
                                Settings
                            </a>
                            <div className="h-px bg-slate-200 dark:bg-slate-800 my-1" />
                            <button className="block w-full text-left px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 rounded-sm mx-1 font-medium">
                                Log out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

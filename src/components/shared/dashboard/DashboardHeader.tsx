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
import { UserProfile } from "./types"
import { motion, AnimatePresence } from "framer-motion"

interface DashboardHeaderProps {
    title: string
    onMenuClick?: () => void
    user?: UserProfile
}

const defaultUser: UserProfile = {
    name: "Alex Smith",
    role: "Student",
    initials: "AS",
    subText: "Class 10 - A"
}

export function DashboardHeader({ title, onMenuClick, user = defaultUser }: DashboardHeaderProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false)

    return (
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border-light bg-bg-card/80 px-6 backdrop-blur-md">
            {/* Mobile Menu & Logo */}
            <div className="flex items-center gap-4 md:hidden">
                <button
                    onClick={onMenuClick}
                    className="text-slate-500 hover:text-slate-900 p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                    <Menu className="h-6 w-6" />
                </button>
                <Link href="/" className="flex items-center">
                    <Logo variant="dark" className="scale-90 origin-left" />
                </Link>
            </div>

            <div className="flex-1">
                <h1 className="text-xl font-bold text-text-primary tracking-tight hidden sm:block md:block">
                    {title}
                </h1>
            </div>

            <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative hidden lg:block group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-blue-500" />
                    <input
                        type="search"
                        placeholder="Search for everything..."
                        className="h-11 w-72 rounded-xl bg-slate-50 border border-slate-200 pl-11 pr-4 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/50 font-bold text-slate-700 outline-none transition-all placeholder:text-slate-400 placeholder:font-medium dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200"
                    />
                </div>

                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />

                <div className="flex items-center gap-1 sm:gap-4 font-bold">
                    {/* Theme Toggle */}
                    <ThemeToggle />

                    {/* Notification */}
                    <button className="relative p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 rounded-xl transition-all group">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-950"></span>
                    </button>
                </div>

                <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2.5 h-12 p-1.5 rounded-2xl hover:bg-slate-50 border border-slate-200 bg-white shadow-sm transition-all dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 group"
                    >
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-xs font-black shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                            {user.initials}
                        </div>

                        <div className="hidden flex-col items-start gap-1 md:flex px-1">
                            <span className="text-sm font-black text-slate-900 dark:text-slate-100 leading-none">{user.name}</span>
                            {user.subText && (
                                <span className="text-[9px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-black">{user.subText}</span>
                            )}
                        </div>
                        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 mr-1 ${isProfileOpen ? 'rotate-180 text-blue-500' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <>
                                {/* Invisible Backdrop to close on click outside */}
                                <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)} />

                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 5 }}
                                    transition={{ duration: 0.1 }}
                                    className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-950 z-20"
                                >
                                    <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-text-muted">
                                        My Account
                                    </div>
                                    <div className="h-px bg-slate-200 dark:bg-slate-800 my-1 mx-2" />

                                    <Link href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 rounded-lg transition-all">
                                        <div className="h-2 w-2 rounded-full bg-slate-400" />
                                        Profile Details
                                    </Link>

                                    <Link href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 rounded-lg transition-all">
                                        <div className="h-2 w-2 rounded-full bg-slate-300" />
                                        Account Settings
                                    </Link>

                                    <div className="h-px bg-slate-200 dark:bg-slate-800 my-1 mx-2" />

                                    <button className="flex items-center w-full gap-3 px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all">
                                        Log out
                                    </button>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    )
}

"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Bell, ChevronDown, Menu, LogOut, X, AlertCircle, User } from "lucide-react"
import Logo from "@/components/shared/logo/logo"
import ThemeToggle from "@/components/theme/ThemeToggle"
import { motion, AnimatePresence } from "framer-motion"

export function DashboardHeader({ onMenuClick, user }: any) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    return (
        <>
            {/* ১. হেডার সেকশন */}
            <header className="sticky top-0 z-50 flex h-16 items-center border-b border-border-light bg-bg-card/80 px-2 md:px-6 backdrop-blur-md">
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button onClick={onMenuClick} className="md:hidden p-1.5 text-slate-500 rounded-lg hover:bg-secondary/30">
                            <Menu className="h-6 w-6" /> 
                        </button>
                        <Link href="/" className="flex items-center">
                            <Logo variant="dark" size="sm" />
                        </Link>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
                        <ThemeToggle />
                        <button className="relative p-2 text-slate-500 rounded-xl hover:bg-secondary/30">
                            <Bell className="h-5 w-5 md:h-6 md:w-6" />
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-bg-card"></span>
                        </button>

                        <div className="relative">
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center gap-2 p-1 pr-2 rounded-xl border-2 border-primary/20 bg-bg-page shadow-sm min-w-[75px] justify-center hover:border-primary/40 transition-all"
                            >
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-[10px] font-black shadow-md">
                                    SR
                                </div>
                                <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180 text-primary' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <>
                                        <div className="fixed inset-0 z-[60]" onClick={() => setIsProfileOpen(false)} />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-2 w-52 rounded-2xl border border-border-light bg-bg-card p-2 shadow-2xl z-[70]"
                                        >
                                            <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-border-light mb-1">Account</div>
                                            <button className="flex items-center gap-3 w-full px-3 py-3 text-sm font-bold text-text-primary hover:bg-secondary/30 rounded-xl transition-all">
                                                <User size={18} className="text-primary" /> My Profile
                                            </button>
                                            <button 
                                                onClick={() => { setShowLogoutModal(true); setIsProfileOpen(false); }}
                                                className="flex items-center gap-3 w-full px-3 py-3 text-sm font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                                            >
                                                <LogOut size={18} /> Log out
                                            </button>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </header>

            {/* ২. লগ-আউট মোডাল (মোবাইলে বড় এবং ফিক্সড করা হয়েছে) */}
            <AnimatePresence>
                {showLogoutModal && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setShowLogoutModal(false)}
                            className="absolute inset-0 bg-slate-900/70 backdrop-blur-md"
                        />
                        
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }} 
                            animate={{ scale: 1, opacity: 1, y: 0 }} 
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-[92%] max-w-[400px] bg-bg-card rounded-[32px] p-8 shadow-2xl border border-border-light overflow-hidden"
                        >
                            <button 
                                onClick={() => setShowLogoutModal(false)}
                                className="absolute top-5 right-5 p-2 text-text-muted hover:bg-secondary rounded-full"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex flex-col items-center text-center">
                                {/* বড় আইকন */}
                                <div className="h-20 w-20 bg-red-100 dark:bg-red-950/30 rounded-full flex items-center justify-center mb-6 text-red-500">
                                    <AlertCircle size={40} strokeWidth={2.5} />
                                </div>

                                <h3 className="text-2xl font-black text-text-primary tracking-tight">Confirm Logout</h3>
                                <p className="text-text-muted mt-3 font-medium text-base px-2">
                                    Are you sure you want to sign out from <span className="text-primary font-bold">Schoology BD</span>?
                                </p>
                                
                                <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 w-full mt-10">
                                    <button 
                                        onClick={() => setShowLogoutModal(false)} 
                                        className="order-2 sm:order-1 py-4 rounded-2xl border-2 border-border-light font-bold text-text-secondary hover:bg-secondary transition-all active:scale-95"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        className="order-1 sm:order-2 py-4 rounded-2xl bg-red-500 text-white font-black shadow-xl shadow-red-500/30 hover:bg-red-600 transition-all active:scale-95"
                                    >
                                        Yes, Log Out
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
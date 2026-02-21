"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Mail, Lock, Eye, EyeOff, ArrowRight,
    Settings, ShieldCheck, ArrowLeft,
    ChevronRight,
    LockKeyhole
} from 'lucide-react';
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import { motion } from "framer-motion";

const AdminLoginPage = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/dashboard/admin');
    };

    return (
        <div className="flex flex-col min-h-screen bg-bg-page relative overflow-hidden">
            <Navbar />

            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] -right-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
            </div>

            <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
                <div className="w-full max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="bg-bg-card/80 backdrop-blur-3xl p-8 md:p-12 rounded-[3rem] border border-border-light shadow-[0_30px_60px_rgba(0,0,0,0.08)] relative overflow-hidden">
                            {/* Accent Bar */}
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-500" />

                            <Link href="/login" className="inline-flex items-center gap-2 text-text-muted hover:text-emerald-600 font-bold transition-colors mb-8 text-sm group">
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Role Selection
                            </Link>

                            <div className="mb-10">
                                <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 mb-6">
                                    <Settings size={28} />
                                </div>
                                <h1 className="text-3xl font-black text-text-primary tracking-tight">Admin Portal</h1>
                                <p className="text-text-muted font-bold mt-2">Manage your school administration and staff accounts.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-black text-text-primary uppercase tracking-[0.2em] ml-1">Admin Email / ID</label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-emerald-600 transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="admin@school.com"
                                            className="w-full h-14 pl-14 pr-6 rounded-2xl bg-bg-page border border-border-light focus:bg-bg-card focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all font-bold text-text-primary"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-[11px] font-black text-text-primary uppercase tracking-[0.2em]">Password</label>
                                        <Link href="#" className="text-xs font-black text-emerald-600 hover:underline">Forgot?</Link>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-emerald-600 transition-colors">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full h-14 pl-14 pr-14 rounded-2xl bg-bg-page border border-border-light focus:bg-bg-card focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all font-bold text-text-primary"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full h-16 rounded-2xl font-black uppercase tracking-[0.25em] text-white shadow-2xl transition-all flex items-center justify-center gap-3 group active:scale-[0.98] mt-8 bg-emerald-600 shadow-emerald-500/20"
                                >
                                    <span>Access Admin Dashboard</span>
                                    <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                                </button>
                            </form>

                            <div className="mt-10 pt-8 border-t border-border-light">
                                <p className="text-center text-sm font-bold text-text-muted mb-4 text-balance">
                                    Authorized staff only. Unauthorized access is strictly prohibited and monitored.
                                </p>
                                <div className="flex items-center justify-center gap-2 text-emerald-600">
                                    <LockKeyhole size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Encrypted</span>
                                </div>
                            </div>

                            <p className="text-center mt-8 text-text-muted font-bold border-t border-border-light pt-8">
                                Don't have an admin account? <Link href="/register/admin" className="text-emerald-600 hover:underline">Register Portal</Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AdminLoginPage;

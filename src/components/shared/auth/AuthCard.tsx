"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, ShieldCheck, LockKeyhole } from 'lucide-react';
import { motion } from "framer-motion";

interface AuthCardProps {
    role: string;
    roleTitle: string;
    icon: React.ReactNode;
    color: string;
    type?: 'login' | 'register';
}

const AuthCard: React.FC<AuthCardProps> = ({ role, roleTitle, icon, color, type = 'login' }) => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login logic
        console.log(`${type} for ${role}:`, { email, password });
        router.push(`/dashboard/${role === 'superAdmin' ? 'admin' : role}`);
    };

    const accentGradient = {
        blue: "from-blue-600 to-indigo-700",
        indigo: "from-indigo-600 to-violet-700",
        emerald: "from-emerald-600 to-teal-700",
        rose: "from-rose-600 to-pink-700",
        amber: "from-amber-500 to-orange-600",
        cyan: "from-cyan-500 to-blue-600",
    }[color] || "from-primary to-indigo-600";

    return (
        <div className="flex flex-col min-h-screen bg-bg-page relative overflow-hidden text-text-primary">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-[0.03] bg-${color}-600`} />
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />
            </div>

            <main className="flex-grow flex items-center justify-center p-6 pt-24 pb-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-bg-card/80 backdrop-blur-3xl rounded-[2.5rem] border border-border-light shadow-2xl overflow-hidden">
                        {/* Header Decoration */}
                        <div className={`h-2 bg-gradient-to-r ${accentGradient}`} />

                        <div className="p-8 lg:p-10">
                            {/* Navigation */}
                            <Link href="/login" className="inline-flex items-center gap-2 text-xs font-black text-text-muted hover:text-primary transition-colors uppercase tracking-widest mb-10 group">
                                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Hub
                            </Link>

                            <div className="mb-10 text-center md:text-left">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0 shadow-lg
                                    ${color === 'blue' ? 'bg-blue-600/10 text-blue-600' :
                                        color === 'indigo' ? 'bg-indigo-600/10 text-indigo-600' :
                                            color === 'emerald' ? 'bg-emerald-600/10 text-emerald-600' :
                                                color === 'rose' ? 'bg-rose-600/10 text-rose-600' :
                                                    color === 'amber' ? 'bg-amber-600/10 text-amber-600' : 'bg-cyan-600/10 text-cyan-600'}`}
                                >
                                    {icon}
                                </div>
                                <h1 className="text-3xl font-black tracking-tight">{roleTitle} <span className="text-primary font-medium">{type === 'login' ? 'Login' : 'Register'}</span></h1>
                                <p className="text-text-muted font-bold text-sm mt-2 opacity-70">
                                    Secure access for {roleTitle.toLowerCase()} portal.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-text-primary ml-1">Identity</label>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
                                            <Mail size={16} />
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your-id@school.com"
                                            className="w-full h-12 pl-12 pr-6 rounded-2xl bg-bg-page border border-border-light focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-text-primary">Password</label>
                                        <Link href="#" className="text-[10px] font-black text-primary hover:underline">Forgot?</Link>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors">
                                            <Lock size={16} />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full h-12 pl-12 pr-12 rounded-2xl bg-bg-page border border-border-light focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all font-bold text-sm"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className={`w-full h-14 rounded-2xl font-black uppercase tracking-[0.2em] text-white shadow-xl transition-all flex items-center justify-center gap-2 group mt-8 bg-gradient-to-r ${accentGradient}`}
                                >
                                    <span>{type === 'login' ? 'Enter Portal' : 'Create Account'}</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                                </button>
                            </form>

                            <div className="mt-10 pt-6 border-t border-border-light flex flex-col items-center gap-4">
                                <div className="flex items-center gap-2 text-text-muted/40">
                                    <LockKeyhole size={12} />
                                    <span className="text-[9px] font-black uppercase tracking-widest">End-to-End Encrypted</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default AuthCard;

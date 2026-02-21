"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Mail, Lock, Eye, EyeOff, ArrowRight,
    ShieldCheck,
    Building2, KeyRound, UserCheck, ArrowLeft,
    CheckCircle2
} from 'lucide-react';
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import { motion, AnimatePresence } from "framer-motion";

const RegisterSuperAdmin = () => {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(3); // Success step
    };

    return (
        <div className="flex flex-col min-h-screen bg-bg-page relative overflow-hidden">
            <Navbar />

            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-rose-500/5 rounded-full blur-[120px]" />
            </div>

            <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
                <div className="w-full max-w-4xl">

                    {/* Stepper Header */}
                    <div className="flex justify-center mb-12">
                        <div className="flex items-center gap-4">
                            {[1, 2, 3].map((s) => (
                                <React.Fragment key={s}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500
                                        ${step >= s ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/20 scale-110' : 'bg-bg-card border border-border-light text-text-muted'}`}>
                                        {step > s ? <CheckCircle2 size={18} /> : s}
                                    </div>
                                    {s < 3 && <div className={`w-12 h-1 rounded-full transition-all duration-500 ${step > s ? 'bg-rose-600' : 'bg-border-light'}`} />}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="bg-bg-card/80 backdrop-blur-3xl rounded-[3rem] border border-border-light shadow-[0_30px_60px_rgba(0,0,0,0.08)] overflow-hidden relative">
                        {/* Role Accent Bar */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-rose-500" />

                        <AnimatePresence mode="wait">
                            {/* Step 1: Security Verification */}
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="p-8 md:p-12"
                                >
                                    <div className="mb-10 text-center md:text-left">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-600 bg-rose-500/10 px-4 py-1.5 rounded-full mb-4 inline-block">
                                            Owner Provisioning: Stage 01
                                        </span>
                                        <h2 className="text-3xl font-black text-text-primary tracking-tight mt-3">Website Owner Setup</h2>
                                        <p className="text-text-muted font-medium mt-2">Initialize your master control over the entire system infrastructure.</p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-text-primary uppercase tracking-[0.2em] ml-1">System Organization</label>
                                            <div className="relative group">
                                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-rose-600 transition-colors">
                                                    <Building2 size={18} />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Global Network Identification"
                                                    className="w-full h-14 pl-14 pr-6 rounded-2xl bg-bg-page border border-border-light focus:bg-bg-card focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 outline-none transition-all font-bold text-text-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-text-primary uppercase tracking-[0.2em] ml-1">Master Security Key</label>
                                            <div className="relative group">
                                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-rose-600 transition-colors">
                                                    <KeyRound size={18} />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="SECURE-MASTER-KEY"
                                                    className="w-full h-14 pl-14 pr-6 rounded-2xl bg-bg-page border border-border-light focus:bg-bg-card focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 outline-none transition-all font-bold text-text-primary"
                                                />
                                            </div>
                                            <p className="text-[10px] text-rose-500 font-bold ml-1">Attention: Unauthorized access attempts are monitored.</p>
                                        </div>

                                        <button
                                            onClick={handleNext}
                                            className="w-full h-16 rounded-2xl font-black uppercase tracking-[0.25em] text-white shadow-2xl transition-all flex items-center justify-center gap-3 group active:scale-[0.98] mt-8 bg-rose-600 shadow-rose-500/20"
                                        >
                                            <span>Authenticate Key</span>
                                            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: Account Credentials */}
                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="p-8 md:p-12"
                                >
                                    <button onClick={handleBack} className="flex items-center gap-2 text-text-muted hover:text-rose-600 font-bold transition-colors mb-8">
                                        <ArrowLeft size={18} /> Back to Auth
                                    </button>

                                    <div className="mb-10 text-center md:text-left">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-600 bg-rose-500/10 px-4 py-1.5 rounded-full mb-4 inline-block">
                                            System Security: Stage 02
                                        </span>
                                        <h2 className="text-3xl font-black text-text-primary tracking-tight mt-3">Finalize Root Access</h2>
                                        <p className="text-text-muted font-medium mt-2">Setup your master credentials for global system configuration.</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-text-primary uppercase tracking-[0.2em] ml-1">Full System Name</label>
                                            <div className="relative group">
                                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-rose-600 transition-colors">
                                                    <UserCheck size={18} />
                                                </div>
                                                <input
                                                    type="text"
                                                    placeholder="Root Administrator"
                                                    className="w-full h-14 pl-14 pr-6 rounded-2xl bg-bg-page border border-border-light focus:bg-bg-card focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 outline-none transition-all font-bold text-text-primary"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-text-primary uppercase tracking-[0.2em] ml-1">Master Email Address</label>
                                            <div className="relative group">
                                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-rose-600 transition-colors">
                                                    <Mail size={18} />
                                                </div>
                                                <input
                                                    type="email"
                                                    placeholder="superadmin@system.com"
                                                    className="w-full h-14 pl-14 pr-6 rounded-2xl bg-bg-page border border-border-light focus:bg-bg-card focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 outline-none transition-all font-bold text-text-primary"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black text-text-primary uppercase tracking-[0.2em] ml-1">Secure Root Password</label>
                                            <div className="relative group">
                                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-rose-600 transition-colors">
                                                    <Lock size={18} />
                                                </div>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    className="w-full h-14 pl-14 pr-14 rounded-2xl bg-bg-page border border-border-light focus:bg-bg-card focus:border-rose-500 focus:ring-4 focus:ring-rose-500/5 outline-none transition-all font-bold text-text-primary"
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
                                            className="w-full h-16 rounded-2xl font-black uppercase tracking-[0.25em] text-white shadow-2xl transition-all flex items-center justify-center gap-3 group active:scale-[0.98] mt-8 bg-rose-600 shadow-rose-500/20"
                                        >
                                            <span>Create Master Account</span>
                                            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
                                        </button>
                                    </form>
                                </motion.div>
                            )}

                            {/* Step 3: Success Message */}
                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-12 text-center"
                                >
                                    <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-8 bg-rose-500 text-white shadow-2xl shadow-rose-500/30">
                                        <CheckCircle2 size={48} />
                                    </div>
                                    <h2 className="text-4xl font-black text-text-primary tracking-tight mb-4">Master Configured!</h2>
                                    <p className="text-text-muted text-lg font-medium max-w-md mx-auto leading-relaxed mb-10">
                                        Your **Super Admin** profile is now active. You have full root accessibility to the entire school management system.
                                    </p>
                                    <Link href="/login/super-admin" className="inline-flex h-16 px-10 rounded-2xl bg-rose-600 text-white font-black uppercase tracking-widest items-center justify-center shadow-2xl shadow-rose-500/20 hover:-translate-y-1 active:scale-95 transition-all">
                                        Access Core Portal
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <p className="text-center mt-10 text-text-muted font-bold">
                        Need technical support? <Link href="/Support" className="text-rose-600 hover:underline">Contact System Provider</Link>
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default RegisterSuperAdmin;

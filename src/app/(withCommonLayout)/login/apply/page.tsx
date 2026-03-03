"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    School,
    Mail,
    User,
    Phone,
    Building,
    ArrowRight,
    ArrowLeft,
    FileText,
    Sparkles,
    ShieldCheck,
    EyeOff,
    Eye
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import { useAuth } from '@/hooks/useAuth';
import { TbLockPassword } from "react-icons/tb";
import PageLoader from '@/components/shared/PageLoader';

const AdminApplyPage = () => {
const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        schoolName: '',
        adminName: '',
        email: '',
        phone: '',
        instituteCode: '',
        password: '',
        message: ''
    });

    const {signUp} = useAuth()
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
//   console.log(formData.email, formData.password)

  try {
    setLoading(true);

    const { data, error } = await signUp(
      formData.email,
      formData.password,
      "admin" // role
    );

    if (error) throw error;

    setStep(3);

  } catch (err: any) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
};


if (loading) return <PageLoader></PageLoader>
    return (
        <div className="flex flex-col min-h-screen bg-bg-page relative overflow-hidden text-text-primary">
            <Navbar />

            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-[0.03] bg-emerald-600" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />
            </div>

            <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
                <div className="w-full max-w-2xl mx-auto">
                    <AnimatePresence mode="wait">
                        {step === 1 || step === 2 ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-bg-card/80 backdrop-blur-3xl rounded-[2.5rem] border border-border-light shadow-2xl overflow-hidden"
                            >
                                <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-600" />

                                <div className="p-8 md:p-12">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                                        <div>
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-black text-[9px] uppercase tracking-[0.25em] mb-4">
                                                <Sparkles size={12} />
                                                Institution Onboarding
                                            </div>
                                            <h1 className="text-3xl font-black tracking-tight">Admin <span className="text-primary font-medium">Application</span></h1>
                                            <p className="text-text-muted font-bold text-sm mt-2 opacity-70">
                                                Apply to manage your school with our advanced infrastructure.
                                            </p>
                                        </div>
                                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                                            <School size={32} />
                                        </div>
                                    </div>

                                    <form onSubmit={handleRegister} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-primary ml-1">Institution Name</label>
                                                <div className="relative group">
                                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-emerald-500 transition-colors">
                                                        <Building size={16} />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="schoolName"
                                                        value={formData.schoolName}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="e.g. Skyline Academy"
                                                        className="w-full h-12 pl-12 pr-6 rounded-2xl bg-bg-page border border-border-light focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all font-bold text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-primary ml-1">Admin Full Name</label>
                                                <div className="relative group">
                                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-emerald-500 transition-colors">
                                                        <User size={16} />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="adminName"
                                                        value={formData.adminName}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="John Doe"
                                                        className="w-full h-12 pl-12 pr-6 rounded-2xl bg-bg-page border border-border-light focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all font-bold text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-primary ml-1">Business Email</label>
                                                <div className="relative group">
                                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-emerald-500 transition-colors">
                                                        <Mail size={16} />
                                                    </div>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="admin@school.com"
                                                        className="w-full h-12 pl-12 pr-6 rounded-2xl bg-bg-page border border-border-light focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all font-bold text-sm"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-text-primary ml-1">Contact Number</label>
                                                <div className="relative group">
                                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-emerald-500 transition-colors">
                                                        <Phone size={16} />
                                                    </div>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        required
                                                        placeholder="+1 (555) 000-0000"
                                                        className="w-full h-12 pl-12 pr-6 rounded-2xl bg-bg-page border border-border-light focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all font-bold text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-text-primary ml-1">Password</label>
                                            <div className="relative group">
                                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-emerald-500 transition-colors">
                                                    <TbLockPassword size={16} />
                                                </div>
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    placeholder="••••••••"
                                                    className="w-full h-12 pl-12 pr-12 rounded-2xl bg-bg-page border border-border-light focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all font-bold text-sm"
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
                                            className="w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 group mt-4"
                                        >
                                            Submit Application
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </button>

                                        <div className="text-center pt-4">
                                            <Link href="/login" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-primary transition-colors">
                                                <ArrowLeft size={14} /> Back to Login
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-bg-card/80 backdrop-blur-3xl rounded-[2.5rem] border border-border-light shadow-2xl p-12 text-center"
                            >
                                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 mx-auto mb-8">
                                    <ShieldCheck size={40} />
                                </div>
                                <h1 className="text-3xl font-black tracking-tight mb-4">Application <span className="text-emerald-500">Submitted</span></h1>
                                <p className="text-text-muted font-bold text-sm max-w-sm mx-auto mb-10 leading-relaxed">
                                    Thank you for your interest. Our super admin team will review your application and contact you via email within 24-48 hours.
                                </p>
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-2 px-8 h-14 rounded-2xl bg-bg-page border border-border-light font-black uppercase tracking-widest hover:border-primary/20 hover:text-primary transition-all shadow-sm"
                                >
                                    Return Home
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default AdminApplyPage;
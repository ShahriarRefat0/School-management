"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    GraduationCap, BookOpen, Settings, ShieldCheck, Users, Wallet,
    ArrowRight, Sparkles, Building2, ShieldAlert
} from 'lucide-react';
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
    {
        id: 'student',
        title: "Student",
        desc: "LMS & Academics portal",
        icon: <GraduationCap size={20} />,
        color: 'blue',
        path: '/login/student'
    },
    {
        id: 'teacher',
        title: "Teacher",
        desc: "Class & Results management",
        icon: <BookOpen size={20} />,
        color: 'indigo',
        path: '/login/teacher'
    },
    {
        id: 'parent',
        title: "Parent",
        desc: "Fees & Progress tracking",
        icon: <Users size={20} />,
        color: 'amber',
        path: '/login/parent'
    },
    {
        id: 'accounts',
        title: "Accounts",
        desc: "Finance & Salary processing",
        icon: <Wallet size={20} />,
        color: 'cyan',
        path: '/login/accounts'
    },
    {
        id: 'admin',
        title: "Admin",
        desc: "School Staff & Admin portal",
        icon: <Settings size={20} />,
        color: 'emerald',
        path: '/login/admin'
    },
    {
        id: 'superAdmin',
        title: "Owner",
        desc: "Core System Infrastructure",
        icon: <ShieldCheck size={20} />,
        color: 'rose',
        path: '/login/super-admin'
    },
];

const LoginPage = () => {
    const [hoveredRole, setHoveredRole] = useState(null);

    return (
        <div className="flex flex-col min-h-screen bg-bg-page relative overflow-hidden text-text-primary">
            <Navbar />

            {/* Subtle Dynamic Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <AnimatePresence>
                    {hoveredRole && (
                        <motion.div
                            key={hoveredRole.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className={`absolute top-0 left-0 w-full h-full opacity-[0.02] transition-colors duration-1000
                                ${hoveredRole.color === 'blue' ? 'bg-blue-600' :
                                    hoveredRole.color === 'indigo' ? 'bg-indigo-600' :
                                        hoveredRole.color === 'emerald' ? 'bg-emerald-600' :
                                            hoveredRole.color === 'rose' ? 'bg-rose-600' :
                                                hoveredRole.color === 'amber' ? 'bg-amber-600' : 'bg-cyan-600'}`}
                        />
                    )}
                </AnimatePresence>
                <div className="absolute top-[20%] left-[15%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] right-[15%] w-[20%] h-[20%] bg-indigo-500/5 rounded-full blur-[80px]" />
            </div>

            <main className="flex-grow flex items-center justify-center pt-24 pb-16 px-6">
                <div className="w-full max-w-4xl mx-auto">
                    {/* Compact Header */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-black text-[9px] uppercase tracking-[0.25em] mb-4"
                        >
                            <Sparkles size={12} />
                            Universal Access Hub
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-4xl font-black tracking-tighter"
                        >
                            Portal <span className="text-primary font-medium">Selector</span>
                        </motion.h1>
                    </div>

                    {/* Compact Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {roles.map((role, index) => (
                            <motion.div
                                key={role.id}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.03 }}
                                onMouseEnter={() => setHoveredRole(role)}
                                onMouseLeave={() => setHoveredRole(null)}
                            >
                                <Link
                                    href={role.path}
                                    className="group relative block p-6 rounded-[2rem] bg-bg-card/80 backdrop-blur-xl border border-border-light hover:border-primary/20 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1"
                                >
                                    {/* Role Hover Accent */}
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10
                                        ${role.color === 'blue' ? 'bg-blue-600' :
                                            role.color === 'indigo' ? 'bg-indigo-600' :
                                                role.color === 'emerald' ? 'bg-emerald-600' :
                                                    role.color === 'rose' ? 'bg-rose-600' :
                                                        role.color === 'amber' ? 'bg-amber-600' : 'bg-cyan-600'}`}
                                    />

                                    <div className="flex items-center justify-between mb-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg shadow-black/5
                                            ${role.color === 'blue' ? 'bg-blue-600/10 text-blue-600' :
                                                role.color === 'indigo' ? 'bg-indigo-600/10 text-indigo-600' :
                                                    role.color === 'emerald' ? 'bg-emerald-600/10 text-emerald-600' :
                                                        role.color === 'rose' ? 'bg-rose-600/10 text-rose-600' :
                                                            role.color === 'amber' ? 'bg-amber-600/10 text-amber-600' : 'bg-cyan-600/10 text-cyan-600'}`}
                                        >
                                            {role.icon}
                                        </div>
                                        <div className="p-2 rounded-full bg-bg-page opacity-0 group-hover:opacity-100 transition-all">
                                            <ArrowRight size={14} className="text-primary" />
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-black mb-1 group-hover:text-primary transition-colors">{role.title}</h3>
                                    <p className="text-[10px] font-bold text-text-muted leading-relaxed opacity-70 uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis">
                                        {role.desc}
                                    </p>

                                    {/* Security Indicator for Admin/Super */}
                                    {(role.id === 'admin' || role.id === 'superAdmin') && (
                                        <div className="absolute top-6 right-6 opacity-20">
                                            <ShieldAlert size={12} />
                                        </div>
                                    )}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Minimalist Support Footer */}
                    <div className="mt-12 pt-8 border-t border-border-light flex flex-col md:flex-row items-center justify-between gap-6 opacity-60">
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em]">
                            <div className="flex items-center gap-2">
                                <Building2 size={14} /> DIS INFRASTRUCTURE
                            </div>
                            <div className="w-1 h-1 rounded-full bg-current" />
                            <div className="text-emerald-500">Live Support</div>
                        </div>
                        <div className="flex items-center gap-6">
                            <Link href="#" className="text-[9px] font-black uppercase tracking-widest hover:text-primary transition-colors">Credential Help</Link>
                            <Link href="#" className="text-[9px] font-black uppercase tracking-widest hover:text-primary transition-colors">Privacy Policy</Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LoginPage;

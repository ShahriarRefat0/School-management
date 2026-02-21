"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    GraduationCap, BookOpen, Settings, ShieldCheck, Users, Wallet,
    ArrowRight, Sparkles, UserPlus
} from 'lucide-react';
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";
import { motion, AnimatePresence } from "framer-motion";

const registrationRoles = [
    {
        id: 'student',
        title: "Student",
        desc: "New students application portal",
        icon: <GraduationCap size={20} />,
        color: 'blue',
        path: '/register/student'
    },
    {
        id: 'teacher',
        title: "Teacher",
        desc: "Join our professional faculty",
        icon: <BookOpen size={20} />,
        color: 'indigo',
        path: '/register/teacher'
    },
    {
        id: 'parent',
        title: "Parent",
        desc: "Register to monitor student",
        icon: <Users size={20} />,
        color: 'amber',
        path: '/register/parent'
    },
    {
        id: 'admin',
        title: "Admin",
        desc: "Staff authority & site management",
        icon: <Settings size={20} />,
        color: 'emerald',
        path: '/register/admin'
    },
    {
        id: 'superAdmin',
        title: "Owner",
        desc: "Global system root access",
        icon: <ShieldCheck size={20} />,
        color: 'rose',
        path: '/register/super-admin'
    },
];

const RegisterHubPage = () => {
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
                <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-primary/5 rounded-full blur-[100px]" />
            </div>

            <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
                <div className="w-full max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-black text-[9px] uppercase tracking-[0.25em] mb-4"
                        >
                            <UserPlus size={12} />
                            Account Registration
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl font-black tracking-tighter"
                        >
                            Create Your <span className="text-primary font-medium">Account</span>
                        </motion.h1>
                        <p className="text-text-muted font-bold text-sm mt-3 opacity-70">Choose your role to start the onboarding process.</p>
                    </div>

                    {/* Compact Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {registrationRoles.map((role, index) => (
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
                                    className="group relative block p-6 rounded-[2rem] bg-bg-card/80 backdrop-blur-xl border border-border-light hover:border-emerald-500/20 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1"
                                >
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
                                            <ArrowRight size={14} className="text-emerald-500" />
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-black mb-1 group-hover:text-emerald-600 transition-colors uppercase tracking-tight">{role.title}</h3>
                                    <p className="text-[10px] font-bold text-text-muted leading-relaxed opacity-70 uppercase tracking-widest">
                                        {role.desc}
                                    </p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <p className="text-center mt-12 text-text-muted font-bold text-sm">
                        Existing member? <Link href="/login" className="text-primary hover:underline font-black">Sign In to Dashboard</Link>
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default RegisterHubPage;

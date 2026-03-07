'use client';

import React from "react";
import { Check, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const PricingPage = () => {
    return (
        <div className="min-h-screen bg-bg-page pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px] opacity-60" />
                <div className="absolute top-40 right-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] opacity-60" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary mb-6"
                    >
                        <Sparkles size={14} />
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Flexible Plans</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-6 tracking-tight"
                    >
                        Simple, transparent <span className="text-primary">pricing</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto"
                    >
                        Choose the perfect plan for your institution. Empower your administration, teachers, and students with our all-in-one platform.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                    {/* Starter Plan */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-bg-card border border-border-light rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative"
                    >
                        <h3 className="text-2xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">Starter</h3>
                        <p className="text-text-secondary mb-8 text-sm leading-relaxed">Perfect for small schools just getting started with digitalization.</p>

                        <div className="mb-8 pb-8 border-b border-border-light">
                            <span className="text-5xl font-black text-text-primary tracking-tight">৳4,999</span>
                            <span className="text-text-secondary font-medium ml-1">/month</span>
                        </div>

                        <ul className="space-y-5 mb-10 flex-1">
                            {["Up to 500 Students", "Basic Student Management", "Attendance Tracking", "Email Support"].map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                    <span className="text-text-primary text-sm font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <Link href="/login" className="w-full">
                            <button className="w-full py-4 rounded-xl bg-secondary text-primary font-bold text-sm uppercase tracking-wider hover:bg-primary/10 transition-colors">
                                Get Started
                            </button>
                        </Link>
                    </motion.div>

                    {/* Professional Plan */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="relative"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-b from-primary to-primary/30 rounded-[34px] blur-sm opacity-50" />
                        <div className="bg-bg-card border-2 border-primary rounded-3xl p-10 shadow-2xl relative flex flex-col transform md:-translate-y-4">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-md flex items-center gap-1">
                                Most Popular
                            </div>

                            <h3 className="text-2xl font-bold text-text-primary mb-2 mt-2">Professional</h3>
                            <p className="text-text-secondary mb-8 text-sm leading-relaxed">The complete suite for growing institutions looking to scale.</p>

                            <div className="mb-8 pb-8 border-b border-border-light">
                                <span className="text-6xl font-black text-text-primary tracking-tight">৳9,999</span>
                                <span className="text-text-secondary font-medium ml-1">/month</span>
                            </div>

                            <ul className="space-y-5 mb-10 flex-1">
                                {[
                                    "Up to 2000 Students",
                                    "Advanced Management",
                                    "Online Payments via SSLCommerz",
                                    "Teacher & Staff Portals",
                                    "Priority 24/7 Support",
                                ].map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className="mt-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-sm">
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        <span className="text-text-primary text-sm font-bold">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link href="/login" className="w-full">
                                <button className="w-full py-4 rounded-xl bg-primary text-white font-bold text-sm uppercase tracking-wider hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2">
                                    Start Free Trial <ChevronRight size={16} />
                                </button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Enterprise Plan */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-bg-card border border-border-light rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative"
                    >
                        <h3 className="text-2xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">Enterprise</h3>
                        <p className="text-text-secondary mb-8 text-sm leading-relaxed">Custom solutions tailored for large networks and universities.</p>

                        <div className="mb-8 pb-8 border-b border-border-light flex items-end h-[88px]">
                            <span className="text-4xl font-black text-text-primary tracking-tight mb-1">Custom Plan</span>
                        </div>

                        <ul className="space-y-5 mb-10 flex-1">
                            {[
                                "Unlimited Students",
                                "Custom Integrations",
                                "Dedicated Account Manager",
                                "On-premise Options",
                                "Data Migration Service",
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <Check size={12} strokeWidth={3} />
                                    </div>
                                    <span className="text-text-primary text-sm font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <Link href="/support" className="w-full">
                            <button className="w-full py-4 rounded-xl border border-border-light text-text-primary font-bold text-sm uppercase tracking-wider hover:bg-bg-page transition-colors shadow-sm">
                                Contact Sales
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;

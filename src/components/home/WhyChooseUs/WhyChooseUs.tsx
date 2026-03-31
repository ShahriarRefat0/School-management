'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, CloudCog, Users, Headset, BarChart3, LockKeyhole, Smartphone } from 'lucide-react';

const features = [
    {
        icon: <Users size={24} />,
        title: "Unified Login System",
        description: "Students, teachers, and principals use one single page to log in. Our smart system automatically takes you to your correct dashboard.",
        color: "from-blue-500 to-cyan-400"
    },
    {
        icon: <BarChart3 size={24} />,
        title: "Role-Based Dashboards",
        description: "Every user sees exactly what they need. Principals see money stats, teachers see classes, and students see their results and notices.",
        color: "from-indigo-500 to-purple-500"
    },
    {
        icon: <ShieldCheck size={24} />,
        title: "Fast & Secure Payments",
        description: "Pay school fees or buy subscriptions safely using bKash, Nagad, or Cards via SSLCommerz. Your account is updated automatically.",
        color: "from-emerald-400 to-teal-500"
    },
    {
        icon: <Zap size={24} />,
        title: "Live Attendance & Results",
        description: "Teachers can take attendance and add marks in seconds. Parents can check their child's progress easily from home.",
        color: "from-amber-400 to-orange-500"
    },
    {
        icon: <CloudCog size={24} />,
        title: "Track School Finance",
        description: "Keep a perfect record of all fees collected and money spent each month. Say goodbye to confusing paper records.",
        color: "from-rose-400 to-red-500"
    },
    {
        icon: <Smartphone size={24} />,
        title: "Mobile Friendly",
        description: "Use it from your computer, tablet or mobile phone. Our clean design makes it super easy for anyone to control their school data.",
        color: "from-blue-600 to-indigo-700"
    }
];

const WhyChooseUs = () => {
    return (
        <section id="whychooseus" className="pt-4 pb-24 relative overflow-hidden bg-bg-page">
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center gap-2 mb-4"
                    >
                        <ShieldCheck size={18} className="text-primary" />
                        <span className="text-sm font-black uppercase tracking-widest text-primary">The Schoology BD Advantage</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-text-primary mb-6 tracking-tight"
                    >
                        Why Schools Choose Us
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-text-muted text-lg"
                    >
                        We don't just provide software; we provide a complete digital ecosystem designed to make school management effortless and error-free.
                    </motion.p>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative p-[1px] rounded-3xl overflow-hidden bg-gradient-to-b from-border-light to-transparent hover:from-primary/50 transition-colors duration-500"
                        >
                            <div className="h-full bg-bg-card rounded-[23px] p-8 relative overflow-hidden flex flex-col items-start gap-6">

                                {/* Hover Glow */}
                                <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 blur-3xl rounded-full transition-opacity duration-500`} />

                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center shadow-lg transform group-hover:-translate-y-1 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>

                                {/* Text Content */}
                                <div>
                                    <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-text-muted leading-relaxed text-sm">
                                        {feature.description}
                                    </p>
                                </div>

                                {/* Decorative Pattern */}
                                <div className="absolute right-0 bottom-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none">
                                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="20" className="text-primary" />
                                    </svg>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default WhyChooseUs;

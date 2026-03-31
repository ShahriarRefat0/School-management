'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserPlus, CalendarCheck, ShieldCheck, Megaphone, Wallet, CheckCircle2 } from 'lucide-react';

const modules = [
    {
        id: 'students',
        title: 'Manage Students',
        icon: Users,
        description: 'Easily add new students one by one or all at once using Excel. Keep all student details fast, safe, and organized in one place.',
        features: ['Add Students Quickly', 'View Full Profiles', 'Safe & Secure', 'Download Data Easily'],
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        iconColor: 'text-blue-500'
    },
    {
        id: 'teachers',
        title: 'Manage Teachers',
        icon: UserPlus,
        description: 'Add your teachers to the system in seconds. You can manage their profiles, control what they can see, and communicate easily.',
        features: ['Easy Teacher Add', 'Update Profiles', 'Control Access', 'Send Notices'],
        color: 'from-emerald-500 to-emerald-600',
        bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
        iconColor: 'text-emerald-500'
    },
    {
        id: 'attendance',
        title: 'Smart Attendance',
        icon: CalendarCheck,
        description: 'Take class attendance in just a few clicks! Keep track of who is present or absent, and let parents check it from their phones.',
        features: ['Quick Daily Attendance', 'Fix Mistakes Easily', 'Monthly Reports', 'Parent Access'],
        color: 'from-purple-500 to-purple-600',
        bgColor: 'bg-purple-50 dark:bg-purple-900/20',
        iconColor: 'text-purple-500'
    },
    {
        id: 'pricing',
        title: 'Pricing & Upgrades',
        icon: ShieldCheck,
        description: 'Choose the best plan for your school and pay easily online safely. Upgrading your plan is simple whenever you need more features.',
        features: ['Clear Pricing Plans', 'Online Payments', 'Safe Checkout', 'Instant Upgrade'],
        color: 'from-amber-500 to-amber-600',
        bgColor: 'bg-amber-50 dark:bg-amber-900/20',
        iconColor: 'text-amber-500'
    },
    {
        id: 'finance',
        title: 'Finance & Fees',
        icon: Wallet,
        description: 'Manage all your school money without the headache. Easily collect fees from students, manage salaries, and keep track of expenses.',
        features: ['Collect Student Fees', 'Manage Staff Pay', 'Track Expenses', 'Clear Accounting'],
        color: 'from-rose-500 to-rose-600',
        bgColor: 'bg-rose-50 dark:bg-rose-900/20',
        iconColor: 'text-rose-500'
    },
    {
        id: 'announcements',
        title: 'Announcements',
        icon: Megaphone,
        description: 'Send important updates to teachers, parents, and students instantly. Make sure everyone knows what is going on at the school.',
        features: ['Write Easy Notices', 'Send to Everyone', 'Instant Alerts', 'Notice History'],
        color: 'from-cyan-500 to-cyan-600',
        bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
        iconColor: 'text-cyan-500'
    }
];

const ExploreOurDashboardFeatures = () => {
    const [activeModule, setActiveModule] = useState(modules[0].id);

    const activeData = modules.find((m) => m.id === activeModule) || modules[0];

    return (
        <section className="py-24 bg-white dark:bg-[#0B1120] relative overflow-hidden transition-colors duration-300">
            {/* Background Decorations */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full point-events-none"></div>
            <div className="absolute top-40 -left-40 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full point-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Everything you need</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 tracking-tight"
                    >
                        Explore Our <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Dashboard Features</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-gray-600 dark:text-gray-400 font-medium"
                    >
                        Schoology BD provides a comprehensive suite of tools designed specifically for modern educational institutions in Bangladesh.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* Left Side: Navigation Tabs */}
                    <div className="lg:col-span-4 flex flex-col gap-3">
                        {modules.map((module) => {
                            const isActive = activeModule === module.id;
                            const Icon = module.icon;
                            return (
                                <button
                                    key={module.id}
                                    onClick={() => setActiveModule(module.id)}
                                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left border ${isActive
                                        ? `bg-white dark:bg-gray-800 shadow-xl shadow-${module.iconColor.split('-')[1]}-500/10 border-gray-100 dark:border-gray-700`
                                        : 'border-transparent hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                        }`}
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isActive ? `bg-gradient-to-br ${module.color} text-white shadow-lg` : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                                        }`}>
                                        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                    </div>
                                    <div>
                                        <h3 className={`font-bold text-lg transition-colors ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                                            }`}>
                                            {module.title}
                                        </h3>
                                    </div>
                                    {isActive && (
                                        <motion.div layoutId="active-indicator" className="w-1.5 h-8 rounded-full bg-blue-500 ml-auto" />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Side: Content Display */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeData.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-800 h-full flex flex-col"
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br ${activeData.color} text-white shadow-lg shadow-[${activeData.iconColor}]/30`}>
                                        <activeData.icon size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">{activeData.title}</h3>
                                    </div>
                                </div>

                                <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-2xl">
                                    {activeData.description}
                                </p>

                                <div className="grid sm:grid-cols-2 gap-6 mt-auto">
                                    {activeData.features.map((feature, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 + 0.2 }}
                                            className={`flex items-start gap-3 p-4 rounded-xl ${activeData.bgColor} border border-transparent dark:border-white/5`}
                                        >
                                            <CheckCircle2 className={`w-6 h-6 shrink-0 ${activeData.iconColor} mt-0.5`} />
                                            <span className="font-bold text-gray-900 dark:text-gray-100">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>

                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ExploreOurDashboardFeatures;

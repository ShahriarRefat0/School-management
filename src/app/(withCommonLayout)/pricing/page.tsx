'use client';
import React, { useEffect, useState } from 'react';
import {
  Check, Zap, Shield, Crown, Loader2, Users, UserRound,
  HardDrive, Star, Rocket, Gem, Sparkles, Globe,
  ChevronRight
} from 'lucide-react';
import { motion } from "framer-motion";
import Link from 'next/link';
import { getPlans } from '@/app/actions/plans';

const iconMap: Record<string, React.ElementType> = {
  Zap, Shield, Crown, Star, Rocket, Gem, Sparkles, Globe
};

const PricingPage = () => {
    const [plans, setPlans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await getPlans();
                if (res.success && res.data) {
                    setPlans(res.data);
                }
            } catch (error) {
                console.error('Error fetching plans:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-50">
                <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFDFF] pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/50 rounded-full blur-[100px] opacity-60" />
                <div className="absolute top-40 right-10 w-96 h-96 bg-purple-100/50 rounded-full blur-[120px] opacity-60" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-24">
                  <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 mb-6"
                  >
                      <Sparkles size={14} />
                      <span className="text-[10px] font-black tracking-[0.2em] uppercase">Flexible Packages</span>
                  </motion.div>

                  <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tight"
                  >
                      The perfect plan for <span className="text-blue-600">every school</span>
                  </motion.h1>

                  <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-xl text-gray-500 font-medium max-w-2xl mx-auto"
                  >
                      From small startups to large institutions, we have a plan to suit your needs.
                      Everything you need to manage your school in one place.
                  </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
                    {plans.map((plan, index) => {
                        const IconComponent = plan.icon && iconMap[plan.icon] ? iconMap[plan.icon] : Zap;
                        const isPopular = index === 1;

                        let colorClasses = 'bg-blue-50 text-blue-600';
                        if (plan.color === 'purple') colorClasses = 'bg-purple-50 text-purple-600';
                        if (plan.color === 'orange') colorClasses = 'bg-orange-50 text-orange-600';
                        if (plan.color === 'emerald') colorClasses = 'bg-emerald-50 text-emerald-600';
                        if (plan.color === 'rose') colorClasses = 'bg-rose-50 text-rose-600';

                        return (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative bg-white p-12 rounded-[3.5rem] border-2 transition-all hover:scale-[1.02] ${isPopular ? 'border-blue-600 shadow-[0_40px_80px_-20px_rgba(37,99,235,0.15)]' : 'border-gray-50 shadow-xl shadow-gray-200/50'}`}
                            >
                                {isPopular && (
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-600/30">
                                        Best Value
                                    </div>
                                )}

                                <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center mb-10 shadow-inner ${colorClasses}`}>
                                    <IconComponent size={36} />
                                </div>

                                <h3 className="text-3xl font-black text-gray-900 leading-tight">{plan.name}</h3>
                                <div className="mt-8 flex flex-col">
                                    <div className="flex items-baseline gap-1">
                                      <span className="text-6xl font-black text-gray-900">৳{plan.price}</span>
                                      <span className="text-gray-400 font-bold text-lg">/{plan.duration.split(' ')[1] || 'mo'}</span>
                                    </div>
                                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mt-4">Subscription Plan</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 my-10 font-bold text-sm">
                                  <div className="flex items-center gap-3 text-gray-700">
                                    <Users size={18} className="text-blue-500" />
                                    <span>{plan.students} Students</span>
                                  </div>
                                  <div className="flex items-center gap-3 text-gray-700">
                                    <UserRound size={18} className="text-purple-500" />
                                    <span>{plan.teachers} Teachers</span>
                                  </div>
                                </div>

                                <ul className="space-y-5 mb-12 flex-1 pt-6 border-t border-gray-50">
                                    {plan.modules && plan.modules.slice(0, 5).map((module: string, idx: number) => (
                                        <li key={idx} className="flex items-center gap-4 text-sm font-bold text-gray-600">
                                            <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                                                <Check size={14} className="text-emerald-600" />
                                            </div>
                                            {module}
                                        </li>
                                    ))}
                                </ul>

                                <Link href="/login" className="block">
                                  <button className={`w-full py-5 rounded-[2.5rem] font-black text-lg transition-all shadow-2xl flex items-center justify-center gap-2 ${isPopular ? 'bg-gray-900 text-white shadow-gray-400/50 hover:bg-black' : 'bg-gray-50 text-gray-900 shadow-gray-100 hover:bg-blue-600 hover:text-white'}`}>
                                      Start Exploring <ChevronRight size={20} />
                                  </button>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PricingPage;

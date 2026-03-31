'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, PlayCircle, Users, ShieldCheck, TrendingUp, Star, ArrowRight, Building2, UserCheck } from 'lucide-react';
import Herobackground from './Herobackground';
import { getHeroStats } from '@/app/actions/stats';

type RevenueData = {
  allTime: number;
  daily: number;
  weekly: number;
  monthly: number;
};

const HeroSection = () => {
  const [stats, setStats] = useState({
    revenue: { allTime: 0, daily: 0, weekly: 0, monthly: 0 },
    schools: 0,
    users: 0
  });
  const [period, setPeriod] = useState<keyof RevenueData>('allTime');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getHeroStats();
        if (res.success) {
          setStats({
            revenue: res.revenue,
            schools: res.schools,
            users: res.users
          });
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const currentRevenue = stats.revenue[period];

  if (isLoading) {
    return (
      <section id="home" className="relative pt-32 pb-24 overflow-hidden bg-[#1e1e62] min-h-screen flex items-center justify-center">
        <Herobackground />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
          <p className="text-blue-200 font-bold uppercase tracking-widest text-sm animate-pulse">Loading Schoology BD...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative pt-32 pb-24 overflow-hidden bg-[#1e1e62]">
      <Herobackground />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* LEFT: CONTENT RAIN */}
          <div className="w-full lg:w-1/2 space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-400/10 border border-blue-400/20 w-fit"
            >
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-100 text-[10px] font-black uppercase tracking-widest">#1 Online Software</span>
              <ShieldCheck size={12} className="text-blue-400" />
              <span className="text-blue-300 text-[10px] font-bold">Verified</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
                <span className="text-blue-400">Schoology</span>BD <br />
                <span className="">Smart School</span> <br />
                <span className="">Management</span>
              </h1>
              <p className="text-lg text-blue-100/70 max-w-xl font-medium leading-relaxed">
                Empower your educational institution with <span className="text-white font-bold underline decoration-blue-500 decoration-2 underline-offset-4">Schoology BD</span>.
                Experience the most advanced, cloud-based automation for admissions, finance, and academics.
                Trusted by elite educators in Bangladesh.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-6"
            >
              <Link
                href="/login"
                className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-black text-lg transition-all shadow-2xl shadow-blue-900/40 flex items-center gap-2 group hover:scale-105"
              >
                Get Started
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex items-center gap-4 text-white">
                <div className="w-12 h-12 rounded-full bg-blue-400/10 border border-blue-400/30 flex items-center justify-center text-blue-400 cursor-pointer hover:bg-blue-400 hover:text-white transition-all">
                  <PlayCircle size={24} />
                </div>
                <div>
                  <p className="font-bold text-sm">Watch 2-min Demo</p>
                  <p className="text-blue-400 font-bold text-xs mt-0.5">See how to automate your school</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: INTERACTIVE MOCKUP & STATS */}
          <div className="w-full lg:w-1/2 relative h-[600px] flex items-center justify-center">

            {/* Main Visual Circle */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-br from-blue-600/40 via-purple-600/40 to-transparent border border-white/10 overflow-hidden shadow-2xl shadow-blue-900/50"
            >
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            </motion.div>

            {/* Character Image */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative z-20"
            >
              <Image
                src="/school_hero_image.png"
                alt="School Management Team"
                width={600}
                height={600}
                className="drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)]"
                priority
              />
            </motion.div>

            {/* Floating Card: SCHOOLS JOINED */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 -left-6 z-30 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl shadow-2xl flex items-center gap-4 group"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Building2 size={24} />
              </div>
              <div>
                <p className="text-blue-200 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Schools Joined</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">{stats.schools.toLocaleString()}</span>
                  <span className="text-[10px] font-bold text-green-400">+02 Today</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Card: ACTIVE USERS */}
            <motion.div
              animate={{ y: [0, 10, 0], x: [0, 5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-2 right-4 z-30 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-[2rem] shadow-2xl space-y-3 min-w-[210px]"
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">Active Users</p>
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white">
                  <UserCheck size={16} />
                </div>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-4xl font-black text-white">{stats.users.toLocaleString()}</span>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-white/50 uppercase">Verified</p>
                  <p className="text-xs font-black text-white">100%</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Card: REVENUE CHART (Glassmorphism) */}
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -bottom-10 left-1/4 z-30 bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-[2.5rem] shadow-2xl w-[260px] group"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-[10px] font-black text-blue-200/50 uppercase tracking-widest">
                    {period === 'allTime' ? 'Total' : period.charAt(0).toUpperCase() + period.slice(1)} Revenue
                  </p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={period}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-2xl font-black text-white mt-1"
                    >
                      ৳{currentRevenue.toLocaleString()}
                    </motion.p>
                  </AnimatePresence>
                </div>
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
                  <TrendingUp size={20} />
                </div>
              </div>
              <div className="flex gap-2 items-baseline text-[10px] font-bold text-white/40 uppercase font-mono">
                <button
                  onClick={() => setPeriod('daily')}
                  className={`transition-colors hover:text-white ${period === 'daily' ? 'text-blue-400' : ''}`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setPeriod('weekly')}
                  className={`transition-colors hover:text-white ${period === 'weekly' ? 'text-blue-400' : ''}`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setPeriod('monthly')}
                  className={`transition-colors hover:text-white ${period === 'monthly' ? 'text-blue-400' : ''}`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setPeriod('allTime')}
                  className={`transition-colors hover:text-white ${period === 'allTime' ? 'text-blue-400' : ''}`}
                >
                  Total
                </button>
              </div>
              {/* Fake Chart Lines */}
              <div className="mt-4 flex items-end gap-1.5 h-12">
                {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                  <motion.div
                    key={i + period}
                    initial={{ height: 0 }}
                    animate={{ height: `${h + (period === 'weekly' ? 10 : 0)}%` }}
                    className="flex-1 bg-gradient-to-t from-blue-500/50 to-blue-400 rounded-t-sm"
                  />
                ))}
              </div>
            </motion.div>

            {/* Decorative Arrow */}
            <div className="absolute top-1/2 -right-10 opacity-20 rotate-45">
              <ArrowRight size={100} className="text-white" />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

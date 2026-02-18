'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, PlayCircle, Users, ShieldCheck } from 'lucide-react';

const HeroSection = () => {
  return (
    <section
      id="home"
      className="py-20 bg-bg-page border-border-light transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* LEFT CONTENT: Text and Buttons */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-6">
              {/* Optional small badge to match other sections' pattern */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-primary font-bold tracking-[0.2em] text-[11px] uppercase"
              >
                School Management System
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-text-primary leading-tight tracking-tight"
              >
                Manage Your School{' '}
                <span className="text-primary">The Smart Way</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-lg text-text-secondary max-w-xl leading-relaxed"
              >
                Streamline admissions, attendance, exams, and results with our
                all-in-one school management software. Built for modern
                educators and parents.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/register"
                className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/10 inline-flex items-center gap-2"
              >
                Get Started <ChevronRight size={16} />
              </Link>

              <Link
                href="#demo"
                className="px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-text-primary border border-border-light bg-bg-card hover:bg-bg-page transition-all inline-flex items-center gap-2 shadow-sm"
              >
                <PlayCircle size={16} /> Watch Demo
              </Link>
            </motion.div>

            {/* Quick Stats / Trust Indicators - Matching card style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-6 pt-6 border-t border-border-light"
            >
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-bg-page border border-border-light flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Users size={16} />
                </div>
                <span className="text-sm font-semibold text-text-muted">
                  100+ Schools
                </span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-bg-page border border-border-light flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                  <ShieldCheck size={16} />
                </div>
                <span className="text-sm font-semibold text-text-muted">
                  Secure Cloud Sync
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT CONTENT: Dashboard Mockup with Floating Animation */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative max-w-lg mx-auto lg:mx-0 lg:ml-auto"
            >
              {/* Decorative glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-transparent rounded-3xl blur-2xl opacity-70" />

              <div className="relative bg-bg-card border border-border-light rounded-2xl p-2 shadow-sm">
                <Image
                  src="/dashboard-mockup.png"
                  alt="School Dashboard Preview"
                  width={900}
                  height={900}
                  className="rounded-xl border border-border-light bg-bg-card w-full h-auto"
                  priority
                />
              </div>

              {/* Floating Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -bottom-6 -left-6 bg-bg-card/90 backdrop-blur-md border border-border-light px-5 py-4 rounded-xl flex gap-3 shadow-lg"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                  98%
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    Attendance Rate
                  </p>
                  <p className="text-xs text-text-muted">This semester</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

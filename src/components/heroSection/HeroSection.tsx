"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Play } from "lucide-react";
import Herobackground from "./Herobackground";

const HeroSection = () => {
  return (
    
      <div className="relative w-full flex items-center overflow-hidden bg-bg-page transition-colors duration-300">
        {/* 🔹 Particle Background */}
        <Herobackground />
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-transparent to-transparent dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-blue-900/20 dark:via-slate-950 dark:to-slate-950" />

        {/* Animated Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0  bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], x: [0, -50, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px]"
        />

        {/* Main Content */}
        <div className="relative z-10 container mx-auto  sm:px-6 lg:px-8 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* LEFT */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-400 text-sm mb-6 shadow-sm dark:shadow-none"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              Smart School Management System
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6"
            >
              Transform Your School with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">
                Smart Digital Management
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-text-secondary mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Manage students, teachers, attendance, exams, and results seamlessly
              in one powerful platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold flex items-center gap-2 justify-center hover:scale-105 transition shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                Get Started <ChevronRight size={18} />
              </Link>

              <button className="px-8 py-4 rounded-full flex items-center gap-2 justify-center hover:scale-105 transition border  shadow-sm dark:shadow-none">
                <Play size={18} className="fill-current" /> Watch Demo
              </button>
            </motion.div>
          </div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className=" relative"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-3xl bg-blue-500/10 blur-2xl dark:bg-blue-500/20" />

              <Image
                src="/dashboard-mockup.png"
                alt="EduManage Pro Dashboard"
                width={900}
                height={600}
                className="relative rounded-2xl border border-gray-200/50 dark:border-white/10 shadow-2xl bg-white/50 dark:bg-black/20 backdrop-blur-sm"
                priority
              />

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -bottom-6 -left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-gray-200 dark:border-white/10 px-5 py-4 rounded-xl flex gap-3 shadow-lg"
              >
                <div className="w-10 h-10 rounded-full bg-green-500/10 dark:bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400 font-bold">
                  98%
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Attendance Rate</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">This semester</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase text-slate-400 dark:text-slate-500">Scroll</span>
          <div className="w-6 h-10 rounded-full border border-slate-400/30 dark:border-slate-500/30 flex justify-center pt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" />
          </div>
        </motion.div>
      </div>
    
  );
};

export default HeroSection;

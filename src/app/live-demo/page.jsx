"use client";

import React from 'react';
import Link from 'next/link';
import { GraduationCap, BookOpen, Settings, ShieldCheck, Users, Wallet, ArrowRight, MousePointerClick } from 'lucide-react';
import Navbar from "@/components/shared/navbar/Navbar";
import Footer from "@/components/shared/footer/Footer";

const AllLogin = () => {
  const loginOptions = [
    {
      title: "Student Portal",
      desc: "Access your dashboard, attendance, results, and study materials.",
      icon: <GraduationCap />,
      type: 'standard',
      color: 'blue',
      link: '/dashboard/student'
    },
    {
      title: "Teacher Portal",
      desc: "Manage classes, student progress, and academic records.",
      icon: <BookOpen />,
      type: 'standard',
      color: 'indigo',
      link: '/dashboard/teacher'
    },
    {
      title: "Admin Portal",
      desc: "Control administrative tasks, staff management, and admissions.",
      icon: <Settings />,
      type: 'standard',
      color: 'emerald',
      link: '/dashboard/admin'
    },
    {
      title: "Super Admin",
      desc: "High-level system configuration, security, and global settings.",
      icon: <ShieldCheck />,
      type: 'special',
      color: 'rose',
      link: '/dashboard/superAdmin'
    },
    {
      title: "Parent Portal",
      desc: "Track your child's academic performance and school fees.",
      icon: <Users />,
      type: 'standard',
      color: 'amber',
      link: '/dashboard/parents'
    },
    {
      title: "Accountant",
      desc: "Manage financial statements, salaries, and fee collections.",
      icon: <Wallet />,
      type: 'standard',
      color: 'cyan',
      link: '/dashboard/accountant'
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow relative overflow-hidden bg-bg-page pt-32 pb-20 px-6">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-indigo-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-[10%] left-[20%] w-[25%] h-[25%] bg-emerald-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Header Section */}
          <header className="text-center mb-20 animate-fade-in-down">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 backdrop-blur-sm">
              <MousePointerClick className="w-4 h-4 text-primary animate-bounce shadow-blue-500" />
              <span className="text-primary font-bold tracking-wider text-xs uppercase">Choose Your Access</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-text-primary mb-6 tracking-tight leading-tight">
              Interactive <span className="text-primary">Demo Portals</span>
            </h1>
            <p className="text-text-muted max-w-2xl mx-auto text-lg md:text-xl font-medium">
              Select your role to explore our comprehensive school management system features and experience the future of digital education.
            </p>
          </header>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loginOptions.map((item, idx) => (
              <div
                key={idx}
                className={`group relative p-10 rounded-[2.5rem] border border-border-light bg-bg-card/80 backdrop-blur-md
                  hover:border-primary/50 transition-all duration-500 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 
                  animate-fade-in-up flex flex-col items-center text-center overflow-hidden
                  ${item.type === 'special' ? 'ring-2 ring-rose-500/20' : ''}`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Visual Accent */}
                <div className={`absolute top-0 left-0 w-full h-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r 
                  ${item.color === 'rose' ? 'from-rose-500 to-rose-400' :
                    item.color === 'emerald' ? 'from-emerald-500 to-teal-400' :
                      item.color === 'amber' ? 'from-amber-500 to-orange-400' :
                        item.color === 'cyan' ? 'from-cyan-500 to-blue-400' :
                          item.color === 'indigo' ? 'from-indigo-500 to-violet-400' :
                            'from-primary to-blue-400'}`} />

                {/* Icon Container */}
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6
                  ${item.type === 'special'
                    ? 'bg-rose-500 text-white shadow-[0_10px_30px_rgba(244,63,94,0.3)]'
                    : item.color === 'emerald' ? 'bg-emerald-500 text-white shadow-[0_10px_30px_rgba(16,185,129,0.3)]' :
                      item.color === 'amber' ? 'bg-amber-500 text-white shadow-[0_10px_30px_rgba(245,158,11,0.3)]' :
                        item.color === 'indigo' ? 'bg-indigo-500 text-white shadow-[0_10px_30px_rgba(99,102,241,0.3)]' :
                          'bg-primary text-white shadow-[0_10px_30px_rgba(37,99,235,0.3)]'}`}>
                  {React.cloneElement(item.icon, { size: 36, strokeWidth: 1.5 })}
                </div>

                <h2 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-primary transition-colors">
                  {item.title}
                </h2>

                <p className="text-text-muted text-base leading-relaxed mb-10 font-medium">
                  {item.desc}
                </p>

                <Link href={item.link} className="w-full mt-auto">
                  <button className={`px-8 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center gap-3 w-full justify-center
                    ${item.type === 'special'
                      ? 'bg-rose-500 text-white hover:bg-rose-600'
                      : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'}`}>
                    <span>Enter Portal</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>
            ))}
          </div>

          {/* Bottom Hint */}
          <div className="mt-20 text-center animate-fade-in-up" style={{ animationDelay: '800ms' }}>
            <p className="text-text-muted font-semibold bg-bg-card/50 backdrop-blur-sm border border-border-light inline-block px-8 py-4 rounded-full shadow-sm">
              Don't have an account? <span className="text-primary cursor-pointer hover:underline">Contact school administration</span> to get your login credentials.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AllLogin;
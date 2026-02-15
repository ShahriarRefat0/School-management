"use client";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, GraduationCap, TrendingUp, Award, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  delay?: number;
  color: string;
}

function Counter({
  end,
  suffix = "",
  prefix = "",
  label,
  description,
  icon,
  delay = 0,
  color,
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timer);
  }, [end, delay, isVisible]);

  return (
    <div
      ref={counterRef}
      className={`transform transition-all duration-700 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <Card className="relative overflow-hidden border border-border-light backdrop-blur-sm bg-bg-card/80 shadow-xl hover:shadow-2xl dark:shadow-xl dark:shadow-teal-500/5 transition-all duration-500 group">
        {/* Animated Pattern Background */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`pattern-${label}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="1.5" fill="currentColor" className={color} />
                <circle cx="0" cy="0" r="1.5" fill="currentColor" className={color} />
                <circle cx="40" cy="40" r="1.5" fill="currentColor" className={color} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#pattern-${label})`} />
          </svg>
        </div>

        {/* Gradient Orb */}
        <div className={`absolute -top-20 -right-20 w-40 h-40 ${color} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
        
        {/* Diagonal Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <CardContent className="relative p-8 md:p-10">
          {/* Floating Icon Container */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Pulsing Ring */}
              <div className={`absolute inset-0 ${color} rounded-2xl blur-lg opacity-30 group-hover:opacity-50 animate-pulse-slow`} />
              
              {/* Icon Background */}
              <div className={`relative ${color} p-5 rounded-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl`}>
                <div className="text-white relative">
                  {icon}
                  {/* Sparkle Effect */}
                  <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" />
                </div>
              </div>
            </div>
          </div>

          {/* Counter Number with Glow */}
          <div className="text-center mb-3 relative">
            <div className={`absolute inset-0 ${color} blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
            <h3 className={`text-6xl md:text-7xl font-black relative ${color} bg-clip-text text-transparent drop-shadow-lg`}>
              {prefix}
              {count.toLocaleString()}
              {suffix}
            </h3>
          </div>

          {/* Label with underline */}
          <div className="relative inline-block w-full">
            <p className="text-xl font-bold text-text-primary text-center mb-2 relative z-10">
              {label}
            </p>
            <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 ${color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
          </div>

          {/* Description */}
          {description && (
            <p className="text-sm text-text-muted text-center leading-relaxed mt-3">
              {description}
            </p>
          )}

          {/* Corner Accent */}
          <div className={`absolute top-0 right-0 w-20 h-20 ${color} opacity-10 rounded-bl-full`} />
          <div className={`absolute bottom-0 left-0 w-16 h-16 ${color} opacity-10 rounded-tr-full`} />
        </CardContent>
      </Card>
    </div>
  );
}

export default function Statistics() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Dramatic Background with Mesh Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-blue-950/30 dark:to-purple-950/20" />
      
      {/* Geometric Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-900 dark:text-slate-100"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Animated Floating Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-teal-400/20 to-blue-500/20 dark:from-teal-600/10 dark:to-blue-700/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-500/20 dark:from-purple-600/10 dark:to-pink-700/10 rounded-full blur-3xl animate-float-delay" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 dark:from-blue-600/10 dark:to-cyan-700/10 rounded-full blur-3xl animate-float-slow" />
        
        {/* Diagonal Lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-teal-500/20 to-transparent" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
        
        {/* Abstract Shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border-2 border-teal-500/20 dark:border-teal-400/10 rounded-full animate-spin-slow" />
        <div className="absolute bottom-32 left-32 w-24 h-24 border-2 border-purple-500/20 dark:border-purple-400/10 rotate-45 animate-pulse-slow" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Decorative Elements */}
        <div className="text-center mb-20 md:mb-24 relative">

          <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-6"
            >
              Excellence in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500">
                Education
              </span>
            </motion.h1>

          <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed font-medium">
            Transforming lives through quality education and dedicated teaching
          </p>
      
        </div>

        {/* Statistics Grid with Staggered Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          <Counter
            end={1250}
            suffix="+"
            label="Total Students"
            description="Enrolled across all programs"
            icon={<Users size={36} strokeWidth={2.5} />}
            color="bg-gradient-to-br from-teal-500 to-cyan-600 dark:from-teal-600 dark:to-cyan-700"
            delay={0}
          />
          <Counter
            end={85}
            suffix="+"
            label="Expert Teachers"
            description="Highly qualified educators"
            icon={<GraduationCap size={36} strokeWidth={2.5} />}
            color="bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-600 dark:to-indigo-700"
            delay={100}
          />
          <Counter
            end={98}
            suffix="%"
            label="Success Rate"
            description="Student achievement rate"
            icon={<TrendingUp size={36} strokeWidth={2.5} />}
            color="bg-gradient-to-br from-purple-500 to-pink-600 dark:from-purple-600 dark:to-pink-700"
            delay={200}
          />
          <Counter
            end={150}
            suffix="+"
            label="Awards Won"
            description="Academic & sports excellence"
            icon={<Award size={36} strokeWidth={2.5} />}
            color="bg-gradient-to-br from-amber-500 to-orange-600 dark:from-amber-600 dark:to-orange-700"
            delay={300}
          />
        </div>

        {/* Bottom CTA with Enhanced Design */}
        <div className="text-center mt-20 md:mt-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-blue-500/5 to-purple-500/5 dark:from-teal-500/10 dark:via-blue-500/10 dark:to-purple-500/10 blur-3xl rounded-full" />
          
          <p className="text-text-secondary mb-8 text-xl font-medium relative">
            Join our growing community of learners and achievers
          </p>
          
          <button className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-500 text-white text-lg font-bold rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/40 dark:hover:shadow-teal-400/30 hover:scale-105 hover:-translate-y-1">
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <span className="relative z-10 flex items-center gap-3">
              Explore More
              <svg
                className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
            
            {/* Rotating Border */}
            <div className="absolute inset-0 rounded-full border-4 border-white/20 group-hover:rotate-180 transition-transform duration-700" />
          </button>
        </div>
      </div>


    </section>
  );
}
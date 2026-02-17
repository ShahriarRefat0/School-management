"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, GraduationCap, TrendingUp, Award } from "lucide-react";
import { motion } from "framer-motion";
import DefaultWeight from "@/components/shared/defaultWeight/DefaultWeight";

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
}

function Counter({
  end,
  suffix = "",
  label,
  description,
  icon,
  delay = 0,
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Detect when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  // Counter animation
  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
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
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, end, delay]);

  return (
    <div ref={ref}>
      <Card className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
        <CardContent className="p-8 text-center">
          
          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="p-4 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
              {icon}
            </div>
          </div>

          {/* Number */}
          <h3 className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {count.toLocaleString()}
            {suffix}
          </h3>

          {/* Label */}
          <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            {label}
          </p>

          {/* Description */}
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            {description}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Statistics() {
  return (
    <DefaultWeight>
    <section className=" ">
      <div className="container mx-auto px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white"
          >
            Excellence in{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Education
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
          >
            Transforming lives through quality education and dedicated teaching.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Counter
            end={1250}
            suffix="+"
            label="Total Students"
            description="Enrolled across all programs"
            icon={<Users size={32} strokeWidth={2.5} />}
          />
          <Counter
            end={85}
            suffix="+"
            label="Expert Teachers"
            description="Highly qualified educators"
            icon={<GraduationCap size={32} strokeWidth={2.5} />}
            delay={100}
          />
          <Counter
            end={98}
            suffix="%"
            label="Success Rate"
            description="Student achievement rate"
            icon={<TrendingUp size={32} strokeWidth={2.5} />}
            delay={200}
          />
          <Counter
            end={150}
            suffix="+"
            label="Awards Won"
            description="Academic & sports excellence"
            icon={<Award size={32} strokeWidth={2.5} />}
            delay={300}
          />
        </div>

  
       
        {/* Bottom CTA with Enhanced Design */}
        <div className="text-center mt-20 md:mt-24 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-blue-500/5 to-purple-500/5 dark:from-teal-500/10 dark:via-blue-500/10 dark:to-purple-500/10 blur-3xl rounded-full" />
          
          <p className="text-text-secondary mb-8 text-lg font-medium relative">
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
    </DefaultWeight>
  );
}

'use client';

import { useEffect, useState, useRef } from 'react';
import {
  Users,
  GraduationCap,
  TrendingUp,
  Award,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface CounterProps {
  end: number;
  suffix?: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  delay?: number;
}

function Counter({
  end,
  suffix = '',
  label,
  description,
  icon,
  accent,
  delay = 0,
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

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
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: 'easeOut' },
        },
      }}
      className="group relative bg-bg-card border border-border-light p-8 rounded-[2.5rem] hover:border-primary/20 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(37,99,235,0.06)] overflow-hidden"
    >
      {/* Background Decor - Now scaling from bottom */}
      <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-[4] transition-transform duration-700 pointer-events-none" />

      {/* Icon with accent color */}
      <div
        className={`w-16 h-16 rounded-2xl ${accent} flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:rotate-12`}
      >
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-primary transition-colors">
        {count.toLocaleString()}
        {suffix}
      </h3>

      <p className="text-text-secondary leading-relaxed text-[15px] mb-6">
        <span className="font-bold text-text-primary block mb-1">{label}</span>
        {description}
      </p>

      <div className="flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
        <span>View Stats</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </motion.div>
  );
}

// Stagger animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Statistics() {
  // Accent colors for each counter (matching Features pattern)
  const counterAccents = [
    'bg-blue-500/10 text-blue-600',
    'bg-purple-500/10 text-purple-600',
    'bg-emerald-500/10 text-emerald-600',
    'bg-amber-500/10 text-amber-600',
  ];

  return (
    <section className="py-20 bg-bg-page border-border-light transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header with animated line (matching Features) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-primary font-bold tracking-widest uppercase text-[11px] mb-3 block">
              Our Achievements
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary leading-tight">
              A Track Record <br /> of Excellence
            </h2>
          </div>
          <div className="hidden md:block">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-1.5 bg-primary rounded-full"
            ></motion.div>
          </div>
        </motion.div>

        {/* Grid with Stagger Effect */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <Counter
            end={1250}
            suffix="+"
            label="Total Students"
            description="Enrolled across all programs"
            icon={<Users className="w-8 h-8" />}
            accent={counterAccents[0]}
          />
          <Counter
            end={85}
            suffix="+"
            label="Expert Teachers"
            description="Highly qualified educators"
            icon={<GraduationCap className="w-8 h-8" />}
            accent={counterAccents[1]}
            delay={100}
          />
          <Counter
            end={98}
            suffix="%"
            label="Success Rate"
            description="Student achievement rate"
            icon={<TrendingUp className="w-8 h-8" />}
            accent={counterAccents[2]}
            delay={200}
          />
          <Counter
            end={150}
            suffix="+"
            label="Awards Won"
            description="Academic & sports excellence"
            icon={<Award className="w-8 h-8" />}
            accent={counterAccents[3]}
            delay={300}
          />
        </motion.div>

        {/* Bottom CTA with animation */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 p-8 bg-bg-card border border-border-light rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 hover:border-primary/20 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(37,99,235,0.06)]"
        >
          <div>
            <h4 className="text-2xl font-bold text-text-primary mb-2">
              Proud of Our Journey
            </h4>
            <p className="text-text-secondary text-[15px]">
              Join us in creating more success stories together.
            </p>
          </div>
          <button className="px-8 py-4 bg-primary text-white rounded-2xl font-bold text-sm uppercase tracking-wider hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/10 flex items-center gap-2 group">
            View All Achievements
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

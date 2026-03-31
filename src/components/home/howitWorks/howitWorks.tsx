'use client';

import React from 'react';
import { UserPlus, Database, Rocket, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const stepsData = [
  {
    id: 1,
    title: 'Create Account',
    description: 'Quickly sign up and get access to your personalized dashboard instantly.',
    icon: <UserPlus className="w-8 h-8" />,
    accent: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
    stepBg: 'bg-blue-500', // Card 1 er jonno Blue
  },
  {
    id: 2,
    title: 'Connect Database',
    description: 'Securely link your MongoDB URI and sync your data in just a few clicks.',
    icon: <Database className="w-8 h-8" />,
    accent: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400',
    stepBg: 'bg-purple-500', // Card 2 er jonno Purple
  },
  {
    id: 3,
    title: 'Go Live',
    description: 'Start managing your blogs and tracking analytics from one powerful panel.',
    icon: <Rocket className="w-8 h-8" />,
    accent: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
    stepBg: 'bg-emerald-500', // Card 3 er jonno Emerald
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-bg-page py-24 transition-colors duration-300">
      <div className="max-w-310 mx-auto px-4">
        
        {/* Header - Exactly like your Features section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-bold tracking-widest uppercase text-[11px] mb-3 block">
              The Process
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary leading-tight">
              Get Started in Three <br /> Simple Steps
            </h2>
          </div>
          <div className="hidden md:block">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-1.5 bg-primary rounded-full"
            />
          </div>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {stepsData.map((step, index) => (
            <motion.div
              key={step.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="group relative"
            >
              {/* Card - Mirroring Features Card Design */}
              <div className="relative h-full bg-bg-card border border-border-light p-8 rounded-[2.5rem] hover:border-primary/20 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(37,99,235,0.06)] overflow-hidden">
                
                {/* Background Decor Circle */}
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-[4] transition-transform duration-700 pointer-events-none" />

                {/* Step Number Badge - Specific BG for each */}
                <div className={`relative z-10 w-10 h-10 rounded-xl ${step.stepBg} text-white bg-amber-600 flex items-center justify-center font-bold mb-8 shadow-lg`}>
                  {step.id}
                </div>

                {/* Icon Container - Matching Features Icon Logic */}
                <div className={`relative z-10 w-16 h-16 rounded-2xl ${step.accent} flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:rotate-12`}>
                  {step.icon}
                </div>

                {/* Text Content */}
                <h3 className="relative z-10 text-2xl font-bold text-text-primary mb-4 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="relative z-10 text-text-secondary leading-relaxed text-[15px] mb-6">
                  {step.description}
                </p>

                {/* Bottom Interaction - Like "Learn More" in Features */}
                <div className="flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span>Next Step</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Arrow Connector between cards - Desktop only */}
              {index < stepsData.length - 1 && (
                <div className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20">
                  <div className="w-10 h-10 rounded-full bg-bg-card border border-border-light flex items-center justify-center shadow-md">
                    <ArrowRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors" />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
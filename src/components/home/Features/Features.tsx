'use client';

import React from 'react';
import {
  MonitorPlay,
  Cpu,
  LibraryBig,
  BusFront,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion'; 
import DefaultWeight from '@/components/shared/defaultWeight/DefaultWeight';

const featuresData = [
  {
    id: 1,
    title: 'Digital Classroom',
    description:
      'Modern smart boards and projector-equipped rooms making learning interactive and engaging.',
    icon: <MonitorPlay className="w-8 h-8" />,
    accent: 'bg-blue-500/10 text-blue-600',
  },
  {
    id: 2,
    title: 'Multimedia  Lab',
    description:
      'Advanced computer labs where students gain hands-on experience with the latest technology.',
    icon: <Cpu className="w-8 h-8" />,
    accent: 'bg-purple-500/10 text-purple-600',
  },
  {
    id: 3,
    title: 'Enriched Library',
    description:
      "A vast collection of books and digital resources to satisfy our students' thirst for knowledge.",
    icon: <LibraryBig className="w-8 h-8" />,
    accent: 'bg-emerald-500/10 text-emerald-600',
  },
  {
    id: 4,
    title: 'Safe Transport',
    description:
      'Dedicated school bus service with real-time monitoring to ensure a safe commute for every child.',
    icon: <BusFront className="w-8 h-8" />,
    accent: 'bg-amber-500/10 text-amber-600',
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
    },
  },
};

const Features = () => {
  return (
    <DefaultWeight>
      <section className="bg-bg-page transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Header Animation */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin:'-100px' }}
            // variants={fadeInUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div className="max-w-2xl">
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">
                Our Features
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-text-primary leading-tight">
                Why Should Parents <br /> Choose Our School?
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

          {/* Features Grid with Stagger Effect */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuresData.map((feature) => (
              <motion.div
                key={feature.id}
                // variants={fadeInUp}
                className="group relative bg-bg-card border border-border-light p-8 rounded-[2.5rem] hover:border-primary/20 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(37,99,235,0.06)] overflow-hidden"
              >
                {/* Background Decor */}
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-[4] transition-transform duration-700 pointer-events-none" />

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl ${feature.accent} flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:rotate-12`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold text-text-primary mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed text-[15px] mb-6">
                  {feature.description}
                </p>

                <div className="flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </DefaultWeight>
  );
};

export default Features;

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Quote,
  ArrowRight,
  X,
  Award,
  BookOpen,
  Mail,
  Linkedin,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PrincipalMessage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
  }, [isOpen]);

  return (
    <section className="relative py-24 overflow-hidden bg-transparent transition-colors duration-500">
      {/* 🔹 Minimal Background Element */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-primary/[0.02] -skew-x-12 translate-x-1/4 -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* LEFT: Image Section */}
          <div className="lg:col-span-5 relative group">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative z-10"
            >
              <div className="relative rounded-[2rem] overflow-hidden border border-border-light bg-bg-card p-2 shadow-sm transition-all group-hover:border-primary/20">
                <Image
                  src="https://i.ibb.co.com/JjGQ1xTX/1766077214962.jpg"
                  alt="Principal"
                  width={1000}
                  height={1050}
                  className="w-full h-[500px] object-cover rounded-[1.8rem] grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Floating Award Badge */}
              <div className="absolute -bottom-6 -right-6 bg-bg-card/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-border-light flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                  <Award size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">
                    Global Scholar
                  </p>
                  <p className="text-sm font-bold text-text-primary">
                    Award Winner 2024
                  </p>
                </div>
              </div>
            </motion.div>
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary/20 rounded-tl-[2rem] -z-10" />
          </div>

          {/* RIGHT: Content Section */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-[1px] bg-primary"></span>
                <span className="text-primary font-bold tracking-[0.3em] text-[10px] uppercase">
                  Principal&apos;s Message
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-text-primary leading-[1.15] tracking-tight">
                Education is the <br />
                <span className="text-primary italic font-medium">
                  Foundation
                </span>{' '}
                of Future.
              </h2>
            </div>

            <div className="relative">
              <Quote className="text-primary/5 absolute -top-8 -left-8 w-16 h-16 -z-10" />
              <div className="text-text-secondary text-lg leading-relaxed space-y-6">
                <p className="font-medium text-text-primary border-l-2 border-primary pl-6 py-1">
                  &quot;We are not just building a school; we are nurturing a
                  home for the leaders and innovators of tomorrow.&quot;
                </p>
                <p className="text-base opacity-80">
                  Our commitment is to provide an inclusive environment where
                  every student is inspired to reach their highest potential. We
                  merge timeless ethics with modern technological skills.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 pt-8 border-t border-border-light/50">
              <div className="space-y-1">
                <h4 className="text-xl font-bold text-text-primary">
                  Dr. Mahfuz Ahmed Ony
                </h4>
                <p className="text-text-muted text-xs font-medium uppercase tracking-wider">
                  PhD in Education, Oxford University
                </p>
              </div>

              <button
                onClick={() => setIsOpen(true)}
                className="group flex items-center gap-2 text-primary font-bold text-sm hover:gap-4 transition-all"
              >
                Read Biography <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MINIMAL MODAL --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-text-primary/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-bg-card w-full max-w-3xl overflow-hidden rounded-[2rem] shadow-2xl border border-border-light"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 text-text-muted hover:text-primary transition-colors z-20"
              >
                <X size={20} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-2 bg-bg-page/50 p-10 flex flex-col items-center border-r border-border-light">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden mb-6 border border-border-light p-1 bg-bg-card">
                    <Image
                      src="https://i.ibb.co.com/JjGQ1xTX/1766077214962.jpg"
                      alt="Principal"
                      width={150}
                      height={150}
                      className="w-full h-full object-cover rounded-xl grayscale"
                    />
                  </div>
                  <div className="text-center space-y-1">
                    <h3 className="text-sm font-bold text-text-primary uppercase tracking-tight">
                      Dr. Mahfuz Ony
                    </h3>
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest">
                      Since 2018
                    </p>
                  </div>

                  <div className="w-full mt-8 space-y-3">
                    <div className="flex items-center gap-3 text-text-muted">
                      <BookOpen size={14} className="text-primary" />
                      <span className="text-[11px] font-medium">
                        Oxford Alumnus
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-text-muted">
                      <Mail size={14} className="text-primary" />
                      <span className="text-[11px] font-medium">
                        principal@school.edu
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-3 p-10 space-y-6">
                  <h2 className="text-2xl font-bold text-text-primary tracking-tight">
                    Professional Journey
                  </h2>
                  <p className="text-sm text-text-secondary leading-relaxed opacity-90">
                    With over 25 years of experience in educational leadership,
                    Dr. Mahfuz has pioneered several digital transformation
                    initiatives in the academic sector.
                  </p>

                  <div className="p-5 bg-bg-page border border-border-light rounded-2xl italic text-sm text-text-secondary leading-relaxed">
                    &quot;I believe curiosity is the greatest teacher. Our
                    mission is to keep that spark alive in every student.&quot;
                  </div>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full py-4 bg-primary text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-all"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PrincipalMessage;

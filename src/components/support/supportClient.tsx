'use client';

import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, ArrowRight, HelpCircle, PhoneCall, Mail, Search } from 'lucide-react';

const colorMap: Record<string, string> = {
  blue: 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
  purple: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400',
  emerald: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
  amber: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
  rose: 'bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400',
};

const SupportClient = ({ initialOptions }: { initialOptions: any[] }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: "How do I contact the Super Admin directly?",
      answer: "You can use the Live Chat (coming soon) or the Email Assistance channel. Super admins are also available via the direct hotline for urgent matters."
    },
    {
      question: "What are the support working hours?",
      answer: "Our technical team is available 24/7 for critical server issues. General support is available from 9:00 AM to 6:00 PM."
    },
    {
      question: "Is there any fee for technical support?",
      answer: "No, technical support regarding portal bugs and school management issues is completely free for all our registered users."
    },
    {
      question: "How long does it take to resolve an issue?",
      answer: "Critical issues are resolved within 2-4 hours. General queries may take up to 24 hours depending on the complexity of the request."
    }
  ];

  return (
    <section 
      id="support" 
      className="relative bg-bg-page transition-colors duration-300 py-24 pt-36 overflow-hidden"
    >
      {/* --- Ambient Background Effects --- */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-50 mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px] opacity-50 mix-blend-multiply dark:mix-blend-screen pointer-events-none" />

      <div className="max-w-310 mx-auto px-4 relative z-10">
        
        {/* --- Header Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-[10px] uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              24/7 Dedicated Support
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-text-secondary leading-tight tracking-tight">
              Need Help? Our Team <br /> Is Ready To Assist
            </h2>
          </div>

          <div className="w-full md:w-auto relative max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-text-secondary/50" />
            </div>
            <input
              type="text"
              placeholder="Search knowledge base..."
              className="w-full bg-bg-card/50 backdrop-blur-md border border-border-light rounded-2xl py-4 pl-12 pr-4 text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* --- Support Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {initialOptions?.map((option, index) => {
            const IconComponent = (LucideIcons as any)[option.iconName] || LucideIcons.HelpCircle;
            const accentClass = colorMap[option.accentColor] || colorMap.blue;

            return (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={option.id}
                className="group relative bg-bg-card/40 backdrop-blur-xl border border-white/20 dark:border-white/5 p-8 rounded-[2.5rem] hover:bg-bg-card hover:border-primary/30 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(37,99,235,0.1)] overflow-hidden flex flex-col items-start"
              >
                {/* Background Decor */}
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full group-hover:scale-[4] transition-transform duration-700 pointer-events-none" />

                {/* Status Badge */}
                <div className="absolute top-6 right-6 z-10">
                  <span className={`text-[9px] font-black px-2.5 py-1.5 rounded-xl uppercase tracking-widest backdrop-blur-md border border-white/10 ${accentClass}`}>
                    {option.status}
                  </span>
                </div>

                {/* Icon Container */}
                <div className="relative mb-8">
                  <div className={`absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 ${accentClass}`} />
                  <div className={`relative w-16 h-16 rounded-2xl ${accentClass} bg-opacity-50 backdrop-blur-md border border-white/10 dark:border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 z-10`}>
                    <IconComponent className="w-7 h-7" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors relative z-10">
                  {option.title}
                </h3>
                <p className="text-text-secondary leading-relaxed text-[15px] mb-8 flex-grow relative z-10">
                  {option.description}
                </p>

                <Link href={option.link || "#"} className="mt-auto inline-flex items-center gap-2 bg-bg-page border border-border-light text-text-primary px-5 py-2.5 rounded-xl font-bold text-sm group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 hover:gap-3 group-hover:shadow-lg group-hover:shadow-primary/20 relative z-10">
                  <span>{option.actionLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* --- FAQ Section --- */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-xs font-black uppercase tracking-widest mb-4">
              Knowledge Base
            </span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4 tracking-tight">Frequently Asked Questions</h3>
            <p className="text-text-secondary max-w-2xl mx-auto text-lg">Find quick answers to common queries from our administrators and parents.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                key={index}
                className={`bg-bg-card/40 backdrop-blur-lg border rounded-2xl overflow-hidden transition-all duration-300 ${openFaq === index ? 'border-primary/40 shadow-lg shadow-primary/5' : 'border-border-light hover:border-primary/20'}`}
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 lg:p-8 flex justify-between items-center text-left group"
                >
                  <span className="font-bold text-text-primary text-lg group-hover:text-primary transition-colors pr-8">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === index ? "bg-primary text-white rotate-180" : "bg-bg-page text-text-secondary group-hover:bg-primary/10 group-hover:text-primary"}`}>
                    <ChevronDown size={20} />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-8 lg:px-8 text-text-secondary leading-relaxed border-t border-border-light pt-6 text-[15px]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- Premium Contact CTA Banner --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 relative overflow-hidden rounded-[2.5rem] p-10 md:p-16 border border-white/20 dark:border-white/10 bg-gradient-to-br from-primary to-[#4F46E5] shadow-2xl shadow-primary/20"
        >
          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]"></div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-24 -right-24 w-64 h-64 border-[30px] border-white/10 rounded-full blur-sm"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 border-[40px] border-white/10 rounded-full blur-sm"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-center lg:text-left text-white">
              <h4 className="font-extrabold text-3xl md:text-5xl mb-4 tracking-tight leading-tight">Can't find what you're <br className="hidden md:block"/> looking for?</h4>
              <p className="text-white/80 text-lg md:text-xl max-w-xl">Our expert support team is on standby to assist you with any technical difficulty or general inquiry.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <button className="flex items-center justify-center gap-3 bg-white text-primary hover:bg-gray-50 px-8 py-4 rounded-2xl font-bold transition-all shadow-xl active:scale-95 whitespace-nowrap group">
                <PhoneCall size={20} className="group-hover:animate-bounce" />
                Call Support
              </button>
              <button className="flex items-center justify-center gap-3 bg-white/10 border border-white/20 text-white hover:bg-white/20 px-8 py-4 rounded-2xl font-bold transition-all backdrop-blur-md active:scale-95 whitespace-nowrap group">
                <Mail size={20} className="group-hover:translate-x-1 transition-transform" />
                Email Us
              </button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SupportClient;
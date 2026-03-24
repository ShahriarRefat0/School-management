'use client';

import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';

// কালার ম্যাপিং লজিক
const colorMap: Record<string, string> = {
  blue: 'bg-blue-500/10 text-blue-600',
  purple: 'bg-purple-500/10 text-purple-600',
  emerald: 'bg-emerald-500/10 text-emerald-600',
  amber: 'bg-amber-500/10 text-amber-600',
};

const SupportClient = ({ initialOptions }: { initialOptions: any[] }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    }
  ];

  return (
    <section 
      id="support" 
      className="bg-bg-page transition-colors duration-300 py-24 pt-36"
    >
      {/* আপনার Features সেকশনের মতো হুবহু উইডথ (max-w-310) */}
      <div className="max-w-310 mx-auto px-4 md:px-0">
        
        {/* --- Header Section (Matching your Features.tsx style) --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-primary font-bold tracking-widest uppercase text-[11px] mb-3 block">
              Support Center
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary leading-tight">
              Need Help? Our Super Admins <br /> Are Ready To Assist
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

        {/* --- Support Cards (Dynamic Data from initialOptions) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8  mb-28">
          {initialOptions?.map((option) => {
            const IconComponent = (LucideIcons as any)[option.iconName] || LucideIcons.HelpCircle;
            const accentClass = colorMap[option.accentColor] || colorMap.blue;

            return (
              <motion.div
                key={option.id}
                className="group relative bg-bg-card border  p-8 rounded-[2.5rem] hover:border-primary/20 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(37,99,235,0.06)] overflow-hidden flex flex-col items-start"
              >
                {/* Background Decor */}
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-[4] transition-transform duration-700 pointer-events-none" />

                {/* Status Badge */}
                <div className="absolute top-8 right-8">
                  <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-wider ${accentClass}`}>
                    {option.status}
                  </span>
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${accentClass} flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:rotate-12`}>
                  <IconComponent className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-text-primary mb-4 group-hover:text-primary transition-colors">
                  {option.title}
                </h3>
                <p className="text-text-secondary leading-relaxed text-[15px] mb-6 flex-grow">
                  {option.description}
                </p>

                <Link href={option.link || "#"} className="flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <span>{option.actionLabel}</span>
                  <LucideIcons.ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* --- FAQ Section (Same Container Width) --- */}
        <div className="pt-20 border-t border-border-light">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-extrabold text-text-primary mb-3">Frequently Asked Questions</h3>
            <p className="text-text-secondary">Quick answers to common queries from our administrators.</p>
          </div>

          {/* FAQ Container - একটু ছোট উইডথ দেওয়া হয়েছে রিডিবিলিটির জন্য কিন্তু সেন্টারে থাকবে */}
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-bg-card border border-border-light rounded-[1.5rem] overflow-hidden transition-all hover:border-primary/20"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 flex justify-between items-center text-left group"
                >
                  <span className="font-bold text-text-primary text-lg group-hover:text-primary transition-colors">{faq.question}</span>
                  <div className={`transition-transform duration-300 ${openFaq === index ? "rotate-180 text-primary" : "text-text-secondary"}`}>
                    <LucideIcons.ChevronDown size={22} />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-text-secondary leading-relaxed border-t border-border-light/50 pt-4 text-[15px]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Banner */}
          <div className="mt-20 p-8 md:p-12 rounded-[2.5rem] bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex items-center gap-5 text-center md:text-left flex-col md:flex-row">
                <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                   <HelpCircle size={28} />
                </div>
                <div>
                   <h4 className="text-text-primary font-bold text-2xl">Still have questions?</h4>
                   <p className="text-text-secondary">Our team is ready to assist you personally via call or email.</p>
                </div>
             </div>
             <button className="bg-primary hover:bg-primary-hover text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-primary/20 active:scale-95 whitespace-nowrap">
                Contact Us Now
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportClient;
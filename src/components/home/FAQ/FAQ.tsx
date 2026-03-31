'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqData = [
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a 14-day free trial with full access to all premium features so you can test the workflow."
  },
  {
    question: "How secure is my MongoDB data?",
    answer: "Extremely secure. We use end-to-end encryption and never store your actual database credentials on our servers."
  },
  {
    question: "Can I customize the dashboard layout?",
    answer: "Absolutely. Our drag-and-drop interface allows you to arrange widgets and components exactly how you need them."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="bg-bg-page py-24">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-text-primary">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="border border-border-light rounded-2xl bg-bg-card overflow-hidden">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-primary/5"
              >
                <span className="font-bold text-text-primary">{item.question}</span>
                {activeIndex === index ? <Minus className="text-primary" /> : <Plus className="text-primary" />}
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-text-secondary text-sm leading-relaxed"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
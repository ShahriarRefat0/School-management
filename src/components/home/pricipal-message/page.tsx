"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Quote,
  ArrowRight,
  X,
  Award,
  BookOpen,
  Target,
  Mail,
} from "lucide-react";
import DefaultWeight from "@/components/shared/defaultWeight/DefaultWeight";

const Principal_Message = () => {
  const [isOpen, setIsOpen] = useState(false);

  // মোডাল ওপেন থাকলে স্ক্রল বন্ধ রাখার জন্য
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    // bg-bg-page ব্যবহার করা হয়েছে যা আপনার লাইট মোডে #F8FAFC দেখাবে
    <section className="relative py-24 overflow-hidden bg-bg-page transition-colors duration-300">
      
      {/* Background Decorations - আপনার থিমের প্রাইমারি কালার অনুযায়ী */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-1/4 -z-10" />

        <div className="max-w-[1600px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* LEFT: Image Section */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10">
                {/* border-bg-card ব্যবহার করা হয়েছে যা লাইট মোডে সাদা দেখাবে */}
                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-bg-card bg-bg-card">
                  <Image
                    src="/mahfuz.jpeg"
                    alt="Principal"
                    width={600}
                    height={800}
                    className="w-full h-[550px] object-cover"
                  />
                </div>
                {/* Floating Badge - bg-bg-card লাইট মোডে সাদা */}
                <div className="absolute -bottom-8 -left-8 bg-bg-card p-6 rounded-2xl shadow-xl border border-border-light hidden md:flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shrink-0 shadow-lg">
                    <Award size={24} />
                  </div>
                  <div>
                    {/* text-text-primary লাইট মোডে গাঢ় নীল/কালো দেখাবে */}
                    <p className="text-text-primary font-black text-xl leading-none uppercase">
                      Global Scholar
                    </p>
                    <p className="text-text-muted text-xs uppercase tracking-tighter mt-1">
                      Award Winner 2024
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-full h-full border-2 border-primary rounded-[2rem] -z-10 opacity-30" />
            </div>

            {/* RIGHT: Content Section */}
            <div className="lg:col-span-7">
              <div className="space-y-8">
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-2">
                    <span className="w-10 h-[2.5px] bg-primary"></span>
                    <span className="text-primary font-bold tracking-[0.2em] text-sm uppercase">
                      Principal&apos;s Desk
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-text-primary leading-[1.1]">
                    Learning is the{" "}
                    <span className="text-primary">Heartbeat</span> of
                    Progress.
                  </h2>
                </div>

                <div className="relative">
                  <Quote className="text-primary/10 absolute -top-10 -left-6 w-20 h-20 -z-10" />
                  <div className="text-text-secondary text-lg leading-relaxed space-y-6 relative z-10 text-left">
                    <p className="italic font-medium text-text-primary border-l-4 border-primary pl-4 bg-primary/5 py-2">
                      Welcome to Edura. We are not just building a school; we
                      are creating a legacy of excellence and a home for future
                      innovators.
                    </p>
                    <p>
                      Our commitment is to provide an environment where every
                      child feels valued and inspired to achieve their best. At
                      Edura, we merge traditional ethics with 21st-century
                      skills.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-border-light">
                  <div className="text-left">
                    <h4 className="text-2xl font-black text-text-primary">
                      Dr. Mahfuz Ahmed Ony
                    </h4>
                    <p className="text-primary font-semibold text-xs uppercase tracking-wide">
                      PhD in Education, Oxford University
                    </p>
                  </div>

                  <button
                    onClick={() => setIsOpen(true)}
                    className="group flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all duration-300 shadow-lg"
                  >
                    Full Biography
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-2 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- FULL BIOGRAPHY MODAL --- */}
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop - text-primary কালারকে অপাসিটি দিয়ে ব্যবহার করা হয়েছে */}
            <div
              className="absolute inset-0 bg-text-primary/80 backdrop-blur-md transition-opacity"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content - bg-bg-card লাইট মোডে সাদা */}
            <div className="relative bg-bg-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl border border-border-light animate-in fade-in zoom-in duration-300">
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 bg-bg-page text-text-primary hover:bg-red-500 hover:text-white rounded-full transition-all z-10"
              >
                <X size={24} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Modal Left Side */}
                <div className="md:col-span-4 bg-bg-page p-8 flex flex-col items-center border-r border-border-light">
                  <div className="w-48 h-48 rounded-full border-8 border-bg-card shadow-xl overflow-hidden mb-6">
                    <Image
                      src="/mahfuz.jpeg"
                      alt="Principal"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-black text-text-primary text-center uppercase tracking-tight">
                    Dr. Mahfuz Ahmed Ony
                  </h3>
                  <p className="text-primary text-sm font-bold mb-8 text-center uppercase">
                    Principal since 2018
                  </p>

                  <div className="w-full space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-bg-card rounded-xl shadow-sm border border-border-light">
                      <BookOpen className="text-primary" size={18} />
                      <span className="text-xs font-bold text-text-secondary">
                        Oxford University (PhD)
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-bg-card rounded-xl shadow-sm border border-border-light">
                      <Mail className="text-primary" size={18} />
                      <span className="text-xs font-bold text-text-secondary">
                        principal@edura.com
                      </span>
                    </div>
                  </div>
                </div>

                {/* Modal Right Side */}
                <div className="md:col-span-8 p-10 md:p-14 text-left">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-3xl font-black text-text-primary mb-4 flex items-center gap-3 tracking-tight">
                        <Target className="text-primary" /> Professional
                        Journey
                      </h2>
                      <p className="text-text-secondary leading-relaxed text-lg">
                        With over 25 years of experience in educational
                        leadership across three continents, Dr. Mahfuz Ahmed Ony
                        has been a visionary force at Edura.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-3 uppercase tracking-wider">
                        Educational Philosophy
                      </h3>
                      <p className="text-text-secondary leading-relaxed italic border-l-4 border-primary pl-4 bg-primary/5 py-3">
                        &quot;I believe that every child is a potential leader.
                        Our job is to provide the spark that ignites their
                        curiosity.&quot;
                      </p>
                    </div>

                    <div className="pt-6">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:opacity-90 transition-all active:scale-[0.98]"
                      >
                        Close Biography
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
    </section>
  );
};

export default Principal_Message;
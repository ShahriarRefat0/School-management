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

const PrincipalMessage = () => {
  const [isOpen, setIsOpen] = useState(false);

  // eti hoccce jokon modal on thakbe tar background blue hoye jabe ar off thakle hobe abr ager mto hoye jabe
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <DefaultWeight>
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 -skew-x-12 translate-x-1/4 -z-10" />

      <div className="max-w-[1600px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* LEFT: Image Section */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10">
              <div className="relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(30,39,86,0.3)] border-8 border-white">
                <Image
                  src="/mahfuz.jpeg"
                  alt="Principal"
                  width={600}
                  height={800}
                  className="w-full h-[550px] object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-[#1e2756] font-black text-xl leading-none">
                    Global Scholar
                  </p>
                  <p className="text-gray-500 text-xs uppercase tracking-tighter">
                    Award Winner 2024
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-blue-600 rounded-[2rem] -z-10" />
          </div>

          {/* RIGHT: Content Section */}
          <div className="lg:col-span-7">
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-10 h-[2px] bg-blue-600"></span>
                  <span className="text-blue-600 font-bold tracking-[0.2em] text-sm uppercase">
                    Principals Desk
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-[#1e2756] leading-[1.1]">
                  Learning is the{" "}
                  <span className="text-blue-600">Heartbeat</span> of Progress.
                </h2>
              </div>

              <div className="relative">
                <Quote className="text-blue-600/10 absolute -top-10 -left-6 w-20 h-20 -z-10" />
                <div className="text-gray-600 text-lg leading-relaxed space-y-6 relative z-10">
                  <p className="italic font-medium text-gray-800">
                    Welcome to Edura. We are not just building a school; we are
                    creating a legacy of excellence and a home for future
                    innovators.
                  </p>
                  <p>
                    Our commitment is to provide an environment where every
                    child feels valued and inspired to achieve their best. At
                    Edura, we merge traditional ethics with 21st-century skills.
                  </p>
                </div>
              </div>

              {/* Info & CTA */}
              <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <h4 className="text-2xl font-black text-[#1e2756]">
                    Dr. Mahfuz Ahmed Ony
                  </h4>
                  <p className="text-blue-600 font-semibold text-xs uppercase">
                    PhD in Education, Oxford University
                  </p>
                </div>

                <button
                  onClick={() => setIsOpen(true)}
                  className="group flex items-center gap-3 bg-[#1e2756] text-white px-8 py-4 rounded-full font-bold hover:bg-blue-600 transition-all duration-300 shadow-lg"
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

      {/* --- BIOGRAPHY MODAL --- */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#1e2756]/90 backdrop-blur-md transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in duration-300">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-red-500 hover:text-white rounded-full transition-all z-10"
            >
              <X size={24} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Modal Left: Image & Quick Stats */}
              <div className="md:col-span-4 bg-gray-50 p-8 flex flex-col items-center border-r border-gray-100">
                <div className="w-48 h-48 rounded-full border-8 border-white shadow-xl overflow-hidden mb-6">
                  <Image
                    src="/mahfuz.jpeg"
                    alt="Principal"
                    width={200}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-black text-[#1e2756] text-center uppercase tracking-tight">
                  Dr. Mahfuz Ahmed Ony
                </h3>
                <p className="text-blue-600 text-sm font-bold mb-8 text-center">
                  Principal since 2018
                </p>

                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                    <BookOpen className="text-blue-600" size={18} />
                    <span className="text-xs font-bold text-gray-700">
                      Oxford University (PhD)
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                    <Award className="text-yellow-500" size={18} />
                    <span className="text-xs font-bold text-gray-700">
                      Global Educator Award
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                    <Mail className="text-green-500" size={18} />
                    <span className="text-xs font-bold text-gray-700">
                      principal@edura.com
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Right: Detailed Biography */}
              <div className="md:col-span-8 p-10 md:p-14">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-black text-[#1e2756] mb-4 flex items-center gap-3">
                      <Target className="text-blue-600" />
                      Professional Journey
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      With over 25 years of experience in educational leadership
                      across three continents, Dr. Mahfuz Ahmed Ony has been a
                      visionary force at Edura. His journey began in classroom
                      teaching, but his passion for institutional growth led him
                      to complete his PhD in Educational Psychology at Oxford.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#1e2756] mb-3 uppercase tracking-wider">
                      Educational Philosophy
                    </h3>
                    <p className="text-gray-600 leading-relaxed italic border-l-4 border-blue-600 pl-4">
                      I believe that every child is a potential leader. Our job
                      is to provide the spark that ignites their curiosity. We
                      focus on Creative Intelligence rather than just Academic
                      Performance
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#1e2756] mb-3 uppercase tracking-wider">
                      Major Achievements
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <li className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                        Developed the SmartLearning curriculum used by 10+
                        schools.
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                        Speaker at World Education Forum 2022.
                      </li>
                      <li className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                        Published author of Future Classrooms.
                      </li>
                    </ul>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-full bg-[#1e2756] text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-[0.98]"
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
     </DefaultWeight>
  );
};

export default PrincipalMessage;

"use client";
import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-bg-card/80 backdrop-blur-md border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* ১. লোগো সেকশন */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-primary p-2 rounded-lg shadow-sm group-hover:rotate-3 transition-transform">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM3.85 9.58l8.15 4.44 8.15-4.44L12 5.14 3.85 9.58z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-text-dark tracking-tight">
              Schoology <span className="text-primary">BD</span>
            </span>
          </div>

          {/* ২. ডেস্কটপ মেনু (মাঝখানে) */}
          <div className="hidden md:flex items-center gap-10">
            {['Features', 'Pricing', 'Support', 'Privacy'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-text-body font-medium hover:text-primary transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* ৩. রাইট সাইড বাটন (Login & Mobile Toggle) */}
          <div className="flex items-center gap-4">
            <a 
              href="/login" 
              className="hidden sm:block text-primary font-semibold hover:text-primary-hover px-4 py-2 transition-colors"
            >
              Login
            </a>
            
            <button className="hidden md:block bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg transition-all active:scale-95">
              Get Started
            </button>

            {/* মোবাইল মেনু বাটন */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-secondary text-primary hover:bg-primary hover:text-white transition-all"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* মোবাইল মেনু ড্রপডাউন */}
      {isOpen && (
        <div className="md:hidden bg-bg-card border-b border-border-light animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {['Features', 'Pricing', 'Support', 'Privacy'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="block px-4 py-3 rounded-lg text-text-body font-medium hover:bg-secondary hover:text-primary transition-all"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <button className="w-full text-primary font-bold py-3">Login</button>
              <button className="w-full bg-primary text-white py-3 rounded-xl font-bold">Get Started Free</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
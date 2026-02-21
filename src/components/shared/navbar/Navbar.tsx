"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/shared/logo/logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false); // Hydration fix

  // ১. পেজ লোড হওয়ার সময় থিম চেক করা
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  // ২. থিম টগল ফাংশন
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  // মাউন্ট হওয়ার আগে নেভবার রেন্ডার হবে না (সাদা স্ক্রিন বা টেক্সট মিসিং এড়াতে)
  if (!mounted)
    return <div className="h-20 bg-bg-card border-b border-border-light"></div>;

  return (
    <nav className="sticky top-0 z-50 bg-bg-card/80 backdrop-blur-md border-b border-border-light transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* ১. লোগো সেকশন - এখানে text-text-dark নিশ্চিত করা হয়েছে */}
          <Link href="/">
            <Logo variant="dark" />
          </Link>

          {/* ২. ডেস্কটপ মেনু - text-text-secondary ব্যবহার করা হয়েছে */}
          <div className="hidden md:flex items-center gap-10">
            {["Features", "Pricing", "Support", "Privacy"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-text-secondary font-semibold hover:text-primary transition-colors relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* ৩. রাইট সাইড বাটন */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Dark/Light Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-secondary text-primary hover:bg-primary hover:text-white transition-all duration-300"
              aria-label="Toggle Theme">
              {isDarkMode ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l.707.707M6.343 6.343l.707-.707"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 118.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>


            <a
              href="/login"
              className="hidden sm:block text-primary font-bold hover:text-primary-hover px-4 py-2 transition-colors">

              Login
            </a>

            <button className="hidden md:block bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full font-bold shadow-md active:scale-95 transition-all">
              Get Started
            </button>

            {/* মোবাইল মেনু বাটন */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-secondary text-primary transition-all">
              {isOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* মোবাইল মেনু ড্রপডাউন - এখানেও ডার্ক টেক্সট নিশ্চিত করা হয়েছে */}
      {isOpen && (
        <div className="md:hidden bg-bg-card border-b border-border-light shadow-xl animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {["Features", "Pricing", "Support", "Privacy"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-text-secondary font-semibold hover:text-primary transition-colors relative group"
              >
                {item}
              </Link>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <button className="w-full bg-secondary text-primary font-bold py-3 rounded-xl">
                Login
              </button>
              <button className="w-full bg-primary text-white py-3 rounded-xl font-bold">
                Get Started Free
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;

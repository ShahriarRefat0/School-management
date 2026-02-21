"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/shared/logo/logo";
import { LogIn, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/theme/ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClickLogo = (e: React.MouseEvent) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-card/70 backdrop-blur-xl border-b border-border-light transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-22">
          <Link href="/" onClick={handleClickLogo} className="hover:opacity-90 transition-opacity">
            <Logo variant="dark" />
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {["Features", "Pricing", "Support", "Privacy"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-text-secondary text-sm font-bold hover:text-primary transition-all relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <ThemeToggle />

            <Link href="/login" className="hidden sm:flex items-center gap-2 text-text-secondary font-bold hover:text-primary px-4 py-2 transition-colors text-sm">
              <LogIn size={18} />
              Login
            </Link>

            <Link href="/live-demo">
              <button className="hidden md:block bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full font-bold shadow-md active:scale-95 transition-all">
                Live Demo
              </button>
            </Link>

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
                className="text-text-secondary font-semibold hover:text-primary transition-colors relative group">
                {item}
              </Link>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <button className="w-full bg-secondary text-primary font-bold py-3 rounded-xl">
                Login
              </button>
              <Link href="/live-demo">
                <button className="w-full bg-primary text-white py-3 rounded-xl font-bold">
                  Live Demo
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/shared/logo/logo";
import { LogIn, LucideLayoutDashboard, Menu, X, Bell, ChevronDown, LogOut, AlertCircle, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, role, signOut } = useAuth()
  const router = useRouter();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    await signOut();
    setShowLogoutModal(false)
    router.replace("/")
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClickLogo = (e: React.MouseEvent) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!mounted) {
    // We only skip rendering the dynamic interactive bits to avoid layout shift.
    // The main nav bar skeleton will still render SSR.
  }

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-card/70 backdrop-blur-xl border-b border-border-light transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LEFT: Hamburger (mobile) + Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger - LEFT side */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-secondary text-primary transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link href="/" onClick={handleClickLogo} className="hover:opacity-90 transition-opacity">
              <Logo variant="dark" />
            </Link>
          </div>

          {/* CENTER: Desktop nav links */}
          <div className="hidden md:flex items-center gap-10">
      
            {[
              { label: "Why Choose Us", href: "/why-choose-us" },
              { label: "Pricing", href: "/pricing" },
              { label: "Support", href: "/support" },
              { label: "Privacy", href: "/privacy" },
              { label: "Contact", href: "/contact" }
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-text-secondary text-sm font-bold hover:text-primary transition-all relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* RIGHT: Theme + Profile/Login */}
          <div className="flex items-center gap-3 sm:gap-5">
            <ThemeToggle />

            {!mounted ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:block w-12 h-8 bg-border-light/30 animate-pulse rounded-lg"></div>
                <div className="hidden md:block w-24 h-9 bg-border-light/30 animate-pulse rounded-full"></div>
              </div>
            ) : !user ? (
              <>
                <Link
                  href="/login"
                  className="hidden sm:block text-primary font-bold hover:text-primary-hover px-4 py-2 transition-colors text-sm"
                >
                  Login
                </Link>
                <Link href="/live-demo">
                  <button className="hidden md:block bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full font-bold shadow-md active:scale-95 transition-all text-sm">
                    Live Demo
                  </button>
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 pr-2 rounded-xl border-2 border-primary/20 bg-bg-page shadow-sm min-w-[75px] justify-center hover:border-primary/40 transition-all"
                >
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-[10px] font-black shadow-md">
                    SR
                  </div>
                  <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <>
                      <div className="fixed inset-0 z-[60]" onClick={() => setIsProfileOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-52 rounded-2xl border border-border-light bg-bg-card p-2 shadow-2xl z-[70]"
                      >
                        <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-border-light mb-1">Account</div>
                        <Link
                          href={role === "parent" ? "/dashboard/parent" : role === "student" ? "/dashboard/student" : role === "teacher" ? "/dashboard/teacher" : "/dashboard/principal"}
                          className="flex items-center gap-3 w-full px-3 py-3 text-sm font-bold text-text-primary hover:bg-secondary/30 rounded-xl transition-all"
                        >
                          <LucideLayoutDashboard size={18} className="text-primary" /> Dashboard
                        </Link>
                        <button
                          onClick={() => { setShowLogoutModal(true); setIsProfileOpen(false); }}
                          className="flex items-center gap-3 w-full px-3 py-3 text-sm font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                        >
                          <LogOut size={18} /> Log out
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-bg-card border-b border-border-light shadow-xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {[
                { label: "Why Choose Us", href: "/why-choose-us" },
                { label: "Pricing", href: "/pricing" },
                { label: "Support", href: "/support" },
                { label: "Privacy", href: "/privacy" },
                { label: "Contact", href: "/contact" }
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-text-secondary font-semibold hover:text-primary transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {mounted && !user && (
                <div className="pt-4 flex flex-col gap-3">
                  <Link href="/login" onClick={() => setIsOpen(false)} className="w-full">
                    <button className="w-full bg-secondary text-primary font-bold py-3 rounded-xl">Login</button>
                  </Link>
                  <Link href="/live-demo" onClick={() => setIsOpen(false)} className="w-full">
                    <button className="w-full bg-primary text-white py-3 rounded-xl font-bold">Live Demo</button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowLogoutModal(false)}
              className="absolute inset-0 bg-slate-900/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-[92%] max-w-[400px] bg-bg-card rounded-[32px] p-8 shadow-2xl border border-border-light overflow-hidden"
            >
              <button
                onClick={() => setShowLogoutModal(false)}
                className="absolute top-5 right-5 p-2 text-text-muted hover:bg-secondary rounded-full"
              >
                <X size={24} />
              </button>
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 bg-red-100 dark:bg-red-950/30 rounded-full flex items-center justify-center mb-6 text-red-500">
                  <AlertCircle size={40} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-black text-text-primary tracking-tight">Confirm Logout</h3>
                <p className="text-text-muted mt-3 font-medium text-base px-2">
                  Are you sure you want to sign out from <span className="text-primary font-bold">Schoology BD</span>?
                </p>
                <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 w-full mt-10">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="order-2 sm:order-1 py-4 rounded-2xl border-2 border-border-light font-bold text-text-secondary hover:bg-secondary transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="order-1 sm:order-2 py-4 rounded-2xl bg-red-500 text-white font-black shadow-xl shadow-red-500/30 hover:bg-red-600 transition-all active:scale-95"
                  >
                    Yes, Log Out
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
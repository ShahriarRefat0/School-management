'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/shared/logo/logo';
import {
  LucideLayoutDashboard,
  Menu,
  X,
  ChevronDown,
  LogOut,
  AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/components/theme/ThemeToggle';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, role, signOut } = useAuth();
  const router = useRouter();
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const profileToggleRef = useRef<HTMLButtonElement | null>(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const rawRole = (role || user?.user_metadata?.role || 'user') as string;
  const displayRole = rawRole
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char: string) => char.toUpperCase());

  const displayName =
    user?.name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    (typeof user?.email === 'string' ? user.email.split('@')[0] : 'User');

  const userInitials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part: string) => part[0]?.toUpperCase())
    .join('');

  const handleLogout = async () => {
    await signOut();
    setShowLogoutModal(false);
    router.replace('/');
  };

  const handleClickLogo = (e: React.MouseEvent) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // নেভবারের জন্য স্ট্যাটিক ডার্ক থিম কালার ডিফাইন করা হয়েছে
  const navBg = 'bg-[#0F172A]'; // Slate 900
  const borderCol = 'border-[#1E293B]'; // Slate 800
  const textMain = 'text-white';
  const textMuted = 'text-slate-400';

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      if (
        isOpen &&
        !mobileMenuRef.current?.contains(target) &&
        !mobileToggleRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }

      if (
        isProfileOpen &&
        !profileMenuRef.current?.contains(target) &&
        !profileToggleRef.current?.contains(target)
      ) {
        setIsProfileOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, isProfileOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${navBg}/80 backdrop-blur-xl border-b ${borderCol} transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LEFT: Hamburger (mobile) + Logo */}
          <div className="flex items-center gap-3">
            <button
              ref={mobileToggleRef}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-800 text-blue-400 transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Link
              href="/"
              onClick={handleClickLogo}
              className="hover:opacity-90 transition-opacity"
            >
              {/* লোগো সব সময় ডার্ক ভ্যারিয়েন্ট থাকবে */}
              <Logo variant="dark" />
            </Link>
          </div>

          {/* CENTER: Desktop nav links */}
          <div className="hidden md:flex items-center gap-10">
            {[
              { label: 'Why Choose Us', href: '/why-choose-us' },
              { label: 'Pricing', href: '/pricing' },
              { label: 'Support', href: '/support' },
              { label: 'Privacy', href: '/privacy' },
              { label: 'Contact', href: '/contact' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`${textMuted} text-sm font-bold hover:text-blue-400 transition-all relative group`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* RIGHT: Theme + Profile/Login */}
          <div className="flex items-center gap-3 sm:gap-5">
            <ThemeToggle />

            {!user ? (
              <>
                <Link
                  href="/login"
                  className="hidden sm:block text-blue-400 font-bold hover:text-blue-300 px-4 py-2 transition-colors text-sm"
                >
                  Login
                </Link>
                <Link href="/live-demo">
                  <button className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-bold shadow-md active:scale-95 transition-all text-sm">
                    Live Demo
                  </button>
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  ref={profileToggleRef}
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center gap-2 p-1 pr-2 rounded-xl border-2 border-blue-500/20 bg-slate-900 shadow-sm min-w-[75px] justify-center hover:border-blue-500/40 transition-all`}
                >
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-[10px] font-black shadow-md">
                    {userInitials || 'SR'}
                  </div>
                  <div className="hidden md:flex flex-col items-start leading-tight pr-1">
                    <span className="text-xs font-bold text-white max-w-[110px] truncate">
                      {displayName}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-blue-300">
                      {displayRole}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-3 w-3 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <div ref={profileMenuRef}>
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={`absolute right-0 mt-2 w-52 rounded-2xl border ${borderCol} ${navBg} p-2 shadow-2xl z-[70]`}
                      >
                        <div
                          className={`px-3 py-2 text-[10px] font-black uppercase tracking-widest ${textMuted} border-b ${borderCol} mb-1`}
                        >
                          Account
                        </div>
                        <div
                          className={`px-3 py-2 mb-1 rounded-xl bg-slate-800/60 border ${borderCol}`}
                        >
                          <p className="text-sm font-bold text-white truncate">
                            {displayName}
                          </p>
                          <p className="text-[11px] font-semibold uppercase tracking-wide text-blue-300 mt-0.5">
                            {displayRole}
                          </p>
                        </div>
                        <Link
                          href={
                            role === 'parent'
                              ? '/dashboard/parent'
                              : role === 'student'
                                ? '/dashboard/student'
                                : role === 'teacher'
                                  ? '/dashboard/teacher'
                                  : '/dashboard'
                          }
                          className={`flex items-center gap-3 w-full px-3 py-3 text-sm font-bold ${textMain} hover:bg-slate-800 rounded-xl transition-all`}
                        >
                          <LucideLayoutDashboard
                            size={18}
                            className="text-blue-500"
                          />
                          Dashboard
                        </Link>
                        <button
                          onClick={() => {
                            setShowLogoutModal(true);
                            setIsProfileOpen(false);
                          }}
                          className="flex items-center gap-3 w-full px-3 py-3 text-sm font-black text-red-400 hover:bg-red-950/30 rounded-xl transition-all"
                        >
                          <LogOut size={18} /> Log out
                        </button>
                      </motion.div>
                    </div>
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
          <div className="md:hidden relative z-40">
            <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px]" />
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`relative z-50 ${navBg} border-b ${borderCol} shadow-xl`}
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {[
                  { label: 'Why Choose Us', href: '/why-choose-us' },
                  { label: 'Pricing', href: '/pricing' },
                  { label: 'Support', href: '/support' },
                  { label: 'Privacy', href: '/privacy' },
                  { label: 'Contact', href: '/contact' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`block ${textMuted} font-semibold hover:text-blue-400 transition-colors py-2`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                {!user && (
                  <div className="pt-4 flex flex-col gap-3">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <button className="w-full bg-slate-800 text-blue-400 font-bold py-3 rounded-xl">
                        Login
                      </button>
                    </Link>
                    <Link href="/live-demo" onClick={() => setIsOpen(false)}>
                      <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">
                        Live Demo
                      </button>
                    </Link>
                  </div>
                )}
              </div>
              </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Logout Modal - এটি সব সময় ডার্ক থাকবে */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative w-[92%] max-w-[400px] ${navBg} rounded-[32px] p-8 shadow-2xl border ${borderCol} overflow-hidden`}
            >
              <button
                onClick={() => setShowLogoutModal(false)}
                className={`absolute top-5 right-5 p-2 ${textMuted} hover:bg-slate-800 rounded-full`}
              >
                <X size={24} />
              </button>
              <div className="flex flex-col items-center text-center">
                <div className="h-20 w-20 bg-red-950/30 rounded-full flex items-center justify-center mb-6 text-red-500">
                  <AlertCircle size={40} strokeWidth={2.5} />
                </div>
                <h3
                  className={`text-2xl font-black ${textMain} tracking-tight`}
                >
                  Confirm Logout
                </h3>
                <p className={`${textMuted} mt-3 font-medium text-base px-2`}>
                  Are you sure you want to sign out from{' '}
                  <span className="text-blue-500 font-bold">Schoology BD</span>?
                </p>
                <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 w-full mt-10">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className={`order-2 sm:order-1 py-4 rounded-2xl border-2 ${borderCol} font-bold ${textMuted} hover:bg-slate-800 transition-all active:scale-95`}
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
  );
};

export default Navbar;

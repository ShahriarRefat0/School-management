'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Bell,
  ChevronDown,
  Menu,
  LogOut,
  X,
  AlertCircle,
  User,
} from 'lucide-react';
import Logo from '@/components/shared/logo/logo';
import ThemeToggle from '@/components/theme/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { NotificationDropdown } from './NotificationDropdown';
import {
  getNotifications,
  markAllAsRead,
  markAsRead,
} from '@/app/actions/notification';
import { toast } from 'sonner';

type DashboardHeaderProps = {
  onMenuClick: () => void;
};

type NotificationItem = {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  link?: string | null;
  createdAt: Date;
};

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Notification State
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchInitialNotifications = async () => {
    const res = await getNotifications(5);
    if (res.success) {
      const normalizedNotifications: NotificationItem[] = (res.data ?? []).map(
        (item) => ({
          id: item.id,
          title: item.title ?? 'Notification',
          message: item.message ?? 'No details available',
          type: item.type ?? 'general',
          isRead: Boolean(item.isRead),
          link: item.link ?? null,
          createdAt: item.createdAt ? new Date(item.createdAt) : new Date(),
        }),
      );

      setNotifications(normalizedNotifications);
      setUnreadCount(res.unreadCount ?? 0);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const kickoff = setTimeout(() => {
      void fetchInitialNotifications();
    }, 0);

    return () => {
      clearInterval(timer);
      clearTimeout(kickoff);
    };
  }, []);

  const handleMarkAsRead = async (id: string) => {
    const res = await markAsRead(id);
    if (res.success) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } else {
      toast.error('Failed to mark as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    const res = await markAllAsRead();
    if (res.success) {
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
      toast.success('All caught up!');
    } else {
      toast.error('Failed to mark all as read');
    }
  };
  const router = useRouter();
  const { user, role, signOut } = useAuth();

  const userEmail = user?.email || 'No email';
  const userName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    userEmail?.split('@')[0] ||
    'User';
  const initials =
    userName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part: string) => part[0]?.toUpperCase() || '')
      .join('') || 'U';
  const roleLabel = role
    ? role
        .split('_')
        .map(
          (segment: string) =>
            segment.charAt(0).toUpperCase() + segment.slice(1),
        )
        .join(' ')
    : 'Unknown Role';

  const handleLogout = async () => {
    await signOut();

    setShowLogoutModal(false);
    router.replace('/');
  };

  return (
    <>
      {/* ১. হেডার সেকশন */}
      <header className="sticky top-0 z-50  flex h-16 items-center border-b border-border-light bg-bg-card/80 px-2 md:px-6 backdrop-blur-md">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={onMenuClick}
              className="md:hidden p-1.5 text-slate-500 rounded-lg hover:bg-secondary/30"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" className="flex items-center">
              <Logo variant="dark" size="sm" />
            </Link>
          </div>

          {/* Real-time Clock - AI Project Styled */}
          <div className="hidden lg:flex flex-col items-center justify-center">
            <>
              <p
                suppressHydrationWarning
                className="text-sm font-bold text-text-primary font-mono tracking-wider"
              >
                {currentTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </p>
              <p
                suppressHydrationWarning
                className="text-[10px] font-medium text-primary/70 uppercase tracking-widest"
              >
                {currentTime.toLocaleDateString([], {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            <ThemeToggle />

            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`relative p-2 rounded-xl transition-all ${isNotificationsOpen ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-secondary/30'}`}
              >
                <Bell className="h-5 w-5 md:h-6 md:w-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-600 ring-2 ring-bg-card animate-pulse shadow-sm shadow-red-500"></span>
                )}
              </button>

              <NotificationDropdown
                isOpen={isNotificationsOpen}
                onClose={() => setIsNotificationsOpen(false)}
                notifications={notifications}
                unreadCount={unreadCount}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1 pr-2 rounded-xl border-2 border-primary/20 bg-bg-page shadow-sm min-w-[75px] justify-center hover:border-primary/40 transition-all"
              >
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-[10px] font-black shadow-md">
                  {initials}
                </div>
                <div className="hidden md:flex flex-col items-start leading-tight max-w-[180px]">
                  <span className="text-xs font-bold text-text-primary truncate w-full">
                    {userName}
                  </span>
                  <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wide truncate w-full">
                    {roleLabel}
                  </span>
                </div>
                <ChevronDown
                  className={`h-3 w-3 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180 text-primary' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[60]"
                      onClick={() => setIsProfileOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-52 rounded-2xl border border-border-light bg-bg-card p-2 shadow-2xl z-[70]"
                    >
                      <div className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-border-light mb-1">
                        Account
                      </div>
                      <div className="px-3 py-2 mb-1 border-b border-border-light">
                        <p className="text-xs font-bold text-text-primary truncate">
                          {userName}
                        </p>
                        <p className="text-[11px] font-medium text-text-muted truncate">
                          {userEmail}
                        </p>
                        <p className="text-[10px] font-semibold text-primary uppercase tracking-wide mt-1">
                          {roleLabel}
                        </p>
                      </div>
                      {/* <button className="flex items-center gap-3 w-full px-3 py-3 text-sm font-bold text-text-primary hover:bg-secondary/30 rounded-xl transition-all">
                                                <User size={18} className="text-primary" /> My Profile
                                            </button> */}
                      <button
                        onClick={() => {
                          setShowLogoutModal(true);
                          setIsProfileOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-3 py-3 text-sm font-black text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all"
                      >
                        <LogOut size={18} /> Log out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* ২. লগ-আউট মোডাল (মোবাইলে বড় এবং ফিক্সড করা হয়েছে) */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
                {/* বড় আইকন */}
                <div className="h-20 w-20 bg-red-100 dark:bg-red-950/30 rounded-full flex items-center justify-center mb-6 text-red-500">
                  <AlertCircle size={40} strokeWidth={2.5} />
                </div>

                <h3 className="text-2xl font-black text-text-primary tracking-tight">
                  Confirm Logout
                </h3>
                <p className="text-text-muted mt-3 font-medium text-base px-2">
                  Are you sure you want to sign out from{' '}
                  <span className="text-primary font-bold">Schoology BD</span>?
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
    </>
  );
}

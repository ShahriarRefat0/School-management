'use client';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  UserCheck,
  LineChart,
  CreditCard,
  Bell,
  Menu,
  ChevronDown,
  LogOut,
  User,
  Settings,
  ClipboardList,
  MessageCircle,
  GraduationCap,
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function ParentLayout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();

  // আপনার ফোল্ডার স্ট্রাকচার অনুযায়ী সঠিক পাথগুলো এখানে দেওয়া হলো
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/dashboard/parents', // মূল ফোল্ডার parents হওয়ায় এখানে s যুক্ত হতে পারে, আপনার প্রজেক্ট অনুযায়ী চেক করে নিন
    },
    {
      icon: UserCheck,
      label: 'Attendance',
      path: '/dashboard/parents/attendance',
      badge: 'Today',
    },
    {
      icon: LineChart,
      label: 'Performance',
      path: '/dashboard/parents/performance',
      badge: 'New',
    },
    {
      icon: CreditCard,
      label: 'Fees Status',
      path: '/dashboard/parents/fees-status',
      badge: 'Due',
    },
    {
      icon: ClipboardList,
      label: 'Notices',
      path: '/dashboard/parents/notices',
      badge: '3',
    },
    {
      icon: MessageCircle,
      label: 'Contact Teacher',
      path: '/dashboard/parents/contact-teacher',
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/dashboard/parents/settings',
    },
  ];

  // রাউট চেক করার ফাংশন: এটি বর্তমান পাথ এবং মেনুর পাথ মিলিয়ে দেখে
  const isActive = (path: string) => {
    if (path === '/dashboard/parents') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const cn = (...classes: (string | boolean | undefined)[]) =>
    classes.filter(Boolean).join(' ');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-50">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-emerald-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-emerald-700 p-2 rounded-xl hover:bg-emerald-50 active:scale-95 transition-all"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
                <GraduationCap className="text-white" size={16} />
              </div>
              <h1 className="text-lg font-bold text-emerald-700">
                Parent Portal
              </h1>
            </div>
          </div>
          <button className="relative p-2">
            <Bell className="text-slate-600" size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
        </div>
      </div>

      <div className="flex pt-16 lg:pt-0">
        {/* Sidebar (Desktop & Mobile) */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200/50 transition-transform duration-300 transform lg:translate-x-0 lg:static lg:h-screen sticky top-0 shadow-xl flex flex-col',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <div className="p-6 border-b border-slate-100">
            <Link
              href="/dashboard/parents"
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                <GraduationCap size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-emerald-700">
                  Parent Portal
                </h1>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                  অভিভাবক ড্যাশবোর্ড
                </p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1.5">
              {menuItems.map((item, idx) => {
                const active = isActive(item.path);
                return (
                  <li key={idx}>
                    <Link
                      href={item.path}
                      onClick={() => setIsSidebarOpen(false)} // মোবাইল মোডে ক্লিক করলে সাইডবার বন্ধ হবে
                      className={cn(
                        'flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group',
                        active
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 translate-x-1'
                          : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 hover:translate-x-1',
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon
                          size={19}
                          className={cn(
                            'transition-colors',
                            active
                              ? 'text-white'
                              : 'text-slate-400 group-hover:text-emerald-600',
                          )}
                        />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={cn(
                            'px-2 py-0.5 text-[10px] font-bold rounded-full transition-colors',
                            active
                              ? 'bg-white/20 text-white'
                              : 'bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white',
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Profile / Student Card */}
          <div className="p-4 border-t border-slate-100">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-emerald-200 flex items-center justify-center font-bold text-emerald-700 shadow-sm">
                  S
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    সাকিব আহমেদ
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Class: 8 | Roll: 05
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 min-h-screen">
          <header className="hidden lg:block sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 px-8 py-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800">
                {menuItems.find((item) => isActive(item.path))?.label ||
                  'Overview'}
              </h2>
              <div className="flex items-center gap-4">
                <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
                  <Bell size={22} />
                </button>
                <div className="w-px h-6 bg-slate-200 mx-2" />
                <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200/50">
                  <div className="text-right">
                    <p className="font-bold text-sm text-slate-800">
                      রহিম আহমেদ
                    </p>
                    <span className="text-[10px] text-emerald-600 font-bold uppercase">
                      অভিভাবক
                    </span>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                    RA
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="p-4 lg:p-8 animate-fadeIn">{children}</div>
        </main>
      </div>
    </div>
  );
}

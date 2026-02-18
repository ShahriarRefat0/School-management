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
  const pathname = usePathname();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/dashboard/parents',
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

  const isActive = (path: string) => {
    if (path === '/dashboard/parents') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const cn = (...classes: (string | boolean | undefined)[]) =>
    classes.filter(Boolean).join(' ');

  return (
    <div className="min-h-screen bg-bg-page">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-bg-card border-b border-border-light p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-text-primary"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-2">
            <GraduationCap size={18} className="text-primary" />
            <h1 className="font-bold text-text-primary">Parent Portal</h1>
          </div>

          <Bell size={20} className="text-text-muted" />
        </div>
      </div>

      <div className="flex pt-16 lg:pt-0">
        {/* Sidebar */}
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-50 w-64 bg-bg-card border-r border-border-light transition-transform duration-300 lg:translate-x-0 lg:static',
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          {/* Logo */}
          <div className="p-6 border-b border-border-light">
            <Link href="/dashboard/parents" className="flex items-center gap-2">
              <GraduationCap size={20} className="text-primary" />
              <div>
                <h1 className="text-lg font-bold text-text-primary">
                  Parent Portal
                </h1>
                <p className="text-[10px] text-text-muted uppercase tracking-widest">
                  অভিভাবক ড্যাশবোর্ড
                </p>
              </div>
            </Link>
          </div>

          {/* Menu */}
          <nav className="p-4 space-y-1">
            {menuItems.map((item, idx) => {
              const active = isActive(item.path);

              return (
                <Link
                  key={idx}
                  href={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-lg transition',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-secondary hover:bg-primary/5 hover:text-primary',
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Student Info */}
          <div className="mt-auto p-4 border-t border-border-light">
            <div className="bg-primary/5 rounded-xl p-4 border border-border-light">
              <p className="text-sm font-semibold text-text-primary">
                সাকিব আহমেদ
              </p>
              <p className="text-xs text-text-muted">Class: 8 | Roll: 05</p>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-h-screen">
          {/* Desktop Header */}
          <header className="hidden lg:flex sticky top-0 z-40 bg-bg-card border-b border-border-light px-8 py-5 justify-between items-center">
            <h2 className="text-xl font-bold text-text-primary">
              {menuItems.find((item) => isActive(item.path))?.label ||
                'Overview'}
            </h2>

            <div className="flex items-center gap-6">
              <Bell size={20} className="text-text-muted" />

              <div className="text-right">
                <p className="text-sm font-semibold text-text-primary">
                  রহিম আহমেদ
                </p>
                <span className="text-xs text-text-muted">অভিভাবক</span>
              </div>
            </div>
          </header>

          <div className="p-4 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

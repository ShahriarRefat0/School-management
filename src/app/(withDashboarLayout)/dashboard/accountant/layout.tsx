"use client";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/components/shared/logo/logo";
import {
  LayoutDashboard,
  Wallet,
  Receipt,
  TrendingDown,
  FileText,
  History,
  Calculator,
  Settings,
  Bell,
  Menu,
  ChevronDown,
  LogOut,
  User,
  CreditCard,
  Users2,
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export default function AccountantLayout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard/accountant",
      badge: null,
    },
    {
      icon: CreditCard,
      label: "Fee Collection",
      path: "/dashboard/accountant/fee-collection",
      badge: "12",
    },
    {
      icon: Receipt,
      label: "Student Due List",
      path: "/dashboard/accountant/due-list",
      badge: "48",
    },
    {
      icon: Wallet,
      label: "Salary Management",
      path: "/dashboard/accountant/salary",
      badge: null,
    },
    {
      icon: TrendingDown,
      label: "Expense Management",
      path: "/dashboard/accountant/expenses",
      badge: null,
    },
    {
      icon: FileText,
      label: "Financial Reports",
      path: "/dashboard/accountant/reports",
      badge: null,
    },
    {
      icon: History,
      label: "Payment History",
      path: "/dashboard/accountant/history",
      badge: null,
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/dashboard/accountant/settings",
      badge: null,
    },
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard/accountant") return pathname === path;
    return pathname.startsWith(path);
  };

  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-slate-50">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-emerald-100 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-emerald-700 hover:bg-emerald-50 p-2 rounded-xl transition-all duration-300 active:scale-95"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <Logo variant="dark" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 hover:bg-emerald-50 rounded-xl transition-all duration-300 group">
              <Bell className="text-slate-600 group-hover:text-emerald-600 transition-colors" size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-r from-red-500 to-rose-500 rounded-full animate-pulse"></span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex pt-16 lg:pt-0">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-72 bg-white border-r border-slate-200/50 h-screen sticky top-0 shadow-xl shadow-slate-200/50">
          {/* Logo Section */}
          <div className="p-6 border-b border-slate-100">
            <Link href={"/"} className="group">
              <Logo variant="dark" />
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest mt-1 ml-12">
                হিসাবরক্ষক ড্যাশবোর্ড
              </p>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-1.5">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <li
                    key={index}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className="opacity-0 animate-fadeInSlide"
                  >
                    <Link
                      href={item.path}
                      className={cn(
                        "flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                        active
                          ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30"
                          : "text-slate-600 hover:bg-emerald-50/80 hover:text-emerald-700"
                      )}
                    >
                      {active && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent animate-shimmer"></div>
                      )}
                      <div className="flex items-center gap-3 relative z-10">
                        <Icon
                          size={19}
                          className={cn(
                            "transition-all duration-300",
                            active
                              ? "text-white"
                              : "text-slate-400 group-hover:text-emerald-600 group-hover:scale-110"
                          )}
                        />
                        <span className="font-medium text-[15px]">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={cn(
                            "px-2 py-0.5 text-xs font-bold rounded-full transition-all duration-300",
                            active
                              ? "bg-white/20 text-white"
                              : "bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white"
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

          {/* Quick Stats Card */}
          <div className="p-4 border-t border-slate-100">
            <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl p-4 border border-emerald-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">
                  Today&apos;s Summary
                </span>
                <Users2 className="text-emerald-600" size={14} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">Collections</span>
                  <span className="text-sm font-bold text-emerald-700">৳ 1,25,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-600">Expenses</span>
                  <span className="text-sm font-bold text-red-600">৳ 45,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="p-4 border-t border-slate-100">
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-slate-50 to-emerald-50/50 rounded-xl border border-slate-200/50 hover:border-emerald-200 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-600/30 group-hover:shadow-emerald-600/50 transition-all duration-300">
                  FA
                </div>
                <div className="flex-1 text-left overflow-hidden">
                  <p className="font-semibold text-sm text-slate-800 truncate">
                    আব্দুল করিম
                  </p>
                  <p className="text-xs text-slate-500 truncate">Finance Officer</p>
                </div>
                <ChevronDown
                  className={cn(
                    "text-slate-400 transition-transform duration-300",
                    isProfileOpen && "rotate-180"
                  )}
                  size={18}
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-slideInBottom">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 transition-colors group"
                  >
                    <User size={16} className="text-slate-500 group-hover:text-emerald-600" />
                    <span className="text-sm text-slate-700 group-hover:text-emerald-700">
                      Profile
                    </span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 transition-colors group"
                  >
                    <Settings size={16} className="text-slate-500 group-hover:text-emerald-600" />
                    <span className="text-sm text-slate-700 group-hover:text-emerald-700">
                      Settings
                    </span>
                  </Link>
                  <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors group border-t border-slate-100">
                    <LogOut size={16} className="text-slate-500 group-hover:text-red-600" />
                    <span className="text-sm text-slate-700 group-hover:text-red-700">
                      Logout
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
            <aside className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white z-50 shadow-2xl animate-slideInLeft">
              <div className="p-6 border-b border-slate-100">
                <Logo variant="dark" />
              </div>
              <nav className="p-4 overflow-y-auto h-full">
                <ul className="space-y-2">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const active = isActive(item.path);
                    return (
                      <li key={index}>
                        <Link
                          href={item.path}
                          onClick={() => setIsSidebarOpen(false)}
                          className={cn(
                            "flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                            active
                              ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                              : "text-slate-600 hover:bg-emerald-50"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <Icon size={19} />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className="px-2 py-0.5 text-xs font-bold bg-white/20 text-white rounded-full">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>
          </>
        )}

        {/* Main Content Area */}
        <main className="flex-1 mx-auto">
          {/* Top Desktop Header */}
          <div className="hidden lg:block sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
            <div className="flex items-center justify-between px-8 py-6">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-emerald-800 to-teal-800 bg-clip-text text-transparent">
                  Finance Management System
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  আর্থিক লেনদেন ও হিসাব ব্যবস্থাপনা
                </p>
              </div>

              <div className="flex items-center gap-4">
                <button className="relative p-3 text-slate-500 hover:bg-emerald-50 rounded-xl transition-all duration-300 group">
                  <Bell size={20} className="group-hover:text-emerald-600 transition-colors" />
                  <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-rose-500 border-2 border-white rounded-full animate-pulse"></span>
                </button>

                <div className="h-8 w-px bg-slate-200"></div>

                <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-slate-50 to-emerald-50/50 rounded-xl border border-slate-200/50">
                  <div className="text-right">
                    <p className="font-bold text-sm text-slate-800 leading-tight">
                      আব্দুল করিম
                    </p>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full uppercase tracking-wide">
                      হিসাবরক্ষক
                    </span>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-600/30">
                    FA
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-4 lg:p-8 min-h-screen">{children}</div>
        </main>
      </div>

      {/* <style jsx global>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateX(-12px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slideInBottom {
          from {
            transform: translateY(8px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        } 

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-fadeInSlide {
          animation: fadeInSlide 0.5s ease-out forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out;
        }

        .animate-slideInBottom {
          animation: slideInBottom 0.2s ease-out;
        }
      `}</style> */}
    </div>
  );
}
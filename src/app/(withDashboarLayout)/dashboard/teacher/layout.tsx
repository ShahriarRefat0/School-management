"use client";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  UserCheck,
  GraduationCap,
  Upload,
  Megaphone,
  Settings,
  Bell,
  Menu,
  ChevronDown,
  LogOut,
  User,
  Search,
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export default function TeacherLayout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard/teacher",
      badge: null,
    },
    {
      icon: BookOpen,
      label: "My Classes",
      path: "/dashboard/teacher/my-classes",
      badge: "4",
    },
    {
      icon: UserCheck,
      label: "Take Attendance",
      path: "/dashboard/teacher/attendance",
      badge: "2",
    },
    {
      icon: GraduationCap,
      label: "Enter Results",
      path: "/dashboard/teacher/results",
      badge: null,
    },
    {
      icon: Upload,
      label: "Study Materials",
      path: "/dashboard/teacher/study-materials",
      badge: null,
    },
    {
      icon: Megaphone,
      label: "Notices",
      path: "/dashboard/teacher/notices",
      badge: "new",
    },
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard/teacher") return pathname === path;
    return pathname.startsWith(path);
  };

  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div className="min-h-screen bg-bg-page transition-colors duration-300">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-bg-card/80 backdrop-blur-xl border-b border-border-light shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-primary hover:bg-primary/10 p-2 rounded-xl transition-all duration-300 active:scale-95"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/30">
                <BookOpen className="text-white" size={16} />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-700 to-blue-700 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                Teacher Panel
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 hover:bg-primary/10 rounded-xl transition-all duration-300 group text-text-muted hover:text-primary">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gradient-to-r from-red-500 to-rose-500 rounded-full animate-pulse"></span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex pt-16 lg:pt-0">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex lg:flex-col lg:w-72 bg-bg-card border-r border-border-light h-screen sticky top-0 shadow-xl shadow-slate-200/50 dark:shadow-none">
          {/* Logo Section */}
          <div className="p-6 border-b border-border-light">
            <Link href={"/"} className="group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:shadow-indigo-600/50 transition-all duration-300 group-hover:scale-110">
                  <BookOpen className="text-white" size={20} />
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-700 dark:from-indigo-300 dark:via-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
                    Teacher Panel
                  </h1>
                  <p className="text-[10px] text-text-muted font-semibold uppercase tracking-widest">
                    Teacher Dashboard
                  </p>
                </div>
              </div>
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
                          ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-600/30"
                          : "text-text-secondary hover:bg-primary/10 hover:text-primary"
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
                              : "text-text-muted group-hover:text-primary group-hover:scale-110"
                          )}
                        />
                        <span className="font-medium text-[15px]">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={cn(
                            "px-2 py-0.5 text-xs font-bold rounded-full transition-all duration-300 uppercase tracking-tighter",
                            active
                              ? "bg-white/20 text-white"
                              : "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 group-hover:bg-indigo-600 group-hover:text-white"
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


          {/* User Profile Section */}
          <div className="p-4 border-t border-border-light">
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-full flex items-center gap-3 p-3 bg-bg-page/50 rounded-xl border border-border-light hover:border-indigo-200 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-600/30 group-hover:shadow-indigo-600/50 transition-all duration-300">
                  AR
                </div>
                <div className="flex-1 text-left overflow-hidden">
                  <p className="font-semibold text-sm text-text-primary truncate">
                    Abu Raihan
                  </p>
                  <p className="text-xs text-text-muted truncate">Senior Teacher</p>
                </div>
                <ChevronDown
                  className={cn(
                    "text-text-muted transition-transform duration-300",
                    isProfileOpen && "rotate-180"
                  )}
                  size={18}
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-bg-card rounded-xl shadow-2xl border border-border-light overflow-hidden animate-slideInBottom z-50">
                  <Link
                    href="/dashboard/teacher/profile"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-primary/10 transition-colors group"
                  >
                    <User size={16} className="text-text-muted group-hover:text-primary" />
                    <span className="text-sm text-text-secondary group-hover:text-primary">
                      Profile
                    </span>
                  </Link>
                  <Link
                    href="/dashboard/teacher/settings"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-primary/10 transition-colors group"
                  >
                    <Settings size={16} className="text-text-muted group-hover:text-primary" />
                    <span className="text-sm text-text-secondary group-hover:text-primary">
                      Settings
                    </span>
                  </Link>
                  <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors group border-t border-border-light">
                    <LogOut size={16} className="text-text-muted group-hover:text-red-600" />
                    <span className="text-sm text-text-secondary group-hover:text-red-700">
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
            <aside className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-bg-card z-50 shadow-2xl animate-slideInLeft scroll-smooth overflow-y-auto">
              <div className="p-6 border-b border-border-light">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <BookOpen className="text-white" size={20} />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-700 to-blue-700 dark:from-indigo-400 dark:to-blue-400 bg-clip-text text-transparent">
                      Teacher Panel
                    </h1>
                  </div>
                </div>
              </div>
              <nav className="p-4">
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
                              ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg"
                              : "text-text-secondary hover:bg-primary/10"
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
        <main className="flex-1 mx-auto overflow-hidden">
          {/* Top Desktop Header */}
          <div className="hidden lg:block sticky top-0 z-40 bg-bg-card/80 backdrop-blur-xl border-b border-border-light shadow-sm">
            <div className="flex items-center justify-between px-8 py-5">
              <div className="flex items-center gap-6">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-indigo-800 to-blue-800 dark:from-slate-100 dark:via-indigo-300 dark:to-blue-300 bg-clip-text text-transparent">
                    Academic Management System
                  </h2>
                  <p className="text-xs text-text-muted font-medium mt-1">
                    Class Control & Teacher Dashboard
                  </p>
                </div>

                {/* Desktop Search */}
                <div className="relative hidden xl:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
                  <input
                    type="text"
                    placeholder="Search students, classes..."
                    className="pl-10 pr-4 py-2 bg-bg-page border border-border-light rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 w-64 transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="relative p-2.5 text-text-muted hover:bg-primary/10 hover:text-primary rounded-xl transition-all duration-300 group">
                  <Bell size={20} className="transition-colors" />
                  <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-rose-500 border-2 border-bg-card rounded-full animate-pulse"></span>
                </button>

                <div className="h-8 w-px bg-border-light"></div>

                <div className="flex items-center gap-3 px-4 py-2 bg-bg-page/50 rounded-xl border border-border-light group cursor-pointer hover:border-indigo-300 transition-all">
                  <div className="text-right">
                    <p className="font-bold text-sm text-text-primary leading-tight group-hover:text-primary transition-colors">
                      Abu Raihan
                    </p>
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/40 px-2 py-0.5 rounded-full uppercase tracking-wide">
                      Senior Teacher
                    </span>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-600/30 group-hover:scale-110 transition-transform">
                    AR
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-4 lg:p-8 min-h-[calc(100vh-85px)]">{children}</div>
        </main>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInSlide {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideInBottom {
          from { transform: translateY(8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-shimmer { animation: shimmer 3s infinite; }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        .animate-fadeInSlide { animation: fadeInSlide 0.5s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.3s ease-out; }
        .animate-slideInBottom { animation: slideInBottom 0.2s ease-out; }
      `}</style>
    </div>
  );
}

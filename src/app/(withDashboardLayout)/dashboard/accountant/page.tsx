"use client";
import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Receipt,
  Users,
  Calendar,
  AlertCircle,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  Search,
  MoreVertical,
  Clock,
  CheckCircle2,
  Users2,
} from "lucide-react";

// Simple className merger
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// Card Component
const Card = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string 
}) => (
  <div className={cn("bg-white rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl hover:border-emerald-200/60 transition-all duration-500", className)}>
    {children}
  </div>
);

// Stat Card Component
const StatCard = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  iconBg,
  iconColor,
  subtitle,
  badge,
  index,
}: {
  title: string;
  value: string;
  change?: string;
  changeType?: "up" | "down";
  icon: any;
  iconBg: string;
  iconColor: string;
  subtitle?: string;
  badge?: string;
  index: number;
}) => (
  <Card 
    className="group hover:scale-[1.02] cursor-pointer overflow-hidden"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-emerald-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="p-6 relative">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3", iconBg)}>
          <Icon className={iconColor} size={24} />
        </div>
        {badge && (
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 animate-pulse">
            {badge}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-slate-600">{title}</h3>
        <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
        {change && (
          <div className="flex items-center gap-1.5 pt-1">
            {changeType === "up" ? (
              <ArrowUpRight className="text-emerald-600" size={16} />
            ) : (
              <ArrowDownRight className="text-red-600" size={16} />
            )}
            <span
              className={cn(
                "text-sm font-semibold",
                changeType === "up" ? "text-emerald-600" : "text-red-600"
              )}
            >
              {change}
            </span>
            {subtitle && (
              <span className="text-xs text-slate-500">{subtitle}</span>
            )}
          </div>
        )}
      </div>
    </div>
  </Card>
);

export default function AccountantOverview() {
  const stats = [
    {
      title: "আজকের মোট ফি সংগ্রহ",
      value: "৳ ১,২৫,০০০",
      change: "+১৮%",
      changeType: "up" as const,
      subtitle: "গতকালের তুলনায়",
      icon: DollarSign,
      iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/30",
      iconColor: "text-white",
      badge: "আজ",
    },
    {
      title: "এই মাসের মোট সংগ্রহ",
      value: "৳ ৮,৫০,০০০",
      change: "+১২%",
      changeType: "up" as const,
      subtitle: "গত মাসের তুলনায়",
      icon: Calendar,
      iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/30",
      iconColor: "text-white",
    },
    {
      title: "মোট বেতন প্রদান",
      value: "৳ ৪,২০,০০০",
      icon: Wallet,
      iconBg: "bg-gradient-to-br from-purple-500 to-pink-600 shadow-purple-500/30",
      iconColor: "text-white",
      subtitle: "৩২ জন শিক্ষক",
    },
    {
      title: "মোট খরচ",
      value: "৳ ১,৮৫,০০০",
      change: "-৮%",
      changeType: "down" as const,
      subtitle: "গত মাসের তুলনায়",
      icon: TrendingDown,
      iconBg: "bg-gradient-to-br from-orange-500 to-red-600 shadow-orange-500/30",
      iconColor: "text-white",
    },
    {
      title: "বকেয়া ফি",
      value: "৳ ৩,২৫,০০০",
      icon: AlertCircle,
      iconBg: "bg-gradient-to-br from-red-500 to-rose-600 shadow-red-500/30",
      iconColor: "text-white",
      subtitle: "৪৮ জন ছাত্র",
      badge: "জরুরি",
    },
    {
      title: "নিট ব্যালেন্স",
      value: "৳ ২,৪৫,০০০",
      change: "+২২%",
      changeType: "up" as const,
      icon: TrendingUp,
      iconBg: "bg-gradient-to-br from-emerald-600 to-teal-700 shadow-emerald-600/30",
      iconColor: "text-white",
      subtitle: "মুনাফা",
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      date: "১৭ ফেব, ২০২৬",
      time: "১০:৩০ AM",
      name: "মোহাম্মদ রফিক",
      type: "মাসিক ফি",
      amount: "+ ৳ ৫,০০০",
      status: "সম্পন্ন",
      statusColor: "emerald",
      icon: Receipt,
    },
    {
      id: 2,
      date: "১৭ ফেব, ২০২৬",
      time: "০৯:১৫ AM",
      name: "জনাব আলম",
      type: "বেতন",
      amount: "- ৳ ১৫,০০০",
      status: "প্রদত্ত",
      statusColor: "blue",
      icon: Wallet,
    },
    {
      id: 3,
      date: "১৬ ফেব, ২০২৬",
      time: "০৩:৪৫ PM",
      name: "বিদ্যুৎ বিল",
      type: "খরচ",
      amount: "- ৳ ৮,৫০০",
      status: "পরিশোধিত",
      statusColor: "orange",
      icon: TrendingDown,
    },
    {
      id: 4,
      date: "১৬ ফেব, ২০২৬",
      time: "০২:২০ PM",
      name: "সাকিব হাসান",
      type: "পরীক্ষার ফি",
      amount: "+ ৳ ২,৫০০",
      status: "সম্পন্ন",
      statusColor: "emerald",
      icon: Receipt,
    },
    {
      id: 5,
      date: "১৬ ফেব, ২০২৬",
      time: "১১:০০ AM",
      name: "রক্ষণাবেক্ষণ",
      type: "খরচ",
      amount: "- ৳ ১২,০০০",
      status: "বিলম্বিত",
      statusColor: "red",
      icon: Clock,
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-emerald-900 to-teal-900 bg-clip-text text-transparent">
            আর্থিক ড্যাশবোর্ড
          </h1>
          <p className="text-sm text-slate-500 flex items-center gap-2">
            <Calendar size={14} />
            আজকের তারিখ: ১৭ ফেব্রুয়ারি, ২০২৬ • মঙ্গলবার
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-emerald-200 transition-all duration-300 flex items-center gap-2 group">
            <Filter size={18} className="group-hover:text-emerald-600 transition-colors" />
            <span className="text-sm font-medium">ফিল্টার</span>
          </button>
          <button className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-600/30 transition-all duration-300 flex items-center gap-2 group">
            <Receipt size={18} className="group-hover:rotate-12 transition-transform" />
            <span className="text-sm font-semibold">নতুন লেনদেন</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} index={index} />
        ))}
      </div>

      {/* Quick Stats Banner */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "মোট ছাত্র", value: "৩২০", icon: Users },
              { label: "পেমেন্ট আপডেট", value: "২৭২", icon: CheckCircle2 },
              { label: "আংশিক পেমেন্ট", value: "১৫", icon: Clock },
              { label: "এই সপ্তাহ", value: "৮৯", icon: TrendingUp },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="text-center space-y-2 animate-fadeInSlide"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-center justify-center gap-2">
                  <item.icon className="text-white/80" size={18} />
                  <p className="text-xs text-white/80 font-medium uppercase tracking-wide">
                    {item.label}
                  </p>
                </div>
                <p className="text-3xl font-bold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">সাম্প্রতিক লেনদেন</h3>
              <p className="text-sm text-slate-500 mt-1">সর্বশেষ আর্থিক কার্যক্রম</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="খুঁজুন..."
                  className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300"
                />
              </div>
              <button className="p-2 hover:bg-slate-50 rounded-xl transition-colors">
                <Download className="text-slate-600" size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-emerald-50/30">
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  তারিখ ও সময়
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  ব্যক্তি/প্রতিষ্ঠান
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  ধরন
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  পরিমাণ
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  স্ট্যাটাস
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  অ্যাকশন
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentTransactions.map((transaction, idx) => {
                const Icon = transaction.icon;
                return (
                  <tr
                    key={transaction.id}
                    className="hover:bg-emerald-50/30 transition-all duration-300 group animate-fadeInSlide cursor-pointer"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-900">
                          {transaction.date}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Clock size={12} />
                          {transaction.time}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="text-emerald-600" size={18} />
                        </div>
                        <span className="text-sm font-semibold text-slate-800">
                          {transaction.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{transaction.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "text-sm font-bold",
                          transaction.amount.startsWith("+")
                            ? "text-emerald-600"
                            : "text-red-600"
                        )}
                      >
                        {transaction.amount}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "px-3 py-1.5 text-xs font-bold rounded-full",
                          transaction.statusColor === "emerald" &&
                            "bg-emerald-100 text-emerald-700 border border-emerald-200",
                          transaction.statusColor === "blue" &&
                            "bg-blue-100 text-blue-700 border border-blue-200",
                          transaction.statusColor === "orange" &&
                            "bg-orange-100 text-orange-700 border border-orange-200",
                          transaction.statusColor === "red" &&
                            "bg-red-100 text-red-700 border border-red-200"
                        )}
                      >
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical className="text-slate-600" size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              সর্বমোট <span className="font-bold text-slate-900">১২৮</span> টি লেনদেন
            </p>
            <button className="px-4 py-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-all duration-300">
              সব দেখুন →
            </button>
          </div>
        </div>
      </Card>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out;
        }

        .animate-fadeInSlide {
          animation: fadeInSlide 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
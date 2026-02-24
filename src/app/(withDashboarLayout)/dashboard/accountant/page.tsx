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
  Download,
  Filter,
  Search,
  MoreVertical,
  Clock,
  CheckCircle2,
} from "lucide-react";

// Simple className merger
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// Card Component
const Card = ({
  children,
  className = "",
  style = {}
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={cn(
      "bg-bg-card rounded-2xl border border-border-light shadow-sm hover:shadow-xl hover:border-blue-200/60 transition-all duration-500",
      className
    )}
    style={style}
  >
    {children}
  </div>
);

// Stat Card Component (Card 2 Style)
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
}: any) => (
  <Card
    className="relative p-6 rounded-2xl border border-border-light shadow-sm hover:shadow-md transition-all duration-200"
  >

    <div className="flex flex-col gap-4 relative z-10">
      {/* Icon */}
      <div
        className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
          iconBg
        )}
      >
        <Icon className={iconColor} size={20} />
      </div>

      {/* Content */}
      <div>
        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">
          {title}
        </p>

        <div className="flex items-baseline gap-2 mt-1">
          <h3 className="text-2xl font-bold text-text-primary">{value}</h3>

          {change && (
            <span
              className={cn(
                "text-[10px] font-bold flex items-center gap-0.5",
                changeType === "up" ? "text-emerald-500" : "text-red-500"
              )}
            >
              {changeType === "up" ? (
                <TrendingUp size={10} />
              ) : (
                <TrendingDown size={10} />
              )}
              {change}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="text-xs text-text-muted mt-1">{subtitle}</p>
        )}
      </div>

      {badge && (
        <span className="absolute top-4 right-4 text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
          {badge}
        </span>
      )}
    </div>
  </Card>
);

export default function AccountantOverview() {
  const stats = [
    {
      title: "Today's Total Collection",
      value: "৳ 1,25,000",
      change: "+18%",
      changeType: "up",
      subtitle: "vs yesterday",
      icon: DollarSign,
      iconBg: "bg-blue-500/10 to-indigo-600 shadow-blue-500/30",
      iconColor: "text-blue-500",
      badge: "Today",
    },
    {
      title: "Monthly Collection",
      value: "৳ 8,50,000",
      change: "+12%",
      changeType: "up",
      subtitle: "vs last month",
      icon: Calendar,
      iconBg: "bg-indigo-600/10 to-indigo-500 shadow-blue-500/30",
      iconColor: "text-indigo-600",
    },
    {
      title: "Total Salary Paid",
      value: "৳ 4,20,000",
      icon: Wallet,
      iconBg: "bg-indigo-500/10 to-blue-600 shadow-indigo-500/30",
      iconColor: "text-indigo-500",
      subtitle: "32 teachers",
    },
    {
      title: "Total Expenses",
      value: "৳ 1,85,000",
      change: "-8%",
      changeType: "down",
      subtitle: "vs last month",
      icon: TrendingDown,
      iconBg: "bg-orange-600/10 to-orange-500 shadow-amber-500/30",
      iconColor: "text-amber-500",
    },
    {
      title: "Due Fees",
      value: "৳ 3,25,000",
      icon: AlertCircle,
      iconBg: "bg-red-500/10 to-pink-500 shadow-red-500/30",
      iconColor: "text-red-500",
      subtitle: "48 students",
      badge: "Urgent",
    },
    {
      title: "Net Balance",
      value: "৳ 2,45,000",
      change: "+22%",
      changeType: "up",
      icon: TrendingUp,
      iconBg: "bg-green-600/10 to-green-700 shadow-green-600/30",
      iconColor: "text-green-600",
      subtitle: "Profit",
    },
  ];

  const recentTransactions = [
    {
      id: 1,
      date: "17 Feb, 2026",
      time: "10:30 AM",
      name: "Mohammad Rafiq",
      type: "Monthly Fee",
      amount: "+ ৳ 5,000",
      status: "Completed",
      statusColor: "emerald",
      icon: Receipt,
    },
    {
      id: 2,
      date: "17 Feb, 2026",
      time: "09:15 AM",
      name: "Mr. Alam",
      type: "Salary",
      amount: "- ৳ 15,000",
      status: "Paid",
      statusColor: "blue",
      icon: Wallet,
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">
            Financial Overview
          </h1>
          <p className="text-sm text-text-muted flex items-center gap-2">
            <Calendar size={14} />
            Today's Date: 17 February, 2026 • Tuesday
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 bg-bg-card border border-border-light text-text-secondary hover:bg-bg-page rounded-xl  transition-all duration-300 flex items-center gap-2">
            <Filter size={18} />
            <span className="text-sm font-medium">Filter</span>
          </button>

          <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 flex items-center gap-2">
            <Receipt size={18} />
            <span className="text-sm font-semibold">New Transaction</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} index={index} />
        ))}
      </div>

      {/* Quick Banner */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Total Students", value: "320", icon: Users },
              { label: "Payments Updated", value: "272", icon: CheckCircle2 },
              { label: "Partial Payments", value: "15", icon: Clock },
              { label: "This Week", value: "89", icon: TrendingUp },
            ].map((item, idx) => (
              <div key={idx} className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <item.icon className="text-white/80" size={18} />
                  <p className="text-xs text-white/80 uppercase">{item.label}</p>
                </div>
                <p className="text-3xl font-bold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <div className="p-6 border-b border-border-light">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-text-primary">Recent Transactions</h3>
              <p className="text-sm text-text-muted mt-1">Latest financial activities</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-bg-page border-border-light text-text-muted  border  rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                />
              </div>

              <button className="p-2 hover:bg-slate-50 hover:text-slate-500 rounded-xl transition-colors">
                <Download className="" size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-bg-page text-text-muted">
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Person / Organization
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border-light">
              {recentTransactions.map((transaction, idx) => {
                const Icon = transaction.icon;

                return (
                  <tr
                    key={transaction.id}
                    className="hover:bg-bg-page transition-all duration-300 group animate-fadeInSlide cursor-pointer"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-text-primary">
                          {transaction.date}
                        </span>
                        <span className="text-xs text-text-muted flex items-center gap-1">
                          <Clock size={12} />
                          {transaction.time}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-100 to-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="text-blue-600" size={18} />
                        </div>
                        <span className="text-sm font-medium text-text-primary ">
                          {transaction.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm ">
                        {transaction.type}
                      </span>
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
                      <button className="p-2 bg-gray-500/10 rounded-lg transition-colors ">
                        <MoreVertical className="" size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-border-light border-border-light bg-bg-page
text-text-secondary">
          <div className="flex items-center justify-between">
            <p className="text-sm ">
              Total <span className="font-bold text-text-primary">128</span> transactions
            </p>

            <button className="px-4 py-2 text-sm font-semibold text-blue-700 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-all duration-300">
              View All →
            </button>
          </div>
        </div>
      </Card>


    </div>
  );
}
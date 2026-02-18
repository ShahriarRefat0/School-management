"use client"

import React from "react"
import { Calendar, CreditCard, BookOpen, TrendingUp } from "lucide-react"

// --- Mock Data ---
const stats = [
  { title: "Attendance", value: "92%", icon: Calendar, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { title: "GPA", value: "3.85", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10" },
  { title: "Pending Fees", value: "$450", icon: CreditCard, color: "text-amber-500", bg: "bg-amber-500/10" },
  { title: "Subjects", value: "8", icon: BookOpen, color: "text-indigo-500", bg: "bg-indigo-500/10" },
]

const recentNotices = [
  { id: 1, title: "Mid-Term Exam Schedule Released", category: "Academic", date: "10 Feb, 2026", type: "academic" },
  { id: 2, title: "Annual Sports Day Registration", category: "Events", date: "08 Feb, 2026", type: "event" },
  { id: 3, title: "Tuition Fee Submission Deadline", category: "Payments", date: "05 Feb, 2026", type: "payment" },
]

const attendanceHistory = [
  { date: "17 Feb, 2026", status: "Present", in: "08:15 AM", out: "02:30 PM" },
  { date: "16 Feb, 2026", status: "Late", in: "08:45 AM", out: "02:30 PM" },
  { date: "12 Feb, 2026", status: "Absent", in: "-", out: "-" },
]

export default function StudentDashboard() {
  return (
    <div className="space-y-6">

      {/* --- PAGE HEADER --- */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h1>
        <p className="text-slate-500">Welcome back, check your detailed report here.</p>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-500">{stat.title}</span>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon size={20} className={stat.color} />
              </div>
            </div>
            <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* --- ATTENDANCE SECTION --- */}
        <section className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Recent Attendance</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-r-lg">Check In</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {attendanceHistory.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4 font-medium text-slate-700">{row.date}</td>
                    <td className="px-4 py-4">
                      <span className={`
                        px-2.5 py-1 rounded-full text-xs font-semibold
                        ${row.status === "Present" ? "bg-emerald-100 text-emerald-700" :
                          row.status === "Late" ? "bg-amber-100 text-amber-700" :
                            "bg-red-100 text-red-700"}
                      `}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-500">{row.in}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* --- NOTICES SECTION --- */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Notices</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View All</button>
          </div>

          <div className="flex-1 flex flex-col gap-4">
            {recentNotices.map((notice) => (
              <div key={notice.id} className="group p-4 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-200 transition-all cursor-pointer">
                <div className="flex justify-between items-center mb-2">
                  <span className={`
                    text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded
                    ${notice.type === 'academic' ? 'bg-blue-100 text-blue-700' :
                      notice.type === 'event' ? 'bg-purple-100 text-purple-700' :
                        'bg-amber-100 text-amber-700'}
                  `}>
                    {notice.category}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">{notice.date}</span>
                </div>
                <h4 className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors line-clamp-2">
                  {notice.title}
                </h4>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* --- FEES SUMMARY --- */}
      <section className="bg-slate-900 text-white rounded-xl p-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <CreditCard size={120} />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-slate-400 font-medium mb-1">Total Pending Fees</p>
            <h3 className="text-4xl font-bold tracking-tight">$450.00</h3>
            <p className="text-slate-400 text-sm mt-2">Due date: 28 Feb, 2026</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white border border-blue-500 hover:border-blue-400 px-6 py-3 rounded-lg font-semibold transition-all shadow-lg shadow-blue-900/20">
            Pay Now
          </button>
        </div>
      </section>

    </div>
  )
}
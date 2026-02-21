"use client"

import React from "react"
import {
    Users,
    BookOpen,
    Calendar,
    GraduationCap,
    TrendingUp,
    Clock,
    Bell,
    ArrowRight
} from "lucide-react"

const stats = [
    { title: "Attendance", value: "92%", icon: Calendar, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { title: "Average Grade", value: "A-", icon: TrendingUp, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
    { title: "Courses", value: "6", icon: BookOpen, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20" },
    { title: "Assignments", value: "4 Pending", icon: Clock, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/20" },
]

const recentActivities = [
    { id: 1, title: "Mathematics Assignment", time: "2 hours ago", status: "Pending", type: "assignment" },
    { id: 2, title: "Physics Quiz Result", time: "Yesterday", status: "Scored 85/100", type: "result" },
    { id: 3, title: "Term Exam Schedule", time: "2 days ago", status: "New Update", type: "notice" },
]

export default function StudentDashboardPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Welcome Section */}
            <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">Welcome back, Alex! 👋</h2>
                    <p className="text-blue-100 max-w-md text-lg font-medium opacity-90 leading-relaxed">
                        Everything looks great today. You have 4 pending assignments and your next class starts soon.
                    </p>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-1/4 translate-y-1/4">
                    <GraduationCap size={280} />
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-bg-card border border-border-light rounded-2xl p-7 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between mb-5">
                            <div className={`p-3.5 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110 shadow-sm`}>
                                <stat.icon size={26} />
                            </div>
                            <span className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em]">Overview</span>
                        </div>
                        <p className="text-text-secondary text-sm font-bold">{stat.title}</p>
                        <h3 className="text-3xl font-black text-text-primary mt-2 tracking-tight">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Recent Activity</h3>
                        <button className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1.5 group px-4 py-2 bg-blue-50 dark:bg-blue-900/40 rounded-full transition-colors">
                            View All <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>

                    <div className="bg-bg-card border border-border-light rounded-3xl overflow-hidden shadow-sm">
                        <div className="divide-y divide-border-light">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 flex items-center justify-center">
                                            <Bell size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-text-primary">{activity.title}</h4>
                                            <p className="text-sm text-text-muted font-medium">{activity.time}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-black px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200 border border-blue-100 dark:border-blue-800/50 uppercase tracking-wider">
                                        {activity.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Schedule */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Schedule</h3>
                    <div className="bg-bg-card border border-border-light rounded-3xl p-8 shadow-sm">
                        <div className="space-y-8">
                            {[
                                { subject: "Mathematics", time: "09:00 AM", instructor: "Dr. Sarah" },
                                { subject: "Physics", time: "10:30 AM", instructor: "Prof. James" },
                                { subject: "English", time: "01:00 PM", instructor: "Ms. Emily" },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-5 relative">
                                    {i !== 2 && <div className="absolute left-[19px] top-10 bottom-[-32px] w-0.5 bg-border-light" />}
                                    <div className="z-10 w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm shrink-0">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-text-primary text-base">{item.subject}</h4>
                                        <p className="text-sm text-text-muted font-bold mt-0.5">{item.time} • <span className="text-blue-600 dark:text-blue-400">{item.instructor}</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-10 py-4 rounded-2xl border-2 border-dashed border-border-light text-text-muted text-sm font-black hover:bg-bg-page transition-all active:scale-[0.98]">
                            Full Schedule
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

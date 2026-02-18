"use client";
import React from 'react';
import {
  BookOpen,
  UserCheck,
  GraduationCap,
  Bell,
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  TrendingUp,
  Users
} from 'lucide-react';

export default function TeacherOverview() {
  const stats = [
    {
      title: "Total Classes",
      value: "12",
      subValue: "+2 from last week",
      icon: BookOpen,
      color: "from-blue-600 to-indigo-600",
      lightColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400"
    },
    {
      title: "Total Students",
      value: "450",
      subValue: "Across 4 sections",
      icon: Users,
      color: "from-emerald-600 to-teal-600",
      lightColor: "bg-emerald-50 dark:bg-emerald-900/20",
      textColor: "text-emerald-600 dark:text-emerald-400"
    },
    {
      title: "Attendance Rate",
      value: "94%",
      subValue: "Average this month",
      icon: UserCheck,
      color: "from-orange-600 to-amber-600",
      lightColor: "bg-orange-50 dark:bg-orange-900/20",
      textColor: "text-orange-600 dark:text-orange-400"
    },
    {
      title: "Results Published",
      value: "8/10",
      subValue: "Term exam results",
      icon: GraduationCap,
      color: "from-purple-600 to-violet-600",
      lightColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400"
    }
  ];

  const todayClasses = [
    {
      subject: "Higher Mathematics",
      class: "Class X - Section A",
      time: "09:00 AM - 10:00 AM",
      room: "Room 402",
      status: "Completed",
    },
    {
      subject: "General Science",
      class: "Class IX - Section B",
      time: "10:30 AM - 11:30 AM",
      room: "Science Lab",
      status: "Ongoing",
    },
    {
      subject: "Higher Mathematics",
      class: "Class X - Section C",
      time: "12:00 PM - 01:00 PM",
      room: "Room 405",
      status: "Upcoming",
    },
    {
      subject: "ICT",
      class: "Class VIII - Section A",
      time: "02:00 PM - 03:00 PM",
      room: "Computer Lab",
      status: "Upcoming",
    },
  ];

  const notices = [
    {
      title: "Faculty Meeting - Annual Sports Day",
      date: "Oct 24, 2023",
      tag: "Urgent",
      tagColor: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
    },
    {
      title: "Submission of Monthly Progress Report",
      date: "Oct 26, 2023",
      tag: "Academic",
      tagColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
    },
    {
      title: "New Study Material Guidelines",
      date: "Oct 28, 2023",
      tag: "Update",
      tagColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
    }
  ];

  const cn = (...classes: (string | boolean | undefined)[]) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-text-primary tracking-tight">
            Welcome, <span className="text-primary italic">Abu Raihan</span>! 👋
          </h1>
          <p className="text-text-muted mt-2 font-medium">
            Check your class schedule and updates for today.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-bg-card p-2 rounded-2xl border border-border-light shadow-sm">
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-xl border border-primary/10">
            <Calendar className="text-primary" size={18} />
            <span className="text-sm font-bold text-text-secondary">17 February, 2026</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="group bg-bg-card p-6 rounded-3xl border border-border-light shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-500 relative overflow-hidden"
          >
            <div className={cn("absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity bg-gradient-to-br", stat.color)}></div>
            <div className="flex flex-col gap-4 relative z-10">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3", stat.lightColor)}>
                <stat.icon className={stat.textColor} size={24} />
              </div>
              <div>
                <p className="text-sm font-semibold text-text-muted uppercase tracking-wider">{stat.title}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="text-2xl font-black text-text-primary">{stat.value}</h3>
                  <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
                    <TrendingUp size={10} /> {stat.subValue}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Classes List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
                <Clock size={20} />
              </div>
              <h2 className="text-xl font-bold text-text-primary">Today s Classes</h2>
            </div>
            <button className="text-sm font-bold text-primary hover:underline flex items-center gap-1 group">
              View Full Routine <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid gap-4">
            {todayClasses.map((cls, idx) => (
              <div
                key={idx}
                className="group bg-bg-card p-5 rounded-2xl border border-border-light shadow-sm hover:border-indigo-500/40 hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex gap-4 items-center">
                  <div className={cn(
                    "w-2 h-12 rounded-full",
                    cls.status === "Completed" ? "bg-slate-300 dark:bg-slate-700" :
                      cls.status === "Ongoing" ? "bg-emerald-500 animate-pulse" : "bg-indigo-500"
                  )}></div>
                  <div>
                    <h4 className="font-bold text-text-primary group-hover:text-primary transition-colors">{cls.subject}</h4>
                    <p className="text-xs text-text-muted font-medium mt-0.5">{cls.class}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2 text-text-muted">
                    <Clock size={16} className="text-indigo-500" />
                    <span className="text-sm font-medium">{cls.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-muted">
                    <MapPin size={16} className="text-indigo-500" />
                    <span className="text-sm font-medium">{cls.room}</span>
                  </div>
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    cls.status === "Completed" ? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" :
                      cls.status === "Ongoing" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 text-glow-emerald" :
                        "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                  )}>
                    {cls.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Cards for Dashboard */}
        <div className="space-y-8">
        
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <UserCheck size={80} />
            </div>
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <UserCheck size={20} /> Attendance Record
            </h3>
            <p className="text-indigo-100/80 text-sm mb-6 leading-relaxed">
              You have 2 classes attendance pending today. Please complete them on time.
            </p>
            <button className="w-full py-3 bg-white text-indigo-700 rounded-xl font-bold text-sm shadow-lg hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 active:scale-95 duration-200">
              Record Now <ArrowRight size={16} />
            </button>
          </div>

          {/* Notices Section */}
          <div className="bg-bg-card rounded-3xl p-6 border border-border-light shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                <Bell size={18} className="text-indigo-600" /> Notice Board
              </h3>
              <button className="text-xs font-bold text-primary uppercase tracking-widest hover:underline">All</button>
            </div>
            <div className="space-y-5">
              {notices.map((notice, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-sm font-bold text-text-secondary group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {notice.title}
                    </h4>
                    <span className={cn("shrink-0 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase", notice.tagColor)}>
                      {notice.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-muted mt-1.5 font-medium">{notice.date}</p>
                  {idx !== notices.length - 1 && <div className="h-px bg-border-light mt-5"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

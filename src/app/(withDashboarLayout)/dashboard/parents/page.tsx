'use client';

import {
  LineChart as LineIcon,
  CheckCircle2,
  GraduationCap,
  CreditCard,
  TrendingUp,
  BookOpen,
  Bell,
  MessageSquare,
} from 'lucide-react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const StatCard = ({ title, value, badge, icon: Icon, index }: any) => (
  <div
    className="bg-bg-card p-6 rounded-xl border border-border-light transition hover:border-primary/40"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="text-primary" size={20} />
      </div>

      {badge && (
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
          {badge}
        </span>
      )}
    </div>

    <h3 className="text-sm text-text-muted">{title}</h3>
    <p className="text-2xl font-bold text-text-primary">{value}</p>
  </div>
);

export default function ParentOverview() {
  const stats = [
    {
      title: 'মোট উপস্থিতি',
      value: '৯৪%',
      icon: CheckCircle2,
      badge: 'নিয়মিত',
    },
    {
      title: 'সর্বশেষ জিপিএ',
      value: '৪.৮৫',
      icon: GraduationCap,
    },
    {
      title: 'ফি স্ট্যাটাস',
      value: '৳ ৩,৫০০',
      icon: CreditCard,
      badge: 'বকেয়া',
    },
  ];

  const notifications = [
    {
      id: 1,
      date: '১৭ ফেব',
      title: 'আজকের উপস্থিতি',
      desc: 'সন্তান ১০:১৫ মিনিটে স্কুলে প্রবেশ করেছে।',
      icon: CheckCircle2,
    },
    {
      id: 2,
      date: '১৫ ফেব',
      title: 'পরীক্ষার ফলাফল',
      desc: 'গণিত পরীক্ষায় প্রাপ্ত নম্বর: ৯৫',
      icon: LineIcon,
    },
  ];

  // GPA Data
  const gpaData = [
    { exam: 'Jan', gpa: 4.2 },
    { exam: 'Feb', gpa: 4.4 },
    { exam: 'Mar', gpa: 4.3 },
    { exam: 'Apr', gpa: 4.6 },
    { exam: 'May', gpa: 4.85 },
  ];

  return (
    <div className="space-y-8 bg-bg-page min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            সন্তানের অগ্রগতি
          </h1>
          <p className="text-sm text-text-muted">
            ছাত্র: সাকিব আহমেদ • ক্লাস: ৮
          </p>
        </div>

        <button className="px-5 py-2.5 bg-primary text-white rounded-lg font-semibold flex items-center gap-2 transition hover:opacity-90">
          <MessageSquare size={18} />
          শিক্ষককে মেসেজ দিন
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} index={i} />
        ))}
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart Section */}
          <div className="bg-bg-card p-6 rounded-xl border border-border-light">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={18} className="text-primary" />
              <h3 className="font-semibold text-text-primary">GPA Progress</h3>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={gpaData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(100,116,139,0.2)"
                  />
                  <XAxis dataKey="exam" stroke="#64748B" />
                  <YAxis domain={[3.5, 5]} stroke="#64748B" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="gpa"
                    stroke="var(--color-primary)"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Upcoming Exam */}
          <div className="p-4 bg-bg-card rounded-xl border border-border-light flex items-center gap-4">
            <BookOpen className="text-primary" />
            <div>
              <p className="text-xs font-semibold text-text-muted">
                আগামীকালকের পরীক্ষা
              </p>
              <p className="font-semibold text-text-primary">ইংরেজি ২য় পত্র</p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-bg-card rounded-xl border border-border-light p-6">
          <h3 className="font-semibold text-text-primary mb-6 flex items-center gap-2">
            <Bell size={18} className="text-primary" />
            সাম্প্রতিক আপডেট
          </h3>

          <div className="space-y-6">
            {notifications.map((n) => (
              <div key={n.id} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <n.icon size={14} className="text-primary" />
                </div>

                <div>
                  <p className="text-xs text-text-muted">{n.date}</p>
                  <p className="font-semibold text-text-primary text-sm">
                    {n.title}
                  </p>
                  <p className="text-xs text-text-muted">{n.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

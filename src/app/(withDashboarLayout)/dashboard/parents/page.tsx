'use client';
import {
  LineChart,
  CheckCircle2,
  GraduationCap,
  CreditCard,
  TrendingUp,
  BookOpen,
  Clock,
  Bell,
  AlertCircle,
  MessageSquare,
  History,
} from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ');

const StatCard = ({ title, value, badge, icon: Icon, iconBg, index }: any) => (
  <div
    className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-xl transition-all duration-500 group"
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="flex items-start justify-between mb-4">
      <div
        className={cn(
          'w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110',
          iconBg,
        )}
      >
        <Icon className="text-white" size={24} />
      </div>
      {badge && (
        <span
          className={cn(
            'text-xs font-bold px-3 py-1.5 rounded-full border animate-pulse',
            badge === 'বকেয়া'
              ? 'text-red-600 bg-red-50 border-red-200'
              : 'text-emerald-600 bg-emerald-50 border-emerald-200',
          )}
        >
          {badge}
        </span>
      )}
    </div>
    <h3 className="text-sm font-medium text-slate-600">{title}</h3>
    <p className="text-3xl font-bold text-slate-900">{value}</p>
  </div>
);

export default function ParentOverview() {
  const stats = [
    {
      title: 'মোট উপস্থিতি',
      value: '৯৪%',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-500',
      badge: 'নিয়মিত',
    },
    {
      title: 'সর্বশেষ জিপিএ',
      value: '৪.৮৫',
      icon: GraduationCap,
      iconBg: 'bg-blue-500',
    },
    {
      title: 'ফি স্ট্যাটাস',
      value: '৳ ৩,৫০০',
      icon: CreditCard,
      iconBg: 'bg-orange-500',
      badge: 'বকেয়া',
    },
  ];

  const notifications = [
    {
      id: 1,
      date: '১৭ ফেব',
      title: 'আজকের উপস্থিতি',
      desc: 'সন্তান ১০:১৫ মিনিটে স্কুলে প্রবেশ করেছে।',
      icon: CheckCircle2,
      color: 'bg-emerald-500',
    },
    {
      id: 2,
      date: '১৫ ফেব',
      title: 'পরীক্ষার ফলাফল',
      desc: 'গণিত পরীক্ষায় প্রাপ্ত নম্বর: ৯৫',
      icon: LineChart,
      color: 'bg-blue-500',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            সন্তানের অগ্রগতি
          </h1>
          <p className="text-sm text-slate-500">
            ছাত্র: সাকিব আহমেদ • ক্লাস: ৮
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-emerald-600/20">
            <MessageSquare size={18} /> শিক্ষককে মেসেজ দিন
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} index={i} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm h-64 flex flex-col items-center justify-center text-slate-400">
            <TrendingUp size={48} className="opacity-20 mb-2" />
            <p>পারফরম্যান্স গ্রাফ লোড হচ্ছে...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-4">
              <BookOpen className="text-emerald-600" />
              <div>
                <p className="text-xs font-bold text-slate-500">
                  আগামীকালকের পরীক্ষা
                </p>
                <p className="font-bold text-slate-800">ইংরেজি ২য় পত্র</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/60 p-6">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Bell size={18} /> সাম্প্রতিক আপডেট
          </h3>
          <div className="space-y-6">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="relative pl-8 border-l border-slate-100 pb-6 last:pb-0"
              >
                <div
                  className={cn(
                    'absolute -left-4 top-0 w-8 h-8 rounded-full flex items-center justify-center text-white border-4 border-white',
                    n.color,
                  )}
                >
                  <n.icon size={12} />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  {n.date}
                </p>
                <p className="font-bold text-slate-800 text-sm">{n.title}</p>
                <p className="text-xs text-slate-500">{n.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

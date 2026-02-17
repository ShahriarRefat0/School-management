'use client';
import { useState } from 'react';
import {
  LineChart,
  BarChart3,
  GraduationCap,
  Trophy,
  Target,
  BookOpen,
  ArrowUpRight,
  ChevronRight,
  Star,
  Download,
} from 'lucide-react';

// Simple className merger
const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ');

export default function PerformancePage() {
  const [selectedExam, setSelectedExam] = useState(
    'প্রথম সাময়িক পরীক্ষা - ২০২৬',
  );

  // সামারি ডাটা
  const performanceStats = [
    {
      title: 'বর্তমান জিপিএ',
      value: '৪.৮৫',
      icon: GraduationCap,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'শ্রেণিতে অবস্থান',
      value: '৫ম',
      icon: Trophy,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
    {
      title: 'মোট নম্বর',
      value: '৮৪২/১০০০',
      icon: Target,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      title: 'গ্রেড',
      value: 'A+',
      icon: Star,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  // বিষয়ভিত্তিক নম্বর
  const subjectWiseMarks = [
    {
      subject: 'বাংলা',
      marks: 88,
      total: 100,
      grade: 'A+',
      status: 'Excellent',
    },
    {
      subject: 'ইংরেজি',
      marks: 92,
      total: 100,
      grade: 'A+',
      status: 'Top Performer',
    },
    {
      subject: 'গণিত',
      marks: 95,
      total: 100,
      grade: 'A+',
      status: 'Excellent',
    },
    { subject: 'বিজ্ঞান', marks: 78, total: 100, grade: 'A', status: 'Good' },
    { subject: 'সমাজ', marks: 82, total: 100, grade: 'A+', status: 'Improved' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            একাডেমিক পারফরম্যান্স
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            সন্তানের পরীক্ষার ফলাফল ও উন্নতির গ্রাফ দেখুন
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="bg-white border border-slate-200 text-sm font-semibold rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
          >
            <option>প্রথম সাময়িক পরীক্ষা - ২০২৬</option>
            <option>মাসিক মূল্যায়ন - জানুয়ারি</option>
            <option>বার্ষিক পরীক্ষা - ২০২৫</option>
          </select>
          <button className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-colors">
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all group"
          >
            <div
              className={cn(
                'w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3',
                stat.bg,
              )}
            >
              <stat.icon className={stat.color} size={24} />
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              {stat.title}
            </p>
            <p className="text-3xl font-bold text-slate-900 mt-1">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Graph Placeholder */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <LineChart className="text-emerald-600" size={20} /> রেজাল্ট
                প্রগ্রেস (GPA)
              </h3>
              <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />{' '}
                  বর্তমান বছর
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-200" /> গত
                  বছর
                </span>
              </div>
            </div>
            {/* Graph Area */}
            <div className="h-64 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
              <BarChart3 size={48} className="mb-2 opacity-20" />
              <p className="text-sm italic">
                পারফরম্যান্স এনালাইটিক্স গ্রাফ লোড হচ্ছে...
              </p>
            </div>
          </div>

          {/* Teacher's Remarks */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl text-white shadow-xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                <Star
                  className="text-yellow-400"
                  fill="currentColor"
                  size={24}
                />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">শিক্ষকের মন্তব্য</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  "সাকিব গণিতে অনেক ভালো উন্নতি করেছে। তবে বিজ্ঞানে একটু বেশি
                  মনোযোগ দেওয়া প্রয়োজন। সার্বিকভাবে তার হাতের লেখা এবং ক্লাসে
                  সক্রিয় অংশগ্রহণ প্রশংসনীয়।"
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold">
                    MR
                  </div>
                  <span className="text-xs font-medium text-slate-400">
                    — মাহমুদুর রহমান (শ্রেণি শিক্ষক)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Wise List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between text-slate-900">
              <h3 className="font-bold">বিষয়ভিত্তিক নম্বর</h3>
              <BookOpen size={18} className="text-slate-400" />
            </div>
            <div className="p-6 space-y-6">
              {subjectWiseMarks.map((sub, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {sub.subject}
                      </p>
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">
                        {sub.status}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-900">
                        {sub.marks}
                      </span>
                      <span className="text-xs text-slate-400">
                        /{sub.total}
                      </span>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-1000',
                        sub.marks >= 80
                          ? 'bg-emerald-500'
                          : sub.marks >= 70
                            ? 'bg-blue-500'
                            : 'bg-orange-500',
                      )}
                      style={{ width: `${(sub.marks / sub.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              <button className="w-full py-3 mt-4 border border-emerald-100 text-emerald-700 text-xs font-bold rounded-xl hover:bg-emerald-50 transition-all flex items-center justify-center gap-2">
                বিস্তারিত রিপোর্ট কার্ড দেখুন <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

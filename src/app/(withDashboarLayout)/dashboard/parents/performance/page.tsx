'use client';

import { useState } from 'react';
import {
  LineChart,
  BarChart3,
  GraduationCap,
  Trophy,
  Target,
  BookOpen,
  ChevronRight,
  Star,
  Download,
} from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ');

export default function PerformancePage() {
  const [selectedExam, setSelectedExam] = useState(
    'প্রথম সাময়িক পরীক্ষা - ২০২৬',
  );

  const performanceStats = [
    { title: 'বর্তমান জিপিএ', value: '৪.৮৫', icon: GraduationCap },
    { title: 'শ্রেণিতে অবস্থান', value: '৫ম', icon: Trophy },
    { title: 'মোট নম্বর', value: '৮৪২/১০০০', icon: Target },
    { title: 'গ্রেড', value: 'A+', icon: Star },
  ];

  const subjectWiseMarks = [
    { subject: 'বাংলা', marks: 88, total: 100 },
    { subject: 'ইংরেজি', marks: 92, total: 100 },
    { subject: 'গণিত', marks: 95, total: 100 },
    { subject: 'বিজ্ঞান', marks: 78, total: 100 },
    { subject: 'সমাজ', marks: 82, total: 100 },
  ];

  return (
    <div className="space-y-8 bg-bg-page min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            একাডেমিক পারফরম্যান্স
          </h1>
          <p className="text-sm text-text-muted mt-1">
            পরীক্ষার ফলাফল ও উন্নতির বিশ্লেষণ
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="bg-bg-card border border-border-light text-sm rounded-lg px-4 py-2.5 outline-none focus:border-primary"
          >
            <option>প্রথম সাময়িক পরীক্ষা - ২০২৬</option>
            <option>মাসিক মূল্যায়ন - জানুয়ারি</option>
            <option>বার্ষিক পরীক্ষা - ২০২৫</option>
          </select>

          <button className="p-2.5 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-bg-card p-6 rounded-xl border border-border-light"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <stat.icon size={18} className="text-primary" />
            </div>
            <p className="text-xs text-text-muted uppercase tracking-wide">
              {stat.title}
            </p>
            <p className="text-2xl font-bold text-text-primary mt-1">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          {/* Graph Placeholder */}
          <div className="bg-bg-card p-6 rounded-xl border border-border-light">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-text-primary flex items-center gap-2">
                <LineChart size={18} className="text-primary" />
                রেজাল্ট প্রগ্রেস (GPA)
              </h3>
            </div>

            <div className="h-56 bg-primary/5 rounded-xl border border-border-light flex flex-col items-center justify-center text-text-muted">
              <BarChart3 size={40} className="opacity-30 mb-2 text-primary" />
              <p className="text-sm">পারফরম্যান্স গ্রাফ লোড হচ্ছে...</p>
            </div>
          </div>

          {/* Teacher Remark */}
          <div className="bg-bg-card p-6 rounded-xl border border-border-light">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Star size={18} className="text-primary" />
              </div>

              <div>
                <h4 className="font-semibold text-text-primary mb-2">
                  শিক্ষকের মন্তব্য
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  সাকিব গণিতে ভালো উন্নতি করেছে। বিজ্ঞানে আরও মনোযোগ দেওয়া
                  প্রয়োজন। সার্বিকভাবে তার অংশগ্রহণ প্রশংসনীয়।
                </p>

                <p className="text-xs text-text-muted mt-3">
                  — মাহমুদুর রহমান (শ্রেণি শিক্ষক)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Subject List */}
        <div>
          <div className="bg-bg-card rounded-xl border border-border-light overflow-hidden">
            <div className="p-6 border-b border-border-light flex justify-between items-center">
              <h3 className="font-semibold text-text-primary">
                বিষয়ভিত্তিক নম্বর
              </h3>
              <BookOpen size={16} className="text-primary" />
            </div>

            <div className="p-6 space-y-5">
              {subjectWiseMarks.map((sub, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-sm font-semibold text-text-primary">
                      {sub.subject}
                    </p>
                    <span className="text-sm font-semibold text-text-primary">
                      {sub.marks}/{sub.total}
                    </span>
                  </div>

                  <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-700"
                      style={{
                        width: `${(sub.marks / sub.total) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}

              <button className="w-full py-2.5 mt-4 bg-primary text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition">
                বিস্তারিত রিপোর্ট কার্ড দেখুন <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

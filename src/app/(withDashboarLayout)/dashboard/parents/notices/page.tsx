'use client';

import { useState } from 'react';
import {
  Megaphone,
  Search,
  Pin,
  Clock,
  Download,
  ChevronRight,
  Calendar,
  FileText,
} from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ');

export default function NoticesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const notices = [
    {
      id: 1,
      title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৬',
      date: '২০ ফেব, ২০২৬',
      category: 'Event',
      desc: '২৫শে ফেব্রুয়ারি বার্ষিক ক্রীড়া প্রতিযোগিতা অনুষ্ঠিত হবে। সকলকে উপস্থিত থাকার অনুরোধ করা হচ্ছে।',
      isPinned: true,
      priority: 'High',
    },
    {
      id: 2,
      title: 'শবে বরাত উপলক্ষে ছুটি',
      date: '১৫ ফেব, ২০২৬',
      category: 'Holiday',
      desc: '১৮ই ফেব্রুয়ারি স্কুল ছুটি থাকবে। ১৯শে ফেব্রুয়ারি থেকে ক্লাস শুরু।',
      isPinned: false,
      priority: 'Normal',
    },
    {
      id: 3,
      title: 'প্রথম সাময়িক পরীক্ষার সময়সূচী',
      date: '১০ ফেব, ২০২৬',
      category: 'Exam',
      desc: 'প্রথম সাময়িক পরীক্ষার রুটিন প্রকাশিত হয়েছে। নিচ থেকে ডাউনলোড করুন।',
      isPinned: false,
      priority: 'Urgent',
    },
  ];

  return (
    <div className="space-y-8 bg-bg-page min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <Megaphone size={22} className="text-primary" />
            নোটিশ বোর্ড
          </h1>
          <p className="text-sm text-text-muted mt-1">
            গুরুত্বপূর্ণ আপডেট এবং নোটিশ
          </p>
        </div>

        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            size={16}
          />
          <input
            type="text"
            placeholder="নোটিশ খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2.5 bg-bg-card border border-border-light rounded-lg text-sm w-full md:w-64 outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Notice List */}
        <div className="lg:col-span-2 space-y-4">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className={cn(
                'bg-bg-card p-6 rounded-xl border border-border-light transition hover:border-primary/40 relative',
              )}
            >
              {notice.isPinned && (
                <div className="absolute -left-2 -top-2 bg-primary text-white p-1 rounded-md">
                  <Pin size={12} />
                </div>
              )}

              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary uppercase">
                      {notice.category}
                    </span>

                    <span className="text-xs text-text-muted flex items-center gap-1">
                      <Clock size={12} /> {notice.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-text-primary">
                    {notice.title}
                  </h3>
                </div>

                <button className="p-2 rounded-md hover:bg-primary/10 transition">
                  <Download size={16} className="text-primary" />
                </button>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed">
                {notice.desc}
              </p>

              <div className="mt-4 pt-4 border-t border-border-light flex justify-between items-center">
                <button className="text-xs font-semibold text-primary flex items-center gap-1">
                  বিস্তারিত পড়ুন <ChevronRight size={14} />
                </button>

                {notice.priority === 'Urgent' && (
                  <span className="text-[10px] font-semibold text-primary">
                    জরুরি
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories */}
          <div className="bg-bg-card p-6 rounded-xl border border-border-light">
            <h3 className="font-semibold text-text-primary mb-4">ক্যাটাগরি</h3>

            <div className="space-y-2">
              {[
                { name: 'একাডেমিক', count: 12 },
                { name: 'পরীক্ষা', count: 4 },
                { name: 'ইভেন্ট', count: 8 },
                { name: 'ছুটি', count: 5 },
              ].map((cat, i) => (
                <button
                  key={i}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-primary/5 transition"
                >
                  <span className="text-sm text-text-secondary">
                    {cat.name}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary">
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Card */}
          <div className="bg-primary/10 p-6 rounded-xl border border-border-light">
            <div className="flex items-center gap-2 mb-3">
              <Calendar size={18} className="text-primary" />
              <h3 className="font-semibold text-text-primary">
                স্কুল ক্যালেন্ডার
              </h3>
            </div>

            <p className="text-xs text-text-secondary mb-4">
              পুরো বছরের ছুটির তালিকা এবং ইভেন্ট ক্যালেন্ডার ডাউনলোড করুন।
            </p>

            <button className="w-full py-2.5 bg-primary text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition">
              <FileText size={14} /> পিডিএফ ডাউনলোড
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

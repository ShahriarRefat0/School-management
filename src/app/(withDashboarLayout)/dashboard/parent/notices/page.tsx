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
      title: 'বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৬',
      date: '২০ ফেব, ২০২৬',
      category: 'Event',
      desc: '২৫শে ফেব্রুয়ারি বার্ষিক ক্রীড়া প্রতিযোগিতা অনুষ্ঠিত হবে। সকলকে উপস্থিত থাকার অনুরোধ করা হচ্ছে।',
      isPinned: true,
      priority: 'High',
    },
    {
      id: 2,
      title: 'শবে বরাত উপলক্ষে ছুটি',
      date: '১৫ ফেব, ২০২৬',
      category: 'Holiday',
      desc: '১৮ই ফেব্রুয়ারি স্কুল ছুটি থাকবে। ১৯শে ফেব্রুয়ারি থেকে ক্লাস শুরু।',
      isPinned: false,
      priority: 'Normal',
    },
    {
      id: 3,
      title: 'প্রথম সাময়িক পরীক্ষার সময়সূচী',
      date: '১০ ফেব, ২০২৬',
      category: 'Exam',
      desc: 'প্রথম সাময়িক পরীক্ষার রুটিন প্রকাশিত হয়েছে। নিচ থেকে ডাউনলোড করুন।',
      isPinned: false,
      priority: 'Urgent',
    },
  ];

  return (
    <div className="space-y-8 bg-bg-page min-h-screen p-4 md:p-6 transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
        <div>
          <h1 className="text-2xl font-bold text-text-primary flex items-center gap-2">
            <Megaphone size={22} className="text-primary" />
            নোটিশ বোর্ড
          </h1>
          <p className="text-sm text-text-muted mt-1">
            গুরুত্বপূর্ণ আপডেট এবং সর্বশেষ নোটিশসমূহ
          </p>
        </div>

        <div className="relative group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors"
            size={16}
          />
          <input
            type="text"
            placeholder="নোটিশ খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2.5 bg-bg-card border border-border-light rounded-xl text-sm w-full md:w-64 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-text-primary transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Notice List */}
        <div className="lg:col-span-2 space-y-4">
          {notices.map((notice, idx) => (
            <div
              key={notice.id}
              style={{ animationDelay: `${idx * 100}ms` }}
              className={cn(
                'bg-bg-card p-6 rounded-2xl border border-border-light transition-all hover:border-primary/40 relative shadow-sm hover:shadow-md animate-in fade-in slide-in-from-left-4 duration-500 fill-mode-both',
              )}
            >
              {notice.isPinned && (
                <div className="absolute -left-2 -top-2 bg-primary text-white p-1.5 rounded-lg shadow-lg">
                  <Pin size={14} fill="currentColor" />
                </div>
              )}

              <div className="flex justify-between items-start mb-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wider border border-primary/20">
                      {notice.category}
                    </span>

                    <span className="text-xs text-text-muted flex items-center gap-1">
                      <Clock size={12} /> {notice.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-text-primary leading-tight">
                    {notice.title}
                  </h3>
                </div>

                <button className="p-2.5 rounded-xl bg-bg-page hover:bg-primary/10 transition-colors group">
                  <Download
                    size={18}
                    className="text-text-muted group-hover:text-primary"
                  />
                </button>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed">
                {notice.desc}
              </p>

              <div className="mt-5 pt-4 border-t border-border-light flex justify-between items-center">
                <button className="text-xs font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all">
                  বিস্তারিত পড়ুন <ChevronRight size={14} />
                </button>

                {notice.priority === 'Urgent' ? (
                  <span className="flex items-center gap-1.5 text-[10px] font-black text-red-500 uppercase tracking-widest bg-red-500/10 px-2 py-1 rounded">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                    জরুরি
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-text-muted uppercase">
                    সাধারণ
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-700">
          {/* Categories */}
          <div className="bg-bg-card p-6 rounded-2xl border border-border-light shadow-sm">
            <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
              <span className="w-1 h-4 bg-primary rounded-full" />
              ক্যাটাগরি
            </h3>

            <div className="space-y-1">
              {[
                { name: 'একাডেমিক', count: 12 },
                { name: 'পরীক্ষা', count: 4 },
                { name: 'ইভেন্ট', count: 8 },
                { name: 'ছুটি', count: 5 },
              ].map((cat, i) => (
                <button
                  key={i}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-primary/5 transition-all group"
                >
                  <span className="text-sm text-text-secondary group-hover:text-primary font-medium">
                    {cat.name}
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-bg-page text-text-muted group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Card */}
          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 text-primary/10 group-hover:scale-110 transition-transform duration-500">
              <Calendar size={100} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-primary rounded-lg text-white">
                  <Calendar size={18} />
                </div>
                <h3 className="font-bold text-text-primary">
                  স্কুল ক্যালেন্ডার
                </h3>
              </div>

              <p className="text-xs text-text-muted mb-5 leading-relaxed">
                পুরো বছরের ছুটির তালিকা এবং একাডেমিক ইভেন্ট ক্যালেন্ডার ডাউনলোড
                করে সংগ্রহে রাখুন।
              </p>

              <button className="w-full py-3 bg-primary text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
                <FileText size={16} /> পিডিএফ ডাউনলোড
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

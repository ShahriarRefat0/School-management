'use client';
import { useState } from 'react';
import {
  Bell,
  Calendar,
  ChevronRight,
  FileText,
  Megaphone,
  Search,
  Pin,
  Clock,
  Download,
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
      desc: 'আগামী ২৫শে ফেব্রুয়ারি স্কুলের বার্ষিক ক্রীড়া প্রতিযোগিতা অনুষ্ঠিত হবে। সকল ছাত্র-ছাত্রীকে উপস্থিত থাকার জন্য অনুরোধ করা হচ্ছে।',
      isPinned: true,
      priority: 'High',
    },
    {
      id: 2,
      title: 'শবে বরাত উপলক্ষে ছুটি',
      date: '১৫ ফেব, ২০২৬',
      category: 'Holiday',
      desc: 'শবে বরাত উপলক্ষে আগামী ১৮ই ফেব্রুয়ারি স্কুল সাধারণ ছুটি থাকবে। ক্লাস পুনরায় ১৯শে ফেব্রুয়ারি থেকে শুরু হবে।',
      isPinned: false,
      priority: 'Normal',
    },
    {
      id: 3,
      title: 'প্রথম সাময়িক পরীক্ষার সময়সূচী',
      date: '১০ ফেব, ২০২৬',
      category: 'Exam',
      desc: '২০২৬ সালের প্রথম সাময়িক পরীক্ষার রুটিন প্রকাশিত হয়েছে। আপনারা নিচের ডাউনলোড বাটন থেকে রুটিনটি সংগ্রহ করতে পারেন।',
      isPinned: false,
      priority: 'Urgent',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Megaphone className="text-emerald-600" size={24} />
            নোটিশ বোর্ড
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            স্কুলের সকল গুরুত্বপূর্ণ আপডেট এবং নোটিশ এখানে পাবেন
          </p>
        </div>
        <div className="relative group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="নোটিশ খুঁজুন..."
            className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm w-full md:w-64 outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Notice List */}
        <div className="lg:col-span-2 space-y-4">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className={cn(
                'bg-white p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg group relative',
                notice.isPinned
                  ? 'border-emerald-100 bg-emerald-50/10'
                  : 'border-slate-200/60',
              )}
            >
              {notice.isPinned && (
                <div className="absolute -left-2 -top-2 bg-emerald-500 text-white p-1.5 rounded-lg shadow-lg">
                  <Pin size={14} fill="currentColor" />
                </div>
              )}

              <div className="flex justify-between items-start mb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider',
                        notice.category === 'Exam'
                          ? 'bg-red-100 text-red-600'
                          : notice.category === 'Holiday'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-emerald-100 text-emerald-600',
                      )}
                    >
                      {notice.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock size={12} /> {notice.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {notice.title}
                  </h3>
                </div>
                <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                  <Download size={18} />
                </button>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {notice.desc}
              </p>

              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                <button className="text-xs font-bold text-emerald-600 flex items-center gap-1 hover:underline">
                  বিস্তারিত পড়ুন <ChevronRight size={14} />
                </button>
                {notice.priority === 'Urgent' && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-red-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    জরুরি
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar: Categories & Archive */}
        <div className="space-y-6">
          {/* Quick Categories */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">ক্যাটাগরি</h3>
            <div className="space-y-2">
              {[
                { name: 'একাডেমিক', count: 12, color: 'bg-blue-500' },
                { name: 'পরীক্ষা', count: 4, color: 'bg-red-500' },
                { name: 'ইভেন্ট', count: 8, color: 'bg-emerald-500' },
                { name: 'ছুটি', count: 5, color: 'bg-orange-500' },
              ].map((cat, i) => (
                <button
                  key={i}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn('w-1.5 h-6 rounded-full', cat.color)} />
                    <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">
                      {cat.name}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-lg">
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Mini */}
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 rounded-2xl text-white shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Calendar size={20} />
              <h3 className="font-bold">স্কুল ক্যালেন্ডার</h3>
            </div>
            <p className="text-xs text-emerald-50 leading-relaxed mb-4">
              পুরো বছরের ছুটির তালিকা এবং ইভেন্ট ক্যালেন্ডার ডাউনলোড করুন।
            </p>
            <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
              <FileText size={16} /> পিডিএফ ডাউনলোড
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Info,
} from 'lucide-react';

// Helper for classes
const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ');

export default function AttendancePage() {
  const [currentMonth, setCurrentMonth] = useState('ফেব্রুয়ারি ২০২৬');

  // ডামি ডাটা: উপস্থিতির সামারি
  const attendanceSummary = [
    {
      label: 'মোট কার্যদিবস',
      value: '১৮',
      icon: CalendarIcon,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'উপস্থিত',
      value: '১৬',
      icon: CheckCircle2,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'অনুপস্থিত',
      value: '০২',
      icon: XCircle,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      label: 'গড় উপস্থিতির হার',
      value: '৮৯%',
      icon: Clock,
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ];

  // ডামি ডাটা: প্রতিদিনের লগ
  const attendanceLog = [
    {
      date: '১৭ ফেব, ২০২৬',
      day: 'মঙ্গলবার',
      entry: '১০:১৫ AM',
      exit: '০৪:০০ PM',
      status: 'Present',
      statusBn: 'উপস্থিত',
    },
    {
      date: '১৬ ফেব, ২০২৬',
      day: 'সোমবার',
      entry: '১০:০৫ AM',
      exit: '০৪:০৫ PM',
      status: 'Present',
      statusBn: 'উপস্থিত',
    },
    {
      date: '১৫ ফেব, ২০২৬',
      day: 'রবিবার',
      entry: '---',
      exit: '---',
      status: 'Absent',
      statusBn: 'অনুপস্থিত',
    },
    {
      date: '১২ ফেব, ২০২৬',
      day: 'বৃহস্পতিবার',
      entry: '১০:১০ AM',
      exit: '০৩:৫৫ PM',
      status: 'Present',
      statusBn: 'উপস্থিত',
    },
    {
      date: '১১ ফেব, ২০২৬',
      day: 'বুধবার',
      entry: '১০:২০ AM',
      exit: '০৪:১০ PM',
      status: 'Late',
      statusBn: 'বিলম্বিত',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            উপস্থিতি রিপোর্ট
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            সন্তানের প্রতিদিনের উপস্থিতির বিস্তারিত তথ্য দেখুন
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <button className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors">
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm font-bold px-4">{currentMonth}</span>
          <button className="p-1.5 hover:bg-slate-50 rounded-lg transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {attendanceSummary.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-sm group hover:border-emerald-200 transition-all"
          >
            <div
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110',
                item.bg,
              )}
            >
              <item.icon className={item.color} size={20} />
            </div>
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              {item.label}
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Attendance Log Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">দৈনিক হাজিরা লগ</h3>
              <button className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
                <Info size={14} /> নিয়মাবলী
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                      তারিখ
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                      প্রবেশ
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                      প্রস্থান
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase">
                      স্ট্যাটাস
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attendanceLog.map((log, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-800">
                          {log.date}
                        </p>
                        <p className="text-[10px] text-slate-500">{log.day}</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">
                        {log.entry}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">
                        {log.exit}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={cn(
                            'px-3 py-1 rounded-full text-[10px] font-bold border',
                            log.status === 'Present'
                              ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                              : log.status === 'Late'
                                ? 'bg-orange-50 text-orange-600 border-orange-100'
                                : 'bg-red-50 text-red-600 border-red-100',
                          )}
                        >
                          {log.statusBn}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Legend & Notice */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-orange-500" />{' '}
              গুরুত্বপূর্ণ নোট
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                <p className="text-xs text-blue-800 leading-relaxed">
                  সকাল <b>১০:১৫</b> এর পর প্রবেশ করলে সেটি{' '}
                  <b>বিলম্বিত (Late)</b> হিসেবে গণ্য করা হবে।
                </p>
              </div>
              <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
                <p className="text-xs text-red-800 leading-relaxed">
                  টানা ৩ দিন অনুপস্থিত থাকলে অভিভাবককে অবশ্যই স্কুল কর্তৃপক্ষের
                  সাথে যোগাযোগ করতে হবে।
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 rounded-2xl text-white shadow-lg shadow-emerald-200">
            <h4 className="font-bold mb-2">ছুটির আবেদন?</h4>
            <p className="text-xs text-emerald-50 leading-relaxed mb-4">
              আপনার সন্তান যদি ভবিষ্যতে স্কুলে আসতে না পারে, তবে অগ্রিম ছুটির
              আবেদন করুন।
            </p>
            <button className="w-full py-2.5 bg-white text-emerald-700 rounded-xl text-xs font-bold hover:bg-emerald-50 transition-colors">
              আবেদন ফর্ম পূরণ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

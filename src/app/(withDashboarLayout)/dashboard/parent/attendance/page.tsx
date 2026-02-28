'use client';

import { useState } from 'react';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  Info,
  AlertTriangle,
} from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ');

export default function AttendancePage() {
  const [currentMonth] = useState('ফেব্রুয়ারি ২০২৬');

  const attendanceSummary = [
    { label: 'মোট কার্যদিবস', value: '১৮', icon: CalendarIcon },
    { label: 'উপস্থিত', value: '১৬', icon: CheckCircle2 },
    { label: 'অনুপস্থিত', value: '০২', icon: XCircle },
    { label: 'গড় উপস্থিতির হার', value: '৮৯%', icon: Clock },
  ];

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
      date: '১১ ফেব, ২০২৬',
      day: 'বুধবার',
      entry: '১০:২০ AM',
      exit: '০৪:১০ PM',
      status: 'Late',
      statusBn: 'বিলম্বিত',
    },
  ];

  return (
    <div className="space-y-8 bg-bg-page min-h-screen p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            উপস্থিতি রিপোর্ট
          </h1>
          <p className="text-sm text-text-muted mt-1">
            সন্তানের প্রতিদিনের উপস্থিতির বিস্তারিত তথ্য দেখুন
          </p>
        </div>

        <div className="flex items-center gap-3 bg-bg-card p-2 rounded-lg border border-border-light">
          <button className="p-1.5 rounded-md hover:bg-primary/5">
            <ChevronLeft size={18} />
          </button>
          <span className="text-sm font-semibold text-text-primary px-4">
            {currentMonth}
          </span>
          <button className="p-1.5 rounded-md hover:bg-primary/5">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {attendanceSummary.map((item, idx) => (
          <div
            key={idx}
            className="bg-bg-card p-5 rounded-xl border border-border-light"
          >
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <item.icon size={18} className="text-primary" />
            </div>
            <p className="text-xs text-text-muted uppercase tracking-wide">
              {item.label}
            </p>
            <p className="text-xl font-bold text-text-primary mt-1">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Table */}
        <div className="lg:col-span-2 bg-bg-card rounded-xl border border-border-light overflow-hidden">
          <div className="p-6 border-b border-border-light flex justify-between items-center">
            <h3 className="font-semibold text-text-primary">দৈনিক হাজিরা লগ</h3>
            <button className="text-xs font-semibold text-primary flex items-center gap-1">
              <Info size={14} /> নিয়মাবলী
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border-light">
                <tr>
                  <th className="px-6 py-4 text-left text-xs text-text-muted uppercase">
                    তারিখ
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-text-muted uppercase">
                    প্রবেশ
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-text-muted uppercase">
                    প্রস্থান
                  </th>
                  <th className="px-6 py-4 text-left text-xs text-text-muted uppercase">
                    স্ট্যাটাস
                  </th>
                </tr>
              </thead>

              <tbody>
                {attendanceLog.map((log, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border-light hover:bg-primary/5 transition"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-text-primary">
                        {log.date}
                      </p>
                      <p className="text-xs text-text-muted">{log.day}</p>
                    </td>

                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {log.entry}
                    </td>

                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {log.exit}
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-[10px] font-semibold rounded-full bg-primary/10 text-primary">
                        {log.statusBn}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Notice */}
        <div className="space-y-6">
          <div className="bg-bg-card p-6 rounded-xl border border-border-light">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
              <AlertTriangle size={18} className="text-primary" />
              গুরুত্বপূর্ণ নোট
            </h3>

            <div className="space-y-3 text-xs text-text-secondary leading-relaxed">
              <p>
                সকাল <b>১০:১৫</b> এর পর প্রবেশ করলে সেটি <b>বিলম্বিত (Late)</b>{' '}
                হিসেবে গণ্য করা হবে।
              </p>

              <p>
                টানা ৩ দিন অনুপস্থিত থাকলে অভিভাবককে অবশ্যই স্কুল কর্তৃপক্ষের
                সাথে যোগাযোগ করতে হবে।
              </p>
            </div>
          </div>

          <div className="bg-primary/10 p-6 rounded-xl border border-border-light">
            <h4 className="font-semibold text-text-primary mb-2">
              ছুটির আবেদন?
            </h4>
            <p className="text-xs text-text-secondary mb-4">
              ভবিষ্যতে অনুপস্থিত থাকলে অগ্রিম ছুটির আবেদন করুন।
            </p>
            <button className="w-full py-2.5 bg-primary text-white rounded-lg text-xs font-semibold hover:opacity-90 transition">
              আবেদন ফর্ম পূরণ করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

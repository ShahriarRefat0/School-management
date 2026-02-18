'use client';
import { useState } from 'react';
import {
  CreditCard,
  Receipt,
  History,
  AlertCircle,
  Download,
  CheckCircle2,
  Clock,
  ArrowRight,
  Wallet,
  FileText,
} from 'lucide-react';

// Simple className merger
const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ');

export default function FeesStatusPage() {
  // ডামি ডাটা: পেমেন্ট হিস্ট্রি
  const paymentHistory = [
    {
      id: 'INV-8821',
      month: 'জানুয়ারি ২০২৬',
      date: '১০ জানু, ২০২৬',
      amount: '৳ ৩,৫০০',
      method: 'Bkash',
      status: 'Paid',
      statusBn: 'পরিশোধিত',
    },
    {
      id: 'INV-7542',
      month: 'ডিসেম্বর ২০২৫',
      date: '১২ ডিসে, ২০২৫',
      amount: '৳ ৩,৫০০',
      method: 'Nagad',
      status: 'Paid',
      statusBn: 'পরিশোধিত',
    },
    {
      id: 'INV-6210',
      month: 'নভেম্বর ২০২৫',
      date: '০৫ নভে, ২০২৫',
      amount: '৳ ৪,২০০',
      method: 'Bank',
      status: 'Paid',
      statusBn: 'পরিশোধিত',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">ফিস এবং পেমেন্ট</h1>
        <p className="text-sm text-slate-500 mt-1">
          আপনার সন্তানের স্কুলের বেতন এবং অন্যান্য ফি-এর বিবরণ
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Summary & Payment Card */}
        <div className="lg:col-span-1 space-y-6">
          {/* Outstanding Balance Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group">
            {/* Decorative Light Effect */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-10">
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/5">
                  <Wallet size={24} className="text-emerald-400" />
                </div>
                <span className="text-[10px] font-bold bg-red-500 text-white px-2 py-1 rounded-md uppercase tracking-wider animate-pulse">
                  Unpaid
                </span>
              </div>

              {/* টেক্সট সাদা (White) করার জন্য text-white ব্যবহার করা হয়েছে */}
              <p className="text-slate-300 text-sm font-medium">
                বকেয়া পরিমাণ (ফেব্রুয়ারি)
              </p>
              <h2 className="text-4xl font-bold mt-2 text-white">৳ ৩,৫০০</h2>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <p className="text-xs text-slate-300">
                  শেষ তারিখ: ২০ ফেব, ২০২৬
                </p>
                <button className="flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors group/btn">
                  এখনই পরিশোধ করুন
                  <ArrowRight
                    size={16}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm mb-4">
              ফি সামারি - ২০২৬
            </h3>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">মোট পরিশোধিত</span>
              <span className="font-bold text-emerald-600">৳ ৭,০০০</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">মোট বকেয়া</span>
              <span className="font-bold text-red-600">৳ ৩,৫০০</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-emerald-500 w-[66%] rounded-full" />
            </div>
            <p className="text-[10px] text-slate-400 text-center italic">
              আপনি এই বছরের ৬৬% ফি পরিশোধ করেছেন
            </p>
          </div>
        </div>

        {/* Right Side: Payment History Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="text-slate-400" size={20} />
                <h3 className="font-bold text-slate-900">পেমেন্ট হিস্ট্রি</h3>
              </div>
              <button className="text-xs font-bold text-slate-500 hover:text-emerald-600 flex items-center gap-1 transition-colors">
                <FileText size={14} /> সব ডাউনলোড করুন
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      ইনভয়েস
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      মাস ও তারিখ
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      পরিমাণ
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      স্ট্যাটাস
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">
                      অ্যাকশন
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paymentHistory.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/50 transition-all group"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-800">
                          {item.id}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {item.method} এর মাধ্যমে
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-700">
                          {item.month}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {item.date}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-900">
                          {item.amount}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-emerald-600">
                          <CheckCircle2 size={14} />
                          <span className="text-xs font-bold">
                            {item.statusBn}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all">
                          <Download size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center">
              <button className="text-xs font-bold text-emerald-700 hover:underline">
                পুরানো সব রেকর্ড দেখুন
              </button>
            </div>
          </div>

          {/* Help Notice */}
          <div className="mt-6 flex items-start gap-4 p-4 bg-orange-50 border border-orange-100 rounded-2xl">
            <AlertCircle className="text-orange-500 shrink-0" size={20} />
            <div>
              <p className="text-sm font-bold text-orange-800">
                পেমেন্ট সংক্রান্ত সমস্যা?
              </p>
              <p className="text-xs text-orange-700/80 leading-relaxed mt-1">
                যদি আপনার পেমেন্ট সফল হওয়ার পরও এখানে আপডেট না হয়, তবে অনুগ্রহ
                করে ট্রানজেকশন আইডি সহ অ্যাকাউন্টস বিভাগে যোগাযোগ করুন।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

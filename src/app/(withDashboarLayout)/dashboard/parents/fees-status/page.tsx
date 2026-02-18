'use client';

import {
  Wallet,
  ArrowRight,
  History,
  CheckCircle2,
  Download,
  AlertCircle,
  FileText,
} from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ');

export default function FeesStatusPage() {
  const paymentHistory = [
    {
      id: 'INV-8821',
      month: 'জানুয়ারি ২০২৬',
      date: '১০ জানু, ২০২৬',
      amount: '৳ ৩,৫০০',
      method: 'Bkash',
      statusBn: 'পরিশোধিত',
    },
    {
      id: 'INV-7542',
      month: 'ডিসেম্বর ২০২৫',
      date: '১২ ডিসে, ২০২৫',
      amount: '৳ ৩,৫০০',
      method: 'Nagad',
      statusBn: 'পরিশোধিত',
    },
    {
      id: 'INV-6210',
      month: 'নভেম্বর ২০২৫',
      date: '০৫ নভে, ২০২৫',
      amount: '৳ ৪,২০০',
      method: 'Bank',
      statusBn: 'পরিশোধিত',
    },
  ];

  return (
    <div className="space-y-8 bg-bg-page min-h-screen p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">
          ফিস এবং পেমেন্ট
        </h1>
        <p className="text-sm text-text-muted mt-1">
          সন্তানের বেতন এবং অন্যান্য ফি-এর বিবরণ
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side */}
        <div className="space-y-6">
          {/* Outstanding Card */}
          <div className="bg-bg-card border border-border-light rounded-xl p-6">
            <div className="flex justify-between items-start mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wallet size={20} className="text-primary" />
              </div>

              <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary uppercase">
                Unpaid
              </span>
            </div>

            <p className="text-sm text-text-muted">বকেয়া পরিমাণ (ফেব্রুয়ারি)</p>
            <h2 className="text-3xl font-bold text-text-primary mt-2">
              ৳ ৩,৫০০
            </h2>

            <div className="mt-6 pt-6 border-t border-border-light flex justify-between items-center">
              <p className="text-xs text-text-muted">শেষ তারিখ: ২০ ফেব, ২০২৬</p>

              <button className="flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition">
                এখনই পরিশোধ করুন
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-bg-card border border-border-light rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-text-primary text-sm">
              ফি সামারি - ২০২৬
            </h3>

            <div className="flex justify-between text-sm">
              <span className="text-text-muted">মোট পরিশোধিত</span>
              <span className="font-semibold text-text-primary">৳ ৭,০০০</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-text-muted">মোট বকেয়া</span>
              <span className="font-semibold text-text-primary">৳ ৩,৫০০</span>
            </div>

            <div className="h-2 bg-primary/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-[66%]" />
            </div>

            <p className="text-[10px] text-text-muted text-center">
              আপনি এই বছরের ৬৬% ফি পরিশোধ করেছেন
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Table */}
          <div className="bg-bg-card border border-border-light rounded-xl overflow-hidden">
            <div className="p-6 border-b border-border-light flex justify-between items-center">
              <div className="flex items-center gap-2">
                <History size={18} className="text-primary" />
                <h3 className="font-semibold text-text-primary">
                  পেমেন্ট হিস্ট্রি
                </h3>
              </div>

              <button className="text-xs font-semibold text-primary flex items-center gap-1">
                <FileText size={14} /> সব ডাউনলোড
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border-light">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs text-text-muted uppercase">
                      ইনভয়েস
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-text-muted uppercase">
                      মাস ও তারিখ
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-text-muted uppercase">
                      পরিমাণ
                    </th>
                    <th className="px-6 py-4 text-left text-xs text-text-muted uppercase">
                      স্ট্যাটাস
                    </th>
                    <th className="px-6 py-4 text-right text-xs text-text-muted uppercase">
                      অ্যাকশন
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paymentHistory.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-border-light hover:bg-primary/5 transition"
                    >
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-text-primary">
                          {item.id}
                        </p>
                        <p className="text-xs text-text-muted">{item.method}</p>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm text-text-secondary">
                          {item.month}
                        </p>
                        <p className="text-xs text-text-muted">{item.date}</p>
                      </td>

                      <td className="px-6 py-4 font-semibold text-text-primary">
                        {item.amount}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-primary">
                          <CheckCircle2 size={14} />
                          <span className="text-xs font-semibold">
                            {item.statusBn}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button className="p-2 rounded-md hover:bg-primary/10 transition">
                          <Download size={16} className="text-primary" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-border-light text-center">
              <button className="text-xs font-semibold text-primary">
                পুরানো সব রেকর্ড দেখুন
              </button>
            </div>
          </div>

          {/* Help Notice */}
          <div className="flex items-start gap-4 p-4 bg-primary/10 border border-border-light rounded-xl">
            <AlertCircle size={18} className="text-primary shrink-0" />
            <div>
              <p className="text-sm font-semibold text-text-primary">
                পেমেন্ট সংক্রান্ত সমস্যা?
              </p>
              <p className="text-xs text-text-secondary mt-1">
                পেমেন্ট সফল হওয়ার পরও আপডেট না হলে ট্রানজেকশন আইডি সহ
                অ্যাকাউন্টস বিভাগে যোগাযোগ করুন।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';
import { History, Download, CreditCard } from 'lucide-react';

export default function FeesPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-text-primary">বেতন ও ফি মনিটর</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* বকেয়া কার্ড (এটি প্রাইমারি কালারেই থাকবে যা ডার্ক/লাইট উভয় মোডে ভালো দেখায়) */}
        <div className="bg-primary text-white p-6 rounded-2xl shadow-lg relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="absolute right-[-10px] top-[-10px] opacity-20">
            <CreditCard size={120} />
          </div>
          <p className="text-xs opacity-80 uppercase tracking-widest font-bold">
            মোট বকেয়া ফি
          </p>
          <h2 className="text-3xl font-bold mt-2 font-mono">৳ ৩,৫০০</h2>
          <p className="text-[10px] mt-4 opacity-70">
            শেষ তারিখ: ২০ মার্চ, ২০২৬
          </p>
          <button className="mt-6 w-full py-3 bg-white text-primary rounded-xl font-bold text-sm hover:bg-opacity-90 transition-all active:scale-95">
            এখনই পরিশোধ করুন
          </button>
        </div>

        {/* পেমেন্ট হিস্ট্রি টেবিল */}
        <div className="md:col-span-2 bg-bg-card rounded-2xl border border-border-light overflow-hidden flex flex-col shadow-sm transition-colors duration-300">
          <div className="p-4 border-b border-border-light flex items-center justify-between">
            <h3 className="font-bold text-sm flex items-center gap-2 text-text-primary">
              <History size={18} className="text-primary" /> পেমেন্ট হিস্ট্রি
            </h3>
            <button className="text-xs font-bold text-primary flex items-center gap-1 hover:underline decoration-2 underline-offset-4">
              <Download size={14} /> সব ডাউনলোড
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-bg-page/50 text-text-muted">
                <tr>
                  <th className="p-4 font-semibold uppercase tracking-wider text-[10px]">
                    মাস
                  </th>
                  <th className="p-4 font-semibold uppercase tracking-wider text-[10px]">
                    বিবরণ
                  </th>
                  <th className="p-4 font-semibold uppercase tracking-wider text-[10px]">
                    পরিমাণ
                  </th>
                  <th className="p-4 font-semibold uppercase tracking-wider text-[10px]">
                    স্ট্যাটাস
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="p-4 font-semibold text-text-secondary">
                    জানুয়ারি
                  </td>
                  <td className="p-4 text-xs text-text-muted">
                    মাসিক বেতন + পরীক্ষা ফি
                  </td>
                  <td className="p-4 font-bold text-text-primary">৳ ৪,২০০</td>
                  <td className="p-4">
                    <span className="text-green-500 font-bold bg-green-500/10 px-3 py-1 rounded-full text-[11px] border border-green-500/20">
                      পরিশোধিত
                    </span>
                  </td>
                </tr>
                {/* আরেকটি উদাহরণ রো (বোঝার সুবিধার জন্য) */}
                <tr className="hover:bg-primary/5 transition-colors">
                  <td className="p-4 font-semibold text-text-secondary">
                    ফেব্রুয়ারি
                  </td>
                  <td className="p-4 text-xs text-text-muted">মাসিক বেতন</td>
                  <td className="p-4 font-bold text-text-primary">৳ ৩,০০০</td>
                  <td className="p-4">
                    <span className="text-amber-500 font-bold bg-amber-500/10 px-3 py-1 rounded-full text-[11px] border border-amber-500/20">
                      প্রক্রিয়াধীন
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

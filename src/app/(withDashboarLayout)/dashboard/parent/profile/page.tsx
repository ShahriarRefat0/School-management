'use client';
import { User, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

export default function ParentProfile() {
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <div className="bg-bg-card rounded-2xl border border-border-light overflow-hidden shadow-sm">
        <div className="h-32 bg-primary/10 flex items-end justify-center pb-4">
          <div className="w-24 h-24 rounded-2xl bg-white border-4 border-white shadow-xl flex items-center justify-center text-3xl font-bold text-primary">
            RA
          </div>
        </div>

        <div className="p-8 text-center border-b border-border-light">
          <h2 className="text-2xl font-bold text-text-primary">রহিম আহমেদ</h2>
          <p className="text-sm text-text-muted flex items-center justify-center gap-2 mt-1">
            <ShieldCheck size={14} className="text-green-600" /> ভেরিফাইড
            অভিভাবক (#P88210)
          </p>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { label: 'ফোন নম্বর', value: '+৮৮০ ১৭১২-৩৪৫৬৭৮', icon: Phone },
            { label: 'ইমেইল', value: 'rahim@mail.com', icon: Mail },
            { label: 'ঠিকানা', value: 'ধানমন্ডি, ঢাকা-১২০৯', icon: MapPin },
            {
              label: 'জাতীয় পরিচয়পত্র',
              value: '৮৮২৪ ***** ২১০',
              icon: ShieldCheck,
            },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="text-primary mt-1">
                <item.icon size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-text-muted tracking-widest">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-text-primary mt-1">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[10px] text-center text-text-muted italic">
        তথ্য পরিবর্তনের প্রয়োজন হলে স্কুল অ্যাডমিনের সাথে যোগাযোগ করুন।
      </p>
    </div>
  );
}

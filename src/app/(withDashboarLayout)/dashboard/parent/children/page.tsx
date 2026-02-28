'use client';
import { User, ChevronRight, GraduationCap, CalendarCheck } from 'lucide-react';
import Link from 'next/link';

// সব তথ্য এখানেই থাকবে (Single Source of Truth)
export const childrenData = [
  {
    id: 'ST8821',
    name: 'সাকিব আহমেদ',
    class: '৮ম',
    section: 'ক',
    roll: '০৫',
    gpa: '৪.৮৫',
    attendance: '৯৪%',
    dob: '১২ জানুয়ারি, ২০১২',
    bloodGroup: 'B+',
    guardian: 'রহিম আহমেদ',
    contact: '+৮৮০ ১৭১২-৩৪৫৬৭৮',
    address: 'রোড-০৭, ধানমন্ডি, ঢাকা',
  },
  {
    id: 'ST9942',
    name: 'সাবিহা আক্তার',
    class: '৫ম',
    section: 'খ',
    roll: '১২',
    gpa: '৪.৫০',
    attendance: '৯৮%',
    dob: '০৫ মার্চ, ২০১৫',
    bloodGroup: 'A+',
    guardian: 'রহিম আহমেদ',
    contact: '+৮৮০ ১৭১২-৩৪৫৬৭৯',
    address: 'রোড-০৭, ধানমন্ডি, ঢাকা',
  },
];

export default function ChildrenListPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-text-primary">
          সন্তান নির্বাচন করুন
        </h1>
        <p className="text-sm text-text-muted">
          যে শিক্ষার্থীর প্রোফাইল দেখতে চান তাকে সিলেক্ট করুন
        </p>
      </div>

      <div className="grid gap-6">
        {childrenData.map((child) => (
          <Link
            href={`/dashboard/parent/children/${child.id}`}
            key={child.id}
            className="bg-bg-card p-6 rounded-2xl border border-border-light flex items-center justify-between hover:border-primary hover:shadow-xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
          >
            <div className="flex items-center gap-5 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:scale-110 transition-transform">
                <User size={32} />
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-xl group-hover:text-primary transition-colors">
                  {child.name}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-bg-page text-text-muted border border-border-light">
                    শ্রেণি: {child.class}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-bg-page text-text-muted border border-border-light">
                    রোল: {child.roll}
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden md:flex gap-10 items-center relative z-10">
              <div className="text-center">
                <p className="text-[10px] text-text-muted uppercase font-black tracking-widest mb-1">
                  GPA
                </p>
                <div className="flex items-center gap-1 text-primary">
                  <GraduationCap size={16} />
                  <span className="font-black text-lg">{child.gpa}</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-text-muted uppercase font-black tracking-widest mb-1">
                  উপস্থিতি
                </p>
                <div className="flex items-center gap-1 text-text-primary">
                  <CalendarCheck size={16} className="text-green-500" />
                  <span className="font-black text-lg">{child.attendance}</span>
                </div>
              </div>
              <div className="p-3 bg-bg-page rounded-xl text-text-muted group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                <ChevronRight size={24} />
              </div>
            </div>
            <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </div>
  );
}

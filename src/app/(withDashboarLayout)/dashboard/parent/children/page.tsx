'use client';
import { User, ChevronRight, GraduationCap, CalendarCheck } from 'lucide-react';
import Link from 'next/link';

// Single Source of Truth for Student Data
export const childrenData = [
  {
    id: 'ST8821',
    name: 'Sakib Ahmed',
    class: '8th',
    section: 'A',
    roll: '05',
    gpa: '4.85',
    attendance: '94%',
    dob: '12 January, 2012',
    bloodGroup: 'B+',
    guardian: 'Rahim Ahmed',
    contact: '+880 1712-345678',
    address: 'Road-07, Dhanmondi, Dhaka',
  },
  {
    id: 'ST9942',
    name: 'Sabiha Akter',
    class: '5th',
    section: 'B',
    roll: '12',
    gpa: '4.50',
    attendance: '98%',
    dob: '05 March, 2015',
    bloodGroup: 'A+',
    guardian: 'Rahim Ahmed',
    contact: '+880 1712-345679',
    address: 'Road-07, Dhanmondi, Dhaka',
  },
];

// Simple className merger
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// Card Component
const Card = ({
  children,
  className = "",
  style = {}
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={cn(
      "bg-bg-card rounded-2xl border border-border-light shadow-sm hover:shadow-xl hover:border-blue-200/60 transition-all duration-500",
      className
    )}
    style={style}
  >
    {children}
  </div>
);

export default function ChildrenListPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-10 animate-fadeIn">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold text-text-primary tracking-tight">
          Select Student
        </h1>
        <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed">
          Please select the student whose profile and progress you want to view
        </p>
      </div>

      <div className="grid gap-6">
        {childrenData.map((child, idx) => (
          <Link
            href={`/dashboard/parent/children/${child.id}`}
            key={child.id}
            className="group block animate-fadeInSlide"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <Card className="p-6 flex items-center justify-between group-hover:bg-bg-page/40 dark:group-hover:bg-slate-800/40 relative overflow-hidden transition-all duration-500">
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500/10 to-indigo-500/10 flex items-center justify-center text-blue-500 border border-blue-500/10 group-hover:scale-110 transition-transform duration-500">
                  <User size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary text-xl group-hover:text-blue-600 transition-colors">
                    {child.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-bg-page text-text-muted border border-border-light uppercase tracking-widest leading-none shadow-sm">
                      Class: {child.class}
                    </span>
                    <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-bg-page text-text-muted border border-border-light uppercase tracking-widest leading-none shadow-sm">
                      Roll: {child.roll}
                    </span>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex gap-12 items-center relative z-10">
                <div className="text-center">
                  <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest mb-1">
                    Current GPA
                  </p>
                  <div className="flex items-center justify-center gap-1.5 text-blue-600">
                    <GraduationCap size={18} />
                    <span className="font-bold text-xl">{child.gpa}</span>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest mb-1">
                    Attendance
                  </p>
                  <div className="flex items-center justify-center gap-1.5 text-emerald-600">
                    <CalendarCheck size={18} />
                    <span className="font-bold text-xl">{child.attendance}</span>
                  </div>
                </div>

                <div className="p-3 bg-bg-page rounded-xl text-text-muted group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-12 transition-all duration-300 shadow-sm border border-border-light">
                  <ChevronRight size={24} />
                </div>
              </div>

              {/* Decorative background element */}
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

'use client';
import { FileText, Download, Mail, PieChart } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    {
      name: 'উপস্থিতি সামারি (ফেব্রুয়ারি)',
      date: '২৮ ফেব, ২০২৬',
      type: 'Attendance',
    },
    { name: 'ফলাফল কার্ড (Term 1)', date: '১৫ ফেব, ২০২৬', type: 'Academic' },
    { name: 'বার্ষিক ফি স্টেটমেন্ট', date: '০১ জানু, ২০২৬', type: 'Finance' },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">একাডেমিক ও আর্থিক রিপোর্ট</h1>
      <div className="grid gap-3">
        {reports.map((report, i) => (
          <div
            key={i}
            className="bg-bg-card p-4 rounded-xl border border-border-light flex items-center justify-between hover:bg-primary/5 transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <FileText size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-text-primary">
                  {report.name}
                </h4>
                <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">
                  {report.type} · {report.date}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="p-2 hover:bg-primary/10 rounded-lg text-primary transition"
                title="Email Copy"
              >
                <Mail size={18} />
              </button>
              <button
                className="p-2 hover:bg-primary/10 rounded-lg text-primary transition"
                title="Download PDF"
              >
                <Download size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

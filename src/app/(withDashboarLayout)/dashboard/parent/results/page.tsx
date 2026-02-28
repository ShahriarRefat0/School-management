'use client';
import { Download, FileText, Star } from 'lucide-react';

export default function ResultsPage() {
  const examResults = [
    { subject: 'বাংলা', marks: 88, grade: 'A+', point: '5.00' },
    { subject: 'ইংরেজি', marks: 92, grade: 'A+', point: '5.00' },
    { subject: 'গণিত', marks: 95, grade: 'A+', point: '5.00' },
    { subject: 'বিজ্ঞান', marks: 78, grade: 'A', point: '4.00' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">একাডেমিক রেজাল্ট</h1>
          <p className="text-sm text-text-muted">প্রথম সাময়িক পরীক্ষা - ২০২৬</p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md">
          <Download size={16} /> মার্কশিট (PDF)
        </button>
      </div>

      <div className="bg-bg-card rounded-xl border border-border-light overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-bg-page border-b border-border-light">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase text-text-muted">
                বিষয়
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-text-muted">
                প্রাপ্ত নম্বর
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-text-muted text-center">
                গ্রেড
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-text-muted text-center">
                পয়েন্ট
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {examResults.map((r, i) => (
              <tr key={i} className="hover:bg-primary/5 transition">
                <td className="px-6 py-4 text-sm font-semibold text-text-primary">
                  {r.subject}
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {r.marks}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                    {r.grade}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-center font-medium text-text-primary">
                  {r.point}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex items-center gap-3">
        <Star className="text-primary" size={20} />
        <p className="text-sm font-bold text-text-primary">
          সর্বমোট ফলাফল:{' '}
          <span className="text-primary italic font-black">GPA 4.85 (A+)</span>
        </p>
      </div>
    </div>
  );
}

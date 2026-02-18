'use client';
import { useState } from 'react';
import {
  Mail,
  User,
  Send,
  Info,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';

// টিচার ডেটাবেস (JSON ফরম্যাট)
const teacherData = [
  {
    id: 1,
    name: 'মাহমুদুর রহমান',
    role: 'শ্রেণি শিক্ষক (গণিত)',
    email: 'mahmud.math@school.edu',
  },
  {
    id: 2,
    name: 'ফারজানা হক',
    role: 'ইংরেজি শিক্ষিকা',
    email: 'farzana.eng@school.edu',
  },
  {
    id: 3,
    name: 'আব্দুল করিম',
    role: 'বিজ্ঞান শিক্ষক',
    email: 'karim.science@school.edu',
  },
  {
    id: 4,
    name: 'মোছাঃ নাসরিন',
    role: 'বাংলা শিক্ষিকা',
    email: 'nasrin.bangla@school.edu',
  },
];

export default function ContactTeacherPage() {
  const [selectedTeacher, setSelectedTeacher] = useState(teacherData[0]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // এখানে আপনার মেইল পাঠানোর লজিক (API Call) থাকবে
    console.log(`Sending to: ${selectedTeacher.email}`, { subject, message });

    // ডামি সাকসেস মেসেজ
    setTimeout(() => {
      setStatus('success');
      setSubject('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail size={32} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">
          শিক্ষককে ইমেইল পাঠান
        </h1>
        <p className="text-slate-500">
          নিচ থেকে শিক্ষক নির্বাচন করুন এবং আপনার বার্তাটি লিখুন
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: Instructions */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
              <Info size={18} className="text-blue-500" /> নিয়মাবলী
            </h3>
            <ul className="space-y-3">
              {[
                'শিক্ষক সাধারণত ২-৩ কার্যদিবসের মধ্যে উত্তর দিয়ে থাকেন।',
                'জরুরি প্রয়োজনে স্কুল অফিসে সরাসরি ফোন করুন।',
                'বার্তায় শিক্ষার্থীর নাম এবং রোল নম্বর উল্লেখ করুন।',
              ].map((text, i) => (
                <li
                  key={i}
                  className="text-xs text-slate-600 leading-relaxed flex gap-2"
                >
                  <div className="w-1 h-1 bg-slate-300 rounded-full mt-1.5 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-emerald-600 p-6 rounded-2xl text-white shadow-lg">
            <p className="text-xs font-bold opacity-80 uppercase mb-2">
              নির্বাচিত শিক্ষক
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center font-bold">
                {selectedTeacher.name[0]}
              </div>
              <div>
                <p className="font-bold text-sm">{selectedTeacher.name}</p>
                <p className="text-[10px] text-emerald-100">
                  {selectedTeacher.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Email Form */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6 relative overflow-hidden"
          >
            {status === 'success' && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-6 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  ইমেইল পাঠানো হয়েছে!
                </h3>
                <p className="text-sm text-slate-500 mt-2">
                  আপনার বার্তাটি সফলভাবে {selectedTeacher.name}-এর কাছে পৌঁছেছে।
                </p>
              </div>
            )}

            {/* Teacher Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                শিক্ষক নির্বাচন করুন
              </label>
              <div className="relative">
                <select
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer"
                  onChange={(e) =>
                    setSelectedTeacher(
                      teacherData.find((t) => t.id === Number(e.target.value))!,
                    )
                  }
                >
                  {teacherData.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} — ({t.role})
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={18}
                />
              </div>
            </div>

            {/* Subject Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                বিষয় (Subject)
              </label>
              <input
                required
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="ইমেইলের বিষয় লিখুন..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
              />
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                আপনার বার্তা
              </label>
              <textarea
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="আপনার বিস্তারিত বার্তা এখানে লিখুন..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-emerald-200 hover:shadow-emerald-300 hover:scale-[1.01] transition-all disabled:opacity-70"
            >
              {status === 'sending' ? (
                'পাঠানো হচ্ছে...'
              ) : (
                <>
                  মেসেজ পাঠান <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

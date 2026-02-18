'use client';

import { useState } from 'react';
import { Mail, Send, Info, CheckCircle2, ChevronDown } from 'lucide-react';

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

    setTimeout(() => {
      setStatus('success');
      setSubject('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 2500);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 bg-bg-page min-h-screen p-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-3">
          <Mail size={26} />
        </div>
        <h1 className="text-2xl font-bold text-text-primary">
          শিক্ষককে ইমেইল পাঠান
        </h1>
        <p className="text-text-muted text-sm">
          শিক্ষক নির্বাচন করে আপনার বার্তা পাঠান
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left */}
        <div className="space-y-6">
          <div className="bg-bg-card p-6 rounded-xl border border-border-light">
            <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
              <Info size={16} className="text-primary" />
              নিয়মাবলী
            </h3>

            <ul className="space-y-3 text-xs text-text-secondary">
              <li>শিক্ষক সাধারণত ২-৩ কার্যদিবসে উত্তর দেন।</li>
              <li>জরুরি হলে স্কুল অফিসে ফোন করুন।</li>
              <li>শিক্ষার্থীর নাম ও রোল উল্লেখ করুন।</li>
            </ul>
          </div>

          <div className="bg-primary/10 p-6 rounded-xl border border-border-light">
            <p className="text-xs font-semibold text-text-muted uppercase mb-2">
              নির্বাচিত শিক্ষক
            </p>

            <p className="text-sm font-semibold text-text-primary">
              {selectedTeacher.name}
            </p>
            <p className="text-xs text-text-muted">{selectedTeacher.email}</p>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-bg-card p-8 rounded-xl border border-border-light space-y-6 relative"
          >
            {status === 'success' && (
              <div className="absolute inset-0 bg-bg-card/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={30} />
                </div>
                <h3 className="text-lg font-semibold text-text-primary">
                  ইমেইল পাঠানো হয়েছে!
                </h3>
                <p className="text-sm text-text-muted mt-2">
                  বার্তাটি সফলভাবে পাঠানো হয়েছে।
                </p>
              </div>
            )}

            {/* Teacher Select */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-muted uppercase">
                শিক্ষক নির্বাচন
              </label>

              <div className="relative">
                <select
                  className="w-full bg-bg-page border border-border-light rounded-lg px-4 py-3 text-sm outline-none focus:border-primary appearance-none"
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-muted uppercase">
                বিষয়
              </label>

              <input
                required
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="ইমেইলের বিষয় লিখুন..."
                className="w-full bg-bg-page border border-border-light rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-muted uppercase">
                বার্তা
              </label>

              <textarea
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="আপনার বার্তা লিখুন..."
                className="w-full bg-bg-page border border-border-light rounded-lg px-4 py-4 text-sm outline-none focus:border-primary resize-none"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition hover:opacity-90 disabled:opacity-70"
            >
              {status === 'sending' ? (
                'পাঠানো হচ্ছে...'
              ) : (
                <>
                  মেসেজ পাঠান <Send size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

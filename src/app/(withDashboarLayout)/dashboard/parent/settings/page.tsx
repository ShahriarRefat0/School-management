'use client';
import { User, Lock, Save, ShieldCheck } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">
          সেটিংস ও নিরাপত্তা
        </h1>
        <p className="text-sm text-text-muted mt-1">
          আপনার ব্যক্তিগত তথ্য এবং অ্যাকাউন্টের নিরাপত্তা পরিচালনা করুন।
        </p>
      </div>

      <div className="grid gap-6">
        {/* Profile Name Change Section */}
        <div className="bg-bg-card p-6 rounded-2xl border border-border-light shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-border-light pb-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <User size={20} />
            </div>
            <h3 className="font-bold text-text-primary">ব্যক্তিগত তথ্য</h3>
          </div>

          <div className="space-y-4">
            <div className="grid gap-2">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                আপনার নাম
              </label>
              <input
                type="text"
                defaultValue="রহিম আহমেদ"
                placeholder="নাম লিখুন"
                className="w-full bg-bg-page border border-border-light text-text-primary rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                ইমেইল ঠিকানা (পরিবর্তনযোগ্য নয়)
              </label>
              <input
                type="email"
                disabled
                defaultValue="rahim@mail.com"
                className="w-full bg-bg-page/50 border border-border-light text-text-muted rounded-xl px-4 py-3 text-sm cursor-not-allowed"
              />
            </div>
            <button className="flex items-center justify-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
              <Save size={16} /> নাম আপডেট করুন
            </button>
          </div>
        </div>

        {/* Password Change Section */}
        <div className="bg-bg-card p-6 rounded-2xl border border-border-light shadow-sm space-y-6">
          <div className="flex items-center gap-2 border-b border-border-light pb-4">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Lock size={20} />
            </div>
            <h3 className="font-bold text-text-primary">পাসওয়ার্ড পরিবর্তন</h3>
          </div>

          <div className="space-y-4">
            <div className="grid gap-2">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                বর্তমান পাসওয়ার্ড
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-bg-page border border-border-light text-text-primary rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  নতুন পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  placeholder="নতুন পাসওয়ার্ড দিন"
                  className="w-full bg-bg-page border border-border-light text-text-primary rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                  পুনরায় নতুন পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  placeholder="আবারও লিখুন"
                  className="w-full bg-bg-page border border-border-light text-text-primary rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>
            <button className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2">
              <ShieldCheck size={18} /> নিরাপত্তা আপডেট করুন
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl">
        <p className="text-[11px] text-text-muted text-center italic">
          নিরাপত্তার স্বার্থে, পাসওয়ার্ড পরিবর্তনের পর আপনাকে পুনরায় লগইন করতে
          হতে পারে।
        </p>
      </div>
    </div>
  );
}






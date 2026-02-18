'use client';
import { useState } from 'react';
import {
  User,
  Lock,
  Camera,
  ShieldCheck,
  Smartphone,
  Save,
} from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ');

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">সেটিংস</h1>
        <p className="text-sm text-slate-500 mt-1">
          আপনার প্রোফাইল এবং সিকিউরিটি সেটিংস আপডেট করুন
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {[
            { id: 'profile', label: 'প্রোফাইল', icon: User },
            { id: 'security', label: 'সিকিউরিটি', icon: Lock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap',
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                  : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700',
              )}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Settings Content Area */}
        <div className="flex-1 space-y-6">
          {/* --- Profile Tab Content --- */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="font-bold text-slate-900">ব্যক্তিগত তথ্য</h3>
                <button className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-lg hover:bg-emerald-100 transition-all shadow-sm">
                  <Save size={14} /> সেভ করুন
                </button>
              </div>
              <div className="p-8 space-y-8">
                {/* Avatar Section */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-3xl bg-emerald-100 flex items-center justify-center text-3xl font-bold text-emerald-700 border-4 border-white shadow-xl">
                      RA
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-lg border border-slate-100 text-slate-600 hover:text-emerald-600 transition-colors">
                      <Camera size={16} />
                    </button>
                  </div>
                  <div className="text-center sm:text-left">
                    <h4 className="font-bold text-slate-900">রহিম আহমেদ</h4>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">
                      অভিভাবক আইডি: #P-88210
                    </p>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                      পূর্ণ নাম
                    </label>
                    <input
                      type="text"
                      defaultValue="রহিম আহমেদ"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                      ইমেইল এড্রেস
                    </label>
                    <input
                      type="email"
                      defaultValue="rahim.parent@mail.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                      ফোন নম্বর
                    </label>
                    <input
                      type="text"
                      defaultValue="+৮৮০ ১৭১২-৩৪৫৬৭৮"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                      ঠিকানা
                    </label>
                    <input
                      type="text"
                      defaultValue="বাসা-১২, রোড-০৫, ধানমন্ডি, ঢাকা"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- Security Tab Content --- */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                    <ShieldCheck size={20} />
                  </div>
                  <h3 className="font-bold text-slate-900">
                    পাসওয়ার্ড পরিবর্তন করুন
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                      বর্তমান পাসওয়ার্ড
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-red-500/10"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                        নতুন পাসওয়ার্ড
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                        পাসওয়ার্ড নিশ্চিত করুন
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/10"
                      />
                    </div>
                  </div>
                </div>
                <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-md active:scale-95">
                  পাসওয়ার্ড আপডেট করুন
                </button>
              </div>

            
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

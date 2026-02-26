'use client';

import { useState } from 'react';
import { User, Lock, Camera, ShieldCheck, Save } from 'lucide-react';

const cn = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ');

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="max-w-5xl mx-auto space-y-8 bg-bg-page min-h-screen p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">সেটিংস</h1>
        <p className="text-sm text-text-muted mt-1">
          প্রোফাইল এবং সিকিউরিটি সেটিংস আপডেট করুন
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="lg:w-64 flex flex-row lg:flex-col gap-2 overflow-x-auto">
          {[
            { id: 'profile', label: 'প্রোফাইল', icon: User },
            { id: 'security', label: 'সিকিউরিটি', icon: Lock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition whitespace-nowrap',
                activeTab === tab.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-secondary hover:bg-primary/5 hover:text-primary',
              )}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-bg-card rounded-xl border border-border-light overflow-hidden">
              <div className="p-6 border-b border-border-light flex justify-between items-center">
                <h3 className="font-semibold text-text-primary">
                  ব্যক্তিগত তথ্য
                </h3>

                <button className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <Save size={14} /> সেভ করুন
                </button>
              </div>

              <div className="p-8 space-y-8">
                {/* Avatar */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center text-xl font-semibold text-primary border border-border-light">
                      RA
                    </div>

                    <button className="absolute -bottom-2 -right-2 p-2 bg-bg-card rounded-md border border-border-light hover:bg-primary/5 transition">
                      <Camera size={14} className="text-primary" />
                    </button>
                  </div>

                  <div className="text-center sm:text-left">
                    <h4 className="font-semibold text-text-primary">
                      রহিম আহমেদ
                    </h4>
                    <p className="text-xs text-text-muted mt-1">
                      অভিভাবক আইডি: #P-88210
                    </p>
                  </div>
                </div>

                {/* Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: 'পূর্ণ নাম', value: 'রহিম আহমেদ' },
                    { label: 'ইমেইল এড্রেস', value: 'rahim@mail.com' },
                    { label: 'ফোন নম্বর', value: '+৮৮০ ১৭১২-৩৪৫৬৭৮' },
                    { label: 'ঠিকানা', value: 'ধানমন্ডি, ঢাকা' },
                  ].map((field, idx) => (
                    <div key={idx} className="space-y-2">
                      <label className="text-xs font-semibold text-text-muted uppercase">
                        {field.label}
                      </label>
                      <input
                        defaultValue={field.value}
                        className="w-full bg-bg-page border border-border-light rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-bg-card p-8 rounded-xl border border-border-light space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ShieldCheck size={16} className="text-primary" />
                </div>
                <h3 className="font-semibold text-text-primary">
                  পাসওয়ার্ড পরিবর্তন
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-text-muted uppercase">
                    বর্তমান পাসওয়ার্ড
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-bg-page border border-border-light rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-text-muted uppercase">
                      নতুন পাসওয়ার্ড
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-bg-page border border-border-light rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-text-muted uppercase">
                      পাসওয়ার্ড নিশ্চিত করুন
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-bg-page border border-border-light rounded-lg px-4 py-3 text-sm outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              <button className="bg-primary text-white px-6 py-3 rounded-lg text-sm font-semibold hover:opacity-90 transition">
                পাসওয়ার্ড আপডেট করুন
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

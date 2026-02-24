"use client"
import React from 'react'
import { ShieldAlert, ShieldCheck, CreditCard, Users, Trash2 } from 'lucide-react'

export default function SchoolDetails() {
  const isSuspended = false; // logic based on data

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-[var(--color-text-primary)] tracking-tight">Manage Tenant</h2>
        <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">Active Status</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--color-bg-card)] p-6 rounded-2xl border border-[var(--color-border-light)]">
           <Users className="text-[var(--color-primary)] mb-2" size={24} />
           <p className="text-[var(--color-text-muted)] text-[10px] font-black uppercase">Students</p>
           <h4 className="text-xl font-black">1,240</h4>
        </div>
        <div className="bg-[var(--color-bg-card)] p-6 rounded-2xl border border-[var(--color-border-light)]">
           <CreditCard className="text-purple-500 mb-2" size={24} />
           <p className="text-[var(--color-text-muted)] text-[10px] font-black uppercase">Current Plan</p>
           <h4 className="text-xl font-black">Pro Yearly</h4>
        </div>
      </div>

      <div className="bg-[var(--color-bg-card)] p-8 rounded-3xl border border-[var(--color-border-light)] space-y-8">
        <div>
          <h3 className="text-xl font-black text-red-600 mb-4">Danger Zone</h3>
          <div className="p-6 border-2 border-red-500/20 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="font-bold text-[var(--color-text-primary)]">Suspend this school</p>
              <p className="text-sm text-[var(--color-text-muted)]">সাসপেন্ড করলে এই স্কুলের সকল শিক্ষক ও ছাত্র লগইন করতে পারবে না।</p>
            </div>
            <button className={`px-6 py-3 rounded-xl font-black text-sm transition-all ${
              isSuspended ? 'bg-green-600 text-white' : 'bg-red-600 text-white shadow-lg shadow-red-600/20'
            }`}>
              {isSuspended ? 'Activate School' : 'Suspend School Now'}
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button className="flex items-center gap-2 text-red-500 font-bold text-xs hover:underline">
            <Trash2 size={14} /> Permanently Delete School Data
          </button>
        </div>
      </div>
    </div>
  )
}
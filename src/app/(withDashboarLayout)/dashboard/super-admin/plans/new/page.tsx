"use client"
import React, { useState } from 'react'
import { Save, Zap, Users, UserRound, HardDrive, LayoutGrid, ArrowLeft, Info, Percent, Calendar, ShieldCheck, Globe } from 'lucide-react'
import Link from 'next/link'

export default function NewPlan() {
  const modulesList = ["Attendance", "Exams", "Finance", "SMS", "Library", "Inventory", "Staff Management"];
  
  // States for toggle/selection logic jodi lagey
  const [isRecommended, setIsRecommended] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up pb-12">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/super-admin/plans" className="p-2 bg-[var(--color-bg-card)] border border-[var(--color-border-light)] rounded-xl text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h2 className="text-2xl font-black text-[var(--color-text-primary)]">Create New Subscription Plan</h2>
            <p className="text-sm text-[var(--color-text-muted)]">Set pricing, limits, and features for schools.</p>
          </div>
        </div>

        {/* Recommended Plan Toggle */}
        <div className="flex items-center gap-3 bg-[var(--color-bg-card)] p-3 rounded-2xl border border-[var(--color-border-light)]">
           <span className="text-[10px] font-black uppercase text-[var(--color-text-muted)]">Mark as Popular</span>
           <input 
            type="checkbox" 
            checked={isRecommended}
            onChange={() => setIsRecommended(!isRecommended)}
            className="w-10 h-5 accent-[var(--color-primary)] cursor-pointer" 
           />
        </div>
      </div>

      <div className="bg-[var(--color-bg-card)] p-8 rounded-3xl border border-[var(--color-border-light)] shadow-xl">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-black text-[var(--color-primary)] uppercase text-xs tracking-widest border-b pb-2">Basic Info</h3>
            
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)]">Plan Name</label>
              <input type="text" placeholder="e.g. Pro Plan" className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)]">Original Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-3.5 text-[var(--color-text-muted)] text-xs font-bold">৳</span>
                  <input type="number" placeholder="5000" className="w-full pl-8 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)]" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)]">Discount Price</label>
                <div className="relative">
                  <Percent className="absolute left-3 top-3.5 text-green-500" size={14} />
                  <input type="number" placeholder="4500" className="w-full pl-8 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)]" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)]">Duration (Months)</label>
                <input type="number" placeholder="12" className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)]" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)]">Trial Period (Days)</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3.5 text-orange-400" size={14} />
                  <input type="number" placeholder="7" className="w-full pl-8 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)]" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)]">Short Description</label>
              <textarea placeholder="Tell schools why this plan is best for them..." className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] h-20 resize-none" />
            </div>
          </div>

          {/* System Limits */}
          <div className="space-y-4">
            <h3 className="font-black text-[var(--color-primary)] uppercase text-xs tracking-widest border-b pb-2">System Limits & Perks</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)]">Student Limit</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3.5 text-gray-400" size={16} />
                  <input type="number" placeholder="500" className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)]" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)]">Teacher Limit</label>
                <div className="relative">
                  <UserRound className="absolute left-3 top-3.5 text-gray-400" size={16} />
                  <input type="number" placeholder="50" className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)]" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)]">Max Admin Accounts</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-3.5 text-gray-400" size={16} />
                  <input type="number" placeholder="2" className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)]" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)]">Storage Limit (GB)</label>
                <div className="relative">
                  <HardDrive className="absolute left-3 top-3.5 text-gray-400" size={16} />
                  <input type="number" placeholder="10" className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)]" />
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
               <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)]">Additional Perks</label>
               <div className="flex flex-wrap gap-2">
                  {["24/7 Support", "Custom Domain", "White Labeling"].map(perk => (
                    <label key={perk} className="flex items-center gap-2 px-3 py-2 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-lg cursor-pointer">
                      <input type="checkbox" className="accent-[var(--color-primary)]" />
                      <span className="text-[10px] font-bold text-[var(--color-text-secondary)]">{perk}</span>
                    </label>
                  ))}
               </div>
            </div>
          </div>

          {/* Modules Selection */}
          <div className="md:col-span-2 space-y-4 pt-4 border-t">
            <h3 className="font-black text-[var(--color-primary)] uppercase text-xs tracking-widest flex items-center gap-2">
              <LayoutGrid size={16} /> Enabled Modules
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {modulesList.map((mod) => (
                <label key={mod} className="flex items-center gap-3 p-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl cursor-pointer hover:border-[var(--color-primary)] transition-all">
                  <input type="checkbox" className="w-4 h-4 accent-[var(--color-primary)]" />
                  <span className="text-xs font-bold text-[var(--color-text-secondary)]">{mod}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="md:col-span-2 mt-6 w-full bg-[var(--color-primary)] text-white py-4 rounded-2xl font-black shadow-lg shadow-blue-600/30 hover:scale-[1.01] transition-all flex items-center justify-center gap-2">
            <Save size={20} />
            Save Subscription Plan
          </button>
        </form>
      </div>
    </div>
  )
}
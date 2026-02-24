"use client"

import React, { useState } from 'react'
import { 
  Building2, Globe, Mail, CreditCard, ShieldCheck, Upload, 
  Palette, Save, MessageSquare, Wrench, Server, UserCircle, 
  Lock, Coins, Percent, ShieldAlert, CheckCircle2 
} from 'lucide-react'

export default function GlobalSettings() {
  const [activeTab, setActiveTab] = useState('general')
  const [isMaintenance, setIsMaintenance] = useState(false)

  return (
    <div className="space-y-8 animate-fade-in-up pb-10">
      {/* ১. হেডার সেকশন */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-[var(--color-text-primary)] tracking-tight">System Control Panel</h2>
          <p className="text-[var(--color-text-muted)] font-medium">Manage global configurations, server, and security.</p>
        </div>
        <button className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-blue-600/20 hover:scale-105 transition-all">
          <Save size={18} /> Save All Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ২. বাম দিকের নেভিগেশন ট্যাব */}
        <div className="w-full lg:w-64 space-y-2">
          <button 
            onClick={() => setActiveTab('general')}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${activeTab === 'general' ? 'bg-[var(--color-primary)] text-white shadow-lg' : 'bg-[var(--color-bg-card)] text-[var(--color-text-muted)] border border-[var(--color-border-light)] hover:bg-[var(--color-bg-page)]'}`}
          >
            <Globe size={18} /> General Setup
          </button>
          <button 
            onClick={() => setActiveTab('branding')}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${activeTab === 'branding' ? 'bg-[var(--color-primary)] text-white shadow-lg' : 'bg-[var(--color-bg-card)] text-[var(--color-text-muted)] border border-[var(--color-border-light)] hover:bg-[var(--color-bg-page)]'}`}
          >
            <Palette size={18} /> Branding & UI
          </button>
          <button 
            onClick={() => setActiveTab('server')}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${activeTab === 'server' ? 'bg-[var(--color-primary)] text-white shadow-lg' : 'bg-[var(--color-bg-card)] text-[var(--color-text-muted)] border border-[var(--color-border-light)] hover:bg-[var(--color-bg-page)]'}`}
          >
            <Server size={18} /> Server & API
          </button>
          <button 
            onClick={() => setActiveTab('account')}
            className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${activeTab === 'account' ? 'bg-[var(--color-primary)] text-white shadow-lg' : 'bg-[var(--color-bg-card)] text-[var(--color-text-muted)] border border-[var(--color-border-light)] hover:bg-[var(--color-bg-page)]'}`}
          >
            <UserCircle size={18} /> My Account
          </button>
        </div>

        {/* ৩. ডান দিকের কন্টেন্ট এরিয়া */}
        <div className="flex-1 bg-[var(--color-bg-card)] p-8 rounded-3xl border border-[var(--color-border-light)] shadow-sm min-h-[500px]">
          
          {/* ট্যাব ১: General Setup (Platform, Maintenance, Currency, Tax) */}
          {activeTab === 'general' && (
            <div className="space-y-8 animate-fade-in-up">
              <h3 className="text-xl font-black text-[var(--color-text-primary)] border-b border-[var(--color-border-light)] pb-4 flex items-center gap-2">
                <Globe className="text-[var(--color-primary)]" /> Global Configuration
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Platform Name</label>
                  <input type="text" defaultValue="Schoology BD" className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)]" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Default Currency</label>
                  <div className="relative">
                    <Coins className="absolute left-3 top-3 text-slate-400" size={18} />
                    <select className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] font-bold">
                        <option>BDT (৳)</option>
                        <option>USD ($)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Tax / VAT (%)</label>
                  <div className="relative">
                    <Percent className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input type="number" defaultValue="5" className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)]" />
                  </div>
                </div>
              </div>

              {/* Maintenance Mode Toggle */}
              <div className={`p-6 rounded-2xl border transition-all ${isMaintenance ? 'bg-red-500/10 border-red-500/50' : 'bg-[var(--color-bg-page)] border-[var(--color-border-light)]'}`}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${isMaintenance ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                            <ShieldAlert size={24} />
                        </div>
                        <div>
                            <h4 className="font-black text-[var(--color-text-primary)]">Maintenance Mode</h4>
                            <p className="text-xs text-[var(--color-text-muted)] font-medium">এটি অন করলে সাধারণ ইউজাররা সিস্টেমে প্রবেশ করতে পারবে না।</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsMaintenance(!isMaintenance)}
                        className={`w-14 h-8 rounded-full relative transition-all ${isMaintenance ? 'bg-red-500' : 'bg-slate-300'}`}
                    >
                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${isMaintenance ? 'right-1' : 'left-1'}`}></div>
                    </button>
                </div>
              </div>
            </div>
          )}

          {/* ট্যাব ২: Branding (Logo, Theme Color) */}
          {activeTab === 'branding' && (
            <div className="space-y-8 animate-fade-in-up">
              <h3 className="text-xl font-black text-[var(--color-text-primary)] border-b border-[var(--color-border-light)] pb-4">Branding & Identity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Global Logo</label>
                  <div className="border-2 border-dashed border-[var(--color-border-light)] p-8 rounded-2xl flex flex-col items-center justify-center text-[var(--color-text-muted)] hover:border-[var(--color-primary)] transition-all cursor-pointer">
                    <Upload size={24} className="mb-2" />
                    <span className="text-xs font-bold uppercase">Upload Global Logo</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Default Theme Color</label>
                  <input type="color" defaultValue="#2563EB" className="h-20 w-full rounded-2xl cursor-pointer bg-transparent border-2 border-[var(--color-border-light)] p-1" />
                </div>
              </div>
            </div>
          )}

          {/* ট্যাব ৩: Server & API (SMTP, Payment, SMS) */}
          {activeTab === 'server' && (
            <div className="space-y-8 animate-fade-in-up">
              <h3 className="text-xl font-black text-[var(--color-text-primary)] border-b border-[var(--color-border-light)] pb-4">Email & API Integration</h3>
              
              {/* Email SMTP Settings */}
              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-blue-600 tracking-widest">Email SMTP Settings</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="SMTP Host (e.g. smtp.gmail.com)" className="px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-sm" />
                    <input type="text" placeholder="SMTP Port (e.g. 587)" className="px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-sm" />
                    <input type="text" placeholder="SMTP Username" className="px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-sm" />
                    <input type="password" placeholder="SMTP Password" className="px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-sm" />
                </div>
              </div>

              {/* API Keys */}
              <div className="space-y-4 pt-4">
                <p className="text-xs font-black uppercase text-green-600 tracking-widest">Payment & SMS API Keys</p>
                <div className="space-y-3">
                    <div className="relative">
                        <CreditCard className="absolute left-3 top-3 text-slate-400" size={18} />
                        <input type="password" placeholder="Payment Gateway Secret Key" className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-sm" />
                    </div>
                    <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 text-slate-400" size={18} />
                        <input type="password" placeholder="SMS Gateway API Key" className="w-full pl-10 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-sm" />
                    </div>
                </div>
              </div>
            </div>
          )}

          {/* ট্যাব ৪: My Account (Profile Update, Password) */}
          {activeTab === 'account' && (
            <div className="space-y-8 animate-fade-in-up">
              <h3 className="text-xl font-black text-[var(--color-text-primary)] border-b border-[var(--color-border-light)] pb-4">Super Admin Profile</h3>
              
              {/* Update Profile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8 border-b border-dashed border-[var(--color-border-light)]">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Full Name</label>
                    <input type="text" defaultValue="Super Admin" className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)]" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Profile Email</label>
                    <input type="email" defaultValue="admin@schoology.com" className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)]" />
                 </div>
              </div>

              {/* Change Password */}
              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-red-500 tracking-widest flex items-center gap-2">
                    <Lock size={14} /> Security & Password
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="password" placeholder="Current Password" className="px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-sm" />
                    <input type="password" placeholder="New Password" className="px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-sm" />
                </div>
                <button className="bg-slate-900 text-white px-6 py-2 rounded-xl text-xs font-bold hover:bg-black transition-all">Update Security</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
"use client"

import React, { useState } from 'react'
import { 
  Globe, Mail, CreditCard, Upload, Palette, Save, 
  MessageSquare, Server, UserCircle, Lock, Coins, 
  Percent, ShieldAlert, CheckCircle2, Eye, EyeOff 
} from 'lucide-react'

export default function GlobalSettings() {
  const [activeTab, setActiveTab] = useState('general')
  const [isMaintenance, setIsMaintenance] = useState(false)
  const [showPass, setShowPass] = useState(false)

  // Success Notification Mockup (Video-te bolar jonno)
  const handleSave = () => {
    alert("Settings updated successfully! 🚀")
  }

  return (
    <div className="space-y-8 animate-fade-in-up pb-10 p-2 md:p-0">
      {/* ১. হেডার সেকশন */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-[var(--color-text-primary)] tracking-tight">System Control Panel</h2>
          <p className="text-[var(--color-text-muted)] font-medium mt-1">Configure your SaaS ecosystem and infrastructure.</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-8 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-600/20 hover:scale-[1.02] active:scale-95 transition-all w-full md:w-auto justify-center"
        >
          <Save size={18} /> Save Configurations
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ২. বাম দিকের নেভিগেশন ট্যাব */}
        <div className="w-full lg:w-72 space-y-3">
          {[
            { id: 'general', label: 'General Setup', icon: <Globe size={18}/> },
            { id: 'branding', label: 'Branding & UI', icon: <Palette size={18}/> },
            { id: 'server', label: 'Server & API', icon: <Server size={18}/> },
            { id: 'account', label: 'My Account', icon: <UserCircle size={18}/> },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-[20px] font-black text-xs uppercase tracking-widest transition-all duration-300 ${
                activeTab === tab.id 
                ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-primary/20 translate-x-2' 
                : 'bg-[var(--color-bg-card)] text-[var(--color-text-muted)] border border-[var(--color-border-light)] hover:border-primary/50'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ৩. ডান দিকের কন্টেন্ট এরিয়া */}
        <div className="flex-1 bg-[var(--color-bg-card)] p-6 md:p-10 rounded-[40px] border border-[var(--color-border-light)] shadow-sm min-h-[600px]">
          
          {/* ট্যাব ১: General Setup */}
          {activeTab === 'general' && (
            <div className="space-y-10 animate-fade-in-up">
              <div className="flex items-center gap-3 border-b border-[var(--color-border-light)] pb-5">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600"><Globe size={20}/></div>
                <h3 className="text-xl font-black text-[var(--color-text-primary)]">Global Configuration</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-[0.2em] ml-1">Platform Identity</label>
                  <input type="text" defaultValue="Schoology BD" className="w-full px-5 py-4 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-2xl outline-none text-[var(--color-text-primary)] font-bold focus:ring-2 focus:ring-primary/20 transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-[0.2em] ml-1">Operational Currency</label>
                  <div className="relative">
                    <Coins className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select className="w-full pl-12 pr-5 py-4 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-2xl outline-none text-[var(--color-text-primary)] font-bold appearance-none cursor-pointer">
                        <option>BDT (৳)</option>
                        <option>USD ($)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Maintenance Toggle Optimized */}
              <div className={`p-8 rounded-[32px] border-2 transition-all duration-500 ${isMaintenance ? 'bg-rose-500/5 border-rose-500/30' : 'bg-[var(--color-bg-page)] border-[var(--color-border-light)]'}`}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-5">
                        <div className={`p-4 rounded-2xl transition-all ${isMaintenance ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-200 text-slate-500'}`}>
                            <ShieldAlert size={28} />
                        </div>
                        <div>
                            <h4 className="font-black text-[var(--color-text-primary)] text-lg">Maintenance Mode</h4>
                            <p className="text-xs text-[var(--color-text-muted)] font-medium max-w-xs">Instantly disable public access for system upgrades or emergency fixes.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsMaintenance(!isMaintenance)}
                        className={`w-16 h-9 rounded-full relative transition-all duration-300 ${isMaintenance ? 'bg-rose-500 shadow-lg shadow-rose-500/30' : 'bg-slate-300'}`}
                    >
                        <div className={`absolute top-1.5 w-6 h-6 bg-white rounded-full transition-all duration-300 ${isMaintenance ? 'right-1.5 shadow-md' : 'left-1.5'}`}></div>
                    </button>
                </div>
              </div>
            </div>
          )}

          {/* ট্যাব ২: Branding (Improved Upload UI) */}
          {activeTab === 'branding' && (
            <div className="space-y-10 animate-fade-in-up">
              <h3 className="text-xl font-black text-[var(--color-text-primary)] border-b border-[var(--color-border-light)] pb-5">Branding & Identity</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest ml-1">Platform Logo</label>
                  <div className="group border-2 border-dashed border-[var(--color-border-light)] p-12 rounded-[32px] flex flex-col items-center justify-center text-[var(--color-text-muted)] hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                    <div className="bg-primary/10 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                        <Upload size={32} className="text-primary" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest">Drop logo here</span>
                    <span className="text-[10px] mt-1 opacity-60 font-bold">PNG or SVG (Max 2MB)</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest ml-1">Global Theme (Primary Color)</label>
                  <div className="relative group">
                    <input type="color" defaultValue="#2563EB" className="h-40 w-full rounded-[32px] cursor-pointer bg-transparent border-4 border-[var(--color-border-light)] p-2 transition-all group-hover:border-primary/30" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="bg-white/90 dark:bg-black/90 px-4 py-2 rounded-xl text-[10px] font-black uppercase shadow-sm">Pick Color</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ট্যাব ৩: Server & API (Cleaned) */}
          {activeTab === 'server' && (
            <div className="space-y-10 animate-fade-in-up">
              <h3 className="text-xl font-black text-[var(--color-text-primary)] border-b border-[var(--color-border-light)] pb-5">Infrastructure Integration</h3>
              
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em] bg-blue-50 w-fit px-3 py-1 rounded-full">Email SMTP Gateway</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {["SMTP Host", "SMTP Port", "Username", "Password"].map((placeholder) => (
                        <input key={placeholder} type={placeholder === "Password" ? "password" : "text"} placeholder={placeholder} className="px-5 py-4 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-2xl outline-none text-sm font-bold focus:border-blue-500/50" />
                    ))}
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t border-dashed border-[var(--color-border-light)]">
                <p className="text-[10px] font-black uppercase text-emerald-600 tracking-[0.3em] bg-emerald-50 w-fit px-3 py-1 rounded-full">Secure API Keys</p>
                <div className="space-y-4">
                    <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="password" placeholder="Payment Merchant Secret Key" className="w-full pl-12 pr-5 py-4 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-2xl outline-none text-sm font-bold focus:border-emerald-500/50" />
                    </div>
                    <div className="relative">
                        <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="password" placeholder="SMS Gateway API Key" className="w-full pl-12 pr-5 py-4 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-2xl outline-none text-sm font-bold focus:border-emerald-500/50" />
                    </div>
                </div>
              </div>
            </div>
          )}

          {/* ট্যাব ৪: Account (Security Enhanced) */}
          {activeTab === 'account' && (
            <div className="space-y-10 animate-fade-in-up">
              <h3 className="text-xl font-black text-[var(--color-text-primary)] border-b border-[var(--color-border-light)] pb-5">Super Admin Profile</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10 border-b border-dashed border-[var(--color-border-light)]">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest ml-1">Full Name</label>
                    <input type="text" defaultValue="Rashed Khan" className="w-full px-5 py-4 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-2xl outline-none text-[var(--color-text-primary)] font-bold" />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest ml-1">Master Email</label>
                    <input type="email" defaultValue="admin@schoology.com" className="w-full px-5 py-4 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-2xl outline-none text-[var(--color-text-primary)] font-bold" />
                 </div>
              </div>

              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase text-rose-500 tracking-[0.2em] flex items-center gap-2">
                    <Lock size={14} /> Critical Security
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative">
                        <input type={showPass ? "text" : "password"} placeholder="Current Password" className="w-full px-5 py-4 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-2xl outline-none text-sm font-bold" />
                        <button onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                            {showPass ? <EyeOff size={18}/> : <Eye size={18}/>}
                        </button>
                    </div>
                    <input type="password" placeholder="New Secret Password" className="px-5 py-4 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-2xl outline-none text-sm font-bold" />
                </div>
                <button className="bg-black text-white px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95">Update Master Key</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
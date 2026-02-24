"use client"
import React, { useState } from 'react'
import { Megaphone, Send, History, Target, AlertCircle, Trash2 } from 'lucide-react'

export default function Announcements() {
  const [message, setMessage] = useState("")

  const pastAnnouncements = [
    { id: 1, title: "Server Maintenance", date: "Oct 25, 2023", target: "All Schools", status: "Active" },
    { id: 2, title: "New Feature: Exam Module", date: "Oct 20, 2023", target: "Pro Schools", status: "Expired" },
  ]

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h2 className="text-3xl font-black text-[var(--color-text-primary)]">Broadcast System</h2>
        <p className="text-[var(--color-text-muted)] font-medium">Send global notifications to all school dashboards.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* নোটিশ কম্পোজ করার অংশ */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[var(--color-bg-card)] p-8 rounded-3xl border border-[var(--color-border-light)] shadow-sm">
            <h3 className="text-xl font-black text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
              <Megaphone className="text-[var(--color-primary)]" size={20} /> Compose New Announcement
            </h3>
            
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Notice Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Scheduled Maintenance Notice" 
                  className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Target Audience</label>
                <select className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] font-bold text-sm">
                  <option>All Schools (Tenants)</option>
                  <option>Basic Plan Schools</option>
                  <option>Pro Plan Schools</option>
                  <option>Expired Subscriptions</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-[var(--color-text-muted)] tracking-widest">Message Content</label>
                <textarea 
                  rows={5}
                  placeholder="Type your message here..."
                  className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
                ></textarea>
              </div>

              <button className="flex items-center justify-center gap-2 w-full py-4 bg-[var(--color-primary)] text-white font-black rounded-2xl shadow-lg shadow-blue-600/20 hover:scale-[1.01] transition-all">
                <Send size={18} /> Broadcast Now
              </button>
            </form>
          </div>
        </div>

        {/* হিস্ট্রি সেকশন */}
        <div className="space-y-6">
          <div className="bg-[var(--color-bg-card)] p-6 rounded-3xl border border-[var(--color-border-light)] shadow-sm">
            <h3 className="font-black text-[var(--color-text-primary)] mb-4 flex items-center gap-2">
              <History size={18} className="text-blue-500" /> Recent Broadcasts
            </h3>
            <div className="space-y-4">
              {pastAnnouncements.map((item) => (
                <div key={item.id} className="p-4 bg-[var(--color-bg-page)] rounded-2xl border border-[var(--color-border-light)] relative group">
                  <h4 className="text-sm font-black text-[var(--color-text-primary)] mb-1">{item.title}</h4>
                  <p className="text-[10px] font-bold text-[var(--color-text-muted)] mb-2">{item.date} • {item.target}</p>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${item.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}`}>
                    {item.status}
                  </span>
                  <button className="absolute top-4 right-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
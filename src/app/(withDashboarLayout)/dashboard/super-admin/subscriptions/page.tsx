"use client"
import React from 'react'
import { Calendar, CheckCircle, Clock, Search, AlertCircle } from 'lucide-react'

const subscriptions = [
  { id: 1, school: "Ideal High School", plan: "Pro", expiry: "2023-11-15", status: "Active", payment: "Verified" },
  { id: 2, school: "Global Academy", plan: "Basic", expiry: "2023-10-28", status: "Expiring Soon", payment: "Pending" },
  { id: 3, school: "Sunfields School", plan: "Enterprise", expiry: "2024-05-20", status: "Active", payment: "Verified" },
]

export default function SubscriptionsList() {
  return (
    <div className="space-y-6   animate-fade-in-up">
      <h2 className="text-3xl font-black text-[var(--color-text-primary)]">Subscriptions & Deadlines</h2>

      <div className="bg-[var(--color-bg-card)] rounded-2xl border border-[var(--color-border-light)] overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[var(--color-bg-page)] border-b border-[var(--color-border-light)]">
            <tr className="text-[var(--color-text-muted)] text-[11px] uppercase font-black tracking-widest">
              <th className="px-6 py-4">School</th>
              <th className="px-6 py-4">Current Plan</th>
              <th className="px-6 py-4">Expiry Date</th>
              <th className="px-6 py-4">Payment Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border-light)]">
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="hover:bg-[var(--color-bg-page)]/30 transition-colors">
                <td className="px-6 py-4 font-bold text-sm text-[var(--color-text-primary)]">{sub.school}</td>
                <td className="px-6 py-4 text-xs font-bold">{sub.plan}</td>
                <td className="px-6 py-4">
                  <div className={`flex items-center gap-2 text-xs font-bold ${sub.status === 'Expiring Soon' ? 'text-red-500' : 'text-[var(--color-text-secondary)]'}`}>
                    <Calendar size={14} /> {sub.expiry}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 w-fit ${
                    sub.payment === 'Verified' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-600'
                  }`}>
                    {sub.payment === 'Verified' ? <CheckCircle size={12}/> : <Clock size={12}/>}
                    {sub.payment}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {sub.payment === 'Pending' ? (
                    <button className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-tighter">Verify Payment</button>
                  ) : (
                    <button className="text-[var(--color-text-muted)] text-xs font-bold">Manage</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
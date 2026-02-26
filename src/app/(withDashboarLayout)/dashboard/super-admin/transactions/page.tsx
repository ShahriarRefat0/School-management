"use client"
import React, { useState } from 'react' // ১. useState ইমপোর্ট করা হলো
import { 
  Receipt, Download, Wallet, TrendingUp, Clock, AlertCircle, Bell, Percent, FileText, ChevronRight, Search, X
} from 'lucide-react'

const transactions = [
  { id: "TXN98421", school: "Ideal High School", amount: "৳5,000", gateway: "bKash", trxId: "BK8291XLP", date: "Oct 25, 2023", status: "Success" },
  { id: "TXN98422", school: "Global Academy", amount: "৳2,000", gateway: "Nagad", trxId: "NG9210ZQA", date: "Oct 24, 2023", status: "Success" },
  { id: "TXN98423", school: "Bright Future", amount: "৳3,500", gateway: "Bank", trxId: "Pending", date: "Oct 23, 2023", status: "Pending" },
]

export default function BillingOverview() {
  // ২. সার্চের জন্য স্টেট ডিক্লেয়ার করা হলো
  const [searchTerm, setSearchTerm] = useState("");

  const billingStats = [
    { title: "Total Revenue", value: "৳12.50L", icon: Wallet, color: "text-green-500", bg: "bg-green-500/10" },
    { title: "Monthly Revenue", value: "৳1.20L", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Pending Payments", value: "৳45,000", icon: Clock, color: "text-orange-500", bg: "bg-orange-500/10" },
    { title: "Overdue Schools", value: "05", icon: AlertCircle, color: "text-red-500", bg: "bg-red-500/10" },
  ]

  // ৩. ফিল্টারিং লজিক: স্কুলের নাম বা ট্রানজ্যাকশন আইডি দিয়ে সার্চ হবে
  const filteredTransactions = transactions.filter((trx) =>
    trx.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trx.trxId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in-up pb-10">
      
      {/* হেডার */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-[var(--color-text-primary)] tracking-tight">Billing & Revenue</h2>
          <p className="text-[var(--color-text-muted)] font-medium">Track your SaaS income and manage school payments.</p>
        </div>
        <button className="flex items-center gap-2 bg-[var(--color-bg-card)] border border-[var(--color-border-light)] text-[var(--color-text-primary)] px-4 py-2.5 rounded-xl font-bold text-sm">
          <Download size={18} className="text-blue-500" /> Export CSV/PDF
        </button>
      </div>

      {/* স্ট্যাটাস কার্ডস */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {billingStats.map((stat, index) => (
          <div key={index} className="bg-[var(--color-bg-card)] p-6 rounded-3xl border border-[var(--color-border-light)] shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            <h3 className="text-[var(--color-text-muted)] text-[11px] uppercase font-black tracking-widest">{stat.title}</h3>
            <p className="text-2xl font-black text-[var(--color-text-primary)] mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* সার্চ এবং ট্রানজ্যাকশন লিস্ট */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h3 className="text-xl font-black text-[var(--color-text-primary)] flex items-center gap-2">
                <Receipt size={20} className="text-[var(--color-primary)]" /> Recent Transactions
            </h3>
            
            {/* ৪. সার্চ ইনপুট ফিল্ড যোগ করা হলো */}
            <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--color-text-muted)]" />
                <input 
                    type="text" 
                    placeholder="Search school or TRX ID..." 
                    className="w-full pl-10 pr-10 py-2.5 bg-[var(--color-bg-card)] border border-[var(--color-border-light)] rounded-xl outline-none text-sm text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                    <button 
                        onClick={() => setSearchTerm("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-red-500"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>
        </div>

        <div className="grid gap-4">
          {/* ৫. অরিজিনাল ডাটার বদলে filteredTransactions ম্যাপ করা হলো */}
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((trx) => (
              <div key={trx.id} className="bg-[var(--color-bg-card)] p-5 rounded-3xl border border-[var(--color-border-light)] flex flex-col lg:flex-row justify-between items-center group hover:border-[var(--color-primary)] transition-all gap-6">
                <div className="flex items-center gap-4 w-full lg:w-1/3">
                  <div className="p-4 bg-[var(--color-bg-page)] rounded-2xl text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)] transition-colors">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-[var(--color-text-primary)] text-base">{trx.school}</h4>
                    <p className="text-[10px] text-[var(--color-text-muted)] font-black uppercase tracking-widest">{trx.id} • {trx.date}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 w-full lg:w-1/3">
                  <div>
                    <p className="text-[10px] text-[var(--color-text-muted)] font-black uppercase mb-1">Method / TRX ID</p>
                    <p className="text-sm font-bold text-[var(--color-text-secondary)]">{trx.gateway}</p>
                    <p className="text-[11px] font-mono text-[var(--color-text-muted)]">{trx.trxId}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-[var(--color-text-muted)] font-black uppercase mb-1">Amount</p>
                    <p className="text-lg font-black text-[var(--color-text-primary)]">{trx.amount}</p>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase ${trx.status === 'Success' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-600'}`}>
                      {trx.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full lg:w-1/3 justify-end">
                   <button className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 text-orange-600 rounded-xl text-xs font-bold hover:bg-orange-500 hover:text-white transition-all">
                      <Bell size={14} /> Reminder
                   </button>
                   <button className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-600 rounded-xl text-xs font-bold hover:bg-blue-500 hover:text-white transition-all">
                      <Percent size={14} /> Discount
                   </button>
                   <button className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]">
                      <ChevronRight size={20} />
                   </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center bg-[var(--color-bg-card)] rounded-3xl border border-dashed border-[var(--color-border-light)]">
                <p className="text-[var(--color-text-muted)] font-bold">No transactions found for "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
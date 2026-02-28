"use client"
import React, { useState } from 'react'
import { 
  MessageSquare, Clock, User, AlertTriangle, 
  CheckCircle2, Receipt, Search, Filter 
} from 'lucide-react'

// Mock Data: Mixed Activity (Billing + Support)
const initialActivities = [
  { 
    id: "#TK-882", 
    type: "BILLING", // New Bill/Payment Identity
    school: "Ideal High School", 
    subject: "Subscription Renewal Payment", 
    priority: "High", 
    time: "2 hours ago", 
    status: "Pending Verification" 
  },
  { 
    id: "#TK-881", 
    type: "SUPPORT", // Help Request
    school: "Global Academy", 
    subject: "Unable to upload student bulk data", 
    priority: "Urgent", 
    time: "5 hours ago", 
    status: "Open" 
  },
  { 
    id: "#TK-880", 
    type: "SUPPORT", 
    school: "Sunfields School", 
    subject: "Exam module report bug", 
    priority: "Medium", 
    time: "1 day ago", 
    status: "In-Progress" 
  },
]

export default function ActivityHelpDesk() {
  const [activities, setActivities] = useState(initialActivities);

  return (
    <div className="space-y-8 animate-fade-in-up p-2 md:p-0">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-black text-[var(--color-text-primary)] tracking-tight">
            Command Center
          </h2>
          <p className="text-[var(--color-text-muted)] mt-1 font-medium text-sm">
            Monitor real-time payments and resolve institutional bottlenecks.
          </p>
        </div>
        
        <div className="flex gap-3">
           <div className="bg-rose-500/10 text-rose-600 px-4 py-2 rounded-2xl text-[10px] font-black uppercase flex items-center gap-2 border border-rose-500/10">
             <AlertTriangle size={14} /> 2 Urgent Issues
           </div>
           <div className="bg-emerald-500/10 text-emerald-600 px-4 py-2 rounded-2xl text-[10px] font-black uppercase flex items-center gap-2 border border-emerald-500/10">
             <Receipt size={14} /> 1 New Payment
           </div>
        </div>
      </div>

      {/* Activity List */}
      <div className="grid gap-4">
        {activities.map((item) => (
          <div 
            key={item.id} 
            className="bg-[var(--color-bg-card)] p-5 rounded-[28px] border border-[var(--color-border-light)] flex flex-col md:flex-row justify-between items-center group hover:border-[var(--color-primary)] hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
          >
            <div className="flex items-center gap-5 w-full md:w-auto">
              {/* Dynamic Icon based on Activity Type */}
              <div className={`p-4 rounded-2xl transition-transform group-hover:scale-110 duration-300 ${
                item.type === 'BILLING' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'
              }`}>
                {item.type === 'BILLING' ? <Receipt size={24} /> : <MessageSquare size={24} />}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[9px] font-black text-[var(--color-text-muted)] uppercase tracking-widest bg-[var(--color-bg-page)] px-2 py-0.5 rounded border border-[var(--color-border-light)]">
                    {item.id}
                  </span>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase ${
                    item.priority === 'Urgent' ? 'bg-rose-500 text-white' : 
                    item.priority === 'High' ? 'bg-orange-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {item.priority}
                  </span>
                  <span className="text-[9px] font-black text-[var(--color-primary)] uppercase tracking-tighter">
                    • {item.type}
                  </span>
                </div>
                
                <h4 className="font-black text-[var(--color-text-primary)] text-lg leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                  {item.subject}
                </h4>
                
                <div className="flex items-center gap-3 mt-2 text-[var(--color-text-muted)]">
                   <div className="flex items-center gap-1.5">
                      <User size={13} />
                      <span className="text-xs font-bold">{item.school}</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Right Side: Status & Actions */}
            <div className="flex items-center gap-6 w-full md:w-auto mt-6 md:mt-0 justify-between md:justify-end border-t md:border-t-0 border-[var(--color-border-light)] pt-4 md:pt-0">
               <div className="text-left md:text-right">
                  <div className="flex items-center md:justify-end gap-1.5 text-[var(--color-text-muted)] mb-1">
                    <Clock size={12} />
                    <span className="text-[10px] font-black uppercase tracking-tight">{item.time}</span>
                  </div>
                  <div className="flex items-center md:justify-end">
                    <span className={`text-[11px] font-black uppercase tracking-tighter flex items-center gap-1 ${
                      item.status.includes('Open') || item.status.includes('Pending') ? 'text-rose-500' : 'text-emerald-500'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                         item.status.includes('Open') || item.status.includes('Pending') ? 'bg-rose-500' : 'bg-emerald-500'
                      }`} />
                      {item.status}
                    </span>
                  </div>
               </div>
               
               <button className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-primary/20 active:scale-95">
                 {item.type === 'BILLING' ? 'Verify Bill' : 'Solve Ticket'}
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
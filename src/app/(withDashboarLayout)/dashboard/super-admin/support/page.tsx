"use client"
import React from 'react'
import { LifeBuoy, MessageSquare, Clock, CheckCircle2, User, AlertTriangle } from 'lucide-react'

const tickets = [
  { id: "#TK-882", school: "Ideal High School", subject: "Payment not reflecting", priority: "High", time: "2 hours ago", status: "Open" },
  { id: "#TK-881", school: "Global Academy", subject: "How to add teachers?", priority: "Medium", time: "5 hours ago", status: "In-Progress" },
  { id: "#TK-880", school: "Sunfields School", subject: "Bug in Report Card", priority: "Urgent", time: "1 day ago", status: "Resolved" },
]

export default function SupportTickets() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="">
        <div>
          <h2 className="text-3xl font-black text-[var(--color-text-primary)]">Support Help-Desk</h2>
          <p className="text-[var(--color-text-muted)] mt-4 font-medium">Respond to tenant inquiries and technical issues.</p>
        </div>
        <div className="flex gap-2 mt-4">
           <div className="bg-orange-500/10 text-orange-600 px-4 py-2 rounded-xl text-xs font-black uppercase flex items-center gap-2 tracking-tighter">
             <AlertTriangle size={14} /> 2 Open Tickets
           </div>
        </div>
      </div>

      <div className="grid gap-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="bg-[var(--color-bg-card)] p-6 rounded-3xl border border-[var(--color-border-light)] flex flex-col md:flex-row justify-between items-center group hover:border-[var(--color-primary)] transition-all">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className={`p-4 rounded-2xl ${
                ticket.status === 'Open' ? 'bg-red-500/10 text-red-500' : 
                ticket.status === 'In-Progress' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'
              }`}>
                <MessageSquare size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black text-[var(--color-text-muted)] uppercase tracking-widest">{ticket.id}</span>
                  {/* এখানে ভুল ছিল: <span> শুরু হয়ে </div> দিয়ে শেষ হয়েছিল। এখন ঠিক করা হয়েছে */}
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase ${
                    ticket.priority === 'Urgent' ? 'bg-red-500 text-white' : 
                    ticket.priority === 'High' ? 'bg-orange-500 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {ticket.priority}
                  </span>
                </div>
                <h4 className="font-black text-[var(--color-text-primary)] text-lg leading-tight">{ticket.subject}</h4>
                <div className="flex items-center gap-2 mt-2">
                   <User size={12} className="text-[var(--color-text-muted)]" />
                   <span className="text-xs font-bold text-[var(--color-text-secondary)]">{ticket.school}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 w-full md:w-auto mt-6 md:mt-0 justify-between md:justify-end border-t md:border-t-0 border-[var(--color-border-light)] pt-4 md:pt-0">
               <div className="text-left md:text-right">
                  <div className="flex items-center md:justify-end gap-1 text-[var(--color-text-muted)] mb-1">
                    <Clock size={12} />
                    <span className="text-[10px] font-bold uppercase">{ticket.time}</span>
                  </div>
                  <div className="flex items-center md:justify-end gap-2">
                    <span className={`text-xs font-black ${
                      ticket.status === 'Open' ? 'text-red-500' : 
                      ticket.status === 'In-Progress' ? 'text-blue-500' : 'text-green-500'
                    }`}>
                      {ticket.status}
                    </span>
                  </div>
               </div>
               <button className="bg-[var(--color-bg-page)] border border-[var(--color-border-light)] text-[var(--color-text-primary)] px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-sm">
                 Open Ticket
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
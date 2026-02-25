"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Search, Plus, ShieldCheck, ShieldAlert, Filter, ArrowRight, User, Calendar, 
  Hash, Users, MoreVertical, Edit, CreditCard, CalendarPlus, Image, Power, Trash2 
} from 'lucide-react'

const schoolsData = [
  { id: "1", name: "Ideal International School", code: "SCH-101", adminName: "Md. Rafiqul Islam", email: "admin@ideal.com", status: "Active", plan: "Pro", students: 1200, expiry: "2024-12-25" },
  { id: "2", name: "Bright Future Academy", code: "SCH-102", adminName: "Mrs. Nasrin Akter", email: "info@bright.com", status: "Suspended", plan: "Basic", students: 450, expiry: "2024-10-10" },
  { id: "3", name: "Modern Scholars College", code: "SCH-103", adminName: "Dr. Abul Kashem", email: "principal@msc.edu", status: "Expired", plan: "Enterprise", students: 2500, expiry: "2023-09-15" },
]

export default function SchoolsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openMenuId, setOpenMenuId] = useState<string | null>(null); // ড্রপডাউন কন্ট্রোল করার জন্য

  const filteredSchools = schoolsData.filter((school) =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-fade-in-up pb-20">
      {/* হেডার */}
      <div className="flex  flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-black text-[var(--color-text-primary)] tracking-tight">School Management</h2>
          <p className="text-[var(--color-text-muted)] font-medium">Manage all tenants and subscriptions.</p>
        </div>
        <Link href="/dashboard/super-admin/schools/new" className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20">
          <Plus size={18} /> Add New School
        </Link>
      </div>

      {/* সার্চ ও ফিল্টার */}
      <div className="flex gap-4 items-center bg-[var(--color-bg-card)] p-4 rounded-2xl border border-[var(--color-border-light)] shadow-sm">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
          <input 
            type="text" 
            placeholder="Search by school name or code..." 
            className="w-full pl-10 pr-4 py-2 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-xl outline-none text-sm text-[var(--color-text-primary)] focus:ring-2 focus:ring-[var(--color-primary)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-[var(--color-border-light)] rounded-xl text-sm font-bold text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-page)]">
          <Filter size={16} /> Filter
        </button>
      </div>

      {/* স্কুল টেবিল */}
      <div className="bg-[var(--color-bg-card)] rounded-2xl border border-[var(--color-border-light)] overflow-visible shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[var(--color-bg-page)] border-b border-[var(--color-border-light)]">
              <tr className="text-[var(--color-text-muted)] text-[10px] uppercase font-black tracking-widest">
                <th className="px-6 py-4">School & Code</th>
                <th className="px-6 py-4">Admin Name</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Expiry Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-light)]">
              {filteredSchools.length > 0 ? (
                filteredSchools.map((school) => (
                  <tr key={school.id} className="hover:bg-[var(--color-bg-page)]/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-[var(--color-text-primary)] text-sm">{school.name}</span>
                        <div className="flex items-center gap-1 text-[10px] text-[var(--color-primary)] font-bold uppercase tracking-wider">
                          <Hash size={10} /> {school.code}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-[var(--color-text-secondary)]">
                       {school.adminName}
                    </td>
                    <td className="px-6 py-4 text-xs font-black uppercase text-[var(--color-primary)]">
                       {school.plan}
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-[var(--color-text-secondary)]">
                       {school.expiry}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 w-fit ${
                        school.status === 'Active' ? 'bg-green-500/10 text-green-500' : 
                        school.status === 'Suspended' ? 'bg-orange-500/10 text-orange-600' : 
                        'bg-red-500/10 text-red-500'
                      }`}>
                        {school.status === 'Active' ? <ShieldCheck size={12}/> : <ShieldAlert size={12}/>}
                        {school.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      {/* ড্রপডাউন অ্যাকশন বাটন */}
                      <div className="flex justify-end items-center gap-2">
                         <Link href={`/dashboard/super-admin/schools/${school.id}`} className="p-2 hover:bg-[var(--color-bg-page)] rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-all">
                            <ArrowRight size={18} />
                         </Link>
                         <button 
                            onClick={() => toggleMenu(school.id)}
                            className="p-2 hover:bg-[var(--color-bg-page)] rounded-lg text-[var(--color-text-muted)] transition-all"
                         >
                            <MoreVertical size={18} />
                         </button>
                      </div>

                      {/* অ্যাকশন ড্রপডাউন মেনু */}
                      {openMenuId === school.id && (
                        <div className="absolute right-6 mt-2 w-56 bg-[var(--color-bg-card)] border border-[var(--color-border-light)] rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in-up">
                          <div className="p-2 space-y-1">
                            {/* ১. Update School Info */}
                            <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-page)] hover:text-[var(--color-primary)] rounded-xl transition-all">
                              <Edit size={14} /> Update School Info
                            </button>
                            {/* ২. Change Plan */}
                            <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-page)] hover:text-[var(--color-primary)] rounded-xl transition-all">
                              <CreditCard size={14} /> Change Plan
                            </button>
                            {/* ৩. Extend Subscription */}
                            <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-page)] hover:text-[var(--color-primary)] rounded-xl transition-all">
                              <CalendarPlus size={14} /> Extend Subscription
                            </button>
                            {/* ৪. Update Logo */}
                            <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-page)] hover:text-[var(--color-primary)] rounded-xl transition-all">
                              <Image size={14} /> Update Logo
                            </button>
                            {/* ৫. Change Status / Suspend */}
                            <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-[var(--color-text-secondary)]  hover:bg-[var(--color-bg-page)] rounded-xl transition-all border-t border-[var(--color-border-light)] mt-1 pt-2">
                              <Power size={14} /> Change Status
                            </button>
                            {/* ৬. Delete School */}
                            <button 
                              className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-500/10 rounded-xl transition-all"
                              onClick={() => alert("Are you sure you want to delete this school? This action is permanent.")}
                            >
                              <Trash2 size={14} /> Delete School
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center font-bold text-[var(--color-text-muted)]">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Search, Plus, ShieldCheck, ShieldAlert, Filter, ArrowRight, MoreVertical, 
  Edit, CreditCard, CalendarPlus, Image as ImageIcon, Power, Trash2, Hash 
} from 'lucide-react'
import { getAllSchools } from '@/app/actions/school'

export default function SchoolsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [schools, setSchools] = useState<any[]>([]) 
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    setLoading(true)
    const result = await getAllSchools()
    if (result.success) {
      setSchools(result.data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const filteredSchools = schools.filter((school) =>
    school.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    school.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div className="space-y-6 animate-fade-in-up pb-20">
      {/* হেডার */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="bg-[var(--color-bg-page)] border-b border-[var(--color-border-light)]">
              <tr className="text-[var(--color-text-muted)] text-[10px] uppercase font-black tracking-widest">
                <th className="px-6 py-5 border-b border-[var(--color-border-light)]">School Name</th>
                <th className="px-6 py-5 border-b border-[var(--color-border-light)]">Domain / Code</th>
                <th className="px-6 py-5 border-b border-[var(--color-border-light)]">Plan</th>
                <th className="px-6 py-5 border-b border-[var(--color-border-light)]">Expiry Date</th>
                <th className="px-6 py-5 border-b border-[var(--color-border-light)]">Status</th>
                <th className="px-6 py-5 border-b border-[var(--color-border-light)] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-light)]">
              {loading ? (
                 <tr><td colSpan={6} className="px-6 py-10 text-center font-bold text-[var(--color-text-muted)] animate-pulse">Loading Data...</td></tr>
              ) : filteredSchools.length > 0 ? (
                filteredSchools.map((school) => (
                  <tr key={school.id} className="hover:bg-[var(--color-bg-page)]/50 transition-colors group">
                    {/* School Name */}
                    <td className="px-6 py-4">
                        <span className="font-bold text-[var(--color-text-primary)] text-sm">{school.schoolName}</span>
                    </td>

                    {/* Domain / Slug - অ্যালাইনমেন্ট ঠিক করা হয়েছে */}
                    <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-[var(--color-primary)] font-bold text-[10px] uppercase tracking-wider bg-[var(--color-primary)]/5 px-2.5 py-1.5 rounded-lg w-fit">
                            <Hash size={12} className="opacity-70" />
                            {school.slug}
                        </div>
                    </td>

                    {/* Plan */}
                    <td className="px-6 py-4">
                       <span className="text-xs font-black uppercase text-[var(--color-text-secondary)] bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {school.plan || "BASIC"}
                       </span>
                    </td>

                    {/* Expiry Date */}
                    <td className="px-6 py-4 text-xs font-bold text-[var(--color-text-secondary)]">
                       {school.expiryDate || "2025-01-01"}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 w-fit ${
                        school.status === 'Suspended' ? 'bg-orange-500/10 text-orange-600' : 
                        school.status === 'Expired' ? 'bg-red-500/10 text-red-500' : 
                        'bg-green-500/10 text-green-500' 
                      }`}>
                        {school.status === 'Suspended' ? <ShieldAlert size={12}/> : <ShieldCheck size={12}/>}
                        {school.status || "Active"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right relative">
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

                      {openMenuId === school.id && (
                        <div className="absolute right-6 mt-2 w-56 bg-[var(--color-bg-card)] border border-[var(--color-border-light)] rounded-2xl shadow-2xl z-50 overflow-hidden animate-fade-in-up">
                          <div className="p-2 space-y-1">
                            <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-page)] hover:text-[var(--color-primary)] rounded-xl transition-all text-left">
                              <Edit size={14} /> Update School Info
                            </button>
                            <button className="w-full flex items-center gap-3 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-500/10 rounded-xl transition-all text-left">
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
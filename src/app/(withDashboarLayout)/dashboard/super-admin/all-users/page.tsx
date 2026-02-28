"use client"
import React, { useState } from 'react'
import {
  Search, Edit, School, Mail, CheckCircle, Ban,
  Users, ArrowUpRight, ShieldCheck
} from 'lucide-react'
import Link from 'next/link'

// Mock Data: Only Primary Admins/School Owners
const initialAdmins = [
  { id: "u1", schoolId: "s1", email: "principal@ideal.edu", name: "Rashed Khan", school: "Ideal High School", status: "ACTIVE", joinedDate: "2024-01-10" },
  { id: "u2", schoolId: "s2", email: "owner@sunfield.com", name: "Anisur Rahman", school: "Sunfields School", status: "ACTIVE", joinedDate: "2024-02-15" },
  { id: "u3", schoolId: "s3", email: "admin@global.net", name: "Morshed Alam", school: "Global Academy", status: "SUSPENDED", joinedDate: "2024-03-20" },
]

export default function ClientManagement() {
  const [admins, setAdmins] = useState(initialAdmins);
  const [searchEmail, setSearchEmail] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // Refined Filter Logic
  const filteredAdmins = admins.filter(admin => {
    const matchesEmail = admin.email.toLowerCase().includes(searchEmail.toLowerCase());
    const matchesSchool = schoolFilter === "ALL" || admin.school === schoolFilter;
    const matchesStatus = statusFilter === "ALL" || admin.status === statusFilter;
    return matchesEmail && matchesSchool && matchesStatus;
  });

  const toggleStatus = (id: string) => {
    setAdmins(admins.map(a =>
      a.id === id ? { ...a, status: a.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE" } : a
    ));
  };

  return (
    <div className="space-y-6 p-2 md:p-0">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-[var(--color-text-primary)] flex items-center gap-3">
            <ShieldCheck className="text-[var(--color-primary)]" size={32} />
            Client Directory
          </h2>
          <p className="text-[var(--color-text-muted)] font-medium">Manage institutional owners and their platform access.</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-blue-500/10 text-blue-600 px-4 py-2 rounded-2xl border border-blue-500/20 text-sm font-black uppercase tracking-tighter">
            Total Clients: {admins.length}
          </div>
        </div>
      </div>

      {/* Modern Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[var(--color-bg-card)] p-4 rounded-3xl border border-[var(--color-border-light)]">
        {/* Email Search */}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
          <input
            type="text" placeholder="Search by email..." value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-2xl outline-none text-sm font-bold focus:ring-2 focus:ring-[var(--color-primary)]/20"
          />
        </div>

        {/* School Search */}
        <div className="relative">
          <School className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size={18} />
          <input
            type="text" placeholder="Search school name..."
            onChange={(e) => setSchoolFilter(e.target.value === "" ? "ALL" : e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-2xl outline-none text-sm font-bold appearance-none"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-3 bg-[var(--color-bg-page)] border border-[var(--color-border-light)] rounded-2xl outline-none text-sm font-bold appearance-none cursor-pointer"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active Only</option>
            <option value="SUSPENDED">Suspended Only</option>
          </select>
        </div>
      </div>

      {/* Admin Table */}
      <div className="bg-[var(--color-bg-card)] rounded-[40px] border border-[var(--color-border-light)] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--color-bg-page)] text-[var(--color-text-muted)] text-[11px] uppercase font-black tracking-[0.15em] border-b border-[var(--color-border-light)]">
                <th className="px-8 py-5">Owner Identity</th>
                <th className="px-8 py-5">Institution</th>
                <th className="px-8 py-5">Access Status</th>
                <th className="px-8 py-5">Joined Date</th>
                <th className="px-8 py-5 text-right">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border-light)]">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-[var(--color-bg-page)]/40 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-black text-[15px] text-[var(--color-text-primary)]">{admin.name}</span>
                      <span className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                        <Mail size={12} /> {admin.email}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
                      <School size={14} className="text-[var(--color-primary)]" />
                      <span className="text-xs font-black text-[var(--color-text-secondary)]">{admin.school}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${admin.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'
                      }`}>
                      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${admin.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-[var(--color-text-muted)]">
                    {admin.joinedDate}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                      <Link
                        href={`/dashboard/super-admin/schools/edit/${admin.schoolId}`}
                        className="p-2.5 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-2xl hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-sm"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => toggleStatus(admin.id)}
                        className={`p-2.5 rounded-2xl transition-all shadow-sm ${admin.status === 'ACTIVE'
                            ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white'
                            : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white'
                          }`}
                      >
                        {admin.status === 'ACTIVE' ? <Ban size={18} /> : <CheckCircle size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
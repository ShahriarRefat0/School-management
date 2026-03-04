"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRoleGuard } from '@/hooks/useRoleGurad';
import { getStudents, deleteStudent } from '@/app/actions/student';
import {
  Users,
  UserCheck,
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  GraduationCap,
  Calendar,
  Settings2,
  Trash2,
  Edit
} from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

function StudentActions({ student, onDeleted }: { student: any, onDeleted: () => void }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${student.name}?`)) return;
    const res = await deleteStudent(student.id);
    if (res.success) onDeleted();
    else alert(res.error);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 hover:bg-primary/10 rounded-2xl transition-all text-text-muted hover:text-primary active:scale-90"
      >
        <MoreVertical className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute right-0 mt-2 w-48 bg-bg-card border border-border-light rounded-2xl shadow-2xl z-40 overflow-hidden"
            >
              <button
                onClick={() => router.push(`/dashboard/principal/students/edit/${student.id}`)}
                className="w-full px-5 py-4 text-left text-xs font-black uppercase tracking-widest text-text-primary hover:bg-blue-50 hover:text-blue-600 flex items-center gap-3 transition-colors"
              >
                <Edit size={16} /> Edit Profile
              </button>
              <button
                onClick={handleDelete}
                className="w-full px-5 py-4 text-left text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-50 flex items-center gap-3 transition-colors border-t border-border-light/50"
              >
                <Trash2 size={16} /> Delete Record
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function StudentsPage() {
  const { loading: guardLoading } = useRoleGuard("admin");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getStudents();
      if (result.success && result.data) {
        const formattedStudents = result.data.map((s: any) => ({
          id: s.id,
          registrationNo: s.registrationNo,
          name: `${s.firstName} ${s.lastName}`,
          class: s.currentClass,
          section: s.section,
          roll: String(s.rollNo),
          status: s.isActive ? "Active" : "Inactive",
          email: s.email,
          phone: s.guardianPhone
        }));
        setStudents(formattedStudents);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === "Active").length;

  const currentStats = [
    {
      title: "Total Students",
      value: totalStudents.toString(),
      subtitle: "Academic Registry",
      icon: Users,
      colorClass: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
    },
    {
      title: "Active Students",
      value: activeStudents.toString(),
      subtitle: "Current Session",
      icon: UserCheck,
      colorClass: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400"
    },
    {
      title: "Attendance Rate",
      value: "94.2%",
      subtitle: "Live Updates",
      icon: Calendar,
      colorClass: "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400"
    },
  ];

  if (guardLoading || loading) return <p className="p-10 font-black animate-pulse text-primary tracking-widest text-xs uppercase">SYNCING STUDENT DATA...</p>;

  return (
    <div className="space-y-8 p-6 lg:p-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-text-primary tracking-tight flex items-center gap-3">
            <GraduationCap className="w-10 h-10 text-primary" />
            Students Directory
          </h1>
          <p className="text-sm text-text-muted mt-1 font-medium italic opacity-70">
            Directory & Enrollment Management System
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard/principal/students/add")}
            className="px-8 py-4 bg-primary text-white rounded-2xl text-[11px] font-black hover:bg-primary/90 transition-all shadow-2xl shadow-primary/30 hover:-translate-y-2 flex items-center gap-3 uppercase tracking-widest"
          >
            <UserPlus size={20} />
            New Enrollment
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentStats.map((stat, i) => (
          <div key={i} className="bg-bg-card p-8 rounded-3xl border border-border-light shadow-sm flex items-center gap-6">
            <div className={`p-5 rounded-2xl ${stat.colorClass} shadow-inner`}>
              <stat.icon size={32} />
            </div>
            <div>
              <h3 className="text-[10px] font-black text-text-muted uppercase tracking-widest leading-none mb-1">{stat.title}</h3>
              <p className="text-3xl font-black text-text-primary mt-1 tracking-tighter">{stat.value}</p>
              <p className="text-[10px] text-text-muted font-bold italic opacity-60">{stat.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Directory Table Card */}
      <div className="bg-bg-card rounded-[2.5rem] border border-border-light overflow-hidden shadow-2xl shadow-black/5">
        <div className="p-8 border-b border-border-light flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-primary/5 to-transparent">
          <div className="space-y-1">
            <h3 className="font-black text-text-primary uppercase tracking-widest text-[11px]">Student Inventory</h3>
            <p className="text-[10px] text-text-muted font-bold opacity-50 uppercase tracking-tighter">Real-time database records</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted w-4 h-4 opacity-40" />
              <input
                type="text"
                placeholder="Search by ID or Name..."
                className="pl-14 pr-8 py-3 bg-bg-page/50 border-2 border-border-light rounded-2xl text-sm font-bold focus:outline-none focus:border-primary/30 transition-all w-full md:w-80"
              />
            </div>
            <button className="p-4 bg-bg-card border-2 border-border-light rounded-2xl text-text-muted hover:bg-bg-page transition-all shadow-sm">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-bg-page/30 text-text-muted uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="px-10 py-6">Ledger ID</th>
                <th className="px-10 py-6">Student Name</th>
                <th className="px-10 py-6">Class/Sec</th>
                <th className="px-10 py-6">Roll No</th>
                <th className="px-10 py-6">Status</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light/50">
              {students.length > 0 ? (
                students.map((student) => (
                  <tr key={student.id} className="hover:bg-primary/[0.01] transition-colors group">
                    <td className="px-10 py-8 font-mono text-[11px] font-black text-primary/70">{student.registrationNo || student.id}</td>
                    <td className="px-10 py-8">
                      <div className="font-black text-text-primary text-base leading-none mb-1 group-hover:text-primary transition-colors">{student.name}</div>
                      <div className="text-[10px] text-text-muted font-bold opacity-60 uppercase tracking-widest flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-primary/20 rounded-full"></span>
                        Guardian: {student.phone || "N/A"}
                      </div>
                    </td>
                    <td className="px-10 py-8">
                      <span className="px-4 py-1.5 bg-bg-page border border-border-light rounded-xl text-[10px] font-black uppercase text-text-muted shadow-sm">
                        Class {student.class} — {student.section}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-text-secondary font-black text-sm tracking-tight opacity-80">{student.roll}</td>
                    <td className="px-10 py-8">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 w-max ${student.status === "Active"
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        : "bg-red-50 text-red-600 border border-red-100"
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${student.status === "Active" ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" : "bg-red-500"}`}></span>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-10 py-8 text-right">
                      <StudentActions student={student} onDeleted={() => {
                        setStudents(prev => prev.filter(s => s.id !== student.id))
                      }} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-10 py-32 text-center">
                    <div className="space-y-3 opacity-30">
                      <GraduationCap size={48} className="mx-auto" />
                      <p className="font-black uppercase tracking-[0.2em] text-[10px]">Registry is empty</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}